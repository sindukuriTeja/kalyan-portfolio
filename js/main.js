/* ============================================================
   KALYAN — Portfolio animation engine
   ============================================================ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ================= PRELOADER ================= */
  const preloader = $("#preloader");
  const preloaderBar = $("#preloaderBar");
  const preloaderCount = $("#preloaderCount");
  const hero = $("#hero");

  function finishLoad() {
    preloader.classList.add("is-done");
    hero.classList.add("is-loaded");
  }

  if (prefersReduced) {
    finishLoad();
  } else {
    let progress = 0;
    const tick = setInterval(() => {
      progress = Math.min(100, progress + Math.random() * 16 + 6);
      const p = Math.floor(progress);
      preloaderBar.style.width = p + "%";
      preloaderCount.textContent = String(p).padStart(2, "0");
      if (progress >= 100) {
        clearInterval(tick);
        setTimeout(finishLoad, 250);
      }
    }, 90);
  }

  /* ================= CUSTOM CURSOR ================= */
  const dot = $("#cursorDot");
  const ring = $("#cursorRing");
  let mx = -100, my = -100, rx = -100, ry = -100;

  if (!prefersReduced && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });
    (function ringLoop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(ringLoop);
    })();
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest("[data-hover], a, button")) ring.classList.add("is-hover");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest("[data-hover], a, button")) ring.classList.remove("is-hover");
    });
  } else {
    dot.style.display = "none";
    ring.style.display = "none";
  }

  /* ================= MAGNETIC BUTTONS ================= */
  if (!prefersReduced && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.22}px, ${y * 0.28}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
        el.style.transform = "translate(0,0)";
        setTimeout(() => (el.style.transition = ""), 500);
      });
    });
  }

  /* ================= NAV ================= */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const burger = $("#navBurger");
  const mobileMenu = $("#mobileMenu");
  burger.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  $$(".mobile-menu a").forEach((a) =>
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      burger.classList.remove("is-open");
      document.body.style.overflow = "";
    })
  );

  /* ================= HERO ROTATOR ================= */
  const rotator = $("#rotator");
  const words = (window.PORTFOLIO_DATA && PORTFOLIO_DATA.heroWords) || ["hook viewers"];
  let wi = 0;
  if (rotator && !prefersReduced) {
    setInterval(() => {
      rotator.classList.add("is-out");
      setTimeout(() => {
        wi = (wi + 1) % words.length;
        rotator.textContent = words[wi];
        rotator.classList.remove("is-out");
      }, 320);
    }, 2600);
  }

  /* ================= SCROLL REVEAL ================= */
  const revealEls = $$(".reveal");
  revealEls.forEach((el) => {
    const d = el.getAttribute("data-delay");
    if (d) el.style.setProperty("--d", d + "ms");
  });
  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          revealIO.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealIO.observe(el));

  /* ================= COUNTERS ================= */
  const counters = $$(".counter");
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        counterIO.unobserve(el);
        const target = parseInt(el.dataset.count, 10) || 0;
        if (prefersReduced) {
          el.textContent = target;
          return;
        }
        const t0 = performance.now();
        const dur = 1400;
        (function step(t) {
          const k = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - k, 3);
          el.textContent = Math.round(target * eased);
          if (k < 1) requestAnimationFrame(step);
        })(t0);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => counterIO.observe(el));

  /* ================= SKILL BARS ================= */
  const fills = $$(".skill__fill");
  const fillIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.style.width = en.target.dataset.width + "%";
        fillIO.unobserve(en.target);
      });
    },
    { threshold: 0.4 }
  );
  fills.forEach((el) => fillIO.observe(el));

  /* ================= WORK FILTER ================= */
  const filters = $$("#workFilters .filter");
  const cards = $$("#workGrid .work-card");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const f = btn.dataset.filter;
      cards.forEach((card) => {
        const show = f === "all" || card.dataset.category === f;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ================= VIDEO MODAL ================= */
  const modal = $("#videoModal");
  const modalVideo = $("#modalVideo");
  const modalTitle = $("#modalTitle");
  const modalCat = $("#modalCat");
  const modalClose = $("#modalClose");
  const videoSources = (window.PORTFOLIO_DATA && PORTFOLIO_DATA.videos) || {};

  function openModal(card) {
    const src = videoSources[card.dataset.video];
    modalTitle.textContent = card.dataset.title;
    modalCat.textContent = card.dataset.cat;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (src && src.type === "iframe") {
      // Large files: official Google Drive preview player
      modalVideo.removeAttribute("src");
      modalVideo.load();
      modalVideo.style.display = "none";
      const frame = document.createElement("iframe");
      frame.className = "modal__frame";
      frame.src = src.url;
      frame.allow = "autoplay; fullscreen; encrypted-media; picture-in-picture";
      frame.allowFullscreen = true;
      frame.title = card.dataset.title;
      modalVideo.parentNode.appendChild(frame);
    } else {
      // Small files: native streaming (falls back to local file)
      modalVideo.style.display = "";
      const old = modalVideo.parentNode.querySelector(".modal__frame");
      if (old) old.remove();
      modalVideo.src = (src && src.url) || card.dataset.video;
      modalVideo.play().catch(() => {});
    }
  }
  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();
    const frame = modalVideo.parentNode.querySelector(".modal__frame");
    if (frame) frame.remove();
  }
  cards.forEach((card) => card.addEventListener("click", () => openModal(card)));
  modalClose.addEventListener("click", closeModal);
  $$(".modal [data-close]").forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  /* ================= TIMELINE ================= */
  const timeline = $("#timeline");
  const tlData = (window.PORTFOLIO_DATA && PORTFOLIO_DATA.timeline) || [];
  if (timeline) {
    const prog = document.createElement("span");
    prog.className = "timeline__progress";
    timeline.appendChild(prog);
    tlData.forEach((item) => {
      const el = document.createElement("div");
      el.className = "timeline__item";
      el.innerHTML = `
        <span class="timeline__date mono">${item.date}</span>
        <h3>${item.title}</h3>
        <h4>${item.org}</h4>
        <p>${item.desc}</p>
        <div class="timeline__tags">${item.tags.map((t) => `<span>${t}</span>`).join("")}</div>`;
      timeline.appendChild(el);
    });
    const items = $$(".timeline__item");
    const itemIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            itemIO.unobserve(en.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    items.forEach((el) => itemIO.observe(el));

    window.addEventListener(
      "scroll",
      () => {
        const r = timeline.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = r.height;
        const passed = Math.min(Math.max(vh * 0.7 - r.top, 0), total);
        prog.style.height = (passed / total) * 100 + "%";
      },
      { passive: true }
    );
  }

  /* ================= HERO PARALLAX ================= */
  const blob1 = $(".hero__blob--1");
  const blob2 = $(".hero__blob--2");
  if (!prefersReduced && matchMedia("(hover: hover)").matches) {
    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (blob1) blob1.style.translate = `${x * 24}px ${y * 18}px`;
      if (blob2) blob2.style.translate = `${x * -30}px ${y * -22}px`;
    });
  }

  /* ================= MISC ================= */
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* Apply data-driven contact details */
  const data = window.PORTFOLIO_DATA;
  if (data) {
    const emailEl = $("#contactEmail");
    if (emailEl && data.email) {
      emailEl.textContent = data.email;
      emailEl.href = "mailto:" + data.email;
    }
    const links = $$(".contact__link");
    const socialMap = [data.socials && data.socials.instagram, data.socials && data.socials.youtube, data.socials && data.socials.linkedin];
    links.forEach((a, i) => {
      if (socialMap[i] && socialMap[i] !== "#") a.href = socialMap[i];
    });
  }
})();