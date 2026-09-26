/* ============================================================
   KALYAN ABBURI — portfolio
   Hydrates the DOM from js/data.js and wires up interactions:
   mobile menu, sticky header, scroll reveal, the main featured
   video, the category filter, and the portfolio video modal.
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

  /* ---------- main featured video ---------- */
  function playerHTML(v) {
    if (!v) return "";
    return v.type === "iframe"
      ? `<iframe src="${v.url}" title="Main video" allow="autoplay; fullscreen" allowfullscreen></iframe>`
      : `<video src="${v.url}" controls playsinline></video>`;
  }
  const mainPlayer = $("#mainPlayer");
  if (mainPlayer && D.mainVideo && D.videos) {
    const v = D.videos[D.mainVideo];
    mainPlayer.innerHTML = playerHTML(v);
    const titleEl = $("#mainPlayerTitle");
    if (titleEl) {
      const item = (D.work || []).find((w) => w.video === D.mainVideo);
      titleEl.textContent = item ? item.title : "Main video";
    }
    const subEl = $("#mainVideoSub");
    if (subEl && D.mainVideoSub) subEl.textContent = D.mainVideoSub;
  }

  /* ---------- category tabs ---------- */
  const cats = [];
  (D.work || []).forEach((w) => {
    if (!cats.includes(w.cat)) cats.push(w.cat);
  });
  const catTabs = $("#catTabs");
  if (catTabs && cats.length) {
    catTabs.innerHTML =
      `<button class="cat-tab active" data-cat="all" role="tab" aria-selected="true">All</button>` +
      cats
        .map(
          (c) =>
            `<button class="cat-tab" data-cat="${c}" role="tab" aria-selected="false">${c}</button>`
        )
        .join("");
  }

  /* ---------- portfolio grid ---------- */
  const workGrid = $("#workGrid");
  if (workGrid && D.work) {
    workGrid.innerHTML = D.work
      .map(
        (w) => `
      <div class="work-card" data-video="${w.video}" data-cat="${w.cat}" data-title="${w.title}" role="button" tabindex="0" aria-label="Play ${w.title}">
        <div class="work-thumb">
          <img src="assets/thumbs/${w.video.split("/").pop().replace(".mp4", ".jpg")}" alt="${w.title}" loading="lazy">
          <div class="work-play"><span>▶</span></div>
        </div>
        <div class="work-meta"><h3>${w.title}</h3><div class="cat">${w.cat}</div></div>
      </div>`
      )
      .join("");
  }

  /* ---------- category filtering ---------- */
  function applyFilter(cat) {
    $$(".work-card").forEach((card) => {
      const show = cat === "all" || card.dataset.cat === cat;
      card.classList.toggle("is-hidden", !show);
    });
  }
  if (catTabs) {
    catTabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".cat-tab");
      if (!btn) return;
      $$(".cat-tab", catTabs).forEach((t) => {
        t.classList.toggle("active", t === btn);
        t.setAttribute("aria-selected", String(t === btn));
      });
      applyFilter(btn.dataset.cat);
    });
  }

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

  /* ---------- video modal ---------- */
  const modal = $("#modal");
  const modalPlayer = $("#modalPlayer");
  const modalTitle = $("#modalTitle");
  function openModal(videoKey, title) {
    const v = D.videos && D.videos[videoKey];
    if (!v || !modal) return;
    modalPlayer.innerHTML = playerHTML(v);
    if (modalTitle) modalTitle.textContent = title;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modalPlayer.innerHTML = "";
    document.body.style.overflow = "";
  }
  $$(".work-card").forEach((card) => {
    const open = () => openModal(card.dataset.video, card.dataset.title);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
  const backdrop = $(".modal__backdrop");
  const closeBtn = $(".modal__close");
  if (backdrop) backdrop.addEventListener("click", closeModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("open")) closeModal();
  });
})();