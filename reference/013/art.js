// 013 «13 нейронок на острове» — art. Every function returns an SVG string; ids get a suffix. Island theme: sea, sand, sun.
const INK = '#0a130d';
const sv = (vb, body, extra = '') => `<svg viewBox="${vb}" style="overflow:visible;left:0;top:0;width:100%;height:100%" ${extra}>${body}</svg>`;
const BOTC = ['#ff5a6e', '#ffb03d', '#3dd6ff', '#b8ff3d', '#c58bff', '#ff8fd0', '#5bf0b0', '#ffe14d', '#7aa2ff', '#ff7a3d', '#9df0ff', '#e0b3ff', '#ffd08a'];

// Agent avatar: cube-head robot with a screen face. viewBox 0 0 200 260. Rig: .bHead (r around neck), .bArmL/.bArmR (shoulders), .bLegL/.bLegR, .bEye (sy blink), .bFace
function botSVG(id, c) {
  return sv('0 0 200 260', `<defs><linearGradient id="bg${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="${c}" stop-opacity="0"/></linearGradient></defs>
    <g class="bLegL" style="transform-origin:82px 196px"><rect x="70" y="190" width="24" height="52" rx="10" fill="${c}" stroke="${INK}" stroke-width="7"/><rect x="62" y="232" width="38" height="18" rx="8" fill="#2b2f3a" stroke="${INK}" stroke-width="6"/></g>
    <g class="bLegR" style="transform-origin:118px 196px"><rect x="106" y="190" width="24" height="52" rx="10" fill="${c}" stroke="${INK}" stroke-width="7"/><rect x="100" y="232" width="38" height="18" rx="8" fill="#2b2f3a" stroke="${INK}" stroke-width="6"/></g>
    <g class="bArmL" style="transform-origin:56px 140px"><path d="M56 140 L26 186" stroke="${INK}" stroke-width="24" stroke-linecap="round"/><path d="M56 140 L26 186" stroke="${c}" stroke-width="12" stroke-linecap="round"/><circle cx="24" cy="190" r="13" fill="#f4ecd9" stroke="${INK}" stroke-width="6"/></g>
    <g class="bArmR" style="transform-origin:144px 140px"><path d="M144 140 L174 186" stroke="${INK}" stroke-width="24" stroke-linecap="round"/><path d="M144 140 L174 186" stroke="${c}" stroke-width="12" stroke-linecap="round"/><circle cx="176" cy="190" r="13" fill="#f4ecd9" stroke="${INK}" stroke-width="6"/></g>
    <rect x="58" y="122" width="84" height="78" rx="18" fill="${c}" stroke="${INK}" stroke-width="8"/>
    <rect x="58" y="122" width="84" height="78" rx="18" fill="url(#bg${id})"/>
    <circle cx="100" cy="160" r="9" fill="${INK}" opacity=".25"/>
    <g class="bHead" style="transform-origin:100px 118px">
      <rect x="40" y="18" width="120" height="104" rx="26" fill="${c}" stroke="${INK}" stroke-width="9"/>
      <rect x="40" y="18" width="120" height="104" rx="26" fill="url(#bg${id})"/>
      <rect class="bFace" x="56" y="36" width="88" height="62" rx="16" fill="#132029" stroke="${INK}" stroke-width="6"/>
      <g class="bEye" style="transform-origin:100px 66px"><rect x="74" y="54" width="14" height="24" rx="7" fill="#9dffcf"/><rect x="112" y="54" width="14" height="24" rx="7" fill="#9dffcf"/></g>
      <path d="M100 18 L100 2" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><circle cx="100" cy="0" r="9" fill="${c}" stroke="${INK}" stroke-width="6"/>
      <path d="M52 30 Q60 24 72 24" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".6" fill="none"/></g>`);
}
// Island: sand mound, grass, palm (.palm), spire rock (.spire). viewBox 0 0 1000 560
function islandSVG(id) {
  return sv('0 0 1000 560', `<defs>
      <linearGradient id="is${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe6a8"/><stop offset="1" stop-color="#e3a95b"/></linearGradient>
      <linearGradient id="ir${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9aa6b2"/><stop offset="1" stop-color="#5e6875"/></linearGradient></defs>
    <ellipse cx="500" cy="470" rx="500" ry="70" fill="#9ff0ff" opacity=".35"/>
    <path d="M30 470 Q120 330 300 300 Q500 260 700 300 Q880 330 970 470 Z" fill="url(#is${id})" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M140 380 Q300 330 500 334 Q700 330 860 380" fill="none" stroke="#fff3cf" stroke-width="10" stroke-linecap="round" opacity=".7"/>
    <g class="spire" style="transform-origin:720px 310px"><path d="M650 312 L700 70 Q716 40 734 70 L792 312 Z" fill="url(#ir${id})" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
      <path d="M706 110 L690 300" stroke="#c9d2db" stroke-width="8" stroke-linecap="round" opacity=".7"/></g>
    <g class="palm" style="transform-origin:300px 300px">
      <path d="M300 304 Q290 200 330 110" fill="none" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M300 304 Q290 200 330 110" fill="none" stroke="#a8743d" stroke-width="16" stroke-linecap="round"/>
      <path d="M330 110 Q260 70 190 110 Q260 96 330 112 Z M330 110 Q400 60 470 100 Q400 92 330 112 Z M330 110 Q300 40 250 30 Q300 70 332 112 Z M330 110 Q370 40 420 40 Q370 70 330 112 Z M330 110 Q290 140 250 190 Q300 130 332 112 Z M330 110 Q380 140 410 190 Q360 130 330 112 Z" fill="#3fc06a" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <circle cx="318" cy="122" r="12" fill="#7a4520" stroke="${INK}" stroke-width="5"/><circle cx="342" cy="124" r="12" fill="#7a4520" stroke="${INK}" stroke-width="5"/></g>`);
}
// Voxel cube. viewBox 0 0 100 100
function cubeSVG(c) {
  return sv('0 0 100 100', `<path d="M50 6 L92 28 L50 50 L8 28 Z" fill="${c}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M8 28 L50 50 L50 96 L8 74 Z" fill="${c}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M8 28 L50 50 L50 96 L8 74 Z" fill="#000" opacity=".18"/>
    <path d="M92 28 L50 50 L50 96 L92 74 Z" fill="${c}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M92 28 L50 50 L50 96 L92 74 Z" fill="#000" opacity=".34"/>
    <path d="M30 22 L50 12" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".6"/>`);
}
// Golden ring. viewBox 0 0 200 120
function ringSVG() {
  return sv('0 0 200 120', `<ellipse cx="100" cy="60" rx="88" ry="44" fill="none" stroke="${INK}" stroke-width="30"/><ellipse cx="100" cy="60" rx="88" ry="44" fill="none" stroke="#ffcf33" stroke-width="18"/>
    <path d="M30 46 Q60 22 110 20" fill="none" stroke="#fff6c2" stroke-width="7" stroke-linecap="round"/>`);
}
// Stone. viewBox 0 0 100 80
function rockSVG(k = 0) {
  const g = ['#9aa6b2', '#8794a1', '#a9b3bd'][k % 3];
  return sv('0 0 100 80', `<path d="M10 56 Q6 26 34 14 Q60 4 82 22 Q98 40 88 62 Q70 76 40 74 Q16 72 10 56 Z" fill="${g}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M30 24 Q44 16 58 18" fill="none" stroke="#dfe6ec" stroke-width="6" stroke-linecap="round"/>`);
}
// Boat with the mascot's seat. viewBox 0 0 420 200
function boatSVG() {
  return sv('0 0 420 200', `<path d="M10 70 L410 70 Q380 170 300 176 L120 176 Q40 170 10 70 Z" fill="#c8743d" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M14 70 L406 70" stroke="#f4ecd9" stroke-width="10"/><path d="M40 110 L380 110" stroke="#8a4b22" stroke-width="7" opacity=".7"/>
    <g class="oar" style="transform-origin:330px 60px"><path d="M330 60 L410 180" stroke="${INK}" stroke-width="18" stroke-linecap="round"/><path d="M330 60 L410 180" stroke="#e8c48a" stroke-width="8" stroke-linecap="round"/>
      <ellipse cx="410" cy="182" rx="18" ry="34" transform="rotate(-34 410 182)" fill="#e8c48a" stroke="${INK}" stroke-width="7"/></g>`);
}
// Clock with .hH .hM hands. viewBox 0 0 300 300
function clockSVG(id) {
  let t = ''; for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; t += `<path d="M${150 + 104 * Math.sin(a)} ${150 - 104 * Math.cos(a)} L${150 + 118 * Math.sin(a)} ${150 - 118 * Math.cos(a)}" stroke="${INK}" stroke-width="${k % 3 ? 6 : 11}" stroke-linecap="round"/>`; }
  return sv('0 0 300 300', `<defs><radialGradient id="ck${id}" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#e6dcc4"/></radialGradient></defs>
    <circle cx="150" cy="150" r="136" fill="url(#ck${id})" stroke="${INK}" stroke-width="14"/>${t}
    <g class="hH" style="transform-origin:150px 150px"><path d="M150 150 L150 86" stroke="${INK}" stroke-width="14" stroke-linecap="round"/></g>
    <g class="hM" style="transform-origin:150px 150px"><path d="M150 150 L150 48" stroke="#ff3b5c" stroke-width="9" stroke-linecap="round"/></g>
    <circle cx="150" cy="150" r="12" fill="${INK}"/>`);
}
// Task clipboard: empty task list. viewBox 0 0 360 460. .tline rows (strike-through), .tx big cross
function clipSVG() {
  let r = ''; for (let k = 0; k < 4; k++) r += `<g class="tline tl${k}"><rect x="62" y="${170 + k * 62}" width="32" height="32" rx="7" fill="none" stroke="${INK}" stroke-width="6"/><rect x="110" y="${180 + k * 62}" width="${170 - (k * 37) % 70}" height="12" rx="6" fill="#c9bfa8"/></g>`;
  return sv('0 0 360 460', `<rect x="14" y="40" width="332" height="406" rx="26" fill="#a8743d" stroke="${INK}" stroke-width="10"/>
    <rect x="38" y="64" width="284" height="362" rx="14" fill="#fffaf0" stroke="${INK}" stroke-width="6"/>
    <rect x="120" y="22" width="120" height="50" rx="14" fill="#8fa698" stroke="${INK}" stroke-width="8"/>
    <rect x="70" y="100" width="180" height="22" rx="11" fill="#3b5244"/>${r}`);
}
// Rule book of the game: move icons, one blank slot. viewBox 0 0 560 400. .slot (the missing move)
function bookSVG() {
  const icon = (x, y, d) => `<rect x="${x}" y="${y}" width="96" height="96" rx="18" fill="#e9f6ff" stroke="${INK}" stroke-width="6"/><path d="${d}" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" transform="translate(${x} ${y})"/>`;
  return sv('0 0 560 400', `<path d="M280 40 Q160 10 30 34 L30 370 Q160 346 280 376 Q400 346 530 370 L530 34 Q400 10 280 40 Z" fill="#fffaf0" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M280 40 L280 376" stroke="${INK}" stroke-width="8"/><path d="M30 34 Q160 10 280 40 Q400 10 530 34" fill="none" stroke="#3dd6ff" stroke-width="14" opacity=".5"/>
    ${icon(70, 90, 'M30 70 L48 40 L66 70 M48 40 L48 22')}${icon(166, 90, 'M48 74 L48 30 M30 46 L48 26 L66 46')}
    ${icon(70, 214, 'M22 70 Q48 18 76 40 M66 30 L76 40 L64 50')}${icon(166, 214, 'M28 64 L68 64 M48 64 L48 28')}
    <g class="slot"><rect x="330" y="150" width="140" height="140" rx="22" fill="none" stroke="#ff3b5c" stroke-width="8" stroke-dasharray="20 12"/>
      <text x="400" y="248" text-anchor="middle" font-family="Unb" font-weight="900" font-size="96" fill="#ff3b5c">?</text></g>`);
}
// Binoculars. viewBox 0 0 200 110
function binocSVG() {
  return sv('0 0 200 110', `<rect x="10" y="20" width="76" height="82" rx="30" fill="#2b2f3a" stroke="${INK}" stroke-width="8"/><rect x="114" y="20" width="76" height="82" rx="30" fill="#2b2f3a" stroke="${INK}" stroke-width="8"/>
    <rect x="80" y="40" width="40" height="30" rx="10" fill="#3b4250" stroke="${INK}" stroke-width="7"/>
    <circle cx="48" cy="62" r="24" fill="#5ab6e0" stroke="${INK}" stroke-width="6"/><circle cx="152" cy="62" r="24" fill="#5ab6e0" stroke="${INK}" stroke-width="6"/>
    <circle cx="40" cy="54" r="7" fill="#fff"/><circle cx="144" cy="54" r="7" fill="#fff"/>`);
}
