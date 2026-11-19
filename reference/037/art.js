// 037 art: sunset coast city (own drawings, nothing from Rockstar): palm, coupe, trailer TV, gamepad, download bar, beard, moon.
const AK = '#0a130d';
const sv = (vb, body, extra = '') => `<svg viewBox="${vb}" style="overflow:visible;left:0;top:0;width:100%;height:100%" ${extra}>${body}</svg>`;
const lgr = (id, a, b, v = true) => `<linearGradient id="${id}" x1="0" y1="0" x2="${v ? 0 : 1}" y2="${v ? 1 : 0}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;

// palm tree, viewBox 0 0 300 600, foot at (150,600). Rig: .crown (sway around 150,90)
function palmSVG(id, h = 1) {
  const leaf = (a, l, c) => `<path d="M150 90 Q${150 + Math.cos(a) * l * .55} ${90 + Math.sin(a) * l * .55 - 40} ${150 + Math.cos(a) * l} ${90 + Math.sin(a) * l} Q${150 + Math.cos(a) * l * .5} ${90 + Math.sin(a) * l * .5 + 6} 150 98 Z" fill="${c}" stroke="${AK}" stroke-width="7" stroke-linejoin="round"/>`;
  const leaves = [[-2.9, 150, '#2fbf71'], [-2.3, 135, '#3fd884'], [-1.7, 110, '#2fbf71'], [-1.2, 120, '#3fd884'], [-0.5, 145, '#2fbf71'], [-0.15, 150, '#3fd884'], [-3.3, 120, '#27a862'], [0.25, 110, '#27a862']];
  return sv('0 0 300 600', `<defs>${lgr('pt' + id, '#c98a4a', '#8a5528', false)}</defs>
  <path d="M138 600 Q120 380 146 96 L160 96 Q150 380 166 600 Z" fill="url(#pt${id})" stroke="${AK}" stroke-width="8" stroke-linejoin="round"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7].map(k => `<path d="M${136 + k * .8} ${560 - k * 62} Q152 ${548 - k * 62} ${166 - k * .6} ${560 - k * 62}" fill="none" stroke="#6d4020" stroke-width="5" stroke-linecap="round"/>`).join('')}
  <g class="crown" style="transform-origin:150px 96px">${leaves.map(([a, l, c]) => leaf(a, l, c)).join('')}
  <circle cx="140" cy="104" r="12" fill="#7a4a22" stroke="${AK}" stroke-width="5"/><circle cx="160" cy="106" r="12" fill="#8a5528" stroke="${AK}" stroke-width="5"/></g>`);
}
// generic sports coupe (side view), viewBox 0 0 600 240. Rig: .whl (spin), .body
function coupeSVG(id, c0 = '#ff4fa3', c1 = '#c8287a') {
  const wheel = (x) => `<g class="whl" style="transform-origin:${x}px 190px"><circle cx="${x}" cy="190" r="44" fill="#1d2230" stroke="${AK}" stroke-width="9"/><circle cx="${x}" cy="190" r="22" fill="#cfd6e2" stroke="${AK}" stroke-width="6"/>
    ${[0, 72, 144, 216, 288].map(a => `<path d="M${x} 190 L${x + 20 * Math.cos(a * Math.PI / 180)} ${190 + 20 * Math.sin(a * Math.PI / 180)}" stroke="${AK}" stroke-width="5"/>`).join('')}</g>`;
  return sv('0 0 600 240', `<defs>${lgr('cb' + id, c0, c1)}${lgr('cw' + id, '#bff6ff', '#4fb8e0')}</defs>
  <ellipse cx="300" cy="232" rx="270" ry="14" fill="rgba(0,0,0,.35)"/>
  <g class="body"><path d="M30 186 Q20 140 70 128 L190 112 Q250 54 340 58 Q420 62 470 112 L548 128 Q584 138 580 186 Z" fill="url(#cb${id})" stroke="${AK}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M212 112 Q262 72 336 72 Q400 74 440 112 Z" fill="url(#cw${id})" stroke="${AK}" stroke-width="8" stroke-linejoin="round"/>
  <path d="M324 72 L322 112" stroke="${AK}" stroke-width="8"/>
  <path d="M60 150 L560 150" stroke="rgba(255,255,255,.45)" stroke-width="8" stroke-linecap="round"/>
  <rect x="548" y="136" width="30" height="16" rx="6" fill="#fff3a8" stroke="${AK}" stroke-width="5"/><rect x="26" y="140" width="22" height="14" rx="5" fill="#ff3b5c" stroke="${AK}" stroke-width="5"/>
  <path d="M240 90 Q260 80 290 78" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".8"/></g>
  ${wheel(150)}${wheel(470)}`);
}
// TV with a trailer playing (play button, progress), viewBox 0 0 520 380. Rig: .play (o/s), .prog (sx from 0..1, origin left), .scr
function tvSVG(id) {
  return sv('0 0 520 380', `<defs>${lgr('tv' + id, '#ff7ab8', '#6a3cff')}${lgr('ts' + id, '#ffb36b', '#ff4f8a')}</defs>
  <rect x="10" y="10" width="500" height="310" rx="26" fill="#1d2230" stroke="${AK}" stroke-width="10"/>
  <g class="scr"><rect x="34" y="34" width="452" height="262" rx="12" fill="url(#tv${id})"/>
    <circle cx="380" cy="170" r="70" fill="url(#ts${id})" opacity=".9"/>
    <path d="M34 250 Q140 200 250 240 Q360 280 486 230 L486 296 L34 296 Z" fill="#2a1450" opacity=".85"/>
    ${[90, 150, 205].map((x, k) => `<path d="M${x} 296 L${x + 4} ${220 - k * 16}" stroke="#14092a" stroke-width="10"/><path d="M${x + 4} ${220 - k * 16} q-40 -6 -56 18 M${x + 4} ${220 - k * 16} q40 -8 54 14 M${x + 4} ${220 - k * 16} q-12 -30 -40 -36 M${x + 4} ${220 - k * 16} q16 -30 44 -30" fill="none" stroke="#14092a" stroke-width="10" stroke-linecap="round"/>`).join('')}</g>
  <g class="play" style="transform-origin:260px 165px"><circle cx="260" cy="165" r="56" fill="rgba(10,19,13,.75)" stroke="#fff" stroke-width="8"/><path d="M244 135 L292 165 L244 195 Z" fill="#fff"/></g>
  <rect x="50" y="276" width="420" height="10" rx="5" fill="rgba(255,255,255,.35)"/><rect class="prog" x="50" y="276" width="420" height="10" rx="5" fill="#ff3b5c" style="transform-origin:50px 281px"/>
  <rect x="230" y="320" width="60" height="34" fill="#3a4258" stroke="${AK}" stroke-width="8"/><rect x="150" y="350" width="220" height="22" rx="10" fill="#3a4258" stroke="${AK}" stroke-width="8"/>`);
}
// gamepad, viewBox 0 0 420 260
function gamepadSVG(id, col = '#2b3446') {
  return sv('0 0 420 260', `<defs>${lgr('gp' + id, '#4a5670', col)}</defs>
  <path d="M110 40 L310 40 Q380 40 400 120 L414 196 Q420 246 376 246 Q346 246 320 200 L292 166 L128 166 L100 200 Q74 246 44 246 Q0 246 6 196 L20 120 Q40 40 110 40 Z" fill="url(#gp${id})" stroke="${AK}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M96 84 L96 140 M68 112 L124 112" stroke="#11151f" stroke-width="20" stroke-linecap="round"/>
  <circle cx="310" cy="88" r="13" fill="#5fe0ff" stroke="${AK}" stroke-width="5"/><circle cx="340" cy="114" r="13" fill="#ff5f6d" stroke="${AK}" stroke-width="5"/><circle cx="280" cy="114" r="13" fill="#ffd34d" stroke="${AK}" stroke-width="5"/><circle cx="310" cy="140" r="13" fill="#7dff8a" stroke="${AK}" stroke-width="5"/>
  <circle cx="160" cy="150" r="22" fill="#11151f" stroke="${AK}" stroke-width="6"/><circle cx="260" cy="150" r="22" fill="#11151f" stroke="${AK}" stroke-width="6"/>
  <path d="M130 56 Q150 50 180 50" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".5"/>`);
}
function beardSVG(id) {
  return sv('0 0 300 500', `<defs>${lgr('brd' + id, '#f4f4f4', '#b9bec6')}</defs>
    <path d="M20 10 Q150 40 280 10 Q300 160 230 300 Q200 380 160 490 Q150 470 140 490 Q100 380 70 300 Q0 160 20 10 Z" fill="url(#brd${id})" stroke="${AK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M90 80 Q110 220 140 330 M150 70 Q150 250 150 420 M210 80 Q190 220 165 330" fill="none" stroke="#9aa2ad" stroke-width="7" stroke-linecap="round"/>`);
}
function moonSVG() {
  return sv('0 0 200 200', `<circle cx="100" cy="100" r="80" fill="#fff3c4" stroke="${AK}" stroke-width="8"/><circle cx="70" cy="80" r="14" fill="#efe0a0"/><circle cx="125" cy="125" r="20" fill="#efe0a0"/><circle cx="130" cy="64" r="9" fill="#efe0a0"/>`);
}
// bar chart column, viewBox 0 0 220 1000, filled from the bottom by .fill (sy 0..1, origin bottom)
function columnSVG(id, c0, c1) {
  return sv('0 0 220 1000', `<defs>${lgr('cl' + id, c0, c1)}</defs><rect x="10" y="10" width="200" height="980" rx="26" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.25)" stroke-width="6"/>
    <rect class="fill" x="10" y="10" width="200" height="980" rx="26" fill="url(#cl${id})" stroke="${AK}" stroke-width="10" style="transform-origin:110px 990px"/>`, 'preserveAspectRatio="none"');
}
// sunset sky with sun stripes and stars, for the world backdrop
function skyCSS() {
  return 'linear-gradient(180deg,#0d0730 0%,#2b0f5c 28%,#7a1f7a 42%,#ff4f8a 50%,#ff9a5c 55%,#ffd07a 58%,#ff9a5c 58.6%,#2b1450 59%)';
}

// ---------- v2 additions ----------
// old CRT TV, viewBox 0 0 460 400. .scr holds content
function crtSVG(id) {
  return sv('0 0 460 400', `<defs>${lgr('ct' + id, '#8a6a4a', '#5a3e26')}<radialGradient id="cs${id}" cx="50%" cy="45%" r="70%"><stop offset="0" stop-color="#6fd0ff"/><stop offset="1" stop-color="#14365a"/></radialGradient></defs>
  <path d="M150 20 L230 70 L310 20" fill="none" stroke="${AK}" stroke-width="8" stroke-linecap="round"/>
  <rect x="10" y="66" width="440" height="300" rx="34" fill="url(#ct${id})" stroke="${AK}" stroke-width="10"/>
  <rect x="34" y="90" width="300" height="250" rx="40" fill="url(#cs${id})" stroke="${AK}" stroke-width="9"/>
  <g class="scr"></g>
  ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => `<rect x="44" y="${100 + k * 24}" width="280" height="6" fill="rgba(255,255,255,.08)"/>`).join('')}
  <circle cx="392" cy="130" r="22" fill="#2a1a10" stroke="${AK}" stroke-width="7"/><circle cx="392" cy="196" r="22" fill="#2a1a10" stroke="${AK}" stroke-width="7"/>
  <rect x="360" y="250" width="64" height="64" rx="8" fill="#2a1a10"/>${[0, 1, 2, 3].map(k => `<rect x="366" y="${256 + k * 15}" width="52" height="6" fill="#7a5a3a"/>`).join('')}
  <rect x="60" y="366" width="40" height="26" fill="${AK}"/><rect x="360" y="366" width="40" height="26" fill="${AK}"/>`);
}
// generic console box by generation (1: fat black, 2: slim matte, 3: tall white), viewBox 0 0 360 300
function consoleSVG(id, gen = 1) {
  const c = gen === 1 ? ['#3a3f4a', '#16191f'] : gen === 2 ? ['#2a2f3a', '#0e1116'] : ['#ffffff', '#cfd6e2'];
  const body = gen === 1 ? `<rect x="20" y="90" width="320" height="150" rx="40" fill="url(#cn${id})" stroke="${AK}" stroke-width="10"/><rect x="60" y="150" width="240" height="10" rx="5" fill="#000" opacity=".6"/><circle cx="300" cy="125" r="9" fill="#5fe0ff"/>`
    : gen === 2 ? `<path d="M30 120 L330 100 L330 220 L30 240 Z" fill="url(#cn${id})" stroke="${AK}" stroke-width="10" stroke-linejoin="round"/><path d="M40 180 L320 162" stroke="#5fe0ff" stroke-width="6" opacity=".9"/>`
    : `<path d="M110 20 Q180 6 250 20 L270 270 Q180 290 90 270 Z" fill="url(#cn${id})" stroke="${AK}" stroke-width="10" stroke-linejoin="round"/><path d="M150 30 L150 260 L210 260 L210 30" fill="#1d2230" stroke="${AK}" stroke-width="6"/><path d="M180 40 L180 250" stroke="#5f8cff" stroke-width="5" opacity=".9"/>`;
  return sv('0 0 360 300', `<defs>${lgr('cn' + id, c[0], c[1])}</defs><ellipse cx="180" cy="285" rx="160" ry="12" fill="rgba(0,0,0,.35)"/>${body}`);
}
// generic game case (no real cover art), viewBox 0 0 200 260
function caseSVG(id, c0 = '#ff5fb0', c1 = '#6a3cff', big = '5') {
  return sv('0 0 200 260', `<defs>${lgr('gc' + id, c0, c1)}</defs><rect x="8" y="8" width="184" height="244" rx="12" fill="#1d2230" stroke="${AK}" stroke-width="8"/>
  <rect x="20" y="20" width="160" height="220" rx="6" fill="url(#gc${id})"/><rect x="20" y="20" width="160" height="34" fill="#0e1116"/>
  <text x="100" y="180" text-anchor="middle" style="font:900 140px Unb" fill="#fff" stroke="${AK}" stroke-width="8" paint-order="stroke">${big}</text>`);
}
// parachute with a rider slot, viewBox 0 0 400 420 (canopy top, harness at 200,400)
function parachuteSVG(id) {
  return sv('0 0 400 420', `<defs>${lgr('pc' + id, '#ff5fb0', '#ff9a3d')}</defs>
  <path d="M20 170 Q200 -40 380 170 Q335 140 290 170 Q245 140 200 170 Q155 140 110 170 Q65 140 20 170 Z" fill="url(#pc${id})" stroke="${AK}" stroke-width="9" stroke-linejoin="round"/>
  <path d="M110 170 Q140 40 200 20 M290 170 Q260 40 200 20" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="6"/>
  ${[20, 110, 200, 290, 380].map(x => `<path d="M${x} 170 L200 400" stroke="${AK}" stroke-width="4"/>`).join('')}`);
}
// headset, viewBox 0 0 300 260
function headsetSVG(id) {
  return sv('0 0 300 260', `<path d="M50 150 Q50 30 150 30 Q250 30 250 150" fill="none" stroke="${AK}" stroke-width="26" stroke-linecap="round"/><path d="M50 150 Q50 30 150 30 Q250 30 250 150" fill="none" stroke="#3a3f4a" stroke-width="14" stroke-linecap="round"/>
  <rect x="20" y="130" width="70" height="100" rx="30" fill="#ff5fb0" stroke="${AK}" stroke-width="9"/><rect x="210" y="130" width="70" height="100" rx="30" fill="#ff5fb0" stroke="${AK}" stroke-width="9"/>
  <path d="M60 220 Q80 260 150 250" fill="none" stroke="${AK}" stroke-width="9"/><circle cx="156" cy="248" r="14" fill="#3a3f4a" stroke="${AK}" stroke-width="6"/>`);
}
// police light bar, viewBox 0 0 260 110. Rig: .lr .lb (o)
function sirenSVG(id) {
  return sv('0 0 260 110', `<rect x="10" y="60" width="240" height="40" rx="14" fill="#2a2f3a" stroke="${AK}" stroke-width="8"/>
  <path class="lr" d="M24 62 Q24 12 76 12 L122 12 L122 62 Z" fill="#ff3b5c" stroke="${AK}" stroke-width="8"/><path class="lb" d="M138 62 L138 12 L184 12 Q236 12 236 62 Z" fill="#3b7bff" stroke="${AK}" stroke-width="8"/>
  <path d="M40 30 Q50 20 70 20" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".7"/><path d="M160 22 Q180 20 200 26" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".7"/>`);
}
// graduation cap, viewBox 0 0 300 220
function gradCapSVG() {
  return sv('0 0 300 220', `<path d="M150 20 L290 80 L150 140 L10 80 Z" fill="#1d2230" stroke="${AK}" stroke-width="9" stroke-linejoin="round"/>
  <path d="M70 108 L70 170 Q150 210 230 170 L230 108 L150 140 Z" fill="#2a2f3a" stroke="${AK}" stroke-width="9" stroke-linejoin="round"/>
  <path d="M150 80 L250 110 L250 170" fill="none" stroke="#ffd34d" stroke-width="7"/><circle cx="250" cy="178" r="12" fill="#ffd34d" stroke="${AK}" stroke-width="5"/>`);
}
// two wedding rings, viewBox 0 0 300 220
function ringsSVG() {
  return sv('0 0 300 220', `<circle cx="115" cy="120" r="70" fill="none" stroke="${AK}" stroke-width="30"/><circle cx="115" cy="120" r="70" fill="none" stroke="#ffd34d" stroke-width="18"/>
  <circle cx="190" cy="120" r="70" fill="none" stroke="${AK}" stroke-width="30"/><circle cx="190" cy="120" r="70" fill="none" stroke="#ffd34d" stroke-width="18"/>
  <path d="M150 30 L165 10 L180 30 L165 48 Z" fill="#bff6ff" stroke="${AK}" stroke-width="6"/>`);
}
