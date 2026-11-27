// 039 «Рис против 6 сушилок. Кто спасёт мокрый телефон?» — Как это работает, «Рис 2» (часть 2 к 022), пятница 27.11.2026.
// Стиль: проверка мифа на глазах — мокрые губки закопаны в семь сушилок, одна лежит на столе; через сутки их взвешивают. Маскот — рассказчик.
// Источники: iFixit «Rice Is for Dinner, Not Repair» (тест Gazelle 2014: рис — худший из семи, губка на воздухе высохла лучше всех;
//   «Power the device off immediately»; «Corrosion is instant»); Apple Support 108039 (28.10.2026): не заряжать, пока не высохнет, минимум 5 часов;
//   постучать о ладонь разъёмом вниз; вентилятор с холодным воздухом может помочь; не сушить внешним источником тепла.
// Свой мир: дневная кухня-лаборатория (бирюзовая плитка, окна, полки с банками круп, деревянная столешница), жёлтый акцент.
// Планы: A крупный (телефон тонет в стакане), B средний (маскот мочит губку), C общий/масштаб (вид сверху: семь мисок и стол),
//   D средний (мокрый телефон, кнопка), E крупный (макро разъёма), F средний (вилка и запрет), G крупный (телефон в руке, капли, вентилятор),
//   H средний (кошачий лоток и кот), I общий (весы и таблица «высохло за сутки»), V средний (штамп, вентилятор, вопрос).
// Склейки-превращения: губка → губка в рисе (B→C), телефон → разъём (D→E), телефон из руки → телефон в лотке (G→H).
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
  const burst = (par, n, x, y, t, dist = 220, seed = 0, cls = 'spark', fall = 0, cols = ['#ffd84d', '#5fc8ff', '#ff8a3d', '#ff5f8a', '#7dff9a']) => {
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls !== 'spark') s.style.background = cols[k % cols.length]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.8, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.6, 0.25, { o: [1, 0] }, 'lin'); } };
  const ringAt = (par, x, y, t, sz = 110, col = '#fff') => { const r = mk(par, 'ring'); r.style.borderColor = col; place(r, x - sz / 2, y - sz / 2, sz, sz); hide(r);
    tw(r, t, 0.05, { o: [0, 1] }, 'lin'); tw(r, t, 0.45, { s: [0.4, 1.7] }, 'out'); tw(r, t + 0.25, 0.2, { o: [1, 0] }, 'lin'); };
  const shadow = (par, x, y, w, h = 60) => put(par, 'shd', '', x - w / 2, y - h / 2, w, h);
  const mascot = (par, id, x, y, sz, sh = true) => { const m = put(par, 'mm', mascotSVG(id), x, y, sz, sz); if (sh) { const s = shadow(par, x + sz / 2, y + sz * 0.95, sz * 0.7, 50); s.classList.add('mshd'); m._shd = s; } return m; };
  const chip = (par, cls, txt, x, y, fs) => { const c = put(par, cls, txt, x, y); if (fs) c.style.fontSize = fs + 'px'; return c; };
  // phone character (talkPhoneSVG) with a dark-screen overlay (._off) and closed-eye Zz
  const phone = (par, id, x, y, w, sh = true) => {
    const h = w * 560 / 300, k = w / 300;
    if (sh) shadow(par, x + w / 2, y + h * 0.99, w * 0.8, Math.max(20, w * 0.14));
    const p = put(par, 'tph', talkPhoneSVG(id, '#4a5fd8'), x, y, w, h); p.style.transformOrigin = '50% 96%';
    p._off = put(p, 'scrOff', '', 38 * k, 70 * k, 224 * k, 400 * k); p._off.style.opacity = 0;
    p._wet = put(p, 'wetL', '', 20 * k, 20 * k, 260 * k, 520 * k); p._wet.style.cssText += `;border-radius:${46 * k}px;background:linear-gradient(180deg,rgba(95,200,255,.0),rgba(95,200,255,.35));opacity:0`;
    return p; };
  const pface = (p, t, kind) => {
    const P = { rest: [0, 0, 0, 0.12], shock: [-60, 60, -14, 0.8], happy: [-40, 40, -8, 0.5], sad: [10, -10, 8, 0.12], sleep: [10, -10, 8, 0.05], up: [-150, 150, -10, 0.7] }[kind];
    const A = p._f || [0, 0, 0, 0.12];
    tw(q1(p, '.karmL'), t, 0.35, { r: [A[0], P[0]] }, 'back'); tw(q1(p, '.karmR'), t, 0.35, { r: [A[1], P[1]] }, 'back');
    tw(q1(p, '.kbrow'), t, 0.3, { y: [A[2], P[2]] }, 'out'); tw(q1(p, '.kmouth'), t, 0.3, { sy: [A[3], P[3]] }, 'out'); p._f = P; };
  const sleepEyes = (p, t, d = 0.3) => tw(q1(p, '.keye'), t, d, { sy: [1, 0.08] }, 'inOut');
  const drop = (par, id, x, y, sz = 44) => put(par, 'drop', dropSVG(id, false), x, y, sz, sz * 1.3);
  // a flight along an arc: the element sits at its layout place at the end; before t0 it is offset by (dx,dy)
  const arc = (el, t0, d, dx, dy, h = 220) => idle(el, t => { if (t >= t0 + d) return {}; const p = t < t0 ? 0 : (t - t0) / d, e = easeIO(p); return { x: dx * (1 - e), y: dy * (1 - e) - h * Math.sin(Math.PI * e), r: 18 * Math.sin(Math.PI * e) }; });
  // dripping water: drops fall from (x,y) in a loop during [t0,t1]
  const drips = (par, n, x0, x1, y, t0, t1, fall = 300, seed = 0) => { for (let k = 0; k < n; k++) { const d = drop(par, 'dr' + seed + '_' + k, x0 + (x1 - x0) * hash(k * 3.3 + seed), y, 30);
    const P = 0.9 + 0.5 * hash(k * 1.7 + seed), ph = hash(k * 5.1 + seed) * P; d.style.opacity = 0;
    custom(t => { if (t < t0 || t > t1) { d.style.opacity = 0; return; } const u = ((t - t0 + ph) % P) / P; d.style.opacity = u < 0.85 ? 1 : 0;
      d.style.transform = `translate(0px,${(fall * u * u).toFixed(1)}px) scale(${(0.6 + 0.4 * Math.min(1, u * 4)).toFixed(2)})`; }); } };

  // ---------- world ----------
  $('#far').innerHTML = wallSVG(); $('#mid').innerHTML = shelvesSVG(); $('#floor').innerHTML = counterSVG();
  dof('#far', 4); dof('#mid', 1.6);
  lookFX({ grain: 0.1, tint: 'transparent' });

  // ================= layouts =================
  // ----- A: hook (close-up): a phone sinks in a glass of water; rice and six more dryers -----
  const buildA = (cam, s) => {
    const t1 = put(cam, 'big', 'РИС <i>ПРОТИВ</i>', 0, 150, 1080); t1.style.fontSize = '104px';
    const t2 = put(cam, 'big', '<b>6</b> СУШИЛОК', 0, 272, 1080); t2.style.fontSize = '112px';
    shadow(cam, 305, 1092, 420, 50);
    const gb = put(cam, 'glass', glassSVG('ab' + s, 'back'), 90, 480, 430, 628);
    const ph = phone(cam, 'a' + s, 210, 400, 190, false);
    const gf = put(cam, 'glass', glassSVG('af' + s, 'front'), 90, 480, 430, 628);
    shadow(cam, 760, 700, 360, 40);
    const rice = put(cam, 'dish', dishSVG('ar' + s, 'rice', '#e85d5d'), 570, 470, 380, 228);
    const kinds = ['couscous', 'oats', 'litter', 'gel', 'instant', 'oats'], rims = ['#5fb0ff', '#ff9a3d', '#7dff8a', '#c77dff', '#ffd84d', '#5fd4ff'];
    const minis = kinds.map((k, i) => put(cam, 'dish', dishSVG('am' + s + i, k, rims[i]), 570 + (i % 3) * 130, 720 + Math.floor(i / 3) * 92, 125, 75));
    const m = mascot(cam, 'am' + s, 600, 960, 360);
    const part = chip(cam, 'nb-chip chipL', 'ЧАСТЬ 2', 40, 1150, 46);
    return { t1, t2, gb, ph, gf, rice, minis, m, part };
  };
  const A = buildA('#A .cam', ''), A2 = buildA('#A2 .cam', '2');
  const camA = $('#A .cam');
  A2.minis.forEach(e => e.style.opacity = 0);
  const aBub = []; for (let k = 0; k < 10; k++) aBub.push(put(camA, 'bub', '', 200 + hash(k * 2.9) * 220, 900, 18 + hash(k) * 22, 18 + hash(k) * 22));
  const aSpl = []; for (let k = 0; k < 12; k++) aSpl.push(drop(camA, 'as' + k, 280 + (k - 6) * 8, 610, 40 + hash(k * 4.4) * 26));
  const aQm = put(camA, 'qm', '?', 380, 360); aQm.style.fontSize = '150px';

  // ----- B: medium: the mascot soaks a sponge; a row of sponges; the source -----
  const camB = $('#B .cam');
  const bSrc = put(camB, 'nb-panel', '<div style="position:absolute;left:34px;top:22px;font:800 36px JB;color:#fff;white-space:nowrap">IFIXIT</div><div style="position:absolute;left:34px;top:78px;font:700 30px JB;color:#bfe0dc;white-space:nowrap">ТЕСТ GAZELLE, 2014</div>', 60, 190, 520, 140);
  const bRow = []; for (let k = 0; k < 8; k++) bRow.push(put(camB, 'sp', spongeSVG('br' + k, false, k === 7 ? '#ffd84d' : '#ffd84d'), 70 + k * 112, 430, 100, 67));
  shadow(camB, 750, 1290, 480, 50);
  const bBasin = put(camB, 'dish', dishSVG('bb', 'empty', '#3d7fd8'), 510, 1020, 480, 288);
  const bWater = put(camB, 'water', '', 548, 1150, 404, 40); bWater.style.cssText += ';border-radius:50%;background:linear-gradient(180deg,#bff0ff,#3fa8ff);border:7px solid var(--ink)';
  const bM = mascot(camB, 'bm', 30, 800, 420);
  const bSp = put(camB, 'sp', spongeSVG('bs', true, '#ffd84d'), 440, 720, 300, 200);
  const bSpl = []; for (let k = 0; k < 10; k++) bSpl.push(drop(camB, 'bsp' + k, 740, 1110, 34 + hash(k * 2.2) * 20));

  // ----- C: general / top view: seven bowls and a bare spot on the table, the mascot throws sponges in -----
  const camC = $('#C .cam');
  const MAT = [
    ['rice', 'РИС', 'radial-gradient(circle at 35% 30%,#ffffff,#e6dcc4)', '#d2c6a6'], ['couscous', 'КУСКУС', 'radial-gradient(circle at 35% 30%,#ffe9a0,#e0b54a)', '#c08a2a'],
    ['oats', 'ОВСЯНКА', 'radial-gradient(circle at 35% 30%,#f6e2b8,#c9a066)', '#9a7444'], ['litter', 'НАПОЛНИТЕЛЬ', 'radial-gradient(circle at 35% 30%,#d4d7dc,#8a8f98)', '#5f646c'],
    ['gel', '', 'radial-gradient(circle at 35% 30%,#ffffff,#bfe6fa)', '#7fbfe0'], ['instant', '', 'radial-gradient(circle at 35% 30%,#efe0c0,#c49c5c)', '#8a6a3a'],
    ['instant', '', 'radial-gradient(circle at 35% 30%,#fff7e6,#e9d9b0)', '#bba57a']];
  const RIM = ['#e85d5d', '#5fb0ff', '#ff9a3d', '#7dff8a', '#c77dff', '#ffd84d', '#5fd4ff'];
  const cell = i => [60 + (i % 3) * 330, 290 + Math.floor(i / 3) * 320];
  const cBowl = [], cSp = [], cCov = [], cLbl = [];
  MAT.forEach((m, i) => { const [x, y] = cell(i);
    const b = put(camC, 'tbowl', '', x + 20, y + 10, 260, 260); b.style.background = `${m[2]}`; b.style.borderColor = '#0a130d'; b.style.outline = `14px solid ${RIM[i]}`; b.style.outlineOffset = '-24px';
    const tex = put(b, 'tex', '', 20, 20, 200, 200); tex.style.cssText += `;border-radius:50%;background-image:radial-gradient(${m[3]} 3px,transparent 4px);background-size:18px 18px;opacity:.9`;
    cBowl.push(b);
    cSp.push(put(camC, 'tsp', '', x + 80, y + 95, 140, 90));
    const cv = put(camC, 'cov', '', x + 60, y + 50, 180, 180); cv.style.cssText += `;border-radius:50%;background:${m[2]};border:6px solid rgba(0,0,0,.18)`; cCov.push(cv);
    if (m[1]) { const l = chip(camC, 'nb-chip chipL', m[1], 0, y + 236, 30); l.style.height = '62px'; l.style.lineHeight = '56px'; l.style.padding = '0 24px'; l.style.left = (x + 150 - l.offsetWidth / 2) + 'px'; cLbl[i] = l; } });
  { const [x, y] = cell(7); put(camC, 'napkin', '', x + 30, y + 40, 240, 200); cSp.push(put(camC, 'tsp', '', x + 80, y + 95, 140, 90));
    const l = chip(camC, 'nb-chip w chipL w', 'НА СТОЛЕ', 0, y + 236, 30); l.style.height = '62px'; l.style.lineHeight = '56px'; l.style.padding = '0 24px'; l.style.left = (x + 150 - l.offsetWidth / 2) + 'px'; cLbl[7] = l; }
  const cM = mascot(camC, 'cm', 735, 935, 290);

  // ----- D: medium: the wet phone in a puddle, the mascot and a big power button -----
  const camD = $('#D .cam');
  const dPud = put(camD, 'pud', puddleSVG(), 330, 1035, 420, 105);
  const dPh = phone(camD, 'd', 400, 480, 290, false);
  const dM = mascot(camD, 'dm', 0, 880, 400);
  shadow(camD, 840, 1100, 260, 40);
  const dBtn = put(camD, 'pbtn', powerButtonSVG('d', '#ff5f6d'), 720, 900, 240, 192);
  const dQm = put(camD, 'qm', '?', 700, 380); dQm.style.fontSize = '170px';
  const dZz = put(camD, 'zz', 'Z<i style="position:static;font-style:normal;color:var(--acc)">z</i>', 680, 520);

  // ----- E: close-up macro of the charging port: water + current = rust -----
  const camE = $('#E .cam');
  const ePort = put(camE, 'port', portSVG('e'), 40, 420, 1000, 500);
  const eSw = put(camE, 'sw', stopwatchSVG('e', '#ff5f6d'), 700, 150, 220, 264);
  const eChip = chip(camE, 'nb-chip w chipL w', 'ВОДА + ТОК', 420, 1160, 46);
  const eM = mascot(camE, 'em', 20, 990, 300);

  // ----- F: medium: the mascot brings a charging cable — no-entry sign, Apple: at least 5 hours -----
  const camF = $('#F .cam');
  const fSrc = put(camF, 'nb-panel', '<div style="position:absolute;left:34px;top:22px;font:800 36px JB;color:#fff;white-space:nowrap">APPLE SUPPORT</div><div style="position:absolute;left:34px;top:78px;font:700 30px JB;color:#bfe0dc;white-space:nowrap">28.10.2026 · ВОДА И IPHONE</div>', 60, 190, 600, 140);
  const fPh = phone(camF, 'f', 120, 560, 270, true);
  const fM = mascot(camF, 'fm', 620, 900, 400);
  const fPlug = put(camF, 'plug', usbPlugSVG('f'), 400, 1100, 300, 86);
  const fNo = put(camF, 'no', noEntrySVG('f'), 400, 760, 200, 200);
  const fClk = put(camF, 'clk', clockSVG('f', '#ffd84d'), 640, 380, 280, 296);
  const fLbl = put(camF, 'lbl', '<i>5</i> ЧАСОВ', 560, 700, 460); fLbl.style.fontSize = '86px';

  // ----- G: close-up: the phone held port-down, tap-tap on the palm, drops fly out; then the fan; no hair dryer -----
  const camG = $('#G .cam');
  const gM = mascot(camG, 'gm', -60, 780, 540);
  const gPalm = put(camG, 'palm', '', 470, 1010, 280, 90); gPalm.style.cssText += ';border-radius:50%;background:linear-gradient(180deg,#ffffff,#d9e2ea);border:9px solid var(--ink)';
  const gPh = phone(camG, 'g', 450, 400, 320, false);
  const gDr = []; for (let k = 0; k < 9; k++) gDr.push(drop(camG, 'gd' + k, 590 + (k % 3 - 1) * 26, 990, 40 + hash(k * 2.7) * 20));
  const gFan = put(camG, 'fan', fanSVG('g', '#5fd4ff'), 610, 520, 360, 460);
  const gCold = chip(camG, 'nb-chip w chipL w', '❄ ХОЛОДНЫЙ', 560, 1010, 44);
  const gHd = put(camG, 'hd', hairDryerSVG('g', '#ff5fa2'), 600, 230, 300, 253);
  const gX1 = put(camG, 'xbig', '', 560, 330, 380), gX2 = put(camG, 'xbig', '', 560, 330, 380);

  // ----- H: medium (joke): the phone in a cat's litter tray; the cat is not amused -----
  const camH = $('#H .cam');
  shadow(camH, 360, 1200, 620, 50);
  const hPh = phone(camH, 'h', 300, 790, 150, false);
  const hBox = put(camH, 'box', litterBoxSVG('h', '#5fb0ff'), 60, 950, 600, 254);
  shadow(camH, 800, 1150, 300, 40);
  const hCat = put(camH, 'cat', catSVG('h'), 640, 760, 330, 385);
  const hQ = put(camH, 'qm', '?!', 720, 560); hQ.style.fontSize = '140px';
  const hM = mascot(camH, 'hm', 40, 420, 320);

  // ----- I: general: a day later the sponges are weighed — the table «dried in a day» -----
  const camI = $('#I .cam');
  const iClk = put(camI, 'clk', clockSVG('i', '#5fd4ff'), 80, 230, 240, 253);
  const iScale = put(camI, 'scl', kitchenScaleSVG('i'), 300, 620, 480, 271);
  const iScTxt = put(camI, 'pct', '', 434, 776, 212); iScTxt.style.fontSize = '50px'; iScTxt.style.color = '#7dff8a'; iScTxt.style.webkitTextStroke = '0';
  const iSp = put(camI, 'sp', spongeSVG('is', true, '#ffd84d', true), 420, 470, 240, 160);
  const iHead = chip(camI, 'nb-chip chipL', 'ВЫСОХЛО ЗА СУТКИ', 60, 190, 42);
  const ROWS = [['air', 'СТОЛ', 0.96], ['gel', '', 0.62], ['couscous', '', 0.62], ['litter', 'НАПОЛНИТЕЛЬ', 0.62], ['oats', '', 0.62], ['instant', '', 0.62], ['instant', '', 0.62], ['rice', 'РИС', 0.3]];
  const rowRim = ['#ffffff', '#c77dff', '#5fb0ff', '#7dff8a', '#ff9a3d', '#ffd84d', '#5fd4ff', '#e85d5d'];
  const iRows = ROWS.map((r, i) => { const y = 310 + i * 116; const g = put(camI, 'row', '', 0, y, 1080, 100);
    const ic = r[0] === 'air' ? put(g, 'napkin', '', 70, 8, 110, 84) : put(g, 'dish', dishSVG('ir' + i, r[0], rowRim[i]), 50, 12, 140, 84);
    const bar = put(g, 'rowbar', '', 200, 4, 500); const fill = put(bar, 'rowfill', ''); if (r[0] === 'rice') fill.style.background = 'linear-gradient(90deg,#ff3b5c,#ff8a9a)'; if (r[0] === 'air') fill.style.background = 'linear-gradient(90deg,#ffd84d,#fff2a8)';
    const lb = r[1] ? put(bar, 'rl', r[1], 24, 14) : null; if (lb) lb.style.cssText += ';font:900 44px/1 Unb;color:#fff;-webkit-text-stroke:8px var(--ink);paint-order:stroke fill;white-space:nowrap';
    return { g, ic, bar, fill, lb, v: r[2] }; });
  const iLast = chip(camI, 'nb-chip r chipL r', 'ПОСЛЕДНИЙ', 715, 1130, 34);
  const iArw = put(camI, 'arw', arrowSVG('#ff3b5c'), 700, 690, 120, 420);
  const iCrown = put(camI, 'crown', crownSVG(), 610, 236, 110, 82);
  const iTsp = put(camI, 'sp', spongeSVG('it', true, '#ffd84d'), 715, 316, 120, 80);
  const iM = mascot(camI, 'im', 825, 720, 210);
  const iFx = put(camI, 'ifx', '', 0, 0);

  // ----- V: verdict, takeaway, question -----
  const camV = $('#V .cam');
  const vM = mascot(camV, 'vm', -10, 860, 480);
  const vSt = put(camV, 'stt', 'БАЙТ', 260, 280, 560, 170); vSt.style.cssText += ';border:18px solid var(--red);color:var(--red);font:900 112px/134px Unb';
  const vQ = chip(camV, 'nb-chip chipL', 'РИС СПАСАЕТ ТЕЛЕФОН?', 90, 520, 42);
  const vPh = phone(camV, 'v', 520, 690, 200, true);
  const vFan = put(camV, 'fan', fanSVG('v', '#5fd4ff'), 720, 660, 260, 332);
  const vAir = chip(camV, 'nb-chip w chipL w', 'СПАСАЕТ ВОЗДУХ', 440, 1110, 44);
  const vRice = put(camV, 'rice', riceBowlSVG('v', '#e85d5d'), 520, 700, 380, 277);
  const vQm = put(camV, 'qm', '?', 820, 560); vQm.style.fontSize = '260px';
  const vFx = put(camV, 'vfx', '', 0, 0);

  mascotLife(); mascotTalk();
  // phones blink
  $$('.tph .keye').forEach((e, i) => { tw(e, 0, 0.001, { sy: [1, 1] }); if (e.closest('#A2')) return; const P = TOTAL / 9 + hash(i) * 1.3, ph = hash(i * 2.3) * P; idle(e, t => { if (t < 0.6 || t > TOTAL - 0.8) return {}; const u = (t + ph) % P; return u < 0.15 ? { sy: -0.9 * Math.sin(Math.PI * u / 0.15) } : {}; }); });

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('f1'), tC = cut('f2'), tD = cut('q1'), tE = W('w1', 2) - 0.14, tF = cut('w2'), tG = cut('w3'), tH = cut('j1'), tI = cut('r1'), tV = cut('v1'), tLoop = TOTAL - 0.5;
  const CUTS = [0, tB, tC, tD, tE, tF, tG, tH, tI, tV], IDS = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I', '#V'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { if (s === '#C') return; const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 220 * easeIO((t - c + 0.35) / 0.7); }); x -= 1980 * easeIO((t - tLoop) / 0.6); return x; };
  // top view in C: the wall and shelves slide away (we look down at the table), the counter fills the frame
  const step = (pts, t) => { let v = pts[0][1], pv = v, tc = 0; for (const [tt, o] of pts) if (t >= tt) { pv = v; v = o; tc = tt; } return pv + (v - pv) * clamp((t - tc + 0.25) / 0.5); };
  const TOP = [[0, 0], [tC, 1], [tD, 0], [tI, 0.0], [tV, 0]];
  custom(t => {
    const x = camX(t), top = step(TOP, t);
    $('#far').style.transform = `translate(${(-x * 0.06).toFixed(1)}px,${(-900 * top).toFixed(1)}px)`;
    $('#mid').style.transform = `translate(${(-x * 0.25).toFixed(1)}px,${(6 * Math.sin(W2 * 4 * t) - 1000 * top).toFixed(1)}px)`;
    $('#floor').style.transform = `translate(${(-x * 0.5 % 200).toFixed(1)}px,${(-1430 * top).toFixed(1)}px) scale(1,${(1 + 2.4 * top).toFixed(3)})`;
  });
  $('#floor').style.transformOrigin = '50% 0';
  grade(0, 'rgba(95,200,255,.14)'); grade(tB, 'rgba(255,216,77,.08)'); grade(tC, 'rgba(255,190,90,.12)'); grade(tD, 'rgba(95,200,255,.16)'); grade(tE, 'rgba(255,120,60,.16)');
  grade(tF, 'rgba(255,216,77,.08)'); grade(tG, 'rgba(120,220,255,.16)'); grade(tH, 'rgba(255,150,60,.24)'); grade(tI, 'rgba(120,255,150,.14)'); grade(tV, 'rgba(255,59,92,.12)'); grade(tLoop + 0.3, 'rgba(95,200,255,.14)');
  $$('.mm').forEach((m, i) => { if (!m.closest('#A2')) idle(m, t => ({ y: 6 * Math.sin(W2 * 16 * t + i), r: 1.4 * Math.sin(W2 * 8 * t + i) })); });

  // ================= A: «Рис и ещё шесть сушилок. Какая спасёт мокрый телефон?» =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02); sfx('boom', 0.0, 0.4);
  [A, A2].forEach(o => { pface(o.ph, 0, 'up'); tw(o.ph._wet, 0, 0.001, { o: [0.8, 0.8] }); mascotPose(o.m, 0, 'shock', 0.001); });
  // the phone plunges and sinks; splash drops already in flight on frame 0
  tw(A.ph, 0, 1.3, { y: [60, 300], r: [-6, 6] }, 'out');
  tw(A2.ph, 0, 0.001, { y: [60, 60], r: [-6, -6] });
  tw(q1(A.gf, '.gsurf'), -0.1, 0.9, { sy: [3, 1] }, 'elastic');
  aSpl.forEach((d, k) => { const a = -Math.PI / 2 + (k / 11 - 0.5) * 2.4, sp = 300 + 200 * hash(k * 7.1); tw(d, -0.45, 0.001, { o: [1, 1] });
    tw(d, -0.45, 1.1, { x: [0, Math.cos(a) * sp], y: [0, Math.sin(a) * sp + 420], r: [0, (a + Math.PI / 2) * 60] }, 'lin'); tw(d, 0.45, 0.25, { o: [1, 0] }, 'lin'); });
  aBub.forEach((b, k) => { const P = 1.1 + hash(k * 3.7) * 0.6, ph = hash(k * 1.3) * P; b.style.opacity = 0;
    custom(t => { if (t > tB + 0.5) return; const u = ((t + ph) % P) / P; b.style.opacity = t < 0.15 ? 0 : (u < 0.9 ? 0.9 : 0); b.style.transform = `translate(${(10 * Math.sin(u * 9 + k)).toFixed(1)}px,${(-300 * u).toFixed(1)}px)`; }); });
  idle(A.ph, t => (t > 1.2 && t < tB + 0.5 ? { y: 8 * Math.sin((t - 1.2) * 3), r: 2 * Math.sin((t - 1.2) * 2) } : {}));
  punch(A.t1, W('hook', 0), 0.08); punch(A.rice, W('hook', 0), 0.14); sfx('pop', W('hook', 0), 0.5); mascotPose(A.m, W('hook', 0) + 0.1, 'pointUp');
  A.minis.forEach((e, k) => { tw(e, W('hook', 3) + k * 0.07, 0.35, { s: [0.2, 1], o: [0, 1], y: [40, 0] }, 'back'); sfx('tick', W('hook', 3) + k * 0.07, 0.4); });
  punch(A.t2, W('hook', 3), 0.1);
  hide(A.part); tw(A2.part, 0, 0.001, { o: [0, 0] });
  slideIn(A.part, 0.25, 'left', 0.6, 400); sfx('whoosh', 0.25, 0.3);
  mascotPose(A.m, W('hook', 5), 'point');
  pface(A.ph, W('hook', 7), 'shock'); hide(aQm); popIn(aQm, W('hook', 8), 0.4); sfx('pop', W('hook', 8), 0.4); idle(aQm, t => ({ r: 6 * Math.sin(t * 5) }));
  focus('#A > .cam', W('hook', 7), 420, 820, 1.08, 0.45);
  mascotPose(A.m, W('hook', 8), 'think');

  // ================= B: «Их проверили на мокрых губках.» =================
  tZoom('#A', '#B', tB);
  hide(bSrc); bRow.forEach(e => hide(e)); bSpl.forEach(e => hide(e));
  mascotPose(bM, tB + 0.1, 'hold');
  slideIn(bSrc, W('f1', 1) - 0.1, 'left', 0.6, 500); sfx('whoosh', W('f1', 1) - 0.1, 0.35);
  bRow.forEach((e, k) => { tw(e, W('f1', 1) + k * 0.06, 0.3, { o: [0, 1], s: [0.3, 1], y: [-60, 0] }, 'back'); sfx('pop', W('f1', 1) + k * 0.06, 0.25); });
  // dunk: the sponge dives into the basin and comes out soaked
  const tDunk = W('f1', 3) - 0.1;
  tw(bSp, tDunk, 0.3, { x: [0, 140], y: [0, 330], r: [0, 20] }, 'in'); tw(bSp, tDunk + 0.4, 0.45, { x: [140, 0], y: [330, 0], r: [20, 0] }, 'out');
  tw(q1(bSp, '.spwet'), tDunk + 0.3, 0.1, { o: [0, 1] }, 'lin'); sfx('boom', tDunk + 0.28, 0.4);
  mascotPose(bM, tDunk, 'point', 0.3); mascotPose(bM, tDunk + 0.5, 'hold');
  bSpl.forEach((d, k) => { const a = -Math.PI / 2 + (k / 9 - 0.5) * 2.2, sp = 160 + 140 * hash(k * 5.3); tw(d, tDunk + 0.28, 0.001, { o: [0, 1] });
    tw(d, tDunk + 0.28, 0.7, { x: [0, Math.cos(a) * sp], y: [0, Math.sin(a) * sp + 260] }, 'lin'); tw(d, tDunk + 0.8, 0.2, { o: [1, 0] }, 'lin'); });
  tw(q1(bSp, '.spmouth'), tDunk + 0.4, 0.3, { sy: [0.2, 0.9] }, 'out'); tw(q1(bSp, '.spsweat'), tDunk + 0.5, 0.2, { o: [0, 1] }, 'lin');
  drips(camB, 4, 470, 710, 900, tDunk + 0.9, tC + 0.6, 260, 3);
  punch(bWater, tDunk + 0.3, 0.12);

  // ================= C: «Губки закопали в рис, кускус, овсянку и даже кошачий наполнитель. А одну просто оставили на столе.» =================
  morphCut('#B', '#C', tC, bSp, cSp[0], 0.62, 25);
  tw('#C > .cam', tC, 0.001, { s: [1.0, 1.0] }); tw('#C > .cam', tC + 0.4, tD - tC, { s: [1.0, 1.05] }, 'lin');
  cLbl.forEach(l => l && hide(l)); cCov.forEach(c => hide(c));
  // the bowls land (top view), the camera rises
  const THROW = [null, W('f2', 4), W('f2', 5), W('f2', 9), W('f2', 6) + 0.05, W('f2', 7), W('f2', 8)];
  cBowl.forEach((b, i) => { tw(b, tC + 0.05 + i * 0.04, 0.4, { s: [0.6, 1], o: [0, 1] }, 'back'); });
  // sponges fly from the mascot to the bowls (sponge 0 arrives by the match cut)
  const mx = 880, my = 1060;
  cSp.forEach((s, i) => { if (i === 0) return; const [x, y] = cell(i), cx = x + 150, cy = y + 140, t0 = i === 7 ? W('f3', 3) - 0.35 : THROW[i] - 0.3;
    hide(s); tw(s, t0, 0.001, { o: [0, 1] }); arc(s, t0, 0.42, mx - cx, my - cy, 160); sfx('whoosh', t0, 0.25); sfx('thud', t0 + 0.42, 0.35);
    mascotPose(cM, t0 - 0.05, i % 2 ? 'pointUp' : 'point', 0.2); });
  // buried: the material covers the sponge
  cCov.forEach((c, i) => { const tl = i === 0 ? W('f2', 3) : THROW[i] + 0.12; tw(c, tl + 0.1, 0.35, { s: [0.2, 1], o: [0, 1] }, 'back'); sfx('pop', tl + 0.1, 0.3); punch(cBowl[i], tl + 0.1, 0.06); });
  [0, 1, 2, 3].forEach(i => { const tl = i === 0 ? W('f2', 3) : i === 3 ? W('f2', 8) : THROW[i]; slideIn(cLbl[i], tl, 'down', 0.45, 80); });
  slideIn(cLbl[7], W('f3', 4), 'down', 0.45, 80); sfx('ding', W('f3', 5), 0.35);
  mascotPose(cM, W('f3', 0), 'pointL'); mascotPose(cM, W('f3', 5), 'shrug');
  // sponge on the table: a little hop
  jump(cSp[7], W('f3', 5) + 0.1, 30, 0.35);

  // ================= D: «А что пока с телефоном? Сразу выключи.» =================
  tCircle('#C', '#D', tD, 540, 760);
  pface(dPh, 0, 'sad'); tw(dPh._wet, 0, 0.001, { o: [1, 1] }); hide(dQm); hide(dZz);
  drips(camD, 5, 420, 670, 1000, tD, tE + 0.5, 70, 11);
  mascotPose(dM, tD + 0.2, 'pointL'); mascotPose(dM, W('q1', 4), 'think');
  popIn(dQm, W('q1', 4), 0.4); sfx('pop', W('q1', 4), 0.4); idle(dQm, t => ({ r: 6 * Math.sin(t * 5) })); pface(dPh, W('q1', 4), 'shock');
  tw(dPh, W('q1', 4), 0.3, { r: [0, -5] }, 'out');
  // «Сразу выключи»: the button pops up and is pressed; the screen goes dark
  hide(dBtn); tw(dBtn, W('w1', 0) - 0.15, 0.35, { o: [0, 1], y: [120, 0] }, 'back'); sfx('whoosh', W('w1', 0) - 0.15, 0.3);
  tw(dQm, W('w1', 0), 0.2, { o: [1, 0] }, 'lin');
  mascotPose(dM, W('w1', 0), 'point', 0.25);
  const tPress = W('w1', 1) + 0.05;
  tw(q1(dBtn, '.pwcap'), tPress, 0.08, { y: [0, 22] }, 'in'); tw(q1(dBtn, '.pwcap'), tPress + 0.12, 0.3, { y: [22, 0] }, 'back'); sfx('clink', tPress + 0.06, 0.6);
  tw(q1(dBtn, '.pwglow'), tPress + 0.06, 0.25, { o: [0, 0.9] }, 'out');
  tw(dPh._off, tPress + 0.1, 0.18, { o: [0, 0.94] }, 'lin'); sfx('buzz', tPress + 0.1, 0.35); sleepEyes(dPh, tPress + 0.1); pface(dPh, tPress + 0.1, 'sleep');
  tw(dZz, tPress + 0.3, 0.5, { o: [0, 1], y: [40, -20] }, 'out');
  ringAt(camD, 840, 990, tPress + 0.06, 160, '#ff5f6d');
  focus('#D > .cam', tPress, 560, 760, 1.12, 0.3, 0.2, 0.35);

  // ================= E: «Вода под током разъедает контакты почти мгновенно.» =================
  morphCut('#D', '#E', tE, dPh, ePort, 0.55, 0); { const c = $('#morph').lastChild; c.querySelector('.scrOff').style.opacity = 0.94; }
  tw(q1(ePort, '.pwater'), tE + 0.1, 0.4, { o: [0, 1] }, 'lin'); sfx('boom', tE + 0.2, 0.25);
  hide(eChip);
  mascotPose(eM, tE + 0.2, 'point');
  tw(q1(ePort, '.pzap'), W('w1', 4) - 0.05, 0.15, { o: [0, 1] }, 'lin'); idle(q1(ePort, '.pzap'), t => (t > W('w1', 4) ? { s: 1 + 0.06 * Math.sin(t * 40) } : {})); sfx('zap', W('w1', 4), 0.6);
  slideIn(eChip, W('w1', 4), 'left', 0.5, 400); shake(W('w1', 4) + 0.05, 0.2, 8);
  tw(q1(ePort, '.prust'), W('w1', 5), 0.7, { o: [0, 1] }, 'in'); sfx('glitch', W('w1', 5), 0.4);
  for (let k = 0; k < 8; k++) tw(q1(ePort, '.pin' + k), W('w1', 5) + k * 0.05, 0.3, { o: [1, 0.75] }, 'lin');
  mascotPose(eM, W('w1', 5), 'shock');
  focus('#E > .cam', W('w1', 6), 540, 670, 1.1, 0.6);
  tw(q1(eSw, '.swhand'), W('w1', 7) - 0.1, 0.8, { r: [0, 720] }, 'in'); sfx('tick', W('w1', 7), 0.4); sfx('tick', W('w1', 7) + 0.2, 0.4); sfx('ding', W('w1', 8), 0.35);
  punch(eSw, W('w1', 8), 0.14);
  mascotPose(eM, W('w1', 8), 'facepalm');

  // ================= F: «И не заряжай: Apple просит ждать минимум пять часов.» =================
  tWhip('#E', '#F', tF);
  tw(fPh._off, 0, 0.001, { o: [0.94, 0.94] }); tw(q1(fPh, '.keye'), 0, 0.001, { sy: [0.08, 0.08] }); pface(fPh, 0, 'sleep'); tw(fPh._wet, 0, 0.001, { o: [0.7, 0.7] });
  hide(fNo); hide(fSrc); hide(fLbl); hide(fClk);
  mascotPose(fM, tF + 0.1, 'pointL');
  tw(fPlug, tF + 0.1, 0.55, { x: [200, 0] }, 'out');
  // «не заряжай»: the plug heads for the port and a no-entry sign slams in
  tw(fPlug, W('w2', 1), 0.25, { x: [0, -70] }, 'in');
  tw(fNo, W('w2', 2) - 0.05, 0.25, { o: [0, 1], s: [2.2, 1], r: [-30, 0] }, 'back'); sfx('slam', W('w2', 2), 0.6); shake(W('w2', 2) + 0.1, 0.2, 10);
  tw(fPlug, W('w2', 2) + 0.12, 0.4, { x: [-70, 140] }, 'out'); mascotPose(fM, W('w2', 2) + 0.05, 'shock', 0.25);
  slideIn(fSrc, W('w2', 3) - 0.1, 'left', 0.6, 500); sfx('whoosh', W('w2', 3) - 0.1, 0.35); mascotPose(fM, W('w2', 3), 'pointUp');
  tw(fNo, W('w2', 3), 0.4, { y: [0, 120], s: [1, 0.8] }, 'inOut');
  slideIn(fClk, W('w2', 4) - 0.2, 'right', 0.5, 500); sfx('whoosh', W('w2', 4) - 0.2, 0.3);
  tw(q1(fClk, '.cmin'), W('w2', 5) - 0.1, 1.1, { r: [0, 1800] }, 'inOut'); tw(q1(fClk, '.chand'), W('w2', 5) - 0.1, 1.1, { r: [0, 150] }, 'inOut');
  for (let k = 0; k < 5; k++) sfx('tick', W('w2', 5) + k * 0.2, 0.4);
  popIn(fLbl, W('w2', 6) - 0.05, 0.4); sfx('ding', W('w2', 6), 0.45); mascotPose(fM, W('w2', 6), 'think');
  tw(q1(fClk, '.cbell'), W('w2', 7), 0.3, { r: [-12, 0] }, 'elastic');
  focus('#F > .cam', W('w2', 6), 790, 640, 1.16, 0.5);

  // ================= G: «Постучи телефоном о ладонь, разъёмом вниз. Потом — под вентилятор. Только холодный, не фен.» =================
  tSlideUp('#F', '#G', tG);
  tw(gPh._off, 0, 0.001, { o: [0.94, 0.94] }); tw(q1(gPh, '.keye'), 0, 0.001, { sy: [0.08, 0.08] }); pface(gPh, 0, 'sleep'); tw(gPh._wet, 0, 0.001, { o: [1, 1] });
  gDr.forEach(d => hide(d)); hide(gFan); hide(gCold); hide(gHd); hide(gX1); hide(gX2);
  mascotPose(gM, tG + 0.1, 'hold');
  const TAPS = [W('w3', 0) + 0.05, W('w3', 2) - 0.02, W('w3', 4), W('w3', 5) + 0.05];
  TAPS.forEach((t, k) => { tw(gPh, t - 0.12, 0.12, { y: [0, 60] }, 'in'); tw(gPh, t, 0.22, { y: [60, 0] }, 'out'); sfx('thud', t, 0.45); punch(gPalm, t, 0.05, 0.2);
    for (let j = 0; j < 2; j++) { const d = gDr[(k * 2 + j) % 9], dx = (j ? 1 : -1) * (60 + 60 * hash(k + j)); tw(d, t, 0.001, { o: [0, 1] });
      tw(d, t, 0.55, { x: [0, dx], y: [0, 260 + 60 * hash(k * 3 + j)] }, 'in'); tw(d, t + 0.5, 0.1, { o: [1, 0] }, 'lin'); } });
  idle(gPh, t => (t > W('w3', 4) && t < W('w3', 5) + 0.5 ? { r: 3 * Math.sin(t * 30) } : {}));
  focus('#G > .cam', W('w3', 4), 610, 980, 1.16, 0.5);
  mascotPose(gM, W('w3', 5), 'pointL');
  // the phone steps aside, the fan rolls in (mirrored, so the air blows left) and dries it
  const tFan = W('w4', 1) - 0.15;
  tw([gM, gPalm], tFan - 0.2, 0.5, { x: [0, -380] }, 'inOut');
  tw(gPh, tFan - 0.2, 0.6, { x: [0, -260], y: [0, 120], s: [1, 0.85] }, 'inOut');
  tw(gFan, 0, 0.001, { sx: [-1, -1] }); slideIn(gFan, tFan, 'right', 0.6, 500); sfx('whoosh', tFan, 0.4);
  idle(q1(gFan, '.fblades'), t => (t > tFan ? { r: (t - tFan) * 1400 } : {}));
  tw(q1(gFan, '.fwind'), W('w4', 2), 0.3, { o: [0, 1] }, 'lin'); idle(q1(gFan, '.fwind'), t => (t > W('w4', 2) ? { x: 30 * ((t * 3) % 1) } : {})); sfx('riser', W('w4', 2) - 0.2, 0.3);
  tw(gPh._wet, W('w4', 2) + 0.2, 1.2, { o: [1, 0] }, 'lin');
  slideIn(gCold, W('w4', 3), 'down', 0.5, 200); sfx('blip', W('w4', 4), 0.4);
  tw(gHd, W('w4', 5) - 0.1, 0.35, { o: [0, 1], s: [0.4, 1], y: [60, 0] }, 'back'); sfx('pop', W('w4', 5) - 0.1, 0.4);
  tw(q1(gHd, '.hdwind'), W('w4', 5) + 0.05, 0.2, { o: [0, 1] }, 'lin');
  gX1.style.transformOrigin = '50% 50%'; gX2.style.transformOrigin = '50% 50%';
  tw(gX1, W('w4', 6), 0.16, { o: [0, 1], r: [45, 45], sx: [0, 1] }, 'out'); tw(gX2, W('w4', 6) + 0.1, 0.16, { o: [0, 1], r: [-45, -45], sx: [0, 1] }, 'out'); sfx('slam', W('w4', 6) + 0.08, 0.6);

  // ================= H: «И не в кошачий лоток: кот не поймёт.» =================
  morphCut('#G', '#H', tH, gPh, hPh, 0.6, -80);
  tw(hPh._off, 0, 0.001, { o: [0.94, 0.94] }); tw(q1(hPh, '.keye'), 0, 0.001, { sy: [0.08, 0.08] }); pface(hPh, 0, 'sleep');
  hPh.style.transformOrigin = '50% 50%'; tw(hPh, 0, 0.001, { r: [-80, -80], y: [60, 60] });
  hide(hQ);
  mascotPose(hM, tH + 0.2, 'shock');
  // the cat walks in from the right and stares
  tw([hCat, $$('#H .shd')[1]], tH + 0.1, 0.7, { x: [420, 0] }, 'out'); idle(hCat, t => (t > tH && t < tH + 0.8 ? { y: -10 * Math.abs(Math.sin((t - tH) * 14)) } : {}));
  idle(q1(hCat, '.ctail'), t => ({ r: 10 * Math.sin(t * 3) }));
  tw(q1(hCat, '.cpup'), W('j1', 3), 0.3, { x: [0, -10], y: [0, 8] }, 'out'); tw(q1(hCat, '.chead'), W('j1', 3), 0.4, { r: [0, -12] }, 'back');
  // «кот не поймёт»: the ears flatten, brows frown, eyes narrow, the tail lashes
  const tCat = W('j1', 5);
  tw(q1(hCat, '.cearL'), tCat, 0.3, { r: [0, -35] }, 'back'); tw(q1(hCat, '.cearR'), tCat, 0.3, { r: [0, 35] }, 'back');
  tw(q1(hCat, '.cbrow'), tCat, 0.3, { y: [0, 10] }, 'out'); tw(q1(hCat, '.ceye'), tCat, 0.3, { sy: [1, 0.45] }, 'out');
  tw(q1(hCat, '.cmouth'), tCat, 0.3, { sy: [1, -1] }, 'back');
  idle(q1(hCat, '.ctail'), t => (t > tCat ? { r: 26 * Math.sin((t - tCat) * 16) } : {}));
  popIn(hQ, tCat + 0.05, 0.4); sfx('buzz', tCat + 0.05, 0.4); idle(hQ, t => ({ r: 8 * Math.sin(t * 6) }));
  mascotPose(hM, tCat, 'facepalm');
  focus('#H > .cam', tCat, 760, 900, 1.2, 0.6);

  // ================= I: «Через сутки губки взвесили. Рис — последний из семи. Хуже кошачьего наполнителя. А лучше всех высохла губка на столе.» =================
  tDrop('#H', '#I', tI);
  hide(iSp); hide(iHead); iRows.forEach(r => { hide(r.g); tw(r.fill, 0, 0.001, { sx: [0, 0] }); }); hide(iLast); hide(iArw); hide(iCrown); hide(iTsp);
  mascotPose(iM, tI + 0.2, 'pointUp');
  // «Через сутки»: the clock runs twice round
  tw(q1(iClk, '.cmin'), W('r1', 0), 1.2, { r: [0, 720] }, 'inOut'); tw(q1(iClk, '.chand'), W('r1', 0), 1.2, { r: [0, 720] }, 'inOut'); sfx('riser2', W('r1', 0), 0.3);
  // «губки взвесили»: a sponge drops onto the scale, the display counts up
  tw(iSp, W('r1', 2) - 0.1, 0.05, { o: [0, 1] }, 'lin'); tw(iSp, W('r1', 2) - 0.1, 0.4, { y: [-360, 0] }, 'in'); sfx('thud', W('r1', 2) + 0.3, 0.5);
  tw(q1(iScale, '.ksplate'), W('r1', 2) + 0.3, 0.08, { y: [0, 10] }, 'out'); tw(q1(iScale, '.ksplate'), W('r1', 2) + 0.38, 0.3, { y: [10, 0] }, 'back');
  custom(t => { if (t < tI || t > tV) return; const a = W('r1', 3); iScTxt.textContent = t < W('r1', 2) + 0.3 ? '' : t < a + 0.4 ? '·'.repeat(1 + Math.floor((t * 8) % 4)) : '✓'; });
  mascotPose(iM, W('r1', 3), 'point'); sfx('blip', W('r1', 3) + 0.4, 0.4);
  // the scale and clock leave, the table of results slides in
  const tTab = L('r1').t1 - 0.05;
  tw([iScale, iScTxt, iSp], tTab, 0.4, { y: [0, -1300], o: [1, 0] }, 'in'); tw(iClk, tTab, 0.4, { x: [0, -400], o: [1, 0] }, 'in'); sfx('whoosh', tTab, 0.35);
  slideIn(iHead, tTab + 0.1, 'left', 0.5, 400);
  iRows.forEach((r, i) => slideIn(r.g, tTab + 0.1 + i * 0.05, 'left', 0.5, 500));
  // the six middle bars fill together, the rice bar comes last and stays short (red)
  iRows.forEach((r, i) => { if (i === 0 || i === 7) return; tw(r.fill, tTab + 0.5, 0.6, { sx: [0, r.v] }, 'out'); });
  tw(iRows[7].fill, W('r2', 1), 0.5, { sx: [0, iRows[7].v] }, 'out'); sfx('buzz', W('r2', 1) + 0.3, 0.4);
  punch(iRows[7].g, W('r2', 3), 0.06); slideIn(iLast, W('r2', 3) - 0.05, 'right', 0.45, 300); sfx('slam', W('r2', 3), 0.5);
  mascotPose(iM, W('r2', 0), 'sad');
  // «Хуже кошачьего наполнителя»: an arrow from the litter row down to rice
  tw(iArw, W('r2', 4), 0.001, { o: [0, 1] }); tw($$('#I .arw'), W('r2', 4), 0.6, { dash: [100, 0] }, 'out'); sfx('whoosh', W('r2', 4), 0.3);
  punch(iRows[3].g, W('r2', 6), 0.06); mascotPose(iM, W('r2', 5), 'shrug');
  // «А лучше всех высохла губка на столе»: the air bar shoots past everybody, crown, confetti
  tw(iRows[0].fill, W('r3', 1), 0.7, { sx: [0, iRows[0].v] }, 'out'); sfx('riser2', W('r3', 1) - 0.2, 0.35);
  tw([iLast, iArw], W('r3', 0), 0.3, { o: [1, 0] }, 'lin');
  tw(iCrown, W('r3', 3), 0.4, { o: [0, 1], y: [-200, 0], r: [-30, -10] }, 'back'); sfx('ding', W('r3', 3) + 0.2, 0.5);
  popIn(iTsp, W('r3', 4), 0.4); jump(iTsp, W('r3', 5) + 0.15, 40, 0.4); tw(q1(iTsp, '.spmouth'), W('r3', 4), 0.3, { sy: [0.2, 0.8] }, 'out');
  burst(iFx, 22, 760, 330, W('r3', 5), 300, 33, 'conf', 120);
  mascotPose(iM, W('r3', 3), 'cheer');
  focus('#I > .cam', W('r3', 3), 540, 780, 1.08, 0.6);

  // ================= V: «Рис спасает телефон? Байт. Спасает воздух. А ты свой телефон в рис клал?» =================
  tWhip('#I', '#V', tV, 0.46, -1);
  hide(vSt); hide(vQ); hide(vAir); hide(vRice); const vRph = phone(camV, 'vr', 640, 560, 110, false); pface(vRph, 0, 'sad'); tw(vRph, 0, 0.001, { r: [12, 12] }); hide(vRph); hide(vQm); hide(vPh); hide(vFan); hide($$('#V .shd')[1]);
  pface(vPh, 0, 'happy');
  slideIn(vQ, W('v1', 0) - 0.05, 'left', 0.5, 500); sfx('whoosh', W('v1', 0), 0.35);
  mascotPose(vM, tV + 0.1, 'think'); mascotPose(vM, W('v1', 2), 'pointUp');
  const tSt = W('v1', 3) - 0.02;
  tw(vM, tSt - 0.42, 0.22, { y: [0, -90] }, 'out'); tw(vM, tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose(vM, tSt - 0.45, 'pointUp', 0.25); mascotPose(vM, tSt - 0.18, 'point', 0.18);
  stamp(vSt, tSt, -7, 26); burst(vFx, 24, 540, 360, tSt + 0.05, 420, 61, 'conf', 140); sfx('ding', tSt + 0.2, 0.4);
  tw(vQ, tSt + 0.05, 0.12, { o: [1, 0.35] }, 'lin');
  mascotPose(vM, tSt + 0.4, 'cheer');
  // «Спасает воздух»: the fan dries a happy phone
  tw(vFan, 0, 0.001, { sx: [-1, -1] }); slideIn(vFan, W('v1', 4) - 0.15, 'right', 0.5, 400); idle(q1(vFan, '.fblades'), t => (t > W('v1', 4) - 0.15 ? { r: (t - W('v1', 4)) * 1400 } : {}));
  tw(q1(vFan, '.fwind'), W('v1', 4) + 0.1, 0.3, { o: [0, 1] }, 'lin'); idle(q1(vFan, '.fwind'), t => ({ x: 30 * ((t * 3) % 1) }));
  tw([vPh, $$('#V .shd')[1]], W('v1', 4) - 0.1, 0.4, { o: [0, 1], y: [80, 0] }, 'back'); sfx('pop', W('v1', 4), 0.4);
  slideIn(vAir, W('v1', 5), 'down', 0.45, 200); sfx('ding', W('v1', 5) + 0.1, 0.35);
  burst(vFx, 10, 620, 820, W('v1', 5), 140, 71, 'spark', 0); mascotPose(vM, W('v1', 5), 'point');
  tw(vQ, W('v1', 4), 0.3, { o: [0.35, 0] }, 'lin');
  // the question: a bowl of rice and a question mark
  tw([vFan, vPh, vAir, $$('#V .shd')[1]], W('ask', 0) - 0.15, 0.3, { o: [1, 0] }, 'lin');
  tw(vRice, W('ask', 2) - 0.1, 0.4, { o: [0, 1], s: [0.4, 1], y: [120, 0] }, 'back'); sfx('pop', W('ask', 2), 0.4);
  tw([vRice, vRph], W('v1', 0) - 0.05, 0.35, { o: [0, 1], y: [120, 0] }, 'back'); sfx('pop', W('v1', 0), 0.4); tw([vRice, vRph], tSt + 0.05, 0.2, { o: [1, 0], s: [1, 0.6] }, 'in'); shake(tSt + 0.1, 0.1, 4);
  popIn(vQm, W('ask', 3), 0.4); idle(vQm, t => ({ r: 6 * Math.sin(t * 5) })); mascotPose(vM, W('ask', 0), 'wave');
  tw([vSt, vQm, vRice], tLoop + 0.02, 0.3, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw(vM, tLoop + 0.3, 0.001, { o: [1, 0] }); tw($$('#V .mshd'), tLoop + 0.3, 0.001, { o: [1, 0] });
}, {});
