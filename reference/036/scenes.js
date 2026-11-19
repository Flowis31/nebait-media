// 036 «Пароль из 13 букв. Сколько продержится?» — Новость (короткий формат, четверг). Стиль: история с героями.
// Робот-взломщик против замка с паролем skibiditoilet: перебор по букве — вечность, словарь — секунды. Маскот — рассказчик.
// Источник: NordPass, топ-200 паролей 2026 (17.11.2026). Свой мир: ночная библиотека (полки, лампы, пыль — параллакс).
TIMING.words.forEach(w => { w.d = w.d.replace(/\s—$/, ''); });
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
  const burst = (par, n, x, y, t, dist = 220, seed = 0, cls = 'spark', fall = 0) => {
    const cols = ['#ffd34d', '#ff3b5c', '#5fe0ff', '#7dff8a', '#ff5fd2'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.8, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.6, 0.25, { o: [1, 0] }, 'lin'); } };
  const ringAt = (par, x, y, t, sz = 110, col = '#fff') => { const r = mk(par, 'ring'); r.style.borderColor = col; place(r, x - sz / 2, y - sz / 2, sz, sz); hide(r);
    tw(r, t, 0.05, { o: [0, 1] }, 'lin'); tw(r, t, 0.45, { s: [0.4, 1.7] }, 'out'); tw(r, t + 0.25, 0.2, { o: [1, 0] }, 'lin'); };
  const ABC = 'abcdefghijklmnopqrstuvwxyz', PW = 'skibiditoilet';
  // a letter wheel shows: `a` before t0, cycles the alphabet from t0 (rate letters/s), stops on `fin` at t1
  const wheel = (txt, t0, t1, fin, rate = 30, start = 'a') => custom(t => {
    let c = start; if (t >= t1) c = fin; else if (t >= t0) c = ABC[(Math.floor((t - t0) * rate) + ABC.indexOf(start)) % 26];
    if (txt.textContent !== c) txt.textContent = c; });

  // ---------- world ----------
  $('#far').innerHTML = shelvesSVG(3400, 1400, 3, 0.62); $('#mid').innerHTML = shelvesSVG(3400, 1400, 11, 0.2).replace('<svg ', '<svg opacity="1" ');
  $('#lamps').innerHTML = lampsSVG(3400);
  // the mid layer: only two tall pillars of shelves at the frame edges (the middle stays free for the action)
  $('#mid').style.clipPath = 'polygon(0 0,880px 0,880px 100%,0 100%,0 0,2520px 0,3400px 0,3400px 100%,2520px 100%,2520px 0)';
  dof('#far', 3.5); dof('#mid', 1.2);
  for (let k = 0; k < 22; k++) { const m = mk('#motes', 'mote'); place(m, 60 + hash(k * 3.1) * 960, 200 + hash(k * 7.7) * 1100); const ph = hash(k) * 6.28, sp = 1 + (k % 3);
    idle(m, t => ({ x: 30 * Math.sin(W2 * sp * t + ph), y: -40 * Math.sin(W2 * (sp + 1) * t + ph * 2), s: 0.6 + 0.6 * hash(k + 2) })); }
  lookFX({ grain: 0.11, tint: 'transparent' });

  // ---------- props ----------
  $('.a-f').innerHTML = pwFieldSVG('a', PW); $('.a-lk').innerHTML = padlockSVG('a', '#ffd34d');
  $('.b-lk').innerHTML = padlockSVG('b', '#ffd34d'); $('.b-sw').innerHTML = stopwatchSVG('b', '#ff5f6d');
  $('.c-safe').innerHTML = safeSVG('c'); $('.c-mag').innerHTML = magnifierSVG('c');
  $('.d-lk').innerHTML = letterLockSVG('d', 'aaaaaaaaaaaaa'); $('.d-bot').innerHTML = botSVG('d', '#ff8a6d');
  $('.e-bot').innerHTML = botSVG('e', '#ff8a6d'); $('.e-beard').innerHTML = beardSVG(); $('.e-web').innerHTML = webSVG(); $('.e-sn').innerHTML = snailSVG('e');
  $('.f-shelf').innerHTML = shelvesSVG(900, 760, 21, 0); $('.f-book').innerHTML = dictBookSVG('f'); $('.f-open').innerHTML = bookSVG('f', '#c8323f'); $('.f-bot').innerHTML = botSVG('f', '#ff8a6d');
  $('.g-book').innerHTML = bookSVG('g', '#c8323f'); $('.g-hl').innerHTML = highlighterSVG('g'); $('.g-ck').innerHTML = checkSVG();
  $('.g-word').innerHTML = `<span style="position:static;font:800 48px/64px JB;color:#0a130d;text-shadow:0 0 6px #fff,0 0 3px #fff">${PW}</span>`;
  $('.h-lk').innerHTML = letterLockSVG('h', 'qwzxmrtyuopvn'); $('.h-sw').innerHTML = stopwatchSVG('h', '#7dff8a'); $('.h-bot').innerHTML = botSVG('h', '#ff8a6d');
  $('.h-tgt').innerHTML = [...PW].map((c, k) => `<span class="ht ht${k}" style="position:relative;display:inline-block;width:56px;margin:0 5px;text-align:center;background:#fff3c0;border:5px solid #0a130d;border-radius:12px;line-height:84px;letter-spacing:0;vertical-align:middle">${c}</span>`).join('');
  $('.i-f').innerHTML = pwFieldSVG('i', PW); $('.i-lk').innerHTML = padlockSVG('i', '#ffd34d');
  $('.j-f').innerHTML = pwFieldSVG('j', '•'.repeat(15), 'НАДЁЖНЫЙ ПАРОЛЬ', '#7dff8a'); $('.j-gb').innerHTML = gameBoxSVG('j', '#5fe0ff', '#3a5fd8', 'ИГРА', true, false);
  $$('.mm').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  // loop clone = A's frame-0 pose (own gradient ids)
  $('#A2').innerHTML = $('#A').innerHTML; $('#A2 .a-f').innerHTML = pwFieldSVG('a2', PW); $('#A2 .a-lk').innerHTML = padlockSVG('a2', '#ffd34d'); $('#A2 .a-m').innerHTML = mascotSVG('a2m');
  tw('#A2 .a-lk .shackle', 0, 0.001, { y: [-30, -30] });
  mascotLife(); mascotTalk();
  // robot: blink + idle
  $$('.beye').forEach((e, i) => { const P = TOTAL / 7, ph = hash(i * 2.3) * P; idle(e, t => { if (t < 0.6 || t > TOTAL - 0.8) return {}; const u = (t + ph) % P; return { sy: u < 0.16 ? 1 - 0.9 * Math.sin(Math.PI * u / 0.16) : 1 }; }); });
  $$('.bant').forEach((e, i) => idle(e, t => ({ r: 6 * Math.sin(W2 * 14 * t + i) })));
  $$('.d-bot, .f-bot, .h-bot').forEach((el, i) => idle(el, t => ({ y: 5 * Math.sin(W2 * 12 * t + i), r: 0.8 * Math.sin(W2 * 6 * t + i * 2) })));
  custom(t => $$('.pwcaret').forEach(c => { c.style.opacity = (Math.floor(t * 2.4) % 2) ? '0' : '1'; }));

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('q1'), tC = cut('c1'), tD = cut('m1'), tE = cut('m2'), tF = cut('m3'), tG = cut('m4'), tH = cut('r1'), tI = cut('v1'), tJ = cut('t1'), tLoop = TOTAL - 0.55;
  const CUTS = [0, tB, tC, tD, tE, tF, tG, tH, tI, tJ], IDS = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I', '#J'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { if (s === '#C') return; const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 210 * easeIO((t - c + 0.35) / 0.7); }); x -= 2100 * easeIO((t - tLoop) / 0.5); return x; };
  custom(t => {
    const x = camX(t);
    $('#far').style.transform = `translate(${(-x * 0.15).toFixed(1)}px,0)`;
    $('#lamps').style.transform = `translate(${(-x * 0.3).toFixed(1)}px,${(4 * Math.sin(W2 * 3 * t)).toFixed(1)}px)`;
    $('#mid').style.transform = `translate(${(-x * 0.6).toFixed(1)}px,0)`;
    $('#planks').style.transform = `translate(${(-(x * 0.9) % 242).toFixed(1)}px,0)`;
    $('#rug').style.transform = `translate(${(-x * 0.9 + 0).toFixed(1)}px,0)`;
  });
  grade(0, 'transparent'); grade(tB, 'rgba(255,184,77,.12)'); grade(tC, 'rgba(95,224,255,.14)'); grade(tD, 'rgba(255,120,60,.14)'); grade(tE, 'rgba(120,140,255,.26)');
  grade(tF, 'rgba(255,184,77,.16)'); grade(tG, 'rgba(255,225,77,.16)'); grade(tH, 'rgba(125,255,138,.14)'); grade(tI, 'rgba(255,59,92,.16)'); grade(tJ, 'rgba(95,224,255,.12)'); grade(tLoop + 0.3, 'transparent');
  $$('.mm').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2')) idle(m, t => ({ y: 6 * Math.sin(W2 * 16 * t + i), r: 1.4 * Math.sin(W2 * 8 * t + i) })); });

  // ================= A: hook — «Пароль из тринадцати букв: skibiditoilet» =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  punch('#A .a-t', W('hook', 2) + 0.05, 0.12); sfx('ding', W('hook', 2) + 0.1, 0.35);
  // the field counts its letters 1..13 (ticks pop under the characters)
  const tc0 = W('hook', 2) + 0.05;
  for (let k = 0; k < 13; k++) { const tk = mk('#A .cam', 'tick'); place(tk, 90 + 86 + k * 38.4 + 3, 676, 14, 14);
    hide(tk); const t = tc0 + k * 0.06; tw(tk, t, 0.05, { o: [0, 1] }, 'lin'); tw(tk, t, 0.3, { y: [20, 0] }, 'back'); if (k % 3 === 0) sfx('tick', t, 0.4);
    tw('#A .a-f .pwc' + k, t, 0.12, { y: [0, -14] }, 'out'); tw('#A .a-f .pwc' + k, t + 0.12, 0.3, { y: [-14, 0] }, 'back'); }
  // the padlock proudly snaps shut on the password
  tw('#A .a-lk .shackle', 0, 0.001, { y: [-30, -30] }); tw('#A .a-lk .shackle', W('hook', 4), 0.18, { y: [-30, 0] }, 'in'); sfx('clink', W('hook', 4) + 0.16, 0.6);
  punch('#A .a-lk', W('hook', 4) + 0.18, 0.12); punch('#A .a-f', W('hook', 4), 0.05);
  mascotPose('#A .a-m', 0.2, 'point'); mascotPose('#A .a-m', W('hook', 2), 'pointUp'); mascotPose('#A .a-m', W('hook', 4), 'cheer');
  jump('#A .a-m', W('hook', 4), 50, 0.42, '#A .a-shd2');

  // ================= B: close — «Длинный, значит, взламывать долго?» =================
  morphCut('#A', '#B', tB, '#A .a-lk', '.b-lk', 0.55, 0);
  hide('.b-sw');
  tw('.b-lk', W('q1', 0), 0.25, { sx: [1, 1.22], sy: [1, 0.9] }, 'out'); tw('.b-lk', W('q1', 0) + 0.3, 0.4, { sx: [1.22, 1], sy: [0.9, 1] }, 'back'); sfx('blip', W('q1', 0), 0.5);
  tw('.b-lk', W('q1', 2) - 0.05, 0.18, { r: [0, -6] }, 'out'); tw('.b-lk', W('q1', 2) + 0.15, 0.4, { r: [-6, 0] }, 'back');
  tw('.b-sw', W('q1', 3) - 0.1, 0.05, { o: [0, 1] }, 'lin'); tw('.b-sw', W('q1', 3) - 0.1, 0.45, { y: [-600, 0] }, 'back'); sfx('whoosh', W('q1', 3) - 0.1, 0.4); sfx('thud', W('q1', 3) + 0.3, 0.5);
  tw('.b-sw .swhand', W('q1', 3) + 0.2, 1.0, { r: [0, 360] }, 'lin');
  for (let k = 0; k < 2; k++) { const q = mk('#B .cam', 'qm'); q.textContent = '?'; place(q, 140 + k * 700, 320 + k * 300); hide(q); popIn(q, W('q1', 2) + k * 0.25, 0.3); sfx('pop', W('q1', 2) + k * 0.25, 0.3); }
  mascotPose('.b-m', W('q1', 0), 'think'); mascotPose('.b-m', W('q1', 3), 'shrug');
  focus('#B > .cam', W('q1', 0), 510, 650, 1.1, 0.6);

  // ================= C: wide — «Менеджер паролей NordPass разобрал пароли из утечек. И этот там есть.» =================
  tZoom('#B', '#C', tC);
  hide('.c-src'); hide('.c-mag');
  // camera starts on the safe and pulls back to the whole heap of leaked passwords (scale shot)
  tw('#C > .cam', tC - 0.1, 1.3, { s: [1.7, 1], x: [510, 0], y: [625, 0] }, 'inOut'); tw('#C > .cam', tC + 1.25, tD - tC - 0.9, { s: [1, 1.05] }, 'lin');
  tw('.c-safe .sdoor', 0, 0.001, { sx: [1, 1] }); tw('.c-safe .sdoor', W('c1', 0), 0.35, { sx: [1, 0.15] }, 'back'); sfx('clink', W('c1', 0) + 0.1, 0.5);
  // slips pour out of the safe and pile into a heap
  const heap = [], NS = 64;
  for (let k = 0; k < NS; k++) { const row = Math.floor(Math.sqrt(k * 1.7)), col = k - Math.floor(row * row / 1.7);
    const s = mk('#C .cam', 'slip'), fx = 120 + hash(k * 1.3) * 820, fy = 1210 - Math.min(9, row) * 44 - Math.abs(fx - 540) * -0.0 - hash(k * 2.9) * 30;
    const hy = 1210 - (1 - Math.abs(fx - 560) / 520) * 380 * (0.6 + 0.4 * hash(k * 5.1)); place(s, fx - 75, hy - 27); s.style.transform = 'none';
    hide(s); const tk = W('c1', 1) + k * 0.035, r0 = (hash(k * 3.3) - 0.5) * 80;
    tw(s, tk, 0.04, { o: [0, 1] }, 'lin'); tw(s, tk, 0.55, { x: [300 - fx, 0], y: [450 - hy, 0], r: [r0 * 3, r0] }, 'in'); heap.push(s); if (k % 8 === 0) sfx('pop', tk + 0.5, 0.2); }
  sfx('riser', W('c1', 1), 0.4);
  const hit = mk('#C .cam', 'c-hit'); hit.textContent = PW; place(hit, 540, 930); hide(hit); $('#C .cam').appendChild($('.c-mag'));
  tw(hit, W('c1', 4), 0.05, { o: [0, 1] }, 'lin'); tw(hit, W('c1', 4), 0.55, { x: [300 - 710, 0], y: [450 - 960, 0], r: [140, -4] }, 'in');
  slideIn('.c-src', W('c1', 2), 'left', 0.7, 600); sfx('whoosh', W('c1', 2), 0.4);
  // the magnifier sweeps the heap and stops on our password
  tw('.c-mag', W('c2', 0) - 0.5, 0.06, { o: [0, 1] }, 'lin');
  tw('.c-mag', W('c2', 0) - 0.5, 0.55, { x: [150, 330], y: [820, 760] }, 'inOut'); tw('.c-mag', W('c2', 0) + 0.05, 0.5, { x: [330, 600], y: [760, 840] }, 'inOut');
  tw('.c-mag', W('c2', 2) - 0.05, 0.3, { x: [600, 590], y: [840, 820], s: [1, 1.15] }, 'back'); sfx('whoosh', W('c2', 0) - 0.5, 0.3);
  tw(hit, W('c2', 2), 0.35, { s: [1, 1.5], y: [0, -60], r: [-4, 0] }, 'back'); ringAt('#C .cam', 710, 900, W('c2', 2), 200, '#ffe14d'); sfx('ding', W('c2', 2), 0.5);
  mascotPose('.c-m', W('c1', 0), 'pointL'); mascotPose('.c-m', W('c1', 4), 'think'); mascotPose('.c-m', W('c2', 2), 'shock');
  jump('.c-m', W('c2', 2) + 0.05, 60, 0.4);
  focus('#C > .cam', W('c2', 3), 710, 880, 1.18, 0.4);

  // ================= D: «Как взламывают? Можно перебирать буквы по одной.» =================
  tWhip('#C', '#D', tD);
  hide('.d-chip');
  // the robot spins the wheels one by one: wheel 0 runs the whole alphabet, then wheel 1, then 2...
  const wl = k => $(`.d-lk .lwl${k}`);
  const tw0 = W('m1', 3) - 0.1;
  const wSeq = [[tw0, W('m1', 5) - 0.02], [W('m1', 5), W('m1', 6) + 0.25], [W('m1', 6) + 0.25, tE + 0.6]];
  wSeq.forEach(([a, b], k) => { wheel(wl(k), a, b, PW[k], 34); tw(`.d-lk .lw${k}`, a, 0.1, { sy: [1, 1.12] }, 'out'); tw(`.d-lk .lw${k}`, b, 0.25, { sy: [1.12, 1] }, 'back');
    for (let s = a; s < b - 0.05; s += 0.12) sfx('tick', s, 0.25); sfx('clink', b, 0.4); });
  tw('.d-bot .barmL', tw0 - 0.2, 0.3, { r: [0, 70] }, 'out');
  idle('.d-bot .barmL', t => (t > tw0 && t < tE + 0.6) ? { r: 10 * Math.sin(t * 28) } : {});
  tw('.d-bot .bpup', tw0, 0.3, { x: [0, -10], y: [0, -10] }, 'out');
  slideIn('.d-chip', W('m1', 2), 'left', 0.6, 500); sfx('whoosh', W('m1', 2), 0.35);
  mascotPose('.d-m', W('m1', 0), 'think'); mascotPose('.d-m', W('m1', 3), 'point'); mascotPose('.d-m', W('m1', 5), 'pointUp');
  focus('#D > .cam', W('m1', 5), 200, 790, 1.15, 0.6);

  // ================= E: joke — «Тринадцать букв так — очень долго.» (the robot grows a beard, days fly past, a snail overtakes) =================
  tCircle('#D', '#E', tE, 520, 600);
  hide('.e-n'); hide('.e-web');
  slideIn('.e-n', W('m2', 0) - 0.05, 'left', 0.6, 600); sfx('whoosh', W('m2', 0), 0.35);
  tw('.e-beard', 0, 0.001, { sy: [0.05, 0.05] }); tw('.e-beard', W('m2', 2), we('m2', 4) - W('m2', 2) + 0.3, { sy: [0.05, 1] }, 'inOut'); sfx('riser', W('m2', 2), 0.4);
  tw('.e-bot .beye', W('m2', 3), 0.4, { sy: [1, 0.35] }, 'out'); tw('.e-bot .bant', W('m2', 3), 0.5, { r: [0, 35] }, 'back'); tw('.e-bot .bhead', W('m2', 3), 0.5, { r: [0, -6] }, 'out');
  tw('.e-web', W('m2', 4) - 0.1, 0.3, { o: [0, 1], s: [0.3, 1] }, 'back'); sfx('pop', W('m2', 4), 0.3);
  for (let k = 0; k < 9; k++) { const c = mk('#E .cam', 'e-cal', calendarSVG('e' + k, 'ДЕНЬ', '', k % 2 ? '#ff5f6d' : '#5f8aff')); $('#E .cam').insertBefore(c, $('.e-bot')); place(c, 1100, 200 + hash(k * 4.1) * 760); hide(c);
    const tk = W('m2', 1) + k * 0.17; tw(c, tk, 0.03, { o: [0, 1] }, 'lin'); tw(c, tk, 0.7, { x: [0, -1400], y: [0, 120 * (hash(k) - 0.3)], r: [0, -200 - 200 * hash(k + 1)] }, 'lin'); if (k % 2 === 0) sfx('whoosh', tk, 0.15); }
  tw('.e-sn', W('m2', 2), tF - W('m2', 2) + 0.3, { x: [0, 800] }, 'lin');
  mascotPose('.e-m', W('m2', 0), 'think'); mascotPose('.e-m', W('m2', 3), 'facepalm');
  for (let k = 0; k < 3; k++) { const z = mk('#E .cam', 'zz'); z.textContent = 'z'; place(z, 760 + k * 50, 300 - k * 70); hide(z); const tk = W('m2', 3) + k * 0.2; tw(z, tk, 0.3, { o: [0, 1], y: [30, 0], s: [0.5, 1 + k * 0.2] }, 'back'); }
  focus('#E > .cam', W('m2', 3), 510, 640, 1.12, 0.6);

  // ================= F: wide library — «Но сначала программа открывает словарь: пароли из утечек, мемы, игры.» =================
  tSlideUp('#E', '#F', tF);
  hide('.f-open');
  tw('.f-bot .barmR', W('m3', 2), 0.35, { r: [0, -110] }, 'back'); jump('.f-bot', W('m3', 1), 40, 0.35);
  // the dictionary slides out of the shelf and lands on the floor, then opens
  tw('.f-book', W('m3', 2) + 0.1, 0.25, { x: [0, 30], r: [0, -10] }, 'out');
  tw('.f-book', W('m3', 3) - 0.1, 0.4, { x: [30, 0], y: [0, 300], r: [-10, 0] }, 'in'); sfx('thud', W('m3', 3) + 0.3, 0.6); shake(W('m3', 3) + 0.3, 0.25, 10);
  tw('.f-book .dcover', W('m3', 4), 0.18, { sx: [1, 0] }, 'in'); tw('.f-book', W('m3', 4) + 0.18, 0.001, { o: [1, 0] });
  tw('.f-open', W('m3', 4) + 0.15, 0.3, { o: [0, 1], sy: [0.2, 1], y: [80, 0] }, 'back'); sfx('whoosh', W('m3', 4), 0.4); burst('#F .cam', 14, 540, 820, W('m3', 4) + 0.2, 260, 5);
  [['ИЗ УТЕЧЕК', '#5fe0ff', 70, 270, 'm3', 7], ['МЕМЫ', '#ff5fd2', 690, 330, 'm3', 8], ['ИГРЫ', '#7dff8a', 380, 470, 'm3', 9]].forEach(([lb, c, x, y, k, i], j) => {
    const tc = mk('#F .cam', 'f-tab', tabCardSVG('f' + j, lb, c)); place(tc, x, y); hide(tc); const tk = W(k, i) - 0.1;
    tw(tc, tk, 0.05, { o: [0, 1] }, 'lin'); tw(tc, tk, 0.5, { x: [540 - x - 150, 0], y: [860 - y, 0], s: [0.3, 1], r: [(j - 1) * 40, (j - 1) * 4] }, 'back'); sfx('pop', tk + 0.1, 0.5); });
  mascotPose('.f-m', W('m3', 0), 'pointL'); mascotPose('.f-m', W('m3', 4), 'shock'); mascotPose('.f-m', W('m3', 7), 'pointUp'); mascotPose('.f-m', W('m3', 9), 'cheer');
  focus('#F > .cam', W('m3', 8), 760, 400, 1.08, 0.5);

  // ================= G: close page — «А скибиди туалет — мем. Он в словаре есть.» =================
  morphCut('#F', '#G', tG, '.f-open', '.g-book', 0.6, 0);
  hide('.g-band'); hide('.g-ck'); hide('.g-chip'); hide('.g-book .bkmark');
  slideIn('.g-chip', W('m4', 0), 'left', 0.6, 500); sfx('whoosh', W('m4', 0), 0.35);
  tw('.g-hl', W('m4', 1) - 0.2, 0.5, { y: [-700, 0], r: [-30, 20] }, 'out'); sfx('whoosh', W('m4', 1) - 0.2, 0.3);
  tw('.g-hl', W('m4', 2), 0.3, { x: [0, -330], y: [0, 10] }, 'inOut');
  tw('.g-band', W('m4', 2) + 0.05, 0.03, { o: [0, 0.9] }, 'lin'); tw('.g-band', W('m4', 2), 0.001, { sx: [0, 0] });
  tw('.g-hl', W('m4', 3) - 0.3, 0.6, { x: [-330, 60] }, 'inOut'); tw('.g-band', W('m4', 3) - 0.3, 0.6, { sx: [0, 1] }, 'inOut'); sfx('zap', W('m4', 3) - 0.3, 0.3);
  tw('.g-hl', W('m4', 4), 0.4, { y: [0, -700], r: [20, 50] }, 'in');
  punch('.g-word', W('m4', 3), 0.18); sfx('ding', W('m4', 3), 0.4);
  popIn('.g-ck', W('m4', 7) - 0.05, 0.35); tw('.g-ck .ckp', W('m4', 7), 0.3, { dash: [100, 0] }, 'out'); sfx('coin', W('m4', 7), 0.6);
  mascotPose('.g-m', W('m4', 0), 'pointUp'); mascotPose('.g-m', W('m4', 3), 'cheer'); mascotPose('.g-m', W('m4', 5), 'point');
  focus('#G > .cam', W('m4', 3), 770, 770, 1.2, 0.6);

  // ================= H: «NordPass пишет: такие пароли вскрывают за секунды.» =================
  morphCut('#G', '#H', tH, '.g-word', '.h-tgt', 0.55, 0);
  hide('.h-sec'); hide('.h-src');
  // letters drop into the wheels in a fast cascade
  const tdrop = tH + 0.35;
  for (let k = 0; k < 13; k++) { const tk = tdrop + 0.35 + k * 0.07;
    tw('.h-tgt .ht' + k, tk - 0.2, 0.22, { y: [0, 520] }, 'in'); tw('.h-tgt .ht' + k, tk, 0.05, { o: [1, 0] }, 'lin');
    wheel($(`.h-lk .lwl${k}`), tk - 0.25, tk + 0.08, PW[k], 40, 'qwzxmrtyuopvn'[k]);
    tw(`.h-lk .lw${k}`, tk + 0.08, 0.2, { sy: [1.15, 1] }, 'back'); if (k % 2 === 0) sfx('tick', tk + 0.08, 0.5); }
  const tOpen = W('r1', 4);
  tw('.h-lk .lglow', tOpen - 0.15, 0.2, { o: [0, 0.55] }, 'lin');
  tw('.h-lk .lshack', tOpen, 0.25, { y: [0, -90] }, 'back'); sfx('clink', tOpen, 0.7); sfx('ding', tOpen + 0.1, 0.4);
  burst('#H .cam', 18, 540, 470, tOpen + 0.05, 300, 9); shake(tOpen + 0.05, 0.25, 12);
  tw('.h-sw .swhand', tdrop, tOpen - tdrop, { r: [0, 24] }, 'lin');
  popIn('.h-sec', W('r1', 5) - 0.05, 0.4); punch('.h-sec', W('r1', 6) + 0.1, 0.1);
  slideIn('.h-src', W('r1', 1), 'right', 0.7, 700); sfx('whoosh', W('r1', 1), 0.35);
  tw('.h-bot .barmL', tOpen, 0.35, { r: [0, 110] }, 'back'); tw('.h-bot .barmR', tOpen, 0.35, { r: [0, -110] }, 'back'); jump('.h-bot', tOpen + 0.05, 60, 0.4);
  tw('.h-bot .bmouth', tOpen, 0.2, { sy: [0.25, 1] }, 'out');
  mascotPose('.h-m', W('r1', 0), 'point'); mascotPose('.h-m', tOpen, 'shock'); mascotPose('.h-m', W('r1', 6) + 0.2, 'facepalm');
  focus('#H > .cam', tOpen, 540, 740, 1.12, 0.6);

  // ================= I: «Длинный — значит, надёжный? БАЙТ.» =================
  tDrop('#H', '#I', tI);
  hide('.i-st'); hide('.i-strike');
  tw('.i-lk .shackle', 0, 0.001, { y: [0, 0] });
  tw('.i-f', W('v1', 0), 0.3, { sx: [1, 1.1] }, 'out'); tw('.i-f', W('v1', 1), 0.35, { sx: [1.1, 1] }, 'back'); sfx('blip', W('v1', 0), 0.4);
  punch('.i-lk', W('v1', 2), 0.12); sfx('pop', W('v1', 2), 0.4);
  mascotPose('.i-m', W('v1', 0), 'pointUp'); mascotPose('.i-m', W('v1', 2), 'think');
  const tSt = W('v1', 3) - 0.02;
  mascotPose('.i-m', tSt - 0.45, 'pointUp'); tw('.i-m', tSt - 0.42, 0.22, { y: [0, -90] }, 'out'); tw('.i-m', tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose('.i-m', tSt - 0.18, 'point', 0.18);
  stamp('.i-st', tSt, -7, 26); burst('.v-fx', 22, 540, 340, tSt + 0.05, 420, 61, 'conf', 140);
  tw('.i-strike', tSt + 0.1, 0.06, { o: [0, 1] }, 'lin'); tw('.i-strike', tSt + 0.1, 0.3, { sx: [0, 1] }, 'out'); sfx('zap', tSt + 0.12, 0.4);
  tw('.i-lk .shackle', tSt + 0.15, 0.25, { y: [0, -45] }, 'back'); tw('.i-lk', tSt + 0.15, 0.3, { r: [0, 12] }, 'back');
  mascotPose('.i-m', tSt + 0.4, 'shrug');

  // ================= J: «Надёжный — от пятнадцати знаков и не из мемов. А твой пароль — из любимой игры?» =================
  tWhip('#I', '#J', tJ, 0.46, -1);
  hide('.j-n'); hide('.j-meme'); hide('.j-x'); hide('.j-gb');
  for (let k = 0; k < 15; k++) { const t = W('t1', 1) + k * 0.05; tw('.j-f .pwc' + k, 0, 0.001, { o: [0, 0] }); tw('.j-f .pwc' + k, t, 0.15, { o: [0, 1], s: [0.2, 1] }, 'back'); if (k % 3 === 0) sfx('tick', t, 0.4); }
  tw('.j-f .pwcaret', 0, 0.001, { x: [0, 0] }); tw('.j-f .pwcaret', W('t1', 1), 0.75, { x: [-15 * 38.4, 0] }, 'lin');
  popIn('.j-n', W('t1', 2), 0.4); sfx('ding', W('t1', 2) + 0.05, 0.4);
  slideIn('.j-meme', W('t1', 5) - 0.05, 'right', 0.5, 500); sfx('whoosh', W('t1', 5), 0.3);
  tw('.j-x', W('t1', 7) - 0.05, 0.05, { o: [0, 1] }, 'lin'); tw('.j-x', W('t1', 7) - 0.05, 0.25, { sx: [0, 1], r: [0, -8] }, 'out'); sfx('zap', W('t1', 7), 0.4);
  tw('.j-meme, .j-x', W('qq', 0) - 0.2, 0.3, { o: [1, 0], x: [0, 300] }, 'in');
  tw('.j-gb', W('qq', 1), 0.05, { o: [0, 1] }, 'lin'); tw('.j-gb', W('qq', 1), 0.45, { y: [500, 0], r: [20, 0] }, 'back'); sfx('pop', W('qq', 2), 0.5);
  const qm = mk('#J .cam', 'qm'); qm.textContent = '?'; place(qm, 930, 740); hide(qm); popIn(qm, W('qq', 2), 0.3);
  tw('.j-gb .karmL', W('qq', 3), 0.3, { r: [0, 40] }, 'back');
  mascotPose('.j-m', W('t1', 0), 'pointUp'); mascotPose('.j-m', W('t1', 5), 'point'); mascotPose('.j-m', W('qq', 0), 'wave'); mascotPose('.j-m', W('qq', 3), 'point');
  focus('#J > .cam', W('t1', 2), 540, 560, 1.06, 0.5);
  tw('#J .j-f, #J .j-n, #J .j-gb, #J .qm, #J .shd', tLoop + 0.05, 0.3, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw('#J .j-m', tLoop + 0.3, 0.001, { o: [1, 0] });
}, { noCaption: ['hook'] });
