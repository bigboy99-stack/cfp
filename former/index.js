document.body.onload = initializeTheme;
setTimeout(()=>pd2.focus(), 200);
const ld = document.querySelector(".lb");
const ht = document.querySelector("html");
const sb = document.querySelector(".sb");
const sv = document.querySelector(".sbs");
const hb = document.querySelector("#sb-btn");
const prj = document.querySelector(".prj");
const pd2 = document.querySelector(".pd2");
// const yt = document.querySelector(".ytd");
// const vi = document.querySelector(".vi");

ld.onclick = two;
hb.onclick = () => {toggleDropdown(hb, sb, "sbb");};
pd2.onclick = () => {toggleDropdown(pd2, prj, "uls");};

function initializeTheme() {
    if (localStorage.getItem("dark") === "on") {
      const isChecked = ld.getAttribute("aria-checked") === "true";
      if (!isChecked) { ld.setAttribute("aria-checked", "true"); ht.setAttribute('data-theme', 'dark');ld.textContent = "light ☀️";ht.className = 'bd'}
    } else {ld.setAttribute("aria-checked", "false");ht.removeAttribute('data-theme');ld.textContent = "dark 🌙";ht.className = 'bl'}
}
function two () {
  const isChecked = ld.getAttribute("aria-checked") === "true";
  if (!isChecked) {
    localStorage.setItem("dark", "on");
    ld.setAttribute("aria-checked", "true");
    ht.setAttribute('data-theme', 'dark');
    ld.textContent = "light ☀️";
    ht.className = 'bd'
  } else {
    localStorage.setItem("dark", "off");
    ld.setAttribute("aria-checked", "false");
    ht.removeAttribute('data-theme')
    ld.textContent = "dark 🌙";
    ht.className = 'bl'
  }
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
  // Close Sidebar if click is outside the button (hb) and the menu (sb)
  if (sb.classList.contains('sbb') && !sb.contains(e.target) && !hb.contains(e.target)) {toggleDropdown(hb, sb, "sbb");}

  // Close Projects dropdown if click is outside the button (pd2) and the menu (prj)
  if (prj.classList.contains('uls') && !prj.contains(e.target) && !pd2.contains(e.target)) {toggleDropdown(pd2, prj, "uls");}
});

// =======================================
// 🚀 Page Transition Logic (JS)
// =======================================

// 1. Select all navigable links (adjust selector as needed)
const nextPageLinks = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto:"])');

nextPageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Prevent default navigation immediately
        e.preventDefault();
        
        // Get the target URL
        const nextUrl = link.href;

        // Get the coordinates of the click relative to the viewport
        const x = e.clientX;
        const y = e.clientY;

        // Set the CSS variables for the transition origin
        // We set these on the root element so the ::view-transition-new/old can access them
        document.documentElement.style.setProperty('--x', `${x}px`);
        document.documentElement.style.setProperty('--y', `${y}px`);

        // Start the View Transition sequence
        if (document.startViewTransition) {
            // This is the SPA API, but we use it as a trigger for the effect
            document.startViewTransition(() => {
                // We use a small timeout to let the transition START visually
                // before we trigger the actual page load/navigation.
                setTimeout(() => {
                    window.location.href = nextUrl;
                }, 50); // Start the reveal effect for 50ms before navigating

            }).finished.finally(() => {
                // Clean up the temporary CSS variables after the transition is done
                document.documentElement.style.removeProperty('--x');
                document.documentElement.style.removeProperty('--y');
            });
        } else {
            // Fallback for browsers that do not support View Transitions
            window.location.href = nextUrl;
        }
    });
});