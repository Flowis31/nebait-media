// 031 world: a night radio highway — stars (far), a city skyline with lit windows (far, dof), radio masts with blinking
// lamps and signal arcs (mid), asphalt with running lane dashes (near). Plus the things only this video needs:
// the route card of the hopping pair and the "sound tape".
const AK = '#0a130d';
const sv = (vb, inner, extra = '') => `<svg viewBox="${vb}" style="width:100%;height:100%;overflow:visible" ${extra}>${inner}</svg>`;
function starsSVG() {
  let s = '';
  for (let i = 0; i < 150; i++) { const x = 2400 * hash(i * 1.3), y = 1100 * hash(i * 2.9 + 4), r = 1.5 + 3.2 * hash(i * 5.1);
    s += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="${i % 7 === 0 ? '#ffd98a' : '#dff3ff'}" opacity="${(0.35 + 0.6 * hash(i * 7.7)).toFixed(2)}"/>`; }
  s += `<circle cx="1820" cy="200" r="70" fill="#fff3cf" opacity=".9"/><circle cx="1850" cy="184" r="62" fill="#0b1d3f"/>`;
  return sv('0 0 2400 1100', s);
}
function citySVG() {   // far skyline, windows lit in amber / cyan
  let s = '';
  for (let i = 0; i < 46; i++) { const x = i * 75 + 20 * hash(i), w = 60 + 50 * hash(i * 3.1), h = 160 + 420 * hash(i * 1.7 + 2);
    s += `<rect x="${x.toFixed(0)}" y="${(700 - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${i % 2 ? '#10244a' : '#0c1c3c'}"/>`;
    for (let r = 0; r < h / 34 - 1; r++) for (let c = 0; c < w / 22 - 1; c++) if (hash(i * 31 + r * 7 + c * 3) > 0.52)
      s += `<rect x="${(x + 8 + c * 22).toFixed(0)}" y="${(700 - h + 14 + r * 34).toFixed(0)}" width="10" height="16" fill="${hash(i + r + c) > 0.5 ? '#ffc861' : '#6fe6ff'}" opacity="${(0.35 + 0.5 * hash(i * 3 + r + c * 5)).toFixed(2)}"/>`; }
  return sv('0 0 3400 700', s);
}
function towersSVG() { // radio masts (mid): lattice, red lamp (.tlamp), signal arcs (.tarc)
  let s = '';
  [260, 1180, 2080, 3000].forEach((x, i) => {
    s += `<path d="M${x - 46} 1000 L${x} 240 L${x + 46} 1000" fill="none" stroke="#0a1226" stroke-width="16" stroke-linejoin="round"/>`;
    for (let k = 0; k < 8; k++) { const y = 330 + k * 84, w = 6 + (y - 240) * 0.06; s += `<path d="M${x - w} ${y} L${x + w} ${y + 84} M${x + w} ${y} L${x - w} ${y + 84}" stroke="#0a1226" stroke-width="7"/>`; }
    s += `<circle class="tlamp" cx="${x}" cy="232" r="16" fill="#ff3b5c"/><circle cx="${x}" cy="232" r="46" fill="#ff3b5c" opacity=".16"/>`;
    for (let k = 1; k <= 3; k++) s += `<path class="tarc" d="M${x - 40 * k} ${232 - 28 * k} A${50 * k} ${50 * k} 0 0 1 ${x + 40 * k} ${232 - 28 * k}" fill="none" stroke="${i % 2 ? '#43e8ff' : '#ffb52e'}" stroke-width="7" stroke-linecap="round" opacity="${(0.5 - k * 0.12).toFixed(2)}"/>`;
  });
  return sv('0 0 3400 1100', s);
}
// route card: a paper strip with the order of lanes as coloured dots. n dots, class .rd0.. (pop them), .rx0.. red crosses (o)
const ROUTE_COLS = ['#ffb52e', '#43e8ff', '#ff5fa2', '#7dff8a', '#b08bff', '#ffe14d', '#ff7a3d', '#5fa8ff'];
function routeCardSVG(id, n = 5, secret = false, w = 400) {
  let s = `<defs><linearGradient id="rc${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${secret ? '#3a4460' : '#fffaf0'}"/><stop offset="1" stop-color="${secret ? '#232b40' : '#e9dfc6'}"/></linearGradient></defs>
    <rect x="8" y="8" width="${w - 16}" height="144" rx="26" fill="url(#rc${id})" stroke="${AK}" stroke-width="10"/>
    <path d="M30 34 L${w - 60} 34" stroke="${secret ? '#566080' : '#fff'}" stroke-width="7" stroke-linecap="round" opacity=".7"/>`;
  const step = (w - 80) / (n - 1);
  for (let k = 0; k < n; k++) { const x = 40 + k * step;
    if (k) s += `<path class="ra${k}" d="M${x - step + 30} 86 L${x - 30} 86" stroke="${secret ? '#566080' : AK}" stroke-width="7" stroke-linecap="round" stroke-dasharray="4 13"/>`;
    s += secret ? `<g class="rd${k}" style="transform-box:fill-box;transform-origin:center"><circle cx="${x}" cy="86" r="26" fill="#566080" stroke="${AK}" stroke-width="7"/><text x="${x}" y="100" text-anchor="middle" font-family="Unb" font-weight="900" font-size="36" fill="#c9d2ea">?</text></g>`
      : `<g class="rd${k}" style="transform-box:fill-box;transform-origin:center"><circle cx="${x}" cy="86" r="26" fill="${ROUTE_COLS[k % 8]}" stroke="${AK}" stroke-width="7"/><circle cx="${x - 8}" cy="77" r="6" fill="#fff" opacity=".7"/></g>
         <g class="rx${k}" opacity="0"><path d="M${x - 24} 62 L${x + 24} 110 M${x + 24} 62 L${x - 24} 110" stroke="${AK}" stroke-width="20" stroke-linecap="round"/><path d="M${x - 24} 62 L${x + 24} 110 M${x + 24} 62 L${x - 24} 110" stroke="#ff3b5c" stroke-width="10" stroke-linecap="round"/></g>`; }
  return sv(`0 0 ${w} 160`, s);
}
// wall clock for the joke (hands spin = a whole day passes), viewBox 0 0 240 240. .wch (hour hand), .wcm (minute hand): r, origin 120 120
function wallClockSVG(id) {
  let t = ''; for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; t += `<path d="M${(120 + 84 * Math.sin(a)).toFixed(0)} ${(120 - 84 * Math.cos(a)).toFixed(0)} L${(120 + 96 * Math.sin(a)).toFixed(0)} ${(120 - 96 * Math.cos(a)).toFixed(0)}" stroke="${AK}" stroke-width="${k % 3 ? 5 : 9}" stroke-linecap="round"/>`; }
  return sv('0 0 240 240', `<defs><radialGradient id="wc${id}" cx="40%" cy="32%" r="80%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cfd9ea"/></radialGradient></defs>
    <circle cx="120" cy="120" r="112" fill="#ffb52e" stroke="${AK}" stroke-width="10"/><circle cx="120" cy="120" r="94" fill="url(#wc${id})" stroke="${AK}" stroke-width="7"/>${t}
    <g class="wch" style="transform-origin:120px 120px"><path d="M120 120 L120 70" stroke="${AK}" stroke-width="12" stroke-linecap="round"/></g>
    <g class="wcm" style="transform-origin:120px 120px"><path d="M120 120 L120 42" stroke="#ff3b5c" stroke-width="8" stroke-linecap="round"/></g>
    <circle cx="120" cy="120" r="10" fill="${AK}"/><path d="M60 70 Q80 44 112 38" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".7"/>`);
}
