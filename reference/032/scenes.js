// 032 «2 617 касаний в день. А сосиской экран листается?» — Как это работает (длинный формат, пятница 13.11.2026).
// Стиль: проверка мифа на глазах — маскот ставит два опыта (варежка, сосиска). Источники: dscout 2016 (2 617 касаний в день),
// Microchip «Mutual Capacitance Measurement» (сетка X/Y, тело уводит часть заряда), PIP «Gloves & Touchscreen Compatibility» (2017),
// Engadget 12.02.2010 (сосиски как стилус в Южной Корее, рост продаж). Свой мир: зимний вечерний город (сияние, холмы, дома, снег — параллакс).
// Планы: A средний, B разрез (масштаб: телефон раскладывается на слои), C крупный (сетка и палец), D средний, E общий (улица),
// F крупный (шутка), G средний, H общий (остановка в Корее), V средний. Склейки-превращения: телефон → телефон (A→B, F→G), сосиска → сосиска (G→H).
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
    const cols = ['#ff8a6b', '#5fe8ff', '#7dff8a', '#ffe14d', '#ff5fa2'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.8, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.6, 0.25, { o: [1, 0] }, 'lin'); } };
  const ringAt = (par, x, y, t, sz = 110, col = '#fff') => { const r = mk(par, 'ring'); r.style.borderColor = col; place(r, x - sz / 2, y - sz / 2, sz, sz); hide(r);
    tw(r, t, 0.05, { o: [0, 1] }, 'lin'); tw(r, t, 0.45, { s: [0.4, 1.7] }, 'out'); tw(r, t + 0.25, 0.2, { o: [1, 0] }, 'lin'); };
  const shadow = (par, x, y, w, h = 60) => put(par, 'shd', '', x - w / 2, y - h / 2, w, h);
  const mascot = (par, id, x, y, sz) => put(par, 'mm', mascotSVG(id), x, y, sz, sz);
  // phone prop with a live screen (.scr) and an optional scrolling feed
  const phone = (par, id, x, y, w, cls = '') => {
    const h = w * 420 / 220, s = w / 220, el = put(par, 'pp ' + cls, phonePropSVG(id), x, y, w, h);
    const scr = put(el, 'scr', '', 22 * s, 44 * s, 176 * s, 330 * s); scr.style.overflow = 'hidden'; scr.style.borderRadius = (18 * s) + 'px';
    return { el, scr, s, x, y, w, h, sx: x + 22 * s, sy: y + 44 * s, sw: 176 * s, sh: 330 * s };
  };
  const feed = (ph, n = 12) => {
    const cw = ph.sw - 20 * ph.s, ch = cw * 0.75, gap = 12 * ph.s, wrap = put(ph.scr, 'feed', '', 0, 0, ph.sw, n * (ch + gap));
    for (let k = 0; k < n; k++) put(wrap, 'fc', feedCardHTML(k + n), 10 * ph.s, 10 * ph.s + k * (ch + gap), cw, ch);
    return { wrap, step: ch + gap };
  };
  // scroll: list of [t, steps] -> the feed slides up by steps*step with a soft stop
  const scroller = (fd, list) => { let acc = 0; list.forEach(([t, n, d = 0.35]) => { tw(fd.wrap, t, d, { y: [-acc * fd.step, -(acc + n) * fd.step] }, 'out'); acc += n; }); };
  const hand = (par, id, tipX, tipY, w = 200, r = 0, sleeve = '#4a7dff') => {
    const s = w / 300, el = put(par, 'hand', pointHandSVG(id, sleeve), tipX - 150 * s, tipY - 628 * s, w, 640 * s);
    el.style.transformOrigin = `${150 * s}px ${628 * s}px`; if (r) tw(el, 0, 0.001, { r: [r, r] }); return el;
  };
  const chip = (par, cls, txt, x, y, fs) => { const c = put(par, cls, txt, x, y); if (fs) c.style.fontSize = fs + 'px'; return c; };

  // ---------- world ----------
  $('#aur').innerHTML = aurSVG(); $('#hills').innerHTML = hillsSVG(); $('#town').innerHTML = townSVG();
  dof('#aur', 1.2); dof('#hills', 3); dof('#town', 2);
  const SNOW = []; for (let k = 0; k < 64; k++) { const f = mk('#snow', 'flake'); const sz = 6 + 12 * hash(k * 1.7); place(f, 0, 0, sz, sz); f.style.opacity = (0.45 + 0.5 * hash(k * 2.9)).toFixed(2);
    SNOW.push({ f, x0: hash(k * 3.3) * 1080, y0: hash(k * 5.1) * 2000, v: 1 + Math.floor(3 * hash(k * 7.7)), a: 20 + 40 * hash(k * 4.4), m: 2 + Math.floor(4 * hash(k * 8.8)) }); }
  lookFX({ grain: 0.11, tint: 'transparent' });

  // ================= layouts =================
  // ----- A: hook. «2 617 касаний в день» + a phone being tapped -----
  const buildA = (cam, s) => {
    shadow(cam, 540, 1200, 380, 70); shadow(cam, 170, 1290, 260, 50);
    const ph = phone(cam, 'a' + s, 375, 560, 330, 'a-ph'); const fd = feed(ph, 14);
    const hd = hand(cam, 'a' + s, 585, 830, 200, 28);
    const n1 = put(cam, 'big', '<i>2 617</i>', 0, 170, 1080); n1.style.fontSize = '230px';
    const n2 = put(cam, 'lbl', 'КАСАНИЙ В ДЕНЬ', 0, 420, 1080); n2.style.fontSize = '70px';
    const m = mascot(cam, 'am' + s, 0, 960, 340);
    return { n1, n2, ph, fd, hd, m };
  };
  const A = buildA('#A .cam', ''); const A2 = buildA('#A2 .cam', '2');
  const camA = $('#A .cam');
  const aSrc = chip(camA, 'nb-chip c chipS', 'DSCOUT · 2016', 40, 506);
  const aSs = put(camA, 'ss', sausageSVG('a'), 600, 960, 380, 146);
  const aQ = [[650, 820], [930, 900], [560, 1120]].map(([x, y]) => put(camA, 'qm', '?', x, y));

  // ----- B: cutaway / scale. The phone splits into glass, a grid of wires and the display -----
  const camB = $('#B .cam');
  shadow(camB, 540, 1210, 420, 70);
  const bPh = phone(camB, 'b', 350, 470, 380, 'b-ph'); feed(bPh, 6);
  const bHd = hand(camB, 'b', 600, 760, 200, 0, '#ff8a6b');
  const LW = 700, LH = 264, LX = 300;
  const bDisp = put(camB, 'lay', layerSVG('display', 'bd'), LX, 880, LW, LH), bGrid = put(camB, 'lay', layerSVG('grid', 'bg'), LX, 590, LW, LH), bGlass = put(camB, 'lay', layerSVG('glass', 'bs'), LX, 300, LW, LH);
  const bC1 = chip(camB, 'nb-chip c chipL c', 'СТЕКЛО', 70, 360, 40), bC2 = chip(camB, 'nb-chip chipL', 'СЕТКА', 70, 650, 40);
  const bM = mascot(camB, 'bm', 0, 1030, 300);

  // ----- C: close-up from above: the wire grid, charges, the finger -----
  const camC = $('#C .cam');
  const pan = put(camC, 'panel', '', 60, 200, 960, 1080);
  const RY = [], CX = []; for (let i = 1; i <= 7; i++) RY.push(i * 135); for (let j = 1; j <= 6; j++) CX.push(j * 137);
  RY.forEach(y => put(pan, 'wr', '', 20, y - 5, 920, 10)); CX.forEach(x => put(pan, 'wc', '', x - 5, 20, 10, 1040));
  const PX = CX[2], PY = RY[3];                    // contact point inside the panel (411, 540) -> stage (471, 740)
  const hole = put(pan, 'hole', '', PX - 120, PY - 120, 240, 240); hole.style.borderRadius = '50%'; hole.style.background = 'radial-gradient(closest-side,rgba(255,59,92,.55),rgba(255,59,92,0))';
  const CH = []; for (let k = 0; k < 18; k++) { const c = put(pan, 'chg', '', 0, 0); const row = k % 2 === 0; CH.push({ c, row, lane: row ? RY[(k / 2) % 7 | 0] : CX[((k - 1) / 2) % 6 | 0], ph: hash(k * 3.7), sp: 0.22 + 0.12 * hash(k * 1.9) }); }
  const cHd = hand(camC, 'c', 60 + PX, 200 + PY, 330, 0, '#4a7dff');
  const STEAL = []; for (let k = 0; k < 10; k++) STEAL.push(put(pan, 'chg', '', 0, 0));
  const cM = mascot(camC, 'cm', 760, 1000, 300);

  // ----- D: medium. The phone finds where the charge went missing; a dumbbell finds nothing -----
  const camD = $('#D .cam');
  shadow(camD, 540, 1090, 420, 70); shadow(camD, 160, 1290, 260, 50);
  const dPh = phone(camD, 'd', 360, 380, 360); const dS = dPh.s;
  const DR = [], DC = []; for (let i = 1; i <= 5; i++) DR.push(i * dPh.sh / 6); for (let j = 1; j <= 3; j++) DC.push(j * dPh.sw / 4);
  DR.forEach(y => { const l = put(dPh.scr, 'wr', '', 6, y - 4, dPh.sw - 12, 8); }); DC.forEach(x => put(dPh.scr, 'wc', '', x - 4, 6, 8, dPh.sh - 12));
  dPh.scr.style.background = 'linear-gradient(160deg,#16465c,#0a2232)';
  const dScan = put(dPh.scr, 'scan', '', 0, -60, dPh.sw, 120);
  const DTX = dPh.sx + DC[1], DTY = dPh.sy + DR[1];        // the touched crossing
  const dXh = put(camD, 'xh', '', DTX - 60, DTY - 60, 120, 120);
  const dHd = hand(camD, 'd', DTX, DTY, 220, 0, '#ff8a6b');
  const dDb = put(camD, 'db', dumbbellSVG('d'), dPh.sx + dPh.sw / 2 - 170, dPh.sy + dPh.sh * 0.62 - 90, 340, 170);
  const dChip = chip(camD, 'nb-chip r chipL r', 'НАЖИМ', 600, 1110, 46), dStrike = put(dChip, 'strk', '', 20, 42, 250, 12); dStrike.style.background = 'var(--red)'; dStrike.style.borderRadius = '6px'; dStrike.style.transformOrigin = '0 50%';
  const dM = mascot(camD, 'dm', -20, 960, 340);
  const dHd2 = hand(camD, 'd2', DTX + 40, DTY + 300, 200, 0, '#7dff8a');

  // ----- E: general, the winter street: experiment 1, the mitten -----
  const camE = $('#E .cam');
  shadow(camE, 230, 1240, 560, 60); shadow(camE, 805, 1190, 300, 60); shadow(camE, 440, 1290, 240, 50);
  const eBs = put(camE, 'bs', busStopSVG('e'), -40, 700, 520, 470);
  const ePh = phone(camE, 'e', 690, 740, 230); feed(ePh, 6);
  const eMt = put(camE, 'mt', mittenSVG('e', '#ff5f6d'), 685, 330, 240, 304); eMt.style.transformOrigin = '120px 152px';
  const eChip = chip(camE, 'nb-chip chipL', 'ОПЫТ 1: ВАРЕЖКА', 60, 220, 42);
  const eNo = put(camE, 'qm', '✕', 760, 560); eNo.style.color = 'var(--red)';
  const eM = mascot(camE, 'em', 290, 1000, 300);

  // ----- F: close-up joke: two mittens press as hard as they can, the screen sleeps -----
  const camF = $('#F .cam');
  shadow(camF, 540, 1290, 520, 70);
  const fPh = phone(camF, 'f', 330, 470, 420, 'f-ph'); fPh.scr.style.background = 'linear-gradient(180deg,#cfe6ff,#9cc0e6)';
  const fFace = put(fPh.scr, 'face', sleepFaceSVG(), fPh.sw / 2 - 120, fPh.sh * 0.35, 240, 240);
  const fMt1 = put(camF, 'mt', mittenSVG('f1', '#ff5f6d'), 300, 180, 250, 316), fMt2 = put(camF, 'mt', mittenSVG('f2', '#ff5f6d'), 530, 180, 250, 316);
  [fMt1, fMt2].forEach(m => { m.style.transformOrigin = '125px 158px'; tw(m, 0, 0.001, { r: [180, 180] }); });
  const fZ = [0, 1, 2].map(k => put(camF, 'zz', 'Z', 700 + k * 40, 760 - k * 30));
  const fM = mascot(camF, 'fm', 0, 1000, 320);
  const fSw = [0, 1, 2, 3].map(k => put(camF, 'drop', '', 0, 0));

  // ----- G: medium: experiment 2, the sausage -----
  const camG = $('#G .cam');
  shadow(camG, 740, 1150, 400, 70); shadow(camG, 290, 830, 400, 50); shadow(camG, 170, 1290, 260, 50);
  const gPh = phone(camG, 'g', 560, 440, 360, 'g-ph'); const gFd = feed(gPh, 14);
  const gSs = put(camG, 'ss', sausageSVG('g'), 70, 690, 440, 169, ); gSs.classList.add('g-ss');
  const gChip = chip(camG, 'nb-chip chipL', 'ОПЫТ 2: СОСИСКА', 60, 220, 42);
  const gM = mascot(camG, 'gm', 20, 960, 330);
  const gFlow = []; for (let k = 0; k < 8; k++) gFlow.push(put(camG, 'chgB', '', 0, 0));
  const gFx = put(camG, 'gfx', '', 0, 0);

  // ----- H: general: a snowy bus stop in Korea, everyone scrolls with sausages; sausage sales grow -----
  const camH = $('#H .cam');
  shadow(camH, 300, 1240, 620, 60); shadow(camH, 690, 1300, 250, 50); shadow(camH, 930, 1270, 260, 50);
  const hBs = put(camH, 'bs', busStopSVG('h', '#d84a5a'), 0, 640, 600, 542);
  const hP1 = put(camH, 'per', personSVG('h1', '#43c8a8', '#2a1a10'), 70, 880, 240, 288), hP2 = put(camH, 'per', personSVG('h2', '#ffb84d', '#3a2414'), 300, 890, 240, 288);
  const hS1 = put(camH, 'ss', sausageSVG('h1', false), 40, 1060, 150, 58); hS1.classList.add('h-ss'); const hS2 = put(camH, 'ss', sausageSVG('h2', false), 270, 1070, 150, 58);
  const hF1 = put(camH, 'pp', phonePropSVG('h1'), 200, 1030, 60, 115), hF2 = put(camH, 'pp', phonePropSVG('h2'), 430, 1040, 60, 115);
  const CR = [0, 1, 2, 3].map(k => put(camH, 'crate', '', 830, 1150 - k * 112, 210, 108));
  CR.forEach((c, k) => { c.innerHTML = `<div style="left:16px;top:22px;width:160px;height:52px">${sausageSVG('cr' + k, false)}</div>`; });
  const hArr = put(camH, 'arrowUp', '', 865, 560, 0, 0);
  const hSales = chip(camH, 'nb-chip g chipS', 'ПРОДАЖИ ↑', 780, 440); hSales.style.color = 'var(--gr)';
  const hSrc = chip(camH, 'nb-chip c chipS', 'ЮЖНАЯ КОРЕЯ · ENGADGET, 12.02.2010', 60, 220, 30);
  const hM = mascot(camH, 'hm', 560, 1010, 290);

  // ----- V: verdict «НЕ БАЙТ» + the takeaway: a glove with conductive fingertips -----
  const camV = $('#V .cam');
  shadow(camV, 540, 1170, 380, 64); shadow(camV, 920, 1270, 230, 50); shadow(camV, 140, 1180, 200, 50);
  const vSs = put(camV, 'ss', sausageSVG('v'), -40, 770, 360, 138); vSs.style.transformOrigin = '180px 69px';
  const vPh = phone(camV, 'v', 815, 870, 200); const vFd = feed(vPh, 10);
  const vMt = put(camV, 'mt', mittenSVG('v', '#4a7dff', true), 790, 470, 230, 291); vMt.style.transformOrigin = '115px 145px';
  const vM = mascot(camV, 'vm', 340, 790, 400);
  const vChip = chip(camV, 'nb-chip g chipS', 'ПЕРЧАТКА С ПРОВОДЯЩИМИ ПАЛЬЦАМИ', 90, 1215, 32); vChip.style.color = 'var(--gr)';
  const vSt = put(camV, 'stt', 'НЕ БАЙТ', 190, 260, 700, 180); vSt.style.cssText += ';border:18px solid var(--gr);color:var(--gr);font:900 108px/144px Unb';
  const vFx = put(camV, 'vfx', '', 0, 0);
  [eChip, gChip, hSrc].forEach(c => { c.style.left = ((1080 - c.offsetWidth) / 2).toFixed(0) + 'px'; });

  mascotLife(); mascotTalk();
  $$('.ssEye').forEach((e, i) => { if (e.closest('#A2')) return; const P = TOTAL / 10, ph = hash(i * 2.3) * P; idle(e, t => { if (t < 0.6 || t > TOTAL - 0.8) return {}; const u = (t + ph) % P; return { sy: u < 0.16 ? 1 - 0.9 * Math.sin(Math.PI * u / 0.16) : 1 }; }); });
  $$('#town .win').forEach((w, i) => { if (i % 5) return; custom(t => { w.style.opacity = (0.55 + 0.45 * Math.pow(0.5 + 0.5 * Math.sin(W2 * (6 + i % 7) * t + i), 2)).toFixed(2); }); });

  // ---------- cuts, camera, parallax, grade, snow ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('m0'), tC = cut('m2'), tD = cut('m5'), tE = cut('x1'), tF = cut('x2'), tG = cut('y1'), tH = cut('k1'), tV = cut('v1'), tLoop = TOTAL - 0.72;
  const CUTS = [0, tB, tC, tD, tE, tF, tG, tH, tV], IDS = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#V'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 200 * easeIO((t - c + 0.35) / 0.7); }); x -= 1600 * easeIO((t - tLoop) / 0.6); return x; };
  const SNOWON = [[0, 1], [tB, 0.15], [tC, 0], [tE, 1], [tF, 0.35], [tG, 1], [tV, 1]];
  const snowAt = t => { let v = 1, pv = 1, tc = 0; for (const [tt, o] of SNOWON) if (t >= tt) { pv = v; v = o; tc = tt; } return pv + (v - pv) * clamp((t - tc + 0.25) / 0.5); };
  custom(t => {
    const x = camX(t);
    $('#aur').style.transform = `translate(${(-x * 0.03).toFixed(1)}px,0)`;
    $('#hills').style.transform = `translate(${(-x * 0.1).toFixed(1)}px,0)`;
    $('#town').style.transform = `translate(${(-x * 0.3).toFixed(1)}px,0)`;
    const so = snowAt(t); $('#snow').style.opacity = so.toFixed(2);
    if (so > 0.01) for (const s of SNOW) { const y = (s.y0 + t * s.v * 2000 / TOTAL) % 2000 - 60, xx = ((s.x0 - x * 0.6 + s.a * Math.sin(W2 * s.m * t)) % 1080 + 1080) % 1080;
      s.f.style.transform = `translate(${xx.toFixed(1)}px,${y.toFixed(1)}px)`; }
  });
  grade(0, 'transparent'); grade(tB, 'rgba(95,232,255,.14)'); grade(tC, 'rgba(95,232,255,.2)'); grade(tD, 'rgba(255,190,90,.14)'); grade(tE, 'rgba(120,170,255,.16)');
  grade(tF, 'rgba(255,95,162,.2)'); grade(tG, 'rgba(255,138,107,.16)'); grade(tH, 'rgba(176,139,255,.16)'); grade(tV, 'rgba(125,255,138,.14)'); grade(tLoop + 0.3, 'transparent');
  $$('.mm').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2')) idle(m, t => ({ y: 6 * Math.sin(W2 * 16 * t + i), r: 1.4 * Math.sin(W2 * 8 * t + i) })); });

  // ================= A: «2 617 касаний в день. Столько раз мы трогаем телефон. А сосиской экран полистаешь?» =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  hide(aSrc); hide(aSs); aQ.forEach(q => hide(q));
  const DIRX = -Math.sin(28 * Math.PI / 180), DIRY = Math.cos(28 * Math.PI / 180);
  const taps = []; for (let t = 0.45; t < W('h2', 4) + 0.3; t += t < 2.3 ? 0.42 : 0.34) taps.push(t);
  taps.forEach((t, k) => { tw(A.hd, t - 0.1, 0.1, { x: [0, DIRX * 30], y: [0, DIRY * 30] }, 'in'); tw(A.hd, t, 0.2, { x: [DIRX * 30, 0], y: [DIRY * 30, 0] }, 'out');
    ringAt('#A .cam', 585, 830, t, 90, '#5fe8ff'); sfx('tick', t, 0.45); });
  scroller(A.fd, taps.map(t => [t + 0.02, 0.6, 0.3]));
  punch(A.n1, W('hook', 0) + 0.1, 0.1); punch(A.n2, W('hook', 1), 0.12); punch(A.n2, W('hook', 3), 0.08); sfx('ding', W('hook', 1), 0.35);
  mascotPose(A.m, 0.35, 'point'); mascotPose(A.m, W('hook', 1), 'shock'); mascotPose(A.m, W('h2', 0), 'pointUp'); mascotPose(A.m, W('h2', 3), 'point');
  slideIn(aSrc, W('h2', 0), 'left', 0.55, 420); sfx('whoosh', W('h2', 0), 0.35);
  focus('#A > .cam', W('h2', 3), 560, 860, 1.08, 0.45);
  // the hand leaves, a sausage flies in on an arc
  const tSs = W('q1', 0) - 0.05;
  tw(A.hd, tSs - 0.15, 0.45, { x: [0, 420], y: [0, -700] }, 'in'); sfx('whoosh', tSs - 0.15, 0.4);
  tw(aSs, tSs, 0.05, { o: [0, 1] }, 'lin');
  idle(aSs, t => { if (t < tSs) return {}; const u = clamp((t - tSs) / 0.6), e = easeIO(u); return u < 1 ? { x: -700 * (1 - e), y: -380 * Math.sin(Math.PI * u) + 0, r: -540 * (1 - e) - 18 } : { r: -18, y: 6 * Math.sin((t - tSs) * 5) }; });
  sfx('pop', tSs + 0.6, 0.5);
  aQ.forEach((q, k) => { const t = W('q1', 3) + k * 0.15; popIn(q, t, 0.3); tw(q, t, 0.5, { r: [-20, 12 - k * 12] }, 'back'); sfx('pop', t, 0.35); });
  mascotPose(A.m, W('q1', 1), 'shrug'); mascotPose(A.m, W('q1', 3) + 0.2, 'think');
  tw(aSs.querySelector('.sspup'), W('q1', 2), 0.3, { x: [0, -6], y: [0, -5] }, 'out');

  // ================= B: «Сначала — как он чувствует палец. Под стеклом — сетка невидимых проводков.» =================
  morphCut('#A', '#B', tB, '.a-ph', '.b-ph', 0.6, 0);
  hide(bC1); hide(bC2); [bDisp, bGrid, bGlass].forEach(l => hide(l));
  $$('.lgr, .lgc', bGrid).forEach(p => tw(p, 0, 0.001, { dash: [100, 100] }));
  // a finger taps the whole phone once on «палец»
  tw(bHd, 0, 0.001, { y: [-760, -760] }); tw(bHd, W('m0', 3) - 0.1, 0.4, { y: [-760, -40] }, 'out'); tw(bHd, W('m0', 4) + 0.05, 0.14, { y: [-40, 0] }, 'in');
  ringAt('#B .cam', 600, 760, W('m0', 4) + 0.19, 120, '#5fe8ff'); sfx('tick', W('m0', 4) + 0.19, 0.6);
  tw(bHd, W('m0', 4) + 0.45, 0.4, { y: [0, -800] }, 'in');
  mascotPose(bM, W('m0', 0), 'think'); mascotPose(bM, W('m0', 3), 'point');
  // the phone splits into three slabs
  const tSplit = W('m1', 0) - 0.05;
  tw(bPh.el, tSplit, 0.35, { s: [1, 0.7], o: [1, 0] }, 'in'); sfx('whoosh', tSplit, 0.5);
  [[bGlass, -290], [bGrid, 0], [bDisp, 290]].forEach(([l, dy], k) => { tw(l, tSplit + 0.2, 0.06, { o: [0, 1] }, 'lin'); tw(l, tSplit + 0.2, 0.7, { y: [-dy, 0], s: [0.6, 1] }, 'out'); });
  shake(tSplit + 0.3, 0.2, 8); sfx('thud', tSplit + 0.35, 0.5);
  slideIn(bC1, W('m1', 1), 'left', 0.5, 380); sfx('pop', W('m1', 1) + 0.1, 0.35); punch(bGlass, W('m1', 1) + 0.15, 0.05);
  slideIn(bC2, W('m1', 2), 'left', 0.5, 380); sfx('pop', W('m1', 2) + 0.1, 0.35);
  $$('.lgr', bGrid).forEach((p, k) => { tw(p, W('m1', 2) + k * 0.06, 0.35, { dash: [100, 0] }, 'out'); });
  $$('.lgc', bGrid).forEach((p, k) => { tw(p, W('m1', 3) + k * 0.05, 0.35, { dash: [100, 0] }, 'out'); });
  for (let k = 0; k < 6; k++) sfx('tick', W('m1', 2) + k * 0.12, 0.3);
  tw(bGlass, W('m1', 3), 0.5, { y: [0, -50] }, 'out'); tw(bDisp, W('m1', 3), 0.5, { y: [0, 50] }, 'out');
  mascotPose(bM, W('m1', 0), 'shock'); mascotPose(bM, W('m1', 2), 'pointUp'); mascotPose(bM, W('m1', 4), 'point');
  focus('#B > .cam', W('m1', 3), 600, 720, 1.08, 0.6);

  // ================= C: «По ним бегут крошечные заряды. Палец — проводник: в теле вода и соль. Коснулся — палец утянул часть заряда.» =================
  tZoom('#B', '#C', tC);
  const tChg = W('m2', 2) - 0.15, tTouch = W('m4', 0) + 0.1;
  CH.forEach((c, k) => { const t0 = tChg + k * 0.05;
    custom(t => { if (t < t0) { c.c.style.opacity = 0; return; }
      let u = ((t - t0) * c.sp + c.ph) % 1, x = c.row ? 20 + u * 920 : c.lane, y = c.row ? c.lane : 20 + u * 1040;
      let o = clamp((t - t0) / 0.2); if (t > tTouch + 0.6) { const d = Math.hypot(x - PX, y - PY); if (d < 150) o *= clamp((d - 70) / 80); }
      c.c.style.opacity = o.toFixed(2); c.c.style.transform = `translate(${(x - 13).toFixed(1)}px,${(y - 13).toFixed(1)}px)`; }); });
  sfx('riser', tChg, 0.4); for (let k = 0; k < 5; k++) sfx('blip', tChg + k * 0.2, 0.2);
  hide(hole);
  // the finger comes down and hovers
  tw(cHd, 0, 0.001, { y: [-900, -900] }); tw(cHd, W('m3', 0) - 0.15, 0.55, { y: [-900, -120] }, 'out'); sfx('whoosh', W('m3', 0) - 0.15, 0.5);
  idle(cHd, t => t > W('m3', 0) + 0.4 && t < tTouch - 0.15 ? { y: 8 * Math.sin((t - W('m3', 0)) * 4) } : {});
  tw(cHd.querySelector('.hx'), W('m3', 2), 0.3, { o: [0, 1] }, 'lin'); sfx('zap', W('m3', 2), 0.3);
  punch(cHd, W('m3', 4), 0.04); punch(cHd, W('m3', 6), 0.04); sfx('pop', W('m3', 4), 0.4); sfx('pop', W('m3', 6), 0.4);
  focus('#C > .cam', W('m3', 3) + 0.1, 60 + PX, 200 + PY - 300, 1.25, 1.0);
  // touch
  tw(cHd, tTouch - 0.15, 0.15, { y: [-120, 0] }, 'in'); sfx('thud', tTouch, 0.45);
  tw(cHd.querySelector('.hglow'), tTouch, 0.2, { o: [0, 1] }, 'lin'); ringAt(pan, PX, PY, tTouch, 150, '#ffe14d'); ringAt(pan, PX, PY, tTouch + 0.25, 150, '#ffe14d');
  tw(hole, W('m4', 1), 0.4, { o: [0, 1], s: [0.4, 1] }, 'out');
  STEAL.forEach((s, k) => { const a = 2 * Math.PI * k / 10, r = 140 + 60 * hash(k * 2.2), t0 = W('m4', 1) + k * 0.07;
    s.style.transform = `translate(${(PX + r * Math.cos(a) - 13).toFixed(1)}px,${(PY + r * Math.sin(a) - 13).toFixed(1)}px)`; hide(s);
    tw(s, t0 - 0.2, 0.15, { o: [0, 1] }, 'lin'); tw(s, t0, 0.45, { x: [0, -r * Math.cos(a)], y: [0, -r * Math.sin(a)], s: [1, 0.4] }, 'in'); tw(s, t0 + 0.42, 0.06, { o: [1, 0] }, 'lin');
    if (k % 2 === 0) sfx('blip', t0 + 0.42, 0.25); });
  punch(cHd, W('m4', 4), 0.05);
  mascotPose(cM, W('m2', 0), 'point'); mascotPose(cM, W('m2', 3), 'pointUp'); mascotPose(cM, W('m3', 0), 'shock'); mascotPose(cM, W('m3', 4), 'point'); mascotPose(cM, W('m4', 0), 'hold'); mascotPose(cM, W('m4', 2), 'pointUp');
  $$('.pup', cM).forEach(p => idle(p, t => ({ x: t > tC && t < tD ? -6 : 0, y: t > tC && t < tD ? -5 : 0 })));

  // ================= D: «Телефон видит, где заряд пропал, — там и палец. Экран чувствует не нажим, а тебя.» =================
  tCircle('#C', '#D', tD, 540, 740);
  tw(dDb.querySelector('.dweb path'), 0, 0.001, { dash: [100, 100] }); tw(dDb.querySelector('.dspider'), 0, 0.001, { o: [0, 0] });
  hide(dXh); hide(dDb); hide(dChip); hide(dStrike); tw(dStrike, 0, 0.001, { sx: [0, 0] });
  const scanRow = (t0, rows, d = 0.22) => rows.forEach((r, k) => { const y = DR[r] - 60; tw(dScan, t0 + k * d, d, { y: [k ? DR[rows[k - 1]] - 60 : -60, y] }, 'inOut'); sfx('tick', t0 + k * d + d, 0.3); });
  tw(dHd, tD + 0.1, 0.01, { y: [0, 0] });
  scanRow(W('m5', 0), [0, 1, 2, 3, 4]); tw(dScan, W('m5', 0) + 1.15, 0.3, { y: [DR[4] - 60, DR[1] - 60] }, 'inOut');
  stamp(dXh, W('m5', 4), 0, 10); sfx('ding', W('m5', 4) + 0.1, 0.4);
  punch(dXh, W('m5', 5), 0.15); ringAt('#D .cam', DTX, DTY, W('m5', 7), 160, '#ff3b5c');
  tw(dHd, W('m5', 7) + 0.3, 0.4, { y: [0, -900] }, 'in'); tw(dXh, W('m5', 7) + 0.35, 0.2, { o: [1, 0] }, 'lin'); sfx('whoosh', W('m5', 7) + 0.3, 0.35);
  mascotPose(dM, W('m5', 0), 'point'); mascotPose(dM, W('m5', 4), 'shock'); mascotPose(dM, W('m5', 5), 'point');
  focus('#D > .cam', W('m5', 4) + 0.1, DTX, DTY, 1.15, 0.6);
  // the heavy dumbbell: pressure without a conductor = nothing
  const tDb = W('m6', 1) - 0.1;
  tw(dDb, tDb, 0.05, { o: [0, 1] }, 'lin'); tw(dDb, tDb, 0.4, { y: [-900, 0] }, 'in'); sfx('thud', tDb + 0.4, 0.9); shake(tDb + 0.4, 0.3, 18);
  tw(dPh.el, tDb + 0.4, 0.08, { sy: [1, 0.95] }, 'out'); tw(dPh.el, tDb + 0.48, 0.3, { sy: [0.95, 1] }, 'back');
  scanRow(tDb + 0.5, [0, 1, 2, 3, 4], 0.18); sfx('buzz', tDb + 1.4, 0.4);
  slideIn(dChip, W('m6', 3) - 0.25, 'left', 0.45, 400); tw(dStrike, W('m6', 3) + 0.15, 0.08, { o: [0, 1] }, 'lin'); tw(dStrike, W('m6', 3) + 0.15, 0.25, { sx: [0, 1] }, 'out'); sfx('slam', W('m6', 3) + 0.2, 0.5);
  tw(dDb, W('m6', 4) - 0.2, 0.4, { x: [0, 700], r: [0, 25] }, 'in'); sfx('whoosh', W('m6', 4) - 0.2, 0.35);
  // «а тебя»: one light touch is enough
  tw(dHd2, 0, 0.001, { y: [-1200, -1200] }); tw(dHd2, W('m6', 4) - 0.1, 0.4, { y: [-1200, 0] }, 'out');
  tw(dXh, W('m6', 5) + 0.15, 0.001, { x: [0, 40], y: [0, 300] }); stamp(dXh, W('m6', 5) + 0.15, 0, 8);
  ringAt('#D .cam', DTX + 40, DTY + 300, W('m6', 5) + 0.2, 160, '#7dff8a'); burst('#D .cam', 10, DTX + 40, DTY + 300, W('m6', 5) + 0.25, 160, 3);
  mascotPose(dM, tDb, 'think'); mascotPose(dM, tDb + 0.42, 'shock'); mascotPose(dM, W('m6', 3), 'shrug'); mascotPose(dM, W('m6', 5), 'cheer');
  focus('#D > .cam', W('m6', 5), 540, 820, 1.06, 0.4);

  // ================= E: «Опыт первый: варежка. Шерсть заряд не пропускает.» =================
  tSlideUp('#D', '#E', tE);
  hide(eChip); hide(eNo);
  slideIn(eChip, W('x1', 0), 'left', 0.55, 500); sfx('whoosh', W('x1', 0), 0.4);
  tw(eMt, 0, 0.001, { r: [180, 180], y: [-600, -600] }); tw(eMt, W('x1', 2) - 0.2, 0.5, { y: [-600, 0] }, 'out'); sfx('whoosh', W('x1', 2) - 0.2, 0.4);
  tw(eMt, W('x1', 3) - 0.15, 0.15, { y: [0, 150] }, 'in'); sfx('thud', W('x1', 3), 0.5);
  // charges rise from the screen, hit the wool and bounce back
  for (let k = 0; k < 6; k++) { const c = put('#E .cam', 'chg', '', 795 + (k % 3 - 1) * 40, 900); const t0 = W('x1', 3) + 0.05 + k * 0.22; hide(c);
    tw(c, t0, 0.05, { o: [0, 1] }, 'lin'); tw(c, t0, 0.22, { y: [0, -100] }, 'in'); tw(c, t0 + 0.22, 0.3, { y: [-100, 40], x: [0, (k % 2 ? 1 : -1) * 60] }, 'out'); tw(c, t0 + 0.42, 0.1, { o: [1, 0] }, 'lin'); sfx('clink', t0 + 0.22, 0.25); }
  stamp(eNo, W('x1', 5), 0, 10);
  idle(eMt, t => t > W('x1', 3) && t < tF ? { x: 3 * Math.sin(t * 40) } : {});
  idle(eM, t => t > tE && t < tF ? { x: 2 * Math.sin(t * 55) } : {});          // shivering in the cold
  mascotPose(eM, W('x1', 0), 'wave'); mascotPose(eM, W('x1', 2), 'point'); mascotPose(eM, W('x1', 4), 'think'); mascotPose(eM, W('x1', 6), 'sad');
  focus('#E > .cam', W('x1', 4), 700, 760, 1.08, 0.7);

  // ================= F: «Дави хоть двумя руками — экран молчит.» =================
  tWhip('#E', '#F', tF);
  fZ.forEach(z => hide(z)); fSw.forEach(s => hide(s));
  [fMt1, fMt2].forEach((m, j) => { tw(m, tF - 0.1, 0.4, { y: [-500, 0] }, 'out');
    for (let k = 0, t = W('x2', 0); t < W('x2', 4) + 0.1; k++, t += 0.24) { const tt = t + j * 0.12; tw(m, tt, 0.1, { y: [0, 70] }, 'in'); tw(m, tt + 0.1, 0.14, { y: [70, 0] }, 'out'); if (j === 0) sfx('thud', tt + 0.1, 0.45); } });
  for (let k = 0, t = W('x2', 0); t < W('x2', 4) + 0.1; k++, t += 0.12) { tw(fPh.el, t + 0.08, 0.06, { sy: [1, 0.94], sx: [1, 1.03] }, 'out'); tw(fPh.el, t + 0.14, 0.06, { sy: [0.94, 1], sx: [1.03, 1] }, 'out'); }
  shake(W('x2', 0), W('x2', 4) - W('x2', 0), 7);
  fSw.forEach((s, k) => { place(s, 210 + k * 26, 1020, 22, 30); const t0 = W('x2', 1) + k * 0.2; tw(s, t0, 0.05, { o: [0, 1] }, 'lin'); tw(s, t0, 0.5, { x: [0, (k % 2 ? 1 : -1) * 90], y: [0, -120] }, 'out'); tw(s, t0 + 0.4, 0.15, { o: [1, 0] }, 'lin'); });
  fZ.forEach((z, k) => { const t0 = W('x2', 4) + k * 0.25; tw(z, t0, 0.05, { o: [0, 1] }, 'lin'); tw(z, t0, 0.9, { y: [0, -160], x: [0, 60], s: [0.5, 1.2] }, 'out'); tw(z, t0 + 0.6, 0.3, { o: [1, 0] }, 'lin'); sfx('pop', t0, 0.3); });
  idle(fFace.querySelector('.sfmouth'), t => ({ sy: 0.6 + 0.4 * Math.sin(t * 6) }));
  mascotPose(fM, tF, 'shock'); mascotPose(fM, W('x2', 2), 'cheer'); mascotPose(fM, W('x2', 4), 'facepalm');
  focus('#F > .cam', W('x2', 4), 540, 900, 1.12, 0.5);

  // ================= G: «Опыт второй: сосиска. В ней тоже вода и соль. Заряд утекает — листается!» =================
  morphCut('#F', '#G', tG, '.f-ph', '.g-ph', 0.6, 0);
  hide(gChip); gFlow.forEach(c => hide(c));
  slideIn(gChip, W('y1', 0), 'left', 0.55, 500); sfx('whoosh', W('y1', 0), 0.4);
  tw(gSs, tG - 0.05, 0.6, { x: [-600, 0], r: [-200, 0] }, 'out'); sfx('whoosh', tG, 0.4);
  jump(gSs, W('y1', 2), 50, 0.4); sfx('pop', W('y1', 2) + 0.4, 0.4);
  tw(gSs.querySelector('.ssx'), W('y1', 4), 0.3, { o: [0, 1] }, 'lin'); sfx('zap', W('y1', 4), 0.3);
  punch(gSs, W('y1', 6), 0.06); punch(gSs, W('y1', 8), 0.06); sfx('pop', W('y1', 6), 0.3); sfx('pop', W('y1', 8), 0.3);
  focus('#G > .cam', W('y1', 5), 420, 775, 1.1, 0.7);
  tw(gSs.querySelector('.ssx'), W('y2', 0) - 0.2, 0.2, { o: [1, 0] }, 'lin');
  // poke: the sausage tip goes onto the screen
  const tPoke = W('y2', 0) - 0.15;
  tw(gSs, tPoke, 0.35, { x: [0, 150], y: [0, 40], r: [0, -14] }, 'inOut'); sfx('whoosh', tPoke, 0.3); sfx('thud', tPoke + 0.35, 0.4);
  tw(gSs.querySelector('.ssglow'), tPoke + 0.35, 0.2, { o: [0, 1] }, 'lin');
  const TIP = [70 + 150 + 423, 690 + 40 + 72];
  gFlow.forEach((c, k) => { const sx = gPh.sx + 40 + (k % 4) * 60, sy = gPh.sy + 120 + Math.floor(k / 4) * 260, t0 = tPoke + 0.4 + k * 0.08;
    place(c, sx - 13, sy - 13); tw(c, t0, 0.05, { o: [0, 1] }, 'lin'); tw(c, t0, 0.4, { x: [0, TIP[0] - sx], y: [0, TIP[1] - sy], s: [1, 0.5] }, 'in'); tw(c, t0 + 0.38, 0.06, { o: [1, 0] }, 'lin'); if (k % 2) sfx('blip', t0 + 0.38, 0.25); });
  scroller(gFd, [[W('y2', 2) - 0.05, 1.2, 0.3], [W('y2', 2) + 0.25, 1.2, 0.3], [W('y2', 2) + 0.55, 1.2, 0.3], [W('y2', 2) + 0.85, 1.2, 0.35]]);
  for (let k = 0; k < 4; k++) sfx('tick', W('y2', 2) + k * 0.3, 0.45);
  burst(gFx, 22, 740, 520, W('y2', 2) + 0.05, 380, 17, 'conf', 160); sfx('ding', W('y2', 2) + 0.05, 0.45);
  tw(gSs.querySelector('.ssMouth'), W('y2', 2), 0.3, { sy: [1, 1.6] }, 'back');
  tw(gSs, W('y2', 2) + 0.5, 0.35, { x: [150, 0], y: [40, 0], r: [-14, 0] }, 'inOut');
  mascotPose(gM, W('y1', 0), 'wave'); mascotPose(gM, W('y1', 2), 'point'); mascotPose(gM, W('y1', 5), 'think'); mascotPose(gM, W('y2', 0), 'hold'); mascotPose(gM, W('y2', 2), 'cheer');
  jump(gM, W('y2', 2) + 0.1, 60, 0.45);
  focus('#G > .cam', W('y2', 2), 720, 800, 1.1, 0.45);

  // ================= H: «В Корее зимой так и листали — продажи сосисок выросли.» =================
  morphCut('#G', '#H', tH, '.g-ss', '.h-ss', 0.6, 0);
  hide(hSrc); hide(hSales); hide(hArr); CR.forEach(c => hide(c));
  slideIn(hSrc, W('k1', 1), 'down', 0.55, 300); sfx('whoosh', W('k1', 1), 0.35);
  [[hP1, hS1, hF1], [hP2, hS2, hF2]].forEach(([p, s, f], j) => {
    for (let k = 0; k < 4; k++) { const t = W('k1', 3) + j * 0.15 + k * 0.3; tw(s, t, 0.12, { y: [0, -16], r: [0, -10] }, 'out'); tw(s, t + 0.12, 0.15, { y: [-16, 0], r: [-10, 0] }, 'out'); }
    idle(f, t => ({ y: 3 * Math.sin(t * 4 + j) }));
    tw(p.querySelector('.ppup'), W('k1', 3), 0.3, { x: [0, 6 - 12 * j], y: [0, 7] }, 'out'); });
  CR.forEach((c, k) => { const t0 = W('k1', 6) + k * 0.18; tw(c, t0, 0.05, { o: [0, 1] }, 'lin'); tw(c, t0, 0.3, { y: [-900, 0] }, 'in'); sfx('thud', t0 + 0.3, 0.45); shake(t0 + 0.3, 0.15, 6); });
  tw(hArr, W('k1', 8) - 0.05, 0.06, { o: [0, 1] }, 'lin'); tw(hArr, W('k1', 8) - 0.05, 0.4, { y: [200, 0], s: [0.3, 1] }, 'back'); sfx('riser2', W('k1', 7), 0.4);
  slideIn(hSales, W('k1', 6) + 0.1, 'right', 0.5, 400);
  tw(hBs.querySelector('.blamp'), W('k1', 1), 0.3, { o: [0, 0.35] }, 'lin');
  mascotPose(hM, W('k1', 0), 'pointL'); mascotPose(hM, W('k1', 3), 'cheer'); mascotPose(hM, W('k1', 6), 'point'); mascotPose(hM, W('k1', 8), 'shock');
  focus('#H > .cam', W('k1', 8), 700, 900, 1.05, 0.4);

  // ================= V: «Сосиска вместо пальца — не байт. Зимой нужна перчатка с проводящими пальцами. А впереди ещё…» =================
  tDrop('#H', '#V', tV);
  hide(vSt); hide(vChip);
  tw(vSs, tV - 0.1, 0.5, { x: [-400, 0], r: [-90, -70] }, 'out'); idle(vSs, t => t > tV + 0.5 ? { y: 8 * Math.sin(t * 6), r: 4 * Math.sin(t * 3) } : {});
  tw(vMt, 0, 0.001, { o: [0, 0] });
  mascotPose(vM, W('v1', 0), 'pointL'); mascotPose(vM, W('v1', 2), 'think');
  const tSt = W('v1', 3) - 0.02;
  mascotPose(vM, tSt - 0.45, 'pointUp'); tw(vM, tSt - 0.42, 0.22, { y: [0, -90] }, 'out'); tw(vM, tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose(vM, tSt - 0.18, 'point', 0.18);
  stamp(vSt, tSt, -7, 26); burst(vFx, 24, 540, 350, tSt + 0.05, 420, 61, 'conf', 140); sfx('ding', tSt + 0.2, 0.4);
  mascotPose(vM, tSt + 0.5, 'cheer');
  // takeaway: a glove with conductive fingertips
  tw(vSt, W('e1', 0) - 0.15, 0.35, { y: [0, -60], s: [1, 0.72] }, 'inOut');
  tw(vSs, W('e1', 0) - 0.1, 0.4, { x: [0, -380] }, 'in');
  tw(vMt, W('e1', 1) - 0.2, 0.05, { o: [0, 1] }, 'lin'); tw(vMt, W('e1', 1) - 0.2, 0.5, { x: [400, 0], r: [40, 0] }, 'out'); sfx('whoosh', W('e1', 1) - 0.2, 0.4);
  mascotPose(vM, W('e1', 0), 'point'); mascotPose(vM, W('e1', 2), 'hold');
  tw(vMt.querySelector('.mglow'), W('e1', 4), 0.2, { o: [0, 0.9] }, 'lin'); punch(vMt, W('e1', 4), 0.08); sfx('zap', W('e1', 4), 0.35);
  slideIn(vChip, W('e1', 2), 'down', 0.5, 300);
  const tPr = W('e1', 5) - 0.1;
  tw(vMt, tPr, 0.35, { r: [0, 180], y: [0, 150] }, 'inOut'); tw(vMt, tPr + 0.35, 0.1, { y: [150, 210] }, 'in');
  ringAt('#V .cam', vPh.sx + vPh.sw / 2, vPh.sy + 40, tPr + 0.45, 120, '#7dff8a'); sfx('tick', tPr + 0.45, 0.5);
  scroller(vFd, [[tPr + 0.5, 1.2, 0.3], [tPr + 0.8, 1.2, 0.3]]); sfx('ding', tPr + 0.55, 0.4);
  mascotPose(vM, tPr + 0.4, 'cheer');
  focus('#V > .cam', W('e1', 4), 640, 760, 1.05, 0.4);
  tw([vSt, vChip, vMt, vSs, ...$$('#V .shd'), vPh.el], tLoop - 0.35, 0.3, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw(vM, tLoop + 0.3, 0.001, { o: [1, 0] });
}, { noCaption: ['hook'] });
