// 031 «Наушники меняют канал до 1 600 раз в секунду. Зачем?» — Как это работает (длинный формат, в запас на вт 17.11.2026).
// Стиль: история с героями — телефон и наушник скачут по полосам радиошоссе, маскот рассказывает и ставит штамп.
// Источник: Bluetooth Core Specification 6.2, Vol 1 Part A (79 частот, 1600 прыжков в секунду, занятые частоты исключаются).
// Свой мир (ночное радиошоссе: звёзды, город, вышки — параллакс), планы: средний, общий сверху (79 полос), средний, крупный,
// общий, средний, крупный, общий, средний, средний; 3 склейки-превращения (телефон → телефон, роутер → роутер, наушник → наушник).
TIMING.words.forEach(w => { w.d = w.d.replace(/\s—$/, ''); });
boot(() => {
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
  const clamp = x => Math.max(0, Math.min(1, x));
  const place = (el, x, y, w, h) => { el.style.left = x + 'px'; el.style.top = y + 'px'; if (w) el.style.width = w + 'px'; if (h) el.style.height = h + 'px'; return el; };
  const put = (par, cls, html, x, y, w, h) => place(mk(par, cls, html), x, y, w, h);
  const easeIO = x => (x = clamp(x), x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const W = (k, i) => wt(k, i);
  const jump = (el, t, h = 80, d = 0.5, shd = null) => {
    tw(el, t - 0.12, 0.12, { sy: [1, 0.86], sx: [1, 1.08] }, 'out');
    tw(el, t, d / 2, { y: [0, -h], sy: [0.86, 1.08], sx: [1.08, 0.95] }, 'out');
    tw(el, t + d / 2, d / 2, { y: [-h, 0], sy: [1.08, 1], sx: [0.95, 1] }, 'in');
    tw(el, t + d, 0.08, { sy: [1, 0.88], sx: [1, 1.1] }, 'out'); tw(el, t + d + 0.08, 0.3, { sy: [0.88, 1], sx: [1.1, 1] }, 'back');
    if (shd) { tw(shd, t, d / 2, { s: [1, 0.6], o: [1, 0.5] }, 'out'); tw(shd, t + d / 2, d / 2, { s: [0.6, 1], o: [0.5, 1] }, 'in'); }
  };
  const burst = (par, n, x, y, t, dist = 220, seed = 0, cls = 'spark', fall = 0) => {
    const cols = ['#ffb52e', '#ff3b5c', '#43e8ff', '#7dff8a', '#ff5fa2'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.8, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.6, 0.25, { o: [1, 0] }, 'lin'); } };
  const ringAt = (par, x, y, t, sz = 110, col = '#fff') => { const r = mk(par, 'ring'); r.style.borderColor = col; place(r, x - sz / 2, y - sz / 2, sz, sz); hide(r);
    tw(r, t, 0.05, { o: [0, 1] }, 'lin'); tw(r, t, 0.45, { s: [0.4, 1.7] }, 'out'); tw(r, t + 0.25, 0.2, { o: [1, 0] }, 'lin'); };
  const PHONE = '#4a5fd8';
  // ---- lane board: the radio highway seen from above. n lanes in a rounded box; o.hl: one highlight per lane; o.seps: dashed lines
  const lanes = (par, n, x, y, w, h, o = {}) => {
    const box = put(par, 'lanebox', '', x, y, w, h), lw = w / n, arr = [];
    for (let i = 0; i < n; i++) { const l = put(box, 'ln', '', i * lw, 0, lw + 0.7, h);
      l.style.background = `linear-gradient(180deg,hsl(${(200 + 80 * i / Math.max(1, n - 1)).toFixed(0)},52%,${i % 2 ? 25 : 31}%),hsl(${(200 + 80 * i / Math.max(1, n - 1)).toFixed(0)},50%,${i % 2 ? 15 : 19}%))`;
      if (o.hl) l.hl = put(box, 'lhl', '', i * lw, 0, lw, h); arr.push(l); }
    const seps = [];
    if (o.seps) for (let i = 1; i < n; i++) seps.push(put(box, 'lsep', '', i * lw - 4, -140, 8, h + 280));
    if (seps.length) custom(t => { const yy = ((t * 90) % 140).toFixed(1); for (const s of seps) s.style.transform = `translateY(${yy}px)`; });
    return { box, arr, lw, x, y, w, h, cx: i => x + (i + 0.5) * lw };
  };
  // ---- hopping: hops = [[t, lane], ...]; every element in `list` sits at lane `from` in the layout and jumps in an arc
  const laneAt = (hops, from, d) => t => { let c = from, since = -9; for (const [th, to] of hops) if (t >= th + d * 0.5) { c = to; since = th + d * 0.5; } return [c, since]; };
  const hopper = (list, cx, from, hops, d = 0.26, h = 46) => {
    list.forEach(el => idle(el, t => {
      let cur = from;
      for (const [th, to] of hops) {
        if (t >= th + d) { cur = to; continue; }
        if (t >= th) { const u = (t - th) / d, e = easeIO(u), dir = cx(to) > cx(cur) ? 1 : -1;
          return { x: cx(cur) + (cx(to) - cx(cur)) * e - cx(from), y: -h * Math.sin(Math.PI * u), r: dir * 9 * Math.sin(Math.PI * u) }; }
        break;
      }
      return { x: cx(cur) - cx(from), y: 0 };
    }));
    return laneAt(hops, from, d);
  };
  const hlDrive = (board, cur) => custom(t => { const [c, since] = cur(t); board.arr.forEach((l, i) => { l.hl.style.opacity = i === c ? (0.45 + 0.55 * clamp((t - since) / 0.1)).toFixed(2) : '0'; }); });
  const earbud = (par, id, x, y, sz) => put(par, 'eb', earbudSVG(id), x, y, sz, sz);
  const phone = (par, id, x, y, w) => put(par, 'ph', talkPhoneSVG(id, PHONE), x, y, w, w * 560 / 300);
  const mascot = (par, id, x, y, sz) => put(par, 'mm', mascotSVG(id), x, y, sz, sz);
  const shadow = (par, x, y, w, h = 60) => put(par, 'shd', '', x - w / 2, y - h / 2, w, h);
  const note = (par, id, col) => { const n = mk(par, 'nt', noteSVG(id, col)); hide(n); return n; };

  // ---------- world ----------
  $('#stars').innerHTML = starsSVG(); $('#city').innerHTML = citySVG(); $('#towers').innerHTML = towersSVG();
  const dz = $('#dashes'); [[40, 14, .28], [250, 20, .2], [520, 28, .14]].forEach(([y, hh, op]) => { const d = document.createElement('div'); d.style.cssText = `position:absolute;left:0;top:${y}px;width:3400px;height:${hh}px;border-radius:8px;background:repeating-linear-gradient(90deg,rgba(255,255,255,${op}) 0 ${120 + y / 3}px,transparent ${120 + y / 3}px ${300 + y / 2}px)`; dz.appendChild(d); });
  dof('#city', 3); dof('#stars', 1.2);
  lookFX({ grain: 0.11, tint: 'transparent' });

  // ================= build the scenes (layout only) =================
  // ----- A: hook. One big earbud hopping over five lanes, «1 600 раз в секунду» -----
  const buildA = (cam, s) => {
    const b = lanes(cam, 5, 90, 520, 900, 770, { hl: true, seps: true });
    const sh = shadow(cam, 540, 1040, 300, 70);
    const eb = earbud(cam, 'a' + s, 350, 660, 380);
    const n1 = put(cam, 'big', '<i>1 600</i>', 0, 200, 1080); n1.style.fontSize = '200px';
    const n2 = put(cam, 'lbl', 'РАЗ В СЕКУНДУ', 0, 418, 1080); n2.style.fontSize = '68px';
    const m = mascot(cam, 'am' + s, 0, 950, 350);
    b.arr[2].hl.style.opacity = 1;
    return { b, sh, eb, n1, n2, m };
  };
  const A = buildA('#A .cam', ''); buildA('#A2 .cam', '2');

  // ----- B: general view from above: the whole highway, 79 lanes -----
  const camB = $('#B .cam');
  const BB = lanes(camB, 79, 40, 330, 1000, 860);
  const bHl = put(BB.box, 'lhl', '', 0, 0, BB.lw, 860);
  const bChip = put(camB, 'nb-chip c chipL c', 'BLUETOOTH', 250, 200);
  const bNum = put(camB, 'big', '<i>0</i>', 60, 140, 400); bNum.style.fontSize = '180px';
  const bLbl = put(camB, 'lbl', 'КАНАЛОВ', 430, 196, 560); bLbl.style.fontSize = '84px';
  const bEb = earbud(camB, 'b', BB.cx(39) - 65, 352, 130), bPh = phone(camB, 'b', BB.cx(39) - 50, 985, 100);
  const bM = mascot(camB, 'bm', -20, 985, 300);

  // ----- C: medium: six lanes, the phone throws a piece of music, both hop -----
  const camC = $('#C .cam');
  const CB = lanes(camC, 6, 40, 250, 780, 1010, { hl: true, seps: true });
  shadow(camC, CB.cx(2), 1228, 190, 44).classList.add('c-shd');
  const cEb = earbud(camC, 'c', CB.cx(2) - 115, 290, 230), cPh = phone(camC, 'c', CB.cx(2) - 85, 880, 170); cPh.classList.add('c-ph');
  const cM = mascot(camC, 'cm', 760, 905, 320);

  // ----- D: close-up: the two share one route, nobody else knows it -----
  const camD = $('#D .cam');
  shadow(camD, 230, 1130, 300, 60); shadow(camD, 800, 1010, 330, 60);
  const dC1 = put(camD, 'rcard', routeCardSVG('d1', 5), 80, 290, 400, 160), dC2 = put(camD, 'rcard', routeCardSVG('d2', 5), 580, 410, 420, 168);
  const dPh = phone(camD, 'd', 80, 500, 300); dPh.classList.add('d-ph');
  const dEb = earbud(camD, 'd', 600, 610, 400);
  const dEq = put(camD, 'big', '=', 455, 318, 160); dEq.style.fontSize = '120px';
  const dHk = put(camD, 'hk', hackerSVG('d', '#7a2f4a'), 400, 985, 250, 318);
  const dC3 = put(camD, 'rcard', routeCardSVG('d3', 4, true, 320), 380, 850, 300, 150);

  // ----- E: general: the same highway is crowded — Wi-Fi, a microwave, other people's earbuds -----
  const camE = $('#E .cam');
  const EB = lanes(camE, 79, 40, 330, 1000, 860);
  const zone = (board, cls, l0, n) => { const z = put(board.box, 'zone ' + cls, '', l0 * board.lw, 0, n * board.lw, board.h); return z; };
  const eZ1 = zone(EB, 'wf', 8, 22), eZ2 = zone(EB, 'mw', 44, 22);
  const eHl = put(EB.box, 'lhl', '', 0, 0, EB.lw, 860);
  const eQ = put(camE, 'big', 'ЗАЧЕМ<i>?</i>', 0, 160, 1080); eQ.style.fontSize = '150px';
  const eRt = put(camE, 'rt', routerSVG('e'), EB.cx(18.5) - 125, 470, 250, 188); eRt.classList.add('e-rt');
  const eMw = put(camE, 'mw', microwaveSVG('e'), EB.cx(54.5) - 150, 700, 300, 206);
  const eCh1 = put(camE, 'nb-chip chipL', 'WI-FI', 70, 195), eCh2 = put(camE, 'nb-chip r chipL r', 'МИКРОВОЛНОВКА', 500, 195); eCh2.style.fontSize = '40px';
  const eEb = earbud(camE, 'e', EB.cx(36) - 60, 352, 120), ePh = phone(camE, 'e', EB.cx(36) - 45, 1000, 90);
  const eM = mascot(camE, 'em', -20, 985, 300);

  // ----- F: medium: standing on one jammed lane, the music stutters -----
  const camF = $('#F .cam');
  const FB = lanes(camF, 3, 150, 250, 780, 1010, { seps: true });
  const fZ = zone(FB, 'wf', 1, 1); fZ.style.opacity = 0.88;
  shadow(camF, 540, 1250, 190, 44);
  const fRt = put(camF, 'rt', routerSVG('f'), 380, 520, 320, 240); fRt.classList.add('f-rt');
  const fEb = earbud(camF, 'f', 425, 262, 230), fPh = phone(camF, 'f', 455, 900, 170);
  const fPan = put(camF, 'nb-panel red', '', 700, 300, 340, 190);
  const fBars = []; for (let k = 0; k < 8; k++) fBars.push(put(fPan, 'bar', '', 34 + k * 35, 30, 26, 130));
  const fM = mascot(camF, 'fm', -30, 930, 330);

  // ----- G: close-up: while hopping the noise eats only a crumb of the sound -----
  const camG = $('#G .cam');
  const gBlk = []; for (let k = 0; k < 9; k++) gBlk.push(put(camG, 'blk', '', 45 + k * 111, 400, 100, 200));
  shadow(camG, 580, 1200, 360, 70);
  const gEb = earbud(camG, 'g', 350, 740, 460);
  const gBug = put(camG, 'bug', noiseBugSVG('g'), 611 + 50 - 130, 190, 260, 217);
  const gM = mascot(camG, 'gm', -10, 950, 310);

  // ----- H: general: jammed lanes are remembered and struck out of the route -----
  const camH = $('#H .cam');
  const HB = lanes(camH, 79, 40, 380, 1000, 810);
  const hZ1 = zone(HB, 'wf', 8, 22), hZ2 = zone(HB, 'mw', 44, 22); hZ1.style.opacity = hZ2.style.opacity = 0.85;
  const hHl = put(HB.box, 'lhl', '', 0, 0, HB.lw, 810);
  const hRt = put(camH, 'rt', routerSVG('h'), HB.cx(18.5) - 90, 800, 180, 135), hMw = put(camH, 'mw', microwaveSVG('h'), HB.cx(54.5) - 110, 560, 220, 151);
  const hCard = put(camH, 'rcard', routeCardSVG('h', 8, false, 800), 140, 170, 800, 160);
  const hNo1 = put(camH, 'noe', noEntrySVG('h1'), HB.cx(18.5) - 105, 520, 210, 210), hNo2 = put(camH, 'noe', noEntrySVG('h2'), HB.cx(54.5) - 105, 780, 210, 210);
  const hEb = earbud(camH, 'h', HB.cx(36) - 60, 396, 120), hPh = phone(camH, 'h', HB.cx(36) - 45, 1010, 90);
  const hM = mascot(camH, 'hm', -20, 985, 300);

  // ----- J: joke: 1 600 hops a second, and you did not make it to the gym in a whole day -----
  const camJ = $('#J .cam');
  const JB = lanes(camJ, 5, 40, 240, 470, 270, { hl: true });
  const jEb = earbud(camJ, 'j', JB.cx(2) - 90, 280, 180); jEb.classList.add('j-eb');
  const jNum = put(camJ, 'big', '<i>0</i>', 465, 262, 520); jNum.style.fontSize = '112px';
  const jLbl = put(camJ, 'lbl', 'ПРЫЖКОВ', 465, 400, 520); jLbl.style.fontSize = '56px';
  const jClock = put(camJ, 'clk', wallClockSVG('j'), 790, 560, 210, 210);
  const jSofa = put(camJ, 'sofa', sofaSVG('j', '#5f6cff', 'back'), 20, 790, 720, 370);
  const jMan = put(camJ, 'man', personSVG('j', '#43c8a8', '#3a2414'), 200, 640, 340, 408);
  const jFront = put(camJ, 'sofaf', sofaSVG('jf', '#5f6cff', 'front'), 20, 790, 720, 370);
  const jPhone = put(camJ, 'pp', phonePropSVG('j'), 330, 900, 84, 160);
  const jYou = put(camJ, 'nb-chip r chipL r', 'А ТЫ', 50, 610);
  const jDb = put(camJ, 'dbl', dumbbellSVG('j'), 400, 1120, 320, 160);
  const jM = mascot(camJ, 'jm', 740, 850, 330);

  // ----- V: verdict «НЕ БАЙТ» + the takeaway: step away from the microwave -----
  const camV = $('#V .cam');
  shadow(camV, 190, 1110, 230, 50); shadow(camV, 540, 1190, 330, 64); shadow(camV, 885, 1140, 180, 44);
  const vMw = put(camV, 'mw', microwaveSVG('v'), 640, 440, 380, 261);
  const vEb = earbud(camV, 'v', 60, 840, 260); vEb.classList.add('v-eb');
  const vPh = phone(camV, 'v', 800, 800, 170);
  const vM = mascot(camV, 'vm', 340, 790, 400);
  const vChip = put(camV, 'nb-chip g chipL g', 'ДАЛЬШЕ ОТ МИКРОВОЛНОВКИ', 110, 1195); vChip.style.fontSize = '42px';
  const vSt = put(camV, 'stt', 'НЕ БАЙТ', 190, 250, 700, 180); vSt.style.cssText += ';border:18px solid var(--gr);color:var(--gr);font:900 108px/144px Unb';
  const vFx = put(camV, 'vfx', '', 0, 0);

  mascotLife(); mascotTalk();
  // characters: blinking and breathing (the mascot narrates, they never talk)
  $$('.keye').forEach((e, i) => { const P = TOTAL / 9, ph = hash(i * 2.3) * P; idle(e, t => { if (t < 0.6 || t > TOTAL - 0.8) return {}; const u = (t + ph) % P; return { sy: u < 0.16 ? 1 - 0.9 * Math.sin(Math.PI * u / 0.16) : 1 }; }); });
  $$('.ebEye').forEach((e, i) => { if (e.closest('#A') || e.closest('#A2')) return; const P = TOTAL / 11, ph = hash(i * 4.1) * P; idle(e, t => { const u = (t + ph) % P; return { sy: u < 0.16 ? 1 - 0.9 * Math.sin(Math.PI * u / 0.16) : 1 }; }); });
  $$('.ph .klegL, .ph .klegR').forEach((g, j) => idle(g, t => ({ r: 3 * Math.sin(W2 * 10 * t + j * Math.PI) })));
  $$('.tlamp').forEach((l, i) => custom(t => { l.style.opacity = (0.35 + 0.65 * Math.pow(0.5 + 0.5 * Math.sin(W2 * 20 * t + i * 1.7), 2)).toFixed(2); }));

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('m1'), tC = cut('m2'), tD = cut('m3'), tE = cut('t1'), tF = cut('t2'), tG = cut('t3'), tH = cut('v1'), tJ = cut('j2'), tV = cut('v2'), tLoop = TOTAL - 0.72;
  const CUTS = [0, tB, tC, tD, tE, tF, tG, tH, tJ, tV], IDS = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#J', '#V'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; if (s !== '#B' && s !== '#E') tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 200 * easeIO((t - c + 0.35) / 0.7); }); x -= 1800 * easeIO((t - tLoop) / 0.6); return x; };
  custom(t => {
    const x = camX(t);
    $('#stars').style.transform = `translate(${(-x * 0.03).toFixed(1)}px,0)`;
    $('#city').style.transform = `translate(${(-x * 0.14).toFixed(1)}px,0)`;
    $('#towers').style.transform = `translate(${(-x * 0.42).toFixed(1)}px,0)`;
    $('#dashes').style.transform = `translate(${(-((x * 0.95 + t * 60) % 600)).toFixed(1)}px,0)`;
  });
  grade(0, 'transparent'); grade(tB, 'rgba(67,232,255,.14)'); grade(tC, 'rgba(255,181,46,.12)'); grade(tD, 'rgba(160,110,255,.18)'); grade(tE, 'rgba(255,120,60,.14)');
  grade(tF, 'rgba(255,90,60,.2)'); grade(tG, 'rgba(125,255,138,.14)'); grade(tH, 'rgba(67,232,255,.14)'); grade(tJ, 'rgba(255,95,162,.2)'); grade(tV, 'rgba(125,255,138,.14)'); grade(tLoop + 0.3, 'transparent');
  $$('.mm').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2')) idle(m, t => ({ y: 6 * Math.sin(W2 * 16 * t + i), r: 1.4 * Math.sin(W2 * 8 * t + i) })); });

  // ================= A: hook — «Твои наушники меняют канал до 1 600 раз в секунду. Зачем им эта чехарда?» =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  const aH = []; { const seq = [4, 1, 3, 0, 2, 4, 0, 3, 1, 4, 2, 0, 3, 1, 4, 0, 2, 3, 1, 4, 0, 3, 2, 4, 1, 3, 0, 2]; let t = 0.5, k = 0;
    while (t < tB + 0.3) { aH.push([t, seq[k % seq.length]]); k++; t += t < 1.6 ? 0.42 : t < W('q1', 0) ? 0.32 : 0.21; } }
  const aCur = hopper([A.eb], A.b.cx, 2, aH, 0.2, 60); hopper([A.sh], A.b.cx, 2, aH, 0.2, 0);
  hlDrive(A.b, aCur); aH.forEach(([t], k) => { if (t < W('q1', 0)) sfx('blip', t, 0.28); else if (k % 2) sfx('tick', t, 0.4); });
  tw(A.eb.querySelector('.ebBrow'), 0.4, 0.3, { y: [0, -8] }, 'back');
  punch(A.n1, W('hook', 5) + 0.05, 0.12); sfx('ding', W('hook', 5) + 0.1, 0.4);
  punch(A.n2, W('hook', 6), 0.14); punch(A.n2, W('hook', 8), 0.1);
  mascotPose(A.m, 0.3, 'point'); mascotPose(A.m, W('hook', 5), 'shock'); mascotPose(A.m, W('hook', 6) + 0.25, 'pointUp'); mascotPose(A.m, W('q1', 0), 'shrug');
  [[180, 560], [830, 600], [760, 1020]].forEach(([x, y], k) => { const q = put(A.b.box.parentElement, 'qm', '?', x, y); hide(q); popIn(q, W('q1', 0) + k * 0.16, 0.3); tw(q, W('q1', 0) + k * 0.16, 0.5, { r: [-20, 12 - k * 12] }, 'back'); sfx('pop', W('q1', 0) + k * 0.16, 0.35); });
  focus('#A > .cam', W('q1', 3), 540, 840, 1.07, 0.4);

  // ================= B: «Bluetooth — это 79 каналов, как полосы на шоссе» =================
  tSlideUp('#A', '#B', tB);
  tw('#B > .cam', tB - 0.1, 1.1, { s: [1.28, 1] }, 'out');            // pull back to the whole highway (scale shot)
  hide(bChip); hide(bNum); hide(bLbl); hide(bHl);
  slideIn(bChip, W('m1', 0) - 0.05, 'left', 0.55, 500); sfx('whoosh', W('m1', 0) - 0.05, 0.4);
  slideOut(bChip, W('m1', 2) - 0.45, 'left', 0.25, 400);
  const tL = W('m1', 0) + 0.2, dL = W('m1', 2) + 0.55 - tL;
  BB.arr.forEach((l, i) => { tw(l, 0, 0.001, { sy: [0, 0] }); tw(l, tL + i * (dL - 0.3) / 79, 0.4, { sy: [0, 1] }, 'out'); });
  sfx('riser', tL, 0.55); for (let k = 0; k < 7; k++) sfx('tick', tL + k * dL / 7, 0.3);
  tw(bNum, W('m1', 2) - 0.3, 0.1, { o: [0, 1] }, 'lin'); const bN = bNum.querySelector('i');
  custom(t => { bN.textContent = Math.round(79 * clamp((t - tL) / dL)); });
  punch(bNum, tL + dL + 0.03, 0.14); sfx('ding', tL + dL, 0.4);
  popIn(bLbl, W('m1', 3) - 0.05, 0.35); sfx('pop', W('m1', 3), 0.4);
  // traffic lights streaming along the lanes = «как полосы на шоссе»
  for (let k = 0; k < 30; k++) { const d = put(BB.box, 'dot', '', 0, 0, 9, 22); d.style.border = '0'; d.style.borderRadius = '5px'; d.style.background = k % 3 ? '#fff6d6' : '#ff5f7a';
    const ln = Math.floor(hash(k * 3.7) * 79), sp = 500 + 500 * hash(k * 1.3), ph = hash(k * 9.1) * 900, t0 = W('m1', 4) - 0.1 + 0.02 * k;
    custom(t => { if (t < t0) { d.style.opacity = 0; return; } d.style.opacity = 0.9; d.style.transform = `translate(${(ln * BB.lw + 2).toFixed(1)}px,${(860 - ((t - t0) * sp + ph) % 900).toFixed(1)}px)`; }); }
  const bHops = [[W('m1', 5), 12], [W('m1', 5) + 0.42, 60], [W('m1', 7) + 0.1, 39]];
  const bCur = hopper([bEb, bPh], BB.cx, 39, bHops, 0.3, 40);
  tw(bHl, tL + dL * 0.55, 0.2, { o: [0, 1] }, 'lin'); custom(t => { bHl.style.transform = `translateX(${(bCur(t)[0] * BB.lw).toFixed(1)}px)`; });
  bHops.forEach(([t]) => sfx('blip', t, 0.4));
  tw([bEb, bPh], 0, 0.001, { o: [0, 0] }); popIn(bEb, tL + dL * 0.5, 0.3); popIn(bPh, tL + dL * 0.5 + 0.1, 0.3);
  mascotPose(bM, W('m1', 0), 'wave'); mascotPose(bM, W('m1', 1), 'pointUp'); mascotPose(bM, W('m1', 3) + 0.1, 'shock'); mascotPose(bM, W('m1', 5), 'point');

  // ================= C: «Телефон кидает кусочек музыки наушнику по одной полосе, и оба прыгают на другую» =================
  tZoom('#B', '#C', tC);
  const cHops = [[W('m2', 10) - 0.12, 4], [W('m2', 10) + 0.26, 0], [W('m2', 12) + 0.06, 2]];
  const cCur = hopper([cEb, cPh], CB.cx, 2, cHops, 0.28, 60); hopper($$('#C .c-shd'), CB.cx, 2, cHops, 0.28, 0); hlDrive(CB, cCur);
  cHops.forEach(([t]) => { sfx('whoosh', t, 0.3); sfx('blip', t + 0.24, 0.5); });
  const cThrow = (t, k, d = 0.42) => { const ln = cCur(t)[0], n = note(camC, 'c' + k, '#7dff8a'); place(n, CB.cx(ln) - 45, 800, 90, 105);
    tw(cPh.querySelector('.karmR'), t - 0.12, 0.14, { r: [0, -120] }, 'out'); tw(cPh.querySelector('.karmR'), t + 0.05, 0.3, { r: [-120, 0] }, 'back');
    tw(n, t, 0.05, { o: [0, 1] }, 'lin'); tw(n, t, d, { y: [0, -330], r: [-25, 20], s: [0.7, 1.05] }, 'inOut'); tw(n, t + d - 0.04, 0.08, { o: [1, 0] }, 'lin');
    sfx('pop', t, 0.4); punch(cEb, t + d, 0.1); ringAt(camC, CB.cx(ln), 420, t + d - 0.02, 150, '#7dff8a'); sfx('ding', t + d, 0.3);
    tw(cEb.querySelector('.ebGlow'), t + d, 0.3, { o: [1, 0] }, 'lin'); };
  cThrow(W('m2', 1), 0, 0.5); cThrow(W('m2', 3) + 0.05, 1, 0.45); cThrow(W('m2', 6), 2, 0.42); cThrow(W('m2', 8) - 0.08, 3, 0.36); cThrow(W('m2', 10) + 0.04, 4, 0.22);
  tw(cPh.querySelector('.kbrow'), W('m2', 1) - 0.1, 0.3, { y: [0, -8] }, 'back');
  tw(cEb.querySelector('.ebMouth'), W('m2', 4), 0.3, { sy: [1, 1.5] }, 'back');
  mascotPose(cM, W('m2', 0), 'pointL'); mascotPose(cM, W('m2', 4), 'hold'); mascotPose(cM, W('m2', 6), 'pointUp'); mascotPose(cM, W('m2', 10) - 0.1, 'cheer');
  $$('.pup', cM).forEach(p => idle(p, t => ({ x: t > tC && t < tD ? -6 : 0 })));
  focus('#C > .cam', W('m2', 4) - 0.1, CB.cx(2), 430, 1.1, 0.45);

  // ================= D: «Маршрут прыжков знают только они двое» =================
  morphCut('#C', '#D', tD, '.c-ph', '.d-ph', 0.56, 0);
  hide(dC1); hide(dC2); hide(dEq); hide(dC3); hide(dHk);
  tw(dEb, tD - 0.2, 0.5, { x: [500, 0] }, 'out');
  slideIn(dC1, W('m3', 0) - 0.08, 'up', 0.45, 260); slideIn(dC2, W('m3', 0) + 0.02, 'up', 0.45, 260); sfx('whoosh', W('m3', 0) - 0.08, 0.4);
  for (let k = 0; k < 5; k++) { const tk = W('m3', 1) - 0.1 + k * 0.1; [dC1, dC2].forEach(c => { const d = c.querySelector('.rd' + k); tw(d, 0, 0.001, { s: [0, 0] }); tw(d, tk, 0.3, { s: [0, 1] }, 'back'); }); sfx('tick', tk, 0.5); }
  popIn(dEq, W('m3', 2), 0.3); sfx('ding', W('m3', 2), 0.4); punch(dC1, W('m3', 2), 0.06); punch(dC2, W('m3', 2), 0.06);
  tw(dPh.querySelector('.karmL'), W('m3', 0), 0.35, { r: [0, 125] }, 'back'); tw(dPh.querySelector('.kbrow'), W('m3', 2), 0.3, { y: [0, -9] }, 'back');
  tw(dEb.querySelector('.ebBrow'), W('m3', 2), 0.3, { y: [0, -8] }, 'back'); jump(dEb, W('m3', 2), 34, 0.34);
  // the spy pops up and sees only question marks
  tw(dHk, W('m3', 3) - 0.12, 0.05, { o: [0, 1] }, 'lin'); tw(dHk, W('m3', 3) - 0.12, 0.42, { y: [330, 0] }, 'back'); sfx('whoosh', W('m3', 3) - 0.12, 0.4);
  popIn(dC3, W('m3', 3) + 0.2, 0.3); sfx('buzz', W('m3', 3) + 0.25, 0.45);
  tw(dHk.querySelector('.hkpup'), W('m3', 3) + 0.2, 0.3, { y: [0, -4], x: [0, -3] }, 'out'); tw(dHk.querySelector('.hkpup'), W('m3', 5), 0.3, { x: [-3, 4] }, 'inOut');
  tw(dHk.querySelector('.hkarmL'), W('m3', 4), 0.3, { r: [0, 70] }, 'back'); tw(dHk.querySelector('.hkarmR'), W('m3', 4), 0.3, { r: [0, -70] }, 'back');
  tw(dPh.querySelector('.kpup'), W('m3', 4), 0.3, { x: [0, 8], y: [0, 8] }, 'out'); tw(dEb.querySelector('.ebBrow'), W('m3', 4), 0.3, { y: [-8, 6] }, 'back');
  focus('#D > .cam', W('m3', 3) + 0.15, 530, 900, 1.05, 0.5);

  // ================= E: «Так зачем? На том же шоссе толкаются Wi-Fi, микроволновка и чужие наушники» =================
  tCircle('#D', '#E', tE, 540, 760);
  tw('#E > .cam', tE - 0.1, 1.0, { s: [1.2, 1] }, 'out');
  hide(eCh1); hide(eCh2); hide(eRt); hide(eMw);
  tw(eQ, 0, 0.001, { o: [0, 0] }); stamp(eQ, W('t1', 1) - 0.05, -4, 14); slideOut(eQ, W('t1', 5), 'up', 0.3, 200);
  const eHops = [[W('t1', 0) + 0.2, 70], [W('t1', 1) + 0.3, 5], [W('t1', 2) + 0.1, 33], [W('t1', 5), 75], [W('t1', 6) + 0.1, 36], [W('t1', 7) + 0.42, 20], [W('t1', 8) + 0.5, 55], [W('t1', 10), 36]];
  const eCur = hopper([eEb, ePh], EB.cx, 36, eHops, 0.3, 40); custom(t => { eHl.style.transform = `translateX(${(eCur(t)[0] * EB.lw).toFixed(1)}px)`; });
  eHl.style.opacity = 1; eHops.forEach(([t]) => sfx('blip', t, 0.3));
  // Wi-Fi: a wide band of lanes + the router drops on it
  tw(eZ1, W('t1', 7) - 0.1, 0.4, { o: [0, 0.9], sy: [0, 1] }, 'out'); tw(eRt, W('t1', 7) - 0.05, 0.05, { o: [0, 1] }, 'lin'); tw(eRt, W('t1', 7) - 0.05, 0.42, { y: [-700, 0] }, 'back');
  sfx('thud', W('t1', 7) + 0.3, 0.7); shake(W('t1', 7) + 0.3, 0.25, 10); tw(eRt.querySelector('.rglow'), W('t1', 7) + 0.3, 0.3, { o: [0, 1] }, 'lin');
  slideIn(eCh1, W('t1', 7) + 0.05, 'left', 0.5, 400);
  ['.rantL', '.rantR'].forEach((s, k) => tw(eRt.querySelector(s), W('t1', 7) + 0.3, 0.5, { r: [k ? 14 : -14, 0] }, 'elastic'));
  // microwave
  tw(eZ2, W('t1', 8) - 0.1, 0.4, { o: [0, 0.9], sy: [0, 1] }, 'out'); tw(eMw, W('t1', 8) - 0.05, 0.05, { o: [0, 1] }, 'lin'); tw(eMw, W('t1', 8) - 0.05, 0.42, { y: [-900, 0] }, 'back');
  sfx('thud', W('t1', 8) + 0.3, 0.7); shake(W('t1', 8) + 0.3, 0.25, 10); tw(eMw.querySelector('.mwglow'), W('t1', 8) + 0.3, 0.3, { o: [0, 1] }, 'lin'); sfx('buzz', W('t1', 8) + 0.4, 0.4);
  slideIn(eCh2, W('t1', 8) + 0.05, 'right', 0.5, 400);
  idle(eMw, t => t > W('t1', 8) + 0.4 ? { x: 2.5 * Math.sin(t * 50), r: 0.6 * Math.sin(t * 37) } : {});
  // other people's earbuds: coloured pairs hopping all over the road
  const OC = ['#ff5fa2', '#43e8ff', '#7dff8a', '#ffe14d', '#b08bff', '#ff7a3d', '#5fa8ff'];
  OC.forEach((c, k) => { const a = put(EB.box, 'dot', '', -22, 50 + k * 46, 44, 44), b = put(EB.box, 'dot', '', -22, 500 + k * 46, 44, 44); a.style.background = b.style.background = c;
    const t0 = W('t1', 10) - 0.15 + k * 0.06, P = 0.34 + 0.05 * (k % 3);
    custom(t => { if (t < t0) { a.style.opacity = b.style.opacity = 0; return; } a.style.opacity = b.style.opacity = 1;
      const n = Math.floor((t - t0) / P), u = clamp(((t - t0) / P - n) / 0.5), l0 = Math.floor(hash(k * 7.1 + n) * 79), l1 = Math.floor(hash(k * 7.1 + n + 1) * 79);
      const x = (l0 + (l1 - l0) * easeIO(u) + 0.5) * EB.lw, y = -26 * Math.sin(Math.PI * u), sc = clamp((t - t0) / 0.2);
      a.style.transform = b.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${sc.toFixed(2)})`; }); sfx('pop', t0, 0.3); });
  // our pair lands on the jammed lanes and gets bumped
  [[W('t1', 7) + 0.72, 20], [W('t1', 8) + 0.8, 55]].forEach(([t, ln]) => { ringAt(camE, EB.cx(ln), 410, t, 150, '#ff3b5c'); ringAt(camE, EB.cx(ln), 1080, t, 150, '#ff3b5c'); sfx('glitch', t, 0.5);
    tw([eEb, ePh], t, 0.3, { sx: [1.25, 1], sy: [0.8, 1] }, 'elastic'); });
  mascotPose(eM, W('t1', 0), 'think'); mascotPose(eM, W('t1', 2), 'pointUp'); mascotPose(eM, W('t1', 7), 'shock'); mascotPose(eM, W('t1', 8) + 0.3, 'point'); mascotPose(eM, W('t1', 10), 'shrug');
  focus('#E > .cam', W('t1', 7) + 0.3, EB.cx(18.5), 560, 1.06, 0.35, 0.25, 0.35);

  // ================= F: «Стой твои наушники на одной полосе — музыка бы заикалась» =================
  morphCut('#E', '#F', tF, '.e-rt', '.f-rt', 0.6, 0);
  hide(fPan);
  tw(fRt.querySelector('.rglow'), 0, 0.001, { o: [1, 1] }); idle(fRt, t => ({ y: 4 * Math.sin(t * 9) }));
  tw(fRt.querySelector('.kbrow'), tF + 0.3, 0.3, { y: [0, 9] }, 'back');
  for (let k = 0, t = tF + 0.3; t < tG - 0.1; k++, t += 0.4) { const n = note(camF, 'f' + k, '#7dff8a'); place(n, 495, 800, 90, 105); const dir = k % 2 ? 1 : -1;
    tw(n, t, 0.05, { o: [0, 1] }, 'lin'); tw(n, t, 0.2, { y: [0, -70], s: [0.7, 1] }, 'in');
    tw(n.querySelector('.ntx'), t + 0.2, 0.04, { o: [0, 1] }, 'lin');
    tw(n, t + 0.2, 0.45, { x: [0, dir * 190], y: [-70, 150], r: [0, dir * 200] }, 'out'); tw(n, t + 0.5, 0.15, { o: [1, 0] }, 'lin');
    burst(camF, 5, 540, 770, t + 0.2, 110, k * 7); sfx('thud', t + 0.2, 0.45); if (k % 2) sfx('buzz', t + 0.22, 0.25);
    tw(fPh.querySelector('.karmR'), t - 0.1, 0.12, { r: [0, -110] }, 'out'); tw(fPh.querySelector('.karmR'), t + 0.04, 0.24, { r: [-110, 0] }, 'back'); }
  tw(fEb.querySelector('.ebBrow'), W('t2', 2), 0.3, { y: [0, 9] }, 'back'); tw(fEb.querySelector('.ebMouth'), W('t2', 2), 0.3, { sy: [1, -0.8] }, 'back');
  tw(fPh.querySelector('.kbrow'), W('t2', 4), 0.3, { y: [0, 9] }, 'back');
  slideIn(fPan, W('t2', 6) - 0.1, 'right', 0.5, 420); sfx('whoosh', W('t2', 6) - 0.1, 0.4);
  fBars.forEach((b, k) => custom(t => { const cyc = (t * 2.6) % 1, on = cyc < 0.34 || (cyc > 0.5 && cyc < 0.62), v = on ? 0.3 + 0.7 * Math.abs(Math.sin(t * 13 + k * 1.1)) : 0.05;
    b.style.transform = `scaleY(${v.toFixed(3)})`; b.style.background = on ? '' : '#ff3b5c'; }));
  for (let k = 0; k < 4; k++) sfx('glitch', W('t2', 8) + k * 0.19, 0.4);
  shake(W('t2', 8), 0.5, 9); idle(fEb, t => t > W('t2', 8) && t < tG ? { x: 5 * Math.sin(t * 60) } : {});
  mascotPose(fM, W('t2', 0), 'point'); mascotPose(fM, W('t2', 4), 'pointUp'); mascotPose(fM, W('t2', 6), 'sad'); mascotPose(fM, W('t2', 8), 'facepalm');
  focus('#F > .cam', W('t2', 8), 600, 500, 1.07, 0.45);

  // ================= G: «А в прыжке помеха съедает лишь крошку звука» =================
  tWhip('#F', '#G', tG);
  const BIT = 6, tBite = W('t3', 4) + 0.12;
  gBlk.forEach((b, k) => { if (k !== BIT) idle(b, t => ({ sy: 1 + 0.1 * Math.sin(t * 9 - k * 0.8) })); else idle(b, t => t < tBite ? { sy: 0.1 * Math.sin(t * 9 - k * 0.8) } : {}); });
  jump(gEb, W('t3', 2) - 0.05, 90, 0.42); sfx('blip', W('t3', 2), 0.5); tw(gEb.querySelector('.ebBrow'), W('t3', 2), 0.3, { y: [0, -8] }, 'back');
  hide(gBug); tw(gBug, W('t3', 3) - 0.1, 0.05, { o: [0, 1] }, 'lin'); tw(gBug, W('t3', 3) - 0.1, 0.5, { x: [520, 0], y: [-260, 0], r: [30, 0] }, 'back'); sfx('zap', W('t3', 3) - 0.1, 0.5);
  const jaw = gBug.querySelector('.nbjaw'); tw(jaw, W('t3', 4) - 0.2, 0.2, { r: [0, 30] }, 'out'); tw(gBug, W('t3', 4), 0.12, { y: [0, 60] }, 'in'); tw(jaw, tBite - 0.02, 0.07, { r: [30, 0] }, 'in');
  sfx('clink', tBite, 0.7); sfx('thud', tBite, 0.4); shake(tBite, 0.2, 8);
  custom(t => { gBlk[BIT].style.background = t >= tBite ? 'linear-gradient(180deg,#ff9aa8,#ff3b5c)' : ''; });
  tw(gBlk[BIT], tBite, 0.25, { sy: [1, 0.2] }, 'back'); burst(camG, 10, 45 + BIT * 111 + 50, 520, tBite, 150, 5, 'crumb', 220);
  tw(gBug, tBite + 0.12, 0.3, { y: [60, 0] }, 'out'); tw(jaw, tBite + 0.2, 0.12, { r: [0, 16] }, 'out'); tw(jaw, tBite + 0.34, 0.1, { r: [16, 0] }, 'in');
  tw(gBug, W('t3', 6) - 0.1, 0.4, { x: [0, 600], y: [0, -200], r: [0, 40] }, 'in'); tw(gBug, W('t3', 6) + 0.25, 0.08, { o: [1, 0] }, 'lin');
  ringAt(camG, 45 + BIT * 111 + 50, 560, W('t3', 6), 190, '#ffe14d'); sfx('ding', W('t3', 6), 0.35);
  // the rest of the music is intact: notes float up, the earbud is happy
  for (let k = 0; k < 5; k++) { const n = note(camG, 'g' + k, k % 2 ? '#7dff8a' : '#43e8ff'); place(n, 300 + k * 120, 700, 84, 98); const tk = W('t3', 7) - 0.15 + k * 0.1;
    tw(n, tk, 0.06, { o: [0, 1] }, 'lin'); tw(n, tk, 1.0, { y: [0, -120 - 30 * (k % 2)], r: [-15, 15] }, 'out'); sfx('pop', tk, 0.25); }
  gBlk.forEach((b, k) => { if (k !== BIT) punch(b, W('t3', 7) + k * 0.03, 0.1); });
  tw(gEb.querySelector('.ebMouth'), W('t3', 7), 0.3, { sy: [1, 1.6] }, 'back'); tw(gEb.querySelector('.ebGlow'), W('t3', 7), 0.2, { o: [0, 1] }, 'lin');
  mascotPose(gM, W('t3', 0), 'pointUp'); mascotPose(gM, W('t3', 3), 'shock'); mascotPose(gM, W('t3', 5), 'point'); mascotPose(gM, W('t3', 7), 'cheer');
  focus('#G > .cam', W('t3', 6) - 0.05, 45 + BIT * 111 + 50, 620, 1.08, 0.4);

  // ================= H: «Забитые полосы они запоминают и вычёркивают из маршрута» =================
  tDrop('#G', '#H', tH);
  hide(hCard); hide(hNo1); hide(hNo2);
  [hZ1, hZ2].forEach((z, k) => { for (let j = 0; j < 2; j++) { tw(z, W('v1', 0) + j * 0.24 + k * 0.08, 0.12, { o: [0.85, 0.35] }, 'lin'); tw(z, W('v1', 0) + j * 0.24 + k * 0.08 + 0.12, 0.12, { o: [0.35, 0.85] }, 'lin'); } }); sfx('buzz', W('v1', 0), 0.35);
  slideIn(hCard, W('v1', 2) - 0.1, 'up', 0.5, 260); sfx('whoosh', W('v1', 2) - 0.1, 0.4);
  for (let k = 0; k < 8; k++) { const d = hCard.querySelector('.rd' + k), tk = W('v1', 3) + k * 0.06; tw(d, 0, 0.001, { s: [0, 0] }); tw(d, tk, 0.3, { s: [0, 1] }, 'back'); if (k % 2 === 0) sfx('tick', tk, 0.45); }
  const tX = W('v1', 5);
  [[2, hNo1, 0], [5, hNo2, 0.22]].forEach(([k, sign, dt]) => { const x = hCard.querySelector('.rx' + k); tw(x, tX + dt, 0.1, { o: [0, 1] }, 'lin'); punch(hCard, tX + dt, 0.05);
    tw(sign, tX + dt, 0.14, { s: [2.6, 1], o: [0, 1], r: [-20, 0] }, 'in'); shake(tX + dt + 0.14, 0.22, 12); sfx('slam', tX + dt + 0.12, 0.8); });
  const hHops = [[tH + 0.35, 2], [W('v1', 1), 72], [W('v1', 2) + 0.1, 38], [W('v1', 3) + 0.2, 33], [W('v1', 5) + 0.5, 70], [W('v1', 6) + 0.1, 4], [W('v1', 7) + 0.15, 36]];
  const hCur = hopper([hEb, hPh], HB.cx, 36, hHops, 0.3, 40); hHl.style.opacity = 1; custom(t => { hHl.style.transform = `translateX(${(hCur(t)[0] * HB.lw).toFixed(1)}px)`; });
  hHops.forEach(([t, ln], k) => { sfx('blip', t, 0.3); if (k >= 4) { ringAt(camH, HB.cx(ln), 456, t + 0.3, 130, '#7dff8a'); ringAt(camH, HB.cx(ln), 1090, t + 0.3, 130, '#7dff8a'); } });
  sfx('ding', W('v1', 7) + 0.4, 0.4);
  mascotPose(hM, W('v1', 0), 'pointUp'); mascotPose(hM, W('v1', 3), 'think'); mascotPose(hM, tX - 0.2, 'pointUp', 0.2); mascotPose(hM, tX, 'point', 0.16); mascotPose(hM, W('v1', 7), 'cheer');
  focus('#H > .cam', tX + 0.1, 540, 600, 1.05, 0.5);

  // ================= J: «1 600 прыжков в секунду — а ты за день не дошёл до спортзала» =================
  tWhip('#H', '#J', tJ, 0.46, -1);
  hide(jYou); hide(jDb); hide(jLbl);
  const jH = []; { const seq = [4, 0, 3, 1, 4, 2, 0, 3, 1, 4, 0, 2]; let t = tJ + 0.2, k = 0; while (t < W('j2', 9)) { jH.push([t, seq[k % 12]]); k++; t += 0.15; } jH.push([t, 2]); }
  const jCur = hopper([jEb], JB.cx, 2, jH, 0.14, 50); hlDrive(JB, jCur); jH.forEach(([t], k) => { if (k % 2 === 0) sfx('tick', t, 0.3); });
  const jN = jNum.querySelector('i'), tN = W('j2', 0) - 0.05; custom(t => { const v = Math.round(1600 * clamp((t - tN) / 0.8)); jN.textContent = v >= 1000 ? '1 ' + String(v % 1000).padStart(3, '0') : v; });
  sfx('riser2', tN, 0.5); punch(jNum, tN + 0.82, 0.14); sfx('ding', tN + 0.82, 0.4); popIn(jLbl, W('j2', 1) - 0.05, 0.3);
  // «а ты»: the camera finds the viewer on the sofa
  slideIn(jYou, W('j2', 4) - 0.05, 'left', 0.5, 400); sfx('whoosh', W('j2', 4) - 0.05, 0.4);
  tw(jMan.querySelector('.ppup'), 0, 0.001, { y: [7, 7] }); tw(jMan.querySelector('.ppup'), W('j2', 5), 0.25, { y: [7, 0], x: [0, 6] }, 'out'); tw(jMan.querySelector('.ppup'), W('j2', 7), 0.25, { y: [0, 7], x: [6, 0] }, 'out');
  idle(jPhone, t => ({ y: 3 * Math.sin(t * 5), r: -8 }));
  tw(jClock.querySelector('.wcm'), W('j2', 6), 1.0, { r: [0, 2160] }, 'inOut'); tw(jClock.querySelector('.wch'), W('j2', 6), 1.0, { r: [0, 360] }, 'inOut'); punch(jClock, W('j2', 7), 0.12);
  for (let k = 0; k < 5; k++) sfx('tick', W('j2', 6) + k * 0.18, 0.45);
  tw(jMan.querySelector('.pmouth'), W('j2', 9), 0.3, { sy: [1, 2.6] }, 'out'); tw(jMan.querySelector('.pmouth'), W('j2', 11) + 0.2, 0.3, { sy: [2.6, 1] }, 'out');
  tw(jMan.querySelector('.phead'), W('j2', 9), 0.4, { r: [0, -7] }, 'back');
  tw(jDb, W('j2', 9) - 0.05, 0.05, { o: [0, 1] }, 'lin'); tw(jDb, W('j2', 9) - 0.05, 0.5, { x: [500, 0], r: [40, 0] }, 'out'); sfx('thud', W('j2', 9) + 0.35, 0.6);
  tw(jDb.querySelector('.dweb path'), 0, 0.001, { dash: [100, 100] }); tw(jDb.querySelector('.dweb path'), W('j2', 11) - 0.05, 0.5, { dash: [100, 0] }, 'out');
  tw(jDb.querySelector('.dspider'), 0, 0.001, { o: [0, 0] }); tw(jDb.querySelector('.dspider'), W('j2', 11) + 0.2, 0.05, { o: [0, 1] }, 'lin'); tw(jDb.querySelector('.dspider'), W('j2', 11) + 0.2, 0.4, { y: [-40, 0] }, 'back'); sfx('pop', W('j2', 11) + 0.25, 0.4);
  mascotPose(jM, tJ + 0.2, 'pointUp'); mascotPose(jM, W('j2', 4), 'pointL'); mascotPose(jM, W('j2', 7), 'shrug'); mascotPose(jM, W('j2', 10), 'facepalm');
  focus('#J > .cam', W('j2', 5), 420, 800, 1.05, 0.45); focus('#J > .cam', W('j2', 11), 540, 900, 1.06, 0.4);

  // ================= V: «Чехарда ради чистого звука? Не байт.» + «Заикается музыка на кухне — отойди от микроволновки» =================
  morphCut('#J', '#V', tV, '.j-eb', '.v-eb', 0.6, 0);
  hide(vSt); hide(vChip); hide(vMw);
  tw(vPh, tV - 0.1, 0.5, { x: [400, 0] }, 'out');
  // clean music flows from the phone to the earbud
  const vNote = (t, k, bad) => { const n = note(camV, 'v' + k, bad ? '#ff5f7a' : '#7dff8a'); place(n, 770, 870, 76, 88);
    tw(n, t, 0.06, { o: [0, 1] }, 'lin'); idle(n, tt => { if (tt < t) return {}; const u = clamp((tt - t) / 0.7); return { x: -520 * u, y: -230 * Math.sin(Math.PI * u) + (bad ? 14 * Math.sin(tt * 50) : 0), r: -30 + 60 * u }; });
    if (bad) tw(n.querySelector('.ntx'), t + 0.3, 0.05, { o: [0, 1] }, 'lin');
    tw(n, t + (bad ? 0.42 : 0.64), 0.08, { o: [1, 0] }, 'lin'); if (!bad) { punch(vEb, t + 0.7, 0.07); sfx('pop', t + 0.68, 0.22); } };
  [0, 0.4, 0.8, 1.2].forEach((dt, k) => vNote(tV + 0.25 + dt, k, false));
  jump(vEb, W('v2', 0), 40, 0.36); jump(vEb, W('v2', 0) + 0.5, 40, 0.36);
  tw(vEb.querySelector('.ebMouth'), W('v2', 2), 0.3, { sy: [1, 1.5] }, 'back');
  mascotPose(vM, W('v2', 0), 'think'); mascotPose(vM, W('v2', 2), 'hold');
  const tSt = W('v2', 4) - 0.02;
  mascotPose(vM, tSt - 0.45, 'pointUp'); tw(vM, tSt - 0.42, 0.22, { y: [0, -90] }, 'out'); tw(vM, tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose(vM, tSt - 0.18, 'point', 0.18);
  stamp(vSt, tSt, -7, 26); burst(vFx, 24, 540, 340, tSt + 0.05, 420, 61, 'conf', 140); sfx('ding', tSt + 0.2, 0.4);
  mascotPose(vM, tSt + 0.5, 'cheer');
  // takeaway: the microwave jams the music, step away from it
  tw(vSt, W('e1', 0) - 0.15, 0.35, { y: [0, -70], s: [1, 0.72] }, 'inOut');
  tw(vMw, W('e1', 0) - 0.1, 0.05, { o: [0, 1] }, 'lin'); tw(vMw, W('e1', 0) - 0.1, 0.5, { x: [520, 0] }, 'out'); sfx('whoosh', W('e1', 0) - 0.1, 0.4);
  tw(vMw.querySelector('.mwglow'), W('e1', 0) + 0.2, 0.2, { o: [0, 1] }, 'lin'); sfx('buzz', W('e1', 0) + 0.2, 0.4);
  const tAway = W('e1', 4) - 0.05;
  idle(vMw, t => t > W('e1', 0) + 0.3 && t < tAway + 0.5 ? { x: 2.5 * Math.sin(t * 50), r: 0.6 * Math.sin(t * 37) } : {});
  for (let k = 0; k < 5; k++) { const w = put(camV, 'wave', '', 830 - 60, 570 - 60, 120, 120), tk = W('e1', 0) + 0.25 + k * 0.3; if (tk > tAway + 0.1) break;
    tw(w, tk, 0.06, { o: [0, 0.9] }, 'lin'); tw(w, tk, 0.7, { s: [0.5, 6] }, 'lin'); tw(w, tk + 0.4, 0.3, { o: [0.9, 0] }, 'lin'); }
  [0.3, 0.7, 1.1].forEach((dt, k) => vNote(W('e1', 0) + dt, 10 + k, true)); for (let k = 0; k < 3; k++) sfx('glitch', W('e1', 0) + 0.45 + k * 0.4, 0.35);
  tw(vEb.querySelector('.ebMouth'), W('e1', 0) + 0.3, 0.3, { sy: [1.5, -0.8] }, 'back'); tw(vEb.querySelector('.ebBrow'), W('e1', 0) + 0.3, 0.3, { y: [0, 9] }, 'back');
  mascotPose(vM, W('e1', 0), 'shock'); mascotPose(vM, W('e1', 3), 'point'); mascotPose(vM, tAway, 'pointL');
  tw(vMw, tAway, 0.6, { x: [0, 40], y: [0, -70], s: [1, 0.6] }, 'out'); tw(vMw.querySelector('.mwglow'), tAway + 0.3, 0.3, { o: [1, 0.3] }, 'lin'); sfx('whoosh', tAway, 0.4);
  jump(vEb, tAway + 0.05, 50, 0.4); jump(vPh, tAway + 0.12, 50, 0.4);
  tw(vEb.querySelector('.ebMouth'), tAway + 0.4, 0.3, { sy: [-0.8, 1.5] }, 'back'); tw(vEb.querySelector('.ebBrow'), tAway + 0.4, 0.3, { y: [9, -6] }, 'back');
  slideIn(vChip, tAway + 0.1, 'down', 0.5, 300);
  [0.45, 0.8].forEach((dt, k) => vNote(tAway + dt, 20 + k, false)); sfx('ding', tAway + 0.6, 0.4);
  mascotPose(vM, W('e1', 6) + 0.3, 'cheer');
  focus('#V > .cam', W('e1', 0) + 0.25, 800, 570, 1.1, 0.4);
  tw([vSt, vChip, vMw, vEb, vPh, ...$$('#V .shd')], tLoop - 0.35, 0.3, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw(vM, tLoop + 0.3, 0.001, { o: [1, 0] });
}, { noCaption: ['hook'] });
