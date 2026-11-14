// 034 «Зарядка 365 дней в розетке. Сколько съест?» — Байт или не байт (длинный формат, суббота 14.11.2026).
// Стиль: история с героями — маскот уезжает на год, зарядка остаётся в розетке; внутри неё дежурит чип-сторож.
// Источник: Регламент (ЕС) 2019/1782, Annex II 1(a): без нагрузки AC-DC блок питания до 49 Вт — не больше 0,10 Вт, с 1 апреля 2020.
// Свой мир: квартира ночью — окна на ночной город (дальний слой), стена с окнами и шторами (средний), пол (ближний), параллакс camX.
// Планы: A средний (розетка), B средний (счётчик-миф), C общий (комната целиком, год проходит), D крупный-разрез (внутри зарядки — масштаб),
// E средний (чип-сторож), F средний (циферблат ватт), G макро (счётчик против улитки), H общий (возвращение, 8 чайников), V средний (штамп, вывод).
// Склейки-превращения: зарядка → разрез зарядки (C→D), счётчик → счётчик (G→H).
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
    const cols = ['#ffd23f', '#5fe8ff', '#7dff8a', '#ff5fa2', '#ff8a6b'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.8, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.6, 0.25, { o: [1, 0] }, 'lin'); } };
  const ringAt = (par, x, y, t, sz = 110, col = '#fff') => { const r = mk(par, 'ring'); r.style.borderColor = col; place(r, x - sz / 2, y - sz / 2, sz, sz); hide(r);
    tw(r, t, 0.05, { o: [0, 1] }, 'lin'); tw(r, t, 0.45, { s: [0.4, 1.7] }, 'out'); tw(r, t + 0.25, 0.2, { o: [1, 0] }, 'lin'); };
  const shadow = (par, x, y, w, h = 60) => put(par, 'shd', '', x - w / 2, y - h / 2, w, h);
  const mascot = (par, id, x, y, sz) => { const m = put(par, 'mm', mascotSVG(id), x, y, sz, sz); shadow(par, x + sz / 2, y + sz * 0.95, sz * 0.7, 50).classList.add('mshd'); return m; };
  const chip = (par, cls, txt, x, y, fs) => { const c = put(par, cls, txt, x, y); if (fs) c.style.fontSize = fs + 'px'; return c; };
  const sk = (par, id, x, y, sz, plugged = true) => { const e = put(par, 'sk', socketSVG(id), x, y, sz, sz); if (plugged) e.querySelector('.skholes').style.opacity = 0; return e; };
  const charger = (par, cls, id, cx, cy, w, face = true, old = false) => { const h = w * 300 / 260; const e = put(par, 'ch ' + cls, chargerSVG(id, face, old), cx - w / 2, cy - h * 0.45, w, h);
    e.style.transformOrigin = '50% 45%'; e.bx = cx; e.by = cy - h * 0.45 + h * (old ? 270 : 258) / 300; return e; };   // e.by = cable exit (stage)
  // cable: svg path from (x0,y0) down to a moving end with a USB-C plug. endFn(t) -> [x, y]
  const cable = (par, x0, y0, endFn, width = 20) => {
    const el = put(par, 'cbl', `<svg viewBox="0 0 1080 1920" style="overflow:visible;left:0;top:0;width:1080px;height:1920px"><path class="c1" fill="none" stroke="#0a130d" stroke-width="${width + 10}" stroke-linecap="round"/><path class="c2" fill="none" stroke="#f2f2f6" stroke-width="${width}" stroke-linecap="round"/>
      <g class="cp"><rect x="-17" y="-6" width="34" height="50" rx="8" fill="#f2f2f6" stroke="#0a130d" stroke-width="7"/><rect x="-11" y="42" width="22" height="20" rx="4" fill="#b8c0c8" stroke="#0a130d" stroke-width="5"/></g></svg>`, 0, 0, 1080, 1920);
    const p1 = el.querySelector('.c1'), p2 = el.querySelector('.c2'), cp = el.querySelector('.cp');
    custom(t => { if (el.closest('.scene').style.display === 'none') return; const [ex, ey] = endFn(t); const sag = Math.max(60, (ey - y0) * 0.55);
      const d = `M${x0} ${y0} C${x0} ${(y0 + sag).toFixed(1)} ${ex.toFixed(1)} ${(ey - sag * 0.6).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`; p1.setAttribute('d', d); p2.setAttribute('d', d);
      const ang = Math.atan2(ey - (ey - sag * 0.6), ex - ex) * 180 / Math.PI - 90; cp.setAttribute('transform', `translate(${ex.toFixed(1)} ${ey.toFixed(1)}) rotate(${(ang + (ex - x0) * -0.08).toFixed(1)})`); });
    return el;
  };
  // the charger characters blink and wake/sleep through the .keye/.kmouth rig
  const blinkers = [];

  // ---------- world ----------
  $('#city').innerHTML = citySVG(); $('#wall').innerHTML = wallSVG(); $('#floor').innerHTML = floorSVG();
  dof('#city', 2.4);
  lookFX({ grain: 0.1, tint: 'transparent' });

  // ================= layouts =================
  // ----- A: hook. «365 дней в розетке» + a charger in a socket, the cable hangs empty -----
  const buildA = (cam, s) => {
    const n1 = put(cam, 'big', '<i>365</i>', 0, 150, 1080); n1.style.fontSize = '250px';
    const n2 = put(cam, 'lbl', 'ДНЕЙ В РОЗЕТКЕ', 0, 410, 1080); n2.style.fontSize = '74px';
    const so = sk(cam, 'a' + s, 330, 560, 420);
    const ch = charger(cam, 'a-ch', 'a' + s, 540, 770, 290);
    const cb = cable(cam, 540, ch.by, t => [540 + 70 * Math.sin(W2 * 5 * t), 1180 - 18 * Math.abs(Math.cos(W2 * 5 * t))]);
    const m = mascot(cam, 'am' + s, -10, 930, 370);
    return { n1, n2, so, ch, cb, m };
  };
  const A = buildA('#A .cam', ''); const A2 = buildA('#A2 .cam', '2');
  const camA = $('#A .cam');
  const aGh = put(camA, 'gph', phonePropSVG('ag'), 790, 900, 150, 286); aGh.style.opacity = 0.5;
  const aX = put(camA, 'xr', '', 800, 978, 130, 130);

  // ----- B: the myth. A meter racing, coins fly out of it -----
  const camB = $('#B .cam');
  const bSk = sk(camB, 'b', 40, 330, 210); const bCh = charger(camB, 'b-ch', 'b', 145, 440, 150);
  const bWire = put(camB, 'bw', `<svg viewBox="0 0 1080 1920" style="overflow:visible;left:0;top:0;width:1080px;height:1920px"><path d="M145 ${bCh.by.toFixed(0)} C145 760 240 640 330 640" fill="none" stroke="#0a130d" stroke-width="26" stroke-linecap="round"/><path class="bwd" pathLength="100" d="M145 ${bCh.by.toFixed(0)} C145 760 240 640 330 640" fill="none" stroke="#ffd23f" stroke-width="12" stroke-dasharray="6 6" stroke-linecap="round"/></svg>`, 0, 0, 1080, 1920);
  const bMt = put(camB, 'mt b-mt', meterSVG('b'), 330, 290, 460, 588);
  const bCoins = []; for (let k = 0; k < 9; k++) { const c = put(camB, 'coin', coinSVG('bc' + k, ''), 525, 520, 70, 70); bCoins.push(c); }
  const bM = mascot(camB, 'bm', -10, 960, 340);
  const bSw = [0, 1, 2].map(k => put(camB, 'sweat', '', 70 + k * 220, 980));
  const bC1 = chip(camB, 'nb-chip r chipL r', 'БАЙТ?', 380, 960, 50), bC2 = chip(camB, 'nb-chip g chipL g', 'НЕ БАЙТ?', 520, 1090, 50);

  // ----- C: general shot. The whole room: socket, calendar, door; the mascot leaves for a year -----
  const camC = $('#C .cam');
  const cSk = sk(camC, 'c', 110, 800, 160); const cCh = charger(camC, 'c-ch', 'c', 190, 880, 110);
  cable(camC, 190, cCh.by, t => [205 + 12 * Math.sin(W2 * 7 * t), 1110]);
  const cCal = put(camC, 'cal', calendarSVG('c', 'ГОД', 'ЯНВ', '#ff5f6d'), 420, 520, 220, 254);
  const cCalTx = cCal.querySelector('.cpage text'), MONTHS = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК'];
  shadow(camC, 905, 1270, 300, 50);
  const cHole = put(camC, 'hole', '', 790, 772, 236, 488); cHole.style.background = 'linear-gradient(180deg,#0c0614,#1e1030)'; cHole.style.borderRadius = '8px';
  const cDoor = put(camC, 'door', doorSVG('c'), 778, 760, 260, 473); cDoor.style.transformOrigin = '12px 50%';
  const cM = mascot(camC, 'cm', 380, 1000, 290);
  const cSc = put(camC, 'sc', suitcaseSVG('c'), 620, 1150, 140, 131);
  const cChip = chip(camC, 'nb-chip chipL', 'ОПЫТ НА ГОД', 70, 230, 46);

  // ----- D: close-up cutaway (scale: inside the charger). Big current in, small current out to the phone -----
  const camD = $('#D .cam');
  const DS = 800 / 900, DX = 140, DY = 330, dmap = ([x, y]) => [DX + x * DS, DY + y * DS];
  const dCut = put(camD, 'cut d-cut', chargerCutSVG('d'), DX, DY, 800, 676);
  const dPortX = DX + 830 * DS, dPortY = DY + 410 * DS;
  const dPhBase = [790, 990];
  const yank = t => { const p = easeIO((t - W('m2', 0) + 0.05) / 0.45); return [p * 260, p * 520]; };
  cable(camD, dPortX, dPortY, t => { const [ox, oy] = yank(t); return [dPhBase[0] + 75 + ox * 0.55, dPhBase[1] - 4 + oy * 0.55]; }, 16);
  const dPh = put(camD, 'ph d-ph', phonePropSVG('d'), dPhBase[0], dPhBase[1], 150, 286);
  const dBat = put(dPh, 'bat', '', 34, 70, 82, 170); dBat.style.cssText += ';border:6px solid #0a130d;border-radius:12px;background:rgba(255,255,255,.5)';
  const dBatF = put(dBat, 'batf', '', 4, 4, 62, 150); dBatF.style.cssText += ';background:linear-gradient(180deg,#b9ff9a,#3bd16a);border-radius:6px;transform-origin:50% 100%';
  custom(t => { const [ox, oy] = yank(t); dPh.style.transform = `translate(${ox.toFixed(1)}px,${oy.toFixed(1)}px) rotate(${(ox * 0.06).toFixed(2)}deg)`; });
  const PIN = [], POUT = []; for (let k = 0; k < 12; k++) PIN.push(put(camD, 'pin', '', 0, 0)); for (let k = 0; k < 14; k++) POUT.push(put(camD, 'pout', '', 0, 0));
  const dM = mascot(camD, 'dm', -20, 1010, 300);
  const dMag = put(camD, 'mag', magnifierSVG('d'), 210, 960, 170, 170);
  const dC1 = chip(camD, 'nb-chip chipL', 'ТОК РОЗЕТКИ', 50, 215, 42), dC2 = chip(camD, 'nb-chip c chipL c', 'СЛАБЫЙ ТОК', 560, 215, 42);

  // ----- E: medium. Inside the charger: the chip-guard switches almost everything off and dozes -----
  const camE = $('#E .cam');
  const ePan = put(camE, 'inpanel', '', 60, 220, 960, 1060);
  const SWX = [50, 275, 500, 725], eSw = SWX.map((x, k) => put(ePan, 'sw', switchSVG('e' + k), x, 150, 190, 266));
  const eDark = put(ePan, 'dark', ''); eDark.style.opacity = 0;
  shadow(ePan, 145, 1000, 340, 56).classList.add('e-gs');
  const eG = put(ePan, 'guard', chipGuardSVG('e'), -35, 560, 360, 432); eG.style.transformOrigin = '50% 92%';
  const eChip = chip(camE, 'nb-chip chipL', 'ЧИП-СТОРОЖ', 110, 250, 44);
  const eM = mascot(camE, 'em', 770, 1000, 290);

  // ----- F: medium. The power dial drops to almost zero: «0,1 ватта» -----
  const camF = $('#F .cam');
  const fN = put(camF, 'big', '<i>0,1</i>', 0, 190, 1080); fN.style.fontSize = '230px';
  const fU = put(camF, 'lbl', 'ВАТТА', 0, 430, 1080); fU.style.fontSize = '80px';
  shadow(camF, 540, 1020, 640, 60);
  const fDial = put(camF, 'dial', wattDialSVG('f'), 190, 530, 700, 481);
  const fNeedle = fDial.querySelector('.wneedle');
  const fCh = charger(camF, 'f-ch', 'f', 880, 860, 140); shadow(camF, 880, 955, 150, 34);
  const fM = mascot(camF, 'fm', 15, 960, 330);
  const fSrc = put(camF, 'nb-panel', '<div style="position:absolute;left:34px;top:22px;font:800 34px JB;color:#fff;white-space:nowrap">РЕГЛАМЕНТ ЕС 2019/1782</div><div style="position:absolute;left:34px;top:76px;font:700 30px JB;color:var(--dim);white-space:nowrap">ДЕЙСТВУЕТ С 01.04.2020</div>', 330, 1060, 600, 140);

  // ----- G: macro joke. The meter's red mark versus a snail -----
  const camG = $('#G .cam');
  const GS = 1000 / 360, GX = 40, GY = -60;
  const gMt = put(camG, 'mt g-mt', meterSVG('g'), GX, GY, 1000, 1278);
  const gLedge = put(camG, 'ledge', '', 90, 760, 900, 46);
  const gFlag = put(camG, 'flag', '', 900, 546);
  shadow(camG, 0, 0, 1, 1);
  const gSn = put(camG, 'sn', snailSVG('g'), -20, 494, 420, 289);
  const gM = mascot(camG, 'gm', 30, 1000, 300);
  const gChip = chip(camG, 'nb-chip r chipL r', 'СЧЁТЧИК', 520, 900, 44), gChip2 = chip(camG, 'nb-chip g chipL g', 'УЛИТКА', 560, 1020, 44);

  // ----- H: general. Back after a year: the meter, 8 kettles -----
  const camH = $('#H .cam');
  const hHole = put(camH, 'hole', '', 42, 772, 236, 488); hHole.style.background = 'linear-gradient(180deg,#0c0614,#1e1030)'; hHole.style.borderRadius = '8px';
  const hSk = sk(camH, 'h', 380, 380, 150); const hCh = charger(camH, 'h-ch', 'h', 455, 455, 104);
  const hMt = put(camH, 'mt h-mt', meterSVG('h'), 640, 320, 240, 307);
  const hN = put(camH, 'lbl', '<i>×8</i> РАЗ', 300, 650, 700); hN.style.fontSize = '104px';
  const KX = [330, 485, 640, 795], KY = [800, 975], hK = [];
  KY.forEach((y, r) => KX.forEach((x, c) => { shadow(camH, x + 70, y + 145, 140, 30).classList.add('ksh'); hK.push(put(camH, 'kt', kettleSVG('h' + r + c), x, y, 140, 149)); }));
  const hDoor = put(camH, 'door', doorSVG('h'), 30, 760, 260, 473); hDoor.style.transformOrigin = '12px 50%';
  const hM = mascot(camH, 'hm', 20, 960, 320);
  const hSc = put(camH, 'sc', suitcaseSVG('h'), 210, 1140, 150, 141);
  const hDrip = put(camH, 'drip', '', 740, 600);
  const hChip = chip(camH, 'nb-chip c chipL c', 'ЛИТР ВОДЫ', 560, 1160, 44);
  const hCup = put(camH, 'cup', cupSVG('h'), 250, 1060, 110, 80);

  // ----- V: verdict and the takeaway: old warm charger out, new one stays -----
  const camV = $('#V .cam');
  const vSk1 = sk(camV, 'v1', 120, 560, 250), vSk2 = sk(camV, 'v2', 660, 560, 250, false);
  const vNew = charger(camV, 'v-new', 'vn', 245, 690, 170);
  const vOld = charger(camV, 'v-old', 'vo', 785, 690, 205, false, true);
  const vMt = put(camV, 'mt v-mt', meterSVG('v'), 425, 600, 190, 243);
  const vOk = put(camV, 'ok', '✓', 185, 900, 120, 120);
  const vChip = chip(camV, 'nb-chip r chipL r', 'СТАРАЯ', 650, 900, 46);
  const vM = mascot(camV, 'vm', 340, 920, 380);
  const vSt = put(camV, 'stt', 'БАЙТ', 260, 280, 560, 170); vSt.style.cssText += ';border:18px solid var(--red);color:var(--red);font:900 112px/134px Unb';
  const vFx = put(camV, 'vfx', '', 0, 0);
  [cChip].forEach(c => {});

  mascotLife(); mascotTalk();
  // charger faces: blink (skip in the loop zones)
  $$('.ch .keye, .guard .keye').forEach((e, i) => { if (e.closest('#A2')) return; const P = TOTAL / 9, ph = hash(i * 2.3) * P; idle(e, t => { if (t < 0.6 || t > TOTAL - 0.8) return {}; const u = (t + ph) % P; return { sy: u < 0.16 ? 1 - 0.9 * Math.sin(Math.PI * u / 0.16) : 1 }; }); });
  $$('#city .win').forEach((w, i) => { if (i % 6) return; custom(t => { w.style.opacity = (0.45 + 0.4 * Math.pow(0.5 + 0.5 * Math.sin(W2 * (6 + i % 7) * t + i), 2)).toFixed(2); }); });

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('q1'), tC = cut('x1'), tD = cut('m1'), tE = cut('m3'), tF = cut('n1'), tG = cut('j1'), tH = cut('r1'), tV = cut('v1'), tLoop = TOTAL - 0.5;
  const CUTS = [0, tB, tC, tD, tE, tF, tG, tH, tV], IDS = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#V'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 200 * easeIO((t - c + 0.35) / 0.7); }); x -= 1600 * easeIO((t - tLoop) / 0.6); return x; };
  // walls fade away for the inside-the-charger scenes (D, E) and the macro (G)
  const WALLON = [[0, 1], [tD, 0.25], [tF, 1], [tG, 0.4], [tH, 1]];
  const wallAt = t => { let v = 1, pv = 1, tc = 0; for (const [tt, o] of WALLON) if (t >= tt) { pv = v; v = o; tc = tt; } return pv + (v - pv) * clamp((t - tc + 0.25) / 0.5); };
  const tDay0 = W('x1', 6), tDay1 = tD + 0.2;
  custom(t => {
    const x = camX(t);
    $('#city').style.transform = `translate(${(-x * 0.06).toFixed(1)}px,0)`;
    $('#wall').style.transform = `translate(${(-x * 0.25).toFixed(1)}px,0)`;
    $('#wall').style.opacity = wallAt(t).toFixed(2); $('#floor').style.opacity = wallAt(t).toFixed(2);
    const dn = t > tDay0 && t < tDay1 ? Math.pow(Math.max(0, Math.sin((t - tDay0) / (tDay1 - tDay0) * Math.PI * 7)), 1.5) * 0.75 : 0;
    $('#day').style.opacity = dn.toFixed(3);
  });
  grade(0, 'transparent'); grade(tB, 'rgba(255,59,92,.22)'); grade(tC, 'rgba(120,150,255,.14)'); grade(tD, 'rgba(255,210,63,.14)'); grade(tE, 'rgba(176,139,255,.18)');
  grade(tF, 'rgba(255,210,63,.12)'); grade(tG, 'rgba(255,95,162,.2)'); grade(tH, 'rgba(255,160,80,.16)'); grade(tV, 'rgba(125,255,138,.14)'); grade(tLoop + 0.3, 'transparent');
  $$('.mm').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2')) idle(m, t => ({ y: 6 * Math.sin(W2 * 16 * t + i), r: 1.4 * Math.sin(W2 * 8 * t + i) })); });

  // ================= A: «Зарядка торчит в розетке 365 дней. Без телефона.» =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  hide(aGh); hide(aX);
  punch(A.n1, W('hook', 5) + 0.05, 0.1); punch(A.n2, W('hook', 2), 0.08); punch(A.ch, W('hook', 1), 0.06); sfx('ding', W('hook', 5), 0.35);
  mascotPose(A.m, 0.3, 'point'); mascotPose(A.m, W('hook', 4), 'pointUp'); mascotPose(A.m, W('h2', 0), 'shrug');
  tw(aGh, W('h2', 0), 0.35, { o: [0, 0.55], s: [0.6, 1] }, 'back'); stamp(aX, W('h2', 1), 0, 8);
  focus('#A > .cam', W('h2', 1), 600, 800, 1.06, 0.4);
  tw(aGh, tB - 0.3, 0.2, { o: [0.55, 0] }, 'lin');

  // ================= B: «Говорят, всё это время она тихо мотает счётчик. Байт или не байт?» =================
  tZoom('#A', '#B', tB);
  hide(bC1); hide(bC2); bSw.forEach(s => hide(s)); bCoins.forEach(c => hide(c));
  const bMark = bMt.querySelector('.mmark'), bTx = bMt.querySelector('.mdtx'), bSpin = bMt.querySelector('.mspin');
  const tRace = W('q1', 5);
  custom(t => {
    if (t < tB - 0.4 || t > tC + 0.6) return;
    const sp = t < tRace ? 30 : 30 + 900 * clamp((t - tRace) / 0.6);
    const ph = t < tRace ? (t - tB) * 30 : (tRace - tB) * 30 + (t - tRace) * 30 + 900 * Math.max(0, t - tRace - 0.3);
    bMark.setAttribute('transform', `translate(${(((ph * 1.2) % 240) - 120).toFixed(1)} 0)`);
    bSpin.style.opacity = t > tRace + 0.2 ? 1 : 0;
    const v = t < tRace ? 1234 : Math.floor(1234 + Math.pow(Math.max(0, t - tRace), 2) * 9000); bTx.textContent = String(v % 100000).padStart(5, '0');
  });
  tw(bWire.querySelector('.bwd'), tB, 3.6, { dash: [0, -120] }, 'lin');
  shake(tRace + 0.3, 1.2, 6);
  bCoins.forEach((c, k) => { const t = tRace + 0.35 + k * 0.17, a = -Math.PI / 2 + (k % 2 ? 1 : -1) * (0.5 + 0.6 * hash(k * 2.1)), d = 380 + 160 * hash(k);
    tw(c, t, 0.05, { o: [0, 1] }, 'lin'); tw(c, t, 0.75, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d * 0.7], r: [0, 540 * (k % 2 ? 1 : -1)], s: [0.6, 1.1] }, 'out');
    tw(c, t + 0.75, 0.4, { y: [Math.sin(a) * d * 0.7, Math.sin(a) * d * 0.7 + 900] }, 'in'); sfx('coin', t, 0.6); });
  mascotPose(bM, tB + 0.15, 'think'); mascotPose(bM, W('q1', 3), 'point'); mascotPose(bM, tRace + 0.2, 'shock');
  bSw.forEach((s, k) => { const t = tRace + 0.4 + k * 0.25; tw(s, t, 0.05, { o: [0, 1] }, 'lin'); tw(s, t, 0.6, { y: [0, 90], x: [0, (k - 1) * 30] }, 'in'); tw(s, t + 0.5, 0.15, { o: [1, 0] }, 'lin'); });
  focus('#B > .cam', W('q1', 6), 560, 430, 1.12, 0.6);
  slideIn(bC1, W('q2', 0), 'left', 0.5, 400); slideIn(bC2, W('q2', 2), 'right', 0.5, 400); sfx('whoosh', W('q2', 0), 0.5); sfx('whoosh', W('q2', 2), 0.5);
  mascotPose(bM, W('q2', 0), 'pointL'); mascotPose(bM, W('q2', 2), 'shrug');
  punch(bC1, W('q2', 1), 0.06); punch(bC2, W('q2', 3), 0.06);

  // ================= C: «Проверим: я уезжаю на год, а зарядку оставляю в розетке.» =================
  tWhip('#B', '#C', tC);
  hide(cChip);
  slideIn(cChip, W('x1', 0), 'left', 0.6, 400); sfx('whoosh', W('x1', 0), 0.4);
  mascotPose(cM, tC + 0.1, 'pointL'); mascotPose(cM, W('x1', 1), 'hold');
  // pick the suitcase up and walk to the door with little hops
  const tGo = W('x1', 2), cWalk = [[tGo, 120], [tGo + 0.45, 250], [tGo + 0.9, 390]];
  tw(cSc, tGo - 0.15, 0.25, { y: [0, -70], x: [0, -30] }, 'out');
  cWalk.forEach(([t, x], k) => { const x0 = k ? cWalk[k - 1][1] : 0; tw([cM, cSc], t, 0.42, { x: [x0, x] }, 'inOut'); jump(cM, t + 0.02, 34, 0.38); sfx('tick', t + 0.4, 0.4); });
  tw($$('#C .mshd'), tGo, 1.3, { x: [0, 390] }, 'inOut');
  tw(cDoor, tGo + 0.2, 0.4, { sx: [1, 0.12] }, 'inOut'); sfx('whoosh', tGo + 0.2, 0.3);
  const tIn = tGo + 1.35;
  tw([cM, cSc], tIn, 0.3, { s: [1, 0.85], o: [1, 0] }, 'in'); tw($$('#C .mshd'), tIn, 0.3, { o: [1, 0] }, 'in');
  tw(cDoor, tIn + 0.25, 0.35, { sx: [0.12, 1] }, 'inOut'); sfx('thud', tIn + 0.6, 0.6); shake(tIn + 0.6, 0.2, 6);
  mascotPose(cM, tGo, 'wave');
  // the charger stays; a year flies by: calendar months + day/night
  focus('#C > .cam', W('x1', 7), 190, 900, 1.15, 0.5);
  const tCal = W('x1', 6);
  custom(t => { if (t < tC - 0.5 || t > tD + 0.6) return; const k = Math.max(0, Math.min(11, Math.floor((t - tCal) / ((tD - tCal) / 12)))); cCalTx.textContent = t < tCal ? MONTHS[0] : MONTHS[k]; });
  for (let k = 1; k < 12; k++) { const t = tCal + k * (tD - tCal) / 12; tw(cCal.querySelector('.cpage'), t - 0.06, 0.06, { sy: [1, 0.2] }, 'in'); tw(cCal.querySelector('.cpage'), t, 0.1, { sy: [0.2, 1] }, 'out'); if (k % 2) sfx('tick', t, 0.35); }
  tw(cCh.querySelector('.chlid'), W('x1', 9), 0.2, { o: [0, 1] }, 'lin');

  // ================= D: «Заглянем внутрь: зарядка превращает ток розетки в слабый ток для телефона. Нет телефона — работы нет.» =================
  morphCut('#C', '#D', tD, '.c-ch', '.d-cut', 0.62, 0);
  hide(dC1); hide(dC2);
  const tIn0 = W('m1', 3), tOut0 = W('m1', 7), tStop = W('m2', 0) + 0.15;
  const sIn = t => t < tIn0 ? 0 : t < tStop ? 0.55 : 0.55 - 0.5 * clamp((t - tStop) / 0.9);
  const sOut = t => t < tOut0 ? 0 : t < tStop ? 0.9 : 0;
  // integrate the speeds once (deterministic)
  const PH = [], DT = 1 / 120; { let a = 0, b = 0; for (let t = 0; t <= TOTAL + 0.1; t += DT) { PH.push([a, b]); a += sIn(t) * DT; b += sOut(t) * DT; } }
  const phAt = t => PH[Math.max(0, Math.min(PH.length - 1, Math.round(t / DT)))];
  const along = (pts, u) => { const seg = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); tot += l; }
    let d = u * tot; for (let i = 0; i < seg.length; i++) { if (d <= seg[i]) { const f = d / seg[i]; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f]; } d -= seg[i]; } return pts[pts.length - 1]; };
  const INP = CC_IN.map(dmap), OUTP = CC_OUT.map(dmap).concat([[dPortX + 40, dPortY + 120], [dPhBase[0] + 75, dPhBase[1] - 4]]);
  custom(t => {
    if (t < tD - 0.4 || t > tE + 0.6) return;
    const [a, b] = phAt(t), oi = t < tIn0 ? 0 : t < tStop ? 1 : 1 - 0.6 * clamp((t - tStop) / 0.9), oo = t < tOut0 ? 0 : t < tStop ? 1 : 1 - clamp((t - tStop) / 0.25);
    PIN.forEach((p, k) => { const u = (a + k / PIN.length) % 1, [x, y] = along(INP, u); p.style.transform = `translate(${(x - 20).toFixed(1)}px,${(y - 20).toFixed(1)}px)`; p.style.opacity = (oi * Math.min(1, u * 8)).toFixed(2); });
    POUT.forEach((p, k) => { const u = (b + k / POUT.length) % 1, [x, y] = along(OUTP, u); p.style.transform = `translate(${(x - 11).toFixed(1)}px,${(y - 11).toFixed(1)}px)`; p.style.opacity = (oo * Math.min(1, u * 8) * Math.min(1, (1 - u) * 10)).toFixed(2); });
    dBatF.style.transform = `scaleY(${(0.3 + 0.6 * clamp((t - tOut0) / (tStop - tOut0))).toFixed(3)})`;
  });
  const dGlow = dCut.querySelector('.ccglow'); tw(dGlow, tIn0 + 0.3, 0.4, { o: [0, 1] }, 'lin'); tw(dGlow, tStop, 0.6, { o: [1, 0.15] }, 'lin');
  idle(dCut.querySelector('.ccEye'), t => ({ x: t > tStop ? -4 : 4 * Math.sin(W2 * 20 * t) }));
  slideIn(dC1, W('m1', 4), 'left', 0.6, 400); slideIn(dC2, W('m1', 7), 'right', 0.6, 400); sfx('whoosh', W('m1', 4), 0.4); sfx('whoosh', W('m1', 7), 0.4); sfx('zap', W('m1', 4), 0.3);
  sfx('blip', W('m1', 10), 0.4); ringAt('#D .cam', dPhBase[0] + 75, dPhBase[1] + 140, W('m1', 10), 140, '#7dff8a');
  focus('#D > .cam', W('m1', 10), 860, 1000, 1.1, 0.45);
  mascotPose(dM, tD + 0.2, 'hold'); mascotPose(dM, W('m1', 2), 'point'); mascotPose(dM, W('m1', 7), 'pointUp');
  tw(dMag, tD + 0.3, 0.6, { x: [0, 30], y: [0, -20], r: [0, -15] }, 'inOut'); tw(dMag, W('m1', 6), 0.6, { x: [30, 0], y: [-20, 0], r: [-15, 0] }, 'inOut');
  // yank: the phone leaves, the flow stops
  sfx('pop', W('m2', 0), 0.7); sfx('whoosh', W('m2', 0), 0.5);
  mascotPose(dM, W('m2', 0), 'shock'); mascotPose(dM, W('m2', 2), 'shrug');
  tw(dC2, W('m2', 2), 0.3, { o: [1, 0.25] }, 'lin');

  // ================= E: «Тогда маленький чип-сторож выключает почти всё и лишь изредка просыпается.» =================
  tCircle('#D', '#E', tE, 540, 760);
  hide(eChip);
  const eDoff = eSw.map(s => s.querySelector('.swoff')), eKn = eSw.map(s => s.querySelector('.swk')), eArm = eG.querySelector('.cgarmR');
  slideIn(eChip, W('m3', 2), 'left', 0.6, 400); sfx('whoosh', W('m3', 2), 0.4); punch(eG, W('m3', 2) + 0.1, 0.08);
  const FL = [W('m3', 3), W('m3', 3) + 0.42, W('m3', 4)];
  FL.forEach((t, k) => { const x0 = k ? SWX[k - 1] - SWX[0] : 0, x1 = SWX[k] - SWX[0];
    if (k) tw(eG, t - 0.42, 0.34, { x: [x0, x1] }, 'inOut');
    tw(eArm, t - 0.18, 0.15, { r: [0, -70] }, 'out'); tw(eArm, t + 0.1, 0.25, { r: [-70, 0] }, 'inOut');
    tw(eKn[k], t, 0.12, { y: [0, 58] }, 'in'); tw(eDoff[k], t, 0.06, { o: [0, 1] }, 'lin'); sfx('tick', t, 0.7); sfx('clink', t + 0.02, 0.3);
    tw(eDark, t, 0.2, { o: [k * 0.17, (k + 1) * 0.17] }, 'lin'); });
  // the fourth stays on: he looks at it, shrugs, leaves it
  const tLeave = W('m3', 5);
  tw(eG, FL[2] + 0.15, 0.4, { x: [SWX[2] - SWX[0], SWX[3] - SWX[0] - 60] }, 'inOut');
  tw(eG.querySelector('.kpup'), tLeave, 0.25, { y: [0, -7], x: [0, 5] }, 'out');
  idle(eSw[3].querySelector('.swl'), t => ({ s: t > tLeave && t < tLeave + 0.6 ? 1 + 0.15 * Math.sin((t - tLeave) * 20) : 1 }));
  // dozes off, wakes up now and then
  const tNap = L('m4').t0, eLid = eG.querySelector('.cglid'), eZ = eG.querySelector('.cgzz'), eBeam = eG.querySelector('.cgbeam');
  tw(eG, tNap - 0.1, 0.45, { x: [SWX[3] - SWX[0] - 60, 330], r: [0, -78], y: [0, 70] }, 'inOut');
  tw($('#E .e-gs'), tNap - 0.1, 0.45, { x: [0, 360], sx: [1, 1.4] }, 'inOut');
  tw(eLid, tNap + 0.1, 0.15, { o: [0, 1] }, 'lin'); tw(eZ, tNap + 0.3, 0.2, { o: [0, 1] }, 'lin'); idle(eZ, t => ({ y: t > tNap ? -10 * Math.sin((t - tNap) * 5) : 0 }));
  tw(eDark, tNap, 0.4, { o: [0.51, 0.62] }, 'lin');
  [W('m4', 2) - 0.05, W('m4', 3) + 0.25].forEach((t, k) => {
    tw(eLid, t, 0.06, { o: [1, 0] }, 'lin'); tw(eLid, t + 0.45, 0.08, { o: [0, 1] }, 'lin');
    tw(eBeam, t + 0.04, 0.06, { o: [0, 1] }, 'lin'); tw(eBeam, t + 0.38, 0.1, { o: [1, 0] }, 'lin');
    tw(eZ, t, 0.05, { o: [1, 0] }, 'lin'); tw(eZ, t + 0.5, 0.15, { o: [0, 1] }, 'lin');
    tw(eG, t, 0.12, { y: [70, 50] }, 'out'); tw(eG, t + 0.4, 0.15, { y: [50, 70] }, 'in'); sfx('blip', t + 0.02, 0.4);
  });
  focus('#E > .cam', W('m4', 2), 520, 900, 1.08, 0.55);
  mascotPose(eM, tE + 0.15, 'think'); mascotPose(eM, W('m3', 2), 'pointL'); mascotPose(eM, W('m3', 5), 'shrug'); mascotPose(eM, tNap, 'hold'); mascotPose(eM, W('m4', 3), 'cheer');

  // ================= F: «Так сколько берёт зарядка? По правилам Евросоюза — не больше одной десятой ватта.» =================
  tSlideUp('#E', '#F', tF);
  hide(fN); hide(fU); hide(fSrc);
  const tNd = W("n2", 3);
  idle(fNeedle, t => { if (t < tF - 0.4 || t > tG + 0.6) return {};
    if (t < tNd) return { r: 45 * Math.sin((t - tF) * 7.5) + 15 * Math.sin((t - tF) * 17) };
    const p = clamp((t - tNd) / 0.5), r0 = 45 * Math.sin((tNd - tF) * 7.5) + 15 * Math.sin((tNd - tF) * 17);
    return { r: r0 + (-78 - r0) * E.expo(p) + (p >= 1 ? 1.2 * Math.sin(t * 30) * Math.exp(-(t - tNd - 0.5) * 3) : 0) }; });
  sfx('buzz', tF + 0.3, 0.25); sfx("thud", tNd + 0.3, 0.5);
  mascotPose(fM, tF + 0.1, 'think'); mascotPose(fM, W('n1', 1), 'point'); mascotPose(fM, W('n2', 1), 'pointUp'); mascotPose(fM, tNd, "shock"); mascotPose(fM, W('n2', 6), 'cheer');
  punch(fCh, W('n1', 3), 0.08);
  slideIn(fSrc, W('n2', 1), 'down', 0.6, 300); sfx('whoosh', W('n2', 1), 0.35);
  stamp(fN, W('n2', 5), 0, 14); popIn(fU, W('n2', 6)); sfx('ding', W('n2', 6), 0.4);
  focus('#F > .cam', W('n2', 5) + 0.05, 540, 680, 1.07, 0.6);
  tw(fCh.querySelector('.kmouth'), 0, 0.001, { sy: [1, 1] });

  // ================= G: «Счётчик от такого крутится медленнее улитки.» =================
  tDrop('#F', '#G', tG);
  hide(gChip); hide(gChip2);
  const gMark = gMt.querySelector('.mmark');
  custom(t => { if (t < tG - 0.4 || t > tH + 0.6) return; gMark.setAttribute('transform', `translate(${((t - tG) * 2).toFixed(2)} 0)`); });
  tw(gSn, tG - 0.1, (tH + 0.3) - (tG - 0.1), { x: [0, 620] }, 'lin');
  idle(gSn.querySelector('.snstalk'), t => ({ r: 6 * Math.sin(W2 * 30 * t) }));
  tw(gSn.querySelector('.sntrail'), tG, 2.4, { sx: [0.2, 3] }, 'lin');
  slideIn(gChip, W('j1', 0), 'right', 0.5, 300); slideIn(gChip2, W('j1', 5), 'right', 0.5, 300); sfx('whoosh', W('j1', 0), 0.3);
  mascotPose(gM, tG + 0.1, 'point'); mascotPose(gM, W('j1', 3), 'think'); mascotPose(gM, W('j1', 5), 'facepalm');
  burst('#G .cam', 14, 563, 640, W('j1', 5) + 0.05, 200, 31, 'conf', 80); sfx('ding', W('j1', 5) + 0.05, 0.4);
  focus('#G > .cam', W('j1', 4), 540, 700, 1.1, 0.8);

  // ================= H: «Возвращаюсь через год. Набежало — как восемь раз вскипятить литр воды.» =================
  morphCut('#G', '#H', tH, '.g-mt', '.h-mt', 0.62, 0);
  hide(hN); hide(hChip); hide(hDrip); hK.forEach(k => hide(k)); $$('#H .ksh').forEach(s => hide(s)); hide(hCup);
  tw(hSc.querySelector('.scdust'), 0, 0.001, { o: [1, 1] }); tw(hSc.querySelector('.scweb'), 0, 0.001, { o: [1, 1] });
  tw(hCh.querySelector('.chlid'), 0, 0.001, { o: [1, 1] });
  tw(hDoor, tH + 0.05, 0.35, { sx: [1, 0.12] }, 'inOut'); sfx('whoosh', tH + 0.05, 0.3);
  tw([hM, hSc], tH + 0.2, 0.5, { x: [-80, 0], o: [0, 1] }, 'out'); jump(hM, tH + 0.25, 40, 0.4);
  tw(hDoor, W('r1', 2) + 0.2, 0.35, { sx: [0.12, 1] }, 'inOut');
  burst('#H .cam', 10, 285, 1260, W('r1', 2) + 0.1, 140, 17, 'conf', 30); sfx('thud', W('r1', 2) + 0.1, 0.5);
  mascotPose(hM, tH + 0.2, 'wave'); mascotPose(hM, W('r1', 2), 'point');
  // the meter: whole digits did not even move; the year's energy drips out and becomes kettles
  tw(hCh.querySelector('.chlid'), W('r2', 0), 0.1, { o: [1, 0] }, 'lin');
  tw(hDrip, W('r2', 0) + 0.3, 0.05, { o: [0, 1] }, 'lin'); tw(hDrip, W('r2', 0) + 0.3, 0.5, { y: [0, 280], x: [0, -150], s: [0.6, 1.4] }, 'in');
  tw(hDrip, W('r2', 0) + 0.8, 0.12, { o: [1, 0] }, 'lin'); sfx('pop', W('r2', 0) + 0.8, 0.5); ringAt('#H .cam', 610, 900, W('r2', 0) + 0.8, 160, '#ffd23f');
  hK.forEach((k, i) => { const t = W('r2', 2) - 0.25 + i * 0.07; popIn(k, t, 0.34, 0.2); tw($$('#H .ksh')[i], t, 0.2, { o: [0, 1] }, 'lin'); sfx('pop', t, 0.35); });
  stamp(hN, W('r2', 2), 0, 10);
  hK.forEach((k, i) => { const t = W('r2', 4) + i * 0.04; tw(k.querySelector('.ksteam'), t, 0.3, { o: [0, 1] }, 'lin'); tw(k.querySelector('.klight'), t, 0.1, { o: [0, 1] }, 'lin');
    idle(k.querySelector('.klid'), tt => ({ r: tt > t ? 4 * Math.sin(tt * 40 + i) : 0 })); idle(k.querySelector('.ksteam'), tt => ({ y: tt > t ? -8 * ((tt * 2 + i * 0.3) % 1) : 0 })); });
  sfx('riser2', W('r2', 4) - 0.1, 0.4);
  slideIn(hChip, W('r2', 5), 'right', 0.5, 300); sfx('whoosh', W('r2', 5), 0.3);
  hK.forEach((k, i) => tw(k.querySelector('.kwater'), W('r2', 5) + i * 0.03, 0.4, { sy: [0.3, 1] }, 'out'));
  popIn(hCup, W('r2', 6), 0.3);
  focus('#H > .cam', W('r2', 2) + 0.05, 640, 900, 1.1, 0.6);
  mascotPose(hM, W('r2', 0), 'pointUp'); mascotPose(hM, W('r2', 2), 'shock'); mascotPose(hM, W('r2', 5), 'hold');

  // ================= V: «Так что мотает счётчик — байт. Только старую тяжёлую зарядку, которая греется без телефона, лучше выдёргивать.» =================
  tWhip('#H', '#V', tV, 0.46, -1);
  hide(vSt); hide(vChip); hide(vOk);
  const tSt = W('v1', 4) - 0.02;
  mascotPose(vM, tV + 0.1, 'pointL'); mascotPose(vM, W('v1', 2), 'point');
  mascotPose(vM, tSt - 0.45, 'pointUp'); tw(vM, tSt - 0.42, 0.22, { y: [0, -90] }, 'out'); tw(vM, tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose(vM, tSt - 0.18, 'point', 0.18);
  stamp(vSt, tSt, -7, 26); burst(vFx, 24, 540, 360, tSt + 0.05, 420, 61, 'conf', 140); sfx('ding', tSt + 0.2, 0.4);
  mascotPose(vM, tSt + 0.45, 'cheer');
  tw(vSt, W('e1', 0) - 0.1, 0.4, { y: [0, -50], s: [1, 0.72] }, 'inOut');
  popIn(vOk, W('e1', 0), 0.35); sfx('blip', W('e1', 0), 0.4);
  slideIn(vChip, W('e1', 1), 'right', 0.5, 300); sfx('whoosh', W('e1', 1), 0.3);
  mascotPose(vM, W('e1', 1), 'point');
  focus('#V > .cam', W('e1', 2), 700, 760, 1.06, 0.9);
  tw(vOld, W('e1', 2), 0.1, { sy: [1, 0.86], sx: [1, 1.06] }, 'out'); tw(vOld, W('e1', 2) + 0.1, 0.3, { sy: [0.86, 1], sx: [1.06, 1] }, 'back'); sfx('thud', W('e1', 2), 0.5);
  tw(vOld.querySelector('.chheat'), W('e1', 5), 0.3, { o: [0, 1] }, 'lin'); idle(vOld.querySelector('.chheat'), t => ({ y: t > W('e1', 5) ? -14 * ((t * 1.6) % 1) : 0 }));
  idle(vOld, t => ({ x: t > W('e1', 5) && t < W('e1', 8) ? 2.5 * Math.sin(t * 50) : 0 }));
  mascotPose(vM, W('e1', 4), 'think'); mascotPose(vM, W('e1', 7), 'hold');
  const tYank = W('e1', 8) - 0.05;
  tw(vM, tYank - 0.35, 0.35, { x: [0, 150] }, 'inOut'); mascotPose(vM, tYank - 0.3, 'pointUp');
  tw(vOld, tYank, 0.55, { x: [0, 380], y: [0, -160], r: [0, 70] }, 'out'); tw(vOld, tYank + 0.45, 0.2, { o: [1, 0] }, 'lin');
  tw(vSk2.querySelector('.skholes'), 0, 0.001, { o: [0, 0] }); tw(vSk2.querySelector('.skholes'), tYank, 0.05, { o: [0, 1] }, 'lin');
  sfx('pop', tYank, 0.9); burst(vFx, 10, 785, 690, tYank, 160, 77, 'spark', 0); mascotPose(vM, tYank + 0.25, 'cheer');
  tw([vSt, vChip, vOk, vMt, vNew, vSk1, vSk2], tLoop - 0.35, 0.3, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw(vM, tLoop + 0.3, 0.001, { o: [1, 0] }); tw($$('#V .mshd'), tLoop + 0.3, 0.001, { o: [1, 0] });
}, { noCaption: ['hook'] });
