// 020 «Пароль от базы спрятали в приложении. Кто нашёл?» — Новость, монолог предмета: рассказывает сам пароль (ключ с лицом).
// TechCrunch 30.10.2026. Короткий ролик теста длины: свой мир (ночная улица у бургерной), параллакс, наезды, прыжки, дуги, частицы.
boot(() => {
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
  const clamp = x => Math.max(0, Math.min(1, x));
  const place = (el, x, y, w, h) => { el.style.left = x + 'px'; el.style.top = y + 'px'; if (w) el.style.width = w + 'px'; if (h) el.style.height = h + 'px'; return el; };
  const easeIO = x => (x = clamp(x), x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const W = (k, i) => wt(k, i);
  const jump = (el, t, h = 80, d = 0.5, shd = null) => {
    tw(el, t - 0.12, 0.12, { sy: [1, 0.86], sx: [1, 1.08] }, 'out');
    tw(el, t, d / 2, { y: [0, -h], sy: [0.86, 1.08], sx: [1.08, 0.95] }, 'out');
    tw(el, t + d / 2, d / 2, { y: [-h, 0], sy: [1.08, 1], sx: [0.95, 1] }, 'in');
    tw(el, t + d, 0.08, { sy: [1, 0.88], sx: [1, 1.1] }, 'out'); tw(el, t + d + 0.08, 0.3, { sy: [0.88, 1], sx: [1.1, 1] }, 'back');
    if (shd) { tw(shd, t, d / 2, { s: [1, 0.6], o: [1, 0.5] }, 'out'); tw(shd, t + d / 2, d / 2, { s: [0.6, 1], o: [0.5, 1] }, 'in'); }
  };
  const arc = (el, t, d, dx, dy, h, rot = 0) => idle(el, tt => { if (tt < t) return {}; const u = easeIO((tt - t) / d); return { x: dx * u, y: dy * u - 4 * h * u * (1 - u), r: rot * u }; });
  const burst = (par, n, x, y, t, dist = 220, seed = 0, cls = 'spark', fall = 0) => {
    const cols = ['#ffd34d', '#ff4d5e', '#5fe0ff', '#b8ff3d', '#ffb84d'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.7, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.5, 0.25, { o: [1, 0] }, 'lin'); } };
  const ctr = el => { const r = (typeof el === 'string' ? $(el) : el).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };

  // ---------- world ----------
  $('#sky').innerHTML = `<div style="left:0;top:0;width:2400px;height:700px">${skylineSVG()}</div><div style="left:2400px;top:0;width:2400px;height:700px">${skylineSVG()}</div>`;
  $$('#sky > div').forEach(d => d.style.position = 'absolute');
  $('#diner').innerHTML = dinerSVG(); $('#street').innerHTML = streetSVG();
  dof('#sky', 3); dof('#diner', 1.4);
  lookFX({ grain: 0.12, tint: 'transparent' });

  // ---------- props ----------
  const buildA = (sc, s) => {
    $(sc + ' .a-ph').innerHTML = phonePropSVG('a' + s, appScreen('a' + s)); $(sc + ' .a-key').innerHTML = keyCharSVG('a' + s); $(sc + ' .a-db').innerHTML = dbSVG('a' + s); };
  buildA('#A', '');
  $('.b-ph').innerHTML = phonePropSVG('b', appScreen('b')); $('.b-key').innerHTML = keyCharSVG('b');
  const cps = []; for (let k = 0; k < 10; k++) { const c = mk('#B .cam', 'b-cp', phonePropSVG('bc' + k, `<g transform="translate(55 120) scale(.55)">${appIconSVG('bci' + k).replace(/<\/?svg[^>]*>/g, '')}</g>`));
    place(c, 90 + (k % 5) * 186, 480 + Math.floor(k / 5) * 270); cps.push(c); const g = mk(c, 'glow'); place(g, 25, 70, 80, 80); }
  $('.c-safe').innerHTML = safeSVG('c');
  const boxes = []; for (let k = 0; k < 4; k++) { const b = mk('#C .cam', 'c-bx', burgerBoxSVG('c' + k)); place(b, 30 + k * 262, 935); const kk = mk('#C .cam', 'c-k', keyCharSVG('ck' + k, false)); place(kk, 125 + k * 262, 850); boxes.push([b, kk]); }
  $('.d-safe').innerHTML = safeSVG('d'); $('.d-key').innerHTML = keyCharSVG('dk', false);
  $('.d-c1').innerHTML = dataCard('d1', 'name'); $('.d-c2').innerHTML = dataCard('d2', 'phone'); $('.d-c3').innerHTML = dataCard('d3', 'cake');
  $('.j-door').innerHTML = doorSVG('j'); $('.j-lock').innerHTML = padlockSVG('j'); $('.j-th').innerHTML = personSVG('jt', '#3a3f4f', '#1a1210'); $('.j-thm').innerHTML = maskSVG('jt', '#2a2a2a');
  $('.q-key').innerHTML = keyCharSVG('q'); $('.q-mag').innerHTML = magnifierSVG('q');
  $('.r-code').innerHTML = codeSVG('r'); $('.r-mag').innerHTML = magnifierSVG('r'); $('.r-key').innerHTML = keyCharSVG('r');
  $('.r-p').innerHTML = personSVG('rp', '#5f8cff', '#2a1c12'); $('.r-lap').innerHTML = laptopSVG('r'); $('.r-bot').innerHTML = botSVG('r', '#6ad1ff');
  $('.s-key').innerHTML = keyCharSVG('s'); $('.s-th').innerHTML = personSVG('st', '#3a3f4f', '#1a1210'); $('.s-thm').innerHTML = maskSVG('st', '#2a2a2a');
  $('.s-x').innerHTML = crossIcon('sxp'); $('.s-news').innerHTML = newsSVG('s');
  $('.h-ph').innerHTML = phonePropSVG('h', appScreen('h')); $('.h-hole').innerHTML = holeSVG(); $('.h-patch').innerHTML = patchSVG('h'); $('.h-ok').innerHTML = checkIcon('hok');
  $('.h-key').innerHTML = keyCharSVG('h'); $('.h-board').innerHTML = boardSVG(); $('.h-bell').innerHTML = bellSVG();
  const hc = ['name', 'phone', 'cake'].map((k, i) => { const c = mk('.h-cards', 'h-c', dataCard('hc' + i, k)); place(c, 1100, 560 + i * 200); return c; });
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  $('#A2').innerHTML = $('#A').innerHTML; ['.a-ph', '.a-key', '.a-db', '.a-m'].forEach(s => $('#A2 ' + s).innerHTML = ''); buildA('#A2', '2'); $('#A2 .a-m').innerHTML = mascotSVG('a2m');
  mascotLife(); mascotTalk();
  // the password is the narrator: every key with a face talks with the voice; the mascot keeps its mouth shut and acts
  $$('.m').forEach(m => mascotQuiet(m, 0, TOTAL + 1));
  $$('.kmouth').forEach(m => idle(m, t => { const a = clamp((venv(t) - 0.07) / 0.55); return { sy: 0.88 * Math.pow(a, 0.8) }; }));
  $$('.kbrow').forEach(b => idle(b, t => { const d = venv(t) - venv(t - 0.12); return { y: d > 0.18 ? -8 * Math.min(1, (d - 0.18) / 0.2) : 0 }; }));
  { const n = Math.max(1, Math.round(TOTAL / 2.9)), P = TOTAL / n;
    $$('.keye').forEach((e, i) => idle(e, t => { if (t < 0.6 || t > TOTAL - 0.8) return {}; const u = (t + hash(i * 2.3) * P) % P; return { sy: u < 0.18 ? 1 - 0.9 * Math.sin(Math.PI * u / 0.18) : 1 }; })); }

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('b1'), tC = cut('c1'), tD = cut('d1'), tJ = cut('j1'), tQ = cut('q1'), tR = cut('r1'), tS = cut('r2'), tH = cut('v1'), tLoop = TOTAL - 0.8;
  const CUTS = [0, tB, tC, tD, tJ, tQ, tR, tS, tH], IDS = ['#A', '#B', '#C', '#D', '#J', '#Q', '#R', '#S', '#H'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 240 * easeIO((t - c + 0.35) / 0.7); }); x -= 1920 * easeIO((t - tLoop) / 0.6); return x; };
  custom(t => {
    const x = camX(t);
    $('#sky').style.transform = `translate(${(-(x * 0.12 + t * 6) % 2400).toFixed(1)}px,0)`;
    $('#diner').style.transform = `translate(${(-x * 0.45).toFixed(1)}px,0)`;
    $('#street').style.transform = `translate(${(-x * 0.95).toFixed(1)}px,0)`;
    $('#walk').style.transform = `translate(${(-(x * 1.0) % 240).toFixed(1)}px,0)`;
  });
  grade(0, 'transparent'); grade(tC, 'rgba(255,184,77,.10)'); grade(tD, 'rgba(95,180,255,.12)'); grade(tJ - 0.2, 'rgba(255,120,60,.28)');
  grade(tQ, 'rgba(40,20,80,.40)'); grade(tR, 'rgba(95,224,255,.12)'); grade(tS, 'rgba(255,184,77,.12)'); grade(tH, 'rgba(184,255,61,.12)'); grade(tLoop + 0.3, 'transparent');
  $$('.m').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2') && !m.closest('#J')) idle(m, t => ({ y: 6 * Math.sin(W2 * 16 * t + i), r: 1.4 * Math.sin(W2 * 8 * t + i) })); });
  const bob = (sel, k = 6, amp = 10) => idle(sel, t => ({ y: amp * Math.sin(W2 * k * 2 * t), r: 2.5 * Math.sin(W2 * k * t) }));
  bob('.a-key'); bob('.q-key', 7, 6); bob('.s-key', 6, 8); bob('.h-key', 5, 6);

  // ================= A: hook — «ПАРОЛЬ В ПРИЛОЖЕНИИ», the key steps out of the phone and speaks =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  hide('#A .a-db');
  punch('#A .a-t', W('hook', 0) + 0.02, 0.1);
  tw('#A .a-key .karmR', W('hook', 0), 0.3, { r: [0, -110] }, 'back'); tw('#A .a-key .karmR', W('hook', 0) + 0.32, 0.3, { r: [-110, -40] }, 'back');
  jump('#A .a-key', W('hook', 1) - 0.05, 60, 0.42); sfx('pop', W('hook', 1), 0.5);
  mascotPose('#A .a-m', W('hook', 0) + 0.2, 'shock');
  popIn('#A .a-db', W('hook', 3) - 0.05, 0.4); sfx('blip', W('hook', 3), 0.5);
  mascotPose('#A .a-m', W('hook', 3) + 0.05, 'pointUp');
  punch('#A .a-t2', W('hook', 4), 0.08);
  for (let k = 0; k < 4; k++) tw('#A .a-db', W('hook', 4) + 0.1 + k * 0.12, 0.06, { y: [0, -8] }, 'out');
  tw('#A .a-key .kpup', W('hook', 3), 0.2, { x: [0, 8], y: [0, -4] }, 'out');

  // ================= B: hidden in the app; downloaded more than a million times =================
  morphCut('#A', '#B', tB, '#A .a-ph', '.b-ph', 0.6);
  hide('.b-n'); hide('.b-u'); cps.forEach(c => hide(c));
  // «спрятали в приложение»: the key arcs down into the phone and shrinks into the screen
  { const [kx, ky] = ctr('.b-key'), [px, py] = ctr('.b-ph'); const t0 = W('b1', 1) - 0.05;
    tw('.b-key', 0, 0.001, { o: [0, 0] }); tw('.b-key', tB + 0.2, 0.15, { o: [0, 1] }, 'lin');
    tw('.b-key', t0, 0.6, { s: [1, 0.3] }, 'inOut'); arc('.b-key', t0, 0.6, px - kx, py - ky + 40, 120, 360);
    tw('.b-key', t0 + 0.55, 0.08, { o: [1, 0] }, 'lin'); sfx('whoosh', t0, 0.5);
    { const g = mk('#B .cam', 'glow'); place(g, px - 130, py - 130, 260, 260); const tg = t0 + 0.6, te = W('b1', 4);
      custom(t => { g.style.opacity = (t < tg || t > te + 0.3) ? 0 : (0.45 + 0.4 * Math.sin((t - tg) * 9)) * clamp((te + 0.3 - t) / 0.3); });
      idle('.b-ph', t => (t > tg && t < te) ? { r: 3 * Math.sin((t - tg) * 14) * Math.exp(-(t - tg) * 2) } : {});
      const lk = mk('#B .cam', 'b-lk', padlockSVG('blk')); place(lk, px - 50, py - 210, 100, 125); hide(lk); popIn(lk, tg + 0.2, 0.35); sfx('clink', tg + 0.25, 0.5);
      tw(lk, te - 0.1, 0.2, { o: [1, 0] }, 'in'); }
    mascotPose('.b-m', t0 + 0.7, 'think');
    punch('.b-ph', t0 + 0.6, 0.1); sfx('thud', t0 + 0.6, 0.6); burst('#B .cam', 10, px, py, t0 + 0.62, 200, 4, 'spark'); }
  mascotPose('.b-m', W('b1', 0), 'pointL'); mascotPose('.b-m', W('b1', 4), 'shock');
  // «его скачали больше миллиона раз»: the phone shrinks into the grid, copies pop in a wave, the counter runs
  const tCp = W('b1', 4) - 0.1;
  { const r = $('.b-ph').getBoundingClientRect(), c0 = cps[0].getBoundingClientRect();
    tw('.b-ph', tCp, 0.45, { x: [0, c0.left - r.left - (r.width - c0.width) / 2], y: [0, c0.top - r.top - (r.height - c0.height) / 2], s: [1, c0.width / r.width] }, 'inOut');
    tw('.b-ph', tCp + 0.45, 0.06, { o: [1, 0] }, 'lin'); }
  cps.forEach((c, k) => { const t = tCp + 0.4 + k * 0.08; popIn(c, t, 0.35, 0.2); sfx(k % 2 ? 'tick' : 'pop', t, 0.35); });
  cps.forEach((c, k) => idle(c, t => ({ y: t > tCp + 1 ? 5 * Math.sin(W2 * 20 * t + k) : 0 })));
  slideIn('.b-n', W('b1', 6) - 0.15, 'up', 0.5, 120); slideIn('.b-u', W('b1', 6), 'down', 0.5, 120);
  { const el = $('.bnum'), t0 = W('b1', 6) - 0.1, t1 = W('b1', 8) + 0.1;
    custom(t => { const p = clamp((t - t0) / (t1 - t0)), v = Math.round(1000000 * (1 - Math.pow(1 - p, 2.4)) / 1000) * 1000; el.textContent = (p >= 1 ? '1 000 000+' : v.toLocaleString('ru-RU').replace(/ /g, ' ')); }); }
  for (let k = 0; k < 8; k++) sfx('tick', W('b1', 6) + k * 0.1, 0.3);
  punch('.b-n', W('b1', 8) + 0.12, 0.12); sfx('ding', W('b1', 8) + 0.12, 0.6);
  focus('#B > .cam', W('b1', 7), 540, 700, 1.08, 0.5);
  mascotPose('.b-m', W('b1', 7), 'cheer'); jump('.b-m', W('b1', 7) + 0.05, 50, 0.4, '.b-shd');

  // ================= C: a key from the safe in every burger box =================
  tWhip('#B', '#C', tC);
  hide('.c-chip');
  slideIn('.c-chip', W('c1', 0), 'left', 0.6, 400); sfx('whoosh', W('c1', 0), 0.4);
  mascotPose('.c-m', W('c1', 0), 'point');
  // the conveyor: boxes ride in from the right, then stop in a row; each lid flips open on «каждую коробку», a key pops up
  const tBelt0 = tC + 0.1, tBelt1 = W('c1', 8);
  boxes.forEach(([b, kk], k) => {
    const x1 = 30 + k * 262, x0 = x1 + 1100;
    custom(t => { const u = easeIO((t - tBelt0) / (tBelt1 - tBelt0)); const x = x0 + (x1 - x0) * u; b.style.left = x + 'px'; kk.style.left = (x + 95) + 'px'; });
    hide(kk);
    const tO = W('c1', 9) + k * 0.15 - 0.1;
    tw(b.querySelector('.blid'), tO, 0.3, { r: [0, -75] }, 'back'); sfx('pop', tO + 0.1, 0.4);
    tw(kk, tO + 0.1, 0.08, { o: [0, 1] }, 'lin'); tw(kk, tO + 0.1, 0.45, { y: [150, 0], r: [0, -14 + 9 * k] }, 'back');
  });
  custom(t => { $('.c-belt').style.backgroundPosition = `${(-(Math.min(t, tBelt1) - tC) * 600).toFixed(0)}px 0`; });
  mascotPose('.c-m', W('c1', 4), 'pointUp'); jump('.c-m', W('c1', 4), 50, 0.4); punch('.c-chip', W('c1', 1), 0.08);
  tw('.c-safe .sdial', W('c1', 6), 0.5, { r: [0, 200] }, 'back'); sfx('tick', W('c1', 6), 0.4); sfx('tick', W('c1', 6) + 0.15, 0.4);
  punch('.c-safe', W('c1', 6), 0.08);
  mascotPose('.c-m', W('c1', 9), 'shock');
  focus('#C > .cam', W('c1', 10), 540, 900, 1.14, 0.5);

  // ================= D: the safe opens — names, phones, birthdays fly out =================
  morphCut('#C', '#D', tD, boxes[2][1], '.d-key', 0.6, 180);
  hide('.d-c1'); hide('.d-c2'); hide('.d-c3');
  tw('.d-key', W('d1', 1), 0.3, { r: [0, 90] }, 'back'); sfx('clink', W('d1', 1) + 0.1, 0.6);
  tw('.d-safe .sdial', W('d1', 1), 0.4, { r: [0, -160] }, 'back');
  tw('.d-safe .sdoor', W('d1', 2), 0.4, { sx: [1, 0.12] }, 'out'); tw('.d-key', W('d1', 2) + 0.12, 0.25, { o: [1, 0] }, 'in'); sfx('whoosh', W('d1', 2), 0.5);
  mascotPose('.d-m', W('d1', 0), 'pointL'); mascotPose('.d-m', W('d1', 2) + 0.1, 'shock');
  const [sx0, sy0] = ctr('.d-safe');
  [['.d-c1', W('d1', 3), 40, 210, -12], ['.d-c2', W('d1', 4), 405, 190, 5], ['.d-c3', W('d1', 5), 765, 210, 12]].forEach(([s, t, x, y, r], k) => {
    const el = $(s); place(el, x, y); const [cx, cy] = ctr(el);
    tw(el, t - 0.1, 0.08, { o: [0, 1] }, 'lin'); tw(el, t - 0.1, 0.5, { s: [0.3, 1] }, 'back');
    idle(el, tt => { if (tt < t - 0.1) return { x: sx0 - cx, y: sy0 - cy }; const u = easeIO((tt - t + 0.1) / 0.5); return { x: (sx0 - cx) * (1 - u), y: (sy0 - cy) * (1 - u) - 160 * Math.sin(Math.PI * u), r: r * u + (u >= 1 ? 2 * Math.sin(W2 * 14 * tt + k) : 0) }; });
    sfx('pop', t, 0.5); burst('#D .cam', 6, x + 135, y + 100, t + 0.4, 120, 20 + k, 'spark');
  });
  mascotPose('.d-m', W('d1', 4), 'pointUp'); mascotPose('.d-m', W('d1', 6), 'shock');
  focus('#D > .cam', W('d1', 6), 540, 300, 1.12, 0.45, 0.28, 0.4, 540, 420);

  // ================= J: joke — the lock is on, the key hangs on the handle; a thief just takes it =================
  tDrop('#D', '#J', tJ);
  hide('.j-th'); hide('.j-thm');
  hide('.j-lock');
  tw('.j-lock', W('j1', 0) - 0.05, 0.05, { o: [0, 1] }, 'lin'); tw('.j-lock', W('j1', 0) - 0.05, 0.35, { y: [-500, 0] }, 'in');
  tw('.j-lock', W('j1', 0) + 0.3, 0.3, { r: [0, -8], sy: [0.9, 1] }, 'back'); sfx('clink', W('j1', 0) + 0.3, 0.8); shake(W('j1', 0) + 0.3, 0.25, 10);
  tw('.j-lock .shackle', W('j1', 1), 0.2, { y: [-18, 0] }, 'in'); sfx('tick', W('j1', 1) + 0.2, 0.6);
  mascotPose('.j-m', W('j1', 0), 'pointL'); mascotPose('.j-m', W('j1', 1), 'cheer'); jump('.j-m', W('j1', 1), 60, 0.42, '.j-shd2');
  // «а ключ — на ручке»: the key on the handle swings; the camera pushes in on it
  idle('.j-door .dkey', t => ({ r: t > W('j1', 3) - 0.2 ? 14 * Math.sin((t - W('j1', 3)) * 6) * Math.exp(-(t - W('j1', 3)) * 0.6) : 0 }));
  tw('.j-door .dkey', W('j1', 3) - 0.1, 0.12, { s: [1, 1.15] }, 'out'); tw('.j-door .dkey', W('j1', 3) + 0.05, 0.3, { s: [1.15, 1] }, 'back'); sfx('clink', W('j1', 3), 0.5);
  focus('#J > .cam', W('j1', 3), 480, 880, 1.14, 0.75);
  mascotPose('.j-m', W('j1', 4) + 0.15, 'facepalm');
  // a masked thief slides in from the left, takes the key and tiptoes away
  const tTh = W('j1', 3) + 0.2;
  slideIn('.j-th', tTh, 'left', 0.45, 300); slideIn('.j-thm', tTh, 'left', 0.45, 300); sfx('whoosh', tTh, 0.4);
  tw('.j-th', tTh + 0.01, 0.4, { x: [-300, 520] }, 'out'); tw('.j-thm', tTh + 0.01, 0.4, { x: [-300, 520] }, 'out');
  tw('.j-th .parmR', tTh + 0.25, 0.2, { r: [0, -60] }, 'back');
  tw('.j-door .dkey', tTh + 0.45, 0.2, { o: [1, 0], y: [0, -40] }, 'in'); sfx('coin', tTh + 0.45, 0.6);
  tw('.j-th, .j-thm', tTh + 0.65, 0.4, { x: [520, -500] }, 'in');

  // ================= Q: «Кто меня нашёл?» — the key alone in a spotlight, a magnifier sweeps =================
  tCircle('#J', '#Q', tQ, 540, 680);
  hide('.q-mag');
  idle('.q-key', t => (t > tQ && t < tR) ? { x: 3 * Math.sin(t * 40) } : {});
  tw('.q-key .kpup', W('q1', 0), 0.2, { x: [0, -8] }, 'out'); tw('.q-key .kpup', W('q1', 2), 0.2, { x: [-8, 8] }, 'out');
  popIn('.q-mag', W('q1', 1) - 0.05, 0.3); arc('.q-mag', W('q1', 1), 0.7, -420, 120, 90, -20); sfx('whoosh', W('q1', 1), 0.5);
  for (let k = 0; k < 3; k++) { const q = mk('#Q .cam', 'qm'); q.textContent = '?'; place(q, 240 + k * 280, 270 + (k % 2) * 60); hide(q); popIn(q, W('q1', 0) + k * 0.15, 0.3); sfx('pop', W('q1', 0) + k * 0.15, 0.3); }
  mascotPose('.q-m', W('q1', 0), 'think');

  // ================= R: one researcher with an AI searching the code =================
  tZoom('#Q', '#R', tR);
  hide('.r-key'); hide('.r-chip');
  mascotPose('.r-m', W('r1', 0), 'pointUp');
  tw('.r-p .parmR', W('r1', 0), 0.3, { r: [0, -40] }, 'back');
  for (let k = 0; k < 6; k++) { tw('.r-p .parmL', W('r1', 0) + k * 0.16, 0.08, { r: [0, 10] }, 'out'); tw('.r-p .parmL', W('r1', 0) + k * 0.16 + 0.08, 0.08, { r: [10, 0] }, 'in'); sfx('tick', W('r1', 0) + k * 0.16, 0.25); }
  // the magnifier walks down the code lines
  { const pts = [[0, 0], [220, 0], [40, 90], [260, 90], [100, 130]]; const t0 = W('r1', 1) - 0.1, P = 0.28;
    idle('.r-mag', t => { if (t < t0) return {}; const u = Math.min(pts.length - 1, (t - t0) / P), i = Math.min(pts.length - 2, Math.floor(u)), f = easeIO(u - i); return { x: pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, y: pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f }; }); }
  // «с нейронкой»: the bot points, the line lights up, the password pops out of the code
  tw('.r-bot .barmL', W('r1', 2) - 0.1, 0.35, { r: [0, 70] }, 'back'); tw('.r-bot .bglow', W('r1', 2), 0.2, { o: [1, 0.3] }, 'lin');
  tw('.r-bot .bmouth', W('r1', 2), 0.15, { sy: [0.25, 0.9] }, 'out'); tw('.r-bot .bmouth', W('r1', 3) + 0.2, 0.2, { sy: [0.9, 0.25] }, 'out');
  slideIn('.r-chip', W('r1', 3) - 0.1, 'left', 0.55, 400); sfx('blip', W('r1', 3), 0.5);
  tw('.r-code .khl', W('r1', 3), 0.2, { o: [0, 0.45] }, 'lin'); sfx('ding', W('r1', 3) + 0.1, 0.6);
  tw('.r-key', W('r1', 3) + 0.15, 0.08, { o: [0, 1] }, 'lin'); tw('.r-key', W('r1', 3) + 0.15, 0.45, { y: [60, -40], s: [0.3, 1] }, 'back');
  burst('#R .cam', 10, 455, 420, W('r1', 3) + 0.2, 180, 31, 'spark');
  focus('#R > .cam', W('r1', 3), 540, 420, 1.14, 0.45, 0.28, 0.4, 540, 520);
  mascotPose('.r-m', W('r1', 3) + 0.1, 'cheer');

  // ================= S: and handed me not to thieves — to journalists =================
  morphCut('#R', '#S', tS, '.r-key', '.s-key', 0.55);
  hide('.s-x'); hide('.s-src');
  tw('.s-key', W('r2', 2), 0.3, { x: [0, -60], r: [0, -10] }, 'out');
  tw('.s-th .parmR', W('r2', 3), 0.3, { r: [0, -70] }, 'back');
  popIn('.s-x', W('r2', 4) - 0.05, 0.35); tw('.sxp', W('r2', 4) + 0.05, 0.25, { dash: [100, 0] }, 'out'); sfx('buzz', W('r2', 4), 0.5);
  tw('.s-th, .s-thm', W('r2', 4) + 0.15, 0.35, { sy: [1, 0.9], y: [0, 30] }, 'out'); tw('.s-th .parmR', W('r2', 4) + 0.15, 0.3, { r: [-70, 0] }, 'out');
  mascotPose('.s-m', W('r2', 3), 'shrug');
  // «а журналистам»: the key jumps along an arc to the newspaper, the source panel slides in
  { const [kx, ky] = ctr('.s-key'), [nx, ny] = ctr('.s-news'); const t0 = W('r2', 5);
    tw('.s-key', t0 - 0.02, 0.2, { x: [-60, -60], r: [-10, 10] }, 'out');
    arc('.s-key', t0, 0.55, nx - kx - 20, ny - ky - 60, 160, 10); tw('.s-key', t0, 0.55, { s: [1, 0.7] }, 'inOut'); sfx('whoosh', t0, 0.5);
    punch('.s-news', t0 + 0.55, 0.12); sfx('thud', t0 + 0.55, 0.5); burst('#S .cam', 14, nx, ny - 120, t0 + 0.58, 220, 41, 'conf', 60); }
  slideIn('.s-src', W('r2', 6), 'left', 0.6, 500);
  mascotPose('.s-m', W('r2', 6), 'pointUp'); jump('.s-m', W('r2', 6) + 0.1, 50, 0.4, '.s-shd3');

  // ================= H: the hole is patched, НЕ БАЙТ, takeaway, subscribe, loop =================
  tSlideUp('#S', '#H', tH);
  hide('.h-patch'); hide('.h-ok'); hide('.h-st'); hide('.h-sub'); hide('.h-chip'); hc.forEach(c => hide(c));
  idle('.h-hole', t => ({ s: t < W('v1', 1) ? 1 + 0.06 * Math.sin(t * 9) : 1 }));
  mascotPose('.h-m', W('v1', 0), 'pointL');
  tw('.h-key', W('v1', 0), 0.3, { r: [0, -12] }, 'out');
  // «закрыли»: the band-aid slaps on, a check pops
  tw('.h-patch', W('v1', 1) - 0.1, 0.05, { o: [0, 1] }, 'lin'); tw('.h-patch', W('v1', 1) - 0.1, 0.25, { s: [2.2, 1], r: [-30, -8] }, 'in');
  sfx('slam', W('v1', 1) + 0.12, 0.5); shake(W('v1', 1) + 0.15, 0.2, 10); tw('.h-hole', W('v1', 1) + 0.15, 0.2, { o: [1, 0] }, 'lin');
  popIn('.h-ok', W('v1', 1) + 0.3, 0.35); tw('.hok', W('v1', 1) + 0.4, 0.25, { dash: [100, 0] }, 'out'); sfx('ding', W('v1', 1) + 0.4, 0.5);
  tw('.h-key .karmL', W('v1', 1) + 0.3, 0.3, { r: [0, 100] }, 'back'); tw('.h-key .karmR', W('v1', 1) + 0.3, 0.3, { r: [0, -100] }, 'back');
  // НЕ БАЙТ: the mascot hops and slams its arm down, the stamp hits the top
  const tSt = W('v1', 2) - 0.02;
  mascotPose('.h-m', tSt - 0.5, 'pointUp'); tw('.h-m', tSt - 0.45, 0.25, { y: [0, -90] }, 'out'); tw('.h-m', tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose('.h-m', tSt - 0.18, 'point', 0.18);
  stamp('.h-st', tSt, -7, 26); burst('.h-fx', 22, 540, 350, tSt + 0.05, 420, 61, 'conf', 140);
  // takeaway: any app can be taken apart — the phone splits, the board shows; data cards fly in and the mascot stops them
  const tM = W('m1', 0) - 0.1;
  tw('.h-ok, .h-patch', tM, 0.3, { o: [1, 0] }, 'in');
  tw('.h-ph', W('m1', 3) - 0.1, 0.45, { x: [0, -60], r: [0, -10], s: [1, 0.9] }, 'back'); tw('.h-board', W('m1', 3) - 0.1, 0.45, { x: [0, 190], r: [0, 8], s: [1, 0.9] }, 'back');
  sfx('whoosh', W('m1', 3) - 0.1, 0.5); tw('.h-key', W('m1', 3), 0.45, { x: [0, 150], y: [0, -110] }, 'back');
  mascotPose('.h-m', W('m1', 1), 'think'); mascotPose('.h-m', W('m1', 3), 'shock');
  hc.forEach((c, i) => { const t = W('m1', 4) + i * 0.12;
    tw(c, t, 0.08, { o: [0, 1] }, 'lin'); tw(c, t, 0.35, { x: [0, -560 + i * 30], r: [0, -15] }, 'out');
    tw(c, t + 0.4, 0.4, { x: [-560 + i * 30, 120], y: [0, -140 + i * 60], r: [-15, 40] }, 'in'); tw(c, t + 0.7, 0.15, { o: [1, 0] }, 'lin'); sfx('thud', t + 0.4, 0.35); });
  mascotPose('.h-m', W('m1', 4), 'hold'); punch('.h-m', W('m1', 5), 0.06);
  slideIn('.h-chip', W('m1', 4) + 0.05, 'left', 0.55, 500); sfx('whoosh', W('m1', 4), 0.4);
  // subscribe
  const tSub = W('cta', 0) - 0.05;
  tw('.h-chip', tSub - 0.1, 0.3, { o: [1, 0] }, 'in'); tw('.h-ph, .h-board, .h-shd1', tSub - 0.1, 0.35, { o: [1, 0] }, 'in');
  slideIn('.h-sub', tSub, 'down', 0.6, 300); sfx('whoosh', tSub, 0.5);
  for (let k = 0; k < 4; k++) tw('.h-bell .bell', W('cta', 1) + k * 0.16, 0.08, { r: [k % 2 ? 18 : -18, k % 2 ? -18 : 18] }, 'inOut');
  tw('.h-bell .bell', W('cta', 1) + 0.64, 0.3, { r: [-18, 0] }, 'back'); sfx('ding', W('cta', 1), 0.6);
  mascotPose('.h-m', tSub + 0.1, 'point'); punch('.h-sub', W('cta', 2), 0.06);
  tw('#H .h-st, #H .h-sub, #H .conf, #H .h-key, #H .shd', tLoop - 0.4, 0.35, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw('#H .h-m', tLoop + 0.42, 0.001, { o: [1, 0] });
}, { chunks: {} });
