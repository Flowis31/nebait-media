// 035 «Миф №1: −15°, 40% — и телефон умер. Батарея всё?» — Байт или не байт (длинный формат, в запас на сб 21.11.2026).
// Стиль: проверка мифа на глазах — маскот выносит телефон на балкон, тот гаснет; дома заряд возвращается. Маскот — рассказчик.
// Источник: Apple Support 118431 (14.05.2026): холод временно сокращает работу батареи и может выключить устройство, в тепле всё вернётся;
//   жара может сократить срок службы батареи навсегда. Battery University BU-502: на холоде химия батареи замедляется.
// Свой мир: зимняя ночь — звёзды и снежные холмы (размыты), силуэты домов с окнами, снег поверх; дома — тёплая комната (оранжевый).
// Планы: A крупный (телефон на морозе), B общий/масштаб (дом с балконом, камера отъезжает), C крупный (разрез батареи), D средний (банка мёда),
//   E крупный (лицо телефона, мысль), F общий (комната), G средний (холод против жары), H крупный (телефон на батарее отопления), V средний (штамп).
// Склейки-превращения: телефон на балконе → разрез батареи (B→C), погасший телефон → телефон в руках маскота дома (E→F).
TIMING.words.forEach(w => { w.d = w.d.replace(/\s—$/, ''); });
boot(() => {
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
  const clamp = x => Math.max(0, Math.min(1, x));
  const place = (el, x, y, w, h) => { el.style.left = x + 'px'; el.style.top = y + 'px'; if (w) el.style.width = w + 'px'; if (h) el.style.height = h + 'px'; return el; };
  const put = (par, cls, html, x, y, w, h) => place(mk(par, cls, html), x, y, w, h);
  const easeIO = x => (x = clamp(x), x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const W = (k, i) => wt(k, i);
  const q1 = (el, s) => el.querySelector(s);
  const jump = (el, t, h = 80, d = 0.5) => {
    tw(el, t - 0.12, 0.12, { sy: [1, 0.86], sx: [1, 1.08] }, 'out');
    tw(el, t, d / 2, { y: [0, -h], sy: [0.86, 1.08], sx: [1.08, 0.95] }, 'out');
    tw(el, t + d / 2, d / 2, { y: [-h, 0], sy: [1.08, 1], sx: [0.95, 1] }, 'in');
    tw(el, t + d, 0.08, { sy: [1, 0.88], sx: [1, 1.1] }, 'out'); tw(el, t + d + 0.08, 0.3, { sy: [0.88, 1], sx: [1.1, 1] }, 'back');
  };
  const burst = (par, n, x, y, t, dist = 220, seed = 0, cls = 'spark', fall = 0, cols = ['#7fe8ff', '#ffe14d', '#ff8a3d', '#ff5f8a', '#7dff9a']) => {
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls !== 'spark') s.style.background = cols[k % cols.length]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.8, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.6, 0.25, { o: [1, 0] }, 'lin'); } };
  const ringAt = (par, x, y, t, sz = 110, col = '#fff') => { const r = mk(par, 'ring'); r.style.borderColor = col; place(r, x - sz / 2, y - sz / 2, sz, sz); hide(r);
    tw(r, t, 0.05, { o: [0, 1] }, 'lin'); tw(r, t, 0.45, { s: [0.4, 1.7] }, 'out'); tw(r, t + 0.25, 0.2, { o: [1, 0] }, 'lin'); };
  const shadow = (par, x, y, w, h = 60) => put(par, 'shd', '', x - w / 2, y - h / 2, w, h);
  const mascot = (par, id, x, y, sz) => { const m = put(par, 'mm', mascotSVG(id), x, y, sz, sz); const s = shadow(par, x + sz / 2, y + sz * 0.95, sz * 0.7, 50); s.classList.add('mshd'); m._shd = s; return m; };
  const chip = (par, cls, txt, x, y, fs) => { const c = put(par, cls, txt, x, y); if (fs) c.style.fontSize = fs + 'px'; return c; };
  // a phone character (talkPhoneSVG) with overlays: .scrOff (dark screen, o), X eyes (o), a battery bar on top of the screen
  const phone = (par, id, x, y, w, bar = true, sh = true) => {
    const h = w * 560 / 300, k = w / 300;
    if (sh) shadow(par, x + w / 2, y + h * 0.99, w * 0.8, Math.max(20, w * 0.14));
    const p = put(par, 'tph', talkPhoneSVG(id, '#4a5fd8'), x, y, w, h); p.style.transformOrigin = '50% 96%';
    p._off = put(p, 'scrOff', '', 38 * k, 70 * k, 224 * k, 400 * k); p._off.style.opacity = 0;
    p._x = put(p, 'xeye', '✕&nbsp;&nbsp;✕', 0, 190 * k, w); p._x.style.fontSize = (70 * k) + 'px'; p._x.style.opacity = 0;
    if (bar) { const bw = 150 * k, bh = 50 * k; p._bar = put(p, 'bar', '', 75 * k, 90 * k, bw, bh); p._bar.style.borderWidth = Math.max(4, 7 * k) + 'px'; p._bar.style.borderRadius = (12 * k) + 'px';
      p._fill = put(p._bar, 'barf', '', 0, 0, bw - 14 * k); p._fill.style.background = '#7dff8a'; }
    return p; };
  const level = (p, t, a, b, d = 0.4) => tw(p._fill, t, d, { sx: [a, b] }, 'out');
  const pface = (p, t, kind) => {   // phone body language: arms, brows, mouth
    const P = { rest: [0, 0, 0, 0.12], cold: [40, -40, 8, 0.12], shock: [-60, 60, -14, 0.8], happy: [-40, 40, -8, 0.5], sweat: [-80, 80, -10, 0.7], sleep: [10, -10, 8, 0.12], hug: [30, -30, -4, 0.3] }[kind];
    const A = p._f || [0, 0, 0, 0.12];
    tw(q1(p, '.karmL'), t, 0.35, { r: [A[0], P[0]] }, 'back'); tw(q1(p, '.karmR'), t, 0.35, { r: [A[1], P[1]] }, 'back');
    tw(q1(p, '.kbrow'), t, 0.3, { y: [A[2], P[2]] }, 'out'); tw(q1(p, '.kmouth'), t, 0.3, { sy: [A[3], P[3]] }, 'out'); p._f = P; };
  const ion = (par, id, x, y, sz = 70, col = '#ffe14d') => { const e = put(par, 'ion', ionSVG(id, col), x, y, sz, sz * 1.1); return e; };
  const runLegs = (e, t0, t1, f = 14) => { idle(q1(e, '.ilegL'), t => (t > t0 && t < t1 ? { r: 28 * Math.sin((t - t0) * f) } : {})); idle(q1(e, '.ilegR'), t => (t > t0 && t < t1 ? { r: -28 * Math.sin((t - t0) * f) } : {})); };

  // ---------- world ----------
  $('#far').innerHTML = hillsSVG(); $('#mid').innerHTML = townSVG(); $('#floor').innerHTML = floorSVG();
  dof('#far', 3); dof('#mid', 1.5);
  lookFX({ grain: 0.1, tint: 'transparent' });
  // falling snow (global layer, on in the cold scenes)
  const flakes = []; for (let k = 0; k < 46; k++) { const f = put('#snow', 'flake', '', hash(k * 1.9) * 1080, 0, 0, 0); const sz = 5 + hash(k * 3.3) * 12; place(f, hash(k * 1.9) * 1080, 0, sz, sz); f.style.opacity = 0.35 + hash(k * 2.2) * 0.55; flakes.push(f); }

  // ================= layouts =================
  // ----- A: hook (close-up): «−15° · 40%» and a shivering phone -----
  const buildA = (cam, s) => {
    const n1 = put(cam, 'big', '<i>−15°</i>', 0, 150, 1080); n1.style.fontSize = '230px';
    const ph = phone(cam, 'a' + s, 330, 470, 420);
    const pc = put(cam, 'pct', '40%', 630, 400, 300); pc.style.fontSize = '120px'; pc.style.textAlign = 'left';
    const m = mascot(cam, 'am' + s, -10, 1000, 340);
    return { n1, ph, pc, m };
  };
  const A = buildA('#A .cam', ''), A2 = buildA('#A2 .cam', '2');
  const camA = $('#A .cam');
  level(A.ph, 0, 0.4, 0.4, 0.001); level(A2.ph, 0, 0.4, 0.4, 0.001);
  const aMyth = chip(camA, 'nb-chip chipL', 'МИФ №1', 40, 390, 46);
  const aQ1 = chip(camA, 'nb-chip r chipL r', 'БАЙТ?', 560, 1040, 50), aQ2 = chip(camA, 'nb-chip g chipL g', 'НЕ БАЙТ?', 560, 1160, 50);
  const aIce = put(A.ph, 'ice', `<svg viewBox="0 0 420 784" style="left:0;top:0;width:100%;height:100%"><path d="M40 60 L120 140 L90 220 L170 300 M380 80 L300 170 L330 260 M60 700 L140 620 L120 540 M370 690 L290 610" stroke="#dff6ff" stroke-width="10" fill="none" stroke-linecap="round" pathLength="100" style="stroke-dasharray:100;stroke-dashoffset:100" class="crk"/></svg>`, 0, 0, 420, 784);
  const aQm = put(camA, 'qm', '?', 820, 560);

  // ----- B: general / scale: the whole block of flats; the mascot takes the phone out to the balcony -----
  const camB = $('#B .cam');
  put(camB, 'house', houseSVG(), 0, 120, 1080, 1300);
  const bM = mascot(camB, 'bm', 380, 860, 220); bM._shd.style.display = 'none';
  const bPh = phone(camB, 'b', 600, 948, 66, false, false);
  const bTh = put(camB, 'th', thermometerSVG('b', '#5fb8ff'), 860, 700, 80, 266);
  const bClock = put(camB, 'clk', clockSVG('b', '#7fe8ff'), 680, 330, 260, 274);

  // ----- C: close-up cutaway: inside the battery, tiny particles carry the charge -----
  const camC = $('#C .cam');
  const cB = put(camC, 'bcut', batteryCutSVG('c'), 90, 380, 900, 556);
  const cChip = chip(camC, 'nb-chip chipL', 'ВНУТРИ БАТАРЕИ', 40, 170, 46);
  const cIons = []; for (let k = 0; k < 8; k++) cIons.push(ion(camC, 'ci' + k, 290 + (k % 4) * 110, 470 + Math.floor(k / 4) * 170 + (k % 2) * 40, 74, k % 3 ? '#ffe14d' : '#ffb84d'));
  const cM = mascot(camC, 'cm', 700, 980, 330);
  const cBolt = put(camC, 'bolt', `<svg viewBox="0 0 100 160" style="left:0;top:0;width:100%;height:100%"><path d="M62 4 L14 92 L48 92 L34 156 L88 62 L54 62 Z" fill="#ffe14d" stroke="#0a130d" stroke-width="8" stroke-linejoin="round"/></svg>`, 640, 190, 110, 176);

  // ----- D: medium: cold honey — the particles get stuck -----
  const camD = $('#D .cam');
  shadow(camD, 380, 1120, 500, 60);
  const dJar = put(camD, 'jar', honeyJarSVG('d'), 120, 500, 520, 636);
  const dIons = []; for (let k = 0; k < 4; k++) dIons.push(ion(camD, 'di' + k, 190 + k * 95, 760 + (k % 2) * 200, 84, '#ffe14d'));
  const dM = mascot(camD, 'dm', 640, 900, 360);
  const dTh = put(camD, 'th', thermometerSVG('d', '#5fb8ff'), 820, 330, 90, 300);
  const dFl = []; for (let k = 0; k < 5; k++) dFl.push(put(camD, 'sf', snowflakeSVG(), 120 + k * 170, 250 + (k % 2) * 60, 90, 90));
  const dChip = chip(camD, 'nb-chip chipL', 'ХОЛОДНЫЙ МЁД', 60, 200, 46);

  // ----- E: close-up: the phone's face; it thinks «battery empty» and switches off -----
  const camE = $('#E .cam');
  const ePh = phone(camE, 'e', 300, 440, 480, true, true);
  const eBub = put(camE, 'bubble', '', 500, 200, 440, 240);
  const eBat = put(eBub, 'bat', batterySVG('e', '#7dff8a'), 70, 50, 300, 140);
  const eD1 = put(camE, 'dot', '', 600, 470, 40, 40), eD2 = put(camE, 'dot', '', 640, 420, 54, 54);
  const eM = mascot(camE, 'em', 0, 1000, 320);
  const eWire = put(camE, 'bolt', `<svg viewBox="0 0 100 160" style="left:0;top:0;width:100%;height:100%"><path d="M62 4 L14 92 L48 92 L34 156 L88 62 L54 62 Z" fill="#ffe14d" stroke="#0a130d" stroke-width="8" stroke-linejoin="round"/></svg>`, 820, 760, 170, 272); eWire.style.transformOrigin = '50% 50%';
  const eZz = put(camE, 'lbl', 'Z<i>z</i>', 760, 520); eZz.style.fontSize = '90px';

  // ----- F: general: a warm room; the phone comes back to life -----
  const camF = $('#F .cam');
  put(camF, 'room', roomSVG(), 0, 0, 1080, 1320);
  const fTh = put(camF, 'th', thermometerSVG('f', '#ff5f3d'), 80, 360, 80, 266);
  const fM = mascot(camF, 'fm', 220, 760, 400);
  const fPh = phone(camF, 'f', 620, 830, 150, true, false);
  const fPct = put(camF, 'pct', '0%', 595, 650, 200); fPct.style.fontSize = '84px';
  const fHeat = put(camF, 'heat', `<svg viewBox="0 0 400 200" style="left:0;top:0;width:100%;height:100%">${[0, 1, 2].map(k => `<path d="M${90 + k * 110} 190 q-24 -30 0 -60 q24 -30 0 -60 q-24 -30 0 -60" fill="none" stroke="#ffb07a" stroke-width="12" stroke-linecap="round"/>`).join('')}</svg>`, 500, 590, 400, 200);

  // ----- G: medium: cold = for a while, heat = for good; the source -----
  const camG = $('#G .cam');
  const gL = put(camG, 'half', '', 0, 300, 540, 900); gL.style.background = 'linear-gradient(180deg,rgba(90,170,255,.28),rgba(90,170,255,.06))'; gL.style.borderRadius = '0 40px 40px 0';
  const gR = put(camG, 'half', '', 540, 300, 540, 900); gR.style.background = 'linear-gradient(180deg,rgba(255,120,50,.32),rgba(255,120,50,.06))'; gR.style.borderRadius = '40px 0 0 40px';
  const gSf = put(camG, 'sf', snowflakeSVG(), 170, 360, 200, 200);
  const gSun = put(camG, 'sun', sunSVG('g'), 640, 340, 260, 260);
  const gB1 = put(camG, 'bat', batterySVG('g1', '#7dff8a'), 90, 650, 360, 168), gB2 = put(camG, 'bat', batterySVG('g2', '#7dff8a'), 630, 650, 360, 168);
  const gArrow = put(camG, 'arr', `<svg viewBox="0 0 200 200" style="left:0;top:0;width:100%;height:100%"><path d="M160 100 A60 60 0 1 1 130 48" fill="none" stroke="#7fe8ff" stroke-width="16" stroke-linecap="round" pathLength="100" style="stroke-dasharray:100;stroke-dashoffset:100" class="arc"/><path d="M112 22 L142 46 L108 68" fill="none" stroke="#7fe8ff" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`, 190, 840, 160, 160);
  const gCrack = put(camG, 'crk', `<svg viewBox="0 0 360 168" style="left:0;top:0;width:100%;height:100%"><path d="M150 10 L130 60 L170 84 L140 160" fill="none" stroke="#0a130d" stroke-width="12" stroke-linecap="round" pathLength="100" style="stroke-dasharray:100;stroke-dashoffset:100" class="ck"/></svg>`, 630, 650, 360, 168);
  const gC1 = chip(camG, 'nb-chip chipL', 'ВРЕМЕННО', 40, 1020, 42), gC2 = chip(camG, 'nb-chip w chipL w', 'НАВСЕГДА', 700, 1020, 42);
  const gSrc = put(camG, 'nb-panel', '<div style="position:absolute;left:34px;top:22px;font:800 34px JB;color:#fff;white-space:nowrap">APPLE SUPPORT</div><div style="position:absolute;left:34px;top:76px;font:700 30px JB;color:#bcd2f0;white-space:nowrap">14.05.2026 · ЖАРА И ХОЛОД</div>', 60, 140, 600, 140);
  const gM = mascot(camG, 'gm', 410, 1040, 260);

  // ----- H: close-up joke: the phone on a hot radiator -----
  const camH = $('#H .cam');
  shadow(camH, 540, 1210, 900, 60);
  const hR = put(camH, 'rad', radiatorSVG('h', 8), 60, 640, 960, 617);
  const hPh = phone(camH, 'h', 380, 230, 300, true, false); hPh.style.transformOrigin = '50% 100%';
  const hSw = []; for (let k = 0; k < 6; k++) hSw.push(put(camH, 'sweat', '', 400 + (k % 3) * 120, 420 + Math.floor(k / 3) * 120));
  const hSt = []; for (let k = 0; k < 8; k++) hSt.push(put(camH, 'steam', '', 140 + k * 110, 600, 90, 90));
  const hX1 = put(camH, 'xbig', '', 190, 560, 700), hX2 = put(camH, 'xbig', '', 190, 560, 700);
  const hM = mascot(camH, 'hm', 760, 980, 300);

  // ----- V: verdict, the takeaway, the next myth, the question -----
  const camV = $('#V .cam');
  const vM = mascot(camV, 'vm', 10, 860, 480);
  const vSt = put(camV, 'stt', 'БАЙТ', 260, 280, 560, 170); vSt.style.cssText += ';border:18px solid var(--red);color:var(--red);font:900 112px/134px Unb';
  const vMyth = chip(camV, 'nb-chip chipL', 'МОРОЗ УБИВАЕТ НАСОВСЕМ?', 70, 520, 40);
  const vSf = put(camV, 'sf', snowflakeSVG(), 600, 700, 260, 260);
  shadow(camV, 790, 1240, 380, 46).classList.add('vjsh');
  const vJk = put(camV, 'jk', jacketSVG('v', '#ff8a3d'), 560, 700, 460, 521);
  const vPh = phone(camV, 'v', 805, 760, 100, true, false);
  const vPocket = put(camV, 'pocket', '', 795, 1030, 125, 115); vPocket.style.background = 'linear-gradient(180deg,#ff8a3d,#c24a1a)';
  const vHeat = put(camV, 'heat', `<svg viewBox="0 0 300 160" style="left:0;top:0;width:100%;height:100%">${[0, 1, 2].map(k => `<path d="M${70 + k * 80} 150 q-18 -24 0 -48 q18 -24 0 -48" fill="none" stroke="#ffb07a" stroke-width="10" stroke-linecap="round"/>`).join('')}</svg>`, 650, 820, 340, 180);
  const vNext = chip(camV, 'nb-chip w chipL w', 'СЛЕДУЮЩИЙ МИФ', 470, 540, 44);
  const vCh = put(camV, 'chg', chargerSVG('v', true, false), 590, 660, 360, 415);
  const vBolt = put(camV, 'bolt', `<svg viewBox="0 0 100 160" style="left:0;top:0;width:100%;height:100%"><path d="M62 4 L14 92 L48 92 L34 156 L88 62 L54 62 Z" fill="#ffe14d" stroke="#0a130d" stroke-width="8" stroke-linejoin="round"/></svg>`, 900, 640, 120, 192);
  const vQm = put(camV, 'qm', '?', 660, 640); vQm.style.fontSize = '400px';
  const vFx = put(camV, 'vfx', '', 0, 0);

  mascotLife(); mascotTalk();
  // the phone «speaks» its thought (батарея пустая. Выключаюсь): the narrator keeps quiet then
  const PT0 = W('m3', 5) - 0.05, PT1 = L('m3').t1 + 0.05;
  $$('.mm').forEach(m => mascotQuiet(m, PT0, PT1));
  { const mo = q1(ePh, '.kmouth'); custom(t => { if (t < PT0 - 0.3 || t > PT1 + 0.3) return; let v = 0.12; if (t >= PT0 && t < PT1 && window.VENV) { const i = Math.round(t * VENV.fps); v = Math.max(0.12, Math.min(1, (VENV.v[Math.min(VENV.v.length - 1, i)] || 0) * 1.15)); } mo.style.transform = `scaleY(${v.toFixed(3)})`; }); }
  // phones blink
  $$('.tph .keye').forEach((e, i) => { tw(e, 0, 0.001, { sy: [1, 1] }); if (e.closest('#A2')) return; const P = TOTAL / 9 + hash(i) * 1.3, ph = hash(i * 2.3) * P; idle(e, t => { if (t < 0.6 || t > TOTAL - 0.8) return {}; const u = (t + ph) % P; return u < 0.15 ? { sy: -0.9 * Math.sin(Math.PI * u / 0.15) } : {}; }); });

  // ---------- cuts, camera, parallax, grade, snow ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('x1'), tC = cut('m1'), tD = cut('m2'), tE = cut('m3'), tF = cut('r1'), tG = cut('b1'), tH = cut('j2'), tV = cut('v1'), tLoop = TOTAL - 0.5;
  const CUTS = [0, tB, tC, tD, tE, tF, tG, tH, tV], IDS = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#V'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { if (s === '#B') return; const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 200 * easeIO((t - c + 0.35) / 0.7); }); x -= 1600 * easeIO((t - tLoop) / 0.6); return x; };
  const step = (pts, t) => { let v = pts[0][1], pv = v, tc = 0; for (const [tt, o] of pts) if (t >= tt) { pv = v; v = o; tc = tt; } return pv + (v - pv) * clamp((t - tc + 0.25) / 0.5); };
  const WARM = [[0, 0], [tF, 1], [tG, 0], [tH, 0.85], [tV, 0]];
  const SNOW = [[0, 1], [tC, 0.35], [tE, 0.7], [tF, 0], [tV, 0.5], [tLoop, 1]];
  custom(t => {
    const x = camX(t);
    $('#far').style.transform = `translate(${(-x * 0.06).toFixed(1)}px,0)`;
    $('#mid').style.transform = `translate(${(-x * 0.25).toFixed(1)}px,${(8 * Math.sin(W2 * 4 * t)).toFixed(1)}px)`;
    $('#floor').style.transform = `translate(0,${(420 * step(WARM, t)).toFixed(1)}px)`;
    $('#warm').style.opacity = step(WARM, t).toFixed(3);
    $('#snow').style.opacity = step(SNOW, t).toFixed(3);
    flakes.forEach((f, k) => { const sp = 160 + hash(k * 4.1) * 220, y = ((hash(k * 7.3) * 1920 + t * sp * (1 + 0)) % 1920), xx = 30 * Math.sin(t * (0.8 + hash(k) * 1.2) + k); f.style.transform = `translate(${xx.toFixed(1)}px,${y.toFixed(1)}px)`; });
  });
  grade(0, 'rgba(80,170,255,.12)'); grade(tB, 'rgba(60,120,255,.18)'); grade(tC, 'rgba(255,220,80,.1)'); grade(tD, 'rgba(255,190,60,.14)'); grade(tE, 'rgba(70,90,220,.24)');
  grade(tF, 'rgba(255,140,60,.22)'); grade(tG, 'rgba(160,140,255,.1)'); grade(tH, 'rgba(255,70,40,.2)'); grade(tV, 'rgba(255,59,92,.12)'); grade(tLoop + 0.3, 'rgba(80,170,255,.12)');
  $$('.mm').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2') && !m.closest('#B')) idle(m, t => ({ y: 6 * Math.sin(W2 * 16 * t + i), r: 1.4 * Math.sin(W2 * 8 * t + i) })); });

  // ================= A: «Минус пятнадцать, сорок процентов — и телефон умер. Миф номер один: мороз убивает батарею насовсем? Байт или не байт?» =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  [A, A2].forEach(o => { pface(o.ph, 0, 'cold'); idle(o.ph, t => (t < W('hook', 4) || t > TOTAL - 1 ? { x: 4 * Math.sin(t * 60), r: 0.8 * Math.sin(t * 47) } : {})); mascotPose(o.m, 0, 'hold'); });
  idle(A.m, t => (t < tB ? { x: 3 * Math.sin(t * 55) } : {}));
  hide(aMyth); hide(aQ1); hide(aQ2); hide(aQm);
  punch(A.n1, W('hook', 0) + 0.1, 0.08); sfx('blip', W('hook', 0) + 0.1, 0.4);
  punch(A.pc, W('hook', 1), 0.12); punch(A.ph._bar, W('hook', 1), 0.12); sfx('tick', W('hook', 1), 0.6);
  // the charge drops 40 → 0 and the phone dies
  const tDie = W('hook', 4) - 0.05;
  const apc = A.pc; custom(t => { if (t > tB) return; apc.textContent = (t < W('hook', 2) ? 40 : Math.round(40 * (1 - clamp((t - W('hook', 2)) / 0.55)))) + '%'; apc.style.color = t > W('hook', 2) + 0.2 ? '#ff5f6d' : '#fff'; });
  level(A.ph, W('hook', 2), 0.4, 0.02, 0.55); tw(A.ph._fill, W('hook', 2), 0.001, { o: [1, 1] }); custom(t => { A.ph._fill.style.background = t > W('hook', 2) + 0.2 && t < tB ? '#ff5f6d' : '#7dff8a'; });
  tw(A.ph._off, tDie, 0.15, { o: [0, 0.92] }, 'lin'); tw(A.ph._x, tDie, 0.2, { o: [0, 1], s: [1.6, 1] }, 'back'); sfx('buzz', tDie, 0.6);
  tw(A.ph, tDie + 0.1, 0.5, { r: [0, -14], y: [0, 30] }, 'back');
  pface(A.ph, tDie, 'sleep');
  mascotPose(A.m, tDie, 'shock'); focus('#A > .cam', tDie, 540, 820, 1.15, 0.5);
  // the myth
  slideIn(aMyth, W('q', 0), 'left', 0.6, 400); sfx('whoosh', W('q', 0), 0.4);
  tw(A.pc, W('q', 0), 0.3, { o: [1, 0] }, 'lin');
  mascotPose(A.m, W('q', 2), 'think'); tw($$('#A .crk'), W('q', 2), 0.7, { dash: [100, 0] }, 'out'); sfx('glitch', W('q', 2), 0.4);
  popIn(aQm, W('q', 5) - 0.05, 0.4); sfx('pop', W('q', 5), 0.4); mascotPose(A.m, W('q', 5), 'pointUp');
  slideIn(aQ1, W('q2', 0), 'right', 0.5, 500); slideIn(aQ2, W('q2', 2), 'right', 0.5, 500); sfx('whoosh', W('q2', 0), 0.35); sfx('whoosh', W('q2', 2), 0.35);
  mascotPose(A.m, W('q2', 0), 'shrug'); tw(aQm, W('q2', 0), 0.3, { o: [1, 0] }, 'lin');

  // ================= B: «Проверим: выношу телефон на балкон. Через час — экран погас.» =================
  tZoom('#A', '#B', tB);
  // the camera starts close on the balcony door and pulls back to the whole house (scale)
  tw('#B > .cam', tB, 0.001, { s: [1.7, 1.7], y: [-430, -430] }); tw('#B > .cam', W('x1', 3) - 0.1, 0.9, { s: [1.7, 1], y: [-430, 0] }, 'inOut'); sfx('whoosh', W('x1', 3) - 0.1, 0.4);
  tw('#B > .cam', W('x1', 3) + 0.8, L('x2').t1 - W('x1', 3), { s: [1, 1.05] }, 'lin');
  hide(bM); hide(bPh); hide(bClock);
  tw(bM, W('x1', 1) - 0.15, 0.05, { o: [0, 1] }, 'lin'); tw(bM, W('x1', 1) - 0.15, 0.5, { x: [-120, 0], y: [-60, 0], s: [0.8, 1] }, 'out'); mascotPose(bM, W('x1', 0), 'point'); mascotPose(bM, W('x1', 1), 'hold');
  tw(bPh, W('x1', 1) - 0.15, 0.05, { o: [0, 1] }, 'lin'); tw(bPh, W('x1', 1) - 0.15, 0.5, { x: [-200, -30], y: [-90, -60] }, 'out');
  tw(bPh, W('x1', 4), 0.4, { x: [-30, 0], y: [-60, 0] }, 'out'); sfx('thud', W('x1', 4) + 0.35, 0.4); pface(bPh, W('x1', 4), 'cold');
  mascotPose(bM, W('x1', 4) + 0.2, 'pointL');
  tw(q1(bTh, '.thfill'), W('x1', 4), 1.2, { sy: [0.8, 0.15] }, 'inOut'); sfx('blip', W('x1', 4), 0.3);
  idle(bPh, t => (t > W('x1', 4) + 0.4 && t < W('x2', 3) ? { x: 2.5 * Math.sin(t * 60) } : {}));
  slideIn(bClock, W('x2', 0) - 0.1, 'right', 0.5, 500); sfx('whoosh', W('x2', 0) - 0.1, 0.35);
  tw(q1(bClock, '.cmin'), W('x2', 0) + 0.2, 0.9, { r: [0, 360] }, 'inOut'); tw(q1(bClock, '.chand'), W('x2', 0) + 0.2, 0.9, { r: [0, 30] }, 'inOut'); sfx('tick', W('x2', 1), 0.5); sfx('ding', W('x2', 1) + 0.6, 0.3);
  tw(bPh._off, W('x2', 3), 0.15, { o: [0, 0.92] }, 'lin'); sfx('buzz', W('x2', 3), 0.4);
  mascotPose(bM, W('x2', 3), 'shock'); focus('#B > .cam', W('x2', 3), 630, 980, 1.25, 0.45);

  // ================= C: «Что внутри? Заряд в батарее носят крошечные частички.» =================
  morphCut('#B', '#C', tC, bPh, cB, 0.62, 0); { const c = $('#morph').lastChild; c.querySelector('.scrOff').style.opacity = 0.92; }
  hide(cChip); cIons.forEach(e => hide(e)); hide(cBolt);
  slideIn(cChip, W('m1', 1), 'left', 0.6, 400); sfx('whoosh', W('m1', 1), 0.35);
  mascotPose(cM, tC + 0.3, 'think'); mascotPose(cM, W('m1', 2), 'pointL');
  popIn(cBolt, W('m1', 2), 0.4); sfx('zap', W('m1', 2), 0.4); idle(cBolt, t => ({ r: 4 * Math.sin(W2 * 30 * t) }));
  cIons.forEach((e, k) => { const t0 = W('m1', 4) + k * 0.05; tw(e, t0, 0.3, { s: [0.2, 1], o: [0, 1] }, 'back'); });
  sfx('pop', W('m1', 4), 0.4); sfx('pop', W('m1', 4) + 0.2, 0.3);
  // they run between the plates (−) → (+), looping
  const tRun = W('m1', 5), tRunE = tD + 0.6;
  cIons.forEach((e, k) => { const x0 = 290 + (k % 4) * 110; runLegs(e, tRun, tRunE, 16);
    idle(e, t => { if (t < tRun) return {}; const p = ((t - tRun) * 260 + k * 60) % 440; return { x: (285 + p) - x0, y: -6 * Math.abs(Math.sin((t - tRun) * 14 + k)) }; }); });
  focus('#C > .cam', W('m1', 6), 540, 640, 1.22, 0.6); sfx('riser2', W('m1', 6) - 0.2, 0.3);
  mascotPose(cM, W('m1', 6), 'point');

  // ================= D: «На морозе они вязнут, как в холодном меду.» =================
  tCircle('#C', '#D', tD, 540, 760);
  hide(dChip); dFl.forEach(e => hide(e));
  dFl.forEach((e, k) => { tw(e, W('m2', 1) - 0.1 + k * 0.06, 0.4, { o: [0, 1], y: [-120, 0], r: [-40, 0] }, 'out'); idle(e, t => ({ r: t * 25 * (k % 2 ? 1 : -1) })); });
  sfx('glitch', W('m2', 1), 0.3);
  tw(q1(dTh, '.thfill'), W('m2', 1), 0.7, { sy: [0.7, 0.12] }, 'inOut');
  mascotPose(dM, tD + 0.2, 'shock'); mascotPose(dM, W('m2', 3), 'hold');
  tw(q1(dJar, '.hjfill'), 0, 0.001, { sy: [0.85, 0.85] });
  dIons.forEach((e, k) => { runLegs(e, tD, tE + 0.5, 3); idle(e, t => (t > tD ? { x: 6 * Math.sin((t - tD) * 0.9 + k), r: 4 * Math.sin((t - tD) * 1.3 + k) } : {})); });
  dIons.forEach((e, k) => tw(q1(e, '.ieye'), W('m2', 3) + k * 0.05, 0.3, { sy: [1, 0.4] }, 'out'));
  punch(dJar, W('m2', 3), 0.05); sfx('thud', W('m2', 3), 0.4);
  slideIn(dChip, W('m2', 4), 'left', 0.6, 400); sfx('whoosh', W('m2', 4), 0.35);
  tw(q1(dJar, '.hjdip'), W('m2', 6) - 0.2, 0.9, { y: [0, -120], r: [0, 8] }, 'inOut');
  tw(q1(dJar, '.hjdrip'), W('m2', 6) - 0.2, 0.9, { y: [0, -120], sy: [1, 2.4] }, 'inOut');
  focus('#D > .cam', W('m2', 7), 390, 820, 1.18, 0.5); mascotPose(dM, W('m2', 7), 'facepalm');

  // ================= E: «Ток слабеет, и телефон думает: батарея пустая. Выключаюсь.» =================
  tWhip('#D', '#E', tE);
  hide(eBub); hide(eD1); hide(eD2); hide(eZz);
  level(ePh, 0, 0.3, 0.3, 0.001); pface(ePh, tE, 'cold');
  // the current along the wire thins out
  tw(eWire, W('m3', 0), 0.8, { s: [1, 0.35], o: [1, 0.45] }, 'inOut'); idle(eWire, t => (t < W('m3', 4) ? { r: 5 * Math.sin(t * 30) } : {})); tw(eWire, W('m3', 7), 0.3, { o: [0.45, 0] }, 'lin');
  sfx('zap', W('m3', 0), 0.3); mascotPose(eM, tE + 0.2, 'point');
  tw(q1(ePh, '.kpup'), W('m3', 4), 0.3, { x: [0, 6], y: [0, -8] }, 'out');
  tw(eD1, W('m3', 4), 0.2, { o: [0, 1], s: [0.3, 1] }, 'back'); tw(eD2, W('m3', 4) + 0.1, 0.2, { o: [0, 1], s: [0.3, 1] }, 'back'); popIn(eBub, W('m3', 4) + 0.2, 0.4); sfx('pop', W('m3', 4) + 0.2, 0.4);
  tw(q1(eBat, '.bfill'), W('m3', 5), 0.6, { sx: [0.7, 0.04] }, 'out'); custom(t => { if (t < tE || t > tF) return; q1(eBat, '.bfill').style.fill = t > W('m3', 5) + 0.25 ? '#ff5f6d' : '#7dff8a'; }); sfx('blip', W('m3', 6), 0.4);
  level(ePh, W('m3', 5), 0.3, 0.02, 0.6);
  pface(ePh, W('m3', 5), 'shock'); mascotPose(eM, W('m3', 6), 'shrug');
  // «Выключаюсь»: yawn, eyes close, screen goes dark, Zz
  const tOff = W('m3', 7) + 0.25;
  pface(ePh, W('m3', 7), 'sleep'); tw(q1(ePh, '.keye'), W('m3', 7) + 0.1, 0.4, { sy: [1, 0.08] }, 'inOut');
  tw(ePh._off, tOff, 0.3, { o: [0, 0.95] }, 'lin'); sfx('buzz', tOff, 0.45);
  tw(ePh, tOff, 0.6, { r: [0, -6], y: [0, 20] }, 'out');
  tw(eZz, tOff + 0.1, 0.5, { o: [0, 1], y: [40, -40] }, 'out'); idle(eZz, t => ({ y: 10 * Math.sin(t * 4) }));
  mascotPose(eM, tOff, 'facepalm'); focus('#E > .cam', W('m3', 7), 540, 760, 1.14, 0.4);

  // ================= F: «Заношу домой, согреваю — и заряд вернулся.» =================
  morphCut('#E', '#F', tF, ePh, fPh, 0.62, 0); { const c = $('#morph').lastChild; c.querySelector('.scrOff').style.opacity = 0.95; c.querySelector('.keye').style.transform = 'scaleY(0.08)'; c.querySelector('.barf').style.transform = 'scaleX(0.02)'; }
  tw(fPh._off, 0, 0.001, { o: [0.95, 0.95] }); tw(fPh._x, 0, 0.001, { o: [0, 0] }); level(fPh, 0, 0.02, 0.02, 0.001); tw(q1(fPh, '.keye'), 0, 0.001, { sy: [0.08, 0.08] });
  hide(fPct); hide(fHeat);
  tw([fM, $('#F .mshd')], tF - 0.1, 0.7, { x: [-420, 0] }, 'out');
  mascotPose(fM, tF, 'hold'); jump(fM, W('r1', 1), 30, 0.4);
  tw(q1(fTh, '.thfill'), W('r1', 2), 1.1, { sy: [0.15, 0.85] }, 'inOut'); sfx('riser', W('r1', 2) - 0.2, 0.3);
  tw(fHeat, W('r1', 2), 0.4, { o: [0, 1], y: [40, 0] }, 'out'); idle(fHeat, t => ({ y: -12 * Math.abs(Math.sin(t * 3)) }));
  mascotPose(fM, W('r1', 2), 'hold'); idle(fM, t => (t > W('r1', 2) && t < W('r1', 4) ? { r: 3 * Math.sin(t * 9) } : {}));
  // wakes up
  tw(fPh._off, W('r1', 4) - 0.1, 0.3, { o: [0.95, 0] }, 'lin'); tw(q1(fPh, '.keye'), W('r1', 4), 0.3, { sy: [0.08, 1] }, 'back'); sfx('ding', W('r1', 4), 0.45);
  tw(fHeat, W('r1', 4), 0.3, { o: [1, 0] }, 'lin');
  level(fPh, W('r1', 4), 0.02, 0.4, 0.7); pface(fPh, W('r1', 4), 'happy');
  popIn(fPct, W('r1', 4), 0.4); custom(t => { if (t < tF || t > tG + 0.5) return; fPct.textContent = Math.round(40 * clamp((t - W('r1', 4)) / 0.7)) + '%'; });
  tw(fPh, W('r1', 5), 0.4, { y: [0, -60] }, 'out'); tw(fPh, W('r1', 5) + 0.4, 0.4, { y: [-60, 0] }, 'in');
  burst('#F .cam', 14, 695, 960, W('r1', 5), 240, 7, 'spark', 0); mascotPose(fM, W('r1', 5), 'cheer');
  focus('#F > .cam', W('r1', 4), 640, 860, 1.2, 0.6);

  // ================= G: «Apple так и пишет: на холоде батарея садится временно. А вот жара, пишет Apple, старит батарею навсегда.» =================
  tSlideUp('#F', '#G', tG);
  hide(gSrc); hide(gC1); hide(gC2); hide(gArrow); hide(gSun); hide(gR); hide(gB2);
  slideIn(gSrc, W('b1', 0), 'left', 0.6, 500); sfx('whoosh', W('b1', 0), 0.4); mascotPose(gM, W('b1', 0), 'pointUp');
  tw(q1(gB1, '.bfill'), 0, 0.001, { sx: [0.4, 0.4] });
  idle(gSf, t => ({ r: t * 30 }));
  punch(gSf, W('b1', 5), 0.15); idle(gB1, t => (t > W('b1', 5) && t < W('b1', 8) ? { x: 3 * Math.sin(t * 60) } : {}));
  tw(q1(gB1, '.bfill'), W('b1', 6), 0.4, { sx: [0.4, 0.06] }, 'out'); mascotPose(gM, W('b1', 6), 'pointL');
  tw(gArrow, W('b1', 8) - 0.1, 0.05, { o: [0, 1] }, 'lin'); tw($$('#G .arc'), W('b1', 8) - 0.1, 0.5, { dash: [100, 0] }, 'out');
  tw(q1(gB1, '.bfill'), W('b1', 8), 0.5, { sx: [0.06, 0.4] }, 'out'); sfx('ding', W('b1', 8) + 0.3, 0.35);
  slideIn(gC1, W('b1', 8), 'left', 0.5, 400);
  // the heat side
  slideIn(gR, W('tw', 2) - 0.2, 'right', 0.6, 540); tw(gB2, W('tw', 2) - 0.1, 0.4, { o: [0, 1], x: [300, 0] }, 'out'); sfx('whoosh', W('tw', 2) - 0.2, 0.4);
  tw(gSun, W('tw', 2), 0.05, { o: [0, 1] }, 'lin'); tw(gSun, W('tw', 2), 0.5, { y: [200, 0], s: [0.5, 1] }, 'back'); idle(q1(gSun, '.sunrays'), t => ({ r: t * 30 }));
  mascotPose(gM, W('tw', 2), 'point'); tw(q1(gB2, '.bfill'), 0, 0.001, { sx: [0.9, 0.9] });
  custom(t => { if (t < tG || t > tH + 0.5) return; q1(gB2, '.bfill').style.fill = t > W('tw', 5) ? '#ff8a3d' : '#7dff8a'; });
  tw($$('#G .ck'), W('tw', 5), 0.4, { dash: [100, 0] }, 'out'); tw(gCrack, W('tw', 5), 0.001, { o: [1, 1] }); sfx('glitch', W('tw', 5), 0.45);
  tw(q1(gB2, '.bfill'), W('tw', 5) + 0.1, 0.6, { sx: [0.9, 0.55] }, 'out'); shake(W('tw', 5) + 0.05, 0.25, 10);
  slideIn(gC2, W('tw', 7), 'right', 0.5, 400); sfx('slam', W('tw', 7), 0.5); mascotPose(gM, W('tw', 7), 'shock');
  focus('#G > .cam', W('tw', 7), 810, 740, 1.15, 0.5);

  // ================= H: «Так что греть телефон на батарее — плохая идея.» =================
  tDrop('#G', '#H', tH);
  hide(hPh); hSw.forEach(e => hide(e)); hSt.forEach(e => hide(e)); hide(hX1); hide(hX2);
  level(hPh, 0, 0.4, 0.4, 0.001); pface(hPh, tH, 'happy');
  mascotPose(hM, tH + 0.2, 'think');
  tw(hPh, W('j2', 2) - 0.1, 0.05, { o: [0, 1] }, 'lin'); tw(hPh, W('j2', 2) - 0.1, 0.5, { y: [-500, 0], r: [-20, 0] }, 'out'); sfx('whoosh', W('j2', 2) - 0.1, 0.35);
  tw(hPh, W('j2', 2) + 0.4, 0.08, { sy: [1, 0.88] }, 'out'); tw(hPh, W('j2', 2) + 0.48, 0.3, { sy: [0.88, 1] }, 'back'); sfx('thud', W('j2', 2) + 0.4, 0.4);
  tw(q1(hR, '.rglow'), W('j2', 4), 0.6, { o: [0, 1] }, 'lin'); tw(q1(hR, '.rheat'), W('j2', 4), 0.4, { o: [0, 1], y: [30, 0] }, 'out');
  idle(q1(hR, '.rheat'), t => ({ y: -10 * Math.abs(Math.sin(t * 4)) }));
  hSt.forEach((e, k) => { const t0 = W('j2', 5) + k * 0.07; tw(e, t0, 0.05, { o: [0, 1] }, 'lin'); tw(e, t0, 1.2, { y: [0, -320 - 60 * hash(k)], s: [0.6, 1.8], x: [0, 30 * (hash(k * 3) - 0.5)] }, 'out'); tw(e, t0 + 0.8, 0.4, { o: [1, 0] }, 'lin'); });
  hSw.forEach((e, k) => { const t0 = W('j2', 5) + 0.1 + k * 0.08; tw(e, t0, 0.05, { o: [0, 1] }, 'lin'); tw(e, t0, 0.6, { y: [0, 200], x: [0, (k % 2 ? 40 : -40)] }, 'in'); tw(e, t0 + 0.5, 0.1, { o: [1, 0] }, 'lin'); });
  pface(hPh, W('j2', 5), 'sweat'); idle(hPh, t => (t > W('j2', 5) && t < tV ? { x: 4 * Math.sin(t * 50) } : {})); sfx('zap', W('j2', 5), 0.35);
  custom(t => { if (t < tH || t > tV + 0.5) return; hPh._fill.style.background = t > W('j2', 5) + 0.2 ? '#ff8a3d' : '#7dff8a'; });
  mascotPose(hM, W('j2', 5), 'shock');
  hX1.style.transformOrigin = '50% 50%'; hX2.style.transformOrigin = '50% 50%';
  tw(hX1, W('j2', 6), 0.18, { o: [0, 1], r: [45, 45], sx: [0, 1] }, 'out'); tw(hX2, W('j2', 6) + 0.12, 0.18, { o: [0, 1], r: [-45, -45], sx: [0, 1] }, 'out'); sfx('slam', W('j2', 6) + 0.1, 0.7); shake(W('j2', 6) + 0.2, 0.25, 14);
  mascotPose(hM, W('j2', 6), 'facepalm'); focus('#H > .cam', W('j2', 5), 540, 560, 1.15, 0.5);

  // ================= V: «Мороз убивает батарею насовсем — байт. Замёрз — грей в кармане. Следующий миф — быстрая зарядка. А у тебя телефон на морозе выключался?» =================
  tWhip('#H', '#V', tV, 0.46, -1);
  hide(vSt); hide(vMyth); hide(vJk); hide(vPh); hide(vPocket); hide(vHeat); hide(vNext); hide(vCh); hide(vBolt); hide(vQm); hide($('#V .vjsh'));
  level(vPh, 0, 0.4, 0.4, 0.001);
  slideIn(vMyth, W('v1', 0) - 0.05, 'left', 0.5, 500); sfx('whoosh', W('v1', 0), 0.35);
  tw(vSf, W('v1', 0), 0.4, { s: [0.3, 1] }, 'back'); idle(vSf, t => ({ r: t * 30 }));
  mascotPose(vM, tV + 0.1, 'think'); mascotPose(vM, W('v1', 2), 'pointUp');
  const tSt = W('v1', 4) - 0.02;
  tw(vM, tSt - 0.42, 0.22, { y: [0, -90] }, 'out'); tw(vM, tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose(vM, tSt - 0.45, 'pointUp', 0.25); mascotPose(vM, tSt - 0.18, 'point', 0.18);
  stamp(vSt, tSt, -7, 26); burst(vFx, 24, 540, 360, tSt + 0.05, 420, 61, 'conf', 140); sfx('ding', tSt + 0.2, 0.4);
  tw(vMyth, tSt + 0.05, 0.12, { x: [0, 0], o: [1, 0.35] }, 'lin');
  mascotPose(vM, tSt + 0.4, 'cheer');
  tw(vSt, W('e1', 0) - 0.1, 0.4, { y: [0, -60], s: [1, 0.75] }, 'inOut'); tw(vMyth, W('e1', 0) - 0.1, 0.3, { o: [0.35, 0] }, 'lin'); tw(vSf, W('e1', 0) - 0.1, 0.3, { o: [1, 0], s: [1, 0.3] }, 'in');
  // pocket: the phone slides into the jacket and warms up
  slideIn([vJk, $('#V .vjsh')], W('e1', 0), 'right', 0.5, 500); sfx('whoosh', W('e1', 0), 0.35); mascotPose(vM, W('e1', 0), 'point');
  tw(vPh, W('e1', 1) - 0.1, 0.05, { o: [0, 1] }, 'lin'); tw(vPh, W('e1', 1) - 0.1, 0.5, { y: [-300, 200] }, 'inOut'); tw(vPocket, W('e1', 1) - 0.1, 0.001, { o: [1, 1] });
  pface(vPh, W('e1', 1), 'happy'); sfx('pop', W('e1', 1) + 0.4, 0.4);
  tw(vHeat, W('e1', 3) - 0.1, 0.4, { o: [0, 1], y: [40, 0] }, 'out'); idle(vHeat, t => ({ y: -10 * Math.abs(Math.sin(t * 3)) }));
  focus('#V > .cam', W('e1', 3), 790, 980, 1.12, 0.4);
  // the next myth: fast charging
  tw([vJk, vPh, vPocket, vHeat, $('#V .vjsh')], W('nx', 0) - 0.1, 0.35, { x: [0, 600], o: [1, 0] }, 'in'); sfx('whoosh', W('nx', 0) - 0.1, 0.35);
  slideIn(vNext, W('nx', 0), 'right', 0.5, 500); mascotPose(vM, W('nx', 1), 'point');
  tw(vCh, W('nx', 2) - 0.05, 0.05, { o: [0, 1] }, 'lin'); tw(vCh, W('nx', 2) - 0.05, 0.5, { y: [300, 0], s: [0.5, 1] }, 'back'); sfx('pop', W('nx', 2), 0.4);
  popIn(vBolt, W('nx', 3), 0.35); sfx('zap', W('nx', 3), 0.35); idle(vBolt, t => ({ r: 6 * Math.sin(t * 20) }));
  // the question
  tw([vNext, vCh, vBolt], W('ask', 0) - 0.1, 0.3, { o: [1, 0] }, 'lin');
  popIn(vQm, W('ask', 3), 0.4); sfx('pop', W('ask', 3), 0.4); idle(vQm, t => ({ r: 6 * Math.sin(t * 5) }));
  mascotPose(vM, W('ask', 0), 'wave');
  tw([vSt, vQm], tLoop - 0.3, 0.3, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw(vM, tLoop + 0.3, 0.001, { o: [1, 0] }); tw($$('#V .mshd'), tLoop + 0.3, 0.001, { o: [1, 0] });
}, {});
