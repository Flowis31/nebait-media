// 023 «Часы отматывают разговор на 15 секунд. Кто узнает?» — Новость (короткий формат), история с героями: маскот и его друг в осеннем парке.
// Apple Support 03.11.2026 (Live Rewind). Свой мир, параллакс, наезды, прыжки со сквошем, дуги, частицы, 4 склейки-превращения.
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
    const cols = ['#ffd34d', '#ff3b5c', '#5fe0ff', '#b8ff3d', '#ff9f2e'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      if (cls === 'lf') { s.innerHTML = leafSVG('bl' + seed + k, cols[(k + 4) % 5]); place(s, x - 45, y - 45); }
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.8, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.6, 0.25, { o: [1, 0] }, 'lin'); } };
  const ctr = el => { const r = (typeof el === 'string' ? $(el) : el).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
  const rings = (sel, t0, n, P = 0.28) => { for (let k = 0; k < n; k++) [1, 2, 3].forEach(j => { const t = t0 + k * P + j * 0.06; tw($$(sel + ' .cr' + j), t, P * 0.9, { o: [1, 0], s: [0.8, 1.25] }, 'out'); }); };
  const ring = (sel, t0, n, P = 0.16, amp = 22) => { for (let k = 0; k < n; k++) tw($$(sel + ' .cbell2'), t0 + k * P, P, { r: [k % 2 ? amp : -amp, k % 2 ? -amp : amp] }, 'inOut'); tw($$(sel + ' .cbell2'), t0 + n * P, 0.3, { r: [n % 2 ? -amp : amp, 0] }, 'back'); };

  // ---------- world ----------
  $('#clouds').innerHTML = `<div style="position:absolute;left:0;top:0;width:2400px;height:700px">${cloudsSVG()}</div><div style="position:absolute;left:2400px;top:0;width:2400px;height:700px">${cloudsSVG()}</div>`;
  $('#hills').innerHTML = cityHillsSVG(); $('#trees').innerHTML = treesSVG(); $('#near').innerHTML = nearSVG();
  dof('#clouds', 3); dof('#hills', 2.2); dof('#trees', 1);
  lookFX({ grain: 0.11, tint: 'transparent' });
  $('.c-glove').remove();

  // ---------- props ----------
  const buildA = (sc, s) => { $(sc + ' .a-w').innerHTML = smartwatchSVG('a' + s); };
  buildA('#A', '');
  $('.b-p').innerHTML = personSVG('bp', '#3d8bff', '#4a2a18'); $('.b-bub').innerHTML = chatSVG('bb', '#ffffff');
  $('.c-w').innerHTML = smartwatchSVG('c'); $('.c-bub').innerHTML = chatSVG('cb', '#ffffff');
  $('.t-w').innerHTML = smartwatchSVG('t'); $('.t-clk').innerHTML = clockSVG('t', '#5fc8ff');
  $('.d-w').innerHTML = smartwatchSVG('d');
  $('.j-p').innerHTML = personSVG('jp', '#3d8bff', '#4a2a18'); $('.j-w').innerHTML = smartwatchSVG('j'); $('.j-rep').innerHTML = chatSVG('jr', '#c9f0ff', '', 'right');
  $('.q-p').innerHTML = personSVG('qp', '#3d8bff', '#4a2a18'); $('.q-w').innerHTML = smartwatchSVG('q');
  $('.r-w').innerHTML = smartwatchSVG('r'); $('.r-bell').innerHTML = chimeBellSVG('r'); $('.r-p').innerHTML = personSVG('rp', '#3d8bff', '#4a2a18');
  $('.h-w').innerHTML = smartwatchSVG('h'); $('.h-w2').innerHTML = smartwatchSVG('h2', '#3a2a4a', '#3d8bff'); $('.h-bell').innerHTML = chimeBellSVG('h');
  // the leaf the mascot watches instead of listening, bubbles in the hook
  const leafB = mk('#B .cam', 'lf', leafSVG('bl', '#ff6a3d')); place(leafB, 560, 120, 110, 110);
  const abub = [0, 1, 2].map(k => { const b = mk('#A .cam', 'bub', chatSVG('ab' + k, '#ffffff', '', 'right')); place(b, 700 - k * 30, 520 + k * 120, 230, 153); return b; });
  $$('.mm').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  $('#A2').innerHTML = $('#A').innerHTML; $('#A2 .a-w').innerHTML = ''; buildA('#A2', '2'); $('#A2 .a-m').innerHTML = mascotSVG('a2m'); $$('#A2 .bub').forEach(b => b.remove());
  mascotLife(); mascotTalk();

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('b1'), tC = cut('c1'), tT = cut('t1'), tD = cut('d1'), tJ = cut('j1'), tQ = cut('q1'), tR = cut('r1'), tH = cut('v1'), tLoop = TOTAL - 0.72;
  const CUTS = [0, tB, tC, tT, tD, tJ, tQ, tR, tH], IDS = ['#A', '#B', '#C', '#T', '#D', '#J', '#Q', '#R', '#H'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 230 * easeIO((t - c + 0.35) / 0.7); }); x -= 1840 * easeIO((t - tLoop) / 0.6); return x; };
  custom(t => {
    const x = camX(t);
    $('#clouds').style.transform = `translate(${(-(x * 0.08 + t * 9) % 2400).toFixed(1)}px,0)`;
    $('#sun').style.transform = `translate(${(-x * 0.03).toFixed(1)}px,${(4 * Math.sin(W2 * 2 * t)).toFixed(1)}px)`;
    $('#hills').style.transform = `translate(${(-x * 0.22).toFixed(1)}px,0)`;
    $('#trees').style.transform = `translate(${(-x * 0.5).toFixed(1)}px,0)`;
    $('#near').style.transform = `translate(${(-x * 0.95).toFixed(1)}px,0)`;
    $('#walk').style.transform = `translate(${(-(x * 1.0) % 260).toFixed(1)}px,0)`;
  });
  grade(0, 'transparent'); grade(tC, 'rgba(95,200,255,.10)'); grade(tT, 'rgba(60,40,120,.16)'); grade(tD, 'rgba(255,159,46,.10)');
  grade(tJ - 0.2, 'rgba(255,90,60,.26)'); grade(tQ, 'rgba(30,20,70,.42)'); grade(tR, 'rgba(255,211,77,.18)'); grade(tH, 'rgba(184,255,61,.12)'); grade(tLoop + 0.3, 'transparent');
  $$('.mm').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2')) idle(m, t => ({ y: 6 * Math.sin(W2 * 16 * t + i), r: 1.4 * Math.sin(W2 * 8 * t + i) })); });
  const bob = (sel, k = 6, amp = 8) => idle(sel, t => ({ y: amp * Math.sin(W2 * k * 2 * t), r: 1.5 * Math.sin(W2 * k * t) }));
  bob('#A .a-w', 5, 8); bob('.t-w', 4, 6); bob('.d-w', 5, 6); bob('.h-w', 4, 6);
  // watch screens: which face shows from the start
  tw('#A .wclock', 0, 0.001, { o: [0, 0] }); tw('#A .wrew', 0, 0.001, { o: [1, 1] });
  tw('#A2 .wclock', 0, 0.001, { o: [0, 0] }); tw('#A2 .wrew', 0, 0.001, { o: [1, 1] }); tw('#A2 .wring', 0, 0.001, { dash: [0, 0] });
  // friends' mouths: generic chatter where the friend speaks without the voice
  const chatter = (sel, t0, t1) => idle(sel, t => (t > t0 && t < t1) ? { sy: 0.4 + 0.6 * Math.abs(Math.sin((t - t0) * 11)) } : {});

  // ================= A: hook — «−15 СЕКУНД РАЗГОВОРА», speech bubbles get pulled back into the watch =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  idle('#A .wrew', t => ({ s: 1 + 0.07 * Math.sin(t * 12) }));
  tw('#A .wring', 0.3, 2.4, { dash: [0, 100] }, 'lin');
  punch('#A .a-t', W('hook', 4), 0.12); sfx('ding', W('hook', 4), 0.4);
  mascotPose('#A .a-m', 0.25, 'shock');
  { const [wx, wy] = ctr('#A .a-w');
    abub.forEach((b, k) => { const [bx, by] = ctr(b), t0 = W('hook', 1) + k * 0.22;
      hide(b); tw(b, t0 - 0.25, 0.25, { o: [0, 1], s: [0.6, 1] }, 'out');
      arc(b, t0, 0.55, wx - bx, wy - by + 20, 90, -30); tw(b, t0, 0.55, { s: [1, 0.15] }, 'inOut'); tw(b, t0 + 0.5, 0.06, { o: [1, 0] }, 'lin');
      sfx('whoosh', t0, 0.35); sfx('pop', t0 + 0.55, 0.3); }); }
  punch('#A .a-w', W('hook', 2) + 0.4, 0.06);
  mascotPose('#A .a-m', W('hook', 1), 'pointL'); mascotPose('#A .a-m', W('hook', 4), 'pointUp');
  jump('#A .a-m', W('hook', 6) - 0.05, 60, 0.42, '#A .a-shd2');
  punch('#A .a-t2', W('hook', 2), 0.08);

  // ================= B: «Прослушал, что сказал друг?» — the friend talks, the mascot stares at a falling leaf =================
  tWhip('#A', '#B', tB);
  chatter('.b-p .pmouth', tB, W('b1', 3));
  tw('.b-p .parmR', W('b1', 0), 0.35, { r: [0, -40] }, 'back'); tw('.b-p .parmR', W('b1', 2), 0.35, { r: [-40, -10] }, 'back');
  // the bubble leaves the friend's mouth, floats past the mascot and pops
  hide('.b-bub'); popIn('.b-bub', W('b1', 0) - 0.05, 0.35); sfx('pop', W('b1', 0), 0.4);
  idle('.b-bub', t => (t > W('b1', 0)) ? { y: 8 * Math.sin((t - W('b1', 0)) * 7) } : {});
  // the leaf drifts down in a sway; the mascot's pupils follow it
  idle(leafB, t => { if (t < tB) return {}; const u = t - tB; return { x: 90 * Math.sin(u * 3.2), y: 260 * u, r: 40 * Math.sin(u * 3.2) }; });
  mascotPose('.b-m', W('b1', 0), 'pointUp');
  tw('.b-m .pup', W('b1', 0) + 0.3, 0.3, { x: [6, -6], y: [-9, -4] }, 'out');
  tw('.b-m .pup', W('b1', 2), 0.4, { x: [-6, -9], y: [-4, 4] }, 'inOut');
  mascotPose('.b-m', W('b1', 3), 'shock'); jump('.b-m', W('b1', 3), 50, 0.36, '.b-shd2');
  for (let k = 0; k < 3; k++) { const q = mk('#B .cam', 'qm'); q.textContent = '?'; place(q, 660 + k * 120, 690 - (k % 2) * 60); hide(q); popIn(q, W('b1', 3) + k * 0.1, 0.3); sfx('pop', W('b1', 3) + k * 0.1, 0.3); }
  tw('.b-p .phead', W('b1', 3), 0.3, { r: [0, -8] }, 'back');

  // ================= C: double-press the crown — the bubble is pulled back, the last 15 seconds come up as text =================
  morphCut('#B', '#C', tC, '.b-bub', '.c-bub', 0.6, -20);
  hide('.c-n');
  // two presses on the crown, each with a click ring
  [W('c1', 0) + 0.05, W('c1', 1) + 0.02].forEach((t, k) => {
    tw('.c-w .wcrown', t, 0.08, { x: [0, -14] }, 'in'); tw('.c-w .wcrown', t + 0.08, 0.2, { x: [-14, 0] }, 'back'); sfx('tick', t, 0.9); sfx('clink', t + 0.02, 0.35);
    const r = mk('#C .cam', 'cl'); r.style.cssText += ';border:10px solid #fff;border-radius:50%'; place(r, 700, 690, 90, 90); hide(r);
    tw(r, t, 0.05, { o: [0, 1] }, 'lin'); tw(r, t, 0.4, { s: [0.4, 1.8] }, 'out'); tw(r, t + 0.25, 0.2, { o: [1, 0] }, 'lin'); });
  shake(W('c1', 1) + 0.05, 0.15, 6);
  mascotPose('.c-m', W('c1', 0) - 0.1, 'pointL');
  // the screen wakes up in rewind mode
  const tWake = W('c1', 2);
  tw('.c-w .wclock', tWake, 0.15, { o: [1, 0] }, 'lin'); tw('.c-w .wglow', tWake, 0.3, { o: [0.8, 0] }, 'lin');
  tw('.c-w .wrew', tWake + 0.05, 0.08, { o: [0, 1] }, 'lin'); tw('.c-w .wrew', tWake + 0.05, 0.4, { s: [0.3, 1] }, 'back');
  tw('.c-w .wmic', tWake + 0.1, 0.1, { o: [0, 1] }, 'lin'); sfx('blip', tWake + 0.05, 0.5);
  idle('.c-w .wmic', t => (t > tWake + 0.2) ? { s: 1 + 0.25 * Math.abs(Math.sin(t * 6)) } : {});
  // «последние 15 секунд»: the counter runs to −15, the ring fills, the arrows spin, the bubble flies back into the watch
  const tR0 = W('c1', 4) - 0.05, tR1 = W('c1', 6) + 0.1;
  slideIn('.c-n', tR0 - 0.05, 'up', 0.45, 120);
  { const el = $('.cnum'); custom(t => { const p = clamp((t - tR0) / (tR1 - tR0)); el.textContent = '−' + Math.round(15 * p); }); }
  for (let k = 0; k < 8; k++) sfx('tick', tR0 + k * (tR1 - tR0) / 8, 0.3);
  tw('.c-w .wring', tR0, tR1 - tR0, { dash: [100, 0] }, 'lin');
  tw('.c-w .wrew', tR0, tR1 - tR0 + 0.2, { r: [0, -720] }, 'inOut');
  punch('.c-n', W('c1', 5), 0.12); sfx('ding', W('c1', 5) + 0.05, 0.5);
  { const [wx, wy] = ctr('.c-w'), [bx, by] = ctr('.c-bub'); const t0 = W('c1', 4);
    arc('.c-bub', t0, 0.6, wx - bx, wy - by, 140, -40); tw('.c-bub', t0, 0.6, { s: [1, 0.2] }, 'inOut'); tw('.c-bub', t0 + 0.55, 0.06, { o: [1, 0] }, 'lin');
    sfx('riser2', t0, 0.5); punch('.c-w', t0 + 0.6, 0.06); }
  mascotPose('.c-m', W('c1', 5), 'shock');
  // «всплывают текстом»: arrows out, four text lines draw on, sparks
  const tTx = W('c1', 7) - 0.05;
  tw('.c-w .wrew', tTx, 0.2, { o: [1, 0] }, 'lin');
  [0, 1, 2, 3].forEach(k => { tw('.c-w .wl' + k, tTx + 0.08 + k * 0.14, 0.3, { dash: [100, 0] }, 'out'); sfx('tick', tTx + 0.08 + k * 0.14, 0.35); });
  burst('#C .cam', 12, 490, 640, tTx + 0.15, 260, 7, 'spark');
  slideOut('.c-n', tTx - 0.05, 'up', 0.35, 160);
  mascotPose('.c-m', tTx, 'cheer'); jump('.c-m', tTx + 0.05, 55, 0.4, '.c-shd2');
  focus('#C > .cam', W('c1', 8), 490, 760, 1.14, 0.4);

  // ================= T: the text disappears half a minute after the screen goes dark =================
  morphCut('#C', '#T', tT, '.c-w', '.t-w', 0.55);
  { const mc = $('#morph').lastElementChild; mc.querySelector('.wclock').style.opacity = 0; mc.querySelector('.wmic').style.opacity = 1;
    $$('[class^="wl"]', mc).forEach(l => l.style.strokeDashoffset = 0); }
  [0, 1, 2, 3].forEach(k => tw('.t-w .wl' + k, 0, 0.001, { dash: [0, 0] }));
  tw('.t-w .wclock', 0, 0.001, { o: [0, 0] }); tw('.t-w .wmic', 0, 0.001, { o: [1, 1] });
  hide('.t-clk');
  punch('.t-w', W('t1', 0), 0.06);
  mascotPose('.t-m', W('t1', 0), 'pointL'); mascotPose('.t-m', W('t1', 2), 'think');
  // «через полминуты»: a timer pops up and its red hand sweeps half a turn
  popIn('.t-clk', W('t1', 2) - 0.05, 0.4); sfx('pop', W('t1', 2), 0.5);
  tw('.t-clk .cmin', W('t1', 3), 0.9, { r: [0, 180] }, 'inOut');
  for (let k = 0; k < 6; k++) sfx('tick', W('t1', 3) + k * 0.15, 0.3);
  punch('.t-clk', W('t1', 3) + 0.95, 0.08);
  tw('.t-clk .cbell', W('t1', 3) + 0.9, 0.1, { r: [0, 8] }, 'inOut'); tw('.t-clk .cbell', W('t1', 3) + 1.0, 0.25, { r: [8, 0] }, 'back');
  // «как погаснет экран»: the display dims, then the text lines crumble into dust and float off
  tw('.t-w .wdim', W('t1', 5), 0.35, { o: [0, 0.6] }, 'inOut'); tw('.t-w .wmic', W('t1', 5), 0.2, { o: [1, 0] }, 'lin'); sfx('blip', W('t1', 5), 0.3);
  const tGone = W('t1', 6) + 0.05;
  [0, 1, 2, 3].forEach(k => tw('.t-w .wl' + k, tGone + k * 0.07, 0.3, { dash: [0, -100] }, 'in'));
  { const r = $('.t-w').getBoundingClientRect(); for (let k = 0; k < 18; k++) { const d = mk('#T .cam', 'dust'); const x = r.left + 110 + 230 * hash(k * 1.7), y = r.top + 230 + 200 * hash(k * 2.3); place(d, x, y); hide(d);
    const t = tGone + 0.05 + 0.02 * k; tw(d, t, 0.05, { o: [0, 1] }, 'lin'); tw(d, t, 0.8, { x: [0, -60 + 160 * hash(k + 4)], y: [0, -220 - 120 * hash(k + 7)], s: [1, 0.3] }, 'out'); tw(d, t + 0.5, 0.3, { o: [1, 0] }, 'lin'); } }
  sfx('glitch', tGone, 0.5);
  tw('.t-w .wdim', tGone + 0.3, 0.3, { o: [0.6, 0.85] }, 'lin');
  mascotPose('.t-m', W('t1', 5), 'pointL'); mascotPose('.t-m', tGone + 0.1, 'shock');
  focus('#T > .cam', W('t1', 5), 420, 800, 1.08, 0.6);

  // ================= D: beta, English only =================
  tZoom('#T', '#D', tD);
  hide('.d-stk'); hide('.d-c1'); hide('.d-c2'); hide('.d-src');
  slideIn('.d-src', W('d1', 0), 'left', 0.6, 500); sfx('whoosh', W('d1', 0), 0.4);
  tw('.d-stk', W('d1', 2) - 0.08, 0.05, { o: [0, 1] }, 'lin'); tw('.d-stk', W('d1', 2) - 0.08, 0.2, { s: [2.4, 1], r: [-30, 10] }, 'in');
  sfx('slam', W('d1', 2) + 0.12, 0.5); shake(W('d1', 2) + 0.12, 0.2, 10); punch('.d-w', W('d1', 2) + 0.12, 0.06);
  slideIn('.d-c1', W('d1', 2), 'left', 0.55, 400);
  slideIn('.d-c2', W('d1', 4), 'left', 0.55, 400); sfx('whoosh', W('d1', 4), 0.4);
  punch('.d-c2', W('d1', 6), 0.08);
  mascotPose('.d-m', W('d1', 0), 'point'); mascotPose('.d-m', W('d1', 2) + 0.1, 'pointUp'); mascotPose('.d-m', W('d1', 5), 'shrug');
  jump('.d-m', W('d1', 6), 40, 0.36, '.d-shd2');

  // ================= J: joke — «Я такого не говорил» уже не прокатит =================
  tDrop('#D', '#J', tJ);
  hide('.j-say'); hide('.j-rep');
  tw('.j-w .wclock', 0, 0.001, { o: [0, 0] }); tw('.j-w .wrew', 0, 0.001, { o: [1, 1] });
  // the friend says it: the quote is spoken by the narrator, the friend's mouth follows the voice, the mascot keeps quiet
  mascotQuiet('.j-m', W('j1', 1) - 0.05, W('j1', 4) + 0.5);
  idle('.j-p .pmouth', t => (t > W('j1', 1) - 0.05 && t < W('j1', 4) + 0.5) ? { sy: 0.3 + 1.0 * clamp((venv(t) - 0.07) / 0.5) } : {});
  popIn('.j-say', W('j1', 1) - 0.05, 0.4); sfx('pop', W('j1', 1), 0.5);
  tw('.j-p .parmL', W('j1', 1), 0.35, { r: [0, 60] }, 'back'); tw('.j-p .parmR', W('j1', 1), 0.35, { r: [0, -60] }, 'back');
  idle('.j-p .phead', t => (t > W('j1', 2) && t < W('j1', 4) + 0.4) ? { r: 7 * Math.sin((t - W('j1', 2)) * 14) } : {});
  mascotPose('.j-m', W('j1', 0), 'think');
  // «уже не прокатит»: the mascot raises the watch, a replay bubble beams out of it, the friend sweats
  const tUp = W('j1', 5) - 0.1;
  tw('.j-w', tUp, 0.4, { y: [260, 0], r: [-20, 6] }, 'back'); hide('.j-w'); tw('.j-w', tUp, 0.08, { o: [0, 1] }, 'lin'); sfx('whoosh', tUp, 0.4);
  mascotPose('.j-m', tUp, 'pointUp');
  tw('.j-w .wrew', tUp + 0.3, 0.6, { r: [0, -720] }, 'inOut');
  tw('.j-rep', W('j1', 6), 0.06, { o: [0, 1] }, 'lin'); tw('.j-rep', W('j1', 6), 0.45, { s: [0.2, 1], y: [200, 0] }, 'back'); sfx('blip', W('j1', 6), 0.5);
  for (let k = 1; k <= 3; k++) tw('.j-rep .dot' + k, W('j1', 6) + 0.3 + k * 0.08, 0.2, { y: [0, -14] }, 'out');
  tw('.j-say', W('j1', 7) + 0.1, 0.4, { y: [0, 700], r: [0, 25] }, 'in'); sfx('thud', W('j1', 7) + 0.45, 0.5);
  tw('.j-p .pmouth', W('j1', 7), 0.3, { sy: [0.3, 1.5] }, 'back');
  tw('.j-p .parmL', W('j1', 7), 0.3, { r: [60, -10] }, 'out'); tw('.j-p .parmR', W('j1', 7), 0.3, { r: [-60, 10] }, 'out');
  for (let k = 0; k < 4; k++) { const s = mk('#J .cam', 'sweat'); place(s, 110 + k * 70, 600 + (k % 2) * 30); hide(s); const t = W('j1', 7) + 0.1 + k * 0.08;
    tw(s, t, 0.05, { o: [0, 1] }, 'lin'); tw(s, t, 0.7, { y: [0, 140], x: [0, (k - 1.5) * 40] }, 'in'); tw(s, t + 0.55, 0.15, { o: [1, 0] }, 'lin'); }
  shake(W('j1', 7) + 0.05, 0.25, 12); sfx('buzz', W('j1', 7), 0.4);
  mascotPose('.j-m', W('j1', 7) + 0.1, 'cheer'); jump('.j-m', W('j1', 7) + 0.15, 60, 0.42, '.j-shd2');
  focus('#J > .cam', W('j1', 7), 420, 760, 1.1, 0.5);

  // ================= Q: «А друг узнает, что ты отмотал?» — the friend squints, the mascot hides the watch =================
  tCircle('#J', '#Q', tQ, 480, 640);
  tw('.q-w .wclock', 0, 0.001, { o: [1, 1] });
  tw('.q-p .pblink', W('q1', 1), 0.3, { sy: [1, 0.45] }, 'out');
  tw('.q-p .ppup', W('q1', 2), 0.3, { x: [0, 12] }, 'out'); tw('.q-p .phead', W('q1', 2), 0.4, { r: [0, 6] }, 'back');
  tw('.q-p .ppup', W('q1', 5), 0.25, { x: [12, 16], y: [0, 6] }, 'out');
  mascotPose('.q-m', W('q1', 0), 'think');
  tw('.q-w', W('q1', 3), 0.35, { x: [0, -60], y: [0, 40], s: [1, 0.7] }, 'inOut');
  idle('.q-m', t => (t > W('q1', 3) && t < tR) ? { x: 4 * Math.sin(t * 30) } : {});
  for (let k = 0; k < 3; k++) { const q = mk('#Q .cam', 'qm'); q.textContent = '?'; place(q, 140 + k * 340, 220 + (k % 2) * 70); hide(q); popIn(q, W('q1', 1) + k * 0.15, 0.3); sfx('pop', W('q1', 1) + k * 0.15, 0.3); }
  mascotPose('.q-m', W('q1', 5), 'shock'); focus('#Q > .cam', W('q1', 5), 480, 700, 1.1, 0.4);

  // ================= R: «Сразу: часы звенят, даже на беззвучном» — a bell bursts out of the watch =================
  morphCut('#Q', '#R', tR, '.q-w', '.r-w', 0.55, 10);
  hide('.r-bell'); hide('.r-ex'); hide('.r-rays');
  tw('.r-w .wclock', W('r1', 0), 0.15, { o: [1, 0] }, 'lin'); tw('.r-w .wrew', W('r1', 0), 0.3, { o: [0, 1], s: [0.3, 1] }, 'back');
  tw('.r-w .wglow', W('r1', 0), 0.3, { o: [0.7, 0] }, 'lin'); sfx('blip', W('r1', 0), 0.4);
  mascotPose('.r-m', W('r1', 0), 'pointUp');
  // «часы звенят»: the bell arcs out of the speaker, rings, rays spin, leaves blow
  const tBell = W('r1', 1) - 0.05;
  { const [wx, wy] = ctr('.r-w'), [bx, by] = ctr('.r-bell');
    tw('.r-bell', tBell, 0.06, { o: [0, 1] }, 'lin'); arc('.r-bell', tBell, 0.01, 0, 0, 0);
    tw('.r-bell', tBell, 0.45, { x: [wx - bx - 150, 0], y: [wy - by, 0], s: [0.2, 1] }, 'back'); }
  ring('.r-bell', W('r1', 2) - 0.05, 9, 0.15, 24); rings('.r-bell', W('r1', 2), 6, 0.3);
  [W('r1', 2), W('r1', 2) + 0.3, W('r1', 5), W('r1', 5) + 0.3].forEach((t, k) => sfx('ding', t, k < 2 ? 0.7 : 0.9));
  tw('.r-rays', W('r1', 2), 0.3, { o: [0, 1] }, 'lin'); idle('.r-rays', t => ({ r: t * 30 }));
  burst('#R .cam', 10, 220, 400, W('r1', 2) + 0.05, 420, 13, 'lf', 160);
  // the friend spins round: «!»
  tw('.r-p .phead', W('r1', 2) + 0.1, 0.35, { r: [0, -12] }, 'back'); tw('.r-p .ppup', W('r1', 2) + 0.1, 0.3, { x: [0, -12] }, 'out');
  popIn('.r-ex', W('r1', 2) + 0.2, 0.3); jump('.r-p', W('r1', 2) + 0.15, 50, 0.36, '.r-shd2');
  mascotPose('.r-m', W('r1', 2), 'shock');
  focus('#R > .cam', W('r1', 2), 300, 520, 1.08, 0.45, 0.28, 0.4, 460, 620);
  // «даже на беззвучном»: the crossed bell on the screen, and it still rings, harder
  tw('.r-w .wrew', W('r1', 3), 0.15, { o: [1, 0] }, 'lin');
  tw('.r-w .wmute', W('r1', 3), 0.08, { o: [0, 1] }, 'lin'); tw('.r-w .wmute', W('r1', 3), 0.4, { s: [0.3, 1] }, 'back'); sfx('pop', W('r1', 3), 0.5);
  punch('.r-bell', W('r1', 5), 0.18); shake(W('r1', 5) + 0.05, 0.3, 14);
  mascotPose('.r-m', W('r1', 5), 'facepalm');

  // ================= H: НЕ БАЙТ, takeaway, loop =================
  tSlideUp('#R', '#H', tH);
  hide('.h-st'); hide('.h-chip'); hide('.h-w2'); hide('.h-bell');
  tw('.h-w .wclock', 0, 0.001, { o: [1, 1] });
  const tSt = W('v1', 0) - 0.02;
  mascotPose('.h-m', tSt - 0.45, 'pointUp'); tw('.h-m', tSt - 0.42, 0.22, { y: [0, -90] }, 'out'); tw('.h-m', tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose('.h-m', tSt - 0.18, 'point', 0.18);
  stamp('.h-st', tSt, -7, 26); burst('.h-fx', 22, 540, 350, tSt + 0.05, 420, 61, 'conf', 140);
  // «перемотка есть»: the watch rewinds once more
  tw('.h-w .wclock', W('v1', 2) - 0.05, 0.12, { o: [1, 0] }, 'lin'); tw('.h-w .wrew', W('v1', 2) - 0.05, 0.3, { o: [0, 1], s: [0.3, 1] }, 'back');
  tw('.h-w .wrew', W('v1', 2) + 0.2, 0.7, { r: [0, -720] }, 'inOut'); punch('.h-w', W('v1', 3), 0.07);
  mascotPose('.h-m', W('v1', 2), 'pointL');
  // «но тайком не выйдет»: the mascot wags a finger
  mascotPose('.h-m', W('v1', 5) - 0.05, 'wave');
  // «Звякнули чужие часы?»: someone else's watch slides in and chimes; the mascot jumps
  slideIn('.h-w2', W('m1', 0) - 0.25, 'right', 0.5, 400); sfx('whoosh', W('m1', 0) - 0.25, 0.4);
  tw('.h-bell', W('m1', 1) - 0.05, 0.06, { o: [0, 1] }, 'lin'); tw('.h-bell', W('m1', 1) - 0.05, 0.35, { s: [0.2, 1], y: [120, 0] }, 'back');
  ring('.h-bell', W('m1', 1) + 0.1, 6, 0.14, 22); rings('.h-bell', W('m1', 1) + 0.1, 4, 0.28); sfx('ding', W('m1', 1) + 0.1, 0.8); sfx('ding', W('m1', 1) + 0.4, 0.6);
  mascotPose('.h-m', W('m1', 1), 'shock'); jump('.h-m', W('m1', 1) + 0.05, 80, 0.45, '.h-shd2');
  tw('.h-m .pup', W('m1', 1) + 0.1, 0.25, { x: [0, 10] }, 'out');
  // «Тебя только что отмотали»: facepalm, chip
  mascotPose('.h-m', W('m1', 3), 'facepalm');
  slideIn('.h-chip', W('m1', 3) - 0.05, 'left', 0.55, 500); sfx('whoosh', W('m1', 3), 0.4);
  punch('.h-chip', W('m1', 6), 0.07);
  tw('#H .h-st, #H .conf, #H .h-chip, #H .h-w2, #H .h-bell, #H .h-w, #H .shd', tLoop - 0.35, 0.3, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw('#H .h-m', tLoop + 0.42, 0.001, { o: [1, 0] });
}, { chunks: {} });
