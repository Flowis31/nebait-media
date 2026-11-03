// 021 «Телефон врёт кассе при каждой покупке. Зачем?» — Как это работает, монолог предмета: рассказывает сам телефон.
// Apple Support «Apple Pay security and privacy overview» 27.04.2026; Android Developers «NFC overview» (4 см).
// Свой мир: вечерний супермаркет (стеллажи — дальний слой, зал касс — средний, плитка — ближний), шутки в метро и в автобусе.
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
  const arc = (el, t, d, dx, dy, h, rot = 0, back = 0) => idle(el, tt => { if (tt < t) return {}; let u = easeIO((tt - t) / d); if (back && tt > t + d + back) u = 1 - easeIO((tt - t - d - back) / d); return { x: dx * u, y: dy * u - 4 * h * u * (1 - u), r: rot * u }; });
  const burst = (par, n, x, y, t, dist = 220, seed = 0, cls = 'spark', fall = 0) => {
    const cols = ['#5fe0ff', '#ffd34d', '#ff4d5e', '#b8ff3d', '#c58cff'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.7, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.5, 0.25, { o: [1, 0] }, 'lin'); } };
  const ctr = el => { const r = (typeof el === 'string' ? $(el) : el).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
  const cross = id => `<svg viewBox="0 0 160 160" style="overflow:visible;left:0;top:0;width:100%;height:100%"><circle cx="80" cy="80" r="70" fill="#fff" stroke="#0a130d" stroke-width="10"/><path class="${id}" pathLength="100" d="M48 48 L112 112 M112 48 L48 112" stroke="#ff3b5c" stroke-width="18" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/></svg>`;

  // ---------- world ----------
  $('#shelf').innerHTML = `<div style="left:0;top:0;width:2400px;height:1000px">${shelvesSVG()}</div><div style="left:2400px;top:0;width:2400px;height:1000px">${shelvesSVG()}</div>`;
  $$('#shelf > div').forEach(d => d.style.position = 'absolute');
  $('#hall').innerHTML = hallSVG();
  dof('#shelf', 3); dof('#hall', 1.2);
  lookFX({ grain: 0.12, tint: 'transparent' });

  // ---------- props ----------
  const buildA = (sc, s) => { $(sc + ' .a-ph').innerHTML = talkPhoneSVG('a' + s); $(sc + ' .a-term').innerHTML = terminalSVG('a' + s); $(sc + ' .a-nose').innerHTML = noseSVG(); };
  buildA('#A', '');
  $('.b-card').innerHTML = bankCardSVG('b'); $('.b-ph').innerHTML = talkPhoneSVG('b');
  $('.c-cash').innerHTML = personSVG('cc', '#ff4d5e', '#5a2a14'); $('.c-term').innerHTML = terminalSVG('c'); $('.c-bub').innerHTML = bubbleSVG(); $('.c-bcard').innerHTML = bankCardSVG('cb'); $('.c-ph').innerHTML = talkPhoneSVG('c');
  $('.d-ph').innerHTML = talkPhoneSVG('d'); $('.d-term').innerHTML = terminalSVG('d'); $('.d-rul').innerHTML = rulerSVG();
  $('.e-bg').innerHTML = metroSVG(); $('.e-th').innerHTML = personSVG('et', '#3a3f4f', '#1a1210'); $('.e-thm').innerHTML = maskSVG('et', '#2a2a2a');
  $('.e-term').innerHTML = terminalSVG('e'); $('.e-ph').innerHTML = talkPhoneSVG('e'); $('.e-x').innerHTML = cross('exp');
  $('.e-mask').innerHTML = `<div style="left:-30px;top:-30px;width:300px;height:300px">${mascotSVG('emask')}</div><div style="left:110px;top:230px;width:22px;height:200px;background:#ffd34d;border:7px solid #0a130d;border-radius:10px"></div>`;
  $('.f-ph').innerHTML = talkPhoneSVG('f');
  $('.g-chip').innerHTML = chipSafeSVG('g'); $('.g-card').innerHTML = bankCardSVG('g'); $('.g-twin').innerHTML = bankCardSVG('gt', '#8fa8ff', '#5b3fd8', 'ДВОЙНИК');
  $('.g-tk').innerHTML = ticketSVG('g', 'КОД'); $('.g-ph').innerHTML = talkPhoneSVG('g');
  $('.h-bg').innerHTML = busSVG(); $('.h-val').innerHTML = validatorSVG(); $('.h-th').innerHTML = personSVG('ht', '#3a3f4f', '#1a1210'); $('.h-thm').innerHTML = maskSVG('ht', '#2a2a2a');
  $('.h-tk').innerHTML = ticketSVG('h', 'КОД'); $('.h-x').innerHTML = cross('hxp');
  $('.i-term').innerHTML = terminalSVG('i'); $('.i-ph').innerHTML = talkPhoneSVG('i'); $('.i-card').innerHTML = bankCardSVG('i'); $('.i-sg').innerHTML = sunglassesSVG('i');
  $('.i-strike').innerHTML = `<svg viewBox="0 0 780 100" style="overflow:visible;left:0;top:0;width:100%;height:100%"><path class="isp" pathLength="100" d="M10 70 Q390 20 770 40" fill="none" stroke="#ff3b5c" stroke-width="26" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/></svg>`;
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  $('#A2').innerHTML = $('#A').innerHTML; ['.a-ph', '.a-term', '.a-nose', '.a-m'].forEach(s => $('#A2 ' + s).innerHTML = ''); buildA('#A2', '2'); $('#A2 .a-m').innerHTML = mascotSVG('a2m');
  mascotLife(); mascotTalk();
  // the phone is the narrator: every phone face talks with the voice, the mascot keeps its mouth shut and acts
  $$('.m').forEach(m => mascotQuiet(m, 0, TOTAL + 1));
  const quietPh = new Set(['.b-ph', '.e-ph'].map(s => $(s)));
  $$('.kmouth').forEach(m => { const box = m.closest('svg').parentElement; if (quietPh.has(box)) return; idle(m, t => { const a = clamp((venv(t) - 0.07) / 0.55); return { sy: 0.9 * Math.pow(a, 0.8) }; }); });
  $$('.kbrow').forEach(b => idle(b, t => { const d = venv(t) - venv(t - 0.12); return { y: d > 0.18 ? -8 * Math.min(1, (d - 0.18) / 0.2) : 0 }; }));
  { const n = Math.max(1, Math.round(TOTAL / 2.9)), P = TOTAL / n;
    $$('.keye').forEach((e, i) => idle(e, t => { if (t < 0.6 || t > TOTAL - 0.8) return {}; const u = (t + hash(i * 2.3) * P) % P; return { sy: u < 0.18 ? 1 - 0.9 * Math.sin(Math.PI * u / 0.18) : 1 }; })); }

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('b1'), tC = cut('b2'), tD = cut('c1'), tE = cut('j1'), tF = cut('q1'), tG = cut('r1'), tH = cut('j2'), tI = cut('v1'), tLoop = TOTAL - 0.8;
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
    $('#floor').style.transform = `translate(${(-(x * 1.0) % 120).toFixed(1)}px,0)`;
  });
  grade(0, 'transparent'); grade(tB, 'rgba(255,184,77,.10)'); grade(tD, 'rgba(95,224,255,.12)'); grade(tE - 0.2, 'rgba(255,120,160,.22)');
  grade(tF, 'rgba(30,30,90,.40)'); grade(tG, 'rgba(140,110,255,.14)'); grade(tH - 0.2, 'rgba(255,170,60,.24)'); grade(tI, 'rgba(95,224,255,.12)'); grade(tLoop + 0.3, 'transparent');
  $$('.m').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2') && !m.closest('#E')) idle(m, t => ({ y: 6 * Math.sin(W2 * 16 * t + i), r: 1.4 * Math.sin(W2 * 8 * t + i) })); });
  const bob = (sel, k = 6, amp = 10) => idle(sel, t => ({ y: amp * Math.sin(W2 * k * 2 * t), r: 2.2 * Math.sin(W2 * k * t) }));
  bob('.a-ph', 6, 8); bob('.f-ph', 7, 6); bob('.g-ph', 6, 6); bob('.d-ph', 5, 5);
  const legs = (sel, t0, t1, P = 0.24) => { const q = s => $$(sel + ' ' + s); for (let t = t0, k = 0; t < t1 - 0.05; t += P, k++) { tw(q('.klegL'), t, P, { r: [k % 2 ? 18 : -18, k % 2 ? -18 : 18] }, 'inOut'); tw(q('.klegR'), t, P, { r: [k % 2 ? -18 : 18, k % 2 ? 18 : -18] }, 'inOut'); } tw(q('.klegL'), t1, 0.2, { r: [0, 0] }); tw(q('.klegR'), t1, 0.2, { r: [0, 0] }); };
  const parm = (sel, t, a, b, d = 0.3, cls = '.karmR') => tw($$(sel + ' ' + cls), t, d, { r: [a, b] }, 'back');

  // ================= A: hook — «Я ВРУ КАССЕ»: the phone talks, its nose grows on «вру» =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  hide('#A .a-nose');
  punch('#A .a-t', W('hook', 0) + 0.02, 0.1);
  parm('#A .a-ph', W('hook', 1) - 0.1, 0, 60, 0.35, '.karmL'); parm('#A .a-ph', W('hook', 1), 0, -50);   // «твой телефон»: hands to the chest
  mascotPose('#A .a-m', W('hook', 0) + 0.15, 'point');
  { const tn = W('hook', 5) - 0.04;       // «вру»: Pinocchio nose shoots out, the camera pushes in
    tw('#A .a-nose', tn, 0.05, { o: [0, 1] }, 'lin'); tw('#A .a-nose', tn, 0.4, { sx: [0.1, 1] }, 'back'); sfx('zap', tn, 0.5);
    tw('#A .a-ph .kpup', tn, 0.2, { x: [0, -8], y: [0, -4] }, 'out'); parm('#A .a-ph', tn, -50, 30, 0.3); parm('#A .a-ph', tn, 60, -20, 0.3, '.karmL');
    mascotPose('#A .a-m', tn + 0.05, 'shock'); jump('#A .a-m', tn + 0.1, 50, 0.4, '#A .a-shd3');
    punch('#A .a-t2', W('hook', 6), 0.1);
    tw('#A .a-term .tbeep', W('hook', 6), 0.12, { o: [0.25, 1] }, 'lin'); tw('#A .a-term .tbeep', W('hook', 6) + 0.25, 0.2, { o: [1, 0.25] }, 'lin'); sfx('blip', W('hook', 6), 0.4);
    tw('#A .a-term', W('hook', 6), 0.3, { r: [0, -6] }, 'back'); }

  // ================= B: 16 digits on your card =================
  tWhip('#A', '#B', tB, 0.46);
  hide('.b-ph');
  tw('.b-card', tB - 0.05, 0.6, { r: [14, -3], y: [80, 0] }, 'back');
  const tD0 = W('b1', 2), tD1 = W('b1', 4) + 0.1;
  for (let i = 0; i < 16; i++) { const t = tD0 + (tD1 - tD0) * i / 15; tw(`.b-card .cd${i}`, t, 0.18, { s: [2.2, 1] }, 'back'); tw(`.b-card .cd${i}`, 0, 0.001, { o: [0.25, 0.25] }); tw(`.b-card .cd${i}`, t, 0.06, { o: [0.25, 1] }, 'lin'); if (i % 2 === 0) sfx('tick', t, 0.3); }
  $$('.b-card [class^=cd]').forEach(c => c.style.transformBox = 'fill-box', 0);
  $$('.b-card circle[class^=cd]').forEach(c => { c.style.transformBox = 'fill-box'; c.style.transformOrigin = 'center'; });
  { const el = $('.bnum'); custom(t => { el.textContent = Math.round(16 * clamp((t - tD0 + 0.05) / (tD1 - tD0))); }); }
  slideIn('.b-u', W('b1', 4), 'down', 0.5, 140);
  tw('.b-card .cshine', W('b1', 4), 0.6, { x: [0, 800] }, 'inOut');
  punch('.b-n', W('b1', 3) + 0.12, 0.14); sfx('ding', W('b1', 3) + 0.12, 0.5);
  focus('#B > .cam', W('b1', 3), 540, 360, 1.12, 0.45, 0.28, 0.4, 540, 460);
  mascotPose('.b-m', tB + 0.1, 'pointL'); mascotPose('.b-m', W('b1', 4), 'cheer');
  slideIn('.b-ph', W('b1', 4) - 0.1, 'left', 0.5, 260); parm('.b-ph', W('b1', 4) + 0.2, 0, -100);

  // ================= C: you tap me — the till is sure it got them =================
  morphCut('#B', '#C', tC, '.b-ph', '.c-ph', 0.6);
  hide('.c-bub'); hide('.c-bcard');
  mascotPose('.c-m', tC + 0.2, 'point');
  { const t0 = W('b2', 1); const [px, py] = ctr('.c-ph'), [tx, ty] = ctr('.c-term');
    // the phone walks to the terminal and leans its back on it; the waves, the beep, the green check
    tw('.c-ph', t0, 0.7, { x: [0, tx - px - 210], y: [0, -60], r: [0, 14] }, 'inOut'); legs('.c-ph', t0, t0 + 0.7);
    parm('.c-ph', t0, 0, -70, 0.4);
    const tt = t0 + 0.72;
    tw('.c-ph .pnfc', tt - 0.1, 0.1, { o: [0, 1] }, 'lin');
    tw('.c-term .twaves', tt, 0.3, { s: [1, 1.25] }, 'back'); tw('.c-term .twaves', tt + 0.3, 0.2, { o: [1, 0] }, 'lin');
    tw('.c-term .tglow', tt + 0.25, 0.15, { o: [0, 0.6] }, 'lin'); tw('.c-term .tglow', tt + 0.6, 0.3, { o: [0.6, 0] }, 'lin');
    tw('.c-term .tok', tt + 0.3, 0.1, { o: [0, 1] }, 'lin'); tw('.c-term .tok', tt + 0.3, 0.35, { s: [0.3, 1] }, 'back');
    $$('.c-term .tok').forEach(g => { g.style.transformBox = 'fill-box'; g.style.transformOrigin = 'center'; });
    tw('.c-term .tbeep', tt + 0.3, 0.1, { o: [0.25, 1] }, 'lin'); sfx('blip', tt + 0.3, 0.6); sfx('ding', tt + 0.35, 0.4);
    shake(tt, 0.2, 8); punch('.c-term', tt, 0.06);
    // «касса уверена, что получила их»: the cashier grins, the thought bubble with the card pops, the card shines
    tw('.c-cash .pmouth', W('b2', 6), 0.3, { sy: [1, 1.6] }, 'back'); tw('.c-cash .parmR', W('b2', 7), 0.35, { r: [0, -120] }, 'back');
    tw('.c-cash .phead', W('b2', 7), 0.35, { r: [0, -8] }, 'back');
    popIn('.c-bub', W('b2', 7) - 0.1, 0.4); popIn('.c-bcard', W('b2', 8), 0.4); sfx('pop', W('b2', 7), 0.5); sfx('coin', W('b2', 9), 0.4);
    tw('.c-bcard .cshine', W('b2', 9), 0.5, { x: [0, 800] }, 'inOut');
    tw('.c-ph', W('b2', 6), 0.5, { x: [tx - px - 210, tx - px - 300], r: [14, -6] }, 'inOut');
    tw('.c-ph .kpup', W('b2', 7), 0.2, { x: [0, 8], y: [0, -6] }, 'out');
    parm('.c-ph', W('b2', 8), -70, -10, 0.3); parm('.c-ph', W('b2', 8), 0, 70, 0.35, '.karmL');   // a sly shrug: «ну-ну»
    mascotPose('.c-m', W('b2', 6), 'think'); mascotPose('.c-m', W('b2', 10), 'shrug');
    focus('#C > .cam', W('b2', 8), 330, 380, 1.12, 0.45, 0.28, 0.4, 540, 520); }

  // ================= D: radio — I whisper from 4 cm; farther nobody hears me =================
  tZoom('#C', '#D', tD, 0.5);
  hide('.d-chip'); hide('.d-n'); hide('.d-src'); hide('.d-rul');
  slideIn('.d-chip', W('c1', 0), 'left', 0.6, 400);
  parm('.d-ph', W('c1', 1), 0, -120, 0.3, '.karmR');          // hand at the mouth: a whisper
  { const [px, py] = ctr('.d-ph'), [tx, ty] = ctr('.d-term');
    for (let k = 0; k < 5; k++) { const r = mk('.d-rings', 'ring'); place(r, px + 110 - 60, py - 140 - 60, 120, 120); hide(r);
      const t = W('c1', 1) + k * 0.42; tw(r, t, 0.06, { o: [0, 0.9] }, 'lin'); tw(r, t, 0.9, { s: [0.3, 2.4], x: [0, (tx - px - 110) * 0.8] }, 'out'); tw(r, t + 0.5, 0.4, { o: [0.9, 0] }, 'lin'); sfx('blip', t, 0.2); }
    tw('.d-term .tbeep', W('c1', 3), 0.1, { o: [0.25, 1] }, 'lin'); }
  tw('.d-ph', W('c1', 3), 0.6, { x: [0, 150], r: [0, 8] }, 'inOut'); legs('.d-ph', W('c1', 3), W('c1', 3) + 0.6);
  tw('.d-term', W('c1', 3), 0.6, { x: [0, -60] }, 'inOut');
  // «с 4 сантиметров»: the number slams, the ruler slides up, the gap is measured
  slideIn('.d-n', W('c1', 6) - 0.1, 'up', 0.45, 120); sfx('slam', W('c1', 6), 0.6); shake(W('c1', 6) + 0.1, 0.2, 10);
  slideIn('.d-rul', W('c1', 6), 'down', 0.55, 300); tw('.d-rul .rmark', W('c1', 7), 0.5, { sx: [0, 1] }, 'out');
  $$('.d-rul .rmark').forEach(g => { g.style.transformBox = 'fill-box'; g.style.transformOrigin = 'left center'; });
  focus('#D > .cam', W('c1', 6), 540, 420, 1.12, 0.45, 0.28, 0.4, 540, 520);
  mascotPose('.d-m', W('c1', 0), 'pointL'); mascotPose('.d-m', W('c1', 6), 'pointUp');
  // c2 «дальше меня никто не слышит»: the mascot steps away, cups an ear — a question mark, rings die short of it
  tw('.d-m', W('c2', 0), 0.6, { x: [0, 60], y: [0, 10] }, 'inOut'); mascotPose('.d-m', W('c2', 1), 'think');
  { const q = mk('#D .cam', 'qm d-q'); q.textContent = '?'; hide(q); popIn(q, W('c2', 3), 0.35); sfx('pop', W('c2', 3), 0.4);
    idle(q, t => ({ r: t > W('c2', 3) ? 8 * Math.sin((t - W('c2', 3)) * 8) : 0 })); }
  slideIn('.d-src', W('c2', 0) + 0.1, 'left', 0.6, 500);
  tw('.d-ph .kpup', W('c2', 2), 0.2, { x: [0, 8] }, 'out');

  // ================= E: joke — a thief in the metro would have to hug you, and borrow your face =================
  tDrop('#D', '#E', tE, 0.5);
  hide('.e-mask'); hide('.e-x');
  tw('.e-th, .e-thm, .e-term', tE, 0.001, { x: [-560, -560] });
  { const t0 = W('j1', 0) - 0.05;
    tw('.e-th, .e-thm, .e-term', t0, 0.55, { x: [-560, 0] }, 'out'); sfx('whoosh', t0, 0.5);
    idle('.e-th, .e-thm', t => (t > t0 && t < t0 + 0.6) ? { y: -10 * Math.abs(Math.sin((t - t0) * 16)) } : {}); }
  mascotPose('.e-m', W('j1', 1), 'think');
  // «обнять»: the thief slides into the mascot, both arms around it; hearts, the mascot blushes in shock
  { const tH0 = W('j1', 4) - 0.1;
    tw('.e-th, .e-thm', tH0, 0.35, { x: [0, 250] }, 'out'); tw('.e-term', tH0, 0.35, { x: [0, 300], y: [0, 40] }, 'out');
    tw('.e-th .parmL', tH0 + 0.1, 0.3, { r: [0, -95] }, 'back'); tw('.e-th .parmR', tH0 + 0.1, 0.3, { r: [0, -150] }, 'back');
    mascotPose('.e-m', tH0 + 0.2, 'shock'); tw('.e-m', tH0 + 0.25, 0.3, { sx: [1, 0.92] }, 'back'); sfx('thud', tH0 + 0.3, 0.6);
    for (let k = 0; k < 6; k++) { const h = mk('.e-hearts', 'heart'); place(h, 520 + 50 * k, 760 + 30 * (k % 2)); hide(h); const t = tH0 + 0.35 + k * 0.07;
      tw(h, t, 0.06, { o: [0, 1] }, 'lin'); tw(h, t, 0.9, { y: [0, -220 - 60 * hash(k)], x: [0, (hash(k + 3) - 0.5) * 120], s: [0.4, 1.1] }, 'out'); tw(h, t + 0.7, 0.3, { o: [1, 0] }, 'lin'); }
    sfx('pop', tH0 + 0.35, 0.4);
    focus('#E > .cam', tH0 + 0.2, 700, 900, 1.15, 0.6); }
  // «одолжить твоё лицо»: the thief steps back and holds up a mask of the mascot's face on a stick; the phone flashes a red cross
  { const tM = W('j1', 7) - 0.05;
    tw('.e-th, .e-thm', tM, 0.4, { x: [250, 40] }, 'inOut'); tw('.e-th .parmL', tM, 0.3, { r: [-95, 0] }, 'out'); tw('.e-th .parmR', tM, 0.3, { r: [-150, -40] }, 'out');
    tw('.e-term', tM, 0.4, { x: [300, 20], y: [40, 0] }, 'inOut');
    mascotPose('.e-m', tM + 0.1, 'shrug'); tw('.e-m', tM, 0.3, { sx: [0.92, 1] }, 'back');
    tw('.e-mask', W('j1', 9) - 0.15, 0.08, { o: [0, 1] }, 'lin'); tw('.e-mask', W('j1', 9) - 0.15, 0.45, { y: [260, 0], r: [-30, -6] }, 'back'); sfx('whoosh', W('j1', 9) - 0.15, 0.4);
    idle('.e-mask', t => t > W('j1', 9) + 0.3 ? { r: 3 * Math.sin((t - W('j1', 9)) * 9) } : {});
    popIn('.e-x', W('j1', 10) + 0.05, 0.35); tw('.exp', W('j1', 10) + 0.12, 0.25, { dash: [100, 0] }, 'out'); sfx('buzz', W('j1', 10) + 0.1, 0.5);
    tw('.e-th .phead', W('j1', 10) + 0.25, 0.3, { r: [0, 12] }, 'back');
    mascotPose('.e-m', W('j1', 10) + 0.25, 'cheer'); }

  // ================= F: «Так что я ей отдаю?» — the phone alone in a spotlight =================
  tCircle('#E', '#F', tF, 540, 760);
  mascotPose('.f-m', tF + 0.15, 'think');
  parm('.f-ph', W('q1', 0), 0, -130, 0.35, '.karmR'); tw('.f-ph .kpup', W('q1', 1), 0.2, { x: [0, -8], y: [0, -8] }, 'out');
  for (let k = 0; k < 3; k++) { const q = mk('#F .cam', 'qm'); q.textContent = '?'; place(q, 270 + k * 230, 260 + (k % 2) * 70); hide(q); popIn(q, W('q1', 0) + k * 0.16, 0.3); sfx('pop', W('q1', 0) + k * 0.16, 0.3);
    idle(q, t => ({ y: 8 * Math.sin(W2 * 20 * t + k) })); }
  focus('#F > .cam', W('q1', 4) - 0.1, 540, 650, 1.1, 0.35);

  // ================= G: a twin — another number kept in a separate chip-safe; plus a code for one purchase =================
  morphCut('#F', '#G', tG, '.f-ph', '.g-ph', 0.6);
  hide('.g-twin'); hide('.g-tk'); hide('.g-c1'); hide('.g-c2'); hide('.g-card');
  mascotPose('.g-m', tG + 0.2, 'shock');
  // «Двойника»: the real card slides in and is swallowed by the safe chip; out comes the violet twin
  { const tc = W('r1', 0) - 0.15, [cx, cy] = ctr('.g-card'), [sx, sy] = ctr('.g-chip');
    tw('.g-chip .vdoor', tc - 0.1, 0.35, { sx: [1, 0.15] }, 'out'); sfx('clink', tc, 0.5);
    tw('.g-card', tc, 0.08, { o: [0, 1] }, 'lin'); tw('.g-card', tc, 0.4, { x: [-400, 0] }, 'out');
    arc('.g-card', tc + 0.45, 0.55, sx - cx, sy - cy, 120, -12); tw('.g-card', tc + 0.45, 0.55, { s: [1, 0.35] }, 'inOut'); tw('.g-card', tc + 0.95, 0.08, { o: [1, 0] }, 'lin');
    sfx('whoosh', tc + 0.45, 0.4);
    tw('.g-chip .vdoor', tc + 1.0, 0.25, { sx: [0.15, 1] }, 'in'); sfx('slam', tc + 1.22, 0.4); shake(tc + 1.25, 0.2, 8);
    tw('.g-chip .vdial', tc + 1.3, 0.6, { r: [0, 270] }, 'back'); sfx('tick', tc + 1.3, 0.4); sfx('tick', tc + 1.5, 0.4);
    // «другой номер»: the twin pops out of the chip, flips, lands bottom-right
    const tt = W('r1', 1) - 0.1, [twx, twy] = ctr('.g-twin');
    tw('.g-twin', tt, 0.06, { o: [0, 1] }, 'lin'); tw('.g-twin', tt, 0.6, { x: [sx - twx, 0], y: [sy - twy, 0], s: [0.3, 1], r: [-20, 4] }, 'back'); sfx('pop', tt, 0.5);
    burst('#G .cam', 12, sx, sy, tt + 0.05, 230, 7, 'spark');
    for (let i = 0; i < 16; i++) tw(`.g-twin .cd${i}`, tt + 0.5 + i * 0.03, 0.12, { o: [0.2, 1] }, 'lin');
    focus('#G > .cam', W('r1', 2), 780, 1010, 1.12, 0.45, 0.28, 0.4, 600, 820);
    slideIn('.g-c1', W('r1', 6), 'left', 0.55, 400); sfx('whoosh', W('r1', 6), 0.4);
    punch('.g-chip', W('r1', 7) + 0.05, 0.08); tw('.g-chip .vdial', W('r1', 7), 0.5, { r: [270, 360] }, 'back');
    mascotPose('.g-m', W('r1', 1), 'pointL'); mascotPose('.g-m', W('r1', 6), 'think');
    parm('.g-ph', W('r1', 0), 0, -110, 0.35); parm('.g-ph', W('r1', 4), -110, -40, 0.35); }
  // r2 «и к нему — код … для одной покупки»: the ticket flies onto the twin, the chip swaps
  { const t0 = W('r2', 3) - 0.1;
    tw('.g-tk', t0, 0.06, { o: [0, 1] }, 'lin'); tw('.g-tk', t0, 0.55, { x: [500, 0], y: [-300, 0], r: [40, -8] }, 'back'); sfx('whoosh', t0, 0.4); sfx('pop', t0 + 0.5, 0.4);
    slideOut('.g-c1', W('r2', 5), 'left', 0.3, 300); slideIn('.g-c2', W('r2', 6) - 0.05, 'left', 0.6, 500); sfx('whoosh', W('r2', 6), 0.4);
    punch('.g-tk', W('r2', 8), 0.12); sfx('ding', W('r2', 8), 0.5);
    mascotPose('.g-m', W('r2', 3), 'pointL'); mascotPose('.g-m', W('r2', 8), 'cheer'); jump('.g-m', W('r2', 8) + 0.05, 45, 0.4);
    parm('.g-ph', W('r2', 3), -40, -120, 0.35); tw('.g-ph .kpup', W('r2', 3), 0.2, { x: [0, 9] }, 'out'); }

  // ================= H: joke — steal the code, and it's like a punched bus ticket =================
  tSlideUp('#G', '#H', tH, 0.55);
  hide('.h-x');
  idle('.h-bg .bstreet', t => (t > tH - 0.5 && t < tI + 0.6) ? { x: -((t - tH) * 260) % 2080 } : {});
  // «Украдут код»: the thief snatches the ticket, grins, runs to the validator
  { const t0 = W('j2', 0);
    tw('.h-th, .h-thm', t0 - 0.2, 0.45, { x: [-500, 0] }, 'out'); sfx('whoosh', t0 - 0.2, 0.5);
    tw('.h-tk', t0 - 0.2, 0.45, { x: [-200, 0], r: [0, -10] }, 'out');
    tw('.h-th .parmR', t0 + 0.2, 0.3, { r: [0, -110] }, 'back'); tw('.h-th .pmouth', W('j2', 1), 0.3, { sy: [1, 1.6] }, 'back');
    mascotPose('.h-m', t0, 'shock');
    // the thief sticks the ticket into the validator: chomp — holes — red cross
    const tv = W('j2', 2) - 0.05, [kx, ky] = ctr('.h-tk'), [vx, vy] = ctr('.h-val');
    arc('.h-tk', tv, 0.45, vx - kx - 10, vy - ky + 10, 90, 8);
    tw('.h-val .vjaw', W('j2', 6) - 0.05, 0.08, { y: [0, 22] }, 'in'); tw('.h-val .vjaw', W('j2', 6) + 0.05, 0.25, { y: [22, 0] }, 'back');
    sfx('clink', W('j2', 6), 0.8); shake(W('j2', 6), 0.2, 12);
    tw('.h-tk .thole', W('j2', 6) + 0.02, 0.05, { o: [0, 1] }, 'lin');
    tw('.h-val .vled', W('j2', 6) + 0.1, 0.1, { o: [0.3, 1] }, 'lin'); $('.h-val .vled').setAttribute('fill', '#ff3b5c');
    popIn('.h-x', W('j2', 7), 0.35); tw('.hxp', W('j2', 7) + 0.08, 0.25, { dash: [100, 0] }, 'out'); sfx('buzz', W('j2', 7), 0.6);
    tw('.h-th .parmR', W('j2', 7) + 0.1, 0.35, { r: [-110, -20] }, 'out'); tw('.h-th .pmouth', W('j2', 7), 0.3, { sy: [1.6, -1] }, 'back'); tw('.h-th .phead', W('j2', 7), 0.4, { r: [0, -10] }, 'back');
    tw('.h-th, .h-thm', W('j2', 8), 0.35, { sy: [1, 0.92], y: [0, 26] }, 'out');
    mascotPose('.h-m', W('j2', 7) + 0.1, 'cheer'); jump('.h-m', W('j2', 7) + 0.15, 60, 0.42, '.h-shd2');
    focus('#H > .cam', W('j2', 6), 760, 600, 1.14, 0.55); }

  // ================= I: the till never saw your 16 digits — НЕ БАЙТ; takeaway; loop =================
  morphCut('#H', '#I', tI, '.h-val', '.i-term', 0.55);
  hide('.i-st'); hide('.i-src'); hide('.i-sg'); hide('.i-n'); hide('.i-card');
  slideIn('.i-n', W('v1', 0), 'up', 0.5, 140); punch('.i-n', W('v1', 1), 0.1); sfx('tick', W('v1', 1), 0.4);
  tw('.isp', W('v1', 4), 0.3, { dash: [100, 0] }, 'out'); sfx('zap', W('v1', 4), 0.5);
  tw('.i-n, .i-strike', W('v1', 5) + 0.35, 0.3, { o: [1, 0], y: [0, -60] }, 'in');
  mascotPose('.i-m', W('v1', 0), 'pointUp');
  parm('.i-ph', W('v1', 3), 0, 60, 0.3, '.karmL'); parm('.i-ph', W('v1', 3), 0, -60, 0.3);   // «не видела»: hands spread
  // НЕ БАЙТ: the mascot hops and slams its arm down; the stamp hits the top
  const tSt = W('v1', 6) - 0.02;
  mascotPose('.i-m', tSt - 0.5, 'pointUp'); tw('.i-m', tSt - 0.45, 0.25, { y: [0, -90] }, 'out'); tw('.i-m', tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose('.i-m', tSt - 0.18, 'point', 0.18);
  stamp('.i-st', tSt, -7, 26); burst('.i-fx', 22, 540, 340, tSt + 0.05, 420, 61, 'conf', 140);
  slideIn('.i-src', tSt + 0.35, 'left', 0.6, 500);
  // takeaway «Приложил телефон — и карта не засветилась даже у кассы»: tap, green check; the real card pops up in sunglasses
  { const t0 = W('m1', 0) - 0.05, [px, py] = ctr('.i-ph'), [tx, ty] = ctr('.i-term');
    tw('.i-ph', t0, 0.5, { x: [0, tx - px - 160], r: [0, 12] }, 'inOut'); legs('.i-ph', t0, t0 + 0.5);
    const tt = W('m1', 1) + 0.05;
    tw('.i-term .tglow', tt, 0.12, { o: [0, 0.6] }, 'lin'); tw('.i-term .tglow', tt + 0.4, 0.3, { o: [0.6, 0] }, 'lin');
    tw('.i-term .tok', tt + 0.05, 0.1, { o: [0, 1] }, 'lin'); tw('.i-term .tok', tt + 0.05, 0.35, { s: [0.3, 1] }, 'back');
    $$('.i-term .tok').forEach(g => { g.style.transformBox = 'fill-box'; g.style.transformOrigin = 'center'; });
    sfx('blip', tt, 0.6); sfx('ding', tt + 0.05, 0.4); punch('.i-term', tt, 0.06);
    tw('.i-ph', W('m1', 2) + 0.1, 0.45, { x: [tx - px - 160, 0], r: [12, 0] }, 'inOut');
    const tc = W('m1', 3) - 0.1;
    tw('.i-card', tc, 0.06, { o: [0, 1] }, 'lin'); tw('.i-card', tc, 0.5, { y: [300, 0], r: [-20, -6] }, 'back'); sfx('pop', tc, 0.5);
    tw('.i-sg', W('m1', 5) - 0.05, 0.06, { o: [0, 1] }, 'lin'); tw('.i-sg', W('m1', 5) - 0.05, 0.35, { y: [-260, 0], r: [-20, -6] }, 'in'); sfx('clink', W('m1', 5) + 0.28, 0.5);
    tw('.i-card .cshine', W('m1', 6), 0.5, { x: [0, 800] }, 'inOut');
    mascotPose('.i-m', W('m1', 1), 'point'); mascotPose('.i-m', W('m1', 5), 'cheer'); }
  tw('#I .i-st, #I .i-src, #I .conf, #I .i-card, #I .i-sg, #I .shd', tLoop - 0.4, 0.35, { o: [1, 0] }, 'in');
  hide('#A2 .a-nose');
  loopTo('#A2', tLoop); tw('#I .i-m, #I .i-ph, #I .i-term', tLoop + 0.42, 0.001, { o: [1, 0] });
}, { chunks: {} });
