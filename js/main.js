/* ============================================================
   AASIL KHAN — Fiverr style site
   Hydrates the DOM from js/data.js and wires up interactions:
   mobile menu, sticky header, animated counters, scroll reveal,
   and the portfolio video modal.
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

  /* ---------- about: track record + body + clients + skills ---------- */
  const trackList = $("#trackList");
  if (trackList && D.about) {
    trackList.innerHTML = D.about.map((t) => `<li>${t}</li>`).join("");
  }
  const aboutBody = $("#aboutBody");
  if (aboutBody && D.aboutBody) aboutBody.textContent = D.aboutBody;
  const clientLogos = $("#clientLogos");
  if (clientLogos && D.clients) {
    clientLogos.innerHTML = D.clients.map((c) => `<span>${c}</span>`).join("");
  }
  const skillsRow = $("#skillsRow");
  if (skillsRow && D.skills) {
    skillsRow.innerHTML = D.skills.map((s) => `<span>${s}</span>`).join("");
  }

  /* ---------- gigs ---------- */
  const gigsGrid = $("#gigsGrid");
  if (gigsGrid && D.gigs) {
    gigsGrid.innerHTML = D.gigs
      .map(
        (g) => `
      <a class="gig-card" href="${D.fiverrUrl}" target="_blank" rel="noopener">
        <div class="gig-rating"><span class="stars">★</span><strong>${g.rating}</strong><span>(${g.reviews})</span></div>
        <div class="gig-title">${g.title}</div>
        <div class="gig-price">
          <div><span class="from">From</span> <span class="amount">€${g.price}</span></div>
          <span class="gig-cta">Order now →</span>
        </div>
      </a>`
      )
      .join("");
  }

  /* ---------- portfolio ---------- */
  const workGrid = $("#workGrid");
  if (workGrid && D.work) {
    workGrid.innerHTML = D.work
      .map(
        (w) => `
      <div class="work-card" data-video="${w.video}" data-title="${w.title}" role="button" tabindex="0" aria-label="Play ${w.title}">
        <div class="work-thumb">
          <img src="assets/thumbs/${w.video.split("/").pop().replace(".mp4", ".jpg")}" alt="${w.title}" loading="lazy">
          <div class="work-play"><span>▶</span></div>
        </div>
        <div class="work-meta"><h3>${w.title}</h3><div class="cat">${w.cat}</div></div>
      </div>`
      )
      .join("");
  }

  /* ---------- reviews ---------- */
  const reviewsList = $("#reviewsList");
  if (reviewsList && D.reviewsList) {
    reviewsList.innerHTML = D.reviewsList
      .map(
        (r) => `
      <div class="review-card">
        <div class="review-head">
          <div class="review-avatar">${r.name.charAt(0)}</div>
          <div>
            <div class="review-name">${r.name}${r.repeat ? ' <span class="repeat">Repeat Client</span>' : ""}</div>
            <div class="review-country">${r.flag} ${r.country}</div>
          </div>
          <div class="review-stars">★★★★★</div>
        </div>
        <p class="review-text">${r.text}</p>
        <div class="review-foot">
          <span>${r.service}</span><span>${r.price}</span><span>${r.duration}</span>
        </div>
      </div>`
      )
      .join("");
  }

  const breakdown = $("#breakdown");
  if (breakdown && D.ratingBreakdown) {
    const total = D.ratingBreakdown.reduce((a, b) => a + b.count, 0) || 1;
    breakdown.innerHTML = D.ratingBreakdown
      .map(
        (b) => `
      <div class="breakdown-row">
        <span class="b-label">${b.stars}</span>
        <span class="stars" style="font-size:.8rem">★</span>
        <div class="b-bar"><i style="width:${Math.round((b.count / total) * 100)}%"></i></div>
        <span class="b-count">${b.count}</span>
      </div>`
      )
      .join("");
  }
  const ratingSub = $("#ratingSub");
  if (ratingSub && D.ratingSub) {
    ratingSub.innerHTML = D.ratingSub
      .map((r) => `<div class="rs-row"><span>${r.label}</span><b>${r.value.toFixed(1)}</b></div>`)
      .join("");
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

  /* ---------- animated counters ---------- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count || "0");
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    if (reduced) {
      el.textContent = target.toFixed(decimals);
      return;
    }
    const dur = 1400;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals);
    }
    requestAnimationFrame(tick);
  }
  const counters = $$(".counter");
  if (counters.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            animateCounter(en.target);
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => io.observe(c));
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
    modalPlayer.innerHTML =
      v.type === "iframe"
        ? `<iframe src="${v.url}" title="${title}" allow="autoplay; fullscreen" allowfullscreen></iframe>`
        : `<video src="${v.url}" controls autoplay playsinline></video>`;
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