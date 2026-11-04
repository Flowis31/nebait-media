// 022 «Утопил телефон — и на сутки в рис. Спасёт?» — Байт или не байт, стиль «ожидание / реальность». Рассказчик — маскот.
// Apple Support «If you see a liquid-detection alert on your iPhone» (Published Date 30.10.2024).
// Свой мир: вечерняя кухня (плитка с банками — дальний слой, шкафы/окно/холодильник — средний, деревянный стол — ближний); шутки: ухо, суши-бар.
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
    const cols = ['#5fd7ff', '#ffd34d', '#ff5f6d', '#b8ff3d', '#ff8ab8'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.7, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.5, 0.25, { o: [1, 0] }, 'lin'); } };
  const ctr = el => { const r = (typeof el === 'string' ? $(el) : el).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
  // drops that fall from (x, y) in a container between t0 and t1, one every P seconds; spread = sideways jitter
  const drip = (par, x, y, t0, t1, P = 0.3, fall = 260, seed = 0, spread = 30, sx = 0) => {
    for (let t = t0, k = 0; t < t1; t += P, k++) { const d = mk(par, 'drop', dropSVG('dp' + seed + '_' + k)); place(d, x - 20 + (hash(k + seed) - 0.5) * spread, y);
      hide(d); tw(d, t, 0.05, { o: [0, 1] }, 'lin'); tw(d, t, 0.55, { y: [0, fall], x: [0, sx * (0.6 + 0.6 * hash(k * 2 + seed))], s: [0.6, 1] }, 'in'); tw(d, t + 0.45, 0.12, { o: [1, 0] }, 'lin'); } };
  const legs = (sel, t0, t1, P = 0.24) => { const q = s => $$(sel + ' ' + s); for (let t = t0, k = 0; t < t1 - 0.05; t += P, k++) { tw(q('.klegL'), t, P, { r: [k % 2 ? 18 : -18, k % 2 ? -18 : 18] }, 'inOut'); tw(q('.klegR'), t, P, { r: [k % 2 ? -18 : 18, k % 2 ? 18 : -18] }, 'inOut'); } tw(q('.klegL'), t1, 0.2, { r: [0, 0] }); tw(q('.klegR'), t1, 0.2, { r: [0, 0] }); };
  const parm = (sel, t, a, b, d = 0.3, cls = '.karmR') => tw($$(sel + ' ' + cls), t, d, { r: [a, b] }, 'back');
  const pmouth = (sel, t, a, b, d = 0.25) => tw($$(sel + ' .kmouth'), t, d, { sy: [a, b] }, 'back');
  const fb = sel => $$(sel).forEach(g => { g.style.transformBox = 'fill-box'; g.style.transformOrigin = 'center'; });

  // ---------- world ----------
  $('#wall').innerHTML = `<div style="position:absolute;left:0;top:0;width:2400px;height:1100px">${wallSVG()}</div><div style="position:absolute;left:2400px;top:0;width:2400px;height:1100px">${wallSVG()}</div>`;
  $('#kit').innerHTML = kitchenSVG();
  dof('#wall', 3.2); dof('#kit', 1.4);
  lookFX({ grain: 0.12, tint: 'transparent' });

  // ---------- props ----------
  const buildA = (sc, s) => { $(sc + ' .a-ph').innerHTML = talkPhoneSVG('a' + s, '#3d8fe0'); $(sc + ' .a-bowl').innerHTML = riceBowlSVG('a' + s); };
  buildA('#A', ''); $('#A .a-phin').innerHTML = talkPhoneSVG('ain', '#3d8fe0'); hide('#A .a-phin');
  $('.b-ph').innerHTML = talkPhoneSVG('b', '#3d8fe0'); $('.b-al').innerHTML = alertSVG(); $('.b-cab').innerHTML = cableSVG(); $('.b-x').innerHTML = crossSVG('bxp');
  $('.b-drop').innerHTML = dropSVG('bd', true); $('.b-port').innerHTML = portSVG('b');
  $('.c-ph').innerHTML = talkPhoneSVG('c', '#3d8fe0'); $('.c-bowl').innerHTML = riceBowlSVG('c', '#ff5fa2');
  $('.d-man').innerHTML = manualSVG('d'); $('.d-ph').innerHTML = talkPhoneSVG('d', '#3d8fe0'); $('.d-palm').innerHTML = palmSVG();
  $('.d-arr').innerHTML = `<svg viewBox="0 0 120 200" style="overflow:visible;left:0;top:0;width:100%;height:100%"><path d="M60 10 L60 150" stroke="#0a130d" stroke-width="34" stroke-linecap="round"/><path d="M60 10 L60 150" stroke="#ffd34d" stroke-width="18" stroke-linecap="round"/><path d="M16 120 L60 186 L104 120 Z" fill="#ffd34d" stroke="#0a130d" stroke-width="10" stroke-linejoin="round"/></svg>`;
  $('.e-wind').innerHTML = windSVG(); $('.e-ph').innerHTML = talkPhoneSVG('e', '#3d8fe0'); $('.e-clock').innerHTML = clockSVG('e'); $('.e-cab').innerHTML = cableSVG(); $('.e-lock').innerHTML = padlockSVG('e', '#ff8a3d');
  $('.f-ph').innerHTML = talkPhoneSVG('f', '#3d8fe0'); $('.f-dry').innerHTML = hairDryerSVG('f'); $('.f-swab').innerHTML = swabSVG('f'); $('.f-ear').innerHTML = earCutSVG('f');
  $('.f-x1').innerHTML = crossSVG('fx1'); $('.f-x2').innerHTML = crossSVG('fx2');
  $('.g-man').innerHTML = manualSVG('g'); $('.g-port').innerHTML = portSVG('g'); $('.g-bowl').innerHTML = riceBowlSVG('g'); $('.g-x').innerHTML = crossSVG('gxp');
  $('.h-bg').innerHTML = sushiBarSVG(); $('.h-plate').innerHTML = plateSVG(); $('.h-roll').innerHTML = sushiRollSVG('h');
  $('.i-bowl').innerHTML = riceBowlSVG('i'); $('.i-x').innerHTML = crossSVG('ixp'); $('.i-wind').innerHTML = windSVG().replace(/class="wl/g, 'class="iwl'); $('.i-ph').innerHTML = talkPhoneSVG('i', '#3d8fe0');
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  $('#A2').innerHTML = $('#A').innerHTML; ['.a-ph', '.a-bowl', '.a-m', '.a-drops', '.a-fx', '.a-phin'].forEach(s => $('#A2 ' + s).innerHTML = ''); buildA('#A2', '2'); $('#A2 .a-m').innerHTML = mascotSVG('a2m');
  mascotLife(); mascotTalk();
  // the phone is a character, not the narrator: its eyes blink, its mouth only moves for reactions
  { const n = Math.max(1, Math.round(TOTAL / 2.9)), P = TOTAL / n;
    $$('.keye').forEach((e, i) => idle(e, t => { if (t < 0.6 || t > TOTAL - 0.8) return {}; const u = (t + hash(i * 2.3) * P) % P; return { sy: u < 0.18 ? 1 - 0.9 * Math.sin(Math.PI * u / 0.18) : 1 }; })); }

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.13;
  const tB = cut('f1'), tC = cut('e1'), tD = cut('q1'), tE = cut('a2'), tF = cut('j2a'), tG = cut('r1'), tH = cut('j1'), tI = cut('v1'), tLoop = TOTAL - 0.7;
  const CUTS = [0, tB, tC, tD, tE, tF, tG, tH, tI], IDS = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 260 * easeIO((t - c + 0.35) / 0.7); }); x -= 2080 * easeIO((t - tLoop) / 0.6); return x; };
  custom(t => {
    const x = camX(t);
    $('#wall').style.transform = `translate(${(-(x * 0.15 + t * 4) % 2400).toFixed(1)}px,0)`;
    $('#kit').style.transform = `translate(${(-x * 0.45).toFixed(1)}px,0)`;
    $('#table').style.transform = `translate(${(-(x * 1.0) % 364).toFixed(1)}px,0)`;
  });
  grade(0, 'transparent'); grade(tB, 'rgba(95,215,255,.10)'); grade(tC, 'rgba(255,140,200,.26)'); grade(tD, 'rgba(255,230,170,.10)');
  grade(tE, 'rgba(95,215,255,.12)'); grade(tF - 0.2, 'rgba(255,120,160,.22)'); grade(tG, 'rgba(255,59,92,.14)'); grade(tH - 0.2, 'rgba(255,110,40,.26)'); grade(tI, 'rgba(255,59,92,.10)'); grade(tLoop + 0.3, 'transparent');
  $$('.m').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2')) idle(m, t => ({ y: 6 * Math.sin(W2 * 16 * t + i), r: 1.4 * Math.sin(W2 * 8 * t + i) })); });
  const bob = (sel, k = 6, amp = 10) => idle(sel, t => ({ y: amp * Math.sin(W2 * k * 2 * t), r: 2.2 * Math.sin(W2 * k * t) }));
  bob('.c-ph', 7, 10); bob('.e-ph', 5, 4); bob('.i-ph', 5, 4);

  // ================= A: hook — «Утопил телефон — и на сутки в рис?»: a wet phone drips over the bowl and plops in =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  idle('#A .a-ph, #A2 .a-ph', t => ({ r: 4 * Math.sin(W2 * 14 * t), x: 3 * Math.sin(W2 * 40 * t) }));   // shivering wet phone
  $$('#A .a-ph .kbrow, #A2 .a-ph .kbrow').forEach(b => b.style.transform = 'translateY(8px)');
  [['#A', 0], ['#A2', 1]].forEach(([sc, s]) => { const mo = $(sc + ' .a-ph .kmouth'); mo.style.transform = 'scaleY(0.35)'; });
  drip('#A .a-drops', 415, 910, 0.05, 1.7, 0.27, 140, 3, 60);
  punch('#A .a-t', W('hook', 0) + 0.02, 0.1);
  mascotPose('#A .a-m', W('hook', 0) + 0.1, 'pointL'); mascotPose('#A .a-m', W('hook', 4) - 0.1, 'think');
  pmouth('#A .a-ph', W('hook', 1), 0.35, 0.9); parm('#A .a-ph', W('hook', 1), 0, -100, 0.3); parm('#A .a-ph', W('hook', 1), 0, 100, 0.3, '.karmL');
  { const tp = W('hook', 5) - 0.12;      // «в рис»: the phone drops into the rice, the mound squashes, grains splash
    tw('#A .a-ph', tp, 0.3, { y: [0, 300], r: [0, 8] }, 'in'); sfx('whoosh', tp, 0.4);
    tw('#A .a-bowl .rmound', tp + 0.28, 0.1, { sy: [1, 0.86], sx: [1, 1.04] }, 'out'); tw('#A .a-bowl .rmound', tp + 0.38, 0.35, { sy: [0.86, 1], sx: [1.04, 1] }, 'back');
    sfx('thud', tp + 0.3, 0.7); shake(tp + 0.3, 0.2, 10);
    for (let k = 0; k < 14; k++) { const g = mk('#A .a-fx', 'grain'); place(g, 400 + (hash(k) - 0.5) * 160, 900); hide(g); const t = tp + 0.3 + 0.02 * k, a = -Math.PI * (0.15 + 0.7 * hash(k * 3));
      tw(g, t, 0.05, { o: [0, 1] }, 'lin'); idle(g, tt => { if (tt < t) return {}; const u = Math.min(1, (tt - t) / 0.7); return { x: Math.cos(a) * 260 * u, y: Math.sin(a) * 300 * u + 520 * u * u, r: 400 * u }; }); tw(g, t + 0.55, 0.15, { o: [1, 0] }, 'lin'); }
    mascotPose('#A .a-m', tp + 0.3, 'shock'); jump('#A .a-m', tp + 0.32, 50, 0.4, '#A .a-shd3'); }

  // ================= B: the iPhone sees water in the port and switches charging off; wet pins under current rust =================
  morphCut('#A', '#B', tB, '#A .a-phin', '.b-ph', 0.6);
  hide('.b-al'); hide('.b-x'); hide('.b-drop'); hide('.b-port'); hide('.b-n'); hide('.b-chip');
  $$('.b-ph .kbrow').forEach(b => b.style.transform = 'translateY(6px)');
  mascotPose('.b-m', tB + 0.15, 'pointL');
  { const [px, py] = ctr('.b-ph'), [dx, dy] = ctr('.b-drop'), portX = px, portY = py + 270;
    // «видит воду»: a drop falls into the port at the bottom; the alert bubble pops
    tw('.b-drop', W('f1', 2) - 0.25, 0.05, { o: [0, 1] }, 'lin'); tw('.b-drop', W('f1', 2) - 0.25, 0.45, { x: [portX - dx, portX - dx], y: [portY - dy - 520, portY - dy - 10], s: [1.6, 1] }, 'in');
    tw('.b-drop', W('f1', 2) + 0.2, 0.1, { o: [1, 0], sy: [1, 0.3] }, 'lin'); sfx('blip', W('f1', 2) + 0.2, 0.5);
    pmouth('.b-ph', W('f1', 3), 0.12, 0.8); tw('.b-ph .kpup', W('f1', 3), 0.25, { y: [0, 10] }, 'out');
    popIn('.b-al', W('f1', 3) + 0.05, 0.4); sfx('pop', W('f1', 3) + 0.05, 0.5);
    slideIn('.b-chip', W('f1', 5) - 0.05, 'left', 0.6, 400);
    // «выключает зарядку»: the plug slides in from the right, a red cross, the plug is pushed back
    tw('.b-cab', W('f1', 6) - 0.3, 0.45, { x: [600, -60] }, 'out'); sfx('whoosh', W('f1', 6) - 0.3, 0.4);
    popIn('.b-x', W('f1', 7), 0.3); tw('.bxp', W('f1', 7) + 0.06, 0.25, { dash: [100, 0] }, 'out'); sfx('buzz', W('f1', 7) + 0.05, 0.6);
    tw('.b-cab', W('f1', 8), 0.35, { x: [-60, 200] }, 'back'); tw('.b-cab', W('f1', 8), 0.35, { r: [0, 4] }, 'back');
    parm('.b-ph', W('f1', 7), 0, -130, 0.3); mascotPose('.b-m', W('f1', 7), 'shock');
    // f2 «Иначе мокрые контакты под током заржавеют»: the camera dives into the port macro
    const t2 = W('f2', 0) - 0.1;
    tw('.b-ph, .b-al, .b-chip', t2, 0.35, { o: [1, 0], y: [0, 120], s: [1, 0.8] }, 'in'); tw('.b-cab, .b-x', t2, 0.3, { o: [1, 0] }, 'in');
    tw('.b-port', t2 + 0.05, 0.08, { o: [0, 1] }, 'lin'); tw('.b-port', t2 + 0.05, 0.5, { s: [0.15, 1], x: [portX - 540, 0], y: [portY - 520, 0] }, 'out5'); sfx('whoosh', t2, 0.5);
    tw('.b-port .pwater', W('f2', 1) - 0.05, 0.25, { o: [0, 1], sx: [0.3, 1] }, 'out'); sfx('blip', W('f2', 1), 0.3);
    for (let k = 0; k < 8; k++) { const t = W('f2', 2) + k * 0.05; tw(`.b-port .pin${k}`, t, 0.22, { y: [0, -14] }, 'out'); tw(`.b-port .pin${k}`, t + 0.22, 0.25, { y: [-14, 0] }, 'back'); }
    for (let k = 0; k < 4; k++) { const t = W('f2', 3) + k * 0.12; tw('.b-port .pzap', t, 0.05, { o: [0, 1] }, 'lin'); tw('.b-port .pzap', t + 0.07, 0.04, { o: [1, 0.2] }, 'lin'); }
    tw('.b-port .pzap', W('f2', 5) - 0.05, 0.1, { o: [0.2, 0] }, 'lin'); sfx('zap', W('f2', 3), 0.6);
    tw('.b-port .prust', W('f2', 5) - 0.05, 0.6, { o: [0, 1] }, 'out'); sfx('glitch', W('f2', 5), 0.6); shake(W('f2', 5) + 0.1, 0.25, 12);
    slideIn('.b-n', W('f2', 5) + 0.05, 'down', 0.5, 160); tw('.b-n', W('f2', 5) + 0.05, 0.001, { r: [-4, -4] });
    mascotPose('.b-m', W('f2', 0), 'think'); tw('.b-m', t2, 0.5, { y: [0, 300], x: [0, 10] }, 'inOut'); tw('.b-shd2', t2, 0.5, { y: [0, 300] }, 'inOut'); mascotPose('.b-m', W('f2', 5), 'facepalm');
    focus('#B > .cam', W('f2', 5) - 0.05, 540, 520, 1.14, 0.5, 0.28, 0.4, 540, 600); }

  // ================= C: expectation — the rice drinks the water out like a sponge =================
  tCircle('#B', '#C', tC, 540, 700);
  hide('.c-chip');
  slideIn('.c-chip', W('e1', 0), 'left', 0.6, 400);
  mascotPose('.c-m', tC + 0.15, 'think');
  $$('.c-ph .kbrow').forEach(b => b.style.transform = 'translateY(6px)');
  { const [px, py] = ctr('.c-ph'), [bx, by] = ctr('.c-bowl');
    drip('.c-drops', px, py + 200, tC + 0.1, W('e1', 7), 0.3, 160, 11, 80);
    // «как губка, вытянет воду»: the mound squeezes like a sponge, drops fly from the phone into the rice along arcs
    for (let k = 0; k < 3; k++) { const t = W('e1', 7) + k * 0.18; tw('.c-bowl .rmound', t, 0.09, { sy: [1, 0.9], sx: [1, 1.03] }, 'out'); tw('.c-bowl .rmound', t + 0.09, 0.12, { sy: [0.9, 1], sx: [1.03, 1] }, 'out'); }
    for (let k = 0; k < 10; k++) { const d = mk('.c-fx', 'drop', dropSVG('cf' + k)); const sx0 = px - 20 + (hash(k) - 0.5) * 120, sy0 = py - 40 + (hash(k + 5) - 0.5) * 200; place(d, sx0, sy0); hide(d);
      const t = W('e1', 8) - 0.1 + k * 0.07; tw(d, t, 0.05, { o: [0, 1] }, 'lin'); arc(d, t, 0.5, bx - 20 - sx0 + (hash(k * 3) - 0.5) * 300, by - 120 - sy0, 160 + 60 * hash(k), 30); tw(d, t + 0.45, 0.08, { o: [1, 0] }, 'lin'); if (k % 3 === 0) sfx('blip', t + 0.45, 0.25); }
    tw('.c-ph .pscr', W('e1', 9) - 0.05, 0.3, { o: [0, 0.8] }, 'out'); pmouth('.c-ph', W('e1', 9), 0.12, 0.6); tw($$('.c-ph .kbrow'), W('e1', 9), 0.3, { y: [6, -6] }, 'out');
    parm('.c-ph', W('e1', 9), 0, -120, 0.35); parm('.c-ph', W('e1', 9), 0, 120, 0.35, '.karmL');
    burst('.c-fx', 14, px, py - 100, W('e1', 9) + 0.05, 260, 21, 'spark'); sfx('ding', W('e1', 9) + 0.05, 0.6);
    mascotPose('.c-m', W('e1', 7), 'pointL'); mascotPose('.c-m', W('e1', 9), 'cheer'); jump('.c-m', W('e1', 9) + 0.05, 55, 0.42);
    focus('#C > .cam', W('e1', 7) - 0.05, 500, 880, 1.12, 0.5, 0.28, 0.4, 540, 820); }

  // ================= D: check Apple's own instruction; step 1 — tap the phone on your palm, port down =================
  tWhip('#C', '#D', tD, 0.46);
  hide('.d-src'); hide('.d-chip'); hide('.d-ph'); hide('.d-palm'); hide('.d-arr');
  tw('.d-man', tD - 0.05, 0.5, { y: [500, 0], r: [10, -2] }, 'back');
  for (let k = 0; k < 6; k++) tw(`.d-man .mline${k}`, W('q1', 2) + k * 0.1, 0.25, { dash: [100, 0] }, 'out');
  tw('.d-man .mpage', W('q1', 0), 0.12, { sx: [1, 0.2] }, 'in'); tw('.d-man .mpage', W('q1', 0) + 0.12, 0.25, { sx: [0.2, 1] }, 'back'); sfx('whoosh', W('q1', 0), 0.3);
  slideIn('.d-src', W('q1', 4) - 0.2, 'left', 0.6, 500); sfx('whoosh', W('q1', 4) - 0.2, 0.4);
  mascotPose('.d-m', tD + 0.15, 'think'); mascotPose('.d-m', W('q1', 4), 'pointUp');
  focus('#D > .cam', W('q1', 4) - 0.05, 540, 640, 1.12, 0.4, 0.28, 0.4, 540, 720);
  { const t0 = W('a1', 0) - 0.2;      // the booklet flies off up, the chip, the palm and the phone arrive
    tw('.d-man', t0, 0.35, { y: [0, -700], o: [1, 0] }, 'in'); slideOut('.d-src', t0, 'left', 0.3, 400);
    slideIn('.d-chip', t0 + 0.1, 'left', 0.55, 400);
    tw('.d-palm', t0 + 0.1, 0.06, { o: [0, 1] }, 'lin'); tw('.d-palm', t0 + 0.1, 0.45, { y: [400, 0] }, 'out');
    tw('.d-ph', t0 + 0.2, 0.06, { o: [0, 1] }, 'lin'); tw('.d-ph', t0 + 0.2, 0.45, { y: [-600, -60] }, 'out'); sfx('whoosh', t0 + 0.2, 0.4);
    mascotPose('.d-m', t0 + 0.2, 'pointL');
    // four taps on the palm on «телефоном по ладони, разъёмом вниз»: squash, a puff of drops from the port each time
    const taps = [W('a1', 1), W('a1', 3), W('a1', 4), W('a1', 5)];
    taps.forEach((th, i) => {
      tw('.d-ph', th - 0.14, 0.14, { y: [-60, 0] }, 'in'); tw('.d-ph', th, 0.06, { sy: [1, 0.93] }, 'out'); tw('.d-ph', th + 0.06, 0.18, { sy: [0.93, 1] }, 'back'); tw('.d-ph', th + 0.08, 0.2, { y: [0, -60] }, 'out');
      tw('.d-palm', th, 0.06, { y: [0, 14] }, 'out'); tw('.d-palm', th + 0.06, 0.2, { y: [14, 0] }, 'back');
      sfx('thud', th, 0.45); sfx('tick', th + 0.02, 0.35);
      for (let k = 0; k < 4; k++) { const d = mk('.d-drops', 'drop', dropSVG('dd' + i + '_' + k)); place(d, 480 + (k - 1.5) * 30, 1040); hide(d); const a = Math.PI * (0.15 + 0.7 * (k / 3)) + (hash(i * 7 + k) - 0.5) * 0.3;
        tw(d, th + 0.01, 0.04, { o: [0, 1] }, 'lin'); idle(d, tt => { if (tt < th) return {}; const u = Math.min(1, (tt - th) / 0.6); return { x: Math.cos(a) * 200 * u, y: -60 * u + 560 * u * u, s: 0.7 + 0.3 * u }; }); tw(d, th + 0.42, 0.14, { o: [1, 0] }, 'lin'); }
    });
    pmouth('.d-ph', W('a1', 1), 0.12, 0.7); tw('.d-ph .kpup', W('a1', 1), 0.15, { y: [0, -8] }, 'out');
    tw('.d-arr', W('a1', 4) - 0.05, 0.06, { o: [0, 1] }, 'lin'); tw('.d-arr', W('a1', 4) - 0.05, 0.5, { y: [-140, 0] }, 'back'); sfx('pop', W('a1', 4), 0.4);
    idle('.d-arr', t => t > W('a1', 5) ? { y: 14 * Math.abs(Math.sin((t - W('a1', 5)) * 7)) } : {});
    mascotPose('.d-m', W('a1', 4), 'point'); }

  // ================= E: step 2 — somewhere dry with a breeze; step 3 — charge no sooner than 30 min; fully dry up to a day =================
  morphCut('#D', '#E', tE, '.d-ph', '.e-ph', 0.6);
  hide('.e-chip'); hide('.e-clock'); hide('.e-n'); hide('.e-cab'); hide('.e-lock');
  $$('.e-wind [class^=wl]').forEach(p => p.style.strokeDashoffset = 100);
  slideIn('.e-chip:not(.e-chip2)', W('a2', 0), 'left', 0.55, 400);
  tw('.e-ph', tE - 0.1, 0.001, { x: [0, 0] });
  mascotPose('.e-m', tE + 0.1, 'point');
  // «туда, где сухо и дует»: breeze lines stream from the window, drops blow off the phone, it squints happily
  for (let k = 0; k < 4; k++) { tw(`.e-wind .wl${k}`, W('a2', 4) - 0.15 + k * 0.08, 0.9, { dash: [100, -100] }, 'lin'); tw(`.e-wind .wl${k}`, W('a2', 4) + 0.75 + k * 0.08, 0.9, { dash: [-100, -300] }, 'lin'); }
  sfx('whoosh', W('a2', 5), 0.5);
  { const [px, py] = ctr('.e-ph'); drip('.e-drops', px - 60, py - 120, W('a2', 5), W('a2', 5) + 1.0, 0.12, 120, 31, 160, 340);
    tw('.e-ph', W('a2', 5), 0.3, { r: [0, 6] }, 'out'); tw('.e-ph', W('a2', 5) + 1.2, 0.4, { r: [6, 0] }, 'inOut');
    tw('.e-ph .keye', W('a2', 5), 0.2, { sy: [1, 0.4] }, 'out'); tw('.e-ph .keye', W('a2', 5) + 1.0, 0.2, { sy: [0.4, 1] }, 'out'); pmouth('.e-ph', W('a2', 5), 0.12, 0.6); }
  mascotPose('.e-m', W('a2', 3), 'cheer');
  // a3 «Заряжать — минимум через 30 минут»: chip swap, clock pops, minute hand sweeps half a turn while the counter runs 0 → 30
  { const t0 = W('a3', 0);
    slideOut('.e-chip:not(.e-chip2)', t0 - 0.1, 'left', 0.3, 300); slideIn('.e-chip2', t0, 'left', 0.55, 400);
    tw('.e-win, .e-wind', t0 - 0.05, 0.3, { o: [1, 0] }, 'in');
    popIn('.e-clock', t0 + 0.05, 0.45); sfx('pop', t0 + 0.05, 0.5);
    tw('.e-cab', t0 + 0.1, 0.06, { o: [0, 1] }, 'lin'); tw('.e-cab', t0 + 0.1, 0.45, { x: [500, 0] }, 'out');
    popIn('.e-lock', W('a3', 1), 0.35); sfx('clink', W('a3', 1), 0.5);
    slideIn('.e-n', W('a3', 2), 'right', 0.5, 200);
    const c0 = W('a3', 2), c1 = W('a3', 4) + 0.15;
    tw('.e-clock .cmin', c0, c1 - c0, { r: [0, 180] }, 'inOut');
    const n = $('.e-n'); custom(t => { if (t < c0 - 0.5 || t > tF + 0.6) return; const v = Math.round(30 * clamp((t - c0) / (c1 - c0))); n.innerHTML = (t < W('a4', 3) - 0.05 ? v + ' <i>МИН</i>' : 'ДО <i>СУТОК</i>'); });
    for (let k = 0; k < 6; k++) sfx('tick', c0 + (c1 - c0) * k / 5, 0.3);
    punch('.e-n', W('a3', 3), 0.14); sfx('ding', c1, 0.5);
    focus('#E > .cam', W('a3', 3), 560, 560, 1.12, 0.45, 0.28, 0.4, 540, 640);
    mascotPose('.e-m', t0, 'think'); mascotPose('.e-m', W('a3', 3), 'pointUp');
    tw('.e-clock .cbell', W('a3', 4), 0.08, { r: [0, 8] }, 'out'); tw('.e-clock .cbell', W('a3', 4) + 0.08, 0.35, { r: [8, 0] }, 'back');
    // a4 «А полностью сохнет до суток»: the hour hand spins two full turns (a whole day), the label flips, the phone yawns
    const h0 = W('a4', 1), h1 = W('a4', 4) + 0.3;
    tw('.e-clock .chand', h0, h1 - h0, { r: [0, 720] }, 'inOut'); tw('.e-clock .cmin', h0, h1 - h0, { r: [180, 180 + 720 * 12 / 6] }, 'inOut'); sfx('riser2', h0, 0.5);
    tw('.e-n', W('a4', 3) - 0.1, 0.1, { sy: [1, 0] }, 'in'); tw('.e-n', W('a4', 3), 0.25, { sy: [0, 1] }, 'back'); sfx('blip', W('a4', 3), 0.4);
    pmouth('.e-ph', W('a4', 2), 0.6, 1); tw('.e-ph .keye', W('a4', 2), 0.25, { sy: [1, 0.3] }, 'out');
    mascotPose('.e-m', W('a4', 1), 'hold'); mascotPose('.e-m', W('a4', 4), 'shrug'); }

  // ================= F: joke — no hair dryer, no cotton swab: it's a phone, not an ear =================
  tDrop('#E', '#F', tF, 0.5);
  hide('.f-dry'); hide('.f-swab'); hide('.f-x1'); hide('.f-x2'); hide('.f-ear');
  mascotPose('.f-m', tF + 0.1, 'hold');
  tw('.f-dry', W('j2a', 0) - 0.1, 0.06, { o: [0, 1] }, 'lin'); tw('.f-dry', W('j2a', 0) - 0.1, 0.45, { y: [-500, 0], r: [-30, -8] }, 'back'); sfx('whoosh', W('j2a', 0) - 0.1, 0.4);
  tw('.f-dry .hdwind', W('j2a', 0) + 0.25, 0.1, { o: [0, 1] }, 'lin'); idle('.f-dry .hdwind', t => (t > W('j2a', 0) + 0.25 && t < W('j2a', 4)) ? { x: -14 * Math.abs(Math.sin(t * 22)) } : {});
  tw('.f-dry .hdwind', W('j2a', 4) + 0.05, 0.1, { o: [1, 0] }, 'lin'); sfx('buzz', W('j2a', 0) + 0.25, 0.25);
  tw('.f-swab', W('j2a', 2) - 0.1, 0.06, { o: [0, 1] }, 'lin'); tw('.f-swab', W('j2a', 2) - 0.1, 0.45, { y: [400, 0], r: [40, -12] }, 'back'); sfx('pop', W('j2a', 2), 0.4);
  tw('.f-ph .kpup', W('j2a', 0), 0.2, { x: [0, 10] }, 'out'); pmouth('.f-ph', W('j2a', 1), 0.12, 1); parm('.f-ph', W('j2a', 1), 0, -140, 0.3); parm('.f-ph', W('j2a', 1), 0, 140, 0.3, '.karmL');
  tw('.f-ph', W('j2a', 1), 0.3, { x: [0, -30], r: [0, -6] }, 'out');
  popIn('.f-x1', W('j2a', 4), 0.3); tw('.fx1', W('j2a', 4) + 0.06, 0.22, { dash: [100, 0] }, 'out');
  popIn('.f-x2', W('j2a', 4) + 0.12, 0.3); tw('.fx2', W('j2a', 4) + 0.18, 0.22, { dash: [100, 0] }, 'out'); sfx('buzz', W('j2a', 4), 0.6);
  mascotPose('.f-m', W('j2a', 4), 'sad');
  { const tE2 = W('j2', 0) - 0.1;       // «Это телефон, а не ухо»: a giant ear slides in, the swab flies into it, eardrum pulse
    tw('.f-dry, .f-x1, .f-x2', tE2, 0.3, { o: [1, 0] }, 'in');
    tw('.f-ear', tE2, 0.06, { o: [0, 1] }, 'lin'); tw('.f-ear', tE2, 0.55, { x: [700, 0] }, 'out'); sfx('whoosh', tE2, 0.5);
    const [sx, sy] = ctr('.f-swab'), ex = 470 + 860 * 480 / 900, ey = 460 + 669 * 378 / 700;
    arc('.f-swab', W('j2', 4) - 0.35, 0.4, ex - sx - 40, ey - sy, 140, 12);
    tw('.f-ear .eardrum', W('j2', 4) + 0.08, 0.1, { sx: [1, 1.4] }, 'out'); tw('.f-ear .eardrum', W('j2', 4) + 0.18, 0.3, { sx: [1.4, 1] }, 'back'); sfx('pop', W('j2', 4) + 0.05, 0.6);
    mascotPose('.f-m', W('j2', 1), 'pointL'); mascotPose('.f-m', W('j2', 4), 'cheer'); jump('.f-m', W('j2', 4) + 0.05, 50, 0.4, '.f-shd2');
    pmouth('.f-ph', W('j2', 1), 1, 0.4); parm('.f-ph', W('j2', 1), -140, -40, 0.3); parm('.f-ph', W('j2', 1), 140, 40, 0.3, '.karmL'); tw('.f-ph', W('j2', 1), 0.3, { x: [-30, 0], r: [-6, 0] }, 'out');
    focus('#F > .cam', W('j2', 4) - 0.1, 700, 800, 1.1, 0.55); }

  // ================= G: reality — Apple writes plainly: don't put the iPhone in rice; crumbs can damage it =================
  tSlideUp('#F', '#G', tG, 0.55);
  hide('.g-chip'); hide('.g-src'); hide('.g-q'); hide('.g-port'); hide('.g-x'); hide('.g-bowl'); hide('.g-man'); hide('.g-shd1');
  slideIn('.g-chip', W('r1', 0), 'left', 0.55, 400); sfx('whoosh', W('r1', 0), 0.4);
  popIn('.g-bowl', W('r1', 1) - 0.05, 0.4); tw('.g-shd1', W('r1', 1), 0.3, { o: [0, 1] }, 'lin'); sfx('pop', W('r1', 1), 0.5);
  mascotPose('.g-m', W('r1', 1), 'think');
  tw('.g-man', W('r1', 2) - 0.1, 0.06, { o: [0, 1] }, 'lin'); tw('.g-man', W('r1', 2) - 0.1, 0.45, { y: [-500, 0], r: [-8, 2] }, 'back');
  for (let k = 0; k < 6; k++) tw(`.g-man .mline${k}`, W('r1', 3) + k * 0.06, 0.2, { dash: [100, 0] }, 'out');
  slideIn('.g-src', W('r1', 3), 'left', 0.55, 500);
  // «не клади айфон в рис»: the quote panel slides in from the right, the red underline is drawn
  slideOut('.g-src', W('r1', 5) - 0.2, 'left', 0.3, 400); tw('.g-q', W('r1', 5) - 0.08, 0.6, { x: [0, -1040], o: [0, 1] }, 'expo'); sfx('whoosh', W('r1', 5) - 0.08, 0.5);
  tw('.g-man .mmark', W('r1', 6), 0.35, { dash: [100, 0] }, 'out');
  punch('.g-q', W('r1', 9), 0.08); sfx('slam', W('r1', 9), 0.5); shake(W('r1', 9) + 0.05, 0.2, 10);
  mascotPose('.g-m', W('r1', 5), 'shock'); jump('.g-m', W('r1', 5) + 0.05, 50, 0.4, '.g-shd2');
  focus('#G > .cam', W('r1', 6), 540, 420, 1.12, 0.6, 0.28, 0.4, 540, 520);
  // r2 «Крошки риса сами могут его повредить»: the booklet leaves, the port macro arrives, grains arc into it and jam it
  { const t0 = W('r2', 0) - 0.15;
    tw('.g-man', t0, 0.3, { o: [1, 0], y: [0, -200] }, 'in'); tw('.g-q', t0, 0.3, { o: [1, 0] }, 'in');
    tw('.g-port', t0 + 0.05, 0.06, { o: [0, 1] }, 'lin'); tw('.g-port', t0 + 0.05, 0.45, { s: [0.4, 1], x: [300, 0] }, 'out'); sfx('whoosh', t0, 0.4);
    const [bx, by] = ctr('.g-bowl'), [qx, qy] = ctr('.g-port');
    for (let k = 0; k < 12; k++) { const g = mk('.g-fx', 'grain'); const x0 = bx - 60 + (hash(k) - 0.5) * 200, y0 = by - 120; place(g, x0, y0); hide(g);
      const t = W('r2', 1) + k * 0.06; tw(g, t, 0.05, { o: [0, 1] }, 'lin'); arc(g, t, 0.5, qx - x0 + (hash(k * 5) - 0.5) * 380, qy - y0 + (hash(k * 7) - 0.5) * 120, 200 + 80 * hash(k + 2), 360); tw(g, t + 0.47, 0.06, { o: [1, 0] }, 'lin'); if (k % 3 === 0) sfx('tick', t + 0.5, 0.35); }
    tw('.g-bowl .rmound', W('r2', 1), 0.12, { sy: [1, 0.92] }, 'out'); tw('.g-bowl .rmound', W('r2', 1) + 0.12, 0.3, { sy: [0.92, 1] }, 'back');
    tw('.g-port .pcrumb', W('r2', 3), 0.4, { o: [0, 1] }, 'out');
    for (let k = 0; k < 8; k++) tw(`.g-port .pin${k}`, W('r2', 5) + k * 0.03, 0.2, { o: [1, 0.35] }, 'lin');
    popIn('.g-x', W('r2', 5) + 0.05, 0.3); tw('.gxp', W('r2', 5) + 0.12, 0.22, { dash: [100, 0] }, 'out'); sfx('glitch', W('r2', 5), 0.6); shake(W('r2', 5) + 0.1, 0.25, 12);
    mascotPose('.g-m', W('r2', 0), 'pointL'); mascotPose('.g-m', W('r2', 5), 'facepalm'); }

  // ================= H: joke — you get not a dry phone but an «iPhone roll» =================
  morphCut('#G', '#H', tH, '.g-bowl', '.h-roll', 0.62, 180);
  hide('.h-lab');
  for (let k = 0; k < 3; k++) idle(`.h-bg .slant${k}`, t => ({ r: 4 * Math.sin(W2 * 30 * t + k * 1.3) }));
  mascotPose('.h-m', tH + 0.15, 'facepalm');
  tw('.h-roll .smouth', W('j1', 2), 0.3, { sy: [1, -1] }, 'back'); tw('.h-roll .seye', W('j1', 3), 0.12, { sy: [1, 0.2] }, 'out'); tw('.h-roll .seye', W('j1', 3) + 0.12, 0.2, { sy: [0.2, 1] }, 'out');
  tw('.h-roll .schop', W('j1', 4), 0.3, { r: [0, -16], y: [0, 30] }, 'back'); tw('.h-roll .schop', W('j1', 5) + 0.3, 0.3, { r: [-16, 0], y: [30, 0] }, 'out'); sfx('clink', W('j1', 4) + 0.2, 0.5);
  tw('.h-lab', W('j1', 5) - 0.05, 0.6, { x: [0, -900], o: [0, 1] }, 'expo'); sfx('whoosh', W('j1', 5) - 0.05, 0.5);
  punch('.h-lab', W('j1', 6) + 0.05, 0.1); sfx('ding', W('j1', 6) + 0.05, 0.5);
  burst('.h-fx', 14, 540, 820, W('j1', 6) + 0.1, 300, 41, 'spark');
  mascotPose('.h-m', W('j1', 5), 'shrug');
  focus('#H > .cam', W('j1', 5), 540, 820, 1.14, 0.5);

  // ================= I: «Рис спасает телефон? Байт.» — stamp; takeaway «не в рис, а разъёмом вниз — и на воздух»; loop =================
  tZoom('#H', '#I', tI, 0.5);
  hide('.i-st'); hide('.i-src'); hide('.i-t'); hide('.i-x');
  $$('.i-wind [class^=iwl]').forEach(p => p.style.strokeDashoffset = 100);
  slideIn('.i-t', W('v1', 0), 'up', 0.5, 140); punch('.i-t', W('v1', 1), 0.08); sfx('tick', W('v1', 1), 0.4);
  mascotPose('.i-m', W('v1', 0), 'think');
  const tSt = W('v1', 3) - 0.02;
  tw('.i-t', tSt - 0.3, 0.25, { o: [1, 0], y: [0, -60] }, 'in');
  mascotPose('.i-m', tSt - 0.5, 'pointUp'); tw('.i-m', tSt - 0.45, 0.25, { y: [0, -90] }, 'out'); tw('.i-m', tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose('.i-m', tSt - 0.18, 'point', 0.18);
  stamp('.i-st', tSt, -7, 26); burst('.i-fx', 22, 540, 340, tSt + 0.05, 420, 61, 'conf', 140);
  slideIn('.i-src', tSt + 0.35, 'left', 0.6, 500);
  // takeaway: the bowl gets a red cross and slides away; the phone hops in, taps port-down (drops), the breeze dries it
  popIn('.i-x', W('m1', 2) - 0.05, 0.3); tw('.ixp', W('m1', 2) + 0.02, 0.22, { dash: [100, 0] }, 'out'); sfx('buzz', W('m1', 2), 0.4);
  tw('.i-bowl, .i-x', W('m1', 3), 0.4, { x: [0, -520], o: [1, 0] }, 'in');
  tw('.i-ph', W('m1', 3) - 0.1, 0.35, { y: [0, -40] }, 'out'); pmouth('.i-ph', W('v1', 3), 0.12, 0.8); tw('.i-ph .kpup', W('v1', 0), 0.2, { x: [0, -8] }, 'out');
  { const th = W('m1', 5) - 0.05; tw('.i-ph', th - 0.12, 0.12, { y: [-40, 0] }, 'in'); tw('.i-ph', th, 0.06, { sy: [1, 0.93] }, 'out'); tw('.i-ph', th + 0.06, 0.2, { sy: [0.93, 1] }, 'back'); sfx('thud', th, 0.5);
    const [px, py] = ctr('.i-ph'); drip('.i-drops', px, py + 200, th, th + 0.4, 0.08, 160, 51, 90); }
  for (let k = 0; k < 4; k++) tw(`.i-wind .iwl${k}`, W('m1', 6) + k * 0.06, 1.2, { dash: [100, -100] }, 'lin');
  sfx('whoosh', W('m1', 6), 0.4);
  mascotPose('.i-m', W('m1', 0), 'pointL'); mascotPose('.i-m', W('m1', 5), 'cheer');
  tw('#I .i-st, #I .i-src, #I .conf, #I .i-wind, #I .shd, #I .drop', tLoop - 0.4, 0.35, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw('#I .i-m, #I .i-ph', tLoop + 0.42, 0.001, { o: [1, 0] });
}, { chunks: {} });
