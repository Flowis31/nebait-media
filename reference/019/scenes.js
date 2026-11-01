// 019 «Наушник гасит шум 200 раз в секунду. А соседа — нет?» — Как это работает, часть 2. История с героями: маскот в метро и сосед.
// Sony Help Guide WF-1000XM4; Apple Newsroom 28.10.2019.
boot(() => {
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
  const clamp = x => Math.max(0, Math.min(1, x));
  const place = (el, x, y, w, h) => { el.style.left = x + 'px'; el.style.top = y + 'px'; if (w) el.style.width = w + 'px'; if (h) el.style.height = h + 'px'; return el; };
  const easeIO = x => (x = clamp(x), x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const W = (k, i) => wt(k, i);
  const lvl = pts => t => { if (t <= pts[0][0]) return pts[0][1]; for (let i = 1; i < pts.length; i++) if (t < pts[i][0]) { const [a, va] = pts[i - 1], [b, vb] = pts[i]; return va + (vb - va) * easeIO((t - a) / (b - a)); } return pts[pts.length - 1][1]; };
  const jump = (el, t, h = 80, d = 0.5, shd = null) => {
    tw(el, t - 0.12, 0.12, { sy: [1, 0.86], sx: [1, 1.08] }, 'out');
    tw(el, t, d / 2, { y: [0, -h], sy: [0.86, 1.08], sx: [1.08, 0.95] }, 'out');
    tw(el, t + d / 2, d / 2, { y: [-h, 0], sy: [1.08, 1], sx: [0.95, 1] }, 'in');
    tw(el, t + d, 0.08, { sy: [1, 0.88], sx: [1, 1.1] }, 'out'); tw(el, t + d + 0.08, 0.3, { sy: [0.88, 1], sx: [1.1, 1] }, 'back');
    if (shd) { tw(shd, t, d / 2, { s: [1, 0.6], o: [1, 0.5] }, 'out'); tw(shd, t + d / 2, d / 2, { s: [0.6, 1], o: [0.5, 1] }, 'in'); }
  };
  const arc = (el, t, d, dx, dy, h, rot = 0) => idle(el, tt => { if (tt < t) return {}; const u = clamp((tt - t) / d); return { x: dx * u, y: dy * u - 4 * h * u * (1 - u), r: rot * u }; });
  const burst = (par, n, x, y, t, dist = 220, seed = 0, cls = 'spark', fall = 0) => {
    const cols = ['#5fe0ff', '#ffe14d', '#ff5fa2', '#b8ff3d', '#ffb84d'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.7, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.5, 0.25, { o: [1, 0] }, 'lin'); } };
  const puffs = (par, x, y, t, n = 6, seed = 0) => { for (let k = 0; k < n; k++) { const d = mk(par, 'puff'); place(d, x - 35, y - 35); hide(d);
    tw(d, t, 0.05, { o: [0, 0.9] }, 'lin'); tw(d, t, 0.7, { x: [0, (k - (n - 1) / 2) * 34], y: [0, -60 - 50 * hash(k + seed)], s: [0.5, 1.7] }, 'out'); tw(d, t + 0.35, 0.35, { o: [0.9, 0] }, 'lin'); } };
  // sound rings out of a point (noise in the air)
  const rings = (par, x, y, t0, t1, col = '#ffb84d', P = 0.45, R = 160) => { for (let k = 0; k < 3; k++) { const r = mk(par, 'ring'); place(r, x - R, y - R, 2 * R, 2 * R); r.style.borderColor = col;
    idle(r, t => { if (t < t0 || t > t1) return { s: 0.01 }; const u = ((t - t0) / P + k / 3) % 1; return { s: 0.2 + 0.9 * u }; });
    custom(t => { const u = ((t - t0) / P + k / 3) % 1; r.style.opacity = (t < t0 || t > t1) ? 0 : (0.8 * (1 - u)).toFixed(3); }); } };
  // chat bubbles flying along an arc from (x0,y0) to (x1,y1)
  const blas = (par, x0, y0, x1, y1, t0, n, gap, seed = 0, txt = 'БЛА', bounce = false) => { for (let k = 0; k < n; k++) {
    const b = mk(par, 'bla', chatSVG('bl' + seed + k, '#fff1d6', txt, 'left')); place(b, x0 - 105, y0 - 70); hide(b);
    const t = t0 + k * gap, d = 0.75; tw(b, t, 0.08, { o: [0, 1] }, 'lin'); tw(b, t, 0.3, { s: [0.4, 0.9] }, 'back');
    if (bounce) { idle(b, tt => { if (tt < t) return {}; const u = clamp((tt - t) / d); const ux = u < 0.6 ? u / 0.6 : 1 - (u - 0.6) / 0.4 * 0.5;
        return { x: (x1 - x0) * ux, y: (y1 - y0) * ux - 60 * Math.sin(Math.PI * Math.min(1, u / 0.6)) + (u > 0.6 ? 220 * (u - 0.6) : 0), r: u > 0.6 ? -40 * (u - 0.6) / 0.4 : 0 }; });
      sfx('thud', t + d * 0.6, 0.35); }
    else { arc(b, t, d, x1 - x0, y1 - y0, 60 + 40 * hash(k + seed), (hash(k + seed + 3) - 0.5) * 30); }
    tw(b, t + d - 0.15, 0.2, { o: [1, 0] }, 'lin'); sfx('blip', t, 0.25); } };

  // ---------- world ----------
  $('#tun').innerHTML = tunnelSVG() + `<div style="left:1200px;top:0;width:1200px;height:420px">${tunnelSVG()}</div><div style="left:2400px;top:0;width:1200px;height:420px">${tunnelSVG()}</div>`;
  $$('#tun > div').forEach(d => d.style.position = 'absolute'); $('#tun > svg').style.position = 'absolute'; $('#tun > svg').style.width = '1200px';
  $('#wall').innerHTML = carWallSVG(); $('#poles').innerHTML = polesSVG();
  dof('#tun', 3); dof('#wall', 1.2);
  lookFX({ grain: 0.12, tint: 'transparent' });

  // ---------- props ----------
  const flip = html => `<div style="left:0;top:0;width:100%;height:100%;transform:scaleX(-1)">${html}</div>`;
  const buildA = (sc, s) => { $(sc + ' .a-eb').innerHTML = earbudSVG('a' + s, true); };
  buildA('#A', '');
  $('.b-eb').innerHTML = earbudSVG('b', false); $('.c-eb').innerHTML = flip(earbudSVG('c', false));
  $('.b-wave').innerHTML = waveBoxSVG('bw', '#ffb84d', 1000, 400, 18);
  $('.c-p').innerHTML = personSVG('cp', '#5f8cff', '#2a1c12'); $('.c-ph').innerHTML = phonePropSVG('cph');
  $('.d-hum').innerHTML = waveBoxSVG('dh', '#ffb84d', 1000, 740, 18); $('.d-anti').innerHTML = waveBoxSVG('da', '#5fe0ff', 1000, 740, 18);
  $('.e-voice').innerHTML = waveBoxSVG('ev', '#ff5fa2', 1000, 740, 14); $('.e-anti').innerHTML = waveBoxSVG('ea', '#5fe0ff', 1000, 740, 14); $('.e-sum').innerHTML = waveBoxSVG('es', '#ffffff', 1000, 740, 12);
  $('.d-eb').innerHTML = earbudSVG('d', true); $('.e-eb').innerHTML = earbudSVG('e', true);
  $('.e-x').innerHTML = crossIcon('exp');
  $('.f-bg').innerHTML = kitchenSVG(); $('.f-t').innerHTML = turtleSVG('f'); $('.f-sw').innerHTML = swatterSVG('f'); $('.f-fly').innerHTML = flySVG('f');
  $('.f-trail').innerHTML = `<svg viewBox="0 0 1080 1300" style="left:0;top:0;width:100%;height:100%"><path class="ftr" d="M195 900 C 300 600, 520 520, 560 420 S 760 300, 860 380" pathLength="100" fill="none" stroke="#7a4a2a" stroke-width="7" stroke-dasharray="3 4" stroke-linecap="round" style="stroke-dashoffset:0"/></svg>`;
  $('.g-eb').innerHTML = earbudSVG('g', false);
  [['.g-c1', trainIcon(), '#7dff8a'], ['.g-c2', planeIcon(), '#7dff8a'], ['.g-c3', voiceIcon(), '#ff6b80']].forEach(([s, ic, col], i) => {
    $(s + ' .ic').innerHTML = ic; $(s + ' .mt').innerHTML = meterSVG('g' + i, col); const ck = $(s + ' .ck'); if (ck) ck.innerHTML = checkIcon('gck' + i); });
  $('.r-ear').innerHTML = earCutSVG('r'); $('.r-eb').innerHTML = flip(earbudSVG('r', false)); $('.r-chipI').innerHTML = chipIcon(); $('.r-xI').innerHTML = crossIcon('rxp');
  $('.h-p').innerHTML = personSVG('hp', '#5f8cff', '#2a1c12'); $('.h-ph').innerHTML = phonePropSVG('hph'); $('.h-eb').innerHTML = flip(earbudSVG('h', false));
  $('.h-mt1').innerHTML = meterSVG('h1', '#ffb84d'); $('.h-mt2').innerHTML = meterSVG('h2', '#ff5fa2');
  $('.h-tS').innerHTML = eartipSVG('s', 0.62, 'S'); $('.h-tM').innerHTML = eartipSVG('m', 0.8, 'M'); $('.h-tL').innerHTML = eartipSVG('l', 1, 'L'); $('.h-ok').innerHTML = checkIcon('hok');
  $('.h-bell').innerHTML = bellSVG();
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  $('#A2').innerHTML = $('#A').innerHTML; $('#A2 .a-eb').innerHTML = ''; $('#A2 .a-m').innerHTML = ''; buildA('#A2', '2'); $('#A2 .a-m').innerHTML = mascotSVG('a2m');
  $('#A2 .a-u2').style.opacity = 0; $('#A2 .a-chip').style.opacity = 0; $('#A2 .a-src').style.opacity = 0;
  mascotLife(); mascotTalk();
  mascotQuiet('#A2 .a-m', 0, TOTAL + 1);

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('b1'), tC = cut('c1'), tD = cut('d1'), tE = cut('e1'), tF = cut('j1'), tG = cut('p1'), tR = cut('r1'), tH = cut('v1'), tLoop = TOTAL - 0.8;
  const CUTS = [0, tB, tC, tD, tE, tF, tG, tR, tH], IDS = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#R', '#H'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 260 * easeIO((t - c + 0.35) / 0.7); }); x -= 2080 * easeIO((t - tLoop) / 0.6); return x; };
  custom(t => {
    const x = camX(t), run = (t / TOTAL) * 46 * 300;   // the train keeps moving: tunnel lamps stream past (46 lamp periods per loop)
    $('#tun').style.transform = `translate(${(-(run + x * 0.1) % 1200).toFixed(1)}px,0)`;
    $('#wall').style.transform = `translate(${(-x * 0.45 + 4 * Math.sin(W2 * 37 * t)).toFixed(1)}px,${(2 * Math.sin(W2 * 53 * t)).toFixed(1)}px)`;
    $('#poles').style.transform = `translate(${(-x * 0.9).toFixed(1)}px,${(2 * Math.sin(W2 * 53 * t)).toFixed(1)}px)`;
    $('#floor').style.transform = `translate(${(-(x * 1.0) % 200).toFixed(1)}px,0)`;
  });
  grade(0, 'transparent'); grade(tD, 'rgba(95,224,255,.12)'); grade(tE, 'rgba(255,95,162,.14)'); grade(tF - 0.2, 'rgba(255,190,80,.30)');
  grade(tG, 'rgba(255,184,77,.12)'); grade(tR, 'rgba(255,140,120,.14)'); grade(tH, 'rgba(184,255,61,.12)'); grade(tLoop + 0.3, 'transparent');
  $$('.m').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2') && !m.closest('#F')) idle(m, t => ({ y: 6 * Math.sin(W2 * 16 * t + i), r: 1.4 * Math.sin(W2 * 8 * t + i) })); });
  idle('.a-eb', t => ({ y: 12 * Math.sin(W2 * 6 * t), r: -6 + 2 * Math.sin(W2 * 3 * t) }));

  // ================= A: hook — a big earbud, «200 раз в секунду», then «А соседа — нет?» =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  hide('#A .a-u2'); hide('#A .a-src');
  punch('#A .a-eb', W('hook', 0) + 0.02, 0.06);
  slideIn('#A .a-chip', 0.3, 'left', 0.6, 400); sfx('whoosh', 0.3, 0.4);
  mascotPose('#A .a-m', W('hook', 0) + 0.15, 'pointL');
  rings('#A .cam', 330, 960, W('hook', 1), W('hook', 7), '#5fe0ff', 0.4, 230);
  tw('#A .a-eb .mic1', W('hook', 2), 0.12, { s: [1, 1.4] }, 'out'); tw('#A .a-eb .mic1', W('hook', 2) + 0.12, 0.3, { s: [1.4, 1] }, 'back');
  punch('#A .a-n', W('hook', 3) + 0.03, 0.12); sfx('ding', W('hook', 3) + 0.05, 0.6);
  burst('#A .cam', 12, 540, 400, W('hook', 3) + 0.05, 330, 3, 'spark');
  punch('#A .a-u1', W('hook', 4), 0.08);
  slideIn('#A .a-src', W('hook', 5) - 0.05, 'right', 0.6, 420);
  mascotPose('#A .a-m', W('hook', 4), 'pointUp');
  // «А соседа — нет?»: the label slot swaps, a neighbour's chatter pokes in
  const tQ = W('hook', 7) - 0.05;
  tw('#A .a-u1', tQ, 0.12, { y: [0, -80], o: [1, 0] }, 'in'); tw('#A .a-u2', tQ + 0.04, 0.3, { y: [80, 0], o: [0, 1] }, 'back'); sfx('blip', tQ, 0.5);
  slideOut('#A .a-src', tQ, 'right', 0.3, 420);
  blas('#A .cam', 1100, 760, 760, 860, W('hook', 8) - 0.1, 2, 0.22, 1);
  mascotPose('#A .a-m', W('hook', 8), 'shock'); punch('#A .a-u2', W('hook', 9), 0.12);
  tw('#A .a-eb .ebBrow', W('hook', 9), 0.2, { y: [0, -10] }, 'out');

  // ================= B: in the metro, noise cancelling on — the hum disappears =================
  morphCut('#A', '#B', tB, '#A .a-eb', '.b-eb', 0.6);
  hide('.b-chip');
  const bAmp = lvl([[tB, 120], [W('b1', 4), 120], [W('b1', 5) + 0.5, 0]]);
  custom(t => { const a = bAmp(t) * (1 + 0.15 * Math.sin(t * 7)); const d = wavePath(20, 980, 200, a, 1.4, -t * 3.2, 100);
    $('.bwo').setAttribute('d', d); $('.bw').setAttribute('d', d); $('.b-wave').style.opacity = (0.35 + 0.65 * clamp(bAmp(t) / 120 + 0.25)).toFixed(3); });
  rings('#B .cam', 540, 520, tB, W('b1', 4), '#ffb84d', 0.5, 260);
  mascotPose('.b-m', W('b1', 0), 'sad'); shake(tB + 0.2, 1.4, 4);
  // «включаю шумодав»: the mascot presses the earbud, it glows
  mascotPose('.b-m', W('b1', 2) - 0.1, 'point');
  tw('.b-eb', W('b1', 2) + 0.1, 0.1, { s: [1, 0.85] }, 'out'); tw('.b-eb', W('b1', 2) + 0.2, 0.3, { s: [0.85, 1] }, 'back'); sfx('blip', W('b1', 2) + 0.1, 0.6);
  tw('.b-eb .ebGlow', W('b1', 2) + 0.15, 0.2, { o: [0, 1] }, 'lin');
  slideIn('.b-chip', W('b1', 3) - 0.05, 'right', 0.6, 420); sfx('whoosh', W('b1', 3), 0.4);
  // «гул пропал»: the wave flattens, the mascot relaxes
  sfx('riser2', W('b1', 4) - 0.1, 0.3);
  mascotPose('.b-m', W('b1', 5), 'cheer'); jump('.b-m', W('b1', 5) + 0.05, 50, 0.4, '.b-shd');
  burst('#B .cam', 10, 540, 520, W('b1', 5) + 0.3, 200, 5, 'spark');

  // ================= C: the neighbour on the phone — and you hear him =================
  tWhip('#B', '#C', tC);
  hide('.c-ph');
  mascotPose('.c-m', W('c1', 0), 'cheer');
  tw('.c-p .parmR', W('c1', 1), 0.35, { r: [0, -130] }, 'back');
  tw('.c-ph', W('c1', 1) + 0.05, 0.25, { o: [0, 1], s: [0.5, 1], r: [0, -18] }, 'back');
  const talk = (sel, t0, t1, P = 0.16) => idle(sel, t => (t > t0 && t < t1) ? { sy: 0.4 + 0.6 * Math.abs(Math.sin((t - t0) * Math.PI / P)) } : {});
  talk('.c-p .pmouth', W('c1', 2), tD + 0.3);
  idle('.c-p .phead', t => (t > W('c1', 2) && t < tD + 0.3) ? { r: 4 * Math.sin((t - W('c1', 2)) * 7) } : {});
  blas('#C .cam', 260, 760, 690, 900, W('c1', 2), 6, 0.36, 7);
  mascotQuiet('.c-m', W('c1', 2), W('c1', 7) - 0.05);
  mascotPose('.c-m', W('c1', 4), 'think');
  // «и его слышно!»
  mascotPose('.c-m', W('c1', 7) - 0.05, 'shock'); jump('.c-m', W('c1', 7), 60, 0.4, '.c-shd2'); sfx('boom', W('c1', 7), 0.4);
  focus('#C > .cam', W('c1', 7), 700, 880, 1.15, 0.5);
  // «Сломался?»: the mascot taps the earbud, it rattles
  mascotPose('.c-m', W('c2', 0) - 0.1, 'pointL');
  for (let k = 0; k < 3; k++) { tw('.c-eb', W('c2', 0) + k * 0.14, 0.07, { x: [0, -10], r: [0, -8] }, 'out'); tw('.c-eb', W('c2', 0) + k * 0.14 + 0.07, 0.07, { x: [-10, 0], r: [-8, 0] }, 'in'); sfx('tick', W('c2', 0) + k * 0.14, 0.5); }
  for (let k = 0; k < 3; k++) { const q = mk('#C .cam', 'qm'); q.textContent = '?'; place(q, 760 + k * 90, 640 - k * 40); hide(q); popIn(q, W('c2', 0) + 0.15 + k * 0.08, 0.3); sfx('pop', W('c2', 0) + 0.15 + k * 0.08, 0.3); }
  mascotPose('.c-m', W('c2', 0) + 0.35, 'shrug');

  // ================= D: the hum — long slow waves; the earbud plays them backwards =================
  tCircle('#C', '#D', tD, 540, 560);
  hide('.d-chip'); hide('.d-chip2'); hide('.d-anti');
  const tDraw = W('d1', 1) - 0.1, tAnti = W('d2', 2) - 0.1, tMerge = W('d2', 5) - 0.05;
  const dHills = lvl([[W('d1', 3), 1.1], [W('d1', 3) + 0.5, 1.6]]);
  const dAmp = lvl([[tMerge + 0.35, 120], [tMerge + 0.95, 0]]);
  const dY = lvl([[tMerge, 260], [tMerge + 0.4, 370]]), aY = lvl([[tMerge, 520], [tMerge + 0.4, 370]]);
  const slow = t => t < W('d1', 4) ? t * 2.2 : W('d1', 4) * 2.2 + (t - W('d1', 4)) * 1.0;   // «медленные»: the wave slows down
  custom(t => {
    const p = clamp((t - tDraw) / 0.6), x1 = 30 + 940 * p, ph = -slow(t);
    const d = p > 0 ? wavePath(30, x1, dY(t), dAmp(t), dHills(t) * p, ph, 120) : 'M0 0';
    $('.dho').setAttribute('d', d); $('.dh').setAttribute('d', d);
    const q = clamp((t - tAnti) / 0.5), da = q > 0 ? wavePath(30, 30 + 940 * q, aY(t), -dAmp(t), dHills(t) * q, ph, 120) : 'M0 0';
    $('.dao').setAttribute('d', da); $('.da').setAttribute('d', da);
  });
  mascotPose('.d-m', W('d1', 0), 'pointUp');
  sfx('whoosh', tDraw, 0.4); slideIn('.d-chip', W('d1', 1) - 0.05, 'left', 0.6, 300);
  tw('.d-hum', W('d1', 3), 0.15, { sx: [1, 1.04] }, 'out'); tw('.d-hum', W('d1', 3) + 0.15, 0.4, { sx: [1.04, 1] }, 'back');
  mascotPose('.d-m', W('d1', 3), 'hold'); mascotPose('.d-m', W('d1', 4), 'think');
  focus('#D > .cam', W('d1', 4), 540, 470, 1.12, 0.55, 0.28, 0.45, 540, 520);
  // «Наушник успевает сыграть их наоборот»: a beam from the earbud, the mirrored wave appears
  mascotPose('.d-m', W('d2', 0), 'pointL'); punch('.d-eb', W('d2', 0), 0.1);
  tw('.d-eb .ebBrow', W('d2', 1), 0.2, { y: [0, -8] }, 'out');
  tw('.d-anti', tAnti, 0.15, { o: [0, 1] }, 'lin'); sfx('zap', tAnti, 0.4);
  $('.d-beam').innerHTML = `<svg viewBox="0 0 1080 1300" style="left:0;top:0;width:100%;height:100%"><path class="dbm" d="M300 990 Q340 860 420 760" pathLength="100" fill="none" stroke="#5fe0ff" stroke-width="10" stroke-dasharray="100" stroke-dashoffset="100" stroke-linecap="round"/></svg>`;
  tw('.dbm', tAnti - 0.15, 0.3, { dash: [100, 0] }, 'out'); tw('.d-beam', tMerge, 0.3, { o: [1, 0] }, 'lin');
  slideIn('.d-chip2', W('d2', 4) - 0.1, 'left', 0.6, 300);
  tw('.d-hum, .d-anti', W('d2', 4), 0.12, { sy: [1, 1.08] }, 'out'); tw('.d-hum, .d-anti', W('d2', 4) + 0.12, 0.35, { sy: [1.08, 1] }, 'back');
  // «и гул гаснет»: both waves slide together and flatten into one calm line
  slideOut('.d-chip2', tMerge, 'left', 0.3, 300); slideOut('.d-chip', tMerge, 'left', 0.3, 300); sfx('riser2', tMerge - 0.2, 0.3);
  burst('#D .cam', 14, 540, 570, tMerge + 0.9, 260, 11, 'spark'); sfx('ding', tMerge + 0.9, 0.5);
  mascotPose('.d-m', tMerge + 0.3, 'cheer');

  // ================= E: the voice — short fast jumpy waves; the answer is late and misses =================
  morphCut('#D', '#E', tE, '.d-eb', '.e-eb', 0.6);
  hide('.e-chip'); hide('.e-chip2'); hide('.e-anti'); hide('.e-sum'); hide('.e-x');
  const tV = W('e1', 0) - 0.05, tLag = W('e2', 0) - 0.05, tMiss = W('e2', 4) - 0.05, LAG = 0.07;
  const vAmp = t => { const base = lvl([[tV, 0], [tV + 0.4, 55]])(t); if (t < W('e1', 6) - 0.05) return base; const k = Math.floor((t - W('e1', 6)) / 0.13); return base * (0.55 + 0.9 * hash(k * 1.7 + 4)); };
  const vY = lvl([[tMiss, 260], [tMiss + 0.35, 370]]), eAY = lvl([[tMiss, 520], [tMiss + 0.35, 370]]);
  const vShape = (t, u) => { const ph = -t * 16, j = t * 11; return Math.sin(2 * Math.PI * 5.5 * u + ph) + 0.55 * Math.sin(2 * Math.PI * 9.3 * u + j * 1.7) + 0.35 * Math.sin(2 * Math.PI * 15.1 * u - j * 2.3); };
  const path = (y0, f, x0 = 30, x1 = 970, n = 160) => { let d = ''; for (let i = 0; i <= n; i++) { const u = i / n; d += (i ? ' L' : 'M') + (x0 + (x1 - x0) * u).toFixed(1) + ' ' + (y0 - f(u)).toFixed(1); } return d; };
  custom(t => {
    if (t < tE - 0.6 || t > tF + 0.6) return;
    const a = vAmp(t), aL = vAmp(t - LAG);
    const v = path(vY(t), u => a * vShape(t, u) * 0.6);
    $('.evo').setAttribute('d', v); $('.ev').setAttribute('d', v);
    const an = path(eAY(t), u => -aL * vShape(t - LAG, u) * 0.6); $('.eao').setAttribute('d', an); $('.ea').setAttribute('d', an);
    const s = path(370, u => (a * vShape(t, u) - aL * vShape(t - LAG, u)) * 0.6); $('.eso').setAttribute('d', s); $('.es').setAttribute('d', s);
  });
  mascotPose('.e-m', W('e1', 0), 'pointUp'); sfx('glitch', tV, 0.4);
  slideIn('.e-chip', W('e1', 0), 'left', 0.6, 300);
  mascotPose('.e-m', W('e1', 1), 'hold'); mascotPose('.e-m', W('e1', 2), 'shock');
  focus('#E > .cam', W('e1', 2), 540, 470, 1.12, 0.45, 0.28, 0.45, 540, 520);
  for (let k = 0; k < 5; k++) { tw('.e-voice', W('e1', 6) + k * 0.13, 0.065, { y: [0, -14] }, 'out'); tw('.e-voice', W('e1', 6) + k * 0.13 + 0.065, 0.065, { y: [-14, 0] }, 'in'); sfx('tick', W('e1', 6) + k * 0.13, 0.3); }
  // «Ответка опаздывает на миг»
  mascotPose('.e-m', W('e2', 0), 'pointL'); punch('.e-eb', W('e2', 0), 0.1);
  tw('.e-anti', tLag, 0.15, { o: [0, 1] }, 'lin'); sfx('zap', tLag, 0.4);
  slideIn('.e-chip2', W('e2', 1), 'left', 0.6, 300);
  for (let k = 0; k < 2; k++) { tw('.e-chip2', W('e2', 3) + k * 0.12, 0.06, { x: [0, 12] }, 'out'); tw('.e-chip2', W('e2', 3) + k * 0.12 + 0.06, 0.06, { x: [12, 0] }, 'in'); }
  // «и мимо»: they meet in the middle — what's left is still jagged
  tw('.e-voice, .e-anti', tMiss + 0.3, 0.3, { o: [1, 0.25] }, 'lin'); tw('.e-sum', tMiss + 0.25, 0.2, { o: [0, 1] }, 'lin');
  slideOut('.e-chip', tMiss, 'left', 0.3, 300);
  popIn('.e-x', tMiss + 0.15, 0.35); tw('.exp', tMiss + 0.25, 0.25, { dash: [100, 0] }, 'out'); sfx('buzz', tMiss + 0.2, 0.5);
  mascotPose('.e-m', tMiss + 0.1, 'facepalm');

  // ================= F: joke — a fly swatter: the turtle gets hit, the fly is long gone =================
  tDrop('#E', '#F', tF);
  hide('.f-sw'); hide('.f-trail');
  idle('.f-fly .fwing', t => ({ sy: 0.4 + 0.6 * Math.abs(Math.sin(t * 40)) }));
  idle('.f-t .tLegs', t => t < W('j1', 3) ? { sy: 0.9 + 0.1 * Math.sin(t * 6) } : {});
  idle('.f-t .tHead', t => t < W('j1', 3) ? { x: 4 * Math.sin(t * 3) } : {});
  idle('.f-fly', t => t < W('j2', 0) ? { x: 14 * Math.sin(t * 5), y: 10 * Math.sin(t * 7.3) } : {});
  mascotPose('.f-m', W('j1', 0), 'hold');
  popIn('.f-sw', W('j1', 1) - 0.05, 0.4); sfx('pop', W('j1', 1), 0.5);
  mascotPose('.f-m', W('j1', 2), 'pointL');
  tw('.f-t', W('j1', 2), 0.6, { x: [0, 30] }, 'inOut');
  // «прихлопнешь»: the swatter slams on the slow turtle
  const tHit = W('j1', 3) + 0.15;
  tw('.f-sw', tHit - 0.25, 0.25, { r: [0, -62], y: [0, 40] }, 'in'); shake(tHit, 0.3, 18); sfx('slam', tHit, 0.7);
  tw('.f-t .tShell', tHit, 0.08, { sy: [1, 0.86] }, 'out'); tw('.f-t .tShell', tHit + 0.08, 0.3, { sy: [0.86, 1] }, 'back');
  tw('.f-t .tHead', tHit, 0.2, { x: [0, -60] }, 'in');   // the head hides in the shell
  burst('#F .cam', 8, 240, 1000, tHit + 0.02, 160, 21, 'spark');
  tw('.f-sw', tHit + 0.25, 0.3, { r: [-62, 0], y: [40, 0] }, 'out');
  mascotPose('.f-m', tHit + 0.1, 'cheer');
  // «а муха давно улетела»: the fly zips off along a dotted trail; a second swing hits nothing
  const tFly = W('j2', 0) - 0.15;
  tw('.f-trail', tFly, 0.08, { o: [0, 1] }, 'lin');
  $('.ftr').style.strokeDasharray = '100'; tw('.ftr', tFly, 0.55, { dash: [100, 0] }, 'inOut');
  { const P = $('.ftr'), Ln = P.getTotalLength(), p0 = P.getPointAtLength(0);
    custom(t => { if (t < tFly) return; const u = easeIO((t - tFly) / 0.55), pt = P.getPointAtLength(Ln * u); $('.f-fly').style.transform = `translate(${(pt.x - p0.x).toFixed(1)}px,${(pt.y - p0.y).toFixed(1)}px) rotate(${(Math.sin(t * 20) * 12).toFixed(1)}deg)`; }); }
  sfx('whoosh', tFly, 0.6); sfx('buzz', tFly + 0.1, 0.25);
  tw('.f-sw', W('j2', 2) - 0.2, 0.22, { r: [0, -40], x: [0, 60] }, 'in'); sfx('whoosh', W('j2', 2), 0.5);
  tw('.f-sw', W('j2', 2) + 0.05, 0.35, { r: [-40, 0], x: [60, 0] }, 'out');
  mascotPose('.f-m', W('j2', 2) - 0.2, 'point'); mascotPose('.f-m', W('j2', 3), 'shrug');
  focus('#F > .cam', W('j2', 3), 820, 760, 1.08, 0.45);
  tw('.f-trail', tG - 0.4, 0.3, { o: [1, 0] }, 'lin');

  // ================= G: proof — Sony's manual: trains and planes yes, voices weaker =================
  tZoom('#F', '#G', tG);
  hide('.g-src'); hide('.g-c1'); hide('.g-c2'); hide('.g-c3'); hide('.g-weak'); hide('.g-c1 .ck'); hide('.g-c2 .ck');
  slideIn('.g-src', W('p1', 0) - 0.05, 'left', 0.7, 520); sfx('whoosh', W('p1', 0), 0.4);
  mascotPose('.g-m', W('p1', 0), 'pointL'); mascotPose('.g-m', W('p1', 2), 'hold');
  punch('.g-src', W('p1', 4), 0.05);
  idle('.g-eb', t => ({ y: 10 * Math.sin(W2 * 12 * t), r: 3 * Math.sin(W2 * 6 * t) }));
  const meter = (sel, t0, v) => custom(t => { const u = clamp((t - t0) / 0.6); $$(sel + ' .mfill').forEach(r => r.style.transform = `scaleX(${Math.max(0.02, v * (1 - Math.pow(1 - u, 3))).toFixed(4)})`); });
  slideIn('.g-c1', W('p2', 2) - 0.1, 'down', 0.6, 300); meter('.g-c1', W('p2', 2) + 0.1, 0.95);
  popIn('.g-c1 .ck', W('p2', 2) + 0.3, 0.35); tw('.gck0', W('p2', 2) + 0.4, 0.25, { dash: [100, 0] }, 'out'); sfx('ding', W('p2', 2) + 0.4, 0.4);
  slideIn('.g-c2', W('p2', 4) - 0.1, 'down', 0.6, 300); meter('.g-c2', W('p2', 4) + 0.1, 0.9);
  popIn('.g-c2 .ck', W('p2', 4) + 0.3, 0.35); tw('.gck1', W('p2', 4) + 0.4, 0.25, { dash: [100, 0] }, 'out'); sfx('ding', W('p2', 4) + 0.4, 0.45);
  mascotPose('.g-m', W('p2', 2), 'point'); mascotPose('.g-m', W('p2', 4), 'cheer');
  slideIn('.g-c3', W('p2', 7) - 0.1, 'down', 0.6, 300); meter('.g-c3', W('p2', 7) + 0.1, 0.35);
  mascotPose('.g-m', W('p2', 7), 'think');
  slideIn('.g-weak', W('p2', 8) - 0.05, 'right', 0.55, 400); sfx('buzz', W('p2', 8), 0.3);
  punch('.g-c3', W('p2', 8), 0.1);
  mascotPose('.g-m', W('p2', 8), 'shrug');

  // ================= R: the ear — the voice is held by the ear tip, not by electronics =================
  morphCut('#G', '#R', tR, '.g-eb', '.r-eb', 0.62);
  hide('.r-chipI'); hide('.r-xI'); hide('.r-lab'); hide('.r-tip');
  blas('#R .cam', -120, 640, 300, 690, tR + 0.25, 5, 0.42, 31, 'БЛА', true);
  mascotPose('.r-m', W('r1', 0), 'pointL');
  popIn('.r-chipI', W('r1', 2) - 0.1, 0.35); slideIn('.r-lab', W('r1', 2), 'right', 0.55, 300); sfx('blip', W('r1', 2), 0.4);
  popIn('.r-xI', W('r1', 3) + 0.2, 0.3); tw('.rxp', W('r1', 3) + 0.28, 0.25, { dash: [100, 0] }, 'out'); sfx('buzz', W('r1', 3) + 0.25, 0.3);
  mascotPose('.r-m', W('r1', 3), 'shrug');
  // «а насадка-затычка»: the tip pushes in, glows, the label slides up
  tw('.r-eb', W('r1', 5) - 0.1, 0.2, { x: [0, 26] }, 'in'); tw('.r-eb', W('r1', 5) + 0.1, 0.35, { x: [26, 18] }, 'back'); sfx('thud', W('r1', 5) + 0.1, 0.6);
  slideIn('.r-tip', W('r1', 5), 'down', 0.55, 300); slideOut('.r-lab', W('r1', 5), 'right', 0.3, 300);
  tw('.r-chipI, .r-xI', W('r1', 5), 0.3, { o: [1, 0] }, 'in');
  focus('#R > .cam', W('r1', 5) + 0.1, 540, 720, 1.1, 0.6);
  mascotPose('.r-m', W('r1', 5), 'point');
  tw('.r-ear .eardrum', W('r1', 5) + 0.15, 0.12, { sx: [1, 1.2] }, 'out'); tw('.r-ear .eardrum', W('r1', 5) + 0.27, 0.3, { sx: [1.2, 1] }, 'back');

  // ================= H: the answer, НЕ БАЙТ, the takeaway, subscribe, loop =================
  tSlideUp('#R', '#H', tH);
  hide('.h-r1'); hide('.h-r2'); hide('.h-mt1'); hide('.h-mt2'); hide('.h-st'); hide('.h-sub'); hide('.h-tS'); hide('.h-tM'); hide('.h-tL'); hide('.h-ok');
  talk('.h-p .pmouth', tH, TOTAL - 0.9); tw('.h-p .parmR', 0, 0.001, { r: [-130, -130] }); tw('.h-ph', 0, 0.001, { r: [-18, -18] });
  idle('.h-p .phead', t => (t > tH && t < TOTAL - 0.9) ? { r: 4 * Math.sin((t - tH) * 7) } : {});
  mascotPose('.h-m', W('v1', 0), 'think');
  slideIn('.h-r1', W('v1', 1) - 0.05, 'left', 0.55, 300); slideIn('.h-mt1', W('v1', 1), 'right', 0.55, 300);
  slideIn('.h-r2', W('v1', 2) - 0.05, 'left', 0.55, 300); slideIn('.h-mt2', W('v1', 2), 'right', 0.55, 300); sfx('whoosh', W('v1', 1), 0.4);
  const hum = lvl([[W('v1', 3), 0.95], [W('v1', 3) + 0.6, 0.06]]), voi = lvl([[W('v1', 3), 0.95], [W('v1', 3) + 0.6, 0.62]]);
  custom(t => { $('.h-mt1 .mfill').style.transform = `scaleX(${Math.max(0.02, hum(t)).toFixed(4)})`;
    $('.h-mt2 .mfill').style.transform = `scaleX(${Math.max(0.02, voi(t) * (1 + (t > W('v1', 4) ? 0.06 * Math.sin(t * 22) : 0))).toFixed(4)})`; });
  sfx('riser2', W('v1', 3) - 0.1, 0.3); mascotPose('.h-m', W('v1', 4), 'pointL');
  blas('#H .cam', 280, 770, 680, 920, W('v1', 4), 3, 0.35, 41);
  // НЕ БАЙТ: the mascot hops and slams its arm down, the stamp hits the top
  const tSt = W('v1', 7) - 0.02;
  mascotPose('.h-m', tSt - 0.5, 'pointUp'); tw('.h-m', tSt - 0.45, 0.25, { y: [0, -90] }, 'out'); tw('.h-m', tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose('.h-m', tSt - 0.18, 'point', 0.18);
  stamp('.h-st', tSt, -7, 26); burst('.h-fx', 22, 540, 350, tSt + 0.05, 420, 61, 'conf', 140);
  // takeaway: put on a tighter ear tip
  const tM = W('m1', 0) - 0.15;
  tw('.h-r1, .h-r2, .h-mt1, .h-mt2', tM, 0.35, { o: [1, 0] }, 'in');
  slideIn('.h-tS', W('m1', 1) - 0.2, 'left', 0.55, 400); slideIn('.h-tM', W('m1', 1) - 0.08, 'left', 0.55, 400); slideIn('.h-tL', W('m1', 1) + 0.04, 'left', 0.55, 400); sfx('whoosh', W('m1', 1) - 0.2, 0.4);
  mascotPose('.h-m', W('m1', 0), 'pointL');
  punch('.h-tS', W('m1', 2), 0.08); punch('.h-tM', W('m1', 2) + 0.12, 0.08); punch('.h-tL', W('m1', 3), 0.15); sfx('pop', W('m1', 3), 0.4);
  { const a = $('.h-tL').getBoundingClientRect(), b = $('.h-eb').getBoundingClientRect(); const tT = W('m1', 4) - 0.05;
    tw('.h-tL', tT, 0.55, { s: [1, 0.35] }, 'inOut'); arc('.h-tL', tT, 0.55, b.left + b.width / 2 - (a.left + a.width / 2), b.top + b.height / 2 - (a.top + a.height / 2), 160, 200);
    tw('.h-tL', tT + 0.5, 0.1, { o: [1, 0] }, 'lin'); punch('.h-eb', tT + 0.55, 0.2); sfx('thud', tT + 0.55, 0.5);
    popIn('.h-ok', tT + 0.65, 0.35); tw('.hok', tT + 0.75, 0.25, { dash: [100, 0] }, 'out'); sfx('ding', tT + 0.75, 0.5);
    tw('.h-tS, .h-tM', tT + 0.4, 0.3, { o: [1, 0] }, 'in'); mascotPose('.h-m', tT + 0.6, 'cheer'); }
  const tSub = W('cta', 0) - 0.05;
  slideIn('.h-sub', tSub, 'down', 0.6, 300); sfx('whoosh', tSub, 0.5);
  for (let k = 0; k < 4; k++) tw('.h-bell .bell', W('cta', 1) + k * 0.16, 0.08, { r: [k % 2 ? 18 : -18, k % 2 ? -18 : 18] }, 'inOut');
  tw('.h-bell .bell', W('cta', 1) + 0.64, 0.3, { r: [-18, 0] }, 'back'); sfx('ding', W('cta', 1), 0.6);
  mascotPose('.h-m', tSub + 0.1, 'point'); punch('.h-sub', W('cta', 2), 0.06);
  mascotPose('.h-m', W('out', 1), 'pointL'); blas('#H .cam', 280, 770, 680, 920, W('out', 1), 2, 0.3, 51);
  tw('#H .h-st, #H .h-sub, #H .conf, #H .h-ok, #H .h-p, #H .h-ph, #H .h-eb, #H .shd', tLoop - 0.4, 0.35, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw('#H .h-m', tLoop + 0.42, 0.001, { o: [1, 0] });
}, { chunks: {} });
