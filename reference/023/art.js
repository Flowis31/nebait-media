// 023 art: the world of «Часы отматывают разговор» — an autumn park in the late afternoon: sky with clouds and a low sun (far),
// city roofs and hills (far-mid), a row of autumn trees (mid), lamp posts, a bench and a hedge (near). Recurring props
// (smartwatch, chime bell, leaf, person, chat bubble, clock) live in tools/props.js.
const AK = '#0a130d';
const sv = (vb, inner) => `<svg viewBox="${vb}" style="overflow:visible;left:0;top:0;width:100%;height:100%">${inner}</svg>`;
const h3 = (k, s) => hash(k * 1.37 + s * 7.11);

// far: soft clouds (2400 x 700), tiled twice for an endless drift
function cloudsSVG() {
  let c = '';
  for (let i = 0; i < 7; i++) {
    const x = 120 + i * 340 + 80 * h3(i, 1), y = 120 + 260 * h3(i, 2), s = 0.7 + 0.6 * h3(i, 3);
    c += `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${s.toFixed(2)})" opacity=".9">
      <ellipse cx="0" cy="0" rx="120" ry="44" fill="#fff4e6"/><ellipse cx="-60" cy="-18" rx="64" ry="48" fill="#fff4e6"/><ellipse cx="50" cy="-30" rx="78" ry="60" fill="#fffaf2"/>
      <ellipse cx="10" cy="20" rx="120" ry="22" fill="#f6c9a8" opacity=".6"/></g>`;
  }
  return sv('0 0 2400 700', c);
}
// far-mid: rooftops and two hills, 3400 x 900
function cityHillsSVG() {
  let s = `<defs><linearGradient id="hl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d98a6a"/><stop offset="1" stop-color="#b56a5a"/></linearGradient></defs>
    <path d="M0 520 Q500 360 1100 500 Q1700 380 2300 510 Q2900 400 3400 520 L3400 900 L0 900 Z" fill="url(#hl)" opacity=".85"/>`;
  for (let i = 0; i < 34; i++) {
    const x = i * 100 + 20 * h3(i, 4), w = 70 + 40 * h3(i, 5), hgt = 120 + 220 * h3(i, 6), y = 640 - hgt;
    s += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${(hgt + 260).toFixed(0)}" fill="${i % 2 ? '#9a5a5e' : '#8a4f58'}" opacity=".7"/>`;
    for (let r = 0; r < 3; r++) if (h3(i, r + 9) > 0.45) s += `<rect x="${(x + 14).toFixed(0)}" y="${(y + 24 + r * 46).toFixed(0)}" width="16" height="22" fill="#ffd9a0" opacity=".6"/><rect x="${(x + 42).toFixed(0)}" y="${(y + 24 + r * 46).toFixed(0)}" width="16" height="22" fill="#ffd9a0" opacity=".5"/>`;
  }
  return sv('0 0 3400 900', s);
}
// mid: autumn trees, 3400 x 1100 (trunks stand on y 1040)
function treesSVG() {
  const cols = [['#ff9a2e', '#d9601a'], ['#ffc83d', '#e09a1a'], ['#ff6a3d', '#c23a1f'], ['#c9d84a', '#8aa22a']];
  let s = '<defs>' + cols.map((c, i) => `<radialGradient id="tr${i}" cx="38%" cy="30%" r="75%"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></radialGradient>`).join('') + '</defs>';
  for (let i = 0; i < 12; i++) {
    const x = 130 + i * 290 + 60 * h3(i, 7), r = 150 + 70 * h3(i, 8), cy = 1040 - 300 - r * 0.8, ci = i % 4;
    s += `<path d="M${x - 20} 1040 L${x - 12} ${cy + 40} L${x + 12} ${cy + 40} L${x + 20} 1040 Z" fill="#5a3426" stroke="${AK}" stroke-width="9"/>
      <path d="M${x} ${cy + 120} L${x - 60} ${cy + 40} M${x} ${cy + 160} L${x + 70} ${cy + 70}" stroke="#5a3426" stroke-width="16" stroke-linecap="round"/>
      <circle cx="${x}" cy="${cy}" r="${r.toFixed(0)}" fill="url(#tr${ci})" stroke="${AK}" stroke-width="10"/>
      <circle cx="${x - r * 0.55}" cy="${cy + r * 0.35}" r="${(r * 0.55).toFixed(0)}" fill="url(#tr${ci})" stroke="${AK}" stroke-width="9"/>
      <circle cx="${x + r * 0.6}" cy="${cy + r * 0.3}" r="${(r * 0.5).toFixed(0)}" fill="url(#tr${ci})" stroke="${AK}" stroke-width="9"/>
      <path d="M${x - r * 0.6} ${cy - r * 0.35} Q${x - r * 0.3} ${cy - r * 0.8} ${x + r * 0.1} ${cy - r * 0.82}" fill="none" stroke="#fff" stroke-width="10" opacity=".35" stroke-linecap="round"/>`;
    for (let k = 0; k < 6; k++) s += `<circle cx="${(x - r * 0.6 + 1.2 * r * h3(i * 9 + k, 2)).toFixed(0)}" cy="${(cy - r * 0.4 + 0.9 * r * h3(i * 7 + k, 3)).toFixed(0)}" r="${(10 + 12 * h3(k, i)).toFixed(0)}" fill="#fff" opacity=".12"/>`;
  }
  return sv('0 0 3400 1100', s);
}
// near: lamp posts, benches, hedge, 3400 x 1300 (ground line y 1150)
function nearSVG() {
  let s = '';
  for (let k = 0; k < 4; k++) {
    const x = 160 + k * 900;
    s += `<rect x="${x}" y="200" width="24" height="960" fill="#2a2230"/><rect x="${x - 26}" y="1120" width="76" height="40" rx="10" fill="#2a2230"/>
      <path d="M${x - 30} 200 L${x + 54} 200 L${x + 40} 140 L${x - 16} 140 Z" fill="#2a2230"/><rect x="${x - 10}" y="150" width="44" height="46" rx="6" fill="#ffe2a0" opacity=".8"/>
      <g transform="translate(${x + 300} 0)"><rect x="0" y="1010" width="300" height="26" rx="10" fill="#7a4a2e" stroke="${AK}" stroke-width="8"/><rect x="0" y="960" width="300" height="24" rx="10" fill="#8a5636" stroke="${AK}" stroke-width="8"/>
        <path d="M30 1036 L30 1110 M270 1036 L270 1110" stroke="#2a2230" stroke-width="16"/></g>`;
  }
  return sv('0 0 3400 1300', s);
}
// question mark helper
const qmark = () => '?';
