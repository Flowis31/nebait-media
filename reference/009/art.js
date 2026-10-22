// 009 art: the PHP "cook", kitchen props, hacker glove, soup, patch. Ink #0a130d, flat fills + one gradient each.
const INK = '#0a130d';
const sv = (vb, body, extra = '') => `<svg viewBox="${vb}" style="overflow:visible;left:0;top:0;width:100%;height:100%" ${extra}>${body}</svg>`;

// cook robot: box body, chef hat, apron "PHP". Parts: .ckArmL/.ckArmR (shoulders 70,250 / 330,250), .ckPan, .ckEye (pupils), .ckMouth, .ckHat
function cookSVG(id) {
  return sv('0 0 400 480', `<defs><linearGradient id="ckb${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b3b9ff"/><stop offset="1" stop-color="#6c74e0"/></linearGradient></defs>
  <g class="ckArmL" style="transform-origin:72px 250px"><path d="M72 250 Q20 300 40 360" fill="none" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M72 250 Q20 300 40 360" fill="none" stroke="#8f97f5" stroke-width="15" stroke-linecap="round"/><circle cx="40" cy="364" r="24" fill="#fff" stroke="${INK}" stroke-width="8"/></g>
  <g class="ckArmR" style="transform-origin:328px 250px"><path d="M328 250 Q380 290 372 340" fill="none" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M328 250 Q380 290 372 340" fill="none" stroke="#8f97f5" stroke-width="15" stroke-linecap="round"/>
    <g class="ckPan" style="transform-origin:372px 340px"><rect x="360" y="330" width="90" height="20" rx="10" fill="#3a2f2a" stroke="${INK}" stroke-width="7"/><ellipse cx="500" cy="338" rx="70" ry="22" fill="#2b2b33" stroke="${INK}" stroke-width="9"/><ellipse cx="500" cy="332" rx="50" ry="10" fill="#4a4a58"/></g>
    <circle cx="372" cy="344" r="24" fill="#fff" stroke="${INK}" stroke-width="8"/></g>
  <rect x="80" y="150" width="240" height="300" rx="56" fill="url(#ckb${id})" stroke="${INK}" stroke-width="12"/>
  <path d="M104 190 Q110 168 136 162" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".55"/>
  <path d="M120 300 L280 300 L268 440 L132 440 Z" fill="#f4ecd9" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
  <text x="200" y="384" text-anchor="middle" font-family="Unb" font-weight="900" font-size="54" fill="#5a62c8">PHP</text>
  <circle cx="160" cy="226" r="30" fill="#fff" stroke="${INK}" stroke-width="8"/><circle cx="240" cy="226" r="30" fill="#fff" stroke="${INK}" stroke-width="8"/>
  <g class="ckEye"><circle cx="164" cy="230" r="13" fill="${INK}"/><circle cx="244" cy="230" r="13" fill="${INK}"/><circle cx="169" cy="224" r="4.5" fill="#fff"/><circle cx="249" cy="224" r="4.5" fill="#fff"/></g>
  <g class="ckMouth" style="transform-origin:200px 274px"><path d="M172 268 Q200 290 228 268" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/></g>
  <path d="M146 196 L176 192 M224 192 L254 196" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
  <g class="ckHat" style="transform-origin:200px 150px"><rect x="120" y="108" width="160" height="50" rx="10" fill="#fff" stroke="${INK}" stroke-width="9"/>
    <path d="M124 112 Q90 40 150 50 Q170 0 222 30 Q270 10 284 60 Q320 80 276 112 Z" fill="#fff" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
    <path d="M150 70 Q160 54 178 56" fill="none" stroke="#d9d0bb" stroke-width="6" stroke-linecap="round"/></g>`);
}
// browser window with a jagged hole; .bwHole, .bwCrack (pathLength 100 for draw-on), .bwWeb (cobweb lines), .bwPatch
function browserSVG(id, opt = {}) {
  return sv('0 0 600 440', `<rect x="0" y="0" width="600" height="440" rx="34" fill="#f4ecd9" stroke="${INK}" stroke-width="12"/>
  <path d="M6 70 H594" stroke="${INK}" stroke-width="10"/><circle cx="44" cy="38" r="12" fill="#ff3b5c"/><circle cx="82" cy="38" r="12" fill="#ffc83d"/><circle cx="120" cy="38" r="12" fill="#74c81c"/>
  <rect x="160" y="22" width="400" height="32" rx="16" fill="#e2d8c0"/>
  <rect x="40" y="100" width="300" height="34" rx="10" fill="#cfc5ad"/><rect x="40" y="152" width="220" height="22" rx="8" fill="#ddd3bb"/><rect x="40" y="188" width="250" height="22" rx="8" fill="#ddd3bb"/>
  <rect x="380" y="100" width="180" height="140" rx="16" fill="#b8ff3d" opacity=".55"/>
  <rect x="40" y="370" width="520" height="22" rx="8" fill="#ddd3bb"/>
  <g class="bwHole" style="transform-origin:300px 290px"><path d="M300 222 L330 250 L372 240 L362 282 L398 306 L356 324 L364 366 L322 346 L292 376 L272 338 L228 344 L246 304 L210 276 L254 262 L248 224 L282 244 Z" fill="#050806" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
    <path d="M270 300 Q300 288 330 304" stroke="#1d2b22" stroke-width="10" fill="none" stroke-linecap="round"/></g>
  <path class="bwCrack" pathLength="100" d="M398 306 L460 290 L500 320 M228 344 L170 360 L130 336 M300 222 L296 180" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:${opt.crack ? 0 : 100}"/>
  ${opt.web ? `<g class="bwWeb" opacity=".9">${[0, 45, 90, 135].map(a => `<path class="webL" pathLength="100" d="M${300 - 110 * Math.cos(a * Math.PI / 180)} ${290 - 110 * Math.sin(a * Math.PI / 180)} L${300 + 110 * Math.cos(a * Math.PI / 180)} ${290 + 110 * Math.sin(a * Math.PI / 180)}" stroke="#e9e9e9" stroke-width="4" fill="none" style="stroke-dasharray:100;stroke-dashoffset:100"/>`).join('')}
    ${[40, 75].map(r => `<circle class="webL" pathLength="100" cx="300" cy="290" r="${r}" stroke="#e9e9e9" stroke-width="4" fill="none" style="stroke-dasharray:100;stroke-dashoffset:100"/>`).join('')}</g>` : ''}`);
}
function ticketSVG(lines = 4) {
  let r = ''; for (let k = 0; k < lines; k++) r += `<rect x="30" y="${70 + k * 46}" width="${120 + 60 * ((k * 7) % 3)}" height="18" rx="8" fill="#b9af98"/>`;
  return sv(`0 0 260 ${110 + lines * 46}`, `<path d="M0 0 H260 V${100 + lines * 46} l-26 14 -26 -14 -26 14 -26 -14 -26 14 -26 -14 -26 14 -26 -14 -26 14 -26 -14 Z" fill="#fffaf0" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
  <rect x="30" y="22" width="120" height="26" rx="8" fill="${INK}"/>${r}`);
}
function plateSVG() {   // plate carrying a tiny web page
  return sv('0 0 360 200', `<ellipse cx="180" cy="130" rx="176" ry="62" fill="#fff" stroke="${INK}" stroke-width="10"/><ellipse cx="180" cy="124" rx="120" ry="36" fill="#eee6d3"/>
  <g transform="translate(110 22) rotate(-6 70 50)"><rect x="0" y="0" width="140" height="110" rx="12" fill="#f4ecd9" stroke="${INK}" stroke-width="7"/><path d="M2 24 H138" stroke="${INK}" stroke-width="6"/>
  <rect x="14" y="38" width="70" height="12" rx="5" fill="#b9af98"/><rect x="14" y="60" width="110" height="10" rx="4" fill="#d7cdb5"/><rect x="14" y="78" width="90" height="10" rx="4" fill="#d7cdb5"/><rect x="92" y="34" width="36" height="20" rx="5" fill="#b8ff3d"/></g>`);
}
function phoneSVG() {
  return sv('0 0 200 360', `<rect x="6" y="6" width="188" height="348" rx="34" fill="#0c1a12" stroke="#f4ecd9" stroke-width="10"/><rect x="24" y="44" width="152" height="250" rx="14" fill="#1d3426"/>
  <rect x="40" y="70" width="120" height="20" rx="8" fill="#b8ff3d"/><rect x="40" y="108" width="90" height="14" rx="6" fill="#5f7d69"/><rect x="40" y="136" width="110" height="14" rx="6" fill="#5f7d69"/><rect x="40" y="210" width="120" height="50" rx="16" fill="#b8ff3d"/><circle cx="100" cy="324" r="13" fill="none" stroke="#f4ecd9" stroke-width="5"/>`);
}
function siteSVG(id) {  // little restaurant = website card; .stHat lights up
  return sv('0 0 160 170', `<rect x="6" y="40" width="148" height="124" rx="20" fill="#16281d" stroke="#3c5a48" stroke-width="6"/><path d="M6 64 H154" stroke="#3c5a48" stroke-width="6"/>
  <rect x="24" y="84" width="80" height="12" rx="5" fill="#3c5a48"/><rect x="24" y="106" width="110" height="10" rx="4" fill="#2c4636"/><rect x="24" y="124" width="96" height="10" rx="4" fill="#2c4636"/>
  <g class="stHat" style="transform-origin:80px 40px"><rect x="48" y="26" width="64" height="22" rx="6" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M50 30 Q34 0 62 4 Q72 -16 96 0 Q120 -6 120 14 Q136 22 110 30 Z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><text x="80" y="44" text-anchor="middle" font-family="Unb" font-weight="900" font-size="15" fill="#5a62c8">PHP</text></g>`);
}
function counterSVG() {
  return sv('0 0 1000 170', `<rect x="0" y="0" width="1000" height="44" rx="14" fill="#c9b691" stroke="${INK}" stroke-width="9"/><rect x="30" y="44" width="940" height="126" fill="#6b5640" stroke="${INK}" stroke-width="9"/>
  <path d="M60 22 H940" stroke="#e3d3b0" stroke-width="6" stroke-linecap="round" opacity=".6"/>${[150, 500, 850].map(x => `<rect x="${x - 70}" y="70" width="140" height="80" rx="12" fill="#5a4734" stroke="${INK}" stroke-width="6"/><circle cx="${x}" cy="110" r="8" fill="#c9b691"/>`).join('')}`);
}
function stainSVG(k) {
  const c = ['#7a5b2a', '#a2371d', '#5c6b1f'][k % 3];
  return sv('0 0 120 60', `<path d="M10 30 Q14 8 46 12 Q70 0 96 14 Q118 22 108 40 Q100 58 66 52 Q40 60 22 50 Q4 44 10 30 Z" fill="${c}" opacity=".85" stroke="${INK}" stroke-width="5"/><circle cx="40" cy="28" r="6" fill="#fff" opacity=".35"/>`);
}
function gloveSVG() {   // hacker's red glove with a black sleeve
  return sv('0 0 360 200', `<rect x="200" y="58" width="200" height="90" rx="20" fill="#14141a" stroke="${INK}" stroke-width="9"/><path d="M220 70 V136" stroke="#2c2c36" stroke-width="10"/>
  <path d="M206 64 Q150 40 98 60 L40 54 Q16 54 18 76 Q22 92 60 92 L70 96 Q30 106 38 126 Q46 140 80 132 Q60 150 84 160 Q104 166 130 150 Q170 160 206 142 Z" fill="#ff3b5c" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
  <path d="M110 74 Q140 66 170 76" fill="none" stroke="#ff9aab" stroke-width="7" stroke-linecap="round"/>`);
}
function bowlSVG() {
  return sv('0 0 600 360', `<ellipse cx="300" cy="110" rx="290" ry="80" fill="#c9442b" stroke="${INK}" stroke-width="12"/><ellipse cx="300" cy="104" rx="250" ry="58" fill="#d9573a"/>
  <circle cx="200" cy="96" r="18" fill="#f4ecd9" opacity=".8"/><circle cx="390" cy="120" r="14" fill="#ffc83d"/><circle cx="330" cy="86" r="10" fill="#74c81c"/><path d="M120 120 q20 -10 40 0" stroke="#f4ecd9" stroke-width="6" fill="none"/>
  <path d="M10 112 Q30 340 300 340 Q570 340 590 112 Q560 192 300 192 Q40 192 10 112 Z" fill="#f4ecd9" stroke="${INK}" stroke-width="12" stroke-linejoin="round"/>
  <path d="M90 230 Q200 300 300 300" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".7"/>
  <path d="M60 180 Q300 250 540 180" fill="none" stroke="#5a62c8" stroke-width="12" opacity=".6"/>`);
}
function keySVG() {   // key on a ring with a house tag
  return sv('0 0 300 200', `<circle cx="70" cy="70" r="46" fill="none" stroke="#ffc83d" stroke-width="22"/><circle cx="70" cy="70" r="46" fill="none" stroke="${INK}" stroke-width="6" opacity=".6"/>
  <rect x="110" y="58" width="160" height="26" rx="10" fill="#ffc83d" stroke="${INK}" stroke-width="7"/><path d="M220 82 v34 h18 v-22 h14 v22 h18 v-34" fill="#ffc83d" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
  <path d="M30 120 L22 190 L120 190 L112 120 Z" fill="#f4ecd9" stroke="${INK}" stroke-width="7" transform="rotate(-10 70 150)"/>
  <path d="M46 168 v-22 l26 -18 26 18 v22 z" fill="#5a62c8" stroke="${INK}" stroke-width="5" transform="rotate(-10 70 150)"/>`);
}
function chipSVG() {   // AI chip
  let pins = ''; for (let k = 0; k < 4; k++) { const p = 60 + k * 40; pins += `<rect x="${p - 7}" y="10" width="14" height="34" rx="5" fill="#b8ff3d" stroke="${INK}" stroke-width="5"/><rect x="${p - 7}" y="196" width="14" height="34" rx="5" fill="#b8ff3d" stroke="${INK}" stroke-width="5"/><rect x="10" y="${p - 7}" width="34" height="14" rx="5" fill="#b8ff3d" stroke="${INK}" stroke-width="5"/><rect x="196" y="${p - 7}" width="34" height="14" rx="5" fill="#b8ff3d" stroke="${INK}" stroke-width="5"/>`; }
  return sv('0 0 240 240', `${pins}<rect x="36" y="36" width="168" height="168" rx="26" fill="#17301f" stroke="${INK}" stroke-width="10"/><rect x="56" y="56" width="128" height="128" rx="16" fill="none" stroke="#b8ff3d" stroke-width="5"/>
  <text x="120" y="142" text-anchor="middle" font-family="Unb" font-weight="900" font-size="58" fill="#b8ff3d">ИИ</text>`);
}
function patchSVG() {   // band-aid
  return sv('0 0 360 150', `<rect x="6" y="20" width="348" height="110" rx="55" fill="#f2b98c" stroke="${INK}" stroke-width="10"/><rect x="120" y="30" width="120" height="90" rx="14" fill="#f8dcc2" stroke="${INK}" stroke-width="6"/>
  ${[0, 1, 2].map(i => [0, 1].map(j => `<circle cx="${144 + i * 36}" cy="${58 + j * 34}" r="5" fill="#c98b62"/>`).join('')).join('')}
  ${[50, 80, 280, 310].map(x => `<circle cx="${x}" cy="62" r="5" fill="#d99a70"/><circle cx="${x}" cy="90" r="5" fill="#d99a70"/>`).join('')}`);
}
function spongeSVG() {
  return sv('0 0 220 130', `<rect x="6" y="36" width="208" height="88" rx="20" fill="#ffe14d" stroke="${INK}" stroke-width="9"/><rect x="6" y="6" width="208" height="40" rx="16" fill="#74c81c" stroke="${INK}" stroke-width="9"/>
  ${[40, 90, 140, 180].map((x, i) => `<circle cx="${x}" cy="${76 + (i % 2) * 22}" r="${7 + (i % 2) * 3}" fill="#d9b92a"/>`).join('')}`);
}
function magSVG() {   // magnifying glass
  return sv('0 0 260 260', `<path d="M160 160 L238 238" stroke="${INK}" stroke-width="40" stroke-linecap="round"/><path d="M160 160 L236 236" stroke="#7a5b2a" stroke-width="24" stroke-linecap="round"/>
  <circle cx="100" cy="100" r="82" fill="rgba(184,255,61,.18)" stroke="${INK}" stroke-width="22"/><circle cx="100" cy="100" r="82" fill="none" stroke="#c9d1c4" stroke-width="10"/><path d="M52 80 Q62 50 92 44" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/>`);
}
function calSVG() {   // calendar block; .page sheets flip off
  return sv('0 0 360 380', `<rect x="10" y="50" width="340" height="320" rx="30" fill="#f4ecd9" stroke="${INK}" stroke-width="12"/><rect x="10" y="50" width="340" height="80" rx="30" fill="#ff3b5c" stroke="${INK}" stroke-width="12"/>
  <rect x="80" y="20" width="26" height="70" rx="12" fill="#c9c0aa" stroke="${INK}" stroke-width="8"/><rect x="254" y="20" width="26" height="70" rx="12" fill="#c9c0aa" stroke="${INK}" stroke-width="8"/>
  ${[0, 1, 2, 3].map(r => [0, 1, 2, 3, 4].map(c => `<rect x="${44 + c * 58}" y="${160 + r * 50}" width="40" height="32" rx="8" fill="#ddd3bb"/>`).join('')).join('')}`);
}
function hackerSVG() {   // faceless hooded figure, red eyes (generic villain, nobody real)
  return sv('0 0 300 340', `<path d="M150 10 Q250 14 262 140 L290 330 L10 330 L38 140 Q50 14 150 10 Z" fill="#1a1a22" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M150 54 Q214 58 220 150 Q212 222 150 226 Q88 222 80 150 Q86 58 150 54 Z" fill="#050508"/>
  <g class="hkEye"><ellipse cx="122" cy="148" rx="16" ry="9" fill="#ff3b5c"/><ellipse cx="178" cy="148" rx="16" ry="9" fill="#ff3b5c"/></g>
  <path d="M90 40 Q130 24 170 30" stroke="#3a3a48" stroke-width="8" fill="none" stroke-linecap="round"/>`);
}
function personSVG() {   // generic researcher icon: head, glasses, laptop (nobody real)
  return sv('0 0 260 260', `<path d="M40 250 Q44 160 130 156 Q216 160 220 250 Z" fill="#5a62c8" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
  <circle cx="130" cy="92" r="62" fill="#f2c9a0" stroke="${INK}" stroke-width="10"/><path d="M70 82 Q76 26 130 28 Q186 28 192 82 Q170 56 130 58 Q92 58 70 82 Z" fill="#3a2a20" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
  <circle cx="106" cy="100" r="18" fill="#fff" stroke="${INK}" stroke-width="7"/><circle cx="154" cy="100" r="18" fill="#fff" stroke="${INK}" stroke-width="7"/><path d="M124 100 H136" stroke="${INK}" stroke-width="7"/>
  <circle cx="108" cy="102" r="6" fill="${INK}"/><circle cx="156" cy="102" r="6" fill="${INK}"/><path d="M112 132 Q130 142 148 132" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
  <path d="M60 210 L200 210 L214 250 L46 250 Z" fill="#c9d1c4" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/><circle cx="130" cy="230" r="7" fill="#b8ff3d"/>`);
}
