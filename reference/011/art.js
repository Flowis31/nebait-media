// 011 «Режим инкогнито прячет тебя от провайдера?» — art. Every function returns an SVG string; ids get a suffix.
const INK = '#0a130d';
const sv = (vb, body, extra = '') => `<svg viewBox="${vb}" style="overflow:visible;left:0;top:0;width:100%;height:100%" ${extra}>${body}</svg>`;

// Spy hat (fedora) for the mascot. viewBox 0 0 300 140
function hatSVG(id) {
  return sv('0 0 300 140', `<defs><linearGradient id="hg${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3f6b"/><stop offset="1" stop-color="#231d38"/></linearGradient></defs>
    <ellipse cx="150" cy="112" rx="146" ry="24" fill="#231d38" stroke="${INK}" stroke-width="9"/>
    <path d="M62 112 Q60 30 104 18 Q150 34 196 18 Q240 30 238 112 Z" fill="url(#hg${id})" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
    <path d="M64 86 Q150 104 236 86 L237 108 Q150 124 63 108 Z" fill="#ff3b5c" stroke="${INK}" stroke-width="7"/>
    <path d="M110 36 Q120 60 116 84" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".25"/>`);
}
// Sunglasses that fit over the mascot's glasses in a 300 box: lenses at (112,142) and (187,142). viewBox 0 0 300 300
function shadesSVG() {
  return sv('0 0 300 300', `<path d="M60 128 L240 128" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
    <path d="M64 124 L160 124 L152 170 Q112 190 72 170 Z" fill="#111" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
    <path d="M140 124 L236 124 L228 170 Q188 190 148 170 Z" fill="#111" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
    <path d="M80 134 L112 134" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".55"/><path d="M156 134 L188 134" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".55"/>`);
}
// Generic browser window (no real brand). viewBox 0 0 760 560. .hrow0..5 history rows, .bX close button, .bTab tab
function browserSVG(id, title = '') {
  let rows = '';
  for (let k = 0; k < 5; k++) rows += `<g class="hrow hrow${k}"><rect x="70" y="${190 + k * 66}" width="44" height="44" rx="10" fill="${['#ff3b5c', '#ffb03d', '#3dd6ff', '#b8ff3d', '#c58bff'][k]}" stroke="${INK}" stroke-width="5"/>
    <rect x="134" y="${198 + k * 66}" width="${330 + (k * 97) % 180}" height="14" rx="7" fill="#e9e1cc"/><rect x="134" y="${220 + k * 66}" width="${170 + (k * 61) % 120}" height="10" rx="5" fill="#8fa698"/></g>`;
  return sv('0 0 760 560', `<defs><linearGradient id="bw${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b2540"/><stop offset="1" stop-color="#17132a"/></linearGradient></defs>
    <rect x="8" y="8" width="744" height="544" rx="34" fill="url(#bw${id})" stroke="${INK}" stroke-width="12"/>
    <path d="M8 120 L752 120" stroke="${INK}" stroke-width="8"/>
    <g class="bTab"><path d="M48 120 L66 46 Q70 34 84 34 L330 34 Q344 34 348 46 L366 120 Z" fill="#3a3258" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
      <g transform="translate(92 50) scale(.26)">${hatInner()}</g>
      <rect x="180" y="66" width="140" height="14" rx="7" fill="#c9bfe6"/></g>
    <g class="bX"><circle cx="694" cy="70" r="30" fill="#ff3b5c" stroke="${INK}" stroke-width="7"/><path d="M682 58 L706 82 M706 58 L682 82" stroke="#fff" stroke-width="8" stroke-linecap="round"/></g>
    <circle cx="610" cy="70" r="22" fill="#5a527a" stroke="${INK}" stroke-width="6"/><circle cx="550" cy="70" r="22" fill="#5a527a" stroke="${INK}" stroke-width="6"/>
    ${title ? `<text x="70" y="168" font-family="Unb" font-weight="900" font-size="34" fill="#f4ecd9">${title}</text>` : ''}
    ${rows}`);
}
function hatInner() {
  return `<ellipse cx="150" cy="112" rx="146" ry="24" fill="#c9bfe6" stroke="${INK}" stroke-width="12"/><path d="M62 112 Q60 30 104 18 Q150 34 196 18 Q240 30 238 112 Z" fill="#c9bfe6" stroke="${INK}" stroke-width="12"/>
    <path d="M64 86 Q150 104 236 86 L237 108 Q150 124 63 108 Z" fill="#ff3b5c" stroke="${INK}" stroke-width="9"/>`;
}
// Paper notebook "history" for the mom joke. viewBox 0 0 640 520
function bookSVG() {
  let ln = ''; for (let k = 0; k < 6; k++) ln += `<path d="M110 ${170 + k * 52} L560 ${170 + k * 52}" stroke="#c9bda2" stroke-width="5" stroke-linecap="round"/>`;
  return sv('0 0 640 520', `<rect x="34" y="40" width="590" height="460" rx="26" fill="#3a3258" stroke="${INK}" stroke-width="10"/>
    <rect x="20" y="22" width="590" height="460" rx="26" fill="#f4ecd9" stroke="${INK}" stroke-width="10"/>
    <path d="M86 22 L86 482" stroke="#ff8fa3" stroke-width="6"/>${ln}
    <text x="110" y="120" font-family="Unb" font-weight="900" font-size="52" fill="${INK}">ИСТОРИЯ</text>`);
}
// Magnifier. viewBox 0 0 300 300, lens centre (110,110)
function lensSVG(id) {
  return sv('0 0 300 300', `<defs><radialGradient id="lg${id}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#e8fbff" stop-opacity=".75"/><stop offset="1" stop-color="#9fe3ff" stop-opacity=".25"/></radialGradient></defs>
    <path d="M170 170 L268 268" stroke="${INK}" stroke-width="44" stroke-linecap="round"/><path d="M174 174 L264 264" stroke="#b5651d" stroke-width="26" stroke-linecap="round"/>
    <circle cx="110" cy="110" r="88" fill="url(#lg${id})" stroke="${INK}" stroke-width="14"/><circle cx="110" cy="110" r="76" fill="none" stroke="#ffe14d" stroke-width="8"/>
    <path d="M60 86 A56 56 0 0 1 92 50" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".8"/>`);
}
// House with a glowing window. viewBox 0 0 320 320
function houseSVG(id) {
  return sv('0 0 320 320', `<path d="M40 150 L160 40 L280 150 L280 300 L40 300 Z" fill="#f4ecd9" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M20 160 L160 30 L300 160" fill="none" stroke="#ff3b5c" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20 160 L160 30 L300 160" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity=".5"/>
    <rect x="80" y="170" width="90" height="80" rx="10" fill="#ffe14d" stroke="${INK}" stroke-width="8"/><path d="M125 170 L125 250 M80 210 L170 210" stroke="${INK}" stroke-width="6"/>
    <rect x="196" y="200" width="56" height="100" rx="8" fill="#b5651d" stroke="${INK}" stroke-width="8"/><circle cx="240" cy="252" r="6" fill="${INK}"/>`);
}
// Provider building: a tower with an antenna and one big eye. viewBox 0 0 300 420. .tEye pupil group, .tLid lid, .tWave antenna waves, .tCap postman cap
function towerSVG(id) {
  return sv('0 0 300 420', `<defs><linearGradient id="tg${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5b8cff"/><stop offset="1" stop-color="#2d4fb8"/></linearGradient></defs>
    <path d="M150 20 L150 92" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><circle cx="150" cy="20" r="14" fill="#ff3b5c" stroke="${INK}" stroke-width="7"/>
    <g class="tWave"><path d="M112 30 A44 44 0 0 1 112 10" fill="none" stroke="#b8ff3d" stroke-width="9" stroke-linecap="round" transform="rotate(-20 150 20)"/>
      <path d="M188 10 A44 44 0 0 1 188 30" fill="none" stroke="#b8ff3d" stroke-width="9" stroke-linecap="round" transform="rotate(20 150 20)"/></g>
    <rect x="40" y="92" width="220" height="318" rx="22" fill="url(#tg${id})" stroke="${INK}" stroke-width="10"/>
    ${[0, 1, 2].map(r => [0, 1, 2].map(c => `<rect x="${70 + c * 60}" y="${270 + r * 44}" width="40" height="26" rx="6" fill="#bfe0ff" stroke="${INK}" stroke-width="5"/>`).join('')).join('')}
    <circle cx="150" cy="180" r="62" fill="#f4ecd9" stroke="${INK}" stroke-width="10"/>
    <g class="tEye"><circle cx="150" cy="180" r="28" fill="${INK}"/><circle cx="160" cy="168" r="9" fill="#fff"/></g>
    <g class="tLid" style="transform-origin:150px 118px;transform:scaleY(0)"><path d="M86 180 A64 64 0 0 1 214 180 A64 64 0 0 1 86 180 Z" fill="#2d4fb8" stroke="${INK}" stroke-width="8"/></g>
    <g class="tCap" style="opacity:0"><path d="M70 100 Q150 50 230 100 L232 120 L68 120 Z" fill="#2d6b3f" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
      <path d="M60 120 L250 120 Q270 124 262 136 L58 136 Q46 128 60 120 Z" fill="#1a3a24" stroke="${INK}" stroke-width="8"/>
      <rect x="128" y="76" width="44" height="30" rx="6" fill="#ffe14d" stroke="${INK}" stroke-width="6"/><path d="M134 82 L150 94 L166 82" fill="none" stroke="${INK}" stroke-width="4"/></g>`);
}
function coinSVG() {
  return sv('0 0 100 100', `<circle cx="50" cy="50" r="42" fill="#ffd23d" stroke="${INK}" stroke-width="8"/><circle cx="50" cy="50" r="28" fill="none" stroke="#e0a400" stroke-width="6"/><path d="M36 30 A26 26 0 0 1 60 24" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/>`);
}
// Envelope with an icon "address" (no text). viewBox 0 0 160 110
function envSVG(icon) {
  return sv('0 0 160 110', `<rect x="6" y="6" width="148" height="98" rx="12" fill="#f4ecd9" stroke="${INK}" stroke-width="8"/><path d="M8 12 L80 62 L152 12" fill="none" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
    <g transform="translate(96 62) scale(.42)">${icon}</g>`);
}
// Site icons (no brands), drawn in a 100x100 box around (0..100)
const ICON = {
  play: `<rect x="0" y="0" width="100" height="100" rx="24" fill="#ff3b5c" stroke="${INK}" stroke-width="10"/><path d="M38 26 L76 50 L38 74 Z" fill="#fff" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`,
  cart: `<rect x="0" y="0" width="100" height="100" rx="24" fill="#ffb03d" stroke="${INK}" stroke-width="10"/><path d="M18 26 L30 26 L40 64 L76 64 L84 36 L34 36" fill="none" stroke="${INK}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/><circle cx="44" cy="78" r="7" fill="${INK}"/><circle cx="72" cy="78" r="7" fill="${INK}"/>`,
  pad: `<rect x="0" y="0" width="100" height="100" rx="24" fill="#3dd6ff" stroke="${INK}" stroke-width="10"/><path d="M20 40 Q20 30 32 30 L68 30 Q80 30 80 40 L84 66 Q86 78 74 74 L62 62 L38 62 L26 74 Q14 78 16 66 Z" fill="#fff" stroke="${INK}" stroke-width="6"/><path d="M34 40 L34 54 M27 47 L41 47" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><circle cx="62" cy="44" r="5" fill="${INK}"/><circle cx="70" cy="52" r="5" fill="${INK}"/>`,
};
function siteSVG(kind) { return sv('-10 -10 120 120', ICON[kind]); }
// Laptop. viewBox 0 0 420 300. .lnr0..3 history lines on the screen
function laptopSVG(id) {
  let ln = ''; for (let k = 0; k < 4; k++) ln += `<g class="lnr lnr${k}"><rect x="76" y="${60 + k * 40}" width="26" height="26" rx="6" fill="${['#ff3b5c', '#ffb03d', '#3dd6ff', '#c58bff'][k]}" stroke="${INK}" stroke-width="4"/><rect x="114" y="${66 + k * 40}" width="${150 + (k * 53) % 90}" height="13" rx="6" fill="#e9e1cc"/></g>`;
  return sv('0 0 420 300', `<rect x="50" y="20" width="320" height="220" rx="18" fill="#17132a" stroke="${INK}" stroke-width="10"/>
    <rect x="66" y="36" width="288" height="188" rx="8" fill="#2b2540"/>${ln}
    <path d="M14 248 L406 248 L384 282 Q380 290 370 290 L50 290 Q40 290 36 282 Z" fill="#9aa6b6" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <rect x="170" y="252" width="80" height="12" rx="6" fill="#6b7686"/>`);
}
function spongeSVG() {
  return sv('0 0 200 130', `<rect x="10" y="20" width="180" height="100" rx="22" fill="#ffe14d" stroke="${INK}" stroke-width="9"/><rect x="10" y="20" width="180" height="34" rx="16" fill="#3ccf6e" stroke="${INK}" stroke-width="9"/>
    <circle cx="60" cy="82" r="8" fill="#e0b400"/><circle cx="110" cy="96" r="6" fill="#e0b400"/><circle cx="150" cy="76" r="9" fill="#e0b400"/>`);
}
function footSVG() {
  return sv('0 0 60 90', `<ellipse cx="30" cy="54" rx="20" ry="28" fill="#ff8fa3" stroke="${INK}" stroke-width="6"/><circle cx="16" cy="16" r="7" fill="#ff8fa3" stroke="${INK}" stroke-width="4"/><circle cx="30" cy="10" r="7" fill="#ff8fa3" stroke="${INK}" stroke-width="4"/><circle cx="44" cy="16" r="7" fill="#ff8fa3" stroke="${INK}" stroke-width="4"/>`);
}
// Watching eye. viewBox 0 0 200 120. .ePup pupil, .eLid lid (sy 1 closed .. 0 open)
function eyeSVG(id, iris = '#5b8cff') {
  return sv('0 0 200 120', `<path d="M10 60 Q100 -14 190 60 Q100 134 10 60 Z" fill="#f4ecd9" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
    <g class="ePup"><circle cx="100" cy="60" r="30" fill="${iris}" stroke="${INK}" stroke-width="6"/><circle cx="100" cy="60" r="14" fill="${INK}"/><circle cx="110" cy="50" r="7" fill="#fff"/></g>
    <g class="eLid" style="transform-origin:100px 18px"><path d="M6 60 Q100 -18 194 60 Q100 138 6 60 Z" fill="#3a3258" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/></g>`);
}
// Source document: our own typed header and grey bars (no copied text). viewBox 0 0 620 760
function docSVG() {
  let bars = '';
  for (let k = 0; k < 7; k++) bars += `<rect class="dbar dbar${k}" x="60" y="${330 + k * 52}" width="${440 + (k * 83) % 60}" height="18" rx="9" fill="#cfc6b0"/>`;
  return sv('0 0 620 760', `<rect x="10" y="10" width="600" height="740" rx="26" fill="#f4ecd9" stroke="${INK}" stroke-width="10"/>
    <rect x="10" y="10" width="600" height="110" rx="26" fill="#3a3258" stroke="${INK}" stroke-width="10"/>
    <text x="50" y="80" font-family="Mont" font-weight="800" font-size="40" fill="#f4ecd9">Справка Google Chrome</text>
    <text x="50" y="210" font-family="Unb" font-weight="900" font-size="46" fill="${INK}">Режим</text>
    <text x="50" y="270" font-family="Unb" font-weight="900" font-size="46" fill="${INK}">инкогнито</text>
    <rect class="dhl" x="50" y="420" width="510" height="46" rx="10" fill="#ffe14d" opacity=".85" style="transform-origin:50px 443px"/>${bars}`);
}
// Office / school building with a flag. viewBox 0 0 300 300
function schoolSVG(id) {
  return sv('0 0 300 300', `<path d="M150 10 L150 70" stroke="${INK}" stroke-width="8"/><path d="M152 12 L210 26 L152 42 Z" fill="#ff3b5c" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M30 120 L150 64 L270 120 Z" fill="#ffb03d" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <rect x="40" y="120" width="220" height="166" rx="12" fill="#f4ecd9" stroke="${INK}" stroke-width="10"/>
    ${[0, 1, 2].map(c => `<rect x="${64 + c * 64}" y="146" width="44" height="44" rx="6" fill="#bfe0ff" stroke="${INK}" stroke-width="6"/>`).join('')}
    <rect x="126" y="210" width="48" height="76" rx="6" fill="#b5651d" stroke="${INK}" stroke-width="8"/>`);
}
function shieldSVG(id) {
  return sv('0 0 260 300', `<defs><linearGradient id="sg${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2ff8a"/><stop offset="1" stop-color="#5fae15"/></linearGradient></defs>
    <path d="M130 14 L240 54 Q240 210 130 286 Q20 210 20 54 Z" fill="url(#sg${id})" stroke="${INK}" stroke-width="12" stroke-linejoin="round"/>
    <path d="M84 150 L118 186 L182 112" fill="none" stroke="${INK}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>`);
}
function noteSVG() { return sv('0 0 60 80', `<path d="M20 64 L20 10 L52 4 L52 54" fill="none" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><ellipse cx="14" cy="64" rx="13" ry="10" fill="#b8ff3d" stroke="${INK}" stroke-width="5"/><ellipse cx="46" cy="56" rx="13" ry="10" fill="#b8ff3d" stroke="${INK}" stroke-width="5"/>`); }
function trashSVG() {
  return sv('0 0 200 240', `<g class="trLid" style="transform-origin:30px 44px"><rect x="16" y="30" width="168" height="26" rx="10" fill="#8fa698" stroke="${INK}" stroke-width="8"/><rect x="76" y="12" width="48" height="20" rx="6" fill="#8fa698" stroke="${INK}" stroke-width="7"/></g>
    <path d="M32 62 L168 62 L154 228 L46 228 Z" fill="#b9c7bd" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/><path d="M74 88 L80 204 M100 88 L100 204 M126 88 L120 204" stroke="${INK}" stroke-width="7" stroke-linecap="round" opacity=".5"/>`);
}
