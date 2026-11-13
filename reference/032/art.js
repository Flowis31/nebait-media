// art.js for 032 — world and one-off drawings (recurring props live in tools/props.js: sausageSVG, mittenSVG, pointHandSVG, busStopSVG).
const AK = '#0a130d';
// far layer: soft aurora ribbons + a few stars (winter evening)
function aurSVG() {
  let s = ''; for (let k = 0; k < 70; k++) { const x = hash(k * 3.1) * 2400, y = hash(k * 7.7) * 520, r = 1.5 + 2.5 * hash(k * 1.9); s += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#fff" opacity="${(0.35 + 0.5 * hash(k * 5.3)).toFixed(2)}"/>`; }
  return `<svg viewBox="0 0 2400 900" style="left:0;top:0;width:2400px;height:900px"><defs>
    <linearGradient id="au1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7dffc8" stop-opacity="0"/><stop offset=".55" stop-color="#7dffc8" stop-opacity=".28"/><stop offset="1" stop-color="#5fe8ff" stop-opacity="0"/></linearGradient>
    <linearGradient id="au2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b08bff" stop-opacity="0"/><stop offset=".6" stop-color="#b08bff" stop-opacity=".2"/><stop offset="1" stop-color="#ff8a6b" stop-opacity="0"/></linearGradient></defs>
    ${s}
    <path d="M0 300 Q400 120 800 280 T1600 240 T2400 260 L2400 520 Q2000 420 1600 500 T800 470 T0 520 Z" fill="url(#au1)"/>
    <path d="M0 420 Q500 300 1000 430 T2000 380 T2400 400 L2400 600 Q1900 520 1400 600 T400 600 T0 620 Z" fill="url(#au2)"/></svg>`;
}
// mid-far layer: snowy hills
function hillsSVG() {
  return `<svg viewBox="0 0 3400 720" style="left:0;top:0;width:3400px;height:720px"><defs><linearGradient id="hl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe8f2"/><stop offset="1" stop-color="#5f93a8"/></linearGradient></defs>
    <path d="M0 360 Q300 200 600 330 T1200 300 T1800 320 T2400 280 T3000 330 T3400 300 L3400 720 L0 720 Z" fill="url(#hl)" opacity=".55"/></svg>`;
}
// mid layer: a row of town houses with snowy roofs and warm windows
function townSVG() {
  let s = '', x = 0, k = 0;
  while (x < 3400) {
    const w = 150 + 120 * hash(k * 2.3), h = 220 + 230 * hash(k * 4.1), y = 640 - h, c = ['#1d4357', '#24506a', '#1a3a4d', '#2b5a72'][k % 4];
    s += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${c}" stroke="${AK}" stroke-width="6"/>`;
    s += `<path d="M${(x - 10).toFixed(0)} ${(y + 4).toFixed(0)} Q${(x + w / 2).toFixed(0)} ${(y - 26).toFixed(0)} ${(x + w + 10).toFixed(0)} ${(y + 4).toFixed(0)} Q${(x + w / 2).toFixed(0)} ${(y + 14).toFixed(0)} ${(x - 10).toFixed(0)} ${(y + 4).toFixed(0)} Z" fill="#f2fbff" stroke="${AK}" stroke-width="5"/>`;
    for (let wy = y + 40; wy < 600; wy += 70) for (let wx = x + 24; wx < x + w - 40; wx += 54) {
      const on = hash(wx * 0.13 + wy * 0.7) > 0.45; s += `<rect class="${on ? 'win' : ''}" x="${wx.toFixed(0)}" y="${wy.toFixed(0)}" width="28" height="38" rx="4" fill="${on ? '#ffd27a' : '#12303f'}" stroke="${AK}" stroke-width="4"/>`; }
    x += w + 30 + 60 * hash(k * 9.1); k++;
  }
  // lamp posts
  for (let lx = 200; lx < 3400; lx += 640) s += `<rect x="${lx}" y="380" width="14" height="260" fill="#2a3a48" stroke="${AK}" stroke-width="4"/><circle cx="${lx + 7}" cy="372" r="22" fill="#ffe6a6" stroke="${AK}" stroke-width="5"/><circle cx="${lx + 7}" cy="372" r="70" fill="#ffe6a6" opacity=".18"/>`;
  return `<svg viewBox="0 0 3400 640" style="left:0;top:0;width:3400px;height:640px">${s}</svg>`;
}
// exploded touchscreen layer, viewBox 0 0 900 340. kind: glass | grid | display. Slab = parallelogram with thickness.
const LP = (u, v) => [150 - 100 * v + 700 * u, 20 + 260 * v];
const LPs = (u, v) => LP(u, v).map(n => n.toFixed(1)).join(' ');
function layerSVG(kind, id) {
  const quad = `M${LPs(0, 0)} L${LPs(1, 0)} L${LPs(1, 1)} L${LPs(0, 1)} Z`;
  const edge = `M${LPs(0, 1)} L${LPs(1, 1)} L${LPs(1, 0)} L${(LP(1, 0)[0]).toFixed(1)} ${(LP(1, 0)[1] + 22).toFixed(1)} L${(LP(1, 1)[0]).toFixed(1)} ${(LP(1, 1)[1] + 22).toFixed(1)} L${(LP(0, 1)[0]).toFixed(1)} ${(LP(0, 1)[1] + 22).toFixed(1)} Z`;
  let inner = '', fill = '', ec = '';
  if (kind === 'glass') {
    fill = `url(#lg${id})`; ec = '#7fb8cc';
    inner = `<path d="M${LPs(0.08, 0.15)} L${LPs(0.3, 0.15)} L${LPs(0.2, 0.85)} L${LPs(0.0, 0.85)} Z" fill="#fff" opacity=".35"/><path d="M${LPs(0.36, 0.15)} L${LPs(0.42, 0.15)} L${LPs(0.34, 0.85)} L${LPs(0.28, 0.85)} Z" fill="#fff" opacity=".25"/>`;
  } else if (kind === 'grid') {
    fill = '#0f2f40'; ec = '#0a1f2b';
    for (let i = 1; i < 8; i++) { const v = i / 8; inner += `<path class="lgr" pathLength="100" style="stroke-dasharray:100" d="M${LPs(0.03, v)} L${LPs(0.97, v)}" stroke="#5fe8ff" stroke-width="6" stroke-linecap="round"/>`; }
    for (let i = 1; i < 12; i++) { const u = i / 12; inner += `<path class="lgc" pathLength="100" style="stroke-dasharray:100" d="M${LPs(u, 0.05)} L${LPs(u, 0.95)}" stroke="#ff8a6b" stroke-width="6" stroke-linecap="round"/>`; }
  } else {
    fill = `url(#ld${id})`; ec = '#1b2a3c';
    const cols = ['#ff8a6b', '#5fe8ff', '#7dff8a', '#ffe14d', '#b08bff', '#ff5fa2'];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) { const u0 = 0.08 + c * 0.145, v0 = 0.14 + r * 0.27, u1 = u0 + 0.1, v1 = v0 + 0.18;
      inner += `<path d="M${LPs(u0, v0)} L${LPs(u1, v0)} L${LPs(u1, v1)} L${LPs(u0, v1)} Z" fill="${cols[(r * 6 + c) % 6]}" stroke="${AK}" stroke-width="4"/>`; }
  }
  return `<svg viewBox="0 0 900 340" style="overflow:visible;left:0;top:0;width:100%;height:100%"><defs>
    <linearGradient id="lg${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8fbff" stop-opacity=".75"/><stop offset="1" stop-color="#8fd8ef" stop-opacity=".45"/></linearGradient>
    <linearGradient id="ld${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2b3d6a"/><stop offset="1" stop-color="#142036"/></linearGradient></defs>
    <path d="${edge}" fill="${ec}" stroke="${AK}" stroke-width="7" stroke-linejoin="round"/>
    <path d="${quad}" fill="${fill}" stroke="${AK}" stroke-width="8" stroke-linejoin="round"/>${inner}</svg>`;
}
// feed card for a phone screen (w x h box): avatar dot + two lines + picture
function feedCardHTML(k) {
  const c = ['#ff8a6b', '#5fe8ff', '#7dff8a', '#ffe14d', '#b08bff', '#ff5fa2'][k % 6];
  return `<svg viewBox="0 0 200 150" style="left:0;top:0;width:100%;height:100%"><rect x="4" y="4" width="192" height="142" rx="16" fill="#fff" stroke="${AK}" stroke-width="6"/>
    <circle cx="30" cy="30" r="14" fill="${c}" stroke="${AK}" stroke-width="4"/><rect x="54" y="20" width="110" height="9" rx="4" fill="#9aa6b8"/><rect x="54" y="34" width="70" height="8" rx="4" fill="#c9d2dc"/>
    <rect x="16" y="56" width="168" height="78" rx="10" fill="${c}" opacity=".85" stroke="${AK}" stroke-width="4"/><circle cx="60" cy="88" r="14" fill="#fff" opacity=".7"/><path d="M90 128 L130 82 L168 128 Z" fill="#fff" opacity=".55"/></svg>`;
}
// sleeping face for a phone screen, viewBox 0 0 200 200: closed eyes, snoring mouth (.sfmouth sy)
function sleepFaceSVG() {
  return `<svg viewBox="0 0 200 200" style="overflow:visible;left:0;top:0;width:100%;height:100%">
    <path d="M38 88 Q60 104 82 88 M118 88 Q140 104 162 88" fill="none" stroke="${AK}" stroke-width="9" stroke-linecap="round"/>
    <ellipse cx="44" cy="120" rx="14" ry="8" fill="#ff8a7a" opacity=".5"/><ellipse cx="156" cy="120" rx="14" ry="8" fill="#ff8a7a" opacity=".5"/>
    <g class="sfmouth" style="transform-origin:100px 140px"><ellipse cx="100" cy="140" rx="16" ry="12" fill="#5a1414" stroke="${AK}" stroke-width="6"/></g></svg>`;
}
// awake face (for the scroll test), same box: open eyes .afe, smile
function awakeFaceSVG() {
  return `<svg viewBox="0 0 200 200" style="overflow:visible;left:0;top:0;width:100%;height:100%">
    <g class="afe" style="transform-origin:100px 88px"><ellipse cx="62" cy="88" rx="20" ry="24" fill="#fff" stroke="${AK}" stroke-width="6"/><ellipse cx="138" cy="88" rx="20" ry="24" fill="#fff" stroke="${AK}" stroke-width="6"/>
    <circle cx="66" cy="94" r="10" fill="${AK}"/><circle cx="142" cy="94" r="10" fill="${AK}"/></g>
    <path d="M70 136 Q100 166 130 136" fill="none" stroke="${AK}" stroke-width="8" stroke-linecap="round"/></svg>`;
}
