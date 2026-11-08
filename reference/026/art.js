// 026 art: scene-specific drawings (world layers, map board, snail). Recurring props live in props.js (satellite, stopwatch, pin...).
const AIK = '#0a130d';
// far layer: starfield 2400x1300 (seeded, no Math.random)
function starsSVG() {
  let s = '';
  for (let k = 0; k < 170; k++) { const x = hash(k * 1.7) * 2400, y = hash(k * 2.9 + 4) * 1250, r = 1.2 + 3.2 * Math.pow(hash(k * 5.3), 3), o = 0.35 + 0.6 * hash(k * 7.1);
    s += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#fff" opacity="${o.toFixed(2)}"/>`; }
  for (let k = 0; k < 9; k++) { const x = hash(k * 11.3) * 2400, y = hash(k * 3.1 + 9) * 1000;
    s += `<path d="M${x} ${y - 16} L${x + 4} ${y - 4} L${x + 16} ${y} L${x + 4} ${y + 4} L${x} ${y + 16} L${x - 4} ${y + 4} L${x - 16} ${y} L${x - 4} ${y - 4} Z" fill="#fff4c8" opacity=".85"/>`; }
  return `<svg viewBox="0 0 2400 1300" style="left:0;top:0;width:2400px;height:1300px;position:absolute">
    <defs><radialGradient id="neb1"><stop offset="0" stop-color="#7a5cff" stop-opacity=".35"/><stop offset="1" stop-color="#7a5cff" stop-opacity="0"/></radialGradient>
    <radialGradient id="neb2"><stop offset="0" stop-color="#2fc8ff" stop-opacity=".25"/><stop offset="1" stop-color="#2fc8ff" stop-opacity="0"/></radialGradient></defs>
    <ellipse cx="500" cy="380" rx="520" ry="300" fill="url(#neb1)"/><ellipse cx="1700" cy="560" rx="600" ry="320" fill="url(#neb2)"/>${s}</svg>`;
}
// mid layer: the Earth limb (a huge planet whose top edge sits at y ~1210 of a 3400-wide strip), continents, atmosphere glow
function earthSVG() {
  let land = '';
  const blobs = [[300, 1330, 260, 90], [820, 1290, 180, 60], [1350, 1340, 300, 110], [1900, 1300, 220, 70], [2600, 1320, 280, 90], [3100, 1290, 160, 60], [600, 1500, 380, 140], [1700, 1480, 420, 150], [2800, 1520, 380, 140]];
  blobs.forEach(([x, y, rx, ry], i) => { land += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${i % 2 ? '#3fae5a' : '#55c46a'}" stroke="#1f6a35" stroke-width="6" transform="rotate(${(hash(i) - 0.5) * 20} ${x} ${y})"/>`; });
  return `<svg viewBox="0 0 3400 900" style="left:0;top:0;width:3400px;height:900px;position:absolute;overflow:visible">
    <defs><linearGradient id="ocean" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a8cff"/><stop offset=".4" stop-color="#1f5fd0"/><stop offset="1" stop-color="#0d2f7a"/></linearGradient>
      <linearGradient id="atm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fe0ff" stop-opacity="0"/><stop offset=".7" stop-color="#7fe0ff" stop-opacity=".45"/><stop offset="1" stop-color="#bff3ff" stop-opacity=".9"/></linearGradient>
      <clipPath id="eclip"><path d="M-200 900 L-200 300 Q1700 -40 3600 300 L3600 900 Z"/></clipPath></defs>
    <path d="M-200 300 Q1700 -100 3600 300 L3600 330 Q1700 -70 -200 330 Z" fill="url(#atm)" opacity=".9" transform="translate(0,-60)"/>
    <path d="M-200 900 L-200 300 Q1700 -40 3600 300 L3600 900 Z" fill="url(#ocean)" stroke="#bff3ff" stroke-width="10"/>
    <g clip-path="url(#eclip)" transform="translate(0,-1050)">${land}</g>
    <path d="M-200 300 Q1700 -40 3600 300" fill="none" stroke="#fff" stroke-width="6" opacity=".5" transform="translate(0,14)"/></svg>`;
}
// near layer: thin cloud wisps over the limb (repeats every 1700 px)
function cloudsSVG() {
  let c = '';
  for (let k = 0; k < 12; k++) { const x = k * 290 + hash(k) * 120, y = 70 + hash(k * 3.3) * 60, w = 140 + hash(k * 2.2) * 160;
    c += `<path d="M${x} ${y} q${w * 0.2} -40 ${w * 0.45} -10 q${w * 0.25} -30 ${w * 0.55} 10 z" fill="#fff" opacity=".55"/>`; }
  return `<svg viewBox="0 0 3480 200" style="left:0;top:0;width:3480px;height:200px;position:absolute">${c}</svg>`;
}
// radio waves (arcs) under the transmitter: .w0..w4 (s / o), centred at (300, 0) of a 600x500 box
function wavesSVG(id) {
  let w = ''; for (let k = 0; k < 5; k++) w += `<path class="w${k}" d="M60 20 Q300 ${260} 540 20" fill="none" stroke="#ffe36b" stroke-width="16" stroke-linecap="round" style="transform-origin:300px 0px" opacity="0"/>`;
  return `<svg viewBox="0 0 600 500" style="left:0;top:0;width:100%;height:100%;overflow:visible">${w}</svg>`;
}
// phone screen contents: a mini map (roads, park, lake) — fits the phonePropSVG screen rect 22..198 x 44..374
function mapScreen(id, lake = true) {
  return `<rect x="22" y="44" width="176" height="330" rx="18" fill="#eaf2e2"/>
    <path d="M22 140 L198 120 M22 260 L198 290 M80 44 L110 374 M160 44 L150 374" stroke="#fff" stroke-width="16"/><path d="M22 140 L198 120 M22 260 L198 290 M80 44 L110 374 M160 44 L150 374" stroke="#cfd8c0" stroke-width="3" fill="none"/>
    <rect x="34" y="160" width="40" height="80" rx="10" fill="#9fdc86"/>${lake ? '<ellipse cx="170" cy="330" rx="40" ry="34" fill="#7cc4ff"/>' : ''}
    <path d="M110 300 L120 330 L100 330 Z" fill="#2f7cff"/>`;
}
// big paper city map for the joke (viewBox 0 0 900 760): roads, blocks, park, a lake on the right. .mlake (lake group)
function mapBoardSVG(id) {
  let blocks = ''; for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { const x = 60 + c * 150, y = 70 + r * 160; blocks += `<rect x="${x}" y="${y}" width="120" height="120" rx="14" fill="${(r + c) % 3 ? '#f1e7d0' : '#e6dcc2'}" stroke="#cbbf9f" stroke-width="4"/>`; }
  return `<svg viewBox="0 0 900 760" style="left:0;top:0;width:100%;height:100%;overflow:visible">
    <defs><linearGradient id="mpb${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#efe4c8"/></linearGradient>
    <linearGradient id="mpl${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd4ff"/><stop offset="1" stop-color="#3a8cff"/></linearGradient></defs>
    <rect x="10" y="10" width="880" height="740" rx="36" fill="url(#mpb${id})" stroke="${AIK}" stroke-width="12"/>${blocks}
    <path d="M30 190 L520 190 M30 350 L520 350 M30 510 L520 510 M190 30 L190 740 M340 30 L340 740" stroke="#ffffff" stroke-width="18"/>
    <rect x="210" y="380" width="110" height="110" rx="20" fill="#9fdc86" stroke="#6aa85a" stroke-width="4"/>
    <g class="mlake"><path d="M560 120 Q720 60 840 150 Q900 330 850 520 Q800 700 640 690 Q540 640 570 470 Q600 330 560 120 Z" fill="url(#mpl${id})" stroke="${AIK}" stroke-width="8"/>
      <path d="M640 260 Q680 250 720 262 M620 420 Q670 408 730 422 M660 560 Q700 552 740 562" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".7"/></g>
    <path d="M60 40 Q70 24 110 22" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".8"/></svg>`;
}
// a snail sticker (the "slowed down" joke), viewBox 0 0 240 180
function snailSVG(id) {
  return `<svg viewBox="0 0 240 180" style="left:0;top:0;width:100%;height:100%;overflow:visible">
    <defs><radialGradient id="sn${id}" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#ffd8a0"/><stop offset="1" stop-color="#e08a2e"/></radialGradient></defs>
    <path d="M20 150 Q20 120 70 118 L200 118 Q232 120 226 150 Z" fill="#c8f08a" stroke="${AIK}" stroke-width="8" stroke-linejoin="round"/>
    <path d="M196 120 L208 70 M214 122 L232 78" stroke="${AIK}" stroke-width="7" stroke-linecap="round"/><circle cx="208" cy="66" r="9" fill="${AIK}"/><circle cx="232" cy="74" r="9" fill="${AIK}"/>
    <circle cx="110" cy="86" r="66" fill="url(#sn${id})" stroke="${AIK}" stroke-width="8"/><path d="M110 86 m-8 0 a8 8 0 1 1 16 0 a20 20 0 1 1 -36 0 a34 34 0 1 1 64 0" fill="none" stroke="${AIK}" stroke-width="7" stroke-linecap="round"/>
    <path d="M196 140 Q206 146 216 140" stroke="${AIK}" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`;
}
// app grid screen with location pins (e1): three icons; pins on .ap0..ap2 (o/s). Fits the phonePropSVG screen.
function appsScreen(id) {
  const ic = (x, y, c0, c1, k) => `<g class="apg${k}" style="transform-box:fill-box;transform-origin:center"><rect x="${x}" y="${y}" width="66" height="66" rx="18" fill="${c0}" stroke="${AIK}" stroke-width="5"/><rect x="${x + 14}" y="${y + 14}" width="38" height="38" rx="10" fill="${c1}" opacity=".7"/></g>
    <g class="ap${k}" style="transform-box:fill-box;transform-origin:center"><path d="M${x + 60} ${y + 16} q-14 -16 -14 -26 a14 14 0 1 1 28 0 q0 10 -14 26 z" fill="#ff3b5c" stroke="${AIK}" stroke-width="4"/><circle cx="${x + 60}" cy="${y - 10}" r="5" fill="#fff"/></g>`;
  return `<rect x="22" y="44" width="176" height="330" rx="18" fill="#1d2a4a"/>
    ${ic(36, 90, '#ffb84d', '#fff', 0)}${ic(118, 90, '#5fd8ff', '#fff', 1)}${ic(36, 190, '#ff6fae', '#fff', 2)}${ic(118, 190, '#7dff8a', '#fff', 3)}
    <rect x="36" y="300" width="148" height="44" rx="22" fill="#2f3f66"/><g class="tog"><circle cx="160" cy="322" r="18" fill="#7dff8a" stroke="${AIK}" stroke-width="4"/></g>`;
}
