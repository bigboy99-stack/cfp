import { GoogleGenAI } from '@google/genai';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();
const port = 3004;

// 1. Security & Parsing
app.use(express.json());
app.use(express.urlencoded())
app.use(helmet());
app.use(cors()); 

// 2. Rate Limiting (10 requests per minute)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, max: 10,
  message: { error: "requests have exceeded more than 10 a minute or you have used the max token in a minute, please try again in a minute." }
});
app.use('/gem', limiter);

const genAI = new GoogleGenAI({});

app.post('/gem', async (req, res) => {
  try {
    const prompt = req.body.chatbot;
    
    // Set headers for streaming
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');

    // Generate stream
    const response = await genAI.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'always make the response medium length'
      }
    });

    // Loop through chunks as they arrive and pipe to client
    for await (const chunk of response) {
      const text = chunk.text; // Extract text from chunk
      if (text) {
        res.write(text); // Send chunk immediately
      }
    }
    res.end();
  } catch (error) {
    console.error('Error:', error);
    // If headers haven't been sent, send error JSON
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.end();
    }
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));