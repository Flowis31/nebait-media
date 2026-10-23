// 010 «Каждая девятая видеокарта бездельничает» — art. Every function returns an SVG string; ids get a suffix.
const INK = '#0a130d';
const sv = (vb, body, extra = '') => `<svg viewBox="${vb}" style="overflow:visible;left:0;top:0;width:100%;height:100%" ${extra}>${body}</svg>`;

// Graphics card as a character: the two fans are its eyes (blades spin, the pupil sits on the hub). viewBox 0 0 260 150.
// classes: .gFan (blades, spin), .gPup (pupils), .gLid (lids, sy 0 open .. 1 closed), .gMouth (sy -1 = frown), .gLed, .gRed (red alarm overlay), .gGlow
function gpuSVG(id, o = {}) {
  const fan = (cx) => {
    let bl = '';
    for (let k = 0; k < 5; k++) bl += `<path d="M${cx} 75 q${8} -30 ${-6} -34 q-14 6 -6 22 z" fill="#3d5a48" stroke="${INK}" stroke-width="3" transform="rotate(${k * 72} ${cx} 75)"/>`;
    return `<circle cx="${cx}" cy="75" r="44" fill="#0f1a14" stroke="${INK}" stroke-width="7"/>
      <circle cx="${cx}" cy="75" r="40" fill="none" stroke="#b8ff3d" stroke-width="3" opacity=".35"/>
      <g class="gFan" style="transform-origin:${cx}px 75px">${bl}</g>
      <g class="gPup"><circle cx="${cx}" cy="75" r="15" fill="#f4ecd9" stroke="${INK}" stroke-width="4"/><circle cx="${cx + 2}" cy="76" r="8" fill="${INK}"/><circle cx="${cx + 5}" cy="72" r="3" fill="#fff"/></g>
      <g class="gLid" style="transform-origin:${cx}px 31px;transform:scaleY(0)"><path d="M${cx - 45} 75 A45 45 0 0 1 ${cx + 45} 75 Z" fill="#26392d" stroke="${INK}" stroke-width="5"/></g>`;
  };
  return sv('0 0 260 150', `
    <defs><linearGradient id="gb${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a5545"/><stop offset="1" stop-color="#1c2b22"/></linearGradient></defs>
    <rect class="gGlow" x="-8" y="2" width="276" height="140" rx="26" fill="none" stroke="#b8ff3d" stroke-width="10" opacity="${o.glow ? .55 : 0}"/>
    <path d="M24 128 h132 v14 h-132 z" fill="#e2b33c" stroke="${INK}" stroke-width="5"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(k => `<line x1="${32 + k * 11}" y1="130" x2="${32 + k * 11}" y2="140" stroke="#9c7a1e" stroke-width="3"/>`).join('')}
    <rect x="8" y="12" width="244" height="120" rx="20" fill="url(#gb${id})" stroke="${INK}" stroke-width="8"/>
    <rect class="gLed" x="22" y="18" width="216" height="8" rx="4" fill="#b8ff3d"/>
    <path d="M18 34 Q20 20 34 20" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/>
    ${fan(78)}${fan(182)}
    <g class="gMouth" style="transform-origin:130px 112px"><path d="M114 108 Q130 120 146 108" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/></g>
    <rect class="gRed" x="8" y="12" width="244" height="120" rx="20" fill="#ff3b5c" opacity="0"/>`);
}

function brainSVG(id) {   // viewBox 0 0 300 260; .bFill rises (sy 0..1) inside the brain
  const sh = 'M150 30 C110 6 60 20 56 60 C20 70 14 120 40 140 C24 176 54 214 96 206 C110 236 160 240 176 214 C214 236 262 210 256 172 C290 150 284 98 252 84 C254 40 200 14 150 30 Z';
  return sv('0 0 300 260', `<defs><clipPath id="bc${id}"><path d="${sh}"/></clipPath></defs>
    <path d="${sh}" fill="#26392d"/>
    <g clip-path="url(#bc${id})"><rect class="bFill" x="0" y="0" width="300" height="260" fill="#b8ff3d" style="transform-origin:150px 245px"/></g>
    <path d="${sh}" fill="none" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M150 34 C140 80 164 120 150 230 M70 100 C100 96 110 120 140 118 M168 90 C196 70 220 96 248 92 M74 170 C104 160 120 186 146 176 M166 170 C190 150 216 178 240 166" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round" opacity=".75"/>
    <path d="M78 52 Q100 34 128 38" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".45"/>`);
}

function hullSVG(id) {   // boat hull, viewBox 0 0 860 200
  return sv('0 0 860 200', `<defs><linearGradient id="hl${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d98a4a"/><stop offset="1" stop-color="#8a4a22"/></linearGradient></defs>
    <path d="M10 40 L850 40 Q800 180 640 186 L190 186 Q50 180 10 40 Z" fill="url(#hl${id})" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M40 76 L822 76 M76 118 L780 118" stroke="#6b3618" stroke-width="6" stroke-linecap="round" opacity=".7"/>
    <rect x="0" y="26" width="860" height="22" rx="11" fill="#f4ecd9" stroke="${INK}" stroke-width="8"/>`);
}
function oarSVG() {   // viewBox 0 0 60 320, pivot at the top centre
  return sv('0 0 60 320', `<line x1="30" y1="0" x2="30" y2="240" stroke="${INK}" stroke-width="20" stroke-linecap="round"/>
    <line x1="30" y1="0" x2="30" y2="240" stroke="#e8c48a" stroke-width="9" stroke-linecap="round"/>
    <path d="M30 220 Q58 250 50 312 Q30 322 10 312 Q2 250 30 220 Z" fill="#f4ecd9" stroke="${INK}" stroke-width="7"/>`);
}
function wavesSVG(c1 = '#1c6b7a', c2 = '#2a8fa0') {   // viewBox 0 0 1400 200, 200px period so x shifts of -200 loop
  let d = 'M0 40'; for (let x = 0; x < 1400; x += 100) d += ` q50 -36 100 0`;
  let d2 = 'M0 90'; for (let x = 0; x < 1400; x += 100) d2 += ` q50 -30 100 0`;
  return sv('0 0 1400 200', `<path d="${d} L1400 200 L0 200 Z" fill="${c1}" stroke="${INK}" stroke-width="8"/><path d="${d2} L1400 200 L0 200 Z" fill="${c2}" opacity=".8"/>
    <path d="M60 140 h80 M420 160 h60 M760 130 h90 M1100 156 h70" stroke="#bfefff" stroke-width="7" stroke-linecap="round" opacity=".5"/>`);
}
function rackSVG() {   // cabinet for 3x3 cards, viewBox 0 0 700 520
  let sh = ''; for (let r = 0; r < 3; r++) sh += `<rect x="26" y="${30 + r * 160}" width="648" height="140" rx="14" fill="#0b140f" stroke="#2f4a3a" stroke-width="4"/>`;
  let led = ''; for (let r = 0; r < 3; r++) led += `<circle cx="684" cy="${100 + r * 160}" r="6" fill="#b8ff3d"/>`;
  return sv('0 0 700 520', `<rect x="0" y="0" width="700" height="520" rx="26" fill="#1d2d24" stroke="${INK}" stroke-width="10"/>${sh}${led}
    <path d="M14 30 Q14 12 34 12 L300 12" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".25"/>
    <rect x="40" y="520" width="40" height="26" fill="${INK}"/><rect x="620" y="520" width="40" height="26" fill="${INK}"/>`);
}
function benchSVG() {   // viewBox 0 0 260 120
  return sv('0 0 260 120', `<rect x="10" y="20" width="240" height="26" rx="10" fill="#d98a4a" stroke="${INK}" stroke-width="8"/>
    <rect x="30" y="46" width="18" height="70" fill="#8a4a22" stroke="${INK}" stroke-width="6"/><rect x="212" y="46" width="18" height="70" fill="#8a4a22" stroke="${INK}" stroke-width="6"/>
    <path d="M24 28 h120" stroke="#ffd2a8" stroke-width="5" stroke-linecap="round" opacity=".6"/>`);
}
function clockSVG() {   // viewBox 0 0 300 300; .hMin / .hHr spin around the centre
  let tk = ''; for (let k = 0; k < 12; k++) tk += `<line x1="150" y1="40" x2="150" y2="${k % 3 ? 54 : 64}" stroke="${INK}" stroke-width="${k % 3 ? 6 : 10}" stroke-linecap="round" transform="rotate(${k * 30} 150 150)"/>`;
  return sv('0 0 300 300', `<circle cx="150" cy="150" r="128" fill="#f4ecd9" stroke="${INK}" stroke-width="14"/>${tk}
    <rect x="128" y="0" width="44" height="26" rx="8" fill="#ff3b5c" stroke="${INK}" stroke-width="7"/>
    <g class="hHr" style="transform-origin:150px 150px"><line x1="150" y1="150" x2="150" y2="96" stroke="${INK}" stroke-width="14" stroke-linecap="round"/></g>
    <g class="hMin" style="transform-origin:150px 150px"><line x1="150" y1="150" x2="150" y2="62" stroke="#ff3b5c" stroke-width="9" stroke-linecap="round"/></g>
    <circle cx="150" cy="150" r="12" fill="${INK}"/>`);
}
function webSVG() {   // cobweb, draw-on paths (.wb)
  const p = ['M0 0 L180 180', 'M0 0 L200 60', 'M0 0 L60 200', 'M40 14 Q30 30 14 40', 'M90 30 Q66 66 30 90', 'M140 46 Q102 102 46 140', 'M190 62 Q140 140 62 190'];
  return sv('0 0 200 200', p.map(d => `<path class="wb" pathLength="100" d="${d}" fill="none" stroke="#e6f0ea" stroke-width="4" stroke-linecap="round" opacity=".85"/>`).join(''));
}
function weedSVG() {   // tumbleweed
  return sv('0 0 160 160', `<circle cx="80" cy="80" r="66" fill="none" stroke="#c9a46a" stroke-width="10"/>
    <path d="M30 60 Q80 20 130 70 Q90 140 40 110 Q60 60 110 50 M50 40 Q120 90 70 130" fill="none" stroke="#a8844a" stroke-width="8" stroke-linecap="round"/>`);
}
function sunSVG() {
  let r = ''; for (let k = 0; k < 10; k++) r += `<line x1="100" y1="16" x2="100" y2="40" stroke="#ffd23d" stroke-width="12" stroke-linecap="round" transform="rotate(${k * 36} 100 100)"/>`;
  return sv('0 0 200 200', `<g class="sRays" style="transform-origin:100px 100px">${r}</g><circle cx="100" cy="100" r="50" fill="#ffd23d" stroke="${INK}" stroke-width="9"/>
    <path d="M78 76 Q90 66 104 68" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".6"/>`);
}
function moonSVG() { return sv('0 0 200 200', `<path d="M130 30 A72 72 0 1 0 170 140 A60 60 0 1 1 130 30 Z" fill="#e6f0ea" stroke="${INK}" stroke-width="9"/>`); }
function stopSVG() { return sv('0 0 60 60', `<path d="M18 2 h24 l16 16 v24 l-16 16 h-24 l-16 -16 v-24 z" fill="#ff3b5c" stroke="${INK}" stroke-width="5"/><rect x="14" y="26" width="32" height="8" rx="3" fill="#fff"/>`); }
function loungerSVG() {   // viewBox 0 0 620 300
  return sv('0 0 620 300', `<path d="M40 200 L470 200 L590 70" fill="none" stroke="${INK}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M40 200 L470 200 L590 70" fill="none" stroke="#3bb3c9" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M60 200 L470 200 L590 70" fill="none" stroke="#f4ecd9" stroke-width="8" stroke-dasharray="26 22" stroke-linecap="round"/>
    <path d="M80 214 L130 296 M430 214 L380 296 M120 296 L60 214" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>`);
}
function shadesSVG() {   // sunglasses over the two fans of a 260x150 card
  return sv('0 0 260 150', `<path d="M30 52 h96 q4 50 -46 52 q-50 -2 -50 -52 z M134 52 h96 q0 50 -50 52 q-50 -2 -46 -52 z" fill="#0b0f0d" stroke="${INK}" stroke-width="6"/>
    <path d="M122 60 h16" stroke="${INK}" stroke-width="8"/><path d="M44 62 l26 0 M148 62 l26 0" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".55"/>`);
}
function drinkSVG() {
  return sv('0 0 140 220', `<path d="M20 60 L120 60 L96 200 L44 200 Z" fill="#ff8a3d" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
    <path d="M28 96 L112 96 L96 200 L44 200 Z" fill="#ff5a3d" opacity=".6"/><line x1="90" y1="70" x2="122" y2="0" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
    <circle cx="34" cy="60" r="22" fill="#b8ff3d" stroke="${INK}" stroke-width="7"/><path d="M40 210 h60" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>`);
}
function shieldSVG(id) {
  return sv('0 0 320 380', `<defs><linearGradient id="sh${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2ff8a"/><stop offset="1" stop-color="#74c81c"/></linearGradient></defs>
    <path d="M160 10 L300 60 Q304 260 160 368 Q16 260 20 60 Z" fill="url(#sh${id})" stroke="${INK}" stroke-width="14" stroke-linejoin="round"/>
    <path d="M160 40 L274 80 Q276 240 160 334" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".35"/>`);
}
function boltSVG() { return sv('0 0 80 120', `<path d="M50 0 L10 66 L38 66 L26 120 L72 46 L44 46 Z" fill="#ffe14d" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>`); }
function smokeSVG() { return sv('0 0 100 100', `<circle cx="50" cy="50" r="40" fill="#6e7a73" stroke="${INK}" stroke-width="6" opacity=".9"/><circle cx="36" cy="38" r="10" fill="#a9b5ae" opacity=".7"/>`); }
