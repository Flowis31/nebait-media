// 037 v2 «Конец эпохи GTA 5» — спецвыпуск в день релиза GTA 6 (19.11.2026), по просьбе Ильи: эпично, ностальгия, переход в новую эпоху.
// Свой приморский город в 3D (world3d.js), свой синтвейв (audio.py --style synthwave). Ни кадров, ни логотипов, ни персонажей, ни музыки Rockstar.
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
  const burst = (par, n, x, y, t, dist = 300, seed = 0, cls = 'conf', fall = 160) => {
    const cols = ['#ffd34d', '#ff5fb0', '#5fe0ff', '#7dff8a', '#ff7a5c'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 9, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 1.1, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 540 * (hash(k + 9) - 0.5) * 2] }, 'out'); tw(s, t + 0.9, 0.3, { o: [1, 0] }, 'lin'); } };
  const counter = (el, t0, d, N) => custom(t => { const p = clamp((t - t0) / d); el.textContent = Math.round(N * (1 - Math.pow(1 - p, 2.4))).toLocaleString('ru-RU'); });

  // ---------- 2D world ----------
  for (let k = 0; k < 70; k++) { const s = mk('#stars', 'star'); place(s, hash(k * 1.3) * 1080, 140 + hash(k * 2.9) * 640); s.style.opacity = (0.3 + 0.6 * hash(k + 4)).toFixed(2);
    const ph = hash(k * 4.4) * 6.28; idle(s, t => ({ s: 0.7 + 0.5 * Math.sin(W2 * (4 + k % 5) * t + ph) })); }
  let sky = ''; for (let k = 0; k < 26; k++) { const x = k * 132 + hash(k) * 40, h = 160 + hash(k * 5.3) * 420, w = 90 + hash(k * 2.1) * 70;
    sky += `<rect x="${x}" y="${760 - h}" width="${w}" height="${h}" fill="#3a1660"/><rect x="${x + 14}" y="${780 - h}" width="${w - 28}" height="${h - 40}" fill="url(#win)" opacity=".7"/>`; }
  $('#sky2').innerHTML = `<svg width="3400" height="760" style="position:absolute;left:0;top:0"><defs><pattern id="win" width="26" height="34" patternUnits="userSpaceOnUse"><rect x="4" y="6" width="12" height="14" fill="#ffd07a" opacity=".55"/></pattern></defs>${sky}</svg>`;
  $('#palms').innerHTML = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => `<div style="position:absolute;left:${k * 340 + hash(k * 7) * 80}px;top:${120 + hash(k) * 60}px;width:${260 + hash(k * 3) * 60}px;height:${560 + hash(k * 3) * 120}px">${palmSVG('bg' + k)}</div>`).join('');
  dof('#sky2', 2); $$('#palms .crown').forEach((c, k) => idle(c, t => ({ r: 3 * Math.sin(W2 * (3 + k % 3) * t + k) })));
  const cutsAll = [];
  custom(t => { let n = 0; for (const c of cutsAll) n += clamp((t - c + 0.3) / 0.6); const x = -n * 120;
    $('#sky2').style.transform = `translateX(${(x * 0.25).toFixed(1)}px)`; $('#palms').style.transform = `translateX(${(x * 0.7).toFixed(1)}px)`; $('#lines').style.transform = `translateX(${(x * 1.2 % 200).toFixed(1)}px)`;
    $('#sun').style.transform = `translateY(${(14 * Math.sin(W2 * 2 * t)).toFixed(1)}px)`; });
  lookFX({ grain: 0.12, tint: 'transparent' });

  // ---------- 3D city ----------
  const COLS = ['#ff5fb0', '#5fe0ff', '#ffb84d', '#8a5cff', '#2fbf71', '#ff7a5c'];
  const city = (par, seed, n = 3) => {
    const Wd = world3d(par, { eyeY: 900 });
    Wd.ground({ haze: '#2b1450', solid: 30, css: 'background:linear-gradient(90deg,transparent 0 48.6%,#ffd34d 48.6% 49.3%,transparent 49.3% 50.7%,#ffd34d 50.7% 51.4%,transparent 51.4%) 0 0/100% 100%,repeating-linear-gradient(0deg,#3a2f5a 0 260px,#2a2346 260px 620px),repeating-linear-gradient(90deg,#3a2f5a 0 260px,#2a2346 260px 620px)' });
    Wd.city({ n, clear: 1, seed, colors: COLS, lit: '#ffe9a8', hMin: 300, hMax: 1200 });
    for (let k = -3; k <= 3; k++) { if (!k) continue; const z1 = -k * 420 - 100 * Math.sign(k), z2 = k * 420 - 260;
      if (z1 < 0) Wd.card(palmSVG(`p${seed}${k + 3}`), 330 * Math.sign(k), 0, z1, 300, 560); if (z2 < 0) Wd.card(palmSVG(`q${seed}${k + 3}`), -330 * Math.sign(k), 0, z2, 280, 520); }
    return Wd;
  };
  // A: hook — dusk, the camera slowly rises over the street
  const A0 = { x: 0, y: 260, z: 200, dist: 1250, pitch: 6, yaw: -18 };
  const WA = city('#A .a-cam', 3); const mA = WA.card(mascotSVG('mA'), 0, 0, 120, 300, 300);
  WA.cam(0, 0, A0); WA.cam(0.05, 2.6, { y: 520, dist: 1700, pitch: 16, yaw: 6 }, 'sine'); WA.drift(0.6);
  const WA2 = city('#A2', 3); WA2.card(mascotSVG('mA2'), 0, 0, 120, 300, 300); WA2.cam(0, 0, A0);
  $('#A2').insertAdjacentHTML('beforeend', `<div class="a-t title" style="position:absolute">КОНЕЦ</div><div class="a-t2 title" style="position:absolute"><i>ЭПОХИ</i></div>`);
  // E: night race — four coupes blast past a low chase camera
  const WE = city('#E .e-cam', 5);
  const cars = [['#ff4fa3', '#c8287a'], ['#5fe0ff', '#2a7ad8'], ['#ffd34d', '#e0901a'], ['#7dff8a', '#2fa85a']].map((c, k) => WE.card(coupeSVG('e' + k, c[0], c[1]), -1900 - k * 260, 0, 60 - (k % 2) * 160, 560, 224, { shadow: true }));
  const mE = WE.card(mascotSVG('mE'), -260, 0, 220, 300, 300);
  WE.cam(0, 0, { x: 0, y: 180, z: 300, dist: 1100, pitch: 3, yaw: -30 });
  WE.cam(L('r1').t0, 2.6, { yaw: 25, x: 300, dist: 1300 }, 'inOut'); WE.drift(1.2);
  // G: RP night city — the mascot lives a second life: taxi, police, business
  const WG = city('#G .g-cam', 9);
  const taxi = WG.card(taxiSVG('g', 1), -900, 0, 60, 520, 300, { shadow: true });
  const siren = WG.card(sirenSVG('g'), 220, 300, 150, 200, 85, { shadow: false });
  const mG = WG.card(mascotSVG('mG'), 220, 0, 150, 300, 300);
  const fol = WG.card(folderSVG('g', 'БИЗНЕС'), 520, 0, 40, 220, 200, { shadow: true });
  WG.cam(0, 0, { x: 0, y: 900, z: -200, dist: 3000, pitch: 34, yaw: 20 });
  WG.cam(L('r3').t0 + 0.5, 1.6, { x: 100, y: 260, z: 120, dist: 1250, pitch: 8, yaw: -8 }, 'inOut');
  WG.cam(W('r4', 2), 1.0, { x: 240, yaw: 6 }, 'inOut'); WG.cam(W('r4', 4), 0.9, { x: 420, yaw: 14 }, 'inOut'); WG.drift(0.9);
  // J: sunrise reveal — crane from the street to the sky
  const WJ = city('#J .j-cam', 11);
  const mJ = WJ.card(mascotSVG('mJ'), 0, 0, 160, 320, 320);
  WJ.cam(0, 0, { x: 0, y: 220, z: 200, dist: 1100, pitch: 2, yaw: 0 });
  WJ.cam(L('n1').t0, 1.9, { y: 1300, dist: 3600, pitch: 30, yaw: -14 }, 'inOut'); WJ.drift(0.8);

  // ---------- props ----------
  $('.b-crt').innerHTML = crtSVG('b'); $('.b-con').innerHTML = consoleSVG('b', 1);
  const cons = [1, 2, 3].map(g => { const d = mk('#C .cam', 'c-k', consoleSVG('c' + g, g)); place(d, [50, 390, 730][g - 1] - 20, 700 - (g - 1) * 60); return d; });
  const cases = []; for (let k = 0; k < 40; k++) { const c = mk('#D .d-grid', 'd-case', caseSVG('d' + k, COLS[k % 6], COLS[(k + 3) % 6])); place(c, 20 + (k % 8) * 132, 470 + Math.floor(k / 8) * 168); cases.push(c); }
  $('.f-para').innerHTML = parachuteSVG('f'); $('.f-hs').innerHTML = headsetSVG('f');
  const bubs = [['СЛУХИ', 'y', 90, 380], ['УТЕЧКА', 'c', 560, 300], ['ПЕРЕНОС', 'r', 300, 560]].map(([t, c, x, y]) => { const b = mk('#H .cam', 'bub ' + c, t); place(b, x, y); return b; });
  const pols = [['ВЫПУСКНОЙ', gradCapSVG(), 70, 300, -8], ['СВАДЬБА', ringsSVG(), 640, 340, 7]].map(([t, art, x, y, r]) => {
    const p = mk('#I .cam', 'pol', `<div class="ph"><div style="left:24px;top:20px;width:230px;height:200px">${art}</div></div><div class="pt">${t}</div>`); place(p, x, y); p.dataset.r = r; return p; });
  $('.m-case').innerHTML = caseSVG('m', '#ff5fb0', '#6a3cff', '5');
  $$('.mm').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  mascotLife(); mascotTalk();

  // ---------- timeline ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('e1'), tC = cut('e2'), tD = cut('e3'), tE = cut('r1'), tF = W('r2', 3) - 0.15, tG = cut('r3'), tH = cut('w1'), tI = cut('w3'), tJ = cut('n1'), tK = cut('n2'), tL = cut('n3'), tM = cut('qq'), tLoop = TOTAL - 0.55;
  const ids = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I', '#J', '#K', '#L', '#M'], cuts = [0, tB, tC, tD, tE, tF, tG, tH, tI, tJ, tK, tL, tM];
  sceneCuts(ids, cuts); cutsAll.push(...cuts.slice(1));
  $$('.scene .cam').forEach((c, i) => { if (i) handheld(c, 6, i); });
  ['#B', '#C', '#D', '#F', '#H', '#I', '#K', '#L', '#M'].forEach(s => { const t0 = cuts[ids.indexOf(s)]; tw(s + ' > .cam', t0, 4, { s: [1, 1.06] }, 'lin'); });

  // A — "today an era ended"
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02, 0.8);
  punch('#A .a-t', W('hook', 1), 0.1); punch('#A .a-t2', W('hook', 3), 0.14); sfx('boom', W('hook', 3), 0.6);
  mascotPose(mA, W('hook', 0), 'sad');

  // B — rewind to 2013: VHS, an old TV, the year spins back
  tZoom('#A', '#B', tB); grade(tB, 'rgba(255,170,90,.35)');
  const yr = $('.yr'); custom(t => { const t0 = tB + 0.1, t1 = W('e1', 2); const p = clamp((t - t0) / (t1 - t0)); const y = 2026 - Math.round(13 * p); if (yr.textContent != y) yr.textContent = y; });
  for (let k = 0; k < 13; k++) sfx('tick', tB + 0.1 + (W('e1', 2) - tB - 0.1) * k / 13, 0.5);
  tw('.vhs', tB, 3.6, { y: [0, 60] }, 'lin');
  hide('.b-con'); tw('.b-con', W('e1', 3), 0.4, { y: [120, 0], o: [0, 1] }, 'back'); sfx('thud', W('e1', 3) + 0.2);
  tw('.rec', W('e1', 2), 0.05, { o: [1, 0] }, 'lin');
  punch('.b-yr', W('e1', 2), 0.16); sfx('ding', W('e1', 4), 0.6);
  const crtTxt = mk('#B .cam', 'lbl', 'GTA <i>5</i>'); place(crtTxt, 200, 640, 460); crtTxt.style.fontSize = '84px'; hide(crtTxt); popIn(crtTxt, W('e1', 4));

  // C — three generations of consoles
  morphCut('#B', '#C', tC, '.b-con', cons[0], 0.55); grade(tC, 'transparent');
  cons.forEach((c, k) => { if (!k) return; hide(c); tw(c, W('e2', 2) + k * 0.28, 0.4, { y: [-500, 0], o: [0, 1] }, 'back'); sfx('thud', W('e2', 2) + k * 0.28 + 0.3, 0.6); });
  hide('.c-l'); slideIn('.c-l', W('e2', 2), 'up', 0.5, 120);
  const fill3 = mk('#C .cam', 'lbl', 'GTA <i>5</i>'); place(fill3, 0, 1080, 1080); fill3.style.fontSize = '64px'; hide(fill3); slideIn(fill3, W('e2', 4), 'down', 0.5, 120);

  // D — 230 million copies: the wall of cases fills the screen
  tDrop('#C', '#D', tD);
  cases.forEach((c, k) => { hide(c); const t = W('e3', 2) - 0.1 + (k % 8) * 0.03 + Math.floor(k / 8) * 0.07; tw(c, t, 0.3, { s: [0.2, 1], o: [0, 1] }, 'back'); });
  for (let k = 0; k < 6; k++) sfx('tick', W('e3', 2) + k * 0.12, 0.5);
  counter($('.d-n .cnt'), W('e3', 2) - 0.05, 1.3, 230000000); hide('.d-l'); tw('.d-l', W('e3', 3), 0.3, { o: [0, 1], y: [40, 0] }, 'out'); sfx('impact', W('e3', 4), 0.6);
  tw('#D .d-grid', W('e3', 3), 1.4, { s: [1, 0.78] }, 'inOut');

  // E — night race with friends
  tCircle('#D', '#E', tE, 540, 900); grade(tE, 'rgba(40,40,140,.28)');
  cars.forEach((c, k) => WE.move(c, W('r1', 2) + k * 0.2, 1.7, { x: 1900 }, 'inOut'));
  for (let k = 0; k < 4; k++) sfx('whoosh', W('r1', 0) + 0.7 + k * 0.22, 0.9);
  $$('#E .whl').forEach(w => idle(w, t => ({ r: t * 900 })));
  hide('.e-chip'); slideIn('.e-chip', W('r1', 2), 'left'); sfx('blip', W('r1', 2));
  mascotPose(mE, W('r1', 0), 'point'); mascotPose(mE, W('r2', 0), 'cheer'); jump(mE, W('r2', 0), 90, 0.45);

  // F — jump from the skyscraper + silly challenges in voice chat
  tSlideUp('#E', '#F', tF);
  tw('.f-para', tF, 2.0, { y: [-240, 260], x: [0, 60] }, 'lin'); tw('.f-m', tF, 2.0, { y: [-240, 260], x: [0, 60] }, 'lin');
  idle('.f-para, .f-m', t => ({ r: 4 * Math.sin(W2 * 10 * t) }));
  hide('.f-hs'); popIn('.f-hs', W('r2', 7)); sfx('pop', W('r2', 7));
  const chat = [['ЕЩЁ РАЗ!', 'y', 560, 700], ['ГО!', 'c', 760, 820]].map(([t, c, x, y]) => { const b = mk('#F .cam', 'bub ' + c, t); place(b, x, y); return b; });
  chat.forEach((b, k) => { hide(b); popIn(b, W('r2', 8) + k * 0.25); sfx('blip', W('r2', 8) + k * 0.25); });
  mascotPose('.f-m', tF, 'cheer');

  // G — RP servers: the camera dives from the night skyline to the street; roles swap on the words
  tZoom('#F', '#G', tG);
  hide('.g-chip'); slideIn('.g-chip', W('r3', 1), 'left'); sfx('blip', W('r3', 1));
  WG.move(taxi, W('r4', 0) - 0.2, 1.4, { x: -120 }, 'out');
  hide(siren); tw(siren, W('r4', 2), 0.3, { o: [0, 1], s: [0.4, 1] }, 'back'); sfx('zap', W('r4', 2), 0.7);
  idle($$('#G .lr'), t => ({ o: (Math.floor(t * 6) % 2) ? 0.35 : 1 })); idle($$('#G .lb'), t => ({ o: (Math.floor(t * 6) % 2) ? 1 : 0.35 }));
  hide(fol); tw(fol, W('r4', 4), 0.35, { o: [0, 1], s: [0.4, 1] }, 'back'); sfx('coin', W('r4', 5), 0.8);
  mascotPose(mG, W('r3', 2), 'wave'); mascotPose(mG, W('r4', 1), 'point'); mascotPose(mG, W('r4', 2), 'shock'); mascotPose(mG, W('r4', 4), 'hold');

  // H — the long wait: rumours, leaks, delays
  tWhip('#G', '#H', tH, 0.46, -1); grade(tH, 'rgba(60,80,170,.3)');
  bubs.forEach((b, k) => { hide(b); popIn(b, W('w2', [0, 1, 2][k]) - 0.05); sfx('pop', W('w2', [0, 1, 2][k])); idle(b, t => ({ y: 8 * Math.sin(W2 * (8 + k) * t + k) })); });
  hide('.h-q'); popIn('.h-q', W('w2', 6)); tw('.h-q', W('w2', 7), 1.2, { r: [0, 12] }, 'inOut');
  mascotPose('.h-m', W('w1', 0), 'sad'); mascotPose('.h-m', W('w2', 0), 'think'); mascotPose('.h-m', W('w2', 3), 'shrug');
  focus('#H .cam', W('w2', 3), 540, 700, 1.1, 1.0);

  // I — life went on: polaroids
  tCircle('#H', '#I', tI, 540, 900); grade(tI, 'rgba(255,170,90,.32)');
  pols.forEach((p, k) => { hide(p); const t = W('w3', [4, 7][k]) - 0.15; tw(p, t, 0.5, { y: [-600, 0], r: [k ? -25 : 25, +p.dataset.r], o: [0, 1] }, 'back'); sfx('whoosh', t, 0.6); });
  mascotPose('.i-m', W('w3', 0), 'hold'); mascotPose('.i-m', W('w3', 7), 'cheer');

  // J — and today it's out: the sunrise crane
  tZoom('#I', '#J', tJ); grade(tJ, 'rgba(255,200,120,.2)');
  hide('.j-t'); hide('.j-d'); hide('.rays');
  tw('.rays', W('n1', 2), 0.6, { o: [0, 1] }, 'out'); idle('.rays', t => ({ r: t * 6 }));
  tw('.j-t', W('n1', 4) - 0.1, 0.5, { s: [2.4, 1], o: [0, 1] }, 'back2'); sfx('impact', W('n1', 4), 0.9); shake(W('n1', 4) + 0.2, 0.4, 20);
  tw('.j-d', W('n1', 4) + 0.3, 0.4, { o: [0, 1], y: [40, 0] }, 'out');
  burst('#J', 34, 540, 420, W('n1', 4) + 0.1, 420, 5); sfx('riser', W('n1', 0) - 0.3, 0.9);
  mascotPose(mJ, W('n1', 0), 'pointUp'); mascotPose(mJ, W('n1', 4), 'cheer');

  // K — verdict: the event of the decade? Not bait
  tSlideUp('#J', '#K', tK); grade(tK, 'transparent');
  hide('.k-st'); stamp('.k-st', W('n2', 5), -7, 26); tw('.k-m .armR', W('n2', 5) - 0.25, 0.22, { r: [-150, 20] }, 'in');
  burst('#K .cam', 24, 540, 560, W('n2', 5) + 0.15, 340, 3); grade(W('n2', 5), 'rgba(80,255,140,.16)');
  mascotPose('.k-m', W('n2', 0), 'think'); mascotPose('.k-m', W('n2', 6) + 0.2, 'cheer');

  // L — 5 crumbles, 6 rises
  tZoom('#K', '#L', tL); grade(tL, 'transparent');
  hide('.l-6'); hide('.l-cap');
  const five = $('.l-5'); tw(five, W('n3', 2), 0.5, { y: [0, 500], o: [1, 0], r: [0, 18] }, 'in'); sfx('boom', W('n3', 2) + 0.1, 0.6);
  for (let k = 0; k < 14; k++) { const p = mk('#L .cam', 'piece'); place(p, 380 + hash(k) * 300, 420 + hash(k * 2) * 380); hide(p); const t = W('n3', 2);
    tw(p, t, 0.05, { o: [0, 1] }, 'lin'); tw(p, t, 0.9, { y: [0, 900], x: [0, (hash(k * 3) - 0.5) * 500], r: [0, 360 * (hash(k + 1) - 0.5)] }, 'in'); }
  tw('.l-6', W('n3', 3) - 0.1, 0.7, { y: [500, 0], o: [0, 1], s: [0.6, 1] }, 'back'); sfx('riser2', W('n3', 3) - 0.3, 0.8); sfx('ding', W('n3', 4), 0.7);
  slideIn('.l-cap', W('n3', 4), 'down', 0.5, 120);

  // M — question, then loop to the first frame
  morphCut('#L', '#M', tM, '.l-6', '.m-case', 0.55);
  hide('.m-q'); popIn('.m-q', W('qq', 1));
  mascotPose('.m-m', W('qq', 0), 'point'); mascotPose('.m-m', W('qq', 3), 'think');
  loopTo('#A2', tLoop - 0.1);
}, { noCaption: ['hook'] });
