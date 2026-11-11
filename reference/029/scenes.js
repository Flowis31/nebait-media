// 029 «Смахиваешь 20 приложений на ночь. Батарее легче?» — Байт или не байт, монолог предмета: рассказывает само приложение
// (иконка с лицом), маскот молчит и действует — он хозяин телефона, который смахивает приложения.
// Источники: Apple Support «Close an app on your iPhone or iPod touch» (16.10.2026): закрывать стоит, только если приложение
// не отвечает; недавние приложения тратят ресурсы и заряд, только когда активны. Android Developers «App startup time» (23.10.2026):
// холодный старт — запуск с нуля после того, как система выгрузила приложение, работы больше, чем при других видах запуска.
// Свой мир: вечерняя спальня (небо за окнами — дальний слой, стена с окнами и гирляндой — средний, пол — ближний); утро в H и J.
boot(() => {
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
  const clamp = x => Math.max(0, Math.min(1, x));
  const place = (el, x, y, w, h) => { el.style.left = x + 'px'; el.style.top = y + 'px'; if (w) el.style.width = w + 'px'; if (h) el.style.height = h + 'px'; return el; };
  const easeIO = x => (x = clamp(x), x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const W = (k, i) => wt(k, i);
  const NS = 'http://www.w3.org/2000/svg';
  const jump = (el, t, h = 80, d = 0.5, shd = null) => {
    tw(el, t - 0.12, 0.12, { sy: [1, 0.86], sx: [1, 1.08] }, 'out');
    tw(el, t, d / 2, { y: [0, -h], sy: [0.86, 1.08], sx: [1.08, 0.95] }, 'out');
    tw(el, t + d / 2, d / 2, { y: [-h, 0], sy: [1.08, 1], sx: [0.95, 1] }, 'in');
    tw(el, t + d, 0.08, { sy: [1, 0.88], sx: [1, 1.1] }, 'out'); tw(el, t + d + 0.08, 0.3, { sy: [0.88, 1], sx: [1.1, 1] }, 'back');
    if (shd) { tw(shd, t, d / 2, { s: [1, 0.6], o: [1, 0.5] }, 'out'); tw(shd, t + d / 2, d / 2, { s: [0.6, 1], o: [0.5, 1] }, 'in'); }
  };
  // flight along an arc (no tweens on x/y of the element needed): dx, dy end offset, h arc height, rot end rotation
  const arc = (el, t, d, dx, dy, h, rot = 0, x0 = 0, y0 = 0) => idle(el, tt => { if (tt < t) return {}; const u = easeIO((tt - t) / d); return { x: x0 + (dx - x0) * u, y: y0 + (dy - y0) * u - 4 * h * u * (1 - u), r: rot * u }; });
  const burst = (par, n, x, y, t, dist = 220, seed = 0, cls = 'spark', fall = 0) => {
    const cols = ['#ffb84d', '#7df9ff', '#ff6fae', '#7dff8a', '#b38aff'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.7, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.5, 0.25, { o: [1, 0] }, 'lin'); } };
  const sub = (sel, cls) => $$(sel + ' .' + cls);

  // ---------- world ----------
  $('#skyN').innerHTML = skySVG('n', false); $('#skyM').innerHTML = skySVG('m', true);
  $('#wall').innerHTML = wallSVG('w'); $('#floor').innerHTML = floorSVG('f');
  dof('#sky', 2.5);
  lookFX({ grain: 0.11, tint: 'transparent' });

  // ---------- props ----------
  const AC0 = '#ffb84d', AC1 = '#ff5f6d';                       // the narrator app: orange-to-coral
  $$('.ap').forEach((el, i) => el.innerHTML = appCharSVG('ap' + i, AC0, AC1));
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  $('.a-ph').innerHTML = bigPhoneSVG('a');
  $('.b-cloud').innerHTML = cloudSVG('b'); $('.b-bat').innerHTML = batterySVG('b'); $('.b-fork').innerHTML = forkSVG('b');
  $('.c-cut').innerHTML = phoneCutawaySVG('c'); $('.d-book').innerHTML = bookSVG('d');
  $('.e-bat').innerHTML = batterySVG('e');
  $('.f-ph').innerHTML = bigPhoneSVG('f'); $('.f-card').innerHTML = appCardSVG('f', AC0, 0); $('.f-face').innerHTML = appIconSVG('f', AC0, AC1, true, false); $('.f-hand').innerHTML = handSVG('f');
  $('.g-cut').innerHTML = phoneCutawaySVG('g'); $('.g-bin').innerHTML = trashBinSVG('g', '#9a8cff');
  $('.h-ph').innerHTML = bigPhoneSVG('h'); $('.h-icon').innerHTML = appIconSVG('h', AC0, AC1, false, false); $('.h-hand').innerHTML = handSVG('h');
  $('.h-gear1').innerHTML = gearSVG('h1', '#ffd34d'); $('.h-gear2').innerHTML = gearSVG('h2', '#7df9ff'); $('.h-bat').innerHTML = batterySVG('h');
  $('.i-stairs').innerHTML = stairsSVG('i'); $('.i-step').innerHTML = stepSVG('i');
  $('.j-bed').innerHTML = bedSVG('j'); $('.j-sd').innerHTML = screwdriverSVG('j', '#ff7a3d');
  $('.k-bat').innerHTML = batterySVG('k');
  // the middle item of the memory table goes away: that is where the narrator sits
  ['.c-cut', '.g-cut'].forEach(s => { const t = $(s + ' .tb2'); if (t) t.style.display = 'none'; });

  // ---------- A: the app-switcher stack (built before the loop clone copies A) ----------
  const CARDS = [], NC = 7, cardCols = ['#5fb0ff', '#7dff8a', '#ff8ae0', '#b38aff', '#ffd34d', '#7df9ff', AC0];
  const cardPos = i => ({ x: 445 - i * 30 + (i % 2 ? 6 : -6), y: 640 - i * 22, s: 1 - i * 0.045, r: (i % 2 ? 2.5 : -2.5) * Math.min(1, i) });
  for (let i = NC - 1; i >= 0; i--) {           // i = depth: 0 is the front card. The narrator's card is the deepest one (i = NC-1)
    const c = mk('#A .a-cards', 'a-card'); const p = cardPos(i); place(c, p.x, p.y);
    c.innerHTML = appCardSVG('a' + i, cardCols[i], i);
    c.style.transform = `rotate(${p.r}deg) scale(${p.s})`;
    if (i === NC - 1) { const f = mk(c, 'a-meface'); place(f, 65, 150, 120, 120); f.innerHTML = appIconSVG('am', AC0, AC1, true, false); }
    CARDS[i] = c;
  }
  $('#A2').innerHTML = $('#A').innerHTML;
  $('#A2 .a-ph').innerHTML = bigPhoneSVG('a2'); $('#A2 .a-m').innerHTML = mascotSVG('a2m'); $('#A2 .a-app').innerHTML = appCharSVG('a2p', AC0, AC1);
  $$('#A2 .a-card').forEach((c, j) => { const i = NC - 1 - j; c.innerHTML = appCardSVG('a2' + i, cardCols[i], i); if (i === NC - 1) { const f = mk(c, 'a-meface'); place(f, 65, 150, 120, 120); f.innerHTML = appIconSVG('a2f', AC0, AC1, true, false); } });
  hide('#A2 .a-app');

  mascotLife(); mascotTalk();
  $$('.m').forEach(m => mascotQuiet(m, 0, TOTAL + 1));        // the app narrates; the mascot only acts
  // the narrator talks with the voice, blinks; every app instance shares the same mouth
  $$('.ap .kmouth').forEach(m => idle(m, t => ({ sy: 0.12 + 0.88 * Math.pow(clamp((venv(t) - 0.07) / 0.55), 0.8) })));
  $$('.ap .kbrow').forEach(b => idle(b, t => { const d = venv(t) - venv(t - 0.12); return { y: d > 0.18 ? -9 * Math.min(1, (d - 0.18) / 0.2) : 0 }; }));
  { const n = Math.max(1, Math.round(TOTAL / 3.1)), P = TOTAL / n;
    $$('.ap .keye').forEach((e, i) => idle(e, t => { if (t < 0.6 || t > TOTAL - 0.8) return {}; const u = (t + hash(i * 2.3) * P) % P; return { sy: u < 0.18 ? 1 - 0.9 * Math.sin(Math.PI * u / 0.18) : 1 }; })); }
  const POSE_EYES = new Map();
  const look = (sel, t, x, y, d = 0.25) => { const a = POSE_EYES.get(sel) || [0, 0]; POSE_EYES.set(sel, [x, y]); tw($$(sel + ' .kpup'), t, d, { x: [a[0], x], y: [a[1], y] }, 'out'); };
  const ARMS = new Map();
  const arms = (sel, t, l, r, d = 0.35) => { const a = ARMS.get(sel) || [0, 0]; ARMS.set(sel, [l, r]); tw(sub(sel, 'karmL'), t, d, { r: [a[0], l] }, 'back'); tw(sub(sel, 'karmR'), t, d, { r: [a[1], r] }, 'back'); };
  const walk = (sel, t0, t1) => { idle(sub(sel, 'klegL'), t => (t > t0 && t < t1) ? { r: 16 * Math.sin((t - t0) * 18) } : {}); idle(sub(sel, 'klegR'), t => (t > t0 && t < t1) ? { r: -16 * Math.sin((t - t0) * 18) } : {}); };
  const state = (sel, cls, t, on, d = 0.25) => tw(sub(sel, cls), t, d, { o: on ? [0, 1] : [1, 0] }, 'out');
  const stateNow = (sel, cls, on) => tw(sub(sel, cls), 0, 0.001, { o: [on ? 1 : 0, on ? 1 : 0] });

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('q1'), tC = cut('s1'), tD = cut('s2'), tE = cut('s3'), tF = cut('c1'), tG = W('c1', 5) - 0.1, tH = cut('c2'), tI = cut('c3'), tJ = cut('j1'), tK = cut('v1'), tLoop = TOTAL - 0.5;
  const CUTS = [0, tB, tC, tD, tE, tF, tG, tH, tI, tJ, tK], IDS = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I', '#J', '#K'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 220 * easeIO((t - c + 0.35) / 0.7); }); x -= 2200 * easeIO((t - tLoop) / 0.5); return x; };
  custom(t => {
    const x = camX(t);
    $('#sky').style.transform = `translate(${(-(x * 0.12 + t * 3) % 1200).toFixed(1)}px,0)`;
    $('#wall').style.transform = `translate(${(-(x * 0.4) % 1000).toFixed(1)}px,0)`;
    $('#floor').style.transform = `translate(${(-(x * 0.9) % 1600).toFixed(1)}px,0)`;
  });
  // morning outside the windows: H and I (the next morning), and inside the bed joke on «утром»
  hide('#skyM'); tw('#skyM', tH - 0.3, 0.6, { o: [0, 1] }, 'lin'); tw('#skyM', tJ - 0.2, 0.4, { o: [1, 0] }, 'lin');
  tw('#skyM', W('j1', 6) - 0.1, 0.4, { o: [0, 1] }, 'lin'); tw('#skyM', tK - 0.1, 0.5, { o: [1, 0] }, 'lin');
  // the floor belongs to the room scenes only; the close-ups (phone screens, the memory table) hide it
  custom(t => { const off = (t > tD - 0.1 && t < tE + 0.1) || (t > tF - 0.1 && t < tG + 0.15) || (t > tH - 0.1 && t < tI + 0.1); $('#floor').style.opacity = off ? 0 : 1; });
  grade(0, 'transparent'); grade(tB, 'rgba(179,138,255,.20)'); grade(tC, 'rgba(125,249,255,.10)'); grade(tD, 'rgba(95,108,255,.16)');
  grade(tE, 'rgba(255,184,77,.10)'); grade(tF, 'rgba(255,59,92,.10)'); grade(tG, 'rgba(255,59,92,.16)'); grade(tH, 'rgba(255,200,120,.18)');
  grade(tI, 'rgba(125,200,255,.20)'); grade(tJ, 'rgba(255,111,174,.16)'); grade(W('j1', 6) - 0.1, 'rgba(255,200,120,.18)'); grade(tK, 'rgba(255,59,92,.10)'); grade(tLoop + 0.3, 'transparent');
  $$('.m').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2') && !m.closest('#I')) idle(m, t => ({ y: 5 * Math.sin(W2 * 16 * t + i), r: 1.2 * Math.sin(W2 * 8 * t + i) })); });

  // ================= A: hook — «Каждый вечер ты смахиваешь двадцать приложений. Я — одно из них.» =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  hide('#A .a-app');
  { // the counter 20 -> 1 while the mascot flicks the cards away one by one
    const n = $('#A .a-n'), ts = W('hook', 3), te = W('hook', 6) - 0.15, flick = [];
    for (let k = 0; k < NC - 1; k++) flick.push(ts + (te - ts) * k / (NC - 1));
    flick.forEach((t, k) => {
      const c = CARDS[k], p = cardPos(k);
      tw(c, t, 0.34, { y: [0, -1250], x: [0, (k % 2 ? 160 : -160)], r: [p.r, p.r + (k % 2 ? 14 : -14)], s: [p.s, p.s * 0.9] }, 'in');
      sfx(k % 2 ? 'whoosh' : 'blip', t, 0.45);
      mascotPose('#A .a-m', t - 0.12, k % 2 ? 'point' : 'pointUp', 0.2);
      // the cards behind move forward one step
      for (let j = k + 1; j < NC; j++) { const a = cardPos(j - k), b = cardPos(j - k - 1);
        tw(CARDS[j], t + 0.1, 0.3, { x: [a.x - cardPos(j).x, b.x - cardPos(j).x], y: [a.y - cardPos(j).y, b.y - cardPos(j).y], s: [a.s, b.s], r: [a.r, b.r] }, 'out'); }
    });
    custom(t => { const p = clamp((t - ts + 0.05) / (te - ts + 0.15)); n.textContent = Math.max(1, Math.round(20 - 19 * Math.pow(p, 0.9))); });
    for (let k = 0; k < 6; k++) sfx('tick', ts + (te - ts) * (k + 0.5) / 6, 0.35);
    focus('#A > .cam', W('hook', 4), 540, 270, 1.12, 0.45, 0.25, 0.4, 540, 380);
    punch('#A .a-n', W('hook', 4), 0.1);
    // «Я — одно из них»: the last card is me — I jump out of it
    const tm = W('hook', 6) - 0.05;
    punch(CARDS[NC - 1], tm - 0.15, 0.08);
    tw('#A .a-app', tm, 0.06, { o: [0, 1] }, 'lin'); tw('#A .a-app', tm, 0.5, { y: [-60, 0], s: [0.3, 1] }, 'back'); sfx('pop', tm, 0.6);
    jump('#A .a-app', tm + 0.55, 50, 0.4);
    arms('#A .a-app', tm + 0.1, 40, -120); arms('#A .a-app', W('hook', 7), 70, 30);
    look('#A .a-app', W('hook', 7), -8, 0);
    burst('#A .a-fx', 12, 565, 820, tm + 0.05, 200, 3, 'conf');
    mascotPose('#A .a-m', tm + 0.05, 'shock'); mascotPose('#A .a-m', W('hook', 8), 'think'); }

  // ================= B: close-up — «Думаешь, в фоне я тайком ем батарею? Байт или не байт?» =================
  morphCut('#A', '#B', tB, '#A .a-app', '.b-app', 0.6);
  hide('.b-cloud'); hide('.b-fork'); hide('.b-c1'); hide('.b-c2');
  { tw('.b-cloud', W('q1', 0) - 0.05, 0.4, { o: [0, 1], s: [0.85, 1] }, 'out'); sfx('riser2', W('q1', 0) - 0.1, 0.35);
    mascotPose('.b-m', W('q1', 0), 'think'); look('.b-app', W('q1', 1), 8, -2);
    // «тайком»: tiptoe toward the battery, eyes sideways
    const tt = W('q1', 4); tw('.b-app', tt - 0.1, 0.45, { x: [0, 50], r: [0, 4] }, 'out'); walk('.b-app', tt - 0.1, tt + 0.4);
    look('.b-app', tt, 9, 0); arms('.b-app', tt, 30, -40);
    // «ем батарею»: the fork comes out and stabs; the charge goes down in three bites
    const te = W('q1', 5) - 0.05;
    tw('.b-fork', te, 0.06, { o: [0, 1] }, 'lin'); tw('.b-fork', te, 0.3, { y: [80, 0], r: [-30, 0] }, 'back');
    const fill = sub('.b-bat', 'bfill');
    [0, 1, 2].forEach(k => { const t = te + 0.18 + k * 0.26;
      tw('.b-fork', t, 0.1, { x: [0, 70], y: [0, 120], r: [0, 25] }, 'in'); tw('.b-fork', t + 0.1, 0.14, { x: [70, 0], y: [120, 0], r: [25, 0] }, 'out');
      tw(fill, t + 0.08, 0.12, { sx: [1 - 0.24 * k, 0.76 - 0.24 * k] }, 'out'); sfx('thud', t + 0.08, 0.5); punch('.b-bat', t + 0.08, 0.04);
      burst('#B .b-fx', 6, 690 + k * 60, 900, t + 0.1, 120, 7 + k, 'crumb', 90); });
    custom(t => { const f = fill[0]; if (f) f.setAttribute('fill', t > te + 0.7 ? '#ff5f6d' : t > te + 0.4 ? '#ffd34d' : '#7dff8a'); });
    focus('#B > .cam', W('q1', 6), 790, 900, 1.15, 0.5);
    mascotPose('.b-m', W('q1', 6), 'shock');
    // «Байт или не байт?» — the daydream pops, two chips come in
    const tq = W('q1', 7);
    tw('.b-cloud', tq - 0.05, 0.3, { s: [1, 1.12], o: [1, 0] }, 'in'); tw('.b-fork', tq - 0.05, 0.25, { o: [1, 0] }, 'lin');
    tw(fill, tq, 0.4, { sx: [0.28, 1] }, 'out'); custom(t => { if (t > tq) fill[0] && fill[0].setAttribute('fill', '#7dff8a'); });
    slideIn('.b-c1', tq - 0.05, 'left', 0.55, 420); sfx('whoosh', tq, 0.35); arms('.b-app', tq, 60, -10); look('.b-app', tq, -8, 6);
    slideIn('.b-c2', W('q1', 9) - 0.05, 'right', 0.55, 420); sfx('whoosh', W('q1', 9), 0.35); look('.b-app', W('q1', 9), 8, 6);
    mascotPose('.b-m', W('q1', 8), 'shrug'); }

  // ================= C: wide, a cut through the phone — «Вот ты вышел на главный экран. Что я делаю?» =================
  tZoom('#B', '#C', tC, 0.5);
  hide('.c-q'); hide('.c-chip');
  { const grid = $('.c-grid'), IC = [];
    const icCols = ['#5fb0ff', '#7dff8a', '#ff8ae0', '#b38aff', '#ffd34d', '#7df9ff', '#ff7a3d', AC0];
    for (let k = 0; k < 8; k++) { const d = mk(grid, 'ico'); place(d, 18 + (k % 4) * 112, 20 + Math.floor(k / 4) * 120, 86, 86);
      d.style.background = `linear-gradient(160deg,#fff 0%,${icCols[k]} 45%)`; hide(d); IC.push(d); }
    // the app is still on the screen, big; the mascot taps the phone
    tw('.c-app', 0, 0.001, { s: [1.5, 1.5] });
    mascotPose('.c-m', W('s1', 1), 'point'); tw('.c-m', W('s1', 1), 0.35, { x: [0, 40] }, 'out'); tw('.c-m', W('s1', 2) + 0.2, 0.4, { x: [40, 0] }, 'out');
    tw(sub('.c-cut', 'pdark'), W('s1', 2), 0.1, { o: [0, 0.6] }, 'out'); tw(sub('.c-cut', 'pdark'), W('s1', 2) + 0.12, 0.3, { o: [0.6, 0] }, 'lin'); sfx('blip', W('s1', 2), 0.6);
    IC.forEach((d, k) => { popIn(d, W('s1', 4) - 0.1 + k * 0.05, 0.3); });
    for (let k = 0; k < 4; k++) sfx('pop', W('s1', 4) - 0.1 + k * 0.1, 0.25);
    slideIn('.c-chip', W('s1', 4) - 0.1, 'left', 0.55, 420); sfx('whoosh', W('s1', 4), 0.3);
    // I shrink and walk down onto the memory table
    const tg = W('s1', 5) + 0.05;
    tw('.c-app', tg, 0.6, { s: [1.5, 1], y: [0, 409], x: [0, -12] }, 'inOut'); walk('.c-app', tg, tg + 0.6); sfx('whoosh', tg, 0.3);
    look('.c-app', tg, 0, 8);
    popIn('.c-q', W('s1', 6) - 0.05, 0.4); idle('.c-q', t => ({ r: t > W('s1', 6) ? 9 * Math.sin((t - W('s1', 6)) * 7) : 0 })); sfx('blip', W('s1', 6), 0.5);
    look('.c-app', W('s1', 6), -8, -4); look('.c-app', W('s1', 8), 8, -4); arms('.c-app', W('s1', 6), 60, -60);
    mascotPose('.c-m', W('s1', 6), 'shrug'); }

  // ================= D: close-up on the memory table — «Почти ничего: телефон держит меня в памяти на паузе, как закладку.» =================
  tCircle('#C', '#D', tD, 700, 920, 0.6);
  hide('.d-chip'); hide('.d-book');
  { mascotPose('.d-m', W('s2', 0), 'hold');
    // a yawn, the night cap, eyes close, Z's float up
    arms('.d-app', W('s2', 0), 120, -20, 0.4);
    state('.d-app', 'anap', W('s2', 0) + 0.1, true); tw(sub('.d-app', 'anap'), W('s2', 0) + 0.1, 0.4, { y: [-80, 0] }, 'back');
    state('.d-app', 'alid', W('s2', 1), true, 0.3); arms('.d-app', W('s2', 1) + 0.2, -10, 10, 0.5);
    state('.d-app', 'azz', W('s2', 1) + 0.25, true, 0.3); idle(sub('.d-app', 'azz'), t => t > W('s2', 1) ? { y: -14 * Math.sin((t - W('s2', 1)) * 3) } : {});
    sfx('riser2', W('s2', 1), 0.25);
    idle('.d-app', t => (t > W('s2', 1)) ? { sy: 1 + 0.025 * Math.sin((t - W('s2', 1)) * 4), y: -6 * Math.sin((t - W('s2', 1)) * 4) } : {});
    mascotPose('.d-m', W('s2', 2), 'point');
    slideIn('.d-chip', W('s2', 6) - 0.1, 'right', 0.55, 420); sfx('whoosh', W('s2', 6), 0.3);
    // «на паузе»: the pause badge pops over my head
    const tp = W('s2', 8) - 0.05;
    tw(sub('.d-app', 'apause'), tp, 0.05, { o: [0, 1] }, 'lin'); tw(sub('.d-app', 'apause'), tp, 0.4, { s: [0.2, 1] }, 'back'); sfx('blip', tp, 0.7);
    focus('#D > .cam', tp, 350, 520, 1.14, 0.45);
    mascotPose('.d-m', tp, 'pointL');
    // «как закладку»: a book slides onto the table, the ribbon drops in
    const tb = W('s2', 9) - 0.1;
    tw('.d-book', tb, 0.05, { o: [0, 1] }, 'lin'); tw('.d-book', tb, 0.5, { x: [500, 0], r: [10, 0] }, 'out'); sfx('whoosh', tb, 0.4);
    tw(sub('.d-book', 'bkmark'), tb + 0.3, 0.4, { y: [-160, 0] }, 'back'); sfx('ding', tb + 0.45, 0.4);
    mascotPose('.d-m', tb + 0.2, 'cheer');
    // the sleeping look is baked into the copy that flies to scene E
    ['alid', 'anap', 'azz', 'apause'].forEach(c => sub('.d-app', c).forEach(e => e.setAttribute('opacity', '1'))); }

  // ================= E: «Эппл так и пишет: недавние приложения тратят заряд, только когда активны.» =================
  morphCut('#D', '#E', tE, '.d-app', '.e-app', 0.6);
  hide('.e-pan');
  ['alid', 'anap', 'azz', 'apause'].forEach(c => stateNow('.e-app', c, true));
  { const svg = $('#E .e-wv'), p = document.createElementNS(NS, 'path');
    p.setAttribute('class', 'wv'); p.setAttribute('d', 'M540 500 C540 640 300 640 285 800'); p.setAttribute('stroke', '#ffe14d'); p.setAttribute('stroke-width', '12');
    p.setAttribute('stroke-dasharray', '18 18'); p.style.opacity = 0.35; svg.appendChild(p);
    const L0 = p.getTotalLength(), dots = [];
    for (let k = 0; k < 7; k++) { const d = mk('.e-dots', 'dotE'); dots.push(d); }
    const ta = W('s3', 8) - 0.05;                                  // «только когда активны»
    custom(t => { const on = t > ta + 0.1; p.style.opacity = on ? 0.95 : 0.35; p.style.strokeDashoffset = on ? (-(t - ta) * 260).toFixed(1) : 0;
      dots.forEach((d, k) => { if (!on) { d.style.opacity = 0; return; } const u = ((t - ta) * 0.9 + k / 7) % 1, q = p.getPointAtLength(u * L0);
        d.style.opacity = 1; d.style.transform = `translate(${(q.x - 13).toFixed(1)}px,${(q.y - 13).toFixed(1)}px)`; }); });
    slideIn('.e-pan', W('s3', 0) - 0.1, 'left', 0.6, 420); sfx('whoosh', W('s3', 0), 0.35);
    mascotPose('.e-m', W('s3', 0), 'pointL'); mascotPose('.e-m', W('s3', 4), 'think');
    // while I sleep the charge does not move: the battery just breathes
    punch('.e-bat', W('s3', 6), 0.05); sfx('tick', W('s3', 6), 0.5);
    // «только когда активны»: I wake up, jump, the charge flows to me
    ['alid', 'anap', 'azz', 'apause'].forEach(c => state('.e-app', c, ta, false, 0.2));
    tw(sub('.e-app', 'anap'), ta, 0.45, { y: [0, -160], x: [0, -60] }, 'out');
    jump('.e-app', W('s3', 10) - 0.05, 70, 0.45, '.e-shd1'); arms('.e-app', ta + 0.05, 150, -150); sfx('zap', ta + 0.1, 0.45);
    tw(sub('.e-bat', 'bfill'), ta + 0.2, 0.8, { sx: [1, 0.86] }, 'out');
    mascotPose('.e-m', ta, 'pointUp'); focus('#E > .cam', W('s3', 10), 420, 640, 1.1, 0.4);
    burst('#E .e-fx', 10, 285, 820, W('s3', 10), 160, 11, 'spark'); }

  // ================= F: close-up on the screen — «А теперь ты меня смахнул —» =================
  tWhip('#E', '#F', tF, 0.46);
  hide('.f-hand');
  { const th = W('c1', 1);
    tw('.f-hand', th - 0.2, 0.05, { o: [0, 1] }, 'lin'); tw('.f-hand', th - 0.2, 0.45, { y: [700, 0] }, 'out'); sfx('whoosh', th - 0.2, 0.3);
    tw($$('.f-face .apbrow'), th, 0.3, { y: [0, -8] }, 'out'); tw($$('.f-face .appup'), th, 0.25, { y: [0, 8] }, 'out');
    const ts = W('c1', 4) - 0.02;
    tw('.f-hand', ts - 0.05, 0.1, { y: [0, 14] }, 'out');
    tw('.f-hand', ts + 0.05, 0.36, { y: [14, -1150], x: [0, 60] }, 'in');
    tw('.f-card', ts + 0.08, 0.36, { y: [0, -1300], r: [0, -8], blur: [0, 6] }, 'in');
    tw('.f-face', ts + 0.08, 0.36, { y: [0, -1300], r: [0, -8], s: [1, 1.1] }, 'in');
    tw($$('.f-face .apmouth'), ts, 0.2, { sy: [1, -0.6] }, 'out');
    sfx('whoosh', ts + 0.05, 1.0);
    for (let k = 0; k < 8; k++) { const s = mk('.f-fx', 'spark'); place(s, 460 + hash(k) * 160, 900 + hash(k + 3) * 200); hide(s);
      tw(s, ts + 0.15 + k * 0.03, 0.05, { o: [0, 1] }, 'lin'); tw(s, ts + 0.15 + k * 0.03, 0.5, { y: [0, -500 - 200 * hash(k + 5)], s: [1, 0.3] }, 'out'); tw(s, ts + 0.45 + k * 0.03, 0.2, { o: [1, 0] }, 'lin'); } }

  // ================= G: medium, inside the phone — «и телефон выкинул меня из памяти» =================
  tDrop('#F', '#G', tG, 0.5);
  { mascotPose('.g-m', tG + 0.1, 'point'); look('.g-app', tG + 0.2, 8, 0); arms('.g-app', tG + 0.2, 20, -20);
    const tx = W('c1', 7) - 0.05;                                  // «выкинул»
    tw(sub('.g-bin', 'tlid'), tx - 0.1, 0.25, { r: [0, -70] }, 'out');
    tw('.g-app', tx - 0.1, 0.1, { sy: [1, 0.8] }, 'out');
    arc('.g-app', tx, 0.6, -405, 120, 330, -540); sfx('whoosh', tx, 0.7); arms('.g-app', tx, 160, -160, 0.2);
    tw('.g-app', tx + 0.5, 0.12, { s: [1, 0.5], o: [1, 0] }, 'in');
    tw(sub('.g-bin', 'tlid'), tx + 0.62, 0.2, { r: [-70, 0] }, 'in'); sfx('thud', tx + 0.62, 0.8); sfx('slam', tx + 0.66, 0.4);
    punch('.g-bin', tx + 0.64, 0.1); burst('#G .g-fx', 14, 130, 990, tx + 0.64, 200, 21, 'spark');
    shake(tx + 0.66, 0.25, 12);
    // the empty spot on the memory table blinks red
    const spot = mk('.g-fx', 'bar'); place(spot, 455, 1000, 170, 22); spot.style.background = '#ff3b5c'; hide(spot);
    tw(spot, W('c1', 10) - 0.1, 0.15, { o: [0, 1] }, 'lin'); idle(spot, t => t > W('c1', 10) ? { s: 1 + 0.08 * Math.sin((t - W('c1', 10)) * 16) } : {});
    mascotPose('.g-m', tx + 0.1, 'shock'); mascotPose('.g-m', W('c1', 10), 'facepalm'); }

  // ================= H: morning, close-up — «Утром жмёшь на иконку, и он собирает меня с нуля.» =================
  tSlideUp('#G', '#H', tH, 0.55);
  hide('.h-hand'); hide('.h-app'); hide('.h-prog'); hide('.h-gear1'); hide('.h-gear2');
  { const grid = $('.h-grid'), IC = [], icCols = ['#5fb0ff', '#7dff8a', '#ff8ae0', '#b38aff', '#ffd34d', '#7df9ff', '#ff7a3d', '#9a8cff', '#ff5f6d', '#7dff8a', '#5fb0ff', '#ffd34d'];
    let k = 0;
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { if (r === 2 && (c === 1 || c === 2)) continue;   // the gap for my icon
      const d = mk(grid, 'ico'); place(d, 220 + c * 170, 370 + r * 190, 130, 130); d.style.background = `linear-gradient(160deg,#fff 0%,${icCols[k % 12]} 45%)`; IC.push(d); k++; }
    $('.h-icon').style.left = '455px'; $('.h-icon').style.top = '740px'; $('.h-icon').style.width = '170px'; $('.h-icon').style.height = '170px';
    const tp = W('c2', 1) - 0.05;                                  // «жмёшь»
    tw('.h-hand', tp - 0.4, 0.05, { o: [0, 1] }, 'lin'); tw('.h-hand', tp - 0.4, 0.4, { y: [700, -110], x: [0, 30] }, 'out');
    tw('.h-icon', tp, 0.1, { s: [1, 0.86] }, 'out'); tw('.h-icon', tp + 0.12, 0.3, { s: [0.86, 1] }, 'back'); sfx('blip', tp, 0.7);
    const ring = mk('.h-fx', 'ico'); place(ring, 420, 705, 240, 240); ring.style.border = '10px solid #fff'; ring.style.background = 'transparent'; hide(ring);
    tw(ring, tp + 0.02, 0.4, { s: [0.7, 1.5], o: [1, 0] }, 'out');
    // «иконку»: the icon opens to fill the screen, the other icons fade back
    const to = W('c2', 3);
    tw('.h-icon', to, 0.35, { s: [1, 2.4], o: [1, 0] }, 'in'); tw(IC, to, 0.35, { o: [1, 0.15] }, 'lin'); sfx('whoosh', to, 0.4);
    tw('.h-hand', to + 0.05, 0.4, { y: [-110, 900] }, 'in');
    // «собирает меня с нуля»: blocks fly in and stack into my body, gears turn, the bar fills, the battery pays for it
    const tb = W('c2', 6) - 0.25, bricks = $('.h-bricks');
    tw('.h-gear1, .h-gear2', tb - 0.2, 0.3, { o: [0, 1], s: [0.4, 1] }, 'back');
    idle('.h-gear1', t => t > tb - 0.2 ? { r: (t - tb) * 260 } : {}); idle('.h-gear2', t => t > tb - 0.2 ? { r: -(t - tb) * 330 } : {});
    tw('.h-prog', tb - 0.2, 0.25, { o: [0, 1] }, 'lin'); tw($$('.h-prog i'), 0, 0.001, { sx: [0, 0] }); tw($$('.h-prog i'), tb, W('c2', 9) - tb, { sx: [0, 1] }, 'lin');
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { const b = mk(bricks, 'brick'), i = r * 3 + c;
      place(b, 396 + c * 96, 524 + r * 96, 96, 96); b.style.background = `linear-gradient(160deg,${AC0},${AC1})`; hide(b);
      const t = tb + i * 0.07, a = 2 * Math.PI * hash(i + 2);
      tw(b, t, 0.05, { o: [0, 1] }, 'lin'); tw(b, t, 0.32, { x: [Math.cos(a) * 520, 0], y: [Math.sin(a) * 520 - 200, 0], r: [200 * (hash(i) - 0.5), 0] }, 'out');
      sfx('clink', t + 0.25, 0.25); }
    tw(sub('.h-bat', 'bfill'), tb + 0.3, 0.5, { sx: [1, 0.78] }, 'out'); sfx('zap', tb + 0.3, 0.4); punch('.h-bat', tb + 0.3, 0.08);
    const tz = W('c2', 9) - 0.05;                                  // «нуля»: the finished me pops out of the blocks
    tw($$('.h-bricks .brick'), tz, 0.2, { o: [1, 0], s: [1, 1.2] }, 'lin');
    tw('.h-app', tz, 0.06, { o: [0, 1] }, 'lin'); tw('.h-app', tz, 0.45, { s: [0.7, 1] }, 'back'); sfx('ding', tz, 0.5);
    burst('#H .h-fx', 16, 540, 700, tz, 260, 31, 'conf'); arms('.h-app', tz, 150, -150);
    focus('#H > .cam', tz, 540, 700, 1.1, 0.35); }

  // ================= I: medium — «Гугл называет это холодным стартом: работы больше, чем после паузы.» =================
  morphCut('#H', '#I', tI, '.h-app', '.i-carry', 0.6);
  hide('.i-chip'); hide('.i-pan'); hide('.i-chip2'); hide('.i-hot');
  { slideIn('.i-pan', W('c3', 0) - 0.1, 'right', 0.6, 420); sfx('whoosh', W('c3', 0), 0.3);
    mascotPose('.i-m', tI + 0.1, 'hold'); arms('.i-carry', tI + 0.3, 40, -40); look('.i-carry', tI + 0.3, 8, -6);
    // snow over the staircase: it is a COLD start
    const tc = W('c3', 3) - 0.1;
    slideIn('.i-chip', tc, 'left', 0.55, 420); sfx('whoosh', tc, 0.35);
    for (let k = 0; k < 14; k++) { const f = mk('.i-fx', 'flk'); f.innerHTML = flakeSVG(); const sz = 34 + 26 * hash(k + 1); place(f, 470 + hash(k * 3) * 560, 560, sz, sz); hide(f);
      tw(f, tc + k * 0.05, 0.2, { o: [0, 0.9] }, 'lin');
      idle(f, t => t > tc + k * 0.05 ? { y: ((t - tc - k * 0.05) * 240 + hash(k) * 300) % 640, x: 18 * Math.sin(t * 3 + k), r: (t - tc) * 90 } : {}); }
    sfx('riser', tc, 0.3);
    focus('#I > .cam', tc + 0.05, 640, 900, 1.1, 0.6);
    // the climb: five hops, one per step, the narrator held over the head
    const hop = (t, k) => { const ax = k ? 48 + 96 * (k - 1) : 0, ay = k ? -104 - 94.4 * (k - 1) : 0, bx = 48 + 96 * k, by = -104 - 94.4 * k;
      ['.i-m', '.i-carry'].forEach(s => { tw(s, t, 0.26, { x: [ax, bx] }, 'inOut'); tw(s, t, 0.13, { y: [ay, by - 70] }, 'out'); tw(s, t + 0.13, 0.13, { y: [by - 70, by] }, 'in'); });
      sfx('thud', t + 0.26, 0.35); punch($$('.i-stairs .stp' + k), t + 0.26, 0.05); };
    const c0 = W('c3', 3) + 0.05;
    for (let k = 0; k < 5; k++) hop(c0 + k * 0.3, k);
    mascotPose('.i-m', W('c3', 5), 'sad');
    for (let k = 0; k < 3; k++) { const s = mk('#I .cam', 'swt'); s.innerHTML = sweatSVG(); place(s, 0, 0, 40, 54); hide(s);
      const t = W('c3', 5) + k * 0.18; tw(s, t, 0.05, { o: [0, 1] }, 'lin');
      idle(s, tt => ({ x: 860 + 34 * k, y: 560 + (tt > t ? (tt - t) * 160 : 0) })); tw(s, t + 0.4, 0.2, { o: [1, 0] }, 'lin'); }
    // «чем после паузы»: on the left, a warm me just steps up one low step and is ready
    const tp = W('c3', 8) - 0.1;
    slideIn('.i-chip2', tp, 'left', 0.5, 420); sfx('whoosh', tp, 0.3);
    tw('.i-hot', tp + 0.1, 0.06, { o: [0, 1] }, 'lin'); tw('.i-hot', tp + 0.1, 0.35, { y: [120, 0], s: [0.6, 1] }, 'back'); sfx('ding', tp + 0.3, 0.5);
    arms('.i-hot', tp + 0.3, 150, -150); jump('.i-hot', W('c3', 9) + 0.1, 30, 0.3);
    look('.i-carry', tp, -9, 0); }

  // ================= J: wide — «Это как разбирать кровать до досок, чтобы утром собрать.» =================
  tCircle('#I', '#J', tJ, 540, 1000, 0.6);
  { tw('.j-world', tJ, L('j1').t1 - tJ + 0.3, { s: [1.02, 0.92] }, 'lin');
    mascotPose('.j-m', W('j1', 0), 'point');
    const ta = W('j1', 2) - 0.05, sd = '.j-sd';
    idle(sd, t => (t > ta && t < W('j1', 6)) ? { r: 25 * Math.sin((t - ta) * 22) } : {});
    // the parts fly off to a pile on the right (bed coords), then back on «собрать»
    const parts = [['bdblk', 160, 60, 20], ['bdpil', 300, 120, -30], ['bdmat', 120, 120, 8], ['bdfoot', 10, 40, 88], ['bdhead', 600, 40, -88],
      ['bdslat0', 560, 160, 30], ['bdslat1', 480, 150, -20], ['bdslat2', 400, 150, 40], ['bdslat3', 320, 140, -35], ['bdslat4', 240, 130, 15], ['bdrail', 200, 70, 4]];
    const back = W('j1', 8) - 0.1;
    parts.forEach(([c, dx, dy, r], i) => { const el = sub('.j-bed', c); const t = ta + i * 0.1;
      tw(el, t, 0.32, { x: [0, dx], y: [0, dy], r: [0, r] }, 'inOut'); sfx(i % 2 ? 'clink' : 'thud', t + 0.3, 0.3);
      tw(el, back + i * 0.03, 0.3, { x: [dx, 0], y: [dy, 0], r: [r, 0] }, 'inOut'); });
    for (let i = 0; i < 4; i++) sfx('pop', back + i * 0.08, 0.25);
    burst('.j-fx', 10, 820, 1120, W('j1', 5), 150, 41, 'spark');
    focus('#J > .cam', W('j1', 5), 600, 1080, 1.1, 0.35);
    mascotPose('.j-m', ta + 0.2, 'hold');
    // «утром»: the sun is up, the mascot is exhausted
    mascotPose('.j-m', W('j1', 7), 'sad');
    for (let k = 0; k < 3; k++) { const s = mk('.j-fx', 'swt'); s.innerHTML = sweatSVG(); place(s, 210 + k * 40, 990, 36, 48); hide(s);
      const t = W('j1', 7) + k * 0.15; tw(s, t, 0.05, { o: [0, 1] }, 'lin'); tw(s, t, 0.5, { y: [0, 120], x: [0, 20 * (k - 1)] }, 'in'); tw(s, t + 0.45, 0.15, { o: [1, 0] }, 'lin'); }
    mascotPose('.j-m', back + 0.4, 'facepalm'); }

  // ================= K: verdict — «Так что смахивать меня ради батареи: байт.» + «Смахивай, только если я завис.» =================
  tZoom('#J', '#K', tK, 0.5);
  hide('.k-chip');
  { mascotPose('.k-m', W('v1', 1), 'pointL'); arms('.k-app', W('v1', 1), 40, -40); look('.k-app', W('v1', 1), 9, 0);
    mascotPose('.k-m', W('v1', 2), 'pointUp'); tw(sub('.k-app', 'kbrow'), W('v1', 2), 0.2, { y: [0, -10] }, 'out');
    punch('.k-bat', W('v1', 5), 0.08); sfx('tick', W('v1', 5), 0.5); look('.k-app', W('v1', 5), 9, -8); }
  // БАЙТ: the mascot hops and slams its arm down; the stamp hits the top and stays to the loop
  const tSt = W('v1', 6) - 0.02;
  hide('#stampL .st');
  mascotPose('.k-m', tSt - 0.5, 'pointUp'); tw('.k-m', tSt - 0.45, 0.25, { y: [0, -90] }, 'out'); tw('.k-m', tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose('.k-m', tSt - 0.18, 'point', 0.18);
  stamp('#stampL .st', tSt, -7, 26); burst('.st-fx', 22, 540, 340, tSt + 0.05, 420, 61, 'conf', 140);
  mascotPose('.k-m', tSt + 0.35, 'cheer'); arms('.k-app', tSt + 0.1, 150, -150);
  { // «Смахивай, только если я завис»: a swipe in the air, the chip, and I freeze into an ice block
    mascotPose('.k-m', W('e1', 0), 'point'); look('.k-app', W('e1', 0), 9, 0);
    slideIn('.k-chip', W('e1', 1) - 0.1, 'left', 0.5, 420); sfx('whoosh', W('e1', 1), 0.35);
    const tf = W('e1', 2) + 0.05;
    tw(sub('.k-app', 'aice'), tf, 0.3, { o: [0, 1] }, 'out'); sfx('glitch', tf, 0.5); arms('.k-app', tf, 10, -10, 0.2);
    idle('.k-app', t => t > tf ? { x: 4 * Math.sin((t - tf) * 60) } : {});
    burst('#K .k-fx', 10, 290, 900, tf, 200, 71, 'spark');
    mascotPose('.k-m', tf, 'shock'); focus('#K > .cam', tf, 440, 900, 1.08, 0.3); }
  tw('#K .k-chip, #stampL .st', tLoop + 0.05, 0.3, { o: [1, 0] }, 'in'); tw('#K > .cam', tLoop + 0.1, 0.3, { o: [1, 0] }, 'lin');
  loopTo('#A2', tLoop); tw('#K .k-m', tLoop + 0.42, 0.001, { o: [1, 0] });
}, { chunks: {} });
