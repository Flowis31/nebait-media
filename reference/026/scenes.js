// 026 «Спутник в 20 000 км следит, где ты?» — Как это работает, монолог предмета: рассказывает сам спутник GPS (с лицом),
// маскот молчит и действует. Источники: gps.gov «Space Segment» (~20 200 км); R. B. Langley, UNB «How does GPS work?» (приёмник только
// принимает, расстояние по времени полёта сигнала, четыре спутника — четвёртый для часов); GPS World «Inside the box: GPS and relativity»,
// 9.10.2023 (+38 мкс в сутки, без поправки до ~11 км за сутки, частота часов занижена ещё на Земле).
// Свой мир: открытый космос над Землёй (звёзды — дальний слой, край Земли с материками — средний, облака — ближний).
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
    const cols = ['#ffcf3d', '#5fd8ff', '#ff6fae', '#7dff8a', '#b38aff'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.7, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.5, 0.25, { o: [1, 0] }, 'lin'); } };
  const splash = (par, n, x, y, t, seed = 0) => {   // water drops fly up and fall back
    for (let k = 0; k < n; k++) { const s = mk(par, 'drop'); place(s, x - 13, y - 17); hide(s);
      const dx = (hash(k * 2.7 + seed) - 0.5) * 420, h = 140 + hash(k * 5.1 + seed) * 220;
      tw(s, t, 0.05, { o: [0, 1] }, 'lin'); arc(s, t, 0.75, dx, 60, h, dx * 0.2); tw(s, t + 0.6, 0.2, { o: [1, 0] }, 'lin'); } };

  // ---------- world ----------
  $('#stars').innerHTML = `<div style="position:absolute;left:0;top:0;width:2400px;height:1300px">${starsSVG()}</div><div style="position:absolute;left:2400px;top:0;width:2400px;height:1300px">${starsSVG()}</div>`;
  $('#earth').innerHTML = earthSVG(); $('#clouds').innerHTML = cloudsSVG();
  dof('#stars', 1.6);
  lookFX({ grain: 0.11, tint: 'transparent' });

  // ---------- props ----------
  const buildA = (sc, s) => { $(sc + ' .a-sat').innerHTML = satelliteSVG('a' + s); };
  buildA('#A', '');
  $('.b-sat').innerHTML = satelliteSVG('b'); $('.b-ph').innerHTML = phonePropSVG('b', mapScreen('b', false)); $('.b-pin').innerHTML = pinSVG('b');
  $('.c-sat').innerHTML = satelliteSVG('c'); $('.c-w').innerHTML = wavesSVG('c');
  $('.c-b1').innerHTML = chatSVG('c1', '#fff6c8', 'ГДЕ Я', 'right'); $('.c-b2').innerHTML = chatSVG('c2', '#d8f4ff', 'КОТОРЫЙ ЧАС', 'left');
  $('.c-pin').innerHTML = pinSVG('c'); $('.c-ck').innerHTML = clockSVG('c', '#5fd8ff');
  $('.d-sat').innerHTML = satelliteSVG('d'); $('.d-ph').innerHTML = phonePropSVG('d', mapScreen('d', false)); $('.d-sw').innerHTML = stopwatchSVG('d');
  ['.e-s1', '.e-s2', '.e-s3', '.e-s4'].forEach((s, i) => $(s).innerHTML = satelliteSVG('e' + i, false, ['#ffcc4d', '#ffcc4d', '#ffcc4d', '#ffcc4d'][i]));
  $('.e-ph').innerHTML = phonePropSVG('e', mapScreen('e', false)); $('.e-ck').innerHTML = clockSVG('e', '#ff6fae'); $('.e-pin').innerHTML = pinSVG('e');
  $('.f-sat').innerHTML = satelliteSVG('f'); $('.f-ck1').innerHTML = clockSVG('f1', '#5fd8ff'); $('.f-ck2').innerHTML = clockSVG('f2', '#ffcf3d');
  $('.g-map').innerHTML = mapBoardSVG('g'); $('.g-pin').innerHTML = pinSVG('g');
  $('.h-tab').innerHTML = tableSVG('h'); $('.h-sat').innerHTML = satelliteSVG('h'); $('.h-tech').innerHTML = personSVG('h', '#5fd8ff', '#3a2414');
  $('.h-sd').innerHTML = screwdriverSVG('h'); $('.h-sn').innerHTML = snailSVG('h');
  $('.i-sat').innerHTML = satelliteSVG('i'); $('.i-ph').innerHTML = phonePropSVG('i', mapScreen('i', false));
  { const p2 = mk('#I .cam', 'i-ph2'); place(p2, 330, 740, 260, 496); p2.innerHTML = phonePropSVG('i2', appsScreen('i2')); $('#I .cam').insertBefore(p2, $('.i-x')); }
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  $('#A2').innerHTML = $('#A').innerHTML; $('#A2 .a-sat').innerHTML = ''; buildA('#A2', '2'); $('#A2 .a-m').innerHTML = mascotSVG('a2m');
  mascotLife(); mascotTalk();
  // the satellite is the narrator: its mouth follows the voice; the mascot keeps its mouth shut and acts
  $$('.m').forEach(m => mascotQuiet(m, 0, TOTAL + 1));
  $$('.smouth').forEach(m => idle(m, t => ({ sy: 0.95 * Math.pow(clamp((venv(t) - 0.07) / 0.55), 0.8) })));
  $$('.sbrow').forEach(b => idle(b, t => { const d = venv(t) - venv(t - 0.12); return { y: d > 0.18 ? -7 * Math.min(1, (d - 0.18) / 0.2) : 0 }; }));
  { const n = Math.max(1, Math.round(TOTAL / 3.1)), P = TOTAL / n;
    $$('.seye').forEach((e, i) => idle(e, t => { if (t < 0.6 || t > TOTAL - 0.8) return {}; const u = (t + hash(i * 2.3) * P) % P; return { sy: u < 0.18 ? 1 - 0.9 * Math.sin(Math.PI * u / 0.18) : 1 }; })); }
  $$('.spanL').forEach((g, i) => idle(g, t => ({ r: 3 * Math.sin(W2 * 10 * t + i) })));
  $$('.spanR').forEach((g, i) => idle(g, t => ({ r: -3 * Math.sin(W2 * 10 * t + i) })));
  // a-line: solid draw-on
  { const p = $('#A .a-dl'); p.setAttribute('stroke-dasharray', '100'); p.style.strokeDashoffset = 0; }

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('q1'), tC = cut('m1'), tD = cut('m3'), tE = cut('m5'), tF = cut('t1'), tG = cut('j1'), tH = cut('j2'), tI = cut('v1'), tLoop = TOTAL - 0.6;
  const CUTS = [0, tB, tC, tD, tE, tF, tG, tH, tI], IDS = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 260 * easeIO((t - c + 0.35) / 0.7); }); x -= 2080 * easeIO((t - tLoop) / 0.6); return x; };
  custom(t => {
    const x = camX(t);
    $('#stars').style.transform = `translate(${(-(x * 0.12 + t * 6) % 2400).toFixed(1)}px,0)`;
    $('#earth').style.transform = `translate(${(-x * 0.4).toFixed(1)}px,0)`;
    $('#clouds').style.transform = `translate(${(-(x * 0.8 + t * 14) % 1740).toFixed(1)}px,0)`;
  });
  grade(0, 'transparent'); grade(tB, 'rgba(255,59,92,.16)'); grade(tC, 'rgba(255,207,61,.10)'); grade(tD, 'rgba(95,216,255,.10)');
  grade(tE, 'rgba(180,140,255,.12)'); grade(tF, 'rgba(255,170,60,.14)'); grade(tG - 0.2, 'rgba(60,160,255,.24)'); grade(tH, 'rgba(255,120,160,.18)');
  grade(tI, 'rgba(255,59,92,.12)'); grade(W('e1', 0) - 0.1, 'rgba(125,255,138,.12)'); grade(tLoop + 0.3, 'transparent');
  const bob = (sel, k = 6, amp = 10) => idle(sel, t => ({ y: amp * Math.sin(W2 * k * 2 * t), r: 1.6 * Math.sin(W2 * k * t) }));
  bob('.a-sat', 6, 12); bob('.b-sat', 7, 8); bob('.c-sat', 5, 8); bob('.d-sat', 6, 6); ['.e-s1', '.e-s2', '.e-s3', '.e-s4'].forEach((s, i) => bob(s, 5 + i, 7)); bob('.f-sat', 6, 7); bob('.i-sat', 5, 8);
  $$('.m').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2')) idle(m, t => ({ y: 5 * Math.sin(W2 * 16 * t + i), r: 1.2 * Math.sin(W2 * 8 * t + i) })); });
  const wings = (sel, t, a = 18, d = 0.3) => { tw($$(sel + ' .spanL'), t, d, { r: [0, -a] }, 'back'); tw($$(sel + ' .spanR'), t, d, { r: [0, a] }, 'back'); tw($$(sel + ' .spanL'), t + d + 0.15, 0.35, { r: [-a, 0] }, 'inOut'); tw($$(sel + ' .spanR'), t + d + 0.15, 0.35, { r: [a, 0] }, 'inOut'); };
  const look = (sel, t, x, y, d = 0.25) => tw($$(sel + ' .spup'), t, d, { x: [0, x], y: [0, y] }, 'out');

  // ================= A: hook — «20 000 КМ», the satellite introduces itself =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  hide('#A .a-chip'); hide('#A .a-chip2');
  wings('#A .a-sat', W('hook', 0) + 0.02, 16);
  punch('#A .a-sat', W('hook', 1), 0.06); slideIn('#A .a-chip', W('hook', 2) - 0.08, 'left', 0.6, 420); sfx('whoosh', W('hook', 2) - 0.08, 0.4);
  mascotPose('#A .a-m', W('hook', 1), 'pointUp');
  punch('#A .a-n', W('hook', 4) + 0.02, 0.1); sfx('tick', W('hook', 4), 0.5);
  tw('#A .a-dl', W('hook', 4) + 0.1, 0.6, { dash: [100, 0] }, 'out'); sfx('zap', W('hook', 4) + 0.1, 0.25);
  look('#A .a-sat', W('hook', 4) + 0.2, -8, 8);
  focus('#A > .cam', W('hook', 4), 540, 280, 1.06, 0.5, 0.25, 0.4, 540, 330);
  slideIn('#A .a-chip2', W('hook', 5) - 0.05, 'right', 0.55, 420); sfx('whoosh', W('hook', 5) - 0.05, 0.35);
  mascotPose('#A .a-m', W('hook', 5), 'wave'); jump('#A .a-m', W('hook', 5) + 0.1, 50, 0.42, '#A .a-shd');

  // ================= B: «Твой телефон знает, где ты. Значит, я слежу?» =================
  morphCut('#A', '#B', tB, '#A .a-sat', '.b-sat', 0.6);
  hide('.b-q'); hide('.b-chip'); hide('.b-pin'); hide('.b-el');
  tw('.b-ph', tB - 0.25, 0.6, { y: [900, 0], r: [8, 0] }, 'out');
  mascotPose('.b-m', W('q1', 1), 'pointL');
  { const tp = W('q1', 2) - 0.02;
    tw('.b-pin', tp, 0.05, { o: [0, 1] }, 'lin'); tw('.b-pin', tp, 0.45, { y: [-420, 0] }, 'in'); tw('.b-pin', tp + 0.45, 0.1, { sy: [1, 0.75] }, 'out'); tw('.b-pin', tp + 0.55, 0.3, { sy: [0.75, 1] }, 'back');
    sfx('thud', tp + 0.45, 0.5); burst('#B .cam', 8, 365, 735, tp + 0.45, 120, 4, 'spark');
    jump('.b-m', W('q1', 3), 50, 0.4, '.b-shd2'); punch('.b-ph', tp + 0.47, 0.04); }
  { const ts = W('q1', 5);
    tw('.b-sat .sbrow', ts, 0.25, { r: [0, 0], y: [0, 9] }, 'out'); look('.b-sat', ts, -8, 7);
    tw('.b-el', ts + 0.05, 0.2, { o: [0, 1] }, 'lin'); idle('.b-el', t => ({})); custom(t => { if (t > ts) $('.b-el').style.strokeDashoffset = (-(t - ts) * 90).toFixed(1); });
    sfx('zap', ts + 0.05, 0.3); tw('.b-sat', ts, 0.35, { x: [0, -30], r: [0, -6] }, 'out');
    mascotPose('.b-m', ts + 0.1, 'think'); }
  { const tq = W('q1', 7);
    popIn('.b-q', tq - 0.05, 0.4); idle('.b-q', t => ({ r: t > tq ? 9 * Math.sin((t - tq) * 7) : 0 })); sfx('blip', tq, 0.5);
    slideIn('.b-chip', tq + 0.05, 'right', 0.5, 420); mascotPose('.b-m', tq, 'shock'); jump('.b-m', tq + 0.1, 40, 0.36, '.b-shd2');
    focus('#B > .cam', tq, 650, 560, 1.08, 0.45); }

  // ================= C: «Смотри: я только кричу вниз, где я и который час» =================
  tWhip('#B', '#C', tC, 0.46);
  hide('.c-b1'); hide('.c-b2'); hide('.c-pin'); hide('.c-ck');
  mascotPose('.c-m', W('m1', 0), 'pointUp'); wings('.c-sat', W('m1', 0), 22);
  { const t0 = W('m1', 3) - 0.05, t1 = L('m1').t1 + 0.1;
    for (let k = 0, t = t0; t < t1; k++, t += 0.32) { const w = '.c-w .w' + (k % 5);
      tw(w, t, 0.001, { o: [0.95, 0.95] }); tw(w, t, 0.9, { s: [0.25, 1.7], y: [0, 260] }, 'out'); tw(w, t + 0.3, 0.6, { o: [0.95, 0] }, 'lin'); if (k % 2 === 0) sfx('blip', t, 0.18); }
    tw('.c-sat .sglow', t0, 0.2, { o: [0, 1] }, 'lin'); tw('.c-sat .sglow', t1, 0.3, { o: [1, 0] }, 'lin');
    for (let t = t0; t < t1 - 0.1; t += 0.32) { tw('.c-sat .shorn', t, 0.1, { s: [1, 1.12] }, 'out'); tw('.c-sat .shorn', t + 0.1, 0.2, { s: [1.12, 1] }, 'out'); }
    mascotPose('.c-m', t0 + 0.05, 'shock'); tw('.c-m', t0 + 0.05, 0.3, { y: [0, 20], sy: [1, 0.92] }, 'out'); tw('.c-m', t0 + 0.5, 0.3, { y: [20, 0], sy: [0.92, 1] }, 'back'); }
  { const t1 = W('m1', 5) - 0.08, t2 = W('m1', 8) - 0.08;
    tw('.c-b1', t1, 0.05, { o: [0, 1] }, 'lin'); tw('.c-b1', t1, 0.5, { x: [300, 0], y: [-300, 0], s: [0.3, 1], r: [20, -4] }, 'back'); sfx('pop', t1, 0.5);
    popIn('.c-pin', t1 + 0.3, 0.35); tw('.c-pin', t1 + 0.65, 0.3, { y: [0, -14] }, 'out');
    tw('.c-b2', t2, 0.05, { o: [0, 1] }, 'lin'); tw('.c-b2', t2, 0.5, { x: [-220, 0], y: [-340, 0], s: [0.3, 1], r: [-20, 4] }, 'back'); sfx('pop', t2, 0.5);
    popIn('.c-ck', t2 + 0.3, 0.35); tw('.c-ck .cmin', t2 + 0.3, 0.6, { r: [0, 360] }, 'out'); tw('.c-ck .cbell', W('m1', 9) + 0.2, 0.08, { r: [-8, 8] }, 'lin'); tw('.c-ck .cbell', W('m1', 9) + 0.28, 0.2, { r: [8, 0] }, 'back'); sfx('ding', W('m1', 9) + 0.2, 0.35);
    mascotPose('.c-m', t1 + 0.1, 'pointL'); mascotPose('.c-m', t2 + 0.1, 'point'); }

  // ================= D: «Крик летит со скоростью света, но не мгновенно. Телефон засекает, сколько крик летел…» =================
  tSlideUp('#C', '#D', tD, 0.55);
  hide('.d-o1'); hide('.d-o2'); hide('.d-sw'); hide('.d-chip'); hide('.d-chip2');
  mascotPose('.d-m', tD + 0.2, 'hold');
  { const t0 = W('m3', 1) - 0.05, t1 = W('m3', 7) + 0.25;
    tw('.d-o1', t0, 0.08, { o: [0, 1] }, 'lin'); tw('.d-o1', t0, t1 - t0, { y: [0, 500], s: [0.7, 1] }, 'inOut'); tw('.d-o1', t1 + 0.05, 0.25, { o: [1, 0], s: [1, 2.2] }, 'out');
    place($('.d-o1'), 480, 370); place($('.d-o2'), 480, 370);
    tw('.d-tr', t0, t1 - t0, { dash: [100, 0] }, 'inOut'); sfx('riser2', t0, 0.5);
    tw('.d-sat .shorn', t0 - 0.1, 0.12, { s: [1, 1.2] }, 'out'); tw('.d-sat .shorn', t0 + 0.02, 0.25, { s: [1.2, 1] }, 'back');
    slideIn('.d-chip', W('m3', 3) - 0.05, 'left', 0.55, 420); sfx('whoosh', W('m3', 3), 0.3);
    idle('.d-m .pup', t => (t > t0 && t < t1 + 0.3) ? { y: -8 + 16 * easeIO((t - t0) / (t1 - t0)) } : {});
    punch('.d-ph', t1, 0.08); sfx('ding', t1, 0.45); burst('#D .cam', 10, 540, 960, t1, 140, 7, 'spark');
    mascotPose('.d-m', W('m3', 5), 'think'); }
  { const tp = W('m4', 0); punch('.d-ph', tp, 0.06); mascotPose('.d-m', tp, 'pointL');
    const ts = W('m4', 1) - 0.05; popIn('.d-sw', ts, 0.4); sfx('pop', ts, 0.5);
    tw('.d-sw .swbtn', ts + 0.3, 0.08, { y: [0, 12] }, 'in'); tw('.d-sw .swbtn', ts + 0.38, 0.15, { y: [12, 0] }, 'out'); sfx('tick', ts + 0.35, 0.6);
    const t0 = W('m4', 2) - 0.05, t1 = W('m4', 4) + 0.35;
    tw('.d-o2', t0, 0.06, { o: [0, 1] }, 'lin'); tw('.d-o2', t0, t1 - t0, { y: [0, 500], s: [0.7, 1] }, 'inOut'); tw('.d-o2', t1 + 0.02, 0.25, { o: [1, 0], s: [1, 2] }, 'out');
    tw('.d-sw .swhand', t0, t1 - t0, { r: [0, 330] }, 'lin'); tw('.d-sw .swring', t0, t1 - t0, { dash: [100, 8] }, 'lin');
    for (let k = 0; k < 6; k++) sfx('tick', t0 + (t1 - t0) * k / 6, 0.3);
    tw('.d-sw .swbtn', t1, 0.08, { y: [0, 12] }, 'in'); tw('.d-sw .swbtn', t1 + 0.08, 0.15, { y: [12, 0] }, 'out'); sfx('ding', t1 + 0.02, 0.5); punch('.d-sw', t1 + 0.05, 0.1);
    focus('#D > .cam', t0 + 0.1, 620, 820, 1.06, (t1 - t0) + 0.2);
    mascotPose('.d-m', t1 + 0.05, 'cheer'); }
  { const tr = W('m4', 6) - 0.1;
    tw('.d-ruler', tr, 0.1, { o: [0, 1] }, 'lin'); tw('.d-rl', tr, 0.55, { dash: [100, 0] }, 'out'); sfx('zap', tr, 0.3);
    slideIn('.d-chip2', W('m4', 9) - 0.1, 'right', 0.5, 420); sfx('whoosh', W('m4', 9) - 0.1, 0.3);
    mascotPose('.d-m', W('m4', 7), 'pointUp'); jump('.d-m', W('m4', 9), 45, 0.4); }

  // ================= E: «Он слушает 4 спутника: 3 дают точку, четвёртый сверяет часы» =================
  morphCut('#D', '#E', tE, '.d-ph', '.e-ph', 0.6);
  hide('.e-ck'); hide('.e-pin');
  const SATS = ['.e-s1', '.e-s2', '.e-s3', '.e-s4'], HORN = [[150, 440], [430, 310], [690, 370], [930, 520]], P = [545, 1060];
  SATS.forEach((s, i) => { const t = W('m5', 1) + i * 0.12; hide(s); tw(s, t, 0.05, { o: [0, 1] }, 'lin'); tw(s, t, 0.5, { y: [-420, 0], r: [i % 2 ? 12 : -12, 0] }, 'back'); sfx('pop', t + 0.1, 0.3); });
  { const bd = $('.e-badges'); SATS.forEach((s, i) => { const r = $(s).getBoundingClientRect(); const b = mk(bd, 'badge'); b.textContent = i + 1; place(b, r.left + r.width / 2 - 38, r.top - 20); hide(b);
      const t = W('m5', 2) - 0.05 + i * 0.1; popIn(b, t, 0.3); sfx('tick', t, 0.4); if (i === 3) b.style.background = '#ff6fae'; }); }
  mascotPose('.e-m', W('m5', 1), 'pointUp');
  { const svg = $('.e-rings'), cols = ['#ffcf3d', '#5fd8ff', '#7dff8a'];
    HORN.slice(0, 3).forEach(([x, y], i) => { const r = Math.hypot(P[0] - x, P[1] - y);
      svg.insertAdjacentHTML('beforeend', `<circle class="er${i}" cx="${x}" cy="${y}" r="${r.toFixed(0)}" pathLength="100" fill="none" stroke="${cols[i]}" stroke-width="10" style="stroke-dasharray:100;stroke-dashoffset:100" opacity=".85"/>`);
      const t = W('m5', 4) - 0.05 + i * 0.16; tw('.er' + i, t, 0.7, { dash: [100, 0] }, 'out'); sfx('zap', t, 0.22); });
    const tp = W('m5', 6) - 0.05;
    tw('.e-pin', tp, 0.05, { o: [0, 1] }, 'lin'); tw('.e-pin', tp, 0.35, { y: [-300, 0], s: [1.6, 1] }, 'in'); tw('.e-pin', tp + 0.35, 0.3, { sy: [0.75, 1] }, 'back');
    sfx('thud', tp + 0.35, 0.55); burst('#E .cam', 14, 545, 1050, tp + 0.36, 200, 11, 'conf'); mascotPose('.e-m', tp + 0.3, 'cheer'); jump('.e-m', tp + 0.35, 45, 0.4);
    focus('#E > .cam', tp + 0.2, 545, 960, 1.08, 0.45);
    // the 4th satellite: its clock line to the phone, the phone clock is set
    const t4 = W('m5', 7) - 0.05;
    svg.insertAdjacentHTML('beforeend', `<path class="e4l" pathLength="100" d="M930 520 Q860 760 700 900" fill="none" stroke="#ff6fae" stroke-width="10" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/>`);
    punch('.e-s4', t4, 0.12); tw('.e-s4 .sglow', t4, 0.2, { o: [0, 1] }, 'lin'); tw('.e4l', t4 + 0.05, 0.4, { dash: [100, 0] }, 'out'); sfx('zap', t4 + 0.05, 0.3);
    popIn('.e-ck', W('m5', 8) - 0.05, 0.35); sfx('pop', W('m5', 8), 0.4);
    tw('.e-ck .cmin', W('m5', 8) + 0.1, 0.55, { r: [140, 0] }, 'back'); tw('.e-ck .chand', W('m5', 8) + 0.1, 0.55, { r: [-90, 0] }, 'back');
    tw('.e-s4 .sclockh', W('m5', 8), 0.4, { r: [0, 360] }, 'out');
    sfx('ding', W('m5', 9) + 0.15, 0.45); punch('.e-ck', W('m5', 9) + 0.15, 0.12);
    mascotPose('.e-m', t4, 'think'); mascotPose('.e-m', W('m5', 9) + 0.1, 'point'); }

  // ================= F: «Но наверху время бежит быстрее: за сутки — на 38 миллионных секунды» =================
  tCircle('#E', '#F', tF, 540, 700);
  hide('.f-l1'); hide('.f-l2'); hide('.f-n'); hide('.f-u');
  slideIn('.f-l1', W('t1', 0), 'left', 0.5, 420); slideIn('.f-l2', W('t1', 1), 'right', 0.5, 420); sfx('whoosh', W('t1', 0), 0.3);
  mascotPose('.f-m', W('t1', 1), 'pointUp'); wings('.f-sat', W('t1', 1), 18);
  { const tf = W('t1', 3);   // the minute hands: same pace, then the upper clock runs ahead
    idle('.f-ck1 .cmin', t => ({ r: (t - tF) * 120 }));
    idle('.f-ck2 .cmin', t => ({ r: (t - tF) * 120 + (t > tf ? Math.pow(t - tf, 1.35) * 260 : 0) }));
    sfx('whoosh', tf, 0.35); punch('.f-ck2', tf, 0.08); tw('.f-sat', tf, 0.3, { r: [0, 8] }, 'back'); tw('.f-sat', tf + 0.5, 0.4, { r: [8, 0] }, 'inOut');
    mascotPose('.f-m', tf + 0.1, 'shock'); jump('.f-m', tf + 0.1, 40, 0.38); }
  { const td = W('t2', 1);   // «сутки»: hour hands make a full day
    tw('.f-ck1 .chand', td - 0.1, 0.7, { r: [0, 720] }, 'inOut'); tw('.f-ck2 .chand', td - 0.1, 0.7, { r: [0, 740] }, 'inOut'); sfx('riser2', td - 0.1, 0.4);
    mascotPose('.f-m', td, 'think'); }
  { const tn = W('t2', 3) - 0.04;
    tw('.f-ck1', tn - 0.1, 0.35, { x: [0, -150], s: [1, 0.78] }, 'out'); tw('.f-ck2', tn - 0.1, 0.35, { x: [0, 150], s: [1, 0.78] }, 'out');
    tw('.f-l1', tn - 0.1, 0.35, { x: [0, -60] }, 'out'); tw('.f-l2', tn - 0.1, 0.35, { x: [0, 60] }, 'out');
    tw('.f-n', tn, 0.05, { o: [0, 1] }, 'lin'); tw('.f-n', tn, 0.4, { s: [2.4, 1], r: [-12, 0] }, 'back'); sfx('slam', tn + 0.05, 0.6); shake(tn + 0.1, 0.25, 12);
    focus('#F > .cam', tn, 540, 700, 1.07, 0.6);
    slideIn('.f-u', W('t2', 4) - 0.08, 'down', 0.55, 200); sfx('whoosh', W('t2', 4), 0.3);
    mascotPose('.f-m', tn + 0.1, 'pointL'); mascotPose('.f-m', W('t2', 5), 'shrug'); }

  // ================= G: joke — «Мелочь? Без поправки за день карта уехала бы километров на 11» =================
  tDrop('#F', '#G', tG, 0.5);
  hide('.g-km'); hide('.g-chip'); hide('.g-pl');
  mascotPose('.g-m', W('j1', 0), 'shrug'); tw('.g-m', W('j1', 0), 0.3, { r: [0, -6] }, 'back');
  slideIn('.g-chip', W('j1', 1) - 0.05, 'left', 0.5, 420); sfx('whoosh', W('j1', 1), 0.3); punch('.g-chip', W('j1', 2) + 0.2, 0.08);
  { const tp = W('j1', 5) - 0.1, d = W('j1', 10) - tp + 0.05;   // the pin drives off along the dotted road to the lake
    tw('.g-pl', tp, 0.15, { o: [0, 1] }, 'lin'); custom(t => { if (t > tp) $('.g-pl').style.strokeDashoffset = (-(t - tp) * 60).toFixed(1); });
    arc('.g-pin', tp, d, 510, -10, 170, 20); sfx('whoosh', tp, 0.5); tw('.g-map', tp, 0.25, { x: [0, -16] }, 'out'); tw('.g-map', tp + 0.25, 0.4, { x: [-16, 0] }, 'back');
    mascotPose('.g-m', tp, 'pointL');
    // the mascot follows the pin: two hops, then a dive into the lake
    arc('.g-m', tp + 0.35, 0.5, 200, -10, 70); arc('.g-m', tp + 0.95, 0.5, 200, 0, 70);   // stacked arcs: x adds up
    const tj = W('j1', 10) + 0.15; arc('.g-m', tj, 0.45, 160, 70, 90, 25);
    mascotPose('.g-m', tj, 'shock');
    splash('#G .g-fx', 14, 820, 940, tj + 0.42, 3); sfx('boom', tj + 0.42, 0.35); sfx('impact', tj + 0.42, 0.3); shake(tj + 0.45, 0.25, 12);
    tw('.g-m', tj + 0.42, 0.3, { sy: [1, 0.8] }, 'out');
    tw('.g-map .mlake', tj + 0.42, 0.12, { s: [1, 1.03] }, 'out'); tw('.g-map .mlake', tj + 0.54, 0.3, { s: [1.03, 1] }, 'back');
    popIn('.g-km', W('j1', 10) - 0.05, 0.45); sfx('slam', W('j1', 10), 0.55); punch('.g-km', tj + 0.45, 0.12);
    focus('#G > .cam', W('j1', 10), 700, 800, 1.06, 0.6); }

  // ================= H: joke — «Поэтому часы мне ещё на Земле замедлили» =================
  tZoom('#G', '#H', tH, 0.5);
  hide('.h-tech'); hide('.h-sd'); hide('.h-sn'); hide('.h-chip');
  idle('.h-sat .sclockh', t => ({ r: t < W('j2', 5) + 0.3 ? (t - tH) * 900 : (W('j2', 5) + 0.3 - tH) * 900 + (t - W('j2', 5) - 0.3) * 120 }));
  tw('.h-tab', tH - 0.2, 0.5, { y: [400, 0] }, 'out'); tw('.h-sat', tH - 0.1, 0.5, { y: [-500, 0] }, 'out'); sfx('thud', tH + 0.35, 0.4);
  { const tt = W('j2', 0) - 0.05;
    tw('.h-tech', tt, 0.05, { o: [0, 1] }, 'lin'); tw('.h-tech', tt, 0.45, { x: [-400, 0] }, 'out'); sfx('whoosh', tt, 0.4);
    tw('.h-tech .parmR', tt + 0.3, 0.35, { r: [0, -55] }, 'back');
    tw('.h-sd', W('j2', 1) - 0.1, 0.05, { o: [0, 1] }, 'lin'); tw('.h-sd', W('j2', 1) - 0.1, 0.4, { x: [-260, 0], y: [80, 0], r: [-40, 18] }, 'out');
    focus('#H > .cam', W('j2', 1), 610, 820, 1.15, 1.2);
    slideIn('.h-chip', W('j2', 3) - 0.05, 'left', 0.5, 420); sfx('whoosh', W('j2', 3), 0.3);
    const tz = W('j2', 6) - 0.1;
    for (let k = 0; k < 3; k++) { tw('.h-sd', tz + k * 0.18, 0.09, { r: [18, -14] }, 'inOut'); tw('.h-sd', tz + k * 0.18 + 0.09, 0.09, { r: [-14, 18] }, 'inOut'); sfx('clink', tz + k * 0.18, 0.4); }
    tw('.h-sat .sbrow', tz, 0.2, { y: [0, 8] }, 'out'); tw('.h-sat', tz, 0.3, { r: [0, -3] }, 'back');
    tw('.h-sn', tz + 0.45, 0.05, { o: [0, 1] }, 'lin'); tw('.h-sn', tz + 0.45, 0.35, { s: [2.2, 1], r: [25, -8] }, 'back'); sfx('pop', tz + 0.45, 0.6);
    idle('.h-sn', t => t > tz + 0.8 ? { x: (t - tz - 0.8) * 14 } : {});
    mascotPose('.h-m', W('j2', 0), 'think'); mascotPose('.h-m', tz + 0.5, 'cheer'); jump('.h-m', tz + 0.5, 40, 0.38); }

  // ================= I: verdict — «Так я слежу? Нет: телефон считает сам и мне не отвечает. «Спутник следит» — байт.» =================
  morphCut('#H', '#I', tI, '.h-sat', '.i-sat', 0.6);
  hide('.i-x'); hide('.i-chip'); hide('.i-ph2');
  tw('.i-ph', tI - 0.1, 0.5, { y: [800, 0] }, 'out');
  mascotPose('.i-m', W('v1', 0), 'think');
  { const tn = W('v1', 3);
    for (let k = 0; k < 3; k++) { tw('.i-sat', tn + k * 0.16, 0.08, { r: [0, -7] }, 'out'); tw('.i-sat', tn + k * 0.16 + 0.08, 0.08, { r: [-7, 0] }, 'out'); }
    sfx('buzz', tn, 0.35); tw('.i-sat .sbrow', tn, 0.2, { y: [0, -8] }, 'out'); }
  { const tc = W('v1', 4) - 0.05;
    punch('.i-ph', tc, 0.08); burst('#I .i-fx', 10, 460, 980, tc + 0.1, 170, 21, 'spark'); sfx('zap', tc + 0.1, 0.35);
    slideIn('.i-chip', W('v1', 5) - 0.1, 'left', 0.5, 420); sfx('whoosh', W('v1', 5), 0.3);
    mascotPose('.i-m', tc, 'pointL');
    const ta = W('v1', 8) - 0.15; tw('.i-al', ta, 0.4, { dash: [100, 0] }, 'out'); sfx('whoosh', ta, 0.3);
    popIn('.i-x', W('v1', 9) - 0.02, 0.3); sfx('buzz', W('v1', 9), 0.45); shake(W('v1', 9) + 0.05, 0.2, 8);
    wings('.i-sat', W('v1', 10), 20); mascotPose('.i-m', W('v1', 10), 'shrug'); }
  // БАЙТ: the mascot hops and slams its arm down; the stamp hits the top and stays to the loop
  const tSt = W('v2', 2) - 0.02;
  hide('#stampL .st');
  tw('.i-al, .i-x', W('v2', 0), 0.3, { o: [1, 0] }, 'lin'); slideOut('.i-chip', W('v2', 0), 'left', 0.35, 400);
  mascotPose('.i-m', W('v2', 0), 'pointUp');
  mascotPose('.i-m', tSt - 0.5, 'pointUp'); tw('.i-m', tSt - 0.45, 0.25, { y: [0, -90] }, 'out'); tw('.i-m', tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose('.i-m', tSt - 0.18, 'point', 0.18);
  stamp('#stampL .st', tSt, -7, 26); burst('.st-fx', 22, 540, 340, tSt + 0.05, 420, 61, 'conf', 140);
  mascotPose('.i-m', tSt + 0.35, 'cheer'); tw('.i-sat .sbrow', tSt, 0.25, { y: [-8, 6] }, 'out');
  // takeaway: the phone flips to the app screen, location pins pop, the mascot switches one off
  { const te = W('e1', 0) - 0.1;
    tw('.i-sat', te, 0.5, { x: [0, -10], y: [0, -50], s: [1, 0.85] }, 'out');
    tw('.i-ph, .i-ph2', te, 0.5, { s: [1, 1.22] }, 'out');
    tw('.i-ph', te, 0.12, { sx: [1, 0] }, 'in'); tw('.i-ph', te + 0.12, 0.001, { o: [1, 0] });
    tw('.i-ph2', te + 0.12, 0.001, { o: [0, 1] }); tw('.i-ph2', te + 0.12, 0.25, { sx: [0, 1] }, 'back'); sfx('whoosh', te, 0.35);
    const ta = te + 0.3; [0, 1, 2, 3].forEach(k => { tw(`.i-ph2 .apg${k}`, ta + k * 0.08, 0.3, { s: [0.2, 1] }, 'back'); });
    sfx('pop', ta, 0.4); hide('.i-ph2 .ap0'); hide('.i-ph2 .ap1'); hide('.i-ph2 .ap2'); hide('.i-ph2 .ap3');
    const tg = W('e1', 5) - 0.05; [0, 2, 3].forEach((k, j) => { const t = tg + j * 0.12; tw(`.i-ph2 .ap${k}`, t, 0.05, { o: [0, 1] }, 'lin'); tw(`.i-ph2 .ap${k}`, t, 0.3, { s: [2, 1], y: [-30, 0] }, 'back'); sfx('tick', t, 0.5); });
    focus('#I > .cam', tg, 460, 980, 1.12, 0.5);
    mascotPose('.i-m', W('e1', 3), 'pointL');
    const tt = L('e1').t1 - 0.95;
    tw('.i-ph2 .tog', tt, 0.3, { x: [0, -110] }, 'back'); tw('.i-ph2 .ap2', tt + 0.05, 0.25, { o: [1, 0], s: [1, 0.3] }, 'in'); sfx('blip', tt, 0.5);
    mascotPose('.i-m', tt - 0.15, 'point'); tw('.i-m', tt - 0.2, 0.25, { x: [0, 30] }, 'out'); }
  tw('#I .i-ph2, #I .i-sat, #I .shd, #stampL .st', tLoop + 0.05, 0.3, { o: [1, 0] }, 'in');
  hide('#A2 .a-chip'); hide('#A2 .a-chip2'); hide('#A2 .a-dl'); loopTo('#A2', tLoop); tw('#I .i-m', tLoop + 0.42, 0.001, { o: [1, 0] });
}, { chunks: {} });
