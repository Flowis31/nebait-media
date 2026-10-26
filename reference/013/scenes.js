// 013 «13 нейронок бросили одних на острове» — Новость. arXiv 2610.07130 (MIT), TechCrunch 22.10.2026. Короткий тест: 70 слов.
boot(() => {
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
  const clamp = x => Math.max(0, Math.min(1, x));
  const place = (el, x, y, w, h) => { el.style.left = x + 'px'; el.style.top = y + 'px'; if (w) el.style.width = w + 'px'; if (h) el.style.height = h + 'px'; return el; };
  const easeO = x => 1 - Math.pow(1 - clamp(x), 3), easeIO = x => (x = clamp(x), x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const bot = (par, k, x, y, w = 72, id = '') => { const b = mk(par, 'bot', botSVG(id + k, BOTC[k % BOTC.length])); place(b, x, y, w, w * 94 / 72); return b; };
  const shd = (par, cx, cy, w) => { const s = mk(par, 'shd'); place(s, cx - w / 2, cy - w * 0.11, w, w * 0.22); return s; };
  // jump with anticipation, stretch in the air and squash on landing (all >= 0.3 s moves glide via SMOOTH)
  const jump = (el, t, h = 80, d = 0.5, sh = null) => {
    tw(el, t - 0.12, 0.12, { sy: [1, 0.86], sx: [1, 1.08] }, 'out');
    tw(el, t, d / 2, { y: [0, -h], sy: [0.86, 1.08], sx: [1.08, 0.95] }, 'out');
    tw(el, t + d / 2, d / 2, { y: [-h, 0], sy: [1.08, 1], sx: [0.95, 1] }, 'in');
    tw(el, t + d, 0.08, { sy: [1, 0.88], sx: [1, 1.1] }, 'out'); tw(el, t + d + 0.08, 0.3, { sy: [0.88, 1], sx: [1.1, 1] }, 'back');
    if (sh) { tw(sh, t, d / 2, { s: [1, 0.55], o: [1, 0.5] }, 'out'); tw(sh, t + d / 2, d / 2, { s: [0.55, 1], o: [0.5, 1] }, 'in'); }
  };
  // quadratic arc driven per frame: el centre goes p0 -> p2 through control p1 between t0 and t0+d; spin in degrees
  const ARCS = [];
  const arc = (el, t0, d, p0, p1, p2, spin = 0, w = 0, h = 0, keep = true) => ARCS.push({ el, t0, d, p0, p1, p2, spin, w, h, keep });
  custom(t => {
    const last = new Map();
    for (const a of ARCS) { if (t >= a.t0) last.set(a.el, a); else if (!last.has(a.el)) last.set(a.el, null); }
    last.forEach((a, el) => {
      if (!a) return;
      const u = clamp((t - a.t0) / a.d), q = 1 - u;
      const x = q * q * a.p0[0] + 2 * q * u * a.p1[0] + u * u * a.p2[0], y = q * q * a.p0[1] + 2 * q * u * a.p1[1] + u * u * a.p2[1];
      el.style.transform = `translate(${(x - a.w / 2).toFixed(1)}px,${(y - a.h / 2).toFixed(1)}px) rotate(${(a.spin * u).toFixed(1)}deg)`;
    });
  });
  const burst = (par, n, x, y, t, dist = 220, seed = 0, cls = 'spark') => {
    const cols = ['#ff5a6e', '#ffe14d', '#3dd6ff', '#b8ff3d', '#c58bff'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 14, y - 14); const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin'); tw(s, t, 0.7, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + (cls === 'conf' ? 120 : 0)], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.5, 0.25, { o: [1, 0] }, 'lin'); } };
  const sv1 = (vb, body) => `<svg viewBox="${vb}" style="overflow:visible;left:0;top:0;width:100%;height:100%">${body}</svg>`;

  // ---------- background: clouds, stars, parallax ----------
  [[80, 160, 220], [620, 90, 260], [1180, 240, 200], [1560, 120, 240], [1960, 200, 220]].forEach(([x, y, w]) => place(mk('#clouds', 'cloud'), x, y, w));
  for (let k = 0; k < 40; k++) place(mk('#stars', 'star'), 1080 * hash(k + 1), 900 * hash(k + 51));
  $('#vig').style.background = 'radial-gradient(90% 62% at 50% 46%,transparent 58%,rgba(0,0,0,.42) 100%)';

  // ---------- build ----------
  const AB = [[150, 830], [255, 818], [360, 810], [465, 806], [570, 810], [675, 818], [780, 830], [200, 880], [305, 872], [410, 866], [515, 866], [620, 872], [725, 880]];
  const buildA = sc => {
    $(sc + ' .a-is').innerHTML = islandSVG(sc.slice(1)); $(sc + ' .a-boat').innerHTML = boatSVG();
    const bs = $(sc + ' .a-bots'); AB.forEach(([x, y], k) => { shd(bs, x + 44, y + 112, 84); bot(bs, k, x, y, 88, sc.slice(1)); });
  };
  buildA('#A');
  $('#A2').innerHTML = $('#A').innerHTML; ['.a-is', '.a-boat', '.a-bots'].forEach(c => $('#A2 ' + c).innerHTML = ''); buildA('#A2');
  // B
  $('.b-bot').innerHTML = botSVG('B', '#3dd6ff');
  $('.b-chip').innerHTML = sv1('0 0 280 200', `<defs><radialGradient id="chg" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="#e6c9ff"/><stop offset="1" stop-color="#8a4dff"/></radialGradient></defs>
    ${[40, 80, 120, 160, 200, 240].map(x => `<path d="M${x} 20 L${x} 0 M${x} 180 L${x} 200" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>`).join('')}
    <rect x="16" y="18" width="248" height="164" rx="30" fill="#2a1a4a" stroke="${INK}" stroke-width="10"/>
    <circle class="core" style="transform-origin:140px 100px" cx="140" cy="100" r="46" fill="url(#chg)" stroke="${INK}" stroke-width="8"/>
    <path d="M60 60 L100 60 L110 80 M60 140 L100 140 L110 120 M220 60 L180 60 L170 80 M220 140 L180 140 L170 120" fill="none" stroke="#c58bff" stroke-width="7" stroke-linecap="round"/>`);
  const BW = [[540, 430, 540, 560], [480, 425, 380, 960], [600, 425, 700, 960]];
  $('.b-ln').innerHTML = sv1('0 0 1080 1300', BW.map(([x0, y0, x1, y1], k) => `<path class="draw bw${k}" d="M${x0} ${y0} Q${(x0 + x1) / 2 + (k - 1) * 60} ${(y0 + y1) / 2} ${x1} ${y1}" fill="none" stroke="#c58bff" stroke-width="8" stroke-linecap="round" pathLength="100" style="filter:drop-shadow(0 0 8px #c58bff)"/>`).join(''));
  const BC = []; for (let k = 0; k < 9; k++) { const c = mk('.b-cubes', 'cube', cubeSVG(['#7ed957', '#5cc945', '#8be36a'][k % 3])); place(c, -20 + k * 125, 1040, 140, 140); BC.push(c); }
  [[90, 520, '#ffb03d'], [850, 470, '#ff5a6e'], [880, 760, '#c58bff']].forEach(([x, y, c]) => { const e = mk('.b-cubes', 'cube', cubeSVG(c)); place(e, x, y, 120, 120); BC.push(e); });
  $('.b-bin').innerHTML = binocSVG();
  // C
  $('.c-clip').innerHTML = clipSVG(); $('.c-clk').innerHTML = clockSVG('c');
  $('.c-x').innerHTML = sv1('0 0 300 300', `<path class="draw" d="M30 30 L270 270" stroke="#ff3b5c" stroke-width="34" stroke-linecap="round" pathLength="100"/><path class="draw" d="M270 30 L30 270" stroke="#ff3b5c" stroke-width="34" stroke-linecap="round" pathLength="100"/>`);
  $$('.c-x path').forEach(p => { p.style.strokeDasharray = 100; });
  // D / E: island close-up with big bots
  $('.d-is').innerHTML = islandSVG('d'); $('.e-is').innerHTML = islandSVG('e');
  const DX = [40, 230, 420, 610]; const DB = DX.map((x, k) => { const s = shd('.d-bots', x + 65, 1004, 120); const b = bot('.d-bots', [0, 2, 3, 4][k], x, 834, 130, 'd'); return { b, s }; });
  const EB1 = bot('.e-bots', 1, 120, 834, 130, 'e'), EB2 = bot('.e-bots', 2, 460, 834, 130, 'e');
  shd('.e-bots', 185, 1004, 120); shd('.e-bots', 525, 1004, 120);
  $('.e-bots').insertBefore($$('.e-bots .shd')[0], EB1); $('.e-bots').insertBefore($$('.e-bots .shd')[1], EB1);
  $('.e-ring').innerHTML = ringSVG();
  const ET = []; [[-30, 5], [270, 4]].forEach(([x, n], ti) => { for (let k = 0; k < n; k++) { const c = mk('.e-cubes', 'cube', cubeSVG(BOTC[(k + ti * 3) % 13])); place(c, x, 900 - k * 88, 120, 120); ET.push({ c, ti, k }); } });
  const EF = [0, 1].map(k => { const c = mk('.e-fly', 'cube', cubeSVG(['#ffe14d', '#ff5a6e'][k])); place(c, 0, 0, 90, 90); return c; });
  $('.e-ring').parentNode.appendChild($('.e-ring'));          // ring above the flying cubes
  // F
  $('.f-is').innerHTML = islandSVG('f'); place($('.f-bot'), 300, 740, 150, 196); $('.f-bot').innerHTML = botSVG('F', '#ffb03d');
  $('.f-ring').innerHTML = ringSVG();
  const HEART = []; for (let k = 0; k < 20; k++) { const a = k / 20 * Math.PI * 2, x = 16 * Math.pow(Math.sin(a), 3), y = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)); HEART.push([330 + x * 9, 1075 + y * 9]); }
  const FR = HEART.map((p, k) => { const r = mk('.f-heart', '', rockSVG(k)); place(r, 0, 0, 50, 40); return r; });
  const FD = []; for (let k = 0; k < 10; k++) { const d = mk('.f-sp', 'drop'); place(d, 990 - 13, 1130 - 17); FD.push(d); }
  const tear = mk('#F .cam', 'drop'); place(tear, 75, 1222); tear.style.width = '18px'; tear.style.height = '24px';
  // G
  const GB = []; for (let k = 0; k < 13; k++) { const row = k < 7 ? 0 : 1, i = row ? k - 7 : k; const x = (row ? 140 : 80) + i * 135, y = row ? 610 : 470; const g = mk('.g-bots', ''); place(g, x - 10, y - 10, 110, 137); g.style.cssText += ';border-radius:30px;background:radial-gradient(closest-side,rgba(255,225,77,.9),rgba(255,225,77,0))'; GB.push({ b: bot('.g-bots', k, x, y, 90, 'g'), g }); }
  const LANE = 1010;
  $('.g-ln').innerHTML = sv1('0 0 1080 1300', `<path class="lane" d="M40 ${LANE} L1040 ${LANE}" stroke="#ffe6a8" stroke-width="16" stroke-linecap="round"/>
    ${[200, 400, 600, 800, 1000].map(x => `<path class="tick" d="M${x} ${LANE - 18} L${x} ${LANE + 18}" stroke="#ffe6a8" stroke-width="8" stroke-linecap="round"/>`).join('')}
    <path class="draw g1" d="M190 880 Q300 640 430 ${LANE - 30}" fill="none" stroke="#fff" stroke-width="10" stroke-dasharray="4 18" stroke-linecap="round" pathLength="100"/>
    <path class="draw g2" d="M190 700 Q560 330 930 ${LANE - 30}" fill="none" stroke="#ffe14d" stroke-width="12" stroke-linecap="round" pathLength="100" style="filter:drop-shadow(0 0 10px #ffe14d)"/>
    <g class="fl1"><path d="M430 ${LANE} L430 ${LANE - 90}" stroke="${INK}" stroke-width="8"/><path d="M430 ${LANE - 90} L480 ${LANE - 72} L430 ${LANE - 54} Z" fill="#fff" stroke="${INK}" stroke-width="6"/></g>
    <g class="fl2"><path d="M930 ${LANE} L930 ${LANE - 110}" stroke="${INK}" stroke-width="8"/><path d="M930 ${LANE - 110} L990 ${LANE - 88} L930 ${LANE - 66} Z" fill="#ffe14d" stroke="${INK}" stroke-width="6"/></g>`);
  $$('.g-ln path.draw').forEach(p => p.style.strokeDasharray = p.classList.contains('g1') ? '4 18' : '100');
  const GT = bot('.g-th', 7, 120, LANE - 175, 130, 'gt'); const GTS = shd('.g-th', 185, LANE, 120); $('.g-th').insertBefore(GTS, GT);
  const GC = [0, 1].map(k => { const c = mk('.g-th', 'cube', cubeSVG(['#ffffff', '#ffe14d'][k])); place(c, 0, 0, 70, 70); return c; });
  // H
  $('.h-book').innerHTML = bookSVG();
  const HI = mk('.h-fly', 'cube', cubeSVG('#ffe14d')); place(HI, 0, 0, 100, 100);
  // I
  $('.i-is').innerHTML = islandSVG('i');
  const IB = AB.map(([x, y], k) => { shd('.i-bots', x + 44, y + 112, 84); return bot('.i-bots', k, x, y, 88, 'i'); });
  // mascots
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  mascotLife();

  // ---------- cuts, camera ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('s1'), tC = cut('s2'), tD = cut('s3'), tE = cut('s4'), tF = cut('j1'), tG = cut('s5'), tH = cut('s6'), tI = cut('v1'), tLoop = L('out').t1 - 0.62;
  const CUTS = [0, tB, tC, tD, tE, tF, tG, tH, tI];
  sceneCuts(['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I'], CUTS);
  // slow camera push inside every scene (the scene element itself belongs to the transitions)
  ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I'].forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < 8 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  // parallax: the world pans right at every cut; far layers move less
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 300 * easeIO((t - c + 0.35) / 0.7); }); x -= 2400 * easeIO((t - tLoop) / 0.5); return x; };
  custom(t => {
    const x = camX(t);
    $('#clouds').style.transform = `translate(${(-x * 0.25 + 30 * Math.sin(W2 * t)).toFixed(1)}px,0)`;
    $('#waves').style.transform = `translate(${((-x * 0.7 - t * 22) % 120).toFixed(1)}px,${(4 * Math.sin(W2 * 9 * t)).toFixed(1)}px)`;
    $('#waves2').style.transform = `translate(${((-x * 1.1 + t * 30) % 170).toFixed(1)}px,${(5 * Math.sin(W2 * 7 * t + 1)).toFixed(1)}px)`;
    $('#sun').style.transform = `translate(${(-x * 0.06).toFixed(1)}px,0)`;
  });
  $$('.m').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2')) idle(m, t => ({ y: 7 * Math.sin(W2 * 16 * t + i), r: 1.6 * Math.sin(W2 * 8 * t + i) })); });
  idle('.palm', t => ({ r: 2.5 * Math.sin(W2 * 6 * t) }));

  // ---------- A: hook — 13 bots on the island, the mascot rows away ----------
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  for (const sc of ['#A', '#A2']) {
    tw(sc + ' .a-m .armR', 0, 0.001, { r: [-40, -40] }); tw(sc + ' .a-m .pup', 0, 0.001, { x: [-8, -8], y: [-2, -2] });
    idle(sc + ' .a-boat, ' + sc + ' .a-m', t => ({ y: 8 * Math.sin(W2 * 12 * t), r: 1.5 * Math.sin(W2 * 6 * t) }));
    $$(sc + ' .a-bots .bot').forEach((b, k) => idle(b, t => ({ y: -4 * Math.abs(Math.sin(W2 * 14 * t + k)) })));
  }
  punch('#A .a-13', wt('hook', 0), 0.18); sfx('pop', wt('hook', 0) + 0.05, 0.6);
  $$('#A .a-bots .bot').forEach((b, k) => jump(b, 0.35 + k * 0.045, 34, 0.4));
  punch('#A .a-t', wt('hook', 1), 0.06);
  const tRow = wt('hook', 2);
  tw('#A .a-boat, #A .a-m', tRow, 1.5, { x: [0, 100] }, 'inOut'); sfx('whoosh', tRow, 0.4);
  for (let k = 0; k < 3; k++) { tw('#A .a-boat .oar', tRow + k * 0.5, 0.25, { r: [0, -26] }, 'inOut'); tw('#A .a-boat .oar', tRow + k * 0.5 + 0.25, 0.25, { r: [-26, 0] }, 'inOut'); }
  tw('#A .a-m .armR', tRow, 0.3, { r: [-40, -150] }, 'back');
  for (let k = 0; k < 3; k++) { tw('#A .a-m .armR', tRow + 0.3 + k * 0.3, 0.15, { r: [-150, -120] }, 'inOut'); tw('#A .a-m .armR', tRow + 0.45 + k * 0.3, 0.15, { r: [-120, -150] }, 'inOut'); }
  tw('#A .a-bots .bEye', tRow, 0.3, { x: [0, 8] }, 'out');
  tw('#A .a-bots .bHead', wt('hook', 3), 0.35, { r: [0, 8] }, 'back'); tw('#A .a-bots .bEye', wt('hook', 3), 0.25, { sy: [1, 0.45] }, 'out');
  punch('#A .a-is', wt('hook', 5), 0.04);

  // ---------- B: each one drives a little body in a game made of cubes ----------
  tZoom('#A', '#B', tB);
  hide('.b-chip'); hide('.b-lbl'); BC.forEach(c => hide(c)); hide('.b-bot');
  tw('.b-ln path', tB, 0.001, { dash: [100, 100] });
  tw('.b-bot', tB + 0.05, 0.12, { o: [0, 1] }, 'lin'); tw('.b-bot', tB + 0.05, 0.5, { y: [160, 0], sy: [0.7, 1] }, 'back'); sfx('pop', tB + 0.1, 0.8);
  tw('.b-m .armL', tB, 0.001, { r: [100, 100] }); tw('.b-m .armR', tB, 0.001, { r: [-100, -100] });
  popIn('.b-chip', wt('s1', 0) - 0.05, 0.4, 0.3); sfx('blip', wt('s1', 0), 0.7);
  idle('.b-chip', t => t > tB ? { y: 10 * Math.sin((t - tB) * 4) } : {});
  idle('.b-chip .core', t => t > tB ? { s: 1 + 0.08 * Math.sin((t - tB) * 9) } : {});
  ['.bw0', '.bw1', '.bw2'].forEach((c, k) => tw('.b-ln ' + c, wt('s1', 1) + k * 0.08, 0.4, { dash: [100, 0] }, 'inOut')); sfx('zap', wt('s1', 1), 0.6);
  // puppet moves on «человечком»
  const tP = wt('s1', 2);
  tw('.b-bot .bArmL', tP, 0.3, { r: [0, 60] }, 'back'); tw('.b-bot .bArmR', tP + 0.15, 0.3, { r: [0, -60] }, 'back');
  tw('.b-bot .bArmL', tP + 0.45, 0.3, { r: [60, -10] }, 'inOut'); tw('.b-bot .bArmR', tP + 0.55, 0.3, { r: [-60, 10] }, 'inOut');
  tw('.b-bot .bLegL', tP + 0.1, 0.25, { r: [0, 18] }, 'inOut'); tw('.b-bot .bLegL', tP + 0.35, 0.3, { r: [18, 0] }, 'inOut');
  tw('.b-bot .bHead', tP, 0.3, { r: [0, -10] }, 'back'); tw('.b-bot .bHead', tP + 0.4, 0.3, { r: [-10, 6] }, 'inOut');
  // the cube world appears in a wave
  const tCu = wt('s1', 4);
  BC.forEach((c, k) => { const t = tCu + (k < 9 ? k * 0.05 : 0.3 + (k - 9) * 0.1); tw(c, t, 0.06, { o: [0, 1] }, 'lin'); tw(c, t, 0.4, { y: [k < 9 ? 120 : -160, 0], s: [0.5, 1] }, 'back'); if (k % 3 === 0) sfx('tick', t, 0.6); });
  BC.slice(9).forEach((c, k) => idle(c, t => t > tCu + 0.6 ? { y: 12 * Math.sin((t - tCu) * 3 + k), r: 6 * Math.sin((t - tCu) * 2 + k) } : {}));
  slideIn('.b-lbl', wt('s1', 4) - 0.05, 'left', 0.6, 300);
  jump('.b-bot', wt('s1', 6), 60, 0.45); sfx('pop', wt('s1', 6) + 0.45, 0.6);
  tw('.b-m .pup', wt('s1', 6), 0.25, { x: [0, 6], y: [0, -6] }, 'out');

  // ---------- C: no task, thirty hours ----------
  tWhip('#B', '#C', tC, 0.46, 1);
  hide('.c-x path'); hide('.c-clk'); hide('.c-n'); hide('.c-u');
  slideIn('.c-clip', tC + 0.05, 'left', 0.6, 400); sfx('whoosh', tC + 0.05, 0.5);
  $$('.c-x path').forEach((p, k) => { tw(p, wt('s2', 1) + k * 0.16, 0.001, { o: [0, 1] }); tw(p, wt('s2', 1) + k * 0.16, 0.25, { dash: [100, 0] }, 'in'); sfx('thud', wt('s2', 1) + k * 0.16 + 0.22, 0.6); });
  shake(wt('s2', 1) + 0.45, 0.25, 14);
  tw('.c-m .mouth', wt('s2', 0), 0.3, { sx: [1, 0.6], sy: [1, -0.6] }, 'back'); tw('.c-m .brL', wt('s2', 0), 0.25, { y: [0, -12], r: [0, 10] }, 'out');
  tw('.c-m .armR', wt('s2', 0), 0.3, { r: [0, -70] }, 'back');
  slideIn('.c-clk', wt('s2', 1) + 0.2, 'right', 0.55, 400); sfx('whoosh', wt('s2', 1) + 0.2, 0.4);
  const t30 = wt('s2', 2) - 0.15, d30 = L('s2').t1 + 0.25 - t30;
  slideIn('.c-n', t30 - 0.1, 'down', 0.4, 120); slideIn('.c-u', t30 + 0.05, 'down', 0.4, 120);
  custom(t => { $('.c-n').textContent = Math.round(30 * easeO((t - t30) / d30)); });
  tw('.c-clk .hM', t30, d30, { r: [0, 360 * 12] }, 'inOut'); tw('.c-clk .hH', t30, d30, { r: [0, 360] }, 'inOut');
  for (let k = 0; k < 8; k++) sfx('tick', t30 + k * d30 / 8, 0.5);
  punch('.c-n', L('s2').t1, 0.12); sfx('ding', L('s2').t1, 0.6);
  // day / night twice while the hours run
  const dn = t => { const u = clamp((t - t30) / d30); return u > 0 && u < 1 ? Math.pow(Math.sin(u * Math.PI * 2), 2) : 0; };
  custom(t => { const v = dn(t); $('#night').style.opacity = (0.85 * v).toFixed(3); $('#stars').style.opacity = v.toFixed(3); $('#moon').style.opacity = v.toFixed(3); $('#sun').style.opacity = (1 - v).toFixed(3); });
  tw('.c-m .lid', t30 + 0.2, 0.3, { sy: [0, 0.55] }, 'out'); tw('.c-m .lid', L('s2').t1 + 0.1, 0.2, { sy: [0.55, 0] }, 'out');
  tw('.c-m', t30 + 0.2, 0.5, { r: [0, -8], y: [0, 20] }, 'inOut');
  tw('.c-m .mouth', t30, 0.3, { sx: [0.6, 1.2], sy: [-0.6, 1.6] }, 'back');

  // ---------- D: and they started to play ----------
  tCircle('#C', '#D', tD, 540, 800);
  hide('.d-word');
  DB.forEach(({ b }) => { tw($('.bEye', b), tD, 0.001, { sy: [0.5, 0.5] }); });
  const tPl = wt('s3', 2);
  DB.forEach(({ b, s }, k) => { const t = tPl + k * 0.09; jump(b, t, 150 + 30 * (k % 2), 0.55, s);
    tw($('.bArmL', b), t, 0.3, { r: [0, 120] }, 'back'); tw($('.bArmR', b), t, 0.3, { r: [0, -120] }, 'back');
    tw($('.bEye', b), t, 0.2, { sy: [0.5, 1.2] }, 'back'); sfx('pop', t + 0.05, 0.6); });
  tw('.d-word', wt('s3', 3) - 0.05, 0.001, { o: [0, 1] }); stamp('.d-word', wt('s3', 3) - 0.05, -4, 18);
  burst('.d-fx', 22, 540, 300, wt('s3', 3), 420, 3, 'conf');
  tw('.d-m', tPl, 0.18, { y: [0, -70] }, 'out'); tw('.d-m', tPl + 0.18, 0.3, { y: [-70, 0] }, 'in');
  tw('.d-m .brL', tPl, 0.2, { y: [0, -16] }, 'out'); tw('.d-m .brR', tPl, 0.2, { y: [0, -16] }, 'out');
  tw('.d-m .mouth', tPl, 0.25, { sx: [1, 0.55], sy: [1, 1.5] }, 'back'); tw('.d-m .armL', tPl, 0.3, { r: [0, 130] }, 'back');
  tw('.d-m .pup', tPl, 0.25, { x: [0, -8], y: [0, -4] }, 'out');

  // ---------- E: towers, and cubes through the ring like basketball ----------
  tSlideUp('#D', '#E', tE);
  ET.forEach(({ c, ti, k }, i) => { const t = wt('s4', 0) + i * 0.11; hide(c); tw(c, t, 0.05, { o: [0, 1] }, 'lin'); tw(c, t, 0.32, { y: [-700, 0] }, 'in'); tw(c, t + 0.32, 0.08, { sy: [1, 0.8] }, 'out'); tw(c, t + 0.4, 0.25, { sy: [0.8, 1] }, 'back'); sfx('clink', t + 0.32, 0.5); });
  tw('.e-m .pup', tE, 0.001, { x: [6, 6], y: [-8, -8] });
  jump(EB1, wt('s4', 1), 60, 0.4);
  hide('.e-pole'); hide('.e-ring'); EF.forEach(c => hide(c));
  slideIn('.e-pole', wt('s4', 2) - 0.35, 'right', 0.45, 300); slideIn('.e-ring', wt('s4', 2) - 0.3, 'right', 0.45, 300); sfx('whoosh', wt('s4', 2) - 0.35, 0.4);
  const throwE = (c, t, good) => {
    tw($('.bArmR', EB2), t - 0.25, 0.2, { r: [0, 50] }, 'out'); tw($('.bArmR', EB2), t - 0.05, 0.12, { r: [50, -150] }, 'in'); tw($('.bArmR', EB2), t + 0.3, 0.3, { r: [-150, 0] }, 'out');
    tw(c, t, 0.05, { o: [0, 1] }, 'lin');
    arc(c, t, 0.55, [560, 900], [690, 230], [810, 540], 400, 90, 90);
    arc(c, t + 0.55, 0.35, [810, 540], [812, 700], [818, 980], 500, 90, 90);
    tw(c, t + 0.85, 0.1, { o: [1, 0] }, 'lin'); sfx('whoosh', t, 0.4);
    if (good) { punch('.e-ring', t + 0.58, 0.12); sfx('coin', t + 0.58, 1); burst('#E .cam', 10, 810, 540, t + 0.58, 180, 5); }
  };
  throwE(EF[0], wt('s4', 3), true); throwE(EF[1], wt('s4', 8) - 0.35, true);
  tw('.e-m', wt('s4', 8) + 0.25, 0.18, { y: [0, -70] }, 'out'); tw('.e-m', wt('s4', 8) + 0.43, 0.3, { y: [-70, 0] }, 'in');
  tw('.e-m .armL', wt('s4', 8) + 0.25, 0.3, { r: [0, 140] }, 'back'); tw('.e-m .armR', wt('s4', 8) + 0.25, 0.3, { r: [0, -140] }, 'back');
  tw('.e-m .pup', wt('s4', 3), 0.3, { x: [6, 8], y: [-8, -8] }, 'out');

  // ---------- F: joke — the ring goes into the ocean, a heart of stones for it ----------
  tWhip('#E', '#F', tF, 0.46, -1);
  FR.forEach(r => hide(r)); FD.forEach(d => hide(d)); hide(tear);
  const tTh = wt('j1', 1) + 0.15;
  tw('.f-bot .bArmR', tF + 0.1, 0.001, { r: [-40, -40] });
  arc($('.f-ring'), 0, 0.01, [430, 872], [430, 872], [430, 872], 0, 150, 90);
  tw('.f-bot .bArmR', tTh - 0.3, 0.25, { r: [-40, 40] }, 'out'); tw('.f-bot .bArmR', tTh - 0.05, 0.15, { r: [40, -160] }, 'in'); tw('.f-bot .bArmR', tTh + 0.3, 0.3, { r: [-160, -20] }, 'out');
  arc($('.f-ring'), tTh, 0.62, [430, 872], [760, 380], [990, 1130], 720, 150, 90); sfx('whoosh', tTh, 0.6);
  const tSpl = tTh + 0.62;
  tw('.f-ring', tSpl, 0.3, { o: [1, 0] }, 'in'); sfx('boom', tSpl, 0.5);
  FD.forEach((d, k) => { const a = -Math.PI * (0.15 + 0.7 * (k / 9)), dd = 120 + 80 * hash(k + 3);
    tw(d, tSpl, 0.05, { o: [0, 1] }, 'lin'); tw(d, tSpl, 0.6, { x: [0, Math.cos(a) * dd], y: [0, Math.sin(a) * dd] }, 'out'); tw(d, tSpl + 0.4, 0.3, { y: [Math.sin(a) * dd, Math.sin(a) * dd + 90], o: [1, 0] }, 'in'); });
  tw('.f-bot .bHead', tSpl, 0.35, { r: [0, 14] }, 'back'); tw('.f-bot .bEye', tSpl, 0.25, { sy: [1, 0.3] }, 'out');
  tw('.f-bot .bArmR', tSpl + 0.1, 0.3, { r: [-20, 30] }, 'out');
  // stones fly in one by one and make a heart
  const tHe = wt('j1', 6) - 0.05;
  FR.forEach((r, k) => { const t = tHe + k * 0.06, [hx, hy] = HEART[k];
    tw(r, t, 0.05, { o: [0, 1] }, 'lin'); arc(r, t, 0.42, [380, 900], [(380 + hx) / 2, Math.min(760, hy - 220)], [hx, hy], 200 + 60 * k, 50, 40); if (k % 2 === 0) sfx('clink', t + 0.42, 0.5); });
  const tDone = tHe + 19 * 0.06 + 0.42;
  tw('.f-heart', tDone, 0.12, { s: [1, 1.08] }, 'out'); tw('.f-heart', tDone + 0.12, 0.35, { s: [1.08, 1] }, 'back');
  $('.f-heart').style.transformOrigin = '330px 1075px';
  burst('.f-sp', 10, 330, 1060, tDone, 220, 7); sfx('ding', tDone, 0.7);
  tw('.f-bot .bHead', tDone, 0.3, { r: [14, 0] }, 'out'); tw('.f-bot .bEye', tDone, 0.25, { sy: [0.3, 1] }, 'back');
  // the mascot wipes a tear
  tw('.f-m .mouth', tSpl, 0.25, { sy: [1, -1] }, 'back'); tw('.f-m .brL', tSpl, 0.25, { y: [0, -10], r: [0, -14] }, 'out'); tw('.f-m .brR', tSpl, 0.25, { y: [0, -10], r: [0, 14] }, 'out');
  tw(tear, tHe + 0.4, 0.05, { o: [0, 1] }, 'lin'); tw(tear, tHe + 0.4, 0.7, { y: [0, 120] }, 'in'); tw(tear, tHe + 1.0, 0.1, { o: [1, 0] }, 'lin');
  tw('.f-m .armL', tHe + 0.8, 0.3, { r: [0, 110] }, 'out'); tw('.f-m .armL', tHe + 1.2, 0.3, { r: [110, 20] }, 'inOut');
  tw('.f-m .mouth', tDone, 0.3, { sy: [-1, 1.1] }, 'back');

  // ---------- G: six of thirteen found a trick — a throw in a jump flies farther ----------
  tDrop('#F', '#G', tG);
  hide('.g-n'); GB.forEach(({ g }) => hide(g)); hide('.g-ln .g1'); hide('.g-ln .g2'); hide('.g-ln .fl1'); hide('.g-ln .fl2'); hide('.g-ln .lane'); hide('.g-ln .tick'); hide('.g-th .bot'); hide(GTS); GC.forEach(c => hide(c));
  GB.forEach(({ b }, k) => { hide(b); const t = tG + 0.05 + k * 0.035; tw(b, t, 0.05, { o: [0, 1] }, 'lin'); tw(b, t, 0.4, { y: [140, 0] }, 'back'); });
  tw('.g-n', wt('s5', 0), 0.001, { o: [0, 1] }); popIn('.g-n', wt('s5', 0), 0.35, 0.4); sfx('pop', wt('s5', 0), 0.8);
  const SIX = [1, 3, 4, 8, 10, 12];
  SIX.forEach((k, i) => { const t = wt('s5', 2) + i * 0.08; tw(GB[k].g, t, 0.2, { o: [0, 1], s: [0.5, 1] }, 'back'); jump(GB[k].b, t, 50, 0.4); sfx('blip', t, 0.45); });
  GB.forEach(({ b }, k) => { if (!SIX.includes(k)) tw(b, wt('s5', 2), 0.3, { o: [1, 0.35] }, 'lin'); });
  // the lane: bots step back, the demonstration slides in
  const tLn = wt('s5', 4) - 0.1;
  tw('.g-bots', tLn, 0.35, { y: [0, -60], s: [1, 0.8], o: [1, 0.4] }, 'inOut'); tw('.g-n', tLn, 0.35, { o: [1, 0], y: [0, -60] }, 'in');
  tw('.g-ln .lane, .g-ln .tick', tLn, 0.3, { o: [0, 1] }, 'lin');
  tw('.g-th .bot', tLn, 0.05, { o: [0, 1] }, 'lin'); tw(GTS, tLn, 0.05, { o: [0, 1] }, 'lin'); slideIn('.g-th .bot', tLn, 'left', 0.45, 300);
  // normal throw
  const tN = wt('s5', 5) - 0.1;
  tw($('.bArmR', GT), tN - 0.2, 0.15, { r: [0, 50] }, 'out'); tw($('.bArmR', GT), tN - 0.05, 0.12, { r: [50, -140] }, 'in'); tw($('.bArmR', GT), tN + 0.25, 0.3, { r: [-140, 0] }, 'out');
  tw(GC[0], tN, 0.05, { o: [0, 1] }, 'lin'); arc(GC[0], tN, 0.55, [190, 880], [300, 640], [430, LANE - 30], 300, 70, 70);
  tw('.g-ln .g1', tN, 0.001, { o: [0, 1] }); tw('.g-ln .g1', tN, 0.55, { dash: [100, 0] }, 'lin');
  tw('.g-ln .fl1', tN + 0.55, 0.3, { o: [0, 1], sy: [0, 1] }, 'back'); sfx('thud', tN + 0.55, 0.5);
  // throw in a jump
  const tJ = wt('s5', 7) - 0.15;
  jump(GT, tJ, 180, 0.7, GTS); sfx('pop', tJ, 0.6);
  tw($('.bArmR', GT), tJ + 0.1, 0.15, { r: [0, 60] }, 'out'); tw($('.bArmR', GT), tJ + 0.25, 0.12, { r: [60, -150] }, 'in'); tw($('.bArmR', GT), tJ + 0.6, 0.3, { r: [-150, 0] }, 'out');
  tw(GC[1], tJ + 0.3, 0.05, { o: [0, 1] }, 'lin'); arc(GC[1], tJ + 0.3, 0.85, [190, 700], [560, 330], [930, LANE - 30], 540, 70, 70);
  tw('.g-ln .g2', tJ + 0.3, 0.001, { o: [0, 1] }); tw('.g-ln .g2', tJ + 0.3, 0.85, { dash: [100, 0] }, 'lin'); sfx('whoosh', tJ + 0.3, 0.7);
  tw('.g-ln .fl2', tJ + 1.15, 0.35, { o: [0, 1], sy: [0, 1] }, 'back'); sfx('ding', tJ + 1.15, 0.7);
  $('.g-ln .fl2').style.transformOrigin = `930px ${LANE}px`; $('.g-ln .fl1').style.transformOrigin = `430px ${LANE}px`;
  burst('#G .cam', 10, 930, LANE - 60, tJ + 1.15, 180, 11);
  tw('.g-m .armL', tJ + 1.1, 0.3, { r: [0, 120] }, 'back'); tw('.g-m .mouth', tJ + 1.1, 0.25, { sx: [1, 1.2], sy: [1, 1.3] }, 'back');
  tw('.g-m .pup', tN, 0.3, { x: [0, -8] }, 'out'); tw('.g-m .pup', tJ + 0.5, 0.3, { x: [-8, 6], y: [0, -6] }, 'out');

  // ---------- H: the game's creators did not know about it ----------
  tCircle('#G', '#H', tH, 540, 700);
  tw('.h-book', tH, 0.001, { sx: [0, 0] });
  tw('.h-book', tH + 0.1, 0.45, { sx: [0, 1], y: [80, 0] }, 'back'); sfx('whoosh', tH + 0.1, 0.5);
  hide(HI);
  const tK = wt('s6', 2);
  tw(HI, tK - 0.3, 0.05, { o: [0, 1] }, 'lin');
  arc(HI, tK - 0.3, 0.5, [140, 1200], [500, 300], [800, 500], 360, 100, 100);
  arc(HI, tK + 0.2, 0.45, [800, 500], [980, 300], [1150, 900], 300, 100, 100); sfx('thud', tK + 0.2, 0.6);
  $('.h-book .slot').style.transformBox = 'fill-box'; $('.h-book .slot').style.transformOrigin = 'center';
  punch('.h-book .slot', tK + 0.2, 0.2);
  idle('.h-book .slot', t => t > tK + 0.4 ? { r: 6 * Math.sin((t - tK) * 14) * Math.exp(-(t - tK) * 1.5) } : {});
  const tNo = wt('s6', 4);
  sfx('buzz', tNo, 0.6);
  tw('.h-m .armL', tNo - 0.1, 0.3, { r: [0, 60] }, 'back'); tw('.h-m .armR', tNo - 0.1, 0.3, { r: [0, -60] }, 'back');
  tw('.h-m .brL', tNo - 0.1, 0.25, { y: [0, -16] }, 'out'); tw('.h-m .brR', tNo - 0.1, 0.25, { y: [0, -16] }, 'out');
  tw('.h-m .mouth', tNo - 0.1, 0.25, { sx: [1, 0.7], sy: [1, -0.5] }, 'back');
  tw('.h-m', tNo - 0.1, 0.3, { sy: [1, 0.92] }, 'out'); tw('.h-m', tNo + 0.25, 0.3, { sy: [0.92, 1] }, 'back');
  tw('.h-m .pup', tH + 0.3, 0.3, { x: [0, 6], y: [0, -8] }, 'out');

  // ---------- I: verdict stamp НЕ БАЙТ, source, back to the island ----------
  tw('#H', tI - 0.25, 0.25, { sx: [1, 0], o: [1, 0.6] }, 'in'); tw('#I', tI, 0.3, { sx: [0, 1] }, 'out5'); sfx('whoosh', tI - 0.25, 0.9);
  hide('.i-st'); hide('.i-src');
  const tSt = wt('v1', 1);
  tw('.i-m', tSt - 0.45, 0.25, { y: [0, -120] }, 'out'); tw('.i-m .armR', tSt - 0.45, 0.25, { r: [0, -170] }, 'out');
  tw('.i-m', tSt - 0.2, 0.18, { y: [-120, 0] }, 'in'); tw('.i-m .armR', tSt - 0.15, 0.15, { r: [-170, -60] }, 'in');
  stamp('.i-st', tSt, -7, 28);
  tw('.i-m .mouth', tSt, 0.25, { sx: [1, 1.2], sy: [1, 1.25] }, 'back');
  IB.forEach((b, k) => { jump(b, tSt + 0.1 + k * 0.04, 40, 0.4); tw($('.bArmL', b), tSt + 0.1, 0.3, { r: [0, 140] }, 'back'); });
  burst('.i-fx', 24, 540, 360, tSt + 0.05, 420, 21, 'conf');
  slideIn('.i-src', wt('v1', 2), 'left', 0.6, 400);
  tw('.i-m .pup', wt('v1', 2), 0.25, { x: [0, -8], y: [0, 8] }, 'out'); tw('.i-m .armL', wt('v1', 2), 0.3, { r: [0, 70] }, 'back');
  // out: clear the props, then the frozen hook frame comes back
  tw('#I .i-st, #I .i-src, #I .conf', tLoop - 0.3, 0.3, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw('#I .i-m', tLoop + 0.4, 0.001, { o: [1, 0] });
}, { noCaption: ['hook'], chunks: {} });
