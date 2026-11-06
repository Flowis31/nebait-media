// 024 — one-off art: the night game store world (far shelves, arcade hall), the store page, icons, coins.
const PAL = ['#ff5fd2', '#6a3cff', '#26c6ff', '#ffd34d', '#ff7a3d', '#7dff8a', '#ff4d5e', '#b36bff'];
// far layer: tall shelves full of game boxes, 2400 x 1000 (tiled twice for the parallax wrap)
function shelvesFarSVG(seed = 0) {
  let s = '';
  for (let col = 0; col < 8; col++) {
    const x0 = col * 300 + 10;
    s += `<rect x="${x0}" y="40" width="280" height="960" rx="10" fill="#2a1d4a" stroke="#120a24" stroke-width="8"/>`;
    for (let row = 0; row < 6; row++) {
      const y = 70 + row * 150; s += `<rect x="${x0 + 6}" y="${y + 118}" width="268" height="14" fill="#3d2b66"/>`;
      let x = x0 + 16;
      for (let k = 0; x < x0 + 256; k++) {
        const w = 26 + Math.floor(hash(seed + col * 97 + row * 13 + k) * 18), h = 86 + Math.floor(hash(seed + col * 31 + row * 7 + k * 3) * 30);
        if (x + w > x0 + 266) break;
        s += `<rect x="${x}" y="${y + 118 - h}" width="${w}" height="${h}" rx="4" fill="${PAL[Math.floor(hash(seed + col * 11 + row * 5 + k * 17) * 8)]}" opacity=".8"/>`;
        x += w + 5;
      }
    }
  }
  return `<svg viewBox="0 0 2400 1000" style="left:0;top:0;width:2400px;height:1000px">${s}</svg>`;
}
// mid layer: arcade cabinets and neon signs (generic, no brands), 3400 x 1300
function hallMidSVG() {
  let s = '';
  const cab = (x, c) => `<g transform="translate(${x} 560)"><path d="M0 700 L0 120 Q0 80 40 70 L220 40 Q250 36 250 70 L250 700 Z" fill="#241640" stroke="#0d0618" stroke-width="10"/>
    <rect x="30" y="120" width="190" height="150" rx="14" fill="${c}" opacity=".85" stroke="#0d0618" stroke-width="8"/><rect x="44" y="134" width="162" height="122" rx="10" fill="#120a24" opacity=".55"/>
    <rect x="20" y="320" width="210" height="60" rx="10" fill="#3a2860" stroke="#0d0618" stroke-width="7"/><circle cx="70" cy="350" r="14" fill="#ff4d5e"/><circle cx="120" cy="350" r="14" fill="#ffd34d"/><circle cx="170" cy="350" r="14" fill="#26c6ff"/>
    <rect x="30" y="56" width="190" height="40" rx="10" fill="${c}" opacity=".55"/></g>`;
  [80, 420, 1240, 1580, 2400, 2740, 3100].forEach((x, i) => s += cab(x, PAL[(i * 3) % 8]));
  const neon = (x, y, txt, c) => `<g transform="translate(${x} ${y})"><rect x="-10" y="-10" width="${txt.length * 74 + 60}" height="140" rx="30" fill="none" stroke="${c}" stroke-width="10" opacity=".9"/>
    <text x="${(txt.length * 74 + 40) / 2}" y="92" text-anchor="middle" style="font:900 86px Unb" fill="none" stroke="${c}" stroke-width="6">${txt}</text></g>`;
  s += neon(760, 380, 'ИГРЫ', '#ff5fd2') + neon(1960, 300, 'NEW', '#26c6ff') + neon(2960, 400, 'GAME', '#ffd34d');
  return `<svg viewBox="0 0 3400 1300" style="left:0;top:0;width:3400px;height:1300px">${s}</svg>`;
}
// store page (generic, not a copy of a real site), viewBox 0 0 800 1000. Rig: .pchk (check mark draw-on: dash), .prow (disclosure row, o / s),
// .pring (highlight ring around the row, dash), .pscroll (everything below the header, scroll with y)
function pageSVG(id) {
  let lines = ''; for (let i = 0; i < 6; i++) lines += `<rect x="330" y="${150 + i * 40}" width="${380 - (i % 3) * 70}" height="18" rx="9" fill="#5a4a86"/>`;
  let desc = ''; for (let i = 0; i < 5; i++) desc += `<rect x="60" y="${520 + i * 38}" width="${680 - (i % 2) * 120}" height="16" rx="8" fill="#4a3c72"/>`;
  return psv('0 0 800 1000', `<defs>${lg('pg' + id, '#2b1f4e', '#1a1233')}<clipPath id="pgc${id}"><rect x="10" y="100" width="780" height="890" rx="10"/></clipPath></defs>
    <rect x="10" y="10" width="780" height="980" rx="34" fill="url(#pg${id})" stroke="${PIK}" stroke-width="12"/>
    <rect x="10" y="10" width="780" height="90" rx="34" fill="#3d2b66"/><rect x="10" y="60" width="780" height="40" fill="#3d2b66"/>
    <circle cx="60" cy="56" r="14" fill="#ff4d5e"/><circle cx="100" cy="56" r="14" fill="#ffd34d"/><circle cx="140" cy="56" r="14" fill="#7dff8a"/>
    <rect x="200" y="36" width="480" height="40" rx="20" fill="#1a1233"/><text x="440" y="66" text-anchor="middle" style="font:800 24px JB" fill="#b9a8ff">СТРАНИЦА ИГРЫ</text>
    <g clip-path="url(#pgc${id})"><g class="pscroll">
      <rect x="50" y="130" width="250" height="330" rx="14" fill="#120a24" stroke="#5a4a86" stroke-width="5" stroke-dasharray="14 10"/>
      ${lines}<rect x="330" y="400" width="200" height="56" rx="16" fill="#7dff8a" stroke="${PIK}" stroke-width="6"/><text x="430" y="438" text-anchor="middle" style="font:900 26px Unb" fill="${PIK}">КУПИТЬ</text>
      <text x="60" y="500" style="font:800 26px JB" fill="#b9a8ff">ОПИСАНИЕ</text>${desc}
      <g class="prow" style="transform-origin:400px 820px"><rect x="40" y="760" width="720" height="120" rx="22" fill="#fff36b" stroke="${PIK}" stroke-width="8"/>
        <rect x="70" y="786" width="68" height="68" rx="12" fill="#fff" stroke="${PIK}" stroke-width="7"/>
        <path class="pchk" pathLength="100" d="M82 818 L100 840 L128 796" fill="none" stroke="#1faa3a" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" style="stroke-dasharray:100;stroke-dashoffset:100"/>
        <text x="164" y="838" style="font:900 38px Unb" fill="${PIK}">НЕЙРОНКА: ДА</text></g>
      <path class="pring" pathLength="100" d="M30 750 L770 750 Q790 750 790 770 L790 870 Q790 890 770 890 L30 890 Q10 890 10 870 L10 770 Q10 750 30 750 Z" fill="none" stroke="#ff4d5e" stroke-width="10" style="stroke-dasharray:100;stroke-dashoffset:100"/>
      ${[0, 1, 2].map(i => `<rect x="60" y="${920 + i * 36}" width="${560 - i * 90}" height="16" rx="8" fill="#4a3c72"/>`).join('')}
    </g></g>`);
}
// tile icons, viewBox 0 0 260 260 each: picture (картинки), speaker with notes (звук), text page (текст); eye and ear
function iconPicSVG(id) {
  return psv('0 0 260 260', `<defs>${lg('ip' + id, '#8fe3ff', '#3a8cff')}</defs><rect x="20" y="30" width="220" height="200" rx="22" fill="#fff" stroke="${PIK}" stroke-width="10"/>
    <rect x="40" y="50" width="180" height="160" rx="12" fill="url(#ip${id})"/><circle cx="170" cy="96" r="22" fill="#ffd34d" stroke="${PIK}" stroke-width="6"/>
    <path d="M40 210 L100 120 L150 180 L180 150 L220 210 Z" fill="#7dff8a" stroke="${PIK}" stroke-width="7" stroke-linejoin="round"/>`);
}
function iconSoundSVG(id) {
  return psv('0 0 260 260', `<defs>${lg('is' + id, '#ffb3e6', '#ff5fd2')}</defs><path d="M30 100 L80 100 L140 50 L140 210 L80 160 L30 160 Z" fill="url(#is${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
    <g class="iswav" style="transform-origin:140px 130px"><path d="M170 96 Q190 130 170 164" fill="none" stroke="${PIK}" stroke-width="12" stroke-linecap="round"/><path d="M196 74 Q230 130 196 186" fill="none" stroke="${PIK}" stroke-width="12" stroke-linecap="round"/></g>
    <g class="isnote"><path d="M200 40 L200 20 L240 12 L240 34" fill="none" stroke="${PIK}" stroke-width="8"/><circle cx="194" cy="42" r="10" fill="${PIK}"/><circle cx="234" cy="36" r="10" fill="${PIK}"/></g>`);
}
function iconTextSVG(id) {
  return psv('0 0 260 260', `<defs>${lg('it' + id, '#ffffff', '#e6dcff')}</defs><path d="M50 20 L170 20 L220 70 L220 240 L50 240 Z" fill="url(#it${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M170 20 L170 70 L220 70" fill="#cbbcff" stroke="${PIK}" stroke-width="8" stroke-linejoin="round"/><text x="128" y="150" text-anchor="middle" style="font:900 72px PF" fill="#6a3cff">Аа</text>
    <rect x="76" y="176" width="120" height="12" rx="6" fill="#8a7ab8"/><rect x="76" y="202" width="90" height="12" rx="6" fill="#8a7ab8"/>`);
}
function eyeSVG(id) {
  return psv('0 0 260 160', `<path d="M10 80 Q130 -20 250 80 Q130 180 10 80 Z" fill="#fff" stroke="${PIK}" stroke-width="10"/><g class="eyp"><circle cx="130" cy="80" r="42" fill="#3a8cff" stroke="${PIK}" stroke-width="7"/><circle cx="130" cy="80" r="20" fill="${PIK}"/><circle cx="142" cy="68" r="9" fill="#fff"/></g>`);
}
function earSVG(id) {
  return psv('0 0 180 260', `<path d="M40 110 Q30 20 100 14 Q170 12 168 90 Q166 140 120 170 Q96 186 100 220 Q100 252 64 248 Q28 240 36 200" fill="#ffcf9f" stroke="${PIK}" stroke-width="10" stroke-linecap="round"/>
    <path d="M70 100 Q72 54 106 54 Q140 56 132 96 Q126 120 100 130" fill="none" stroke="#c98a66" stroke-width="9" stroke-linecap="round"/>`);
}
// paint brush, viewBox 0 0 120 360 (bristles at the bottom, origin top)
function brushSVG(id, col = '#ff5fd2') {
  return psv('0 0 120 360', `<rect x="44" y="10" width="32" height="220" rx="14" fill="#c98a4a" stroke="${PIK}" stroke-width="8"/><rect x="38" y="220" width="44" height="40" rx="6" fill="#c9d2dc" stroke="${PIK}" stroke-width="7"/>
    <path d="M38 258 Q30 320 60 350 Q90 320 82 258 Z" fill="${col}" stroke="${PIK}" stroke-width="7" stroke-linejoin="round"/>`);
}
