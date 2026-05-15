/* ============================================================
   RoomAI — shared motion library
   Vanilla JS — IntersectionObserver, parallax, cursor, counters
   ============================================================ */

(function () {
  'use strict';

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.revealDelay || '0', 10);
        setTimeout(() => e.target.classList.add('is-in'), delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  revealEls.forEach((el) => io.observe(el));

  // ---------- Word-reveal (hero) ----------
  document.querySelectorAll('[data-words]').forEach((el) => {
    const txt = el.textContent;
    el.textContent = '';
    txt.split(' ').forEach((w, i) => {
      const span = document.createElement('span');
      span.className = 'word-reveal';
      span.style.transitionDelay = (i * 70) + 'ms';
      const inner = document.createElement('span');
      inner.textContent = w;
      inner.style.transitionDelay = (i * 70) + 'ms';
      span.appendChild(inner);
      el.appendChild(span);
      el.appendChild(document.createTextNode(' '));
    });
    requestAnimationFrame(() => {
      el.querySelectorAll('.word-reveal').forEach((w) => w.classList.add('is-in'));
    });
  });

  // ---------- Nav scrolled state ----------
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScrollNav = () => {
      if (window.scrollY > 8) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScrollNav();
    window.addEventListener('scroll', onScrollNav, { passive: true });
  }

  // ---------- Parallax (data-parallax="0.2") ----------
  const parallaxEls = [...document.querySelectorAll('[data-parallax]')];
  let lastScrollY = window.scrollY;
  let parallaxTicking = false;

  function applyParallax() {
    const winH = window.innerHeight;
    parallaxEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (center - winH / 2) / winH; // -ish range -1..1
      const speed = parseFloat(el.dataset.parallax || '0.15');
      el.style.transform = `translate3d(0, ${(-offset * speed * 100).toFixed(2)}px, 0)`;
    });
    parallaxTicking = false;
  }

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!parallaxTicking) {
      requestAnimationFrame(applyParallax);
      parallaxTicking = true;
    }
  }, { passive: true });
  applyParallax();

  // ---------- Cursor blob ----------
  const blob = document.querySelector('.cursor-blob');
  if (blob && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let bx = mx, by = my;
    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
    function loop() {
      bx += (mx - bx) * 0.12;
      by += (my - by) * 0.12;
      blob.style.transform = `translate3d(${bx}px, ${by}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    }
    loop();
  }

  // ---------- Counter animation ----------
  const counters = document.querySelectorAll('[data-count]');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const dur = parseInt(el.dataset.dur || '1800', 10);
      const start = performance.now();
      function step(now) {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 4);
        const val = target * eased;
        el.textContent = prefix + val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach((c) => counterIO.observe(c));

  // ---------- Magnet on hover ----------
  document.querySelectorAll('[data-magnet]').forEach((el) => {
    const strength = parseFloat(el.dataset.magnet || '0.25');
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // ---------- Tilt cards (3D) ----------
  document.querySelectorAll('[data-tilt]').forEach((el) => {
    const max = parseFloat(el.dataset.tilt || '6');
    el.style.transformStyle = 'preserve-3d';
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const ry = (px - 0.5) * max * 2;
      const rx = -(py - 0.5) * max * 2;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
    });
  });

  // ---------- Spotlight cards (mouse-tracked) ----------
  document.querySelectorAll('[data-spotlight]').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--spot-x', ((e.clientX - r.left) / r.width * 100) + '%');
      el.style.setProperty('--spot-y', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  // ---------- Marquee duplicate ----------
  document.querySelectorAll('[data-marquee]').forEach((el) => {
    el.innerHTML = el.innerHTML + el.innerHTML;
  });

  // ---------- Before/after slider ----------
  document.querySelectorAll('[data-compare]').forEach((el) => {
    const handle = el.querySelector('.cmp-handle');
    const top = el.querySelector('.cmp-top');
    let dragging = false;
    function setPos(clientX) {
      const r = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
      el.style.setProperty('--cmp', (x * 100) + '%');
    }
    const startDrag = (e) => {
      dragging = true;
      el.classList.add('dragging');
      setPos((e.touches ? e.touches[0] : e).clientX);
      e.preventDefault();
    };
    const onMove = (e) => {
      if (!dragging) return;
      setPos((e.touches ? e.touches[0] : e).clientX);
    };
    const endDrag = () => { dragging = false; el.classList.remove('dragging'); };
    handle.addEventListener('mousedown', startDrag);
    handle.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);

    // Auto-animate on first reveal
    const onReveal = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        let start = null;
        function anim(t) {
          if (!start) start = t;
          const p = Math.min(1, (t - start) / 2200);
          const eased = 0.5 - 0.5 * Math.cos(Math.PI * p);
          const pos = 12 + eased * 76; // 12% to 88%
          el.style.setProperty('--cmp', pos + '%');
          if (p < 1) requestAnimationFrame(anim);
          else el.style.setProperty('--cmp', '50%');
        }
        requestAnimationFrame(anim);
        onReveal.unobserve(el);
      });
    }, { threshold: 0.5 });
    onReveal.observe(el);
  });

  // ---------- Hero room visual: tilt on scroll ----------
  const heroVisual = document.querySelector('[data-hero-visual]');
  if (heroVisual) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      const rot = Math.min(8, y * 0.02);
      const scale = Math.max(0.92, 1 - y * 0.0003);
      heroVisual.style.transform = `perspective(1200px) rotateX(${rot}deg) scale(${scale})`;
    }, { passive: true });
  }

  // ---------- Page-load class ----------
  document.documentElement.classList.add('loaded');
})();
