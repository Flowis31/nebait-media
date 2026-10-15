const HT = {}, SC = [];
const Wd = (k, s) => { const w = (WD[k] || []).find(w => w.d.toLowerCase().includes(s)); if (!w) console.warn('W miss', k, s); return w || { t0: L(k).t0, t1: L(k).t1 }; };
const W = (k, s) => Wd(k, s).t0, WE = (k, s) => Wd(k, s).t1;
const mk = (par, cls, html, css) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; if (css) d.style.cssText = css; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
const burst = (par, x, y, n, t, R = 320, cols = ['#b8ff3d', '#f4ecd9', '#ffe14d', '#ff3b5c']) => { for (let k = 0; k < n; k++) { const d = mk(par, 'cf', '', `left:${x}px;top:${y}px;background:${cols[k % cols.length]}`); const a = hash(k * 3.1 + x) * 6.283, r = R * (0.4 + 0.6 * hash(k + y)); tw(d, 0, 0.001, { o: [0, 0] }); tw(d, t, 0.7, { x: [0, Math.cos(a) * r], y: [0, Math.sin(a) * r], o: [1, 0], r: [0, 500 * hash(k)] }, 'out'); } };
const sweat = (par, x, y, n, t, gap = 0.25) => { for (let k = 0; k < n; k++) { const d = mk(par, 'drop', '', `left:${x + hash(k + x) * 200}px;top:${y}px`); tw(d, 0, 0.001, { o: [0, 0] }); tw(d, t + k * gap, 0.55, { x: [0, (hash(k) - .5) * 320], y: [0, 240 * hash(k + 5) - 80], o: [1, 0], s: [0.6, 1.2] }, 'out'); } };
const count = (el, t0, t1, N, fmt = v => v.toLocaleString('ru-RU')) => custom(t => { const p = Math.max(0, Math.min(1, (t - t0) / (t1 - t0))); el.textContent = fmt(Math.round(N * (1 - Math.pow(1 - p, 2.2)))); });
const typeIn = (el, word, t0, t1) => custom(t => { const p = Math.max(0, Math.min(1, (t - t0) / (t1 - t0))); el.textContent = word.slice(0, Math.round(p * word.length)); });
const capWord = (w, seed = 1) => [...w].map((c, i) => `<span class="cl" style="transform:rotate(${(hash(i + seed) * 36 - 18).toFixed(1)}deg) translateY(${(hash(i * 2 + seed) * 24 - 12).toFixed(0)}px) scale(${(0.9 + hash(i * 5 + seed) * 0.3).toFixed(2)})">${c}</span>`).join('');
const capHTML = (w, seed) => `<div class="capw fl">${capWord(w, seed)}</div><div class="capline"></div><div class="capin fl"><span class="typed"></span></div><div class="capb">reCAPTCHA</div>`;
const chkHTML = () => `<div class="cbx"><svg viewBox="0 0 100 100" style="left:0;top:0;width:100px;height:100px;overflow:visible"><path class="ck" pathLength="100" d="M20 52 L42 76 L84 22" fill="none" stroke="#2fae3f" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg></div><em>Я не робот</em><u>reCAPTCHA</u>`;
const icon = (n, cls, css) => `<div class="ic ${cls || ''}" data-ic="${n}" style="${css || ''}"></div>`;
const raise = (sc, t, d = 0.25) => { tw(sc + ' .armL', t, d, { r: [0, 120] }, 'back'); tw(sc + ' .armR', t, d, { r: [0, -120] }, 'back'); };
const sad = (sc, t) => tw(sc + ' .mouth', t, 0.2, { sy: [1, -1] });
const click = (par, x, y, t) => { const r = mk(par, 'ring', '', `left:${x - 60}px;top:${y - 60}px`); tw(r, 0, 0.001, { o: [0, 0] }); tw(r, t, 0.35, { s: [0.2, 1.4], o: [1, 0] }, 'out'); sfx('tick', t, 1.2); };

const chipIn = (sel, t, d = 0.62) => els(sel).forEach(el => { const b = el.getBoundingClientRect(), cx = b.left + b.width / 2; slideIn(el, t, Math.abs(cx - 540) < 60 ? 'down' : cx < 540 ? 'left' : 'right', d, 260); });
// S01 hook
HT.S01 = `<div class="a-t fl">ТЫ <b>БЕСПЛАТНО</b><br>РАБОТАЛ<br>НА GOOGLE</div><div class="cap paper a-cap">${capHTML('кривые', 3)}</div><div class="m a-m"></div><div class="a-q">?</div>`;
SC.push(() => {
  tw('#S01', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  punch('#S01 .a-t', W('hook', 'бесплатно')); sfx('blip', W('hook', 'бесплатно'));
  typeIn($('#S01 .typed'), 'кривые', W('hook', 'работал'), WE('hook', 'google'));
  for (let k = 0; k < 6; k++) sfx('tick', W('hook', 'работал') + k * 0.12, 0.8);
  for (let th = W('hook', 'работал'); th < L('hook').t1; th += 0.24) { tw('#S01 .armL', th, 0.12, { r: [0, 40] }); tw('#S01 .armL', th + 0.12, 0.12, { r: [40, 0] }); tw('#S01 .armR', th + 0.12, 0.12, { r: [0, -40] }); tw('#S01 .armR', th + 0.24, 0.12, { r: [-40, 0] }); }
  hide('#S01 .a-q'); hide('#A2 .a-q'); popIn('#S01 .a-q', W('h2', 'заметил')); sfx('pop', W('h2', 'заметил'));
  tw('#S01 .brL', W('h2', 'даже'), 0.2, { y: [0, -18] }, 'back'); tw('#S01 .brR', W('h2', 'даже'), 0.2, { y: [0, -18], r: [0, 8] }, 'back');
});
// S02 crooked letters = work
HT.S02 = `<div class="cap paper b-cap">${capHTML('кривые', 7)}</div><div class="chip p b-c1">ПРОВЕРКА</div><div class="b-sl"></div><div class="stR b-c2">РАБОТА</div><div class="chip b-tm">ОБЪЯСНЮ ЗА 2:00</div><div class="m b-m"></div>`;
SC.push(() => {
  idle('#S02 .capw', t => ({ r: 1.5 * Math.sin(t * 5), y: 4 * Math.sin(t * 7) }));
  punch('.b-cap', W('h3', 'кривые'), 0.06);
  typeIn($('#S02 .typed'), 'кривые', W('h3', 'надо'), WE('h3', 'вводить'));
  for (let k = 0; k < 6; k++) sfx('tick', W('h3', 'надо') + k * 0.16, 0.8);
  hide('.b-c1'); chipIn('.b-c1', W('h4', 'проверка') - 0.25); sfx('pop', W('h4', 'проверка') - 0.25);
  tw('.b-sl', W('h4', 'проверка'), 0.25, { sx: [0, 1] }, 'out5'); tw('.b-sl', 0, 0.001, { r: [-5, -5] }); sfx('zap', W('h4', 'проверка'), 0.6);
  hide('.b-c2'); stamp('.b-c2', W('h4', 'работа'), -5, 26); raise('#S02', W('h4', 'работа') + 0.15);
  hide('.b-tm'); chipIn('.b-tm', W('h5', 'объясню')); sfx('ding', W('h5', 'две')); punch('.b-tm', W('h5', 'две'));
});
// S03 reverse Turing test
HT.S03 = `<div class="lab">ТЕСТ ТЬЮРИНГА НАОБОРОТ</div><div class="rb c-rb"></div><div class="m c-m"></div>${icon('mag', 'c-mag')}<div class="chip p c-k1">МАШИНА</div><div class="chip c-k2">ПРОВЕРЯЕТ</div><div class="chip p c-k3">ЧЕЛОВЕКА</div>`;
SC.push(() => {
  const t0 = L('a0').t0;
  tw('.c-rb', t0 - 0.1, 0.5, { x: [-500, 0] }, 'out5'); tw('.c-m', t0 - 0.1, 0.5, { x: [500, 0] }, 'out5');
  hide('.c-mag'); popIn('.c-mag', W('a0', 'тест')); tw('#S03 .rarmR', W('a0', 'тест'), 0.3, { r: [0, -60] }, 'back');
  for (let th = W('a0', 'наоборот'), k = 0; th < L('a0').t1 + 0.2; th += 0.5, k++) tw('.c-mag', th, 0.5, { x: k % 2 ? [220, 60] : [60, 220], y: k % 2 ? [40, -20] : [-20, 40] }, 'inOut');
  ['.c-k1', '.c-k2', '.c-k3'].forEach((s, i) => { hide(s); const t = [W('a0', 'машина'), W('a0', 'проверяет'), W('a0', 'человека')][i]; chipIn(s, t); sfx('whoosh', t - 0.05, 0.5); });
  sweat('#S03', 700, 560, 6, W('a0', 'машина')); sad('#S03', W('a0', 'проверяет'));
  idle('#S03 .reye', t => ({ x: 6 * Math.sin(t * 6) }));
});
// S04 2007, the idea
HT.S04 = `<div class="yr">2007</div><div class="chip p d-chip">reCAPTCHA</div>${icon('bulb', 'd-bulb')}<div class="m d-m"></div><div class="stR d-n">НЕМНОГО НАГЛАЯ</div><div class="note">Carnegie Mellon University</div>`;
SC.push(() => {
  const t0 = L('a1').t0; tw('.yr', 0, 0.001, { s: [1, 1] });
  tw('#S04 .yr', t0, 0.4, { s: [2.2, 1], o: [0, 1] }, 'out5'); sfx('thud', t0 + 0.1);
  hide('.d-chip'); chipIn('.d-chip', W('a1', 'рекапча')); sfx('ding', W('a1', 'рекапча'));
  hide('.d-bulb'); tw('.d-bulb', W('a1b', 'гениальная'), 0.3, { s: [0.2, 1], o: [0, 1], r: [-30, 0] }, 'back'); sfx('blip', W('a1b', 'гениальная'));
  burst('#S04', 527, 850, 12, W('a1b', 'гениальная') + 0.1, 260, ['#ffe14d', '#fff3a8']);
  idle('.d-bulb', t => ({ s: 1 + 0.05 * Math.sin(t * 10) }));
  tw('.d-m', t0 + 0.3, 0.4, { x: [-420, 0] }, 'out5'); tw('#S04 .brR', W('a1b', 'наглая'), 0.2, { r: [0, -14], y: [0, 10] }, 'back'); tw('#S04 .brL', W('a1b', 'наглая'), 0.2, { y: [0, -16] }, 'back');
  hide('.d-n'); stamp('.d-n', W('a1b', 'наглая'), -4, 16);
});
// S05 two words
HT.S05 = `<div class="lab">ДВА СЛОВА</div><div class="paper e-c1"><div class="e-w">утро</div></div><div class="paper e-c2"><div class="e-w fl">${capWord('вѣсти', 4)}</div></div><div class="e-b1">✓</div><div class="e-b2">?</div><div class="chip e-k1">СИСТЕМА ЗНАЕТ</div><div class="chip r e-k2">НИКТО НЕ ЗНАЕТ</div><div class="m e-m"></div>`;
SC.push(() => {
  const t0 = L('a2').t0 + 0.1;
  tw('.e-c1', t0 - 0.2, 0.45, { x: [-600, 0], r: [-12, -2] }, 'out5'); tw('.e-c2', t0, 0.45, { x: [600, 0], r: [12, 2] }, 'out5'); sfx('whoosh', t0 - 0.2, 0.6); sfx('whoosh', t0, 0.6);
  hide('.e-b1'); popIn('.e-b1', W('a3', 'знает')); sfx('ding', W('a3', 'знает')); hide('.e-k1'); chipIn('.e-k1', W('a3', 'система'));
  punch('.e-c1', W('a3', 'проверка'), 0.08);
  hide('.e-b2'); popIn('.e-b2', WE('a3', 'проверка') - 0.2); hide('.e-k2'); chipIn('.e-k2', WE('a3', 'проверка') - 0.1); sfx('buzz', WE('a3', 'проверка') - 0.2, 0.5);
  idle('.e-b2', t => ({ r: 8 * Math.sin(t * 9) }));
  tw('#S05 .pup', W('a3', 'первое'), 0.2, { x: [0, -14] }); tw('#S05 .pup', WE('a3', 'проверка') - 0.2, 0.2, { x: [-14, 14] });
  tw('#S05 .armL', W('a3', 'первое'), 0.25, { r: [0, 70] }, 'back');
});
// S06 newspaper word gets digitized
HT.S06 = `<div class="paper f-np"><div class="f-h">СТАРАЯ ГАЗЕТА</div>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(k => k === 4 || k === 5 ? '' : `<div class="f-bar" style="top:${110 + k * 46}px;width:${380 + hash(k) * 80}px"></div>`).join('')}<div class="f-w fl">${capWord('вѣсти', 4)}</div></div><div class="rb f-rb"></div><div class="f-bub">???</div><div class="f-in fl"><span class="typed"></span></div><div class="f-fly fl">${capWord('вѣсти', 4)}</div><div class="chip f-ok">ОЦИФРОВАНО</div><div class="f-p1">+1</div><div class="m f-m"></div>`;
SC.push(() => {
  const t0 = L('a4').t0;
  tw('.f-np', t0 - 0.1, 0.5, { y: [-900, 0], r: [-14, -4] }, 'out5'); punch('.f-w', W('a4', 'газеты'), 0.1);
  tw('.f-rb', W('a4', 'компьютер') - 0.2, 0.4, { x: [500, 0] }, 'out5'); hide('.f-bub'); popIn('.f-bub', W('a4', 'не')); sfx('buzz', W('a4', 'смог'), 0.6);
  idle('.f-bub', t => ({ r: 5 * Math.sin(t * 11) })); tw('#S06 .rant', W('a4', 'смог'), 0.2, { o: [1, 0.2] });
  const tf = W('a5', 'вводишь');
  hide('.f-in'); popIn('.f-in', L('a5').t0); hide('.f-fly');
  tw('.f-fly', tf, 0.5, { x: [-220, 0], y: [-405, 0], o: [1, 1], s: [1, 0.9] }, 'inOut'); tw('.f-fly', tf + 0.5, 0.15, { o: [1, 0] }); sfx('whoosh', tf, 0.7);
  typeIn($('#S06 .typed'), 'вести', tf + 0.45, tf + 0.95);
  for (let th = tf; th < tf + 1; th += 0.2) { tw('#S06 .armR', th, 0.1, { r: [0, -50] }); tw('#S06 .armR', th + 0.1, 0.1, { r: [-50, 0] }); sfx('tick', th + 0.45, 0.7); }
  hide('.f-ok'); chipIn('.f-ok', W('a5', 'оцифровано')); sfx('ding', W('a5', 'оцифровано'));
  hide('.f-p1'); tw('.f-p1', W('a5', 'оцифровано') + 0.1, 0.6, { y: [40, -80], o: [1, 0] }, 'out');
  tw('.f-w', tf + 0.5, 0.3, { o: [1, 0.25] });
});
// S07 unpaid intern
HT.S07 = `<div class="g-t">АРХИВ</div><div class="g-desk"></div><div class="m g-m"></div><div class="g-bdg">СТАЖЁР</div><div class="paper g-pay"><em>ЗАРПЛАТА</em><b>0</b></div>`;
SC.push(() => {
  const t0 = L('j1').t0;
  for (let c = 0; c < 2; c++) for (let k = 0; k < 9; k++) { const d = mk('#S07', 'g-sh', '', `left:${c ? 770 + hash(k + 20) * 20 : 50 + hash(k) * 20}px;top:${1160 - k * 34}px`); tw(d, t0 - 0.1 + k * 0.05 + c * 0.1, 0.25, { y: [-900, 0] }, 'in'); if (k % 3 === 0) sfx('thud', t0 + 0.15 + k * 0.05 + c * 0.1, 0.5); }
  tw('.g-m', t0, 0.4, { y: [500, 0], o: [0, 1] }, 'out5');
  hide('.g-bdg'); tw('.g-bdg', W('j1', 'стажёр'), 0.3, { s: [2.4, 1], o: [0, 1], r: [20, -6] }, 'in'); sfx('pop', W('j1', 'стажёр') + 0.25); raise('#S07', W('j1', 'архиве'));
  const tp = L('j1b').t0; hide('.g-pay');
  tw('.g-pay', tp, 0.22, { y: [-900, 0], o: [1, 1], r: [-20, 4] }, 'in'); shake(tp + 0.22, 0.35, 24); sfx('slam', tp + 0.2, 1.1);
  sad('#S07', tp + 0.25); tw('#S07 .armL', tp + 0.25, 0.2, { r: [120, 0] }); tw('#S07 .armR', tp + 0.25, 0.2, { r: [-120, 0] });
  punch('.g-pay b', W('j1b', 'зарплаты'), 0.2);
});
// S08 archive digitized, 100M a day
HT.S08 = `<div class="lab">АРХИВ THE NEW YORK TIMES · КНИГИ</div>${[0, 1, 2].map(r => `<div class="h-board" style="top:${440 + r * 150}px"></div>`).join('')}<div class="h-n">0</div><div class="h-s">капч в день · к 2010 году</div><div class="stR h-st">ОПЛАТА: 0</div><div class="m h-m"></div><div class="note">источник: Википедия, статья reCAPTCHA</div>`;
SC.push(() => {
  const t0 = W('a6', 'перевели'), t1 = WE('a6', 'книг'), cols = ['#c9553a', '#e09a3a', '#6fd3ff', '#b8ff3d', '#d9c7f0', '#f4ecd9'];
  let n = 0; for (let r = 0; r < 3; r++) { let x = 130; for (let k = 0; k < 11 && x < 900; k++, n++) { const w = 54 + hash(n) * 30, h = 96 + hash(n + 7) * 36; const d = mk('#S08', 'h-bk', '', `left:${x}px;top:${440 + r * 150 - h}px;width:${w}px;height:${h}px;background:${cols[n % 6]}`); const t = t0 + (t1 - t0) * n / 33; tw(d, t, 0.22, { sy: [0, 1] }, 'back'); if (n % 3 === 0) sfx('tick', t, 0.6); x += w + 12; } }
  hide('.h-n'); hide('.h-s'); tw('.h-n', L('a7').t0, 0.2, { o: [0, 1] }); tw('.h-s', L('a7').t0 + 0.1, 0.3, { o: [0, 1] });
  count($('.h-n'), W('a7', '100'), WE('a7', 'день'), 100000000); sfx('riser', W('a7', '100'), 0.7); punch('.h-n', WE('a7', 'день'), 0.1); sfx('boom', WE('a7', 'день'), 0.7);
  hide('.h-st'); stamp('.h-st', W('a8', 'бесплатный'), -5, 22);
  tw('.h-m', L('a7').t0, 0.4, { x: [400, 0] }, 'out5'); sad('#S08', W('a8', 'бесплатный') + 0.2);
  hide('#S08 .note'); slideIn('#S08 .note', L('a7').t0 + 0.3, 'down', 0.6, 140);
});
// S09 Google buys it
HT.S09 = `<div class="yr">2009</div><div class="chip p i-rc">reCAPTCHA</div><div class="paper i-g">Google</div><div class="stR i-st">КУПЛЕНО</div><div class="m i-m"></div>`;
SC.push(() => {
  const t0 = L('b1').t0; tw('#S09 .yr', t0, 0.4, { s: [2.2, 1], o: [0, 1] }, 'out5'); sfx('thud', t0 + 0.1);
  hide('.i-rc'); chipIn('.i-rc', W('b1', 'рекапчу')); tw('.i-g', W('b1', 'рекапчу'), 0.4, { x: [600, 0] }, 'out5');
  const tb = W('b1', 'покупает'); tw('.i-rc', tb, 0.35, { x: [0, 500], s: [1, 0.3] }, 'in'); tw('.i-rc', tb + 0.3, 0.08, { o: [1, 0] }); punch('.i-g', tb + 0.35, 0.16); sfx('coin', tb + 0.35, 1.3);
  burst('#S09', 790, 690, 12, tb + 0.35, 300, ['#ffe14d', '#ffc83d']);
  hide('.i-st'); stamp('.i-st', W('b1', 'google'), -5, 20); tw('#S09 .armR', tb, 0.25, { r: [0, -130] }, 'back');
  for (let th = tb + 0.3; th < L('b1').t1 + 0.4; th += 0.3) { tw('#S09 .armR', th, 0.15, { r: [-130, -100] }); tw('#S09 .armR', th + 0.15, 0.15, { r: [-100, -130] }); }
});
// S10 words out, pictures in
const JT = ['house', 'light', 'cross', 'light', 'house', 'cross', 'cross', 'light', 'house'];
HT.S10 = `<div class="lab">ВЫБЕРИ ВСЕ КВАДРАТЫ</div>${[0, 1, 2].map(k => `<div class="chip p j-w j-w${k}" style="left:240px;top:${440 + k * 170}px">${['слово', 'буквы', 'текст'][k]}</div>`).join('')}${JT.map((n, k) => `<div class="tile j-t j-${n}" style="left:${150 + (k % 3) * 265}px;top:${330 + Math.floor(k / 3) * 265}px">${icon(n)}<div class="tsel"></div><div class="tck">✓</div></div>`).join('')}`;
SC.push(() => {
  const t0 = W('b2', 'закончились'); hide('#S10 .lab');
  [0, 1, 2].forEach(k => { tw('.j-w' + k, t0 + k * 0.08, 0.5, { y: [0, 1900], r: [0, (k - 1) * 40 + 15] }, 'in'); }); sfx('whoosh', t0, 0.6);
  const t1 = W('b2', 'начались'); tw('#S10 .lab', t1, 0.3, { o: [0, 1] });
  $$('.j-t').forEach((el, k) => { tw(el, t1 + k * 0.06, 0.3, { s: [0.2, 1], o: [0, 1] }, 'back'); if (k % 2 === 0) sfx('pop', t1 + k * 0.06, 0.7); });
  hide('#S10 .tsel'); hide('#S10 .tck');
  [['house', W('b3', 'номера')], ['light', W('b3', 'светофоры')], ['cross', W('b3', 'переходы')]].forEach(([n, t]) => $$('.j-' + n).forEach((el, k) => { const tt = t + k * 0.12; tw($('.tsel', el), tt, 0.12, { o: [0, 1] }); popIn($('.tck', el), tt, 0.25); punch(el, tt, 0.06); sfx('tick', tt, 1.1); }));
});
// S11 every click trains the algorithm
const NN = [[60, [130, 300, 470]], [290, [70, 220, 380, 530]], [520, [200, 400]]];
HT.S11 = `<div class="lab">КАЖДЫЙ КЛИК = УРОК</div><div class="tile k-tile">${icon('house')}</div><div class="m k-m"></div><svg class="k-net" viewBox="0 0 580 600">${NN.slice(0, 2).map((la, i) => la[1].map(y1 => NN[i + 1][1].map(y2 => `<path class="k-ln" pathLength="100" d="M${la[0]} ${y1} L${NN[i + 1][0]} ${y2}" stroke="#74c81c" stroke-width="7" fill="none"/>`).join('')).join('')).join('')}${NN.map(la => la[1].map(y => `<circle class="k-nd" cx="${la[0]}" cy="${y}" r="34" fill="#0c1a12" stroke="#f4ecd9" stroke-width="9"/>`).join('')).join('')}</svg><div class="k-bar"><div class="k-fill"></div></div><div class="k-l">АЛГОРИТМ УЧИТСЯ РАСПОЗНАВАТЬ</div>`;
SC.push(() => {
  const t0 = W('b4', 'каждый'), t1 = WE('b4', 'картинки'), lines = $$('.k-ln'), nodes = $$('.k-nd');
  tw('#S11 .armR', t0 - 0.1, 0.001, { r: [-150, -150] });
  for (let k = 0; k < 5; k++) { const t = t0 + (t1 - t0) * k / 5.2; click('#S11', 235, 525, t); tw('#S11 .armR', t - 0.08, 0.08, { r: [-150, -120] }); tw('#S11 .armR', t, 0.12, { r: [-120, -150] }); punch('.k-tile', t, 0.05);
    const d = mk('#S11', 'k-dot'); tw(d, 0, 0.001, { o: [0, 0] }); tw(d, t, 0.4, { x: [0, 150], y: [0, (k - 2) * 60], o: [1, 1] }, 'out'); tw(d, t + 0.4, 0.1, { o: [1, 0] }); }
  lines.forEach((p, i) => tw(p, t0 + (t1 - t0) * i / lines.length * 0.9, 0.3, { dash: [100, 0] }));
  custom(t => nodes.forEach((n, i) => { const on = t > t0 + (t1 - t0) * (i + 1) / nodes.length; n.setAttribute('fill', on ? '#b8ff3d' : '#0c1a12'); }));
  tw('.k-fill', t0, t1 - t0, { sx: [0.02, 1] }, 'lin'); punch('.k-bar', t1, 0.06); sfx('ding', t1); sfx('riser', t0 + 0.4, 0.5);
});
// S12 second job joke
HT.S12 = `${icon('light', 'l-tl')}<div class="m l-m"></div>${icon('mag', 'l-mag')}<div class="paper l-sign"><em>ВАКАНСИЯ</em><i>разметчик картинок</i><b>зарплата: 0</b></div><div class="stR l-b">РАБОТА №2</div>`;
SC.push(() => {
  const t0 = L('j2').t0; tw('#S12 .armR', t0, 0.001, { r: [-80, -80] });
  tw('.l-mag', t0, L('j2').t1 - t0, { x: [-60, 150], y: [40, -160] }, 'inOut'); tw('#S12 .pup', t0, 0.3, { x: [0, 14], y: [0, -10] });
  idle('.l-tl', t => ({ s: 1 + 0.02 * Math.sin(t * 12) })); sfx('blip', W('j2', 'светофор'));
  const ts = L('j2b').t0 + 0.05; hide('.l-sign');
  tw('.l-sign', ts, 0.25, { y: [-900, 0], o: [1, 1], r: [0, 0] }, 'in'); tw('.l-sign', ts + 0.25, 0.5, { r: [7, 0] }, 'elastic'); sfx('slam', ts + 0.22, 0.9); shake(ts + 0.25, 0.3, 18);
  tw('.l-mag', ts + 0.2, 0.5, { y: [-160, 1700], r: [0, 160] }, 'in'); tw('#S12 .brL', ts + 0.25, 0.15, { y: [0, -20] }, 'back'); tw('#S12 .brR', ts + 0.25, 0.15, { y: [0, -20] }, 'back'); sad('#S12', ts + 0.3);
  hide('.l-b'); stamp('.l-b', W('j2b', 'работу'), -5, 22);
});
// S13 the twist: AI reads the letters
HT.S13 = `<div class="m-pv">ПОВОРОТ</div><div class="yr m-yr">2014</div><div class="chip p m-g">GOOGLE ПРИЗНАЁТ</div><div class="rb m-rb"></div><div class="m-capw"><div class="cap paper">${capHTML('кривые', 7)}</div></div><div class="m-scan"></div><div class="m-n">0%</div><div class="m-s">точность машины</div><div class="note">Google Security Blog · 3 декабря 2014</div>`;
SC.push(() => {
  const t0 = L('c1').t0; tw('.m-pv', t0, 0.35, { r: [-200, -4], s: [0.2, 1], o: [0, 1] }, 'back'); shake(t0 + 0.3, 0.3, 22); sfx('boom', t0 + 0.25, 0.8);
  const t2 = L('c2').t0; tw('.m-pv', t2 - 0.15, 0.15, { o: [1, 0] }); hide('#S13 .yr'); tw('#S13 .yr', t2, 0.4, { s: [2.2, 1], o: [0, 1] }, 'out5'); sfx('thud', t2 + 0.1);
  hide('.m-g'); chipIn('.m-g', W('c2', 'google')); sfx('pop', W('c2', 'google'));
  const t3 = L('c3').t0; hide('.m-capw'); hide('.m-scan'); hide('.m-n'); hide('.m-s'); hide('#S13 .note');
  tw('.m-rb', t2 + 0.3, 0.4, { x: [-500, 0] }, 'out5'); tw('.m-capw', t3 - 0.1, 0.4, { x: [700, 0], o: [1, 1] }, 'out5');
  const s0 = W('c3', 'читает'), s1 = WE('c3', 'буквы'); tw('.m-scan', s0, 0.1, { o: [0, 1] }); tw('.m-scan', s0, s1 - s0, { x: [0, 560] }, 'inOut'); tw('.m-scan', s1, 0.15, { o: [1, 0] }); sfx('riser', s0, 0.6);
  typeIn($('#S13 .typed'), 'кривые', s0 + 0.1, s1); idle('#S13 .reye', t => ({ x: 8 * Math.sin(t * 14) }));
  const n0 = W('c3', 'точностью'), n1 = WE('c3', '99'); tw('.m-n', n0, 0.2, { o: [0, 1] }); tw('.m-s', n0, 0.3, { o: [0, 1] }); slideIn('#S13 .note', n0 + 0.3, 'down', 0.6, 140);
  count($('.m-n'), n0, n1 - 0.3, 998, v => (v / 10).toFixed(1).replace('.', ',') + '%'); for (let k = 0; k < 8; k++) sfx('tick', n0 + (n1 - n0 - 0.3) * k / 8, 0.7);
  punch('.m-n', n1 - 0.3, 0.14); sfx('boom', n1 - 0.3, 0.7); tw('#S13 .rarmL', n1 - 0.3, 0.25, { r: [0, 120] }, 'back'); tw('#S13 .rarmR', n1 - 0.3, 0.25, { r: [0, -120] }, 'back');
});
// S14 the student beat the teacher
HT.S14 = `<div class="rb n-rb"></div>${icon('cap', 'n-cap')}<div class="m n-m"></div><div class="chip n-l1">УЧЕНИК</div><div class="chip p n-l2">УЧИТЕЛЬ</div>`;
SC.push(() => {
  const t0 = L('c4').t0; tw('.n-rb', t0, 0.5, { y: [260, 0], s: [0.7, 1] }, 'back'); hide('.n-l1'); hide('.n-l2'); chipIn('.n-l1', W('c4', 'ученик')); chipIn('.n-l2', W('c4', 'учителя')); sfx('pop', W('c4', 'ученик')); sfx('pop', W('c4', 'учителя'));
  const tc = W('c4', 'превзошёл'); hide('.n-cap'); tw('.n-cap', tc, 0.25, { y: [-600, 0], o: [1, 1], r: [-30, -8] }, 'in'); sfx('thud', tc + 0.22); punch('.n-rb', tc + 0.25, 0.06);
  burst('#S14', 740, 560, 16, tc + 0.25, 360); tw('.n-m', tc, 0.4, { s: [1, 0.78] }, 'out'); sad('#S14', tc + 0.1); tw('#S14 .brL', tc, 0.2, { r: [0, 14] }); tw('#S14 .brR', tc, 0.2, { r: [0, -6], y: [0, 6] });
  tw('#S14 .rarmL', tc + 0.25, 0.25, { r: [0, 120] }, 'back'); tw('#S14 .rarmR', tc + 0.25, 0.25, { r: [0, -120] }, 'back');
});
// S15 the checkbox watches behaviour
HT.S15 = `<div class="chk paper o-chk">${chkHTML()}</div>${icon('cursor', 'o-cur')}<div class="o-x">×</div>${icon('eye', 'o-eye')}<div class="o-ln"></div>${[0, 1, 2].map(k => `<div class="o-n o-n${k}" style="left:${150 + k * 330}px"></div><div class="o-t o-t${k}" style="left:${50 + k * 330}px">${['ДО', 'ВО ВРЕМЯ', 'ПОСЛЕ'][k]}</div>`).join('')}<div class="m o-m"></div>`;
SC.push(() => {
  const t0 = L('c5').t0, tk = W('c5', 'галочка');
  tw('.o-chk', t0 - 0.1, 0.4, { y: [-600, 0] }, 'out5'); tw('.o-cur', t0, tk - t0, { x: [640, 0], y: [520, 0] }, 'inOut');
  click('#S15', 256, 400, tk + 0.1); tw('.o-cur', tk + 0.05, 0.08, { s: [1, 0.8] }); tw('.o-cur', tk + 0.13, 0.15, { s: [0.8, 1] }, 'back');
  tw('#S15 .ck', W('c5', '«я'), 0.3, { dash: [100, 0] }); sfx('ding', W('c5', '«я') + 0.1);
  hide('.o-x'); const tx = W('c6', 'не'); popIn('.o-x', tx, 0.2); sfx('buzz', tx, 0.5); tw('.o-cur', WE('c6', 'клик') - 0.2, 0.4, { y: [0, 1500], r: [0, 60] }, 'in'); tw('.o-x', WE('c6', 'клик') - 0.1, 0.15, { o: [1, 0] });
  hide('.o-eye'); const te = W('c7', 'смотрит'); tw('.o-eye', te, 0.3, { s: [0.2, 1], o: [0, 1] }, 'back'); sfx('blip', te);
  tw('.o-ln', W('c7', 'что'), 0.5, { sx: [0, 1] }, 'out');
  const ts = [W('c7', 'до'), W('c7', 'во'), W('c7', 'после')];
  [0, 1, 2].forEach(k => { hide('.o-n' + k); hide('.o-t' + k); popIn('.o-n' + k, ts[k] - 0.05, 0.25); tw('.o-t' + k, ts[k], 0.2, { o: [0, 1] }); sfx('pop', ts[k]); const el = $('.o-n' + k); custom(t => { el.style.background = t >= ts[k] + 0.1 ? '#b8ff3d' : '#f4ecd9'; }); });
  tw('.o-eye', ts[0] - 0.2, 0.2, { x: [0, -330] }, 'inOut'); tw('.o-eye', ts[1] - 0.2, 0.2, { x: [-330, 0] }, 'inOut'); tw('.o-eye', ts[2] - 0.2, 0.2, { x: [0, 330] }, 'inOut');
  tw('#S15 .pup', ts[0] - 0.2, 0.2, { x: [0, -12], y: [0, -10] }); tw('#S15 .pup', ts[1] - 0.2, 0.2, { x: [-12, 0] }); tw('#S15 .pup', ts[2] - 0.2, 0.2, { x: [0, 12] });
  tw('.o-m', te - 0.2, 0.4, { y: [400, 0], o: [0, 1] }, 'out5');
});
// S16 cats and turkeys
const PT = ['cat', 'turkey', 'cat', 'turkey', 'cat', 'turkey'];
HT.S16 = `<div class="lab">НАЙДИ КОТИКОВ. ИЛИ ИНДЕЕК</div>${PT.map((n, k) => `<div class="tile p-t p-${n}" style="left:${150 + (k % 3) * 265}px;top:${380 + Math.floor(k / 3) * 265}px">${icon(n)}<div class="tsel"></div><div class="tck">✓</div></div>`).join('')}<div class="m p-m"></div><div class="note p-note">пример из блога Google, 2014</div>`;
SC.push(() => {
  const t0 = L('c7b').t0; $$('.p-t').forEach((el, k) => { tw(el, t0 + k * 0.06, 0.3, { s: [0.2, 1], o: [0, 1] }, 'back'); if (k % 2 === 0) sfx('pop', t0 + k * 0.06, 0.7); });
  hide('#S16 .tsel'); hide('#S16 .tck');
  [['cat', W('c7b', 'котиков')], ['turkey', W('c7b', 'индеек')]].forEach(([n, t]) => $$('.p-' + n).forEach((el, k) => { const tt = t + k * 0.12; tw($('.tsel', el), tt, 0.12, { o: [0, 1] }); popIn($('.tck', el), tt, 0.25); punch(el, tt, 0.06); sfx('tick', tt, 1.1); }));
  $$('.p-turkey').forEach((el, k) => idle(el, t => t > W('c7b', 'или') - 0.2 && t < W('c7b', 'индеек') ? { r: 5 * Math.sin(t * 30 + k) } : {}));
  tw('#S16 .armL', W('c7b', 'котиков'), 0.25, { r: [0, 130] }, 'back'); tw('#S16 .armR', W('c7b', 'индеек'), 0.25, { r: [0, -130] }, 'back');
  sweat('#S16', 420, 980, 4, L('c7b').t0, 0.2);
});
// S17 cookies and browser history
HT.S17 = `<div class="m q-m"></div>${icon('eye', 'q-eye')}<div class="paper q-card"><em>ДОКАЗАТЕЛЬСТВО, ЧТО ТЫ ЧЕЛОВЕК</em>${[0, 1, 2, 3, 4].map(k => `<div class="q-row q-row${k}" style="top:${110 + k * 82}px">${icon('clock')}<u style="width:${380 + hash(k + 3) * 200}px"></u></div>`).join('')}</div><div class="stG q-st">ЧЕЛОВЕК</div>`;
SC.push(() => {
  const t0 = L('c8').t0; tw('.q-eye', t0, 0.3, { s: [0.2, 1], o: [0, 1] }, 'back');
  for (let k = 0; k < 6; k++) { const d = mk('#S17', 'ic q-ck', ic('cookie')); const t = W('c8', 'заодно') + k * 0.13; tw(d, 0, 0.001, { o: [0, 0] }); tw(d, t, 0.5, { x: [0, 520], y: [80 * Math.sin(k), -20], o: [1, 1], r: [0, 360], s: [1, 0.5] }, 'inOut'); tw(d, t + 0.5, 0.08, { o: [1, 0] }); sfx('pop', t, 0.6); }
  punch('.q-eye', W('c8', 'куки'), 0.14); tw('#S17 .armR', W('c8', 'заодно'), 0.25, { r: [0, -90] }, 'back'); sad('#S17', W('c8', 'куки'));
  const t1 = L('j3').t0; tw('.q-card', t1 - 0.1, 0.45, { y: [900, 0], o: [0, 1] }, 'out5'); sfx('whoosh', t1 - 0.1, 0.6);
  const t2 = L('j3b').t0; [0, 1, 2, 3, 4].forEach(k => { hide('.q-row' + k); tw('.q-row' + k, t2 + k * 0.14, 0.2, { o: [0, 1], x: [-60, 0] }); sfx('tick', t2 + k * 0.14, 0.8); });
  hide('.q-st'); stamp('.q-st', WE('j3b', 'браузера') - 0.15, -6, 22);
});
// S18 captcha disappears: invisible score
HT.S18 = `<div class="chk paper r-chk">${chkHTML()}</div><div class="chip p r-v3">reCAPTCHA v3</div><div class="m r-m"></div><svg class="r-g" viewBox="0 0 700 420"><path class="r-arc" pathLength="100" d="M50 360 A300 300 0 0 1 350 60" fill="none" stroke="#ff3b5c" stroke-width="30" stroke-linecap="round"/><path class="r-arc" pathLength="100" d="M350 60 A300 300 0 0 1 650 360" fill="none" stroke="#b8ff3d" stroke-width="30" stroke-linecap="round"/><g class="r-thr"><line x1="350" y1="20" x2="350" y2="100" stroke="#f4ecd9" stroke-width="12" stroke-linecap="round"/><text x="350" y="0" font-family="JB" font-weight="800" font-size="44" text-anchor="middle" fill="#f4ecd9">0,5</text></g><text class="r-tx" x="50" y="418" font-family="JB" font-weight="800" font-size="44" text-anchor="middle" fill="#f4ecd9">0,0</text><text class="r-tx" x="650" y="418" font-family="JB" font-weight="800" font-size="44" text-anchor="middle" fill="#f4ecd9">1,0</text><g class="r-nd" style="transform-origin:350px 360px"><line x1="350" y1="360" x2="350" y2="110" stroke="#f4ecd9" stroke-width="16" stroke-linecap="round"/><circle cx="350" cy="360" r="28" fill="#f4ecd9" stroke="#0a130d" stroke-width="8"/></g></svg><div class="r-n">0,5</div><div class="chip r-h">ЧЕЛОВЕК</div><div class="chip r r-b">БОТ</div><div class="stR r-s">ПОДОЗРИТЕЛЬНЫЙ</div>`;
SC.push(() => {
  const td = W('d1', 'исчезает'); tw('#S18 .ck', 0, 0.001, { dash: [0, 0] });
  tw('.r-chk', td, 0.35, { s: [1, 0.3], o: [1, 0], r: [0, 12] }, 'in'); burst('#S18', 527, 390, 18, td + 0.2, 420, ['#f4ecd9', '#b9b3a3', '#ffffff']); sfx('glitch', td, 1); sfx('pop', td + 0.3);
  hide('.r-v3'); chipIn('.r-v3', W('d2', 'третья')); sfx('pop', W('d2', 'третья'));
  hide('.r-g'); hide('.r-n'); hide('.r-thr'); const tg = W('d2', 'версия') + 0.3; tw('.r-g', tg - 0.3, 0.2, { o: [0, 1] }); tw('.r-n', tg, 0.2, { o: [0, 1] });
  $$('.r-arc').forEach((p, i) => tw(p, tg - 0.3 + i * 0.2, 0.3, { dash: [100, 0] }));
  const K = [[0, .5], [W('d2', 'от'), .5], [WE('d2', 'нуля'), 0], [W('d2', 'до') + 0.1, 0], [WE('d2', 'единицы'), 1], [W('d3', 'ноль') - 0.05, 1], [W('d3', 'ноль') + 0.3, 0], [W('d4', '0,5') - 0.1, 0], [W('d4', '0,5') + 0.25, .5], [W('d4', 'ниже'), .5], [W('d4', 'ниже') + 0.3, .3], [999, .3]];
  const nd = $('.r-nd'), nn = $('.r-n');
  custom(t => { let i = 0; while (K[i + 1][0] <= t) i++; const [ta, va] = K[i], [tb, vb] = K[i + 1], v = va + (vb - va) * E.inOut(Math.max(0, Math.min(1, (t - ta) / (tb - ta)))); const j = t > W('d4', 'ниже') + 0.3 ? 0.012 * Math.sin(t * 40) : 0; nd.style.transform = `rotate(${((v + j) - .5) * 180}deg)`; nn.textContent = v.toFixed(1).replace('.', ','); nn.style.color = v >= .5 ? '#b8ff3d' : '#ff3b5c'; });
  sfx('riser', W('d2', 'от'), 0.6); sfx('ding', WE('d2', 'единицы'));
  hide('.r-h'); hide('.r-b'); chipIn('.r-h', W('d3', 'человек')); sfx('pop', W('d3', 'человек')); chipIn('.r-b', W('d3', 'бот')); sfx('buzz', W('d3', 'бот'), 0.6);
  const t4 = L('d4').t0; tw('.r-h', t4, 0.2, { o: [1, 0] }); tw('.r-b', t4, 0.2, { o: [1, 0] }); tw('.r-thr', W('d4', 'порог'), 0.2, { o: [0, 1] }); sfx('tick', W('d4', 'порог'), 1.2);
  hide('.r-s'); stamp('.r-s', W('d4', 'подозрительный'), -4, 22); sweat('#S18', 830, 260, 5, W('d4', 'ниже'), 0.2); sad('#S18', W('d4', 'ниже'));
});
// S19 exam you don't know about
HT.S19 = `<div class="lab">ЭКЗАМЕН НА ЧЕЛОВЕКА</div><div class="m s-m"></div><div class="s-leg" style="left:200px"></div><div class="s-leg" style="left:850px"></div><div class="s-desk"></div><div class="paper s-sh"><em>ЭКЗАМЕН</em>${[0, 1, 2, 3].map(k => `<u style="top:${110 + k * 50}px;width:${200 + hash(k + 8) * 110}px"></u>`).join('')}</div><div class="s-gr">0,7</div><div class="s-q" style="left:150px;top:560px">?</div><div class="s-q" style="left:60px;top:800px">?</div><div class="s-q" style="left:300px;top:400px">?</div>`;
SC.push(() => {
  const t0 = L('j4').t0; tw('.s-sh', t0, 0.4, { x: [700, 0], r: [30, 6] }, 'out5'); sfx('whoosh', t0, 0.6);
  hide('.s-gr'); stamp('.s-gr', W('j4', 'экзамен'), -12, 18);
  $$('.s-q').forEach((q, k) => { hide(q); const t = W('j4b', 'не') + k * 0.15; tw(q, t, 0.3, { s: [0.2, 1], o: [0, 1], r: [-30, (k - 1) * 14] }, 'back'); sfx('pop', t, 0.8); idle(q, tt => ({ y: 8 * Math.sin(tt * 6 + k) })); });
  tw('#S19 .brL', W('j4b', 'не'), 0.2, { y: [0, -18] }, 'back'); tw('#S19 .brR', W('j4b', 'не'), 0.2, { y: [0, -18], r: [0, 8] }, 'back');
  tw('#S19 .pup', W('j4b', 'знаешь'), 0.2, { x: [0, -12], y: [0, -10] }); tw('#S19 .pup', W('j4b', 'знаешь') + 0.3, 0.2, { x: [-12, 14] });
});
// S20 the study: humans vs bots
HT.S20 = `<div class="t-g">ГЛАВНОЕ</div><div class="yr t-yr">2023</div><div class="m t-m"></div><div class="rb t-rb"></div><div class="t-vs">VS</div><div class="chip p t-l1">ЛЮДИ</div><div class="chip t-l2">БОТЫ</div><div class="t-n t-n1" style="left:40px">0</div><div class="t-s" style="left:40px">человек</div><div class="t-n t-n2" style="left:540px">0</div><div class="t-s t-s2" style="left:540px">капч</div><div class="note">UC Irvine · USENIX Security 2023</div>`;
SC.push(() => {
  const t0 = L('e1').t0 + 0.05; tw('.t-g', 0, 0.001, { o: [0, 0] }); tw('.t-g', t0, 0.15, { s: [3, 1], o: [0, 1] }, 'in'); shake(t0 + 0.15, 0.3, 24); sfx('slam', t0 + 0.13, 1.1);
  const t2 = L('e2').t0; tw('.t-g', t2 - 0.12, 0.12, { o: [1, 0] }); hide('#S20 .yr'); tw('#S20 .yr', t2, 0.4, { s: [2.2, 1], o: [0, 1] }, 'out5'); sfx('thud', t2 + 0.1);
  const tk = W('e2', 'учёные'); hide('.t-m'); hide('.t-rb'); tw('.t-m', tk, 0.4, { x: [-500, 0], o: [1, 1] }, 'out5'); tw('.t-rb', tk + 0.1, 0.4, { x: [500, 0], o: [1, 1] }, 'out5');
  hide('.t-vs'); stamp('.t-vs', W('e2', 'кто'), 0, 18); hide('.t-l1'); hide('.t-l2'); chipIn('.t-l1', tk + 0.2); chipIn('.t-l2', tk + 0.3);
  tw('#S20 .armR', W('e2', 'лучше'), 0.25, { r: [0, -110] }, 'back'); tw('#S20 .rarmL', W('e2', 'лучше'), 0.25, { r: [0, 110] }, 'back');
  $$('#S20 .t-n, #S20 .t-s, #S20 .note').forEach(e => hide(e)); const a = W('e2b', '1400'), b = W('e2b', '14 0'), e = L('e2b').t1;
  tw('.t-n1', a, 0.15, { o: [0, 1] }); tw($$('#S20 .t-s')[0], a, 0.2, { o: [0, 1] }); count($('.t-n1'), a, b - 0.2, 1400); sfx('riser2', a, 0.5); punch('.t-n1', b - 0.2, 0.1);
  tw('.t-n2', b, 0.15, { o: [0, 1] }); tw('.t-s2', b, 0.2, { o: [0, 1] }); count($('.t-n2'), b, e - 0.1, 14000); punch('.t-n2', e - 0.1, 0.1); sfx('ding', e - 0.1); slideIn('#S20 .note', b, 'down', 0.6, 140);
});
// S21 the race
HT.S21 = `<div class="lab">КРИВЫЕ БУКВЫ: КТО БЫСТРЕЕ</div><div class="u-nm" style="top:320px">ЧЕЛОВЕК</div><div class="u-tm u-t1" style="top:314px">0,0 с</div><div class="u-tr" style="top:400px"></div><div class="m u-m"></div><div class="chip p u-s u-s1" style="top:578px">9–15 секунд · точность 50–84%</div><div class="u-nm" style="top:700px">БОТ</div><div class="u-tm u-t2" style="top:694px">0,0 с</div><div class="u-tr" style="top:780px"></div><div class="rb u-rb"></div><div class="chip u-s u-s2" style="top:958px">меньше секунды · точность 99,8%</div><div class="chip p u-c">ГАЛОЧКА: бот 1,4 с · человек 3,1–4,9 с</div><div class="note">UC Irvine · USENIX Security 2023</div>`;
SC.push(() => {
  const a = L('e3').t0, b = L('e3').t1; tw('.u-m', a, b - a, { x: [0, 810] }, 'lin'); count($('.u-t1'), a, b, 150, v => (v / 10).toFixed(1).replace('.', ',') + ' с');
  custom(t => { const p = Math.max(0, Math.min(1, (t - a) / (b - a))); $('.u-t1').textContent = (15 * p).toFixed(1).replace('.', ',') + ' с'; });
  for (let th = a; th < b; th += 0.3) sfx('tick', th, 0.6);
  [330, 610].forEach((x, k) => { const d = mk('#S21', 'u-x', '×', `left:${x}px`); tw(d, 0, 0.001, { o: [0, 0] }); const t = W('e3', 'ошибками') + k * 0.18; tw(d, t, 0.2, { s: [2.5, 1], o: [0, 1] }, 'in'); sfx('buzz', t, 0.5); });
  hide('.u-s1'); chipIn('.u-s1', b - 0.1); sad('#S21', W('e3', 'ошибками'));
  const c = W('e4', 'меньше'); tw('.u-rb', c, 0.28, { x: [0, 810] }, 'out5'); sfx('whoosh', c, 1.2); sfx('zap', c, 0.8);
  custom(t => { $('.u-t2').textContent = t < c ? '0,0 с' : t < c + 0.28 ? ((t - c) * 3).toFixed(1).replace('.', ',') + ' с' : '< 1 с'; $('.u-t2').style.color = t >= c + 0.28 ? '#b8ff3d' : '#f4ecd9'; });
  for (let k = 0; k < 6; k++) { const d = mk('#S21', 'cf', '', `left:${120 + k * 130}px;top:${842}px;background:#6fe3ff;border-radius:13px;width:${90 - k * 8}px;height:14px`); tw(d, 0, 0.001, { o: [0, 0] }); tw(d, c + k * 0.03, 0.4, { o: [0.9, 0], sx: [1, 2] }, 'out'); }
  punch('.u-t2', c + 0.3, 0.2); sfx('ding', c + 0.3); hide('.u-s2'); chipIn('.u-s2', W('e4', 'почти'));
  tw('#S21 .rarmL', c + 0.3, 0.2, { r: [0, 120] }, 'back'); tw('#S21 .rarmR', c + 0.3, 0.2, { r: [0, -120] }, 'back');
  hide('.u-c'); const g = W('e4b', 'галочку'); tw('.u-c', g, 0.35, { y: [300, 0], o: [0, 1] }, 'out5'); punch('.u-c', W('e4b', 'полторы'), 0.05); sfx('pop', g); sfx('tick', W('e4b', 'полторы'), 1.2); sfx('tick', W('e4b', 'против'), 1.2);
});
// S22 podium
HT.S22 = `<div class="chip p v-b">ТЕСТ НА ЧЕЛОВЕКА</div><div class="v-p v-p2">2</div><div class="v-p v-p3">3</div><div class="v-p v-p1">1</div><div class="rb v-r2"></div><div class="m v-m"></div><div class="rb v-r1"></div>${icon('medal', 'v-md')}<div class="stR v-st">НЕ ЛЮДИ</div>`;
SC.push(() => {
  const t0 = L('j5').t0; ['.v-p2', '.v-p3', '.v-p1'].forEach((s, k) => { tw(s, t0 + k * 0.12, 0.35, { sy: [0, 1] }, 'back'); sfx('thud', t0 + k * 0.12 + 0.2, 0.6); });
  [['.v-r2', 0.2], ['.v-m', 0.3], ['.v-r1', 0.45]].forEach(([s, d]) => { tw(s, 0, 0.001, { o: [0, 0] }); tw(s, t0 + d, 0.3, { y: [-700, 0], o: [1, 1] }, 'in'); });
  hide('.v-md'); popIn('.v-md', W('j5', 'лучше')); sfx('ding', W('j5', 'лучше')); burst('#S22', 527, 560, 20, W('j5', 'лучше') + 0.1, 420);
  tw('#S22 .v-r1 .rarmL', W('j5', 'лучше'), 0.25, { r: [0, 120] }, 'back'); tw('#S22 .v-r1 .rarmR', W('j5', 'лучше'), 0.25, { r: [0, -120] }, 'back');
  const tn = L('j5b').t0; hide('.v-st'); stamp('.v-st', tn + 0.1, -6, 26);
  tw('#S22 .armR', tn, 0.2, { r: [0, -170] }, 'back'); sad('#S22', tn); tw('#S22 .brL', tn, 0.2, { r: [0, 14] }); tw('#S22 .brR', tn, 0.2, { r: [0, -4], y: [0, 8] });
});
// S23 no protection, lots of data
HT.S23 = `${icon('shield', 'x-sh')}<div class="x-x">×</div>${[0, 1, 2].map(k => `<div class="rb x-r x-r${k}" style="top:${330 + k * 90}px"></div>`).join('')}<div class="chip r x-k1">ЗАЩИТА: ПОЧТИ НЕТ</div><div class="m x-m"></div><div class="chip p x-box">ДАННЫЕ О ТЕБЕ</div><div class="note">вывод исследователей UC Irvine</div>`;
SC.push(() => {
  const t0 = L('e4c').t0; tw('.x-sh', t0 - 0.1, 0.35, { s: [0.3, 1], o: [0, 1] }, 'back');
  const tb = W('e4c', 'ботов'); [0, 1, 2].forEach(k => { tw('.x-r' + k, tb + k * 0.22, 0.7, { x: [0, 1400], r: [0, 20] }, 'inOut'); sfx('whoosh', tb + k * 0.22, 0.6); });
  hide('.x-x'); const tx = W('e4c', 'не'); stamp('.x-x', tx, 0, 16); tw('.x-sh', tx + 0.15, 0.5, { r: [0, 24] }, 'elastic'); tw('.x-sh', tx + 0.15, 0.3, { o: [1, 0.45] });
  hide('.x-k1'); chipIn('.x-k1', W('e4c', 'защищает')); sfx('buzz', W('e4c', 'защищает'), 0.6);
  hide('.x-m'); hide('.x-box'); hide('#S23 .note'); const t1 = L('e4d').t0; tw('.x-m', t1 - 0.1, 0.4, { y: [-300, 0], o: [0, 1] }, 'out5'); tw('.x-box', t1, 0.35, { y: [300, 0], o: [0, 1] }, 'out5'); slideIn('#S23 .note', t1 + 0.3, 'down', 0.6, 140);
  const c0 = W('e4d', 'собирает'), c1 = L('e4d').t1;
  for (let k = 0; k < 8; k++) { const d = mk('#S23', 'ic x-it', ic(k % 2 ? 'clock' : 'cookie')); const t = c0 + (c1 - c0) * k / 8; tw(d, 0, 0.001, { o: [0, 0] }); tw(d, t, 0.45, { x: [(hash(k) - .5) * 60, (hash(k + 4) - .5) * 300], y: [0, 300], o: [1, 1], s: [0.5, 0.9], r: [0, 200] }, 'in'); tw(d, t + 0.45, 0.06, { o: [1, 0] }); punch('.x-box', t + 0.45, 0.05, 0.15); sfx('coin', t + 0.45, 0.8); }
  sweat('#S23', 430, 790, 5, c0, 0.2); sad('#S23', c0); idle('.x-m', t => t > c0 && t < c1 ? { x: 6 * Math.sin(t * 40) } : {});
});
// S24 819 million hours, for free
HT.S24 = `<div class="y-n">0</div><div class="y-u">МИЛЛИОНОВ ЧАСОВ</div><div class="y-src">оценка исследователей UC Irvine</div><div class="stR y-st">БЕСПЛАТНО</div><div class="y-y">&gt; 90 000 ЛЕТ</div><div class="m y-m"></div>`;
SC.push(() => {
  const a = W('e5', 'потратили'), b = WE('e5', '819'); count($('.y-n'), a, b, 819, v => String(v)); sfx('riser', a, 0.8);
  for (let k = 0; k < 14; k++) { const ang = k / 14 * 6.283, d = mk('#S24', 'ic y-ck', ic('clock'), 'left:498px;top:360px'); const t = a + (b - a) * k / 14; tw(d, 0, 0.001, { o: [0, 0] }); tw(d, t, 0.5, { x: [Math.cos(ang) * 620, 0], y: [Math.sin(ang) * 520, 0], o: [1, 1], s: [1, 0.3], r: [0, 360] }, 'in'); tw(d, t + 0.5, 0.05, { o: [1, 0] }); if (k % 2) sfx('tick', t + 0.5, 0.8); }
  punch('.y-n', b, 0.1); sfx('boom', b, 0.8); shake(b, 0.3, 16);
  hide('.y-u'); tw('.y-u', W('e5', 'часов') - 0.1, 0.25, { o: [0, 1], y: [30, 0] }); hide('.y-src'); tw('.y-src', W('e5', 'часов') + 0.2, 0.3, { o: [0, 1] });
  hide('.y-st'); stamp('.y-st', L('e6').t0, -5, 30);
  hide('.y-y'); const ty = W('e7', '90'); tw('.y-y', ty, 0.3, { s: [0.3, 1], o: [0, 1] }, 'back'); sfx('ding', ty);
  hide('.y-m'); tw('.y-m', L('e6').t0, 0.4, { y: [400, 0], o: [0, 1] }, 'out5');
  const bd = mk($('.y-m'), 'y-b'); tw(bd, 0, 0.001, { sy: [0, 0] }); tw(bd, ty, 0.6, { sy: [0, 1] }, 'out'); sad('#S24', ty); sfx('riser2', ty, 0.5);
});
// S25 outro, loops into the hook
HT.S25 = `<div class="chk paper z-chk">${chkHTML()}</div><div class="m z-m"></div><div class="chip z-k">И ПОМНИ…</div>`;
SC.push(() => {
  const t0 = L('o1').t0; tw('.z-chk', t0 - 0.1, 0.4, { y: [-700, 0] }, 'out5'); const tc = W('o1', '«я');
  tw('#S25 .armL', W('o1', 'жми'), 0.25, { r: [0, 150] }, 'back'); click('#S25', 256, 480, tc); tw('#S25 .ck', tc + 0.05, 0.3, { dash: [100, 0] }); sfx('ding', tc + 0.15); punch('.z-chk', tc, 0.05);
  hide('.z-k'); chipIn('.z-k', W('o1', 'помни')); sfx('pop', W('o1', 'помни')); tw('#S25 .brR', W('o1', 'помни'), 0.2, { r: [0, -12], y: [0, 8] }, 'back');
});
boot(() => {
  for (const k in HT) $('#' + k).innerHTML = HT[k];
  $('#A2').innerHTML = HT.S01;
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG(i)); $$('.rb').forEach((el, i) => el.innerHTML = robotSVG(i)); $$('[data-ic]').forEach(el => el.innerHTML = ic(el.dataset.ic));
  const keys = ['hook', 'h3', 'a0', 'a1', 'a2', 'a4', 'j1', 'a6', 'b1', 'b2', 'b4', 'j2', 'c1', 'c4', 'c5', 'c7b', 'c8', 'd1', 'j4', 'e1', 'e3', 'j5', 'e4c', 'e5', 'o1'];
  const ids = keys.map((k, i) => '#S' + String(i + 1).padStart(2, '0')), cuts = keys.map((k, i) => i ? L(k).t0 - 0.12 : 0);
  window.CUTS = cuts;
  sceneCuts(ids, cuts);
  $$('.m').forEach((m, i) => { idle(m, t => ({ y: 9 * Math.sin(W2 * 60 * t + i), r: 2.5 * Math.sin(W2 * 30 * t + i) })); const p = $('.pup', m); idle(p, t => ({ x: 4 * Math.sin(W2 * 40 * t + i), y: 3 * Math.sin(W2 * 56 * t) })); });
  $$('.rb').forEach((m, i) => idle(m, t => ({ y: 6 * Math.sin(W2 * 50 * t + i) })));
  SC.forEach(f => f());
  mascotLife();
  $$('.lab, .note').forEach(el => {
    el.classList.add('nb-chip'); const w = el.offsetWidth; if (w) el.style.left = Math.round((1080 - w) / 2) + 'px';
    if (tweens.some(w => w.el === el)) return;
    const sc = el.closest('.scene'); if (!sc || sc.id === 'A2') return; const i = ids.indexOf('#' + sc.id); if (i < 0) return;
    const isLab = el.classList.contains('lab'); slideIn(el, cuts[i] + (isLab ? 0.12 : 0.4), isLab ? 'up' : 'down', 0.6, 140);
  });
  const TR = [tZoom, tSlideUp, tWhip, tCircle, tDrop];
  for (let i = 1; i < ids.length; i++) TR[(i * 3 + (i >> 2)) % 5](ids[i - 1], ids[i], cuts[i]);
  const tLoop = L('out').t0 + 0.15;
  tw('#S25', tLoop, 0.3, { o: [1, 0] }, 'in'); loopTo('#A2', tLoop + 0.1);
}, { noCaption: ['hook'] });
