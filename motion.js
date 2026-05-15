/* ============================================================
   RoomenAI · Salon edition · Motion
   Reveal · Magnet · Tilt · Spotlight · Parallax · Counter
   Cursor blob · Nav · Compare · Style morph · Chat typing
   Budget slider · Word reveal · Hero tilt
   ============================================================ */

(() => {
  // -----------------------------------------------------------------
  // Cursor blob
  // -----------------------------------------------------------------
  const blob = document.querySelector('.cursor-blob');
  if (blob) {
    let tx = 0, ty = 0, x = 0, y = 0;
    document.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
    function loop() {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      blob.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    }
    loop();
  }

  // -----------------------------------------------------------------
  // Magnet, tilt, spotlight
  // -----------------------------------------------------------------
  function bindMagnet(el, strength) {
    const s = parseFloat(strength) || 0.18;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const xx = e.clientX - r.left - r.width / 2;
      const yy = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${xx * s}px, ${yy * s}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  }
  document.querySelectorAll('[data-magnet]').forEach(b => bindMagnet(b, b.dataset.magnet));
  document.querySelectorAll('.btn-primary.btn-lg:not([data-magnet])').forEach(b => bindMagnet(b, 0.18));

  function bindTilt(el, max) {
    const m = parseFloat(max) || 4;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const ry = (px - 0.5) * m * 2;
      const rx = -(py - 0.5) * m * 2;
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  }
  document.querySelectorAll('[data-tilt]').forEach(c => bindTilt(c, c.dataset.tilt));

  function bindSpotlight(el) {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  }
  document.querySelectorAll('[data-spotlight], .process-col, .tech-cell, .plan').forEach(bindSpotlight);

  // -----------------------------------------------------------------
  // Parallax
  // -----------------------------------------------------------------
  const parallaxEls = [...document.querySelectorAll('[data-parallax]')];
  let parallaxTicking = false;
  function applyParallax() {
    const winH = window.innerHeight;
    parallaxEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2;
      const offset = (center - winH / 2) / winH;
      const speed = parseFloat(el.dataset.parallax || '0.15');
      el.style.translate = `0 ${(-offset * speed * 100).toFixed(2)}px`;
    });
    parallaxTicking = false;
  }
  window.addEventListener('scroll', () => {
    if (!parallaxTicking) { requestAnimationFrame(applyParallax); parallaxTicking = true; }
  }, { passive: true });
  applyParallax();

  // -----------------------------------------------------------------
  // Reveal on scroll
  // -----------------------------------------------------------------
  const revealEls = [...document.querySelectorAll(
    '[data-reveal], [data-reveal-fade], [data-reveal-img], [data-reveal-line], [data-reveal-stagger], [data-stagger]'
  )];
  function primeReveals() {
    const winH = window.innerHeight;
    const trigger = winH * 0.88;
    revealEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top >= trigger) { el.classList.add('is-ready'); el.classList.remove('is-in'); }
      else                   { el.classList.remove('is-ready'); el.classList.add('is-in'); }
    });
    document.body.offsetHeight;
  }
  function checkReveals() {
    const winH = window.innerHeight;
    const trigger = winH * 0.88;
    revealEls.forEach((el) => {
      if (el.classList.contains('is-in') && !el.classList.contains('is-ready')) return;
      const r = el.getBoundingClientRect();
      if (r.top < trigger && r.bottom > 0) {
        const delay = parseInt(el.dataset.revealDelay || '0', 10);
        setTimeout(() => { el.classList.remove('is-ready'); el.classList.add('is-in'); }, delay);
      }
    });
  }
  primeReveals();
  window.addEventListener('scroll', checkReveals, { passive: true });
  window.addEventListener('resize', checkReveals);

  // -----------------------------------------------------------------
  // Nav scrolled
  // -----------------------------------------------------------------
  const nav = document.querySelector('.nav');
  function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 12); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // -----------------------------------------------------------------
  // Counter
  // -----------------------------------------------------------------
  const counterEls = [...document.querySelectorAll('[data-count]')];
  const firedCount = new WeakSet();
  function runCounter(el) {
    if (firedCount.has(el)) return;
    firedCount.add(el);
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const dur = parseInt(el.dataset.dur || '2200', 10);
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 4);
      const val = target * eased;
      el.textContent = prefix + val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function checkCounters() {
    const winH = window.innerHeight;
    counterEls.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < winH * 0.85 && r.bottom > 0) runCounter(el);
    });
  }
  checkCounters();
  window.addEventListener('scroll', checkCounters, { passive: true });

  // -----------------------------------------------------------------
  // FAQ
  // -----------------------------------------------------------------
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const a = item.querySelector('.faq-a');
      const open = item.classList.toggle('open');
      a.style.maxHeight = open ? a.scrollHeight + 'px' : '0';
    });
  });

  // -----------------------------------------------------------------
  // Compare slider
  // -----------------------------------------------------------------
  document.querySelectorAll('[data-compare]').forEach((el) => {
    const handle = el.querySelector('.cmp-handle');
    if (!handle) return;
    let dragging = false;
    function setPos(clientX) {
      const r = el.getBoundingClientRect();
      const x = Math.max(0.04, Math.min(0.96, (clientX - r.left) / r.width));
      el.style.setProperty('--cmp', (x * 100) + '%');
    }
    const start = (e) => { dragging = true; setPos((e.touches ? e.touches[0] : e).clientX); e.preventDefault(); };
    const move  = (e) => { if (!dragging) return; setPos((e.touches ? e.touches[0] : e).clientX); };
    const end   = () => { dragging = false; };
    handle.addEventListener('mousedown', start);
    handle.addEventListener('touchstart', start, { passive: false });
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('mouseup', end);
    window.addEventListener('touchend', end);
    let cmpStarted = false;
    function maybeAnimCompare() {
      if (cmpStarted) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.7 && r.bottom > 0) {
        cmpStarted = true;
        let s = null;
        function anim(t) {
          if (!s) s = t;
          const p = Math.min(1, (t - s) / 2400);
          const eased = 0.5 - 0.5 * Math.cos(Math.PI * p);
          const pos = 15 + eased * 70;
          el.style.setProperty('--cmp', pos + '%');
          if (p < 1) requestAnimationFrame(anim);
          else el.style.setProperty('--cmp', '52%');
        }
        requestAnimationFrame(anim);
      }
    }
    window.addEventListener('scroll', maybeAnimCompare, { passive: true });
    maybeAnimCompare();
  });

  // -----------------------------------------------------------------
  // data-words — italic-friendly word reveal
  // -----------------------------------------------------------------
  document.querySelectorAll('[data-words]').forEach((el) => {
    // skip elements that contain HTML already
    if (el.children.length > 0) return;
    const text = el.textContent;
    el.textContent = '';
    text.split(/(\s+)/).forEach((chunk, i) => {
      if (/^\s+$/.test(chunk)) { el.appendChild(document.createTextNode(chunk)); return; }
      const wrap = document.createElement('span');
      wrap.className = 'dw-word';
      const inner = document.createElement('span');
      inner.className = 'dw-inner';
      inner.textContent = chunk;
      wrap.appendChild(inner);
      el.appendChild(wrap);
      setTimeout(() => wrap.classList.add('in'), 220 + i * 70);
    });
  });

  // -----------------------------------------------------------------
  // STYLE MORPH — hero MacBook
  // .scene-room with multiple .scene-bg layers + .scene-chip buttons
  // -----------------------------------------------------------------
  document.querySelectorAll('[data-scene-room]').forEach((room) => {
    const chips = room.parentElement.querySelectorAll('[data-scene-chip]');
    const bgs = room.querySelectorAll('.scene-bg');
    const cap = room.querySelector('.scene-cap');
    const captions = {
      scandi: ['Scandinavian', 'Six pieces · $1,488', 'Linen sofa · oak floor lamp'],
      moss:   ['Moss garden',  'Eight pieces · $1,940', 'Boucle chair · travertine bowl'],
      terra:  ['Terra earth',  'Five pieces · $1,124', 'Rattan lounger · ceramic vase'],
      boho:   ['Boho desert',  'Seven pieces · $1,672', 'Wool kilim · macramé sconce'],
    };
    let auto = null;
    function setStyle(key) {
      chips.forEach(c => c.classList.toggle('on', c.dataset.sceneChip === key));
      bgs.forEach(b => b.classList.toggle('on', b.dataset.sceneBg === key));
      if (cap && captions[key]) {
        cap.querySelector('.ttl').innerHTML = `<em>${captions[key][0]}</em>`;
        cap.querySelector('.sub-1').textContent = captions[key][1];
        cap.querySelector('.sub-2').textContent = captions[key][2];
      }
    }
    chips.forEach(c => c.addEventListener('click', () => {
      clearInterval(auto); auto = null;
      setStyle(c.dataset.sceneChip);
    }));
    // auto-cycle until user interacts
    const order = ['scandi','moss','terra','boho'];
    let i = 0;
    auto = setInterval(() => { i = (i + 1) % order.length; setStyle(order[i]); }, 4200);
  });

  // -----------------------------------------------------------------
  // CHAT DEMO — typing animation
  // .chat-demo with scripted messages
  // -----------------------------------------------------------------
  document.querySelectorAll('[data-chat]').forEach((el) => {
    const script = [
      { who: 'you',  text: 'Less beige.' },
      { who: 'them', text: 'Toned it down — softer cream, deeper oak.', delay: 1600 },
      { who: 'them', text: 'Total dropped to $1,189.', delay: 700 },
      { who: 'you',  text: 'Add a reading nook by the window.' },
      { who: 'them', text: 'Slotted a boucle chair + brass sconce.', delay: 1800 },
      { who: 'you',  text: 'Make the rug greener.' },
      { who: 'them', text: 'Olive wool, 8 × 10. Saved $42.', delay: 1500 },
    ];
    let started = false;
    function start() {
      if (started) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.85 && r.bottom > 0) {
        started = true;
        let i = 0;
        async function tick() {
          for (let k = 0; k < script.length; k++) {
            const m = script[k];
            await wait(m.delay || 900);
            if (m.who === 'them') {
              const dots = bubble(el, 'them typing', '<span></span><span></span><span></span>');
              await wait(900);
              dots.remove();
              await typeBubble(el, 'them', m.text);
            } else {
              await typeBubble(el, 'you', m.text);
            }
            el.scrollTop = el.scrollHeight;
          }
        }
        tick();
      }
    }
    window.addEventListener('scroll', start, { passive: true });
    start();
  });
  function wait(ms) { return new Promise(r => setTimeout(r, ms)); }
  function bubble(host, klass, html) {
    const b = document.createElement('div');
    b.className = 'chat-bubble ' + klass;
    b.innerHTML = html;
    host.appendChild(b);
    return b;
  }
  async function typeBubble(host, who, text) {
    const b = bubble(host, who, '');
    for (let i = 0; i < text.length; i++) {
      b.textContent = text.slice(0, i + 1);
      host.scrollTop = host.scrollHeight;
      await wait(18 + Math.random() * 30);
    }
  }

  // -----------------------------------------------------------------
  // BUDGET SLIDER — live demo
  // -----------------------------------------------------------------
  document.querySelectorAll('[data-budget]').forEach((root) => {
    const track  = root.querySelector('.b-track');
    const fill   = root.querySelector('.b-fill');
    const knob   = root.querySelector('.b-knob');
    const numEl  = root.querySelector('[data-budget-num]');
    const piecesEl = root.querySelector('[data-budget-pieces]');
    const items  = root.querySelectorAll('.b-item');
    if (!track || !knob) return;
    const min = parseFloat(root.dataset.min || '300');
    const max = parseFloat(root.dataset.max || '6000');
    let value = parseFloat(root.dataset.start || '1500');

    function setValue(v) {
      value = Math.max(min, Math.min(max, v));
      const pct = (Math.log(value) - Math.log(min)) / (Math.log(max) - Math.log(min));
      fill.style.width = (pct * 100) + '%';
      knob.style.left = (pct * 100) + '%';
      if (numEl) numEl.textContent = '$' + Math.round(value).toLocaleString();
      // show/hide items based on value
      let count = 0;
      items.forEach(it => {
        const thresh = parseFloat(it.dataset.threshold || '0');
        const on = value >= thresh;
        it.classList.toggle('on', on);
        if (on) count++;
      });
      if (piecesEl) piecesEl.textContent = count + ' pieces';
    }
    setValue(value);

    let dragging = false;
    function setFromX(clientX) {
      const r = track.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
      const v = Math.exp(Math.log(min) + pct * (Math.log(max) - Math.log(min)));
      setValue(v);
    }
    track.addEventListener('mousedown', (e) => { dragging = true; setFromX(e.clientX); });
    knob.addEventListener('mousedown',  (e) => { dragging = true; e.stopPropagation(); });
    window.addEventListener('mousemove', (e) => { if (dragging) setFromX(e.clientX); });
    window.addEventListener('mouseup', () => { dragging = false; });
    track.addEventListener('touchstart', (e) => { dragging = true; setFromX(e.touches[0].clientX); e.preventDefault(); }, { passive: false });
    window.addEventListener('touchmove',  (e) => { if (dragging) setFromX(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchend',   () => { dragging = false; });

    // auto-animate on first reveal
    let demoStarted = false;
    function maybeDemo() {
      if (demoStarted) return;
      const r = root.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.8 && r.bottom > 0) {
        demoStarted = true;
        const targets = [800, 1200, 2200, 3800, 1500];
        let i = 0;
        function step() {
          if (i >= targets.length) return;
          const from = value;
          const to = targets[i++];
          const t0 = performance.now();
          const dur = 1500;
          function frame(now) {
            const t = Math.min(1, (now - t0) / dur);
            const e = 0.5 - 0.5 * Math.cos(Math.PI * t);
            setValue(from + (to - from) * e);
            if (t < 1) requestAnimationFrame(frame);
            else setTimeout(step, 700);
          }
          requestAnimationFrame(frame);
        }
        step();
      }
    }
    window.addEventListener('scroll', maybeDemo, { passive: true });
    maybeDemo();
  });

})();
