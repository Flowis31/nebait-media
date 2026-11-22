// 038 «99% интернета идёт одним путём. Каким?» — Как это работает, 3D-пилот (22.11.2026).
// Мир: вечерний приморский город и дно океана в 3D (world3d.js); 2D-сцены — подводный мир (лучи, пузыри с параллаксом).
TIMING.words.forEach(w => { if (w.d === '—') w.d = ''; });
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
  const burst = (par, n, x, y, t, dist = 260, seed = 0, cls = 'spark', fall = 80) => {
    for (let k = 0; k < n; k++) { const s = mk(par, cls); place(s, x - 18, y - 18);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.5 + 0.5 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.05, { o: [0, 1] }, 'lin');
      tw(s, t, 0.8, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5)], s: [1.2, 0.4] }, 'out'); tw(s, t + 0.6, 0.25, { o: [1, 0] }, 'lin'); } };

  // ---------- 2D world: bubbles in two parallax layers ----------
  for (const [id, n, sz, sp] of [['#bub2', 22, 26, 0.5], ['#bub1', 14, 54, 1]]) for (let k = 0; k < n; k++) {
    const b = mk(id, 'bb'); const s = sz * (0.6 + 0.8 * hash(k * 2.3 + sz)); place(b, hash(k * 1.7 + sz) * 1700, hash(k * 3.1 + sz) * 1920, s, s);
    const ph = hash(k * 5.5) * 6.28; idle(b, t => ({ x: 14 * Math.sin(W2 * (3 + k % 4) * t + ph), y: -((t * 60 * sp + hash(k) * 1920) % 2100) + 100 }));
  }
  const cutsAll = [];
  custom(t => { let n = 0; for (const c of cutsAll) n += clamp((t - c + 0.3) / 0.6); const x = -n * 90;
    $('#bub2').style.transform = `translateX(${(x * 0.35 % 400).toFixed(1)}px)`; $('#bub1').style.transform = `translateX(${(x % 400).toFixed(1)}px)`;
    $('#shafts').style.transform = `translateX(${(x * 0.15 + 30 * Math.sin(W2 * 2 * t)).toFixed(1)}px)`; });
  lookFX({ grain: 0.11, tint: 'transparent' });

  // ---------- 3D worlds ----------
  const COLS = ['#2f9c8f', '#3f7bd8', '#e0904a', '#7a55c9', '#c2507a', '#3aa6c8'];
  const SKY = 'linear-gradient(180deg,#0b1a3a 0%,#1f3f7a 30%,#e07a5c 52%,#ffc27a 58%,#2a4a5a 58.5%,#10303f 100%)';
  const city = (par, seed, o = {}) => {
    const Wd = world3d(par, { eyeY: 900 });
    Wd.sky(o.sky || SKY);
    Wd.ground({ haze: o.haze || '#24405a', solid: 32, css: 'background:linear-gradient(90deg,transparent 0 48.7%,#ffd34d 48.7% 49.2%,transparent 49.2% 50.8%,#ffd34d 50.8% 51.3%,transparent 51.3%) 0 0/100% 100%,repeating-linear-gradient(0deg,#3c4a5c 0 260px,#2a3646 260px 620px),repeating-linear-gradient(90deg,#3c4a5c 0 260px,#2a3646 260px 620px)' });
    Wd.city({ n: o.n || 2, clear: 1, seed, colors: COLS, lit: '#ffe9a8', hMin: 280, hMax: o.hMax || 1000 });
    return Wd;
  };
  const phoneScr = `<rect x="22" y="44" width="176" height="330" rx="18" fill="#1d2a44"/><rect x="58" y="160" width="104" height="76" rx="14" fill="#ff5f6d" stroke="#0a130d" stroke-width="6"/><path d="M98 180 L126 198 L98 216 Z" fill="#fff"/>`;

  // A: hook — evening city, wide → push in to the mascot with his phone
  const A0 = { x: 0, y: 420, z: 60, dist: 2500, pitch: 20, yaw: -22 };
  const WA = city('#A .a-cam', 3);
  const mA = WA.card(mascotSVG('mA'), -40, 0, 160, 340, 340), phA = WA.card(phonePropSVG('pA', phoneScr), 130, 120, 200, 90, 170, { shadow: false });
  WA.cam(0, 0, A0); WA.cam(0.5, 3.2, { yaw: -12, dist: 2250, y: 380 }, 'inOut'); WA.cam(W('h2', 0) - 0.2, 1.7, { y: 220, z: 160, dist: 1150, pitch: 5, yaw: 8 }, 'inOut'); WA.drift(0.6);
  const WA2 = city('#A2', 3); WA2.card(mascotSVG('mA2'), -40, 0, 160, 340, 340); WA2.card(phonePropSVG('pA2', phoneScr), 130, 120, 200, 90, 170, { shadow: false }); WA2.cam(0, 0, A0);
  $('#A2').insertAdjacentHTML('beforeend', `<div class="a-t title" style="position:absolute">99%</div><div class="a-t2 lbl" style="position:absolute">ИНТЕРНЕТА —<br><i>ОДНИМ ПУТЁМ</i></div>`);

  // B: crane up from the street to the satellite (scale)
  const WB = city('#B .b-cam', 5, { sky: 'linear-gradient(180deg,#02040f 0%,#0b1a3a 35%,#1f3f7a 55%,#e07a5c 70%,#2a4a5a 71%,#10303f 100%)' });
  const mB = WB.card(mascotSVG('mB'), -40, 0, 160, 340, 340), phB = WB.card(phonePropSVG('pB', phoneScr), 130, 120, 200, 90, 170, { shadow: false });
  const satB = WB.card(satelliteSVG('sB'), 0, 1700, -300, 800, 525, { shadow: false, tilt: 0 });
  const beamB = WB.beam([130, 220, 200], [0, 1720, -300], '#43f0ff', 10);
  WB.cam(0, 0, { x: 0, y: 220, z: 160, dist: 1150, pitch: 5, yaw: 8 });
  WB.cam(W('s1', 1) - 0.1, 1.5, { x: 0, y: 1520, z: -200, dist: 1900, pitch: 10, yaw: -8 }, 'inOut'); WB.drift(0.7);

  // C: phone → tower → cable under the street
  const WC = city('#C .c-cam', 8);
  const mC = WC.card(mascotSVG('mC'), -40, 0, 160, 340, 340), phC = WC.card(phonePropSVG('pC', phoneScr), 130, 120, 200, 90, 170, { shadow: false });
  const towC = WC.card(cellTowerSVG('tC'), 380, 0, -600, 420, 980, { shadow: false });
  WC.plane(380, 1, -2500, 110, 3800, { rx: 90, css: 'background:linear-gradient(90deg,#1b1208,#3a2814 50%,#1b1208);border:6px solid #0a130d' });
  const bC1 = WC.beam([130, 220, 200], [380, 860, -600], '#43f0ff', 10), bC2 = WC.beam([380, 4, -600], [380, 4, -4400], '#43f0ff', 22);
  WC.cam(0, 0, { x: 0, y: 230, z: 120, dist: 1250, pitch: 5, yaw: -12 });
  WC.cam(W('s3', 5) - 0.3, 1.0, { x: 260, y: 520, z: -300, dist: 1700, pitch: 6, yaw: -16 }, 'inOut');
  WC.cam(W('s3', 7), 1.2, { x: 380, y: 0, z: -1500, dist: 2300, pitch: 34, yaw: -12 }, 'inOut'); WC.drift(0.7);

  // D: along the cable to the shore and into the sea
  const WDd = world3d('#D .d-cam', { eyeY: 900 });
  WDd.sky(SKY); WDd.ground({ haze: '#24405a', solid: 34, css: 'background:linear-gradient(180deg,#0f6a8f 0 30%,#e8cf96 30% 38%,#3c4a5c 38%)' });
  // the ground is 7000 deep: rows 0..30% (z -3500..-1400) are sea, 30..38% beach, the rest city land
  WDd.plane(0, 2, -2700, 7000, 2600, { rx: 90, css: 'background:repeating-linear-gradient(0deg,#1580a8 0 60px,#0f6a8f 60px 150px)' });
  for (let k = 0; k < 10; k++) { const side = k % 2 ? 1 : -1, z = 700 - Math.floor(k / 2) * 380, col = COLS[k % 6], h = 300 + hash(k * 2.7) * 600;
    WDd.box(side * (380 + hash(k) * 140), z, 260, 260, h, { color: col, face: WDd.windows(col, '#ffe9a8') }); }
  const bD = WDd.beam([0, 5, 1100], [0, 5, -1400], '#43f0ff', 22);
  const pulD = WDd.card('<div class="pulse" style="left:0;top:0;width:100%;height:100%"></div>', 0, 0, 1000, 120, 120, { shadow: false });
  const mD = WDd.card(mascotSVG('mD'), 300, 0, -1150, 380, 380);
  WDd.cam(0, 0, { x: 0, y: 500, z: 900, dist: 1700, pitch: 26, yaw: 0 });
  WDd.cam(W('s4', 1), 2.2, { z: -1000, y: 260, x: 120, dist: 1350, pitch: 14, yaw: 2 }, 'inOut'); WDd.drift(0.6);

  // E: the sea floor — dive, orbit the cable, look along it to the horizon
  const WE = world3d('#E .e-cam', { eyeY: 900 });
  WE.sky('linear-gradient(180deg,#1aa0c8 0%,#0b5a7a 30%,#06395a 55%,#04263a 100%)');
  WE.ground({ haze: '#05304a', solid: 26, css: 'background:radial-gradient(circle at 30% 40%,#a3865a 0 3%,transparent 3.5%) 0 0/300px 300px,#7a6440' });
  const bE = WE.beam([0, 16, 1400], [0, 16, -6000], '#2c3644', 34); const bE2 = WE.beam([0, 34, 1400], [0, 34, -6000], '#43f0ff', 5);
  for (let k = 0; k < 6; k++) { const s = k % 2 ? 1 : -1; WE.box(s * (380 + hash(k * 3) * 300), 500 - k * 700, 160 + hash(k) * 120, 140, 60 + hash(k * 5) * 90, { color: '#5a5f66', ink: 5 }); }
  const fishE = [0, 1, 2, 3].map(k => WE.card(fishSVG('fE' + k, ['#ffb84d', '#ff7a8a', '#7dff8a', '#ffd34d'][k]), -500 + k * 330, 260 + hash(k) * 300, -200 - k * 500, 160, 96, { shadow: false }));
  const mE = WE.card(mascotSVG('mE'), -430, 120, 80, 380, 380);
  const pulE = [0, 1, 2].map(k => WE.card('<div class="pulse" style="left:0;top:0;width:100%;height:100%"></div>', 0, 2, 1300, 110, 110, { shadow: false }));
  WE.cam(0, 0, { x: 0, y: 1100, z: 500, dist: 2400, pitch: 38, yaw: 0 });
  WE.cam(L('s5').t0 - 0.1, 1.0, { y: 140, z: 250, dist: 950, pitch: 8, yaw: -38 }, 'inOut');
  WE.cam(W('s5', 3), 1.3, { yaw: 38, x: 60 }, 'inOut');
  WE.cam(W('s5', 6) - 0.1, 1.0, { y: 320, z: 400, dist: 1500, pitch: 10, yaw: 4, x: 0 }, 'inOut'); WE.drift(0.8);

  // ---------- 2D props ----------
  $('.b-drop').innerHTML = dropSVG('bd', true);
  $('.f-hose').innerHTML = gardenHoseSVG('fh'); $('.f-cab').innerHTML = cableCutSVG('fc'); $('.f-hair').innerHTML = hairHTML();
  $('.g-shark').innerHTML = sharkSVG('gs'); $('.g-anc').innerHTML = anchorSVG('ga'); $('.g-net').innerHTML = netSVG();
  $('.h-map').innerHTML = mapSVG(); $('.h-p').innerHTML = personSVG('hp', '#ff7a3d');
  $$('.mm').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  mascotLife(); mascotTalk();

  // ---------- timeline ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('s1'), tC = cut('s3'), tD = cut('s4'), tE = cut('s5'), tF = cut('s6'), tG = cut('j1'), tH = cut('st'), tLoop = TOTAL - 0.55;
  const ids = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H'], cuts = [0, tB, tC, tD, tE, tF, tG, tH];
  sceneCuts(ids, cuts); cutsAll.push(...cuts.slice(1));
  ['#F', '#G', '#H'].forEach((s, i) => { handheld(s + ' > .cam', 6, i + 1); const t0 = cuts[ids.indexOf(s)]; tw(s + ' > .cam', t0, 6, { s: [1, 1.06] }, 'lin'); });

  // A — hook
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02, 0.8);
  punch('#A .a-t', W('hook', 0), 0.08); punch('#A .a-t2', W('hook', 5), 0.1);
  mascotPose(mA, 0.3, 'hold'); mascotPose(mA, W('hook', 2), 'wave'); jump(mA, W('hook', 3), 60, 0.45); idle($$('.screen', phA), t => ({ o: 0.75 + 0.25 * Math.sin(W2 * 20 * t) })); mascotPose(mA, W('hook', 5), 'pointUp');
  idle(phA, t => ({ r: 4 * Math.sin(W2 * 6 * t) }));
  tw('#A .a-t, #A .a-t2', W('h2', 0) - 0.1, 0.4, { y: [0, -400], o: [1, 0] }, 'in'); sfx('whoosh', W('h2', 0) - 0.1, 0.6);
  hide('.a-chip'); slideIn('.a-chip', W('h2', 1), 'left'); sfx('blip', W('h2', 1));
  mascotPose(mA, W('h2', 0), 'think'); mascotPose(mA, W('h2', 1), 'point');
  punch(phA, W('h2', 2), 0.25); sfx('pop', W('h2', 2));

  // B — "to the satellite?" crane up; "no, just a drop"
  tZoom('#A', '#B', tB);
  WB.grow(beamB, W('s1', 1), 1.2); sfx('zap', W('s1', 1), 0.6); sfx('riser2', W('s1', 1), 0.7);
  mascotPose(mB, tB + 0.1, 'pointUp'); mascotPose(mB, W('s2', 0), 'shrug');
  const sB = satB; idle(sB, t => ({ r: 3 * Math.sin(W2 * 7 * t) }));
  tw($$('.spanL', sB), W('s2', 0), 0.3, { r: [0, 14] }, 'back'); tw($$('.spanR', sB), W('s2', 0), 0.3, { r: [0, -14] }, 'back');
  tw($$('.sbrow', sB), W('s2', 0), 0.3, { y: [0, -10] }, 'back');
  hide('.b-drop'); tw('.b-drop', W('s2', 3) - 0.05, 0.4, { s: [0.2, 1], o: [0, 1], y: [-40, 0] }, 'back'); sfx('blip', W('s2', 3));
  hide('.b-l'); slideIn('.b-l', W('s2', 3), 'down', 0.5, 140); grade(W('s2', 0), 'rgba(80,120,255,.22)');

  // C — phone → tower → underground cable
  tWhip('#B', '#C', tC, 0.46, 1); grade(tC, 'transparent');
  mascotPose(mC, tC + 0.1, 'point'); mascotPose(mC, W('s3', 7), 'pointL');
  WC.grow(bC1, W('s3', 5), 0.5); sfx('zap', W('s3', 5), 0.6);
  idle($$('.twave', towC), t => ({ s: t > W('s3', 6) ? 1 + 0.15 * Math.sin(W2 * 40 * t) : 1, o: t > W('s3', 6) ? 1 : 0.25 }));
  idle($$('.tlight', towC), t => ({ o: (Math.floor(t * 3) % 2) ? 1 : 0.2 }));
  WC.grow(bC2, W('s3', 9), 1.0); sfx('whoosh', W('s3', 9), 0.6);
  hide('.c-chip'); slideIn('.c-chip', W('s3', 9), 'left'); sfx('blip', W('s3', 9));

  // D — along the street to the beach and into the water
  tCircle('#C', '#D', tD, 540, 900);
  WDd.grow(bD, tD, 1.6, 'inOut');
  WDd.move(pulD, tD + 0.2, 2.6, { z: -1500 }, 'inOut');
  hide('.d-chip'); slideIn('.d-chip', W('s4', 5), 'left'); sfx('blip', W('s4', 5));
  mascotPose(mD, tD + 0.2, 'wave'); mascotPose(mD, W('s4', 7), 'shock'); jump(mD, W('s4', 8), 70, 0.45);
  sfx('whoosh', W('s4', 9), 0.5);

  // E — dive to the sea floor, orbit the cable
  tZoom('#D', '#E', tE); grade(tE, 'rgba(30,140,200,.25)'); sfx('boom', tE + 0.1, 0.35);
  WE.grow(bE, tE, 0.001); WE.grow(bE2, tE, 0.001);
  pulE.forEach((p, k) => WE.move(p, tE + 0.2 + k * 0.7, 2.0, { z: -5000 }, 'lin'));
  fishE.forEach((f, k) => { WE.move(f, tE, 3.4, { x: -500 + k * 330 + (k % 2 ? 260 : -260) }, 'lin'); idle($$('.ftail', f), t => ({ r: 14 * Math.sin(W2 * 60 * t + k) })); });
  idle(mE, t => ({ y: 10 * Math.sin(W2 * 8 * t), r: 4 * Math.sin(W2 * 5 * t) }));
  mascotPose(mE, tE + 0.1, 'shock'); mascotPose(mE, W('s5', 3), 'pointL'); WE.move(mE, W('s5', 3) - 0.1, 1.4, { x: 120, z: 0 }, 'inOut'); mascotPose(mE, W('s5', 6), 'cheer');
  hide('.e-chip'); slideIn('.e-chip', W('s5', 6), 'left'); sfx('blip', W('s5', 6)); sfx('riser2', W('s5', 3) - 0.3, 0.6);

  // F — garden hose = cable; inside: glass fibres thinner than a hair; light carries the video
  tZoom('#E', '#F', tF); grade(tF, 'transparent');
  hide('.f-cab'); tw('.f-cab', W('s6', 0), 0.5, { s: [0.3, 1], o: [0, 1], r: [-40, 0] }, 'back'); sfx('pop', W('s6', 0));
  hide('.f-hose'); tw('.f-hose', W('s6', 3) - 0.05, 0.5, { x: [-500, 0], o: [0, 1] }, 'out5'); sfx('whoosh', W('s6', 3) - 0.1, 0.6);
  hide('.f-eq'); popIn('.f-eq', W('s6', 4)); sfx('ding', W('s6', 4), 0.6);
  // inside: hose and "=" leave, the cable comes to the centre, layers spread, fibres light up
  tw('.f-hose, .f-eq', W('s6', 6) - 0.2, 0.35, { x: [0, -700], o: [1, 0] }, 'in');
  tw('.f-cab', W('s6', 6) - 0.2, 0.6, { x: [0, -245], y: [0, 0], s: [1, 1.15] }, 'out');
  const fc = $('.f-cab');
  [0, 1, 2, 3].forEach(k => tw($$('.cl' + k, fc), W('s6', 6), 0.5, { s: [1, 1 + 0.06 * (4 - k)] }, 'back'));
  hide($$('.cglow', fc)); tw($$('.cglow', fc), W('s6', 8), 0.4, { o: [0, 1] }, 'out');
  $$('.cfib', fc).forEach((f, k) => { tw(f, W('s6', 8) + k * 0.05, 0.3, { s: [0.4, 1.5] }, 'back'); idle(f, t => ({ s: t > W('s6', 8) + 0.5 ? 1 + 0.25 * Math.sin(W2 * 30 * t + k) : 1 })); });
  sfx('zap', W('s6', 8), 0.5);
  hide('.f-hair'); slideIn('.f-hair', W('s6', 9), 'right'); sfx('blip', W('s6', 9));
  tw($$('.fibl'), W('s6', 10), 0.5, { dash: [100, 0] }, 'out');
  mascotPose('.f-m', tF + 0.1, 'point'); mascotPose('.f-m', W('s6', 6), 'shock'); mascotPose('.f-m', W('s6', 10), 'think');
  focus('#F > .cam', W('s6', 8), 500, 680, 1.12, 0.6);
  // s7: the fibre across the screen, light with the video runs along it
  slideOut('.f-hair', W('s7', 0) - 0.1, 'right');
  hide('.f-fib'); tw('.f-fib', W('s7', 0), 0.5, { sx: [0, 1], o: [0, 1] }, 'out');
  for (let k = 0; k < 3; k++) { const p = mk('#F > .cam', k === 1 ? 'vid' : 'pulse'); place(p, -160, k === 1 ? 198 : 218);
    hide(p); tw(p, W('s7', 2) + k * 0.25, 0.05, { o: [0, 1] }, 'lin'); tw(p, W('s7', 2) + k * 0.25, 1.1, { x: [0, 1400] }, 'inOut'); }
  sfx('whoosh', W('s7', 2), 0.7); sfx('ding', W('s7', 5), 0.5);
  mascotPose('.f-m', W('s7', 2), 'cheer');

  // G — sharks? almost never. ~200 breaks a year: anchors and fishermen
  morphCut('#F', '#G', tG, '.f-cab', '.g-cab', 0.6);
  tw('.g-shark', W('j1', 2), 1.1, { x: [0, -560] }, 'out'); idle($$('.shtail', $('.g-shark')), t => ({ r: 10 * Math.sin(W2 * 50 * t) }));
  sfx('whoosh', W('j1', 2), 0.6);
  tw($$('.shjaw', $('.g-shark')), W('j1', 3), 0.25, { r: [0, 14] }, 'back');
  tw('.g-shark', W('j1', 4), 0.5, { r: [0, -6] }, 'inOut'); tw($$('.shjaw', $('.g-shark')), W('j1', 4), 0.2, { r: [14, 0] }, 'in');
  tw('.g-shark', W('j1', 5) + 0.2, 0.8, { x: [-560, -1900], sx: [1, 1], r: [-6, 0] }, 'in'); sfx('whoosh', W('j1', 5) + 0.25, 0.5);
  mascotPose('.g-m', tG + 0.1, 'think'); mascotPose('.g-m', W('j1', 4), 'shrug');
  hide('.g-n'); hide('.g-nl');
  tw('.g-n', W('s8', 2), 0.35, { s: [0.4, 1], o: [0, 1] }, 'back');
  const cnt = $('.g-n .cnt'), c0 = W('s8', 3) - 0.1; custom(t => { const p = clamp((t - c0) / 0.6); cnt.textContent = Math.round(200 * (1 - Math.pow(1 - p, 2.4))); });
  for (let k = 0; k < 6; k++) sfx('tick', c0 + k * 0.1, 0.5);
  slideIn('.g-nl', W('s8', 4), 'down', 0.5, 120); sfx('ding', W('s8', 6), 0.5);
  focus('#G > .cam', W('s8', 3), 540, 320, 1.15, 0.5);
  hide('.g-anc'); tw('.g-anc', W('s8', 10) - 0.35, 0.4, { o: [0, 1], y: [0, 1250] }, 'in');
  const tHit = W('s8', 10) + 0.05; shake(tHit, 0.35, 24); sfx('impact', tHit, 0.8); burst('#G > .cam', 16, 715, 1080, tHit, 240, 3);
  tw('.g-cab', tHit, 0.12, { y: [0, 26] }, 'out'); tw('.g-cab', tHit + 0.12, 0.4, { y: [26, 0] }, 'back');
  hide('.g-net'); tw('.g-net', W('s8', 12) - 0.3, 0.5, { o: [0, 1], y: [0, 1240] }, 'in'); sfx('thud', W('s8', 12) + 0.2, 0.7);
  mascotPose('.g-m', W('s8', 10), 'shock'); mascotPose('.g-m', W('s8', 12) + 0.2, 'facepalm');
  hide('.g-src'); slideIn('.g-src', W('s8', 7), 'left'); grade(W('s8', 10), 'rgba(255,80,80,.18)');

  // H — verdict and the question
  morphCut('#G', '#H', tH, '.g-cab', '.h-map', 0.6); grade(tH, 'transparent');
  const hp = $('#hpath'); tw(hp, W('st', 2), 1.2, { dash: [100, 0] }, 'inOut');
  const len = hp.getTotalLength(), hv = mk('#H > .cam', 'vid'); hide(hv);
  tw(hv, W('st', 2), 0.05, { o: [0, 1] }, 'lin');
  custom(t => { const p = E.inOut(clamp((t - W('st', 2)) / 1.2)), pt = hp.getPointAtLength(len * p); hv.style.left = (pt.x - 75) + 'px'; hv.style.top = (600 + pt.y * 700 / 700 - 55) + 'px'; });
  tw(hv, W('st', 2) + 1.25, 0.3, { o: [1, 0], s: [1, 1.6] }, 'out');
  hide('.h-n'); popIn('.h-n', W('st', 2)); sfx('ding', W('st', 6), 0.6);
  hide('.h-st'); stamp('.h-st', W('st', 8), -7, 26); tw('.h-m .armR', W('st', 8) - 0.25, 0.22, { r: [-150, 20] }, 'in');
  burst('#H > .cam', 22, 540, 400, W('st', 8) + 0.15, 320, 5); grade(W('st', 8), 'rgba(80,255,140,.16)');
  mascotPose('.h-m', tH + 0.1, 'point'); mascotPose('.h-m', W('st', 7) - 0.3, 'pointUp'); mascotPose('.h-m', W('st', 9) + 0.2, 'cheer');
  tw('.h-p', W('st', 6) + 0.3, 0.3, { y: [0, -40] }, 'out'); tw('.h-p', W('st', 6) + 0.6, 0.3, { y: [-40, 0] }, 'back');
  hide('.h-q'); slideIn('.h-q', W('q', 0), 'down', 0.6, 160); sfx('blip', W('q', 0));
  mascotPose('.h-m', W('q', 2), 'think');
  loopTo('#A2', tLoop - 0.1);
}, { noCaption: ['hook'] });
