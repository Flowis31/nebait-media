// 025 «Выключать телефон раз в неделю — защита от взлома?» — Байт или не байт. Стиль: проверка мифа на глазах.
// Источник: NSA, «Mobile Device Best Practices» (Oct 2020 rev 1.1): «Power the device off and on weekly»; в таблице угроз
// «Turn Device Off & On Weekly» — «Sometimes prevents» для spearphishing и zero-click exploits, против malicious apps не отмечено.
// Мир: домашняя лаборатория маскота ночью (бирюза): полки с банками и круглые окна (дальний слой), перфопанели, лампы, верстак (средний), пол.
// Метафора: полка = память (остаётся после выключения), стол = оперативка (пустеет при выключении).
boot(() => {
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
  const clamp = x => Math.max(0, Math.min(1, x));
  const place = (el, x, y, w, h) => { el = typeof el === 'string' ? $(el) : el; el.style.left = x + 'px'; el.style.top = y + 'px'; if (w) el.style.width = w + 'px'; if (h) el.style.height = h + 'px'; return el; };
  const easeIO = x => (x = clamp(x), x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const W = (k, i) => wt(k, i);
  const jump = (el, t, h = 80, d = 0.5, shd = null) => {
    tw(el, t - 0.12, 0.12, { sy: [1, 0.86], sx: [1, 1.08] }, 'out');
    tw(el, t, d / 2, { y: [0, -h], sy: [0.86, 1.08], sx: [1.08, 0.95] }, 'out');
    tw(el, t + d / 2, d / 2, { y: [-h, 0], sy: [1.08, 1], sx: [0.95, 1] }, 'in');
    tw(el, t + d, 0.08, { sy: [1, 0.88], sx: [1, 1.1] }, 'out'); tw(el, t + d + 0.08, 0.3, { sy: [0.88, 1], sx: [1.1, 1] }, 'back');
    if (shd) { tw(shd, t, d / 2, { s: [1, 0.6], o: [1, 0.5] }, 'out'); tw(shd, t + d / 2, d / 2, { s: [0.6, 1], o: [0.5, 1] }, 'in'); }
  };
  const arc = (el, t, d, dx, dy, h, rot = 0, s1 = 1) => idle(el, tt => { if (tt < t) return {}; const u = easeIO((tt - t) / d); return { x: dx * u, y: dy * u - 4 * h * u * (1 - u), r: rot * u, s: 1 + (s1 - 1) * u }; });
  const burst = (par, n, x, y, t, dist = 220, seed = 0, cls = 'spark', fall = 0, life = 0.7) => {
    const cols = ['#3de0ff', '#ffc93d', '#ff6fb5', '#7dff8a', '#ffffff'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, life, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.4] }, 'out'); tw(s, t + life * 0.7, 0.25, { o: [1, 0] }, 'lin'); } };
  // the screen of a cutaway phone goes off (CRT squeeze to a line) and back on
  const powerOff = (dark, scan, t) => { tw(dark, 0, 0.001, { o: [0, 0] }); tw(dark, t, 0.18, { o: [0, 1] }, 'in'); if (scan) { tw(scan, 0, 0.001, { o: [0, 0] }); tw(scan, t, 0.05, { o: [0, 1] }, 'lin'); tw(scan, t, 0.3, { sx: [1, 0.02] }, 'in'); tw(scan, t + 0.3, 0.1, { o: [1, 0] }, 'lin'); } sfx('zap', t, 0.5); };
  const powerOn = (dark, t) => { tw(dark, t, 0.35, { o: [1, 0] }, 'out'); sfx('blip', t, 0.6); };
  const press = (pw, t) => { tw($$(pw + ' .pwcap'), t, 0.08, { y: [0, 26] }, 'in'); tw($$(pw + ' .pwcap'), t + 0.12, 0.3, { y: [26, 0] }, 'back'); tw($$(pw + ' .pwglow'), t, 0.06, { o: [0, 0.6] }, 'lin'); tw($$(pw + ' .pwglow'), t + 0.1, 0.45, { o: [0.6, 0] }, 'out'); sfx('thud', t, 0.8); shake(t + 0.05, 0.25, 12); };
  const ramOut = (ph, t, seed) => {   // table items blink out into dust
    ['.tb1', '.tb2', '.tb3'].forEach((c, i) => { const g = $$(ph + ' ' + c); tw(g, t + i * 0.05, 0.22, { s: [1, 0.2], o: [1, 0] }, 'in'); }); };
  const ctr = el => { const r = (typeof el === 'string' ? $(el) : el).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };

  // ---------- world ----------
  $('#far').innerHTML = `<div style="left:0">${labFarSVG(1)}</div><div style="left:2400px">${labFarSVG(2)}</div>`;
  $('#mid').innerHTML = benchMidSVG();
  dof('#far', 3); dof('#mid', 1.3);
  lookFX({ grain: 0.12, tint: 'transparent' });

  // ---------- props ----------
  const buildA = (sc, s) => {
    $(sc + ' .a-ph').innerHTML = phonePropSVG('a' + s, `<rect x="22" y="44" width="176" height="330" rx="18" fill="#123c48"/><circle cx="110" cy="190" r="46" fill="none" stroke="#3de0ff" stroke-width="12"/><path d="M110 132 L110 182" stroke="#3de0ff" stroke-width="12" stroke-linecap="round"/><rect x="40" y="300" width="140" height="16" rx="8" fill="#3de0ff" opacity=".35"/>`);
    $(sc + ' .a-hk').innerHTML = hackerSVG('a' + s);
  };
  buildA('#A', '');
  $('.b-memo').innerHTML = manualSVG('b', 'ПАМЯТКА', 'shield');
  $('.b-ph').innerHTML = phonePropSVG('b', `<rect x="22" y="44" width="176" height="330" rx="18" fill="#123c48"/><circle cx="110" cy="190" r="40" fill="none" stroke="#3de0ff" stroke-width="10"/>`);
  ['c', 'e', 'f', 'g', 'i'].forEach(s => $('.' + s + '-ph').innerHTML = phoneCutawaySVG(s));
  $('.d-desk').innerHTML = messDeskSVG('d'); $('.d-cal').innerHTML = calendarSVG('d', 'УБОРКА', 'РАЗ\nВ ГОД'); $('.d-brm').innerHTML = broomSVG('d');
  $('.e-msg').innerHTML = chatSVG('e', '#e8fbff', '', 'left'); $('.e-hk').innerHTML = hackerSVG('e'); $('.e-mag').innerHTML = magnifierSVG('e');
  place(mk('#F .cam', 'f-spy'), 250, 775, 160, 204).innerHTML = hackerSVG('fs');
  $('.f-pw').innerHTML = powerButtonSVG('f'); $('.f-hk').innerHTML = hackerSVG('f');
  $('.f-lap').innerHTML = laptopSVG('f', `<rect class="lbar0" x="110" y="130" width="300" height="40" rx="10" fill="#1c3442" stroke="#3de0ff" stroke-width="4"/><rect class="lbar" x="114" y="134" width="292" height="32" rx="8" fill="#ff5f6d" style="transform-box:fill-box;transform-origin:left center"/><text class="lpct" x="260" y="105" text-anchor="middle" style="font:900 40px JB" fill="#7dfcff">ВЗЛОМ</text>`);
  $('.g-app').innerHTML = appIconSVG('g'); $('.g-pop').innerHTML = popcornSVG('g'); $('.g-pw').innerHTML = powerButtonSVG('g');
  $('.h-memo').innerHTML = manualSVG('h', 'ПАМЯТКА', 'shield'); $('.h-g').innerHTML = gaugeSVG('h');
  $('.i-app').innerHTML = appIconSVG('i'); $('.i-brm').innerHTML = broomSVG('i'); $('.i-bin').innerHTML = trashBinSVG('i');
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  $('#A2').innerHTML = $('#A').innerHTML; ['.a-ph', '.a-hk', '.a-m'].forEach(s => $('#A2 ' + s).innerHTML = ''); buildA('#A2', '2'); $('#A2 .a-m').innerHTML = mascotSVG('a2m');
  mascotLife(); mascotTalk();
  // hackers blink
  { const n = Math.max(1, Math.round(TOTAL / 2.7)), P = TOTAL / n;
    $$('.hkeye').forEach((e, i) => idle(e, t => { if (t < 0.6 || t > TOTAL - 0.8) return {}; const u = (t + hash(i * 3.1) * P) % P; return { sy: u < 0.16 ? 1 - 0.9 * Math.sin(Math.PI * u / 0.16) : 1 }; })); }

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('s1'), tC = cut('m2'), tD = cut('j1'), tE = cut('a1'), tF = cut('a3'), tG = cut('b1'), tH = cut('v1'), tI = cut('o1'), tLoop = TOTAL - 0.62;
  const CUTS = [0, tB, tC, tD, tE, tF, tG, tH, tI], IDS = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 240 * easeIO((t - c + 0.35) / 0.7); }); x -= 1920 * easeIO((t - tLoop) / 0.6); return x; };
  custom(t => {
    const x = camX(t);
    $('#far').style.transform = `translate(${(-(x * 0.15 + t * 5) % 2400).toFixed(1)}px,0)`;
    $('#mid').style.transform = `translate(${(-x * 0.45).toFixed(1)}px,0)`;
    $('#floor').style.transform = `translate(${(-(x * 1.0) % 156).toFixed(1)}px,0)`;
  });
  grade(0, 'transparent'); grade(tB, 'rgba(61,224,255,.10)'); grade(tC, 'rgba(255,201,61,.08)'); grade(tD - 0.2, 'rgba(255,111,181,.24)');
  grade(tE, 'rgba(61,224,255,.14)'); grade(tF, 'rgba(120,90,255,.16)'); grade(tG, 'rgba(255,95,109,.14)'); grade(tH, 'rgba(255,201,61,.16)'); grade(tI, 'rgba(125,255,138,.12)'); grade(tLoop + 0.3, 'transparent');
  $$('.m').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2')) idle(m, t => ({ y: 6 * Math.sin(W2 * 16 * t + i), r: 1.4 * Math.sin(W2 * 8 * t + i) })); });
  const bob = (sel, k = 6, amp = 10) => idle(sel, t => ({ y: amp * Math.sin(W2 * k * 2 * t), r: 1.6 * Math.sin(W2 * k * t) }));
  bob('.a-ph', 6, 6); bob('.b-memo', 5, 6); bob('.h-g', 5, 5); bob('.a-hk', 9, 6);
  const fb = sel => $$(sel).forEach(g => { g.style.transformBox = 'fill-box'; g.style.transformOrigin = 'center'; });
  fb('.tbnote'); fb('.pbtn');
  // the music note on every table keeps playing (RAM is "busy")
  $$('.tbnote').forEach((n, i) => idle(n, t => ({ y: -10 * Math.abs(Math.sin(W2 * 30 * t + i)), r: 8 * Math.sin(W2 * 15 * t + i) })));

  // ================= A: hook — «ВЫКЛЮЧАЙ РАЗ В НЕДЕЛЮ», phone, a hacker peeks out =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  hide('#A .a-q');
  mascotPose('#A .a-m', W('hook', 0) + 0.05, 'point');
  punch('#A .a-ph', W('hook', 1), 0.08); sfx('tick', W('hook', 1), 0.4);
  punch('#A .a-t1', W('hook', 2), 0.07);
  punch('#A .a-t2', W('hook', 4), 0.1); sfx('pop', W('hook', 4), 0.5);
  { const th = W('hook', 6) - 0.05;   // «хакер»: the hacker leans out from behind the phone
    tw('#A .a-hk', th, 0.4, { x: [0, 60], r: [0, 8] }, 'back'); tw('#A .a-hk .hkpup', th, 0.2, { x: [0, -8] }, 'out'); sfx('whoosh', th, 0.3);
    mascotPose('#A .a-m', th, 'shock');
    tw('#A .a-hk .hkarmR', W('hook', 7), 0.3, { r: [0, -70] }, 'back');
    popIn('#A .a-q', W('hook', 7) + 0.05, 0.35); sfx('blip', W('hook', 7) + 0.05, 0.4);
    idle('#A .a-q', t => ({ r: t > W('hook', 7) ? 10 * Math.sin((t - W('hook', 7)) * 7) : 0 }));
    focus('#A > .cam', W('hook', 7), 600, 900, 1.08, 0.3, 0.25, 0.3); }

  // ================= B: «так советует памятка Агентства нацбезопасности США. Проверяем.» =================
  tWhip('#A', '#B', tB, 0.46);
  hide('.b-src'); hide('.b-chip'); hide('.b-ph');
  tw('.b-memo', tB - 0.1, 0.6, { y: [-600, 0], r: [-8, 0] }, 'out'); sfx('whoosh', tB, 0.4);
  slideIn('.b-src', W('s1', 3) - 0.1, 'left', 0.6, 560); sfx('whoosh', W('s1', 3), 0.3);
  mascotPose('.b-m', W('s1', 1), 'pointL');
  tw('.b-memo .mmark', W('s1', 2), 0.45, { dash: [100, 0] }, 'out'); sfx('tick', W('s1', 2) + 0.1, 0.4);
  [0, 1, 2, 3, 4, 5].forEach(k => tw('.b-memo .mline' + k, W('s1', 2) - 0.2 + k * 0.08, 0.3, { dash: [100, 0] }, 'out'));
  slideIn('.b-chip', W('s1', 4), 'down', 0.5, 160); sfx('pop', W('s1', 4) + 0.1, 0.4);
  mascotPose('.b-m', W('s1', 4), 'think'); tw('.b-m .pup', W('s1', 4), 0.3, { x: [0, -6], y: [0, -6] }, 'out');
  focus('#B > .cam', W('s1', 4), 540, 700, 1.1, 0.6);
  // «Проверяем»: the mascot hops, the test phone slides onto the bench
  jump('.b-m', W('s2', 0) - 0.05, 70, 0.42, '.b-shd2'); mascotPose('.b-m', W('s2', 0), 'cheer');
  tw('.b-ph', W('s2', 0) - 0.1, 0.06, { o: [0, 1] }, 'lin'); tw('.b-ph', W('s2', 0) - 0.1, 0.5, { x: [-400, 0], r: [-20, 0] }, 'out'); sfx('whoosh', W('s2', 0), 0.4);

  // ================= C: the inside of the phone — shelf = memory, table = RAM; off -> the table is empty =================
  morphCut('#B', '#C', tC, '.b-ph', '.c-ph', 0.62);
  hide('.c-k1'); hide('.c-k2'); hide('.c-dark');
  mascotPose('.c-m', tC + 0.2, 'think');
  { const t1 = W('m2', 3) - 0.05;   // «полка»: the shelf glows, items hop one by one
    punch('.c-ph .shp1', t1, 0.15); punch('.c-ph .sha1', t1 + 0.12, 0.15); punch('.c-ph .sha2', t1 + 0.24, 0.15); punch('.c-ph .shp2', t1 + 0.36, 0.15); sfx('pop', t1, 0.4); sfx('pop', t1 + 0.24, 0.3);
    slideIn('.c-k1', W('m2', 4) - 0.05, 'right', 0.5, 300); sfx('whoosh', W('m2', 4), 0.3); tw('.c-a1', W('m2', 4) + 0.25, 0.35, { dash: [100, 0] }, 'out');
    mascotPose('.c-m', W('m2', 4), 'pointL');
    punch('.c-ph .shp1', W('m2', 5), 0.2); sfx('tick', W('m2', 5), 0.4); punch('.c-ph .sha1', W('m2', 6), 0.2); punch('.c-ph .sha2', W('m2', 6) + 0.1, 0.2); sfx('tick', W('m2', 6), 0.4);
    focus('#C > .cam', W('m2', 4), 320, 560, 1.1, 0.8); }
  { const t2 = W('m3', 1) - 0.05;   // «стол»: the running things jiggle
    [['.tb1', 0], ['.tb2', 0.1], ['.tb3', 0.2]].forEach(([c, d]) => { tw('.c-ph ' + c, t2 + d, 0.14, { y: [0, -24] }, 'out'); tw('.c-ph ' + c, t2 + d + 0.14, 0.24, { y: [-24, 0] }, 'in'); });
    sfx('pop', t2, 0.4);
    slideIn('.c-k2', W('m3', 2) - 0.05, 'right', 0.5, 300); sfx('whoosh', W('m3', 2), 0.3); tw('.c-a2', W('m3', 2) + 0.25, 0.35, { dash: [100, 0] }, 'out');
    mascotPose('.c-m', W('m3', 2), 'pointL'); tw('.c-m', W('m3', 2), 0.4, { y: [0, -40] }, 'out');
    // «работает сейчас»: the browser scrolls, the game pad shakes
    idle('.c-ph .tb3', t => (t > W('m3', 5) && t < W('m4', 0)) ? { r: 6 * Math.sin((t - W('m3', 5)) * 30) } : {});
    punch('.c-ph .tb2', W('m3', 5), 0.1); sfx('blip', W('m3', 5), 0.3);
    focus('#C > .cam', W('m3', 3), 320, 960, 1.1, 0.9); }
  { const to = W('m4', 0) + 0.05;   // «Выключил»: side button, screen off, table items vanish; on again: shelf still full, table empty
    mascotPose('.c-m', to - 0.15, 'point'); tw('.c-m', to - 0.2, 0.35, { x: [0, -50] }, 'out');
    tw('.c-ph .pbtn', to, 0.08, { x: [0, -8] }, 'in'); tw('.c-ph .pbtn', to + 0.12, 0.2, { x: [-8, 0] }, 'out');
    tw('.c-dark', to + 0.02, 0.2, { o: [0, 0.94] }, 'in'); sfx('zap', to, 0.5);
    ramOut('#C .c-ph', to + 0.15, 1); burst('#C .c-fx', 12, 320, 930, to + 0.2, 200, 4, 'dust', 0, 0.6);
    tw('.c-dark', W('m4', 1) - 0.1, 0.3, { o: [0.94, 0] }, 'out'); sfx('blip', W('m4', 1) - 0.1, 0.5);
    tw('.c-k2', W('m4', 2), 0.25, { s: [1, 1.12] }, 'out'); tw('.c-k2', W('m4', 2) + 0.25, 0.3, { s: [1.12, 1] }, 'back');
    mascotPose('.c-m', W('m4', 2), 'shrug');
    focus('#C > .cam', W('m4', 1), 320, 960, 1.14, 0.5); }

  // ================= D: joke — «Мой пустеет раз в год.» (the mascot's messy desk) =================
  tWhip('#C', '#D', tD, 0.44, -1);
  hide('.d-cal'); hide('.d-brm');
  mascotPose('.d-m', W('j1', 0), 'pointUp');   // «мой»: proud
  { const ts = W('j1', 1) - 0.05;
    tw('.d-brm', ts - 0.1, 0.06, { o: [0, 1] }, 'lin'); tw('.d-brm', ts - 0.1, 0.25, { y: [200, 0], r: [-30, 30] }, 'out');
    tw('.d-brm', ts + 0.15, 0.3, { x: [0, 640], r: [30, -40] }, 'inOut'); sfx('whoosh', ts + 0.15, 0.6);
    mascotPose('.d-m', ts + 0.1, 'point'); tw('.d-m', ts + 0.15, 0.35, { x: [0, 120] }, 'out');
    [[0, -500, -260, -200], [1, -380, -380, 120], [2, 260, -420, 160], [3, 420, -200, 300], [4, 520, -160, 260], [5, 300, -500, -140], [6, -200, -300, 200]].forEach(([k, dx, h, rot], i) => {
      const g = $('.d-desk .md' + k), t = ts + 0.15 + 0.03 * i; arc(g, t, 0.55, dx, 700, Math.abs(h), rot); tw(g, t + 0.45, 0.15, { o: [1, 0] }, 'lin'); });
    sfx('thud', ts + 0.3, 0.4); burst('#D .d-fx', 14, 540, 980, ts + 0.45, 260, 9, 'spark', 0, 0.5);
    tw('.d-brm', ts + 0.55, 0.2, { o: [1, 0] }, 'lin');
    focus('#D > .cam', ts + 0.3, 540, 900, 1.08, 0.3); }
  { const tc = W('j1', 2) - 0.05;   // «раз в год»: the calendar slams in, the mascot grins
    tw('.d-cal', tc, 0.06, { o: [0, 1] }, 'lin'); tw('.d-cal', tc, 0.35, { s: [1.8, 1], r: [-20, 6] }, 'back'); sfx('slam', tc + 0.12, 0.6); shake(tc + 0.15, 0.25, 12);
    mascotPose('.d-m', tc + 0.1, 'shrug'); tw('.d-m .brL', tc + 0.1, 0.2, { y: [0, -12] }, 'out');
    focus('#D > .cam', W('j1', 4), 780, 340, 1.12, 0.35, 0.25, 0.3); }

  // ================= E: experiment 1 — «взлом без клика, одним сообщением. Шпион сидит только на столе, без следов на полке.» =================
  tDrop('#D', '#E', tE, 0.5);
  hide('.e-k1'); hide('.e-k2'); hide('.e-msg'); hide('.e-hk'); hide('.e-mag');
  slideIn('.e-k1', W('a1', 0) - 0.05, 'right', 0.5, 300); sfx('whoosh', W('a1', 0), 0.3);
  mascotPose('.e-m', W('a1', 1), 'pointUp');
  slideIn('.e-k2', W('a1', 3) - 0.1, 'right', 0.5, 340); sfx('whoosh', W('a1', 3), 0.3);
  tw('.e-k2', W('a1', 4), 0.2, { s: [1, 1.1] }, 'out'); tw('.e-k2', W('a1', 4) + 0.2, 0.25, { s: [1.1, 1] }, 'back');
  mascotPose('.e-m', W('a1', 3), 'shock');
  { const tm = W('a1', 5) - 0.1;   // «одним сообщением»: a bubble flies in on an arc and lands on the table
    tw('.e-msg', tm, 0.06, { o: [0, 1] }, 'lin'); tw('.e-msg .dot1, .e-msg .dot2, .e-msg .dot3', tm, 0.3, { y: [0, -10] }, 'out');
    arc('.e-msg', tm, 0.6, -420, 290, 160, -20, 0.6); sfx('whoosh', tm, 0.5); sfx('blip', tm + 0.6, 0.6);
    mascotPose('.e-m', tm + 0.2, 'pointL');
    // «шпион»: the bubble pops, the spy jumps out onto the table
    const tsp = W('a2', 0) - 0.08;
    tw('.e-msg', tsp, 0.12, { o: [1, 0] }, 'lin'); burst('#E .e-fx', 12, 330, 870, tsp, 160, 21, 'pix', 0, 0.5); sfx('pop', tsp, 0.7);
    tw('.e-hk', tsp, 0.06, { o: [0, 1] }, 'lin'); tw('.e-hk', tsp, 0.45, { s: [0.2, 1], y: [-60, 0] }, 'back');
    tw('.e-hk .hkarmL', W('a2', 1), 0.3, { r: [0, 60] }, 'back');
    // «только на столе»: the spy ducks behind the browser window and peeks
    tw('.e-hk', W('a2', 2), 0.35, { x: [0, 30], y: [0, 40] }, 'out'); tw('.e-hk .hkpup', W('a2', 3), 0.2, { x: [0, 8] }, 'out');
    punch('.e-ph .tb2', W('a2', 4), 0.08);
    mascotPose('.e-m', W('a2', 1), 'think');
    focus('#E > .cam', tsp, 330, 900, 1.15, 1.2);
    // «без следов на полке»: the magnifier scans the shelf: nothing
    const tg = W('a2', 5) - 0.1;
    tw('.e-mag', tg, 0.06, { o: [0, 1] }, 'lin'); tw('.e-mag', tg, 0.5, { x: [300, -420], y: [400, 20] }, 'out'); sfx('whoosh', tg, 0.4);
    tw('.e-mag', tg + 0.55, 0.5, { x: [-420, -170] }, 'inOut');
    mascotPose('.e-m', W('a2', 6), 'shrug'); sfx('tick', W('a2', 8), 0.4); }

  // ================= F: «Выключаем. Стол чист, шпиона нет. Хакеру придётся взламывать заново.» =================
  morphCut('#E', '#F', tF, '.e-ph', '.f-ph', 0.5);
  hide('.f-pw'); hide('.f-hk'); hide('.f-lap');
  tw('.f-pw', tF - 0.1, 0.06, { o: [0, 1] }, 'lin'); tw('.f-pw', tF - 0.1, 0.4, { y: [400, 0] }, 'out');
  { const tp = W('a3', 0) + 0.3;   // the mascot jumps and slams the big button with both feet
    mascotPose('.f-m', W('a3', 0) - 0.1, 'pointUp');
    tw('.f-m', tp - 0.35, 0.22, { y: [0, -140] }, 'out'); tw('.f-m', tp - 0.13, 0.15, { y: [-140, 70] }, 'in'); tw('.f-m', tp + 0.02, 0.1, { sy: [1, 0.85], sx: [1, 1.12] }, 'out'); tw('.f-m', tp + 0.12, 0.3, { sy: [0.85, 1], sx: [1.12, 1] }, 'back');
    mascotPose('.f-m', tp, 'shock', 0.2);
    press('.f-pw', tp); powerOff('.f-dark', '.f-scan', tp + 0.03);
    // the spy and the running things turn to dust in the dark
    tw('.f-spy', tp + 0.1, 0.3, { s: [1, 0.3], o: [1, 0], r: [0, 40] }, 'in'); ramOut('#F .f-ph', tp + 0.05, 2);
    burst('#F .f-fx', 18, 330, 900, tp + 0.15, 220, 31, 'dust', 0, 0.8); sfx('glitch', tp + 0.1, 0.5);
    tw('.f-m', W('a3', 1) - 0.05, 0.3, { y: [70, 74] }, 'out');
    powerOn('.f-dark', W('a3', 1) - 0.15);
    burst('#F .f-fx', 10, 320, 900, W('a3', 2), 180, 41, 'spark', 0, 0.6); sfx('ding', W('a3', 2), 0.5);
    mascotPose('.f-m', W('a3', 3), 'cheer'); jump('.f-m', W('a3', 3), 40, 0.38);
    focus('#F > .cam', W('a3', 1), 380, 880, 1.08, 1.0); }
  { const th = W('a4', 0) - 0.1;   // the hacker with a laptop: the bar runs back to zero
    tw('.f-hk', th, 0.06, { o: [0, 1] }, 'lin'); tw('.f-hk', th, 0.45, { x: [400, 0] }, 'out'); sfx('whoosh', th, 0.4);
    tw('.f-lap', th + 0.1, 0.06, { o: [0, 1] }, 'lin'); tw('.f-lap', th + 0.1, 0.45, { x: [500, 0] }, 'out');
    tw('.f-m', th, 0.4, { x: [0, -60], s: [1, 0.85] }, 'out');
    tw('.f-lap .lbar', 0, 0.001, { sx: [1, 1] }); tw('.f-lap .lbar', W('a4', 2) - 0.05, 0.5, { sx: [1, 0.02] }, 'in'); sfx('buzz', W('a4', 2) + 0.4, 0.6);
    tw('.f-hk .hkarmL', W('a4', 2), 0.3, { r: [0, 90] }, 'back'); tw('.f-hk .hkarmR', W('a4', 2), 0.3, { r: [0, -90] }, 'back');
    tw('.f-hk .hkmouth', W('a4', 2), 0.25, { sy: [1, -1] }, 'out');
    tw('.f-hk', W('a4', 3), 0.3, { r: [0, -10] }, 'back'); shake(W('a4', 3), 0.2, 8);
    mascotPose('.f-m', W('a4', 1), 'pointUp');
    focus('#F > .cam', W('a4', 2), 760, 640, 1.06, 0.6); }

  // ================= G: experiment 2 — «вирус, который ты скачал сам. Выключаем — а он на полке, как ни в чём не бывало.» =================
  tCircle('#F', '#G', tG, 330, 760);
  hide('.g-k1'); hide('.g-k2'); hide('.g-app'); hide('.g-pop'); hide('.g-dark'); hide('.g-scan');
  tw('.g-ph .shp2', 0, 0.001, { o: [0, 0] });
  slideIn('.g-k1', W('b1', 0) - 0.05, 'right', 0.5, 300); sfx('whoosh', W('b1', 0), 0.3);
  mascotPose('.g-m', W('b1', 1), 'pointUp');
  { const ta = W('b1', 2) - 0.1;   // «вирус»: the app drops from above onto the shelf with a squash
    tw('.g-app', ta, 0.06, { o: [0, 1] }, 'lin'); tw('.g-app', ta, 0.4, { y: [-700, 0], r: [-30, 0] }, 'in');
    tw('.g-app', ta + 0.4, 0.08, { sy: [1, 0.75], sx: [1, 1.2] }, 'out'); tw('.g-app', ta + 0.48, 0.3, { sy: [0.75, 1], sx: [1.2, 1] }, 'back'); sfx('thud', ta + 0.4, 0.6); shake(ta + 0.42, 0.2, 8);
    mascotPose('.g-m', ta + 0.4, 'shock');
    slideIn('.g-k2', W('b1', 5) - 0.1, 'right', 0.5, 340); sfx('whoosh', W('b1', 5), 0.3);
    mascotPose('.g-m', W('b1', 5), 'shrug'); tw('.g-app .appup', W('b1', 4), 0.25, { x: [0, 8], y: [0, 4] }, 'out');
    focus('#G > .cam', ta + 0.45, 440, 600, 1.08, 0.7, 0.28, 0.45, 500, 640); }
  { const tp = W('b2', 0) + 0.25;
    tw('.g-m', tp - 0.35, 0.22, { y: [0, -120] }, 'out'); tw('.g-m', tp - 0.13, 0.15, { y: [-120, 110] }, 'in'); tw('.g-m', tp + 0.02, 0.1, { sy: [1, 0.85], sx: [1, 1.12] }, 'out'); tw('.g-m', tp + 0.12, 0.3, { sy: [0.85, 1], sx: [1.12, 1] }, 'back');
    mascotPose('.g-m', tp - 0.3, 'pointUp', 0.2);
    press('.g-pw', tp); powerOff('.g-dark', '.g-scan', tp + 0.03); ramOut('#G .g-ph', tp + 0.05, 3);
    tw('.g-k1, .g-k2', tp + 0.1, 0.3, { o: [1, 0] }, 'lin');
    powerOn('.g-dark', W('b2', 1) - 0.15);
    // the app is still there: grins, grabs popcorn, waves
    tw('.g-app .apmouth', W('b2', 2), 0.3, { s: [1, 1.25] }, 'back'); tw('.g-app .appup', W('b2', 2), 0.25, { x: [8, -6], y: [4, -4] }, 'out');
    tw('.g-pop', W('b2', 4) - 0.05, 0.06, { o: [0, 1] }, 'lin'); tw('.g-pop', W('b2', 4) - 0.05, 0.4, { y: [-300, 0], r: [40, 0] }, 'back'); sfx('pop', W('b2', 4), 0.5);
    idle('.g-app', t => t > W('b2', 5) ? { r: 6 * Math.sin((t - W('b2', 5)) * 9), y: -6 * Math.abs(Math.sin((t - W('b2', 5)) * 9)) } : {});
    tw('.g-app .apbadge', W('b2', 6), 0.3, { s: [1, 1.5] }, 'back'); sfx('blip', W('b2', 6), 0.4);
    mascotPose('.g-m', W('b2', 3), 'shock'); mascotPose('.g-m', W('b2', 8), 'facepalm');
    tw('.g-m', W('b2', 1), 0.3, { y: [110, 100] }, 'out');
    focus('#G > .cam', W('b2', 2), 440, 600, 1.14, 1.3, 0.3, 0.5, 500, 640); }

  // ================= H: «в памятке так и сказано: выключение помогает иногда, не всегда. Так байт или нет? Не байт.» =================
  tZoom('#G', '#H', tH, 0.5);
  hide('.h-q');
  tw('.h-memo', tH - 0.1, 0.5, { y: [-500, 0] }, 'out'); tw('.h-g', tH, 0.55, { y: [800, 0] }, 'out'); sfx('whoosh', tH, 0.4);
  tw('.h-memo .mmark', W('v1', 1), 0.4, { dash: [100, 0] }, 'out');
  [0, 1, 2, 3, 4, 5].forEach(k => tw('.h-memo .mline' + k, W('v1', 1) - 0.25 + k * 0.06, 0.25, { dash: [100, 0] }, 'out'));
  mascotPose('.h-m', W('v1', 1), 'pointUp');
  { const tn = W('v1', 6);   // the needle hunts, then falls into «ИНОГДА»; «не всегда»: the right zone dims
    tw('.h-g .gneedle', 0, 0.001, { r: [0, 0] });
    tw('.h-g .gneedle', tn - 0.1, 0.25, { r: [0, 30] }, 'inOut'); tw('.h-g .gneedle', tn + 0.15, 0.25, { r: [30, -15] }, 'inOut');
    tw('.h-g .gneedle', W('v1', 7) - 0.05, 0.4, { r: [-15, -55] }, 'back'); sfx('clink', W('v1', 7), 0.5);
    mascotPose('.h-m', W('v1', 7), 'pointL');
    tw('.h-g .gneedle', W('v1', 8), 0.18, { r: [-55, -45] }, 'out'); tw('.h-g .gneedle', W('v1', 8) + 0.18, 0.3, { r: [-45, -55] }, 'back');
    mascotPose('.h-m', W('v1', 9), 'shrug'); sfx('buzz', W('v1', 9), 0.3);
    focus('#H > .cam', W('v1', 7), 380, 900, 1.12, 0.9); }
  // «так байт или нет?»: the memo flies off, the mascot thinks
  tw('.h-memo', W('v2', 0), 0.4, { x: [0, -1100], r: [0, -14] }, 'in'); sfx('whoosh', W('v2', 0), 0.4);
  popIn('.h-q', W('v2', 1), 0.35); mascotPose('.h-m', W('v2', 1), 'think'); sfx('blip', W('v2', 1), 0.4);
  idle('.h-q', t => ({ r: t > W('v2', 1) ? 10 * Math.sin((t - W('v2', 1)) * 7) : 0 }));
  tw('.h-q', W('v2', 4) - 0.3, 0.2, { o: [1, 0] }, 'lin');
  const tSt = W('v2', 4) - 0.02;
  hide('#stampL .st');
  mascotPose('.h-m', tSt - 0.5, 'pointUp'); tw('.h-m', tSt - 0.45, 0.25, { y: [0, -90] }, 'out'); tw('.h-m', tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose('.h-m', tSt - 0.18, 'point', 0.18);
  stamp('#stampL .st', tSt, -7, 26); burst('.st-fx', 22, 540, 340, tSt + 0.05, 420, 61, 'conf', 140);
  mascotPose('.h-m', tSt + 0.35, 'cheer');

  // ================= I: «Выключение чистит стол. Полку — только ты: удаляй странные приложения.» =================
  tSlideUp('#H', '#I', tI, 0.55);
  hide('.i-brm');
  tw('.i-ph .shp2', 0, 0.001, { o: [0, 0] });
  { const tb = W('o1', 0) - 0.05;   // a broom with the power sign sweeps the table clean
    tw('.i-brm', tb, 0.06, { o: [0, 1] }, 'lin'); tw('.i-brm', tb, 0.3, { x: [-300, 0], r: [-40, 20] }, 'out');
    tw('.i-brm', tb + 0.35, 0.3, { x: [0, 120], r: [20, -30] }, 'inOut'); tw('.i-brm', tb + 0.65, 0.25, { x: [120, 0], r: [-30, 10] }, 'inOut');
    ['.tb1', '.tb2', '.tb3'].forEach((c, i) => { arc($$('.i-ph ' + c), tb + 0.4 + i * 0.06, 0.5, 240 + i * 60, 300, 120, 90); tw($$('.i-ph ' + c), tb + 0.75 + i * 0.06, 0.15, { o: [1, 0] }, 'lin'); });
    sfx('whoosh', tb + 0.35, 0.5); burst('#I .i-fx', 12, 330, 990, W('o1', 2), 200, 71, 'spark', 0, 0.5); sfx('ding', W('o1', 2), 0.4);
    tw('.i-brm', W('o1', 3) - 0.1, 0.3, { o: [1, 0], y: [0, 200] }, 'in');
    mascotPose('.i-m', W('o1', 1), 'pointL'); }
  { const tg = W('o1', 4);   // «полку — только ты»: the mascot reaches the shelf, takes the app, throws it into the bin
    mascotPose('.i-m', W('o1', 3), 'pointL'); tw('.i-m', W('o1', 3), 0.4, { x: [0, -60] }, 'out');
    tw('.i-app .appup', W('o1', 3), 0.2, { x: [0, 8] }, 'out'); tw('.i-app .apeye', W('o1', 5), 0.15, { sy: [1, 1.3] }, 'out');
    tw('.i-bin .tlid', W('o1', 5), 0.25, { r: [0, -70] }, 'back'); sfx('clink', W('o1', 5), 0.4);
    const tt = W('o1', 6) - 0.05;
    mascotPose('.i-m', tt, 'cheer'); tw('.i-m', tt, 0.3, { x: [-60, 0] }, 'out');
    arc('.i-app', tt, 0.55, 395, 470, 220, 300, 0.6); sfx('whoosh', tt, 0.5);
    tw('.i-app', tt + 0.5, 0.08, { o: [1, 0] }, 'lin');
    tw('.i-bin .tlid', tt + 0.55, 0.15, { r: [-70, 0] }, 'in'); sfx('slam', tt + 0.62, 0.5); shake(tt + 0.65, 0.2, 10);
    tw('.i-bin', tt + 0.62, 0.1, { sy: [1, 0.88] }, 'out'); tw('.i-bin', tt + 0.72, 0.3, { sy: [0.88, 1] }, 'back');
    burst('#I .i-fx', 10, 840, 960, tt + 0.62, 160, 81, 'spark', 0, 0.45);
    focus('#I > .cam', tg, 600, 760, 1.08, 0.8); }
  tw('#I .ph, #I .shd, #I .i-bin, #stampL .st', tLoop + 0.05, 0.3, { o: [1, 0] }, 'in');
  hide('#A2 .a-q'); loopTo('#A2', tLoop); tw('#I .i-m', tLoop + 0.42, 0.001, { o: [1, 0] });
}, { chunks: {} });
