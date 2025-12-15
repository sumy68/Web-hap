async function loadPartial(selector, url) {
    const el = document.querySelector(selector);
    if (!el) return;
    const res = await fetch(url);
    el.innerHTML = await res.text();
  }
  
  function initNav() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");
    if (!toggle || !nav) return;
  
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }
  
  function setYear() {
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }
  
  (async function () {
    await loadPartial("#site-header", "partials/header.html");
    await loadPartial("#site-footer", "partials/footer.html");
  
    initNav();
    setYear();
  })();

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".nav__link--btn");
    if (!btn) return;
  
    const drop = btn.closest(".nav__dropdown");
    drop.classList.toggle("is-open");
  });
  

  // Fade-in on scroll + Stagger (immer 1-2-3-4)
document.addEventListener("DOMContentLoaded", () => {
  // Delays upfront setzen (damit auch first/last sicher stimmen)
  document.querySelectorAll(".pillars__grid").forEach((grid) => {
    grid.querySelectorAll(".pillar.reveal").forEach((el, i) => {
      el.style.setProperty("--delay", `${i * 220}ms`);
    });
  });

  const revealEls = document.querySelectorAll(".reveal");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  revealEls.forEach((el) => io.observe(el));
});
