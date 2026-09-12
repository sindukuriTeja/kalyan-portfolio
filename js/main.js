/* ============================================================
   KALYAN — FTI style animation engine
   preloader → Lenis → GSAP parallax → reveals → modal
   ============================================================ */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const data = window.PORTFOLIO_DATA || {};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- content hydration (data.js is the source of truth) ---------- */
  $('#year').textContent = new Date().getFullYear();
  const email = $('#contactEmail');
  if (data.email) {
    email.textContent = data.email; email.href = `mailto:${data.email}`;
    const fe = $('#footerEmail');
    if (fe) { fe.textContent = data.email; fe.href = `mailto:${data.email}`; }
  }
  const socials = [data.socials?.instagram, data.socials?.youtube, data.socials?.linkedin];
  $$('.social').forEach((a, i) => { if (socials[i] && socials[i] !== '#') { a.href = socials[i]; a.target = '_blank'; a.rel = 'noopener'; } });
  const timeline = $('#timeline');
  if (timeline && Array.isArray(data.timeline)) {
    timeline.innerHTML = data.timeline.map(item =>
      `<article><span class="date">${item.date}</span><div><h3>${item.title}</h3><h4>${item.org}</h4><p>${item.desc}</p><div class="timeline__tags">${(item.tags || []).map(t => `<b>${t}</b>`).join('')}</div></div></article>`
    ).join('');
  }

  /* ---------- preloader ---------- */
  const pre = $('#preloader'), count = $('#preloaderCount');
  if (reduced) { pre.classList.add('done'); }
  else {
    let p = 0;
    const tick = setInterval(() => {
      p = Math.min(100, p + Math.random() * 13 + 5);
      count.textContent = String(Math.floor(p)).padStart(2, '0') + '%';
      if (p >= 100) { clearInterval(tick); setTimeout(() => pre.classList.add('done'), 250); }
    }, 85);
  }

  /* ---------- hero tagline rotator ---------- */
  const tagline = $('#heroTagline');
  const words = (data.heroWords && data.heroWords.length) ? data.heroWords : ['Short-Form Edits'];
  if (tagline && !reduced) {
    let wi = 0;
    setInterval(() => {
      wi = (wi + 1) % words.length;
      if (window.gsap) {
        gsap.to(tagline, { yPercent: -110, opacity: 0, duration: 0.45, ease: 'power2.in', onComplete: () => {
          tagline.textContent = words[wi];
          gsap.set(tagline, { yPercent: 110 });
          gsap.to(tagline, { yPercent: 0, opacity: 1, duration: 0.55, ease: 'power3.out' });
        } });
      } else {
        tagline.textContent = words[wi];
      }
    }, 2600);
  } else if (tagline) {
    tagline.textContent = words[0];
  }

  /* ---------- smooth scroll (Lenis) ---------- */
  let lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
    }
  }

  /* ---------- scroll reveals ---------- */
  const revealIO = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('revealed'); revealIO.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => revealIO.observe(el));

  /* ---------- counters ---------- */
  const counterIO = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count || 0;
    counterIO.unobserve(el);
    if (reduced) { el.textContent = target; return; }
    const t0 = performance.now(), dur = 1400;
    const step = t => {
      const k = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }), { threshold: 0.5 });
  $$('.counter').forEach(el => counterIO.observe(el));

  /* ---------- nav ---------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 30);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const burger = $('#burger'), menu = $('#mobileMenu');
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  $$('#mobileMenu a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open'); burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
  }));

  /* ---------- video modal ---------- */
  const modal = $('#modal'), player = $('#modalPlayer');
  const close = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); player.replaceChildren(); document.body.style.overflow = ''; };
  const open = card => {
    const src = (data.videos || {})[card.dataset.key] || {};
    $('#modalTitle').textContent = card.querySelector('h3').textContent;
    $('#modalCat').textContent = card.querySelector('.work-card__meta span').textContent;
    player.replaceChildren();
    let node;
    if (src.type === 'iframe') {
      node = document.createElement('iframe');
      node.src = src.url; node.title = $('#modalTitle').textContent;
      node.allow = 'autoplay; fullscreen; encrypted-media; picture-in-picture';
      node.allowFullscreen = true;
    } else {
      node = document.createElement('video');
      node.src = src.url || card.dataset.key; node.controls = true; node.playsInline = true;
    }
    player.append(node);
    modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  $$('.work-card').forEach(card => card.addEventListener('click', () => open(card)));
  $('.modal__close').addEventListener('click', close);
  $('.modal__backdrop').addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  /* ---------- GSAP: parallax thumbnails + staggered cards ---------- */
  if (window.gsap && window.ScrollTrigger && !reduced) {
    gsap.utils.toArray('[data-parallax] img').forEach(img => {
      gsap.fromTo(img, { yPercent: -6 }, {
        yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: img.closest('.work-card__media'), start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
    gsap.utils.toArray('.work-card').forEach((card, i) => {
      gsap.from(card, {
        y: 56, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        delay: (i % 3) * 0.09
      });
    });
    gsap.from('.hero__title', {
      y: 60, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 1.7
    });
    gsap.from('.hero__kicker, .hero__tagline, .hero__actions, .hero__scroll', {
      y: 26, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 2.0
    });
  }
})();