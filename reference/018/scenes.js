// 018 «Тёмная тема экономит 47% батареи?» — Байт или не байт, проверка мифа на глазах. Purdue University News, 28.07.2021.
boot(() => {
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
  const clamp = x => Math.max(0, Math.min(1, x));
  const place = (el, x, y, w, h) => { el.style.left = x + 'px'; el.style.top = y + 'px'; if (w) el.style.width = w + 'px'; if (h) el.style.height = h + 'px'; return el; };
  const easeIO = x => (x = clamp(x), x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2), easeO = x => 1 - Math.pow(1 - clamp(x), 3);
  const W = (k, i) => wt(k, i);
  // piecewise level over time: pts = [[t, v], ...] eased between keys
  const lvl = pts => t => { if (t <= pts[0][0]) return pts[0][1]; for (let i = 1; i < pts.length; i++) if (t < pts[i][0]) { const [a, va] = pts[i - 1], [b, vb] = pts[i]; return va + (vb - va) * easeIO((t - a) / (b - a)); } return pts[pts.length - 1][1]; };
  // battery: fill width and colour follow the level
  const batt = (sel, f) => custom(t => { const v = clamp(f(t)); $$(sel + ' .bfill').forEach(r => { r.style.transform = `scaleX(${Math.max(0.02, v).toFixed(4)})`; r.setAttribute('fill', v < 0.3 ? '#ff5a5a' : v < 0.55 ? '#ffc34a' : '#7dff8a'); }); });
  // slider: knob and fill follow the level
  const slid = (sel, f) => custom(t => { const v = clamp(f(t)); $$(sel + ' .sknob').forEach(k => k.style.transform = `translate(${(490 * v).toFixed(1)}px,0)`); $$(sel + ' .sfill').forEach(r => r.style.transform = `scaleX(${Math.max(0.02, v).toFixed(4)})`); });
  const jump = (el, t, h = 80, d = 0.5, shd = null) => {
    tw(el, t - 0.12, 0.12, { sy: [1, 0.86], sx: [1, 1.08] }, 'out');
    tw(el, t, d / 2, { y: [0, -h], sy: [0.86, 1.08], sx: [1.08, 0.95] }, 'out');
    tw(el, t + d / 2, d / 2, { y: [-h, 0], sy: [1.08, 1], sx: [0.95, 1] }, 'in');
    tw(el, t + d, 0.08, { sy: [1, 0.88], sx: [1, 1.1] }, 'out'); tw(el, t + d + 0.08, 0.3, { sy: [0.88, 1], sx: [1.1, 1] }, 'back');
    if (shd) { tw(shd, t, d / 2, { s: [1, 0.6], o: [1, 0.5] }, 'out'); tw(shd, t + d / 2, d / 2, { s: [0.6, 1], o: [0.5, 1] }, 'in'); }
  };
  // throw along a parabola: offset (dx, dy), apex h, optional spin
  const arc = (el, t, d, dx, dy, h, rot = 0) => idle(el, tt => { if (tt < t) return {}; const u = clamp((tt - t) / d); return { x: dx * u, y: dy * u - 4 * h * u * (1 - u), r: rot * u }; });
  const burst = (par, n, x, y, t, dist = 220, seed = 0, cls = 'spark', fall = 0) => {
    const cols = ['#6ad1ff', '#ffe14d', '#ff5fa2', '#b8ff3d', '#ff9a52'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.7, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.5, 0.25, { o: [1, 0] }, 'lin'); } };
  const puffs = (par, x, y, t, n = 6, seed = 0) => { for (let k = 0; k < n; k++) { const d = mk(par, 'puff'); place(d, x - 35, y - 35); hide(d);
    tw(d, t, 0.05, { o: [0, 0.9] }, 'lin'); tw(d, t, 0.7, { x: [0, (k - (n - 1) / 2) * 34], y: [0, -60 - 50 * hash(k + seed)], s: [0.5, 1.7] }, 'out'); tw(d, t + 0.35, 0.35, { o: [0.9, 0] }, 'lin'); } };

  // ---------- world ----------
  $('#city').innerHTML = citySVG(); dof('#city', 2.5); dof('#moon', 1.5); dof('#stars', 1);
  lookFX({ grain: 0.12, tint: 'transparent' });

  // ---------- props ----------
  const buildA = (sc, s) => { $(sc + ' .a-ph').innerHTML = phonePropSVG('ap' + s, themeScreen(true)); };
  buildA('#A', '');
  $('#A2').innerHTML = $('#A').innerHTML; $('#A2 .a-ph').innerHTML = ''; $('#A2 .a-m').innerHTML = ''; buildA('#A2', '2');
  $('.b-phL').innerHTML = phonePropSVG('bl', themeScreen(false)); $('.b-phR').innerHTML = phonePropSVG('br', themeScreen(true));
  $('.b-batL').innerHTML = batterySVG('bl'); $('.b-batR').innerHTML = batterySVG('br');
  $('.c-ph').innerHTML = phonePropSVG('c', themeScreen(false));
  $('.c-bulb').innerHTML = bulbSVG('cb'); { const bo = $('.c-boff'); $('.c-bulb').appendChild(bo); } place($('.c-boff'), 25, 19, 200, 200); $('.c-boff').style.cssText += ';border-radius:50%;background:radial-gradient(circle at 40% 35%,#8a909c,#3a3e48)';
  $('.d-plug').innerHTML = plugSVG('d'); $('.d-phL').innerHTML = phonePropSVG('dl', themeScreen(false)); $('.d-phR').innerHTML = phonePropSVG('dr', themeScreen(true));
  $('.d-batL').innerHTML = batterySVG('dl'); $('.d-batR').innerHTML = batterySVG('dr');
  $('.e-phL').innerHTML = phonePropSVG('el', themeScreen(false)); $('.e-phR').innerHTML = phonePropSVG('er', themeScreen(true));
  $('.e-batL').innerHTML = batterySVG('el'); $('.e-batR').innerHTML = batterySVG('er'); $('.e-sl').innerHTML = sliderSVG('e');
  $('.f-sun').innerHTML = sunSVG('f'); $('.f-sea').innerHTML = seaSVG(); $('.f-umb').innerHTML = umbrellaSVG('f'); $('.f-bed').innerHTML = sunbedSVG('f');
  $('.f-ph').innerHTML = phonePropSVG('fp', themeScreen(false));
  $('.g-ph').innerHTML = phonePropSVG('gp', themeScreen(false)); $('.g-sl').innerHTML = sliderSVG('g');
  $('.h-batL').innerHTML = batterySVG('hl'); $('.h-batR').innerHTML = batterySVG('hr');
  $('.h-icL').innerHTML = sunIcon(); $('.h-icR').innerHTML = moonIcon(); place($('.h-icL'), 240, 700, 100, 100); place($('.h-icR'), 740, 700, 100, 100);
  $('.h-strike').innerHTML = strikeSVG(); $('.h-sl').innerHTML = sliderSVG('h'); $('.h-phx').innerHTML = phonePropSVG('hx', themeScreen(false));
  $('.h-tgL').innerHTML = ''; $('.h-tgR').innerHTML = '';
  { const a = mk('.h-tgL', '', sunIcon()); place(a, 56, 2, 70, 70); const b = mk('.h-tgR', '', moonIcon()); place(b, 56, 2, 70, 70); place($('.h-tgL'), 110, 820, 200, 110); place($('.h-tgR'), 110, 960, 200, 110); }
  $('.h-bell').innerHTML = `<svg viewBox="0 0 110 110" style="left:0;top:0;width:100%;height:100%"><g class="bell" style="transform-origin:55px 14px"><path d="M55 10 Q86 12 88 52 L92 76 L18 76 L22 52 Q24 12 55 10 Z" fill="#ffe14d" stroke="#0a130d" stroke-width="8" stroke-linejoin="round"/><circle cx="55" cy="88" r="11" fill="#ffe14d" stroke="#0a130d" stroke-width="7"/></g></svg>`;
  $('.g-win').innerHTML = `<svg viewBox="0 0 332 302" style="left:0;top:0;width:100%;height:100%"><path d="M230 60 A40 40 0 1 0 270 120 A30 30 0 1 1 230 60 Z" fill="#fff3c8"/>${[[40,50],[90,120],[150,40],[60,200],[190,170],[300,230],[120,250],[280,40]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4" fill="#fff"/>`).join('')}<path d="M166 0 L166 302 M0 151 L332 151" stroke="#3a2e5a" stroke-width="12"/></svg>`;
  // lamp grids
  const LC = [];   // C: 7 x 12
  for (let r = 0; r < 12; r++) for (let c = 0; c < 7; c++) { const l = mk('.c-grid', 'lamp'); place(l, c * 64 + 10, r * 68 + 12); const lo = mk(l, 'lo'); LC.push({ l, lo, r, c }); }
  const KEEP = new Set(['2,1', '2,2', '2,3', '2,4', '3,1', '3,2', '5,3', '5,4', '5,5', '8,1', '8,2', '8,3', '10,2', '10,3', '10,4']);   // the dark theme keeps only the text lit
  const gdim = mk('.g-ph', ''); place(gdim, 42, 84, 336, 630); gdim.style.cssText += ';border-radius:30px;background:#0b0e18';
  const LG = [];   // G: 6 x 10
  for (let r = 0; r < 10; r++) for (let c = 0; c < 6; c++) { const l = mk('.g-grid', 'lamp'); place(l, c * 52 + 6, r * 60 + 8, 38, 38); const lo = mk(l, 'lo'); place(lo, -4, -4, 38, 38); LG.push({ l, lo }); }
  // mascots (+ beach sunglasses ride on the beach mascot)
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  const glasses = mk('.f-m', '', sunglassesSVG('fg')); place(glasses, 0, 0, 380, 380);
  mascotLife(); mascotTalk();

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('h2'), tC = cut('s1'), tD = cut('s3'), tE = cut('p1'), tF = cut('j1'), tG = cut('t1'), tH = cut('v1'), tLoop = TOTAL - 0.8;
  const CUTS = [0, tB, tC, tD, tE, tF, tG, tH], IDS = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 300 * easeIO((t - c + 0.35) / 0.7); }); x -= 2100 * easeIO((t - tLoop) / 0.6); return x; };
  custom(t => {
    const x = camX(t);
    $('#stars').style.transform = `translate(${(-x * 0.03).toFixed(1)}px,0)`;
    $('#moon').style.transform = `translate(${(-x * 0.05).toFixed(1)}px,${(-24 * Math.sin(W2 * t)).toFixed(1)}px)`;
    $('#city').style.transform = `translate(${(-x * 0.18).toFixed(1)}px,0)`;
    $('#floor').style.transform = `translate(${(-(x * 1.0) % 180).toFixed(1)}px,0)`;
  });
  grade(0, 'transparent'); grade(tF - 0.2, 'rgba(255,190,80,.32)'); grade(tG, 'rgba(120,100,255,.2)'); grade(tH, 'rgba(255,70,100,.16)');
  grade(W('m1', 0) - 0.15, 'rgba(120,255,140,.14)'); grade(tLoop + 0.3, 'transparent');
  $$('.m').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2')) idle(m, t => ({ y: 6 * Math.sin(W2 * 16 * t + i), r: 1.4 * Math.sin(W2 * 8 * t + i) })); });
  idle('.a-ph', t => ({ y: 10 * Math.sin(W2 * 6 * t), r: 1.5 * Math.sin(W2 * 3 * t) }));

  // ================= A: hook — a dark phone, «47%», a question =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  punch('#A .a-t', W('hook', 0) + 0.02, 0.08);
  idle('#A .a-halo', t => ({ s: 1 + 0.08 * Math.sin(W2 * 12 * t) }));
  tw('#A .a-ph', W('hook', 1), 0.35, { r: [0, -6] }, 'back'); tw('#A .a-ph', W('hook', 2), 0.4, { r: [-6, 0] }, 'back');
  mascotPose('#A .a-m', W('hook', 0) + 0.2, 'pointL');
  punch('#A .a-n', W('hook', 3) + 0.03, 0.12); sfx('ding', W('hook', 3) + 0.05, 0.6);
  burst('#A .cam', 12, 540, 400, W('hook', 3) + 0.05, 330, 3, 'spark');
  punch('#A .a-q', W('hook', 4), 0.12); sfx('blip', W('hook', 4), 0.5);
  mascotPose('#A .a-m', W('hook', 4), 'think');
  for (let k = 0; k < 3; k++) { const q = mk('#A .cam', 'qm'); q.textContent = '?'; place(q, 700 + k * 100, 800 - k * 40); hide(q); popIn(q, W('hook', 4) + 0.15 + k * 0.08, 0.3); sfx('pop', W('hook', 4) + 0.15 + k * 0.08, 0.3); }

  // ================= B: the bench — two phones drop in =================
  tZoom('#A', '#B', tB);
  hide('.b-batL'); hide('.b-batR');
  const dropIn = (sel, shd, t, px) => { tw(sel, t, 0.42, { y: [-1200, 0] }, 'in'); tw(sel, t + 0.42, 0.08, { sy: [1, 0.9], sx: [1, 1.06] }, 'out'); tw(sel, t + 0.5, 0.3, { sy: [0.9, 1], sx: [1.06, 1] }, 'back');
    tw(shd, t, 0.42, { o: [0, 1], s: [0.3, 1] }, 'in'); sfx('thud', t + 0.4, 0.6); shake(t + 0.42, 0.2, 10); puffs('#B .cam', px, 1060, t + 0.42, 5, t); };
  dropIn('.b-phL', '.b-shd1', tB + 0.05, 290); dropIn('.b-phR', '.b-shd2', W('h2', 2) - 0.3, 790);
  popIn('.b-batL', W('h2', 3) - 0.05, 0.35); popIn('.b-batR', W('h2', 3) + 0.08, 0.35); sfx('blip', W('h2', 3), 0.4);
  batt('.b-batL', () => 1); batt('.b-batR', () => 1);
  mascotPose('.b-m', W('h2', 0), 'hold'); mascotPose('.b-m', W('h2', 2), 'pointUp');

  // ================= C: the screen is thousands of tiny lamps =================
  morphCut('#B', '#C', tC, '.b-phL', '.c-ph', 0.6);
  hide('.c-dim'); hide('.c-bulb'); hide('.c-boff');
  $('.c-ln').innerHTML = callLine(116 + 3 * 64 + 32, 330 + 4 * 68 + 34, 760, 470);
  mascotPose('.c-m', W('s1', 0), 'pointL');
  const tL = W('s1', 2) - 0.05;
  tw('.c-dim', tL, 0.3, { o: [0, 1] }, 'lin');
  LC.forEach(o => { hide(o.l); const t0 = tL + (o.r + o.c) * 0.022; tw(o.l, t0, 0.3, { o: [0, 1], s: [0.2, 1] }, 'back'); });
  for (let k = 0; k < 6; k++) sfx('tick', tL + k * 0.07, 0.3);
  focus('#C > .cam', W('s1', 4) - 0.05, 340, 700, 1.3, 0.6);
  LC.forEach((o, k) => idle(o.lo, t => (t > W('s1', 5) && t < W('s2', 4)) ? { s: 1 + 0.08 * Math.sin((t - W('s1', 5)) * 9 + k * 0.7) } : {}));
  mascotPose('.c-m', W('s1', 5), 'shock');
  // «белая точка — лампочка горит»: one lamp is called out, a big bulb slides in and glows
  const hero = LC.find(o => o.r === 4 && o.c === 3);
  punch(hero.l, W('s2', 0), 0.4, 0.4); sfx('blip', W('s2', 0), 0.5);
  tw('.cl', W('s2', 1) - 0.1, 0.4, { dash: [100, 0] }, 'inOut');
  slideIn('.c-bulb', W('s2', 1), 'right', 0.6, 400); sfx('whoosh', W('s2', 1), 0.4);
  idle('.c-bulb .bray', t => t > W('s2', 2) && t < W('s2', 4) ? { s: 1 + 0.15 * Math.sin((t - W('s2', 2)) * 12) } : {});
  sfx('ding', W('s2', 3), 0.5); punch('.c-bulb', W('s2', 3), 0.1);
  mascotPose('.c-m', W('s2', 0), 'point'); mascotPose('.c-m', W('s2', 3), 'cheer');
  // «чёрная — погасла»: the bulb goes grey, the screen switches to the dark theme — only the text stays lit
  const tOff = W('s2', 4) - 0.05;
  tw('.c-bulb .bray', tOff, 0.2, { o: [1, 0] }, 'lin'); tw('.c-boff', tOff, 0.25, { o: [0, 0.92] }, 'lin'); sfx('buzz', tOff, 0.3);
  tw(hero.lo, tOff, 0.2, { o: [1, 0] }, 'lin'); puffs('#C .cam', 860, 330, tOff + 0.1, 5, 2);
  LC.forEach(o => { if (KEEP.has(o.r + ',' + o.c) || o === hero) return; tw(o.lo, tOff + 0.1 + (o.r * 0.03 + o.c * 0.015), 0.22, { o: [1, 0] }, 'lin'); });
  for (let k = 0; k < 5; k++) sfx('tick', tOff + 0.1 + k * 0.08, 0.25);
  mascotPose('.c-m', W('s2', 5), 'shock'); focus('#C > .cam', W('s2', 5), 340, 700, 1.12, 0.4);

  // ================= D: so the dark screen eats less? — bolts fly into each phone =================
  tWhip('#C', '#D', tD);
  batt('.d-batL', lvl([[W('s3', 3), 1], [W('s3', 5) + 0.3, 0.55]])); batt('.d-batR', lvl([[W('s3', 3), 1], [W('s3', 5) + 0.3, 0.85]]));
  const tEat = W('s3', 3) - 0.05;
  const toL = [0, 1, 2, 3], toR = [0];
  toL.forEach(k => { const b = mk('#D .cam', 'bolt', boltSVG('dl' + k)); place(b, 505, 300); hide(b); const t0 = tEat + k * 0.17; tw(b, t0, 0.05, { o: [0, 1] }, 'lin'); arc(b, t0, 0.5, -300, 560, 180, -200); tw(b, t0 + 0.45, 0.1, { o: [1, 0] }, 'lin'); sfx('zap', t0, 0.25); });
  toR.forEach(k => { const b = mk('#D .cam', 'bolt', boltSVG('dr' + k)); place(b, 505, 300); hide(b); const t0 = tEat + 0.25; tw(b, t0, 0.05, { o: [0, 1] }, 'lin'); arc(b, t0, 0.55, 310, 560, 180, 200); tw(b, t0 + 0.5, 0.1, { o: [1, 0] }, 'lin'); });
  toL.forEach(k => punch('.d-phL', tEat + k * 0.17 + 0.48, 0.05, 0.2)); punch('.d-phR', tEat + 0.75, 0.06, 0.25);
  tw('.d-plug', tEat - 0.1, 0.12, { s: [1, 1.1] }, 'out'); tw('.d-plug', tEat + 0.02, 0.4, { s: [1.1, 1] }, 'back');
  mascotPose('.d-m', W('s3', 0), 'think'); mascotPose('.d-m', W('s3', 1), 'point'); punch('.d-phR', W('s3', 1) + 0.05, 0.08);
  focus('#D > .cam', W('s3', 4), 845, 700, 1.1, 0.35);
  mascotPose('.d-m', W('s3', 5), 'shrug');
  { const q = mk('#D .cam', 'qm'); q.textContent = '?'; place(q, 500, 760); hide(q); popIn(q, W('s3', 5) + 0.05, 0.35); sfx('pop', W('s3', 5) + 0.05, 0.4); }

  // ================= E: the measurement — full brightness =================
  tCircle('#D', '#E', tE, 540, 760);
  hide('.e-src'); hide('.e-sl'); hide('.e-chip');
  slideIn('.e-src', W('p1', 0) - 0.05, 'left', 0.7, 520); sfx('whoosh', W('p1', 0), 0.4);
  mascotPose('.e-m', W('p1', 0), 'pointUp'); mascotPose('.e-m', W('p1', 4), 'hold');
  const eLev = lvl([[W('e1', 1), 0.3], [W('e1', 1) + 0.7, 1]]);
  slid('.e-sl', eLev);
  custom(t => { const v = eLev(t); $('.e-haloL').style.opacity = (0.1 + 0.9 * v).toFixed(3); $('.e-haloL').style.transform = `scale(${(0.6 + 0.5 * v).toFixed(3)})`;
    $('.e-haloR').style.opacity = (0.06 + 0.3 * v).toFixed(3); $('.e-haloR').style.transform = `scale(${(0.5 + 0.3 * v).toFixed(3)})`; });
  slideOut('.e-src', W('e1', 0) - 0.2, 'left', 0.35, 520);
  slideIn('.e-sl', W('e1', 0) - 0.1, 'down', 0.6, 300); sfx('whoosh', W('e1', 0) - 0.1, 0.4);
  sfx('riser', W('e1', 1) - 0.1, 0.5); mascotPose('.e-m', W('e1', 1), 'point');
  tw('.e-sl .ssun', W('e1', 3), 0.1, { s: [1, 1.5] }, 'out'); tw('.e-sl .ssun', W('e1', 3) + 0.1, 0.4, { s: [1.5, 1] }, 'back');
  idle('.e-sl .ssun', t => t > W('e1', 3) ? { r: (t - W('e1', 3)) * 60 } : {});
  shake(W('e1', 3), 0.25, 10); mascotPose('.e-m', W('e1', 3), 'shock');
  batt('.e-batL', lvl([[W('e2', 1), 1], [W('e2', 1) + 1.4, 0.22]])); batt('.e-batR', lvl([[W('e2', 1), 1], [W('e2', 1) + 1.4, 0.6]]));
  punch('.e-phR', W('e2', 0), 0.08); mascotPose('.e-m', W('e2', 0), 'point');
  for (let k = 0; k < 8; k++) sfx('tick', W('e2', 1) + k * 0.17, 0.2);
  slideIn('.e-chip', W('e2', 3) - 0.05, 'right', 0.6, 420); place($('.e-chip'), 300, 200);
  focus('#E > .cam', W('e2', 4), 830, 480, 1.12, 0.45);
  mascotPose('.e-m', W('e2', 5) - 0.05, 'cheer'); jump('.e-m', W('e2', 5), 70, 0.45);
  burst('#E .cam', 16, 830, 470, W('e2', 5) + 0.05, 260, 7, 'conf', 80); sfx('ding', W('e2', 5), 0.5);

  // ================= F: joke — full brightness is for the beach =================
  tDrop('#E', '#F', tF);
  hide('.f-chip'); hide('.f-beam'); hide(glasses);
  idle('.f-sun .srays', t => ({ r: t * 25 })); idle('.f-sea', t => ({ x: 140 * Math.sin(W2 * 9 * t), y: 6 * Math.sin(W2 * 18 * t) }));
  mascotPose('.f-m', W('j1', 0), 'hold');
  slideIn('.f-chip', W('j1', 2) - 0.05, 'right', 0.6, 400); sfx('whoosh', W('j1', 2), 0.4);
  jump('.f-m', W('j1', 4), 60, 0.4, '.f-shd1'); jump('.f-ph', W('j1', 4), 60, 0.4);
  punch('.f-sun', W('j1', 7), 0.1);
  for (let k = 0; k < 8; k++) { const d = mk('#F .cam', 'drop'); place(d, 120 + k * 110, 1020); hide(d); const t0 = W('j1', 7) + k * 0.03; tw(d, t0, 0.05, { o: [0, 1] }, 'lin'); arc(d, t0, 0.6, (hash(k) - 0.5) * 80, 20, 120 + 60 * hash(k + 3), 0); tw(d, t0 + 0.5, 0.12, { o: [1, 0] }, 'lin'); }
  sfx('whoosh', W('j1', 7), 0.3);
  // «в тёмных очках»
  tw(glasses, W('j2', 1) - 0.12, 0.05, { o: [0, 1] }, 'lin'); tw(glasses, W('j2', 1) - 0.12, 0.38, { y: [-420, 0] }, 'in'); sfx('pop', W('j2', 1) + 0.25, 0.5);
  mascotPose('.f-m', W('j2', 2), 'cheer');
  slideOut('.f-chip', W('j2', 3) - 0.1, 'right', 0.3, 400);
  // «с телефоном-прожектором»: the phone lifts and blasts a beam over the beach
  mascotPose('.f-m', W('j2', 4) - 0.1, 'pointUp'); tw('.f-ph', W('j2', 4) - 0.1, 0.35, { y: [0, -90] }, 'back');
  const tBeam = W('j2', 5) + 0.25;
  tw('.f-beam', tBeam, 0.12, { o: [0, 1] }, 'lin'); idle('.f-beam', t => t > tBeam ? { r: 4 * Math.sin((t - tBeam) * 4) } : {});
  tw('.f-beam', tBeam, 0.001, { y: [-90, -90] });
  sfx('zap', tBeam, 0.6); shake(tBeam, 0.3, 14); grade(tBeam, 'rgba(255,255,230,.55)'); grade(tBeam + 0.25, 'rgba(255,190,80,.32)');
  focus('#F > .cam', tBeam, 700, 700, 1.12, 0.45);
  tw('.f-beam', tG - 0.6, 0.2, { o: [1, 0] }, 'lin'); tw('.f-ph', tG - 0.6, 0.3, { y: [-90, 0] }, 'inOut');

  // ================= G: at home auto brightness keeps about a third — almost nothing to switch off =================
  morphCut('#F', '#G', tG, '.f-ph', '.g-ph', 0.62);
  hide('.g-chip'); hide('.g-sl'); hide('.g-third'); hide('.g-grid'); hide(gdim);
  tw(gdim, tG + 0.2, 0.25, { o: [0, 1] }, 'lin'); tw('.g-grid', tG + 0.25, 0.3, { o: [0, 1] }, 'lin');
  const gLev = lvl([[W('t1', 3) - 0.1, 1], [W('t1', 3) + 0.8, 0.33]]);
  slid('.g-sl', gLev);
  custom(t => { const v = gLev(t), fl = t > W('t2', 3) && t < W('t2', 5) ? 0.75 + 0.25 * Math.sin((t - W('t2', 3)) * 40) : 1;
    LG.forEach((o, k) => { if (o.off && t >= o.off) { o.lo.style.opacity = '0'; return; } o.lo.style.opacity = ((0.15 + 0.85 * v) * fl).toFixed(3); });
    $('.g-glow').style.opacity = (0.1 + 0.7 * v).toFixed(3); });
  slideIn('.g-sl', W('t1', 1) - 0.1, 'right', 0.6, 520); sfx('whoosh', W('t1', 1), 0.4);
  slideIn('.g-chip', W('t1', 2) - 0.05, 'right', 0.6, 420);
  mascotPose('.g-m', W('t1', 1), 'pointL'); mascotPose('.g-m', W('t1', 3), 'think');
  place($('.g-third'), 577, 770, 133, 16); $('.g-third').style.transformOrigin = '0 50%';
  tw('.g-third', W('t1', 4), 0.4, { o: [0, 1], sx: [0, 1] }, 'out'); punch('.g-third', W('t1', 5), 0.2); sfx('blip', W('t1', 5), 0.4);
  focus('#G > .cam', W('t2', 0), 330, 700, 1.1, 0.9);
  mascotPose('.g-m', W('t2', 3), 'shrug');
  // «гасить почти нечего»: the mascot switches one dim lamp off — a tiny spark, that's all
  const gOff = LG[27]; gOff.off = W('t2', 5) + 0.1;
  mascotPose('.g-m', W('t2', 5) - 0.1, 'pointL'); puffs('#G .cam', 153 + 3 * 52 + 25, 400 + 4 * 60 + 27, gOff.off, 3, 4); sfx('tick', gOff.off, 0.5);
  { const s = mk('#G .cam', 'spark'); place(s, 300, 640); hide(s); popIn(s, gOff.off + 0.05, 0.3, 0.1); tw(s, gOff.off + 0.4, 0.3, { o: [1, 0], s: [1, 0.3] }, 'in'); }
  mascotPose('.g-m', W('t2', 7), 'shrug');

  // ================= H: the answer 3–9%, БАЙТ, the takeaway, subscribe, loop =================
  tSlideUp('#G', '#H', tH);
  hide('.h-batL'); hide('.h-batR'); hide('.h-icL'); hide('.h-icR'); hide('.h-n'); hide('.h-47'); hide('.h-chip'); hide('.h-st'); hide('.h-sub');
  hide('.h-sl'); hide('.h-phx'); hide('.h-tgL'); hide('.h-tgR');
  slideIn('.h-batL', W('v1', 0) - 0.05, 'left', 0.6, 500); slideIn('.h-batR', W('v1', 0) + 0.05, 'right', 0.6, 500); sfx('whoosh', W('v1', 0), 0.4);
  popIn('.h-icL', W('v1', 1), 0.35); popIn('.h-icR', W('v1', 1) + 0.08, 0.35);
  batt('.h-batL', lvl([[W('v1', 2), 1], [W('v1', 4) + 0.2, 0.52]])); batt('.h-batR', lvl([[W('v1', 2), 1], [W('v1', 4) + 0.2, 0.57]]));
  for (let k = 0; k < 5; k++) sfx('tick', W('v1', 2) + k * 0.16, 0.2);
  mascotPose('.h-m', W('v1', 0), 'think');
  slideIn('.h-n', W('v1', 4) - 0.08, 'down', 0.45, 140); sfx('ding', W('v1', 4), 0.5);
  custom(t => { $('.h-n').innerHTML = t < W('v1', 6) - 0.04 ? '<i>3</i>' : '<i>3–9%</i>'; });
  punch('.h-n', W('v1', 6), 0.12); sfx('pop', W('v1', 6), 0.5);
  focus('#H > .cam', W('v1', 6), 540, 880, 1.06, 0.5);
  mascotPose('.h-m', W('v1', 6), 'shock');
  // «сорок семь — только на пляже»
  popIn('.h-47', W('v2', 0) - 0.05, 0.4); sfx('pop', W('v2', 0), 0.4);
  slideIn('.h-chip', W('v2', 2) - 0.05, 'left', 0.55, 420);
  tw('.h-strike .stk', W('v2', 4), 0.3, { dash: [100, 0] }, 'out'); sfx('zap', W('v2', 4), 0.4);
  mascotPose('.h-m', W('v2', 2), 'shrug');
  // БАЙТ: the mascot hops and slams its arm down, the stamp hits the top
  const tSt = W('v2', 5) - 0.02;
  mascotPose('.h-m', tSt - 0.5, 'pointUp'); tw('.h-m', tSt - 0.45, 0.25, { y: [0, -90] }, 'out'); tw('.h-m', tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose('.h-m', tSt - 0.18, 'point', 0.18);
  stamp('.h-st', tSt, -7, 26); burst('.h-fx', 22, 540, 350, tSt + 0.05, 420, 61, 'conf', 140);
  // takeaway: turn the brightness down, not the theme
  const tM = W('m1', 0) - 0.15;
  tw('.h-batL, .h-batR, .h-icL, .h-icR, .h-n, .h-47, .h-chip, .h-strike', tM, 0.35, { o: [1, 0] }, 'in');
  slideIn('.h-sl', tM + 0.15, 'down', 0.6, 300); sfx('whoosh', tM + 0.15, 0.4);
  const hLev = lvl([[W('m1', 3), 1], [W('m1', 3) + 0.7, 0.35]]); slid('.h-sl', hLev);
  const hh = mk('#H .cam', 'halo'); place(hh, 300, 700, 480, 560); $('#H .cam').insertBefore(hh, $('.h-phx')); hide(hh);
  tw(hh, W('m1', 1), 0.3, { o: [0, 1] }, 'lin');
  custom(t => { if (t > W('m1', 3)) hh.style.transform = `scale(${(0.5 + 0.5 * hLev(t)).toFixed(3)})`; });
  popIn('.h-phx', W('m1', 1) - 0.05, 0.4); sfx('pop', W('m1', 1), 0.4);
  mascotPose('.h-m', W('m1', 1), 'pointL'); mascotPose('.h-m', W('m1', 3), 'point');
  const ok = mk('#H .cam', '', okSVG()); place(ok, 600, 740, 120, 120); hide(ok);
  popIn(ok, W('m1', 4) + 0.25, 0.35); tw('#H .okp', W('m1', 4) + 0.35, 0.3, { dash: [100, 0] }, 'out'); sfx('ding', W('m1', 4) + 0.35, 0.5);
  slideIn('.h-tgL', W('m1', 5) - 0.1, 'left', 0.5, 300); slideIn('.h-tgR', W('m1', 6) - 0.05, 'left', 0.5, 300);
  for (let k = 0; k < 4; k++) tw('.h-tgR', W('m1', 7) + 0.05 + k * 0.1, 0.1, { r: [k % 2 ? 8 : -8, k % 2 ? -8 : 8] }, 'inOut');
  tw('.h-tgR', W('m1', 7) + 0.45, 0.3, { r: [8, 0] }, 'back');
  mascotPose('.h-m', W('m1', 7), 'shrug');
  const tSub = W('cta', 0) - 0.05;
  slideIn('.h-sub', tSub, 'down', 0.6, 300); sfx('whoosh', tSub, 0.5);
  for (let k = 0; k < 4; k++) tw('.h-bell .bell', W('cta', 1) + k * 0.16, 0.08, { r: [k % 2 ? 18 : -18, k % 2 ? -18 : 18] }, 'inOut');
  tw('.h-bell .bell', W('cta', 1) + 0.64, 0.3, { r: [-18, 0] }, 'back'); sfx('ding', W('cta', 1), 0.6);
  mascotPose('.h-m', tSub + 0.1, 'point'); punch('.h-sub', W('cta', 2), 0.06);
  punch('.h-tgL', W('out', 1), 0.12); punch('.h-tgR', W('out', 3) - 0.1, 0.12); mascotPose('.h-m', W('out', 0), 'pointL');
  tw('#H .h-st, #H .h-sub, #H .conf, #H .h-sl, #H .h-phx, #H .h-tgL, #H .h-tgR', tLoop - 0.4, 0.35, { o: [1, 0] }, 'in');
  tw(hh, tLoop - 0.4, 0.35, { o: [1, 0] }, 'in'); tw(ok, tLoop - 0.4, 0.35, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw('#H .h-m', tLoop + 0.42, 0.001, { o: [1, 0] });
}, { chunks: {} });
