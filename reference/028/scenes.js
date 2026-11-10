// 028 «Wi-Fi и микроволновка на одной волне. Почему не жарит?» — Как это работает, история с героями: маскот на кухне,
// микроволновка и роутер с лицами. Источники: HyperPhysics (GSU) «Microwave Ovens» (2 450 МГц, волна ~12 см, дырочки ~1 мм);
// FDA «Microwave Ovens» (вода в еде колеблется и греется, металл отражает волны, допустима малая утечка); Apple Support 102319
// (23.04.2025: Wi-Fi в 2,4 ГГц, микроволновки — источник помех, переход на 5 ГГц); ETSI EN 300 328 (2,4 ГГц: до 100 мВт ЭИИМ);
// The Physics Factbook (печи 400–1 200 Вт). Свой мир: вечерняя кухня (плитка — дальний слой, шкафы и лампа — средний, столешница — ближний).
boot(() => {
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
  const clamp = x => Math.max(0, Math.min(1, x));
  const place = (el, x, y, w, h) => { el.style.left = x + 'px'; el.style.top = y + 'px'; if (w) el.style.width = w + 'px'; if (h) el.style.height = h + 'px'; return el; };
  const easeIO = x => (x = clamp(x), x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const W = (k, i) => wt(k, i);
  const NS = 'http://www.w3.org/2000/svg';
  const svgPath = (svg, cls, stroke, w, extra = '') => { const p = document.createElementNS(NS, 'path'); p.setAttribute('class', 'wv ' + cls); p.setAttribute('stroke', stroke); p.setAttribute('stroke-width', w); if (extra) p.setAttribute('style', extra); (typeof svg === 'string' ? $(svg) : svg).appendChild(p); return p; };
  // a live sine wave: path redrawn every frame (phase runs), amplitude from ampFn(t)
  const liveWave = (p, x0, y, len, wl, ampFn, speed = 6, ph0 = 0) => { const draw = t => p.setAttribute('d', sinePath(x0, y, len, ampFn(t), wl, ph0 - speed * t)); draw(0); custom(draw); };
  const jump = (el, t, h = 80, d = 0.5, shd = null) => {
    tw(el, t - 0.12, 0.12, { sy: [1, 0.86], sx: [1, 1.08] }, 'out');
    tw(el, t, d / 2, { y: [0, -h], sy: [0.86, 1.08], sx: [1.08, 0.95] }, 'out');
    tw(el, t + d / 2, d / 2, { y: [-h, 0], sy: [1.08, 1], sx: [0.95, 1] }, 'in');
    tw(el, t + d, 0.08, { sy: [1, 0.88], sx: [1, 1.1] }, 'out'); tw(el, t + d + 0.08, 0.3, { sy: [0.88, 1], sx: [1.1, 1] }, 'back');
    if (shd) { tw(shd, t, d / 2, { s: [1, 0.6], o: [1, 0.5] }, 'out'); tw(shd, t + d / 2, d / 2, { s: [0.6, 1], o: [0.5, 1] }, 'in'); }
  };
  const arc = (el, t, d, dx, dy, h, rot = 0) => idle(el, tt => { if (tt < t) return {}; const u = easeIO((tt - t) / d); return { x: dx * u, y: dy * u - 4 * h * u * (1 - u), r: rot * u }; });
  const burst = (par, n, x, y, t, dist = 220, seed = 0, cls = 'spark', fall = 0) => {
    const cols = ['#ffb547', '#7df9ff', '#ff6fae', '#7dff8a', '#b38aff'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.7, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.5, 0.25, { o: [1, 0] }, 'lin'); } };
  const steamUp = (sel, t0, t1) => idle(sel, t => (t > t0 && t < t1) ? { y: -10 * Math.sin((t - t0) * 6) } : {});

  // ---------- world ----------
  $('#tiles').innerHTML = `<div style="position:absolute;left:0;top:0;width:2400px;height:1400px">${tilesSVG()}</div><div style="position:absolute;left:2400px;top:0;width:2400px;height:1400px">${tilesSVG()}</div>`;
  $('#cabs').innerHTML = cabinetsSVG(); $('#counter').innerHTML = counterSVG();
  dof('#tiles', 2.2);
  lookFX({ grain: 0.11, tint: 'transparent' });

  // ---------- props ----------
  const buildA = (sc, s) => { $(sc + ' .a-mw').innerHTML = microwaveSVG('a' + s); $(sc + ' .a-rt').innerHTML = routerSVG('a' + s); };
  buildA('#A', '');
  $('.b-rt').innerHTML = routerSVG('b'); $('.b-th').innerHTML = thermometerSVG('b', '#5fb8ff'); $('.b-soup').innerHTML = soupBowlSVG('b'); $('.b-th2').innerHTML = thermometerSVG('b2', '#ff3b5c');
  $('.c-mw').innerHTML = microwaveSVG('c'); $('.c-th').innerHTML = thermometerSVG('c', '#ff3b5c');
  $('.d-cut').innerHTML = cutawaySVG('d');
  $('.e-sheet').innerHTML = meshSheetSVG('e'); $('.e-glove').innerHTML = gloveSVG('e'); $('.e-lens').innerHTML = magnifierSVG('e');
  $('.f-mw').innerHTML = microwaveSVG('f'); $('.f-rt').innerHTML = routerSVG('f'); $('.f-ph').innerHTML = phonePropSVG('f', videoScreen('f')); $('.f-wifi').innerHTML = wifiIconSVG('f');
  $('.g-plan').innerHTML = planSVG('g'); $('.g-mw').innerHTML = mwTopSVG('g'); $('.g-rt').innerHTML = routerSVG('g');
  $('.h-sc').innerHTML = scalesSVG('h'); $('.h-mw').innerHTML = microwaveSVG('h'); $('.h-rt').innerHTML = routerSVG('h');
  $('.i-soup').innerHTML = soupBowlSVG('i');
  $('.j-mw').innerHTML = microwaveSVG('j'); $('.j-rt').innerHTML = routerSVG('j'); $('.j-ph').innerHTML = phonePropSVG('j', settingsScreen('j'));
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));

  // the A waves (built before the loop clone copies A): orange from the microwave, cyan from the router
  const AW = { o: svgPath('#A .a-wv', 'awo', '#ffb547', 16), c: svgPath('#A .a-wv', 'awc', '#7df9ff', 16) };
  AW.o.setAttribute('d', sinePath(560, 560, 480, 34, 160, 0)); AW.c.setAttribute('d', sinePath(560, 640, 480, 34, 160, 0));
  $('#A2').innerHTML = $('#A').innerHTML; $('#A2 .a-mw').innerHTML = ''; $('#A2 .a-rt').innerHTML = ''; buildA('#A2', '2'); $('#A2 .a-m').innerHTML = mascotSVG('a2m');
  mascotLife(); mascotTalk();
  // prop faces: blink, and keep their mouths shut (the mascot narrates)
  { const n = Math.max(1, Math.round(TOTAL / 3.3)), P = TOTAL / n;
    $$('.keye').forEach((e, i) => idle(e, t => { if (t < 0.6 || t > TOTAL - 0.8) return {}; const u = (t + hash(i * 2.3) * P) % P; return { sy: u < 0.18 ? 1 - 0.9 * Math.sin(Math.PI * u / 0.18) : 1 }; })); }
  const look = (sel, t, x, y, d = 0.25) => { const a = POSE_EYES.get(sel) || [0, 0]; POSE_EYES.set(sel, [x, y]); tw($$(sel + ' .kpup'), t, d, { x: [a[0], x], y: [a[1], y] }, 'out'); };
  const POSE_EYES = new Map();
  const brow = (sel, t, y, d = 0.25) => tw($$(sel + ' .kbrow'), t, d, { y: [0, y] }, 'out');
  const shout = (sel, t, d = 0.5, a = 0.8) => { tw($$(sel + ' .kmouth'), t, 0.12, { sy: [0.12, a] }, 'out'); tw($$(sel + ' .kmouth'), t + d, 0.2, { sy: [a, 0.12] }, 'out'); };
  const spinPlate = (sel, t0, t1) => idle($$(sel + ' .mwplate'), t => (t > t0 && t < t1) ? { sx: 1 + 0.06 * (Math.cos((t - t0) * 4.2) - 1) } : {});

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('q1'), tC = cut('m1'), tD = cut('m3'), tE = cut('m4'), tF = cut('j1'), tG = cut('t1'), tH = cut('v1'), tI = cut('j2'), tJ = cut('v2'), tLoop = TOTAL - 0.6;
  const CUTS = [0, tB, tC, tD, tE, tF, tG, tH, tI, tJ], IDS = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I', '#J'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 240 * easeIO((t - c + 0.35) / 0.7); }); x -= 2160 * easeIO((t - tLoop) / 0.6); return x; };
  custom(t => {
    const x = camX(t);
    $('#tiles').style.transform = `translate(${(-(x * 0.15 + t * 4) % 2400).toFixed(1)}px,0)`;
    $('#cabs').style.transform = `translate(${(-(x * 0.45) % 1500).toFixed(1)}px,0)`;
    $('#counter').style.transform = `translate(${(-(x * 0.9) % 800).toFixed(1)}px,0)`;
  });
  // the counter top is the floor of the "kitchen" scenes only; the macro, plan and mountain scenes hide it
  custom(t => { const on = !((t > tC + 2.0 && t < tD + 0.2) || (t > tE - 0.1 && t < tF + 0.1) || (t > tG - 0.1 && t < tH + 0.1) || (t > tI - 0.1 && t < tJ + 0.1)); $('#counter').style.opacity = on ? 1 : 0.0; });
  grade(0, 'transparent'); grade(tB, 'rgba(125,249,255,.10)'); grade(tC, 'rgba(255,150,60,.16)'); grade(tD, 'rgba(180,200,220,.12)');
  grade(tE, 'rgba(255,181,71,.12)'); grade(tF, 'rgba(255,59,92,.14)'); grade(tG, 'rgba(60,160,255,.18)'); grade(tH, 'rgba(255,207,61,.14)');
  grade(tI, 'rgba(180,140,255,.14)'); grade(tJ, 'rgba(255,59,92,.10)'); grade(W('e1', 0) - 0.1, 'rgba(125,249,255,.12)'); grade(tLoop + 0.3, 'transparent');
  $$('.m').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2')) idle(m, t => ({ y: 5 * Math.sin(W2 * 16 * t + i), r: 1.2 * Math.sin(W2 * 8 * t + i) })); });

  // ================= A: hook — «Микроволновка и твой Wi-Fi — на одной волне: 2,4 гигагерца» =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  hide('#A .a-chip'); hide('#A .a-chip2');
  { const tm = W('hook', 0), tr = W('hook', 3), t1 = W('hook', 5) - 0.05, t2 = W('hook', 6) + 0.25;
    // orange wave leaves the microwave, cyan wave leaves the router; on «одной волне» the cyan one slides onto the orange one
    const amp = (t) => 34;
    custom(t => {
      const ph = -6 * t, k = easeIO((t - t1) / (t2 - t1));
      AW.o.setAttribute('d', sinePath(560, 560, 480, 34, 160, ph)); AW.c.setAttribute('d', sinePath(560, 640 - 80 * k, 480, 34, 160, ph + Math.PI * (1 - k)));
      AW.c.style.strokeWidth = (16 - 4 * k).toFixed(1);
    });
    slideIn('#A .a-chip', tm + 0.05, 'left', 0.6, 420); sfx('whoosh', tm + 0.05, 0.4); punch('#A .a-mw', tm + 0.1, 0.05);
    tw($$('#A .a-mw .mwglow'), tm + 0.1, 0.3, { o: [0, 0.9] }, 'out'); spinPlate('#A .a-mw', tm, TOTAL);
    mascotPose('#A .a-m', W('hook', 0), 'pointL');
    slideIn('#A .a-chip2', tr - 0.05, 'right', 0.55, 420); sfx('whoosh', tr - 0.05, 0.35); punch('#A .a-rt', tr, 0.08);
    tw($$('#A .a-rt .rglow'), tr, 0.3, { o: [0, 0.8] }, 'out'); mascotPose('#A .a-m', tr, 'point');
    look('#A .a-rt', tr + 0.1, -6, -6); look('#A .a-mw', tr + 0.1, 6, -6);
    mascotPose('#A .a-m', t1, 'cheer'); jump('#A .a-m', t1 + 0.1, 60, 0.45); sfx('ding', t2, 0.4); burst('#A .cam', 12, 800, 520, t2, 160, 2, 'spark');
    const tn = W('hook', 7);
    slideOut('#A .a-chip', tn - 0.25, 'left', 0.3, 300); slideOut('#A .a-chip2', tn - 0.25, 'right', 0.3, 300);
    punch('#A .a-n', tn, 0.12); sfx('slam', tn, 0.5); shake(tn + 0.05, 0.22, 10);
    focus('#A > .cam', tn, 540, 280, 1.12, 0.6, 0.25, 0.45, 540, 340);
    mascotPose('#A .a-m', tn, 'pointUp');
    tw($$('#A .a-rt .rantL'), tn + 0.1, 0.3, { r: [0, -10] }, 'back'); tw($$('#A .a-rt .rantR'), tn + 0.1, 0.3, { r: [0, 10] }, 'back'); }

  // ================= B: «Почему роутер не греет тебя, как суп?» =================
  morphCut('#A', '#B', tB, '#A .a-rt', '.b-rt', 0.6);
  hide('.b-q'); hide('.b-soup .sbsteam');
  { // router waves wash over the mascot: three cyan arcs travel right
    const svg = $('#B .b-wv'); const arcs = [0, 1, 2, 3].map(k => svgPath(svg, 'bw' + k, '#7df9ff', 12, 'opacity:0'));
    const t0 = tB + 0.2;
    arcs.forEach((p, k) => custom(t => { const u = ((t - t0) * 0.9 + k / 4) % 1; if (t < t0) return; const r = 120 + u * 640;
      p.setAttribute('d', `M${230 + r * 0.25} ${430 - r * 0.7} A${r} ${r} 0 0 1 ${230 + r * 0.25} ${430 + r * 0.7}`); p.style.opacity = (0.75 * (1 - u)).toFixed(2); }));
    tw($$('.b-rt .rglow'), tB, 0.3, { o: [0, 0.7] }, 'out');
    mascotPose('.b-m', W('q1', 0), 'think'); look('.b-rt', W('q1', 1), 8, 4);
    tw($$('.b-th .thfill'), W('q1', 3), 0.4, { sy: [0.25, 0.3] }, 'out'); tw($$('.b-th .thfill'), 0, 0.001, { sy: [0.25, 0.25] });
    punch('.b-th', W('q1', 3), 0.08); sfx('tick', W('q1', 3), 0.5);
    mascotPose('.b-m', W('q1', 4), 'shrug');
    // the soup: steam + the hot thermometer shoots up
    const ts = W('q1', 5) - 0.1;
    tw('.b-soup .sbsteam', ts, 0.3, { o: [0, 1] }, 'lin'); steamUp('.b-soup .sbsteam', ts, TOTAL);
    tw($$('.b-th2 .thfill'), 0, 0.001, { sy: [0.25, 0.25] }); tw($$('.b-th2 .thfill'), ts, 0.5, { sy: [0.25, 1] }, 'out'); sfx('riser2', ts - 0.1, 0.4);
    mascotPose('.b-m', ts + 0.1, 'pointL'); look('.b-m', ts, -8, 6);
    popIn('.b-q', W('q1', 6) - 0.05, 0.4); idle('.b-q', t => ({ r: t > W('q1', 6) ? 9 * Math.sin((t - W('q1', 6)) * 7) : 0 })); sfx('blip', W('q1', 6), 0.5);
    focus('#B > .cam', W('q1', 6), 540, 900, 1.07, 0.3); }

  // ================= C: «Смотри, как греет микроволновка: волны трясут воду в еде, и та нагревается» =================
  tZoom('#B', '#C', tC, 0.5);
  hide('.c-lens'); hide('.c-handle'); hide('.c-th'); hide('.c-chip');
  { tw($$('.c-mw .mwbtn'), W('m1', 0) + 0.2, 0.1, { y: [0, 6] }, 'in'); tw($$('.c-mw .mwbtn'), W('m1', 0) + 0.3, 0.2, { y: [6, 0] }, 'back'); sfx('blip', W('m1', 0) + 0.25, 0.6);
    mascotPose('.c-m', W('m1', 0), 'point'); tw('.c-m', W('m1', 0), 0.35, { x: [60, 0] }, 'out');
    tw($$('.c-mw .mwglow'), W('m1', 0) + 0.3, 0.4, { o: [0, 1] }, 'out'); spinPlate('.c-mw', W('m1', 0) + 0.3, TOTAL); sfx('buzz', W('m1', 0) + 0.3, 0.25);
    tw($$('.c-mw .mwdial'), W('m1', 0) + 0.1, 0.5, { r: [0, 120] }, 'out');
    look('.c-mw', W('m1', 2), -6, 4); brow('.c-mw', W('m1', 3), -6);
    // the lens: a close-up into the soup — water molecules
    const tl = W('m1', 4) - 0.3, mols = $('.c-mols'), M = [];
    for (let k = 0; k < 9; k++) { const d = mk(mols, 'mol'); const cx = 130 + (k % 3) * 190 + (hash(k) - 0.5) * 40, cy = 130 + Math.floor(k / 3) * 190 + (hash(k + 4) - 0.5) * 40;
      place(d, cx - 70, cy - 60, 140, 119); d.innerHTML = waterMolSVG('c' + k, k === 4); M.push(d); }
    tw('.c-lens', tl, 0.05, { o: [0, 1] }, 'lin'); tw('.c-lens', tl, 0.45, { s: [0.2, 1] }, 'back'); tw('.c-handle', tl + 0.1, 0.3, { o: [0, 1] }, 'out'); sfx('whoosh', tl, 0.5); sfx('pop', tl + 0.3, 0.5);
    tw('.c-mw', tl, 0.5, { x: [0, -60], s: [1, 0.9] }, 'out'); tw('.c-m', tl, 0.5, { x: [0, -740], y: [0, 360] }, 'out');
    // the wave runs through the lens; molecules shake harder with time
    const wp = svgPath('.c-wv', 'cwave', '#fff4c8', 14, 'opacity:.85'); const tw0 = W('m1', 4);
    const heat = t => clamp((t - tw0) / (L('m1').t1 - tw0));
    liveWave(wp, 0, 320, 640, 220, t => t < tw0 ? 0 : 90 * clamp((t - tw0) / 0.3), 9);
    M.forEach((d, k) => idle(d, t => { if (t < tw0) return {}; const h = 0.3 + heat(t); return { x: 18 * h * Math.sin(t * 38 + k * 1.7), y: 10 * h * Math.sin(t * 31 + k), r: 22 * h * Math.sin(t * 27 + k * 2.1) }; }));
    custom(t => { const h = heat(t); $('.c-lens').style.background = `radial-gradient(circle at 50% 45%,${h > 0.5 ? '#ffd27a' : '#ffbb6b'},${h > 0.7 ? '#ff5a2a' : '#e26a2a'} 70%,#a8401a)`; });
    for (let k = 0; k < 4; k++) sfx('tick', W('m1', 5) + k * 0.14, 0.3);
    slideIn('.c-chip', W('m1', 6) - 0.1, 'left', 0.55, 420); sfx('whoosh', W('m1', 6), 0.3);
    mascotPose('.c-m', W('m1', 5), 'shock'); look('.c-m', W('m1', 5), -8, 2);
    // «нагревается»: the thermometer pops up and climbs, sparks of heat
    const th = W('m1', 9) - 0.15; tw('.c-th', th, 0.05, { o: [0, 1] }, 'lin'); tw('.c-th', th, 0.4, { y: [300, 0] }, 'back');
    tw($$('.c-th .thfill'), 0, 0.001, { sy: [0.2, 0.2] }); tw($$('.c-th .thfill'), th + 0.2, 0.7, { sy: [0.2, 1] }, 'out'); sfx('riser2', th, 0.45);
    burst('#C .c-fx', 12, 560, 760, th + 0.5, 260, 5, 'spark'); focus('#C > .cam', th + 0.2, 560, 760, 1.06, 0.5);
    mascotPose('.c-m', th + 0.2, 'cheer'); }

  // ================= D: «Чтобы волны не сбежали, у печки стенки из металла и сетка в дверце» =================
  tSlideUp('#C', '#D', tD, 0.55);
  hide('.d-chip'); hide('.d-chip2');
  { const svg = $('#D .d-wv');
    // a zig-zag beam bounces between the walls (cavity in stage coords: x 125..847, y 357..846)
    const zz = svgPath(svg, 'dzz', '#ffb547', 12, 'stroke-dasharray:100;stroke-dashoffset:100'); zz.setAttribute('pathLength', '100');
    zz.setAttribute('d', 'M760 380 L140 520 L840 640 L140 760 L700 840'); tw(zz, tD + 0.2, 1.4, { dash: [100, 0] }, 'inOut'); sfx('zap', tD + 0.2, 0.3);
    custom(t => { if (t > tD + 1.6) zz.style.strokeDashoffset = 0; });
    // wave critters try to run away and bonk into the walls
    const C = [[480, 600, -330, 0], [520, 700, 290, -20], [430, 480, 0, -120]], tc = W('m3', 3) - 0.25;
    C.forEach(([x, y, dx, dy], k) => { const c = mk('.d-crit', 'critter'); place(c, x - 35, y - 35); hide(c); popIn(c, tD + 0.3 + k * 0.15, 0.3);
      idle(c, t => (t < tc) ? { y: 8 * Math.sin(t * 9 + k) } : {});
      const tb = tc + k * 0.12; tw(c, tb, 0.3, { x: [0, dx], y: [0, dy] }, 'in'); tw(c, tb + 0.3, 0.12, { sx: [1, 0.6] }, 'out'); tw(c, tb + 0.42, 0.45, { x: [dx, dx * 0.55], y: [dy, dy * 0.55], sx: [0.6, 1], r: [0, 360 * (k % 2 ? 1 : -1)] }, 'out');
      sfx('thud', tb + 0.3, 0.45); burst('#D .d-fx', 6, x + dx, y + dy, tb + 0.3, 90, 10 + k, 'spark'); });
    mascotPose('.d-m', W('m3', 1), 'think'); mascotPose('.d-m', tc + 0.3, 'shock');
    const tw1 = W('m3', 6) - 0.05; tw($$('.d-cut .dwall'), tw1, 0.15, { o: [0, 0.9] }, 'out'); tw($$('.d-cut .dwall'), tw1 + 0.35, 0.4, { o: [0.9, 0] }, 'lin'); sfx('clink', tw1, 0.6);
    slideIn('.d-chip', tw1 + 0.05, 'left', 0.55, 420); sfx('whoosh', tw1, 0.3); mascotPose('.d-m', tw1, 'pointUp');
    const tm = W('m3', 10) - 0.05; tw($$('.d-cut .dmesh'), tm, 0.2, { o: [1, 1] }); custom(t => { const m = $('.d-cut .dmesh'); if (t > tm) m.setAttribute('fill', Math.floor((t - tm) * 8) % 2 ? '#ffb547' : '#fff4c8'); else m.setAttribute('fill', '#9fb3c4'); });
    slideIn('.d-chip2', tm, 'right', 0.55, 420); sfx('whoosh', tm, 0.3); mascotPose('.d-m', tm, 'point'); look('.d-m', tm, 8, -6);
    focus('#D > .cam', tm + 0.1, 880, 620, 1.1, 0.55); }

  // ================= E: «Волна длиной с ладонь, а дырочки крошечные — не пролезает» =================
  tWhip('#D', '#E', tE, 0.46);
  hide('.e-glove'); hide('.e-chip'); hide('.e-chip2'); hide('.e-lens');
  { const svg = $('#E .e-wv'), tb = W('m4', 7) - 0.3;
    // the big wave: one wavelength = 250 px = the glove's width; its head runs toward the mesh and bounces off
    const wp = svgPath(svg, 'ewave', '#ffb547', 22);
    const head = mk('#E .cam', 'critter e-head'); place(head, 0, 0, 90, 90);
    const hx = t => t < tb ? 300 + 280 * easeIO((t - tE) / (tb - tE)) : t < tb + 0.15 ? 580 + 40 * ((t - tb) / 0.15) : 620 - 170 * E.out(clamp((t - tb - 0.15) / 0.5));
    custom(t => { const x1 = hx(t), squash = (t > tb && t < tb + 0.4) ? 0.7 : 1; wp.setAttribute('d', sinePath(x1 - 520, 720, 520, 80, 250, -7 * t + (x1 / 250) * 2 * Math.PI));
      head.style.left = (x1 - 45).toFixed(1) + 'px'; head.style.top = (720 + 80 * Math.sin(-7 * t + (x1 / 250) * 2 * Math.PI + 2 * Math.PI * 520 / 250) - 45).toFixed(1) + 'px'; head.style.transform = `scale(${squash},${2 - squash})`; });
    // «длиной с ладонь»: the glove pops in over the wave, a bracket = one wavelength
    const tg = W('m4', 3) - 0.15; tw('.e-glove', tg, 0.05, { o: [0, 1] }, 'lin'); tw('.e-glove', tg, 0.4, { y: [-200, 0], r: [-20, 0] }, 'back'); sfx('pop', tg, 0.5);
    const br = svgPath(svg, 'ebr', '#fff', 10, 'stroke-dasharray:100;stroke-dashoffset:100'); br.setAttribute('pathLength', '100'); br.setAttribute('d', 'M90 610 L90 630 L340 630 L340 610');
    tw(br, tg + 0.15, 0.35, { dash: [100, 0] }, 'out');
    slideIn('.e-chip', W('m4', 1) - 0.1, 'left', 0.55, 420); sfx('whoosh', W('m4', 1), 0.3);
    mascotPose('.e-m', W('m4', 1), 'pointUp'); look('.e-m', W('m4', 1), 4, -8);
    // «дырочки крошечные»: the magnifier on one hole
    const tl = W('m4', 5) - 0.1; tw('.e-lens', tl, 0.05, { o: [0, 1] }, 'lin'); tw('.e-lens', tl, 0.4, { x: [200, 0], y: [200, 0], r: [30, 0] }, 'back'); sfx('whoosh', tl, 0.35);
    tw($$('.e-sheet .mhole'), W('m4', 6), 0.2, { o: [0, 1] }, 'out'); punch('.e-lens', W('m4', 6) + 0.1, 0.08);
    slideIn('.e-chip2', W('m4', 6) - 0.05, 'right', 0.5, 420); sfx('whoosh', W('m4', 6), 0.3);
    mascotPose('.e-m', W('m4', 5), 'point');
    focus('#E > .cam', W('m4', 6), 860, 690, 1.08, 0.45);
    // bonk
    sfx('thud', tb, 0.6); sfx('clink', tb + 0.02, 0.4); shake(tb + 0.02, 0.25, 12); burst('#E .e-fx', 10, 620, 720, tb, 140, 8, 'spark');
    tw('.e-sheet', tb, 0.08, { x: [0, 14] }, 'out'); tw('.e-sheet', tb + 0.08, 0.35, { x: [14, 0] }, 'back');
    mascotPose('.e-m', tb + 0.05, 'cheer'); jump('.e-m', tb + 0.1, 50, 0.4); }

  // ================= F: joke — «Почти: капля просачивается и глушит Wi-Fi — пока греется суп, видео тормозит» =================
  tCircle('#E', '#F', tF, 760, 760);
  hide('.f-chip'); hide($$('.f-ph .vspin')); hide($$('.f-wifi .wfx'));
  { tw($$('.f-mw .mwglow'), tF, 0.3, { o: [0, 1] }, 'out'); spinPlate('.f-mw', tF, TOTAL); tw($$('.f-mw .mwsteam'), tF + 0.3, 0.4, { o: [0, 1] }, 'lin'); steamUp($$('.f-mw .mwsteam'), tF, TOTAL);
    tw($$('.f-rt .rglow'), tF, 0.3, { o: [0, 0.6] }, 'out');
    // clean signal from the router to the phone (dashed cyan line, moving)
    const svg = $('#F .f-wv'); const sig = svgPath(svg, 'fsig', '#7df9ff', 10, 'stroke-dasharray:22 16');
    const leak = svgPath(svg, 'fleak', '#ffb547', 12, 'opacity:0');
    const tl = W('j1', 1) - 0.1, tj = W('j1', 4) - 0.05;
    custom(t => { const j = t > tj ? clamp((t - tj) / 0.4) : 0; let d = ''; for (let k = 0; k <= 40; k++) { const u = k / 40, x = 230 + u * 210, y = 470 + u * 470;
        const n = j * 30 * (hash(k * 3.1 + Math.floor(t * 20)) - 0.5) * 2; d += (k ? ' L' : 'M') + (x + n).toFixed(1) + ' ' + (y + n * 0.4).toFixed(1); }
      sig.setAttribute('d', d); sig.style.strokeDashoffset = (-t * 120).toFixed(1); sig.setAttribute('stroke', j > 0.5 ? '#ff8a9c' : '#7df9ff'); });
    mascotPose('.f-m', W('j1', 0), 'hold'); look('.f-m', W('j1', 0), 4, 6);
    // «капля просачивается»: a little orange wave squeezes out of the door and flies into the signal line
    custom(t => { if (t < tl) { leak.style.opacity = 0; return; } const u = clamp((t - tl) / 1.1); const x0 = 690 - 260 * u, y0 = 760 - 120 * Math.sin(Math.PI * u);
      leak.setAttribute('d', sinePath(x0 - 60, y0, 120, 14, 40, -t * 14)); leak.style.opacity = (u < 1 ? 1 : Math.max(0, 1 - (t - tl - 1.1) * 3)).toFixed(2); });
    sfx('blip', tl, 0.4); look('.f-mw', tl, -8, 2); brow('.f-mw', tl, -6);
    // «глушит Wi-Fi»: the router panics, the wifi icon loses bars and gets a cross
    tw($$('.f-rt .kbrow'), tj, 0.2, { y: [0, -10] }, 'out'); shout('.f-rt', tj, 0.6, 0.7); look('.f-rt', tj, 6, 6); sfx('glitch', tj, 0.6);
    tw($$('.f-wifi .wf3'), tj + 0.1, 0.15, { o: [1, 0.12] }, 'out'); tw($$('.f-wifi .wf2'), tj + 0.25, 0.15, { o: [1, 0.12] }, 'out');
    tw($$('.f-wifi .wfx'), tj + 0.35, 0.25, { o: [0, 1], s: [2, 1] }, 'back'); punch('.f-wifi', tj + 0.35, 0.12);
    slideIn('.f-chip', tj, 'right', 0.5, 420); sfx('whoosh', tj, 0.3);
    tw($$('.f-ph .vwifi'), tj + 0.3, 0.2, { o: [1, 0.25] }, 'out');
    // «пока греется суп»: the timer counts, the microwave hums
    const tsoup = W('j1', 6); custom(t => { const s = Math.max(0, 30 - Math.floor(Math.max(0, t - tF) * 1.6)); const el = $('.f-mw .mwtxt'); if (el) el.textContent = '0:' + String(s).padStart(2, '0'); });
    punch('.f-mw', tsoup, 0.04); mascotPose('.f-m', tsoup, 'think'); look('.f-m', tsoup, 9, -2);
    // «видео тормозит»: progress stops, the spinner, facepalm
    const tv = W('j1', 9) - 0.1; tw($$('.f-ph .vbar'), tF, tv - tF, { sx: [0.1, 0.42] }, 'lin');
    tw($$('.f-ph .vplay'), tv, 0.15, { o: [1, 0] }, 'lin'); tw($$('.f-ph .vspin'), tv, 0.15, { o: [0, 1] }, 'lin'); idle($$('.f-ph .vspin'), t => t > tv ? { r: (t - tv) * 400 } : {});
    sfx('buzz', tv + 0.1, 0.3); punch('.f-ph', tv, 0.08);
    mascotPose('.f-m', W('j1', 10), 'facepalm'); sfx('thud', W('j1', 10) + 0.1, 0.3);
    focus('#F > .cam', W('j1', 10), 440, 1040, 1.2, 0.6); }

  // ================= G: «А роутер шепчет ту же волну во все стороны» — floor plan from above =================
  morphCut('#F', '#G', tG, '.f-rt', '.g-rt', 0.6);
  hide('.g-chip');
  { const svg = $('#G .g-wv');
    const rings = [0, 1, 2, 3, 4].map(k => { const c = document.createElementNS(NS, 'circle'); c.setAttribute('cx', 530); c.setAttribute('cy', 720); c.setAttribute('fill', 'none'); c.setAttribute('stroke', '#7df9ff'); c.setAttribute('stroke-width', 9); svg.appendChild(c); return c; });
    const t0 = W('t1', 2) - 0.15;
    rings.forEach((c, k) => custom(t => { if (t < t0) { c.setAttribute('r', 0); return; } const u = ((t - t0) * 0.55 + k / 5) % 1, first = (t - t0) * 0.55 < k / 5 ? 0 : 1;
      c.setAttribute('r', (40 + u * 620).toFixed(1)); c.style.opacity = (first * 0.55 * (1 - u)).toFixed(2); }));
    // the kitchen microwave: its waves stay locked inside its box (a small orange box pulsing)
    const box = document.createElementNS(NS, 'rect'); box.setAttribute('x', 660); box.setAttribute('y', 350); box.setAttribute('width', 160); box.setAttribute('height', 100); box.setAttribute('rx', 12); box.setAttribute('fill', 'none'); box.setAttribute('stroke', '#ffb547'); box.setAttribute('stroke-width', 10); svg.appendChild(box);
    custom(t => { box.style.opacity = (0.5 + 0.5 * Math.sin(t * 14)).toFixed(2); });
    sfx('blip', t0, 0.3); for (let k = 0; k < 4; k++) sfx('tick', t0 + 0.3 + k * 0.45, 0.2);
    look('.g-rt', W('t1', 2), -6, -4); shout('.g-rt', W('t1', 2), 0.9, 0.35);
    mascotPose('.g-m', W('t1', 1), 'pointL'); mascotPose('.g-m', W('t1', 6), 'wave');
    slideIn('.g-chip', W('t1', 6) - 0.1, 'left', 0.55, 420); sfx('whoosh', W('t1', 6), 0.3);
    tw('#G > .cam', W('t1', 5), 0.8, { s: [1, 0.94] }, 'inOut'); }

  // ================= H: «И он слабее печки раз в 10 000» — the answer =================
  tCircle('#G', '#H', tH, 540, 700);
  hide('.h-n'); hide('.h-src');
  { const ts = W('v1', 2) - 0.05, beam = $$('.h-sc .sbeam'), pl = $$('.h-sc .spanL'), pr = $$('.h-sc .spanR');
    tw('.h-mw', tH - 0.1, 0.5, { y: [-600, 0] }, 'out'); tw('.h-rt', tH + 0.05, 0.5, { y: [-600, 0] }, 'out'); sfx('thud', tH + 0.4, 0.4);
    // the beam tips: the microwave side slams down, the router side flies up; objects follow the pan ends
    tw(beam, ts, 0.5, { r: [0, -16] }, 'back2'); tw(pl, ts, 0.5, { r: [0, 16] }, 'back2'); tw(pr, ts, 0.5, { r: [0, 16] }, 'back2');
    custom(t => { const a = (t < ts ? 0 : -16 * Math.min(1, (t - ts) / 0.5)) * Math.PI / 180, dyL = -Math.sin(a) * 180 * 1.8, dyR = Math.sin(a) * 180 * 1.8;
      $('.h-mw').style.marginTop = dyL.toFixed(1) + 'px'; $('.h-rt').style.marginTop = dyR.toFixed(1) + 'px'; });
    sfx('slam', ts + 0.25, 0.5); shake(ts + 0.3, 0.2, 10); look('.h-rt', ts, 0, -8); brow('.h-rt', ts, -8); look('.h-mw', ts, 4, 6);
    mascotPose('.h-m', W('v1', 0), 'think'); mascotPose('.h-m', ts, 'pointL');
    // the big counter
    const tn = W('v1', 6) - 0.25; tw('.h-n', tn, 0.05, { o: [0, 1] }, 'lin'); tw('.h-n', tn, 0.4, { s: [2.2, 1], r: [-10, 0] }, 'back'); sfx('slam', tn + 0.05, 0.6);
    const cnt = $('.h-cnt'); custom(t => { const p = clamp((t - tn) / 0.6); cnt.textContent = Math.round(10000 * (1 - Math.pow(1 - p, 2.2))).toLocaleString('ru-RU').replace(/ /g, ' '); });
    for (let k = 0; k < 6; k++) sfx('tick', tn + k * 0.1, 0.4);
    focus('#H > .cam', tn + 0.1, 540, 290, 1.1, 0.6, 0.25, 0.45, 540, 330);
    burst('#H .h-fx', 16, 540, 290, tn + 0.6, 300, 12, 'conf', 80);
    slideIn('.h-src', W('v1', 4) - 0.1, 'down', 0.55, 200); sfx('whoosh', W('v1', 4), 0.3);
    mascotPose('.h-m', tn + 0.1, 'cheer'); jump('.h-m', tn + 0.2, 45, 0.4); }

  // ================= I: joke — «Чтобы разогреть суп, нужна гора из десяти тысяч роутеров» =================
  tDrop('#H', '#I', tI, 0.5);
  hide('.i-chip'); hide('.i-soup .sbsteam');
  { const pile = $('.i-pile'), rows = 16, R = [];
    for (let r = 0; r < rows; r++) { const n = 2 + r * 2, w = 54, gap = 6, y = 560 + r * 46, x0 = 540 - (n * (w + gap)) / 2;
      for (let k = 0; k < n; k++) R.push({ el: miniRouter(pile, x0 + k * (w + gap) + (hash(r * 9 + k) - 0.5) * 8, y, w, r + k), r }); }
    // routers rain onto the pile row by row (top rows first, so the close-up fills), then the camera pulls back
    const t0 = tI + 0.05;
    R.forEach((o, i) => { const t = t0 + o.r * 0.06 + hash(i) * 0.15; tw(o.el, 0, 0.001, { o: [0, 0] }); tw(o.el, t, 0.001, { o: [1, 1] }); tw(o.el, t, 0.3, { y: [-260, 0] }, 'out'); });
    for (let r = 0; r < rows; r += 3) sfx('clink', t0 + r * 0.06 + 0.2, 0.2);
    tw('.i-world', 0, 0.001, { s: [1.8, 1.8] }); tw('.i-world', W('j2', 3), 1.4, { s: [1.8, 1] }, 'inOut'); sfx('riser', W('j2', 3), 0.5);
    // rays from the top routers into the soup
    const svg = $('#I .i-wv'); for (let k = 0; k < 7; k++) { const a = Math.PI * (0.15 + 0.7 * k / 6), p = svgPath(svg, 'iray', '#7df9ff', 6, 'opacity:0');
      const x1 = 540 + Math.cos(a) * 300, y1 = 660 + Math.sin(a) * 140; p.setAttribute('d', `M${x1.toFixed(0)} ${y1.toFixed(0)} L540 500`);
      idle(p, t => ({})); custom(t => { p.style.opacity = t > W('j2', 1) ? (0.4 + 0.4 * Math.sin(t * 20 + k)).toFixed(2) : 0; }); }
    tw('.i-soup .sbsteam', W('j2', 2), 0.4, { o: [0, 1] }, 'lin'); steamUp('.i-soup .sbsteam', W('j2', 2), TOTAL);
    mascotPose('.i-m', W('j2', 0), 'hold'); mascotPose('.i-m', W('j2', 4), 'shock'); mascotPose('.i-m', W('j2', 7), 'cheer');
    slideIn('.i-chip', W('j2', 6) - 0.1, 'left', 0.55, 420); sfx('whoosh', W('j2', 6), 0.3); punch('.i-chip', W('j2', 8), 0.08);
    burst('#I .i-fx', 18, 540, 470, W('j2', 8), 260, 31, 'conf', 120); sfx('ding', W('j2', 8), 0.45); }

  // ================= J: verdict — «Одна волна? Не байт. Но жарит только печка.» + takeaway «переключи роутер на 5 гигагерц» =================
  morphCut('#I', '#J', tJ, '.i-soup', '.j-mw', 0.6);
  hide('.j-ph'); hide('.j-chip');
  { const svg = $('#J .j-wv'); const o = svgPath(svg, 'jwo', '#ffb547', 14), c = svgPath(svg, 'jwc', '#7df9ff', 14);
    const t1 = W('v2', 0), t2 = W('v2', 1) + 0.3;
    custom(t => { const k = easeIO((t - t1) / (t2 - t1)), ph = -6 * t; o.setAttribute('d', sinePath(120, 520, 860, 30, 160, ph)); c.setAttribute('d', sinePath(120, 600 - 80 * k, 860, 30, 160, ph + Math.PI * (1 - k))); });
    tw($$('.j-mw .mwglow'), tJ, 0.3, { o: [0, 0.8] }, 'out'); spinPlate('.j-mw', tJ, TOTAL); tw($$('.j-rt .rglow'), tJ, 0.3, { o: [0, 0.6] }, 'out');
    mascotPose('.j-m', W('v2', 0), 'think'); look('.j-mw', t1, 8, -6); look('.j-rt', t1, -8, -6); }
  // НЕ БАЙТ: the mascot hops and slams its arm down; the stamp hits the top and stays to the loop
  const tSt = W('v2', 2) - 0.02;
  hide('#stampL .st');
  mascotPose('.j-m', tSt - 0.5, 'pointUp'); tw('.j-m', tSt - 0.45, 0.25, { y: [0, -90] }, 'out'); tw('.j-m', tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose('.j-m', tSt - 0.18, 'point', 0.18);
  stamp('#stampL .st', tSt, -7, 26); burst('.st-fx', 22, 540, 340, tSt + 0.05, 420, 61, 'conf', 140);
  mascotPose('.j-m', tSt + 0.35, 'cheer');
  { // «Но жарит только печка»: the microwave glows red-hot, the router stays calm
    const tz = W('v2', 4) - 0.05; tw('.j-mw', tz, 0.12, { s: [1, 1.06] }, 'out'); tw('.j-mw', tz + 0.12, 0.3, { s: [1.06, 1] }, 'back'); sfx('buzz', tz, 0.35);
    tw($$('.j-mw .mwsteam'), tz, 0.3, { o: [0, 1] }, 'lin'); steamUp($$('.j-mw .mwsteam'), tz, TOTAL); brow('.j-mw', tz, -8);
    burst('#J .j-fx', 10, 300, 640, tz + 0.1, 180, 41, 'spark');
    mascotPose('.j-m', W('v2', 5), 'pointL'); look('.j-m', W('v2', 5), -8, 0);
    // takeaway: the phone slides up, the switch goes 2,4 → 5, the wifi fills
    const te = W('e1', 0) - 0.15;
    tw('.j-ph', te, 0.05, { o: [0, 1] }, 'lin'); tw('.j-ph', te, 0.55, { y: [900, 0], r: [8, 0] }, 'out'); sfx('whoosh', te, 0.45);
    tw('.j-m', te, 0.5, { x: [0, -330] }, 'out'); tw('.j-mw, .j-rt, #J .shd, #J .j-wv', te, 0.4, { o: [1, 0.25] }, 'lin');
    mascotPose('.j-m', W('e1', 1), 'think');
    const tk = W('e1', 4) - 0.05;
    tw($$('.j-ph .segk'), tk, 0.35, { x: [0, 72] }, 'back'); sfx('blip', tk, 0.6);
    custom(t => { const on = t > tk + 0.1; const a = $('.j-ph .seg24'), b = $('.j-ph .seg5'); if (a) { a.setAttribute('fill', on ? '#141a26' : '#fff'); b.setAttribute('fill', on ? '#fff' : '#141a26'); } });
    tw($$('.j-ph .sw2'), W('e1', 7), 0.2, { o: [0.25, 1] }, 'out'); tw($$('.j-ph .sw3'), W('e1', 7) + 0.12, 0.2, { o: [0.25, 1] }, 'out'); sfx('ding', W('e1', 7) + 0.1, 0.5);
    slideIn('.j-chip', W('e1', 7) - 0.1, 'left', 0.5, 420);
    mascotPose('.j-m', tk, 'point'); jump('.j-m', W('e1', 7), 40, 0.38);
    focus('#J > .cam', tk, 640, 700, 1.06, 0.5); }
  tw('#J .j-ph, #J .j-chip, #stampL .st', tLoop + 0.05, 0.3, { o: [1, 0] }, 'in');
  hide('#A2 .a-chip'); hide('#A2 .a-chip2'); loopTo('#A2', tLoop); tw('#J .j-m', tLoop + 0.42, 0.001, { o: [1, 0] });
}, { chunks: {} });
