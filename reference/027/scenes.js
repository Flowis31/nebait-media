// 027 «320 млн заказов за неделю. Сколько сделали нейронки?» — Новость (короткий формат, понедельник). Монолог предмета: рассказывает
TIMING.words.forEach(w => { w.d = w.d.replace(/\s—$/, ''); });
// само такси (фары-глаза, решётка-рот); маскот молчит и действует. Источник: TechCrunch 04.11.2026 (отчёт Uber за 3-й квартал).
// Свой мир (ночная улица в Хэллоуин), параллакс, наезды, прыжки со сквошем, дуги, частицы, 3 склейки-превращения.
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
    const cols = ['#ffd34d', '#ff3b5c', '#5fe0ff', '#7dff8a', '#ff9f2e'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.8, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.6, 0.25, { o: [1, 0] }, 'lin'); } };
  const ctr = el => { const r = (typeof el === 'string' ? $(el) : el).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
  const ringAt = (par, x, y, t, sz = 110, col = '#fff') => { const r = mk(par, 'ring'); r.style.borderColor = col; place(r, x - sz / 2, y - sz / 2, sz, sz); hide(r);
    tw(r, t, 0.05, { o: [0, 1] }, 'lin'); tw(r, t, 0.45, { s: [0.4, 1.7] }, 'out'); tw(r, t + 0.25, 0.2, { o: [1, 0] }, 'lin'); };

  // ---------- world ----------
  $('#stars').innerHTML = `<div style="position:absolute;left:0;top:0;width:2400px;height:700px">${starsSVG()}</div><div style="position:absolute;left:2400px;top:0;width:2400px;height:700px">${starsSVG()}</div>`;
  $('#moon').innerHTML = moonSVG(); $('#sky2').innerHTML = skylineSVG(); $('#shops').innerHTML = shopsSVG(); $('#near').innerHTML = nearSVG();
  dof('#sky2', 3); dof('#shops', 1.6);
  lookFX({ grain: 0.11, tint: 'transparent' });

  // ---------- props ----------
  $('#A .a-taxi').innerHTML = taxiSVG('a');
  $('.b-taxi').innerHTML = taxiSVG('b'); $('.b-box').innerHTML = burgerBoxSVG('b'); $('.b-pk1').innerHTML = pumpkinSVG('b1'); $('.b-pk2').innerHTML = pumpkinSVG('b2');
  $('.q-taxi').innerHTML = taxiSVG('q'); $('.q-bot').innerHTML = botSVG('q');
  $('.c-bot').innerHTML = botSVG('c'); $('.c-ph').innerHTML = phonePropSVG('c');
  $('.p-bot1').innerHTML = botSVG('p1', '#ff8ad8'); $('.p-bot2').innerHTML = botSVG('p2', '#7dff8a'); $('.p-tr1').innerHTML = trumpetSVG('p1'); $('.p-tr2').innerHTML = trumpetSVG('p2');
  $('.p-pk').innerHTML = pumpkinSVG('p', false); $('.p-taxi').innerHTML = taxiSVG('p');
  $('.r-tal').innerHTML = tallySVG('r'); $('.r-taxi').innerHTML = taxiSVG('r');
  $('.j-taxi').innerHTML = taxiSVG('j', 4);
  $('.h-taxi').innerHTML = taxiSVG('h'); $('.h-bot').innerHTML = botSVG('h'); $('.h-sw').innerHTML = stopwatchSVG('h', '#ffb020'); $('.h-ph').innerHTML = phonePropSVG('h');
  $$('.mm').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  // sunglasses for the lounging mascot in P (overlay inside the mascot box, so they move with it)
  const glP = mk('.p-m', 'glP', sunglassesSVG('p')); place(glP, 0, 0, 420, 420);
  // a flood of small orders in the hook: taxis and burger boxes streaming past behind the title
  const flood = [];
  for (let k = 0; k < 16; k++) { const isTaxi = k % 3 !== 2; const el = mk('#A .a-fx', 'mini', isTaxi ? taxiSVG('fl' + k, 0, false) : burgerBoxSVG('fl' + k));
    const y = 60 + 560 * hash(k * 2.7 + 1), sc = 0.55 + 0.5 * hash(k * 5.1); place(el, -200, y, 120 * sc, 104 * sc); el.style.opacity = 0.75; flood.push({ el, k, y }); }
  // loop clone = A's frame-0 pose (own gradient ids, no flood)
  $('#A2').innerHTML = $('#A').innerHTML; $('#A2 .a-fx').innerHTML = ''; $('#A2 .a-taxi').innerHTML = taxiSVG('a2'); $('#A2 .a-m').innerHTML = mascotSVG('a2m');
  mascotLife(); mascotTalk();
  $$('.mm').forEach(m => mascotQuiet(m, 0, TOTAL + 1));                     // the taxi narrates; the mascot only acts
  // the taxi's grille-mouth and brows follow the voice
  $$('.kmouth').forEach(m => idle(m, t => ({ sy: 0.12 + 0.88 * Math.pow(clamp((venv(t) - 0.07) / 0.55), 0.8) })));
  $$('.kbrow').forEach(b => idle(b, t => { const d = venv(t) - venv(t - 0.12); return { y: d > 0.18 ? -9 * Math.min(1, (d - 0.18) / 0.2) : 0 }; }));
  // taxi blinks (headlight lids) — deterministic, loop-safe
  $$('.keye').forEach((e, i) => { const P = TOTAL / 7, ph = hash(i * 2.3) * P; idle(e, t => { if (t < 0.6 || t > TOTAL - 0.8) return {}; const u = (t + ph) % P; return { sy: u < 0.16 ? 1 - 0.9 * Math.sin(Math.PI * u / 0.16) : 1 }; }); });
  // engine idle: every taxi trembles a little
  $$('.a-taxi, .b-taxi, .q-taxi, .r-taxi, .j-taxi, .h-taxi').forEach((el, i) => idle(el, t => ({ y: 2.2 * Math.sin(t * 38 + i), r: 0.25 * Math.sin(t * 23 + i) })));

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('b1'), tQ = cut('q1'), tC = cut('c1'), tP = cut('p1'), tR = cut('r1'), tJ = cut('j1'), tH = cut('v1'), tLoop = TOTAL - 0.72;
  const CUTS = [0, tB, tQ, tC, tP, tR, tJ, tH], IDS = ['#A', '#B', '#Q', '#C', '#P', '#R', '#J', '#H'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 210 * easeIO((t - c + 0.35) / 0.7); }); x -= 1470 * easeIO((t - tLoop) / 0.6); return x; };
  custom(t => {
    const x = camX(t);
    $('#stars').style.transform = `translate(${(-(x * 0.05 + t * 6) % 2400).toFixed(1)}px,0)`;
    $('#moon').style.transform = `translate(${(-x * 0.03).toFixed(1)}px,${(4 * Math.sin(W2 * 2 * t)).toFixed(1)}px)`;
    $('#sky2').style.transform = `translate(${(-x * 0.18).toFixed(1)}px,0)`;
    $('#shops').style.transform = `translate(${(-x * 0.45).toFixed(1)}px,0)`;
    $('#near').style.transform = `translate(${(-x * 0.95).toFixed(1)}px,0)`;
    $('#dash').style.transform = `translate(${(-(x * 1.0) % 260).toFixed(1)}px,0)`;
  });
  grade(0, 'transparent'); grade(tB, 'rgba(255,140,40,.16)'); grade(tQ, 'rgba(70,40,150,.22)'); grade(tC, 'rgba(95,200,255,.12)');
  grade(tP, 'rgba(255,90,170,.16)'); grade(tR, 'rgba(255,211,77,.14)'); grade(tJ - 0.2, 'rgba(255,90,60,.26)'); grade(tH, 'rgba(255,59,92,.14)'); grade(tLoop + 0.3, 'transparent');
  $$('.mm').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2')) idle(m, t => ({ y: 6 * Math.sin(W2 * 16 * t + i), r: 1.4 * Math.sin(W2 * 8 * t + i) })); });
  const bob = (sel, k = 6, amp = 8) => idle(sel, t => ({ y: amp * Math.sin(W2 * k * 2 * t), r: 1.5 * Math.sin(W2 * k * t) }));
  bob('.q-bot', 5, 8); bob('.p-bot1', 6, 7); bob('.p-bot2', 7, 7); bob('.h-bot', 4, 5);

  // ================= A: hook — «320 МИЛЛИОНОВ ЗАКАЗОВ ЗА НЕДЕЛЮ», a flood of orders, the mascot hails the taxi =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  punch('#A .a-n', W('hook', 0) + 0.05, 0.12); sfx('ding', W('hook', 0) + 0.1, 0.35);
  punch('#A .a-t2', W('hook', 1), 0.1); punch('#A .a-t3', W('hook', 2), 0.1); punch('#A .a-t3', W('hook', 4), 0.08);
  flood.forEach(({ el, k }) => { const t0 = 0.05 + 0.13 * k, d = 1.3 + 0.5 * hash(k * 3.3);
    tw(el, t0, d, { x: [0, 1350], r: [-8, 8] }, 'lin'); if (k % 4 === 0) sfx('whoosh', t0 + 0.2, 0.18); });
  mascotPose('#A .a-m', 0.25, 'wave'); mascotPose('#A .a-m', W('hook', 2), 'pointUp'); mascotPose('#A .a-m', W('hook', 4), 'shock');
  jump('#A .a-m', W('hook', 2) - 0.05, 60, 0.42, '#A .a-shd2');
  tw('#A .a-taxi .tbeam', 0.3, 0.3, { o: [0, 1] }, 'lin'); sfx('blip', 0.35, 0.35);
  tw('#A .a-taxi .tmirR', W('hook', 1), 0.35, { r: [0, -30] }, 'back'); tw('#A .a-taxi .tmirR', W('hook', 3), 0.35, { r: [-30, 0] }, 'back');

  // ================= B: «Это я, такси Uber, и доставка еды в Хэллоуин» =================
  tWhip('#A', '#B', tB);
  hide('.b-box'); hide('.b-pk1'); hide('.b-pk2'); hide('.b-chip');
  tw('.b-taxi .tmirL', W('b1', 0), 0.35, { r: [0, 40] }, 'back'); tw('.b-taxi .tmirR', W('b1', 0), 0.35, { r: [0, -40] }, 'back');   // «это я»: both mirrors to itself
  tw('.b-taxi .tmirL', W('b1', 4), 0.35, { r: [40, 0] }, 'back'); tw('.b-taxi .tmirR', W('b1', 4), 0.35, { r: [-40, 0] }, 'back');
  jump('.b-taxi', W('b1', 1), 40, 0.4, '.b-shd1');
  // «такси Uber»: the roof sign flashes
  [W('b1', 2), W('b1', 3)].forEach(t => { punch('.b-taxi .tsign', t, 0.18); sfx('blip', t, 0.4); });
  tw('.b-taxi .tbeam', W('b1', 2), 0.25, { o: [0, 1] }, 'lin');
  mascotPose('.b-m', W('b1', 0) + 0.1, 'pointL');
  // «и доставка еды»: a burger box slides in and hops onto the roof
  slideIn('.b-box', W('b1', 5) - 0.1, 'right', 0.45, 400); sfx('whoosh', W('b1', 5) - 0.1, 0.4);
  { const [bx, by] = ctr('.b-box'), [tx, ty] = ctr('.b-taxi'); const t0 = W('b1', 6) - 0.05;
    arc('.b-box', t0, 0.5, tx - bx, (ty - 330) - by, 160, -12); tw('.b-box', t0, 0.5, { s: [1, 0.8] }, 'inOut'); sfx('pop', t0 + 0.5, 0.5);
    tw('.b-taxi', t0 + 0.48, 0.08, { sy: [1, 0.95] }, 'out'); tw('.b-taxi', t0 + 0.56, 0.3, { sy: [0.95, 1] }, 'back'); }
  tw('.b-box .blid', W('b1', 6) + 0.6, 0.3, { r: [0, -40] }, 'back');
  mascotPose('.b-m', W('b1', 5), 'point');
  // «в Хэллоуин»: pumpkins pop up, bats fly, the chip slides in
  popIn('.b-pk1', W('b1', 8) - 0.05, 0.4); popIn('.b-pk2', W('b1', 8) + 0.1, 0.4); sfx('pop', W('b1', 8), 0.5); sfx('pop', W('b1', 8) + 0.15, 0.4);
  tw('.b-pk1 .pkglow, .b-pk2 .pkglow', W('b1', 8), 0.4, { o: [0, 1] }, 'lin');
  slideIn('.b-chip', W('b1', 7) - 0.1, 'left', 0.55, 500); sfx('whoosh', W('b1', 7) - 0.1, 0.4);
  for (let k = 0; k < 6; k++) { const b = mk('#B .cam', 'bat', `<svg viewBox="0 0 80 40" style="width:100%;height:100%"><path d="M0 14 Q14 2 24 14 Q32 4 40 14 Q48 4 56 14 Q66 2 80 14 Q62 22 52 36 Q46 26 40 34 Q34 26 28 36 Q18 22 0 14 Z" fill="#1a1024" stroke="#0a130d" stroke-width="3"/></svg>`);
    place(b, 1100, 330 + 70 * k); hide(b); const t0 = W('b1', 8) + 0.05 * k;
    tw(b, t0, 0.05, { o: [0, 1] }, 'lin'); tw(b, t0, 0.9, { x: [0, -1300], y: [0, -60 + 100 * hash(k)] }, 'lin'); idle(b, t => ({ sy: 0.6 + 0.4 * Math.abs(Math.sin(t * 20 + k)) })); }
  sfx('whoosh', W('b1', 8) + 0.1, 0.35);
  mascotPose('.b-m', W('b1', 8), 'cheer'); jump('.b-m', W('b1', 8) + 0.05, 70, 0.45, '.b-shd2');

  // ================= Q: «А сколько раз меня заказали нейронки?» =================
  tZoom('#B', '#Q', tQ);
  hide('.q-bot');
  tw('.q-taxi .kpup', W('q1', 1), 0.3, { x: [0, -12], y: [0, 4] }, 'out');
  tw('.q-taxi .tmirL', W('q1', 3), 0.3, { r: [0, 40] }, 'back'); tw('.q-taxi .tmirL', W('q1', 4) + 0.2, 0.3, { r: [40, 0] }, 'back');
  mascotPose('.q-m', W('q1', 0), 'think');
  // «нейронки?»: the bot springs up from below
  tw('.q-bot', W('q1', 4), 0.06, { o: [0, 1] }, 'lin'); tw('.q-bot', W('q1', 4), 0.5, { y: [520, 0] }, 'back'); sfx('whoosh', W('q1', 4), 0.4);
  tw('.q-bot .bant', W('q1', 5), 0.4, { r: [-18, 0] }, 'elastic'); tw('.q-bot .bglow', W('q1', 5), 0.15, { o: [0.4, 1] }, 'lin'); sfx('blip', W('q1', 5), 0.5);
  tw('.q-bot .barmL', W('q1', 5), 0.35, { r: [0, 70] }, 'back'); tw('.q-bot .barmR', W('q1', 5), 0.35, { r: [0, -70] }, 'back');
  for (let k = 0; k < 3; k++) { const q = mk('#Q .cam', 'qm'); q.textContent = '?'; place(q, 120 + k * 330, 250 + (k % 2) * 80); hide(q); popIn(q, W('q1', 5) + k * 0.12, 0.3); sfx('pop', W('q1', 5) + k * 0.12, 0.3); }
  mascotPose('.q-m', W('q1', 5), 'shrug');
  focus('#Q > .cam', W('q1', 5), 260, 700, 1.1, 0.35);

  // ================= C: the agent = a chatbot; you say «вызови такси», it presses the buttons itself =================
  morphCut('#Q', '#C', tC, '.q-bot', '.c-bot', 0.6, 12);
  hide('.c-chip'); hide('.c-say');
  slideIn('.c-chip', W('c1', 0), 'left', 0.6, 500); sfx('whoosh', W('c1', 0), 0.4);
  punch('.c-bot', W('c1', 0) + 0.45, 0.08);
  mascotPose('.c-m', W('c1', 0), 'point');
  // «это чат-бот»: a chat bubble with typing dots pops over the bot's head
  const cTyp = mk('#C .cam', 'ctyp', chatSVG('ct', '#c9f0ff', '', 'left')); place(cTyp, 470, 470, 210, 140); hide(cTyp);
  popIn(cTyp, W('c1', 2) - 0.05, 0.35); sfx('pop', W('c1', 2), 0.45);
  for (let k = 1; k <= 3; k++) for (let j = 0; j < 3; j++) tw('.ctyp .dot' + k, W('c1', 2) + 0.1 + j * 0.3 + k * 0.08, 0.15, { y: [0, -12] }, 'out'), tw('.ctyp .dot' + k, W('c1', 2) + 0.25 + j * 0.3 + k * 0.08, 0.15, { y: [-12, 0] }, 'in');
  tw('.c-bot .bmouth', W('c1', 2), 0.25, { sy: [0.25, 0.8] }, 'back'); tw('.c-bot .bmouth', W('c1', 3), 0.25, { sy: [0.8, 0.25] }, 'out');
  // «скажешь «вызови такси»»: the mascot says it, the bubble flies into the bot
  tw(cTyp, W('c1', 3) - 0.05, 0.3, { o: [1, 0], s: [1, 0.5] }, 'in');
  mascotPose('.c-m', W('c1', 3), 'pointUp');
  popIn('.c-say', W('c1', 3), 0.4); sfx('pop', W('c1', 3) + 0.05, 0.5);
  punch('.c-say', W('c1', 4), 0.08); punch('.c-say', W('c1', 5), 0.08);
  { const [sx, sy] = ctr('.c-say'), [bx, by] = ctr('.c-bot'); const t0 = W('c1', 6) - 0.25;
    arc('.c-say', t0, 0.42, bx - sx, (by - 150) - sy, 80, 20); tw('.c-say', t0, 0.42, { s: [1, 0.15] }, 'inOut'); tw('.c-say', t0 + 0.4, 0.05, { o: [1, 0] }, 'lin');
    sfx('whoosh', t0, 0.4); tw('.c-bot .bglow', t0 + 0.42, 0.1, { o: [0.3, 1] }, 'lin'); punch('.c-bot', t0 + 0.42, 0.1); tw('.c-bot .bant', t0 + 0.42, 0.4, { r: [16, 0] }, 'elastic'); }
  slideOut('.c-chip', W('c1', 6), 'left', 0.4, 700);
  // the phone screen: three icon buttons (where to / which car / order)
  const PHB = [[640, 470], [640, 640], [640, 810]].map(([x, y], k) => {
    const b = mk('#C .cam', 'btn' + (k === 2 ? ' go' : ''), k === 0 ? `<div style="left:72px;top:6px;width:70px;height:80px">${pinSVG('cb')}</div>` :
      k === 1 ? `<div style="left:56px;top:6px;width:120px;height:72px">${taxiSVG('cbt', 0, false)}</div>` :
      `<svg viewBox="0 0 100 80" style="left:70px;top:4px;width:96px;height:76px"><path d="M14 40 L40 64 L88 14" fill="none" stroke="#fff" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
    place(b, x, y, 280, 110); hide(b); return b; });
  PHB.forEach((b, k) => popIn(b, W('c1', 1) + k * 0.12, 0.35));
  // «и он сам жмёт кнопки»: a telescopic arm shoots out of the bot and presses the three buttons in turn
  const arm = mk('#C .cam', 'carm', `<svg viewBox="0 0 1080 1400" style="width:1080px;height:1400px;overflow:visible"><path class="armp" d="" fill="none" stroke="#0a130d" stroke-width="30" stroke-linecap="round"/><path class="armc" d="" fill="none" stroke="#6ad1ff" stroke-width="16" stroke-linecap="round"/></svg>`);
  place(arm, 0, 0); const glove = mk('#C .cam', 'cglove'); glove.style.cssText += ';width:64px;height:64px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#d9e4ee);border:8px solid #0a130d';
  const SH = [250 + 308 * 0.825, 620 + 300 * 0.825];
  const PRESS = [W('c1', 7) - 0.12, W('c1', 9) - 0.05, W('c1', 10) + 0.12];
  const target = k => { const r = PHB[k]; return [parseFloat(r.style.left) + 140, parseFloat(r.style.top) + 55]; };
  const posAt = t => { // keyframes: shoulder -> b0 -> b1 -> b2 -> shoulder
    const t0 = PRESS[0] - 0.3; if (t < t0) return null;
    const pts = [SH, target(0), target(1), target(2)], times = [t0, PRESS[0], PRESS[1], PRESS[2]];
    if (t >= times[3]) { const u = easeIO((t - times[3] - 0.35) / 0.35); const p = pts[3]; return [p[0] + (SH[0] - p[0]) * u, p[1] + (SH[1] - p[1]) * u, u >= 1]; }
    for (let i = 0; i < 3; i++) if (t < times[i + 1]) { const u = E.expo(clamp((t - times[i]) / Math.max(0.3, times[i + 1] - times[i]))); const a = pts[i], b = pts[i + 1]; return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u - 60 * Math.sin(Math.PI * u), false]; }
    return [...pts[3], false];
  };
  const armp = arm.querySelector('.armp'), armc = arm.querySelector('.armc');
  custom(t => { const p = posAt(t); const on = p && !p[2] && t < tP + 0.5;
    glove.style.display = arm.style.display = on ? 'block' : 'none'; if (!on) return;
    const mx = (SH[0] + p[0]) / 2, my = Math.min(SH[1], p[1]) - 80, d = `M${SH[0]} ${SH[1]} Q${mx} ${my} ${p[0]} ${p[1]}`;
    armp.setAttribute('d', d); armc.setAttribute('d', d); glove.style.left = (p[0] - 32) + 'px'; glove.style.top = (p[1] - 32) + 'px'; });
  tw('.c-bot .barmR', PRESS[0] - 0.32, 0.08, { o: [1, 0] }, 'lin'); tw('.c-bot .barmR', PRESS[2] + 0.72, 0.08, { o: [0, 1] }, 'lin');
  PRESS.forEach((t, k) => { const [x, y] = target(k); tw(PHB[k], t, 0.08, { s: [1, 0.86] }, 'in'); tw(PHB[k], t + 0.08, 0.3, { s: [0.86, 1] }, 'back');
    sfx('tick', t, 0.9); sfx('clink', t + 0.02, 0.3); ringAt('#C .cam', x, y, t, 120, k === 2 ? '#7dff8a' : '#fff'); });
  burst('#C .cam', 12, 780, 865, PRESS[2] + 0.05, 230, 5, 'spark'); sfx('ding', PRESS[2] + 0.05, 0.5);
  mascotPose('.c-m', W('c1', 7), 'shock'); mascotPose('.c-m', PRESS[2] + 0.1, 'cheer');
  focus('#C > .cam', PRESS[1], 760, 700, 1.1, 0.5);

  // ================= P: «Такие боты обещают заказывать меня за тебя» — trumpeting bots, the mascot lounges =================
  tCircle('#C', '#P', tP, 540, 700);
  hide('.p-taxi'); hide('.glP');
  tw('.p-tr2', 0, 0.001, { sx: [-1, -1] });
  [[1, W('p1', 1)], [2, W('p1', 1) + 0.15]].forEach(([k, t]) => { tw(`.p-tr${k}`, t, 0.4, { y: [0, -14], r: [k === 1 ? -6 : 6, 0] }, 'back');
    tw(`.p-bot${k} .bmouth`, t, 0.2, { sy: [0.25, 0.9] }, 'out'); });
  // notes stream out of both bells while they «promise»
  for (let k = 0; k < 10; k++) { const n = mk('#P .cam', 'note'); n.textContent = k % 2 ? '♪' : '♫'; const left = k % 2 === 0;
    place(n, left ? 500 : 520, 430); hide(n); const t0 = W('p1', 2) + 0.12 * k;
    tw(n, t0, 0.05, { o: [0, 1] }, 'lin'); tw(n, t0, 1.0, { x: [0, (left ? -1 : 1) * (60 + 60 * hash(k))], y: [0, -220 - 80 * hash(k + 3)], r: [0, (left ? -1 : 1) * 30], s: [0.6, 1.1] }, 'out'); tw(n, t0 + 0.75, 0.25, { o: [1, 0] }, 'lin');
    if (k % 3 === 0) sfx('blip', t0, 0.25); }
  // «заказывать меня»: a little taxi pops up between the trumpets and bounces
  popIn('.p-taxi', W('p1', 3), 0.4); sfx('pop', W('p1', 3), 0.5); jump('.p-taxi', W('p1', 4), 40, 0.36);
  // «за тебя»: both bots point at the mascot, who leans back on a pumpkin in sunglasses
  tw('.p-bot1 .barmR', W('p1', 5) - 0.05, 0.35, { r: [0, -40] }, 'back'); tw('.p-bot2 .barmL', W('p1', 5) - 0.05, 0.35, { r: [0, 40] }, 'back');
  mascotPose('.p-m', W('p1', 0), 'think');
  mascotPose('.p-m', W('p1', 5), 'cheer');
  tw('.glP', W('p1', 5), 0.06, { o: [0, 1] }, 'lin'); tw('.glP', W('p1', 5), 0.35, { y: [-200, 0] }, 'back'); sfx('clink', W('p1', 5) + 0.3, 0.5);
  tw('.p-m', W('p1', 6), 0.4, { r: [0, -8] }, 'back');
  focus('#P > .cam', W('p1', 6), 540, 900, 1.12, 0.35);

  // ================= R: «4 ноября Uber отчитался: нейронки заказали меня… четыре раза» =================
  tSlideUp('#P', '#R', tR);
  hide('.r-src');
  slideIn('.r-src', W('r1', 0), 'left', 0.6, 600); sfx('whoosh', W('r1', 0), 0.4);
  punch('.r-src', W('r1', 1), 0.06);
  mascotPose('.r-m', W('r1', 1), 'pointUp'); mascotPose('.r-m', W('r1', 3), 'think');
  const dig = $('.r-tal .tdig'); const CL = [W('r1', 6) - 0.04, W('r1', 6) + 0.16, W('r1', 6) + 0.36, W('r1', 7) + 0.02];
  custom(t => { let n = 0; CL.forEach(c => { if (t >= c) n++; }); dig.textContent = String(n).padStart(4, '0'); });
  // «нейронки заказали меня…»: the counter wobbles, the room holds its breath (tension pause)
  tw('.r-tal', W('r1', 3), 0.4, { r: [0, -4] }, 'back'); tw('.r-tal', W('r1', 5), 0.4, { r: [-4, 3] }, 'back');
  tw('.r-taxi .kpup', W('r1', 4), 0.3, { x: [0, 10], y: [0, -8] }, 'out');
  idle('.r-m', t => (t > W('r1', 5) && t < CL[0]) ? { x: 3 * Math.sin(t * 40) } : {});
  CL.forEach((t, k) => { tw('.r-tal .tbtn', t - 0.06, 0.06, { y: [0, 14] }, 'in'); tw('.r-tal .tbtn', t, 0.16, { y: [14, 0] }, 'out'); sfx('tick', t, 1); sfx('clink', t, 0.35); punch('.r-tal', t, 0.05); });
  sfx('slam', CL[3] + 0.05, 0.5); shake(CL[3] + 0.05, 0.25, 12);
  burst('#R .cam', 12, 540, 640, CL[3] + 0.05, 300, 3, 'spark');
  focus('#R > .cam', CL[3], 540, 650, 1.12, 0.55);
  mascotPose('.r-m', W('r1', 6), 'shock'); jump('.r-m', CL[3] + 0.05, 60, 0.42, '.r-shd3');
  tw('.r-taxi .kbrow', W('r1', 6), 0.3, { y: [0, -14] }, 'back');

  // ================= J: joke — «ровно столько пассажиров влезает в меня за один рейс» =================
  morphCut('#R', '#J', tJ, '.r-taxi', '.j-taxi', 0.6, 0);
  $$('#morph > div').slice(-1).forEach(mc => mc.querySelector('.kbrow') && (mc.querySelector('.kbrow').style.transform = 'translateY(-14px)'));
  const RT = [W('j1', 1) - 0.1, W('j1', 2), W('j1', 3) - 0.05, W('j1', 4)];
  [0, 1, 2, 3].forEach(k => { const r = `.j-taxi .rider${k}`, t = RT[k];
    hide(r); tw(r, t, 0.05, { o: [0, 1] }, 'lin'); tw(r, t, 0.35, { y: [-140, 0] }, 'back');
    tw('.j-taxi', t + 0.2, 0.08, { sy: [1 - 0.02 * k, 0.96 - 0.02 * k] }, 'out'); tw('.j-taxi', t + 0.28, 0.25, { sy: [0.96 - 0.02 * k, 0.98 - 0.02 * k] }, 'back');
    sfx('thud', t + 0.2, 0.5); sfx('pop', t, 0.35);
    const c = mk('#J .cam', 'j-cnt'); c.textContent = String(k + 1); place(c, [300, 470, 640, 800][k], [230, 190, 230, 260][k]); hide(c); popIn(c, t + 0.05, 0.3); tw(c, RT[3] + 0.6, 0.3, { o: [1, 0] }, 'lin'); });
  // squeezed: the fourth one sits on the others' heads, the taxi strains, sweat and sparks
  tw('.j-taxi .rider3', RT[3] + 0.3, 0.3, { sx: [1, 1.25], sy: [1, 0.8] }, 'back');
  tw('.j-taxi .kbrow', RT[3] + 0.1, 0.3, { y: [0, -16] }, 'back');
  idle('.j-taxi', t => (t > RT[3] + 0.3 && t < tH) ? { x: 4 * Math.sin(t * 50) } : {});
  for (let k = 0; k < 5; k++) { const s = mk('#J .cam', 'sweat'); place(s, 200 + k * 160, 470 + (k % 2) * 40); hide(s); const t = RT[3] + 0.35 + k * 0.08;
    tw(s, t, 0.05, { o: [0, 1] }, 'lin'); tw(s, t, 0.7, { y: [0, 160], x: [0, (k - 2) * 30] }, 'in'); tw(s, t + 0.55, 0.15, { o: [1, 0] }, 'lin'); }
  burst('#J .cam', 10, 240, 1080, W('j1', 7), 160, 11, 'spark', -60); burst('#J .cam', 10, 840, 1080, W('j1', 7) + 0.05, 160, 17, 'spark', -60);
  sfx('buzz', W('j1', 7), 0.4); shake(W('j1', 7), 0.25, 10);
  mascotPose('.j-m', W('j1', 0), 'pointUp'); mascotPose('.j-m', RT[2], 'shock'); mascotPose('.j-m', W('j1', 7), 'facepalm');
  focus('#J > .cam', W('j1', 5), 540, 700, 1.08, 0.6);

  // ================= H: «Нейронки уже заказывают за нас? БАЙТ.» + «Сам ты вызываешь меня секунд за 50» =================
  morphCut('#J', '#H', tH, '.j-taxi', '.h-taxi', 0.55, 0);
  hide('.h-st'); hide('.h-chip'); hide('.h-sw'); hide('.h-ph');
  // «нейронки уже заказывают за нас?»: the bot shrugs, a question mark pops
  tw('.h-bot .barmL', W('v1', 1), 0.35, { r: [0, 70] }, 'back'); tw('.h-bot .barmR', W('v1', 1), 0.35, { r: [0, -70] }, 'back');
  tw('.h-bot .bhead', W('v1', 2), 0.35, { r: [0, -10] }, 'back');
  { const q = mk('#H .cam', 'qm'); q.textContent = '?'; place(q, 690, 900); hide(q); popIn(q, W('v1', 4) - 0.1, 0.3); sfx('pop', W('v1', 4), 0.4); tw(q, W('v1', 5) - 0.2, 0.2, { o: [1, 0] }, 'lin'); }
  mascotPose('.h-m', W('v1', 0), 'think');
  // stamp: the mascot raises the arm and slams it down
  const tSt = W('v1', 5) - 0.02;
  mascotPose('.h-m', tSt - 0.45, 'pointUp'); tw('.h-m', tSt - 0.42, 0.22, { y: [0, -90] }, 'out'); tw('.h-m', tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose('.h-m', tSt - 0.18, 'point', 0.18);
  stamp('.h-st', tSt, -7, 26); burst('.h-fx', 22, 540, 350, tSt + 0.05, 420, 61, 'conf', 140);
  tw('.h-bot .barmL', tSt, 0.3, { r: [70, -10] }, 'out'); tw('.h-bot .barmR', tSt, 0.3, { r: [-70, 10] }, 'out');
  // «Сам ты вызываешь меня»: the phone pops into the mascot's hand, one tap, the taxi flashes its lights
  slideIn('.h-ph', W('m1', 0) - 0.1, 'down', 0.45, 300); sfx('whoosh', W('m1', 0) - 0.1, 0.35);
  mascotPose('.h-m', W('m1', 0), 'hold');
  tw('.h-ph', W('m1', 3), 0.08, { s: [1, 0.92] }, 'in'); tw('.h-ph', W('m1', 3) + 0.08, 0.3, { s: [0.92, 1] }, 'back'); sfx('tick', W('m1', 3), 0.8);
  ringAt('#H .cam', 455, 960, W('m1', 3), 100, '#7dff8a');
  tw('.h-taxi .tbeam', W('m1', 3) + 0.1, 0.2, { o: [0, 1] }, 'lin'); punch('.h-taxi .tsign', W('m1', 3) + 0.1, 0.2); sfx('blip', W('m1', 3) + 0.1, 0.4);
  tw('.h-taxi', W('m1', 3) + 0.1, 0.5, { x: [120, 0] }, 'out');
  // «секунд за 50»: the stopwatch pops and sweeps to 50 s, the chip slides in
  popIn('.h-sw', W('m1', 4) - 0.1, 0.4); sfx('pop', W('m1', 4), 0.4);
  tw('.h-sw .swhand', W('m1', 4), 0.75, { r: [0, 300] }, 'inOut'); tw('.h-sw .swring', W('m1', 4), 0.75, { dash: [100, 100 - 83.3] }, 'inOut');
  for (let k = 0; k < 6; k++) sfx('tick', W('m1', 4) + k * 0.12, 0.3);
  slideIn('.h-chip', W('m1', 6) - 0.1, 'left', 0.55, 500); punch('.h-sw', W('m1', 6) + 0.2, 0.08); sfx('ding', W('m1', 6) + 0.1, 0.5);
  // «боту пока нечего ускорять»: the bot slumps, the mascot shrugs
  tw('.h-bot .bhead', W('m1', 7), 0.4, { r: [-10, 12], y: [0, 12] }, 'back'); tw('.h-bot .bmouth', W('m1', 7), 0.3, { sy: [0.25, 0.1] }, 'out');
  mascotPose('.h-m', W('m1', 7), 'shrug');
  tw('#H .h-st, #H .conf, #H .h-chip, #H .h-sw, #H .h-ph, #H .h-bot, #H .h-taxi, #H .shd, #H .qm', tLoop - 0.35, 0.3, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw('#H .h-m', tLoop + 0.42, 0.001, { o: [1, 0] });
}, { noCaption: ['hook'], chunks: { m1: [2, 1, 2, 2, 2, 2] } });
