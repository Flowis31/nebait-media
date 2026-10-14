boot(() => {
  $$('.m, .d-m').forEach((el, i) => el.innerHTML = mascotSVG(i));
  mascotLife();
  $('.e-sun').innerHTML = sunSVG(); $('.h-sun').innerHTML = sunSVG(); $('.f-stm').innerHTML = steamSVG();
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('s1'), tC = cut('s3'), tD = cut('j1'), tE = cut('s4'), tF = cut('j2'), tG = L('v1').t0 - 0.14, tH = cut('t1'), tLoop = L('out').t0 + 0.15;
  sceneCuts(['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H'], [0, tB, tC, tD, tE, tF, tG, tH]);
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; $(par).appendChild(d); return d; };
  const blink = sel => $$(sel + ' .pup').forEach((p, i) => idle(p, t => ({ x: 5 * Math.sin(W2 * 9 * t + i), y: 3 * Math.sin(W2 * 13 * t) })));
  blink('#A'); blink('#B'); blink('#C'); blink('#D'); blink('#E'); blink('#F'); blink('#G'); blink('#A2');
  $$('.m').forEach((m, i) => idle(m, t => ({ y: 10 * Math.sin(W2 * 14 * t + i), r: 3 * Math.sin(W2 * 7 * t + i) })));
  // A hook
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  tw('#A .armR', 0, 0.001, { r: [-70, -70] }); tw('#A2 .armR', 0, 0.001, { r: [-70, -70] });
  punch('#A .a-t', wt('hook', 2)); sfx('blip', wt('hook', 2));
  tw('#A .a-bat', wt('hook', 3), 0.08, { r: [0, -8] }); tw('#A .a-bat', wt('hook', 3) + 0.08, 0.35, { r: [-8, 0] }, 'elastic'); sfx('zap', wt('hook', 3), 0.7);
  tw('#A .brR', wt('hook', 3), 0.2, { y: [0, -14], r: [0, -10] }, 'back');
  hide('#A .a-pill'); hide('#A2 .a-pill'); slideIn('#A .a-pill', wt('h2', 0) - 0.06, 'down', 0.65, 240); sfx('pop', wt('h2', 0)); punch('#A .a-pill', wt('h2', 3));
  tw('#A .armR', wt('h2', 0), 0.25, { r: [-70, -20] }, 'back'); tw('#A .armL', wt('h2', 2), 0.25, { r: [0, 50] }, 'back');
  // B charge to full
  tSlideUp('#A', '#B', tB);
  slideIn('#B .lab', tB + 0.1, 'up', 0.6, 140);
  const bf = $('.b-bat .fill'), bp = $('.b-bat .pct'), b0 = L('s1').t0, b1 = L('s1').t1;
  custom(t => { const k = Math.max(0, Math.min(1, (t - b0) / (b1 - b0))); bf.style.transform = `scaleY(${k})`; bp.textContent = Math.round(100 * k) + '%'; bf.style.background = t > b1 ? 'linear-gradient(#ff9a5c,#ff3b5c)' : 'linear-gradient(#e2ff8a,#74c81c)'; bp.style.color = k < 0.45 ? '#f4ecd9' : '#0a130d'; });
  for (let k = 0; k < 7; k++) { const d = mk('#B', 'bolt', boltSVG()); d.style.left = 60 + hash(k) * 420 + 'px'; d.style.top = '1000px'; const t0 = b0 + (b1 - b0) * k / 7;
    tw(d, t0, 0.4, { y: [0, -260 - 200 * hash(k + 9)], o: [0, 1], s: [0.5, 1.1], r: [0, 30 * hash(k + 3) - 15] }, 'out'); tw(d, t0 + 0.4, 0.2, { o: [1, 0] }); sfx('tick', t0, 0.8); }
  for (let th = b0; th < b1; th += 0.24) { tw('#B .armL', th, 0.12, { r: [0, 60] }, 'out'); tw('#B .armL', th + 0.12, 0.12, { r: [60, 0] }, 'in'); }
  punch('.b-bat', b1, 0.08); sfx('buzz', b1, 0.6); shake(b1, 0.2, 10); tw('#B .mouth', b1, 0.2, { sy: [1, -1] });
  const bn = $('.b-n'), n0 = wt('s2', 1), n1 = we('s2', 2);
  hide('.b-pan'); slideIn('.b-pan', n0 - 0.22, 'right', 0.75, 420); hide('.b-n'); hide('.b-s'); hide('.b-r');
  slideIn('.b-n', n0 - 0.12, 'right', 0.7, 300); slideIn('.b-s', n0 + 0.02, 'right', 0.7, 300); slideIn('.b-r', wt('s2', 3), 'right', 0.7, 260); sfx('whoosh', n0 - 0.22, 0.6);
  custom(t => { const p = Math.max(0, Math.min(1, (t - n0) / (n1 - n0))); bn.textContent = Math.round(500 * (1 - Math.pow(1 - p, 2.2))); });
  punch('.b-n', n1, 0.12); sfx('thud', n1);
  // C bar race
  tWhip('#B', '#C', tC);
  slideIn('#C .lab', tC + 0.12, 'up', 0.6, 140);
  tw('.b1', tC, 0.5, { sy: [0, 1] }, 'out5'); tw('.bn1', tC + 0.3, 0.3, { o: [0, 1] }); hide('.bn2'); hide('.c-src');
  const g0 = wt('s3', 2), g1 = we('s3', 4);
  tw('.b2', g0, g1 - g0, { sy: [0.02, 1] }, 'out'); tw('.c-m', g0, g1 - g0, { y: [-10, -560] }, 'out');
  tw('#C .armL', g0, 0.3, { r: [0, 110] }, 'back'); tw('#C .armR', g0, 0.3, { r: [0, -110] }, 'back');
  popIn('.bn2', wt('s3', 4)); sfx('riser', g0, 0.7); sfx('ding', g1); punch('.bn2', g1);
  slideIn('.c-src', g1, 'down', 0.65, 160);
  for (let k = 0; k < 10; k++) { const d = mk('#C', 'cf'); d.style.left = '760px'; d.style.top = '700px'; d.style.background = ['#b8ff3d', '#f4ecd9', '#ffe14d'][k % 3]; const a = hash(k) * 6.28; hide(d);
    tw(d, g1, 0.6, { x: [0, Math.cos(a) * 260], y: [0, Math.sin(a) * 260 - 80], o: [1, 0], r: [0, 300] }, 'out'); }
  // D gym joke
  tDrop('#C', '#D', tD);
  tw('#D .armL', tD, 0.001, { r: [130, 130] }); tw('#D .armR', tD, 0.001, { r: [-130, -130] });
  punch('.d-t', wt('j1', 2));
  const dj = L('j1b').t0, df = wt('j1b', 3);
  idle('.d-bb', t => t < df ? { x: 7 * Math.sin(t * 45), r: 1.5 * Math.sin(t * 38) } : {});
  idle('.d-m', t => t < df ? { x: 5 * Math.sin(t * 45 + 1) } : {});
  for (let k = 0; k < 8; k++) { const d = mk('#D', 'drop'); d.style.left = 380 + hash(k + 20) * 320 + 'px'; d.style.top = '800px'; const t0 = tD + 0.3 + k * 0.22;
    tw(d, t0, 0.5, { x: [0, (hash(k) - .5) * 400], y: [0, -120 + 300 * hash(k + 5)], o: [1, 0], s: [0.6, 1.2] }, 'out'); }
  tw('.d-pl', dj, 0.3, { s: [1, 1.25] }, 'back'); sfx('riser2', dj, 0.6);
  tw('.d-bb', df, 0.22, { y: [0, 330] }, 'in'); tw('.d-m', df + 0.18, 0.12, { sy: [1, 0.55], y: [0, 90] }, 'out'); shake(df + 0.2, 0.35, 26); sfx('slam', df + 0.18, 1.1);
  tw('#D .armL', df + 0.18, 0.12, { r: [130, 20] }); tw('#D .armR', df + 0.18, 0.12, { r: [-130, -20] }); tw('#D .mouth', df + 0.18, 0.1, { sy: [1, -1] });
  hide('.d-st'); stamp('.d-st', wt('j1b', 4) + 0.1, -7, 14);
  // E heat
  tCircle('#D', '#E', tE, 830, 340);
  idle('.e-sun', t => ({ r: 40 * t, s: 1 + 0.05 * Math.sin(t * 9) }));
  hide('.e-s'); slideIn('.e-s', wt('s4', 2) - 0.04, 'left', 0.7, 300); sfx('whoosh', wt('s4', 2) - 0.04, 0.5); hide('.e-t'); stamp('.e-t', wt('s4', 5), 0, 20);
  const ef = $('.e-bat .fill'), ep = $('.e-bat .pct'), c0 = wt('s5', 0), c1 = we('s5', 6);
  custom(t => { const k = Math.max(0, Math.min(1, (t - c0) / (c1 - c0))), v = 100 - 35 * k; ef.style.transform = `scaleY(${v / 100})`; ef.style.background = k > 0.4 ? 'linear-gradient(#ff9a5c,#ff3b5c)' : 'linear-gradient(#e2ff8a,#74c81c)'; ep.textContent = Math.round(v) + '%'; });
  for (let k = 0; k < 6; k++) sfx('tick', c0 + (c1 - c0) * k / 6, 0.7);
  hide('.e-yr'); slideIn('.e-yr', c0, 'right', 0.65, 220); punch('.e-bat', c1, 0.08); sfx('buzz', c1, 0.6);
  for (let k = 0; k < 9; k++) { const d = mk('#E', 'drop'); d.style.left = 180 + hash(k + 40) * 200 + 'px'; d.style.top = '820px'; const t0 = wt('s4', 5) + k * 0.4;
    tw(d, t0, 0.6, { x: [0, (hash(k) - .5) * 300], y: [0, 200 * hash(k + 5) - 60], o: [1, 0], s: [0.6, 1.2] }, 'out'); }
  for (let th = wt('s4', 5); th < c1; th += 0.3) { tw('#E .armR', th, 0.15, { r: [-90, -130] }); tw('#E .armR', th + 0.15, 0.15, { r: [-130, -90] }); }
  tw('#E .mouth', wt('s4', 5), 0.2, { sy: [1, -1] });
  // F pillow / oven joke
  tZoom('#E', '#F', tF);
  hide('.f-ph'); hide('.f-pil'); tw('.f-ph', L('j2').t0, 0.06, { o: [0, 1] }, 'lin'); tw('.f-pil', wt('j2', 3), 0.06, { o: [0, 1] }, 'lin');
  tw('.f-ph', L('j2').t0, 0.4, { y: [-500, 0] }, 'out5'); sfx('thud', L('j2').t0 + 0.35);
  tw('.f-pil', wt('j2', 3), 0.3, { y: [-700, 0] }, 'in'); tw('.f-pil', wt('j2', 3) + 0.3, 0.3, { sy: [0.75, 1] }, 'elastic'); sfx('thud', wt('j2', 3) + 0.3);
  $$('.stm').forEach((p, i) => { tw(p, we('j2', 4) + i * 0.15, 0.6, { dash: [100, 0] }, 'out'); idle(p, t => ({ x: 6 * Math.sin(t * 6 + i) })); });
  hide('.f-dial'); tw('.f-dial', wt('j3', 3), 0.3, { s: [0.2, 1], o: [0, 1], r: [-40, 0] }, 'back'); sfx('pop', wt('j3', 3));
  tw('.f-dial i', wt('j3', 4), 0.4, { r: [-120, 100] }, 'back'); sfx('clink', wt('j3', 4)); sfx('ding', wt('j3', 4) + 0.35); shake(wt('j3', 4) + 0.35, 0.25, 12);
  tw('#F .brL', wt('j3', 1), 0.2, { y: [0, -16] }, 'back');
  const fj = L('j2').t0, fp = wt('j2', 3) + 0.3, fs = we('j2', 4);
  tw('#F .pup', fj + 0.15, 0.4, { x: [0, 8], y: [0, 7] }, 'out'); tw('#F .brR', fj + 0.15, 0.3, { y: [0, -12], r: [0, -8] }, 'back');
  tw('#F .armL', fj + 0.2, 0.35, { r: [0, 70] }, 'back');                                    // points at the phone
  punch('.f-m', fp, -0.1, 0.4); tw('#F .mouth', fp, 0.2, { sy: [1, -1] }); tw('#F .armL', fp, 0.3, { r: [70, 0] }, 'out');
  tw('#F .armR', fs, 0.3, { r: [0, -60] }, 'out');                                           // fans himself while the steam rises
  for (let th = fs + 0.3, k = 0; th < tG - 0.3; th += 0.32, k++) tw('#F .armR', th, 0.32, { r: k % 2 ? [-105, -60] : [-60, -105] }, 'sine');
  for (let k = 0; k < 6; k++) { const d = mk('#F', 'drop'); d.style.left = 120 + hash(k + 70) * 140 + 'px'; d.style.top = '330px'; const t0 = wt('j3', 0) + k * 0.28; hide(d);
    tw(d, t0, 0.7, { x: [0, (hash(k + 3) - .5) * 160], y: [0, 120 + 80 * hash(k + 8)], o: [1, 0], s: [0.5, 1] }, 'out'); }
  tw('#F .mouth', wt('j3', 4), 0.2, { sy: [-1, 1.25] }, 'back');
  // G verdict
  tZoom('#F', '#G', tG);
  hide('.g-st'); stamp('.g-st', wt('v1', 1), -5, 30);
  { const tj = wt('v1', 1) + 0.15; tw('.g-m', tj, 0.24, { y: [0, -110] }, 'out'); tw('.g-m', tj + 0.24, 0.3, { y: [-110, 0] }, 'in'); tw('.g-m', tj + 0.5, 0.05, { sy: [1, 0.86] }, 'in'); tw('.g-m', tj + 0.55, 0.3, { sy: [0.86, 1] }, 'back');
    tw('#G .legL', tj, 0.2, { r: [0, 28] }, 'out'); tw('#G .legR', tj, 0.2, { r: [0, -28] }, 'out'); tw('#G .legL', tj + 0.3, 0.25, { r: [28, 0] }); tw('#G .legR', tj + 0.3, 0.25, { r: [-28, 0] }); sfx('thud', tj + 0.54, 0.6); }
  tw('#G .armL', wt('v1', 1) + 0.15, 0.25, { r: [0, 120] }, 'back'); tw('#G .armR', wt('v1', 1) + 0.15, 0.25, { r: [0, -120] }, 'back');
  for (let k = 0; k < 18; k++) { const d = mk('#G', 'cf'); d.style.background = ['#b8ff3d', '#f4ecd9', '#ffe14d', '#ff3b5c'][k % 4]; const a = hash(k + 60) * 6.28, r = 300 + 300 * hash(k); hide(d);
    tw(d, wt('v1', 1) + 0.15, 0.8, { x: [0, Math.cos(a) * r], y: [0, Math.sin(a) * r], o: [1, 0], r: [0, 400 * hash(k + 2)] }, 'out'); }
  // H tips
  tSlideUp('#G', '#H', tH);
  tw('.h1', tH, 0.4, { x: [-900, 0], o: [0, 1] }, 'out5'); hide('.h-bat'); popIn('.h-bat', wt('t1', 1)); 
  const sw = $('.sw'), on = wt('t2', 0);
  hide('.h-m'); popIn('.h-m', tH + 0.35, 0.45, 0.4); sfx('pop', tH + 0.35, 0.7);
  tw('#H .armR', on - 0.05, 0.3, { r: [0, -125] }, 'back'); tw('#H .pup', on - 0.1, 0.3, { x: [0, 7], y: [0, -5] }, 'out');
  for (let k = 0; k < 3; k++) tw('#H .h-m', wt('t2', 2) + k * 0.14, 0.14, { r: k % 2 ? [10, -10] : [-10, 10] }, 'sine');
  tw('#H .h-m', wt('t2', 2) + 0.42, 0.2, { r: [10, 0] }, 'out'); tw('#H .armR', wt('t2', 2), 0.25, { r: [-125, 0] }, 'out');
  tw('.sw i', on, 0.18, { x: [0, 100] }, 'back'); custom(t => { sw.style.background = t >= on + 0.08 ? '#74c81c' : '#b9b3a3'; }); sfx('clink', on); sfx('ding', on + 0.1);
  tw('.h-bat .hf', wt('t1', 1), on - wt('t1', 1) + 0.2, { sx: [0.1, 0.8] }, 'out'); punch('.h-bat', on + 0.1, 0.06);
  hide('.h2'); hide('.h-sun'); hide('.h-x'); tw('.h2', wt('t2', 1), 0.3, { o: [0, 1], x: [900, 0] }, 'out5'); popIn('.h-sun', wt('t2', 2)); stamp('.h-x', wt('t2', 3), -40, 12);
  tw(['.h1', '.h2', '.h-bat', '.h-sun', '.h-x', '.h-m'].map(s => $(s)), tLoop, 0.3, { o: [1, 0] }, 'in'); loopTo('#A2', tLoop + 0.1);
}, { noCaption: ['hook'] });
