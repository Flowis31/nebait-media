// 014 «Чтобы стало тихо, я шумлю» — Как это работает, монолог наушника. Apple Newsroom, AirPods Pro, 28.10.2019.
boot(() => {
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
  const clamp = x => Math.max(0, Math.min(1, x));
  const place = (el, x, y, w, h) => { el.style.left = x + 'px'; el.style.top = y + 'px'; if (w) el.style.width = w + 'px'; if (h) el.style.height = h + 'px'; return el; };
  const easeIO = x => (x = clamp(x), x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2), easeO = x => 1 - Math.pow(1 - clamp(x), 3);
  const lerpK = (t, keys) => { if (t <= keys[0][0]) return keys[0][1]; for (let i = 1; i < keys.length; i++) if (t < keys[i][0]) { const [a, va] = keys[i - 1], [b, vb] = keys[i]; return va + (vb - va) * easeIO((t - a) / (b - a)); } return keys[keys.length - 1][1]; };
  const jump = (el, t, h = 80, d = 0.5, sh = null) => {
    tw(el, t - 0.12, 0.12, { sy: [1, 0.86], sx: [1, 1.08] }, 'out');
    tw(el, t, d / 2, { y: [0, -h], sy: [0.86, 1.08], sx: [1.08, 0.95] }, 'out');
    tw(el, t + d / 2, d / 2, { y: [-h, 0], sy: [1.08, 1], sx: [0.95, 1] }, 'in');
    tw(el, t + d, 0.08, { sy: [1, 0.88], sx: [1, 1.1] }, 'out'); tw(el, t + d + 0.08, 0.3, { sy: [0.88, 1], sx: [1.1, 1] }, 'back');
    if (sh) { tw(sh, t, d / 2, { s: [1, 0.55], o: [1, 0.5] }, 'out'); tw(sh, t + d / 2, d / 2, { s: [0.55, 1], o: [0.5, 1] }, 'in'); }
  };
  const ARCS = [];
  const arc = (el, t0, d, p0, p1, p2, spin = 0, w = 0, h = 0) => ARCS.push({ el, t0, d, p0, p1, p2, spin, w, h });
  custom(t => {
    const last = new Map();
    for (const a of ARCS) { if (t >= a.t0) last.set(a.el, a); else if (!last.has(a.el)) last.set(a.el, null); }
    last.forEach((a, el) => { if (!a) return; const u = clamp((t - a.t0) / a.d), q = 1 - u;
      const x = q * q * a.p0[0] + 2 * q * u * a.p1[0] + u * u * a.p2[0], y = q * q * a.p0[1] + 2 * q * u * a.p1[1] + u * u * a.p2[1];
      el.style.transform = `translate(${(x - a.w / 2).toFixed(1)}px,${(y - a.h / 2).toFixed(1)}px) rotate(${(a.spin * u).toFixed(1)}deg)`; });
  });
  const burst = (par, n, x, y, t, dist = 220, seed = 0, cls = 'spark') => {
    const cols = ['#ff5fa2', '#ffe14d', '#4de1ff', '#b8ff3d', '#c58bff'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 14, y - 14); const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin'); tw(s, t, 0.7, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + (cls === 'conf' ? 140 : 0)], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.5, 0.25, { o: [1, 0] }, 'lin'); } };
  // sound rings: N rings expanding from (cx,cy) while t in [t0,t1)
  const rings = (par, cx, cy, t0, t1, R = 260, period = 0.9, N = 3, cls = 'ring') => {
    const rs = []; for (let k = 0; k < N; k++) { const r = mk(par, cls); place(r, cx - R, cy - R, 2 * R, 2 * R); r.style.opacity = 0; rs.push(r); }
    custom(t => rs.forEach((r, k) => { if (t < t0 || t >= t1 + period) { r.style.opacity = 0; return; }
      const ph = ((t - t0) / period + k / N) % 1, born = t - (ph * period); if (born < t0 || born > t1) { r.style.opacity = 0; return; }
      r.style.transform = `scale(${(0.12 + 0.88 * ph).toFixed(3)})`; r.style.opacity = (0.9 * (1 - ph)).toFixed(3); }));
  };
  // talking mouth for the earbud: open on every spoken word
  const talk = (mouth, from = 0, to = 99) => custom(t => {
    let o = 0.25; if (t >= from && t < to) for (const w of TIMING.words) if (t >= w.t0 && t < w.t1) { o = 0.35 + 0.75 * Math.abs(Math.sin((t - w.t0) * 17)); break; }
    mouth.style.transform = `scaleY(${o.toFixed(3)})`;
  });
  const svgWave = (box, specs) => { box.innerHTML = sv('0 0 1080 1300', specs.map(s => `<path class="${s.cls}" d="" fill="none" stroke="${s.col}" stroke-width="${s.w || 16}" stroke-linecap="round" stroke-linejoin="round" ${s.dash ? 'pathLength="100" style="stroke-dasharray:100;filter:drop-shadow(0 0 10px ' + s.col + ')"' : 'style="filter:drop-shadow(0 0 10px ' + s.col + ')"'}/>`).join('')); return specs.map(s => $('.' + s.cls, box)); };

  // ---------- world: night city, three parallax layers ----------
  for (let k = 0; k < 46; k++) place(mk('#stars', 'star'), 1080 * hash(k + 1), 820 * hash(k + 51));
  for (let k = 0; k < 30; k++) { const w = 90 + 90 * hash(k + 3), h = 160 + 300 * hash(k + 7); place(mk('#far', 'bf'), k * 100 + 20 * hash(k), 1268 - h, w, h); }
  for (let k = 0; k < 16; k++) { const w = 170 + 110 * hash(k + 13), h = 330 + 300 * hash(k + 17), x = k * 210 + 30 * hash(k + 2), b = mk('#near', 'bn'); place(b, x, 1268 - h, w, h);
    for (let r = 0; r * 70 + 40 < h - 40; r++) for (let c = 0; c * 56 + 26 < w - 40; c++) { const wn = mk(b, 'wn' + (hash(k * 31 + r * 7 + c) < 0.55 ? ' off' : '')); place(wn, 22 + c * 56, 30 + r * 70); } }
  for (let k = 0; k < 9; k++) place(mk('#street', 'lamp'), 120 + k * 380, -190);
  for (let k = 0; k < 26; k++) place(mk('#street', 'dash'), k * 180, 110);
  $('#near').style.opacity = 0.9;

  // ---------- build ----------
  const buildA = sc => { $(sc + ' .a-eb').innerHTML = earbudSVG(sc.slice(1)); };
  buildA('#A');
  $('#A2').innerHTML = $('#A').innerHTML; $('#A2 .a-eb').innerHTML = ''; $('#A2 .a-rings').innerHTML = ''; buildA('#A2');
  $('.b-eb').innerHTML = earbudSVG('b'); $('.b-bus').innerHTML = busSVG('b');
  $('.b-ln').innerHTML = sv('0 0 1080 1300', `<path class="draw bl" d="M760 960 Q760 520 830 400" fill="none" stroke="#c9c3e6" stroke-width="10" stroke-dasharray="4 20" stroke-linecap="round" pathLength="100"/>`);
  $('.d-eb').innerHTML = earbudSVG('d'); $('.d-bus').innerHTML = busSVG('d');
  $('.e-eb').innerHTML = earbudSVG('e');
  $('.f-spk').innerHTML = speakerSVG('f'); $('.f-meter').innerHTML = meterSVG(); $('.f-mega').innerHTML = megaphoneSVG();
  $('.g-ear').innerHTML = earSVG(); $('.g-eb').innerHTML = earbudSVG('g', false);
  $('.h-eb').innerHTML = earbudSVG('h'); $('.i-eb').innerHTML = earbudSVG('i'); $('.i-bell').innerHTML = bellSVG();
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  mascotLife();
  ['#A .a-eb', '.b-eb', '.d-eb', '.h-eb', '.i-eb'].forEach(k => $$(k + ' .ebMouth').forEach(m => talk(m)));
  talk($('#A2 .ebMouth'), 99, 99);

  // ---------- cuts, camera, parallax ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('s1'), tC = cut('s2'), tD = cut('s3'), tE = cut('s5'), tF = cut('j1'), tG = cut('s7'), tH = cut('s8'), tI = cut('v1'), tLoop = L('out').t0 + 0.9;
  const CUTS = [0, tB, tC, tD, tE, tF, tG, tH, tI], IDS = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < 8 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 260 * easeIO((t - c + 0.35) / 0.7); }); x -= 2080 * easeIO((t - tLoop) / 0.6); return x; };
  custom(t => {
    const x = camX(t);
    $('#far').style.transform = `translate(${(-x * 0.2).toFixed(1)}px,0)`;
    $('#near').style.transform = `translate(${(-x * 0.55).toFixed(1)}px,0)`;
    $('#street').style.transform = `translate(${(-x * 1.0).toFixed(1)}px,0)`;
    $('#moon').style.transform = `translate(${(-x * 0.04).toFixed(1)}px,${(6 * Math.sin(W2 * 2 * t)).toFixed(1)}px)`;
    $$('#stars .star').forEach((s, k) => { if (k % 3 === 0) s.style.opacity = (0.5 + 0.5 * Math.sin(W2 * (4 + k % 5) * t + k)).toFixed(2); });
  });
  $$('.m').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2')) idle(m, t => ({ y: 7 * Math.sin(W2 * 16 * t + i), r: 1.6 * Math.sin(W2 * 8 * t + i) })); });
  idle('.b-eb, .d-eb, .h-eb, .i-eb', t => ({ y: 10 * Math.sin(W2 * 14 * t), r: 2 * Math.sin(W2 * 7 * t) }));
  idle('#A .a-eb, #A2 .a-eb', t => ({ y: 12 * Math.sin(W2 * 12 * t), r: 2.5 * Math.sin(W2 * 6 * t) }));
  idle('.wheel', t => ({ r: t * 900 }));

  // ---------- A: hook — the talking earbud, the mascot covers its ears ----------
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  for (const sc of ['#A', '#A2']) { tw(sc + ' .a-m .pup', 0, 0.001, { x: [7, 7], y: [-4, -4] }); tw(sc + ' .ebEye', 0, 0.001, { x: [0, 0] }); }
  punch('#A .a-eb', wt('hook', 0), 0.08); sfx('pop', wt('hook', 0) + 0.04, 0.5);
  tw('#A .ebBrow', wt('hook', 2), 0.25, { y: [0, -14] }, 'back'); tw('#A .ebEye', wt('hook', 2), 0.12, { sy: [1, 0.15] }, 'out'); tw('#A .ebEye', wt('hook', 2) + 0.14, 0.25, { sy: [0.15, 1] }, 'back');
  // «тихо»: the mascot puts a finger up — shh
  tw('#A .a-m .armR', wt('hook', 5) - 0.1, 0.3, { r: [0, -120] }, 'back'); tw('#A .a-m .mouth', wt('hook', 5), 0.25, { sx: [1, 0.4] }, 'back');
  tw('#A .a-m .lid', wt('hook', 5), 0.25, { sy: [0, 0.5] }, 'out');
  punch('#A .a-t', wt('hook', 5), 0.06);
  // «я сам шумлю»: pink rings from the earbud's tip, the mascot jumps and covers its ears
  const tSh = wt('hook', 8);
  rings('#A .a-rings', 330, 740, tSh - 0.05, L('hook').t1 + 0.4, 300, 0.55, 3);
  sfx('zap', tSh, 0.5); punch('#A .a-eb', tSh, 0.12); shake(tSh + 0.05, 0.3, 14);
  tw('#A .a-m .lid', tSh, 0.15, { sy: [0.5, 0] }, 'out'); jump('#A .a-m', tSh, 70, 0.45);
  tw('#A .a-m .armR', tSh, 0.25, { r: [-120, -165] }, 'back'); tw('#A .a-m .armL', tSh, 0.25, { r: [0, 165] }, 'back');
  tw('#A .a-m .mouth', tSh, 0.25, { sx: [0.4, 0.9], sy: [1, -1] }, 'back'); tw('#A .a-m .brL, #A .a-m .brR', tSh, 0.2, { y: [0, -14] }, 'out');
  tw('#A .ebEye', tSh, 0.25, { sy: [1, 0.5] }, 'out');

  // ---------- B: outer microphone hears the bus ----------
  tZoom('#A', '#B', tB);
  hide('.b-lbl'); hide('.b-ln path');
  tw('.b-bus', tB, 0.001, { x: [900, 900] }); tw('.b-shd', tB, 0.001, { x: [900, 900] });
  tw('.b-bus, .b-shd', wt('s1', 0) - 0.05, 1.0, { x: [900, 0] }, 'out'); sfx('whoosh', wt('s1', 0), 0.6);
  tw('.b-bus', wt('s1', 0) + 0.95, 0.12, { r: [0, -2] }, 'out'); tw('.b-bus', wt('s1', 0) + 1.07, 0.35, { r: [-2, 0] }, 'back');
  idle('.b-bus', t => (t > tB + 1.2 && t < tC + 0.5) ? { y: 4 * Math.sin(t * 40) } : {});
  tw('.b-eb .ebEye', tB, 0.001, { x: [0, 0], y: [0, 0] });
  const tMic = wt('s1', 3);
  punch('.b-eb .mic1', tMic, 0.45); sfx('blip', tMic, 0.7);
  slideIn('.b-lbl', tMic - 0.05, 'left', 0.6, 400);
  idle('.b-eb .mic1', t => (t > tMic + 0.4 && t < tC + 0.5) ? { s: 1 + 0.12 * Math.abs(Math.sin((t - tMic) * 7)) } : {});
  tw('.b-eb .ebEye', tMic - 0.1, 0.3, { y: [0, -10], x: [0, 8] }, 'out');
  const tHear = wt('s1', 5);
  tw('.b-ln path', tHear, 0.001, { o: [0, 1] }); tw('.b-ln path', tHear, 0.5, { dash: [100, 0] }, 'inOut');
  tw('.b-eb .ebEye', tHear, 0.3, { y: [-10, 10], x: [8, -8] }, 'out');
  const tGul = wt('s1', 6);
  rings('#B .cam', 470, 1040, tGul - 0.05, tC + 0.5, 330, 0.7, 3, 'ring g'); sfx('buzz', tGul, 0.5);
  tw('.b-m .armL', tGul, 0.25, { r: [0, 160] }, 'back'); tw('.b-m .armR', tGul, 0.25, { r: [0, -160] }, 'back');
  tw('.b-m .mouth', tGul, 0.25, { sy: [1, -1] }, 'back'); tw('.b-m .lid', tGul, 0.2, { sy: [0, 0.6] }, 'out');
  idle('.b-m', t => (t > tGul && t < tC) ? { x: 5 * Math.sin(t * 55) } : {});
  tw('.b-m .pup', tB + 0.2, 0.3, { x: [0, 8], y: [0, 6] }, 'out');

  // ---------- C: sound is a wave — the mascot surfs hill, pit, hill ----------
  tWhip('#B', '#C', tC, 0.46, 1);
  const [cW] = svgWave($('.c-wave'), [{ cls: 'cw', col: '#c9c3e6', w: 22, dash: true }]);
  const CX0 = 60, CX1 = 1020, CY = 860, CA = 210, CH = 1.5;
  cW.setAttribute('d', wavePath(CX0, CX1, CY, CA, CH));
  hide(cW); hide('.c-l1'); hide('.c-l2'); hide('.c-l3');
  const tWv = wt('s2', 2) - 0.1;
  tw(cW, tWv, 0.001, { o: [0, 1] }); tw(cW, tWv, 0.7, { dash: [100, 0] }, 'inOut'); sfx('whoosh', tWv, 0.5);
  const cu = [[tC, -0.05], [tWv + 0.1, 0.02], [wt('s2', 3), 1 / 6], [wt('s2', 4), 0.5], [wt('s2', 5), 5 / 6], [tD + 0.3, 1.0]];
  const cm = $('.c-m');
  custom(t => { const u = lerpK(t, cu), x = CX0 + (CX1 - CX0) * u, y = CY - CA * Math.sin(2 * Math.PI * CH * u), slope = -CA * 2 * Math.PI * CH * Math.cos(2 * Math.PI * CH * u) / (CX1 - CX0);
    cm.style.transform = `translate(${(x - 110).toFixed(1)}px,${(y - 205).toFixed(1)}px) rotate(${(Math.atan(slope) * 180 / Math.PI).toFixed(1)}deg)`; });
  tw('.c-m .armL', tC, 0.001, { r: [80, 80] }); tw('.c-m .armR', tC, 0.001, { r: [-80, -80] });
  [['.c-l1', 3, 1 / 6, -1], ['.c-l2', 4, 0.5, 1], ['.c-l3', 5, 5 / 6, -1]].forEach(([c, i, u, side]) => {
    const x = CX0 + (CX1 - CX0) * u, y = CY - CA * Math.sin(2 * Math.PI * CH * u);
    place($(c), x - 160, side < 0 ? y - 340 : y + 60, 320); popIn(c, wt('s2', i) - 0.05, 0.35, 0.3); sfx('pop', wt('s2', i), 0.7);
    tw('.c-m .mouth', wt('s2', i), 0.2, { sy: side < 0 ? [1, 1.3] : [1, -0.8] }, 'back');
  });
  tw('.c-m .lid', wt('s2', 4), 0.2, { sy: [0, 0.5] }, 'out'); tw('.c-m .lid', wt('s2', 5), 0.2, { sy: [0.5, 0] }, 'out');
  burst('#C .cam', 8, CX0 + (CX1 - CX0) * 5 / 6, CY - CA, wt('s2', 5), 160, 4);

  // ---------- D: I play the same wave upside down ----------
  tSlideUp('#C', '#D', tD);
  const [dG, dP] = svgWave($('.d-wave'), [{ cls: 'dg', col: '#c9c3e6', w: 20 }, { cls: 'dp', col: '#ff5fa2', w: 20, dash: true }]);
  const DX0 = 300, DX1 = 1040, DH = 2, DA = 130, DYG = 560, DYP = 900;
  dG.setAttribute('d', wavePath(DX0, DX1, DYG, DA, DH)); dP.setAttribute('d', wavePath(DX0, DX1, DYP, DA, DH, Math.PI));
  hide(dP); hide('.d-l1'); hide('.d-l2'); hide('.d-bar');
  tw('.d-bus', tD, 0.001, { x: [-40, -40] }); idle('.d-bus', t => ({ y: 3 * Math.sin(t * 40) }));
  const tPl = wt('s3', 2);
  tw(dP, tPl, 0.001, { o: [0, 1] }); tw(dP, tPl, 0.9, { dash: [100, 0] }, 'inOut'); sfx('zap', tPl, 0.5);
  rings('#D .cam', 120, 1110, tPl - 0.1, L('s4').t1, 150, 0.5, 3);
  punch('.d-eb', tPl, 0.12);
  slideIn('.d-l2', wt('s3', 6) - 0.05, 'right', 0.55, 300); sfx('whoosh', wt('s3', 6), 0.4);
  slideIn('.d-l1', wt('s4', 2) - 0.1, 'right', 0.55, 300);
  const px = DX0 + (DX1 - DX0) / (4 * DH);                        // first hill of the noise
  place($('.d-bar'), px - 60, 340, 120, 760);
  tw('.d-bar', wt('s4', 3) - 0.05, 0.25, { o: [0, 1], sy: [0.3, 1] }, 'back'); sfx('blip', wt('s4', 3), 0.6);
  const dDots = [mk('#D .cam', 'spark'), mk('#D .cam', 'spark')]; place(dDots[0], px - 18, DYG - DA - 18); place(dDots[1], px - 18, DYP + DA - 18);
  hide(dDots[0]); hide(dDots[1]); popIn(dDots[0], wt('s4', 3), 0.3, 0.2); popIn(dDots[1], wt('s4', 6), 0.3, 0.2); sfx('ding', wt('s4', 6), 0.6);
  punch(dP, wt('s4', 6), 0.05);
  tw('.d-m .armL', wt('s4', 3) - 0.1, 0.3, { r: [0, 120] }, 'back'); tw('.d-m .pup', wt('s4', 3), 0.25, { x: [0, -8], y: [0, -8] }, 'out');
  tw('.d-m .pup', wt('s4', 6), 0.25, { y: [-8, 6] }, 'out'); tw('.d-m .mouth', wt('s4', 6), 0.25, { sx: [1, 1.2], sy: [1, 1.3] }, 'back');
  tw('.d-eb .ebEye', tPl, 0.25, { x: [0, 10] }, 'out');

  // ---------- E: hill + pit = flat. Silence ----------
  tCircle('#D', '#E', tE, 540, 700);
  const [eG, eP, eS] = svgWave($('.e-wave'), [{ cls: 'eg', col: '#c9c3e6', w: 20 }, { cls: 'ep', col: '#ff5fa2', w: 20 }, { cls: 'es', col: '#ffffff', w: 14 }]);
  const EX0 = 60, EX1 = 1020, EH = 2;
  const eOff = t => lerpK(t, [[tE, 330], [wt('s5', 1), 330], [wt('s5', 2) + 0.1, 0]]);             // pink rises onto the grey
  const eAmp = t => lerpK(t, [[wt('s5', 2) + 0.1, 150], [wt('s5', 3) + 0.25, 0]]);
  custom(t => { if (t < tE - 0.4 || t > tF + 0.6) return; const a = eAmp(t), o = eOff(t), ph = (t - tE) * 2.2;
    eG.setAttribute('d', wavePath(EX0, EX1, 640, a, EH, ph)); eP.setAttribute('d', wavePath(EX0, EX1, 640 + o, a, EH, ph + Math.PI));
    eS.setAttribute('d', wavePath(EX0, EX1, 640, 0, EH)); eS.style.opacity = clamp((t - wt('s5', 3)) / 0.3).toFixed(2);
    const g = 1 - clamp((t - wt('s5', 3) - 0.2) / 0.4); eG.style.opacity = g.toFixed(2); eP.style.opacity = g.toFixed(2); });
  sfx('whoosh', wt('s5', 1), 0.5); sfx('ding', wt('s5', 3) + 0.1, 0.8);
  // «волны гасят друг друга»: the flat line sparkles along, then fades
  [0.15, 0.4, 0.65, 0.9].forEach((u, k) => burst('.e-fx', 6, EX0 + (EX1 - EX0) * u, 640, wt('s5', 4) + k * 0.18, 120, 30 + k));
  tw(eS, wt('s6', 0), 0.6, { sx: [1, 1.04] }, 'out');
  hide('.e-word'); stamp('.e-word', wt('s6', 4) - 0.05, -3, 12);
  tw(eS, wt('s6', 4) - 0.05, 0.3, { y: [0, -60] }, 'out');
  // the mascot: ears covered while the noise lives, then eyes closed and a smile
  tw('.e-m .armL', tE, 0.001, { r: [160, 160] }); tw('.e-m .armR', tE, 0.001, { r: [-160, -160] }); tw('.e-m .mouth', tE, 0.001, { sy: [-1, -1] }); tw('.e-m .lid', tE, 0.001, { sy: [0.6, 0.6] });
  idle('.e-m', t => (t > tE && t < wt('s5', 3)) ? { x: 4 * Math.sin(t * 55) } : {});
  tw('.e-m .armL', wt('s5', 3) + 0.2, 0.5, { r: [160, 20] }, 'back'); tw('.e-m .armR', wt('s5', 3) + 0.2, 0.5, { r: [-160, -20] }, 'back');
  tw('.e-m .mouth', wt('s5', 3) + 0.2, 0.3, { sy: [-1, 1.2] }, 'back');
  tw('.e-m .lid', wt('s6', 2), 0.3, { sy: [0.6, 0.9] }, 'out');
  tw('.e-m', wt('s6', 4), 0.5, { r: [0, -6], y: [0, 10] }, 'inOut');
  tw('.e-eb', tE, 0.001, { x: [0, 0] }); idle('.e-eb', t => ({ y: 14 * Math.sin(W2 * 18 * t), r: 8 * Math.sin(W2 * 9 * t) }));
  tw('.e-eb .ebEye', wt('s6', 4), 0.15, { sy: [1, 0.1] }, 'out'); tw('.e-eb .ebEye', wt('s6', 4) + 0.3, 0.2, { sy: [0.1, 1] }, 'back');
  sfx('tick', wt('s6', 2), 0.4);

  // ---------- F: joke — shouting back at the neighbour makes it louder ----------
  tDrop('#E', '#F', tF);
  const [fG, fP, fS] = svgWave($('.f-wave'), [{ cls: 'fg', col: '#c9c3e6', w: 18 }, { cls: 'fp', col: '#ff5fa2', w: 18 }, { cls: 'fs', col: '#ff3b5c', w: 26 }]);
  rings('#F .cam', 820, 640, tF, tG, 300, 0.6, 3, 'ring g');
  idle('.f-spk .cone', t => (t > tF && t < tG) ? { s: 1 + 0.06 * Math.abs(Math.sin(t * 26)) } : {});
  idle('.f-spk', t => (t > wt('j2', 6) && t < tG) ? { x: 6 * Math.sin(t * 60), r: 1.5 * Math.sin(t * 47) } : {});
  // the needle: neighbour → shouting → much louder
  const needle = t => lerpK(t, [[tF, -20], [wt('j1', 1) + 0.2, 10], [wt('j1', 7), 45], [wt('j2', 6), 50], [wt('j2', 6) + 0.25, 82]]) + (t > wt('j1', 1) ? 4 * Math.sin(t * 31) : 0);
  custom(t => { const n = $('.f-meter .needle'); if (n) n.style.transform = `rotate(${needle(t).toFixed(1)}deg)`; });
  tw('.f-mega', tF, 0.001, { o: [0, 0] });
  const tSh2 = wt('j1', 1);
  tw('.f-m .armR', tSh2 - 0.25, 0.3, { r: [0, -60] }, 'back');
  tw('.f-mega', tSh2 - 0.2, 0.25, { o: [0, 1], s: [0.4, 1], r: [20, 0] }, 'back'); sfx('pop', tSh2 - 0.2, 0.6);
  rings('#F .cam', 540, 1010, tSh2, wt('j1', 7) + 0.3, 260, 0.45, 3);
  tw('.f-m .mouth', tSh2, 0.2, { sx: [1, 0.8], sy: [1, 2.2] }, 'back'); tw('.f-m .brL, .f-m .brR', tSh2, 0.2, { y: [0, 10], r: [0, 8] }, 'out');
  idle('.f-mega', t => (t > tSh2 && t < wt('j1', 7) + 0.3) ? { r: 4 * Math.sin(t * 40) } : {}); sfx('buzz', tSh2, 0.5);
  shake(wt('j1', 6), 0.3, 12); sfx('thud', wt('j1', 7), 0.6);
  // «точь-в-точь наоборот, иначе шума станет больше»: two waves in step add up into a monster wave
  const fAmp = t => lerpK(t, [[wt('j2', 1) - 0.1, 0], [wt('j2', 1) + 0.4, 70]]), fBig = t => lerpK(t, [[wt('j2', 5), 0], [wt('j2', 6) + 0.2, 1]]);
  custom(t => { if (t < tF || t > tG + 0.6) return; const a = fAmp(t), b = fBig(t), ph = (t - tF) * 3;
    fG.setAttribute('d', wavePath(80, 1000, 600 - 40 * (1 - b), a * (1 - b), 2, ph)); fP.setAttribute('d', wavePath(80, 1000, 640 + 40 * (1 - b), a * (1 - b), 2, ph));
    fS.setAttribute('d', wavePath(80, 1000, 620, 2 * 70 * b + 30 * b * Math.sin(t * 9), 2, ph)); fS.style.opacity = b.toFixed(2);
    const vis = clamp(a / 25) * (1 - b); fG.style.opacity = vis.toFixed(2); fP.style.opacity = vis.toFixed(2); });
  const tBig = wt('j2', 6);
  tw('.f-mega', wt('j2', 0), 0.3, { o: [1, 0] }, 'in');
  sfx('boom', tBig, 0.8); shake(tBig + 0.05, 0.6, 30);
  tw('.f-m', tBig, 0.12, { sy: [1, 0.7], sx: [1, 1.2] }, 'out'); tw('.f-m', tBig + 0.5, 0.4, { sy: [0.7, 1], sx: [1.2, 1] }, 'back');
  tw('.f-m .armL', tBig, 0.25, { r: [0, 160] }, 'back'); tw('.f-m .armR', tBig, 0.25, { r: [-60, -160] }, 'back');
  tw('.f-m .mouth', tBig, 0.2, { sy: [2.2, -1], sx: [0.8, 1] }, 'back'); tw('.f-m .lid', tBig, 0.2, { sy: [0, 0.6] }, 'out');
  for (let k = 0; k < 6; k++) { const d = mk('.f-fx', 'drop'); place(d, 200 + 60 * k, 900); hide(d); const a = -Math.PI * (0.2 + 0.6 * k / 5);
    tw(d, tBig + 0.05, 0.05, { o: [0, 1] }, 'lin'); tw(d, tBig + 0.05, 0.55, { x: [0, Math.cos(a) * 160], y: [0, Math.sin(a) * 140] }, 'out'); tw(d, tBig + 0.45, 0.35, { y: [Math.sin(a) * 140, Math.sin(a) * 140 + 120], o: [1, 0] }, 'in'); }
  burst('.f-fx', 10, 820, 520, tBig, 260, 41);

  // ---------- G: the second microphone inside catches what is left ----------
  tWhip('#F', '#G', tG, 0.46, -1);
  hide('.g-lbl'); hide('.g-glow');
  // earbud flipped so its tip goes into the canal (canal mouth at page ~ (560, 675))
  place($('.g-eb'), 340, 560, 260, 260); tw('.g-eb', tG, 0.001, { sx: [-1, -1], r: [-8, -8] });
  place($('.g-glow'), 600, 615, 120, 120);
  const tIn = wt('s7', 1);
  tw('.g-eb', tIn - 0.1, 0.001, { x: [-160, -160] }); tw('.g-eb', tIn - 0.1, 0.45, { x: [-160, 0] }, 'out'); sfx('thud', tIn + 0.3, 0.5);
  slideIn('.g-lbl', wt('s7', 2) - 0.05, 'left', 0.6, 400);
  tw('.g-glow', wt('s7', 3) - 0.05, 0.3, { o: [0, 1], s: [0.3, 1] }, 'back'); sfx('blip', wt('s7', 3), 0.7);
  idle('.g-glow', t => t > wt('s7', 3) + 0.3 ? { s: 1 + 0.15 * Math.sin((t - wt('s7', 3)) * 9) } : {});
  // leftover noise: little grey squiggles slip toward the canal; caught and zapped on «догасил»
  const GB = []; for (let k = 0; k < 4; k++) { const b = mk('.g-bits', '', sv('0 0 90 40', `<path d="M5 20 Q20 0 35 20 T65 20 T85 20" fill="none" stroke="#c9c3e6" stroke-width="9" stroke-linecap="round"/>`)); place(b, 0, 0, 90, 40); hide(b); GB.push(b); }
  const tL = wt('s7', 5) - 0.3;
  GB.forEach((b, k) => { const t0 = tL + k * 0.22, sy = 420 + 130 * hash(k + 5); tw(b, t0, 0.05, { o: [0, 1] }, 'lin');
    arc(b, t0, 0.8 + 0.1 * k, [130, sy], [420, sy - 60 + 60 * hash(k)], [640, 672], 0, 90, 40); });
  const tZap = wt('s7', 9);
  GB.forEach((b, k) => { tw(b, tZap + k * 0.06, 0.12, { o: [1, 0], s: [1, 0.2] }, 'in'); });
  burst('#G .cam', 12, 660, 675, tZap, 160, 51); sfx('zap', tZap, 0.7); punch('.g-glow', tZap, 0.4);
  tw('.g-m .pup', tL, 0.3, { x: [0, -8], y: [0, -8] }, 'out'); tw('.g-m .armL', tZap, 0.3, { r: [0, 130] }, 'back'); tw('.g-m .mouth', tZap, 0.25, { sx: [1, 1.25], sy: [1, 1.3] }, 'back');
  jump('.g-m', tZap + 0.05, 60, 0.4);

  // ---------- H: 200 times a second ----------
  tw('#G', tH - 0.25, 0.25, { sx: [1, 0], o: [1, 0.6] }, 'in'); tw('#H', tH, 0.3, { sx: [0, 1] }, 'out5'); sfx('whoosh', tH - 0.25, 0.9);
  hide('.h-n'); hide('.h-u'); hide('.h-src');
  const GEARS = [[250, 820, 110, 1], [860, 780, 90, -1], [840, 1000, 70, 1]];
  GEARS.forEach(([x, y, r, dir], k) => { const g = mk('.h-gears', '', sv('0 0 200 200', `<g>${Array.from({ length: 10 }, (_, i) => `<rect x="88" y="0" width="24" height="40" rx="6" fill="#8f86c4" stroke="${INK}" stroke-width="6" transform="rotate(${i * 36} 100 100)"/>`).join('')}<circle cx="100" cy="100" r="72" fill="#8f86c4" stroke="${INK}" stroke-width="9"/><circle cx="100" cy="100" r="24" fill="#2b2547"/></g>`));
    place(g, x - r, y - r, 2 * r, 2 * r); idle(g, t => t > tH ? { r: dir * (t - tH) * (t > wt('s8', 3) ? 900 : 120) } : {}); });
  idle('.h-eb', t => (t > wt('s8', 3) && t < tI) ? { x: 3 * Math.sin(t * 90) } : {});
  const t200 = wt('s8', 3) - 0.1, d200 = 0.7;
  tw('.h-n', t200 - 0.05, 0.001, { o: [0, 1] }); slideIn('.h-n', t200 - 0.05, 'down', 0.4, 120);
  custom(t => { $('.h-n').textContent = Math.round(200 * easeO((t - t200) / d200)); });
  for (let k = 0; k < 7; k++) sfx('tick', t200 + k * d200 / 7, 0.5);
  punch('.h-n', t200 + d200, 0.1); sfx('ding', t200 + d200, 0.6);
  slideIn('.h-u', wt('s8', 4) - 0.05, 'down', 0.45, 120);
  slideIn('.h-src', wt('s8', 7) - 0.1, 'left', 0.6, 400);
  tw('.h-m .pup', t200, 0.2, { x: [0, 8] }, 'out');
  idle('.h-m .pup', t => (t > t200 + 0.3 && t < tI) ? { x: 8 * Math.cos((t - t200) * 12), y: 8 * Math.sin((t - t200) * 12) } : {});
  tw('.h-m', t200 + 0.3, 0.6, { r: [0, -8] }, 'inOut'); tw('.h-m .mouth', t200 + 0.3, 0.3, { sx: [1, 0.6], sy: [1, -0.6] }, 'back');

  // ---------- I: verdict stamp, subscribe, back to the hook ----------
  tCircle('#H', '#I', tI, 540, 400);
  hide('.i-st'); hide('.i-sub');
  const tSt = wt('v1', 1);
  tw('.i-m', tSt - 0.45, 0.25, { y: [0, -120] }, 'out'); tw('.i-m .armR', tSt - 0.45, 0.25, { r: [0, -170] }, 'out');
  tw('.i-m', tSt - 0.2, 0.18, { y: [-120, 0] }, 'in'); tw('.i-m .armR', tSt - 0.15, 0.15, { r: [-170, -60] }, 'in');
  stamp('.i-st', tSt, -7, 28);
  tw('.i-m .mouth', tSt, 0.25, { sx: [1, 1.2], sy: [1, 1.25] }, 'back');
  burst('.i-fx', 24, 540, 360, tSt + 0.05, 420, 61, 'conf');
  jump('.i-eb', tSt + 0.1, 70, 0.45); tw('.i-eb .ebBrow', tSt + 0.1, 0.25, { y: [0, -12] }, 'back');
  // «тишину делает звук»: one last pink ring from the earbud
  rings('#I .cam', 590, 760, wt('v1', 5), wt('v1', 6) + 0.6, 220, 0.5, 2);
  tw('.i-m .pup', wt('v1', 4), 0.25, { x: [0, 8], y: [0, -2] }, 'out');
  // «подпишись»: the button slides up, the bell rings, the mascot points at it
  const tSub = wt('cta', 0) - 0.05;
  slideIn('.i-sub', tSub, 'down', 0.6, 300); sfx('whoosh', tSub, 0.5);
  for (let k = 0; k < 4; k++) { tw('.i-bell .bell', wt('cta', 1) + k * 0.16, 0.08, { r: [k % 2 ? 18 : -18, k % 2 ? -18 : 18] }, 'inOut'); }
  tw('.i-bell .bell', wt('cta', 1) + 0.64, 0.3, { r: [-18, 0] }, 'back'); sfx('ding', wt('cta', 1), 0.6);
  tw('.i-m .armL', tSub + 0.1, 0.35, { r: [0, 40] }, 'back'); tw('.i-m .pup', tSub + 0.1, 0.25, { x: [8, 4], y: [-2, 8] }, 'out');
  punch('.i-sub', wt('cta', 2), 0.06); sfx('pop', wt('cta', 2), 0.5);
  // out: clear the props, the frozen hook frame comes back
  tw('#I .i-st, #I .i-sub, #I .conf', tLoop - 0.4, 0.35, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw('#I .i-m, #I .i-eb', tLoop + 0.45, 0.001, { o: [1, 0] });
}, { noCaption: ['hook'], chunks: {} });
