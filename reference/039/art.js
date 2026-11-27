// 039 world: a daylight kitchen turned into a home lab. Far: teal tiled wall with two bright windows (blurred), middle: open shelves
// with jars of cereals, a plant and a timer, near: a wooden counter edge. All seeded with hash(), no randomness.
function wallSVG() {
  let t = '';
  for (let y = 0; y < 1500; y += 90) for (let x = 0; x < 3400; x += 90) { const k = x * 7 + y; const v = hash(k * 0.013);
    t += `<rect x="${x + 3}" y="${y + 3}" width="84" height="84" rx="8" fill="${v > 0.85 ? '#1d7372' : v > 0.5 ? '#186566' : '#155c5e'}"/>`; }
  const win = (x) => `<g><rect x="${x}" y="180" width="520" height="640" rx="26" fill="#0a2a2c"/>
    <rect x="${x + 22}" y="202" width="476" height="596" rx="14" fill="url(#sky)"/>
    <circle cx="${x + 380}" cy="330" r="70" fill="#fff6c8" opacity=".9"/>
    <ellipse cx="${x + 160}" cy="420" rx="110" ry="36" fill="#fff" opacity=".8"/><ellipse cx="${x + 220}" cy="396" rx="70" ry="40" fill="#fff" opacity=".85"/>
    <ellipse cx="${x + 360}" cy="560" rx="90" ry="28" fill="#fff" opacity=".6"/>
    <path d="M${x + 22} 700 Q${x + 140} 620 ${x + 260} 690 T${x + 498} 670 L${x + 498} 798 L${x + 22} 798 Z" fill="#3f9a6a" opacity=".8"/>
    <rect x="${x + 254}" y="202" width="12" height="596" fill="#0a2a2c"/><rect x="${x + 22}" y="494" width="476" height="12" fill="#0a2a2c"/>
    <rect x="${x - 20}" y="810" width="560" height="34" rx="12" fill="#e9f2ef"/></g>`;
  return `<svg viewBox="0 0 3400 1500" style="position:absolute;left:0;top:0;width:3400px;height:1500px">
    <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fe0ff"/><stop offset="1" stop-color="#d9f6ff"/></linearGradient></defs>
    <rect width="3400" height="1500" fill="#0f4c4f"/>${t}${win(380)}${win(1650)}${win(2850)}</svg>`;
}
function shelvesSVG() {
  let s = '';
  const jar = (x, y, w, h, fill, lid) => `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="rgba(230,250,255,.25)" stroke="#0a130d" stroke-width="7"/>
    <rect x="${x + 8}" y="${y + h * 0.35}" width="${w - 16}" height="${h * 0.65 - 8}" rx="16" fill="${fill}"/>
    <rect x="${x - 6}" y="${y - 22}" width="${w + 12}" height="30" rx="10" fill="${lid}" stroke="#0a130d" stroke-width="7"/>
    <path d="M${x + 14} ${y + 20} L${x + 14} ${y + h - 24}" stroke="#fff" stroke-width="8" opacity=".45" stroke-linecap="round"/></g>`;
  const plant = (x, y) => `<g><path d="M${x} ${y} q-40 -80 -10 -150 M${x} ${y} q30 -90 70 -120 M${x} ${y} q-60 -40 -100 -60" fill="none" stroke="#2f9e4a" stroke-width="18" stroke-linecap="round"/>
    <ellipse cx="${x - 12}" cy="${y - 150}" rx="26" ry="14" fill="#5fd07a"/><ellipse cx="${x + 72}" cy="${y - 120}" rx="26" ry="14" fill="#5fd07a"/><ellipse cx="${x - 100}" cy="${y - 60}" rx="26" ry="14" fill="#5fd07a"/>
    <path d="M${x - 50} ${y} L${x + 50} ${y} L${x + 36} ${y + 80} L${x - 36} ${y + 80} Z" fill="#e8734a" stroke="#0a130d" stroke-width="7"/></g>`;
  for (let k = 0; k < 6; k++) { const x0 = k * 580 + 60, y0 = 300 + (k % 2) * 380;
    s += `<rect x="${x0}" y="${y0}" width="460" height="26" rx="8" fill="#c98a52" stroke="#0a130d" stroke-width="7"/>
      <rect x="${x0 + 30}" y="${y0 + 26}" width="20" height="40" fill="#8a5a30"/><rect x="${x0 + 410}" y="${y0 + 26}" width="20" height="40" fill="#8a5a30"/>`;
    const fills = ['#fbf6ea', '#e8cf9e', '#f2cf6a', '#a9adb5', '#dff4ff', '#f4ead2'];
    s += jar(x0 + 30, y0 - 170, 110, 170, fills[k % 6], '#e85d5d') + jar(x0 + 170, y0 - 130, 90, 130, fills[(k + 2) % 6], '#5fb0ff');
    s += k % 2 ? plant(x0 + 360, y0 - 80) : jar(x0 + 300, y0 - 190, 120, 190, fills[(k + 4) % 6], '#ffd84d'); }
  return `<svg viewBox="0 0 3400 1300" style="position:absolute;left:0;top:0;width:3400px;height:1300px">${s}</svg>`;
}
function counterSVG() {
  let g = ''; for (let k = 0; k < 16; k++) { const y = 70 + k * 34, x = hash(k * 2.7) * 1400; g += `<path d="M${x.toFixed(0)} ${y} q120 -10 240 0" fill="none" stroke="#8a5a30" stroke-width="5" opacity=".5"/>`; }
  return `<svg viewBox="0 0 1480 600" style="position:absolute;left:0;top:0;width:1480px;height:600px">
    <defs><linearGradient id="ctr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9995c"/><stop offset="1" stop-color="#8a5a30"/></linearGradient></defs>
    <rect x="0" y="30" width="1480" height="570" fill="url(#ctr)"/>${g}<rect x="0" y="16" width="1480" height="30" rx="10" fill="#f0c48e" stroke="#0a130d" stroke-width="8"/></svg>`;
}
// a puddle under a wet object (soft blue ellipse with a rim highlight)
function puddleSVG() {
  return `<svg viewBox="0 0 400 100" style="overflow:visible;left:0;top:0;width:100%;height:100%"><ellipse cx="200" cy="50" rx="196" ry="44" fill="rgba(95,200,255,.55)" stroke="#0a130d" stroke-width="6"/>
    <path d="M70 40 Q130 24 200 26" fill="none" stroke="#e9fbff" stroke-width="8" stroke-linecap="round" opacity=".8"/></svg>`;
}
function crownSVG() {
  return `<svg viewBox="0 0 120 90" style="overflow:visible;left:0;top:0;width:100%;height:100%"><path d="M8 80 L14 20 L40 50 L60 8 L80 50 L106 20 L112 80 Z" fill="#ffd84d" stroke="#0a130d" stroke-width="7" stroke-linejoin="round"/>
    <circle cx="60" cy="58" r="9" fill="#ff5f6d" stroke="#0a130d" stroke-width="4"/><path d="M24 70 L96 70" stroke="#fff" stroke-width="5" opacity=".6" stroke-linecap="round"/></svg>`;
}
function arrowSVG(col = '#ff3b5c') {
  return `<svg viewBox="0 0 200 120" style="overflow:visible;left:0;top:0;width:100%;height:100%"><path d="M10 20 Q120 0 170 90" fill="none" stroke="#0a130d" stroke-width="22" stroke-linecap="round" pathLength="100" class="arw" style="stroke-dasharray:100;stroke-dashoffset:100"/>
    <path d="M10 20 Q120 0 170 90" fill="none" stroke="${col}" stroke-width="11" stroke-linecap="round" pathLength="100" class="arw" style="stroke-dasharray:100;stroke-dashoffset:100"/></svg>`;
}
