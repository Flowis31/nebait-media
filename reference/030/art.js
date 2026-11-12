// 030 world: a running stadium at sunset — sky with sun and clouds (far), grandstands with a crowd (far, dof),
// floodlight towers and flags (mid), banners and cones along the track (near); red running track with white lanes.
const AK = '#0a130d';
const sv = (vb, inner, extra = '') => `<svg viewBox="${vb}" style="width:100%;height:100%;overflow:visible" ${extra}>${inner}</svg>`;
function sunSVG() {
  return sv('0 0 400 400', `<circle cx="200" cy="200" r="190" fill="#ffd27a" opacity=".12"/><circle cx="200" cy="200" r="140" fill="#ffc46b" opacity=".22"/>
    <circle cx="200" cy="200" r="100" fill="#ffe3a0"/><circle cx="200" cy="200" r="100" fill="none" stroke="#fff3cf" stroke-width="8" opacity=".6"/>`);
}
function cloudsSVG() {
  let s = '';
  for (let i = 0; i < 9; i++) { const x = 380 * i + 120 * hash(i), y = 60 + 260 * hash(i * 2.3), w = 220 + 200 * hash(i * 4.1);
    s += `<g opacity="${(0.35 + 0.4 * hash(i * 5.7)).toFixed(2)}"><ellipse cx="${x}" cy="${y}" rx="${w / 2}" ry="${w / 7}" fill="#ffb3a1"/><ellipse cx="${x + w * 0.12}" cy="${y - w / 12}" rx="${w / 4}" ry="${w / 8}" fill="#ffc9b8"/></g>`; }
  return sv('0 0 3400 500', s);
}
function standsSVG() {   // far grandstands with a crowd of coloured dots, roof and scoreboard
  let s = `<path d="M0 260 L3400 260 L3400 900 L0 900 Z" fill="#3a2350"/>`;
  for (let r = 0; r < 9; r++) { const y = 300 + r * 58; s += `<rect x="0" y="${y}" width="3400" height="10" fill="#2a1840"/>`;
    for (let c = 0; c < 120; c++) { const k = r * 131 + c * 1.7, x = c * 28.3 + 14 * (r % 2) + 6 * hash(k);
      const col = ['#ff6b8a', '#ffd34d', '#5fe0ff', '#9b7bff', '#ff9f5a', '#f4ecd9'][Math.floor(hash(k + 3) * 6)];
      s += `<circle cx="${x.toFixed(0)}" cy="${(y - 16).toFixed(0)}" r="${(8 + 3 * hash(k + 1)).toFixed(1)}" fill="${col}" opacity=".8"/>`; } }
  s += `<path d="M0 260 L3400 260 L3400 210 L0 230 Z" fill="#22123a"/><path d="M0 210 L3400 180" stroke="#5a3a7a" stroke-width="10"/>`;
  s += `<rect x="1500" y="40" width="400" height="200" rx="16" fill="#1a1028" stroke="${AK}" stroke-width="10"/><rect x="1520" y="60" width="360" height="160" rx="8" fill="#0c0a18"/>`;
  for (let i = 0; i < 18; i++) s += `<circle cx="${1545 + i * 18.5}" cy="${100 + 40 * Math.floor(i / 9)}" r="6" fill="#ffd34d" opacity="${(0.3 + 0.7 * hash(i)).toFixed(2)}"/>`;
  return sv('0 0 3400 900', s);
}
function lightsSVG() {   // floodlight towers + flags (mid layer)
  let s = '';
  [200, 1250, 2300, 3200].forEach((x, i) => {
    s += `<path d="M${x} 1000 L${x + 20} 260 L${x + 40} 1000" fill="#2a1d3c" stroke="${AK}" stroke-width="8"/>
      <rect x="${x - 70}" y="160" width="180" height="110" rx="12" fill="#3a2a52" stroke="${AK}" stroke-width="9"/>`;
    for (let k = 0; k < 6; k++) s += `<circle cx="${x - 40 + (k % 3) * 60}" cy="${190 + Math.floor(k / 3) * 50}" r="20" fill="#fff6d6" stroke="${AK}" stroke-width="5"/>`;
    s += `<path d="M${x + 20} 270 L${x - 300} 1100 L${x + 340} 1100 Z" fill="#fff4cf" opacity=".06"/>`;
  });
  [700, 1800, 2800].forEach((x, i) => { const c = ['#ff3b5c', '#43f0ff', '#ffd34d'][i];
    s += `<path d="M${x} 1000 L${x} 560" stroke="${AK}" stroke-width="10"/><path d="M${x} 566 Q${x + 80} 540 ${x + 150} 576 Q${x + 80} 610 ${x} 640 Z" fill="${c}" stroke="${AK}" stroke-width="7"/>`; });
  return sv('0 0 3400 1100', s);
}
function nearSVG() {     // banners on the fence + cones (near layer)
  let s = `<rect x="0" y="1060" width="3400" height="90" fill="#24324a" stroke="${AK}" stroke-width="8"/>`;
  for (let i = 0; i < 14; i++) { const x = i * 250 + 20, c = i % 3 === 0 ? '#ff3b5c' : i % 3 === 1 ? '#43f0ff' : '#ffd34d';
    s += `<rect x="${x}" y="1072" width="200" height="66" rx="10" fill="${c}" opacity=".85"/><path d="M${x + 30} 1105 L${x + 170} 1105" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".5"/>`; }
  return sv('0 0 3400 1150', s);
}
function trackSVG() {    // perspective running track (floor), lanes converge toward the horizon
  let s = `<defs><linearGradient id="trk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8403a"/><stop offset="1" stop-color="#8a2420"/></linearGradient></defs>
    <path d="M-400 0 L1480 0 L2400 700 L-1320 700 Z" fill="url(#trk)"/>`;
  for (let k = 0; k <= 6; k++) { const x0 = -400 + k * 1880 / 6, x1 = -1320 + k * 3720 / 6; s += `<path d="M${x0} 0 L${x1} 700" stroke="#fff" stroke-width="7" opacity=".75"/>`; }
  s += `<path d="M-400 0 L1480 0" stroke="#fff" stroke-width="10" opacity=".9"/>`;
  return sv('0 0 1080 700', s, 'preserveAspectRatio="none"');
}
// icons for the "motor": screen (sun), processor (chip), system (gear) — viewBox 0 0 200 200, rig .icspin (r, origin 100 100)
function iconSVG(kind, col) {
  const box = `<rect x="14" y="14" width="172" height="172" rx="40" fill="${col}" stroke="${AK}" stroke-width="10"/><path d="M34 44 Q36 30 54 28" stroke="#fff" stroke-width="8" fill="none" opacity=".6" stroke-linecap="round"/>`;
  if (kind === 'screen') return sv('0 0 200 200', box + `<rect x="54" y="44" width="92" height="112" rx="14" fill="#fff" stroke="${AK}" stroke-width="8"/>
    <g class="icspin" style="transform-origin:100px 100px"><circle cx="100" cy="100" r="18" fill="#ffd34d" stroke="${AK}" stroke-width="6"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M${100 + 26 * Math.cos(a * Math.PI / 180)} ${100 + 26 * Math.sin(a * Math.PI / 180)} L${100 + 38 * Math.cos(a * Math.PI / 180)} ${100 + 38 * Math.sin(a * Math.PI / 180)}" stroke="#ff9f2e" stroke-width="7" stroke-linecap="round"/>`).join('')}</g>`);
  if (kind === 'cpu') { let p = ''; for (let k = 0; k < 4; k++) { const o = 70 + k * 20; p += `<path d="M${o} 44 L${o} 58 M${o} 142 L${o} 156 M44 ${o} L58 ${o} M142 ${o} L156 ${o}" stroke="${AK}" stroke-width="7" stroke-linecap="round"/>`; }
    return sv('0 0 200 200', box + p + `<rect x="58" y="58" width="84" height="84" rx="12" fill="#2b3446" stroke="${AK}" stroke-width="8"/><g class="icspin" style="transform-origin:100px 100px"><rect x="80" y="80" width="40" height="40" rx="6" fill="#43f0ff"/></g>`); }
  let teeth = ''; for (let k = 0; k < 8; k++) { const a = k * 45; teeth += `<rect x="90" y="40" width="20" height="26" rx="4" fill="#e9eef2" stroke="${AK}" stroke-width="6" transform="rotate(${a} 100 100)"/>`; }
  return sv('0 0 200 200', box + `<g class="icspin" style="transform-origin:100px 100px">${teeth}<circle cx="100" cy="100" r="40" fill="#e9eef2" stroke="${AK}" stroke-width="8"/><circle cx="100" cy="100" r="14" fill="${col}" stroke="${AK}" stroke-width="6"/></g>`);
}
// finish line arch with a checkered banner, viewBox 0 0 1000 700
function finishSVG() {
  let ch = ''; for (let i = 0; i < 24; i++) for (let j = 0; j < 2; j++) if ((i + j) % 2) ch += `<rect x="${110 + i * 32.5}" y="${60 + j * 32}" width="32.5" height="32" fill="${AK}"/>`;
  return sv('0 0 1000 700', `<rect x="70" y="40" width="40" height="660" fill="#e9eef2" stroke="${AK}" stroke-width="10"/><rect x="890" y="40" width="40" height="660" fill="#e9eef2" stroke="${AK}" stroke-width="10"/>
    <rect x="110" y="60" width="780" height="64" fill="#fff" stroke="${AK}" stroke-width="8"/>${ch}<rect x="110" y="60" width="780" height="64" fill="none" stroke="${AK}" stroke-width="8"/>`);
}
// podium step "2", viewBox 0 0 700 260
function podiumSVG(id) {
  return sv('0 0 700 260', `<defs><linearGradient id="pd${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9eef2"/><stop offset="1" stop-color="#9aa6b2"/></linearGradient></defs>
    <rect x="10" y="20" width="680" height="230" rx="18" fill="url(#pd${id})" stroke="${AK}" stroke-width="12"/><path d="M30 40 L670 40" stroke="#fff" stroke-width="8" opacity=".7"/>
    <text x="350" y="200" text-anchor="middle" style="font:900 170px Unb" fill="#c0c8d2" stroke="${AK}" stroke-width="10" paint-order="stroke">2</text>`);
}
// running-race obstacle signs: play, call, gamepad — viewBox 0 0 200 200
function signSVG(kind, col) {
  const base = `<circle cx="100" cy="100" r="86" fill="${col}" stroke="${AK}" stroke-width="10"/><path d="M40 70 Q50 34 90 22" stroke="#fff" stroke-width="9" fill="none" opacity=".55" stroke-linecap="round"/>`;
  if (kind === 'play') return sv('0 0 200 200', base + `<path d="M80 60 L146 100 L80 140 Z" fill="#fff" stroke="${AK}" stroke-width="8" stroke-linejoin="round"/>`);
  if (kind === 'call') return sv('0 0 200 200', base + `<path d="M66 52 Q54 60 58 80 Q72 128 120 142 Q140 146 148 134 L136 112 L114 118 Q92 108 82 86 L88 64 Z" fill="#fff" stroke="${AK}" stroke-width="7" stroke-linejoin="round"/>`);
  return sv('0 0 200 200', base + `<path d="M46 92 Q46 70 70 70 L130 70 Q154 70 154 92 L160 124 Q162 142 146 142 Q134 142 126 128 L74 128 Q66 142 54 142 Q38 142 40 124 Z" fill="#fff" stroke="${AK}" stroke-width="7"/>
    <path d="M70 92 L70 112 M60 102 L80 102" stroke="${AK}" stroke-width="7" stroke-linecap="round"/><circle cx="124" cy="96" r="6" fill="${AK}"/><circle cx="136" cy="110" r="6" fill="${AK}"/>`);
}
// stadium seen from above (scale shot), viewBox 0 0 1080 1100. Oval track centre (540,560), lanes rx 420/ry 300.
function stadiumTopSVG() {
  let crowd = '';
  for (let i = 0; i < 260; i++) { const a = i / 260 * Math.PI * 2, r = 1 + 0.06 * hash(i * 3.1), cx = 540 + 500 * r * Math.cos(a), cy = 560 + 380 * r * Math.sin(a);
    crowd += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${(7 + 4 * hash(i)).toFixed(1)}" fill="${['#ff6b8a', '#ffd34d', '#5fe0ff', '#9b7bff', '#f4ecd9'][i % 5]}"/>`; }
  return sv('0 0 1080 1100', `<ellipse cx="540" cy="560" rx="560" ry="440" fill="#3a2350" stroke="${AK}" stroke-width="10"/>${crowd}
    <ellipse cx="540" cy="560" rx="470" ry="350" fill="#24324a" stroke="${AK}" stroke-width="8"/>
    <ellipse cx="540" cy="560" rx="450" ry="330" fill="#c8403a" stroke="${AK}" stroke-width="8"/>
    <ellipse cx="540" cy="560" rx="420" ry="300" fill="none" stroke="#fff" stroke-width="5" opacity=".8"/><ellipse cx="540" cy="560" rx="390" ry="270" fill="none" stroke="#fff" stroke-width="5" opacity=".8"/>
    <ellipse cx="540" cy="560" rx="360" ry="240" fill="#3aa86a" stroke="#fff" stroke-width="8"/>
    <path d="M540 320 L540 800" stroke="#fff" stroke-width="5" opacity=".6"/><circle cx="540" cy="560" r="70" fill="none" stroke="#fff" stroke-width="5" opacity=".6"/>
    <path d="M180 560 L120 560" stroke="#fff" stroke-width="12"/>`);
}
