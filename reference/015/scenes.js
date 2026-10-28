// 015 «Один вопрос нейронке = бутылка воды?» — Байт или не байт, проверка мифа на глазах.
// Li et al., arXiv 2304.03271 (бутылка 500 мл на 10–50 ответов); Google, 21.08.2025 (медианный запрос ≈ 5 капель, 0,26 мл, только охлаждение).
boot(() => {
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
  const clamp = x => Math.max(0, Math.min(1, x));
  const place = (el, x, y, w, h) => { el.style.left = x + 'px'; el.style.top = y + 'px'; if (w) el.style.width = w + 'px'; if (h) el.style.height = h + 'px'; return el; };
  const easeIO = x => (x = clamp(x), x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2), easeO = x => 1 - Math.pow(1 - clamp(x), 3);
  // jump with anticipation, stretch in the air, squash on landing; the shadow shrinks while airborne
  const jump = (el, t, h = 80, d = 0.5, sh = null) => {
    tw(el, t - 0.12, 0.12, { sy: [1, 0.86], sx: [1, 1.08] }, 'out');
    tw(el, t, d / 2, { y: [0, -h], sy: [0.86, 1.08], sx: [1.08, 0.95] }, 'out');
    tw(el, t + d / 2, d / 2, { y: [-h, 0], sy: [1.08, 1], sx: [0.95, 1] }, 'in');
    tw(el, t + d, 0.08, { sy: [1, 0.88], sx: [1, 1.1] }, 'out'); tw(el, t + d + 0.08, 0.3, { sy: [0.88, 1], sx: [1.1, 1] }, 'back');
    if (sh) { tw(sh, t, d / 2, { s: [1, 0.55], o: [1, 0.5] }, 'out'); tw(sh, t + d / 2, d / 2, { s: [0.55, 1], o: [0.5, 1] }, 'in'); }
  };
  // flights along quadratic curves (absolute stage px of the element centre)
  const ARCS = [];
  const arc = (el, t0, d, p0, p1, p2, spin = 0, w = 0, h = 0, s0 = 1, s1 = 1) => ARCS.push({ el, t0, d, p0, p1, p2, spin, w, h, s0, s1 });
  custom(t => {
    const last = new Map();
    for (const a of ARCS) { if (t >= a.t0) last.set(a.el, a); else if (!last.has(a.el)) last.set(a.el, null); }
    last.forEach((a, el) => { if (!a) return; const u = easeIO((t - a.t0) / a.d) * 0.35 + clamp((t - a.t0) / a.d) * 0.65, q = 1 - u;
      const x = q * q * a.p0[0] + 2 * q * u * a.p1[0] + u * u * a.p2[0], y = q * q * a.p0[1] + 2 * q * u * a.p1[1] + u * u * a.p2[1];
      el.style.transform = `translate(${(x - a.w / 2).toFixed(1)}px,${(y - a.h / 2).toFixed(1)}px) rotate(${(a.spin * u).toFixed(1)}deg) scale(${(a.s0 + (a.s1 - a.s0) * u).toFixed(3)})`; });
  });
  const burst = (par, n, x, y, t, dist = 220, seed = 0, cls = 'spark', fall = 0) => {
    const cols = ['#5fd0ff', '#ffe14d', '#ff9a52', '#b8ff3d', '#ff5fa2'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.7, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.5, 0.25, { o: [1, 0] }, 'lin'); } };
  const level = (el, t, d, a, b, ease = 'inOut') => tw(el, t, d, { sy: [a, b] }, ease);   // water levels: scaleY from the bottom

  // ---------- world: copper laboratory, three parallax layers ----------
  const FL = ['#5fd0ff', '#ff9a52', '#b8ff3d', '#ff5fa2', '#ffe14d'];
  for (let k = 0; k < 9; k++) { place(mk('#shelves', 'shelf'), k * 360 + 40, 520 + 260 * (k % 2), 300, 22);
    for (let j = 0; j < 3; j++) { const f = mk('#shelves', 'flask'), w = 50 + 30 * hash(k * 7 + j), h = 70 + 70 * hash(k * 3 + j + 1);
      place(f, k * 360 + 60 + j * 95, 520 + 260 * (k % 2) - h, w, h); f.style.background = `linear-gradient(180deg,transparent 40%,${FL[(k + j) % 5]} 40%)`; } }
  for (let k = 0; k < 12; k++) place(mk('#bench', 'bleg'), 120 + k * 280, 44);
  mk('#bench', 'btop');
  $('#shelves').style.opacity = 0.55;

  // ---------- build ----------
  const buildA = sc => {
    $(sc + ' .a-bt').innerHTML = bottleSVG(sc.slice(1) + 'b'); $(sc + ' .a-bub').innerHTML = bubbleSVG();
    $(sc + ' .a-ph').innerHTML = phoneSVG();
  };
  buildA('#A');
  $('#A2').innerHTML = $('#A').innerHTML; ['.a-bt', '.a-bub', '.a-ph', '.a-m'].forEach(k => $('#A2 ' + k).innerHTML = ''); buildA('#A2');
  $('.b-pp').innerHTML = paperSVG(); $('.b-bt').innerHTML = bottleSVG('bb'); $('.b-one').innerHTML = bubbleSVG();
  $('.b-x').innerHTML = sv('0 0 280 230', `<path class="x1" d="M30 30 L250 200" pathLength="100" stroke="#ff3b5c" stroke-width="28" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/><path class="x2" d="M250 30 L30 200" pathLength="100" stroke="#ff3b5c" stroke-width="28" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/>`);
  $('.c-q').innerHTML = bubbleSVG('#ffffff', '?'); $('.c-bub').innerHTML = bubbleSVG('#ffe14d', '?');
  $('.d-th').innerHTML = thermoSVG();
  $('.e-rack').innerHTML = rackSVG('e'); $('.e-tap').innerHTML = tapSVG(); $('.e-bk').innerHTML = beakerSVG('e'); $('.e-ph').innerHTML = phoneSVG(); $('.e-bub').innerHTML = bubbleSVG('#ffe14d', '?');
  $('.f-tap').innerHTML = tapSVG(); $('.f-bkt').innerHTML = bucketSVG('f'); $('.f-bk').innerHTML = beakerSVG('f'); $('.f-br').innerHTML = brushSVG();
  $('.g-bt').innerHTML = bottleSVG('gb', 0);
  $('.h-rack').innerHTML = rackSVG('h'); $('.h-lens').innerHTML = lensSVG();
  $('.i-bt').innerHTML = bottleSVG('ib'); $('.i-bub').innerHTML = bubbleSVG(); $('.i-bell').innerHTML = bellSVG();
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  mascotLife();

  // ---------- cuts, camera, parallax ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('s1'), tC = cut('m1'), tD = cut('m2'), tE = cut('x1'), tF = cut('j1'), tG = cut('p1'), tH = cut('c1'), tI = cut('v1'), tLoop = TOTAL - 0.8;
  const CUTS = [0, tB, tC, tD, tE, tF, tG, tH, tI], IDS = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < 8 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 300 * easeIO((t - c + 0.35) / 0.7); }); x -= 2400 * easeIO((t - tLoop) / 0.6); return x; };
  custom(t => {
    const x = camX(t);
    $('#tiles').style.transform = `translate(${(-(x * 0.15) % 120).toFixed(1)}px,0)`;
    $('#shelves').style.transform = `translate(${(-x * 0.5).toFixed(1)}px,0)`;
    $('#bench').style.transform = `translate(${(-(x * 1.0) % 280).toFixed(1)}px,0)`;
    $('#lamp1').style.transform = `translate(${(-x * 0.08).toFixed(1)}px,0) scale(${(1 + 0.05 * Math.sin(W2 * 6 * t)).toFixed(3)})`;
    $('#lamp2').style.transform = `translate(${(-x * 0.08).toFixed(1)}px,0) scale(${(1 + 0.05 * Math.cos(W2 * 5 * t)).toFixed(3)})`;
  });
  $$('.m').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2')) idle(m, t => ({ y: 7 * Math.sin(W2 * 16 * t + i), r: 1.6 * Math.sin(W2 * 8 * t + i) })); });
  idle('.wv', t => ({ x: 18 * Math.sin(W2 * 20 * t) }));

  // ================= A: hook — the question drinks the whole bottle =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  for (const sc of ['#A', '#A2']) { tw(sc + ' .a-m .pup', 0, 0.001, { x: [8, 8], y: [-4, -4] }); tw(sc + ' .a-m .armR', 0, 0.001, { r: [-30, -30] }); tw(sc + ' .a-ph', 0, 0.001, { r: [-12, -12] }); }
  idle('#A .a-bt, #A2 .a-bt', t => ({ r: 1.2 * Math.sin(W2 * 10 * t) }));
  idle('#A .a-bub, #A2 .a-bub', t => ({ y: 10 * Math.sin(W2 * 14 * t) }));
  punch('#A .a-t', wt('hook', 0), 0.08); sfx('pop', wt('hook', 0) + 0.03, 0.5);
  punch('#A .a-ph', wt('hook', 1), 0.15); punch('#A .a-bub', wt('hook', 1), 0.18); sfx('blip', wt('hook', 1), 0.6);
  // «нейронке»: the bubble hops onto the bottle's neck
  const tN = wt('hook', 2);
  tw('#A .a-bub', tN - 0.05, 0.45, { x: [0, -150], y: [0, -40] }, 'back'); tw('#A .a-bub', tN - 0.05, 0.45, { r: [0, -12] }, 'out');
  tw('#A .a-m .pup', tN, 0.3, { x: [8, 10], y: [-4, -10] }, 'out');
  // «выпивает»: water drains with gulps, the bubble swells
  const tDr = wt('hook', 3);
  level('#A .a-bt .lvl', tDr, 1.1, 1, 0.08, 'inOut');
  for (let k = 0; k < 4; k++) { punch('#A .a-bub', tDr + k * 0.27, 0.12, 0.2); sfx('blip', tDr + k * 0.27, 0.45); }
  tw('#A .a-bub', tDr + 1.1, 0.4, { s: [1, 1.25] }, 'back');
  // «бутылку воды?»: the mascot jumps, eyes wide
  const tSh = wt('hook', 4);
  jump('#A .a-m', tSh, 70, 0.45, '#A .a-shd');
  tw('#A .a-m .mouth', tSh, 0.25, { sx: [1, 0.7], sy: [1, -1.2] }, 'back'); tw('#A .a-m .brL, #A .a-m .brR', tSh, 0.2, { y: [0, -16] }, 'out');
  tw('#A .a-m .armL', tSh, 0.3, { r: [0, 140] }, 'back'); tw('#A .a-ph', tSh, 0.3, { r: [-12, 18] }, 'back');
  punch('#A .a-t', wt('hook', 5), 0.1); sfx('thud', wt('hook', 5), 0.5);

  // ================= B: the scientists' bottle is for 10–50 answers =================
  tZoom('#A', '#B', tB);
  hide('.b-pp'); hide('.b-src'); hide('.b-n'); hide('.b-u'); hide('.b-one'); hide('.b-x');
  slideIn('.b-pp', wt('s1', 1) - 0.1, 'left', 0.7, 420); slideIn('.b-src', wt('s1', 1) + 0.05, 'left', 0.7, 420); sfx('whoosh', wt('s1', 1), 0.5);
  tw('.b-pp', wt('s1', 1) + 0.7, 0.6, { r: [0, -4] }, 'inOut');
  punch('.b-bt', wt('s1', 2), 0.08); sfx('pop', wt('s1', 2), 0.5);
  tw('.b-m .pup', wt('s1', 2), 0.3, { x: [0, 9], y: [0, -6] }, 'out');
  const t10 = wt('s1', 4) - 0.05;
  slideIn('.b-n', t10, 'down', 0.45, 160); sfx('ding', t10 + 0.05, 0.5);
  const bn = $('.b-n'); custom(t => { bn.textContent = t < t10 + 0.75 ? '10' : '10–50'; });
  punch('.b-n', t10 + 0.75, 0.1); sfx('tick', t10 + 0.75, 0.6);
  // the bubbles: a flock of answers flies into the bottle, which empties as they arrive
  const BB = [];
  for (let k = 0; k < 14; k++) { const b = mk('.b-bubs', 'bub', bubbleSVG(k % 3 ? '#ffffff' : '#ffe14d', '')); place(b, 0, 0, 90, 74); hide(b); BB.push(b); }
  BB.forEach((b, k) => { const t0 = t10 + 0.15 + k * 0.1, sx = 80 + 420 * hash(k + 3), sy = 1180 + 60 * hash(k + 8);
    tw(b, t0, 0.05, { o: [0, 1] }, 'lin'); arc(b, t0, 0.75, [sx, sy], [600 + 60 * hash(k), 380 - 120 * hash(k + 2)], [810, 600], 360 * (hash(k) - 0.5), 90, 74, 1, 0.4);
    tw(b, t0 + 0.72, 0.06, { o: [1, 0] }, 'lin'); if (k % 3 === 0) sfx('pop', t0 + 0.72, 0.35); });
  level('.b-bt .lvl', t10 + 0.5, 1.6, 1, 0, 'inOut');
  slideIn('.b-u', wt('s1', 5) - 0.05, 'down', 0.5, 120);
  // «а не на один»: one lonely bubble, crossed out, the mascot wags a finger
  const tOne = wt('s2', 0) - 0.05;
  popIn('.b-one', tOne, 0.35); sfx('pop', tOne, 0.6);
  tw('.b-x .x1', wt('s2', 3) - 0.1, 0.18, { dash: [100, 0] }, 'out'); tw('.b-x .x2', wt('s2', 3) + 0.06, 0.18, { dash: [100, 0] }, 'out');
  tw('.b-x', wt('s2', 3) - 0.1, 0.01, { o: [0, 1] }); sfx('buzz', wt('s2', 3), 0.5); shake(wt('s2', 3) + 0.15, 0.25, 12);
  tw('.b-m .armR', tOne, 0.3, { r: [0, -125] }, 'back');
  for (let k = 0; k < 4; k++) tw('.b-m .armR', tOne + 0.3 + k * 0.16, 0.16, { r: [k % 2 ? -110 : -140, k % 2 ? -140 : -110] }, 'inOut');
  tw('.b-m .brL, .b-m .brR', tOne, 0.25, { y: [0, 10] }, 'out'); tw('.b-m .pup', tOne, 0.25, { x: [9, -9], y: [-6, 4] }, 'out');

  // ================= C: why water? It lives on computers in a huge hall =================
  tWhip('#B', '#C', tC);
  hide('.c-q'); hide('.c-bub');
  popIn('.c-q', wt('m1', 0) - 0.05, 0.4); sfx('pop', wt('m1', 0), 0.6);
  tw('.c-m .armL', wt('m1', 0), 0.35, { r: [0, 120] }, 'back');
  for (let k = 0; k < 4; k++) tw('.c-m .armL', wt('m1', 0) + 0.35 + k * 0.14, 0.14, { r: [k % 2 ? 110 : 128, k % 2 ? 128 : 110] }, 'inOut');
  tw('.c-m .pup', wt('m1', 0), 0.3, { x: [0, -6], y: [0, -10] }, 'out'); tw('.c-m .brR', wt('m1', 0), 0.3, { y: [0, -14], r: [0, 8] }, 'back');
  // «вода?»: a drop drops into the thought bubble
  const cd = mk('#C .cam', 'drp', dropSVG()); place(cd, 262, 270, 70, 94); hide(cd);
  tw(cd, wt('m1', 2) - 0.05, 0.4, { o: [0, 1], y: [-200, 0], s: [0.6, 1] }, 'back'); sfx('blip', wt('m1', 2) + 0.2, 0.6);
  tw('.c-q svg text', wt('m1', 2) - 0.05, 0.2, { o: [1, 0] });
  // racks slide in: a near row and a far row (hall depth), LEDs blink
  const RACKS = [];
  const rackRow = (n, x0, y0, w, step, sc, t0, cls) => { for (let k = 0; k < n; k++) { const r = mk('.c-racks', cls, rackSVG('c' + cls + k)); place(r, x0 + k * step, y0, w, w * 560 / 260); r.style.zIndex = cls === 'far' ? 0 : 1; hide(r);
    tw(r, t0 + k * 0.1, 0.6, { x: [700, 0], o: [0, 1] }, 'expo'); RACKS.push(r); } };
  const tLive = wt('m1', 3) - 0.1, tHall = wt('m1', 7) - 0.1;
  rackRow(3, 440, 520, 190, 205, 1, tLive, 'near'); sfx('whoosh', tLive, 0.6);
  rackRow(6, 380, 300, 105, 112, 0.6, tHall, 'far'); sfx('whoosh', tHall, 0.5);
  $$('.c-racks .far').forEach(r => r.style.filter = 'brightness(.6)');
  RACKS.forEach((r, k) => $$('.led', r).forEach((l, j) => idle(l, t => ({ o: (t > tLive && hash(Math.floor(t * 6) + k * 13 + j) < 0.35) ? -0.8 : 0 }))));
  $$('.c-racks .led').forEach(l => tw(l, 0, 0.001, { o: [1, 1] }));
  // «живёт»: the little question hops into the middle rack
  tw('.c-bub', wt('m1', 4) - 0.1, 0.05, { o: [0, 1] }, 'lin');
  arc($('.c-bub'), wt('m1', 4) - 0.1, 0.6, [330, 960], [500, 420], [747, 760], 20, 120, 98, 1, 0.6);
  tw('.c-bub', wt('m1', 4) + 0.5, 0.1, { o: [1, 0] }, 'lin'); sfx('pop', wt('m1', 4) + 0.5, 0.5);
  tw('.c-m .pup', wt('m1', 4), 0.3, { x: [-6, 10], y: [-10, -2] }, 'out');
  jump('.c-m', tHall, 50, 0.4); tw('.c-m .mouth', tHall, 0.25, { sx: [1, 0.6], sy: [1, -1] }, 'back');

  // ================= D: they heat up, water cools them, part of it goes off as steam =================
  tSlideUp('#C', '#D', tD);
  const DR = []; for (let k = 0; k < 2; k++) { const r = mk('.d-racks', '', rackSVG('d' + k)); place(r, 300 + k * 260, 300, 240, 517); DR.push(r); }
  hide('.d-l1');
  const tHot = wt('m2', 1) - 0.05, tCool = wt('m2', 4) - 0.05, tSteam = wt('m2', 6) - 0.1;
  DR.forEach(r => { tw($('.heat', r), tHot, 0.6, { o: [0, 0.55] }, 'out'); tw($('.heat', r), tCool + 0.3, 0.8, { o: [0.55, 0] }, 'inOut'); });
  idle(DR, t => (t > tHot && t < tCool + 0.4) ? { x: 3 * Math.sin(t * 70) } : {});
  level('.d-th .mer', tHot, 0.7, 0.25, 0.95, 'out'); level('.d-th .mer', tCool + 0.3, 0.8, 0.95, 0.4, 'inOut'); sfx('zap', tHot, 0.4);
  // heat shimmer: wavy lines rising off the racks
  for (let k = 0; k < 6; k++) { const h = mk('.d-heat', '', sv('0 0 40 120', `<path d="M20 110 Q2 90 20 70 T20 30 T20 0" fill="none" stroke="#ffb36b" stroke-width="9" stroke-linecap="round"/>`)); place(h, 340 + k * 85, 230, 40, 120); hide(h);
    const t0 = tHot + 0.1 + k * 0.08; tw(h, t0, 0.2, { o: [0, 0.9] }, 'lin'); idle(h, t => (t > t0) ? { y: -((t - t0) * 160 % 120) } : {}); tw(h, tCool + 0.3, 0.4, { o: [0.9, 0] }, 'lin'); }
  // the mascot is hot too: fans itself, sweat drop
  tw('.d-m .armR', tHot, 0.25, { r: [0, -100] }, 'out');
  for (let k = 0; k < 6; k++) tw('.d-m .armR', tHot + 0.25 + k * 0.18, 0.18, { r: [k % 2 ? -60 : -110, k % 2 ? -110 : -60] }, 'inOut');
  tw('.d-m .armR', tHot + 1.33, 0.3, { r: [-110, 0] }, 'out');
  const sw = mk('.d-m', 'drp', dropSVG('#bfeaff')); place(sw, 60, 40, 40, 54); hide(sw);
  tw(sw, tHot + 0.2, 0.3, { o: [0, 1], y: [-20, 0] }, 'out'); tw(sw, tHot + 0.5, 0.6, { y: [0, 80], o: [1, 0] }, 'in');
  tw('.d-m .mouth', tHot, 0.25, { sy: [1, -0.7] }, 'back'); tw('.d-m .mouth', tCool + 0.3, 0.25, { sy: [-0.7, 1] }, 'back');
  // pipes draw on; water flows inside them
  $('.d-pipe').innerHTML = sv('0 0 1080 1300', `
    <path class="p0 draw" d="M60 1180 L250 1180 Q280 1180 280 1150 L280 860 Q280 830 310 830 L800 830 Q830 830 830 800 L830 400" pathLength="100" fill="none" stroke="${INK}" stroke-width="58" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="p1 draw" d="M60 1180 L250 1180 Q280 1180 280 1150 L280 860 Q280 830 310 830 L800 830 Q830 830 830 800 L830 400" pathLength="100" fill="none" stroke="#3cb8ff" stroke-width="36" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="p2" d="M60 1180 L250 1180 Q280 1180 280 1150 L280 860 Q280 830 310 830 L800 830 Q830 830 830 800 L830 400" fill="none" stroke="#c9f2ff" stroke-width="12" stroke-linecap="round" stroke-dasharray="26 46" opacity="0"/>`);
  tw('.d-pipe .p0', tCool, 0.6, { dash: [100, 0] }, 'inOut'); tw('.d-pipe .p1', tCool + 0.08, 0.6, { dash: [100, 0] }, 'inOut'); sfx('whoosh', tCool, 0.5);
  tw('.d-pipe .p2', tCool + 0.6, 0.2, { o: [0, 0.9] }, 'lin');
  custom(t => { $('.d-pipe .p2').style.strokeDashoffset = (-(t - tCool) * 260).toFixed(1); });
  slideIn('.d-l1', tCool + 0.05, 'left', 0.6, 400);
  // «часть улетает паром»: puffs leave the top of the pipe
  for (let k = 0; k < 9; k++) { const p = mk('.d-steam', 'puff'); place(p, 755 + 40 * (hash(k) - 0.5), 330, 170, 125); hide(p);
    const t0 = tSteam + k * 0.12; tw(p, t0, 0.08, { o: [0, 0.95] }, 'lin');
    tw(p, t0, 1.3, { y: [40, -200 - 60 * hash(k + 4)], x: [0, 140 * (hash(k + 1) - 0.5)], s: [0.4, 1.4] }, 'out'); tw(p, t0 + 0.8, 0.5, { o: [0.95, 0] }, 'lin'); }
  sfx('riser', tSteam, 0.35);
  tw('.d-m .pup', tSteam, 0.3, { x: [0, -6], y: [0, -10] }, 'out'); tw('.d-m', tSteam + 0.1, 0.6, { r: [0, -6] }, 'inOut');

  // ================= E: the experiment — one question, catch every drop =================
  tCircle('#D', '#E', tE, 540, 600);
  hide('.e-chip'); hide('.e-n'); hide('.e-u'); hide('.e-src'); hide('.e-bub');
  tw('.e-tap', 0, 0.001, { x: [-135, -135] });
  slideIn('.e-chip', wt('x1', 0) - 0.05, 'left', 0.6, 400); sfx('whoosh', wt('x1', 0), 0.4);
  tw('.e-m .pup', tE, 0.001, { x: [8, 8], y: [0, 0] }); tw('.e-m .armR', tE, 0.001, { r: [-30, -30] });
  // «задаём один вопрос»: tap on the phone, the question flies to the rack
  const tAsk = wt('x1', 2) - 0.05;
  punch('.e-ph', tAsk, 0.15); sfx('tick', tAsk, 0.6); tw('.e-m .armR', tAsk, 0.15, { r: [-30, -48] }, 'out'); tw('.e-m .armR', tAsk + 0.15, 0.3, { r: [-48, -30] }, 'out');
  tw('.e-bub', wt('x1', 3), 0.05, { o: [0, 1] }, 'lin');
  arc($('.e-bub'), wt('x1', 3), 0.75, [350, 1030], [520, 300], [760, 470], 30, 120, 98, 0.8, 1);
  tw('.e-bub', wt('x1', 3) + 0.7, 0.12, { o: [1, 0], s: [1, 0.3] }, 'in'); sfx('pop', wt('x1', 3) + 0.7, 0.5);
  $$('.e-rack .led').forEach((l, j) => idle(l, t => ({ o: (t > wt('x1', 3) + 0.7 && hash(Math.floor(t * 8) + j * 7) < 0.4) ? -0.85 : 0 })));
  tw('.e-m .pup', wt('x1', 3), 0.5, { x: [8, 10], y: [0, -8] }, 'out');
  // «ловим каждую каплю»: the mascot pushes the beaker under the tap, leans in
  punch('.e-bk', wt('x1', 6), 0.1); sfx('clink', wt('x1', 6), 0.5);
  tw('.e-m', wt('x1', 6), 0.5, { r: [0, 6], x: [0, 30] }, 'inOut'); tw('.e-m .pup', wt('x1', 6), 0.3, { x: [10, 10], y: [-8, 8] }, 'out');
  // five drops, one by one; the last one lands on «пяти»
  const spout = [810, 913], tLand5 = wt('x3', 3);
  const TD = [wt('x1', 8) + 0.1, wt('x2', 1), wt('x2', 3), wt('x3', 0), tLand5 - 0.42];
  TD.forEach((t0, k) => { const d = mk('.e-drops', 'drp', dropSVG()); place(d, spout[0] - 27, spout[1] - 10, 54, 72); hide(d);
    tw(d, t0, 0.12, { o: [0, 1], s: [0.3, 1] }, 'out'); tw(d, t0 + 0.12, 0.3, { y: [0, 290 - k * 4] }, 'in'); tw(d, t0 + 0.42, 0.06, { o: [1, 0] }, 'lin');
    sfx('blip', t0 + 0.42, 0.5); level('.e-bk .bw', t0 + 0.42, 0.25, 0.012 * k, 0.012 * (k + 1), 'out');
    for (let j = 0; j < 4; j++) { const s = mk('.e-drops', 'splash'); place(s, spout[0] - 10, spout[1] + 290 - k * 4); hide(s);
      tw(s, t0 + 0.42, 0.04, { o: [0, 1] }, 'lin'); tw(s, t0 + 0.42, 0.4, { x: [0, (j - 1.5) * 40], y: [0, -60 - 30 * hash(j + k)], s: [0.8, 0.4] }, 'out'); tw(s, t0 + 0.65, 0.15, { o: [1, 0] }, 'lin'); }
    tw('.e-m .brL, .e-m .brR', t0 + 0.42, 0.1, { y: [0, -8] }, 'out'); tw('.e-m .brL, .e-m .brR', t0 + 0.52, 0.25, { y: [-8, 0] }, 'out'); });
  // the source panel on «Google»
  slideIn('.e-src', wt('x2', 0) - 0.05, 'left', 0.7, 450); sfx('whoosh', wt('x2', 0), 0.4);
  // «около пяти капель»: the verdict number
  const t5 = wt('x3', 2) - 0.05; const en = $('.e-n'); en.innerHTML = '≈5';
  slideIn('.e-n', t5, 'down', 0.45, 160); sfx('ding', tLand5, 0.6); punch('.e-n', tLand5 + 0.05, 0.12);
  slideIn('.e-u', wt('x3', 4) - 0.05, 'down', 0.45, 120);
  tw('.e-m', tLand5, 0.4, { r: [6, 0], x: [30, 0] }, 'out'); jump('.e-m', tLand5 + 0.1, 60, 0.4, '.e-shd'); tw('.e-m .mouth', tLand5, 0.25, { sx: [1, 1.2], sy: [1, 1.3] }, 'back');
  tw('.e-m .armL', tLand5, 0.3, { r: [0, 130] }, 'back');

  // ================= F: joke — the tap while brushing your teeth =================
  tDrop('#E', '#F', tF);
  hide('.f-l'); hide('.f-bkl');
  tw('.f-stream', tF, 0.001, { sy: [0, 0] });
  tw('.f-bk .bw', tF, 0.001, { sy: [0.06, 0.06] });
  const tTap = wt('j1', 0) - 0.05;
  punch('.f-tap', tTap, 0.08); tw('.f-tap .handle', tTap, 0.3, { r: [0, -50] }, 'back');
  tw('.f-stream', tTap + 0.15, 0.35, { sy: [0, 1] }, 'in'); sfx('whoosh', tTap + 0.15, 0.7);
  idle('.f-stream', t => (t > tTap + 0.5) ? { sx: 1 + 0.06 * Math.sin(t * 40) } : {});
  level('.f-bkt .bkw', tTap + 0.5, 1.6, 0, 1, 'inOut');
  // overflow splashes
  for (let k = 0; k < 16; k++) { const s = mk('.f-spl', 'splash'); place(s, 250 + 220 * hash(k + 2), 1000); hide(s);
    const t0 = tTap + 2.1 + k * 0.08; tw(s, t0, 0.04, { o: [0, 1] }, 'lin');
    tw(s, t0, 0.55, { x: [0, (hash(k) - 0.5) * 260], y: [0, -140 - 80 * hash(k + 5)] }, 'out'); tw(s, t0 + 0.55, 0.35, { y: [-140 - 80 * hash(k + 5), 220], o: [1, 0] }, 'in'); }
  sfx('glitch', tTap + 2.1, 0.3);
  // brushing
  slideIn('.f-l', wt('j1', 1) - 0.05, 'right', 0.6, 400);
  tw('.f-m .armL', tF, 0.001, { r: [40, 40] }); tw('.f-br', tF, 0.001, { r: [-8, -8] });
  idle('.f-br', t => (t > wt('j1', 1) && t < wt('j1', 5)) ? { x: 16 * Math.sin(t * 34) } : {});
  idle('.f-m .armL', t => (t > wt('j1', 1) && t < wt('j1', 5)) ? { r: 4 * Math.sin(t * 34) } : {});
  tw('.f-m .lid', wt('j1', 1), 0.2, { sy: [0, 0.55] }, 'out');
  // «льёт больше тысячи вопросов»: the mascot notices, the label lands on the bucket; the tiny beaker for comparison
  const tMore = wt('j1', 5) - 0.05;
  tw('.f-m .lid', tMore, 0.15, { sy: [0.55, 0] }, 'out'); tw('.f-m .pup', tMore, 0.25, { x: [0, -10], y: [0, 8] }, 'out');
  tw('.f-m .brL, .f-m .brR', tMore, 0.2, { y: [0, -16] }, 'out'); tw('.f-m .mouth', tMore, 0.25, { sx: [1, 0.7], sy: [1, -1.1] }, 'back');
  tw('.f-br', tMore, 0.5, { y: [0, 600], r: [-8, 120], o: [1, 0] }, 'in'); sfx('clink', tMore + 0.45, 0.4);
  jump('.f-m', tMore + 0.1, 60, 0.4);
  $('.f-bkl').textContent = '> 1000 ВОПРОСОВ';
  slideIn('.f-bkl', wt('j1', 6) - 0.05, 'left', 0.6, 400); sfx('ding', wt('j1', 6), 0.5);
  punch('.f-bk', wt('j1', 7), 0.1);

  // ================= G: a whole bottle needs almost 2000 questions =================
  tZoom('#F', '#G', tG);
  hide('.g-n'); hide('.g-u');
  punch('.g-bt', wt('p1', 3), 0.08); sfx('pop', wt('p1', 3), 0.5);
  tw('.g-m .pup', tG, 0.001, { x: [9, 9], y: [-4, -4] });
  const tCnt = wt('p1', 4), dCnt = we('p1', 6) - tCnt + 0.1;
  slideIn('.g-n', tCnt - 0.05, 'down', 0.4, 140);
  const gn = $('.g-n'); custom(t => { const p = clamp((t - tCnt) / dCnt); gn.textContent = (p >= 1 ? '≈' : '') + Math.round(2000 * (1 - Math.pow(1 - p, 1.6))); });
  for (let k = 0; k < 10; k++) sfx('tick', tCnt + k * dCnt / 10, 0.4);
  punch('.g-n', tCnt + dCnt, 0.1); sfx('ding', tCnt + dCnt, 0.6);
  level('.g-bt .lvl', tCnt, dCnt + 0.1, 0, 1, 'inOut');
  for (let k = 0; k < 22; k++) { const b = mk('.g-bubs', 'bub', bubbleSVG(k % 3 ? '#ffffff' : '#ffe14d', '')); place(b, 0, 0, 80, 66); hide(b);
    const t0 = tCnt - 0.1 + k * (dCnt / 22); tw(b, t0, 0.05, { o: [0, 1] }, 'lin');
    arc(b, t0, 0.6, [100 + 500 * hash(k + 11), 1260], [560 + 100 * hash(k + 2), 300 - 80 * hash(k)], [820, 480], 360 * (hash(k + 3) - 0.5), 80, 66, 1, 0.35); tw(b, t0 + 0.57, 0.05, { o: [1, 0] }, 'lin'); }
  slideIn('.g-u', wt('p1', 7) - 0.05, 'down', 0.45, 120);
  tw('.g-m .pup', tCnt, 0.3, { x: [9, 10], y: [-4, -10] }, 'out');
  idle('.g-m .armR', t => (t > tCnt && t < tCnt + dCnt) ? { r: -70 + 25 * Math.sin((t - tCnt) * 16) } : {});
  const tFull = tCnt + dCnt + 0.05;
  jump('.g-m', tFull, 80, 0.45, '.g-shd'); burst('#G .cam', 16, 820, 500, tFull, 260, 31, 'conf', 120); sfx('pop', tFull, 0.6);
  tw('.g-m .mouth', tFull, 0.25, { sx: [1, 1.25], sy: [1, 1.3] }, 'back'); tw('.g-m .armL', tFull, 0.3, { r: [0, 140] }, 'back');

  // ================= H: the catch — the company's own numbers, cooling only =================
  tCircle('#G', '#H', tH, 540, 500);
  hide('.h-pan'); hide('.h-chip');
  slideIn('.h-pan', wt('c1', 0) - 0.05, 'left', 0.7, 450); sfx('whoosh', wt('c1', 0), 0.5);
  tw('.h-m .armR', wt('c1', 1), 0.35, { r: [0, -120] }, 'back');
  tw('.h-m .lid', wt('c1', 1), 0.25, { sy: [0, 0.45] }, 'out'); tw('.h-m .brL', wt('c1', 1), 0.25, { y: [0, 10], r: [0, 8] }, 'out'); tw('.h-m .brR', wt('c1', 1), 0.25, { y: [0, -12] }, 'out');
  // the lens inspects: the panel on «Google», then the pipe on «охлаждение»
  tw('.h-lens', tH, 0.001, { x: [-160, -160], y: [300, 300], s: [0.7, 0.7] });
  tw('.h-lens', wt('c1', 4) - 0.15, 0.5, { x: [-160, -40], y: [300, -360], s: [0.7, 0.8] }, 'out');
  idle('.h-lens', t => ({ r: 3 * Math.sin(W2 * 18 * t) }));
  $('.h-pipe').innerHTML = sv('0 0 1080 1300', `
    <path class="draw q0" d="M1080 1080 L740 1080 Q700 1080 700 1040 L700 950" pathLength="100" fill="none" stroke="${INK}" stroke-width="58" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="draw q1" d="M1080 1080 L740 1080 Q700 1080 700 1040 L700 950" pathLength="100" fill="none" stroke="#3cb8ff" stroke-width="36" stroke-linecap="round" stroke-linejoin="round"/>`);
  tw('.h-pipe .q0', tH + 0.3, 0.5, { dash: [100, 0] }, 'inOut'); tw('.h-pipe .q1', tH + 0.38, 0.5, { dash: [100, 0] }, 'inOut');
  const tCool2 = wt('c1', 7) - 0.15;
  tw('.h-lens', tCool2 - 0.3, 0.55, { x: [-40, 160], y: [-360, 340], s: [0.8, 0.9] }, 'inOut');
  slideIn('.h-chip', wt('c1', 6) - 0.1, 'down', 0.55, 200); sfx('blip', wt('c1', 6), 0.5);
  tw('.h-m .pup', tCool2, 0.3, { x: [0, 10], y: [0, -2] }, 'out');
  punch('.h-rack', wt('c1', 9), 0.06);

  // ================= I: verdict stamp, the bottle becomes five drops, subscribe, loop =================
  tCircle('#H', '#I', tI, 540, 400);
  hide('.i-st'); hide('.i-sub');
  punch('.i-bt', wt('v1', 1), 0.08); sfx('pop', wt('v1', 1), 0.5);
  punch('.i-bub', wt('v1', 3), 0.15); sfx('blip', wt('v1', 3), 0.5);
  tw('.i-m .pup', tI, 0.001, { x: [-9, -9], y: [-2, -2] });
  const tSt = wt('v1', 5);
  // the mascot swings its arm up and slams down: stamp
  tw('.i-m', tSt - 0.45, 0.25, { y: [0, -110] }, 'out'); tw('.i-m .armL', tSt - 0.45, 0.25, { r: [0, 165] }, 'out');
  tw('.i-m', tSt - 0.2, 0.18, { y: [-110, 0] }, 'in'); tw('.i-m .armL', tSt - 0.15, 0.15, { r: [165, 50] }, 'in');
  stamp('.i-st', tSt, -7, 28);
  tw('.i-m .mouth', tSt, 0.25, { sx: [1, 1.2], sy: [1, 1.25] }, 'back');
  tw('.i-m .armL', tSt + 0.5, 0.4, { r: [50, 0] }, 'out');
  // the bottle collapses into five drops next to the question
  tw('.i-bt', tSt + 0.1, 0.3, { s: [1, 0.05], o: [1, 0] }, 'in'); sfx('zap', tSt + 0.1, 0.4);
  tw('.i-bub', tSt + 0.25, 0.5, { x: [0, -580], y: [0, 230] }, 'out');
  for (let k = 0; k < 5; k++) { const d = mk('.i-drops', 'drp', dropSVG()); place(d, 390 + k * 92, 760, 80, 107); hide(d);
    tw(d, tSt + 0.35 + k * 0.08, 0.35, { o: [0, 1], y: [-260, 0], s: [0.3, 1] }, 'back'); sfx('blip', tSt + 0.45 + k * 0.08, 0.35);
    idle(d, t => (t > tSt + 1) ? { y: 6 * Math.sin((t - tSt) * 6 + k) } : {}); }
  const eq = mk('#I .cam', 'lbl', '='); place(eq, 335, 790, 50); hide(eq); tw(eq, tSt + 0.55, 0.3, { o: [0, 1], s: [0.4, 1] }, 'back');
  burst('.i-fx', 24, 540, 360, tSt + 0.05, 420, 61, 'conf', 140);
  // «подпишись»: the button slides up, the bell rings, the mascot points at it
  const tSub = wt('cta', 0) - 0.05;
  slideIn('.i-sub', tSub, 'down', 0.6, 300); sfx('whoosh', tSub, 0.5);
  for (let k = 0; k < 4; k++) tw('.i-bell .bell', wt('cta', 1) + k * 0.16, 0.08, { r: [k % 2 ? 18 : -18, k % 2 ? -18 : 18] }, 'inOut');
  tw('.i-bell .bell', wt('cta', 1) + 0.64, 0.3, { r: [-18, 0] }, 'back'); sfx('ding', wt('cta', 1), 0.6);
  tw('.i-m .armL', tSub + 0.1, 0.35, { r: [0, 40] }, 'back'); tw('.i-m .pup', tSub + 0.1, 0.25, { x: [-9, -6], y: [-2, 9] }, 'out');
  punch('.i-sub', wt('cta', 2), 0.06); sfx('pop', wt('cta', 2), 0.5);
  // out: clear the props, the frozen hook frame comes back
  tw('#I .i-st, #I .i-sub, #I .conf, #I .drp, #I .i-bub, #I .lbl', tLoop - 0.4, 0.35, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw('#I .i-m', tLoop + 0.42, 0.001, { o: [1, 0] });
}, { noCaption: ['hook'], chunks: {} });
