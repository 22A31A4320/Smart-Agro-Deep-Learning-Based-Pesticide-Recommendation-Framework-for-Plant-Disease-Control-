const tabs = Array.from(document.querySelectorAll(".main-tab"));
const sections = Array.from(document.querySelectorAll(".tab"));
let currentIndex = 0;

/* TAB SWITCH */
function activateTab(index) {
  sections.forEach(s => s.classList.remove("active"));
  tabs.forEach(t => t.classList.remove("active"));

  sections[index].classList.add("active");
  tabs[index].classList.add("active");
  currentIndex = index;

  if (tabs[index].dataset.tab === "result") {
    showLeafName("Tomato Leaf 🍃");
    launchConfetti();
  }
}

tabs.forEach((tab, i) =>
  tab.addEventListener("click", () => activateTab(i))
);

/* UPLOAD */
document.querySelector(".upload-btn").onclick = () =>
  document.getElementById("imageUpload").click();

/* PARTICLE BACKGROUND */
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = Array.from({ length: 80 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 3 + 1,
  dx: Math.random() - 0.5,
  dy: Math.random() - 0.5
}));

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "#20c997";
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* 🍀 CONFETTI (NO FOR LOOP) */
function launchConfetti() {
  let count = 0;
  const max = 60;

  const interval = setInterval(() => {
    if (count >= max) return clearInterval(interval);

    const leaf = document.createElement("span");
    leaf.textContent = "🍀";
    leaf.className = "leaf-confetti";

    const startX = Math.random() * innerWidth;
    const duration = 3 + Math.random() * 3;
    const sway = Math.random() * 120 - 60;
    const rotation = Math.random() * 720 - 360;

    leaf.style.left = `${startX}px`;
    leaf.style.animationDuration = `${duration}s`;
    leaf.style.setProperty("--sway", `${sway}px`);
    leaf.style.setProperty("--rotate", `${rotation}deg`);

    document.body.appendChild(leaf);
    setTimeout(() => leaf.remove(), duration * 1000);

    count++;
  }, 80);
}

/* LEAF NAME */
function showLeafName(name) {
  const leaf = document.getElementById("leafName");
  leaf.textContent = `Detected Leaf: ${name}`;
  leaf.style.animation = "fadeLeaf 1s forwards";
}

/* STICKY SHADOW */
window.addEventListener("scroll", () => {
  document.getElementById("mainNav")
    .classList.toggle("shadow", window.scrollY > 10);
});

/* MOBILE SWIPE */
let startX = 0;
document.addEventListener("touchstart", e => startX = e.touches[0].clientX);
document.addEventListener("touchend", e => {
  const diff = e.changedTouches[0].clientX - startX;
  if (diff > 60 && currentIndex > 0) activateTab(currentIndex - 1);
  if (diff < -60 && currentIndex < sections.length - 1)
    activateTab(currentIndex + 1);
});

/* Fade animation */
const style = document.createElement("style");
style.innerHTML = `@keyframes fadeLeaf { to { opacity: 1; } }`;
document.head.appendChild(style);
