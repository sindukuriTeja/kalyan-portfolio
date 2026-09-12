/* ============================================================
   KALYAN — T-3 style animation engine
   preloader → Lenis smooth scroll → GSAP hero/scroll → cursor
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
  if (data.email) { email.textContent = data.email; email.href = `mailto:${data.email}`; }
  const socials = [data.socials?.instagram, data.socials?.youtube, data.socials?.linkedin];
  $$('.social').forEach((a, i) => { if (socials[i] && socials[i] !== '#') { a.href = socials[i]; a.target = '_blank'; a.rel = 'noopener'; } });
  const timeline = $('#timeline');
  if (timeline && Array.isArray(data.timeline)) {
    timeline.innerHTML = data.timeline.map(item =>
      `<article><span class="mono">${item.date}</span><div><h3>${item.title}</h3><h4>${item.org}</h4><p>${item.desc}</p><div class="timeline__tags">${(item.tags || []).map(t => `<b>${t}</b>`).join('')}</div></div></article>`
    ).join('');
  }

  /* ---------- preloader ---------- */
  const pre = $('#preloader'), count = $('#preloaderCount');
  if (reduced) { pre.classList.add('done'); }
  else {
    let p = 0;
    const tick = setInterval(() => {
      p = Math.min(100, p + Math.random() * 14 + 5);
      count.textContent = String(Math.floor(p)).padStart(2, '0');
      if (p >= 100) { clearInterval(tick); setTimeout(() => pre.classList.add('done'), 200); }
    }, 80);
  }

  /* ---------- smooth scroll (Lenis) ---------- */
  let lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
    }
  }

  /* ---------- hero title: masked word/char reveal ---------- */
  const title = $('#heroTitle');
  if (title && !reduced) {
    const words = title.textContent.trim().split(/\s+/);
    title.innerHTML = words.map(w =>
      `<span class="word">${[...w].map(c => `<span class="char">${c}</span>`).join('')}</span>`
    ).join(' ');
    if (window.gsap) {
      gsap.from('.hero__title .char', {
        yPercent: 115, duration: 1.1, ease: 'power4.out', stagger: 0.028, delay: 0.55
      });
      gsap.from('.hero__eyebrow, .hero__copy, .hero__stack, .hero__scroll', {
        y: 24, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 1.1
      });
    }
  }

  /* ---------- scroll reveals ---------- */
  const revealIO = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('revealed'); revealIO.unobserve(e.target); }
  }), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => revealIO.observe(el));

  /* ---------- counters ---------- */
  const counterIO = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count || 0;
    counterIO.unobserve(el);
    if (reduced) { el.textContent = target; return; }
    const t0 = performance.now(), dur = 1300;
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
    $('#modalCat').textContent = card.querySelector('.work-card__tags').textContent;
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

  /* ---------- custom cursor ---------- */
  const cursor = $('#cursor');
  if (!reduced && matchMedia('(hover:hover) and (pointer:fine)').matches && cursor) {
    let x = -100, y = -100, rx = -100, ry = -100;
    addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; }, { passive: true });
    (function loop() {
      rx += (x - rx) * 0.2; ry += (y - ry) * 0.2;
      cursor.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', e => { if (e.target.closest('a,button,[data-hover]')) cursor.classList.add('is-hover'); });
    document.addEventListener('mouseout', e => { if (e.target.closest('a,button,[data-hover]')) cursor.classList.remove('is-hover'); });
  }

  /* ---------- scroll-driven accents (GSAP) ---------- */
  if (window.gsap && window.ScrollTrigger && !reduced) {
    gsap.utils.toArray('.work-card').forEach((card, i) => {
      gsap.from(card, {
        y: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        delay: (i % 3) * 0.08
      });
    });
    gsap.to('.marquee__track', {
      xPercent: -8, ease: 'none',
      scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: true }
    });
  }
})();