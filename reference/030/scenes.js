// 030 «7 300 против 3 692. Кто продержится дольше?» — Новость (короткий формат, четверг). Стиль: ожидание / реальность.
// Забег двух телефонов: здоровяк с огромной батареей и малыш. Маскот — рассказчик и судья. Источник: тест CNET (32 телефона),
// 9to5Mac 11.11.2026. Свой мир (стадион на закате), параллакс, наезды, вид сверху, разрез, 3 склейки-превращения.
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
    const cols = ['#ffd34d', '#ff3b5c', '#43f0ff', '#7dff8a', '#ff5fa2'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.8, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.6, 0.25, { o: [1, 0] }, 'lin'); } };
  const ringAt = (par, x, y, t, sz = 110, col = '#fff') => { const r = mk(par, 'ring'); r.style.borderColor = col; place(r, x - sz / 2, y - sz / 2, sz, sz); hide(r);
    tw(r, t, 0.05, { o: [0, 1] }, 'lin'); tw(r, t, 0.45, { s: [0.4, 1.7] }, 'out'); tw(r, t + 0.25, 0.2, { o: [1, 0] }, 'lin'); };
  const BIG = '#ff5f6d', SM = '#2fd0ff';

  // ---------- world ----------
  $('#sun').innerHTML = sunSVG(); $('#clouds').innerHTML = cloudsSVG(); $('#stands').innerHTML = standsSVG(); $('#lights').innerHTML = lightsSVG();
  $('#track').innerHTML = trackSVG(); $('#near').innerHTML = nearSVG();
  $('#lanes').style.background = 'repeating-linear-gradient(90deg,rgba(255,255,255,.0) 0 300px,rgba(255,255,255,.18) 300px 312px)';
  dof('#stands', 3); dof('#clouds', 2); dof('#lights', 1.4);
  lookFX({ grain: 0.11, tint: 'transparent' });

  // ---------- props ----------
  const phone = (sel, id, col) => { $(sel).innerHTML = talkPhoneSVG(id, col); };
  phone('.a-big', 'ab', BIG); phone('.a-sm', 'as', SM);
  $('.b-big').innerHTML = xrayPhoneSVG('bb', '#ff8a6d'); $('.b-sm').innerHTML = xrayPhoneSVG('bs', SM);
  phone('.q-big', 'qb', BIG); phone('.q-sm', 'qs', SM); $('.q-sw').innerHTML = stopwatchSVG('q', '#ffd34d');
  $('.c-top').innerHTML = stadiumTopSVG();
  $('.t-tank').innerHTML = tankSVG('t'); $('.m-tank').innerHTML = tankSVG('m'); phone('.m-ph', 'mp', BIG);
  phone('.j-big', 'jb', BIG); phone('.j-sm', 'js', SM); $('.j-jug').innerHTML = jugSVG('j'); $('.j-cup').innerHTML = cupSVG('j');
  $('.r-fin').innerHTML = finishSVG(); $('.r-pod').innerHTML = podiumSVG('r'); phone('.r-big', 'rb', BIG); phone('.r-sm', 'rs', SM);
  phone('.v-big', 'vb', BIG); phone('.v-sm', 'vs', SM); $('.v-g').innerHTML = gaugeSVG('v', '', '', '#7dff8a', '#ff3b5c');
  $$('.mm').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  // loop clone = A's frame-0 pose (own gradient ids)
  $('#A2').innerHTML = $('#A').innerHTML; $('#A2 .a-big').innerHTML = talkPhoneSVG('a2b', BIG); $('#A2 .a-sm').innerHTML = talkPhoneSVG('a2s', SM); $('#A2 .a-m').innerHTML = mascotSVG('a2m');
  mascotLife(); mascotTalk();
  // phone characters: blink, idle breathing (they never talk: the mascot narrates)
  $$('.keye').forEach((e, i) => { const P = TOTAL / 8, ph = hash(i * 2.3) * P; idle(e, t => { if (t < 0.6 || t > TOTAL - 0.8) return {}; const u = (t + ph) % P; return { sy: u < 0.16 ? 1 - 0.9 * Math.sin(Math.PI * u / 0.16) : 1 }; }); });
  $$('.ph').forEach((el, i) => idle(el, t => ({ y: 5 * Math.sin(W2 * 12 * t + i), r: 0.8 * Math.sin(W2 * 6 * t + i * 2) })));
  $$('.ph .klegL, .ph .klegR').forEach((g, j) => idle(g, t => ({ r: 3 * Math.sin(W2 * 10 * t + j * Math.PI) })));

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('b1'), tQ = cut('q1'), tC = cut('c1'), tT = cut('t1'), tM = cut('t2'), tJ = cut('j1'), tR = cut('r1'), tV = cut('v1'), tLoop = TOTAL - 0.72;
  const CUTS = [0, tB, tQ, tC, tT, tM, tJ, tR, tV], IDS = ['#A', '#B', '#Q', '#C', '#T', '#M', '#J', '#R', '#V'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 200 * easeIO((t - c + 0.35) / 0.7); }); x -= 1600 * easeIO((t - tLoop) / 0.6); return x; };
  custom(t => {
    const x = camX(t);
    $('#sun').style.transform = `translate(${(-x * 0.02).toFixed(1)}px,${(6 * Math.sin(W2 * 2 * t)).toFixed(1)}px)`;
    $('#clouds').style.transform = `translate(${(-(x * 0.08 + t * 8)).toFixed(1)}px,0)`;
    $('#stands').style.transform = `translate(${(-x * 0.25).toFixed(1)}px,0)`;
    $('#lights').style.transform = `translate(${(-x * 0.5).toFixed(1)}px,0)`;
    $('#lanes').style.transform = `translate(${(-(x * 1.0) % 312).toFixed(1)}px,0)`;
    $('#near').style.transform = `translate(${(-x * 0.95).toFixed(1)}px,0)`;
  });
  grade(0, 'transparent'); grade(tB, 'rgba(67,240,255,.16)'); grade(tQ, 'rgba(255,95,162,.14)'); grade(tC, 'rgba(255,200,90,.12)');
  grade(tT, 'rgba(67,240,255,.14)'); grade(tM, 'rgba(150,90,255,.16)'); grade(tJ, 'rgba(255,120,60,.24)'); grade(tR, 'rgba(255,211,77,.16)'); grade(tV, 'rgba(255,59,92,.14)'); grade(tLoop + 0.3, 'transparent');
  $$('.mm').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2')) idle(m, t => ({ y: 6 * Math.sin(W2 * 16 * t + i), r: 1.4 * Math.sin(W2 * 8 * t + i) })); });

  // ================= A: hook — «7 300 против почти 3 700», two phones on the start line =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  punch('#A .a-n1', W('hook', 0) + 0.05, 0.12); sfx('ding', W('hook', 0) + 0.1, 0.35);
  punch('#A .a-vs', W('hook', 1), 0.2); sfx('pop', W('hook', 1), 0.5); tw('#A .a-vs', W('hook', 1), 0.4, { r: [0, -8] }, 'back');
  punch('#A .a-n2', W('hook', 3), 0.14); sfx('ding', W('hook', 3), 0.3);
  // the big one flexes, the small one looks up at it
  tw('#A .a-big .karmL', 0.3, 0.4, { r: [0, 50] }, 'back'); tw('#A .a-big .karmR', 0.3, 0.4, { r: [0, -50] }, 'back');
  tw('#A .a-big .kbrow', 0.3, 0.3, { y: [0, -8] }, 'back');
  tw('#A .a-sm .kpup', W('hook', 2), 0.3, { x: [0, -10], y: [0, -8] }, 'out');
  tw('#A .a-sm .karmL', W('hook', 3), 0.35, { r: [0, 40] }, 'back');
  jump('#A .a-sm', W('hook', 3) - 0.05, 40, 0.38, '#A .a-shd2');
  mascotPose('#A .a-m', 0.25, 'pointL'); mascotPose('#A .a-m', W('hook', 3), 'point'); mascotPose('#A .a-m', W('hook', 3) + 0.7, 'shrug');

  // ================= B: cutaway — «Это батареи двух телефонов: первая почти вдвое больше» =================
  tZoom('#A', '#B', tB);
  hide('.b-x2');
  tw('.b-big .xbat', W('b1', 1) - 0.05, 0.9, { sy: [0, 1] }, 'out'); tw('.b-sm .xbat', W('b1', 1) + 0.1, 0.6, { sy: [0, 1] }, 'out');
  sfx('riser2', W('b1', 1) - 0.1, 0.5); sfx('blip', W('b1', 1) + 0.6, 0.4);
  tw('.b-big .xglow', W('b1', 4), 0.2, { o: [0, 1] }, 'lin'); punch('.b-big', W('b1', 4), 0.07); sfx('zap', W('b1', 4), 0.4);
  popIn('.b-x2', W('b1', 5) - 0.05, 0.4); punch('.b-x2', W('b1', 6), 0.12); sfx('ding', W('b1', 6), 0.4);
  // ruler between them: two stacked small batteries = one big
  const gh = mk('#B .cam', 'ghost', xrayPhoneSVG('bg', SM)); place(gh, 520, 530, 276, 515); hide(gh);
  tw(gh, W('b1', 6), 0.05, { o: [0, 0.45] }, 'lin'); tw(gh, W('b1', 6), 0.5, { y: [0, -380] }, 'out');
  mascotPose('.b-m', W('b1', 0), 'pointL'); mascotPose('.b-m', W('b1', 4), 'shock'); mascotPose('.b-m', W('b1', 6) + 0.1, 'pointUp');
  focus('#B > .cam', W('b1', 4), 260, 650, 1.1, 0.6);

  // ================= Q: «Кто продержится дольше?» — the two glare, a stopwatch drops =================
  tWhip('#B', '#Q', tQ);
  hide('.q-sw');
  tw('.q-big .kpup', W('q1', 0), 0.3, { x: [0, 12] }, 'out'); tw('.q-sm .kpup', W('q1', 0), 0.3, { x: [0, -12] }, 'out');
  tw('.q-big .kbrow', W('q1', 0), 0.3, { y: [0, 10] }, 'back'); tw('.q-sm .kbrow', W('q1', 0), 0.3, { y: [0, 10] }, 'back');
  tw('.q-sw', W('q1', 1), 0.05, { o: [0, 1] }, 'lin'); tw('.q-sw', W('q1', 1), 0.45, { y: [-700, 0] }, 'back'); sfx('whoosh', W('q1', 1), 0.4); sfx('thud', W('q1', 1) + 0.4, 0.5);
  tw('.q-sw .swhand', W('q1', 2), 1.2, { r: [0, 720] }, 'lin'); for (let k = 0; k < 6; k++) sfx('tick', W('q1', 2) + k * 0.2, 0.35);
  // spark line between their eyes
  const zz = mk('#Q .cam', 'zz', `<svg viewBox="0 0 1080 1920" style="width:1080px;height:1920px"><path pathLength="100" d="M300 680 L380 640 L420 700 L500 650 L560 710 L640 660 L700 720 L770 790" fill="none" stroke="#ffe14d" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" style="stroke-dasharray:100;stroke-dashoffset:100"/></svg>`);
  place(zz, 0, 0); tw('.zz path', W('q1', 1) - 0.1, 0.3, { dash: [100, 0] }, 'out'); sfx('zap', W('q1', 1) - 0.1, 0.4);
  for (let k = 0; k < 2; k++) { const q = mk('#Q .cam', 'qm'); q.textContent = '?'; place(q, 200 + k * 600, 280 + k * 60); hide(q); popIn(q, W('q1', 2) + k * 0.12, 0.3); sfx('pop', W('q1', 2) + k * 0.12, 0.3); }
  mascotPose('.q-m', W('q1', 0), 'think'); mascotPose('.q-m', W('q1', 2), 'shrug');

  // ================= C: top view — «Техносайт CNET устроил телефонам забег: видео, звонки, игры» =================
  tCircle('#Q', '#C', tC, 540, 760);
  hide('.c-chip');
  slideIn('.c-chip', W('c1', 0), 'left', 0.6, 500); sfx('whoosh', W('c1', 0), 0.4);
  tw('#C > .cam', tC - 0.1, 0.9, { s: [1.25, 1] }, 'out');   // pull back to the whole stadium (scale shot)
  const OX = 540, OY = 740, t0r = W('c1', 3), w = 2 * Math.PI * 0.85 / (tT - t0r);
  const ang = t => Math.PI + w * Math.max(0, Math.min(tT + 0.4, t) - t0r);
  const runners = [[BIG, 428, 'c1'], [SM, 348, 'c2']].map(([col, R, id], k) => { const r = mk('#C .cam', 'c-run', talkPhoneSVG(id, col)); return { el: r, R, k }; });
  const SIGNS = [['play', '#ff3b5c'], ['call', '#7dff8a'], ['game', '#9b7bff']].map(([kd, col], k) => {
    const tk = W('c1', 5 + k), a = ang(tk + 0.55), s = mk('#C .cam', 'c-sg', signSVG(kd, col));
    place(s, OX + 392 * Math.cos(a) - 75, OY + 292 * Math.sin(a) - 140); hide(s); popIn(s, tk - 0.05, 0.35); sfx('pop', tk, 0.5); return { tk };
  });
  custom(t => runners.forEach(({ el, R, k }) => {
    const a = ang(t), x = OX + R * Math.cos(a), y = OY + R * 0.714 * Math.sin(a);
    let hop = 0; SIGNS.forEach(({ tk }) => { const u = (t - tk - 0.4) / 0.35; if (u > 0 && u < 1) hop = Math.max(hop, 60 * Math.sin(Math.PI * u)); });
    el.style.transform = `translate(${(x - 60).toFixed(1)}px,${(y - 214 - hop + 4 * Math.sin(t * 30 + k)).toFixed(1)}px) rotate(${(6 * Math.sin(t * 15 + k)).toFixed(2)}deg)`;
  }));
  $$('.c-run .klegL').forEach(g => idle(g, t => ({ r: t > t0r ? 28 * Math.sin(t * 18) : 0 }))); $$('.c-run .klegR').forEach(g => idle(g, t => ({ r: t > t0r ? -28 * Math.sin(t * 18) : 0 })));
  $$('.c-run .karmL').forEach(g => idle(g, t => ({ r: t > t0r ? -30 * Math.sin(t * 18) : 0 }))); $$('.c-run .karmR').forEach(g => idle(g, t => ({ r: t > t0r ? 30 * Math.sin(t * 18) : 0 })));
  sfx('blip', t0r, 0.6); sfx('blip', t0r + 0.15, 0.6); ringAt('#C .cam', 135, 740, t0r, 140, '#ffd34d');
  mascotPose('.c-m', W('c1', 0), 'wave'); mascotPose('.c-m', t0r, 'pointUp'); mascotPose('.c-m', W('c1', 6), 'cheer');
  jump('.c-m', t0r, 50, 0.4);

  // ================= T: close-up — «Ёмкость — это бак: сколько энергии влезло» =================
  tZoom('#C', '#T', tT);
  hide('.t-chip');
  slideIn('.t-chip', W('t1', 0), 'left', 0.6, 500); sfx('whoosh', W('t1', 0), 0.4);
  tw('.t-tank .tfill', 0, 0.001, { sy: [0, 0] });
  punch('.t-tank', W('t1', 2), 0.08); sfx('clink', W('t1', 2), 0.5);
  tw('.t-tank .tcap', W('t1', 2) + 0.1, 0.35, { r: [0, -70] }, 'back'); sfx('pop', W('t1', 2) + 0.15, 0.4);
  tw('.t-tank .tfill', W('t1', 3), 1.3, { sy: [0, 1] }, 'inOut'); sfx('riser', W('t1', 3), 0.6);
  // energy pours in: glowing bolts fall into the open cap
  for (let k = 0; k < 9; k++) { const b = mk('#T .cam', 'drop'); place(b, 650 + 30 * hash(k), 140); hide(b); const tk = W('t1', 3) + k * 0.13;
    tw(b, tk, 0.05, { o: [0, 1] }, 'lin'); tw(b, tk, 0.4, { y: [0, 260] }, 'in'); tw(b, tk + 0.36, 0.06, { o: [1, 0] }, 'lin'); if (k % 3 === 0) sfx('pop', tk + 0.38, 0.25); }
  tw('.t-tank .tcap', W('t1', 5) + 0.4, 0.3, { r: [-70, 0] }, 'back'); sfx('clink', W('t1', 5) + 0.6, 0.4);
  mascotPose('.t-m', W('t1', 0), 'point'); mascotPose('.t-m', W('t1', 3), 'hold'); mascotPose('.t-m', W('t1', 5), 'cheer');
  focus('#T > .cam', W('t1', 2), 540, 700, 1.1, 0.5);

  // ================= M: «А как быстро пустеет, решает мотор: экран, процессор, система» =================
  morphCut('#T', '#M', tM, '.t-tank', '.m-tank', 0.6, 0);
  hide('.m-chip');
  const pipe = `<svg viewBox="0 0 1080 1400" style="width:1080px;height:1400px;overflow:visible"><path class="pp0" pathLength="100" d="M330 880 Q400 990 520 940" fill="none" stroke="#0a130d" stroke-width="34" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/><path class="pp1" pathLength="100" d="M330 880 Q400 990 520 940" fill="none" stroke="#43f0ff" stroke-width="18" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/></svg>`;
  $('.m-pipe').innerHTML = pipe; tw('.m-pipe .pp0, .m-pipe .pp1', W('t2', 0) - 0.05, 0.4, { dash: [100, 0] }, 'out');
  tw('.m-tank .tfill', 0, 0.001, { sy: [1, 1] }); tw('.m-tank .tfill', W('t2', 3), L('t2').t1 - W('t2', 3) + 0.2, { sy: [1, 0.3] }, 'inOut');
  sfx('glitch', W('t2', 3), 0.3);
  // glowing drops travel along the pipe into the phone
  for (let k = 0; k < 10; k++) { const d = mk('#M .cam', 'drop'); place(d, 318, 864); d.style.width = d.style.height = '28px'; d.style.borderRadius = '50%'; hide(d); const tk = W('t2', 2) + k * 0.33;
    tw(d, tk, 0.05, { o: [0, 1] }, 'lin'); idle(d, t => { if (t < tk) return {}; const u = clamp((t - tk) / 0.5); return { x: 190 * u, y: 120 * u * (1 - u) * 2 + 60 * u }; }); tw(d, tk + 0.48, 0.05, { o: [1, 0] }, 'lin'); }
  tw('.m-ph .pscr', W('t2', 3), 0.3, { o: [0, 0.8] }, 'lin');
  slideIn('.m-chip', W('t2', 5) - 0.05, 'right', 0.55, 500); sfx('whoosh', W('t2', 5) - 0.05, 0.4);
  const ICS = [['screen', '#ffd34d', 800, 330], ['cpu', '#43f0ff', 800, 570], ['gear', '#ff5fa2', 800, 810]].map(([kd, col, x, y], k) => {
    const ic = mk('#M .cam', 'm-ic', iconSVG(kd, col)); place(ic, x - 100, y - 100); hide(ic); const tk = W('t2', 6 + k) - 0.05;
    tw(ic, tk, 0.06, { o: [0, 1] }, 'lin'); tw(ic, tk, 0.45, { x: [300, 0], r: [30, 0] }, 'back'); sfx('pop', tk + 0.1, 0.5);
    tw(ic.querySelector('.icspin'), tk + 0.2, L('t2').t1 + 0.6 - tk, { r: [0, 540] }, 'lin');
    return ic; });
  // the phone's arms reach out to the motor parts
  tw('.m-ph .karmR', W('t2', 6), 0.35, { r: [0, -60] }, 'back');
  mascotPose('.m-m', W('t2', 0), 'think'); mascotPose('.m-m', W('t2', 5), 'pointUp'); mascotPose('.m-m', W('t2', 7), 'point');
  focus('#M > .cam', W('t2', 7), 700, 600, 1.07, 0.5);

  // ================= J: joke — «Телефон с большим баком пьёт как не в себя. Маленький — по глоточку» =================
  morphCut('#M', '#J', tJ, '.m-tank', '.j-jug', 0.6, 0);
  tw('.j-jug .jstraw', 0, 0.001, { o: [0, 0] });
  const straw = mk('#J .cam', 'jstraw2', `<svg viewBox="0 0 1080 1400" style="width:1080px;height:1400px;overflow:visible"><path pathLength="100" d="M590 1080 L590 700 Q590 630 520 650 L250 800" fill="none" stroke="#0a130d" stroke-width="30" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/><path pathLength="100" d="M590 1080 L590 700 Q590 630 520 650 L250 800" fill="none" stroke="#ff5fa2" stroke-width="16" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/></svg>`);
  place(straw, 0, 0); tw('.jstraw2 path', W('j1', 0), 0.4, { dash: [100, 0] }, 'out'); sfx('whoosh', W('j1', 0), 0.3);
  tw('.j-big .kmouth', W('j1', 4) - 0.05, 0.15, { sy: [0.12, 0.5] }, 'out');
  tw('.j-jug .jfill', W('j1', 4), we('j1', 8) - W('j1', 4) + 0.4, { sy: [1, 0.06] }, 'in');
  for (let k = 0; k < 7; k++) { sfx(k % 2 ? 'zap' : 'buzz', W('j1', 4) + k * 0.16, 0.22); }
  idle('.j-big', t => (t > W('j1', 4) && t < we('j1', 8) + 0.4) ? { sx: 1 + 0.03 * Math.sin(t * 40), x: 2 * Math.sin(t * 55) } : {});
  tw('.j-big .kbrow', W('j1', 4), 0.3, { y: [0, -12] }, 'back');
  tw('.j-big .kmouth', we('j1', 8) + 0.45, 0.2, { sy: [0.5, 0.12] }, 'out'); sfx('pop', we('j1', 8) + 0.45, 0.5);
  mascotPose('.j-m', W('j1', 0), 'pointL'); mascotPose('.j-m', W('j1', 4), 'shock');
  // small one: lifts the cup, pinky up, one tiny sip
  const cupT = W('j2', 1) - 0.2;
  tw('.j-cup', cupT, 0.45, { x: [0, 90], y: [0, -150], r: [0, -18] }, 'out');
  tw('.j-sm .karmL', cupT, 0.4, { r: [0, 40] }, 'back');
  tw('.j-sm .keye', cupT + 0.2, 0.3, { sy: [1, 0.25] }, 'out');
  sfx('tick', W('j2', 2), 0.6); sfx('pop', W('j2', 2) + 0.2, 0.25);
  tw('.j-cup', W('j2', 2) + 0.5, 0.35, { x: [90, 90], y: [-150, -140], r: [-18, -4] }, 'inOut');
  mascotPose('.j-m', W('j2', 0), 'cheer');
  focus('#J > .cam', W('j2', 1), 860, 960, 1.18, 0.6);
  focus('#J > .cam', W('j1', 5), 360, 760, 1.1, 0.4);

  // ================= R: «Итог забега: ничья. Оба делят второе место.» =================
  morphCut('#J', '#R', tR, '.j-big', '.r-big', 0.55, 0);
  hide('.r-tie'); hide('.r-src'); hide('.r-pod');
  tw('.r-sm', tR, 0.55, { x: [-700, 0] }, 'out'); sfx('whoosh', tR, 0.4);
  const fl = mk('#R .cam', 'flash'); hide(fl); tw(fl, W('r1', 2) - 0.05, 0.05, { o: [0, 0.85] }, 'lin'); tw(fl, W('r1', 2), 0.35, { o: [0.85, 0] }, 'lin'); sfx('clink', W('r1', 2) - 0.05, 0.6);
  stamp('.r-tie', W('r1', 2) + 0.05, -4, 14);
  slideIn('.r-pod', W('r1', 3) - 0.1, 'down', 0.5, 300); sfx('thud', W('r1', 4), 0.5);
  jump('.r-big', W('r1', 4), 70, 0.42); jump('.r-sm', W('r1', 4) + 0.06, 70, 0.42);
  tw('.r-big .karmR', W('r1', 5), 0.35, { r: [0, -110] }, 'back'); tw('.r-sm .karmL', W('r1', 5), 0.35, { r: [0, 110] }, 'back');
  burst('#R .cam', 20, 540, 600, W('r1', 5), 380, 21, 'conf', 160); sfx('ding', W('r1', 5), 0.4);
  slideIn('.r-src', W('r1', 5), 'left', 0.6, 600); sfx('whoosh', W('r1', 5), 0.35);
  mascotPose('.r-m', W('r1', 0), 'think'); mascotPose('.r-m', W('r1', 2), 'shock'); mascotPose('.r-m', W('r1', 5), 'cheer');
  focus('#R > .cam', W('r1', 2), 540, 650, 1.12, 0.6);

  // ================= V: «Вдвое больше батарея — вдвое дольше? БАЙТ.» + «Смотри не на размер бака, а на аппетит» =================
  tSlideUp('#R', '#V', tV);
  hide('.v-st'); hide('.v-chip'); hide('.v-g');
  punch('.v-big', W('v1', 1), 0.12); tw('.v-big .karmL', W('v1', 1), 0.35, { r: [0, 50] }, 'back'); tw('.v-big .karmR', W('v1', 1), 0.35, { r: [0, -50] }, 'back');
  tw('.v-sm .kpup', W('v1', 3), 0.3, { x: [0, -10] }, 'out');
  mascotPose('.v-m', W('v1', 0), 'think');
  const tSt = W('v1', 5) - 0.02;
  mascotPose('.v-m', tSt - 0.45, 'pointUp'); tw('.v-m', tSt - 0.42, 0.22, { y: [0, -90] }, 'out'); tw('.v-m', tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose('.v-m', tSt - 0.18, 'point', 0.18);
  stamp('.v-st', tSt, -7, 26); burst('.v-fx', 22, 540, 340, tSt + 0.05, 420, 61, 'conf', 140);
  tw('.v-big .karmL', tSt, 0.3, { r: [50, 0] }, 'out'); tw('.v-big .karmR', tSt, 0.3, { r: [-50, 0] }, 'out'); tw('.v-big .kbrow', tSt, 0.3, { y: [0, 10] }, 'back');
  // takeaway: the appetite gauge
  tw('.v-st', W('m1', 0) - 0.1, 0.35, { y: [0, -60], s: [1, 0.7] }, 'inOut');
  popIn('.v-g', W('m1', 0), 0.4); sfx('pop', W('m1', 0), 0.4);
  tw('.v-g .gneedle', 0, 0.001, { r: [-58, -58] }); tw('.v-g .gneedle', W('m1', 3), 0.5, { r: [-58, 58] }, 'back'); sfx('zap', W('m1', 3), 0.3);
  tw('.v-g .gneedle', W('m1', 5), 0.5, { r: [58, -40] }, 'back'); sfx('blip', W('m1', 7), 0.4);
  slideIn('.v-chip', W('m1', 0) + 0.3, 'down', 0.5, 300); sfx('whoosh', W('m1', 0) + 0.3, 0.3);
  mascotPose('.v-m', W('m1', 0), 'pointUp'); mascotPose('.v-m', W('m1', 5), 'cheer');
  tw('#V .v-st, #V .conf, #V .v-chip, #V .v-g, #V .v-big, #V .v-sm, #V .shd', tLoop - 0.35, 0.3, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw('#V .v-m', tLoop + 0.3, 0.001, { o: [1, 0] });
}, { noCaption: ['hook'] });
