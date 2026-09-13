/* ============================================================
   KALYAN — FTI Agency animation engine
   Replicates the exact GSAP/SplitType patterns from ftiagency.com:
   1. [animate] sections  -> SplitType words, opacity scrub
   2. hero scroller-text  -> chars explode in, scrubbed over 100vh
   3. contact scroller-text -> chars explode in, plays once at top 80%
   4. sticky-item cards   -> scale(0.95) when next card overlaps
   5. header              -> IntersectionObserver adds .header-colored
   6. menu-button         -> .show / .active toggles
   ============================================================ */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const data = window.PORTFOLIO_DATA || {};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  const hasSplit = !!window.SplitType;

  /* ---------- content hydration (data.js = source of truth) ---------- */
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

  /* ---------- no-JS-libs / reduced-motion fallback: show everything ---------- */
  const showAll = () => {
    $$('.start-hidden').forEach(el => el.classList.remove('start-hidden'));
    $$('.hero-actions').forEach(el => el.style.opacity = '1');
    $$('.benefit-wrap').forEach(el => el.style.opacity = '1');
    const h = $('#header'); if (h) h.style.opacity = '1';
  };
  if (reduced || !hasGsap) { showAll(); }

  /* ---------- hero background video: respect reduced motion ---------- */
  const heroBgVideo = $('.hero-bg-video');
  if (heroBgVideo) {
    if (reduced) {
      heroBgVideo.pause();
      heroBgVideo.removeAttribute('autoplay');
    } else {
      const p = heroBgVideo.play();
      if (p && p.catch) p.catch(() => { /* autoplay blocked: poster stays visible */ });
    }
  }

  /* ---------- [1] word-scrub on [animate] sections (FTI script 11) ---------- */
  if (!reduced && hasGsap && hasSplit) {
    gsap.registerPlugin(ScrollTrigger);

    let typeSplit = new SplitType('[animate]', { types: 'words', tagName: 'span' });
    const sections = gsap.utils.toArray('[animate]');
    sections.forEach(section => {
      gsap.from(section.querySelectorAll('.word'), {
        opacity: 0.4,
        duration: 0.2,
        ease: 'none.out',
        stagger: 0.1,
        scrollTrigger: { trigger: section, start: 'top center', end: 'bottom center', scrub: true }
      });
    });

    /* ---------- [2] HERO char explosion (FTI script 12) ---------- */
    const heroText = $('#heroText');
    if (heroText) {
      try { SplitType.revert(heroText); } catch (e) {}
      const splitHero = new SplitType(heroText, { types: 'words, chars', tagName: 'span' });
      const charsHero = splitHero.chars || heroText.querySelectorAll('.char');
      const tlHero = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: () => `+=${window.innerHeight * 1}`,
          scrub: 0.5,
          pin: false
        }
      });
      tlHero.fromTo(charsHero,
        {
          rotateY: () => Math.random() * 180 + 180,
          yPercent: () => Math.random() * 100 - 50,
          xPercent: () => Math.random() * 100 - 50,
          scale: 0
        },
        {
          rotateY: 0, yPercent: 0, xPercent: 0, scale: 1,
          stagger: { amount: 0.5, from: 'random' }
        }
      );
      heroText.classList.remove('start-hidden');

      /* hero sub + buttons + scroll icon + header fade in after the title assembles */
      gsap.fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.9 });
      gsap.fromTo('.hero-actions', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.15 });
      gsap.fromTo('.scroll-icon', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 1.4 });
      gsap.fromTo('#header', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 1.2 });
    }

    /* ---------- [3] CONTACT char explosion, plays once (FTI script 12) ---------- */
    const contactText = $('#contactText');
    if (contactText) {
      try { SplitType.revert(contactText); } catch (e) {}
      const splitContact = new SplitType(contactText, { types: 'words, chars', tagName: 'span' });
      const charsContact = splitContact.chars || contactText.querySelectorAll('.char');
      const tlContact = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
      tlContact.fromTo(charsContact,
        {
          rotateY: () => Math.random() * 180 + 180,
          yPercent: () => Math.random() * 100 - 50,
          xPercent: () => Math.random() * 100 - 50,
          scale: 0
        },
        {
          rotateY: 0, yPercent: 0, xPercent: 0, scale: 1,
          stagger: { amount: 1, from: 'random' }
        }
      );
      contactText.classList.remove('start-hidden');
      gsap.fromTo('.contact-sub, .contact-email, .contact-socials',
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15, delay: 0.5 }
      );
    }

    /* ---------- about lede + copy + benefits reveal ---------- */
    gsap.fromTo('.about-lede', { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-grid', start: 'top 80%', once: true }
    });
    gsap.fromTo('.about-copy p', { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15,
      scrollTrigger: { trigger: '.about-grid', start: 'top 75%', once: true }
    });
    $$('.benefit-wrap').forEach((b, i) => {
      gsap.fromTo(b, { opacity: 0, y: 44 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.1,
        scrollTrigger: { trigger: '.benefits', start: 'top 82%', once: true }
      });
    });

    /* ---------- services rows reveal ---------- */
    gsap.fromTo('.service-wrap', { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: '.services-list', start: 'top 80%', once: true }
    });

    /* ---------- timeline rows reveal ---------- */
    gsap.fromTo('.timeline article', { opacity: 0, y: 34 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: '.timeline', start: 'top 80%', once: true }
    });

    /* ---------- [4] sticky project cards scale (FTI script 18) ---------- */
    const cards = $$('.sticky-item');
    const minScale = 0.95;
    cards.forEach((card, i) => {
      card.style.zIndex = i + 1;
      card.style.transform = 'scale(1)';
    });
    const updateCards = () => {
      cards.forEach((card, i) => {
        const nextCard = cards[i + 1];
        if (!nextCard) return;
        const rect = card.getBoundingClientRect();
        const nextRect = nextCard.getBoundingClientRect();
        if (nextRect.top < rect.bottom) {
          card.style.transform = `scale(${minScale})`;
        } else {
          card.style.transform = 'scale(1)';
        }
      });
    };
    updateCards();
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => { updateCards(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });

    /* ---------- counters ---------- */
    $$('.counter').forEach(el => {
      const target = +el.dataset.count || 0;
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: () => {
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target, duration: 1.4, ease: 'power2.out',
            onUpdate: () => { el.textContent = Math.round(obj.v); }
          });
        }
      });
    });

    /* ---------- smooth scroll (Lenis) ---------- */
    if (window.Lenis) {
      const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      lenis.on('scroll', ScrollTrigger.update);
    }
  } else if (hasGsap && !reduced) {
    gsap.registerPlugin(ScrollTrigger);
    /* SplitType missing: simple char fallback for hero/contact */
    $$('.scroller-text.start-hidden h1').forEach(h => {
      const chars = h.textContent.split('').map(c => `<span class="char">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
      h.innerHTML = chars;
      h.parentElement.classList.remove('start-hidden');
      gsap.fromTo(h.querySelectorAll('.char'), { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.02,
        scrollTrigger: { trigger: h.closest('section'), start: 'top 75%', once: true }
      });
    });
    $$('.benefit-wrap').forEach((b, i) => {
      gsap.fromTo(b, { opacity: 0, y: 44 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.1,
        scrollTrigger: { trigger: '.benefits', start: 'top 82%', once: true }
      });
    });
    $$('.counter').forEach(el => {
      const target = +el.dataset.count || 0;
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: () => {
          const obj = { v: 0 };
          gsap.to(obj, { v: target, duration: 1.4, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(obj.v); } });
        }
      });
    });
  }

  /* ---------- [5] header color on scroll (FTI script 14) ---------- */
  const header = $('#header'), hero = $('#hero');
  if (header && hero) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) header.classList.remove('header-colored');
        else header.classList.add('header-colored');
      });
    }, { threshold: 0, rootMargin: '-100px 0px 0px 0px' });
    observer.observe(hero);
  }

  /* ---------- [6] menu (FTI script 17) ---------- */
  const menuButton = $('#menuButton'), menuWrap = $('#menuWrap');
  const navLinks = $$('.menu-link');
  function openMenu() { menuWrap.classList.add('show'); menuButton.classList.add('active'); menuButton.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { menuWrap.classList.remove('show'); menuButton.classList.remove('active'); menuButton.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }
  menuButton.addEventListener('click', () => menuWrap.classList.contains('show') ? closeMenu() : openMenu());
  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  /* ---------- video modal ---------- */
  const modal = $('#modal'), player = $('#modalPlayer');
  const close = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); player.replaceChildren(); document.body.style.overflow = ''; };
  const open = card => {
    const src = (data.videos || {})[card.dataset.key] || {};
    $('#modalTitle').textContent = card.querySelector('.card-heading').textContent;
    const tags = card.querySelector('.tags-wrap');
    $('#modalCat').textContent = tags ? [...tags.children].map(t => t.textContent).join(' · ') : '';
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
  $$('.project-wrap').forEach(card => card.addEventListener('click', e => { e.preventDefault(); open(card); }));
  $('.modal__close').addEventListener('click', close);
  $('.modal__backdrop').addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();