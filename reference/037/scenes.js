// 037 «GTA 6 ждали 13 лет. Насколько сильно?» — спецвыпуск в день релиза (чт 19.11.2026). Стиль: проверка «самая ожидаемая — байт или не байт».
// Свой закатный приморский город в 3D (world3d.js) — без кадров, логотипов и персонажей Rockstar.
TIMING.words.forEach(w => { w.d = w.d.replace(/\s—$/, ''); });
boot(() => {
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
  const clamp = x => Math.max(0, Math.min(1, x));
  const place = (el, x, y, w, h) => { el.style.left = x + 'px'; el.style.top = y + 'px'; if (w) el.style.width = w + 'px'; if (h) el.style.height = h + 'px'; return el; };
  const W = (k, i) => wt(k, i);
  const jump = (el, t, h = 80, d = 0.5) => {
    tw(el, t - 0.12, 0.12, { sy: [1, 0.86], sx: [1, 1.08] }, 'out');
    tw(el, t, d / 2, { y: [0, -h], sy: [0.86, 1.08], sx: [1.08, 0.95] }, 'out');
    tw(el, t + d / 2, d / 2, { y: [-h, 0], sy: [1.08, 1], sx: [0.95, 1] }, 'in');
    tw(el, t + d, 0.08, { sy: [1, 0.88], sx: [1, 1.1] }, 'out'); tw(el, t + d + 0.08, 0.3, { sy: [0.88, 1], sx: [1.1, 1] }, 'back');
  };
  const burst = (par, n, x, y, t, dist = 260, seed = 0, cls = 'conf', fall = 120) => {
    const cols = ['#ffd34d', '#ff5fb0', '#5fe0ff', '#7dff8a', '#ff7a5c'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 9, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.9, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 540 * (hash(k + 9) - 0.5) * 2] }, 'out'); tw(s, t + 0.75, 0.25, { o: [1, 0] }, 'lin'); } };
  const counter = (el, t0, d, N, fmt = n => n.toLocaleString('ru-RU')) => custom(t => { const p = clamp((t - t0) / d); el.textContent = fmt(Math.round(N * (1 - Math.pow(1 - p, 2.4)))); });

  // ---------- 2D world: sunset sky, skyline, palms, road (parallax on cuts) ----------
  for (let k = 0; k < 60; k++) { const s = mk('#stars', 'star'); place(s, hash(k * 1.3) * 1080, 140 + hash(k * 2.9) * 640); s.style.opacity = (0.3 + 0.6 * hash(k + 4)).toFixed(2); }
  let sky = ''; for (let k = 0; k < 26; k++) { const x = k * 132 + hash(k) * 40, h = 160 + hash(k * 5.3) * 420, w = 90 + hash(k * 2.1) * 70;
    sky += `<rect x="${x}" y="${760 - h}" width="${w}" height="${h}" fill="#3a1660"/><rect x="${x + 14}" y="${780 - h}" width="${w - 28}" height="${h - 40}" fill="url(#win)" opacity=".7"/>`; }
  $('#sky2').innerHTML = `<svg width="3400" height="760" style="position:absolute;left:0;top:0"><defs><pattern id="win" width="26" height="34" patternUnits="userSpaceOnUse"><rect x="4" y="6" width="12" height="14" fill="#ffd07a" opacity=".55"/></pattern></defs>${sky}</svg>`;
  $('#palms').innerHTML = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => `<div style="position:absolute;left:${k * 340 + hash(k * 7) * 80}px;top:${120 + hash(k) * 60}px;width:${260 + hash(k * 3) * 60}px;height:${560 + hash(k * 3) * 120}px">${palmSVG('bg' + k)}</div>`).join('');
  dof('#sky2', 2); $$('#palms .crown').forEach((c, k) => idle(c, t => ({ r: 3 * Math.sin(W2 * (3 + k % 3) * t + k) })));
  const cutsAll = [];
  custom(t => { let n = 0; for (const c of cutsAll) n += clamp((t - c + 0.3) / 0.6); const x = -n * 150;
    $('#sky2').style.transform = `translateX(${(x * 0.25).toFixed(1)}px)`; $('#palms').style.transform = `translateX(${(x * 0.7).toFixed(1)}px)`; $('#lines').style.transform = `translateX(${(x * 1.2 % 200).toFixed(1)}px)`;
    $('#sun').style.transform = `translateY(${(14 * Math.sin(W2 * 2 * t)).toFixed(1)}px)`; });
  lookFX({ grain: 0.1, tint: 'transparent' });

  // ---------- 3D city (A, A2, E) ----------
  const COLS = ['#ff5fb0', '#5fe0ff', '#ffb84d', '#8a5cff', '#2fbf71', '#ff7a5c'];
  const city = (par, seed) => {
    const Wd = world3d(par, { eyeY: 900 });
    Wd.ground({ haze: '#2b1450', solid: 30, css: 'background:linear-gradient(90deg,transparent 0 48.6%,#ffd34d 48.6% 49.3%,transparent 49.3% 50.7%,#ffd34d 50.7% 51.4%,transparent 51.4%) 0 0/100% 100%,repeating-linear-gradient(0deg,#3a2f5a 0 260px,#2a2346 260px 620px),repeating-linear-gradient(90deg,#3a2f5a 0 260px,#2a2346 260px 620px)' });
    Wd.city({ n: 3, clear: 1, seed, colors: COLS, lit: '#ffe9a8', hMin: 300, hMax: 1100 });
    for (let k = -3; k <= 3; k++) { if (!k) continue; const z1 = -k * 420 - 100 * Math.sign(k), z2 = k * 420 - 260; if (z1 < 0) Wd.card(palmSVG(`p${seed}${k + 3}`), 330 * Math.sign(k), 0, z1, 300, 560); if (z2 < 0) Wd.card(palmSVG(`q${seed}${k + 3}`), -330 * Math.sign(k), 0, z2, 280, 520); }
    return Wd;
  };
  // A: hook — street level among palms, a coupe drives through
  const WA = city('#A .a-cam', 3);
  const carA = WA.card(coupeSVG('a'), -1600, 0, 120, 600, 240);
  const mA = WA.card(mascotSVG('mA'), 170, 0, 260, 380, 380);
  WA.cam(0, 0, { x: 40, y: 330, z: 300, dist: 1500, pitch: 12, yaw: -24 });
  WA.cam(0.05, 3.9, { dist: 1150, pitch: 7, yaw: 8, y: 300 }, 'sine');
  WA.move(carA, 0.6, 2.4, { x: 1700 }, 'inOut'); WA.drift(0.8);
  $$('#A .whl').forEach(w => idle(w, t => ({ r: t * 720 })));
  // A2: loop clone — the same street, camera frozen at A's first frame
  const WA2 = city('#A2', 3); WA2.card(coupeSVG('a2'), -1600, 0, 120, 600, 240); WA2.card(mascotSVG('mA2'), 170, 0, 260, 380, 380);
  WA2.cam(0, 0, { x: 40, y: 330, z: 300, dist: 1500, pitch: 12, yaw: -24 });
  $('#A2').insertAdjacentHTML('beforeend', `<div class="a-t big" style="position:absolute">GTA <i>6</i></div><div class="a-n big" style="position:absolute">ЖДАЛИ <i>13</i> ЛЕТ</div>`);

  // E: the trailer on a rooftop screen, the camera cranes up over the whole city
  const WE = city('#E .e-cam', 7);
  const tvE = WE.card(tvSVG('e'), 0, 380, -120, 640, 470, { shadow: false, tilt: 0.4 });
  WE.box(0, -120, 520, 120, 380, { color: '#3a2f5a' });
  const mE = WE.card(mascotSVG('mE'), 330, 0, 140, 340, 340);
  WE.cam(0, 0, { x: 0, y: 480, z: -100, dist: 1300, pitch: 10, yaw: 0 });
  WE.cam(W('p2', 0), 0.9, { dist: 1600, yaw: -10 }, 'inOut');
  WE.cam(W('p3', 0) - 0.15, 1.9, { y: 1500, dist: 4300, pitch: 36, yaw: 22, z: -500 }, 'inOut');
  WE.cam(L('p3').t1 + 0.1, 0.6, { yaw: 28 }, 'inOut'); WE.drift(0.9);
  const screens = [];
  for (let k = 0; k < 18; k++) { const gx = ((k % 6) - 2.5) * 560, gz = -Math.floor(k / 6) * 640 - 300 - hash(k) * 200, y = 700 + hash(k * 3.3) * 500;
    const s = WE.card(tvSVG('s' + k), gx, y, gz, 220, 160, { shadow: false, tilt: 0.6 }); screens.push(s); hide(s);
    const ts = W('p3', 0) + 0.05 + k * 0.08; tw(s, ts, 0.3, { o: [0, 1], s: [0.3, 1] }, 'back'); }

  // ---------- props ----------
  $('.b-cal').innerHTML = calendarSVG('b', 'ГОД', 'ЖДЁМ', '#ff5fb0'); $('.b-beard').innerHTML = beardSVG('b');
  $('.d-gp').innerHTML = gamepadSVG('d'); $('.j-gp').innerHTML = gamepadSVG('j', '#3a2f5a');
  $('.f-c1').innerHTML = columnSVG('1', '#ffd34d', '#ff5fb0'); $('.f-c2').innerHTML = columnSVG('2', '#8fa0c6', '#4a5670');
  $('.f-pop').innerHTML = popcornSVG('f'); $('.f-crown').textContent = ''; $('.f-crown').className = 'f-crown nb-chip chipL'; $('.f-crown').textContent = 'РЕКОРД';
  $('.h-c1').innerHTML = palmSVG('h1'); $('.h-c2').innerHTML = palmSVG('h2');
  $('.i-moon').innerHTML = moonSVG(); $('.i-bed').innerHTML = bedSVG('i', '#c9824a', '#ff5fb0');
  $$('.mm').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  $('#I .cam').insertBefore($('.i-m'), $('.i-bed'));   // the blanket covers the mascot
  // G: three calendars
  const gcal = [['ОБЕЩАЛИ', 'ОСЕНЬ\n2025', '#5fe0ff', 40, 260], ['ПОТОМ', 'МАЙ', '#ffb84d', 400, 300], ['ВЫШЛА', '19\nНОЯБ', '#7dff8a', 740, 260]].map(([tp, tx, c, x, y], k) => {
    const d = mk('#G .cam', 'g-cal', calendarSVG('g' + k, tp, tx, c)); place(d, x, y); return d; });
  const gst = [0, 1].map(k => { const s = mk('#G .cam', 'g-st stt', 'ПЕРЕНОС'); place(s, [30, 390][k], [600, 640][k]); s.style.width = '300px'; return s; });
  const gok = mk('#G .cam', 'g-st stt g', 'ВЫШЛА'); place(gok, 740, 600); gok.style.width = '280px';
  $('.g-sn').innerHTML = snailSVG('g');
  const pile = []; for (let k = 0; k < 7; k++) { const p = mk('#C .c-pile', 'c-ph', phonePropSVG('c' + k)); place(p, 480 + (k % 3) * 150 + hash(k) * 40, 960 - Math.floor(k / 3) * 120 - hash(k * 2) * 40); p.style.transform = `rotate(${(hash(k * 5) - 0.5) * 50}deg)`; pile.push(p); }

  mascotLife(); mascotTalk();

  // ---------- timeline ----------
  const tB = L('h2').t0 - 0.12, tC = L('h3').t0 - 0.12, tD = L('q').t0 - 0.12, tE = L('p1').t0 - 0.12, tF = L('p4').t0 - 0.12,
        tG = L('d1').t0 - 0.12, tH = L('v').t0 - 0.12, tI = L('t1').t0 - 0.12, tJ = L('qq').t0 - 0.12, tLoop = TOTAL - 0.55;
  sceneCuts(['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I', '#J'], [0, tB, tC, tD, tE, tF, tG, tH, tI, tJ]);
  cutsAll.push(tB, tC, tD, tE, tF, tG, tH, tI, tJ);
  $$('.scene .cam').forEach((c, i) => { if (i) handheld(c, 6, i); });
  ['#B', '#C', '#D', '#F', '#G', '#H', '#I', '#J'].forEach((s, i) => { const t0 = [tB, tC, tD, tF, tG, tH, tI, tJ][i]; tw(s + ' > .cam', t0, 4, { s: [1, 1.05] }, 'lin'); });

  // A — hook (frame 0 = full title)
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  punch('#A .a-t', W('hook', 1), 0.12); punch('#A .a-n', W('hook', 3), 0.16); sfx('pop', W('hook', 3));
  mascotPose(mA, W('hook', 0), 'wave'); mascotPose(mA, W('hook', 3), 'point'); sfx('whoosh', 0.8, 0.6);

  // B — 2013 -> today: years spin, a beard grows
  tZoom('#A', '#B', tB);
  const yr = $('.yr'); custom(t => { const t0 = W('h2', 3), t1 = W('h2', 6); const p = clamp((t - t0) / (t1 - t0)); const y = 2013 + Math.round(13 * p); if (yr.textContent != y) yr.textContent = y; });
  for (let k = 0; k < 13; k++) { const t = W('h2', 3) + (W('h2', 6) - W('h2', 3)) * (k / 13); sfx('tick', t, 0.6); tw('.b-cal .cpage', t, 0.08, { sy: [1, 0.2] }, 'in'); tw('.b-cal .cpage', t + 0.08, 0.1, { sy: [0.2, 1] }, 'out'); }
  hide('.b-beard'); tw('.b-beard', W('h2', 3), 0.05, { o: [0, 1] }, 'lin'); tw('.b-beard', W('h2', 3), W('h2', 6) - W('h2', 3), { sy: [0.05, 1] }, 'lin');
  mascotPose('.b-m', W('h2', 0), 'pointUp'); mascotPose('.b-m', W('h2', 4), 'think'); mascotPose('.b-m', W('h2', 6), 'shock'); jump('.b-m', W('h2', 6), 60, 0.4); sfx('pop', W('h2', 6));
  punch('.b-yr', W('h2', 6), 0.18); sfx('ding', W('h2', 6), 0.8);

  // C — a pile of phones
  morphCut('#B', '#C', tC, '.b-m', '.c-m', 0.55);
  pile.forEach((p, k) => { const t = W('h3', 1) + k * 0.2; hide(p); tw(p, t, 0.05, { o: [0, 1] }, 'lin'); tw(p, t, 0.32, { y: [-700, 0] }, 'in'); tw(p, t + 0.32, 0.25, { y: [-24, 0] }, 'out'); sfx('thud', t + 0.3, 0.5); });
  shake(W('h3', 6) + 0.1, 0.25, 12);
  mascotPose('.c-m', W('h3', 0), 'pointL'); mascotPose('.c-m', W('h3', 4), 'point'); mascotPose('.c-m', W('h3', 6), 'facepalm');

  // D — the question
  tWhip('#C', '#D', tD);
  punch('.d-q', W('q', 3), 0.1); hide('.d-chip'); slideIn('.d-chip', W('q', 7) - 0.1, 'left'); sfx('blip', W('q', 7));
  idle('.d-gp', t => ({ y: 10 * Math.sin(W2 * 14 * t), r: 3 * Math.sin(W2 * 9 * t) }));
  mascotPose('.d-m', W('q', 0), 'hold'); mascotPose('.d-m', W('q', 3), 'point'); mascotPose('.d-m', W('q', 7), 'think');
  focus('#D .cam', W('q', 7), 540, 600, 1.12, 0.6);

  // E — the trailer, then the whole city watching
  tCircle('#D', '#E', tE, 540, 700);
  tw('.e-n', 0, 0.001, { o: [0, 0] }); tw('.e-l', 0, 0.001, { o: [0, 0] });
  hide('.e-chip'); slideIn('.e-chip', W('p1', 2), 'left'); sfx('blip', W('p1', 2));
  tw($$('#E .play'), W('p2', 0), 0.25, { s: [1, 0.6], o: [1, 0] }, 'in'); tw($$('#E .prog'), W('p2', 0), 3.6, { sx: [0.02, 1] }, 'lin'); sfx('pop', W('p2', 0));
  tw('.e-n', W('p3', 0) - 0.1, 0.3, { o: [0, 1], s: [0.6, 1] }, 'back'); counter($('.e-n .cnt'), W('p3', 0) - 0.05, 1.6, 475000000);
  tw('.e-l', W('p3', 1), 0.3, { o: [0, 1], y: [40, 0] }, 'out'); sfx('riser', W('p3', 0) - 0.4, 0.8); sfx('impact', W('p3', 2), 0.7);
  for (let k = 0; k < 8; k++) sfx('tick', W('p3', 0) + k * 0.18, 0.5);
  mascotPose(mE, W('p1', 0), 'point'); mascotPose(mE, W('p3', 0), 'shock');
  slideOut('.e-chip', W('p3', 0) - 0.1, 'left');
  const srcE = mk('#E', 'nb-panel panT', '<b>Rockstar</b>: трейлер №2, май 2025'); place(srcE, 60, 1180); hide(srcE); slideIn(srcE, W('p3', 1) + 0.2, 'left');

  // F — the record: the GTA column outgrows the film trailer
  tSlideUp('#E', '#F', tF);
  const fillA = $$('.f-c1 .fill'), fillB = $$('.f-c2 .fill');
  tw(fillB, W('p4', 3), 0.9, { sy: [0, 0.77] }, 'out'); tw(fillA, W('p4', 5), 1.2, { sy: [0, 1] }, 'out'); sfx('riser2', W('p4', 5), 0.7);
  hide('.f-l1'); hide('.f-l2'); slideIn('.f-l1', W('p4', 5), 'down', 0.5, 120); slideIn('.f-l2', W('p5', 1), 'down', 0.5, 120);
  hide('.f-pop'); popIn('.f-pop', W('p5', 1)); sfx('pop', W('p5', 1));
  // the mascot rides the GTA column up
  const fm = $('.f-m'); place(fm, 145, 1240 - 330); idle(fm, t => { const p0 = W('p4', 5); const p = t < p0 ? 0 : E.out(clamp((t - p0) / 1.2)); return { y: -560 * p }; });
  hide('.f-crown'); place($('.f-crown'), 520, 300); slideIn('.f-crown', W('p4', 9), 'right'); sfx('ding', W('p4', 9), 0.8);
  mascotPose(fm, W('p4', 0), 'hold'); mascotPose(fm, W('p4', 5), 'cheer'); mascotPose(fm, W('p5', 0), 'pointL');
  focus('#F .cam', W('p5', 1), 760, 700, 1.15, 0.7);

  // G — two delays, then "today"
  tDrop('#F', '#G', tG);
  gcal.forEach((c, k) => { hide(c); slideIn(c, [W('d2', 1) - 0.1, W('d2', 3) - 0.1, W('d3', 3) - 0.1][k], k === 2 ? 'right' : 'down', 0.5, 160); });
  gst.forEach((s, k) => { hide(s); stamp(s, [W('d2', 3), W('d3', 1)][k], -8, 14); });
  hide(gok); stamp(gok, W('d3', 4), -6, 18); sfx('ding', W('d3', 4) + 0.15);
  idle('.g-sn', t => ({ x: Math.max(0, t - tG) * 22 }));
  mascotPose('.g-m', W('d1', 0), 'sad'); mascotPose('.g-m', W('d2', 3), 'facepalm'); mascotPose('.g-m', W('d3', 0), 'shrug'); mascotPose('.g-m', W('d3', 4), 'cheer'); jump('.g-m', W('d3', 4), 70, 0.45);
  grade(tG, 'rgba(60,90,160,.25)'); grade(tH, 'transparent');

  // H — verdict: not bait
  tZoom('#G', '#H', tH);
  const hch = mk('#H .cam', 'nb-chip chipL', '2 ПЕРЕНОСА'); place(hch, 60, 420); hide(hch); slideIn(hch, W('v', 0) - 0.05, 'left'); sfx('blip', W('v', 0));
  const hch2 = mk('#H .cam', 'nb-chip chipL', 'ВСЁ РАВНО ЖДАЛИ'); place(hch2, 330, 540); hide(hch2); slideIn(hch2, W('v', 3), 'right'); sfx('blip', W('v', 3));
  slideOut(hch, W('v', 6) - 0.2, 'left'); slideOut(hch2, W('v', 6) - 0.2, 'right');
  hide('.h-q'); popIn('.h-q', W('v', 6) - 0.05); hide('.h-st'); stamp('.h-st', W('v', 8), -7, 26);
  tw('.h-m .armR', W('v', 8) - 0.25, 0.22, { r: [-150, 20] }, 'in');
  burst('#H .cam', 26, 540, 560, W('v', 8) + 0.15, 340, 3); sfx('ding', W('v', 9) + 0.1, 0.7);
  idle('.h-c1 .crown, .h-c2 .crown', t => ({ r: 4 * Math.sin(W2 * 6 * t) }));
  mascotPose('.h-m', W('v', 0), 'pointUp'); mascotPose('.h-m', W('v', 3), 'shrug'); mascotPose('.h-m', W('v', 6), 'think'); mascotPose('.h-m', W('v', 9) + 0.2, 'cheer');
  grade(W('v', 8), 'rgba(80,255,140,.18)'); grade(tI, 'rgba(40,40,120,.3)');

  // I — the catch: 212 GB, go to bed
  morphCut('#H', '#I', tI, '.h-m', '.i-m', 0.55);
  tw('.i-fill', 0, 0.001, { sx: [0, 0] }); tw('.i-fill', W('t1', 3), 3.6, { sx: [0, 0.2] }, 'lin');
  counter($('.gb'), W('t2', 0) - 0.1, 1.0, 212); punch('.i-n', W('t2', 1), 0.15); sfx('impact', W('t2', 1), 0.6);
  hide('.i-moon'); tw('.i-moon', W('t2', 2), 0.7, { y: [260, 0], o: [0, 1] }, 'out');
  tw($$('.i-m .lid'), W('t2', 4), 0.3, { sy: [0, 1] }, 'out');
  for (let k = 0; k < 3; k++) { const z = mk('#I .cam', 'i-z', 'Z'); place(z, 640 + k * 40, 800 - k * 30); hide(z); const t = W('t2', 4) + 0.2 + k * 0.35;
    tw(z, t, 0.2, { o: [0, 1] }, 'lin'); tw(z, t, 1.4, { y: [0, -180], x: [0, 60], s: [0.6, 1.2] }, 'out'); }
  mascotPose('.i-m', W('t1', 0), 'shock'); mascotPose('.i-m', W('t1', 3), 'point'); mascotPose('.i-m', W('t2', 2), 'sad');
  focus('#I .cam', W('t2', 0), 540, 360, 1.18, 0.6);

  // J — question to the viewer, the gamepad leaves
  tWhip('#I', '#J', tJ, 0.46, -1);
  hide('.j-qm'); popIn('.j-qm', W('qq', 4)); sfx('blip', W('qq', 4));
  tw('.j-gp', W('qq', 5), 0.45, { x: [0, 700], r: [0, 25] }, 'in'); sfx('whoosh', W('qq', 5), 0.8);
  mascotPose('.j-m', W('qq', 0), 'point'); mascotPose('.j-m', W('qq', 5), 'shrug');

  loopTo('#A2', tLoop - 0.1);
}, { noCaption: ['hook'] });
