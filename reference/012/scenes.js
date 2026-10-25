// 012 «QR-код с дыркой всё равно работает» — Как это работает. qrcode.com (DENSO WAVE), проверено 25.10.2026
boot(() => {
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
  const clamp = x => Math.max(0, Math.min(1, x));
  const place = (el, x, y) => { el.style.left = x + 'px'; el.style.top = y + 'px'; };
  const qrBox = (sel, id, hole) => { const el = $(sel); el.innerHTML = qrSVG(id, { hole }); if (hole) mk(el, 'cat', catSVG(id)); return el; };
  const chunk = (par, id, r0, c0, n) => {           // a piece of a full QR, cut out as its own div (same pixels as the card under it)
    const x = QO + c0 * QU, y = QO + r0 * QU, s = n * QU, p = mk(par, 'pc'); p.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${s}px;transform-origin:${s / 2}px ${s / 2}px`;
    const inner = mk(p, ''); inner.style.cssText = `left:${-x}px;top:${-y}px;width:600px;height:600px`; inner.innerHTML = qrSVG(id); return p; };
  const burst = (par, n, x, y, t, dist = 220, seed = 0) => {
    for (let k = 0; k < n; k++) { const s = mk(par, 'spark'); place(s, x - 18, y - 18); const a = 2 * Math.PI * (k / n + 0.13 * hash(k + seed)), d = dist * (0.6 + 0.4 * hash(k * 3 + seed));
      hide(s); tw(s, t, 0.06, { o: [0, 1] }, 'lin'); tw(s, t, 0.65, { x: [0, Math.cos(a) * d], y: [0, Math.sin(a) * d], r: [0, 180], s: [1.2, 0.3] }, 'out'); tw(s, t + 0.45, 0.25, { o: [1, 0] }, 'lin'); } };
  const ink = '#0a130d';
  const sv1 = (vb, body) => `<svg viewBox="${vb}" style="overflow:visible;left:0;top:0;width:100%;height:100%">${body}</svg>`;
  const phoneInit = (sel, t) => { hide(sel + ' .ok'); hide(sel + ' .bad'); hide(sel + ' .lnk'); };
  const scanIdle = (sel, t0, t1) => idle(sel + ' .scan', t => (t < t0 || t > t1) ? {} : { y: 120 * Math.sin((t - t0) * 7) });
  const phoneOK = (sel, t) => { tw(sel + ' .scan', t, 0.12, { o: [1, 0] }, 'lin'); popIn(sel + ' .ok', t, 0.35, 0.2); sfx('ding', t, 0.9); punch(sel, t, 0.07); };

  // ---------- build ----------
  const buildA = sc => {
    qrBox(sc + ' .a-qr', sc.slice(1) + 'q', true);
    $(sc + ' .a-ph').innerHTML = phoneSVG(sc.slice(1));
    const qs = $(sc + ' .a-qs'); [[600, 860, -14], [930, 820, 12], [770, 760, 0]].forEach(([x, y, r], k) => { const q = mk(qs, 'a-q qq', '?'); place(q, x, y); q.style.fontSize = (k === 2 ? 150 : 120) + 'px'; });
  };
  buildA('#A'); $('#A2').innerHTML = $('#A').innerHTML; ['.a-qr', '.a-ph'].forEach(c => $('#A2 ' + c).innerHTML = ''); $('#A2 .a-qs').innerHTML = ''; buildA('#A2');
  // B
  $('.b-lk').innerHTML = linkSVG(); qrBox('.b-qr', 'b', false); $('.b-ph').innerHTML = phoneSVG('b');
  $$('.b-qr rect.md').forEach(r => { r.style.transformBox = 'fill-box'; r.style.transformOrigin = 'center'; });
  const BM = []; for (let k = 0; k < 12; k++) { const m = mk('.b-mods', 'qm'); BM.push(m); }
  const bfl = mk('#B', ''); bfl.style.cssText = 'left:0;top:0;width:1080px;height:1920px;background:#fff'; $('#B').insertBefore(bfl, $('.b-m'));
  // C
  qrBox('.c-qr', 'c', true); $('.c-qr .cat').classList.add('c-cat');
  const chl = mk('.c-qr', 'hl'); chl.style.cssText = 'left:216px;top:216px;width:168px;height:168px'; $('.c-qr').insertBefore(chl, $('.c-qr .cat'));
  const cpc = chunk('.c-qr', 'cp', 7, 7, 7);
  $('.c-ph').innerHTML = phoneSVG('c');
  const HX = 240 + 216 - 10, HY = 300 + 216 - 10, HS = 188;
  const CUT = `M${HX} ${HY} L${HX + HS} ${HY} L${HX + HS} ${HY + HS} L${HX} ${HY + HS} Z`;
  $('.c-cut').innerHTML = sv1('0 0 1080 1300', `<path id="ccut" class="draw" d="${CUT}" fill="none" stroke="#ff3b5c" stroke-width="8" stroke-linecap="round" pathLength="100" style="stroke-dasharray:100;stroke-dashoffset:100"/>`);
  $('.c-sc').innerHTML = scissorsSVG();
  // D
  qrBox('.d-qr', 'd', true); $('.d-ph').innerHTML = phoneSVG('d'); $('.d-sp').innerHTML = spinSVG();
  const F3 = [[372, 452], [708, 452], [372, 788]];
  $('.d-ln').innerHTML = sv1('0 0 1080 1300', `<path class="draw" d="M${F3[1][0]} ${F3[1][1]} L${F3[0][0]} ${F3[0][1]} L${F3[2][0]} ${F3[2][1]}" fill="none" stroke="#b8ff3d" stroke-width="12" stroke-linecap="round" stroke-dasharray="100" pathLength="100" style="filter:drop-shadow(0 0 10px #b8ff3d)"/>`);
  // E
  $('.e-lk').innerHTML = linkSVG(); qrBox('.e-qr', 'e', false);
  const epc = chunk('.e-qr', 'ep', 15, 15, 6);
  const HP = [[150, 150], [400, 120], [130, 420], [300, 300], [470, 260], [250, 500], [440, 440], [520, 500]];
  const EH = HP.map((p, k) => { const h = mk('.e-fx', 'hint'); h.style.background = LPC[k % 4]; place(h, 240 + p[0] - 23, 470 + p[1] - 23); return h; });
  // F
  $('.f-bulb').innerHTML = bulbSVG(); $('.f-bub > div').innerHTML = catSVG('f');
  // G
  qrBox('.g-qr', 'g', false); $('.g-er').innerHTML = eraserSVG(); $('.g-ph').innerHTML = phoneSVG('g');
  const GC = []; for (let k = 0; k < 14; k++) { const c = mk('.g-fx', ''); c.style.cssText = `width:16px;height:16px;border-radius:4px;background:${k % 2 ? '#ff8fb0' : '#3b5244'}`; GC.push(c); }
  // H
  $('.h-rc').innerHTML = receiptSVG(); qrBox('.h-qr', 'h', false); $('.h-mug').innerHTML = mugSVG('h');
  $('.h-st1').innerHTML = stainSVG(0); $('.h-st2').innerHTML = stainSVG(2); $('.h-ph').innerHTML = phoneSVG('h');
  const HD = [0, 1, 2, 3].map(() => mk('.h-drs', 'h-dr'));
  // I
  qrBox('.i-qr', 'i', true);
  $('.i-x').innerHTML = sv1('0 0 1080 1300', `<path class="draw" d="M70 760 L790 690" fill="none" stroke="#f4ecd9" stroke-width="18" stroke-linecap="round" pathLength="100"/>`);
  // mascots
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  mascotLife();

  // ---------- cuts ----------
  const cut = k => L(k).t0 - 0.12;
  const tB = cut('s1'), tC = cut('j1'), tD = cut('s4'), tE = cut('s6'), tF = cut('s8'), tG = cut('s9'), tH = cut('j3'), tI = cut('s10'), tLoop = L('out').t1 - 0.62;
  sceneCuts(['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I'], [0, tB, tC, tD, tE, tF, tG, tH, tI]);
  $$('#B .m, #C .m, #E .m, #F .m, #G .m, #H .m, #I .m').forEach((m, i) => idle(m, t => ({ y: 7 * Math.sin(W2 * 16 * t + i), r: 1.6 * Math.sin(W2 * 8 * t + i) })));

  // ---------- A: hook. QR with a cat in the hole, the mascot scans it ----------
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  for (const sc of ['#A', '#A2']) {
    phoneInit(sc + ' .a-ph'); hide(sc + ' .a-ok'); hide(sc + ' .a-q');
    tw(sc + ' .a-ph', 0, 0.001, { r: [-8, -8] });
    tw(sc + ' .a-m .armR', 0, 0.001, { r: [-95, -95] }); tw(sc + ' .a-m .armL', 0, 0.001, { r: [20, 20] });
    tw(sc + ' .a-m .pup', 0, 0.001, { x: [-8, -8], y: [-6, -6] });
    idle(sc + ' .a-qr .qhl', t => ({ s: 1 + 0.03 * Math.sin(W2 * 40 * t) }));
  }
  scanIdle('#A .a-ph', 0, 1.75); scanIdle('#A2 .a-ph', 0, TOTAL + 1);
  idle('#A .a-m, #A .a-ph', t => ({ y: 6 * Math.sin(W2 * 16 * t) })); idle('#A2 .a-m, #A2 .a-ph', t => ({ y: 6 * Math.sin(W2 * 16 * t) }));
  punch('#A .a-t', wt('hook', 0), 0.06);
  punch('#A .a-t b', wt('hook', 2), 0.2); sfx('blip', wt('hook', 2), 0.7);
  punch('#A .a-qr .qhl', wt('hook', 2), 0.12);
  tw('#A .a-qr .cEye', wt('hook', 2) + 0.1, 0.12, { sy: [1, 0.1] }, 'in'); tw('#A .a-qr .cEye', wt('hook', 2) + 0.24, 0.2, { sy: [0.1, 1] }, 'out');
  tw('#A .a-m .pup', wt('hook', 3), 0.25, { x: [-8, 4], y: [-6, -10] }, 'out');
  phoneOK('#A .a-ph', wt('hook', 5)); stamp('#A .a-ok', wt('hook', 5) + 0.05, -4, 18);
  tw('#A .a-m', wt('hook', 5), 0.18, { y: [0, -60] }, 'out'); tw('#A .a-m', wt('hook', 5) + 0.18, 0.3, { y: [-60, 0] }, 'in');
  // h2 «Как так?»: shrug, question marks
  const tS = wt('h2', 0);
  tw('#A .a-m .armR', tS - 0.05, 0.3, { r: [-95, -45] }, 'back'); tw('#A .a-m .armL', tS - 0.05, 0.3, { r: [20, 60] }, 'back');
  tw('#A .a-m .brL', tS, 0.25, { y: [0, -14] }, 'back'); tw('#A .a-m .brR', tS, 0.25, { y: [0, -14] }, 'back');
  tw('#A .a-m .mouth', tS, 0.25, { sx: [1, 0.6], sy: [1, -0.7] }, 'back');
  $$('#A .a-q').forEach((q, k) => { const t = tS + k * 0.16; popIn(q, t, 0.35, 0.2); sfx('pop', t, 0.6); idle(q, tt => tt > t ? { y: 10 * Math.sin((tt - t) * 6 + k), r: 6 * Math.sin((tt - t) * 4 + k) } : {}); });
  tw('#A .a-ph', tS, 0.4, { r: [-8, 6] }, 'back');

  // ---------- B: a QR code is a link drawn with squares ----------
  tZoom('#A', '#B', tB);
  hide(bfl); hide('.b-k'); hide('.b-w'); hide('.b-k div'); hide('.b-w div'); hide('.b-ph'); phoneInit('.b-ph'); BM.forEach(m => hide(m));
  tw('.b-qr .fp', tB, 0.001, { s: [0, 0] });
  slideIn('.b-qr', tB + 0.08, 'down', 0.6, 300);
  slideIn('.b-lk', wt('s1', 1) - 0.1, 'up', 0.55, 200); sfx('whoosh', wt('s1', 1) - 0.1, 0.5);
  punch('.b-lk', wt('s1', 2), 0.1); sfx('blip', wt('s1', 2), 0.6);
  tw('.b-m .armR', wt('s1', 2) - 0.05, 0.3, { r: [0, -110] }, 'back'); tw('.b-m .pup', wt('s1', 2), 0.25, { x: [0, 8], y: [0, -8] }, 'out');
  $$('.b-qr .fp').forEach((f, k) => { const t = wt('s1', 0) + 0.1 + k * 0.14; tw(f, t, 0.3, { s: [0, 1] }, 'back'); sfx('pop', t, 0.5); });
  $$('.b-lk .lp').forEach((p, k) => { const t = wt('s1', 3) + 0.05 + k * 0.12; tw(p, t, 0.42, { y: [0, 330], s: [1, 0.25], o: [1, 0], r: [0, 40 - 25 * k] }, 'in'); });
  const tF0 = wt('s1', 4) - 0.1, BR = $$('.b-qr rect.md');
  custom(t => { if (t < tB - 0.5 || t > tC + 0.6) return; BR.forEach(r => { const u = clamp((t - tF0 - (+r.dataset.d) / 40 * 0.8) / 0.18);
    r.style.opacity = u > 0 ? 1 : 0; r.style.transform = `scale(${(u >= 1 ? 1 : 0.3 + 0.7 * E.back(u)).toFixed(3)})`; }); });
  for (let k = 0; k < 6; k++) sfx('tick', tF0 + k * 0.14, 0.5);
  tw('.b-m .pup', wt('s1', 4), 0.25, { x: [8, 4], y: [-8, -4] }, 'out'); tw('.b-m .armR', wt('s1', 4), 0.3, { r: [-110, -40] }, 'out');
  // s2: black = one, white = zero
  slideOut('.b-lk', wt('s2', 0) - 0.15, 'up', 0.35, 200);
  slideIn('.b-k', wt('s2', 0), 'left', 0.55, 300); sfx('whoosh', wt('s2', 0), 0.5);
  popIn('.b-k div', wt('s2', 2), 0.35, 0.3); sfx('blip', wt('s2', 2), 0.8);
  tw('.b-m .pup', wt('s2', 0), 0.25, { x: [4, 8], y: [-4, 6] }, 'out');
  slideIn('.b-w', wt('s2', 3), 'right', 0.55, 300); sfx('whoosh', wt('s2', 3), 0.5);
  popIn('.b-w div', wt('s2', 4), 0.35, 0.3); sfx('blip', wt('s2', 4), 0.8);
  tw('.b-m', wt('s2', 2), 0.16, { y: [0, -40] }, 'out'); tw('.b-m', wt('s2', 2) + 0.16, 0.26, { y: [-40, 0] }, 'in');
  tw('.b-m', wt('s2', 4), 0.16, { y: [0, -40] }, 'out'); tw('.b-m', wt('s2', 4) + 0.16, 0.26, { y: [-40, 0] }, 'in');
  // s3: phone takes a photo and assembles the link
  const tPh = wt('s3', 0) - 0.1;
  slideOut('.b-k', tPh, 'down', 0.35, 400); slideOut('.b-w', tPh + 0.05, 'down', 0.35, 400);
  tw('.b-qr', tPh, 0.5, { x: [0, -170], s: [1, 0.86] }, 'out');
  slideIn('.b-ph', tPh, 'right', 0.6, 400); sfx('whoosh', tPh, 0.6); scanIdle('.b-ph', tPh, wt('s3', 5));
  const tFl = wt('s3', 1) + 0.1; tw(bfl, tFl, 0.04, { o: [0, 0.75] }, 'lin'); tw(bfl, tFl + 0.05, 0.3, { o: [0.75, 0] }, 'lin'); sfx('zap', tFl, 0.6);
  tw('.b-m .armL', tFl - 0.1, 0.3, { r: [0, 100] }, 'back'); tw('.b-m .brL', tFl, 0.2, { y: [0, -10] }, 'out');
  const tAs = wt('s3', 4);
  BM.forEach((m, k) => { const sx = 150 + 470 * hash(k + 3), sy = 450 + 420 * hash(k + 11), t = tAs + k * 0.04; place(m, sx, sy);
    tw(m, t, 0.05, { o: [0, 1] }, 'lin'); tw(m, t, 0.45, { x: [0, 850 - sx], y: [0, 815 - sy], s: [1.4, 0.4], r: [0, 90] }, 'in'); tw(m, t + 0.42, 0.06, { o: [1, 0] }, 'lin'); });
  sfx('riser2', tAs - 0.1, 0.5);
  tw('.b-ph .scan', wt('s3', 5) - 0.05, 0.1, { o: [1, 0] }, 'lin'); tw('.b-ph .scrq', wt('s3', 5) - 0.05, 0.25, { s: [1, 0.6], y: [0, -40] }, 'out');
  popIn('.b-ph .lnk', wt('s3', 5), 0.4, 0.2); sfx('ding', wt('s3', 5), 0.8); punch('.b-ph', wt('s3', 5) + 0.05, 0.06);
  tw('.b-m .armL', wt('s3', 5), 0.3, { r: [100, 30] }, 'out');

  // ---------- C: joke — cut the middle out, put a cat in. Beep: it opens ----------
  tSlideUp('#B', '#C', tC);
  hide('.c-qr .cat'); hide('.c-sc'); hide('.c-ph'); phoneInit('.c-ph');
  tw('.c-m .pup', tC, 0.001, { x: [8, 8], y: [-8, -8] }); tw('.c-m .armR', tC, 0.001, { r: [-30, -30] });
  const cp = $('#ccut'), cpL = cp.getTotalLength(), cs0 = wt('j1', 2) - 0.05, cs1 = wt('j1', 4) - 0.02;
  tw('#ccut', cs0, cs1 - cs0, { dash: [100, 0] }, 'lin');
  tw('.c-sc', cs0 - 0.12, 0.12, { o: [0, 1] }, 'lin'); tw('.c-sc', cs1 + 0.05, 0.15, { o: [1, 0] }, 'lin');
  const sideR = [0, 90, 180, 270];
  custom(t => { const el = $('.c-sc'); if (t < cs0 - 0.15 || t > cs1 + 0.25) return; const u = clamp((t - cs0) / (cs1 - cs0)), q = cp.getPointAtLength(cpL * u);
    const r = sideR[Math.min(3, Math.floor(u * 4))]; el.style.transform = `translate(${(q.x - 117).toFixed(1)}px,${(q.y - 69).toFixed(1)}px) rotate(${r}deg)`; });
  for (let th = cs0; th < cs1; th += 0.16) { tw('.c-sc .bA', th, 0.08, { r: [-16, 0] }, 'in'); tw('.c-sc .bA', th + 0.08, 0.08, { r: [0, -16] }, 'lin'); tw('.c-sc .bB', th, 0.08, { r: [16, 0] }, 'in'); tw('.c-sc .bB', th + 0.08, 0.08, { r: [0, 16] }, 'lin'); sfx('tick', th + 0.08, 0.7); }
  tw('.c-m .armR', cs0, 0.3, { r: [-30, -120] }, 'back');
  idle('.c-m .pup', t => (t > cs0 && t < cs1) ? { x: -6 * Math.sin((t - cs0) * 9), y: 4 * Math.cos((t - cs0) * 9) } : {});
  // the piece falls out
  const tFall = wt('j1', 4) - 0.02;
  tw(cpc, tFall, 0.12, { y: [0, -20] }, 'out'); tw(cpc, tFall + 0.12, 0.6, { y: [-20, 1100], r: [0, 38] }, 'in'); sfx('whoosh', tFall + 0.1, 0.6);
  sfx('thud', tFall + 0.7, 0.6); tw(cpc, tFall + 0.55, 0.15, { o: [1, 0] }, 'lin');
  tw('.c-m .mouth', tFall, 0.2, { sx: [1, 0.5], sy: [1, 1.3] }, 'back'); tw('.c-m .brL', tFall, 0.2, { y: [0, -14] }, 'out'); tw('.c-m .brR', tFall, 0.2, { y: [0, -14] }, 'out');
  tw('.c-m .pup', tFall, 0.25, { x: [8, 10], y: [-8, -10] }, 'out');
  // the cat drops into the hole
  const tCat = wt('j1', 5);
  tw('.c-qr .cat', tCat, 0.05, { o: [0, 1] }, 'lin'); tw('.c-qr .cat', tCat, 0.45, { y: [-700, 0], r: [-30, 0] }, 'back'); sfx('pop', wt('j1', 6), 1.1);
  punch('.c-qr', wt('j1', 6) + 0.05, 0.05); tw('.c-qr .cMouth', wt('j1', 6), 0.25, { sy: [1, 1.4] }, 'back');
  tw('.c-m .armR', tCat, 0.3, { r: [-120, -40] }, 'out'); tw('.c-m .mouth', wt('j1', 6), 0.25, { sx: [0.5, 1.15], sy: [1.3, 1.2] }, 'back');
  // j2: phone, beep, link opens
  slideIn('.c-ph', L('j1').t1, 'right', 0.5, 400); sfx('whoosh', L('j1').t1, 0.5); scanIdle('.c-ph', L('j1').t1, wt('j2', 0));
  tw('.c-m .pup', L('j1').t1, 0.3, { x: [10, 8], y: [-10, 6] }, 'out');
  phoneOK('.c-ph', wt('j2', 0)); burst('.c-fx', 10, 825, 1080, wt('j2', 0), 230, 4);
  popIn('.c-ph .lnk', wt('j2', 2), 0.35, 0.2); sfx('blip', wt('j2', 2), 0.7);
  tw('.c-m', wt('j2', 3) - 0.1, 0.18, { y: [0, -80] }, 'out'); tw('.c-m', wt('j2', 3) + 0.08, 0.3, { y: [-80, 0] }, 'in');
  tw('.c-m .armL', wt('j2', 3) - 0.1, 0.3, { r: [0, 130] }, 'back'); tw('.c-m .armR', wt('j2', 3) - 0.1, 0.3, { r: [-40, -130] }, 'back');

  // ---------- D: secret 1 — three big squares in the corners, found even upside down ----------
  tWhip('#C', '#D', tD, 0.46, 1);
  hide('.d-n'); hide('.d-ph'); phoneInit('.d-ph'); hide('.d-sp');
  slideIn('.d-chip', tD + 0.1, 'left', 0.6, 300);
  tw('.d-ln path', tD, 0.001, { dash: [100, 100] });
  const f3t = [wt('s4', 2), wt('s4', 3) + 0.15, wt('s4', 4) + 0.15];
  $$('.d-qr .fp').forEach((f, k) => { punch(f, f3t[k], 0.18); tw($('.fpg', f), f3t[k], 0.2, { o: [0, 1] }, 'out'); sfx('blip', f3t[k], 0.8); });
  tw('.d-n', f3t[0], 0.001, { o: [0, 1] }); stamp('.d-n', f3t[0], 0, 12);
  tw('.d-m .armR', f3t[0] - 0.1, 0.3, { r: [0, -130] }, 'back'); tw('.d-m .armR', f3t[1], 0.25, { r: [-130, -105] }, 'out'); tw('.d-m .armR', f3t[2], 0.25, { r: [-105, -80] }, 'out');
  tw('.d-m .pup', f3t[0], 0.25, { x: [0, 6], y: [0, -8] }, 'out'); tw('.d-m .pup', f3t[1], 0.25, { x: [6, 8], y: [-8, -8] }, 'out'); tw('.d-m .pup', f3t[2], 0.25, { x: [8, 4], y: [-8, -2] }, 'out');
  tw('.d-ln path', wt('s4', 6) - 0.1, 0.45, { dash: [100, 0] }, 'inOut'); sfx('zap', wt('s4', 6) - 0.1, 0.4);
  slideOut('.d-n', wt('s5', 0), 'down', 0.35, 300);
  slideIn('.d-ph', wt('s5', 0), 'right', 0.55, 400); sfx('whoosh', wt('s5', 0), 0.5); scanIdle('.d-ph', wt('s5', 0), wt('s5', 7) + 0.4);
  tw('.d-m .armR', wt('s5', 1), 0.3, { r: [-80, -20] }, 'out');
  punch('.d-qr', wt('s5', 4), 0.05);
  // «вверх ногами»: the code turns over, the mascot too
  const tUp = wt('s5', 6) - 0.1;
  tw('.d-ln path', tUp - 0.15, 0.2, { o: [1, 0] }, 'lin');
  tw('.d-qr', tUp, 0.6, { r: [0, 180] }, 'inOut'); sfx('whoosh', tUp, 0.8);
  tw('.d-m', tUp, 0.6, { r: [0, 180], y: [0, -40] }, 'inOut');
  popIn('.d-sp', tUp, 0.35, 0.3); tw('.d-sp', tUp, 0.9, { r: [0, 200] }, 'out');
  tw('.d-m .mouth', tUp + 0.3, 0.25, { sx: [1, 1.2], sy: [1, 1.2] }, 'back');
  phoneOK('.d-ph', wt('s5', 7) + 0.35);

  // ---------- E: secret 2 — spare hints inside the code repair what is missing ----------
  tCircle('#D', '#E', tE, 540, 700);
  hide('.e-pan'); EH.forEach(h => hide(h));
  slideIn('.e-chip', tE + 0.1, 'left', 0.6, 300);
  slideIn('.e-lk', wt('s6', 1), 'up', 0.55, 200); sfx('whoosh', wt('s6', 1), 0.5);
  tw('.e-m .pup', tE, 0.001, { x: [6, 6], y: [-8, -8] });
  tw('.e-m .armR', wt('s6', 3), 0.3, { r: [0, -120] }, 'back');
  slideIn('.e-pan', wt('s6', 5) - 0.1, 'right', 0.6, 300);
  const LPX = [410, 520, 630, 740];
  EH.forEach((h, k) => { const t = wt('s6', 5) + k * 0.1, p = HP[k], dx = LPX[k % 4] - (240 + p[0]), dy = 370 - (470 + p[1]);
    tw(h, t, 0.05, { o: [0, 1] }, 'lin'); tw(h, t, 0.5, { x: [dx, 0], y: [dy, 0], s: [0.4, 1], r: [90, 0] }, 'back'); sfx('pop', t, 0.45); });
  // s7: a corner chunk gets torn off; hints rebuild it
  const tTear = wt('s7', 0) - 0.05, Q6 = $$('.e-qr svg rect.q6');
  $$('.e-qr .q6').forEach(r => { r.style.transformBox = 'fill-box'; r.style.transformOrigin = 'center'; });
  tw(epc, tTear, 0.6, { x: [0, 700], y: [0, 500], r: [0, 70] }, 'in'); sfx('glitch', tTear, 0.8); shake(tTear + 0.05, 0.25, 14);
  const tRe = wt('s7', 3) - 0.05;
  custom(t => { if (t < tE - 1 || t > tF + 1) return; Q6.forEach(r => { if (t < tTear) { r.style.opacity = 1; r.style.transform = ''; return; }
    const u = clamp((t - tRe - ((+r.dataset.d) - 30) / 10 * 0.5) / 0.16); r.style.opacity = u > 0 ? 1 : 0; r.style.transform = `scale(${(u >= 1 ? 1 : 0.3 + 0.7 * E.back(u)).toFixed(3)})`; }); });
  const patch = mk('.e-qr', 'hl'); patch.style.cssText = `left:${QO + 15 * QU}px;top:${QO + 15 * QU}px;width:${6 * QU}px;height:${6 * QU}px`;
  hide(patch); tw(patch, tTear, 0.001, { o: [0, 1] }); tw(patch, tRe - 0.05, 0.2, { o: [1, 0] }, 'lin');
  $('.e-qr').appendChild(epc);
  tw('.e-m .mouth', tTear, 0.2, { sx: [1, 0.5], sy: [1, -0.8] }, 'back'); tw('.e-m .armL', tTear, 0.3, { r: [0, 120] }, 'back');
  tw('.e-m .pup', tTear, 0.25, { x: [6, 10], y: [-8, 2] }, 'out');
  EH.forEach((h, k) => { punch(h, tRe - 0.15 + k * 0.03, 0.4); const p = HP[k];
    tw(h, tRe + 0.1 + k * 0.04, 0.45, { x: [0, (408 + 72) - p[0]], y: [0, (408 + 72) - p[1]], s: [1, 0.3] }, 'in'); tw(h, tRe + 0.5 + k * 0.04, 0.1, { o: [1, 0] }, 'lin'); });
  for (let k = 0; k < 5; k++) sfx('tick', tRe + 0.1 + k * 0.1, 0.5);
  sfx('ding', tRe + 0.65, 0.6); punch('.e-qr', tRe + 0.65, 0.05);
  tw('.e-m .mouth', wt('s7', 4), 0.25, { sx: [0.5, 1.15], sy: [-0.8, 1.2] }, 'back'); tw('.e-m .armL', wt('s7', 4), 0.3, { r: [120, 20] }, 'out');
  tw('.e-m .armR', wt('s7', 4), 0.3, { r: [-120, -150] }, 'back');

  // ---------- F: «кот» without «о» — still understood ----------
  tDrop('#E', '#F', tF);
  hide('.f-gap'); hide('.f-bulb'); hide('.f-bub');
  ['.f-k', '.f-o', '.f-t'].forEach((c, k) => { slideIn(c, tF + 0.08 + k * 0.1, 'up', 0.55, 300); sfx('pop', tF + 0.1 + k * 0.1, 0.5); });
  ['.f-k', '.f-o', '.f-t'].forEach((c, k) => punch(c, wt('s8', 2) + k * 0.12, 0.12));
  tw('.f-m .pup', wt('s8', 1), 0.001, { x: [-8, -8], y: [-8, -8] });
  tw('.f-m .pup', wt('s8', 2), 0.4, { x: [-8, 8], y: [-8, -8] }, 'inOut');
  const tO = wt('s8', 4) - 0.1;
  tw('.f-o', tO, 0.12, { y: [0, -30] }, 'out'); tw('.f-o', tO + 0.12, 0.55, { y: [-30, 1300], r: [0, -40] }, 'in'); tw('.f-o', tO + 0.45, 0.2, { o: [1, 0] }, 'lin'); sfx('whoosh', tO + 0.12, 0.6);
  tw('.f-gap', tO + 0.1, 0.2, { o: [0, 1] }, 'lin');
  tw('.f-m .pup', tO, 0.3, { x: [8, 0], y: [-8, 8] }, 'out'); tw('.f-m .brL', tO, 0.25, { y: [0, -16], r: [0, 10] }, 'out'); tw('.f-m .mouth', tO, 0.25, { sx: [1, 0.6], sy: [1, -0.6] }, 'back');
  tw('.f-m .armL', tO, 0.3, { r: [0, 70] }, 'back');
  const tU = wt('s8', 5);
  popIn('.f-bulb', tU, 0.4, 0.2); sfx('ding', tU, 0.8); tw('.f-bulb', tU + 0.4, 0.8, { r: [0, 8] }, 'inOut');
  popIn('.f-bub', wt('s8', 7) - 0.1, 0.4, 0.2); sfx('pop', wt('s8', 7) - 0.1, 0.8);
  tw('.f-m .mouth', tU, 0.25, { sx: [0.6, 1.2], sy: [-0.6, 1.25] }, 'back'); tw('.f-m .brL', tU, 0.25, { y: [-16, -6], r: [10, 0] }, 'out');
  tw('.f-m .pup', tU, 0.25, { x: [0, -8], y: [8, -4] }, 'out'); tw('.f-m .armL', tU, 0.3, { r: [70, 130] }, 'back');
  tw('.f-m', tU, 0.16, { y: [0, -50] }, 'out'); tw('.f-m', tU + 0.16, 0.3, { y: [-50, 0] }, 'in');

  // ---------- G: strong protection — survives without a quarter ----------
  tw('#F', tG - 0.25, 0.4, { r: [0, -20], s: [1, 0.6], o: [1, 0] }, 'in'); tw('#G', tG - 0.1, 0.5, { r: [16, 0], s: [1.3, 1], o: [0, 1] }, 'out5'); sfx('whoosh', tG - 0.25, 0.9);
  hide('.g-q'); hide('.g-er'); hide('.g-ph'); phoneInit('.g-ph'); GC.forEach(c => hide(c));
  slideIn('.g-chip', wt('s9', 1) - 0.1, 'left', 0.6, 300); sfx('whoosh', wt('s9', 1) - 0.1, 0.4);
  tw('.g-wp', tG, 0.001, { sy: [0, 0] });
  tw('.g-m .armR', wt('s9', 1), 0.3, { r: [0, -60] }, 'back');
  const w0 = wt('s9', 3) - 0.05, w1 = wt('s9', 7) - 0.05;
  tw('.g-wp', w0, w1 - w0, { sy: [0, 1] }, 'lin');
  tw('.g-er', w0 - 0.12, 0.12, { o: [0, 1] }, 'lin'); tw('.g-er', w1 + 0.05, 0.2, { o: [1, 0] }, 'lin');
  custom(t => { if (t < w0 - 0.15 || t > w1 + 0.3) return; const u = clamp((t - w0) / (w1 - w0)), x = 552 + 120 + 110 * Math.sin(u * Math.PI * 9), y = 632 + 240 * u;
    $('.g-er').style.transform = `translate(${(x - 100).toFixed(1)}px,${(y - 54).toFixed(1)}px) rotate(${(10 * Math.sin(u * Math.PI * 9)).toFixed(2)}deg)`; });
  for (let th = w0; th < w1; th += 0.12) sfx('tick', th, 0.35);
  GC.forEach((c, k) => { const t = w0 + k * (w1 - w0) / 14, x = 560 + 220 * hash(k + 2), y = 640 + 240 * (k / 14); place(c, x, y);
    tw(c, t, 0.05, { o: [0, 1] }, 'lin'); tw(c, t, 0.7, { y: [0, 300 + 100 * hash(k)], x: [0, 60 * (hash(k + 5) - 0.5)], r: [0, 200] }, 'in'); tw(c, t + 0.6, 0.1, { o: [1, 0] }, 'lin'); });
  idle('.g-m .armR', t => (t > w0 && t < w1) ? { r: 25 * Math.sin((t - w0) * 14) } : {});
  tw('.g-m .pup', w0, 0.3, { x: [0, 8], y: [0, -6] }, 'out');
  slideIn('.g-ph', wt('s9', 4), 'right', 0.55, 400); sfx('whoosh', wt('s9', 4), 0.4); scanIdle('.g-ph', wt('s9', 4), wt('s9', 7) + 0.25);
  tw('.g-q', wt('s9', 7), 0.001, { o: [0, 1] }); stamp('.g-q', wt('s9', 7), -6, 16);
  phoneOK('.g-ph', wt('s9', 7) + 0.3);
  tw('.g-m .armR', wt('s9', 7) + 0.3, 0.3, { r: [-60, -150] }, 'back'); tw('.g-m .armL', wt('s9', 7) + 0.3, 0.3, { r: [0, 150] }, 'back');
  tw('.g-m .mouth', wt('s9', 7) + 0.3, 0.25, { sx: [1, 1.2], sy: [1, 1.25] }, 'back');
  tw('.g-m', wt('s9', 7) + 0.3, 0.18, { y: [0, -60] }, 'out'); tw('.g-m', wt('s9', 7) + 0.48, 0.3, { y: [-60, 0] }, 'in');

  // ---------- H: joke — coffee on the receipt: fine. Almost ----------
  tWhip('#G', '#H', tH, 0.46, -1);
  hide('.h-st1'); hide('.h-st2'); hide('.h-ph'); phoneInit('.h-ph'); HD.forEach(d => hide(d)); hide('.h-mug');
  slideIn('.h-rc', tH + 0.05, 'up', 0.6, 400); slideIn('.h-qr', tH + 0.05, 'up', 0.6, 400);
  slideIn('.h-mug', wt('j3', 0) - 0.05, 'right', 0.5, 300); sfx('whoosh', wt('j3', 0) - 0.05, 0.5);
  tw('.h-m .armL', wt('j3', 0), 0.3, { r: [0, 60] }, 'back'); tw('.h-m .pup', wt('j3', 0), 0.25, { x: [0, -2], y: [0, -10] }, 'out');
  const tPour = wt('j3', 1) - 0.1;
  tw('.h-mug', tPour, 0.3, { r: [0, -75] }, 'out'); sfx('blip', tPour, 0.4);
  HD.forEach((d, k) => { const t = tPour + 0.2 + k * 0.07; place(d, 650, 300); tw(d, t, 0.05, { o: [0, 1] }, 'lin'); tw(d, t, 0.35, { x: [0, -175 + 10 * k], y: [0, 540 - 15 * k] }, 'in'); tw(d, t + 0.33, 0.05, { o: [1, 0] }, 'lin'); });
  const tSp = tPour + 0.55;
  popIn('.h-st1', tSp, 0.35, 0.3); sfx('thud', tSp, 0.7);
  tw('.h-mug', tSp + 0.1, 0.35, { r: [-75, 0] }, 'out');
  tw('.h-m .pup', tSp, 0.25, { x: [-2, -8], y: [-10, 8] }, 'out'); tw('.h-m .mouth', tSp, 0.2, { sx: [1, 0.5], sy: [1, 1.2] }, 'back');
  slideIn('.h-ph', tSp, 'right', 0.5, 400); sfx('whoosh', tSp, 0.4); scanIdle('.h-ph', tSp, wt('j3', 4));
  phoneOK('.h-ph', wt('j3', 4));
  tw('.h-m .mouth', wt('j3', 4), 0.25, { sx: [0.5, 1.15], sy: [1.2, 1.15] }, 'back');
  // fanning himself: relief
  tw('.h-m .armR', wt('j3', 4), 0.25, { r: [0, -100] }, 'out');
  idle('.h-m .armR', t => (t > wt('j3', 4) + 0.25 && t < wt('j4', 0) - 0.15) ? { r: 22 * Math.sin((t - wt('j3', 4)) * 16) } : {});
  // «Почти»: the whole mug goes over
  const tAl = wt('j4', 0) - 0.12;
  tw('.h-mug', tAl - 0.15, 0.2, { r: [0, -130], x: [0, -60] }, 'in');
  tw('.h-st2', tAl, 0.001, { o: [0, 1] }); tw('.h-st2', tAl, 0.3, { s: [0.2, 1] }, 'back'); sfx('boom', tAl, 0.9); shake(tAl + 0.05, 0.35, 26);
  tw('.h-ph .ok', tAl + 0.2, 0.1, { o: [1, 0] }, 'lin'); popIn('.h-ph .bad', tAl + 0.25, 0.3, 0.3); sfx('buzz', tAl + 0.25, 0.9);
  tw('.h-m .armR', tAl, 0.25, { r: [-100, -150] }, 'out'); tw('.h-m .armL', tAl, 0.25, { r: [60, 150] }, 'out');
  tw('.h-m .mouth', tAl, 0.2, { sx: [1.15, 0.8], sy: [1.15, -1] }, 'back'); tw('.h-m .brL', tAl, 0.2, { y: [0, -16] }, 'out'); tw('.h-m .brR', tAl, 0.2, { y: [0, -16] }, 'out');
  tw('.h-m', tAl, 0.3, { x: [0, 50], y: [0, -30] }, 'out'); tw('.h-m', tAl + 0.3, 0.3, { y: [-30, 0] }, 'in');

  // ---------- I: the maker says so; a hole is not a break, it is a margin of safety ----------
  tw('#H', tI - 0.25, 0.25, { sx: [1, 0], o: [1, 0.6] }, 'in'); tw('#I', tI, 0.3, { sx: [0, 1] }, 'out5'); sfx('whoosh', tI - 0.25, 0.9);
  hide('.i-bad'); hide('.i-ok'); hide('.i-qr .cat');
  tw('.i-x path', tI, 0.001, { dash: [100, 100] });
  slideIn('.i-src', tI + 0.1, 'left', 0.6, 400);
  slideIn('.i-qr', tI + 0.25, 'down', 0.6, 400);
  tw('.i-m .armL', wt('s10', 1), 0.3, { r: [0, 110] }, 'back'); tw('.i-m .pup', wt('s10', 1), 0.25, { x: [0, -8], y: [0, -10] }, 'out');
  punch('.i-src', wt('s10', 3), 0.05); sfx('blip', wt('s10', 3), 0.6);
  // v1
  tw('.i-m .armL', wt('v1', 0) - 0.1, 0.3, { r: [110, 60] }, 'out'); tw('.i-m .pup', wt('v1', 0), 0.25, { x: [-8, -8], y: [-10, 2] }, 'out');
  punch('.i-qr .qhl', wt('v1', 0), 0.15); sfx('pop', wt('v1', 0), 0.7);
  popIn('.i-qr .cat', wt('v1', 0) + 0.1, 0.35, 0.2);
  stamp('.i-bad', wt('v1', 2), -4, 18);
  tw('.i-x path', wt('v1', 3) - 0.1, 0.3, { dash: [100, 0] }, 'in'); sfx('zap', wt('v1', 3) - 0.1, 0.5);
  tw('.i-bad', wt('v1', 4) - 0.05, 0.35, { y: [0, 120], o: [1, 0], r: [-4, 8] }, 'in'); tw('.i-x path', wt('v1', 4) - 0.05, 0.3, { o: [1, 0] }, 'lin');
  stamp('.i-ok', wt('v1', 4), -3, 22);
  burst('#I', 12, 510, 1170, wt('v1', 5), 300, 9);
  tw('.i-m', wt('v1', 5) - 0.05, 0.18, { y: [0, -70] }, 'out'); tw('.i-m', wt('v1', 5) + 0.13, 0.3, { y: [-70, 0] }, 'in');
  tw('.i-m .armR', wt('v1', 5) - 0.05, 0.3, { r: [0, -140] }, 'back'); tw('.i-m .mouth', wt('v1', 5), 0.25, { sx: [1, 1.2], sy: [1, 1.25] }, 'back');
  // out: fade the props, loop clone of frame 0
  tw('#I .i-src, #I .i-qr, #I .i-ok, #I .spark', tLoop - 0.25, 0.3, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop); tw('#I .i-m', tLoop + 0.4, 0.001, { o: [1, 0] });
}, { noCaption: ['hook'], chunks: {} });
