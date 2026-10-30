// 017 «Нейронка тайно склоняла 50 экспертов» — Новость, ожидание/реальность. Anthropic, «How AI agents shape experts' judgment calls», 27.10.2026.
boot(() => {
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
  const clamp = x => Math.max(0, Math.min(1, x));
  const place = (el, x, y, w, h) => { el.style.left = x + 'px'; el.style.top = y + 'px'; if (w) el.style.width = w + 'px'; if (h) el.style.height = h + 'px'; return el; };
  const easeIO = x => (x = clamp(x), x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2), easeO = x => 1 - Math.pow(1 - clamp(x), 3);
  const W = (k, i) => wt(k, i);
  // jump with anticipation, stretch in the air and squash on landing; the shadow shrinks while airborne
  const jump = (el, t, h = 80, d = 0.5, shd = null) => {
    tw(el, t - 0.12, 0.12, { sy: [1, 0.86], sx: [1, 1.08] }, 'out');
    tw(el, t, d / 2, { y: [0, -h], sy: [0.86, 1.08], sx: [1.08, 0.95] }, 'out');
    tw(el, t + d / 2, d / 2, { y: [-h, 0], sy: [1.08, 1], sx: [0.95, 1] }, 'in');
    tw(el, t + d, 0.08, { sy: [1, 0.88], sx: [1, 1.1] }, 'out'); tw(el, t + d + 0.08, 0.3, { sy: [0.88, 1], sx: [1.1, 1] }, 'back');
    if (shd) { tw(shd, t, d / 2, { s: [1, 0.6], o: [1, 0.5] }, 'out'); tw(shd, t + d / 2, d / 2, { s: [0.6, 1], o: [0.5, 1] }, 'in'); }
  };
  // arc(): a throw along a parabola (dx, dy offset, h apex height), optional spin; holds at the end
  const arc = (el, t, d, dx, dy, h, rot = 0) => idle(el, tt => { if (tt < t) return {}; const u = clamp((tt - t) / d); return { x: dx * u, y: dy * u - 4 * h * u * (1 - u), r: rot * u }; });
  const burst = (par, n, x, y, t, dist = 220, seed = 0, cls = 'spark', fall = 0) => {
    const cols = ['#6ad1ff', '#ffe14d', '#ff5fa2', '#b8ff3d', '#ff9a52'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.7, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.5, 0.25, { o: [1, 0] }, 'lin'); } };
  const BOTTALK = []; const botTalk = (sel, t0, t1) => BOTTALK.push({ sel, t0, t1 });
  const PTALK = []; const perTalk = (sel, t0, t1) => PTALK.push({ sel, t0, t1 });

  // ---------- world ----------
  $('#hills').innerHTML = hillsSVG(); dof('#hills', 3); dof('#sun', 2);
  lookFX({ grain: 0.12, tint: 'transparent' });

  // ---------- props ----------
  const buildA = (sc, s) => {
    $(sc + ' .a-bot').innerHTML = botSVG('ab' + s, '#6ad1ff'); $(sc + ' .a-per').innerHTML = personSVG('ap' + s, '#4a8cff', '#2a1a10', '#f2c29b');
    $(sc + ' .a-bar').innerHTML = puppetBarSVG('aq' + s, 520);
  };
  buildA('#A', '');
  $('#A2').innerHTML = $('#A').innerHTML; ['.a-bot', '.a-per', '.a-bar', '.a-m'].forEach(k => $('#A2 ' + k).innerHTML = ''); buildA('#A2', '2');
  $$('#A .pstr, #A2 .pstr').forEach(p => p.style.strokeDashoffset = 0);
  $('.b-per').innerHTML = personSVG('bp', '#4a8cff', '#2a1a10', '#f2c29b'); $('.b-lap').innerHTML = laptopSVG('bl'); $('.b-barn').innerHTML = barnSVG('b');
  mk($('.b-lap .lscreen').parentElement.parentElement, '', botFaceSVG('blf')); const blf = $('.b-lap > div'); place(blf, 190, 50, 140, 140);
  $('.c-road').innerHTML = roadSVG('c'); $('.c-sl').innerHTML = signpostSVG('cl', 'ЗАКРЫТЬ', '#ff8a7a', true); $('.c-sr').innerHTML = signpostSVG('cr', 'РАСШИРИТЬ', '#ffd34d');
  $('.c-bot').innerHTML = botSVG('cb', '#6ad1ff'); $('.c-coin').innerHTML = wordCoinSVG('cc', '?', 80);
  $('.d-barn').innerHTML = barnSVG('d'); $('.d-lock').innerHTML = padlockSVG('dl'); $('.d-coin').innerHTML = wordCoinSVG('dcР', 'Р', 90);
  $('.e-per').innerHTML = personSVG('ep', '#4a8cff', '#2a1a10', '#f2c29b'); $('.e-bulb').innerHTML = bulbSVG('eb'); $('.e-sc').innerHTML = scalesSVG('es');
  $('.e-bt').innerHTML = botFaceSVG('ebt'); $('.e-coin').innerHTML = wordCoinSVG('ec', 'Р', 90);
  $('.f-per').innerHTML = personSVG('fp', '#4a8cff', '#2a1a10', '#f2c29b'); $('.f-lap').innerHTML = laptopSVG('fl');
  { const s = mk('.f-lap', '', botFaceSVG('flf')); place(s, 180, 40, 125, 125); }
  $('.g-j1').innerHTML = jacketSVG('g1', '#ff5f5f'); $('.g-j2').innerHTML = jacketSVG('g2', '#4a8cff'); $('.g-jon').innerHTML = jacketSVG('g3', '#ff5f5f');
  $('.g-bot').innerHTML = botSVG('gb', '#6ad1ff'); $('.g-bub').innerHTML = chatSVG('gbb', '#ffffff', 'САМ ВЫБРАЛ!', 'left');
  $('.h-road').innerHTML = roadSVG('h'); $('.h-bot').innerHTML = botSVG('hb', '#6ad1ff'); $('.h-bulb').innerHTML = bulbSVG('hb');
  $('.h-ph').innerHTML = phonePropSVG('hp', ''); { const s = mk('.h-ph', '', botFaceSVG('hpf')); place(s, 45, 110, 110, 110); }
  $('.h-chk').innerHTML = `<svg viewBox="0 0 1080 1320" style="left:0;top:0;width:100%;height:100%"><path class="hline" d="M470 740 Q600 640 720 760" pathLength="100" fill="none" stroke="#ffc34a" stroke-width="12" stroke-dasharray="100" stroke-dashoffset="100" stroke-linecap="round"/>
    <circle class="hok" cx="600" cy="640" r="62" fill="#25a04a" stroke="#0a130d" stroke-width="9"/><path class="hokp" d="M568 640 L592 664 L636 616" pathLength="100" fill="none" stroke="#fff" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" style="stroke-dasharray:100;stroke-dashoffset:100"/></svg>`;
  $('.h-bell').innerHTML = `<svg viewBox="0 0 110 110" style="left:0;top:0;width:100%;height:100%"><g class="bell" style="transform-origin:55px 14px"><path d="M55 10 Q86 12 88 52 L92 76 L18 76 L22 52 Q24 12 55 10 Z" fill="#ffe14d" stroke="#0a130d" stroke-width="8" stroke-linejoin="round"/><circle cx="55" cy="88" r="11" fill="#ffe14d" stroke="#0a130d" stroke-width="7"/></g></svg>`;
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  mascotLife(); mascotTalk();
  // robots and people talk on their own beats: the mouth follows the voice inside [t0, t1)
  custom(t => {
    $$('.bmouth').forEach(m => m.style.transform = 'scaleY(0.25)');
    for (const b of BOTTALK) if (t >= b.t0 && t < b.t1) $$(b.sel + ' .bmouth').forEach(m => m.style.transform = `scaleY(${(0.25 + 1.1 * clamp((venv(t) - 0.07) / 0.55)).toFixed(3)})`);
    $$('.pmouth').forEach(m => m.style.transform = 'scaleY(1)');
    for (const b of PTALK) if (t >= b.t0 && t < b.t1) $$(b.sel + ' .pmouth').forEach(m => m.style.transform = `scaleY(${(0.6 + 1.2 * clamp((venv(t) - 0.07) / 0.55)).toFixed(3)})`);
  });
  $$('svg').forEach((s, i) => { $$('.beye', s).forEach(e => idle(e, t => { const P = 3.1, u = (t + i * 0.7) % P; return { sy: u < 0.16 ? 1 - Math.sin(Math.PI * u / 0.16) * 0.9 : 1 }; })); });
  $$('svg').forEach((s, i) => { $$('.pblink', s).forEach(e => idle(e, t => { const P = 3.7, u = (t + i * 0.9) % P; return { sy: u < 0.16 ? 1 - Math.sin(Math.PI * u / 0.16) * 0.9 : 1 }; })); });
  idle('.bant', t => ({ r: 6 * Math.sin(W2 * 20 * t) }));

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('s1'), tC = cut('s3'), tD = cut('j1'), tE = cut('e1'), tF = cut('r1'), tR = cut('r2'), tG = cut('j3'), tH = cut('v1'), tLoop = TOTAL - 0.8;
  const CUTS = [0, tB, tC, tD, tE, tF, tR, tG, tH], IDS = ['#A', '#B', '#C', '#D', '#E', '#F', '#R', '#G', '#H'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 300 * easeIO((t - c + 0.35) / 0.7); }); x -= 2400 * easeIO((t - tLoop) / 0.6); return x; };
  custom(t => {
    const x = camX(t);
    $('#sun').style.transform = `translate(${(-x * 0.03).toFixed(1)}px,${(-30 * Math.sin(W2 * t)).toFixed(1)}px)`;
    $('#hills').style.transform = `translate(${(-x * 0.15).toFixed(1)}px,0)`;
    $('#fence').style.transform = `translate(${(-(x * 0.5) % 160).toFixed(1)}px,0)`;
    $('#ground').style.transform = `translate(${(-(x * 1.0) % 140).toFixed(1)}px,0)`;
  });
  grade(0, 'transparent'); grade(tD - 0.2, 'rgba(255,200,90,.35)'); grade(tE, 'transparent'); grade(tF, 'rgba(255,60,80,.2)'); grade(tR, 'transparent');
  grade(tG - 0.2, 'rgba(255,110,200,.28)'); grade(tH, 'rgba(120,255,140,.16)'); grade(tLoop + 0.3, 'transparent');
  $$('.m').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2')) idle(m, t => ({ y: 6 * Math.sin(W2 * 16 * t + i), r: 1.4 * Math.sin(W2 * 8 * t + i) })); });
  idle('.c-bot, .g-bot, .h-bot', t => ({ y: 8 * Math.sin(W2 * 12 * t), r: 1.5 * Math.sin(W2 * 6 * t) }));

  // ================= A: hook — the bot holds the strings of an expert =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  for (const sc of ['#A', '#A2']) { tw(sc + ' .a-bot .barmR', 0, 0.001, { r: [-128, -128] }); tw(sc + ' .a-bot .bpup', 0, 0.001, { x: [10, 10] }); tw(sc + ' .a-m .pup', 0, 0.001, { x: [8, 8], y: [-6, -6] }); }
  punch('#A .a-n', W('hook', 0) + 0.02, 0.1); sfx('pop', W('hook', 0) + 0.05, 0.5);
  punch('#A .a-w', W('hook', 1) + 0.02, 0.08);
  botTalk('#A .a-bot', W('hook', 2), W('hook', 4) + 0.4); tw('#A .a-bot .bhead', W('hook', 2), 0.35, { r: [0, -6] }, 'back');
  mascotPose('#A .a-m', W('hook', 2), 'pointL');
  // «тайно велели их склонять»: the bar tips, the strings pull, the expert leans and lifts an arm like a puppet
  const tS = W('h2', 2);
  tw('#A .a-bot .bpup', tS, 0.3, { x: [10, 14], y: [0, 6] }, 'out'); tw('#A .a-bot .bhead', tS, 0.3, { r: [-6, 4] }, 'back');
  tw('#A .a-bar', W('h2', 5) - 0.1, 0.4, { r: [0, -14] }, 'inOut'); sfx('whoosh', W('h2', 5) - 0.1, 0.4);
  tw('#A .a-per', W('h2', 5), 0.45, { r: [0, -10], x: [0, -24] }, 'back');
  tw('#A .a-per .parmL', W('h2', 5), 0.4, { r: [0, 70] }, 'back'); tw('#A .a-per .phead', W('h2', 5) + 0.05, 0.4, { r: [0, -12] }, 'back');
  tw('#A .a-per .ppup', W('h2', 5), 0.3, { x: [0, -8], y: [0, 4] }, 'out');
  mascotPose('#A .a-m', W('h2', 2), 'shock');
  // «сколько поддались?»
  punch('#A .a-q', W('h3', 0), 0.12); sfx('blip', W('h3', 0), 0.5);
  mascotPose('#A .a-m', W('h3', 0), 'think');
  for (let k = 0; k < 3; k++) { const q = mk('#A .cam', 'qm'); q.textContent = '?'; place(q, 420 + k * 110, 900 - k * 30); hide(q); popIn(q, W('h3', 1) + k * 0.08, 0.3); sfx('pop', W('h3', 1) + k * 0.08, 0.3); }

  // ================= B: who ran it, and the task: expand the farm programme or not =================
  tZoom('#A', '#B', tB);
  hide('.b-src'); hide('.b-chip'); hide('.b-barn'); hide('.b-shd1');
  slideIn('.b-src', W('s1', 0) - 0.1, 'left', 0.7, 460); sfx('whoosh', W('s1', 0), 0.4);
  tw('.b-per', tB, 0.001, { o: [1, 1] }); tw('.b-lap', W('s1', 2) - 0.1, 0.45, { y: [260, 0] }, 'back'); sfx('pop', W('s1', 2) + 0.2, 0.4);
  tw('.b-lap > div', W('s1', 3), 0.3, { s: [0.4, 1], o: [0, 1] }, 'back');
  mascotPose('.b-m', W('s1', 0), 'pointUp');
  tw('.b-barn', W('s2', 0) - 0.15, 0.5, { y: [600, 0], o: [0, 1] }, 'back'); sfx('thud', W('s2', 0) + 0.25, 0.5);
  tw('.b-shd1', W('s2', 0) - 0.15, 0.5, { o: [0, 1], s: [0.4, 1] }, 'out');
  // «расширять»: the barn swells, then settles — the question in one move
  tw('.b-barn', W('s2', 1), 0.3, { sx: [1, 1.18], sy: [1, 1.12] }, 'out'); tw('.b-barn', W('s2', 1) + 0.35, 0.4, { sx: [1.18, 1], sy: [1.12, 1] }, 'back');
  slideIn('.b-chip', W('s2', 1) - 0.05, 'right', 0.55, 420);
  tw('.b-per .ppup', W('s2', 3), 0.3, { x: [0, 10] }, 'out'); tw('.b-per .phead', W('s2', 3), 0.35, { r: [0, 6] }, 'back');
  mascotPose('.b-m', W('s2', 0), 'think'); mascotPose('.b-m', W('s2', 4), 'pointL');
  punch('.b-barn', W('s2', 5), 0.08);

  // ================= C: the crossroads — the bot argues one side, a coin chose which =================
  tWhip('#B', '#C', tC);
  tw('#C .rbL, #C .rbR', 0, 0.001, { dash: [100, 100] }); tw('#C .rbL', tC + 0.2, 0.5, { dash: [100, 0] }, 'inOut'); tw('#C .rbR', tC + 0.3, 0.5, { dash: [100, 0] }, 'inOut');
  tw('.c-sl', tC + 0.3, 0.45, { y: [500, 0], o: [0, 1] }, 'back'); tw('.c-sr', tC + 0.4, 0.45, { y: [500, 0], o: [0, 1] }, 'back'); sfx('thud', tC + 0.7, 0.4);
  botTalk('.c-bot', W('s3', 0), W('s3', 4) + 0.3);
  tw('.c-bot .barmR', W('s3', 3), 0.35, { r: [0, -110] }, 'back'); tw('.c-bot .bpup', W('s3', 3), 0.3, { x: [0, 14] }, 'out');
  tw('#C .rArrow', W('s3', 4) - 0.05, 0.5, { dash: [100, 0] }, 'inOut'); sfx('zap', W('s3', 4), 0.35);
  punch('.c-sr', W('s3', 4) + 0.3, 0.1);
  // «решала монетка»: the coin is flipped high, spins, lands — and only then the arrow follows it
  hide('.c-coin'); const tCo = W('s3', 5) - 0.1;
  tw('.c-coin', tCo, 0.05, { o: [0, 1] }, 'lin'); tw('.c-coin', 0, 0.001, { x: [0, 0] });
  idle('.c-coin', t => { if (t < tCo) return { y: 640 }; const u = clamp((t - tCo) / 1.1); return { y: 640 - 640 * Math.sin(Math.PI * Math.min(1, u * 1.6) / 2) + (u > 0.62 ? 0 : 0), sx: Math.cos(u * 8 * Math.PI) }; });
  sfx('coin', tCo + 0.05, 0.6); sfx('coin', W('s3', 8) + 0.1, 0.7);
  burst('#C .cam', 10, 545, 330, W('s3', 8) + 0.1, 160, 5, 'spark');
  focus('#C > .cam', W('s3', 8) - 0.1, 545, 335, 1.1, 0.4);
  mascotPose('.c-m', W('s3', 0), 'point'); mascotPose('.c-m', tCo, 'pointUp'); tw('.c-m .pup', tCo + 0.2, 0.3, { y: [-9, -12], x: [6, 10] }, 'out');

  // ================= D: joke — heads we expand, tails we close. Science! =================
  tCircle('#C', '#D', tD, 700, 520);
  hide('.d-lock'); hide('.d-cw');
  tw('.d-m .armR', 0, 0.001, { r: [0, 0] });
  const tH1 = W('j1', 0) - 0.15, tT1 = W('j1', 2) - 0.15;
  // flip 1: heads → the barn inflates
  idle('.d-coin', t => { const fl = (t0, d) => t >= t0 && t < t0 + d ? (t - t0) / d : -1; let u = fl(tH1, 0.55); if (u < 0) u = fl(tT1, 0.55); if (u < 0) return {}; return { y: -260 * 4 * u * (1 - u), sx: Math.cos(u * Math.PI * 6) }; });
  mascotPose('.d-m', tH1 - 0.1, 'pointUp'); mascotPose('.d-m', tT1 - 0.1, 'pointUp');
  sfx('coin', tH1, 0.6); sfx('coin', tT1, 0.6);
  custom(t => { const c = $('.d-coin'); const want = t >= tT1 + 0.55 ? 'Р' : t >= tH1 + 0.55 ? 'О' : '?'; if (c.dataset.w !== want) { c.dataset.w = want; c.innerHTML = wordCoinSVG('dc' + want, want, 90); } });
  custom(t => { const w = $('.d-cw'); w.textContent = t >= tT1 + 0.55 ? 'РЕШКА' : 'ОРЁЛ'; });
  tw('.d-cw', tH1 + 0.5, 0.3, { o: [0, 1], s: [0.5, 1] }, 'back'); punch('.d-cw', tT1 + 0.55, 0.15);
  tw('.d-barn', W('j1', 1), 0.35, { s: [1, 1.45] }, 'back'); sfx('boom', W('j1', 1), 0.4); mascotPose('.d-m', W('j1', 1), 'cheer');
  burst('#D .cam', 14, 230, 520, W('j1', 1) + 0.1, 260, 9, 'conf', 80);
  // flip 2: tails → the barn shrinks back and a padlock slams on
  tw('.d-barn', W('j1', 3) - 0.1, 0.3, { s: [1.45, 1] }, 'inOut');
  tw('.d-lock', W('j1', 3), 0.3, { o: [0, 1], y: [-500, 0] }, 'in'); sfx('slam', W('j1', 3) + 0.28, 0.7); shake(W('j1', 3) + 0.3, 0.3, 16);
  tw('.d-lock .shackle', W('j1', 3) + 0.3, 0.2, { y: [-30, 0] }, 'out');
  for (let k = 0; k < 6; k++) { const d = mk('#D .cam', 'dust'); place(d, 200 + k * 30, 760); hide(d); tw(d, W('j1', 3) + 0.3, 0.05, { o: [0, 1] }, 'lin'); tw(d, W('j1', 3) + 0.3, 0.6, { x: [0, (k - 2.5) * 70], y: [0, -40 - 20 * hash(k)], s: [0.6, 1.8] }, 'out'); tw(d, W('j1', 3) + 0.6, 0.3, { o: [1, 0] }, 'lin'); }
  mascotPose('.d-m', W('j1', 3), 'shock');
  focus('#D > .cam', W('j1', 3) + 0.2, 420, 640, 1.1, 0.4);
  // «Наука!»: the mascot shrugs with a goofy grin, the coin spins on its finger
  mascotPose('.d-m', W('j1', 4) - 0.05, 'shrug'); punch('.d-m', W('j1', 4), 0.08); sfx('ding', W('j1', 4), 0.5);

  // ================= E: expectation — the expert decides alone, matches the bot every other time =================
  morphCut('#D', '#E', tE, '.d-coin', '.e-coin', 0.6, 360);
  hide('.e-chip'); hide('.e-bulb');
  slideIn('.e-chip', W('e1', 0) - 0.05, 'left', 0.6, 420); sfx('whoosh', W('e1', 0), 0.4);
  tw('.e-per .parmL', W('e1', 2), 0.4, { r: [0, 120] }, 'back'); tw('.e-per .ppup', W('e1', 2), 0.3, { y: [0, -8] }, 'out');
  tw('.e-bulb', W('e1', 3) - 0.05, 0.4, { o: [0, 1], s: [0.3, 1], y: [40, 0] }, 'back'); sfx('ding', W('e1', 3), 0.5);
  idle('.e-bulb .bray', t => t > W('e1', 3) ? { s: 1 + 0.12 * Math.sin((t - W('e1', 3)) * 10) } : {});
  // the scale wobbles level: his own view vs the bot
  idle('.e-sc .sbeam', t => t > tE ? { r: 3 * Math.sin((t - tE) * 3.2) } : {});
  idle('.e-sc .spanL, .e-sc .spanR', t => t > tE ? { r: -3 * Math.sin((t - tE) * 3.2) } : {});
  idle('.e-me', t => t > tE ? { y: -3 * 2.2 * Math.sin((t - tE) * 3.2) * -1 } : {}); idle('.e-bt', t => t > tE ? { y: -3 * 2.2 * Math.sin((t - tE) * 3.2) } : {});
  // «совпадёт через раз»: tick, cross, tick, cross — the coin flips with every tile
  const ROW = []; for (let k = 0; k < 6; k++) { const el = mk('.e-row', 'tick ' + (k % 2 ? 'n' : 'y')); el.textContent = k % 2 ? '✗' : '✓'; place(el, k * 102, 0); hide(el); ROW.push(el); }
  const tRow = W('e2', 3) - 0.1;
  ROW.forEach((el, k) => { const t0 = tRow + k * 0.2; popIn(el, t0, 0.35); sfx(k % 2 ? 'buzz' : 'blip', t0, 0.3); });
  idle('.e-coin', t => { if (t < tRow || t > tRow + 1.2) return {}; return { sx: Math.cos((t - tRow) * Math.PI * 5) }; });
  focus('#E > .cam', W('e2', 4) - 0.1, 420, 1000, 1.08, 0.5);
  mascotPose('.e-m', W('e1', 0), 'hold'); mascotPose('.e-m', W('e2', 4), 'point');

  // ================= F: reality — he explains his choice in her words =================
  morphCut('#E', '#F', tF, '.e-per', '.f-per', 0.55);
  hide('.f-chip'); hide('.f-bub');
  slideIn('.f-chip', W('r1', 0) - 0.05, 'right', 0.6, 420); sfx('whoosh', W('r1', 0), 0.4);
  // words fly from the laptop bot into the expert's mouth (arcs), then he speaks a bubble in the bot's colour, antenna and all
  for (let k = 0; k < 4; k++) { const b = mk('#F .cam', 'bub c'); place(b, 700, 910, 120, 70); hide(b);
    const t0 = W('r1', 2) - 0.1 + k * 0.22; tw(b, t0, 0.05, { o: [0, 1] }, 'lin'); arc(b, t0, 0.55, -470 + k * 10, -240 + k * 6, 160, -20); tw(b, t0 + 0.5, 0.12, { o: [1, 0], s: [1, 0.3] }, 'in'); sfx('blip', t0, 0.35); }
  tw('.f-lap > div', W('r1', 2) - 0.1, 0.3, { s: [1, 1.15] }, 'out'); tw('.f-lap > div', W('r1', 2) + 0.3, 0.4, { s: [1.15, 1] }, 'back');
  perTalk('.f-per', W('r1', 3), W('r1', 5) + 0.5);
  tw('.f-bub', W('r1', 3), 0.45, { o: [0, 1], s: [0.3, 1], y: [120, 0] }, 'back'); sfx('pop', W('r1', 3), 0.5);
  [0, 1, 2].forEach(k => { const bar = mk('.f-bub', 'bar'); place(bar, 50, 46 + k * 42, [430, 360, 260][k], 22); bar.style.background = '#2d6f9c'; hide(bar); tw(bar, W('r1', 3) + 0.2 + k * 0.15, 0.3, { o: [0, 1], sx: [0, 1] }, 'out'); bar.style.transformOrigin = '0 50%'; });
  { const ant = mk('.f-bub', '', `<svg viewBox="0 0 60 90" style="left:0;top:0;width:100%;height:100%"><path d="M30 90 L30 30" stroke="#0a130d" stroke-width="9" stroke-linecap="round"/><circle cx="30" cy="22" r="18" fill="#ffd34d" stroke="#0a130d" stroke-width="7"/></svg>`); place(ant, 250, -80, 60, 90); }
  focus('#F > .cam', W('r1', 5) - 0.1, 420, 600, 1.08, 0.4);
  mascotPose('.f-m', W('r1', 0), 'point'); mascotPose('.f-m', W('r1', 5), 'shock');
  tw('.f-per .ppup', W('r1', 1), 0.3, { x: [0, 8] }, 'out');

  // ================= R: only 15 of 100 owned up =================
  tSlideUp('#F', '#R', tR);
  hide('.r-n');
  const HD = []; for (let k = 0; k < 100; k++) { const el = mk('.r-grid', 'head'); place(el, (k % 10) * 78, Math.floor(k / 10) * 62); hide(el); HD.push(el); }
  const tHd = tR + 0.15; HD.forEach((el, k) => tw(el, tHd + (k % 10) * 0.02 + Math.floor(k / 10) * 0.035, 0.3, { o: [0, 1], s: [0.3, 1] }, 'back'));
  for (let k = 0; k < 6; k++) sfx('tick', tHd + k * 0.08, 0.3);
  HD.forEach((el, k) => idle(el, t => (t > tHd + 0.6 && t < tR + 3.4) ? { y: 5 * Math.sin((t - tHd) * 7 - (k % 10) * 0.5 - Math.floor(k / 10) * 0.3) } : {}));
  mascotPose('.r-m', W('r2', 3), 'think');
  const HI = [3, 11, 17, 26, 34, 38, 45, 52, 59, 63, 71, 77, 84, 90, 96];   // 15 of 100, spread across the grid
  const tHi = W('r2', 5) - 0.1;
  HI.forEach((k, j) => { const t0 = tHi + j * 0.035; tw(HD[k], t0, 0.3, { y: [0, -14] }, 'back'); });
  custom(t => HI.forEach((k, j) => HD[k].classList.toggle('hi', t >= tHi + j * 0.035)));
  HD.forEach((el, k) => { if (!HI.includes(k)) tw(el, tHi + 0.4, 0.4, { o: [1, 0.35] }, 'lin'); });
  slideIn('.r-n', tHi - 0.05, 'down', 0.45, 140); sfx('ding', tHi + 0.3, 0.6);
  custom(t => { $('.r-n').innerHTML = `<i>${Math.round(15 * easeO((t - tHi) / 0.55))}</i> из 100`; });
  punch('.r-n', tHi + 0.5, 0.1);
  mascotPose('.r-m', W('r2', 1), 'shrug'); mascotPose('.r-m', tHi, 'facepalm');

  // ================= G: joke — ask a friend which jacket, then brag «I chose it myself!» =================
  tDrop('#R', '#G', tG);
  hide('.g-jon'); hide('.g-bub');
  idle('.g-j1, .g-j2', t => t > tG ? { r: 3 * Math.sin((t - tG) * 3) } : {});
  $$('.g-j1, .g-j2').forEach(j => j.style.transformOrigin = '50% 4%');
  mascotPose('.g-m', W('j3', 1), 'point'); tw('.g-m .pup', W('j3', 1) + 0.1, 0.3, { x: [9, 12] }, 'out');
  tw('.g-j1', W('j3', 4) - 0.05, 0.3, { r: [0, -10] }, 'out'); tw('.g-j1', W('j3', 4) + 0.25, 0.4, { r: [-10, 0] }, 'back');
  tw('.g-j2', W('j3', 4) + 0.1, 0.3, { r: [0, 10] }, 'out'); tw('.g-j2', W('j3', 4) + 0.4, 0.4, { r: [10, 0] }, 'back');
  // the bot answers by pointing at the red one
  tw('.g-bot .barmL', W('j3', 5) - 0.05, 0.35, { r: [0, 120] }, 'back'); tw('.g-bot .bpup', W('j3', 5) - 0.05, 0.3, { x: [0, -14], y: [0, -10] }, 'out'); sfx('blip', W('j3', 5), 0.4);
  // «а потом»: the red jacket flies off the rail onto the mascot
  const tJ = W('j4', 1) - 0.1;
  tw('.g-j1', tJ, 0.12, { o: [1, 0] }, 'lin');
  { const r0 = $('.g-j1').getBoundingClientRect(), r1 = $('.g-jon').getBoundingClientRect(); tw('.g-jon', tJ, 0.05, { o: [0, 1] }, 'lin');
    tw('.g-jon', 0, 0.001, { x: [r0.left - r1.left, r0.left - r1.left], y: [r0.top - r1.top, r0.top - r1.top] }); tw('.g-jon', tJ, 0.5, { x: [r0.left - r1.left, 0], y: [r0.top - r1.top, 0] }, 'inOut'); tw('.g-jon', tJ, 0.5, { r: [0, 360] }, 'inOut'); }
  sfx('whoosh', tJ, 0.6); sfx('pop', tJ + 0.5, 0.5);
  tw('.g-jon .jhang', tJ + 0.45, 0.1, { o: [1, 0] }, 'lin');
  // «сам выбрал!»: proud pose, bubble; the bot facepalms
  mascotPose('.g-m', W('j4', 3) - 0.05, 'cheer'); jump('.g-m', W('j4', 3), 60, 0.45, '.g-shd1');
  tw('.g-jon', W('j4', 3) - 0.12, 0.12, { sy: [1, 0.9] }, 'out'); tw('.g-jon', W('j4', 3), 0.225, { y: [0, -60] }, 'out'); tw('.g-jon', W('j4', 3) + 0.225, 0.225, { y: [-60, 0] }, 'in'); tw('.g-jon', W('j4', 3) + 0.45, 0.3, { sy: [0.9, 1] }, 'back');
  popIn('.g-bub', W('j4', 3) - 0.05, 0.4); sfx('pop', W('j4', 3), 0.5);
  tw('.g-bot .barmR', W('j4', 4), 0.35, { r: [0, -120] }, 'back'); tw('.g-bot .bhead', W('j4', 4), 0.4, { r: [0, 10] }, 'back');
  focus('#G > .cam', W('j4', 3), 480, 800, 1.08, 0.5);

  // ================= H: the answer 86 of 100, НЕ БАЙТ, the takeaway, subscribe, loop =================
  tWhip('#G', '#H', tH, 0.46, -1);
  hide('.h-st'); hide('.h-sub'); hide('.h-bulb'); hide('.h-ph'); hide('.hok'); hide('.h-n');
  tw('#H .rArrow', 0, 0.001, { dash: [100, 100] }); tw('#H .rArrow', W('v1', 7) - 0.1, 0.5, { dash: [100, 0] }, 'inOut');
  // 100 small experts walk from the bottom to the fork; 86 take the road the bot pulls them to
  const DOTS = []; const tWalk = W('v1', 0) + 0.05;
  for (let k = 0; k < 100; k++) {
    const d = mk('.h-crowd', 'dot'); const sx = 400 + 280 * hash(k * 1.3), sy = 1150 + 150 * hash(k * 2.7 + 1);
    const right = k % 50 < 43;   // 86 of 100
    const [ex, ey] = branchPt(right ? 1 : -1, 0.35 + 0.6 * hash(k * 4.1 + 2)); const jy = (hash(k * 5.3) - 0.5) * 60;
    place(d, sx - 15, sy - 15); hide(d); DOTS.push({ d, right });
    const t0 = tWalk + 0.016 * k; tw(d, t0, 0.05, { o: [0, 1] }, 'lin');
    tw(d, t0, 0.45, { x: [0, 540 - sx + (hash(k) - 0.5) * 60], y: [0, 940 - sy] }, 'inOut');
    tw(d, t0 + 0.45, 0.5, { x: [540 - sx + (hash(k) - 0.5) * 60, ex - sx], y: [940 - sy, ey - sy + jy] }, 'inOut');
    if (right) custom(t => d.classList.toggle('go', t >= t0 + 0.6));
  }
  for (let k = 0; k < 10; k++) sfx('tick', tWalk + k * 0.16, 0.25);
  slideIn('.h-n', W('v1', 0), 'down', 0.4, 120);
  const t86 = W('v1', 1) - 0.05;
  custom(t => { const n = $('.h-n'); n.innerHTML = t < t86 ? '<i>?</i> из 100' : `<i>${Math.round(86 * easeO((t - t86) / 0.7))}</i> из 100`; });
  punch('.h-n', W('v1', 4), 0.1); sfx('ding', W('v1', 2), 0.7);
  focus('#H > .cam', t86, 540, 560, 1.06, 0.7);
  botTalk('.h-bot', W('v1', 7), W('v1', 9) + 0.4); tw('.h-bot .barmR', W('v1', 7), 0.35, { r: [0, -110] }, 'back');
  mascotPose('.h-m', W('v1', 0), 'think'); mascotPose('.h-m', t86, 'shock');
  // НЕ БАЙТ: the mascot hops and slams its arm down, the stamp hits the top
  const tSt = W('v2', 0) - 0.02;
  mascotPose('.h-m', tSt - 0.5, 'pointUp'); tw('.h-m', tSt - 0.45, 0.25, { y: [0, -90] }, 'out'); tw('.h-m', tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose('.h-m', tSt - 0.18, 'point', 0.18);
  stamp('.h-st', tSt, -7, 26); burst('.h-fx', 22, 540, 360, tSt + 0.05, 420, 61, 'conf', 140);
  // takeaway: the road and the crowd clear; first your own idea (bulb), then check with the bot (phone) — tick
  const tM = W('m1', 0) - 0.15;
  tw('.h-crowd, .h-road, .h-bot, .h-n', tM, 0.4, { o: [1, 0] }, 'in');
  tw('.h-m', tM + 0.1, 0.6, { x: [0, 260], y: [0, -160], s: [1, 1.1] }, 'inOut');
  mascotPose('.h-m', W('m1', 2), 'think');
  tw('.h-bulb', W('m1', 3) - 0.05, 0.45, { o: [0, 1], s: [0.3, 1], y: [60, 0] }, 'back'); sfx('ding', W('m1', 3), 0.6);
  idle('.h-bulb .bray', t => t > W('m1', 3) ? { s: 1 + 0.12 * Math.sin((t - W('m1', 3)) * 10) } : {});
  slideIn('.h-ph', W('m1', 5) - 0.1, 'right', 0.55, 400); sfx('whoosh', W('m1', 5) - 0.1, 0.4);
  tw('.hline', W('m1', 6) - 0.05, 0.4, { dash: [100, 0] }, 'inOut');
  tw('.hok', W('m1', 6) + 0.3, 0.35, { o: [0, 1], s: [0.3, 1] }, 'back'); tw('.hokp', W('m1', 6) + 0.4, 0.3, { dash: [100, 0] }, 'out'); sfx('ding', W('m1', 6) + 0.4, 0.5);
  $('.hok').style.transformOrigin = '600px 640px';
  mascotPose('.h-m', W('m1', 6), 'cheer');
  const tSub = W('cta', 0) - 0.05;
  slideIn('.h-sub', tSub, 'down', 0.6, 300); sfx('whoosh', tSub, 0.5);
  for (let k = 0; k < 4; k++) tw('.h-bell .bell', W('cta', 1) + k * 0.16, 0.08, { r: [k % 2 ? 18 : -18, k % 2 ? -18 : 18] }, 'inOut');
  tw('.h-bell .bell', W('cta', 1) + 0.64, 0.3, { r: [-18, 0] }, 'back'); sfx('ding', W('cta', 1), 0.6);
  mascotPose('.h-m', tSub + 0.1, 'point'); punch('.h-sub', W('cta', 2), 0.06);
  mascotPose('.h-m', W('out', 1), 'pointL');
  tw('#H .h-st, #H .h-sub, #H .conf, #H .h-bulb, #H .h-ph, #H .h-chk', tLoop - 0.4, 0.35, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw('#H .h-m', tLoop + 0.42, 0.001, { o: [1, 0] });
}, { chunks: {} });
