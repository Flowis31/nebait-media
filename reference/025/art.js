// 025 art: the world — the mascot's home lab at night (teal). Far: wall shelves with jars, gadgets and round windows;
// mid: pegboard with tools, desk lamps and a workbench; near: wooden floor (CSS). Plus the joke desk (mascot's mess).
const AK = '#0a130d';
function labFarSVG(s) {   // 2400 x 1000, tiles horizontally
  let o = '';
  for (let k = 0; k < 4; k++) {
    const x = k * 600;
    o += `<circle cx="${x + 160}" cy="220" r="120" fill="#0b2f3a" stroke="#06181f" stroke-width="14"/><circle cx="${x + 160}" cy="220" r="104" fill="url(#lfw${s})"/>
      <path d="M${x + 56} 220 L${x + 264} 220 M${x + 160} 116 L${x + 160} 324" stroke="#06181f" stroke-width="10"/>
      <circle cx="${x + 200}" cy="180" r="${k % 2 ? 22 : 30}" fill="#e8fbff" opacity=".85"/>`;
    for (let j = 0; j < 7; j++) o += `<rect x="${x + 70 + j * 26}" y="${290 - (j * 37 % 60)}" width="18" height="${40 + (j * 37 % 60)}" fill="#0f4250" opacity=".9"/>`;
    for (const y of [470, 700]) {
      o += `<rect x="${x + 340}" y="${y}" width="230" height="16" rx="5" fill="#0a2a33"/>`;
      for (let j = 0; j < 4; j++) { const jx = x + 352 + j * 54, h = 50 + ((j * 29 + y) % 40), c = ['#3de0ff', '#ffb84d', '#ff6fb5', '#7dff8a'][(j + k + (y > 500 ? 1 : 0)) % 4];
        o += `<rect x="${jx}" y="${y - h}" width="40" height="${h}" rx="8" fill="#0d3542" stroke="#082028" stroke-width="5"/><rect x="${jx + 6}" y="${y - h * 0.6}" width="28" height="${h * 0.6 - 6}" rx="5" fill="${c}" opacity=".35"/>`; }
    }
    o += `<rect x="${x + 40}" y="420" width="250" height="300" rx="16" fill="#0a2a33" stroke="#082028" stroke-width="6"/>
      <rect x="${x + 64}" y="446" width="200" height="120" rx="10" fill="#05161c"/><path d="M${x + 76} 520 Q${x + 110} 470 ${x + 140} 520 T${x + 200} 520 T${x + 252} 510" fill="none" stroke="#3de0ff" stroke-width="5" opacity=".6"/>
      <circle cx="${x + 100}" cy="620" r="26" fill="#0d3542" stroke="#082028" stroke-width="5"/><circle cx="${x + 170}" cy="620" r="26" fill="#0d3542" stroke="#082028" stroke-width="5"/><circle cx="${x + 240}" cy="620" r="12" fill="#ff6fb5" opacity=".6"/>`;
  }
  return `<svg viewBox="0 0 2400 1000" style="left:0;top:0;width:100%;height:100%;overflow:visible"><defs>
    <radialGradient id="lfw${s}" cx="60%" cy="35%" r="80%"><stop offset="0" stop-color="#2e7d93"/><stop offset="1" stop-color="#0c3340"/></radialGradient></defs>${o}</svg>`;
}
function benchMidSVG() {  // 3400 x 1300: pegboards with tools, lamps; bottom edge = workbench
  let o = '';
  for (let k = 0; k < 6; k++) {
    const x = k * 560;
    o += `<rect x="${x + 30}" y="280" width="480" height="560" rx="18" fill="#123b44" stroke="#0a242b" stroke-width="10"/>`;
    for (let r = 0; r < 9; r++) for (let c = 0; c < 8; c++) o += `<circle cx="${x + 70 + c * 58}" cy="${320 + r * 58}" r="6" fill="#0a262d"/>`;
    o += `<path d="M${x + 110} 360 L${x + 110} 560" stroke="#0a242b" stroke-width="26" stroke-linecap="round"/><path d="M${x + 110} 360 L${x + 110} 560" stroke="#c98a4a" stroke-width="12" stroke-linecap="round" opacity=".55"/>
      <rect x="${x + 80}" y="330" width="60" height="44" rx="8" fill="#5a6b80" opacity=".7"/>
      <path d="M${x + 230} 370 Q${x + 290} 330 ${x + 330} 380 L${x + 300} 600" fill="none" stroke="#0a242b" stroke-width="18" stroke-linecap="round"/>
      <circle cx="${x + 420}" cy="460" r="58" fill="none" stroke="#ff9a5a" stroke-width="12" opacity=".45"/><rect x="${x + 380}" y="640" width="90" height="150" rx="12" fill="#1c5560" opacity=".8"/>`;
    o += `<path d="M${x + 300} 0 L${x + 300} 120" stroke="#06181f" stroke-width="8"/><path d="M${x + 240} 170 L${x + 360} 170 L${x + 330} 120 L${x + 270} 120 Z" fill="#0d3542" stroke="#06181f" stroke-width="8"/>
      <ellipse cx="${x + 300}" cy="176" rx="60" ry="12" fill="#ffe0a0" opacity=".55"/><path d="M${x + 240} 176 L${x + 140} 520 L${x + 460} 520 L${x + 360} 176 Z" fill="url(#bmL)" opacity=".5"/>`;
  }
  o += `<rect x="0" y="1040" width="3400" height="44" fill="#6a3f22"/><rect x="0" y="1040" width="3400" height="10" fill="#a8693a"/><rect x="0" y="1084" width="3400" height="220" fill="#1a1410" opacity=".6"/>`;
  return `<svg viewBox="0 0 3400 1300" style="left:0;top:0;width:100%;height:100%;overflow:visible"><defs>
    <linearGradient id="bmL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe0a0" stop-opacity=".45"/><stop offset="1" stop-color="#ffe0a0" stop-opacity="0"/></linearGradient></defs>${o}</svg>`;
}
// the mascot's messy desk (joke), viewBox 0 0 760 560. Items .md0..md6 fly off on the sweep; .mdclean sparkle
function messDeskSVG(id) {
  const fb = 'style="transform-box:fill-box;transform-origin:center"';
  return `<svg viewBox="0 0 760 560" style="left:0;top:0;width:100%;height:100%;overflow:visible"><defs>
    <linearGradient id="md${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9955a"/><stop offset="1" stop-color="#9a5a2e"/></linearGradient></defs>
  <path d="M90 450 L80 556 M670 450 L680 556" stroke="${AK}" stroke-width="30" stroke-linecap="round"/><path d="M90 450 L80 556 M670 450 L680 556" stroke="#8a4f28" stroke-width="15" stroke-linecap="round"/>
  <rect x="30" y="410" width="700" height="46" rx="14" fill="url(#md${id})" stroke="${AK}" stroke-width="11"/><path d="M50 422 L710 422" stroke="#ffd29a" stroke-width="6" opacity=".6"/>
  <g class="md0" ${fb}><rect x="60" y="330" width="200" height="40" rx="6" fill="#e8b45a" stroke="${AK}" stroke-width="8"/><rect x="70" y="290" width="190" height="40" rx="6" fill="#f2c46a" stroke="${AK}" stroke-width="8" transform="rotate(-4 165 310)"/>
    <rect x="56" y="370" width="210" height="40" rx="6" fill="#d9a04a" stroke="${AK}" stroke-width="8"/><circle cx="160" cy="390" r="10" fill="#ff5f6d"/></g>
  <g class="md1" ${fb}><path d="M300 330 L360 330 L354 408 L306 408 Z" fill="#f4ecd9" stroke="${AK}" stroke-width="8" stroke-linejoin="round"/><path d="M360 346 Q388 350 384 372 Q380 390 356 388" fill="none" stroke="${AK}" stroke-width="8"/>
    <path d="M318 310 Q312 290 322 276 M340 310 Q334 292 344 278" fill="none" stroke="#cfe" stroke-width="6" opacity=".5" stroke-linecap="round"/></g>
  <g class="md2" ${fb}><path d="M400 408 L420 260 L520 250 L540 408 Z" fill="#fff" stroke="${AK}" stroke-width="8" stroke-linejoin="round"/><path d="M430 290 L510 284 M432 320 L516 314 M434 350 L520 344" stroke="#b6c3dc" stroke-width="9" stroke-linecap="round"/>
    <path d="M390 408 L404 300 L480 296 L500 408 Z" fill="#f4f7ff" stroke="${AK}" stroke-width="8" stroke-linejoin="round" transform="rotate(-7 445 352)"/></g>
  <g class="md3" ${fb}><circle cx="590" cy="380" r="30" fill="#f4ecd9" stroke="${AK}" stroke-width="7"/><path d="M570 370 L606 392 M578 396 L604 362" stroke="#b6a88a" stroke-width="5"/></g>
  <g class="md4" ${fb}><circle cx="650" cy="388" r="22" fill="#f4ecd9" stroke="${AK}" stroke-width="7"/><path d="M636 380 L664 396" stroke="#b6a88a" stroke-width="5"/></g>
  <g class="md5" ${fb}><path d="M560 300 Q600 270 640 300 L660 330 Q610 350 560 330 Z" fill="#7dff8a" stroke="${AK}" stroke-width="7" stroke-linejoin="round"/><path d="M580 300 L572 270 M612 288 L614 256" stroke="#7dff8a" stroke-width="10" stroke-linecap="round"/></g>
  <g class="md6" ${fb}><path d="M280 408 Q300 380 330 396 Q350 380 362 408 Z" fill="#ff8ae0" stroke="${AK}" stroke-width="7" stroke-linejoin="round" transform="translate(-30 0)"/></g>
  </svg>`;
}
