// 024 «3 897 новых игр в Steam за октябрь. Сколько с нейронкой?» — Новость, монолог предмета: рассказывает сама игра (коробка с лицом).
// Источник: Sulka Haro, «Half of new Steam games now disclose AI», 04.11.2026 (данные по 02.11.2026): в октябре 1 982 из 3 897 новинок
// с отметкой AI Generated Content Disclosure; отметка про то, что игрок видит и слышит (картинки, звук, текст); ~12% продаж за квартал.
// Свой мир: ночной магазин игр (стеллажи с коробками — дальний слой, зал с автоматами и неоном — средний, ковролин — ближний).
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
  const arc = (el, t, d, dx, dy, h, rot = 0) => idle(el, tt => { if (tt < t) return {}; const u = easeIO((tt - t) / d); return { x: dx * u, y: dy * u - 4 * h * u * (1 - u), r: rot * u }; });
  const burst = (par, n, x, y, t, dist = 220, seed = 0, cls = 'spark', fall = 0) => {
    const cols = ['#ff8ae0', '#ffd84d', '#26c6ff', '#b8ff3d', '#b36bff'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.7, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.5, 0.25, { o: [1, 0] }, 'lin'); } };
  const ctr = el => { const r = (typeof el === 'string' ? $(el) : el).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
  const fb = (sel) => $$(sel).forEach(g => { g.style.transformBox = 'fill-box'; g.style.transformOrigin = 'center'; });

  // ---------- world ----------
  $('#shelf').innerHTML = `<div style="left:0;top:0;width:2400px;height:1000px">${shelvesFarSVG(1)}</div><div style="left:2400px;top:0;width:2400px;height:1000px">${shelvesFarSVG(1)}</div>`;
  $$('#shelf > div').forEach(d => d.style.position = 'absolute');
  $('#hall').innerHTML = hallMidSVG();
  dof('#shelf', 3); dof('#hall', 1.4);
  lookFX({ grain: 0.12, tint: 'transparent' });

  // ---------- props ----------
  const HERO = ['#ff5fd2', '#6a3cff'];     // the narrator's own cover colours (the same box in every scene)
  const buildA = (sc, s) => {
    $(sc + ' .a-box').innerHTML = gameBoxSVG('a' + s, HERO[0], HERO[1], 'КВЕСТ', true, false);
    $(sc + ' .a-s1').innerHTML = gameBoxSVG('as1' + s, '#26c6ff', '#1a5fd8', 'ГОНКИ', false, false);
    $(sc + ' .a-s2').innerHTML = gameBoxSVG('as2' + s, '#ffd34d', '#ff7a3d', 'ФЕРМА', false, false);
  };
  buildA('#A', '');
  $('.b-box').innerHTML = gameBoxSVG('b', HERO[0], HERO[1], 'КВЕСТ', true, false);
  $('.b-bot').innerHTML = botSVG('b', '#ff8ae0'); $('.b-brush').innerHTML = brushSVG('b', '#26c6ff');
  $('.b-paint').innerHTML = `<svg viewBox="0 0 1080 1920" style="left:0;top:0;width:100%;height:100%;overflow:visible">
    <path class="bp1" pathLength="100" d="M210 960 Q260 900 320 950 T450 930" fill="none" stroke="#26c6ff" stroke-width="22" stroke-linecap="round" opacity=".9" style="stroke-dasharray:100;stroke-dashoffset:100"/>
    <path class="bp2" pathLength="100" d="M220 1030 Q300 990 360 1040 T490 1010" fill="none" stroke="#ffd34d" stroke-width="22" stroke-linecap="round" opacity=".9" style="stroke-dasharray:100;stroke-dashoffset:100"/>
    <path class="bp3" pathLength="100" d="M420 640 L470 600 M440 690 L500 650" fill="none" stroke="#7dff8a" stroke-width="18" stroke-linecap="round" opacity=".9" style="stroke-dasharray:100;stroke-dashoffset:100"/></svg>`;
  $('.c-page').innerHTML = pageSVG('c'); $('.c-thumb').innerHTML = gameBoxSVG('c', HERO[0], HERO[1], 'КВЕСТ', true, false);
  $('.c-dev').innerHTML = personSVG('cd', '#26c6ff', '#2a1a10'); $('.c-pen').innerHTML = brushSVG('cp', '#1faa3a');
  $('.d-eye').innerHTML = eyeSVG('d'); $('.d-ear').innerHTML = earSVG('d');
  $('.d-t1 .d-i').innerHTML = iconPicSVG('d'); $('.d-t2 .d-i').innerHTML = iconSoundSVG('d'); $('.d-t3 .d-i').innerHTML = iconTextSVG('d');
  $('.e-box').innerHTML = gameBoxSVG('e', HERO[0], HERO[1], 'КВЕСТ', true, true); $('.e-mag').innerHTML = magnifierSVG('e');
  const FB = [['#26c6ff', '#1a5fd8', 'ГОНКИ'], ['#ffd34d', '#ff7a3d', 'ФЕРМА'], ['#7dff8a', '#1f9a5a', 'ЛЕС'], ['#ff7a3d', '#c8283d', 'БИТВА'], ['#b36bff', '#4a2ab0', 'КОСМОС']];
  const fboxes = [];
  for (let i = 0; i < 10; i++) { const r = Math.floor(i / 5), c = i % 5, f = FB[(i * 2 + r) % 5];
    const d = mk('.f-boxes', 'fbx'); place(d, 40 + c * 200, 470 + r * 290, 172, 248); d.innerHTML = gameBoxSVG('f' + i, f[0], f[1], f[2], false, true); fboxes.push(d); }
  $('.g-r').innerHTML = personSVG('gr', '#7dff8a', '#4a2a14'); $('.g-tal').innerHTML = tallySVG('g');
  $('.i-b1').innerHTML = gameBoxSVG('i1', '#26c6ff', '#1a5fd8', 'ГОНКИ', false, false);
  $('.i-b2').innerHTML = gameBoxSVG('i2', HERO[0], HERO[1], 'КВЕСТ', true, true);
  $('.i-page').innerHTML = pageSVG('i');
  { const th = mk('.i-page', 'i-pthumb'); place(th, 43, 112, 200, 289); th.innerHTML = gameBoxSVG('ip', HERO[0], HERO[1], 'КВЕСТ', false, true); th.classList.add('i-pth'); }
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  $('#A2').innerHTML = $('#A').innerHTML; ['.a-box', '.a-s1', '.a-s2', '.a-m'].forEach(s => $('#A2 ' + s).innerHTML = ''); buildA('#A2', '2'); $('#A2 .a-m').innerHTML = mascotSVG('a2m');
  mascotLife(); mascotTalk();
  // the game box is the narrator: every box face talks with the voice; the mascot keeps its mouth shut and acts
  $$('.m').forEach(m => mascotQuiet(m, 0, TOTAL + 1));
  $$('.kmouth').forEach(m => idle(m, t => { const a = clamp((venv(t) - 0.07) / 0.55); return { sy: 0.9 * Math.pow(a, 0.8) }; }));
  $$('.kbrow').forEach(b => idle(b, t => { const d = venv(t) - venv(t - 0.12); return { y: d > 0.18 ? -8 * Math.min(1, (d - 0.18) / 0.2) : 0 }; }));
  { const n = Math.max(1, Math.round(TOTAL / 2.9)), P = TOTAL / n;
    $$('.keye').forEach((e, i) => idle(e, t => { if (t < 0.6 || t > TOTAL - 0.8) return {}; const u = (t + hash(i * 2.3) * P) % P; return { sy: u < 0.18 ? 1 - 0.9 * Math.sin(Math.PI * u / 0.18) : 1 }; })); }

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('b1'), tC = cut('c1'), tD = cut('c2'), tE = cut('j1'), tF = cut('q1'), tG = cut('d1'), tH = cut('r1'), tI = cut('t1'), tLoop = TOTAL - 0.62;
  const CUTS = [0, tB, tC, tD, tE, tF, tG, tH, tI], IDS = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 240 * easeIO((t - c + 0.35) / 0.7); }); x -= 1920 * easeIO((t - tLoop) / 0.6); return x; };
  custom(t => {
    const x = camX(t);
    $('#shelf').style.transform = `translate(${(-(x * 0.15 + t * 5) % 2400).toFixed(1)}px,0)`;
    $('#hall').style.transform = `translate(${(-x * 0.45).toFixed(1)}px,0)`;
    $('#floor').style.transform = `translate(${(-(x * 1.0) % 60).toFixed(1)}px,0)`;
  });
  grade(0, 'transparent'); grade(tB, 'rgba(255,95,210,.12)'); grade(tC, 'rgba(38,198,255,.10)'); grade(tE - 0.2, 'rgba(255,120,160,.24)');
  grade(tF, 'rgba(120,80,255,.20)'); grade(tG, 'rgba(125,255,138,.10)'); grade(tH, 'rgba(255,216,77,.12)'); grade(tI, 'rgba(255,170,60,.16)'); grade(tLoop + 0.3, 'transparent');
  $$('.m').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2')) idle(m, t => ({ y: 6 * Math.sin(W2 * 16 * t + i), r: 1.4 * Math.sin(W2 * 8 * t + i) })); });
  const bob = (sel, k = 6, amp = 10) => idle(sel, t => ({ y: amp * Math.sin(W2 * k * 2 * t), r: 2.2 * Math.sin(W2 * k * t) }));
  bob('.a-box', 6, 8); bob('.b-box', 7, 6); bob('.i-b2', 6, 6); bob('.b-bot', 5, 8);
  const legs = (sel, t0, t1, P = 0.24) => { const q = s => $$(sel + ' ' + s); for (let t = t0, k = 0; t < t1 - 0.05; t += P, k++) { tw(q('.klegL'), t, P, { r: [k % 2 ? 18 : -18, k % 2 ? -18 : 18] }, 'inOut'); tw(q('.klegR'), t, P, { r: [k % 2 ? -18 : 18, k % 2 ? 18 : -18] }, 'inOut'); } tw(q('.klegL'), t1, 0.2, { r: [0, 0] }); tw(q('.klegR'), t1, 0.2, { r: [0, 0] }); };
  const parm = (sel, t, a, b, d = 0.3, cls = '.karmR') => tw($$(sel + ' ' + cls), t, d, { r: [a, b] }, 'back');

  // ================= A: hook — «3 897 НОВЫХ ИГР», the box introduces itself =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  hide('#A .a-chip');
  parm('#A .a-box', W('hook', 0) + 0.05, 0, -60, 0.35); parm('#A .a-box', W('hook', 0) + 0.05, 0, 50, 0.35, '.karmL');   // «Я —»: hands to the chest
  mascotPose('#A .a-m', W('hook', 1), 'pointL');
  punch('#A .a-n', W('hook', 3) + 0.05, 0.1); sfx('tick', W('hook', 3) + 0.05, 0.4);
  { const tb = W('hook', 3) + 0.9;   // the stack behind wobbles: «одна из…»
    tw('#A .a-s1', tb, 0.4, { r: [0, -6] }, 'back'); tw('#A .a-s2', tb + 0.1, 0.4, { r: [0, 5] }, 'back'); sfx('thud', tb, 0.3); }
  punch('#A .a-u', W('hook', 4) + 0.05, 0.1);
  parm('#A .a-box', W('hook', 4), -60, -130, 0.35);   // «новых игр»: waves up
  jump('#A .a-box', W('hook', 5), 50, 0.42, '#A .a-shd1');
  slideIn('#A .a-chip', W('hook', 7) - 0.05, 'left', 0.6, 420); sfx('whoosh', W('hook', 7) - 0.05, 0.4);
  mascotPose('#A .a-m', W('hook', 8), 'cheer');
  focus('#A > .cam', W('hook', 9), 540, 700, 1.1, 0.25, 0.25, 0.3, 540, 760);

  // ================= B: «у меня секрет: меня рисовала нейронка» =================
  morphCut('#A', '#B', tB, '#A .a-box', '.b-box', 0.6);
  hide('.b-t'); hide('.b-chip'); hide('.b-bot'); hide('.b-brush');
  slideIn('.b-t', W('b1', 3) - 0.05, 'up', 0.5, 140); sfx('whoosh', W('b1', 3), 0.3);
  parm('.b-box', W('b1', 3), 0, -128, 0.32);   // hand at the mouth: a secret
  tw('.b-box .kpup', W('b1', 3), 0.2, { x: [0, -10] }, 'out'); tw('.b-box .kpup', W('b1', 3) + 0.4, 0.2, { x: [-10, 10] }, 'out');
  mascotPose('.b-m', tB + 0.2, 'think');
  // «рисовала»: the bot rolls in from the right and paints the cover; strokes draw on
  { const tp = W('b1', 4) - 0.1;
    tw('.b-bot', tp, 0.06, { o: [0, 1] }, 'lin'); tw('.b-bot', tp, 0.45, { x: [520, 0] }, 'out'); sfx('whoosh', tp, 0.5);
    tw('.b-brush', tp + 0.25, 0.06, { o: [0, 1] }, 'lin'); tw('.b-brush', tp + 0.25, 0.3, { x: [400, 0], y: [-80, 0] }, 'out');
    const ts = W('b1', 5); [0, 1, 2, 3].forEach(k => { tw('.b-brush', ts + k * 0.22, 0.11, { r: [-20, 25], x: [0, -30] }, 'inOut'); tw('.b-brush', ts + k * 0.22 + 0.11, 0.11, { r: [25, -20], x: [-30, 0] }, 'inOut'); });
    tw('.bp1', ts, 0.35, { dash: [100, 0] }, 'out'); tw('.bp2', ts + 0.25, 0.35, { dash: [100, 0] }, 'out'); tw('.bp3', ts + 0.5, 0.3, { dash: [100, 0] }, 'out');
    sfx('zap', ts, 0.3); sfx('zap', ts + 0.3, 0.25);
    tw('.b-bot .barmL', ts, 0.3, { r: [0, 40] }, 'back'); tw('.b-bot .bhead', ts, 0.3, { r: [0, -8] }, 'back');
    burst('#B .cam', 10, 360, 980, ts + 0.3, 180, 3, 'spark');
    slideIn('.b-chip', W('b1', 6) - 0.05, 'right', 0.55, 400); sfx('whoosh', W('b1', 6), 0.4);
    mascotPose('.b-m', W('b1', 5), 'shock'); jump('.b-m', W('b1', 5) + 0.05, 50, 0.4);
    focus('#B > .cam', W('b1', 5), 360, 900, 1.1, 0.4); }

  // ================= C: «Steam велит отметить это на странице» — the store page =================
  morphCut('#B', '#C', tC, '.b-box', '.c-thumb', 0.6);
  hide('.c-dev'); hide('.c-pen'); hide('.c-chip');
  tw('.c-page', tC - 0.3, 0.6, { y: [140, 0] }, 'out');
  slideIn('.c-chip', W('c1', 2) - 0.05, 'down', 0.55, 160); sfx('whoosh', W('c1', 2), 0.3);
  parm('.c-thumb', W('c1', 0), 0, 70, 0.3, '.karmL'); parm('.c-thumb', W('c1', 0), 0, -70, 0.3);   // «скрывать нельзя»: hands spread
  mascotPose('.c-m', tC + 0.2, 'pointL');
  // «разработчику»: the developer pops up from below with a big green pen; «отметить»: the tick is drawn
  { const td = W('c1', 4) - 0.1;
    tw('.c-dev', td, 0.06, { o: [0, 1] }, 'lin'); tw('.c-dev', td, 0.45, { y: [300, 0] }, 'out'); sfx('pop', td, 0.4);
    tw('.c-pen', td + 0.2, 0.06, { o: [0, 1] }, 'lin'); tw('.c-pen', td + 0.2, 0.4, { y: [260, 0], r: [30, 10] }, 'out');
    tw('.c-dev .parmR', td + 0.2, 0.35, { r: [0, -40] }, 'back');
    const tk = W('c1', 5);
    tw('.c-pen', tk, 0.12, { x: [0, 18], y: [0, 20], r: [10, -10] }, 'inOut'); tw('.c-pen', tk + 0.12, 0.18, { x: [18, 60], y: [20, -40], r: [-10, 20] }, 'inOut');
    tw('.c-page .pchk', tk + 0.02, 0.3, { dash: [100, 0] }, 'out'); sfx('tick', tk + 0.05, 0.6); sfx('ding', tk + 0.3, 0.4);
    punch('.c-page .prow', tk + 0.3, 0.06);
    tw('.c-dev .pmouth', tk + 0.3, 0.3, { sy: [1, 1.5] }, 'back');
    mascotPose('.c-m', tk + 0.1, 'point'); tw('.c-m', tk + 0.1, 0.4, { x: [0, -40] }, 'out');
    focus('#C > .cam', tk, 420, 1000, 1.15, 0.6, 0.28, 0.4, 540, 820);
    tw('.c-thumb .kpup', tk, 0.2, { x: [0, 6], y: [0, 10] }, 'out'); }

  // ================= D: «отметка — про то, что видно и слышно: картинки, звук, текст» =================
  tSlideUp('#C', '#D', tD, 0.55);
  hide('.d-eye'); hide('.d-ear'); ['.d-t1', '.d-t2', '.d-t3', '.d-l1', '.d-l2', '.d-l3'].forEach(s => hide(s));
  tw('.d-t', tD - 0.2, 0.5, { y: [-200, 0] }, 'out');
  popIn('.d-eye', W('c2', 4) - 0.05, 0.4); sfx('pop', W('c2', 4), 0.4); tw('.d-eye .eyp', W('c2', 4) + 0.3, 0.3, { x: [0, 26] }, 'out'); tw('.d-eye .eyp', W('c2', 6), 0.3, { x: [26, -20] }, 'out');
  popIn('.d-ear', W('c2', 6) - 0.05, 0.4); sfx('pop', W('c2', 6), 0.4); tw('.d-ear', W('c2', 6) + 0.3, 0.3, { r: [0, 10] }, 'back');
  mascotPose('.d-m', W('c2', 4), 'pointUp');
  [[7, '.d-t1', '.d-l1', 'pointL'], [8, '.d-t2', '.d-l2', 'pointUp'], [9, '.d-t3', '.d-l3', 'point']].forEach(([i, ti, la, po], k) => {
    const t = W('c2', i) - 0.06;
    tw(ti, t, 0.06, { o: [0, 1] }, 'lin'); tw(ti, t, 0.45, { y: [260, 0], r: [k === 0 ? -14 : k === 2 ? 14 : 0, 0], s: [0.6, 1] }, 'back');
    slideIn(la, t + 0.08, 'down', 0.4, 80); sfx('pop', t + 0.05, 0.5); mascotPose('.d-m', t, po);
  });
  tw('.d-t2 .iswav', W('c2', 8) + 0.2, 0.25, { s: [1, 1.25] }, 'back'); tw('.d-t2 .isnote', W('c2', 8) + 0.2, 0.5, { y: [0, -30] }, 'out');
  punch('.d-t2', W('c2', 8) + 0.3, 0.06);
  jump('.d-m', W('c2', 9) + 0.25, 40, 0.38);

  // ================= E: joke — «хотя меня и без отметки видно: у героя на обложке шесть пальцев» =================
  tCircle('#D', '#E', tE, 540, 760);
  hide('.e-n'); hide('.e-mag');
  mascotPose('.e-m', tE + 0.2, 'think');
  // «без отметки»: the ИИ sticker peels off the corner and tumbles away
  { const tg = W('j1', 3);
    tw('.e-box .gtag', tg, 0.25, { r: [0, -25], s: [1, 1.15] }, 'out'); tw('.e-box .gtag', tg + 0.25, 0.7, { x: [0, 260], y: [0, 900], r: [-25, 200] }, 'in'); sfx('whoosh', tg + 0.25, 0.4);
    parm('.e-box', W('j1', 4), 0, -120, 0.35); tw('.e-box .kpup', W('j1', 5), 0.25, { x: [0, 10], y: [0, 14] }, 'out'); }
  // «шесть пальцев»: the magnifier slides onto the hand, fingers light up one by one with numbers 1..6
  { const tm = W('j1', 7) - 0.1;
    tw('.e-mag', tm, 0.06, { o: [0, 1] }, 'lin'); tw('.e-mag', tm, 0.5, { x: [300, -170], y: [200, 190], r: [20, -10] }, 'out'); sfx('whoosh', tm, 0.4);
    mascotPose('.e-m', tm, 'pointL');
    const r = $('.e-box').getBoundingClientRect(), k = r.width / 360, t0 = W('j1', 10) - 0.1, t1 = W('j1', 11) + 0.1;
    for (let i = 0; i < 6; i++) { const a = (-70 + i * 26) * Math.PI / 180, x = r.left + (268 + Math.sin(a) * 108) * k, y = r.top + (340 - Math.cos(a) * 108) * k;
      const n = mk('.e-nums', 'num'); n.textContent = i + 1; place(n, x - 20, y - 36); hide(n); const t = t0 + (t1 - t0) * i / 5;
      popIn(n, t, 0.3); sfx('tick', t, 0.5); tw(`.e-box .gf${i}`, t, 0.25, { s: [1, 1.3] }, 'back'); }
    slideIn('.e-n', W('j1', 10), 'up', 0.45, 160); punch('.e-n', t1 + 0.1, 0.12); sfx('slam', t1 + 0.1, 0.5); shake(t1 + 0.12, 0.25, 10);
    mascotPose('.e-m', t1 + 0.15, 'facepalm'); tw('.e-box .ghand', t1 + 0.2, 0.3, { r: [0, 8] }, 'back');
    parm('.e-box', t1 + 0.1, -120, -40, 0.3); parm('.e-box', t1 + 0.1, 0, 60, 0.3, '.karmL');   // the box shrugs
    focus('#E > .cam', t0, 560, 760, 1.1, 0.95, 0.3, 0.45, 540, 780); }

  // ================= F: «говорят, с такой отметкой каждая вторая новинка. Байт?» =================
  tDrop('#E', '#F', tF, 0.5);
  hide('.f-q'); hide('.f-t1'); hide('.f-t2');
  fboxes.forEach((b, i) => { tw($$('.gtag', b), 0, 0.001, { o: [0, 0] }); tw(b, tF - 0.1 + (i % 5) * 0.05 + Math.floor(i / 5) * 0.12, 0.45, { y: [-700, 0] }, 'out'); });
  sfx('thud', tF + 0.35, 0.4);
  mascotPose('.f-m', W('q1', 0), 'think');
  slideIn('.f-t1', W('q1', 4) - 0.05, 'left', 0.45, 400); slideIn('.f-t2', W('q1', 5) - 0.05, 'right', 0.45, 400);
  { const t0 = W('q1', 4), t1 = W('q1', 6) + 0.3; let n = 0;
    fboxes.forEach((b, i) => { if (i % 2 === 0) return; const t = t0 + (t1 - t0) * n++ / 4; const g = $$('.gtag', b);
      tw(g, t, 0.06, { o: [0, 1] }, 'lin'); tw(g, t, 0.3, { s: [2.2, 1] }, 'back'); tw(b, t + 0.05, 0.3, { y: [0, -18] }, 'out'); tw(b, t + 0.35, 0.3, { y: [-18, 0] }, 'in'); sfx('pop', t, 0.4); }); }
  mascotPose('.f-m', W('q1', 5), 'pointUp');
  popIn('.f-q', W('q1', 7) - 0.05, 0.35); place($('.f-q'), 760, 1040); idle('.f-q', t => ({ r: t > W('q1', 7) ? 10 * Math.sin((t - W('q1', 7)) * 7) : 0 }));
  mascotPose('.f-m', W('q1', 7), 'shrug'); sfx('blip', W('q1', 7), 0.4);
  focus('#F > .cam', W('q1', 5), 540, 760, 1.08, 0.5);

  // ================= G: «один исследователь открыл страницы всех новинок октября и пересчитал отметки» =================
  tWhip('#F', '#G', tG, 0.46);
  hide('.g-chip'); hide('.g-src');
  mascotPose('.g-m', W('d1', 1), 'pointL');
  slideIn('.g-chip', W('d1', 4) - 0.05, 'left', 0.55, 420); sfx('whoosh', W('d1', 4), 0.3);
  slideIn('.g-src', W('d1', 6) - 0.05, 'left', 0.6, 520);
  { const t0 = W('d1', 2) - 0.1, t1 = we('d1', 9) + 0.2, N = 11;
    for (let i = 0; i < N; i++) { const p = mk('.g-pages', 'g-pg'); p.innerHTML = pageSVG('g' + i); place(p, 1100, 520 + (i % 2) * 50); hide(p);
      if (i % 2 === 1) tw($$('.pchk', p), 0, 0.001, { dash: [0, 0] }); else tw($$('.prow', p), 0, 0.001, { o: [0.25, 0.25] });
      const t = t0 + (t1 - t0 - 1.2) * i / (N - 1);
      tw(p, t, 0.05, { o: [0, 1] }, 'lin'); tw(p, t, 1.3, { x: [0, -1450], r: [6, -6] }, 'lin');
      tw('.g-tal .tbtn', t + 0.55, 0.06, { y: [0, 12] }, 'in'); tw('.g-tal .tbtn', t + 0.61, 0.12, { y: [12, 0] }, 'out'); sfx('tick', t + 0.58, 0.45); }
    const dig = $('.g-tal .tdig'); custom(t => { const k = clamp((t - t0 - 0.55) / (t1 - t0 - 1.2)); const m = '▮'.repeat(Math.min(4, Math.floor(k * 11) % 5)); dig.textContent = t < t0 + 0.5 ? '' : m; });
    tw('.g-r .parmR', t0, 0.35, { r: [0, -30] }, 'back'); tw('.g-r .phead', t0 + 0.4, 0.4, { r: [0, 8] }, 'back');
    idle('.g-r .ppup', t => (t > t0 && t < t1) ? { x: 8 * Math.sin((t - t0) * 9) } : {});
    jump('.g-m', W('d1', 5), 50, 0.4, '.g-shd2'); jump('.g-m', W('d1', 8), 50, 0.4, '.g-shd2');
    mascotPose('.g-m', W('d1', 8), 'think');
    focus('#G > .cam', W('d1', 8), 300, 950, 1.06, 0.45, 0.28, 0.4, 330, 940); }

  // ================= H: «итог: 1 982 из 3 897. Даже чуть больше половины. Не байт.» =================
  tZoom('#G', '#H', tH, 0.5);
  hide('.h-n1'); hide('.h-hl'); hide('.h-half');
  tw('.h-c1', tH - 0.1, 0.5, { y: [700, 0] }, 'out'); tw('.h-c2', tH, 0.5, { y: [700, 0] }, 'out');
  const fillTo = 1982 / 3897;
  { const t0 = W('r1', 1) - 0.05, t1 = W('r1', 2) - 0.1;
    tw('.h-f', 0, 0.001, { sy: [0, 0] }); tw('.h-f', t0, t1 - t0, { sy: [0, fillTo] }, 'inOut');
    const el = $('.hnum'); custom(t => { const v = Math.round(1982 * easeIO((t - t0) / (t1 - t0))); el.textContent = v >= 1000 ? Math.floor(v / 1000) + ' ' + String(v % 1000).padStart(3, '0') : v; });
    for (let k = 0; k < 8; k++) sfx('tick', t0 + (t1 - t0) * k / 8, 0.25);
    punch('.h-n2', t1 + 0.05, 0.14); sfx('ding', t1 + 0.05, 0.5);
    mascotPose('.h-m', t0, 'shock'); mascotPose('.h-m', t1, 'pointL'); }
  { const tg = W('r1', 3) + 0.6; const g = mk('#H .cam', 'h-tag'); g.innerHTML = '<div style="left:0;top:0;width:110px;height:110px;border-radius:50%;background:#fff36b;border:9px solid #0a130d;font:900 44px/92px Unb;color:#0a130d;text-align:center">ИИ</div>'; place(g, 545, 800, 110, 110); hide(g);
    tw(g, tg, 0.06, { o: [0, 1] }, 'lin'); tw(g, tg, 0.4, { s: [2.4, 1], r: [-30, -8] }, 'back'); sfx('pop', tg, 0.5); idle(g, t => t > tg + 0.5 ? { y: 6 * Math.sin((t - tg) * 5) } : {});
    mascotPose('.h-m', tg + 0.2, 'think'); mascotPose('.h-m', tg + 0.8, 'pointL'); tw('.h-c1', tg + 0.5, 0.3, { r: [0, -2] }, 'back'); tw('.h-c1', tg + 0.85, 0.3, { r: [-2, 0] }, 'back'); }
  popIn('.h-n1', W('r1', 3) - 0.05, 0.4); punch('.h-c1', W('r1', 3), 0.05); sfx('pop', W('r1', 3), 0.4);
  focus('#H > .cam', W('r1', 1) + 0.6, 420, 700, 1.1, 0.8);
  // v1: the half line draws, the fill sits just over it
  { const th = W('v1', 0) - 0.05;
    tw('.h-half', th, 0.05, { o: [0, 1] }, 'lin'); tw('.h-half', th, 0.4, { sx: [0, 1] }, 'out'); $('.h-half').style.transformOrigin = '0 50%';
    slideIn('.h-hl', W('v1', 3) - 0.1, 'left', 0.45, 300); sfx('whoosh', W('v1', 3), 0.3);
    tw('.h-f', W('v1', 2), 0.2, { sy: [fillTo, fillTo + 0.03] }, 'out'); tw('.h-f', W('v1', 2) + 0.22, 0.3, { sy: [fillTo + 0.03, fillTo] }, 'back');
    mascotPose('.h-m', W('v1', 1), 'think'); }
  // НЕ БАЙТ: the mascot hops and slams its arm down; the stamp hits the top and stays to the loop
  const tSt = W('v1', 4) - 0.02;
  hide('#stampL .st');
  mascotPose('.h-m', tSt - 0.5, 'pointUp'); tw('.h-m', tSt - 0.45, 0.25, { y: [0, -90] }, 'out'); tw('.h-m', tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose('.h-m', tSt - 0.18, 'point', 0.18);
  stamp('#stampL .st', tSt, -7, 26); burst('.st-fx', 22, 540, 340, tSt + 0.05, 420, 61, 'conf', 140);
  mascotPose('.h-m', tSt + 0.35, 'cheer');

  // ================= I: «но покупают нас редко: нам — около 12% продаж» + takeaway, loop =================
  tw('#H', tI - 0.3, 0.5, { s: [1, 0.7], r: [0, -8], o: [1, 0] }, 'in'); tw('#I', tI - 0.15, 0.55, { s: [1.3, 1], r: [8, 0], o: [0, 1] }, 'out'); sfx('whoosh', tI - 0.3, 0.6);
  hide('.i-pc'); hide('.i-page');
  tw('.i-b1', tI - 0.1, 0.45, { y: [-500, 0] }, 'out'); tw('.i-b2', tI, 0.45, { y: [-500, 0] }, 'out');
  mascotPose('.i-m', W('t1', 1), 'think');
  // coins rain: 21 land on the ordinary game's pile, 3 on ours
  { const t0 = W('t1', 1), t1 = W('t1', 6); let a = 0, b = 0;
    for (let k = 0; k < 24; k++) { const ours = k % 8 === 4; const c = mk('.i-coins', 'coin'); c.innerHTML = coinSVG('i' + k, '$');
      let tx, ty; if (ours) { tx = 772; ty = 1180 - b++ * 26; } else { tx = 110 + (a % 3) * 80 + (Math.floor(a / 3) % 2) * 40 - 20; ty = 1180 - Math.floor(a / 3) * 26 - (a % 3 === 1 ? 14 : 0); a++; } place(c, tx + (hash(k) - 0.5) * 10, ty); hide(c);
      const t = t0 + (t1 - t0) * k / 23;
      tw(c, t, 0.05, { o: [0, 1] }, 'lin'); tw(c, t, 0.4, { y: [-900, 0], r: [200 * (hash(k + 4) - 0.5), 0], sy: [1, 1] }, 'in'); tw(c, t + 0.4, 0.15, { sy: [0.7, 1] }, 'back');
      if (k % 3 === 0) sfx('coin', t + 0.4, 0.35); }
    parm('.i-b2', W('t1', 3), 0, -40, 0.35); tw('.i-b2 .kpup', W('t1', 3), 0.25, { x: [0, -12], y: [0, 8] }, 'out');
    mascotPose('.i-m', W('t1', 3), 'sad');
    popIn('.i-pc', W('t1', 6) - 0.05, 0.45); sfx('slam', W('t1', 6), 0.5); shake(W('t1', 6) + 0.1, 0.2, 8);
    mascotPose('.i-m', W('t1', 6), 'point');
    punch('.i-pc', W('t1', 6) + 0.35, 0.12); }
  // takeaway: the store page slides up, scrolls down to the mark, the ring circles it
  { const tp = W('m1', 0) - 0.1;
    tw('.i-page', tp, 0.06, { o: [0, 1] }, 'lin'); tw('.i-page', tp, 0.55, { y: [900, 0] }, 'out'); sfx('whoosh', tp, 0.5);
    tw('.i-coins, .i-pc, .i-b1, .i-shd1', tp + 0.2, 0.3, { o: [1, 0] }, 'in');
    tw('.i-page .pscroll, .i-page .i-pth', W('m1', 3), 0.6, { y: [0, -360] }, 'inOut'); tw('.i-page .i-pth', W('m1', 3), 0.25, { o: [1, 0] }, 'lin'); sfx('whoosh', W('m1', 3), 0.3);
    tw('.i-page .pchk', W('m1', 4), 0.3, { dash: [100, 0] }, 'out'); sfx('tick', W('m1', 4) + 0.1, 0.5);
    tw('.i-page .pring', W('m1', 5) - 0.1, 0.45, { dash: [100, 0] }, 'out'); punch('.i-page .prow', W('m1', 5) + 0.3, 0.05); sfx('ding', W('m1', 5) + 0.3, 0.4);
    mascotPose('.i-m', W('m1', 0), 'pointUp'); tw('.i-m', W('m1', 0), 0.5, { x: [0, 400], y: [0, 230], s: [1, 0.85] }, 'out'); mascotPose('.i-m', W('m1', 4), 'pointL');
    tw('.i-b2', W('m1', 0), 0.5, { x: [0, 120], y: [0, 260], s: [1, 0.8] }, 'out'); tw('.i-shd2', W('m1', 0), 0.3, { o: [1, 0] }, 'lin'); }
  tw('#I .i-page, #I .shd, #stampL .st, #I .i-b2', tLoop + 0.05, 0.3, { o: [1, 0] }, 'in');
  hide('#A2 .a-chip'); loopTo('#A2', tLoop); tw('#I .i-m', tLoop + 0.42, 0.001, { o: [1, 0] });
}, { chunks: {} });
