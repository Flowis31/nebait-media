// 018 art: one-off pieces for «Тёмная тема» (recurring props — battery, slider, sunglasses, phone — live in tools/props.js)
const AK = '#0a130d';
const sv = (vb, inner) => `<svg viewBox="${vb}" style="overflow:visible;left:0;top:0;width:100%;height:100%">${inner}</svg>`;

// phone screen content for phonePropSVG (screen area 22..198 x 44..374): a chat app in light or dark theme
function themeScreen(dark) {
  const bg = dark ? '#0c0f16' : '#f7f9fd', bar = dark ? '#1c2232' : '#e3e9f3', ln = dark ? '#596276' : '#b9c3d3', me = dark ? '#2f5fb0' : '#7ab8ff';
  return `<rect x="22" y="44" width="176" height="330" rx="18" fill="${bg}"/><rect x="22" y="44" width="176" height="44" rx="18" fill="${bar}"/>
    <circle cx="48" cy="66" r="11" fill="${ln}"/><rect x="66" y="60" width="80" height="12" rx="6" fill="${ln}"/>
    <rect x="34" y="104" width="110" height="38" rx="14" fill="${bar}"/><rect x="44" y="114" width="80" height="8" rx="4" fill="${ln}"/><rect x="44" y="128" width="54" height="8" rx="4" fill="${ln}"/>
    <rect x="76" y="156" width="110" height="38" rx="14" fill="${me}"/><rect x="86" y="166" width="84" height="8" rx="4" fill="#fff" opacity=".8"/><rect x="86" y="180" width="50" height="8" rx="4" fill="#fff" opacity=".8"/>
    <rect x="34" y="208" width="130" height="38" rx="14" fill="${bar}"/><rect x="44" y="218" width="100" height="8" rx="4" fill="${ln}"/><rect x="44" y="232" width="70" height="8" rx="4" fill="${ln}"/>
    <rect x="96" y="260" width="90" height="26" rx="12" fill="${me}"/>
    <rect x="34" y="330" width="152" height="30" rx="15" fill="${bar}"/>
    ${dark ? `<g transform="translate(160 66)"><path d="M0 -12 A12 12 0 1 0 10 6 A9 9 0 1 1 0 -12 Z" fill="#cfe0ff"/></g>` : `<g transform="translate(166 66)"><circle r="8" fill="#ffb800"/><path d="M0 -15 L0 -12 M0 12 L0 15 M-15 0 L-12 0 M12 0 L15 0" stroke="#ffb800" stroke-width="3"/></g>`}`;
}
// far skyline with lit windows, viewBox 0 0 3400 280 (bottom at 280)
function citySVG() {
  let s = '';
  for (let k = 0; k < 40; k++) {
    const w = 60 + 70 * hash(k * 1.7), h = 90 + 170 * hash(k * 2.3 + 1), x = k * 86 + 20 * hash(k), y = 280 - h;
    s += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${k % 2 ? '#1a1f4a' : '#20265a'}"/>`;
    for (let r = 0; r < Math.floor(h / 34); r++) for (let c = 0; c < Math.floor(w / 26); c++) if (hash(k * 31 + r * 7 + c * 3) > 0.62)
      s += `<rect x="${(x + 8 + c * 26).toFixed(0)}" y="${(y + 12 + r * 34).toFixed(0)}" width="12" height="16" fill="#ffd96a" opacity="${(0.5 + 0.5 * hash(k + r + c)).toFixed(2)}"/>`;
  }
  return `<svg viewBox="0 0 3400 280" preserveAspectRatio="none" style="left:0;top:0;width:100%;height:100%">${s}</svg>`;
}
// the beach sun, viewBox 0 0 300 300. .srays rotates
function sunSVG(id) {
  let r = ''; for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; r += `<path d="M${(150 + 105 * Math.cos(a)).toFixed(1)} ${(150 + 105 * Math.sin(a)).toFixed(1)} L${(150 + 150 * Math.cos(a)).toFixed(1)} ${(150 + 150 * Math.sin(a)).toFixed(1)}" stroke="#ffe14d" stroke-width="16" stroke-linecap="round"/>`; }
  return sv('0 0 300 300', `<defs><radialGradient id="su${id}" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#fffbe0"/><stop offset="1" stop-color="#ffb800"/></radialGradient></defs>
    <g class="srays" style="transform-origin:150px 150px">${r}</g><circle cx="150" cy="150" r="88" fill="url(#su${id})" stroke="${AK}" stroke-width="10"/>
    <path d="M100 120 Q112 92 140 86" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".8"/>`);
}
// beach umbrella, viewBox 0 0 460 640 (pole foot at 230,640)
function umbrellaSVG(id) {
  return sv('0 0 460 640', `<defs><linearGradient id="um${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff5f7a"/><stop offset="1" stop-color="#e2243f"/></linearGradient></defs>
    <path d="M230 120 L250 640" stroke="${AK}" stroke-width="22" stroke-linecap="round"/><path d="M230 120 L250 640" stroke="#e8e0d0" stroke-width="10" stroke-linecap="round"/>
    <path d="M20 200 Q230 -20 440 200 Q385 175 335 200 Q283 172 230 200 Q177 172 125 200 Q75 175 20 200 Z" fill="url(#um${id})" stroke="${AK}" stroke-width="11" stroke-linejoin="round"/>
    <path d="M125 200 Q150 60 230 40 Q310 60 335 200 Q283 172 230 200 Q177 172 125 200 Z" fill="#fff4e0" stroke="${AK}" stroke-width="9" stroke-linejoin="round"/>
    <path d="M60 150 Q110 80 180 60" fill="none" stroke="#fff" stroke-width="9" opacity=".6" stroke-linecap="round"/>`);
}
// sunbed, viewBox 0 0 640 200
function sunbedSVG(id) {
  return sv('0 0 640 200', `<defs><linearGradient id="sb${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ae0ff"/><stop offset="1" stop-color="#2a8ac0"/></linearGradient></defs>
    <path d="M80 110 L60 196 M560 110 L590 196 M300 110 L300 196" stroke="${AK}" stroke-width="16" stroke-linecap="round"/>
    <path d="M40 70 L520 70 L620 10 L640 30 L560 110 L40 110 Z" fill="url(#sb${id})" stroke="${AK}" stroke-width="11" stroke-linejoin="round"/>
    <path d="M70 80 L500 80" stroke="#fff" stroke-width="8" opacity=".5" stroke-linecap="round"/><path d="M120 70 L120 110 M200 70 L200 110 M280 70 L280 110 M360 70 L360 110 M440 70 L440 110" stroke="#fff" stroke-width="6" opacity=".35"/>`);
}
// sea surf strip, viewBox 0 0 3400 120
function seaSVG() {
  let d = 'M0 60'; for (let x = 0; x <= 3400; x += 100) d += ` Q${x + 50} ${x % 200 ? 30 : 90} ${x + 100} 60`;
  return `<svg viewBox="0 0 3400 120" preserveAspectRatio="none" style="left:0;top:0;width:100%;height:100%"><path d="${d} L3400 120 L0 120 Z" fill="#f4d9a0"/><path d="${d}" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round"/></svg>`;
}
// wall socket + plug "food", viewBox 0 0 240 240
function plugSVG(id) {
  return sv('0 0 240 240', `<defs><linearGradient id="pg${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c9d2dc"/></linearGradient></defs>
    <rect x="20" y="20" width="200" height="200" rx="44" fill="url(#pg${id})" stroke="${AK}" stroke-width="12"/>
    <circle cx="120" cy="120" r="62" fill="#e8edf3" stroke="${AK}" stroke-width="9"/><circle cx="96" cy="120" r="12" fill="${AK}"/><circle cx="144" cy="120" r="12" fill="${AK}"/>
    <path d="M44 48 L100 40" stroke="#fff" stroke-width="9" opacity=".8" stroke-linecap="round"/>`);
}
function boltSVG(id) {
  return sv('0 0 70 96', `<path d="M44 4 L8 56 L32 56 L22 92 L62 36 L38 36 Z" fill="#ffe14d" stroke="${AK}" stroke-width="7" stroke-linejoin="round"/>`);
}
function sunIcon() { let r = ''; for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; r += `<path d="M${(50 + 30 * Math.cos(a)).toFixed(1)} ${(50 + 30 * Math.sin(a)).toFixed(1)} L${(50 + 44 * Math.cos(a)).toFixed(1)} ${(50 + 44 * Math.sin(a)).toFixed(1)}" stroke="#ffb800" stroke-width="8" stroke-linecap="round"/>`; }
  return sv('0 0 100 100', `${r}<circle cx="50" cy="50" r="20" fill="#ffd34d" stroke="${AK}" stroke-width="6"/>`); }
function moonIcon() { return sv('0 0 100 100', `<path d="M58 8 A42 42 0 1 0 92 66 A32 32 0 1 1 58 8 Z" fill="#cfe0ff" stroke="${AK}" stroke-width="6" stroke-linejoin="round"/>`); }
// red strike-through for the «47%»
function strikeSVG() { return sv('0 0 330 140', `<path class="stk" d="M10 120 L320 20" pathLength="100" stroke="#ff3b5c" stroke-width="22" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/>`); }
// line from a lamp in the grid to the big bulb, stage coords
function callLine(x0, y0, x1, y1) { return `<svg viewBox="0 0 1080 1320" style="left:0;top:0;width:100%;height:100%"><path class="cl" d="M${x0} ${y0} Q${(x0 + x1) / 2} ${Math.min(y0, y1) - 60} ${x1} ${y1}" pathLength="100" fill="none" stroke="#ffe14d" stroke-width="8" stroke-dasharray="100" stroke-dashoffset="100" stroke-linecap="round"/></svg>`; }
// a little check mark in a green disc, viewBox 0 0 140 140
function okSVG() { return sv('0 0 140 140', `<circle cx="70" cy="70" r="60" fill="#25a04a" stroke="${AK}" stroke-width="9"/><path class="okp" d="M40 72 L62 94 L102 50" pathLength="100" fill="none" stroke="#fff" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" style="stroke-dasharray:100;stroke-dashoffset:100"/>`); }
