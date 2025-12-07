// worker.js
export default {
  async fetch(request, env, ctx) {
    // 1. Define CORS headers for EVERY response
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*", // Allows local files (origin 'null')
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // 2. Handle Preflight (OPTIONS)
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 3. Safety Check: Are keys bound?
      if (!env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is missing in secrets/wrangler.toml");
      if (!env.wdns) throw new Error("KV Namespace 'wdns' is not bound");

      if (request.method === "POST" && request.url.includes("/gem")) {
        
        // --- Rate Limiting ---
        const ip = request.headers.get("CF-Connecting-IP") || "unknown";
        const rateLimitKey = `rate_limit:${ip}`;
        
        // Read current count
        let count = parseInt(await env.wdns.get(rateLimitKey)) || 0;
        
        if (count >= 10) {
          return new Response(JSON.stringify({ error: "Rate limit exceeded (10/min)" }), {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        
        // Increment and expire after 60s
        count++;
        await env.wdns.put(rateLimitKey, count.toString(), { expirationTtl: 60 });

        // --- Parse Body (JSON or Form) ---
        let prompt = "";
        const contentType = request.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
          const body = await request.json();
          prompt = body.chatbot;
        } else if (contentType.includes("form")) {
          const formData = await request.formData();
          prompt = formData.get("chatbot");
        }

        if (!prompt) throw new Error("No 'chatbot' prompt found in body");

        // --- Call Gemini API ---
        const geminiResponse = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${env.GEMINI_API_KEY}`
          },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
              systemInstruction: { parts: [{ text: "always make the response concise" }] }
            }
          })
        });

        // Handle Gemini API Errors
        if (!geminiResponse.ok) {
          const errText = await geminiResponse.text();
          throw new Error(`Gemini API Error: ${errText}`);
        }

        // --- Return Stream ---
        const { readable, writable } = new TransformStream();
        geminiResponse.body.pipeTo(writable);

        return new Response(readable, {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      return new Response("Not Found", { status: 404, headers: corsHeaders });

    } catch (err) {
      // --- CRITICAL FIX ---
      // Catch ANY crash, attach CORS headers, and return JSON error
      return new Response(JSON.stringify({ error: err.message, stack: err.stack }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  }
};