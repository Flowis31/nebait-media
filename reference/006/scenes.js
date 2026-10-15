boot(() => {
  const mk = (par, cls, html) => { const d = document.createElement('div'); d.className = cls; if (html) d.innerHTML = html; (typeof par === 'string' ? $(par) : par).appendChild(d); return d; };
  const clamp = x => Math.max(0, Math.min(1, x));
  // per-digit password spans (A and its loop clone get the same markup)
  $('#A .pw').innerHTML = '123456'.split('').map(c => `<b style="position:relative;display:inline-block">${c}</b>`).join('');
  $('#A2').innerHTML = $('#A').innerHTML;
  $$('.m').forEach((el, i) => el.innerHTML = mascotSVG('m' + i));
  mascotLife();
  $('#A .a-lock').innerHTML = padlockSVG('a'); $('#A2 .a-lock').innerHTML = padlockSVG('a2');
  $('.b-db').innerHTML = dbSVG('b'); $('.c-db').innerHTML = dbSVG('c'); $('.e-db').innerHTML = dbSVG('e');
  $('.c-bld').innerHTML = buildingSVG(); $('.c-key').innerHTML = keySVG(); $('.d-cat').innerHTML = catSVG();
  $('.e-lap').innerHTML = laptopSVG(); $('.e-hood').innerHTML = hoodSVG();
  $('.g-suit').innerHTML = suitcaseSVG(); $('.g-gh').innerHTML = ghostSVG(); $('.h-env').innerHTML = envelopeSVG(); $('.i-door').innerHTML = doorSVG();

  const cut = k => L(k).t0 - 0.12;
  const tB = cut('s1'), tC = cut('s2'), tD = cut('j1'), tE = cut('s4'), tF = cut('s5'), tG = cut('t1'), tH = cut('j2'), tI = cut('m1'), tLoop = L('out').t0 + 0.2;
  sceneCuts(['#A', '#B', '#C', '#D', '#E', '#F', '#G', '#H', '#I'], [0, tB, tC, tD, tE, tF, tG, tH, tI]);
  $$('.pup').forEach((p, i) => idle(p, t => ({ x: 4 * Math.sin(W2 * 9 * t + i), y: 2.5 * Math.sin(W2 * 13 * t + i) })));
  $$('.m').forEach((m, i) => idle(m, t => ({ y: 9 * Math.sin(W2 * 14 * t + i), r: 2.5 * Math.sin(W2 * 7 * t + i) })));

  // ---------- A: hook ----------
  tw('#A', 0, 0.5, { s: [1.13, 1] }, 'out5'); sfx('impact', 0.02);
  for (const s of ['#A', '#A2']) { tw(s + ' .armL', 0, 0.001, { r: [55, 55] }); tw(s + ' .pup', 0, 0.001, { x: [-7, -7] }); hide(s + ' .a-st'); hide(s + ' .a-src'); }
  const d0 = wt('hook', 1), d1 = we('hook', 1), dd = (d1 - d0) / 6;
  $$('#A .pw b').forEach((b, k) => { const t = d0 + k * dd; tw(b, t, 0.1, { y: [0, -26], s: [1, 1.25] }, 'out'); tw(b, t + 0.1, 0.32, { y: [-26, 0], s: [1.25, 1] }, 'back'); sfx('tick', t, 0.9); });
  custom(t => $$('#A .pw b').forEach((b, k) => b.style.color = t >= d0 + k * dd && t < d0 + (k + 1) * dd + 0.1 ? '#ff3b5c' : '#0a130d'));
  for (let k = 0; k < 6; k++) tw('#A .armL', d0 + k * dd, dd, { r: k % 2 ? [40, 55] : [55, 40] }, 'sine');
  // «слил»: lock pops open, documents spill out
  const tsl = wt('hook', 2);
  tw('#A .shackle', tsl, 0.12, { y: [0, -46] }, 'in'); tw('#A .shackle', tsl + 0.12, 0.4, { r: [0, 32] }, 'back'); sfx('clink', tsl); shake(tsl + 0.05, 0.25, 12);
  tw('#A .a-lock', tsl, 0.1, { s: [1, 1.08] }); tw('#A .a-lock', tsl + 0.1, 0.35, { s: [1.08, 1] }, 'back');
  for (let k = 0; k < 9; k++) {
    const d = mk('#A', 'doc', '<i style="top:24px"></i><i style="top:52px"></i><i style="top:80px;width:56px"></i>'); d.style.left = '255px'; d.style.top = '800px'; hide(d);
    const a = -Math.PI / 2 + (hash(k + 4) - .5) * 2.4, r = 300 + 220 * hash(k + 1), t0 = tsl + 0.06 + k * 0.07;
    tw(d, t0, 0.8, { x: [0, Math.cos(a) * r], y: [0, Math.sin(a) * r * 0.55 + 260 * hash(k + 7)], r: [0, (hash(k + 2) - .5) * 160], s: [0.3, 0.75], o: [1, 1] }, 'out');
    tw(d, t0 + 0.9, 0.3, { o: [1, 0] }, 'in'); sfx('pop', t0, 0.5);
  }
  tw('#A .mouth', tsl, 0.2, { sy: [1, -1] }); tw('#A .brL', tsl, 0.2, { y: [0, -14] }, 'back'); tw('#A .brR', tsl, 0.2, { y: [0, -14] }, 'back');
  tw('#A .armR', tsl + 0.05, 0.3, { r: [0, -150] }, 'back'); tw('#A .armL', tsl + 0.05, 0.3, { r: [55, 150] }, 'back');   // hands up: «ой»
  punch('#A .a-t', wt('hook', 4), 0.08); sfx('blip', wt('hook', 4));
  // h2: «Нет» head shake, «байт» stamp, «Дания» source chip
  for (let k = 0; k < 3; k++) tw('#A .a-m', wt('h2', 0) + k * 0.12, 0.12, { r: k % 2 ? [10, -10] : [-10, 10] }, 'sine');
  tw('#A .a-m', wt('h2', 0) + 0.36, 0.2, { r: [10, 0] }, 'out');
  tw('#A .armR', wt('h2', 0), 0.3, { r: [-150, 0] }); tw('#A .armL', wt('h2', 0), 0.3, { r: [150, 0] }); tw('#A .mouth', wt('h2', 0), 0.2, { sy: [-1, 1] });
  stamp('#A .a-st', wt('h2', 3), -6, 20);
  slideIn('#A .a-src', wt('h2', 4) - 0.05, 'down', 0.7, 200); sfx('whoosh', wt('h2', 4) - 0.05, 0.5);
  tw('#A .armL', wt('h2', 4), 0.3, { r: [0, -40] }, 'back'); tw('#A .pup', wt('h2', 4), 0.3, { x: [-7, -4], y: [0, 7] }, 'out');

  // ---------- B: the registry ----------
  tSlideUp('#A', '#B', tB);
  hide('#B .b-lab'); slideIn('#B .b-lab', tB + 0.12, 'left', 0.7, 260);
  tw('#B .pup', tB, 0.3, { x: [0, -8], y: [0, 2] });
  // «жителей»: little people rain into the cylinder
  const tz = wt('s1', 4);
  for (let k = 0; k < 12; k++) {
    const d = mk('#B', 'ppl', personSVG(['#b8ff3d', '#f4ecd9', '#ffe14d', '#6fd3ff'][k % 4])); d.style.left = 140 + hash(k + 30) * 340 + 'px'; d.style.top = '330px'; hide(d);
    const t0 = tz - 0.35 + k * 0.06; tw(d, t0, 0.45, { y: [-40, 150 + 40 * hash(k)], o: [0.3, 1], r: [(hash(k) - .5) * 60, 0] }, 'in'); tw(d, t0 + 0.45, 0.12, { s: [1, 0.2], o: [1, 0] }, 'in');
    if (k % 3 === 0) sfx('pop', t0 + 0.45, 0.5);
  }
  $$('#B .led').forEach((l, k) => tw(l, tz + 0.2 + k * 0.08, 0.2, { s: [1, 1.6] }, 'back'));
  custom(t => $$('#B .led').forEach(l => l.setAttribute('fill', t > tz + 0.2 ? '#b8ff3d' : '#ff3b5c')));
  punch('#B .b-db', tz + 0.3, 0.06);
  // fields: name / address / number slide in from the right on their words, then get sucked into the cylinder
  const cw = [wt('s1b', 0), wt('s1b', 1), wt('s1b', 3)];
  ['.c1', '.c2', '.c3'].forEach((c, k) => { hide('#B ' + c); slideIn('#B ' + c, cw[k] - 0.1, 'right', 0.6, 420); sfx('whoosh', cw[k] - 0.1, 0.4); });
  tw('#B .armL', cw[0] - 0.1, 0.3, { r: [0, 70] }, 'back'); tw('#B .armL', cw[1], 0.25, { r: [70, 40] }); tw('#B .armL', cw[2], 0.25, { r: [40, 70] });
  tw('#B .pup', cw[0], 0.25, { x: [-8, 0], y: [2, -8] });
  
  // ---------- C: a private firm with legal access, password 123456 ----------
  tWhip('#B', '#C', tC);
  hide('.c-key'); hide('.c-chip'); hide('.c-win');
  popIn('.c-key', wt('s2', 2) - 0.05, 0.4); sfx('coin', wt('s2', 2));
  const tk = wt('s2', 3);   // «доступ»: key flies along the drawn path to the registry
  tw('#C .dl', tk - 0.1, 0.6, { dash: [100, 0] }, 'out');
  tw('.c-key', tk + 0.15, 0.55, { x: [0, 300], y: [0, -60], r: [0, -20], s: [1, 0.8] }, 'inOut'); sfx('whoosh', tk + 0.15, 0.6); sfx('clink', tk + 0.7);
  punch('.c-db', tk + 0.7, 0.08); custom(t => $$('#C .led').forEach(l => l.setAttribute('fill', t > tk + 0.7 ? '#b8ff3d' : '#ff3b5c')));
  slideIn('.c-chip', wt('s2', 5) - 0.1, 'right', 0.7, 320);
  slideIn('.c-win', L('s3').t0 - 0.05, 'down', 0.65, 520); sfx('whoosh', L('s3').t0 - 0.05, 0.6);
  hide('#C .c-m'); popIn('#C .c-m', wt('s3', 3), 0.4, 0.4); sfx('pop', wt('s3', 3), 0.6);
  // typed digits on the spoken digits
  const fld = $('.c-win .fld'), e0 = wt('s3', 6), e1 = we('s3', 6), ed = (e1 - e0) / 6;
  const cur = mk(fld, 'cur'); idle(cur, t => ({ o: t > e1 + 0.2 ? 0 : (Math.floor(t * 3) % 2 ? 0 : 1) - 1 }));
  tw(cur, 0, 0.001, { o: [1, 1] });
  for (let k = 0; k < 6; k++) {
    const b = mk(fld, 'dig'); b.innerHTML = ''; const g = document.createElement('b'); g.textContent = '123456'[k]; g.style.left = (45 + k * 105) + 'px'; fld.appendChild(g); b.remove();
    hide(g); popIn(g, e0 + k * ed, 0.3, 0.2); sfx('tick', e0 + k * ed, 1);
  }
  custom(t => { const n = clamp((t - e0) / (e1 - e0)) * 6; cur.style.left = (52 + Math.min(6, Math.ceil(n)) * 105) + 'px'; });
  custom(t => { fld.style.background = t > e1 + 0.05 ? '#ffd9df' : '#fff'; });
  shake(e1 + 0.05, 0.22, 10); sfx('buzz', e1 + 0.05, 0.6);
  tw('#C .armR', wt('s3', 4), 0.35, { r: [0, -95] }, 'back');                       // points at the field
  tw('#C .brL', wt('s3', 5), 0.25, { y: [0, -14] }, 'back'); tw('#C .brR', wt('s3', 5), 0.25, { y: [0, -14] }, 'back');
  tw('#C .armR', e1 + 0.05, 0.3, { r: [-95, -168] }, 'back'); tw('#C .mouth', e1, 0.2, { sy: [1, -1] });     // facepalm
  tw('#C .pup', e1, 0.3, { y: [0, 7] });

  // ---------- D: joke, the cat guesses it ----------
  tDrop('#C', '#D', tD);
  const kb = $('.d-kb'); const keys = [];
  const rows = ['1234567890', 'ЙЦУКЕНГШЩЗ', 'ФЫВАПРОЛДЖ'];
  rows.forEach((r, ri) => r.split('').forEach((c, ci) => { const k = mk(kb, 'key'); k.textContent = c; k.style.left = (36 + ri * 22 + ci * 84) + 'px'; k.style.top = (30 + ri * 98) + 'px'; if (ri === 0 && ci < 6) keys.push(k); }));
  const pw = $('.d-mon .pw'), gr = $('.d-mon .gr');
  hide('.d-cat'); hide(gr);
  const tcat = wt('j1', 4);        // «кот»: the cat peeks in
  tw('.d-cat', tcat - 0.1, 0.5, { x: [-700, -280], y: [0, 0], o: [1, 1], r: [-15, 0] }, 'out5'); sfx('pop', tcat, 0.8);
  const tsit = wt('j1b', 1);       // «сядет»: jumps onto the number row
  tw('.d-cat', tsit - 0.05, 0.2, { x: [-280, -60], y: [0, -200] }, 'out'); tw('.d-cat', tsit + 0.15, 0.18, { y: [-200, 30] }, 'in');
  tw('.d-cat', tsit + 0.33, 0.06, { sy: [1, 0.85] }, 'out'); tw('.d-cat', tsit + 0.39, 0.3, { sy: [0.85, 1] }, 'back'); sfx('thud', tsit + 0.33);
  const kt0 = tsit + 0.36, kdt = (we('j1b', 3) - kt0 + 0.05) / 6;
  tw('.d-cat', kt0, kdt * 6, { x: [-60, 140] }, 'lin');      // shuffles along 1..6
  keys.forEach((k, i) => { const t = kt0 + i * kdt; tw(k, t, 0.06, { y: [0, 8] }); tw(k, t + 0.06, 0.2, { y: [8, 0] }, 'out'); sfx('tick', t, 0.9); });
  custom(t => { keys.forEach((k, i) => k.classList.toggle('hot', t >= kt0 + i * kdt)); const n = Math.max(0, Math.min(6, Math.floor((t - kt0) / kdt) + 1)); pw.textContent = t < kt0 ? '______' : '123456'.slice(0, n) + '______'.slice(n); });
  const tok = kt0 + 6 * kdt + 0.05;
  tw(gr, tok, 0.35, { s: [0.3, 1], o: [0, 1] }, 'back'); sfx('ding', tok); custom(t => { $('.d-mon .scr').style.background = t > tok ? '#14361f' : '#0c1a12'; });
  idle('.d-cat .tail', t => ({ r: 14 * Math.sin(t * 7) }));
  tw('#D .pup', tcat, 0.3, { x: [0, -8] }); tw('#D .brL', tcat, 0.25, { y: [0, -16] }, 'back'); tw('#D .brR', tcat, 0.25, { y: [0, -16] }, 'back');
  tw('#D .d-m', tok, 0.18, { y: [0, -90] }, 'out'); tw('#D .d-m', tok + 0.18, 0.25, { y: [-90, 0] }, 'in'); tw('#D .mouth', tok, 0.15, { sy: [1, -1.2] });
  tw('#D .armL', tok, 0.25, { r: [0, 140] }, 'back'); tw('#D .armR', tok, 0.25, { r: [0, -140] }, 'back'); shake(tok + 0.43, 0.2, 10);

  // ---------- E: the download ----------
  tCircle('#D', '#E', tE, 540, 600);
  hide('.e-chip'); slideIn('.e-chip', tE + 0.15, 'left', 0.65, 260);
  hide('.e-hood'); tw('.e-hood', wt('s4', 0) - 0.05, 0.45, { y: [260, 0], o: [0, 1] }, 'out5');
  idle('.e-hood .heyes', t => ({ sy: ((t * 2.2) % 1) < 0.08 ? 0.1 : 1 }));
  tw('#E .pipe', wt('s4', 1) - 0.05, 0.4, { dash: [100, 0] }, 'out'); sfx('zap', wt('s4', 1), 0.5);
  const x0 = wt('s4', 3), x1 = we('s4', 5) + 0.25;
  const pth = $('#E .pipe'), PL = pth.getTotalLength();
  for (let k = 0; k < 14; k++) {
    const d = mk('#E', 'mini', '<i style="top:16px"></i><i style="top:36px"></i><i style="top:56px;width:30px"></i>'); d.style.left = '-35px'; d.style.top = '-44px'; hide(d);
    const t0 = x0 + k * (x1 - x0 - 0.45) / 14;
    custom(t => { const p = (t - t0) / 0.45; if (p < 0 || p > 1) { d.style.display = 'none'; return; } d.style.display = 'block'; d.style.opacity = 1; const pt = pth.getPointAtLength(PL * p); d.style.transform = `translate(${pt.x}px,${pt.y}px) rotate(${(p - .5) * 50}deg) scale(${0.6 + 0.3 * Math.sin(Math.PI * p)})`; });
  }
  const prog = $('.e-prog i'), pct = $('.e-pct');
  custom(t => { const p = clamp((t - x0) / (x1 - x0)); prog.style.transform = `scaleX(${p})`; pct.textContent = Math.round(100 * p) + '%'; });
  for (let k = 0; k < 6; k++) sfx('blip', x0 + k * (x1 - x0) / 6, 0.4);
  punch('.e-pct', x1, 0.14); sfx('ding', x1, 0.7);
  tw('#E .armL', wt('s4', 0), 0.3, { r: [0, 70] }, 'back');                                     // points at the hacker
  tw('#E .mouth', wt('s4', 3), 0.2, { sy: [1, -1] });
  for (let th = wt('s4', 3), k = 0; th < x1; th += 0.26, k++) tw('#E .armR', th, 0.26, { r: k % 2 ? [-40, -110] : [-110, -40] }, 'sine');   // waves «стоп!»
  tw('#E .pup', wt('s4', 0), 0.3, { x: [0, 8], y: [0, -5] });

  // ---------- F: 8.8 million ----------
  tZoom('#E', '#F', tF);
  const fn = $('.f-n'), n0 = wt('s5', 1) - 0.05, n1 = we('s5', 2);
  custom(t => { const p = clamp((t - n0) / (n1 - n0)), v = 8.8 * (1 - Math.pow(1 - p, 2.2)); fn.textContent = p <= 0 ? '0' : v.toFixed(1).replace('.', ',') + ' млн'; });
  for (let k = 0; k < 8; k++) sfx('tick', n0 + k * (n1 - n0) / 8, 0.7);
  punch('.f-n', n1, 0.1); sfx('slam', n1, 0.8); shake(n1, 0.25, 14);
  hide('.f-s'); slideIn('.f-s', wt('s5', 3) - 0.05, 'up', 0.6, 120);
  const grid = $('.f-grid'), figs = [];
  for (let r = 0; r < 6; r++) for (let c = 0; c < 8; c++) { const d = mk(grid, 'f-p', personSVG('#3b5244')); d.style.left = c * 78 + 'px'; d.style.top = r * 100 + 'px'; figs.push([d, r + c]); }
  figs.forEach(([d, w]) => { const t = n0 + w * 0.06; tw(d, t, 0.25, { s: [1, 1.25] }, 'out'); tw(d, t + 0.25, 0.3, { s: [1.25, 1] }, 'back'); });
  custom(t => figs.forEach(([d, w]) => { const on = t >= n0 + w * 0.06; const c = d.querySelectorAll('circle,path'); c.forEach(e => e.setAttribute('fill', on ? '#ff3b5c' : '#3b5244')); }));
  tw(grid, tF, 0.5, { o: [0, 1], y: [80, 0] }, 'out');
  hide('.f-src'); slideIn('.f-src', wt('s5', 2), 'left', 0.7, 300); sfx('whoosh', wt('s5', 2), 0.5);
  tw('#F .armL', n0, 0.3, { r: [0, 140] }, 'back'); tw('#F .armR', n0, 0.3, { r: [0, -140] }, 'back');
  tw('#F .f-m', n1, 0.2, { y: [0, -80] }, 'out'); tw('#F .f-m', n1 + 0.2, 0.25, { y: [-80, 0] }, 'in'); tw('#F .mouth', n0, 0.2, { sy: [1, 1.3] });

  // ---------- G: more people than the country has ----------
  tSlideUp('#F', '#G', tG);
  hide('.g-src'); slideIn('.g-src', tG + 0.12, 'left', 0.65, 260);
  hide('.g-b1'); hide('.g-n1'); hide('.g-l1'); hide('.g-cap');
  const gb1 = wt('t1', 3);   // «живёт»
  tw('.g-b1', gb1 - 0.1, 0.6, { sy: [0, 1], o: [1, 1] }, 'out'); tw('.g-n1', wt('t1', 5), 0.4, { s: [0.4, 1], o: [0, 1] }, 'back'); sfx('blip', wt('t1', 5));
  slideIn('.g-l1', gb1, 'down', 0.6, 120); slideIn('#G .g-cap:not(.g-cap2)', wt('t1', 5) + 0.05, 'left', 0.65, 200);
  tw('.g-m', gb1 - 0.1, 0.6, { y: [409, 0], o: [1, 1] }, 'out');                        // the mascot rides up on the green bar
  hide('.g-b2'); hide('.g-n'); hide('.g-l2'); hide('#G .g-cap2');
  const gb2 = we('t1', 6) - 0.1;
  tw('.g-b2', gb2, 0.7, { sy: [0, 1], o: [1, 1] }, 'out'); sfx('riser2', gb2 - 0.3, 0.7);
  popIn('.g-n', gb2 + 0.5, 0.4); sfx('slam', gb2 + 0.5, 0.7); shake(gb2 + 0.55, 0.2, 10);
  slideIn('.g-l2', gb2 + 0.2, 'down', 0.6, 120);
  tw('#G .dl', gb2 + 0.2, 0.5, { dash: [100, 0] }, 'out');
  tw('#G .pup', gb2, 0.3, { x: [0, 8], y: [0, -8] }); tw('#G .brL', gb2 + 0.4, 0.25, { y: [0, -16] }, 'back'); tw('#G .brR', gb2 + 0.4, 0.25, { y: [0, -16] }, 'back');
  tw('#G .armR', gb2 + 0.4, 0.3, { r: [0, -110] }, 'back');                                   // points up at the red bar
  hide('.g-suit'); hide('.g-gh');
  tw('.g-suit', wt('t2', 2), 0.45, { y: [-400, 0], o: [1, 1], r: [-30, 0] }, 'back'); sfx('thud', wt('t2', 2) + 0.2);
  tw('.g-gh', wt('t2', 4), 0.5, { y: [60, 0], s: [0.3, 1], o: [0, 1] }, 'back'); sfx('zap', wt('t2', 4), 0.4);
  idle('.g-gh', t => ({ y: 10 * Math.sin(t * 5) }));
  slideIn('#G .g-cap2', wt('t2', 0), 'right', 0.65, 220);
  tw('#G .mouth', wt('t2', 4), 0.2, { sy: [1, -1] }); tw('#G .g-m', wt('t2', 4), 0.15, { x: [0, -16] }); tw('#G .g-m', wt('t2', 4) + 0.15, 0.3, { x: [-16, 0] }, 'back');

  // ---------- H: joke, caught by the invoice ----------
  tWhip('#G', '#H', tH, 0.46, -1);
  const paper = $('.h-paper');
  for (let k = 0; k < 44; k++) { const r = mk(paper, 'h-row'); r.style.top = (30 + k * 52) + 'px'; r.innerHTML = 'поиск в CPR<span>кр.</span>'; }
  hide('.h-env'); hide('.h-rc'); hide('.h-ill'); hide('.h-chip'); hide('.h-st');
  const tev = wt('j2', 1);
  tw('#H .armR', L('j2').t0, 0.3, { r: [0, -120] }, 'back'); for (let k = 0; k < 4; k++) tw('#H .armR', L('j2').t0 + 0.3 + k * 0.15, 0.15, { r: k % 2 ? [-105, -125] : [-125, -105] }, 'sine');   // scratches his head
  tw('.h-env', tev - 0.15, 0.5, { x: [700, 0], y: [-200, 0], r: [40, -4], o: [1, 1] }, 'out5'); sfx('whoosh', tev - 0.15, 0.7); sfx('thud', tev + 0.3, 0.6);
  tw('#H .pup', tev, 0.3, { x: [0, 8], y: [0, -6] }); tw('#H .brL', tev + 0.2, 0.2, { r: [0, -10], y: [0, -8] });
  { const q = mk('#H', 'hq'); q.textContent = '?'; q.style.cssText = 'left:250px;top:700px;font:900 170px/1 Unb;color:#b8ff3d;-webkit-text-stroke:10px #0a130d;paint-order:stroke fill'; hide(q);
    popIn(q, wt('j2', 3), 0.4, 0.2); sfx('blip', wt('j2', 3)); tw(q, wt('j2b', 2) - 0.1, 0.25, { o: [1, 0], y: [0, -60] }, 'in');
    for (let k = 0; k < 4; k++) tw('.h-env', wt('j2', 4) + k * 0.09, 0.09, { r: k % 2 ? [6, -10] : [-10, 6] }, 'sine'); sfx('buzz', wt('j2', 4), 0.4); }
  const trc = wt('j2b', 2);  // «счёт»: receipt unrolls
  tw('.h-rc', trc - 0.05, 0.15, { o: [0, 1] }, 'lin'); tw('.h-rc', trc - 0.05, 0.55, { sy: [0.02, 1] }, 'out'); sfx('riser2', trc - 0.1, 0.5);
  tw('.h-paper', trc + 0.3, tI - trc, { y: [0, -1500] }, 'inOut');                       // keeps scrolling: endless list of searches
  for (let k = 0; k < 10; k++) sfx('tick', trc + 0.3 + k * 0.12, 0.6);
  tw('.h-env', trc, 0.3, { y: [0, -60], r: [-4, -12] }, 'out');
  slideIn('.h-ill', trc + 0.3, 'right', 0.5, 140);
  slideIn('.h-chip', wt('j2b', 0), 'right', 0.65, 300);
  tw('#H .h-m', trc + 0.2, 0.15, { y: [0, -70], x: [0, -20] }, 'out'); tw('#H .h-m', trc + 0.35, 0.3, { y: [-70, 0], x: [-20, 0] }, 'in');
  tw('#H .mouth', trc, 0.15, { sy: [1, -1.2] }); tw('#H .armL', trc + 0.1, 0.25, { r: [0, 150] }, 'back'); tw('#H .armR', trc + 0.1, 0.25, { r: [0, -150] }, 'back');
  stamp('.h-st', we('j2b', 4) + 0.12, -6, 22);

  // ---------- I: moral + loop ----------
  tCircle('#H', '#I', tI, 540, 300);
  tw('#I .dl', wt('m1', 6) - 0.05, 0.35, { dash: [100, 0] }, 'out'); sfx('zap', wt('m1', 6), 0.5); shake(wt('m1', 6) + 0.2, 0.18, 8);
  tw('#I .i-f', wt('m1', 1), 0.1, { s: [1, 1.05] }); tw('#I .i-f', wt('m1', 1) + 0.1, 0.3, { s: [1.05, 1] }, 'back');
  hide('.i-tag'); slideIn('.i-tag', wt('m1', 4), 'right', 0.65, 300); sfx('whoosh', wt('m1', 4), 0.4);
  hide('.i-door'); hide('.i-mat');
  slideIn('.i-door', tI + 0.1, 'left', 0.6, 400); slideIn('.i-mat', tI + 0.25, 'left', 0.6, 400);
  const tinv = wt('m2', 1);  // «приглашение»: the door swings open by itself
  tw('#I .leaf', tinv, 0.5, { sx: [1, 0.22] }, 'out'); sfx('clink', tinv); sfx('ding', tinv + 0.2, 0.6);
  punch('.i-mat', tinv + 0.15, 0.12);
  tw('#I .armL', tinv, 0.35, { r: [0, 80] }, 'back');                                        // «прошу»: presents the open door
  tw('#I .pup', tinv, 0.3, { x: [0, -8] });
  hide('.i-hint'); slideIn('.i-hint', wt('m2', 0) - 0.05, 'down', 0.6, 200); sfx('pop', wt('m2', 0), 0.6);
  // out: leans in to the viewer, suspicious
  const to = L('out').t0;
  tw('#I .i-m', to, 0.4, { s: [1, 1.25], x: [0, -40] }, 'out'); tw('#I .armL', to, 0.3, { r: [80, -60] }); tw('#I .pup', to, 0.3, { x: [-8, 0], y: [0, 6] });
  tw('#I .brL', to, 0.25, { y: [0, 10], r: [0, 10] }); tw('#I .brR', to, 0.25, { y: [0, -10] }); tw('#I .mouth', to, 0.2, { sx: [1, 0.6] });
  tw(['.i-f', '.i-door', '.i-mat', '.i-tag', '.i-hint', '.i-m'].map(s => $('#I ' + s)), tLoop, 0.3, { o: [1, 0] }, 'in');
  loopTo('#A2', tLoop + 0.1);
}, { noCaption: ['hook'] });
