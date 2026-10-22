boot(() => {
  // ---------- build ----------
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; $(par).appendChild(d); return d; };
  $('#A2').innerHTML = $('#A').innerHTML; $('#A2 .a-st').remove(); $('#A2 .a-chip').remove();
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  mascotLife();
  $('#A .a-br').innerHTML = browserSVG('a'); $('#A2 .a-br').innerHTML = browserSVG('a2'); $('#A .a-mag').innerHTML = magSVG(); $('#A2 .a-mag').innerHTML = magSVG();
  $('.b-ck').innerHTML = cookSVG('b'); $('.b-cnt').innerHTML = counterSVG(); $('.b-ph').innerHTML = phoneSVG(); $('.b-tk').innerHTML = ticketSVG(3); $('.b-pl').innerHTML = plateSVG();
  const sites = []; for (let k = 0; k < 10; k++) { const s = mk('.c-grid', 'site', siteSVG(k) + '<i></i>'); s.style.left = 92 + (k % 5) * 184 + 'px'; s.style.top = (k < 5 ? 470 : 680) + 'px'; sites.push(s); }
  $('.c-ck').innerHTML = cookSVG('c'); $('.c-hole').innerHTML = sv('0 0 120 110', `<path d="M60 4 L74 30 L112 24 L92 54 L116 84 L78 80 L64 106 L48 80 L8 88 L28 56 L6 26 L44 30 Z" fill="#050806" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>`);
  $('.d-ck').innerHTML = cookSVG('d'); $('.d-tk').innerHTML = ticketSVG(12); $('.d-cnt').innerHTML = counterSVG();
  const dSt = [[120, 930], [420, 940], [700, 925], [880, 945]].map(([x, y], k) => { const s = mk('.d-stains', 'stain', stainSVG(k)); s.style.left = x + 'px'; s.style.top = y + 'px'; return s; });
  $('.e-hk').innerHTML = hackerSVG(); $('.e-cnt').innerHTML = counterSVG(); $('.e-pl').innerHTML = plateSVG(); $('.e-gl').innerHTML = gloveSVG();
  [[120, 900], [430, 910], [820, 905]].forEach(([x, y], k) => { const s = mk('.e-stains', 'stain', stainSVG(k)); s.style.left = x + 'px'; s.style.top = y + 'px'; });
  $('.f-bw').innerHTML = bowlSVG(); $('.f-key').innerHTML = keySVG();
  $('.f-stm').innerHTML = sv('0 0 420 300', [90, 210, 330].map(x => `<path class="stm" pathLength="100" d="M${x} 290 q-36 -50 0 -95 q36 -50 0 -95 q-26 -40 0 -90" fill="none" stroke="#f4ecd9" stroke-width="14" stroke-linecap="round" opacity=".8"/>`).join(''));
  $('.g-br').innerHTML = browserSVG('g', { web: true, crack: true }); $('.g-cal').innerHTML = calSVG(); $('.g-chip').innerHTML = chipSVG(); $('.g-mag').innerHTML = magSVG(); $('.g-pt').innerHTML = patchSVG(); $('.g-hum').innerHTML = personSVG();
  $('.h-ck').innerHTML = cookSVG('h'); $('.h-cnt').innerHTML = counterSVG(); $('.h-sp').innerHTML = spongeSVG();
  const hSt = [[120, 870], [360, 880], [600, 868], [840, 878]].map(([x, y], k) => { const s = mk('.h-stains', 'stain', stainSVG(k)); s.style.left = x + 'px'; s.style.top = y + 'px'; return s; });

  // ---------- cuts ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('s1'), tC = cut('s3'), tD = cut('s6'), tE = cut('s8'), tF = cut('j1'), tG = cut('s11'), tH = cut('j2'), tI = cut('t1'), tLoop = L('out').t1 - 0.62;
  sceneCuts(['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I'], [0, tB, tC, tD, tE, tF, tG, tH, tI]);
  // idle life
  $$('.m').forEach((m, i) => idle(m, t => ({ y: 9 * Math.sin(W2 * 16 * t + i), r: 2.5 * Math.sin(W2 * 8 * t + i) })));
  $$('#A .pup, #A2 .pup').forEach(p => idle(p, t => ({ x: -7 + 2 * Math.sin(W2 * 10 * t), y: 4 })));
  ['.b-ck', '.c-ck', '.h-ck'].forEach((s, i) => idle(s, t => ({ y: 6 * Math.sin(W2 * 20 * t + i), r: 1.5 * Math.sin(W2 * 10 * t + i) })));

  // ---------- A hook: magnifier finds the hole ----------
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  for (const sc of ['#A', '#A2']) { tw(sc + ' .armL', 0, 0.001, { r: [40, 40] }); tw(sc + ' .a-mag', 0, 0.001, { r: [0, 0] }); }
  idle('#A .a-mag', t => t < L('h2').t0 ? { x: 10 * Math.sin(t * 7), y: 8 * Math.cos(t * 5) } : {}); idle('#A2 .a-mag', t => ({ x: 10 * Math.sin(t * 7), y: 8 * Math.cos(t * 5) }));
  punch('#A .a-t', wt('hook', 2)); sfx('blip', wt('hook', 2));
  tw('#A .bwHole', wt('hook', 2), 0.3, { s: [1, 1.18] }, 'out'); tw('#A .bwHole', wt('hook', 2) + 0.3, 0.4, { s: [1.18, 1] }, 'out');
  tw('#A .bwCrack', wt('hook', 2), 0.5, { dash: [100, 0] }, 'out'); sfx('glitch', wt('hook', 2), 0.7);
  tw('#A .brR', wt('hook', 4), 0.25, { y: [0, -14], r: [0, -10] }, 'back'); punch('#A .a-t b', wt('hook', 4), 0.2); sfx('ding', wt('hook', 4), 0.7);
  tw('#A .a-mag', wt('hook', 5), 0.4, { x: [0, 60], y: [0, -40], r: [0, 20] }, 'out');
  hide('#A .a-st'); stamp('#A .a-st', wt('h2', 0) + 0.05, -6, 22);
  tw('#A .armR', wt('h2', 0) + 0.15, 0.3, { r: [0, -110] }, 'back'); tw('#A .mouth', wt('h2', 0), 0.2, { sy: [1, 1.25] }, 'back');
  hide('#A .a-chip'); slideIn('#A .a-chip', wt('h2', 0) - 0.05, 'down', 0.7, 220); sfx('whoosh', wt('h2', 0) - 0.05, 0.5);

  // ---------- B kitchen: order goes to the cook, page comes back ----------
  tSlideUp('#A', '#B', tB);
  hide('.b-chip'); slideIn('.b-chip', wt('s1', 1) - 0.05, 'up', 0.65, 160); punch('.b-chip', wt('s1', 4), 0.1); sfx('pop', wt('s1', 4), 0.7);
  tw('#B .armR', tB, 0.001, { r: [-30, -30] });
  tw('#B .pup', wt('s1', 4), 0.3, { x: [0, 8] }, 'out');
  tw('.b-ck .ckHat', wt('s1', 4), 0.2, { r: [0, -12], y: [0, -14] }, 'back'); tw('.b-ck .ckHat', wt('s1', 4) + 0.25, 0.3, { r: [-12, 0], y: [-14, 0] }, 'back');
  // order ticket flies phone -> cook
  hide('.b-tk'); const tk0 = wt('s2', 2) - 0.1;
  tw('.b-tk', tk0, 0.06, { o: [0, 1] }, 'lin'); tw('.b-tk', tk0, 0.6, { x: [0, 400], y: [0, -150], r: [0, 380], s: [0.4, 1] }, 'out'); sfx('whoosh', tk0, 0.6);
  tw('.b-tk', tk0 + 0.62, 0.25, { o: [1, 0], s: [1, 0.5] }, 'in'); sfx('pop', tk0 + 0.7);
  hide('.b-l1'); slideIn('.b-l1', wt('s2', 2), 'down', 0.6, 200);
  tw('#B .armL', wt('s2', 1), 0.3, { r: [0, 60] }, 'back'); tw('#B .armL', tk0 + 0.4, 0.4, { r: [60, 0] }, 'out');
  // cook cooks: pan shakes, sparks
  for (let th = wt('s2', 3), k = 0; th < we('s2', 4); th += 0.17, k++) tw('.b-ck .ckArmR', th, 0.17, { r: k % 2 ? [-14, 6] : [6, -14] }, 'sine');
  tw('.b-ck .ckArmR', we('s2', 4), 0.3, { r: [-14, 0] }, 'out');
  for (let k = 0; k < 8; k++) { const d = mk('#B', 'spark'); d.style.left = '1010px'; d.style.top = '740px'; hide(d); const t0 = wt('s2', 3) + k * 0.09;
    tw(d, t0, 0.5, { x: [0, (hash(k) - 0.7) * 260], y: [0, -120 - 160 * hash(k + 4)], o: [1, 0], s: [0.5, 1.1], r: [0, 180] }, 'out'); }
  sfx('tick', wt('s2', 3), 0.7); sfx('tick', wt('s2', 4), 0.7);
  // plate slides to the viewer
  hide('.b-pl'); popIn('.b-pl', wt('s2', 4) + 0.05, 0.35, 0.5); sfx('pop', wt('s2', 4) + 0.05);
  tw('.b-pl', wt('s2', 5), 0.5, { x: [0, -470] }, 'out'); sfx('whoosh', wt('s2', 5), 0.5);
  hide('.b-l2'); slideIn('.b-l2', wt('s2', 5), 'right', 0.6, 220);
  tw('#B .mouth', wt('s2', 5) + 0.3, 0.25, { sy: [1, 1.3] }, 'back'); tw('#B .brL', wt('s2', 5) + 0.3, 0.2, { y: [0, -12] }, 'back');

  // ---------- C one cook for 70% of sites ----------
  tWhip('#B', '#C', tC);
  const cn = $('.c-n'), n0 = wt('s3', 1), n1 = we('s3', 2);
  custom(t => { const p = Math.max(0, Math.min(1, (t - n0) / (n1 - n0))); cn.textContent = Math.round(70 * (1 - Math.pow(1 - p, 2.2))) + '%'; });
  punch('.c-n', n1, 0.1); sfx('thud', n1);
  sites.forEach((s, k) => { tw(s, tC - 0.1 + k * 0.05, 0.4, { y: [80, 0], o: [0, 1] }, 'out'); });
  const lit = [0, 1, 2, 4, 5, 7, 8];
  sites.forEach((s, k) => { const h = $('.stHat', s); if (lit.includes(k)) { const t0 = n0 + 0.1 + lit.indexOf(k) * ((n1 - n0) / 7); tw(h, 0, 0.001, { o: [0, 0] }); tw(h, t0, 0.3, { o: [0, 1], s: [0.3, 1], y: [-40, 0] }, 'back'); sfx('tick', t0, 0.6); } else tw(h, 0, 0.001, { o: [0, 0] }); });
  hide('.c-src'); slideIn('.c-src', wt('s3', 3), 'left', 0.7, 300); sfx('whoosh', wt('s3', 3), 0.4);
  // cook appears on "программа PHP"
  hide('.c-ck'); popIn('.c-ck', wt('s4', 0) - 0.05, 0.4, 0.4); sfx('pop', wt('s4', 0));
  punch('.c-ck', wt('s4', 1), 0.1); tw('.c-ck .ckHat', wt('s4', 1), 0.3, { y: [0, -20] }, 'back'); tw('.c-ck .ckHat', wt('s4', 1) + 0.35, 0.3, { y: [-20, 0] }, 'out');
  sites.forEach((s, k) => { if (lit.includes(k)) punch($('.stHat', s), wt('s4', 1) + 0.03 * lit.indexOf(k), 0.25); });
  hide('.c-m'); popIn('.c-m', wt('s3', 3), 0.4, 0.5);
  tw('#C .armR', wt('s3', 4), 0.3, { r: [0, -50] }, 'back'); tw('#C .pup', wt('s3', 4), 0.3, { x: [0, 8] }, 'out');
  // hole on "нашли дыру"
  const th = wt('s5', 3);
  hide('.c-hole'); tw('.c-hole', th - 0.02, 0.18, { s: [2.5, 1], o: [0, 1], r: [-30, 0] }, 'in'); shake(th + 0.15, 0.3, 18); sfx('slam', th + 0.12, 1);
  hide('.c-st'); stamp('.c-st', wt('s5', 4), 8, 12);
  sites.forEach((s, k) => { if (lit.includes(k)) tw($('i', s), th + 0.1 + 0.04 * lit.indexOf(k), 0.25, { o: [0, 1] }, 'out'); });
  tw('.c-ck .ckMouth', th + 0.1, 0.2, { sy: [1, -1] }); tw('.c-ck .ckEye', th + 0.1, 0.2, { y: [0, 8] });
  tw('#C .armR', wt('s5', 3), 0.3, { r: [-50, -130] }, 'back'); tw('#C .mouth', th, 0.2, { sy: [1, -1] }); tw('#C .brL', th, 0.2, { y: [0, -14] }, 'back'); tw('#C .brR', th, 0.2, { y: [0, -14] }, 'back');
  tw('.c-n', th + 0.1, 0.3, { s: [1, 0.9] }, 'out'); custom(t => { cn.style.color = t > th + 0.1 ? '#ff3b5c' : ''; });

  // ---------- D huge order knocks the cook down, dirty table ----------
  tDrop('#C', '#D', tD);
  hide('.d-chip'); slideIn('.d-chip', wt('s6', 1), 'left', 0.65, 260); sfx('whoosh', wt('s6', 1), 0.4);
  const dt0 = wt('s6', 2) - 0.05, dLand = wt('s7', 1);
  tw('.d-tk', 0, 0.001, { sy: [0.05, 0.05], o: [0, 0] }); tw('.d-tk', dt0, 0.05, { o: [0, 1] }, 'lin');
  tw('.d-tk', dt0, we('s6', 4) - dt0, { sy: [0.05, 1] }, 'out'); sfx('riser', dt0, 0.7);
  for (let k = 0; k < 6; k++) sfx('tick', dt0 + k * 0.28, 0.5);
  tw('.d-ck .ckEye', wt('s6', 3), 0.3, { y: [0, -9] }, 'out'); tw('.d-ck .ckMouth', wt('s6', 3), 0.2, { sy: [1, -1] });
  tw('.d-ck .ckArmL', wt('s6', 3), 0.3, { r: [0, 70] }, 'back'); tw('.d-ck .ckArmR', wt('s6', 3), 0.3, { r: [0, -70] }, 'back');
  idle('.d-ck', t => t > wt('s6', 3) && t < dLand - 0.2 ? { x: 5 * Math.sin(t * 50) } : {});
  // the cook falls over
  tw('.d-tk', dLand - 0.2, 0.25, { y: [0, 330] }, 'in');
  tw('.d-ck', dLand, 0.45, { r: [0, 62], x: [0, 170], y: [0, 120] }, 'in'); shake(dLand + 0.42, 0.4, 30); sfx('slam', dLand + 0.4, 1.1);
  tw('.d-tk', dLand + 0.05, 0.45, { r: [0, -38], x: [0, 230], y: [330, 420] }, 'in');
  for (let k = 0; k < 10; k++) { const d = mk('#D', 'crumb'); d.style.left = 520 + hash(k + 30) * 260 + 'px'; d.style.top = '940px'; hide(d); const t0 = dLand + 0.42;
    tw(d, t0, 0.7, { x: [0, (hash(k) - 0.5) * 600], y: [0, -200 * hash(k + 3) - 60], o: [1, 0], r: [0, 360 * hash(k + 9)] }, 'out'); }
  dSt.forEach((s, k) => { hide(s); const t0 = [wt('s7', 4), wt('s7', 5), wt('s7', 6), wt('s7', 6) + 0.3][k]; popIn(s, t0, 0.35, 0.2); sfx('pop', t0, 0.6); });
  hide('.d-pan'); slideIn('.d-pan', wt('s7', 3), 'right', 0.7, 300);
  tw('#D .armL', dLand + 0.3, 0.3, { r: [0, 140] }, 'back'); tw('#D .armR', dLand + 0.3, 0.3, { r: [0, -140] }, 'back');
  tw('#D .mouth', dLand + 0.3, 0.2, { sy: [1, -1] }); tw('#D .brL', dLand + 0.3, 0.2, { y: [0, -16] }, 'back'); tw('#D .brR', dLand + 0.3, 0.2, { y: [0, -16] }, 'back');
  tw('#D .pup', wt('s6', 2), 0.3, { x: [0, 8], y: [0, -6] }, 'out'); tw('#D .pup', dLand + 0.3, 0.3, { y: [-6, 7] }, 'out');

  // ---------- E dirty table: hacker sneaks commands in, peeks at passwords ----------
  tCircle('#D', '#E', tE, 500, 900);
  hide('.e-chip'); slideIn('.e-chip', wt('s8', 0), 'up', 0.65, 160);
  tw('.e-pl', wt('s8', 1), 0.6, { x: [-900, 0] }, 'out'); sfx('whoosh', wt('s8', 1), 0.5);
  punch('.e-stains', wt('s8', 4), 0.06); sfx('buzz', wt('s8', 4), 0.4);
  tw('#E .pup', wt('s8', 4), 0.3, { y: [0, 8], x: [0, 6] }, 'out'); tw('#E .mouth', wt('s8', 4), 0.2, { sy: [1, -1] });
  hide('.e-hk'); slideIn('.e-hk', wt('s9', 1) - 0.1, 'right', 0.6, 400); sfx('glitch', wt('s9', 1));
  idle('.e-hk .hkEye', t => ({ x: t > wt('s10', 1) ? -10 : 0 }));
  // glove slides the "commands" note onto the plate
  hide('.e-gl'); hide('.e-note');
  tw('.e-gl', wt('s9', 2), 0.5, { x: [500, 0], o: [0, 1] }, 'out'); tw('.e-note', wt('s9', 2), 0.5, { x: [440, 0], o: [0, 1] }, 'out'); sfx('whoosh', wt('s9', 2), 0.6);
  punch('.e-note', wt('s9', 5), 0.12); sfx('zap', wt('s9', 5), 0.6);
  tw('.e-gl', wt('s9', 5) + 0.2, 0.4, { x: [0, 120] }, 'out');
  tw('#E .e-m', wt('s9', 1), 0.22, { y: [0, -90] }, 'out'); tw('#E .e-m', wt('s9', 1) + 0.22, 0.28, { y: [-90, 0] }, 'in'); sfx('thud', wt('s9', 1) + 0.5, 0.5);
  tw('#E .armL', wt('s9', 1), 0.3, { r: [0, 130] }, 'back'); tw('#E .armR', wt('s9', 1), 0.3, { r: [0, -130] }, 'back');
  tw('#E .brL', wt('s9', 1), 0.2, { y: [0, -16] }, 'back'); tw('#E .brR', wt('s9', 1), 0.2, { y: [0, -16] }, 'back');
  // passwords rise from the dirty table, the glove grabs them
  hide('.e-pw'); tw('.e-pw', wt('s10', 1), 0.45, { y: [160, 0], o: [0, 1] }, 'out'); sfx('blip', wt('s10', 1));
  tw('.e-gl', wt('s10', 2), 0.35, { x: [120, -40], y: [0, -110] }, 'out');
  tw(['.e-pw', '.e-gl'].map(s => $(s)), wt('s10', 3) + 0.15, 0.4, { x: [0, 700] }, 'in'); sfx('whoosh', wt('s10', 3) + 0.15, 0.6);
  tw('#E .pup', wt('s10', 3), 0.3, { x: [6, 9], y: [8, 0] }, 'out');

  // ---------- F joke: someone else's keys in your soup ----------
  tZoom('#E', '#F', tF);
  $$('#F .stm').forEach((p, i) => { tw(p, tF + 0.1 + i * 0.15, 0.7, { dash: [100, 0] }, 'out'); idle(p, t => ({ x: 6 * Math.sin(t * 6 + i) })); });
  tw('#F .pup', tF, 0.001, { y: [8, 8] }); tw('#F .f-m', wt('j1', 2), 0.4, { y: [0, 60], r: [0, 6] }, 'out');
  tw('#F .armR', wt('j1', 4), 0.3, { r: [0, -40] }, 'back');
  hide('.f-key'); const kt = wt('j1b', 0) - 0.05;
  tw('.f-key', kt, 0.05, { o: [0, 1] }, 'lin'); tw('.f-key', kt, 0.55, { y: [200, -40], r: [-20, 8] }, 'back'); sfx('riser2', kt - 0.3, 0.5); sfx('coin', kt + 0.25, 1.2);
  for (let k = 0; k < 10; k++) { const d = mk('#F', 'drop'); d.style.left = 520 + hash(k + 50) * 100 + 'px'; d.style.top = '820px'; hide(d);
    tw(d, kt + 0.05, 0.7, { x: [0, (hash(k) - 0.5) * 520], y: [0, -120 - 180 * hash(k + 6)], o: [1, 0], s: [0.6, 1.1] }, 'out'); }
  tw('.f-m', kt + 0.15, 0.3, { y: [60, -40], r: [6, -8] }, 'back'); tw('#F .mouth', kt + 0.15, 0.2, { sy: [1, -1] });
  tw('#F .brL', kt + 0.15, 0.2, { y: [0, -18] }, 'back'); tw('#F .brR', kt + 0.15, 0.2, { y: [0, -18] }, 'back');
  tw('#F .armL', kt + 0.15, 0.3, { r: [0, 120] }, 'back'); tw('#F .armR', kt + 0.15, 0.3, { r: [-40, -120] }, 'back'); tw('#F .pup', kt + 0.15, 0.3, { y: [8, 2] }, 'out');
  hide('.f-q'); hide('.f-q2'); popIn('.f-q', wt('j1b', 2), 0.4, 0.2); popIn('.f-q2', wt('j1b', 3), 0.4, 0.2); sfx('pop', wt('j1b', 2)); sfx('pop', wt('j1b', 3));
  idle('.f-key', t => t > kt + 0.6 ? { r: 6 * Math.sin(t * 5), y: 6 * Math.sin(t * 3) } : {});

  // ---------- G 10+ years, found with AI + people, patched on 21 Oct ----------
  tSlideUp('#F', '#G', tG);
  $$('.webL').forEach((p, i) => tw(p, tG + 0.1 + i * 0.07, 0.5, { dash: [100, 0] }, 'out'));
  const pages = []; for (let k = 0; k < 8; k++) { const p = mk('.g-pages', 'g-page'); pages.push(p); }
  pages.forEach((p, k) => { const t0 = wt('s11', 1) + k * 0.16; tw(p, t0, 0.45, { y: [0, -260 - 80 * hash(k)], x: [0, (hash(k + 2) - 0.3) * 300], r: [0, 60 + 80 * hash(k + 5)], o: [1, 0] }, 'out'); sfx('tick', t0, 0.5); });
  hide('.g-n'); slideIn('.g-n', wt('s11', 2) - 0.05, 'left', 0.6, 300); punch('.g-n', wt('s11', 3), 0.1); sfx('thud', wt('s11', 3));
  tw('#G .g-m .armR', wt('s11', 1), 0.001, { r: [0, 0] });
  for (let t0 = wt('s11', 1), k = 0; t0 < we('s11', 3); t0 += 0.22, k++) tw('#G .g-m .armR', t0, 0.22, { r: k % 2 ? [-70, -20] : [-20, -70] }, 'sine');
  tw('#G .g-m .mouth', wt('s11', 0), 0.2, { sy: [1, -0.6] });
  for (let k = 0; k < 8; k++) { const d = mk('#G', 'cf'); d.style.background = '#8fa698'; d.style.left = 760 + hash(k + 70) * 160 + 'px'; d.style.top = '840px'; hide(d);
    tw(d, wt('s11', 1) + k * 0.12, 0.8, { x: [0, (hash(k) - 0.5) * 200], y: [0, -120 - 60 * hash(k + 1)], o: [0.9, 0], s: [0.6, 1.4] }, 'out'); }
  // found: AI chip + person (mascot) with magnifier
  slideOut('.g-n', wt('s12', 1), 'left', 0.35, 300);
  hide('.g-chip'); hide('.g-plus'); hide('.g-hum'); popIn('.g-chip', wt('s12', 2), 0.4, 0.3); sfx('blip', wt('s12', 2));
  popIn('.g-plus', wt('s12', 3), 0.3, 0.3); popIn('.g-hum', wt('s12', 5), 0.4, 0.3); sfx('pop', wt('s12', 5));
  idle('.g-hum', t => t > wt('s12', 5) + 0.3 ? { y: 6 * Math.sin(t * 7) } : {});
  hide('.g-mag'); tw('.g-mag', wt('s12', 0), 0.4, { o: [0, 1], x: [400, 0], y: [300, 0] }, 'out');
  idle('.g-mag', t => t > wt('s12', 0) + 0.4 && t < wt('s13', 3) ? { x: 26 * Math.sin(t * 6), y: 14 * Math.cos(t * 4.5) } : {});
  $$('.webL').forEach((p, i) => tw(p, wt('s12', 3) + i * 0.05, 0.3, { o: [1, 0] }, 'in'));
  tw('#G .g-m .pup', wt('s12', 0), 0.3, { x: [0, -8], y: [0, -6] }, 'out');
  // date panel and the patch
  hide('.g-date'); slideIn('.g-date', wt('s13', 1), 'right', 0.7, 360); sfx('whoosh', wt('s13', 1), 0.5);
  tw('.g-mag', wt('s13', 3), 0.3, { o: [1, 0], x: [0, 300] }, 'in');
  const pt = wt('s13', 4);
  hide('.g-pt'); tw('.g-pt', pt - 0.05, 0.2, { s: [2.6, 1], o: [0, 1], r: [-30, -8] }, 'in'); shake(pt + 0.15, 0.3, 20); sfx('slam', pt + 0.12, 1);
  for (let k = 0; k < 10; k++) { const d = mk('#G', 'spark'); d.style.left = '373px'; d.style.top = '560px'; hide(d); const a = hash(k + 80) * 6.28;
    tw(d, pt + 0.15, 0.7, { x: [0, Math.cos(a) * 300], y: [0, Math.sin(a) * 220], o: [1, 0], s: [0.5, 1.2], r: [0, 200] }, 'out'); }
  { const tj = pt + 0.15; tw('.g-m', tj, 0.22, { y: [0, -110] }, 'out'); tw('.g-m', tj + 0.22, 0.28, { y: [-110, 0] }, 'in'); sfx('thud', tj + 0.5, 0.5);
    tw('#G .g-m .armL', tj, 0.3, { r: [0, 130] }, 'back'); tw('#G .g-m .armR', tj, 0.3, { r: [-20, -130] }, 'back'); tw('#G .g-m .mouth', tj, 0.2, { sy: [-0.6, 1.3] }, 'back');
    tw('#G .g-m .legL', tj, 0.2, { r: [0, 25] }, 'out'); tw('#G .g-m .legR', tj, 0.2, { r: [0, -25] }, 'out'); tw('#G .g-m .legL', tj + 0.3, 0.25, { r: [25, 0] }); tw('#G .g-m .legR', tj + 0.3, 0.25, { r: [-25, 0] }); }

  // ---------- H joke: the cook finally washes the table ----------
  tCircle('#G', '#H', tH, 540, 800);
  tw('.h-ck .ckEye', tH, 0.001, { y: [8, 8] }); tw('.h-ck .ckArmR', tH, 0.001, { r: [40, 40] });
  hide('.h-sp'); popIn('.h-sp', wt('j2', 1), 0.3, 0.4); sfx('pop', wt('j2', 1));
  const w0 = wt('j2', 2), w1 = L('j2').t1 + 0.35;
  for (let t0 = w0, k = 0; t0 < w1; t0 += 0.2, k++) tw('.h-sp', t0, 0.2, { x: k % 2 ? [-460, 0] : [0, -460] }, 'sine');
  tw('.h-sp', w1, 0.3, { x: [(Math.floor((w1 - w0) / 0.2) % 2) ? -460 : 0, -200] }, 'out');
  for (let t0 = w0; t0 < w1; t0 += 0.2) sfx('tick', t0, 0.4);
  hSt.forEach((s, k) => tw(s, w0 + 0.12 + k * 0.17, 0.3, { o: [1, 0], s: [1, 0.6] }, 'in'));
  for (let k = 0; k < 12; k++) { const d = mk('#H', 'bub'); d.style.left = 140 + hash(k + 90) * 760 + 'px'; d.style.top = '860px'; hide(d); const t0 = w0 + k * 0.1;
    tw(d, t0, 0.8, { y: [0, -160 - 200 * hash(k + 2)], x: [0, (hash(k + 7) - 0.5) * 80], o: [1, 0], s: [0.4, 1.2] }, 'out'); }
  for (let k = 0; k < 5; k++) { const d = mk('#H', 'spark'); d.style.left = 160 + k * 170 + 'px'; d.style.top = '840px'; hide(d); const t0 = w0 + 0.4 + k * 0.15; popIn(d, t0, 0.3, 0.2); tw(d, t0 + 0.4, 0.3, { o: [1, 0] }, 'in'); }
  sfx('ding', we('j2', 3), 0.8);
  tw('.h-ck .ckMouth', w0, 0.2, { sy: [1, 1.3] }, 'back');
  tw('#H .armR', wt('j2', 0), 0.3, { r: [0, -60] }, 'back'); tw('#H .pup', wt('j2', 0), 0.3, { x: [0, -8], y: [0, 6] }, 'out');
  tw('#H .h-m', we('j2', 3), 0.22, { y: [0, -80] }, 'out'); tw('#H .h-m', we('j2', 3) + 0.22, 0.28, { y: [-80, 0] }, 'in');
  tw('#H .armL', we('j2', 3), 0.3, { r: [0, 120] }, 'back');

  // ---------- I moral: update PHP today ----------
  tZoom('#H', '#I', tI);
  hide('.i-chip'); slideIn('.i-chip', wt('t1', 0), 'up', 0.65, 160);
  tw('.i-card', tI, 0.6, { x: [-1000, 0] }, 'out5');
  punch('.i-card em', wt('t1', 3), 0.08); sfx('blip', wt('t1', 3));
  const pr = wt('t1', 5);
  tw('#I .armR', wt('t1', 4), 0.3, { r: [0, -140] }, 'back'); tw('.i-m', pr, 0.12, { y: [0, -30] }, 'out'); tw('.i-m', pr + 0.12, 0.25, { y: [-30, 0] }, 'out');
  punch('.i-btn', pr + 0.05, -0.1, 0.3); sfx('clink', pr + 0.05);
  tw('.i-bar .fl', 0, 0.001, { sx: [0.04, 0.04] }); tw('.i-bar .fl', pr + 0.1, 0.65, { sx: [0.04, 1] }, 'out');
  for (let k = 0; k < 5; k++) sfx('tick', pr + 0.1 + k * 0.12, 0.5);
  hide('.i-ok'); popIn('.i-ok', pr + 0.75, 0.4, 0.2); sfx('ding', pr + 0.75);
  tw('#I .mouth', pr + 0.75, 0.2, { sy: [1, 1.3] }, 'back'); tw('#I .armL', pr + 0.75, 0.3, { r: [0, 120] }, 'back');
  tw('#I .pup', wt('t1', 4), 0.3, { y: [0, -8] }, 'out');
  // "а то вдруг опять…" -> the hole comes back: loop to frame 0
  tw('#I .brL', wt('out', 2), 0.2, { y: [0, -14] }, 'back'); tw('#I .mouth', wt('out', 2), 0.2, { sy: [1.3, -1] });
  tw(['.i-chip', '.i-card', '.i-bar', '.i-ok', '.i-m'].map(s => $(s)), tLoop - 0.05, 0.3, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop);
}, { noCaption: ['hook'] });
