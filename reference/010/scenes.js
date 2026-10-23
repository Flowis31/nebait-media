// 010 «Каждая девятая видеокарта бездельничает» — Engineering at Meta, «Inside Prometheus», 19.10.2026
boot(() => {
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
  const clamp = x => Math.max(0, Math.min(1, x));
  const SPIN = 72 * Math.round(TOTAL * 5) / TOTAL;                 // fan spin, deg/s; 5 blades -> identical look at t=0 and t=TOTAL
  const OM = 2 * Math.PI * Math.round(TOTAL / 0.72) / TOTAL;        // rowing stroke ~0.72 s
  const spin = (sel, from = -1, to = 1e9, k = 1) => $$(sel).forEach(f => idle(f, t => ({ r: t > from && t < to ? SPIN * k * t : 0 })));
  let gid = 0; const gpu = (par, cls, x, y, o) => { const d = mk(par, 'gpu ' + cls, gpuSVG('g' + (gid++), o)); d.style.left = x + 'px'; d.style.top = y + 'px'; return d; };

  // ---------- build ----------
  const AX = [310, 530, 750], AY = [600, 755, 910];
  const buildA = (sc) => { for (let k = 0; k < 9; k++) { const g = gpu(sc + ' .a-grid', 'ac' + k, AX[k % 3], AY[(k / 3) | 0]); g.style.width = '210px'; g.style.height = '121px'; }
    for (let k = 0; k < 3; k++) { const z = mk(sc + ' .a-zz', 'zz', 'Z'); z.style.left = '900px'; z.style.top = '850px'; } };
  buildA('#A'); $('#A2').innerHTML = $('#A').innerHTML; $('#A2 .a-st').remove(); $('#A2 .a-chip').remove();
  $('#A2 .a-grid').innerHTML = ''; $('#A2 .a-zz').innerHTML = ''; buildA('#A2');
  // B farm
  const BG = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) BG.push(gpu('.b-grid', 'bg', 130 + c * 200, 690 + r * 130, {}));
  BG.forEach(d => { d.style.width = '170px'; d.style.height = '98px'; });
  $('.b-br').innerHTML = brainSVG('b');
  $('.b-lines').innerHTML = sv('0 0 1080 1300', [0, 1, 2, 3].map(c => `<path pathLength="100" d="M${215 + c * 200} 690 Q${215 + c * 200} 610 540 560" fill="none" stroke="#b8ff3d" stroke-width="10" stroke-linecap="round" opacity=".8"/>`).join(''));
  // boats
  const BX = [220, 378, 536, 694];
  const buildBoat = (sc) => { const b = $(sc + ' .boat'); $(sc + ' .wav').innerHTML = wavesSVG();
    const cards = BX.map((x, k) => { const d = gpu(b, 'bc bc' + k, x, 100); d.style.width = '150px'; d.style.height = '87px'; return d; });
    mk(b, 'hull', hullSVG(sc.slice(1)));
    const oars = BX.map((x, k) => { const o = mk(b, 'oar oar' + k, oarSVG()); o.style.left = x + 92 + 'px'; o.style.top = '150px'; return o; });
    return { cards, oars }; };
  const C = buildBoat('#C'), D = buildBoat('#D'), Eb = buildBoat('#E');
  const dOar = mk('#D .d-oar', 'oar', oarSVG()); dOar.style.left = 110 + BX[2] + 92 + 'px'; dOar.style.top = 640 + 150 + 'px'; dOar.style.width = '40px'; dOar.style.height = '214px'; dOar.style.transformOrigin = '50% 0';
  $('.e-clock').innerHTML = clockSVG(); $('.e-sun').innerHTML = sunSVG(); $('.e-moon').innerHTML = moonSVG(); $('.e-web').innerHTML = webSVG(); $('.e-weed').innerHTML = weedSVG();
  for (let k = 0; k < 4; k++) { const z = mk('.e-zz', 'zz', 'Z'); z.style.left = 110 + BX[k] + 110 + 'px'; z.style.top = '700px'; }
  // F
  $('.f-sun').innerHTML = sunSVG();
  const FST = []; for (let k = 0; k < 22; k++) { const s = mk('.f-stops', 'f-stop', stopSVG()); const x = 150 + k * 36 + (hash(k) - 0.5) * 14; s.style.left = x + 'px'; s.style.top = 757 - (k % 2) * 10 + 'px'; FST.push([s, x]); }
  const FMN = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) { const d = mk('.f-grid', 'f-mini'); d.style.left = 340 + c * 68 + 'px'; d.style.top = 1030 + r * 52 + 'px'; FMN.push(d); }
  // G
  $('.g-rack').innerHTML = rackSVG(); $('.g-bench').innerHTML = benchSVG(); $('.g-wav .wv').innerHTML = wavesSVG(); $('.g-boat').innerHTML = hullSVG('gb');
  const GX = [74, 290, 506], GY = [362, 522, 682];
  const GC = []; for (let k = 0; k < 9; k++) GC.push(gpu('.g-cards', 'gc gc' + k, GX[k % 3], GY[(k / 3) | 0]));
  const gBolt = mk('.g-fx', 'g-bolt', boltSVG()); const gSmk = [0, 1, 2].map(k => { const s = mk('.g-fx', 'smk', smokeSVG()); s.style.left = GX[1] + 40 + k * 30 + 'px'; s.style.top = GY[1] - 20 + 'px'; return s; });
  // H
  $('.h-sun').innerHTML = sunSVG(); $('.h-lng').innerHTML = loungerSVG(); $('.h-card').innerHTML = gpuSVG('hc'); $('.h-sh').innerHTML = shadesSVG(); $('.h-drink').innerHTML = drinkSVG(); $('.h-work').innerHTML = gpuSVG('hw');
  $('.h-heat').innerHTML = sv('0 0 320 180', [40, 140, 240].map(x => `<path pathLength="100" d="M${x} 170 q-24 -28 0 -56 q24 -28 0 -56 q-20 -26 0 -50" fill="none" stroke="#ffb03d" stroke-width="12" stroke-linecap="round"/>`).join(''));
  // I
  $('.i-sh').innerHTML = shieldSVG('i'); $('.i-card').innerHTML = gpuSVG('ic');
  // mascots
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  mascotLife();

  // ---------- cuts ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('s1'), tC = cut('s2'), tD = cut('s4'), tE = cut('j1'), tF = cut('s5'), tG = cut('s7'), tH = cut('j2'), tI = cut('s11'), tLoop = L('out').t1 - 0.62;
  sceneCuts(['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I'], [0, tB, tC, tD, tE, tF, tG, tH, tI]);
  $$('.m').forEach((m, i) => idle(m, t => ({ y: 8 * Math.sin(W2 * 16 * t + i), r: 2 * Math.sin(W2 * 8 * t + i) })));

  // ---------- A hook: eight cards work, the ninth sleeps ----------
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  for (const sc of ['#A', '#A2']) {
    spin(`${sc} .a-grid .gpu:not(.ac8) .gFan`);
    tw(`${sc} .ac8`, 0, 0.001, { r: [12, 12], y: [8, 8] }); tw(`${sc} .ac8 .gLid`, 0, 0.001, { sy: [0.75, 0.75] }); tw(`${sc} .ac8 .gMouth`, 0, 0.001, { sy: [0.4, 0.4] });
    tw(`${sc} .ac8 .gLed`, 0, 0.001, { o: [0.15, 0.15] });
    $$(sc + ' .a-grid .gpu:not(.ac8)').forEach((g, k) => idle(g, t => ({ y: 3 * Math.sin(W2 * 30 * t + k * 0.7) })));
    $$(sc + ' .a-zz .zz').forEach((z, k) => { const n = Math.round(TOTAL / 1.5); idle(z, t => { const u = (t * n / TOTAL + k / 3) % 1; return { x: 40 * u + 10 * Math.sin(u * 7), y: -150 * u, s: 0.5 + 0.7 * u, r: -10 + 20 * u }; });
      custom(t => { const u = (t * n / TOTAL + k / 3) % 1; z.style.opacity = (Math.sin(Math.PI * u)).toFixed(3); }); });
    tw(sc + ' .a-m .armR', 0, 0.001, { r: [-55, -55] }); tw(sc + ' .a-m .pup', 0, 0.001, { x: [8, 8], y: [5, 5] });
    hide(sc + ' .a-ring');
  }
  punch('#A .a-t b', wt('hook', 1), 0.18); sfx('ding', wt('hook', 1), 0.6);
  popIn('#A .a-ring', wt('hook', 1), 0.4, 1.3); sfx('pop', wt('hook', 1) + 0.05);
  tw('#A .a-m .armR', wt('hook', 1), 0.3, { r: [-55, -80] }, 'back');
  punch('#A .ac8', wt('hook', 3), 0.12); tw('#A .ac8', wt('hook', 3) + 0.1, 0.5, { r: [12, 20], y: [8, 22] }, 'out'); sfx('blip', wt('hook', 3), 0.6);
  tw('#A .ac8 .gLid', wt('hook', 3), 0.4, { sy: [0.75, 1] }, 'out');
  tw('#A .a-m .brL', wt('hook', 3), 0.25, { y: [0, -14] }, 'back'); tw('#A .a-m .brR', wt('hook', 3), 0.25, { y: [0, -14] }, 'back');
  // "не баг": the mascot shakes its head, then everyone cheers "это план"
  idle('#A .a-m', t => t > wt('h2', 2) && t < we('h2', 4) ? { r: 7 * Math.sin((t - wt('h2', 2)) * 22) } : {});
  tw('#A .a-m .armR', wt('h2', 2), 0.3, { r: [-80, -20] }, 'out'); tw('#A .a-m .pup', wt('h2', 2), 0.3, { x: [8, 0], y: [5, 0] }, 'out');
  tw('#A .a-ring', wt('h2', 3), 0.3, { o: [1, 0] }, 'in');
  hide('#A .a-st'); stamp('#A .a-st', wt('h2', 5), -6, 22);
  tw('#A .a-m', wt('h2', 5) - 0.05, 0.22, { y: [0, -70] }, 'out'); tw('#A .a-m', wt('h2', 5) + 0.17, 0.3, { y: [-70, 0] }, 'in');
  tw('#A .a-m .armL', wt('h2', 5), 0.3, { r: [0, 140] }, 'back'); tw('#A .a-m .armR', wt('h2', 5), 0.3, { r: [-20, -140] }, 'back'); tw('#A .a-m .mouth', wt('h2', 5), 0.2, { sy: [1, 1.3] }, 'back');
  tw('#A .ac8', wt('h2', 5), 0.4, { r: [20, -6], y: [22, 0] }, 'back'); tw('#A .ac8 .gLid', wt('h2', 5), 0.25, { sy: [1, 0] }, 'out'); tw('#A .ac8 .gMouth', wt('h2', 5), 0.25, { sy: [0.4, 1] }, 'back');
  tw('#A .ac8 .gLed', wt('h2', 5), 0.2, { o: [0.15, 1] }, 'out');
  hide('#A .a-chip'); slideIn('#A .a-chip', wt('h2', 0) - 0.05, 'down', 0.7, 240); sfx('whoosh', wt('h2', 0) - 0.05, 0.5);

  // ---------- B: neural nets learn on huge farms of cards ----------
  tSlideUp('#A', '#B', tB);
  hide('.b-chip'); slideIn('.b-chip', wt('s1', 4) - 0.1, 'up', 0.65, 180); sfx('whoosh', wt('s1', 4) - 0.1, 0.4);
  hide('.b-br'); popIn('.b-br', wt('s1', 0), 0.4, 0.4); sfx('pop', wt('s1', 0));
  tw('.b-br .bFill', 0, 0.001, { sy: [0, 0] });
  tw('#B .armR', wt('s1', 0), 0.35, { r: [0, -95] }, 'back'); tw('#B .pup', wt('s1', 0), 0.3, { x: [0, 8], y: [0, -4] }, 'out');
  punch('.b-br', wt('s1', 1), 0.1); sfx('blip', wt('s1', 1), 0.5);
  const order = BG.map((d, i) => [d, (i % 4) + ((i / 4) | 0)]);
  order.forEach(([d, w], i) => { hide(d); const t0 = wt('s1', 3) + w * 0.13; tw(d, t0, 0.35, { s: [0.3, 1], o: [0, 1], y: [60, 0] }, 'back'); if (i % 3 === 0) sfx('tick', t0, 0.5); });
  spin('#B .b-grid .gFan', wt('s1', 3));
  tw('#B .pup', wt('s1', 3), 0.3, { x: [8, 4], y: [-4, 8] }, 'out');
  $$('.b-lines path').forEach((p, k) => tw(p, wt('s1', 6) + k * 0.08, 0.5, { dash: [100, 0] }, 'out'));
  tw('.b-br .bFill', wt('s1', 6) + 0.2, 1.0, { sy: [0, 1] }, 'out'); sfx('riser', wt('s1', 6), 0.5);
  tw('#B .b-m', wt('s1', 6) + 0.3, 0.2, { y: [0, -50] }, 'out'); tw('#B .b-m', wt('s1', 6) + 0.5, 0.25, { y: [-50, 0] }, 'in');
  tw('#B .mouth', wt('s1', 6) + 0.3, 0.2, { sy: [1, 1.3] }, 'back');
  punch('.b-br', L('s1').t1 + 0.1, 0.12); sfx('ding', L('s1').t1 + 0.1, 0.5);

  // ---------- C: thousands of cards row one boat ----------
  tWhip('#B', '#C', tC);
  const rowEnvC = t => clamp((t - wt('s2', 2) + 0.1) / 0.35);
  const rowEnvD = t => 1 - clamp((t - wt('s4', 4)) / 0.3);
  const rowing = (B, env, skip = -1) => {
    B.oars.forEach((o, k) => { if (k !== skip) idle(o, t => ({ r: 25 + env(t) * 24 * Math.sin(OM * t) })); });
    B.cards.forEach((c, k) => idle(c, t => ({ y: env(t) * 5 * Math.sin(OM * t - 1), r: env(t) * 3 * Math.sin(OM * t - 1) })));
  };
  rowing(C, rowEnvC); spin('#C .boat .gFan', tC);
  tw('#C .boat', tC, 0.9, { x: [-1150, 0] }, 'out'); idle('#C .boat', t => ({ y: 6 * Math.sin(W2 * 20 * t) }));
  idle('#C .wav', t => ({ x: -((t * 120) % 200) }));
  hide('.c-chip'); slideIn('.c-chip', wt('s2', 0), 'left', 0.65, 260);
  hide('.c-pan'); slideIn('.c-pan', wt('s2', 3), 'right', 0.7, 300); sfx('whoosh', wt('s2', 3), 0.4);
  // coxswain: arms pump with the stroke
  idle('#C .armL', t => ({ r: 60 + rowEnvC(t) * 50 * Math.sin(OM * t) })); idle('#C .armR', t => ({ r: -60 - rowEnvC(t) * 50 * Math.sin(OM * t) }));
  tw('#C .mouth', wt('s2', 2), 0.2, { sy: [1, 1.35] }, 'back'); tw('#C .pup', tC, 0.3, { x: [0, 8] }, 'out');
  punch('#C .boat', wt('s3', 1), 0.05); punch('#C .boat', we('s3', 4) - 0.1, 0.05); sfx('pop', wt('s3', 1), 0.6);
  // splashes at every stroke
  const strokes = []; for (let n = Math.ceil((wt('s2', 2) + 0.3) * OM / (2 * Math.PI)); ; n++) { const th = (2 * Math.PI * n - Math.PI / 2) / OM; if (th > tD + 0.2) break; strokes.push(th); }
  strokes.forEach((th, j) => { if (j % 2) sfx('tick', th, 0.35);
    BX.forEach((x, k) => { for (let q = 0; q < 2; q++) { const d = mk('.c-drops', 'drop'); d.style.left = 110 + x + 20 + 'px'; d.style.top = '1000px'; hide(d);
      const s = hash(j * 9 + k * 3 + q); tw(d, th, 0.5, { x: [0, -30 - 60 * s], y: [0, -70 - 60 * s], o: [1, 0], s: [1, 0.5] }, 'out'); } }); });

  // ---------- D: one drops the oar, the whole boat stops ----------
  tCircle('#C', '#D', tD, 540, 800);
  rowing(D, rowEnvD, 2); spin('#D .boat .gFan', tD, wt('s4', 4));
  idle(D.oars[2], t => ({ r: 25 + 24 * Math.sin(OM * t) })); hide(D.oars[2]); tw(D.oars[2], tD - 0.5, 0.001, { o: [1, 1] });
  idle('#D .wav', t => ({ x: -((Math.min(t, wt('s4', 4)) * 120) % 200) }));
  idle('#D .boat', t => ({ y: 6 * Math.sin(W2 * 20 * t) }));
  const tDrop0 = wt('s4', 1);
  tw(D.oars[2], tDrop0, 0.001, { o: [1, 0] });
  hide(dOar); tw(dOar, tDrop0, 0.001, { o: [0, 1] });
  tw(dOar, tDrop0, 0.35, { x: [0, 90], y: [0, -260], r: [25, 200] }, 'out'); tw(dOar, tDrop0 + 0.35, 0.35, { x: [90, 160], y: [-260, 230], r: [200, 330] }, 'in');
  tw(dOar, tDrop0 + 0.68, 0.3, { o: [1, 0] }, 'in'); sfx('whoosh', tDrop0, 0.6);
  const tSpl = tDrop0 + 0.7; sfx('thud', tSpl, 0.8); sfx('pop', tSpl + 0.05);
  for (let q = 0; q < 12; q++) { const d = mk('.d-drops', 'drop'); d.style.left = 110 + BX[2] + 260 + 'px'; d.style.top = '1030px'; hide(d);
    tw(d, tSpl, 0.6, { x: [0, (hash(q + 40) - 0.5) * 260], y: [0, -120 - 160 * hash(q + 50)], o: [1, 0], s: [1.3, 0.6] }, 'out'); }
  const c2 = D.cards[2];
  tw($('.gPup', c2), tDrop0, 0.25, { y: [0, -7], x: [0, 5] }, 'out'); tw($('.gMouth', c2), wt('s4', 2), 0.2, { sy: [1, -1] }, 'back');
  punch(c2, wt('s4', 2), 0.15); sfx('glitch', wt('s4', 2), 0.5);
  tw($('.gRed', c2), wt('s4', 5), 0.15, { o: [0, 0.55] }, 'out'); tw($('.gRed', c2), wt('s4', 5) + 0.3, 0.3, { o: [0.55, 0.2] }, 'out');
  // the boat stops with a jolt
  const tStop = wt('s4', 4);
  tw('#D .boat', tStop, 0.12, { x: [0, -30] }, 'out'); tw('#D .boat', tStop + 0.12, 0.4, { x: [-30, 0] }, 'back'); shake(tStop + 0.05, 0.3, 18); sfx('slam', tStop + 0.03, 0.9);
  D.cards.forEach((c, k) => { if (k === 2) return; tw($('.gPup', c), tStop + 0.1 + k * 0.05, 0.25, { x: [0, k < 2 ? 8 : -8] }, 'out'); tw($('.gMouth', c), tStop + 0.15, 0.2, { sy: [1, -1] }, 'back'); });
  hide('.d-pan'); slideIn('.d-pan', tStop, 'down', 0.7, 240); sfx('buzz', tStop + 0.1, 0.4);
  tw('#D .d-m', tStop, 0.3, { r: [0, -16], x: [0, -20] }, 'out');
  tw('#D .armL', tStop, 0.3, { r: [0, 150] }, 'back'); tw('#D .armR', tStop, 0.3, { r: [0, -150] }, 'back');
  tw('#D .mouth', tStop, 0.2, { sy: [1, -1] }); tw('#D .brL', tStop, 0.2, { y: [0, -16] }, 'back'); tw('#D .brR', tStop, 0.2, { y: [0, -16] }, 'back');
  tw('#D .pup', tDrop0, 0.3, { x: [0, 8], y: [0, -6] }, 'out');

  // ---------- E joke: everybody waits for one ----------
  tZoom('#D', '#E', tE);
  Eb.oars.forEach((o, k) => tw(o, 0, 0.001, { r: [42 + k * 3, 42 + k * 3] }));
  Eb.cards.forEach((c, k) => { tw(c, 0, 0.001, { y: [10, 10], r: [k % 2 ? 5 : -5, k % 2 ? 5 : -5] }); tw($('.gLid', c), 0, 0.001, { sy: [0.55, 0.55] }); tw($('.gMouth', c), 0, 0.001, { sy: [-0.6, -0.6] }); tw($('.gLed', c), 0, 0.001, { o: [0.2, 0.2] }); });
  tw($('.gRed', Eb.cards[2]), 0, 0.001, { o: [0.35, 0.35] });
  idle('#E .boat', t => ({ y: 4 * Math.sin(W2 * 8 * t) }));
  hide('.e-clock'); popIn('.e-clock', wt('j1', 0), 0.4, 0.3); sfx('pop', wt('j1', 0));
  const ck0 = wt('j1', 1), ck1 = L('j1').t1 + 0.3;
  custom(t => { const p = clamp((t - ck0) / (ck1 - ck0)), e = p * p * (3 - 2 * p);
    $('.e-clock .hMin').style.transform = `rotate(${(e * 360 * 7).toFixed(1)}deg)`; $('.e-clock .hHr').style.transform = `rotate(${(e * 360 * 7 / 12 + 60).toFixed(1)}deg)`; });
  for (let k = 0; k < 7; k++) sfx('tick', ck0 + k * (ck1 - ck0) / 7, 0.45);
  tw('.e-sun', ck0, 1.4, { x: [0, 260], y: [0, 520], o: [1, 0] }, 'inOut');
  hide('.e-moon'); tw('.e-moon', ck0 + 0.6, 0.9, { y: [300, 0], o: [0, 1] }, 'out');
  $$('.e-web .wb').forEach((p, k) => tw(p, wt('j1', 2) + k * 0.07, 0.4, { dash: [100, 0] }, 'out'));
  $$('#E .e-zz .zz').forEach((z, k) => { hide(z); const t0 = wt('j1', 1) + k * 0.2; tw(z, t0, 1.6, { y: [0, -160], o: [0, 1], s: [0.4, 1.2] }, 'out'); tw(z, t0 + 1.2, 0.5, { o: [1, 0] }, 'in'); });
  tw('.e-weed', wt('j1', 3) - 0.1, 1.7, { x: [0, 1450], r: [0, 900] }, 'lin'); idle('.e-weed', t => ({ y: -Math.abs(40 * Math.sin((t - wt('j1', 3)) * 7)) })); sfx('whoosh', wt('j1', 3), 0.4);
  tw('#E .armR', wt('j1', 3), 0.35, { r: [0, -120] }, 'back'); tw('#E .mouth', wt('j1', 3), 0.2, { sy: [1, -0.6] }); tw('#E .brR', wt('j1', 3), 0.25, { r: [0, 14], y: [0, -10] }, 'back');
  tw('#E .pup', wt('j1', 1), 0.3, { x: [0, -8], y: [0, 6] }, 'out'); tw('#E .lid', wt('j1', 2), 0.3, { sy: [0, 0.5] }, 'out');

  // ---------- F: almost a thousand stops a day ----------
  tDrop('#E', '#F', tF);
  hide('.f-chip'); slideIn('.f-chip', wt('s5', 1), 'left', 0.65, 260); sfx('whoosh', wt('s5', 1), 0.4);
  const fn = $('.f-n'), n0 = wt('s5', 4), n1 = we('s5', 5);
  custom(t => { const p = clamp((t - n0) / (n1 - n0)); fn.textContent = Math.round(1000 * (1 - Math.pow(1 - p, 2.2))); });
  hide('.f-n'); tw('.f-n', n0 - 0.15, 0.3, { o: [0, 1], s: [0.6, 1] }, 'back'); punch('.f-n', n1, 0.1); sfx('thud', n1);
  hide('.f-sub'); slideIn('.f-sub', wt('s5', 6), 'right', 0.65, 260);
  hide('.f-strip'); slideIn('.f-strip', wt('s5', 2), 'left', 0.6, 300);
  const sun0 = wt('s5', 4) - 0.1, sun1 = we('s5', 8);
  hide('.f-sun'); tw('.f-sun', wt('s5', 3), 0.3, { o: [0, 1], s: [0.4, 1] }, 'back'); tw('.f-sun', sun0, sun1 - sun0, { x: [0, 760] }, 'lin');
  idle('.f-sun .sRays', t => ({ r: t * 90 }));
  FST.forEach(([s, x], k) => { hide(s); const t0 = sun0 + (sun1 - sun0) * clamp((x - 140) / 790); tw(s, t0, 0.3, { s: [0.2, 1], o: [0, 1], y: [-30, 0] }, 'back'); if (k % 3 === 0) sfx('tick', t0, 0.5); });
  tw('#F .f-m', wt('s5', 5) - 0.05, 0.2, { y: [0, -60] }, 'out'); tw('#F .f-m', wt('s5', 5) + 0.15, 0.3, { y: [-60, 0] }, 'in');
  tw('#F .armL', wt('s5', 5), 0.3, { r: [0, 150] }, 'back'); tw('#F .armR', wt('s5', 5), 0.3, { r: [0, -150] }, 'back');
  tw('#F .mouth', wt('s5', 5), 0.2, { sy: [1, -1] }); tw('#F .brL', wt('s5', 5), 0.2, { y: [0, -16] }, 'back'); tw('#F .brR', wt('s5', 5), 0.2, { y: [0, -16] }, 'back');
  tw('#F .pup', wt('s5', 1), 0.3, { y: [0, -8], x: [0, 6] }, 'out');
  hide('.f-pan'); slideIn('.f-pan', wt('s6', 0), 'down', 0.7, 240); sfx('whoosh', wt('s6', 0), 0.4);
  FMN.forEach((d, k) => { hide(d); const t0 = wt('s6', 2) - 0.05 + ((k % 9) + ((k / 9) | 0)) * 0.035; tw(d, t0, 0.3, { s: [0.2, 1], o: [0, 1] }, 'back'); });
  sfx('blip', wt('s6', 2), 0.5); tw('#F .pup', wt('s6', 2), 0.3, { y: [-8, 6], x: [6, 8] }, 'out');

  // ---------- G: one card in nine sits on the bench, jumps in when one breaks ----------
  tw('#F', tG - 0.3, 0.45, { r: [0, -25], s: [1, 0.55], o: [1, 0] }, 'in');
  tw('#G', tG - 0.12, 0.5, { r: [25, 0], s: [0.55, 1], o: [0, 1] }, 'out5'); sfx('whoosh', tG - 0.3, 1);
  hide('.g-rack'); popIn('.g-rack', wt('s7', 0), 0.45, 0.6); sfx('thud', wt('s7', 0), 0.6);
  hide('.g-chip'); slideIn('.g-chip', wt('s7', 1), 'up', 0.65, 180);
  GC.forEach((c, k) => { hide(c); const t0 = wt('s7', 2) + k * 0.11; tw(c, t0, 0.35, { x: [420, 0], o: [0, 1] }, 'out'); if (k % 2 === 0) sfx('tick', t0 + 0.2, 0.5); });
  hide('.g-bench'); slideIn('.g-bench', wt('s7', 5), 'right', 0.6, 300);
  hide('.g-wav'); hide('.g-boat'); slideIn('.g-wav', wt('s7', 3), 'down', 0.6, 200); slideIn('.g-boat', wt('s7', 3), 'down', 0.6, 200);
  idle('.g-wav .wv', t => ({ x: -((t * 120) % 200) }));
  const tBreak = wt('s9', 0), tGo = wt('s10', 1);
  // the mini boat rows on, stops at the break, rows on again
  custom(t => { const a = clamp((t - wt('s7', 3)) / 0.01), x = t < tBreak ? (t - wt('s7', 3)) * 25 : t < tGo ? (tBreak - wt('s7', 3)) * 25 : (tBreak - wt('s7', 3)) * 25 + (t - tGo) * 110;
    $('.g-boat').style.left = (560 + Math.min(x * a, 360)) + 'px'; });
  // card 9 -> bench
  const c9 = GC[8], tOut = wt('s8', 2);
  spin('#G .g-cards .gpu:not(.gc8):not(.gc4) .gFan', wt('s7', 2));
  spin('#G .gc4 .gFan', wt('s7', 2), tBreak); spin('#G .gc8 .gFan', wt('s7', 2), tOut);
  tw($('.gGlow', c9), wt('s8', 1), 0.3, { o: [0, 0.8] }, 'out'); punch(c9, wt('s8', 1), 0.12); sfx('ding', wt('s8', 1), 0.5);
  tw(c9, tOut, 0.55, { x: [0, 280] }, 'out'); tw(c9, tOut, 0.25, { y: [0, -150] }, 'out'); tw(c9, tOut + 0.25, 0.3, { y: [-150, -42] }, 'in'); sfx('whoosh', tOut, 0.5); sfx('thud', tOut + 0.55, 0.6);
  tw($('.gGlow', c9), tOut + 0.6, 0.3, { o: [0.8, 0] }, 'out');
  tw($('.gLid', c9), tOut + 0.7, 0.4, { sy: [0, 0.6] }, 'out'); tw($('.gLed', c9), tOut + 0.6, 0.3, { o: [1, 0.2] }, 'out');
  hide('.g-pan'); slideIn('.g-pan', wt('s8', 4), 'right', 0.7, 300); sfx('whoosh', wt('s8', 4), 0.4);
  tw('#G .armR', wt('s8', 0), 0.35, { r: [0, -70] }, 'back'); tw('#G .pup', wt('s8', 0), 0.3, { x: [0, 8], y: [0, -8] }, 'out');
  tw('#G .armR', wt('s8', 4), 0.35, { r: [-70, -40] }, 'out'); tw('#G .mouth', wt('s8', 4), 0.2, { sy: [1, 1.3] }, 'back');
  // card 5 breaks
  const c5 = GC[4];
  hide(gBolt); tw(gBolt, tBreak - 0.05, 0.12, { o: [0, 1], s: [2, 1], y: [-120, 0] }, 'in'); tw(gBolt, tBreak + 0.5, 0.3, { o: [1, 0] }, 'in');
  shake(tBreak + 0.06, 0.35, 24); sfx('zap', tBreak - 0.05, 0.9); sfx('glitch', tBreak + 0.1, 0.6);
  tw($('.gRed', c5), tBreak + 0.05, 0.12, { o: [0, 0.8] }, 'out'); tw($('.gMouth', c5), tBreak + 0.05, 0.2, { sy: [1, -1] }); tw($('.gLid', c5), tBreak + 0.1, 0.25, { sy: [0, 0.6] }, 'out'); tw($('.gLed', c5), tBreak + 0.05, 0.1, { o: [1, 0] });
  idle(c5, t => t > tBreak && t < tBreak + 0.6 ? { x: 6 * Math.sin(t * 60) } : {});
  gSmk.forEach((s, k) => { hide(s); tw(s, tBreak + 0.15 + k * 0.15, 1.1, { y: [0, -170], s: [0.3, 1.3], o: [1, 0] }, 'out'); });
  for (let k = 0; k < 8; k++) { const d = mk('#G', 'spark'); d.style.left = GX[1] + 90 + 'px'; d.style.top = GY[1] + 40 + 'px'; hide(d);
    tw(d, tBreak + k * 0.03, 0.5, { x: [0, (hash(k + 70) - 0.5) * 300], y: [0, -60 - 160 * hash(k + 80)], o: [1, 0], r: [0, 200] }, 'out'); }
  tw('#G .g-m', tBreak, 0.2, { y: [0, -50], x: [0, -10] }, 'out'); tw('#G .g-m', tBreak + 0.2, 0.3, { y: [-50, 0], x: [-10, 0] }, 'in');
  tw('#G .armL', tBreak, 0.3, { r: [0, 150] }, 'back'); tw('#G .armR', tBreak, 0.3, { r: [-40, -150] }, 'back');
  tw('#G .mouth', tBreak, 0.2, { sy: [1.3, -1] }); tw('#G .brL', tBreak, 0.2, { y: [0, -16] }, 'back'); tw('#G .brR', tBreak, 0.2, { y: [0, -16] }, 'back');
  tw('#G .pup', tBreak, 0.3, { x: [8, 4], y: [-8, -4] }, 'out');
  // the spare wakes up, the broken card drops out, the spare jumps into its slot
  const tWake = wt('s9', 2), tJump = wt('s9', 3);
  tw($('.gLid', c9), tWake, 0.15, { sy: [0.6, 0] }, 'out'); punch(c9, tWake, 0.15); sfx('blip', tWake, 0.6); tw($('.gLed', c9), tWake, 0.2, { o: [0.2, 1] }, 'out');
  tw(c5, tJump - 0.2, 0.55, { y: [0, 780], r: [0, 50], o: [1, 0] }, 'in'); sfx('whoosh', tJump - 0.2, 0.5);
  const jx = GX[1] - GX[2], jy = GY[1] - GY[2];
  tw(c9, tJump, 0.6, { x: [280, jx] }, 'inOut'); tw(c9, tJump, 0.3, { y: [-42, jy - 170] }, 'out'); tw(c9, tJump + 0.3, 0.3, { y: [jy - 170, jy] }, 'in'); tw(c9, tJump, 0.6, { r: [0, -360] }, 'inOut');
  const tLand = tJump + 0.6; shake(tLand, 0.25, 14); sfx('slam', tLand, 0.8); punch(c9, tLand + 0.02, 0.12);
  spin('#G .gc8 .gFan', tLand);
  tw('#G .armL', tLand, 0.3, { r: [150, 0] }, 'out'); tw('#G .armR', tLand, 0.3, { r: [-150, -60] }, 'out'); tw('#G .mouth', tLand, 0.2, { sy: [-1, 1.2] }, 'back');
  tw('#G .brL', tLand, 0.2, { y: [-16, 0] }, 'out'); tw('#G .brR', tLand, 0.2, { y: [-16, 0] }, 'out');
  // the boat rows on: cheering
  tw('#G .g-m', tGo, 0.2, { y: [0, -70] }, 'out'); tw('#G .g-m', tGo + 0.2, 0.3, { y: [-70, 0] }, 'in');
  tw('#G .armL', tGo, 0.3, { r: [0, 140] }, 'back'); tw('#G .armR', tGo, 0.3, { r: [-60, -140] }, 'back');
  punch('.g-boat', tGo, 0.15); sfx('coin', tGo + 0.1, 0.6); sfx('ding', we('s10', 3), 0.5);

  // ---------- H joke: the dream job ----------
  tWhip('#G', '#H', tH, 0.46, -1);
  hide('.h-chip'); slideIn('.h-chip', wt('j2', 0), 'up', 0.65, 180);
  tw('.h-lng', tH, 0.8, { x: [-900, 0] }, 'out'); tw('.h-card', tH, 0.8, { x: [-900, 0] }, 'out'); tw('.h-card', 0, 0.001, { r: [-14, -14] }); tw('.h-sh', 0, 0.001, { r: [-14, -14] });
  tw('.h-card .gLid', 0, 0.001, { sy: [0.45, 0.45] }); tw('.h-card .gLed', 0, 0.001, { o: [0.3, 0.3] });
  idle('.h-card', t => ({ y: 3 * Math.sin(W2 * 10 * t) }));
  hide('.h-sun'); tw('.h-sun', wt('j2', 1), 0.5, { o: [0, 1], y: [200, 0], s: [0.5, 1] }, 'back'); sfx('ding', wt('j2', 1), 0.5); idle('.h-sun .sRays', t => ({ r: t * 40 }));
  hide('.h-sh'); tw('.h-sh', wt('j2', 2), 0.35, { y: [-400, 0], o: [0, 1] }, 'out'); sfx('pop', wt('j2', 2) + 0.3);
  hide('.h-drink'); popIn('.h-drink', wt('j2', 2) + 0.35, 0.35, 0.3); sfx('clink', wt('j2', 2) + 0.4, 0.6);
  $$('.h-heat path').forEach((p, k) => tw(p, wt('j2', 3) + k * 0.1, 0.5, { dash: [100, 0] }, 'out')); punch('.h-sun', wt('j2', 3), 0.15); sfx('riser', wt('j2', 3) - 0.2, 0.4);
  idle('.h-heat', t => ({ y: t > wt('j2', 3) ? -6 * Math.sin(t * 6) : 0 }));
  // the worker on the left sweats
  hide('.h-work'); slideIn('.h-work', wt('j2', 1), 'left', 0.6, 300); spin('.h-work .gFan', wt('j2', 1), wt('j2', 8), 2);
  idle('.h-work', t => t > wt('j2', 1) && t < wt('j2', 8) ? { x: 2.5 * Math.sin(t * 40) } : {});
  for (let k = 0; k < 7; k++) { const d = mk('.h-fx', 'h-sweat'); d.style.left = 70 + 150 * hash(k + 5) + 'px'; d.style.top = '330px'; hide(d); const t0 = wt('j2', 2) + k * 0.36;
    tw(d, t0, 0.6, { y: [0, 110], o: [1, 0] }, 'in'); }
  // "ждёшь": the shades slide down, the card peeks at the worker
  tw('.h-sh', wt('j2', 5), 0.3, { y: [0, 30] }, 'out'); tw('.h-card .gLid', wt('j2', 5), 0.25, { sy: [0.45, 0] }, 'out'); tw('.h-card .gPup', wt('j2', 5), 0.3, { x: [0, -9], y: [0, -4] }, 'out');
  tw('.h-card .gMouth', wt('j2', 6), 0.25, { sy: [1, 1.4] }, 'back');
  // "сломается": the worker breaks, the spare springs up
  const tB2 = wt('j2', 8);
  tw('.h-work .gRed', tB2, 0.12, { o: [0, 0.8] }, 'out'); tw('.h-work .gMouth', tB2, 0.2, { sy: [1, -1] }); shake(tB2 + 0.05, 0.3, 18); sfx('zap', tB2 - 0.05, 0.8);
  for (let k = 0; k < 8; k++) { const d = mk('.h-fx', 'spark'); d.style.left = '140px'; d.style.top = '380px'; hide(d);
    tw(d, tB2 + k * 0.03, 0.5, { x: [0, (hash(k + 90) - 0.3) * 260], y: [0, -40 - 140 * hash(k + 95)], o: [1, 0], r: [0, 220] }, 'out'); }
  tw('.h-card', tB2 + 0.1, 0.35, { r: [-14, 0], y: [0, -90] }, 'back'); tw('.h-sh', tB2 + 0.1, 0.5, { y: [30, -260], x: [0, 120], r: [-14, 40], o: [1, 0] }, 'out'); sfx('whoosh', tB2 + 0.1, 0.5);
  tw('#H .pup', wt('j2', 0), 0.3, { x: [0, -8], y: [0, -4] }, 'out'); tw('#H .mouth', wt('j2', 1), 0.25, { sy: [1, 1.35] }, 'back');
  tw('#H .armR', wt('j2', 2), 0.35, { r: [0, -60] }, 'back'); tw('#H .brL', wt('j2', 3), 0.25, { y: [0, -12] }, 'back');
  tw('#H .armL', tB2, 0.3, { r: [0, 150] }, 'back'); tw('#H .armR', tB2, 0.3, { r: [-60, -150] }, 'back'); tw('#H .mouth', tB2, 0.2, { sy: [1.35, -1] }); tw('#H .brR', tB2, 0.2, { y: [0, -16] }, 'back');

  // ---------- I: a hundred times fewer stops; a spare is insurance ----------
  tCircle('#H', '#I', tI, 540, 650);
  hide('.i-chip'); slideIn('.i-chip', wt('s11', 0), 'up', 0.6, 180);
  tw('.i-bar', 0, 0.001, { sy: [0, 0] }); tw('.i-bar', tI + 0.1, 0.6, { sy: [0, 1] }, 'out'); sfx('riser', tI, 0.4);
  hide('.i-lbl'); slideIn('.i-lbl', wt('s11', 1), 'left', 0.65, 260);
  const tS = wt('s11', 3);
  tw('.i-bar', tS, 0.5, { sy: [1, 0.012] }, 'out5'); sfx('boom', tS, 0.6);
  hide('.i-big'); popIn('.i-big', tS + 0.05, 0.45, 0.4); punch('.i-big small', wt('s11', 6), 0.15); sfx('ding', wt('s11', 6), 0.6);
  for (let k = 0; k < 16; k++) { const d = mk('.i-fx', 'cf'); d.style.left = '790px'; d.style.top = '500px'; d.style.background = ['#b8ff3d', '#ffe14d', '#3bb3c9', '#ff8a3d'][k % 4]; hide(d);
    tw(d, wt('s11', 6) + k * 0.02, 0.9, { x: [0, (hash(k + 200) - 0.5) * 600], y: [0, -150 + 450 * hash(k + 210)], o: [1, 0], r: [0, 400 * hash(k + 220)] }, 'out'); }
  tw('#I .i-m', wt('s11', 6), 0.2, { y: [0, -60] }, 'out'); tw('#I .i-m', wt('s11', 6) + 0.2, 0.3, { y: [-60, 0] }, 'in');
  tw('#I .armL', wt('s11', 6), 0.3, { r: [0, 140] }, 'back'); tw('#I .armR', wt('s11', 6), 0.3, { r: [0, -140] }, 'back'); tw('#I .mouth', wt('s11', 6), 0.2, { sy: [1, 1.35] }, 'back');
  tw('#I .pup', wt('s11', 0), 0.3, { x: [0, -8], y: [0, -6] }, 'out');
  // moral
  const tM = wt('t1', 0) - 0.15;
  slideOut('.i-bar', tM, 'left', 0.35, 400); slideOut('.i-base', tM, 'left', 0.35, 400); slideOut('.i-lbl', tM, 'left', 0.35, 400); slideOut('.i-big', tM, 'right', 0.35, 400); slideOut('.i-chip', tM, 'up', 0.35, 200);
  tw('#I .armL', tM, 0.3, { r: [140, 0] }, 'out'); tw('#I .armR', tM, 0.3, { r: [-140, -40] }, 'out');
  hide('.i-sh'); popIn('.i-sh', wt('t1', 0), 0.45, 0.3); sfx('pop', wt('t1', 0)); hide('.i-card'); popIn('.i-card', wt('t1', 0) + 0.2, 0.4, 0.2); spin('.i-card .gFan', wt('t1', 0));
  punch('.i-sh', wt('t1', 1), 0.08);
  hide('.i-lazy'); slideIn('.i-lazy', wt('t1', 2), 'left', 0.6, 300); sfx('whoosh', wt('t1', 2), 0.4);
  tw('.i-x', 0, 0.001, { sx: [0, 0], r: [-8, -8] }); tw('.i-x', wt('t1', 3) + 0.15, 0.25, { sx: [0, 1] }, 'out'); sfx('buzz', wt('t1', 3) + 0.15, 0.4);
  hide('.i-ins'); stamp('.i-ins', wt('t1', 5), 5, 18);
  tw('#I .armR', wt('t1', 5), 0.35, { r: [-40, -130] }, 'back'); tw('#I .mouth', wt('t1', 5), 0.2, { sy: [1.35, 1.2] }, 'back'); tw('#I .pup', wt('t1', 5), 0.3, { x: [-8, 8], y: [-6, -4] }, 'out');
  tw('#I .i-m', wt('t1', 5), 0.2, { y: [0, -50] }, 'out'); tw('#I .i-m', wt('t1', 5) + 0.2, 0.3, { y: [-50, 0] }, 'in');
  // out -> loop
  ['.i-sh', '.i-card', '.i-lazy', '.i-x', '.i-ins'].forEach(s => tw(s, tLoop - 0.25, 0.3, { o: [1, 0] }, 'in'));
  loopTo('#A2', tLoop); tw('#I .i-m', tLoop - 0.1, 0.35, { o: [1, 0] }, 'in');
}, { noCaption: ['hook'] });
