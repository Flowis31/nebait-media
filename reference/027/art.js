// 027 world: a city street on Halloween night — sky with a moon and stars (far), skyline with lit windows (far, dof),
// shop fronts with orange windows and garlands (mid), street lamps and pumpkins (near), asphalt road with moving dashes.
const AK = '#0a130d';
function starsSVG() {
  let s = '';
  for (let i = 0; i < 70; i++) { const x = hash(i * 1.37) * 2400, y = hash(i * 2.91 + 4) * 640, r = 2 + 3 * hash(i * 5.3); s += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#fff" opacity="${(0.35 + 0.55 * hash(i * 7.1)).toFixed(2)}"/>`; }
  return `<svg viewBox="0 0 2400 700" style="width:100%;height:100%;overflow:visible">${s}</svg>`;
}
function moonSVG() {
  return `<svg viewBox="0 0 300 300" style="width:100%;height:100%;overflow:visible"><circle cx="150" cy="150" r="140" fill="#fff6d0" opacity=".12"/><circle cx="150" cy="150" r="96" fill="#fff3c4"/>
    <circle cx="118" cy="128" r="18" fill="#efdfa6"/><circle cx="182" cy="170" r="12" fill="#efdfa6"/><circle cx="160" cy="112" r="8" fill="#efdfa6"/>
    <path d="M190 90 Q230 70 250 96" fill="none" stroke="${AK}" stroke-width="5" opacity=".0"/></svg>`;
}
function skylineSVG() {
  let b = '', x = 0, i = 0;
  while (x < 3400) {
    const w = 140 + 160 * hash(i * 3.3), h = 260 + 420 * hash(i * 1.9 + 2), top = 900 - h;
    b += `<rect x="${x.toFixed(0)}" y="${top.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${i % 2 ? '#132b47' : '#18345a'}"/>`;
    for (let r = top + 30; r < 860; r += 54) for (let c = x + 22; c < x + w - 30; c += 40) {
      const k = r * 0.13 + c * 0.071; if (hash(k) > 0.55) b += `<rect x="${c.toFixed(0)}" y="${r.toFixed(0)}" width="18" height="26" fill="${hash(k + 3) > 0.7 ? '#ffb347' : '#ffe39a'}" opacity="${(0.5 + 0.5 * hash(k + 9)).toFixed(2)}"/>`;
    }
    if (hash(i * 4.4) > 0.6) b += `<rect x="${(x + w / 2 - 4).toFixed(0)}" y="${(top - 70).toFixed(0)}" width="8" height="70" fill="#132b47"/><circle cx="${(x + w / 2).toFixed(0)}" cy="${(top - 74).toFixed(0)}" r="7" fill="#ff5f6d"/>`;
    x += w + 10; i++;
  }
  return `<svg viewBox="0 0 3400 900" style="width:100%;height:100%;overflow:visible">${b}</svg>`;
}
function shopsSVG() {
  // shop fronts y 380..1100; awnings, orange windows, bat garlands, a few neon signs without real brands
  const signs = ['КАФЕ', 'ПИЦЦА', 'ЦВЕТЫ', 'АПТЕКА', 'ЕДА 24', 'КНИГИ', 'ТЫКВЫ', 'КОФЕ'];
  const cols = ['#5a3d6e', '#2f5b6a', '#6a3b3b', '#3d4f7a', '#5b4a2e', '#2e5a48'];
  const aw = ['#ff8a3d', '#5fe0ff', '#ff5f9e', '#ffd34d', '#9b7dff', '#7dff8a'];
  let s = '';
  for (let k = 0; k < 8; k++) {
    const x = k * 425, c = cols[k % 6], a = aw[k % 6];
    s += `<rect x="${x}" y="380" width="415" height="720" fill="${c}" stroke="${AK}" stroke-width="8"/>`;
    for (let r = 0; r < 2; r++) for (let q = 0; q < 3; q++) s += `<rect x="${x + 40 + q * 120}" y="${420 + r * 120}" width="80" height="84" rx="8" fill="${hash(k * 7 + r * 3 + q) > 0.35 ? '#ffcf73' : '#20263a'}" stroke="${AK}" stroke-width="6"/>`;
    s += `<rect x="${x + 30}" y="690" width="355" height="64" rx="14" fill="#16121f" stroke="${AK}" stroke-width="6"/><text x="${x + 207}" y="736" text-anchor="middle" style="font:900 40px Unb" fill="${a}">${signs[k]}</text>`;
    s += `<path d="M${x + 10} 770 L${x + 405} 770 L${x + 395} 840 L${x + 20} 840 Z" fill="${a}" stroke="${AK}" stroke-width="7"/>`;
    for (let q = 0; q < 6; q++) s += `<path d="M${x + 20 + q * 64} 840 Q${x + 52 + q * 64} 870 ${x + 84 + q * 64} 840" fill="${q % 2 ? '#fff' : a}" stroke="${AK}" stroke-width="5"/>`;
    s += `<rect x="${x + 50}" y="880" width="180" height="200" rx="10" fill="#ffd58a" stroke="${AK}" stroke-width="7"/><rect x="${x + 270}" y="900" width="100" height="200" rx="8" fill="#3a2a1e" stroke="${AK}" stroke-width="7"/>`;
    s += `<path d="M${x} 400 Q${x + 207} 470 ${x + 415} 400" fill="none" stroke="#2a2030" stroke-width="4"/>`;
    for (let q = 0; q < 5; q++) { const bx = x + 50 + q * 80, by = 400 + 70 * Math.sin(Math.PI * (q * 80 + 50) / 415) * 0.5 + 18;
      s += `<path d="M${bx - 22} ${by} Q${bx - 11} ${by - 12} ${bx} ${by} Q${bx + 11} ${by - 12} ${bx + 22} ${by} Q${bx + 11} ${by + 8} ${bx} ${by + 14} Q${bx - 11} ${by + 8} ${bx - 22} ${by} Z" fill="${q % 2 ? '#ff8a3d' : '#2a1d36'}"/>`; }
  }
  return `<svg viewBox="0 0 3400 1100" style="width:100%;height:100%;overflow:visible">${s}</svg>`;
}
function nearSVG() {
  let s = '';
  for (let k = 0; k < 5; k++) {
    const x = 120 + k * 720;
    s += `<rect x="${x - 10}" y="300" width="20" height="900" fill="#1a1f2b" stroke="${AK}" stroke-width="6"/><path d="M${x} 310 Q${x + 60} 250 ${x + 120} 300" fill="none" stroke="#1a1f2b" stroke-width="16"/>
      <path d="M${x + 90} 296 L${x + 150} 296 L${x + 140} 336 L${x + 100} 336 Z" fill="#2b3240" stroke="${AK}" stroke-width="6"/><ellipse cx="${x + 120}" cy="344" rx="40" ry="14" fill="#fff1b8"/>
      <path d="M${x + 120} 350 L${x + 10} 1180 L${x + 230} 1180 Z" fill="#fff1b8" opacity=".07"/>`;
  }
  return `<svg viewBox="0 0 3400 1300" style="width:100%;height:100%;overflow:visible">${s}</svg>`;
}
