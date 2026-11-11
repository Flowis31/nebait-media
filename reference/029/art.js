// 029 art: the evening bedroom world (window with night/morning sky, wall, floor) and the scene-only drawings.
// Recurring props (app character, app card, bed, book, battery, phone cutaway, trash bin, screwdriver) live in tools/props.js.
const AIK = '#0a130d';

// ---------- world, far layer: big window with the sky (night layer + morning layer on top, morning faded by time) ----------
function skySVG(id, morning = false) {
  let stars = '';
  if (!morning) for (let k = 0; k < 46; k++) { const x = 40 + hash(k * 3.1) * 2320, y = 30 + hash(k * 7.7) * 560, r = 2 + hash(k * 1.9) * 4.5;
    stars += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#fff" opacity="${(0.4 + 0.6 * hash(k)).toFixed(2)}"/>`; }
  let city = '';
  for (let k = 0; k < 22; k++) { const w = 70 + hash(k * 2.3) * 90, h = 160 + hash(k * 5.1) * 300, x = k * 110 - 20;
    city += `<rect x="${x.toFixed(0)}" y="${(900 - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${morning ? '#7f8fd8' : '#1b1846'}"/>`;
    for (let j = 0; j < 6; j++) if (hash(k * 13 + j) > (morning ? 0.9 : 0.45)) city += `<rect x="${(x + 14 + (j % 2) * 30).toFixed(0)}" y="${(900 - h + 24 + Math.floor(j / 2) * 46).toFixed(0)}" width="16" height="22" fill="${morning ? '#c9d4ff' : '#ffd36b'}" opacity=".85"/>`; }
  const sky = morning ? `<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fc8ff"/><stop offset=".7" stop-color="#ffd7a8"/><stop offset="1" stop-color="#ffb07a"/></linearGradient>`
    : `<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c0a2c"/><stop offset=".7" stop-color="#2a1f6a"/><stop offset="1" stop-color="#4a2f86"/></linearGradient>`;
  const orb = morning ? `<circle cx="1500" cy="300" r="110" fill="#fff3b0"/><circle cx="1500" cy="300" r="170" fill="#fff3b0" opacity=".25"/>`
    : `<circle cx="1500" cy="250" r="90" fill="#fff6d6"/><circle cx="1470" cy="230" r="18" fill="#e8dcb0"/><circle cx="1530" cy="280" r="12" fill="#e8dcb0"/><circle cx="1500" cy="250" r="150" fill="#fff6d6" opacity=".12"/>`;
  return `<svg viewBox="0 0 2400 900" style="position:absolute;left:0;top:0;width:2400px;height:900px"><defs>${sky}</defs>
    <rect width="2400" height="900" fill="url(#sk${id})"/>${stars}${orb}${city}</svg>`;
}
// mid layer: the wall with three windows cut into it (the sky shows through), shelves, frames, a lamp. Width 3000.
function wallSVG(id) {
  let out = '';
  const win = x => `<rect x="${x}" y="150" width="560" height="640" rx="18" fill="none" stroke="#2a2148" stroke-width="40"/><path d="M${x + 280} 150 L${x + 280} 790 M${x} 470 L${x + 560} 470" stroke="#2a2148" stroke-width="22"/>
    <rect x="${x - 30}" y="780" width="620" height="40" rx="10" fill="#3a2f66" stroke="${AIK}" stroke-width="8"/>`;
  const frame = (x, y, c) => `<rect x="${x}" y="${y}" width="150" height="180" rx="10" fill="#f4ecd9" stroke="${AIK}" stroke-width="9"/><rect x="${x + 18}" y="${y + 18}" width="114" height="144" rx="6" fill="${c}"/><path d="M${x + 18} ${y + 162} L${x + 60} ${y + 100} L${x + 90} ${y + 130} L${x + 132} ${y + 80} L${x + 132} ${y + 162} Z" fill="#fff" opacity=".35"/>`;
  // the wall itself with holes for the windows (evenodd)
  let holes = ''; [200, 1200, 2200].forEach(x => holes += ` M${x} 150 h560 v640 h-560 Z`);
  out += `<path d="M0 0 H3000 V1400 H0 Z${holes}" fill="url(#wl${id})" fill-rule="evenodd"/>`;
  for (let k = 0; k < 30; k++) out += `<path d="M${k * 100 + 50} 0 L${k * 100 + 50} 1400" stroke="#ffffff" stroke-width="3" opacity=".035"/>`;
  [200, 1200, 2200].forEach(x => out += win(x));
  out += frame(1060, 540, '#ff8a7a') + frame(1880, 330, '#7df9ff') + frame(2860, 260, '#ffd34d');
  // string lights along the top
  let bulbs = '<path d="M0 70 Q250 130 500 70 T1000 70 T1500 70 T2000 70 T2500 70 T3000 70" fill="none" stroke="#1a1436" stroke-width="5"/>';
  for (let k = 0; k < 30; k++) { const x = k * 100 + 50, y = 70 + 30 * Math.abs(Math.sin((x / 500) * Math.PI)); bulbs += `<circle cx="${x}" cy="${(y + 12).toFixed(0)}" r="11" fill="${['#ffd36b', '#ff8ae0', '#7df9ff'][k % 3]}"/><circle cx="${x}" cy="${(y + 12).toFixed(0)}" r="26" fill="${['#ffd36b', '#ff8ae0', '#7df9ff'][k % 3]}" opacity=".18"/>`; }
  return `<svg viewBox="0 0 3000 1400" style="position:absolute;left:0;top:0;width:3000px;height:1400px"><defs>${lg('wl' + id, '#3b2f78', '#251d52')}</defs>${out}${bulbs}</svg>`;
}
// near layer: the floor with a rug and floorboards. Width 3200, height 700 (top edge at y 0 of the layer).
function floorSVG(id) {
  let b = '';
  for (let k = 0; k < 16; k++) b += `<path d="M${k * 200} 30 L${k * 200 - 120} 700" stroke="#1d1538" stroke-width="5" opacity=".7"/>`;
  return `<svg viewBox="0 0 3200 700" style="position:absolute;left:0;top:0;width:3200px;height:700px"><defs>${lg('fl' + id, '#5a3f8a', '#2d2052')}</defs>
    <rect x="0" y="0" width="3200" height="34" fill="#1a1436"/><rect x="0" y="30" width="3200" height="670" fill="url(#fl${id})"/>${b}
    <ellipse cx="800" cy="200" rx="520" ry="90" fill="#ff8ae0" opacity=".22"/><ellipse cx="2400" cy="200" rx="520" ry="90" fill="#7df9ff" opacity=".16"/></svg>`;
}

// ---------- big phone body (front, screen 40..560 x 90..1050 inside a 600x1140 box) ----------
function bigPhoneSVG(id) {
  return `<svg viewBox="0 0 600 1140" style="left:0;top:0;width:100%;height:100%;overflow:visible"><defs>${lg('bp' + id, '#4a5670', '#1d2333')}${lg('bps' + id, '#2c2a66', '#151236')}</defs>
    <rect x="10" y="10" width="580" height="1120" rx="84" fill="url(#bp${id})" stroke="${AIK}" stroke-width="14"/>
    <rect x="40" y="70" width="520" height="1000" rx="58" fill="url(#bps${id})" stroke="${AIK}" stroke-width="7"/>
    <rect x="230" y="28" width="140" height="26" rx="13" fill="#0a0c10"/>
    <rect class="bphome" x="220" y="1040" width="160" height="14" rx="7" fill="#fff" opacity=".7"/>
    <path d="M60 180 Q60 100 140 96" fill="none" stroke="#fff" stroke-width="10" opacity=".22" stroke-linecap="round"/>
    <path d="M596 260 L596 360" stroke="#7a869c" stroke-width="12" stroke-linecap="round"/></svg>`;
}
// pointing glove on a green sleeve (the mascot's hand in close-ups), viewBox 0 0 260 700: fingertip at (130, 20), sleeve down to y 700.
function handSVG(id) {
  return `<svg viewBox="0 0 260 700" style="left:0;top:0;width:100%;height:100%;overflow:visible"><defs>${rg('hg' + id, '#ffffff', '#d9d0bb')}${lg('hs' + id, '#9be33a', '#5aa012', false)}</defs>
    <path d="M70 700 L80 360 L180 360 L190 700 Z" fill="url(#hs${id})" stroke="${AIK}" stroke-width="12" stroke-linejoin="round"/>
    <path d="M96 380 L92 690" stroke="#c9ff6e" stroke-width="8" opacity=".6" stroke-linecap="round"/>
    <path d="M62 390 Q40 300 60 250 Q70 220 96 226 L100 60 Q100 18 130 18 Q160 18 160 60 L162 196 Q176 180 196 190 Q214 200 210 230 Q228 222 238 244 Q246 270 230 300 Q216 360 200 390 Z" fill="url(#hg${id})" stroke="${AIK}" stroke-width="11" stroke-linejoin="round"/>
    <path d="M162 196 L164 262 M210 230 L204 280" stroke="#b7ad98" stroke-width="7" stroke-linecap="round" fill="none"/>
    <path d="M58 392 L204 392" stroke="${AIK}" stroke-width="10"/><rect x="56" y="378" width="152" height="34" rx="12" fill="#f4ecd9" stroke="${AIK}" stroke-width="9"/>
    <circle cx="118" cy="56" r="10" fill="#fff"/></svg>`;
}
// fork (B: «тайком ем батарею»), viewBox 0 0 80 300
function forkSVG(id) {
  return `<svg viewBox="0 0 80 300" style="left:0;top:0;width:100%;height:100%;overflow:visible">
    <path d="M14 10 L14 70 Q14 100 40 104 Q66 100 66 70 L66 10" fill="none" stroke="${AIK}" stroke-width="22" stroke-linecap="round"/>
    <path d="M14 10 L14 70 Q14 100 40 104 Q66 100 66 70 L66 10 M40 14 L40 100" fill="none" stroke="#d9e2ee" stroke-width="10" stroke-linecap="round"/>
    <path d="M40 104 L40 290" stroke="${AIK}" stroke-width="26" stroke-linecap="round"/><path d="M40 104 L40 290" stroke="#d9e2ee" stroke-width="12" stroke-linecap="round"/></svg>`;
}
// thought cloud frame (B: what you THINK happens), viewBox 0 0 1000 1000
function cloudSVG(id) {
  return `<svg viewBox="0 0 1000 1000" style="left:0;top:0;width:100%;height:100%;overflow:visible">
    <path d="M160 300 Q120 150 280 130 Q340 30 480 70 Q600 10 700 90 Q860 80 870 230 Q980 300 920 450 Q990 600 880 690 Q880 840 720 830 Q620 930 480 870 Q340 940 250 840 Q90 840 100 680 Q10 560 90 440 Q40 330 160 300 Z"
      fill="#2a1f6a" fill-opacity=".55" stroke="#c9b8ff" stroke-width="12" stroke-dasharray="34 22" stroke-linecap="round"/></svg>`;
}
// staircase (I: cold start = many steps), viewBox 0 0 560 620: five steps rising to the right, each 112 wide x 110 high. .stp0..stp4
function stairsSVG(id) {
  let s = '';
  for (let k = 0; k < 5; k++) { const x = k * 112, y = 520 - k * 110;
    s += `<g class="stp${k}" style="transform-box:fill-box;transform-origin:50% 100%"><rect x="${x}" y="${y}" width="112" height="${620 - y}" fill="url(#st${id})" stroke="${AIK}" stroke-width="9"/><path d="M${x + 10} ${y + 14} L${x + 100} ${y + 14}" stroke="#fff" stroke-width="7" opacity=".5" stroke-linecap="round"/></g>`; }
  return `<svg viewBox="0 0 560 620" style="left:0;top:0;width:100%;height:100%;overflow:visible"><defs>${lg('st' + id, '#9fd8ff', '#3a6fd8')}</defs>${s}</svg>`;
}
// single low step (I: after a pause), viewBox 0 0 200 120
function stepSVG(id) {
  return `<svg viewBox="0 0 200 120" style="left:0;top:0;width:100%;height:100%;overflow:visible"><defs>${lg('s1' + id, '#ffe39a', '#ff9a3d')}</defs>
    <rect x="6" y="6" width="188" height="108" rx="10" fill="url(#s1${id})" stroke="${AIK}" stroke-width="9"/><path d="M20 22 L180 22" stroke="#fff" stroke-width="7" opacity=".5" stroke-linecap="round"/></svg>`;
}
// gear, viewBox 0 0 200 200 (spin with r)
function gearSVG(id, col = '#ffd34d') {
  let teeth = ''; for (let k = 0; k < 10; k++) teeth += `<rect x="88" y="6" width="24" height="40" rx="5" fill="${col}" stroke="${AIK}" stroke-width="7" transform="rotate(${k * 36} 100 100)"/>`;
  return `<svg viewBox="0 0 200 200" style="left:0;top:0;width:100%;height:100%;overflow:visible">${teeth}<circle cx="100" cy="100" r="66" fill="${col}" stroke="${AIK}" stroke-width="9"/><circle cx="100" cy="100" r="22" fill="#2a1f6a" stroke="${AIK}" stroke-width="8"/></svg>`;
}
// snowflake, viewBox 0 0 100 100
function flakeSVG() {
  return `<svg viewBox="0 0 100 100" style="left:0;top:0;width:100%;height:100%;overflow:visible"><g stroke="${AIK}" stroke-width="16" stroke-linecap="round"><path d="M50 8 L50 92 M14 29 L86 71 M14 71 L86 29"/></g><g stroke="#dff6ff" stroke-width="7" stroke-linecap="round"><path d="M50 8 L50 92 M14 29 L86 71 M14 71 L86 29"/></g></svg>`;
}
// sweat drop, viewBox 0 0 60 80
function sweatSVG() { return `<svg viewBox="0 0 60 80" style="left:0;top:0;width:100%;height:100%;overflow:visible"><path d="M30 4 Q54 44 52 56 Q50 76 30 76 Q10 76 8 56 Q6 44 30 4 Z" fill="#7df9ff" stroke="${AIK}" stroke-width="7"/><circle cx="22" cy="54" r="6" fill="#fff"/></svg>`; }
