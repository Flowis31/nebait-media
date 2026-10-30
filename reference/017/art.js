// 017 art: one-off pieces for this video (recurring props live in tools/props.js)
const AK = '#0a130d';
// red barn, viewBox 0 0 400 400 (ground at y 400). .bdoor for a wiggle
function barnSVG(id) {
  return `<svg viewBox="0 0 400 400" style="overflow:visible;left:0;top:0;width:100%;height:100%"><defs>
    <linearGradient id="br${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7a5a"/><stop offset="1" stop-color="#a8261c"/></linearGradient>
    <linearGradient id="bo${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a4a2a"/><stop offset="1" stop-color="#3a1e0e"/></linearGradient></defs>
    <path d="M40 180 L200 60 L360 180 L360 396 L40 396 Z" fill="url(#br${id})" stroke="${AK}" stroke-width="12" stroke-linejoin="round"/>
    <path d="M20 190 L200 50 L380 190" fill="none" stroke="#f4ecd9" stroke-width="22" stroke-linejoin="round"/><path d="M20 190 L200 50 L380 190" fill="none" stroke="${AK}" stroke-width="8" stroke-linejoin="round" transform="translate(0,-14)"/>
    <rect x="160" y="120" width="80" height="60" rx="6" fill="#ffe08a" stroke="${AK}" stroke-width="8"/><path d="M200 120 L200 180 M160 150 L240 150" stroke="${AK}" stroke-width="6"/>
    <g class="bdoor"><rect x="120" y="240" width="160" height="156" fill="url(#bo${id})" stroke="${AK}" stroke-width="10"/>
    <path d="M120 240 L280 396 M280 240 L120 396" stroke="#f4ecd9" stroke-width="12"/><rect x="120" y="240" width="160" height="156" fill="none" stroke="#f4ecd9" stroke-width="10"/></g>
    <path d="M60 200 L60 380" stroke="#fff" stroke-width="8" opacity=".25" stroke-linecap="round"/>
    <path d="M330 120 L330 60 L356 60 L356 140" fill="#8a8a8a" stroke="${AK}" stroke-width="8"/></svg>`;
}
// coin with a word on its face, viewBox 0 0 200 200
function wordCoinSVG(id, word, fs = 34) {
  return `<svg viewBox="0 0 200 200" style="overflow:visible;left:0;top:0;width:100%;height:100%"><defs><radialGradient id="wc${id}" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#fff6b0"/><stop offset="1" stop-color="#e0a400"/></radialGradient></defs>
    <circle cx="100" cy="100" r="88" fill="url(#wc${id})" stroke="${AK}" stroke-width="11"/><circle cx="100" cy="100" r="66" fill="none" stroke="#c78f00" stroke-width="7"/>
    <text x="100" y="${100 + fs * 0.36}" text-anchor="middle" style="font:900 ${fs}px Unb" fill="#8a5a00">${word}</text>
    <path d="M46 70 Q60 40 96 34" fill="none" stroke="#fff" stroke-width="8" opacity=".7" stroke-linecap="round"/></svg>`;
}
// far hills silhouette for the background layer, 3400 x 260
function hillsSVG() {
  let d = 'M0 260 L0 150'; for (let x = 0; x <= 3400; x += 170) d += ` Q${x + 85} ${60 + 70 * hash(x)} ${x + 170} ${130 + 40 * hash(x + 3)}`; d += ' L3400 260 Z';
  let d2 = 'M0 260 L0 200'; for (let x = 0; x <= 3400; x += 240) d2 += ` Q${x + 120} ${140 + 50 * hash(x + 9)} ${x + 240} ${190 + 20 * hash(x + 5)}`; d2 += ' L3400 260 Z';
  let trees = ''; for (let k = 0; k < 26; k++) { const x = 60 + k * 131 + 50 * hash(k), y = 170 + 40 * hash(k + 2), h = 50 + 40 * hash(k + 4); trees += `<path d="M${x} ${y} L${x - h * 0.35} ${y + h} L${x + h * 0.35} ${y + h} Z" fill="#2a1a1c"/>`; }
  return `<svg viewBox="0 0 3400 260" style="left:0;top:0;width:100%;height:100%"><path d="${d}" fill="#6a2f36"/>${trees}<path d="${d2}" fill="#3a2016"/></svg>`;
}
// crossroads seen from above-front: stem from the bottom to the fork, two branches to the sides. Branch paths .rbL/.rbR (dash draw-on)
// fork at (540, fy); ends at (lx, ly) and (rx, ry)
function roadSVG(id, fy = 900, by = 1320, ly = 600, ry = 600, lx = 120, rx = 960) {
  const stem = `M470 ${by} L500 ${fy} L580 ${fy} L610 ${by} Z`;
  const bL = `M540 ${fy + 20} Q${(540 + lx) / 2} ${fy - 30} ${lx} ${ly}`, bR = `M540 ${fy + 20} Q${(540 + rx) / 2} ${fy - 30} ${rx} ${ry}`;
  return `<svg viewBox="0 0 1080 1320" style="left:0;top:0;width:100%;height:100%">
    <path d="${stem}" fill="#c9a874" stroke="${AK}" stroke-width="8" stroke-linejoin="round"/>
    <path class="rbL" d="${bL}" pathLength="100" fill="none" stroke="${AK}" stroke-width="104" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:0"/>
    <path class="rbL" d="${bL}" pathLength="100" fill="none" stroke="#c9a874" stroke-width="86" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:0"/>
    <path class="rbR" d="${bR}" pathLength="100" fill="none" stroke="${AK}" stroke-width="104" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:0"/>
    <path class="rbR" d="${bR}" pathLength="100" fill="none" stroke="#c9a874" stroke-width="86" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:0"/>
    <path d="M540 ${by - 10} L540 ${fy + 30}" stroke="#f4ecd9" stroke-width="8" stroke-dasharray="30 30" opacity=".6"/>
    <path class="rArrow" d="${bR}" pathLength="100" fill="none" stroke="#ffc34a" stroke-width="22" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/>
  </svg>`;
}
const BR = { fy: 900, ly: 600, ry: 600, lx: 120, rx: 960 };
// point on a road branch (quadratic), side = -1 left / 1 right, u in 0..1
function branchPt(side, u, g = BR) {
  const x0 = 540, y0 = g.fy + 20, x2 = side < 0 ? g.lx : g.rx, y2 = side < 0 ? g.ly : g.ry, x1 = (540 + x2) / 2, y1 = g.fy - 30;
  const a = (1 - u) * (1 - u), b = 2 * u * (1 - u), c = u * u; return [a * x0 + b * x1 + c * x2, a * y0 + b * y1 + c * y2];
}
// small bot face for screens and pans, viewBox 0 0 200 200
function botFaceSVG(id, col = '#6ad1ff') {
  return `<svg viewBox="0 0 200 200" style="overflow:visible;left:0;top:0;width:100%;height:100%"><defs><linearGradient id="bf${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${col}"/></linearGradient></defs>
    <path d="M100 30 L100 8" stroke="${AK}" stroke-width="8" stroke-linecap="round"/><circle cx="100" cy="8" r="10" fill="#ffd34d" stroke="${AK}" stroke-width="5"/>
    <rect x="20" y="30" width="160" height="140" rx="40" fill="url(#bf${id})" stroke="${AK}" stroke-width="9"/>
    <rect x="38" y="52" width="124" height="90" rx="26" fill="#13202e" stroke="${AK}" stroke-width="6"/>
    <ellipse class="bfe" cx="76" cy="92" rx="15" ry="18" fill="#8ff0ff"/><ellipse class="bfe" cx="124" cy="92" rx="15" ry="18" fill="#8ff0ff"/>
    <rect x="80" y="120" width="40" height="10" rx="5" fill="#8ff0ff"/></svg>`;
}
