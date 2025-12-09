document.body.onload = setTimeout(initializeTheme, 200);
let inp;
document.body.onload = ()=> {
  inp = document.querySelector("#sbi");
  inp.focus();
  inp.oninput = (e) => {e.target.style.height = 'auto'; e.target.style.height = `${e.target.scrollHeight}px`}
};
const ht = document.querySelector("html");
const sb = document.querySelector(".sb");
const sv = document.querySelector(".sbs");
const hb = document.querySelector("#sb-btn");
const ema = document.querySelector("#ema");
const f = document.querySelector(".sbf");
const sub = document.querySelector("#sub");
// const ch = document.querySelector(".cbh");
// const cd = document.querySelector(".cbd");

hb.onclick = () => {toggleDropdown(hb, sb, "sbb");};

function initializeTheme () {
 if (localStorage.getItem("dark") == "on") {console.log(345);ht.setAttribute('data-theme', 'dark'); ht.className = 'bd';}
 else {ht.removeAttribute('data-theme'); ht.className = 'bl';}
}

ema.onclick = () => {
  ema.select();
  ema.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(ema.value);
  alert("Copied the text: " + ema.value);
}
function toggleDropdown(button, targetElement, activeClass) {
  const isExpanded = button.getAttribute("aria-expanded") === "true";
  if (isExpanded) {
    targetElement.classList.remove(activeClass);
    button.setAttribute("aria-expanded", "false");
  } else {
    targetElement.classList.add(activeClass);
    button.setAttribute("aria-expanded", "true");
  }
}
document.addEventListener('keydown', (e) => {
  // Sidebar (sb) close on ESC
  if (e.key === 'Escape' && sb.classList.contains('sbb')) {
    toggleDropdown(hb, sb, "sbb"); // Reuses the new toggle function
  }
  // Projects dropdown (prj) close on ESC
  if (e.key === 'Escape' && prj.classList.contains('uls')) {
    toggleDropdown(pd2, prj, "uls"); // Reuses the new toggle function
  }
});
document.addEventListener('click', (e) => {
  if (sb.classList.contains('sbb') && !sb.contains(e.target) && !hb.contains(e.target)) {toggleDropdown(hb, sb, "sbb");}
});

const nextPageLinks = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto:"])');

nextPageLinks.forEach(link => {
 link.addEventListener('click', (e) => {
    e.preventDefault();
    const nextUrl = link.href;
    const x = e.clientX;
    const y = e.clientY;
    document.documentElement.style.setProperty('--x', `${x}px`);
    document.documentElement.style.setProperty('--y', `${y}px`);

    if (document.startViewTransition) {
        document.startViewTransition(() => {
            setTimeout(() => {window.location.href = nextUrl;}, 50); 
        }).finished.finally(() => {
            document.documentElement.style.removeProperty('--x');
            document.documentElement.style.removeProperty('--y');
        });
    } else {
        window.location.href = nextUrl;
    }
 });
});

// sub.addEventListener('click', async (e) => {
//     e.preventDefault();
//     const prompt = inp.value.trim();
//     if (!prompt) return;

//     // 1. Store/Display User Prompt
//     let ran = reply('chat user'); 
//     ran.textContent += inp.value.trim();
//     ch.append(ran);
//     ch.scrollTop = ch.scrollHeight;
    
//     inp.value = '';
//     inp.style.height = 'auto'; // Reset height
//     sub.disabled = true;

//     // 2. Create Placeholder for Bot Response with Loading Animation
//     // const botMessageDiv = addMessage('Thinking', 'bot-msg');
//     // botMessageDiv.classList.add('loading-dots');

//     try {
//         // 3. Send to Backend
//         const response = await fetch('https://worker-js.helldogg42.workers.dev/gem', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ chatbot: prompt })
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Server error: ${errorText}`);
//         }

//         // 4. Handle Streaming Response
//         const reader = response.body.getReader();
//         const decoder = new TextDecoder();
        
//         // Clear "Thinking..." text and remove animation class
//         // botMessageDiv.textContent = ''; 
//         // botMessageDiv.classList.remove('loading-dots');

//         let ran2 = reply('chat server');
//         ch.append(ran2);
//         while (true) {
//             const { done, value } = await reader.read();
//             if (done) break;

//             // Decode chunk and append to current message div
//             const chunk = decoder.decode(value, { stream: true });
//             ran2.textContent += chunk;
//             ch.scrollTop = ch.scrollHeight;
//         }

//       } catch (err) {
//         alert(err.message);
//         // botMessageDiv.classList.remove('loading-dots');
//       } finally {
//         sub.disabled = false;
//         inp.focus()
//       }
// });

/* ------------------------------------- */

// function reply(className) {
//     let ele1 = document.createElement('div');
//     ele1.className = className;
//     // let ele2 = document.createElement('span');
//     // ele2.className = 'cbs'
//     // ele2.textContent = sender;
//     // ele1.append(ele2)
//     return ele1;
// }