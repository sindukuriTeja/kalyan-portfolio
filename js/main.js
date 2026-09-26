/* ============================================================
   KALYAN ABBURI — portfolio
   Hydrates the DOM from js/data.js and wires up interactions:
   mobile menu, sticky header, smooth scroll, and the END button.
   ============================================================ */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  const D = window.PORTFOLIO_DATA || {};
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- footer year ---------- */
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- profile: avatar, bio, contact links ---------- */
  const avatar = $("#avatar");
  if (avatar) {
    if (D.avatarImage) {
      avatar.innerHTML = `<img src="${D.avatarImage}" alt="${D.name || "Profile"}" onerror="this.remove()">`;
    } else if (D.avatarInitial) {
      avatar.textContent = D.avatarInitial;
    }
  }

  const bio = $("#bio");
  if (bio && D.bio) bio.textContent = D.bio;

  if (D.email) {
    const mailLink = $("#mailLink");
    if (mailLink) mailLink.setAttribute("href", "mailto:" + D.email);
    const mailText = $("#mailText");
    if (mailText) mailText.textContent = D.email;
    ["#hireMeBtn", "#hireMeHeader"].forEach((sel) => {
      const a = $(sel);
      if (a) a.setAttribute("href", "mailto:" + D.email);
    });
  }
  if (D.instagram) {
    const instaLink = $("#instaLink");
    if (instaLink) instaLink.setAttribute("href", D.instagram);
    const instaText = $("#instaText");
    if (instaText && D.instagramHandle) instaText.textContent = D.instagramHandle;
  }

  /* ---------- footer tagline ---------- */
  const footerLine = $("#footerLine");
  if (footerLine && D.footerLine) footerLine.textContent = D.footerLine;

  /* ---------- mobile menu ---------- */
  const menuButton = $("#menuButton");
  const menuWrap = $("#menuWrap");
  function closeMenu() {
    if (!menuWrap) return;
    menuWrap.classList.remove("show");
    menuWrap.setAttribute("aria-hidden", "true");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (menuButton && menuWrap) {
    menuButton.addEventListener("click", () => {
      const open = menuWrap.classList.toggle("show");
      menuWrap.setAttribute("aria-hidden", String(!open));
      menuButton.classList.toggle("active", open);
      menuButton.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$(".menu-link", menuWrap).forEach((l) => l.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- sticky header shadow ---------- */
  const header = $("#header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- smooth anchor scroll (offset for sticky header) ---------- */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    });
  });

  /* ---------- END button: back to top ---------- */
  const endBtn = $("#endBtn");
  if (endBtn) {
    endBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* ---------- scroll reveal ---------- */
  const anims = $$("[data-animate]");
  if (anims.length) {
    if (reduced || !("IntersectionObserver" in window)) {
      anims.forEach((a) => a.classList.add("in"));
    } else {
      const io2 = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("in");
              io2.unobserve(en.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      anims.forEach((a) => io2.observe(a));
    }
  }
})();