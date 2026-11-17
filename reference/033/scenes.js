// 033 «200 мегапикселей. Сколько из них попадает в фото?» — Байт или не байт (длинный формат, в запас на ср 18.11.2026).
// Стиль: монолог предмета от первого лица — рассказывает пиксель камеры; маскот задаёт вопрос, выносит вердикт и ставит штамп.
// Источник: Samsung Newsroom, 20.03.2023, ISOCELL HP2: 200 МП, до 16 пикселей объединяются в один; по умолчанию снимок 12 МП.
// Свой мир: ночная фотостудия — дальний слой огней-боке (размыт), средний — плавающие RGB-квадратики, ближний — край стола; синий фон, оранжевый акцент.
// Планы: A крупный (камера телефона), B средний (пиксель, фото, маскот), C крупный (пиксель-ведёрко ловит свет), D общий/масштаб (датчик → ноготь),
// E средний (вечер, фото в ряби), F крупный (16 в одно ведро), G общий (коммуналка), H крупный (200 ÷ 16 = 12), V средний (штамп, вывод).
// Склейки-превращения: пиксель из объектива → пиксель (A→B), пиксель → клетка датчика (C→D), пиксель → пиксель из шестнадцати (E→F).
TIMING.words.forEach(w => { w.d = w.d.replace(/\s—$/, ''); });
boot(() => {
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
  const clamp = x => Math.max(0, Math.min(1, x));
  const place = (el, x, y, w, h) => { el.style.left = x + 'px'; el.style.top = y + 'px'; if (w) el.style.width = w + 'px'; if (h) el.style.height = h + 'px'; return el; };
  const put = (par, cls, html, x, y, w, h) => place(mk(par, cls, html), x, y, w, h);
  const easeIO = x => (x = clamp(x), x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const W = (k, i) => wt(k, i);
  const jump = (el, t, h = 80, d = 0.5) => {
    tw(el, t - 0.12, 0.12, { sy: [1, 0.86], sx: [1, 1.08] }, 'out');
    tw(el, t, d / 2, { y: [0, -h], sy: [0.86, 1.08], sx: [1.08, 0.95] }, 'out');
    tw(el, t + d / 2, d / 2, { y: [-h, 0], sy: [1.08, 1], sx: [0.95, 1] }, 'in');
    tw(el, t + d, 0.08, { sy: [1, 0.88], sx: [1, 1.1] }, 'out'); tw(el, t + d + 0.08, 0.3, { sy: [0.88, 1], sx: [1.1, 1] }, 'back');
  };
  const burst = (par, n, x, y, t, dist = 220, seed = 0, cls = 'spark', fall = 0) => {
    const cols = ['#ff9f43', '#4dc9ff', '#4dff88', '#ff4d5e', '#ffe14d'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.8, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.6, 0.25, { o: [1, 0] }, 'lin'); } };
  const ringAt = (par, x, y, t, sz = 110, col = '#fff') => { const r = mk(par, 'ring'); r.style.borderColor = col; place(r, x - sz / 2, y - sz / 2, sz, sz); hide(r);
    tw(r, t, 0.05, { o: [0, 1] }, 'lin'); tw(r, t, 0.45, { s: [0.4, 1.7] }, 'out'); tw(r, t + 0.25, 0.2, { o: [1, 0] }, 'lin'); };
  const shadow = (par, x, y, w, h = 60) => put(par, 'shd', '', x - w / 2, y - h / 2, w, h);
  const mascot = (par, id, x, y, sz) => { const m = put(par, 'mm', mascotSVG(id), x, y, sz, sz); shadow(par, x + sz / 2, y + sz * 0.95, sz * 0.7, 50).classList.add('mshd'); return m; };
  const chip = (par, cls, txt, x, y, fs) => { const c = put(par, cls, txt, x, y); if (fs) c.style.fontSize = fs + 'px'; return c; };
  const RED = '#ff4d5e', GRN = '#4dff88', BLU = '#4d8cff';
  const px = (par, id, x, y, w, filt = RED, sh = true) => { const h = w * 380 / 300; if (sh) shadow(par, x + w / 2, y + h * 0.96, w * 0.75, Math.max(16, w * 0.12)).classList.add('pxs');
    const e = put(par, 'px', pixelSVG(id, filt), x, y, w, h); e.style.transformOrigin = '50% 92%'; return e; };
  const q1 = (el, s) => el.querySelector(s);
  const fillTo = (el, t, a, b, d = 0.5) => tw(q1(el, '.pxfill'), t, d, { sy: [a, b] }, 'out');
  const pxPose = (el, t, k) => {   // pixel body language: arms + brows + smile
    const P = { up: [-60, 60, -8, 1], catch: [-95, 95, -6, 1], sad: [20, -20, 6, -1], shrug: [-40, 40, -10, 0.4], rest: [0, 0, 0, 1], point: [0, 75, -4, 1], hug: [-30, 30, -4, 1], shock: [-110, 110, -14, -0.6] }[k];
    tw(q1(el, '.pxarmL'), t, 0.38, { r: [el._a ? el._a[0] : 0, P[0]] }, 'back'); tw(q1(el, '.pxarmR'), t, 0.38, { r: [el._a ? el._a[1] : 0, P[1]] }, 'back');
    tw([q1(el, '.pxbrL'), q1(el, '.pxbrR')], t, 0.3, { y: [el._a ? el._a[2] : 0, P[2]] }, 'out'); tw(q1(el, '.pxsmile'), t, 0.3, { sy: [el._a ? el._a[3] : 1, P[3]] }, 'back');
    tw(el, t, 0.1, { sy: [1, 0.94] }, 'out'); tw(el, t + 0.1, 0.3, { sy: [0.94, 1] }, 'back'); el._a = P; };
  const lightDrop = (par, x0, y0, x1, y1, t, d = 0.55, big = 1) => { const dr = put(par, 'ldrop', '', x0 - 15, y0 - 22); if (big !== 1) dr.style.transform = `scale(${big})`;
    hide(dr); tw(dr, t, 0.05, { o: [0, 1] }, 'lin'); tw(dr, t, d, { x: [0, x1 - x0], y: [0, y1 - y0], s: [big * 0.7, big] }, 'in'); tw(dr, t + d - 0.02, 0.08, { o: [1, 0] }, 'lin'); return dr; };

  // ---------- world ----------
  $('#far').innerHTML = bokehSVG(); $('#mid').innerHTML = tilesSVG(); $('#floor').innerHTML = floorSVG();
  dof('#far', 3);
  lookFX({ grain: 0.1, tint: 'transparent' });

  // ================= layouts =================
  // ----- A: hook (close-up). «200 мегапикселей» + the back of a phone with a big camera -----
  const buildA = (cam, s) => {
    const n1 = put(cam, 'big', '<i>200</i>', 0, 140, 1080); n1.style.fontSize = '250px';
    const n2 = put(cam, 'lbl', 'МЕГАПИКСЕЛЕЙ', 0, 405, 1080); n2.style.fontSize = '70px';
    shadow(cam, 560, 1290, 420, 60);
    const ph = put(cam, 'pb', phoneBackSVG('a' + s), 360, 560, 380, 725); ph.style.transformOrigin = '50% 90%';
    const m = mascot(cam, 'am' + s, -20, 930, 380);
    return { n1, n2, ph, m };
  };
  const A = buildA('#A .cam', ''); const A2 = buildA('#A2 .cam', '2');
  const camA = $('#A .cam');
  const LX = 360 + 150 * 380 / 440, LY = 560 + 190 * 725 / 840;           // main lens centre on the stage
  const aChip = chip(camA, 'nb-chip chipL', '200 000 000 ПИКСЕЛЕЙ', 300, 1170, 44);
  const aPx = px(camA, 'apx', LX - 95, LY - 120, 190, RED, false);

  // ----- B: medium. The pixel, an instant photo, the mascot asks -----
  const camB = $('#B .cam');
  const bPh = put(camB, 'ph', photoSVG('b'), 610, 230, 360, 432); bPh.style.transformOrigin = '50% 50%';
  const bPx = px(camB, 'bpx', 90, 560, 330);
  const bM = mascot(camB, 'bm', 640, 900, 370);
  const bMini = []; for (let k = 0; k < 40; k++) { const e = put(camB, 'mini', '', 255 - 15, 640 - 15); e.style.background = [RED, GRN, BLU][k % 3]; bMini.push(e); }
  const bQ = put(camB, 'qm', '?', 740, 340);
  const bC1 = chip(camB, 'nb-chip r chipL r', 'БАЙТ?', 60, 1030, 50), bC2 = chip(camB, 'nb-chip g chipL g', 'НЕ БАЙТ?', 60, 1150, 50);

  // ----- C: close-up. The pixel is a bucket that catches light like rain -----
  const camC = $('#C .cam');
  const cPx = px(camC, 'cpx', 230, 430, 620);
  const CS = 620 / 300, rimY = 430 + 96 * CS, rimX0 = 230 + 60 * CS, rimX1 = 230 + 240 * CS;
  const cHandle = put(camC, 'hdl', `<svg viewBox="0 0 1080 1920" style="overflow:visible;left:0;top:0;width:1080px;height:1920px"><path pathLength="100" d="M${rimX0 - 30} ${rimY + 20} Q540 ${rimY - 330} ${rimX1 + 30} ${rimY + 20}" fill="none" stroke="#0a130d" stroke-width="30" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100" class="h1"/><path pathLength="100" d="M${rimX0 - 30} ${rimY + 20} Q540 ${rimY - 330} ${rimX1 + 30} ${rimY + 20}" fill="none" stroke="#c9d2ea" stroke-width="14" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100" class="h2"/></svg>`, 0, 0, 1080, 1920);
  const cChip = chip(camC, 'nb-chip chipL', 'ЛОВЛЮ СВЕТ', 60, 220, 46);
  const cM = mascot(camC, 'cm', -30, 1050, 270);

  // ----- D: general / scale. The sensor: 200 million buckets on a plate the size of a fingernail -----
  const camD = $('#D .cam');
  const dN = put(camD, 'lbl', '<i>0</i> МЛН', 0, 180, 1080); dN.style.fontSize = '120px';
  const dW = put(camD, 'snw', '', 140, 330, 800, 800); dW.style.transformOrigin = '50% 50%';
  const dSn = put(dW, 'sn', sensorSVG('d', 12), 0, 0, 800, 800);
  const SC = 800 / 600, cellX = (90 + 4 * 35) * SC, cellY = (90 + 6 * 35) * SC, cellW = 35 * SC;
  const dCell = put(dW, 'px dcell', pixelSVG('dc', RED), cellX + 1, cellY - 8, cellW - 2, (cellW - 2) * 380 / 300);
  const dRing = put(dW, 'ring', '', cellX - 18, cellY - 18, cellW + 36, cellW + 36); dRing.style.borderColor = '#ff9f43';
  const dHand = put(camD, 'hand', pointHandSVG('d'), 400, -225, 520, 1109);
  const dChip = chip(camD, 'nb-chip c chipL c', 'РАЗМЕРОМ С НОГОТЬ', 90, 1190, 42);
  const dM = mascot(camD, 'dm', 740, 960, 320);
  const dRain = [];

  // ----- E: medium. Evening: the pixel sits empty, the photo comes out as noise -----
  const camE = $('#E .cam');
  const eMoon = put(camE, 'moon', '', 170, 380, 160, 160);
  const ePx = px(camE, 'epx', 90, 640, 320);
  const eM = mascot(camE, 'em', 640, 900, 370);
  const eMPh = put(camE, 'mph', phonePropSVG('em'), 640, 960, 110, 210); eMPh.style.transformOrigin = '50% 80%';
  const ePh = put(camE, 'ph', photoSVG('e'), 560, 220, 380, 456); ePh.style.transformOrigin = '50% 50%';
  const eFlash = put(camE, 'flash', '', -200, -200, 1480, 2320); eFlash.style.background = '#fffbe8';
  const eChip = chip(camE, 'nb-chip c chipL c', 'ВЕЧЕРОМ', 60, 220, 46);

  // ----- F: close-up mechanism. 16 pixels pour into one bucket; the source -----
  const camF = $('#F .cam');
  const BAY = [[RED, GRN, RED, GRN], [GRN, BLU, GRN, BLU], [RED, GRN, RED, GRN], [GRN, BLU, GRN, BLU]];
  const fP = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) fP.push(px(camF, 'fp' + r + c, 150 + c * 170, 300 + r * 190, 145, BAY[r][c], false));
  const fBig = px(camF, 'fbig', 300, 400, 480, RED);
  const fGrid = put(camF, 'fgrid', `<svg viewBox="0 0 480 400" style="left:0;top:0;width:100%;height:100%">${[1, 2, 3].map(k => `<path d="M${50 + k * 95} 160 L${44 + k * 92} 560" stroke="#fff" stroke-width="6" opacity=".8"/><path d="M60 ${160 + k * 100} L420 ${160 + k * 100}" stroke="#fff" stroke-width="6" opacity=".8"/>`).join('')}</svg>`, 300, 300, 480, 400);
  const fN = put(camF, 'lbl', '<i>16</i> → 1', 0, 190, 1080); fN.style.fontSize = '120px';
  const fDef = chip(camF, 'nb-chip chipL', 'ПО УМОЛЧАНИЮ', 280, 200, 46);
  const fSrc = put(camF, 'nb-panel', '<div style="position:absolute;left:34px;top:22px;font:800 34px JB;color:#fff;white-space:nowrap">SAMSUNG NEWSROOM</div><div style="position:absolute;left:34px;top:76px;font:700 30px JB;color:var(--dim);white-space:nowrap">20.03.2023 · ДАТЧИК 200 МП</div>', 50, 1100, 620, 140);
  const fM = mascot(camF, 'fm', 800, 1010, 270);

  // ----- G: general joke. A communal flat: 16 neighbours, one bucket -----
  const camG = $('#G .cam');
  put(camG, 'room', roomSVG(), 0, 0, 1080, 1300);
  const gBack = [], gFront = [];
  for (let k = 0; k < 10; k++) gBack.push(px(camG, 'gb' + k, 18 + k * 104, 630, 100, [RED, GRN, BLU][k % 3]));
  const gB = px(camG, 'gbig', 370, 620, 340, RED);
  [10, 125, 240, 720, 835, 950].forEach((x, k) => gFront.push(px(camG, 'gf' + k, x - 10, 860, 120, [GRN, BLU, RED][k % 3])));
  const gN1 = put(camG, 'lbl', '<i>16</i> СОСЕДЕЙ', 0, 470, 1080); gN1.style.fontSize = '96px';
  const gN2 = put(camG, 'lbl', '<i>1</i> ВЕДРО', 0, 470, 1080); gN2.style.fontSize = '96px';
  const gChip = chip(camG, 'nb-chip chipL', 'КОММУНАЛКА', 60, 220, 46);

  // ----- H: close-up numbers. 200 ÷ 16 → 12 megapixels in the photo -----
  const camH = $('#H .cam');
  const hN = put(camH, 'big', '<i>200</i>', 0, 210, 1080); hN.style.fontSize = '210px';
  const hDiv = put(camH, 'big', '÷ 16', 600, 240, 460); hDiv.style.fontSize = '160px'; hDiv.style.textAlign = 'left';
  shadow(camH, 560, 1060, 420, 50);
  const hPh = put(camH, 'ph', photoSVG('h'), 350, 480, 420, 504); hPh.style.transformOrigin = '50% 50%';
  const hRes = put(camH, 'lbl', '<i>12</i> МП', 360, 690, 400); hRes.style.fontSize = '130px';
  const hM = mascot(camH, 'hm', 70, 990, 300);
  const hBlk = []; for (let k = 0; k < 16; k++) { const e = put(camH, 'mini', '', 0, 0); e.style.background = [RED, GRN, BLU][k % 3]; hBlk.push(e); }

  // ----- V: verdict and the takeaway -----
  const camV = $('#V .cam');
  const vM = mascot(camV, 'vm', 140, 880, 400);
  const vSt = put(camV, 'stt', 'БАЙТ', 260, 280, 560, 170); vSt.style.cssText += ';border:18px solid var(--red);color:var(--red);font:900 112px/134px Unb';
  const vMode = chip(camV, 'nb-chip chipL', 'РЕЖИМ 200 МП', 520, 560, 44);
  const vTg = put(camV, 'toggle', '', 640, 690); const vKnob = put(vTg, 'knob', '');
  const vSun = put(camV, 'sun', sunSVG('v'), 650, 860, 300, 300);
  shadow(camV, 790, 1215, 280, 40).classList.add('vpsh');
  const vPh = put(camV, 'pb', phoneBackSVG('v'), 640, 640, 300, 573); vPh.style.transformOrigin = '50% 90%';
  const vX = put(camV, 'cross', '', 600, 1010, 400);
  const vFx = put(camV, 'vfx', '', 0, 0);

  mascotLife(); mascotTalk();
  // the pixel is the narrator from «Я — один из них» to «…двенадцать мегапикселей»; the mascot keeps quiet then
  const PXT = [[L('hook').t0 + 4.15, L('hook').t1 + 0.1], [L('m1').t0 - 0.05, L('n1').t1 + 0.1]];
  $$('.mm').forEach(m => PXT.forEach(([a, b]) => mascotQuiet(m, a, b)));
  const talkers = [aPx, bPx, cPx, ePx, fBig, gB];
  talkers.forEach(p => { const mo = q1(p, '.pxmouth');
    custom(t => { if (p.closest('.scene').style.display === 'none') return; let v = 0; if (PXT.some(([a, b]) => t >= a && t < b) && window.VENV) { const i = Math.round(t * VENV.fps); v = VENV.v[Math.min(VENV.v.length - 1, i)] || 0; }
      mo.style.transform = `scaleY(${Math.min(1, v * 1.15).toFixed(3)})`; }); });
  $$('.px .pxlid').forEach((e, i) => { if (e.closest('#A2') || e.closest('.dcell')) return; const P = TOTAL / 8 + hash(i) * 1.5, ph = hash(i * 2.3) * P; idle(e, t => { if (t < 0.6 || t > TOTAL - 0.8) return {}; const u = (t + ph) % P; return { sy: u < 0.16 ? Math.sin(Math.PI * u / 0.16) : 0 }; }); });
  $$('.px').forEach((p, i) => { if (p.classList.contains('dcell')) return; idle(q1(p, '.pxlegL'), t => ({ r: 4 * Math.sin(W2 * 9 * t + i) })); idle(q1(p, '.pxlegR'), t => ({ r: -4 * Math.sin(W2 * 9 * t + i) })); });

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('q'), tC = cut('m1'), tD = cut('m2'), tE = cut('m3'), tF = cut('b1'), tG = cut('j1'), tH = cut('n1'), tV = cut('v1'), tLoop = TOTAL - 0.5;
  const CUTS = [0, tB, tC, tD, tE, tF, tG, tH, tV], IDS = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#V'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 200 * easeIO((t - c + 0.35) / 0.7); }); x -= 1600 * easeIO((t - tLoop) / 0.6); return x; };
  const NIGHT = [[0, 0], [tE, 0.55], [tF, 0]];
  const nightAt = t => { let v = 0, pv = 0, tc = 0; for (const [tt, o] of NIGHT) if (t >= tt) { pv = v; v = o; tc = tt; } return pv + (v - pv) * clamp((t - tc + 0.25) / 0.6); };
  custom(t => {
    const x = camX(t);
    $('#far').style.transform = `translate(${(-x * 0.06).toFixed(1)}px,0)`;
    $('#mid').style.transform = `translate(${(-x * 0.25).toFixed(1)}px,${(8 * Math.sin(W2 * 4 * t)).toFixed(1)}px)`;
    $('#night').style.opacity = nightAt(t).toFixed(3);
  });
  grade(0, 'transparent'); grade(tB, 'rgba(77,201,255,.14)'); grade(tC, 'rgba(255,200,80,.16)'); grade(tD, 'rgba(120,150,255,.16)'); grade(tE, 'rgba(60,70,200,.3)');
  grade(tF, 'rgba(255,159,67,.14)'); grade(tG, 'rgba(255,95,162,.2)'); grade(tH, 'rgba(77,255,136,.12)'); grade(tV, 'rgba(255,59,92,.14)'); grade(tLoop + 0.3, 'transparent');
  $$('.mm').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2')) idle(m, t => ({ y: 6 * Math.sin(W2 * 16 * t + i), r: 1.4 * Math.sin(W2 * 8 * t + i) })); });

  // ================= A: «В твоей камере двести мегапикселей — двести миллионов пикселей. Я — один из них.» =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  hide(aChip); hide(aPx);
  punch(A.ph, W('hook', 2), 0.05); punch(A.n1, W('hook', 3) + 0.03, 0.1); punch(A.n2, W('hook', 4), 0.08); sfx('ding', W('hook', 3), 0.35);
  mascotPose(A.m, 0.3, 'point'); mascotPose(A.m, W('hook', 3), 'pointUp'); mascotPose(A.m, W('hook', 5), 'point');
  slideIn(aChip, W('hook', 5), 'right', 0.6, 400); sfx('whoosh', W('hook', 5), 0.4);
  tw(q1(A.ph, '.lensGlow'), W('hook', 6), 0.4, { o: [0, 1] }, 'lin');
  focus('#A > .cam', W('hook', 6) + 0.2, 540, LY, 1.16, 1.4);
  const tMe = W('hook', 7) - 0.08;
  tw(aPx, tMe, 0.05, { o: [0, 1] }, 'lin'); tw(aPx, tMe, 0.45, { s: [0.15, 1], y: [60, 0] }, 'back'); ringAt('#A .cam', LX, LY, tMe, 200, '#ff9f43'); sfx('pop', tMe, 0.7);
  pxPose(aPx, W('hook', 8), 'up'); mascotPose(A.m, tMe, 'shock');
  tw(aChip, W('hook', 7), 0.3, { o: [1, 0] }, 'lin');

  // ================= B: «Думаешь, все двести попадают в фото? Байт или не байт?» =================
  morphCut('#A', '#B', tB, aPx, bPx, 0.62, 0);
  hide(bQ); hide(bC1); hide(bC2); bMini.forEach(e => hide(e)); hide(bPh);
  popIn(bPh, W('q', 1) - 0.1, 0.4); sfx('pop', W('q', 1), 0.4);
  mascotPose(bM, tB + 0.15, 'think'); mascotPose(bM, W('q', 1), 'pointUp'); mascotPose(bM, W('q', 5), 'pointL');
  pxPose(bPx, tB + 0.3, 'rest'); pxPose(bPx, W('q', 3), 'up');
  tw(q1(bPx, '.pxpup'), W('q', 3), 0.3, { x: [0, 8], y: [0, -6] }, 'out');
  // a stream of pixels flies from the bucket into the photo along an arc
  bMini.forEach((e, k) => { const t = W('q', 2) + k * 0.035, x1 = 790 - 255 + (hash(k) - 0.5) * 200, y1 = 440 - 640 + (hash(k * 3) - 0.5) * 200;
    tw(e, t, 0.04, { o: [0, 1] }, 'lin'); tw(e, t, 0.6, { x: [0, x1] }, 'inOut'); tw(e, t, 0.3, { y: [0, -320] }, 'out'); tw(e, t + 0.3, 0.3, { y: [-320, y1] }, 'in'); tw(e, t + 0.55, 0.1, { o: [1, 0] }, 'lin'); if (k % 5 === 0) sfx('tick', t, 0.3); });
  popIn(bQ, W('q', 5), 0.4); sfx('blip', W('q', 5), 0.5);
  tw(bPh, W('q', 5) + 0.1, 0.4, { r: [0, -6] }, 'back');
  slideIn(bC1, W('q', 6), 'left', 0.5, 400); slideIn(bC2, W('q', 8), 'right', 0.5, 600); sfx('whoosh', W('q', 6), 0.5); sfx('whoosh', W('q', 8), 0.5);
  mascotPose(bM, W('q', 6), 'point'); mascotPose(bM, W('q', 8), 'shrug'); pxPose(bPx, W('q', 6), 'shrug');
  punch(bC1, W('q', 7), 0.06); punch(bC2, W('q', 9), 0.06);
  focus('#B > .cam', W('q', 5), 680, 560, 1.07, 0.5);

  // ================= C: «Моя работа — ловить свет, как ведёрко ловит дождь.» =================
  tWhip('#B', '#C', tC);
  hide(cChip); hide(cHandle);
  slideIn(cChip, W('m1', 1), 'left', 0.6, 400); sfx('whoosh', W('m1', 1), 0.4);
  pxPose(cPx, tC + 0.15, 'point'); pxPose(cPx, W('m1', 2), 'catch');
  tw(q1(cPx, '.pxglow'), W('m1', 3), 0.4, { o: [0, 1] }, 'lin');
  for (let k = 0; k < 16; k++) { const t = W('m1', 2) + k * 0.13, x = rimX0 + 40 + hash(k * 5.3) * (rimX1 - rimX0 - 80); lightDrop('#C .cam', x + (hash(k) - 0.5) * 60, 120, x, rimY + 20, t, 0.5); if (k % 3 === 0) sfx('tick', t + 0.5, 0.35); }
  fillTo(cPx, W('m1', 2) + 0.4, 0.15, 0.85, 2.0);
  tw(cHandle, W('m1', 5) - 0.05, 0.05, { o: [0, 1] }, 'lin'); tw($$('#C .hdl path'), W('m1', 5), 0.45, { dash: [100, 0] }, 'out'); sfx('clink', W('m1', 5) + 0.3, 0.6);
  tw(cPx, W('m1', 6), 0.25, { r: [0, -4] }, 'out'); tw(cPx, W('m1', 6) + 0.25, 0.4, { r: [-4, 3] }, 'inOut'); tw(cPx, W('m1', 7) + 0.2, 0.3, { r: [3, 0] }, 'out');
  mascotPose(cM, tC + 0.2, 'think'); mascotPose(cM, W('m1', 5), 'cheer');
  focus('#C > .cam', W('m1', 5), 540, rimY, 1.08, 0.5);

  // ================= D: «Но нас двести миллионов на пластинке размером с ноготь, и света мне достаётся капля.» =================
  morphCut('#C', '#D', tD, cPx, dCell, 0.62, 0);
  hide(dChip); hide(dRing); hide(dHand); hide(dN);
  tw(dRing, tD + 0.4, 0.2, { o: [0, 1] }, 'lin'); idle(dRing, t => ({ s: 1 + 0.12 * Math.sin(t * 9) }));
  const cells = $$('#D .sngrid rect'); cells.forEach((c, k) => { const r = Math.floor(k / 12), cc = k % 12, t = tD + 0.15 + (Math.hypot(r - 6, cc - 4)) * 0.03; tw(c, t, 0.3, { o: [0, 0.85] }, 'out'); });
  const tN = W('m2', 2);
  popIn(dN, tN - 0.05, 0.35); const dNi = q1(dN, 'i'); custom(t => { if (t < tD || t > tE + 0.5) return; dNi.textContent = Math.round(200 * (1 - Math.pow(1 - clamp((t - tN) / 0.8), 2.2))); });
  sfx('riser2', tN - 0.2, 0.4); sfx('ding', tN + 0.8, 0.4);
  // pull out: the whole grid shrinks to a plate next to a fingertip
  const tSh = W('m2', 4);
  tw(dW, tSh, 0.9, { s: [1, 0.13], y: [0, 160] }, 'inOut'); sfx('whoosh', tSh, 0.6);
  tw(dRing, tSh, 0.3, { o: [1, 0] }, 'lin');
  tw(dHand, W('m2', 5) - 0.1, 0.05, { o: [0, 1] }, 'lin'); tw(dHand, W('m2', 5) - 0.1, 0.6, { y: [-700, 0] }, 'out'); sfx('thud', W('m2', 5) + 0.4, 0.4);
  slideIn(dChip, W('m2', 5), 'right', 0.6, 400); sfx('whoosh', W('m2', 5), 0.3);
  tw(dN, W('m2', 5) - 0.15, 0.35, { y: [0, -260], o: [1, 0] }, 'in');
  mascotPose(dM, tD + 0.2, 'point'); mascotPose(dM, tN, 'pointUp'); mascotPose(dM, tSh + 0.2, 'shock'); mascotPose(dM, W('m2', 9), 'think'); mascotPose(dM, W('m2', 12), 'sad');
  focus('#D > .cam', W('m2', 7) + 0.1, 580, 880, 1.15, 0.5);
  // light rains on the plate, almost all of it misses; one drop lands
  for (let k = 0; k < 22; k++) { const t = W('m2', 9) + k * 0.05, x = 80 + hash(k * 7.1) * 920; lightDrop('#D .cam', x, 160 + hash(k) * 200, x + 20, 1300, t, 0.7); }
  lightDrop('#D .cam', 540, 300, 540, 890, W('m2', 12) - 0.45, 0.45, 1.3); ringAt('#D .cam', 540, 890, W('m2', 12), 120, '#ffe14d'); sfx('pop', W('m2', 12), 0.6);
  tw(dChip, W('m2', 9), 0.3, { o: [1, 0] }, 'lin');

  // ================= E: «Вечером сижу пустой, и на фото вместо меня — рябь.» =================
  tCircle('#D', '#E', tE, 540, 900);
  hide(eChip); hide(ePh); hide(eFlash); hide(eMoon);
  tw(q1(ePx, '.pxfill'), 0, 0.001, { sy: [0.04, 0.04] });
  slideIn(eChip, W('m3', 0), 'left', 0.6, 400); sfx('whoosh', W('m3', 0), 0.4);
  tw(eMoon, tE + 0.1, 0.6, { y: [140, 0], o: [0, 1] }, 'out');
  pxPose(ePx, tE + 0.1, 'sad'); tw(q1(ePx, '.pxpup'), W('m3', 1), 0.3, { y: [0, 6] }, 'out');
  tw(q1(ePx, '.pxtear'), W('m3', 2), 0.1, { o: [0, 1] }, 'lin'); tw(q1(ePx, '.pxtear'), W('m3', 2), 0.9, { y: [0, 60] }, 'in'); tw(q1(ePx, '.pxtear'), W('m3', 2) + 0.8, 0.1, { o: [1, 0] }, 'lin');
  for (let k = 0; k < 3; k++) lightDrop('#E .cam', 180 + k * 70, 300, 200 + k * 60, 720, W('m3', 1) + k * 0.35, 0.5, 0.6);
  tw(ePx, W('m3', 2), 0.3, { sy: [1, 0.9] }, 'out'); tw(ePx, W('m3', 2) + 0.3, 0.4, { sy: [0.9, 1] }, 'back');
  // the mascot snaps a photo: flash, the print slides out, and it is all noise
  mascotPose(eM, tE + 0.2, 'hold'); tw(eMPh, W('m3', 3), 0.3, { y: [0, -60], r: [0, -10] }, 'out');
  const tFl = W('m3', 5);
  tw(eFlash, tFl, 0.05, { o: [0, 0.85] }, 'lin'); tw(eFlash, tFl + 0.06, 0.35, { o: [0.85, 0] }, 'out'); sfx('zap', tFl, 0.4);
  tw(ePh, tFl + 0.1, 0.05, { o: [0, 1] }, 'lin'); tw(ePh, tFl + 0.1, 0.5, { y: [300, 0], r: [12, -4], s: [0.5, 1] }, 'back');
  const eNz = q1(ePh, '.phnoise'); tw(eNz, W('m3', 8) - 0.1, 0.15, { o: [0, 1] }, 'lin'); idle(eNz, t => ({ x: t > W('m3', 8) ? (hash(Math.floor(t * 20)) - 0.5) * 10 : 0 }));
  sfx('glitch', W('m3', 8), 0.6); shake(W('m3', 8), 0.3, 8);
  mascotPose(eM, W('m3', 6), 'point'); mascotPose(eM, W('m3', 8), 'facepalm');
  focus('#E > .cam', W('m3', 8), 720, 560, 1.08, 0.4);

  // ================= F: «Поэтому телефон хитрит: склеивает нас по шестнадцать в одно ведро. Samsung так и пишет: по умолчанию шестнадцать пикселей работают как один.» =================
  morphCut('#E', '#F', tF, ePx, fP[0], 0.62, 0);
  hide(fBig); hide($$('#F .pxs')[0]); hide(fN); hide(fDef); hide(fSrc); hide(fGrid);
  fP.forEach((p, k) => { if (k) { tw(p, tF + 0.1 + k * 0.03, 0.35, { s: [0.2, 1], o: [0, 1] }, 'back'); } tw(q1(p, '.pxfill'), 0, 0.001, { sy: [0.1, 0.1] }); });
  mascotPose(fM, tF + 0.2, 'think'); mascotPose(fM, W('b1', 2), 'shrug');
  const tM = W('b1', 3), CXF = 540, CYF = 690;
  fP.forEach((p, k) => { const r = Math.floor(k / 4), c = k % 4, x0 = 150 + c * 170 + 72, y0 = 300 + r * 190 + 92; const t = tM + hash(k * 1.9) * 0.25;
    tw(p, t, 0.55, { x: [0, (CXF - x0) * 0.85], y: [0, (CYF - y0) * 0.85], s: [1, 0.35] }, 'inOut'); tw(p, t + 0.5, 0.15, { o: [1, 0] }, 'lin'); if (k % 4 === 0) sfx('pop', t + 0.5, 0.3); });
  const tBig = W('b1', 6) - 0.1;
  tw(fBig, tBig, 0.05, { o: [0, 1] }, 'lin'); tw(fBig, tBig, 0.5, { s: [0.3, 1] }, 'back'); tw($$('#F .pxs')[0], tBig, 0.3, { o: [0, 1] }, 'lin'); sfx('thud', tBig + 0.1, 0.6); shake(tBig + 0.15, 0.25, 10);
  popIn(fN, W('b1', 6), 0.4); sfx('ding', W('b1', 6), 0.35);
  for (let k = 0; k < 10; k++) { const t = W('b1', 7) + k * 0.06, x = 380 + hash(k * 2.7) * 320; lightDrop('#F .cam', x, 150, x, 590, t, 0.4); }
  tw(q1(fBig, '.pxfill'), 0, 0.001, { sy: [0.12, 0.12] }); fillTo(fBig, W('b1', 8), 0.12, 0.9, 0.9); tw(q1(fBig, '.pxglow'), W('b1', 9), 0.3, { o: [0, 1] }, 'lin');
  pxPose(fBig, tBig + 0.2, 'up'); pxPose(fBig, W('b1', 9), 'catch'); mascotPose(fM, W('b1', 9), 'cheer');
  focus('#F > .cam', W('b1', 6), 540, 690, 1.12, 0.6);
  // the source
  slideIn(fSrc, W('b2', 0), 'down', 0.6, 300); sfx('whoosh', W('b2', 0), 0.35); mascotPose(fM, W('b2', 0), 'pointL'); pxPose(fBig, W('b2', 1), 'point');
  slideOut(fN, W('b2', 4) - 0.1, 'left', 0.35, 600); slideIn(fDef, W('b2', 4), 'right', 0.5, 600); sfx('whoosh', W('b2', 4), 0.35);
  tw(fGrid, W('b2', 6), 0.1, { o: [0, 1] }, 'lin'); tw($$('#F .fgrid path'), W('b2', 6), 0.4, { s: [1.4, 1] }, 'out'); sfx('tick', W('b2', 6), 0.6);
  tw(fGrid, W('b2', 8), 0.5, { o: [1, 0] }, 'lin'); ringAt('#F .cam', 540, 720, W('b2', 10), 420, '#ff9f43'); sfx('ding', W('b2', 10), 0.4);
  pxPose(fBig, W('b2', 8), 'hug'); punch(fBig, W('b2', 10), 0.08); mascotPose(fM, W('b2', 6), 'think'); mascotPose(fM, W('b2', 10), 'point');

  // ================= G: «Живём как в коммуналке: шестнадцать соседей, одно ведро.» =================
  tSlideUp('#F', '#G', tG);
  hide(gChip); hide(gN1); hide(gN2);
  slideIn(gChip, W('j1', 2), 'left', 0.6, 400); sfx('whoosh', W('j1', 2), 0.4);
  const tenants = gBack.concat(gFront);
  tenants.forEach((p, k) => { const t = W('j1', 4) - 0.2 + k * 0.035; tw(p, t, 0.3, { s: [0.3, 1], o: [0, 1] }, 'back'); });
  tenants.forEach(p => tw(p, 0, 0.001, { o: [0, 0] }));
  popIn(gN1, W('j1', 4), 0.4); sfx('pop', W('j1', 4), 0.4);
  tenants.forEach((p, k) => { [W('j1', 5) + (k % 4) * 0.1, W('j1', 7) + (k % 3) * 0.08].forEach(t => jump(p, t, 30 + (k % 3) * 12, 0.34)); pxPose(p, W('j1', 5) + 0.1, k % 2 ? 'up' : 'hug'); });
  // everyone grabs at the one bucket; it wobbles
  tw(gN1, W('j1', 6) - 0.05, 0.12, { y: [0, -50], o: [1, 0] }, 'in'); tw(gN2, W('j1', 6), 0.25, { y: [50, 0], o: [0, 1] }, 'back'); sfx('blip', W('j1', 6), 0.5);
  idle(gB, t => ({ r: t > W('j1', 6) ? 5 * Math.sin((t - W('j1', 6)) * 18) * Math.exp(-(t - W('j1', 6)) * 1.5) : 0 }));
  pxPose(gB, tG + 0.2, 'shrug'); pxPose(gB, W('j1', 6), 'shock');
  sfx('clink', W('j1', 5) + 0.1, 0.4); sfx('clink', W('j1', 7), 0.4);
  burst('#G .cam', 12, 540, 700, W('j1', 7) + 0.1, 220, 13, 'conf', 60);
  focus('#G > .cam', W('j1', 6), 540, 820, 1.12, 0.5);

  // ================= H: «Считай: двести делим на шестнадцать — в фото попадает двенадцать мегапикселей.» =================
  tDrop('#G', '#H', tH);
  hide(hN); hide(hDiv); hide(hPh); hide(hRes); hBlk.forEach(e => hide(e));
  popIn(hN, W('n1', 0) + 0.15, 0.4); sfx('pop', W('n1', 0) + 0.15, 0.4); punch(hN, W('n1', 1), 0.08);
  mascotPose(hM, tH + 0.2, 'think'); mascotPose(hM, W('n1', 1), 'pointUp');
  tw(hN, W('n1', 2), 0.4, { x: [0, -180] }, 'inOut'); slideIn(hDiv, W('n1', 3), 'right', 0.5, 500); sfx('whoosh', W('n1', 3), 0.4);
  // sixteen squares fold into one (the division shown)
  hBlk.forEach((e, k) => { const r = Math.floor(k / 4), c = k % 4, x = 820 + c * 40, y = 470 + r * 40; place(e, x, y);
    tw(e, W('n1', 4) + k * 0.02, 0.2, { o: [0, 1], s: [0.3, 1] }, 'back'); tw(e, W('n1', 4) + 0.5, 0.35, { x: [0, (880 - x) + 0], y: [0, (530 - y)], s: [1, 2.6] }, 'inOut'); tw(e, W('n1', 5) + 0.1, 0.25, { o: [1, 0] }, 'lin'); });
  tw(hN, W('n1', 5) - 0.05, 0.4, { y: [0, -40], s: [1, 0.7], x: [-180, -130] }, 'inOut'); tw(hDiv, W('n1', 5) - 0.05, 0.4, { y: [0, -40], s: [1, 0.7], x: [0, -60] }, 'inOut');
  tw(hPh, W('n1', 5), 0.05, { o: [0, 1] }, 'lin'); tw(hPh, W('n1', 5), 0.55, { y: [500, 0], r: [8, -3] }, 'out'); sfx('whoosh', W('n1', 5), 0.4);
  mascotPose(hM, W('n1', 6), 'point');
  stamp(hRes, W('n1', 8) - 0.02, -4, 12); const hRi = q1(hRes, 'i'); custom(t => { if (t < tH || t > tV + 0.5) return; hRi.textContent = t < W('n1', 8) ? 200 : Math.max(12, Math.round(200 - 188 * clamp((t - W('n1', 8)) / 0.35))); });
  burst('#H .cam', 16, 560, 760, W('n1', 8) + 0.1, 300, 41, 'spark', 0); sfx('ding', W('n1', 8) + 0.1, 0.45);
  mascotPose(hM, W('n1', 8), 'shock');
  focus('#H > .cam', W('n1', 8), 560, 760, 1.15, 0.6);

  // ================= V: «Так что двести мегапикселей в фото — байт. Все двести включай сам и только на солнце…» =================
  tZoom('#H', '#V', tV);
  hide(vSt); hide(vMode); hide(vTg); hide(vSun); hide(vX);
  punch(vPh, W('v1', 2), 0.08); tw(q1(vPh, '.lensGlow'), W('v1', 3), 0.3, { o: [0, 1] }, 'lin'); sfx('blip', W('v1', 2), 0.4);
  tw(vX, W('v1', 6) + 0.15, 0.05, { o: [0, 1] }, 'lin'); tw(vX, W('v1', 6) + 0.15, 0.3, { sx: [0, 1], r: [-30, -30] }, 'out'); vX.style.transformOrigin = '0 50%';
  tw([vPh, vX, $('#V .vpsh')], W('e1', 0) - 0.15, 0.4, { x: [0, 700], o: [1, 0] }, 'in'); sfx('whoosh', W('e1', 0) - 0.15, 0.4);
  const tSt = W('v1', 6) - 0.02;
  mascotPose(vM, tV + 0.1, 'point'); mascotPose(vM, W('v1', 2), 'think');
  mascotPose(vM, tSt - 0.45, 'pointUp'); tw(vM, tSt - 0.42, 0.22, { y: [0, -90] }, 'out'); tw(vM, tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose(vM, tSt - 0.18, 'point', 0.18);
  stamp(vSt, tSt, -7, 26); burst(vFx, 24, 540, 360, tSt + 0.05, 420, 61, 'conf', 140); sfx('ding', tSt + 0.2, 0.4);
  mascotPose(vM, tSt + 0.4, 'cheer');
  tw(vSt, W('e1', 0) - 0.1, 0.4, { y: [0, -60], s: [1, 0.75] }, 'inOut');
  slideIn(vMode, W('e1', 1), 'right', 0.5, 500); sfx('whoosh', W('e1', 1), 0.35); mascotPose(vM, W('e1', 1), 'point');
  slideIn(vTg, W('e1', 2), 'right', 0.5, 500);
  tw(vKnob, W('e1', 3), 0.3, { x: [0, 170] }, 'out'); tw(vTg, W('e1', 3), 0.001, { o: [1, 1] }); custom(t => { vTg.style.background = t > W('e1', 3) + 0.1 ? '#ff9f43' : '#2a2f48'; }); sfx('tick', W('e1', 3), 0.7);
  tw(vSun, W('e1', 5) - 0.1, 0.05, { o: [0, 1] }, 'lin'); tw(vSun, W('e1', 5) - 0.1, 0.5, { y: [250, 0], s: [0.5, 1] }, 'back'); idle(q1(vSun, '.sunrays'), t => ({ r: t * 30 }));
  mascotPose(vM, W('e1', 5), 'pointUp');
  tw([vSt, vMode, vTg, vSun], tLoop - 0.3, 0.3, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw(vM, tLoop + 0.3, 0.001, { o: [1, 0] }); tw($$('#V .mshd'), tLoop + 0.3, 0.001, { o: [1, 0] });
}, {});
