// 022 «Утопил телефон — и на сутки в рис?» — world art: an evening kitchen. Far: tiled wall with shelves and jars; mid: cabinets, window,
// sink and a fridge; near: the wooden table (CSS). Scene backdrops for the jokes: a sushi bar (H). Recurring props live in tools/props.js.
const AK = '#0a130d';
const sv = (vb, inner) => `<svg viewBox="${vb}" style="overflow:visible;left:0;top:0;width:100%;height:100%">${inner}</svg>`;
const JAR = ['#ffd34d', '#ff8a3d', '#7ddf5a', '#ff5f6d', '#c58cff', '#5fc8ff'];

function wallSVG() {   // far layer, 2400 wide, tiles + shelves with jars (repeats seamlessly)
  let s = `<defs><pattern id="wt" width="120" height="120" patternUnits="userSpaceOnUse"><rect width="120" height="120" fill="#e9d8bd"/><rect x="3" y="3" width="114" height="114" rx="10" fill="#f3e6cf"/><path d="M14 18 L40 18" stroke="#fff" stroke-width="5" opacity=".6" stroke-linecap="round"/></pattern></defs>
    <rect x="0" y="0" width="2400" height="1100" fill="url(#wt)"/>`;
  for (let k = 0; k < 4; k++) {
    const x = 60 + k * 600;
    s += `<rect x="${x}" y="300" width="460" height="26" rx="8" fill="#a8743f" stroke="${AK}" stroke-width="7"/>`;
    for (let j = 0; j < 4; j++) { const jx = x + 30 + j * 108, h = 90 + 40 * hash(k * 4 + j), c = JAR[(k + j) % 6];
      s += `<rect x="${jx}" y="${300 - h}" width="80" height="${h}" rx="16" fill="#ffffff" opacity=".85" stroke="${AK}" stroke-width="6"/><rect x="${jx + 8}" y="${300 - h * 0.7}" width="64" height="${h * 0.7 - 8}" rx="10" fill="${c}" opacity=".8"/><rect x="${jx - 4}" y="${300 - h - 14}" width="88" height="22" rx="8" fill="#7a5230" stroke="${AK}" stroke-width="6"/>`; }
  }
  return sv('0 0 2400 1100', s);
}
function kitchenSVG() {   // mid layer, 3400 wide: cabinets, window with night sky, sink, fridge, hanging lamp light
  let s = `<defs><linearGradient id="kc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb46b"/><stop offset="1" stop-color="#d9773a"/></linearGradient>
    <linearGradient id="kn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16294a"/><stop offset="1" stop-color="#2e4f80"/></linearGradient>
    <linearGradient id="kf" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f4f7fa"/><stop offset="1" stop-color="#c3cdd8"/></linearGradient>
    <radialGradient id="kl" cx="50%" cy="0%" r="70%"><stop offset="0" stop-color="rgba(255,236,190,.45)"/><stop offset="1" stop-color="rgba(255,236,190,0)"/></radialGradient></defs>`;
  for (let k = 0; k < 6; k++) { const x = 40 + k * 560;
    s += `<rect x="${x}" y="40" width="250" height="300" rx="18" fill="url(#kc)" stroke="${AK}" stroke-width="9"/><rect x="${x + 270}" y="40" width="250" height="300" rx="18" fill="url(#kc)" stroke="${AK}" stroke-width="9"/>
      <rect x="${x + 200}" y="160" width="16" height="70" rx="8" fill="#5a3a1a"/><rect x="${x + 304}" y="160" width="16" height="70" rx="8" fill="#5a3a1a"/>
      <path d="M${x + 24} 70 L${x + 90} 70" stroke="#fff" stroke-width="7" opacity=".35" stroke-linecap="round"/>`;
    if (k % 2 === 0) s += `<rect x="${x + 90}" y="430" width="340" height="300" rx="20" fill="url(#kn)" stroke="${AK}" stroke-width="11"/><path d="M${x + 260} 430 L${x + 260} 730 M${x + 90} 580 L${x + 430} 580" stroke="${AK}" stroke-width="9"/>
      <circle cx="${x + 360}" cy="500" r="34" fill="#fff6c8"/><circle cx="${x + 150}" cy="480" r="5" fill="#fff"/><circle cx="${x + 200}" cy="640" r="4" fill="#fff"/><circle cx="${x + 390}" cy="660" r="5" fill="#fff"/>
      <path d="M${x + 70} 420 Q${x + 130} 560 ${x + 100} 740" fill="none" stroke="#ff8a8a" stroke-width="26" opacity=".9"/><path d="M${x + 450} 420 Q${x + 390} 560 ${x + 420} 740" fill="none" stroke="#ff8a8a" stroke-width="26" opacity=".9"/>`;
    else s += `<rect x="${x + 120}" y="380" width="300" height="420" rx="30" fill="url(#kf)" stroke="${AK}" stroke-width="11"/><path d="M${x + 120} 520 L${x + 420} 520" stroke="${AK}" stroke-width="8"/><rect x="${x + 380}" y="420" width="14" height="70" rx="7" fill="#7a8692"/><rect x="${x + 380}" y="560" width="14" height="110" rx="7" fill="#7a8692"/>
      <circle cx="${x + 190}" cy="440" r="22" fill="#ff5f6d" stroke="${AK}" stroke-width="5"/><rect x="${x + 230}" y="570" width="60" height="70" rx="6" fill="#ffd34d" stroke="${AK}" stroke-width="5" transform="rotate(-6 ${x + 260} 605)"/>`;
    s += `<path d="M${x + 260} 0 L${x + 260} 30" stroke="${AK}" stroke-width="6"/><ellipse cx="${x + 260}" cy="400" rx="300" ry="420" fill="url(#kl)"/>`;
  }
  s += `<rect x="0" y="820" width="3400" height="40" fill="#f0e2c6" stroke="${AK}" stroke-width="8"/><rect x="0" y="860" width="3400" height="300" fill="url(#kc)" stroke="${AK}" stroke-width="8"/>`;
  for (let k = 0; k < 12; k++) s += `<rect x="${20 + k * 290}" y="880" width="260" height="250" rx="14" fill="none" stroke="#9a5626" stroke-width="7"/><rect x="${130 + k * 290}" y="900" width="40" height="12" rx="6" fill="#5a3a1a"/>`;
  return sv('0 0 3400 1160', s);
}
function sushiBarSVG() {   // joke backdrop (scene H): wooden bar, noren curtain, red lanterns, full 1080x1920
  let s = `<defs><linearGradient id="sb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a1a14"/><stop offset="1" stop-color="#6a2e1e"/></linearGradient>
    <linearGradient id="sw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2b27a"/><stop offset="1" stop-color="#b07a44"/></linearGradient>
    <radialGradient id="sl" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffdf9a"/><stop offset=".6" stop-color="#ff5f3d"/><stop offset="1" stop-color="#b8241a"/></radialGradient></defs>
    <rect x="0" y="0" width="1080" height="1920" fill="url(#sb)"/>`;
  for (let k = 0; k < 5; k++) s += `<rect x="${k * 216 + 8}" y="0" width="200" height="300" rx="10" fill="#1f2c5a" stroke="${AK}" stroke-width="8"/><circle cx="${k * 216 + 108}" cy="200" r="44" fill="none" stroke="#f4ecd9" stroke-width="10" opacity=".8"/>`;
  for (let k = 0; k < 3; k++) s += `<g class="slant${k}" style="transform-origin:${190 + k * 350}px 330px"><path d="M${190 + k * 350} 300 L${190 + k * 350} 360" stroke="${AK}" stroke-width="6"/><ellipse cx="${190 + k * 350}" cy="450" rx="80" ry="100" fill="url(#sl)" stroke="${AK}" stroke-width="9"/>
      <path d="M${130 + k * 350} 410 L${250 + k * 350} 410 M${120 + k * 350} 450 L${260 + k * 350} 450 M${130 + k * 350} 490 L${250 + k * 350} 490" stroke="#8a1a12" stroke-width="5"/></g>`;
  s += `<rect x="-20" y="1120" width="1120" height="70" rx="12" fill="url(#sw)" stroke="${AK}" stroke-width="10"/><rect x="-20" y="1190" width="1120" height="760" fill="#4a2216"/>
    <path d="M40 1140 L400 1140" stroke="#fff" stroke-width="8" opacity=".3" stroke-linecap="round"/>`;
  return sv('0 0 1080 1920', s);
}
function plateSVG() {   // long sushi plate, viewBox 0 0 700 140
  return sv('0 0 700 140', `<path d="M20 40 L680 40 L650 120 L50 120 Z" fill="#f4f6f8" stroke="${AK}" stroke-width="10" stroke-linejoin="round"/><path d="M60 60 L300 60" stroke="#fff" stroke-width="8" opacity=".8" stroke-linecap="round"/><path d="M40 52 L660 52" stroke="#3d7fd8" stroke-width="6"/>`);
}
function earSVGBox() { return earCutSVG('f'); }
function windSVG() {   // breeze lines, viewBox 0 0 600 300; paths .wl0..wl3 draw on with dash
  let s = ''; for (let k = 0; k < 4; k++) { const y = 40 + k * 70; s += `<path class="wl${k}" pathLength="100" d="M0 ${y} Q150 ${y - 30} 300 ${y} T600 ${y}" fill="none" stroke="#e9fbff" stroke-width="12" stroke-linecap="round" opacity=".9" style="stroke-dasharray:60 140;stroke-dashoffset:100"/>`; }
  return sv('0 0 600 300', s);
}
function cableSVG() {   // charging cable plug from the right, viewBox 0 0 520 120 (plug tip at x 0..90, y 60)
  return sv('0 0 520 120', `<path d="M180 60 Q350 60 520 20" fill="none" stroke="${AK}" stroke-width="30" stroke-linecap="round"/><path d="M180 60 Q350 60 520 20" fill="none" stroke="#f4f6f8" stroke-width="16" stroke-linecap="round"/>
    <rect x="70" y="26" width="130" height="68" rx="20" fill="#f4f6f8" stroke="${AK}" stroke-width="9"/><rect x="0" y="40" width="80" height="40" rx="12" fill="#c9d2dc" stroke="${AK}" stroke-width="8"/><path d="M90 40 L170 40" stroke="#fff" stroke-width="6" opacity=".8"/>`);
}
function crossSVG(id) { return sv('0 0 160 160', `<circle cx="80" cy="80" r="70" fill="#fff" stroke="${AK}" stroke-width="10"/><path class="${id}" pathLength="100" d="M48 48 L112 112 M112 48 L48 112" stroke="#ff3b5c" stroke-width="18" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/></svg>`); }
function alertSVG() {   // phone screen alert: water drop + crossed lightning, viewBox 0 0 224 400 (phone screen area)
  return sv('0 110 224 190', `<rect x="12" y="120" width="200" height="170" rx="22" fill="#fff" stroke="${AK}" stroke-width="6"/><path d="M70 150 Q92 186 92 200 Q92 224 70 224 Q48 224 48 200 Q48 186 70 150 Z" fill="#5fc8ff" stroke="${AK}" stroke-width="5"/>
    <path d="M150 148 L128 196 L150 196 L136 236 L170 184 L148 184 Z" fill="#ffd34d" stroke="${AK}" stroke-width="5" stroke-linejoin="round"/><path d="M122 150 L180 230" stroke="#ff3b5c" stroke-width="9" stroke-linecap="round"/>
    <rect x="40" y="246" width="144" height="14" rx="7" fill="#9aa4b2"/><rect x="60" y="266" width="104" height="10" rx="5" fill="#c3cad3"/>`);
}
function palmSVG() {   // open white-gloved hand seen from the side, palm up (the "ладонь" to tap the phone on), viewBox 0 0 380 240; cuff on the right
  return sv('0 0 380 240', `<path d="M20 160 Q12 118 52 112 L246 106 Q262 54 292 62 Q314 72 304 112 L322 122 Q352 130 352 168 Q348 206 306 210 L58 210 Q20 206 20 160 Z" fill="#ffffff" stroke="${AK}" stroke-width="11" stroke-linejoin="round"/>
    <path d="M34 140 L170 136 M34 176 L170 176" stroke="#c9d2dc" stroke-width="7" stroke-linecap="round"/><path d="M60 124 L150 120" stroke="#eef2f6" stroke-width="8" stroke-linecap="round"/>
    <rect x="330" y="110" width="50" height="112" rx="16" fill="#7cc423" stroke="${AK}" stroke-width="9"/><path d="M380 166 L520 200" stroke="${AK}" stroke-width="40" stroke-linecap="round"/><path d="M380 166 L520 200" stroke="#7cc423" stroke-width="24" stroke-linecap="round"/>`);
}
