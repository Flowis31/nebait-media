const Wd = (k, s) => { const w = (WD[k] || []).find(w => w.d.toLowerCase().includes(s)); if (!w) console.warn('W miss', k, s); return w || { t0: L(k).t0, t1: L(k).t1 }; };
const W = (k, s) => Wd(k, s).t0, WE = (k, s) => Wd(k, s).t1;
const mk = (par, cls, html, css) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; if (css) d.style.cssText = css; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
const burst = (par, x, y, n, t, R = 320, cols = ['#b8ff3d', '#f4ecd9', '#ffe14d', '#ff3b5c']) => { for (let k = 0; k < n; k++) { const d = mk(par, 'cf', '', `left:${x}px;top:${y}px;background:${cols[k % cols.length]}`); const a = hash(k * 3.1 + x) * 6.283, r = R * (0.4 + 0.6 * hash(k + y)); hide(d); tw(d, t, 0.8, { x: [0, Math.cos(a) * r], y: [0, Math.sin(a) * r], o: [1, 0], r: [0, 500 * hash(k)] }, 'out'); } };
const sweat = (par, x, y, n, t, gap = 0.28) => { for (let k = 0; k < n; k++) { const d = mk(par, 'drop', '', `left:${x + hash(k + x) * 120}px;top:${y}px`); hide(d); tw(d, t + k * gap, 0.7, { x: [0, (hash(k) - .5) * 220], y: [0, 160 + 80 * hash(k + 5)], o: [1, 0], s: [0.6, 1.1] }, 'out'); } };
const ICON = {
  server: `<svg viewBox="0 0 120 120"><rect x="14" y="10" width="92" height="100" rx="14" fill="#3b5244" stroke="#0a130d" stroke-width="7"/><rect x="26" y="26" width="68" height="22" rx="6" fill="#0c1a12"/><rect x="26" y="58" width="68" height="22" rx="6" fill="#0c1a12"/><circle cx="84" cy="37" r="5" fill="#b8ff3d"/><circle cx="84" cy="69" r="5" fill="#b8ff3d"/></svg>`,
  phone: `<svg viewBox="0 0 120 120"><rect x="32" y="6" width="56" height="108" rx="14" fill="#0c1a12" stroke="#0a130d" stroke-width="7"/><rect x="40" y="20" width="40" height="70" rx="6" fill="#5ec8ff"/><circle cx="60" cy="100" r="5" fill="#f4ecd9"/></svg>`,
  wifi: `<svg viewBox="0 0 120 120"><path d="M14 46 Q60 6 106 46" fill="none" stroke="#0a130d" stroke-width="12" stroke-linecap="round"/><path d="M30 64 Q60 36 90 64" fill="none" stroke="#0a130d" stroke-width="12" stroke-linecap="round"/><path d="M46 82 Q60 70 74 82" fill="none" stroke="#0a130d" stroke-width="12" stroke-linecap="round"/><circle cx="60" cy="100" r="9" fill="#74c81c" stroke="#0a130d" stroke-width="5"/></svg>`,
};
boot(() => {
  // ---------- build ----------
  $('#A2').innerHTML = $('#A').innerHTML;
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG(i));
  $('.b-earth').innerHTML = earthSVG('b'); $('.c-earth').innerHTML = earthSVG('c'); $('.c-sun').innerHTML = sunSVG(); $('.c-ring').innerHTML = arrowRingSVG();
  $('.b-at .pul').innerHTML = pulseSVG(); $('.b-at .at').innerHTML = atomSVG();
  $('.b-ic1').innerHTML = ICON.server; $('.b-ic2').innerHTML = ICON.phone; $('.b-ic3').innerHTML = ICON.wifi;
  $('.e-srv').innerHTML = serverSVG('e'); $('.f-ph').innerHTML = phoneSVG(); $('.g-gav').innerHTML = gavelSVG(); $('.h-hg').innerHTML = hourglassSVG();
  for (let d = 1; d <= 28; d++) { const k = d - 1; mk('.f-app', 'd', String(d), `left:${6 + (k % 7) * 43}px;top:${92 + Math.floor(k / 7) * 52}px`); }
  const d31 = mk('.f-app', 'd d31', '31', `left:${6 + 2 * 43}px;top:${92 + 4 * 52}px`);
  const grid = $('.d-grid'); const tiles = [];
  for (let k = 0; k < 27; k++) tiles.push(mk('#D', 'gt', '+1', `left:${340 + (k % 9) * 70}px;top:${780 + Math.floor(k / 9) * 74}px`));
  mascotLife();
  $$('.lab').forEach(el => { const w = el.offsetWidth; if (w) el.style.left = Math.round((1080 - w) / 2) + 'px'; });
  ['.d-n', '.g-date'].forEach(s => { const el = $(s), w = el.offsetWidth; if (w) el.style.left = Math.round((1080 - w) / 2) + 'px'; });

  const cut = k => L(k).t0 - 0.12;
  const tB = cut('a1'), tC = cut('b1'), tD = cut('c1'), tE = cut('d1'), tF = cut('j1'), tG = cut('e1'), tH = cut('e3'), tLoop = L('out').t0 + 0.15;
  sceneCuts(['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H'], [0, tB, tC, tD, tE, tF, tG, tH]);
  $$('.m').forEach((m, i) => { idle(m, t => ({ y: 9 * Math.sin(W2 * 30 * t + i), r: 2.5 * Math.sin(W2 * 15 * t + i) })); idle($('.pup', m), t => ({ x: 4 * Math.sin(W2 * 20 * t + i), y: 3 * Math.sin(W2 * 28 * t) })); });

  // ---------- A: hook (frame 0 is the thumbnail) ----------
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  idle('.a-clk .tm i', t => ({ s: 1 + 0.06 * Math.max(0, Math.sin(W2 * 40 * t)) }));
  punch('#A .a-t', W('hook', 'секунда')); sfx('blip', W('hook', 'секунда'));
  tw('#A .a-com', W('hook', 'секунда'), 0.12, { r: [0, -2] }); tw('#A .a-com', W('hook', 'секунда') + 0.12, 0.4, { r: [-2, 0] }, 'elastic');
  tw('#A .armR', W('hook', 'объясняю') - 0.1, 0.35, { r: [0, -125] }, 'back'); tw('#A .brR', W('hook', 'объясняю'), 0.3, { y: [0, -14] }, 'back');
  punch('#A .a-s', W('hook', 'пальцах'), 0.16); sfx('pop', W('hook', 'пальцах'));
  for (let k = 0; k < 3; k++) tw('#A .armR', W('hook', 'пальцах') + k * 0.16, 0.16, { r: k % 2 ? [-150, -125] : [-125, -150] }, 'sine');
  tw('#A .mouth', W('hook', 'пальцах'), 0.25, { sy: [1, 1.3] }, 'back');

  // ---------- B: two clocks ----------
  tSlideUp('#A', '#B', tB);
  hide('.b-at'); hide('.b-earth'); hide('.b-el'); $$('.b-ic').forEach(e => hide(e)); hide('.b-m');
  slideIn('.b-at', W('a1', 'двое') - 0.1, 'left', 0.7, 420); slideIn('.b-earth', W('a1', 'часов') - 0.1, 'right', 0.7, 420); slideIn('.b-el', W('a1', 'часов') + 0.15, 'right', 0.6, 220);
  sfx('whoosh', W('a1', 'двое') - 0.1, 0.7); sfx('whoosh', W('a1', 'часов') - 0.1, 0.6);
  const bt = $('.b-at .tm'), b0 = W('a2', 'атомные');
  custom(t => { const s = Math.max(0, Math.floor(t - b0 + 1)); bt.textContent = '12:00:' + String(Math.min(s, 59)).padStart(2, '0'); });
  for (let k = 0; k < 4; k++) sfx('tick', b0 - 1 + Math.ceil(1) + k, 0.8);
  punch('.b-at', b0, 0.06); tw('.b-earth', b0, 0.4, { o: [1, 0.35] }); tw('.b-el', b0, 0.4, { o: [1, 0.35] });
  idle('.b-at .at', t => ({ r: 90 * t }));
  tw('.b-at .pl', W('a2', 'тикают'), WE('a2', 'ровно') - W('a2', 'тикают'), { dash: [100, 0] }, 'lin');
  popIn('.b-m', W('a2', 'первые'), 0.45, 0.4); sfx('pop', W('a2', 'первые'), 0.6);
  tw('#B .armR', b0, 0.35, { r: [0, -70] }, 'back'); tw('#B .pup', b0, 0.3, { x: [0, 8], y: [0, -6] }, 'out');
  $$('#B .ln').forEach((p, i) => tw(p, W('a3', 'живёт') + i * 0.12, 0.45, { dash: [100, 0] }, 'out'));
  $$('.b-ic').forEach((e, i) => { popIn(e, W('a3', 'живёт') + 0.25 + i * 0.14, 0.4, 0.3); sfx('pop', W('a3', 'живёт') + 0.25 + i * 0.14, 0.6); });
  punch('.b-ic3', W('a3', 'интернет'), 0.12); tw('#B .armR', W('a3', 'интернет'), 0.3, { r: [-70, -130] }, 'back'); tw('#B .mouth', W('a3', 'интернет'), 0.2, { sy: [1, 1.3] });

  // ---------- C: the Earth ----------
  tWhip('#B', '#C', tC);
  const conts = $$('.cont'); let crot = 0, cprev = 0;
  custom(t => {   // continents slide = rotation; speed wobbles from b2 on
    const wob = t > W('b2', 'крутится') ? 1 + 0.9 * Math.sin((t - W('b2', 'крутится')) * 5.3) : 1;
    crot += Math.max(0, t - cprev) * 60 * wob; cprev = t;
    const x = -((t * 60 + (t > W('b2', 'крутится') ? 30 * Math.sin((t - W('b2', 'крутится')) * 5.3) : 0)) % 360);
    conts.forEach(c => c.setAttribute('transform', `translate(${x.toFixed(1)} 0)`));
  });
  hide('.c-sun'); hide('.c-chip'); hide('.c-sp'); hide('.c-m'); hide('.c-gap'); hide('.c-gl'); hide('.c-t1'); hide('.c-t2');
  tw('.c-earth', tC - 0.05, 0.7, { s: [0.5, 1] }, 'out5');
  slideIn('.c-sun', W('b1', 'земля'), 'left', 0.7, 300);
  tw('.ring', W('b1', 'один'), WE('b1', 'оборот') - W('b1', 'один') + 0.3, { dash: [100, 0] }, 'inOut'); hide('.ringhead'); tw('.ringhead', WE('b1', 'оборот') + 0.2, 0.2, { o: [0, 1] });
  sfx('riser2', W('b1', 'один'), 0.5);
  slideIn('.c-chip', W('b1', 'сутки') - 0.1, 'down', 0.6, 200); sfx('whoosh', W('b1', 'сутки') - 0.1, 0.5);
  popIn('.c-m', W('b1', 'вторые'), 0.45, 0.4);
  tw('.c-earth', W('b2', 'неровно'), 0.12, { r: [0, -6] }); tw('.c-earth', W('b2', 'неровно') + 0.12, 0.5, { r: [-6, 0] }, 'elastic');
  const sp = $('.c-sp'); slideIn('.c-sp', W('b2', 'крутится'), 'right', 0.5, 160);
  custom(t => { sp.textContent = Math.sin((t - W('b2', 'крутится')) * 5.3) > 0 ? 'быстрее' : 'медленнее'; });
  tw('.c-sp', W('b3', 'за'), 0.3, { o: [1, 0] });
  idle('#C .pup', t => (t > W('b2', 'крутится') && t < W('b3', 'за')) ? { x: 9 * Math.cos(t * 9), y: 9 * Math.sin(t * 9) } : {});
  tw('#C .brL', W('b2', 'неровно'), 0.3, { y: [0, -12] }, 'back');
  tw('.c-earth', W('b3', 'за') - 0.1, 0.5, { y: [0, -60], s: [1, 0.8] }, 'inOut'); tw('.c-ring', W('b3', 'за') - 0.1, 0.5, { y: [0, -60], s: [1, 0.8], o: [1, 0] }, 'inOut'); tw('.c-chip', W('b3', 'за') - 0.1, 0.3, { o: [1, 0] });
  tw('.c-sun', W('b3', 'за') - 0.1, 0.5, { s: [1, 0.7], y: [0, -40] }, 'inOut');
  slideIn('.c-t1', W('b3', 'за'), 'left', 0.5, 300); slideIn('.c-t2', W('b3', 'пару'), 'left', 0.5, 300);
  const r0 = W('b3', 'пару'), r1 = W('b3', 'секунду');
  tw('.c-t1 i', r0, r1 - r0, { sx: [0.15, 1] }, 'lin'); tw('.c-t2 i', r0, r1 - r0, { sx: [0.15, 0.86] }, 'lin');
  slideIn('.c-gap', W('b3', 'секунду') - 0.05, 'right', 0.4, 80); popIn('.c-gl', W('b3', 'секунду'), 0.4, 0.3); sfx('ding', W('b3', 'секунду'));
  tw('#C .armR', W('b3', 'секунду') - 0.1, 0.3, { r: [0, -100] }, 'back');

  // ---------- D: the leap second ----------
  tZoom('#C', '#D', tD);
  const dt = $('.d-clk .tm');
  const tc59 = W('c1', 'лишнюю'), tc60 = L('c2').t0, tc00 = W('c3', 'так');
  custom(t => { dt.innerHTML = t < tc59 ? '23:59:58' : t < tc60 ? '23:59:59' : t < tc00 ? '23:59:<i>60</i>' : '00:00:00'; });
  sfx('tick', tc59, 0.9); sfx('tick', tc00, 0.9);
  hide('.d-glow'); tw('.d-glow', tc60, 0.3, { o: [0, 1] }); tw('.d-glow', tc00, 0.3, { o: [1, 0] });
  tw('.d-m', tD - 0.1, 0.9, { x: [-420, 0] }, 'out'); tw('.d-tile', tD - 0.1, 0.9, { x: [-420, 0] }, 'out');
  for (let k = 0; k < 4; k++) { tw('#D .legL', tD + k * 0.22, 0.22, { r: k % 2 ? [-18, 18] : [18, -18] }, 'sine'); tw('#D .legR', tD + k * 0.22, 0.22, { r: k % 2 ? [18, -18] : [-18, 18] }, 'sine'); }
  tw('#D .legL', tD + 0.88, 0.2, { r: [18, 0] }); tw('#D .legR', tD + 0.88, 0.2, { r: [-18, 0] });
  tw('#D .armR', W('c1', 'добавляли') - 0.2, 0.3, { r: [0, -60] }, 'back');
  { const a = { x: 420, y: 760 }, b = { x: 760, y: 420 };   // the tile flies into the seconds digits
    tw('.d-tile', W('c1', 'секунду') - 0.05, 0.55, { x: [0, b.x - a.x], y: [0, b.y - a.y], s: [1, 0.55], r: [0, 360] }, 'inOut'); tw('.d-tile', tc60 - 0.02, 0.15, { o: [1, 0] }); sfx('whoosh', W('c1', 'секунду') - 0.05, 0.7); }
  punch('.d-clk', tc60, 0.08); shake(tc60 + 0.02, 0.3, 16); sfx('slam', tc60, 0.9);
  tw('.d-m', tc60, 0.22, { y: [0, -90] }, 'out'); tw('.d-m', tc60 + 0.22, 0.3, { y: [-90, 0] }, 'in'); tw('#D .armL', tc60, 0.3, { r: [0, 110] }, 'back'); tw('#D .armR', tc60, 0.3, { r: [-60, -120] }, 'back');
  tiles.forEach((g, k) => { hide(g); const t = W('c3', 'было') + k * 0.035; popIn(g, t, 0.35, 0.2); if (k % 4 === 0) sfx('tick', t, 0.6); });
  hide('.d-n'); slideIn('.d-n', W('c3', 'раз'), 'down', 0.6, 160); sfx('ding', WE('c3', '27'));
  tw('.d-m', W('c3', 'так') - 0.1, 0.5, { s: [1, 0.6], x: [0, -20], y: [0, 120] }, 'inOut');

  // ---------- E: computers fall over ----------
  tCircle('#D', '#E', tE, 250, 520);
  hide('.e-60'); const tHit = W('d1', 'ждут');
  tw('.e-60', W('d1', 'компьютеры') - 0.05, 0.35, { o: [0, 1], s: [0.4, 1] }, 'back');
  tw('.e-60', tHit - 0.35, 0.4, { x: [0, -40], y: [0, -500], r: [0, -540], s: [1, 0.6] }, 'in'); tw('.e-60', tHit + 0.05, 0.1, { o: [1, 0] });
  shake(tHit + 0.05, 0.45, 26); sfx('boom', tHit + 0.03); tw('.e-srv', tHit + 0.05, 0.1, { r: [0, -6] }); tw('.e-srv', tHit + 0.15, 0.5, { r: [-6, 0] }, 'elastic');
  $$('#E .led').forEach((l, i) => custom(t => { l.setAttribute('fill', t < tHit ? '#b8ff3d' : (Math.floor(t * 8 + i) % 2 ? '#ff3b5c' : '#5a1020')); }));
  idle('#E .spup', t => t > tHit ? { x: 6 * Math.cos(t * 14), y: 6 * Math.sin(t * 14) } : {});
  for (let k = 0; k < 7; k++) { const s = mk('#E', 'smk', '', `left:${170 + hash(k + 3) * 140}px;top:300px`); hide(s); tw(s, tHit + 0.1 + k * 0.32, 1.2, { y: [0, -260], x: [0, (hash(k) - .5) * 160], s: [0.4, 1.6], o: [0.8, 0] }, 'out'); }
  ['сайты', 'бронь', 'cloudflare'].forEach((w, i) => { const el = '.e-p' + (i + 1); hide(el); slideIn(el, W('d2', w) - 0.1, 'right', 0.6, 300); sfx('whoosh', W('d2', w) - 0.1, 0.6); });
  hide('.e-m'); popIn('.e-m', tE + 0.2, 0.45, 0.4);
  tw('#E .armL', tHit, 0.25, { r: [0, 140] }, 'back'); tw('#E .armR', tHit, 0.25, { r: [0, -140] }, 'back'); tw('#E .mouth', tHit, 0.15, { sy: [1, -1.2] });
  tw('#E .brL', tHit, 0.2, { y: [0, -16], r: [0, 10] }, 'back'); tw('#E .brR', tHit, 0.2, { y: [0, -16], r: [0, -10] }, 'back');
  sweat('#E', 640, 830, 6, tHit + 0.3, 0.45);

  // ---------- F: joke, 31 February ----------
  tDrop('#E', '#F', tF);
  hide('.f-61'); hide('.f-61s'); hide('.f-cal'); hide('.f-err'); hide(d31);
  const n61 = $('.f-61'), n0 = W('j1', '61');
  tw('.f-61', W('j1', 'минута'), 0.4, { o: [0, 1], s: [0.5, 1] }, 'back');
  custom(t => { n61.textContent = t < n0 ? '60' : '61'; });
  punch('.f-61', n0, 0.18); sfx('slam', n0, 0.8); shake(n0 + 0.03, 0.25, 12); slideIn('.f-61s', n0 + 0.1, 'left', 0.6, 220);
  const tFeb = W('j1b', '31');
  tw('.f-cal', tFeb - 0.25, 0.3, { y: [-900, 0], o: [1, 1], r: [-12, -4] }, 'in'); tw('.f-cal', tFeb - 0.25, 0.01, { o: [0, 1] }); sfx('thud', tFeb + 0.05);
  tw('.f-cal', tFeb + 0.55, 0.45, { x: [0, 480], y: [0, -130], s: [1, 0.12], o: [1, 0], r: [-4, 20] }, 'in'); sfx('whoosh', tFeb + 0.55, 0.7);
  tw(d31, tFeb + 0.95, 0.3, { o: [0, 1], s: [2.2, 1] }, 'back'); sfx('pop', tFeb + 0.95);
  const tErr = W('j1b', 'календаря');
  tw('.f-err', tErr - 0.05, 0.08, { o: [0, 1] }); sfx('glitch', tErr - 0.05); sfx('buzz', tErr + 0.1, 0.7);
  idle('.f-err', t => t > tErr ? { x: 8 * Math.sin(t * 61), y: 4 * Math.sin(t * 47) } : {});
  tw('.f-ph', tErr, 0.1, { r: [0, 4] }); tw('.f-ph', tErr + 0.1, 0.5, { r: [4, 0] }, 'elastic'); shake(tErr + 0.02, 0.35, 18);
  hide('.f-m'); popIn('.f-m', tF + 0.15, 0.45, 0.4);
  tw('#F .pup', n0, 0.3, { x: [0, -8], y: [0, -8] }, 'out'); tw('#F .brL', n0, 0.25, { y: [0, -14] }, 'back');
  tw('#F .armR', tErr, 0.3, { r: [0, -150] }, 'back'); tw('#F .mouth', tErr, 0.2, { sy: [1, -1] });   // facepalm
  tw('#F .pup', tErr, 0.3, { x: [-8, 0], y: [-8, 10] }, 'out');

  // ---------- G: the decision ----------
  tWhip('#F', '#G', tG, 0.46, -1);
  hide('.g-lab'); hide('.g-date'); hide('.g-cal'); hide('.g-x');
  slideIn('.g-lab', tG + 0.1, 'up', 0.6, 160); slideIn('.g-date', W('e1', 'решили') - 0.2, 'up', 0.6, 160);
  const tGav = W('e1', 'решили');
  tw('.g-gav', tG + 0.1, 0.5, { r: [0, -40] }, 'out'); tw('.g-gav', tGav - 0.05, 0.16, { r: [-40, 12] }, 'in'); tw('.g-gav', tGav + 0.11, 0.4, { r: [12, 0] }, 'out');
  shake(tGav + 0.11, 0.3, 20); sfx('slam', tGav + 0.1);
  tw('.g-cal', W('e2', 'мая') - 0.1, 0.5, { y: [-700, 0], o: [0, 1], r: [8, -3] }, 'out5'); sfx('thud', W('e2', 'мая') + 0.25);
  punch('.g-cal', W('e2', '2027'), 0.08);
  hide('.g-tile'); popIn('.g-tile', W('e2', 'секунду') - 0.05, 0.4, 0.3); sfx('pop', W('e2', 'секунду'));
  tw('.g-x', W('e2', 'не') - 0.05, 0.25, { sx: [0, 1], o: [1, 1], r: [-20, -20] }, 'out'); tw('.g-x', W('e2', 'не') - 0.05, 0.01, { o: [0, 1] }); sfx('zap', W('e2', 'не'), 0.7);
  tw('.g-tile', W('e2', 'добавляют'), 0.4, { s: [1, 0.85], o: [1, 0.55] }, 'out');
  hide('.g-m'); popIn('.g-m', tG + 0.2, 0.45, 0.4);
  tw('#G .pup', tGav - 0.1, 0.3, { x: [0, 8], y: [0, -4] }, 'out');
  tw('.g-m', tGav + 0.1, 0.12, { sy: [1, 0.85] }); tw('.g-m', tGav + 0.22, 0.4, { sy: [0.85, 1] }, 'back');
  const tYes = W('e2', 'добавляют');
  tw('#G .armL', tYes, 0.3, { r: [0, 120] }, 'back'); tw('#G .armR', tYes, 0.3, { r: [0, -120] }, 'back'); tw('#G .mouth', tYes, 0.2, { sy: [1, 1.3] });
  tw('.g-m', tYes, 0.22, { y: [0, -80] }, 'out'); tw('.g-m', tYes + 0.22, 0.3, { y: [-80, 0] }, 'in');
  burst('#G', 680, 880, 16, tYes + 0.1, 300);

  // ---------- H: let them drift, an hour is far away ----------
  tSlideUp('#G', '#H', tH);
  hide('.h-goal'); hide('.h-t1'); hide('.h-t2'); hide('.h-cnt');
  slideIn('.h-t1', tH + 0.05, 'left', 0.5, 300); slideIn('.h-t2', tH + 0.15, 'left', 0.5, 300); slideIn('.h-cnt', W('e3', 'разницу') - 0.1, 'left', 0.5, 200);
  const h0 = W('e3', 'расходятся'), h1 = tLoop;
  tw('.h-t1 i', h0, h1 - h0, { sx: [0.3, 1] }, 'lin'); tw('.h-t2 i', h0, h1 - h0, { sx: [0.3, 0.92] }, 'lin');
  const hc = $('.h-cnt b'); custom(t => { const p = Math.max(0, Math.min(1, (t - h0) / (h1 - h0))); hc.textContent = '+' + Math.max(1, Math.ceil(p * 5)) + ' с'; });
  for (let k = 1; k < 5; k++) sfx('tick', h0 + (h1 - h0) * k / 5, 0.5);
  tw('.h-hg .sandT', h0, h1 - h0, { sy: [1, 0.55] }, 'lin'); tw('.h-hg .sandB', h0, h1 - h0, { sy: [0.04, 0.45] }, 'lin');
  slideIn('.h-goal', W('e3', 'часа') - 0.25, 'right', 0.6, 300); sfx('ding', W('e3', 'часа'));
  hide('.h-m'); hide('.h-ham'); slideIn('.h-ham', tH + 0.3, 'down', 0.6, 300); tw('.h-m', tH + 0.5, 0.5, { y: [-300, 0], o: [0, 1] }, 'out'); sfx('thud', tH + 0.95, 0.6);
  idle('.h-m', t => ({ r: 6 * Math.sin(W2 * 12 * t) }));
  tw('.h-m', W('e4', 'точно') - 0.1, 0.5, { r: [0, -70], y: [0, 40] }, 'inOut');
  tw('#H .lid', W('e4', 'точно'), 0.4, { sy: [0, 0.6] }, 'out');
  tw('#H .armR', W('e4', 'нас') - 0.2, 0.3, { r: [0, -110] }, 'back');
  for (let k = 0; k < 3; k++) { const z = mk('#H', 'h-z', 'Z', `left:${700 + k * 40}px;top:${840 - k * 30}px`); hide(z); const tz = W('e4', 'точно') + 0.2 + k * 0.3; tw(z, tz, 1.0, { o: [0, 1], y: [0, -100], x: [0, 50], s: [0.5, 1.2] }, 'out'); tw(z, Math.min(tz + 1.0, tLoop), 0.3, { o: [1, 0] }, 'in'); }
  tw(['.h-hg', '.h-t1', '.h-t2', '.h-cnt', '.h-goal', '.h-ham', '.h-m'].map(s => $(s)), tLoop, 0.3, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop + 0.1);
}, { noCaption: ['hook'] });
