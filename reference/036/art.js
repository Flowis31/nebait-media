// 036 «Пароль из 13 букв» — world: a night library of password books (warm lamps, shelves with parallax).
// Scene-specific drawings only; recurring props live in tools/props.js (pwFieldSVG, letterLockSVG, dictBookSVG, highlighterSVG added today).
const AK = '#0a130d';
// a run of bookshelves: w x h px, rows every 230 px, deterministic spines. dim 0..1 darkens (far layer)
function shelvesSVG(w, h, seed = 0, dim = 0) {
  const pal = ['#c8323f', '#e08a2e', '#3a7fd8', '#2fa37a', '#8a4fd8', '#d8b04a', '#b8543a', '#4ab0c8', '#e05a8a'];
  const mix = (c, k) => { const n = parseInt(c.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255, f = 1 - k; return `rgb(${(r * f + 30 * k) | 0},${(g * f + 12 * k) | 0},${(b * f + 18 * k) | 0})`; };
  let s = ''; const wood = mix('#7a4a28', dim), woodD = mix('#4a2a14', dim);
  for (let x0 = 0; x0 < w; x0 += 520) {
    s += `<rect x="${x0}" y="0" width="500" height="${h}" fill="${mix('#2a160e', dim)}"/>`;
    for (let y = 230; y < h; y += 230) {
      let x = x0 + 18, k = 0;
      while (x < x0 + 470) {
        const r = hash(seed * 31 + x * 0.37 + y * 0.11 + k), bw = 24 + (r * 34 | 0), bh = 130 + (hash(r * 91 + k) * 70 | 0), c = mix(pal[(r * 97 | 0) % pal.length], dim);
        if (x + bw > x0 + 482) break;
        const lean = hash(r * 7 + 3) > 0.93 ? 8 : 0;
        s += `<g transform="rotate(${lean} ${x + bw / 2} ${y - 10})"><rect x="${x}" y="${y - 10 - bh}" width="${bw}" height="${bh}" rx="4" fill="${c}" stroke="${mix(AK, dim * 0.6)}" stroke-width="4"/>
          <rect x="${x + 4}" y="${y - bh + 10}" width="${bw - 8}" height="8" fill="${mix('#ffd34d', dim)}" opacity=".7"/><rect x="${x + 4}" y="${y - 40}" width="${bw - 8}" height="6" fill="${mix('#ffd34d', dim)}" opacity=".5"/></g>`;
        x += bw + 3 + (hash(k + y) > 0.85 ? 26 : 0); k++;
      }
      s += `<rect x="${x0}" y="${y - 10}" width="500" height="26" fill="${wood}" stroke="${mix(AK, dim * 0.6)}" stroke-width="4"/><rect x="${x0}" y="${y + 16}" width="500" height="10" fill="${woodD}"/>`;
    }
    s += `<rect x="${x0}" y="0" width="22" height="${h}" fill="${wood}"/><rect x="${x0 + 478}" y="0" width="22" height="${h}" fill="${wood}"/>`;
  }
  return `<svg viewBox="0 0 ${w} ${h}" style="width:${w}px;height:${h}px">${s}</svg>`;
}
// hanging library lamps (warm cones of light), w px wide
function lampsSVG(w) {
  let s = '<defs><radialGradient id="lmg" cx="50%" cy="0%" r="100%"><stop offset="0" stop-color="rgba(255,200,110,.38)"/><stop offset="1" stop-color="rgba(255,200,110,0)"/></radialGradient></defs>';
  for (let x = 260; x < w; x += 760) s += `<path d="M${x} 0 L${x} 120" stroke="#1a0e08" stroke-width="6"/><path d="M${x - 300} 1150 L${x - 40} 160 L${x + 40} 160 L${x + 300} 1150 Z" fill="url(#lmg)"/>
    <path d="M${x - 60} 170 Q${x} 100 ${x + 60} 170 Z" fill="#2fa37a" stroke="#0a130d" stroke-width="7"/><ellipse cx="${x}" cy="172" rx="30" ry="12" fill="#fff3c0"/>`;
  return `<svg viewBox="0 0 ${w} 1200" style="width:${w}px;height:1200px;overflow:visible">${s}</svg>`;
}
// long grey beard, viewBox 0 0 300 500 (grows with sy from the top: transform-origin 150px 0)
function beardSVG() {
  return `<svg viewBox="0 0 300 500" style="overflow:visible;left:0;top:0;width:100%;height:100%"><defs><linearGradient id="brd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f4f4"/><stop offset="1" stop-color="#b9bec6"/></linearGradient></defs>
    <path d="M20 10 Q150 40 280 10 Q300 160 230 300 Q200 380 160 490 Q150 470 140 490 Q100 380 70 300 Q0 160 20 10 Z" fill="url(#brd)" stroke="${AK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M90 80 Q110 220 140 330 M150 70 Q150 250 150 420 M210 80 Q190 220 165 330" fill="none" stroke="#9aa2ad" stroke-width="7" stroke-linecap="round"/></svg>`;
}
// corner cobweb, viewBox 0 0 200 200
function webSVG() {
  return `<svg viewBox="0 0 200 200" style="overflow:visible;left:0;top:0;width:100%;height:100%"><g fill="none" stroke="#e8eef5" stroke-width="4" opacity=".85">
    <path d="M0 0 L200 120 M0 0 L160 180 M0 0 L80 200 M0 0 L200 40"/><path d="M50 30 Q60 50 40 60 M100 60 Q110 90 90 110 Q60 120 40 120 M150 90 Q160 130 130 160 Q90 180 60 180"/></g></svg>`;
}
// bookmark card sticking out of the dictionary, with a label
function tabCardSVG(id, label, col) {
  return `<svg viewBox="0 0 340 120" style="overflow:visible;left:0;top:0;width:100%;height:100%"><rect x="6" y="6" width="328" height="108" rx="20" fill="${col}" stroke="${AK}" stroke-width="9"/>
    <path d="M24 26 L120 26" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".6"/>
    <text x="170" y="80" text-anchor="middle" style="font:900 ${label.length > 8 ? 36 : 44}px Unb" fill="#fff" stroke="${AK}" stroke-width="8" paint-order="stroke">${label}</text></svg>`;
}
// tick mark (green), viewBox 0 0 200 200
function checkSVG() {
  return `<svg viewBox="0 0 200 200" style="overflow:visible;left:0;top:0;width:100%;height:100%"><circle cx="100" cy="100" r="90" fill="#2fbf6a" stroke="${AK}" stroke-width="10"/>
    <path pathLength="100" class="ckp" d="M52 104 L88 140 L150 66" fill="none" stroke="#fff" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" style="stroke-dasharray:100;stroke-dashoffset:100"/></svg>`;
}
