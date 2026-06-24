document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById("nav-toggle");
const header = document.getElementById("header");

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll('[data-nav]').forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ---------- Scroll-spy active nav link ---------- */
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll('[data-nav]');

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);
sections.forEach((section) => spyObserver.observe(section));

/* ---------- Scroll-reveal ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ---------- Accordion ---------- */
document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.closest(".accordion-item");
    const alreadyOpen = item.classList.contains("open");

    item.parentElement.querySelectorAll(".accordion-item").forEach((el) => {
      el.classList.remove("open");
      el.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
    });

    if (!alreadyOpen) {
      item.classList.add("open");
      header.setAttribute("aria-expanded", "true");
    }
  });
});

/* ---------- Text scramble on section headings ---------- */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function scrambleInto(el, finalText, duration = 600) {
  const steps = Math.max(8, Math.floor(duration / 40));
  let step = 0;
  const interval = setInterval(() => {
    step++;
    const revealCount = Math.floor((step / steps) * finalText.length);
    let out = "";
    for (let i = 0; i < finalText.length; i++) {
      if (finalText[i] === " ") { out += " "; continue; }
      if (i < revealCount) out += finalText[i];
      else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }
    el.textContent = out;
    if (step >= steps) {
      el.textContent = finalText;
      clearInterval(interval);
    }
  }, 40);
}

const scrambleObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        scrambleInto(el, el.dataset.text || el.textContent);
        scrambleObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.4 }
);
document.querySelectorAll(".reveal-text").forEach((el) => scrambleObserver.observe(el));
