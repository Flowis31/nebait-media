// 016 «Нейронки ловили нейронок: 3 из 98» — Новость, история с героями (допрос). Raynaud et al., Computers in Human Behavior Reports 24 (2026).
boot(() => {
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
  const clamp = x => Math.max(0, Math.min(1, x));
  const place = (el, x, y, w, h) => { el.style.left = x + 'px'; el.style.top = y + 'px'; if (w) el.style.width = w + 'px'; if (h) el.style.height = h + 'px'; return el; };
  const easeIO = x => (x = clamp(x), x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2), easeO = x => 1 - Math.pow(1 - clamp(x), 3);
  const jump = (el, t, h = 80, d = 0.5) => {
    tw(el, t - 0.12, 0.12, { sy: [1, 0.86], sx: [1, 1.08] }, 'out');
    tw(el, t, d / 2, { y: [0, -h], sy: [0.86, 1.08], sx: [1.08, 0.95] }, 'out');
    tw(el, t + d / 2, d / 2, { y: [-h, 0], sy: [1.08, 1], sx: [0.95, 1] }, 'in');
    tw(el, t + d, 0.08, { sy: [1, 0.88], sx: [1, 1.1] }, 'out'); tw(el, t + d + 0.08, 0.3, { sy: [0.88, 1], sx: [1.1, 1] }, 'back');
  };
  const burst = (par, n, x, y, t, dist = 220, seed = 0, cls = 'spark', fall = 0) => {
    const cols = ['#6ad1ff', '#ffe14d', '#ff5fa2', '#b8ff3d', '#ff9a52'];
    for (let k = 0; k < n; k++) { const s = mk(par, cls); if (cls === 'conf') s.style.background = cols[k % 5]; place(s, x - 12, y - 14);
      const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin');
      tw(s, t, 0.7, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d + fall], r: [0, 360 * (hash(k + 9) - 0.5) * 2], s: [1.2, 0.5] }, 'out'); tw(s, t + 0.5, 0.25, { o: [1, 0] }, 'lin'); } };
  // robots talk on their own lines: mouth follows the voice inside [t0,t1)
  const BOTTALK = [];
  const botTalk = (sel, t0, t1) => BOTTALK.push({ sel, t0, t1 });
  const botBlink = (el, seed) => idle($$('.beye', el), t => { const P = 2.9, u = (t + seed) % P; return { sy: u < 0.16 ? 1 - Math.sin(Math.PI * u / 0.16) * 0.9 : 1 }; });
  const W = (k, i) => wt(k, i);

  // ---------- world: interrogation room — blinds light, a detective cork board, floor; three parallax layers ----------
  for (let k = 0; k < 14; k++) { const p = mk('#board', 'pin'); place(p, k * 230 + 60 * hash(k), 300 + 380 * hash(k + 4), 110 + 50 * hash(k + 1), 130 + 40 * hash(k + 2)); p.style.transform = `rotate(${(hash(k + 7) - 0.5) * 14}deg)`; }
  for (let k = 0; k < 12; k++) { const y = mk('#board', 'yarn'); place(y, k * 240 + 120, 380 + 300 * hash(k + 11), 260, 5); y.style.transform = `rotate(${(hash(k + 3) - 0.5) * 50}deg)`; }
  $('#board').style.opacity = 0.32; dof('#board', 4); dof('#blinds', 6);
  lookFX({ grain: 0.12, tint: 'transparent' });

  // ---------- build props ----------
  const buildA = (sc, suf) => {
    $(sc + ' .a-det').innerHTML = botSVG('ad' + suf, '#6ad1ff', true); $(sc + ' .a-sus').innerHTML = botSVG('as' + suf, '#b9a2ff');
    $(sc + ' .a-mask').innerHTML = maskSVG('am' + suf); $(sc + ' .a-mg').innerHTML = magnifierSVG('ag' + suf);
  };
  buildA('#A', '');
  $('#A2').innerHTML = $('#A').innerHTML; ['.a-det', '.a-sus', '.a-mask', '.a-mg', '.a-m'].forEach(k => $('#A2 ' + k).innerHTML = ''); buildA('#A2', '2');
  $('.c-lamp').innerHTML = lampSVG('c'); $('.c-table').innerHTML = tableSVG('c');
  $('.d-lamp').innerHTML = lampSVG('d'); $('.d-table').innerHTML = tableSVG('d'); $('.d-det').innerHTML = botSVG('dd', '#6ad1ff', true);
  $('.d-per').innerHTML = personSVG('dp'); $('.d-sus').innerHTML = botSVG('ds', '#b9a2ff'); $('.d-mask').innerHTML = maskSVG('dm');
  $('.e-det').innerHTML = botSVG('ed', '#6ad1ff', true); $('.e-sus').innerHTML = personSVG('ep', '#4aa8ff', '#1e1208', '#e8b28a');
  $('.f-det').innerHTML = botSVG('fd', '#6ad1ff', true); $('.f-sus').innerHTML = botSVG('fs', '#b9a2ff'); $('.f-mask').innerHTML = maskSVG('fm');
  $('.f-b1').innerHTML = chatSVG('f1', '#dff3ff', 'Ты робот?', 'left'); $('.f-b2').innerHTML = chatSVG('f2', '#f0e6ff', 'Нет.', 'right');
  $('.f-b3').innerHTML = chatSVG('f3', '#dff3ff', 'Ну ладно, верю', 'left'); $('.f-fold').innerHTML = folderSVG('ff', 'ДЕЛО');
  $('.g-fold').innerHTML = folderSVG('gf', 'ЛЕГЕНДА'); $('.g-sus').innerHTML = botSVG('gs', '#b9a2ff'); $('.g-mask').innerHTML = maskSVG('gm', '#ffd34d'); $('.g-tr').innerHTML = trumpetSVG('gt');
  $('.g-det').innerHTML = botSVG('gd', '#6ad1ff', true);
  $('.g-sq').innerHTML = `<svg viewBox="0 0 600 260" style="left:0;top:0;width:100%;height:100%"><path class="sq" d="M120 180 q15 -14 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" pathLength="100" fill="none" stroke="#ff3b5c" stroke-width="9" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/></svg>`;
  $('.i-per').innerHTML = personSVG('ip', '#ff7a3d'); $('.i-sus').innerHTML = botSVG('is', '#b9a2ff');
  $('.i-cup').innerHTML = `<svg viewBox="0 0 110 120" style="left:0;top:0;width:100%;height:100%"><path d="M14 30 L84 30 L76 112 L22 112 Z" fill="#fff" stroke="#0a130d" stroke-width="8" stroke-linejoin="round"/><path d="M84 46 Q108 50 100 78 Q94 92 80 90" fill="none" stroke="#0a130d" stroke-width="8"/><path d="M36 20 Q30 8 40 0 M58 20 Q52 8 62 0" fill="none" stroke="#c9d2dc" stroke-width="6" stroke-linecap="round"/></svg>`;
  $('.j-det').innerHTML = botSVG('jd', '#6ad1ff', true); $('.j-sus').innerHTML = botSVG('js', '#b9a2ff'); $('.j-mg').innerHTML = magnifierSVG('jg');
  $('.j-per').innerHTML = personSVG('jp', '#4aa8ff', '#1e1208', '#e8b28a'); $('.j-c1').innerHTML = chatSVG('j1', '#ffffff', 'Привет!', 'left'); $('.j-c2').innerHTML = chatSVG('j2', '#ffffff', 'Привет!', 'right');
  $('.j-bell').innerHTML = `<svg viewBox="0 0 110 110" style="left:0;top:0;width:100%;height:100%"><g class="bell" style="transform-origin:55px 14px"><path d="M55 10 Q86 12 88 52 L92 76 L18 76 L22 52 Q24 12 55 10 Z" fill="#ffe14d" stroke="#0a130d" stroke-width="8" stroke-linejoin="round"/><circle cx="55" cy="88" r="11" fill="#ffe14d" stroke="#0a130d" stroke-width="7"/></g></svg>`;
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  mascotLife(); mascotTalk();
  $$('svg').forEach((s, i) => { if (s.querySelector('.beye')) botBlink(s, i * 0.7); });
  custom(t => { $$('.bmouth').forEach(m => m.style.transform = 'scaleY(0.25)'); for (const b of BOTTALK) { const on = t >= b.t0 && t < b.t1; if (!on) continue;
    $$(b.sel + ' .bmouth').forEach(m => m.style.transform = `scaleY(${(0.25 + 1.1 * clamp((venv(t) - 0.07) / 0.55)).toFixed(3)})`); } });

  // ---------- cuts, camera, parallax, grade ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('f1'), tC = cut('s1'), tD = cut('s2'), tE = cut('s3'), tF = cut('j1'), tG = cut('t1'), tI = cut('t3'), tJ = cut('v1'), tLoop = TOTAL - 0.8;
  const CUTS = [0, tB, tC, tD, tE, tF, tG, tI, tJ], IDS = ['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#I', '#J'];
  sceneCuts(IDS, CUTS);
  IDS.forEach((s, i) => { const t0 = CUTS[i] + (i ? 0.25 : 0.5), t1 = i < IDS.length - 1 ? CUTS[i + 1] + 0.3 : TOTAL; tw(s + ' > .cam', t0, t1 - t0, { s: [1, 1.06] }, 'lin'); });
  tw('#A2 > .cam', 0, 0.001, { s: [1, 1] });
  IDS.forEach((s, i) => { if (i) handheld(s + ' > .cam', 6, i * 1.7); });
  const camX = t => { let x = 0; CUTS.forEach((c, i) => { if (i) x += 300 * easeIO((t - c + 0.35) / 0.7); }); x -= 2400 * easeIO((t - tLoop) / 0.6); return x; };
  custom(t => {
    const x = camX(t);
    $('#blinds').style.transform = `translate(${(-(x * 0.06)).toFixed(1)}px,0) skewX(-14deg)`;
    $('#board').style.transform = `translate(${(-x * 0.4).toFixed(1)}px,0)`;
    $('#floor').style.transform = `translate(${(-(x * 1.0) % 180).toFixed(1)}px,0)`;
  });
  grade(0, 'transparent'); grade(tF - 0.2, 'rgba(255,190,90,.35)'); grade(tG, 'rgba(120,80,255,.25)'); grade(tI, 'rgba(255,60,80,.22)'); grade(tJ, 'rgba(120,255,120,.18)'); grade(tLoop + 0.3, 'transparent');
  $$('.m').forEach((m, i) => { if (!m.closest('#A') && !m.closest('#A2')) idle(m, t => ({ y: 6 * Math.sin(W2 * 16 * t + i), r: 1.4 * Math.sin(W2 * 8 * t + i) })); });
  idle('.a-det, .d-det, .e-det, .f-det, .g-det, .j-det', t => ({ y: 8 * Math.sin(W2 * 12 * t), r: 1.5 * Math.sin(W2 * 6 * t) }));
  idle('.a-sus, .d-sus, .f-sus, .g-sus, .i-sus, .j-sus', t => ({ y: 8 * Math.cos(W2 * 12 * t), r: -1.5 * Math.sin(W2 * 6 * t) }));
  idle('.bant', t => ({ r: 6 * Math.sin(W2 * 20 * t) }));
  idle('.lswing', t => ({ r: 3 * Math.sin(W2 * 8 * t) }));

  // ================= A: hook — the detective bot inspects a masked bot =================
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  for (const sc of ['#A', '#A2']) { tw(sc + ' .a-mg', 0, 0.001, { r: [-10, -10] }); tw(sc + ' .a-m .pup', 0, 0.001, { x: [-8, -8], y: [-4, -4] }); tw(sc + ' .a-det .barmR', 0, 0.001, { r: [-60, -60] }); }
  punch('#A .a-n', W('hook', 0) + 0.02, 0.08); sfx('pop', W('hook', 0) + 0.05, 0.5);
  // «вычислить»: the magnifier sweeps over the suspect, the suspect sweats behind the mask
  const tV = W('hook', 2);
  tw('#A .a-mg', tV - 0.1, 0.5, { x: [0, 260], y: [0, -40], r: [-10, 6] }, 'inOut'); sfx('whoosh', tV - 0.1, 0.4);
  tw('#A .a-mask', tV + 0.2, 0.2, { r: [0, -6] }, 'out'); tw('#A .a-mask', tV + 0.4, 0.3, { r: [-6, 0] }, 'back');
  tw('#A .a-det .bpup', tV, 0.3, { x: [0, 10] }, 'out');
  // «в чате?»: title punches, mascot points at them
  punch('#A .a-t', W('hook', 5), 0.1); sfx('blip', W('hook', 5), 0.5);
  mascotPose('#A .a-m', W('hook', 3), 'pointL');

  // ================= B: 98 interrogations, only 3 caught =================
  tZoom('#A', '#B', tB);
  hide('.b-src'); hide('.b-n'); hide('.b-u');
  slideIn('.b-src', W('f1', 0) - 0.05, 'left', 0.7, 450); sfx('whoosh', W('f1', 0), 0.4);
  mascotPose('.b-m', W('f1', 0), 'pointUp');
  const TI = []; for (let k = 0; k < 98; k++) { const c = k % 14, r = Math.floor(k / 14); const el = mk('.b-grid', 'tile'); place(el, c * 61, r * 62); hide(el); TI.push(el); }
  const t98 = W('f1', 3) - 0.1;
  TI.forEach((el, k) => { const t0 = t98 + (k % 14) * 0.025 + Math.floor(k / 14) * 0.05; tw(el, t0, 0.3, { o: [0, 1], s: [0.2, 1], y: [-30, 0] }, 'back'); });
  for (let k = 0; k < 8; k++) sfx('tick', t98 + k * 0.08, 0.35);
  slideIn('.b-n', t98, 'down', 0.4, 120);
  custom(t => { $('.b-n').textContent = Math.round(98 * easeO((t - t98) / 0.7)); });
  slideIn('.b-u', W('f1', 4) - 0.05, 'down', 0.45, 100);
  // «поймали только 3»: three tiles go red and pop; the camera pushes in on them; the number swaps to 3
  const t3 = W('f1', 8) - 0.05, RED = [17, 52, 80];
  RED.forEach((k, j) => { const el = TI[k]; tw(el, t3 + j * 0.12, 0.001, { o: [1, 1] }); el.classList.add('pending'); punch(el, t3 + j * 0.12, 0.5); sfx('blip', t3 + j * 0.12, 0.5); });
  custom(t => RED.forEach((k, j) => TI[k].classList.toggle('red', t >= t3 + j * 0.12)));
  TI.forEach((el, k) => { if (!RED.includes(k)) tw(el, t3, 0.3, { o: [1, 0.35] }, 'lin'); });
  focus('#B > .cam', t3 - 0.05, 540, 620, 1.12, 0.65); tw('.b-u', t3, 0.2, { o: [1, 0] }, 'lin');
  custom(t => { const bn = $('.b-n'); if (t >= t3 + 0.3) { bn.innerHTML = '<i>3</i> из 98'; bn.style.fontSize = '130px'; } else bn.style.fontSize = ''; }); punch('.b-n', t3 + 0.32, 0.12); sfx('ding', t3 + 0.3, 0.6);
  mascotPose('.b-m', t3, 'shock');

  // ================= C: the bots become investigators — hats drop on seven heads =================
  tWhip('#B', '#C', tC);
  hide('.c-lbl');
  tw('.c-lamp', tC, 0.6, { y: [-500, 0] }, 'back'); sfx('clink', tC + 0.4, 0.5);
  const CB = [];
  for (let k = 0; k < 7; k++) { const b = mk('.c-bots', '', botSVG('cb' + k, ['#6ad1ff', '#7dff8a', '#ffd34d', '#ff9a52', '#ff7ab8', '#b9a2ff', '#9be8ff'][k], true));
    const row = k < 4 ? 0 : 1, x = row ? 150 + (k - 4) * 260 : 30 + k * 260, y = row ? 700 : 520, w = row ? 250 : 230; place(b, x, y, w, w * 1.1); b.style.zIndex = row ? 2 : 1; CB.push(b);
    hide(b); tw(b, tC + 0.15 + k * 0.06, 0.4, { o: [0, 1], y: [80, 0] }, 'back'); }
  CB.forEach((b, k) => { const hat = $('.bhat', b), t0 = W('s1', 4) - 0.15 + k * 0.1; tw(hat, 0, 0.001, { y: [-420, -420], o: [0, 0] }); tw(hat, t0, 0.05, { o: [0, 1] }, 'lin'); tw(hat, t0, 0.32, { y: [-420, 0] }, 'in'); sfx('thud', t0 + 0.3, 0.35);
    tw($('.bhead', b), t0 + 0.3, 0.08, { sy: [1, 0.9] }, 'out'); tw($('.bhead', b), t0 + 0.38, 0.25, { sy: [0.9, 1] }, 'back'); });
  slideIn('.c-lbl', W('s1', 4) - 0.05, 'left', 0.6, 420);
  mascotPose('.c-m', W('s1', 0), 'hold'); mascotPose('.c-m', W('s1', 5), 'cheer');
  focus('#C > .cam', W('s1', 5) - 0.1, 540, 700, 1.15, 0.5);

  // ================= D: across the table — a person, then a bot with a mask =================
  tCircle('#C', '#D', tD, 540, 500);
  hide('.d-per'); hide('.d-sus'); hide('.d-mask');
  tw('.d-det', tD, 0.001, { sx: [1, 1] });
  const tPer = W('s2', 3) - 0.1, tBot = W('s2', 6) - 0.1, tPret = W('s2', 9) - 0.05;
  tw('.d-per', tPer, 0.4, { o: [0, 1], x: [300, 0] }, 'expo'); sfx('whoosh', tPer, 0.4);
  idle('.d-per .phead', t => ({ r: 3 * Math.sin(W2 * 14 * t) }));
  tw('.d-per', tBot - 0.05, 0.3, { x: [0, 420], o: [1, 0] }, 'in');
  tw('.d-sus', tBot + 0.1, 0.45, { o: [0, 1], x: [400, 0] }, 'expo'); sfx('whoosh', tBot, 0.5);
  // «велели притворяться»: the mask flies up in front of its face
  tw('.d-mask', tPret, 0.45, { o: [0, 1], y: [260, 0], r: [-30, 0] }, 'back'); sfx('pop', tPret + 0.3, 0.5);
  tw('.d-sus .barmR', tPret, 0.35, { r: [0, -95] }, 'back');
  tw('.d-det .bpup', tPer, 0.3, { x: [0, 10] }, 'out');
  mascotPose('.d-m', tPer, 'point'); mascotPose('.d-m', tPret, 'think');

  // ================= E: the interrogation — questions fly, the verdict buttons wait =================
  morphCut('#D', '#E', tE, '.d-det', '.e-det', 0.55);
  hide('.e-q'); hide('.e-btn1'); hide('.e-btn2');
  slideIn('.e-q', W('s3', 0) - 0.05, 'up', 0.5, 120);
  const QB = [];
  for (let k = 0; k < 3; k++) { const q = mk('.e-chat', '', chatSVG('eq' + k, k % 2 ? '#ffe6c8' : '#dff3ff', '', k % 2 ? 'right' : 'left')); place(q, 0, 0, 240, 160); hide(q); QB.push(q);
    const t0 = W('s3', 1) + k * 0.6, fromL = k % 2 === 0;
    tw(q, t0, 0.05, { o: [0, 1] }, 'lin'); tw(q, t0, 0.55, { x: fromL ? [200, 560] : [640, 260], y: [560 - 30 * k, 380 - 40 * k], s: [0.5, 1] }, 'expo'); tw(q, t0 + 0.55, 0.15, { o: [1, 0] }, 'lin');
    for (let d = 1; d <= 3; d++) idle($('.dot' + d, q), t => (t > t0 && t < t0 + 0.7) ? { y: -10 * Math.max(0, Math.sin((t - t0) * 12 - d)) } : {});
    sfx('blip', t0 + 0.1, 0.4); }
  botTalk('.e-det', W('s3', 1), W('s3', 3));
  tw('.e-sus .ppup', W('s3', 1), 0.3, { x: [0, -8] }, 'out');
  slideIn('.e-btn1', W('s3', 5) - 0.05, 'down', 0.45, 200); slideIn('.e-btn2', W('s3', 7) - 0.05, 'down', 0.45, 200);
  punch('.e-btn1', W('s3', 5), 0.1); punch('.e-btn2', W('s3', 7), 0.1); sfx('pop', W('s3', 5), 0.4); sfx('pop', W('s3', 7), 0.4);
  mascotPose('.e-m', W('s3', 4), 'shrug');

  // ================= F: joke — «ты робот?» «нет» «ну ладно, верю» =================
  tDrop('#E', '#F', tF);
  hide('.f-b1'); hide('.f-b2'); hide('.f-b3'); hide('.f-st');
  mascotQuiet('.f-m', tF, tG);
  popIn('.f-b1', W('j1', 0) - 0.05, 0.35); sfx('pop', W('j1', 0), 0.5); botTalk('.f-det', W('j1', 0), W('j1', 2) - 0.05);
  tw('.f-det .bpup', W('j1', 0), 0.2, { x: [0, 10], y: [0, -2] }, 'out');
  popIn('.f-b2', W('j1', 2) - 0.05, 0.35); sfx('pop', W('j1', 2), 0.5); botTalk('.f-sus', W('j1', 2), W('j1', 3) - 0.05);
  // the antenna gives it away — the camera sees it, the detective doesn't
  focus('#F > .cam', W('j1', 2) + 0.1, 820, 600, 1.35, 0.5);
  tw('.f-sus .bglow', W('j1', 2) + 0.1, 0.12, { s: [1, 1.5] }, 'out'); tw('.f-sus .bglow', W('j1', 2) + 0.22, 0.3, { s: [1.5, 1] }, 'back');
  tw('.f-b1', W('j1', 3) - 0.1, 0.2, { o: [1, 0] }, 'lin'); tw('.f-b2', W('j1', 3) - 0.1, 0.2, { o: [1, 0] }, 'lin');
  popIn('.f-b3', W('j1', 3) - 0.05, 0.35); sfx('pop', W('j1', 3), 0.5); botTalk('.f-det', W('j1', 3), W('j1', 5) + 0.6);
  tw('.f-det .bhead', W('j1', 4), 0.3, { r: [0, 8] }, 'back');
  stamp('.f-st', W('j1', 5) + 0.15, -8, 14);
  mascotPose('.f-m', W('j1', 5), 'facepalm');

  // ================= G: the legend — student trumpeter with typos, caught zero times =================
  morphCut('#F', '#G', tG, '.f-fold', '.g-fold', 0.6, -8);
  hide('.g-n'); hide('.g-u'); hide('.g-chat'); hide('.g-st'); hide('.g-tr');
  tw('.g-fold', W('t1', 3), 0.3, { r: [0, -4] }, 'back'); sfx('blip', W('t1', 3), 0.4);
  tw('.g-mask', 0, 0.001, { o: [1, 1] });
  // «ни разу»: big zero, push-in
  slideIn('.g-n', W('t1', 4) - 0.05, 'down', 0.45, 140); slideIn('.g-u', W('t1', 5) - 0.05, 'down', 0.45, 100);
  focus('#G > .cam', W('t1', 6) - 0.1, 280, 760, 1.2, 0.5); sfx('ding', W('t1', 6), 0.6);
  // «студент-трубач»: the trumpet flies to its mouth and blows notes
  tw('.g-tr', W('t2', 0) - 0.1, 0.45, { o: [0, 1], x: [300, 0], r: [30, -6] }, 'back');
  tw('.g-sus .barmL', W('t2', 0), 0.35, { r: [0, 70] }, 'back');
  for (let k = 0; k < 4; k++) { const n = mk('#G .cam', 'qm'); n.textContent = '♪'; n.style.color = '#ffd34d'; place(n, 840, 760); hide(n);
    const t0 = W('t2', 0) + 0.3 + k * 0.25; tw(n, t0, 0.05, { o: [0, 1] }, 'lin'); tw(n, t0, 0.9, { x: [0, 120 + 40 * k], y: [0, -260 - 40 * k], r: [0, 30] }, 'out'); tw(n, t0 + 0.6, 0.3, { o: [1, 0] }, 'lin'); }
  sfx('blip', W('t2', 0) + 0.3, 0.4);
  // «опечатывается»: a message with a typo, the red squiggle draws under it
  tw('.g-n, .g-u', W('t2', 1), 0.3, { o: [1, 0] }, 'in');
  slideIn('.g-chat', W('t2', 2) - 0.05, 'left', 0.55, 400); sfx('tick', W('t2', 3), 0.5);
  tw('.g-sq .sq', W('t2', 3) + 0.1, 0.45, { dash: [100, 0] }, 'inOut');
  // «опечатка — лучшее доказательство, что ты живой»: the detective sees the typo and stamps «ЖИВОЙ!»
  tw('.g-det', W('j2', 0) - 0.2, 0.45, { x: [-300, 0] }, 'expo');
  tw('.g-det .bpup', W('j2', 0), 0.3, { x: [0, 10], y: [0, 8] }, 'out'); botTalk('.g-det', 99, 99);
  focus('#G > .cam', W('j2', 0), 360, 1090, 1.12, 0.5);
  tw('.g-det .barmR', W('j2', 4) - 0.35, 0.25, { r: [0, -160] }, 'out'); tw('.g-det .barmR', W('j2', 4) - 0.1, 0.12, { r: [-160, -80] }, 'in');
  stamp('.g-st', W('j2', 5) - 0.05, -7, 18);
  burst('#G .cam', 18, 820, 340, W('j2', 5) + 0.05, 280, 41, 'conf', 120);
  mascotPose('.g-m', W('t1', 4), 'pointL'); mascotPose('.g-m', W('j2', 0), 'cheer');

  // ================= I: people were suspected more often than bots =================
  tSlideUp('#G', '#I', tI);
  hide('.i-lbl1'); hide('.i-lbl2');
  slideIn('.i-lbl1', W('t3', 2) - 0.05, 'left', 0.55, 400); slideIn('.i-lbl2', W('t3', 8) - 0.15, 'right', 0.55, 400);
  // suspicion: magnifiers swarm the human, the bot sips coffee
  for (let k = 0; k < 6; k++) { const g = mk('.i-mgs', '', magnifierSVG('im' + k)); const w = 130 + 30 * hash(k); place(g, 120 + 280 * hash(k + 2), 450 + 300 * hash(k + 5), w, w); hide(g);
    const t0 = W('t3', 5) - 0.1 + k * 0.1; tw(g, t0, 0.45, { o: [0, 1], x: [-300 + 600 * hash(k), 0], y: [-200, 0], s: [0.4, 1] }, 'expo');
    idle(g, t => t > t0 + 0.4 ? { x: 14 * Math.sin((t - t0) * 5 + k), y: 10 * Math.cos((t - t0) * 6 + k), r: 8 * Math.sin((t - t0) * 4 + k) } : {}); }
  for (let k = 0; k < 3; k++) { const q = mk('#I .cam', 'qm'); q.textContent = '?'; place(q, 140 + k * 140, 380); hide(q); popIn(q, W('t3', 6) + k * 0.1, 0.3); sfx('pop', W('t3', 6) + k * 0.1, 0.35); }
  tw('.i-per .ppup', W('t3', 5), 0.25, { x: [0, 8], y: [0, -6] }, 'out'); tw('.i-per .pmouth', W('t3', 5), 0.25, { sy: [1, -0.8] }, 'back');
  idle('.i-per', t => (t > W('t3', 6) && t < tJ) ? { x: 3 * Math.sin(t * 60) } : {});
  tw('.i-cup', 0, 0.001, { o: [1, 1] }); tw('.i-sus .barmR', W('t3', 7), 0.4, { r: [0, -40] }, 'back');
  tw('.i-sus .bhead', W('t3', 8), 0.4, { r: [0, -8] }, 'back');
  focus('#I > .cam', W('t3', 5), 280, 700, 1.15, 0.8);
  mascotPose('.i-m', W('t3', 0), 'shrug'); mascotPose('.i-m', W('t3', 8), 'sad');

  // ================= J: verdict НЕ БАЙТ, the takeaway, subscribe, loop =================
  tCircle('#I', '#J', tJ, 540, 400);
  hide('.j-st'); hide('.j-sub'); hide('.j-c1'); hide('.j-c2'); hide('.j-per');
  // «нейронка нейронку не видит»: the detective looks straight through the suspect, which fades almost out
  tw('.j-mg', W('v1', 1) - 0.1, 0.5, { x: [0, 300], r: [0, 10] }, 'inOut');
  tw('.j-sus', W('v1', 3), 0.4, { o: [1, 0.25] }, 'inOut'); tw('.j-det .bpup', W('v1', 2), 0.3, { x: [0, 10] }, 'out');
  const tSt = W('v1', 6) - 0.02;
  mascotPose('.j-m', tSt - 0.5, 'pointUp'); tw('.j-m', tSt - 0.45, 0.25, { y: [0, -90] }, 'out'); tw('.j-m', tSt - 0.2, 0.18, { y: [-90, 0] }, 'in'); mascotPose('.j-m', tSt - 0.18, 'point', 0.18);
  stamp('.j-st', tSt, -7, 26); burst('.j-fx', 22, 540, 360, tSt + 0.05, 420, 61, 'conf', 140);
  // «по переписке бота не отличить»: two identical messages, one from the bot, one from a person — indistinguishable
  tw('.j-sus', W('m1', 0) - 0.1, 0.4, { o: [0.25, 1], x: [0, 0], y: [0, 160] }, 'inOut'); tw('.j-per', W('m1', 0) - 0.1, 0.45, { o: [0, 1], x: [-300, 0] }, 'expo'); tw('.j-det, .j-mg', W('m1', 0) - 0.1, 0.3, { o: [1, 0] }, 'lin');
  popIn('.j-c1', W('m1', 1), 0.35); popIn('.j-c2', W('m1', 2), 0.35); sfx('pop', W('m1', 1), 0.4); sfx('pop', W('m1', 2), 0.4);
  idle('.j-c1', t => t > W('m1', 1) + 0.4 ? { y: 8 * Math.sin(t * 4) } : {}); idle('.j-c2', t => t > W('m1', 2) + 0.4 ? { y: 8 * Math.sin(t * 4 + 1) } : {});
  for (let k = 0; k < 2; k++) { const q = mk('#J .cam', 'qm'); q.textContent = '?'; place(q, 250 + k * 520, 400); hide(q); popIn(q, W('m1', 4) + k * 0.12, 0.3); }
  mascotPose('.j-m', W('m1', 3), 'shrug');
  const tSub = W('cta', 0) - 0.05;
  slideIn('.j-sub', tSub, 'down', 0.6, 300); sfx('whoosh', tSub, 0.5);
  for (let k = 0; k < 4; k++) tw('.j-bell .bell', W('cta', 1) + k * 0.16, 0.08, { r: [k % 2 ? 18 : -18, k % 2 ? -18 : 18] }, 'inOut');
  tw('.j-bell .bell', W('cta', 1) + 0.64, 0.3, { r: [-18, 0] }, 'back'); sfx('ding', W('cta', 1), 0.6);
  mascotPose('.j-m', tSub + 0.1, 'point'); punch('.j-sub', W('cta', 2), 0.06);
  tw('#J .j-st, #J .j-sub, #J .conf, #J .j-c1, #J .j-c2, #J .qm, #J .j-per, #J .j-sus', tLoop - 0.4, 0.35, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw('#J .j-m', tLoop + 0.42, 0.001, { o: [1, 0] });
}, { noCaption: ['hook'], chunks: {} });
