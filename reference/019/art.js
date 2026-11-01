// 019 art: one-off pieces for «Наушник, часть 2» — metro car world, waves, turtle, fly, swatter, train/plane/voice icons, microchip.
// Recurring props (earbud, ear cut-away, ear tip, person, phone, chat bubble) live in tools/props.js.
const AK = '#0a130d';
const sv = (vb, inner) => `<svg viewBox="${vb}" style="overflow:visible;left:0;top:0;width:100%;height:100%">${inner}</svg>`;

// metro car wall with windows, viewBox 0 0 3400 1300: wall panels, 6 windows (dark glass, the tunnel shows through), ad strips, seats
function carWallSVG() {
  let s = `<defs><linearGradient id="cw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a6e70"/><stop offset=".55" stop-color="#1b4c50"/><stop offset="1" stop-color="#10302f"/></linearGradient>
    <linearGradient id="cs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffab5a"/><stop offset="1" stop-color="#d9601f"/></linearGradient>
    <linearGradient id="gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>`;
  // wall with window holes (evenodd) so the tunnel layer behind shows through
  let holes = '';
  for (let k = 0; k < 6; k++) { const x = 120 + k * 560; holes += ` M${x + 40} 250 L${x + 440} 250 Q${x + 480} 250 ${x + 480} 290 L${x + 480} 620 Q${x + 480} 660 ${x + 440} 660 L${x + 40} 660 Q${x} 660 ${x} 620 L${x} 290 Q${x} 250 ${x + 40} 250 Z`; }
  s += `<path d="M0 0 L3400 0 L3400 1300 L0 1300 Z${holes}" fill="url(#cw)" fill-rule="evenodd"/>`;
  for (let k = 0; k < 6; k++) {
    const x = 120 + k * 560;
    s += `<path d="M${x + 40} 250 L${x + 440} 250 Q${x + 480} 250 ${x + 480} 290 L${x + 480} 620 Q${x + 480} 660 ${x + 440} 660 L${x + 40} 660 Q${x} 660 ${x} 620 L${x} 290 Q${x} 250 ${x + 40} 250 Z" fill="url(#gl)" stroke="#0a1a1b" stroke-width="18"/>`;
    s += `<path d="M${x + 240} 250 L${x + 240} 660" stroke="#0a1a1b" stroke-width="12"/>`;
    s += `<rect x="${x + 20}" y="120" width="440" height="80" rx="14" fill="#f4ecd9" opacity=".9" stroke="#0a1a1b" stroke-width="8"/><rect x="${x + 50}" y="146" width="${180 + 120 * ((k * 37) % 3)}" height="14" rx="7" fill="#2a6e70"/><rect x="${x + 50}" y="170" width="140" height="12" rx="6" fill="#c9b98a"/>`;
  }
  s += `<path d="M0 220 L3400 220" stroke="#0a1a1b" stroke-width="10"/><path d="M0 720 L3400 720" stroke="#3b8a8c" stroke-width="8" opacity=".6"/>`;
  // long bench
  s += `<rect x="0" y="1010" width="3400" height="90" rx="24" fill="url(#cs)" stroke="#0a1a1b" stroke-width="12"/>`;
  for (let k = 0; k < 18; k++) s += `<path d="M${90 + k * 190} 1022 L${90 + k * 190} 1090" stroke="#b44c18" stroke-width="7" opacity=".7"/>`;
  s += `<rect x="0" y="1100" width="3400" height="140" fill="#0e2627"/><path d="M0 1030 L3400 1030" stroke="#ffd2a6" stroke-width="6" opacity=".5"/>`;
  return sv('0 0 3400 1300', s);
}
// tunnel behind the windows: lamps and cables that stream past (moved per frame), viewBox 0 0 1200 420
function tunnelSVG() {
  let s = `<rect x="0" y="0" width="1200" height="420" fill="#060c0d"/>`;
  s += `<path d="M0 120 L1200 120 M0 300 L1200 300" stroke="#1d2a2c" stroke-width="10"/><path d="M0 340 L1200 340" stroke="#162022" stroke-width="18"/>`;
  for (let k = 0; k < 4; k++) s += `<rect x="${k * 300 + 40}" y="196" width="120" height="16" rx="8" fill="#ffc46b"/><rect x="${k * 300}" y="180" width="200" height="48" rx="24" fill="#ffb84d" opacity=".22"/>`;
  return sv('0 0 1200 420', s);
}
// yellow handrail poles, viewBox 0 0 3400 1300
function polesSVG() {
  let s = `<defs><linearGradient id="pl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff2a8"/><stop offset=".5" stop-color="#ffd23d"/><stop offset="1" stop-color="#b88a00"/></linearGradient></defs>`;
  s += `<rect x="0" y="40" width="3400" height="26" rx="13" fill="url(#pl)" stroke="${AK}" stroke-width="8"/>`;
  for (let k = 0; k < 5; k++) s += `<rect x="${380 + k * 700}" y="40" width="34" height="1260" rx="17" fill="url(#pl)" stroke="${AK}" stroke-width="8"/>`;
  for (let k = 0; k < 9; k++) { const x = 160 + k * 380; s += `<path d="M${x} 66 L${x} 130" stroke="#d9c070" stroke-width="6"/><path d="M${x - 26} 130 Q${x} 196 ${x + 26} 130 Z" fill="none" stroke="#ffd23d" stroke-width="10" stroke-linejoin="round"/>`; }
  return sv('0 0 3400 1300', s);
}
// sine path across [x0,x1] around y0, amplitude a, `hills` periods, phase ph. jag>0 adds a fast jitter (voice).
function wavePath(x0, x1, y0, a, hills, ph = 0, n = 120, jag = 0, jph = 0) {
  let d = '';
  for (let i = 0; i <= n; i++) {
    const u = i / n, x = x0 + (x1 - x0) * u;
    let y = y0 - a * Math.sin(2 * Math.PI * hills * u + ph);
    if (jag) y -= jag * (0.6 * Math.sin(2 * Math.PI * 9.3 * u + jph * 1.7) + 0.4 * Math.sin(2 * Math.PI * 15.1 * u - jph * 2.3));
    d += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  return d;
}
function waveBoxSVG(cls, col, w = 1000, h = 400, sw = 16) {
  return sv(`0 0 ${w} ${h}`, `<path class="${cls}o" d="" fill="none" stroke="${AK}" stroke-width="${sw + 14}" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="${cls}" d="" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`);
}
// turtle, viewBox 0 0 360 240. Rig: .tHead (origin 300 150), .tLegs (sy), .tShell
function turtleSVG(id) {
  return sv('0 0 360 240', `<defs><radialGradient id="ts${id}" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="#b6f07a"/><stop offset="1" stop-color="#3f8f2a"/></radialGradient></defs>
    <ellipse cx="180" cy="228" rx="150" ry="12" fill="#000" opacity=".22"/>
    <g class="tLegs" style="transform-origin:180px 210px"><ellipse cx="90" cy="206" rx="34" ry="22" fill="#9be070" stroke="${AK}" stroke-width="8"/><ellipse cx="250" cy="206" rx="34" ry="22" fill="#9be070" stroke="${AK}" stroke-width="8"/></g>
    <g class="tHead" style="transform-origin:290px 150px"><ellipse cx="316" cy="140" rx="40" ry="34" fill="#9be070" stroke="${AK}" stroke-width="8"/><circle cx="326" cy="130" r="8" fill="${AK}"/><circle cx="329" cy="127" r="3" fill="#fff"/><path d="M322 154 Q334 160 346 152" fill="none" stroke="${AK}" stroke-width="5" stroke-linecap="round"/></g>
    <g class="tShell"><path d="M40 196 Q50 60 180 56 Q310 60 320 196 Z" fill="url(#ts${id})" stroke="${AK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M110 110 L150 90 L210 90 L250 110 L240 160 L180 176 L120 160 Z M110 110 L70 150 M250 110 L290 150 M150 90 L140 70 M210 90 L220 70 M120 160 L100 196 M240 160 L260 196 M180 176 L180 196" fill="none" stroke="#2e6a1e" stroke-width="7" stroke-linejoin="round"/>
    <path d="M90 100 Q120 72 160 70" fill="none" stroke="#fff" stroke-width="8" opacity=".45" stroke-linecap="round"/></g>`);
}
// fly, viewBox 0 0 120 100. Rig: .fwing (sy flap)
function flySVG(id) {
  return sv('0 0 120 100', `<g class="fwing" style="transform-origin:60px 46px"><ellipse cx="40" cy="26" rx="26" ry="16" fill="#e8f6ff" opacity=".85" stroke="${AK}" stroke-width="5" transform="rotate(-25 40 26)"/><ellipse cx="80" cy="26" rx="26" ry="16" fill="#e8f6ff" opacity=".85" stroke="${AK}" stroke-width="5" transform="rotate(25 80 26)"/></g>
    <ellipse cx="60" cy="60" rx="26" ry="22" fill="#2b3340" stroke="${AK}" stroke-width="6"/><circle cx="48" cy="52" r="10" fill="#c0283a" stroke="${AK}" stroke-width="4"/><circle cx="72" cy="52" r="10" fill="#c0283a" stroke="${AK}" stroke-width="4"/>
    <circle cx="45" cy="49" r="3" fill="#fff"/><circle cx="69" cy="49" r="3" fill="#fff"/><path d="M50 72 Q60 80 70 72" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`);
}
// fly swatter, viewBox 0 0 200 480 (head at the top, handle down; held at the bottom, origin 100 460)
function swatterSVG(id) {
  let grid = ''; for (let k = 1; k < 6; k++) grid += `<path d="M${20 + k * 26} 20 L${20 + k * 26} 180 M20 ${20 + k * 26} L180 ${20 + k * 26}" stroke="#b5203a" stroke-width="4" opacity=".7"/>`;
  return sv('0 0 200 480', `<rect x="20" y="20" width="160" height="160" rx="26" fill="#ff4f6b" stroke="${AK}" stroke-width="9"/>${grid}<path d="M36 38 Q60 30 90 30" stroke="#fff" stroke-width="7" opacity=".5" stroke-linecap="round" fill="none"/>
    <rect x="90" y="176" width="20" height="290" rx="10" fill="#ffd23d" stroke="${AK}" stroke-width="8"/>`);
}
// icons, viewBox 0 0 200 200
function trainIcon() {
  return sv('0 0 200 200', `<rect x="40" y="20" width="120" height="140" rx="30" fill="#ffb84d" stroke="${AK}" stroke-width="9"/><rect x="58" y="44" width="84" height="50" rx="10" fill="#bfe8ff" stroke="${AK}" stroke-width="7"/>
    <circle cx="70" cy="126" r="11" fill="#fff6c8" stroke="${AK}" stroke-width="6"/><circle cx="130" cy="126" r="11" fill="#fff6c8" stroke="${AK}" stroke-width="6"/><path d="M60 160 L40 190 M140 160 L160 190" stroke="${AK}" stroke-width="10" stroke-linecap="round"/>`);
}
function planeIcon() {
  return sv('0 0 200 200', `<path d="M100 14 Q114 14 114 40 L114 80 L184 116 L184 136 L114 116 L112 160 L136 178 L136 192 L100 182 L64 192 L64 178 L88 160 L86 116 L16 136 L16 116 L86 80 L86 40 Q86 14 100 14 Z" fill="#e8f0ff" stroke="${AK}" stroke-width="9" stroke-linejoin="round"/>
    <path d="M94 30 L94 70" stroke="#fff" stroke-width="7" stroke-linecap="round"/>`);
}
function voiceIcon() {   // a talking head in profile with a speech burst
  return sv('0 0 200 200', `<path d="M60 180 L60 150 Q30 140 30 100 Q30 40 90 36 Q140 34 146 84 L160 108 L146 112 L146 136 Q146 150 126 150 L108 150 L108 180 Z" fill="#ffcfae" stroke="${AK}" stroke-width="9" stroke-linejoin="round"/>
    <circle cx="112" cy="80" r="7" fill="${AK}"/><path d="M168 70 L190 58 M172 96 L196 96 M168 122 L190 134" stroke="#ff5f8f" stroke-width="10" stroke-linecap="round"/>`);
}
function chipIcon() {   // a microchip = "electronics"
  let pins = ''; for (let k = 0; k < 4; k++) { const p = 58 + k * 28; pins += `<path d="M${p} 18 L${p} 40 M${p} 160 L${p} 182 M18 ${p} L40 ${p} M160 ${p} L182 ${p}" stroke="#c9d2dc" stroke-width="9" stroke-linecap="round"/>`; }
  return sv('0 0 200 200', `${pins}<rect x="40" y="40" width="120" height="120" rx="18" fill="#2b3340" stroke="${AK}" stroke-width="9"/><rect x="70" y="70" width="60" height="60" rx="8" fill="#4a5568" stroke="#7dff8a" stroke-width="5"/><path d="M54 54 L84 54" stroke="#fff" stroke-width="6" opacity=".3" stroke-linecap="round"/>`);
}
function checkIcon(cls = 'okp') {
  return sv('0 0 140 140', `<circle cx="70" cy="70" r="60" fill="#25a04a" stroke="${AK}" stroke-width="9"/><path class="${cls}" d="M40 72 L62 94 L102 50" pathLength="100" fill="none" stroke="#fff" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" style="stroke-dasharray:100;stroke-dashoffset:100"/>`);
}
function crossIcon(cls = 'xp') {
  return sv('0 0 140 140', `<circle cx="70" cy="70" r="60" fill="#e3243f" stroke="${AK}" stroke-width="9"/><path class="${cls}" d="M44 44 L96 96 M96 44 L44 96" pathLength="100" fill="none" stroke="#fff" stroke-width="15" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/>`);
}
// meter bar 0..1 (.mfill sx, origin left), viewBox 0 0 400 70
function meterSVG(id, col = '#7dff8a') {
  return sv('0 0 400 70', `<rect x="6" y="6" width="388" height="58" rx="29" fill="#10202a" stroke="${AK}" stroke-width="9"/><rect class="mfill" x="20" y="18" width="360" height="34" rx="17" fill="${col}" style="transform-origin:20px 35px"/><rect x="20" y="18" width="360" height="12" rx="6" fill="#fff" opacity=".2"/>`);
}
// kitchen wall for the joke: warm tiles, a window, a table edge. viewBox 0 0 1280 2120
function kitchenSVG() {
  let t = ''; for (let r = 0; r < 18; r++) for (let c = 0; c < 11; c++) t += `<rect x="${c * 120 + (r % 2) * 60 - 60}" y="${r * 70}" width="116" height="66" rx="8" fill="${(r + c) % 3 ? '#ffe7a8' : '#ffdb8a'}"/>`;
  return sv('0 0 1280 2120', `<rect width="1280" height="2120" fill="#f1c770"/>${t}
    <rect x="760" y="260" width="380" height="340" rx="20" fill="#9fdcff" stroke="#7a4a2a" stroke-width="22"/><path d="M950 260 L950 600 M760 430 L1140 430" stroke="#7a4a2a" stroke-width="16"/>
    <circle cx="1060" cy="330" r="40" fill="#fff6c8"/>
    <rect x="0" y="1180" width="1280" height="940" fill="#c98a4a"/><rect x="0" y="1160" width="1280" height="50" fill="#e0a35a" stroke="${AK}" stroke-width="10"/>
    <path d="M0 1260 L1280 1260 M0 1400 L1280 1400" stroke="#a8703a" stroke-width="8" opacity=".6"/>`);
}
function bellSVG() {
  return sv('0 0 110 110', `<g class="bell" style="transform-origin:55px 14px"><path d="M55 10 Q86 12 88 52 L92 76 L18 76 L22 52 Q24 12 55 10 Z" fill="#ffe14d" stroke="${AK}" stroke-width="8" stroke-linejoin="round"/><circle cx="55" cy="88" r="11" fill="#ffe14d" stroke="${AK}" stroke-width="7"/></g>`);
}
