// 011 «Режим инкогнито прячет тебя от провайдера?» — Байт или не байт. Справка Google Chrome «Browse in Incognito mode», проверено 24.10.2026
boot(() => {
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
  const clamp = x => Math.max(0, Math.min(1, x));
  const place = (el, x, y) => { el.style.left = x + 'px'; el.style.top = y + 'px'; };
  const ease = x => 1 - Math.pow(1 - clamp(x), 3);

  // ---------- build ----------
  const buildA = sc => {
    $(sc + ' .a-tw').innerHTML = towerSVG(sc.slice(1)); $(sc + ' .a-hat').innerHTML = hatSVG(sc.slice(1));
  };
  buildA('#A');
  $('#A2').innerHTML = $('#A').innerHTML; buildA('#A2');
  // B
  $('.b-br').innerHTML = browserSVG('b'); $('.b-br').style.transformOrigin = '380px 280px'; $('.b-tr').innerHTML = trashSVG();
  const BP = []; for (let k = 0; k < 14; k++) { const p = mk('.b-pts', 'pt'); p.style.background = ['#ff3b5c', '#ffb03d', '#3dd6ff', '#b8ff3d', '#c58bff'][k % 5]; place(p, 240, 1030); BP.push(p); }
  // C
  $('.c-bk').innerHTML = bookSVG(); $('.c-ln').innerHTML = lensSVG('c');
  const CN = [0, 1, 2].map(k => { const n = mk('.c-fx', 'c-nt', noteSVG()); place(n, 230, 1090); return n; });
  const CS = []; for (let k = 0; k < 8; k++) { const s = mk('.c-fx', 'spark'); place(s, 650, 1160); CS.push(s); }
  // D
  $('.d-hs').innerHTML = houseSVG('d'); $('.d-tw').innerHTML = towerSVG('d');
  $('.d-cb').innerHTML = sv('0 0 1080 1300', `<path d="M370 880 C480 1070 660 1070 800 900" fill="none" stroke="#0a130d" stroke-width="30" stroke-linecap="round" class="draw" pathLength="100"/>
    <path id="dcab" d="M370 880 C480 1070 660 1070 800 900" fill="none" stroke="#3a3258" stroke-width="16" stroke-linecap="round" class="draw" pathLength="100"/>`);
  const DP = [0, 1, 2, 3].map(() => mk('.d-pls', 'd-pl'));
  const DC = [0, 1, 2].map(() => mk('.d-cos', 'd-co', coinSVG()));
  // E
  $('.e-tw').innerHTML = towerSVG('e'); $('.e-hs').innerHTML = houseSVG('e');
  const EK = ['play', 'cart', 'pad'], ESY = [720, 910, 1100];
  const ES = EK.map((k, i) => { const s = mk('.e-ss', 'e-s', siteSVG(k)); place(s, 790, ESY[i]); return s; });
  $('.e-rd').innerHTML = sv('0 0 1080 1300', `<path d="M190 1030 Q300 760 540 640" fill="none" stroke="#24382c" stroke-width="26" stroke-linecap="round"/>` +
    ESY.map(y => `<path d="M560 640 Q700 ${y + 40} 800 ${y + 85}" fill="none" stroke="#24382c" stroke-width="20" stroke-linecap="round"/>`).join(''));
  const EE = EK.map(k => mk('.e-envs', 'e-env', envSVG(ICON[k])));
  const EB = EK.map(k => mk('.e-bub', '', siteSVG(k)));
  EB.forEach(b => { b.style.left = '40px'; b.style.top = '40px'; b.style.width = '120px'; b.style.height = '120px'; });
  $('.e-bub > div').remove();
  // F
  $('.f-lp').innerHTML = laptopSVG('f'); $('.f-sp').innerHTML = spongeSVG(); $('.f-site').innerHTML = siteSVG('play');
  const FROAD = 'M510 930 C650 900 600 560 810 420';
  $('.f-rd').innerHTML = sv('0 0 1080 1300', `<path d="${FROAD}" fill="none" stroke="#0a130d" stroke-width="96" stroke-linecap="round"/><path d="${FROAD}" fill="none" stroke="#3b4a40" stroke-width="80" stroke-linecap="round"/>
    <path class="draw fdash" d="${FROAD}" fill="none" stroke="#f4ecd9" stroke-width="8" stroke-linecap="round" pathLength="100" style="stroke-dasharray:4 4;stroke-dashoffset:0"/>
    <path id="froad" d="${FROAD}" fill="none" stroke="none"/><path class="draw fglow" d="${FROAD}" fill="none" stroke="#ff3b5c" stroke-width="14" stroke-linecap="round" pathLength="100" opacity=".9"/>`);
  const fr = $('#froad'), frL = fr.getTotalLength();
  const FF = []; for (let k = 0; k < 7; k++) { const u = 0.08 + k * 0.125, p = fr.getPointAtLength(frL * u), q = fr.getPointAtLength(frL * Math.min(1, u + 0.01));
    const f = mk('.f-fts', 'f-ft', footSVG()); place(f, p.x - 23 + (k % 2 ? 16 : -16), p.y - 34); f.style.transform = `rotate(${Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI + 90}deg)`; FF.push(f); }
  const FS = []; for (let k = 0; k < 9; k++) { const s = mk('.f-fx', 'spark'); place(s, 270, 990); FS.push(s); }
  // G
  const GE = [[50, 260], [790, 280], [30, 620], [810, 640], [120, 980], [740, 1000], [420, 240]].map(([x, y], i) => { const e = mk('.g-eyes', 'g-eye', eyeSVG('g' + i, ['#5b8cff', '#ff3b5c', '#ffb03d', '#b8ff3d', '#c58bff', '#3dd6ff', '#5b8cff'][i])); place(e, x, y); return e; });
  // H
  $('.h-doc').innerHTML = docSVG();
  const HC = [[80, siteSVG('play')], [405, schoolSVG('h')], [730, towerSVG('h')]].map(([x, h], i) => { const c = mk('.h-cs', 'h-c h-c' + i, h); place(c, x, 900); return c; });
  const HE = [80, 405, 730].map((x, i) => { const e = mk('.h-cs', 'h-e', eyeSVG('h' + i)); place(e, x + 40, 790); return e; });
  // I
  $('.i-lp').innerHTML = laptopSVG('i'); $('.i-sh').innerHTML = shieldSVG('i'); $('.i-tw').innerHTML = towerSVG('i');
  $('.i-cb').innerHTML = sv('0 0 1080 1300', `<path class="draw" d="M640 770 C700 700 760 720 800 660" fill="none" stroke="#0a130d" stroke-width="26" stroke-linecap="round" pathLength="100"/><path id="icab" class="draw" d="M640 770 C700 700 760 720 800 660" fill="none" stroke="#3a3258" stroke-width="12" stroke-linecap="round" pathLength="100"/>`);
  const IE = [0, 1].map(() => mk('.i-envs', 'i-env', envSVG(ICON.cart)));
  // mascots
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  $$('.mascot-svg').length || $$('.m svg').forEach(s => s.classList.add('mascot-svg'));
  const sh = mk('.g-m', 'g-sh', shadesSVG());
  mascotLife();

  // ---------- cuts ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('s1'), tC = cut('j1'), tD = cut('s3'), tE = cut('s5'), tF = cut('s6'), tG = cut('j2'), tH = cut('s7'), tI = cut('v1'), tLoop = L('out').t1 - 0.62;
  sceneCuts(['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I'], [0, tB, tC, tD, tE, tF, tG, tH, tI]);
  $$('#B .m, #C .m, #D .m, #E .m, #F .m, #H .m, #I .m').forEach((m, i) => idle(m, t => ({ y: 7 * Math.sin(W2 * 16 * t + i), r: 1.6 * Math.sin(W2 * 8 * t + i) })));

  // ---------- A: hook. Spy mascot in a hat, the provider tower stares at him ----------
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  for (const sc of ['#A', '#A2']) {
    tw(sc + ' .a-m .pup', 0, 0.001, { x: [8, 8], y: [2, 2] }); tw(sc + ' .a-m .brL', 0, 0.001, { y: [8, 8], r: [8, 8] }); tw(sc + ' .a-m .brR', 0, 0.001, { y: [8, 8], r: [-8, -8] });
    tw(sc + ' .a-tw .tEye', 0, 0.001, { x: [-18, -18], y: [6, 6] });
    tw(sc + ' .a-m .armL', 0, 0.001, { r: [30, 30] }); tw(sc + ' .a-m .armR', 0, 0.001, { r: [-30, -30] });
    hide(sc + ' .a-sw'); hide(sc + ' .a-b1'); hide(sc + ' .a-b2');
    idle(sc + ' .a-tw .tWave', t => ({ s: 1 + 0.08 * Math.sin(W2 * 30 * t) }));
  }
  idle('#A .a-m, #A .a-hat', t => ({ y: 6 * Math.sin(W2 * 16 * t) }));
  idle('#A2 .a-m, #A2 .a-hat', t => ({ y: 6 * Math.sin(W2 * 16 * t) }));
  punch('#A .a-t', wt('hook', 1), 0.06);
  tw('#A .a-hat', wt('hook', 1), 0.35, { y: [0, 26], r: [0, -6] }, 'back'); sfx('pop', wt('hook', 1));
  // «прячет»: hands over the face, crouch
  punch('#A .a-t b', wt('hook', 2), 0.2); sfx('blip', wt('hook', 2), 0.7);
  tw('#A .a-m .armL', wt('hook', 2), 0.3, { r: [30, 128] }, 'back'); tw('#A .a-m .armR', wt('hook', 2), 0.3, { r: [-30, -128] }, 'back');
  tw('#A .a-m', wt('hook', 2), 0.35, { sy: [1, 0.92], x: [0, -24] }, 'out'); tw('#A .a-hat', wt('hook', 2), 0.35, { y: [26, 54], x: [0, -24] }, 'out');
  // «провайдера»: the tower leans in, the eye zooms on him
  punch('#A .a-tw', wt('hook', 5), 0.12); sfx('zap', wt('hook', 5), 0.7);
  tw('#A .a-tw', wt('hook', 5) + 0.1, 0.4, { r: [0, -7], x: [0, -20] }, 'out');
  tw('#A .a-tw .tEye', wt('hook', 5), 0.3, { s: [1, 1.25] }, 'back');
  popIn('#A .a-sw', wt('hook', 5) + 0.2, 0.25, 0.4); tw('#A .a-sw', wt('hook', 5) + 0.5, 0.7, { y: [0, 90] }, 'in'); tw('#A .a-sw', wt('hook', 5) + 1.0, 0.25, { o: [1, 0] }, 'lin');
  // h2: «Байт или не байт?» — two verdict plates slide in, the mascot looks from one to the other
  slideIn('#A .a-b1', wt('h2', 0) - 0.05, 'left', 0.5, 300); sfx('whoosh', wt('h2', 0) - 0.05, 0.6);
  tw('#A .a-m .pup', wt('h2', 0), 0.3, { x: [8, -8], y: [2, 8] }, 'out');
  tw('#A .a-m .armL', wt('h2', 0), 0.3, { r: [128, 40] }, 'out'); tw('#A .a-m .armR', wt('h2', 0), 0.3, { r: [-128, -20] }, 'out');
  tw('#A .a-m', wt('h2', 0), 0.3, { sy: [0.92, 1], x: [-24, 0] }, 'out'); tw('#A .a-hat', wt('h2', 0), 0.3, { y: [54, 0], x: [-24, 0], r: [-6, 0] }, 'out');
  slideIn('#A .a-b2', wt('h2', 2) - 0.05, 'right', 0.5, 300); sfx('whoosh', wt('h2', 2) - 0.05, 0.6);
  tw('#A .a-m .pup', wt('h2', 2), 0.3, { x: [-8, 8], y: [8, 8] }, 'out');
  tw('#A .a-m .armR', wt('h2', 3), 0.3, { r: [-20, -70] }, 'back');
  idle('#A .a-b1', t => t > wt('h2', 3) ? { r: 3 * Math.sin((t - wt('h2', 3)) * 9), y: 10 * Math.sin((t - wt('h2', 3)) * 9) } : {});
  idle('#A .a-b2', t => t > wt('h2', 3) ? { r: -3 * Math.sin((t - wt('h2', 3)) * 9), y: -10 * Math.sin((t - wt('h2', 3)) * 9) } : {});

  // ---------- B: an incognito tab forgets. Close it -> into the bin ----------
  tZoom('#A', '#B', tB);
  slideIn('.b-chip', tB + 0.15, 'left', 0.6, 300);
  hide('.b-tr'); hide('.b-pan'); hide('#B .hrow');
  tw('.b-m .armL', tB, 0.001, { r: [50, 50] }); tw('.b-m .pup', tB, 0.001, { x: [-6, -6], y: [-6, -6] });
  const rowT = [wt('s1', 1), wt('s1', 2), wt('s1', 3), wt('s1', 4), wt('s1', 5)];
  rowT.forEach((t, k) => { slideIn(`#B .hrow${k}`, t, 'left', 0.45, 80); sfx('tick', t, 0.8); tw('.b-m .pup', t, 0.2, { y: [-6 + k * 2.5, -6 + (k + 1) * 2.5] }, 'out'); });
  punch('.b-m', wt('s1', 0), 0.08);
  slideIn('.b-tr', wt('s1', 5), 'down', 0.6, 260);
  // «Закрыл»: jump, smack the X, the window flies into the bin
  const tX = wt('s2', 0);
  tw('.b-m', tX - 0.15, 0.2, { y: [0, -90] }, 'out'); tw('.b-m', tX + 0.05, 0.3, { y: [-90, 0] }, 'in');
  tw('.b-m .armR', tX - 0.15, 0.2, { r: [0, -150] }, 'out'); tw('.b-m .armR', tX + 0.25, 0.3, { r: [-150, -10] }, 'out');
  punch('#B .bX', tX, 0.4); sfx('pop', tX, 1.2);
  tw('#B .trLid', tX, 0.25, { r: [0, -50] }, 'out');
  tw('.b-br', tX + 0.15, 0.6, { s: [1, 0.12], x: [0, -300], y: [0, 508], r: [0, -30] }, 'in'); sfx('whoosh', tX + 0.15, 0.8);
  tw('.b-br', tX + 0.75, 0.05, { o: [1, 0] }, 'lin');
  tw('#B .trLid', tX + 0.8, 0.12, { r: [-50, 0] }, 'in'); sfx('thud', tX + 0.9); shake(tX + 0.9, 0.25, 14); punch('.b-tr', tX + 0.92, 0.1);
  // «никакой истории»: poof of data bits out of the bin, panel
  const tP = wt('s2', 4) - 0.1;
  BP.forEach((p, k) => { const a = -Math.PI * (0.15 + 0.7 * hash(k + 1)), d = 160 + 160 * hash(k + 7);
    hide(p); tw(p, tP, 0.7, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d], r: [0, 360 * (hash(k) - 0.5)], s: [1, 0.3] }, 'out'); tw(p, tP, 0.08, { o: [0, 1] }, 'lin'); tw(p, tP + 0.5, 0.3, { o: [1, 0] }, 'lin'); });
  sfx('glitch', tP, 0.7);
  slideIn('.b-pan', wt('s2', 4), 'right', 0.6, 300);
  tw('.b-m .armL', wt('s2', 5), 0.25, { r: [50, 120] }, 'back'); tw('.b-m .armL', wt('s2', 5) + 0.3, 0.3, { r: [120, 50] }, 'out');
  tw('.b-m .pup', wt('s2', 3), 0.25, { x: [-6, -8], y: [6.5, 6] }, 'out');

  // ---------- C: joke — mum checks the history: empty. Perfect ----------
  tCircle('#B', '#C', tC, 540, 600);
  hide('.c-ln'); hide('.c-st'); hide('.c-ok');
  tw('.c-m .pup', tC, 0.001, { x: [-4, -4], y: [-8, -8] }); tw('.c-m .mouth', tC, 0.001, { sx: [0.6, 0.6], sy: [0.5, 0.5] });
  tw('.c-m .armL', tC, 0.001, { r: [10, 10] }); tw('.c-m .armR', tC, 0.001, { r: [-10, -10] });
  idle('.c-m', t => t > tC && t < wt('j1', 6) ? { r: 5 * Math.sin((t - tC) * 6) } : {});        // innocent sway while whistling
  CN.forEach((n, k) => { const t0 = tC + 0.25 + k * 0.7; hide(n); tw(n, t0, 0.1, { o: [0, 1] }, 'lin'); tw(n, t0, 1.1, { x: [0, 60 + 50 * k], y: [0, -220], r: [0, 25] }, 'out'); tw(n, t0 + 0.8, 0.3, { o: [1, 0] }, 'lin'); sfx('blip', t0, 0.35); });
  slideIn('.c-ln', wt('j1', 1) - 0.05, 'right', 0.5, 400); sfx('whoosh', wt('j1', 1) - 0.05, 0.6);
  const ls = wt('j1', 2), le = wt('j1', 5) - 0.05;
  idle('.c-ln', t => { if (t < ls) return {}; const u = clamp((t - ls) / (le - ls)); return { x: -400 * Math.sin(Math.PI * u), y: 300 * u, r: 8 * Math.sin(u * 12) }; });
  tw('.c-ln', le, 0.25, { o: [1, 0], s: [1, 0.6] }, 'in');
  sfx('tick', ls + 0.3, 0.6); sfx('tick', ls + 0.7, 0.6);
  hide('.c-st'); stamp('.c-st', wt('j1', 5) - 0.05, -8, 20);
  tw('.c-m .pup', wt('j1', 5), 0.2, { x: [-4, 8], y: [-8, 0] }, 'out');
  // «Идеально»: jump, both arms up, sparkles
  const tOk = wt('j1', 6);
  tw('.c-m', tOk - 0.05, 0.2, { y: [0, -110] }, 'out'); tw('.c-m', tOk + 0.15, 0.3, { y: [-110, 0] }, 'in');
  tw('.c-m .armL', tOk - 0.05, 0.3, { r: [10, 140] }, 'back'); tw('.c-m .armR', tOk - 0.05, 0.3, { r: [-10, -140] }, 'back');
  tw('.c-m .mouth', tOk - 0.05, 0.25, { sx: [0.6, 1.2], sy: [0.5, 1.3] }, 'back');
  slideIn('.c-ok', tOk, 'down', 0.55, 260); sfx('ding', tOk, 0.8);
  CS.forEach((s, k) => { const a = 2 * Math.PI * k / CS.length, d = 170 + 60 * hash(k + 3); hide(s); tw(s, tOk + 0.05, 0.6, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d], s: [0.3, 1.1], r: [0, 120] }, 'out'); tw(s, tOk + 0.05, 0.05, { o: [0, 1] }, 'lin'); tw(s, tOk + 0.5, 0.3, { o: [1, 0] }, 'lin'); });

  // ---------- D: the internet comes to your house from the provider; you pay it ----------
  tWhip('#C', '#D', tD);
  hide('.d-chip'); hide('.d-pan');
  tw('#D .d-cb path', tD, 0.001, { dash: [100, 100] });
  tw('#D .d-cb path', wt('s3', 1) - 0.05, 0.6, { dash: [100, 0] }, 'inOut'); sfx('zap', wt('s3', 1), 0.5);
  tw('.d-m .pup', tD, 0.001, { x: [6, 6], y: [6, 6] });
  const dc = $('#dcab'), dcL = dc.getTotalLength(), tPl = wt('s3', 3) - 0.1;
  custom(t => DP.forEach((p, k) => { const u = (t - tPl - k * 0.26) / 0.9; if (u < 0 || u > 1) { p.style.opacity = 0; return; }
    const q = dc.getPointAtLength(dcL * (1 - ease(u))); p.style.opacity = 1; p.style.transform = `translate(${q.x - 15}px,${q.y - 15}px)`; }));
  [0, 1, 2, 3].forEach(k => sfx('blip', tPl + k * 0.26 + 0.85, 0.4));
  tw('.d-m .pup', tPl, 0.6, { x: [6, -8] }, 'inOut');
  punch('.d-hs', tPl + 0.95, 0.08);
  slideIn('.d-chip', wt('s3', 4), 'right', 0.55, 300); punch('.d-tw', wt('s3', 4), 0.1);
  tw('.d-m .armR', wt('s3', 4), 0.3, { r: [0, -80] }, 'back'); tw('.d-m .pup', wt('s3', 4), 0.25, { x: [-8, 8], y: [6, -2] }, 'out');
  slideIn('.d-pan', wt('s4', 0), 'down', 0.6, 260);
  // «платишь»: coins fly from the mascot into the tower
  const tPay = wt('s4', 3) - 0.08;
  tw('.d-m .armR', tPay - 0.15, 0.15, { r: [-80, 20] }, 'in'); tw('.d-m .armR', tPay, 0.35, { r: [20, -120] }, 'back');
  DC.forEach((c, k) => { const t0 = tPay + k * 0.2; hide(c); place(c, 590, 680);
    tw(c, t0, 0.04, { o: [0, 1] }, 'lin');
    tw(c, t0, 0.5, { x: [0, 260 - k * 10] }, 'lin'); tw(c, t0, 0.25, { y: [0, -150] }, 'out'); tw(c, t0 + 0.25, 0.25, { y: [-150, -40] }, 'in');
    tw(c, t0 + 0.5, 0.1, { o: [1, 0], s: [1, 0.4] }, 'lin'); sfx('coin', t0 + 0.48, 0.9); });
  punch('.d-tw', tPay + 0.55, 0.06); punch('.d-tw', tPay + 0.95, 0.06);
  tw('.d-tw .tEye', tPay + 0.5, 0.3, { s: [1, 1.2] }, 'back');

  // ---------- E: like a postman, it sees the address on every letter ----------
  tSlideUp('#D', '#E', tE);
  hide('.e-chip'); hide('.e-bub');
  tw('.e-tw .tCap', tE, 0.001, { o: [0, 0] });
  slideIn('.e-chip', wt('s5', 1), 'left', 0.55, 300);
  tw('.e-tw .tCap', wt('s5', 2), 0.35, { o: [0, 1], y: [-90, 0] }, 'out'); sfx('pop', wt('s5', 2) + 0.2);
  punch('.e-tw', wt('s5', 2) + 0.3, 0.08);
  tw('.e-m .armR', wt('s5', 0), 0.3, { r: [0, -75] }, 'back'); tw('.e-m .pup', wt('s5', 0), 0.25, { x: [0, 8] }, 'out');
  const tEn = wt('s5', 3) - 0.05, EP = 0.48;
  const EH = { x: 160, y: 1040 }, ET = { x: 540, y: 504 };
  const envPos = (k, t) => { const u = t - tEn - k * EP; if (u < 0) return null;
    const ESx = 875, ESyk = ESY[k] + 85;
    if (u < 0.32) { const p = ease(u / 0.32); return { x: EH.x + (ET.x - EH.x) * p, y: EH.y + (ET.y - EH.y) * p, s: 0.7 + 0.3 * p }; }
    if (u < 0.6) return { x: ET.x, y: ET.y, s: 1.1 };
    if (u < 0.95) { const p = ease((u - 0.6) / 0.35); return { x: ET.x + (ESx - ET.x) * p, y: ET.y + (ESyk - ET.y) * p, s: 1.1 - 0.4 * p }; }
    if (u < 1.15) return { x: ESx, y: ESyk, s: 0.7 * (1 - (u - 0.95) / 0.2) };
    return null; };
  custom(t => {
    let cur = -1, near = null;
    EE.forEach((e, k) => { const p = envPos(k, t); if (!p) { e.style.opacity = 0; return; }
      e.style.opacity = 1; e.style.transform = `translate(${p.x - 80}px,${p.y - 55}px) scale(${p.s.toFixed(3)})`;
      const u = t - tEn - k * EP; if (u >= 0.32 && u < 0.6) cur = k; if (u < 0.95) near = near || p; });
    EB.forEach((b, k) => b.style.opacity = k === (cur >= 0 ? cur : Math.max(0, Math.min(2, Math.floor((t - tEn) / EP)))) ? 1 : 0);
    const eye = $('.e-tw .tEye'); if (t >= tE - 0.5 && t < tF + 0.5) { const tg = near || { x: 700, y: 900 };
      const dx = tg.x - 540, dy = tg.y - 504, m = Math.hypot(dx, dy) || 1; eye.style.transform = `translate(${(dx / m * 18).toFixed(2)}px,${(dy / m * 18).toFixed(2)}px)`; }
  });
  [0, 1, 2].forEach(k => { sfx('whoosh', tEn + k * EP, 0.35); sfx('blip', tEn + k * EP + 0.33, 0.6); sfx('tick', tEn + k * EP + 0.92, 0.7); punch(ES[k], tEn + k * EP + 0.93, 0.12); });
  popIn('.e-bub', tEn + 0.3, 0.3, 0.4);
  tw('.e-bub', wt('s6', 0) - 0.4, 0.2, { o: [1, 0] }, 'lin');
  tw('.e-m .brL', wt('s5', 3), 0.25, { y: [0, -16] }, 'back'); tw('.e-m .brR', wt('s5', 3), 0.25, { y: [0, -16] }, 'back');
  tw('.e-m .mouth', wt('s5', 6), 0.25, { sy: [1, -1] }, 'back'); tw('.e-m .armR', wt('s5', 6), 0.3, { r: [-75, -20] }, 'out');
  tw('.e-m .armL', wt('s5', 6), 0.3, { r: [0, 110] }, 'back');

  // ---------- F: incognito wipes only your computer, not the road ----------
  tDrop('#E', '#F', tF);
  hide('.f-pan'); hide('.f-sp');
  tw('.f-rd .fglow', tF, 0.001, { dash: [100, 100] });
  FF.forEach((f, k) => { const t0 = tF + 0.3 + k * 0.08; hide(f); tw(f, t0, 0.2, { o: [0, 1], s: [0.4, 1] }, 'back'); });
  sfx('tick', tF + 0.35, 0.5); sfx('tick', tF + 0.6, 0.5);
  tw('.f-m .pup', tF, 0.001, { x: [-8, -8], y: [0, 0] });
  // sponge wipes the screen; lines vanish one by one
  const tW = wt('s6', 1) - 0.1, tWe = wt('s6', 4) + 0.1;
  tw('.f-sp', tW - 0.2, 0.25, { o: [0, 1], y: [80, 0] }, 'out');
  idle('.f-sp', t => (t > tW && t < tWe) ? { x: 90 * Math.sin((t - tW) * 14), y: 90 * clamp((t - tW) / (tWe - tW)) } : (t >= tWe ? { y: 90 } : {}));
  tw('.f-sp', tWe, 0.3, { o: [1, 0], x: [0, 160] }, 'in');
  [0, 1, 2, 3].forEach(k => { const t0 = tW + 0.15 + k * (tWe - tW - 0.2) / 4; tw(`.f-lp .lnr${k}`, t0, 0.15, { o: [1, 0] }, 'lin'); sfx('whoosh', t0, 0.25); });
  tw('.f-m .armL', tW - 0.2, 0.3, { r: [0, 70] }, 'out'); idle('.f-m .armL', t => (t > tW && t < tWe) ? { r: 14 * Math.sin((t - tW) * 14) } : {});
  tw('.f-m .armL', tWe, 0.3, { r: [70, 0] }, 'out');
  FS.forEach((s, k) => { const a = 2 * Math.PI * k / FS.length, d = 120 + 70 * hash(k + 11); hide(s); tw(s, tWe, 0.55, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d * 0.7], s: [0.3, 1], r: [0, 140] }, 'out'); tw(s, tWe, 0.05, { o: [0, 1] }, 'lin'); tw(s, tWe + 0.4, 0.3, { o: [1, 0] }, 'lin'); });
  sfx('ding', tWe, 0.7);
  // «а не дорогу»: the road lights red, footprints still there, the mascot frowns and points
  const tR = wt('s6', 5);
  tw('.f-rd .fglow', tR, 0.6, { dash: [100, 0] }, 'inOut'); sfx('buzz', wt('s6', 7), 0.6);
  FF.forEach((f, k) => punch(f, tR + 0.1 + k * 0.06, 0.3));
  slideIn('.f-pan', wt('s6', 6), 'right', 0.55, 300);
  tw('.f-m .pup', tR, 0.25, { x: [-8, 6], y: [0, -8] }, 'out'); tw('.f-m .mouth', tR, 0.25, { sy: [1, -1] }, 'back');
  tw('.f-m .armR', tR, 0.3, { r: [0, -95] }, 'back');
  punch('.f-site', wt('s6', 7), 0.12);

  // ---------- G: joke — sunglasses = "I'm invisible". All the eyes open ----------
  tCircle('#F', '#G', tG, 540, 940);
  GE.forEach(e => tw($('.eLid', e), tG, 0.001, { sy: [1, 1] }));
  hide('.g-sw');
  tw('.g-sh', tG, 0.001, { y: [-700, -700], o: [1, 1] });
  tw('.g-sh', wt('j2', 3) - 0.1, 0.4, { y: [-700, 0] }, 'in'); sfx('whoosh', wt('j2', 3) - 0.1, 0.5); sfx('clink', wt('j2', 4) - 0.05, 0.8);
  tw('.g-m', wt('j2', 4) - 0.05, 0.12, { sy: [1, 0.9] }, 'out'); tw('.g-m', wt('j2', 4) + 0.07, 0.3, { sy: [0.9, 1] }, 'back');
  tw('.g-m .armR', wt('j2', 2), 0.3, { r: [0, -120] }, 'back'); tw('.g-m .armR', wt('j2', 4) + 0.1, 0.3, { r: [-120, -40] }, 'out');
  tw('.g-m .mouth', wt('j2', 4), 0.3, { sx: [1, 1.15], sy: [1, 1.2] }, 'back');
  // sneaking left on tiptoe
  const tS = wt('j2', 6) - 0.1, tSe = wt('j2', 9);
  idle('.g-m', t => { if (t < tS) return {}; const u = clamp((t - tS) / (tSe - tS)); return { x: -230 * u, y: -14 * Math.abs(Math.sin((t - tS) * 9)) * (u < 1 ? 1 : 0) }; });
  idle('.g-m .legL', t => (t > tS && t < tSe) ? { r: 22 * Math.sin((t - tS) * 9) } : {}); idle('.g-m .legR', t => (t > tS && t < tSe) ? { r: -22 * Math.sin((t - tS) * 9) } : {});
  tw('.g-m .armL', tS, 0.3, { r: [0, 60] }, 'out');
  const spot = $('.g-spot');
  custom(t => { if (t < tG - 0.5 || t > tH + 0.5) return; const u = t < tS ? 0 : clamp((t - tS) / (tSe - tS)); spot.style.transform = `translate(${540 - 230 * u - 350}px,${940 - 350}px)`; });
  // «невидимка»: every eye opens and stares
  GE.forEach((e, k) => { const t0 = tSe + k * 0.05; tw($('.eLid', e), t0, 0.22, { sy: [1, 0.1] }, 'out'); popIn(e, t0, 0.3, 0.7);
    const cx = $$('.g-eye')[k].offsetLeft + 120, cy = $$('.g-eye')[k].offsetTop + 72, dx = (540 - 230) - cx, dy = 940 - cy, m = Math.hypot(dx, dy);
    tw($('.ePup', e), t0, 0.25, { x: [0, dx / m * 26], y: [0, dy / m * 20] }, 'out'); });
  sfx('glitch', tSe, 0.8); sfx('boom', tSe + 0.1, 0.6); shake(tSe + 0.05, 0.3, 16);
  tw('.g-m', tSe + 0.05, 0.15, { y: [0, -60] }, 'out'); tw('.g-m', tSe + 0.2, 0.25, { y: [-60, 0] }, 'in');
  tw('.g-m .armL', tSe + 0.05, 0.25, { r: [60, 150] }, 'back'); tw('.g-m .armR', tSe + 0.05, 0.25, { r: [-40, -150] }, 'back');
  tw('.g-m .mouth', tSe + 0.05, 0.2, { sy: [1.2, -1.2], sx: [1.15, 0.8] }, 'back');
  popIn('.g-sw', tSe + 0.15, 0.25, 0.4); tw('.g-sw', tSe + 0.15, 0.001, { x: [-230, -230] }); tw('.g-sw', tSe + 0.4, 0.5, { y: [0, 80] }, 'in');

  // ---------- H: the help page itself: three can still see you ----------
  tWhip('#G', '#H', tH, 0.46, -1);
  hide('.h-src'); hide('.h-n'); hide('.h-see'); hide('#H .h-c'); hide('#H .h-e');
  tw('.h-doc .dhl', tH, 0.001, { sx: [0, 0] });
  slideIn('.h-doc', tH + 0.05, 'left', 0.6, 500);
  slideIn('.h-src', wt('s7', 0), 'left', 0.6, 300); punch('.h-doc', wt('s7', 0) + 0.1, 0.05);
  tw('.h-m .armL', wt('s7', 0), 0.3, { r: [0, 75] }, 'back'); tw('.h-m .pup', wt('s7', 0), 0.25, { x: [0, -8] }, 'out');
  tw('.h-doc .dhl', wt('s7', 6) - 0.1, 0.45, { sx: [0, 1] }, 'inOut'); sfx('zap', wt('s7', 6) - 0.1, 0.4);
  slideOut('.h-doc', wt('s8', 0), 'left', 0.4, 700); tw('.h-m .armL', wt('s8', 0), 0.3, { r: [75, 0] }, 'out');
  // «трое»
  const t3 = wt('s8', 5) - 0.05;
  slideIn('.h-see', wt('s8', 4) - 0.1, 'down', 0.5, 200);
  tw('.h-n', t3, 0.001, { o: [0, 1] }); stamp('.h-n', t3, 0, 16); custom(t => { $('.h-n').textContent = '3'; });
  tw('.h-m', t3, 0.18, { y: [0, -70] }, 'out'); tw('.h-m', t3 + 0.18, 0.25, { y: [-70, 0] }, 'in');
  tw('.h-m .armR', t3, 0.3, { r: [0, -140] }, 'back'); tw('.h-m .armR', t3 + 0.5, 0.3, { r: [-140, -20] }, 'out');
  // sites / network at work or school / provider: each card flies up, its eye opens
  const hT = [wt('s9', 0), wt('s9', 3), wt('s9', 8)];
  hT.forEach((t, k) => { tw(HC[k], t - 0.08, 0.5, { y: [380, 0], o: [0, 1], r: [k * 6 - 6, 0] }, 'back'); sfx('pop', t, 0.9);
    tw(HE[k], t + 0.15, 0.001, { o: [0, 1] }); tw($('.eLid', HE[k]), t + 0.15, 0.001, { sy: [1, 1] }); tw($('.eLid', HE[k]), t + 0.25, 0.25, { sy: [1, 0.1] }, 'out');
    popIn(HE[k], t + 0.15, 0.3, 0.5); sfx('blip', t + 0.3, 0.6);
    tw('.h-m .pup', t, 0.25, { x: [k === 0 ? -8 : (k - 1) * 8 - 4, k === 2 ? 4 : -8 + k * 6], y: [k ? 8 : 0, 8] }, 'out'); });
  punch('.h-c2', wt('s9', 8) + 0.4, 0.1);
  HE.forEach((e, k) => idle($('.ePup', e), t => t > hT[k] + 0.3 ? { x: 18 * Math.sin((t - hT[k]) * 2.2 + k) } : {}));

  // ---------- I: verdict БАЙТ; hides from the people at your computer, not from the provider ----------
  // flip transition: the old scene folds, the new one unfolds
  tw('#H', tI - 0.25, 0.25, { sx: [1, 0], o: [1, 0.6] }, 'in'); tw('#I', tI, 0.3, { sx: [0, 1] }, 'out5'); sfx('whoosh', tI - 0.25, 0.9);
  hide('.i-st'); hide('.i-lp'); hide('.i-sh'); hide('.i-n'); hide('.i-tw'); hide('.i-no');
  tw('#I .i-cb path', tI, 0.001, { dash: [100, 100] });
  tw('.i-m', tI, 0.001, { x: [-330, -330], y: [-200, -200], s: [1.25, 1.25] });
  tw('.i-m .armR', wt('v1', 0), 0.3, { r: [0, -60] }, 'back'); tw('.i-m .brL', wt('v1', 0), 0.25, { y: [0, 12], r: [0, 10] }, 'out'); tw('.i-m .brR', wt('v1', 0), 0.25, { y: [0, 12], r: [0, -10] }, 'out');
  tw('.i-m .armR', wt('v1', 1) - 0.25, 0.25, { r: [-60, -160] }, 'out'); tw('.i-m .armR', wt('v1', 1) - 0.02, 0.15, { r: [-160, -40] }, 'in');
  stamp('.i-st', wt('v1', 1), -6, 30); sfx('impact', wt('v1', 1) + 0.1, 0.6);
  // t1: stamp lifts up, the laptop arrives, the neighbour peeks and bounces off a shield
  tw('.i-st', wt('t1', 0) - 0.1, 0.5, { s: [1, 0.5], y: [0, -150] }, 'out');
  tw('.i-m', wt('t1', 0) - 0.1, 0.55, { x: [-330, 0], y: [-200, 0], s: [1.25, 1] }, 'out'); tw('.i-m .armR', wt('t1', 0), 0.3, { r: [-40, 0] }, 'out');
  slideIn('.i-lp', wt('t1', 1), 'down', 0.55, 300); sfx('whoosh', wt('t1', 1), 0.5);
  tw('.i-m .pup', wt('t1', 1), 0.25, { x: [0, -8], y: [0, 6] }, 'out');
  slideIn('.i-n', wt('t1', 5) - 0.15, 'left', 0.5, 300); tw('.i-n .pup', wt('t1', 5), 0.001, { x: [8, 8], y: [6, 6] });
  tw('.i-n', wt('t1', 5) + 0.3, 0.2, { r: [0, 12] }, 'out');
  const tSh = wt('t1', 7) - 0.05;
  popIn('.i-sh', tSh, 0.35, 0.3); sfx('clink', tSh + 0.05, 0.9);
  tw('.i-n', tSh + 0.1, 0.35, { x: [0, -60], r: [12, -12] }, 'out'); tw('.i-n .mouth', tSh + 0.1, 0.2, { sy: [1, -1] }, 'back');
  tw('.i-m .mouth', tSh + 0.1, 0.25, { sx: [1, 1.2], sy: [1, 1.25] }, 'back');
  // t2: «А от провайдера — нет»: the tower appears, a letter goes up the cable, the eye sees it
  const tTw = wt('t2', 2) - 0.05;
  slideIn('.i-tw', tTw, 'right', 0.55, 300); sfx('whoosh', tTw, 0.5);
  tw('#I .i-cb path', tTw + 0.2, 0.4, { dash: [100, 0] }, 'inOut');
  tw('.i-m .pup', tTw, 0.25, { x: [-8, 4], y: [6, -8] }, 'out');
  const ic = $('#icab'), icL = ic.getTotalLength();
  custom(t => IE.forEach((e, k) => { const u = (t - tTw - 0.45 - k * 0.32) / 0.45; if (u < 0 || u > 1) { e.style.opacity = 0; return; }
    const q = ic.getPointAtLength(icL * ease(u)); e.style.opacity = u > 0.85 ? (1 - u) / 0.15 : 1; e.style.transform = `translate(${q.x - 65}px,${q.y - 45}px) scale(${(1 - 0.4 * u).toFixed(3)})`; }));
  tw('.i-tw .tEye', tTw + 0.6, 0.3, { x: [0, -16], y: [0, 14], s: [1, 1.2] }, 'back'); sfx('blip', tTw + 0.9, 0.6);
  stamp('.i-no', wt('t2', 3) - 0.03, 5, 22);
  tw('.i-m .mouth', wt('t2', 3), 0.25, { sx: [1.2, 1], sy: [1.25, -1] }, 'back');
  // out: fade the props, loop clone of frame 0
  tw('#I .i-st, #I .i-lp, #I .i-sh, #I .i-n, #I .i-tw, #I .i-no, #I .i-cb', tLoop - 0.25, 0.3, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw('#I .i-m', tLoop + 0.4, 0.001, { o: [1, 0] });
}, { noCaption: ['hook'], chunks: {} });
