// 028 art: scene-specific drawings (kitchen world layers, microwave cutaway, door mesh, floor plan, phone screens).
// Recurring props live in props.js (microwave, router, water molecule, soup bowl, thermometer, wifi icon, scales, phone...).
const AIK = '#0a130d';
// sine path: from (x0,y) to the right, length len, amplitude a, wavelength wl, phase ph (radians)
function sinePath(x0, y, len, a, wl, ph = 0, step = 8) {
  let d = ''; for (let x = 0; x <= len; x += step) d += (x ? ' L' : 'M') + (x0 + x).toFixed(1) + ' ' + (y + a * Math.sin(2 * Math.PI * x / wl + ph)).toFixed(1);
  return d;
}
// far layer: kitchen wall tiles 2400x1400 (seeded), warm evening light
function tilesSVG() {
  let t = '';
  for (let r = 0; r < 12; r++) for (let c = 0; c < 20; c++) {
    const x = c * 120 + (r % 2) * 60, y = r * 120, k = hash(r * 31 + c * 7);
    t += `<rect x="${x + 4}" y="${y + 4}" width="112" height="112" rx="10" fill="${k > 0.86 ? '#2b5a5c' : k > 0.6 ? '#22494c' : '#1d4043'}"/>`;
    if (k > 0.93) t += `<path d="M${x + 30} ${y + 60} q30 -30 60 0 q-30 30 -60 0z" fill="#ffb547" opacity=".18"/>`;
  }
  return `<svg viewBox="0 0 2400 1400" style="left:0;top:0;width:2400px;height:1400px;position:absolute"><rect width="2400" height="1400" fill="#122e31"/>${t}</svg>`;
}
// mid layer: upper cabinets + a hanging lamp row (3000 wide, repeats every 1500)
function cabinetsSVG() {
  let c = '';
  for (let k = 0; k < 2; k++) {
    const o = k * 1500;
    c += `<rect x="${o + 40}" y="0" width="560" height="250" rx="20" fill="#3b2a24" stroke="${AIK}" stroke-width="8"/><rect x="${o + 60}" y="20" width="250" height="210" rx="14" fill="#4a352d"/><rect x="${o + 330}" y="20" width="250" height="210" rx="14" fill="#4a352d"/>
      <rect x="${o + 290}" y="150" width="14" height="50" rx="7" fill="#d9b48a"/><rect x="${o + 336}" y="150" width="14" height="50" rx="7" fill="#d9b48a"/>
      <rect x="${o + 820}" y="0" width="520" height="250" rx="20" fill="#3b2a24" stroke="${AIK}" stroke-width="8"/><rect x="${o + 840}" y="20" width="480" height="210" rx="14" fill="#4a352d"/>
      <rect x="${o + 1050}" y="190" width="70" height="14" rx="7" fill="#d9b48a"/>
      <path d="M${o + 700} 0 L${o + 700} 150" stroke="${AIK}" stroke-width="6"/><path d="M${o + 640} 150 L${o + 760} 150 L${o + 735} 215 L${o + 665} 215 Z" fill="#ffb547" stroke="${AIK}" stroke-width="8"/>
      <ellipse cx="${o + 700}" cy="222" rx="60" ry="14" fill="#fff1b0" opacity=".8"/>`;
  }
  return `<svg viewBox="0 0 3000 260" style="left:0;top:0;width:3000px;height:260px;position:absolute">${c}</svg>`;
}
// near layer: wooden counter top (front edge), 3200 wide
function counterSVG() {
  let g = ''; for (let k = 0; k < 40; k++) { const x = k * 80 + hash(k) * 40; g += `<path d="M${x} 40 q20 30 0 80" stroke="#8a5a32" stroke-width="5" fill="none" opacity=".5"/>`; }
  return `<svg viewBox="0 0 3200 300" style="left:0;top:0;width:3200px;height:300px;position:absolute">
    <defs><linearGradient id="ctr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d79a5e"/><stop offset=".25" stop-color="#b9783f"/><stop offset="1" stop-color="#5c3a22"/></linearGradient></defs>
    <rect x="0" y="0" width="3200" height="300" fill="url(#ctr)"/><rect x="0" y="0" width="3200" height="18" fill="#f0c38e"/>${g}<rect x="0" y="34" width="3200" height="8" fill="#000" opacity=".2"/></svg>`;
}
// microwave cut-away (scene D), viewBox 0 0 900 640: metal walls 30px, cavity 60..840 x 60..580, door on the right (x 812..860) with
// mesh dots (.dmesh), bowl on the plate at the bottom. .dwall (wall overlay for a flash, o), .dmag (magnetron box top right)
function cutawaySVG(id) {
  let mesh = ''; for (let y = 90; y < 560; y += 22) mesh += `<circle cx="836" cy="${y}" r="5"/>`;
  return `<svg viewBox="0 0 900 640" style="left:0;top:0;width:100%;height:100%;overflow:visible">
    <defs><linearGradient id="cw${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eef3f7"/><stop offset=".5" stop-color="#aab6c2"/><stop offset="1" stop-color="#7d8a98"/></linearGradient>
      <radialGradient id="cc${id}" cx="50%" cy="60%" r="70%"><stop offset="0" stop-color="#3a2a22"/><stop offset="1" stop-color="#140f0c"/></radialGradient></defs>
    <rect x="10" y="10" width="880" height="620" rx="40" fill="url(#cw${id})" stroke="${AIK}" stroke-width="12"/>
    <rect x="60" y="60" width="760" height="520" rx="18" fill="url(#cc${id})" stroke="${AIK}" stroke-width="8"/>
    <rect class="dwall" x="10" y="10" width="880" height="620" rx="40" fill="none" stroke="#fff" stroke-width="44" opacity="0"/>
    <rect x="812" y="60" width="50" height="520" rx="10" fill="#2b3640" stroke="${AIK}" stroke-width="7"/><g class="dmesh" fill="#9fb3c4">${mesh}</g>
    <g class="dmag"><rect x="560" y="20" width="200" height="34" rx="10" fill="#5b6672" stroke="${AIK}" stroke-width="6"/><path d="M660 54 L660 74" stroke="${AIK}" stroke-width="10"/></g>
    <ellipse cx="420" cy="560" rx="260" ry="24" fill="#9aa6b2" stroke="${AIK}" stroke-width="6"/>
    <path d="M300 556 Q312 470 420 470 Q528 470 540 556 Z" fill="#fff" stroke="${AIK}" stroke-width="8"/><ellipse cx="420" cy="480" rx="112" ry="18" fill="#ff9a3d" stroke="${AIK}" stroke-width="6"/>
    <path d="M70 76 L250 70" stroke="#fff" stroke-width="10" opacity=".25" stroke-linecap="round"/></svg>`;
}
// close-up of the door mesh (scene E): perforated metal, viewBox 0 0 520 1000; holes on a grid. .mhole (one highlighted hole, o)
function meshSheetSVG(id) {
  let h = ''; for (let y = 30; y < 1000; y += 46) for (let x = 30 + ((y / 46) % 2) * 23; x < 520; x += 46) h += `<circle cx="${x}" cy="${y}" r="10"/>`;
  return `<svg viewBox="0 0 520 1000" style="left:0;top:0;width:100%;height:100%;overflow:visible">
    <defs><linearGradient id="ms${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5d6b78"/><stop offset=".4" stop-color="#9fb0bf"/><stop offset="1" stop-color="#6c7a88"/></linearGradient></defs>
    <rect x="0" y="0" width="520" height="1000" rx="30" fill="url(#ms${id})" stroke="${AIK}" stroke-width="12"/>
    <g fill="#0d1216">${h}</g><path d="M30 20 L30 980" stroke="#fff" stroke-width="10" opacity=".25"/>
    <circle class="mhole" cx="260" cy="490" r="34" fill="none" stroke="#ffb547" stroke-width="10" opacity="0"/></svg>`;
}
// big white glove (palm, "длиной с ладонь"), viewBox 0 0 300 340
function gloveSVG(id) {
  return `<svg viewBox="0 0 300 340" style="left:0;top:0;width:100%;height:100%;overflow:visible">
    <defs><radialGradient id="gl${id}" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#d9d0bb"/></radialGradient></defs>
    <path d="M70 330 L70 250 Q30 220 26 160 Q24 120 50 118 Q72 118 78 160 L84 60 Q88 30 112 32 Q134 34 134 62 L136 40 Q140 12 166 14 Q190 18 188 46 L190 60 Q196 36 218 38 Q242 42 240 72 L236 120 Q244 100 262 104 Q284 110 280 140 L268 230 Q258 280 228 300 L228 330 Z"
      fill="url(#gl${id})" stroke="${AIK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M134 62 L132 150 M188 46 L186 150 M240 72 L236 150" stroke="#b7ad98" stroke-width="7" stroke-linecap="round" fill="none"/>
    <path d="M70 300 L228 300" stroke="#b7ad98" stroke-width="8"/><circle cx="104" cy="58" r="9" fill="#fff"/></svg>`;
}
// floor plan from above (scene G), viewBox 0 0 1000 1060: rooms, kitchen top right with a microwave (top view), hallway router spot (500,560)
function planSVG(id) {
  const wall = '#e9f2ff';
  return `<svg viewBox="0 0 1000 1060" style="left:0;top:0;width:100%;height:100%;overflow:visible">
    <defs><linearGradient id="pl${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d5a8a"/><stop offset="1" stop-color="#123c62"/></linearGradient>
      <pattern id="pg${id}" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0 L0 0 0 40" fill="none" stroke="#5f9fd0" stroke-width="1.5" opacity=".35"/></pattern></defs>
    <rect x="0" y="0" width="1000" height="1060" rx="36" fill="url(#pl${id})" stroke="${AIK}" stroke-width="12"/><rect x="0" y="0" width="1000" height="1060" rx="36" fill="url(#pg${id})"/>
    <g fill="none" stroke="${wall}" stroke-width="16" stroke-linecap="round">
      <rect x="60" y="60" width="880" height="940" rx="6"/><path d="M60 420 L330 420 M430 420 L560 420 M640 420 L940 420"/><path d="M560 60 L560 340"/>
      <path d="M60 700 L300 700 M400 700 L940 700"/><path d="M420 700 L420 1000"/><path d="M640 420 L640 600"/></g>
    <g fill="#9cc8ec" font-family="JB" font-weight="800" font-size="30" opacity=".85"><text x="110" y="120">КОМНАТА</text><text x="610" y="120">КУХНЯ</text><text x="110" y="760">СПАЛЬНЯ</text><text x="470" y="760">ВАННАЯ</text></g>
    <rect x="80" y="180" width="240" height="120" rx="20" fill="#2c6fa6" stroke="${wall}" stroke-width="6"/><rect x="100" y="820" width="220" height="140" rx="20" fill="#2c6fa6" stroke="${wall}" stroke-width="6"/>
    <rect x="600" y="300" width="320" height="80" rx="14" fill="#2c6fa6" stroke="${wall}" stroke-width="6"/></svg>`;
}
// top-view microwave for the plan, viewBox 0 0 200 140 (box with a turntable circle)
function mwTopSVG(id) {
  return `<svg viewBox="0 0 200 140" style="left:0;top:0;width:100%;height:100%;overflow:visible"><rect x="6" y="6" width="188" height="128" rx="16" fill="#e9eef2" stroke="${AIK}" stroke-width="9"/>
    <rect x="22" y="20" width="120" height="100" rx="10" fill="#2a3540" stroke="${AIK}" stroke-width="6"/><circle cx="82" cy="70" r="34" fill="#9aa6b2" stroke="${AIK}" stroke-width="5"/><circle cx="82" cy="70" r="16" fill="#ff9a3d"/>
    <rect x="152" y="24" width="30" height="92" rx="8" fill="#cfd6dc"/></svg>`;
}
// phone screens (fit phonePropSVG screen rect 22..198 x 44..374)
function videoScreen(id) {
  return `<rect x="22" y="44" width="176" height="330" rx="18" fill="#141a26"/>
    <rect x="30" y="120" width="160" height="110" rx="12" fill="#ff7a5c"/><circle cx="76" cy="160" r="18" fill="#ffd34d"/><path d="M30 230 L80 186 L120 214 L150 190 L190 230 Z" fill="#3a8c5a"/>
    <g class="vplay"><circle cx="110" cy="175" r="26" fill="rgba(0,0,0,.45)"/><path d="M101 161 L124 175 L101 189 Z" fill="#fff"/></g>
    <g class="vspin" style="transform-origin:110px 175px" opacity="0"><circle cx="110" cy="175" r="30" fill="rgba(0,0,0,.55)"/><path d="M110 152 A23 23 0 1 1 87 175" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g>
    <rect x="30" y="246" width="160" height="8" rx="4" fill="#3a4458"/><rect class="vbar" x="30" y="246" width="160" height="8" rx="4" fill="#ff3b5c" style="transform-origin:30px 250px"/>
    <rect x="30" y="270" width="120" height="12" rx="6" fill="#3a4458"/><rect x="30" y="292" width="90" height="12" rx="6" fill="#3a4458"/>
    <g class="vwifi"><path d="M150 72 A26 26 0 0 1 186 72" fill="none" stroke="#7df9ff" stroke-width="6" stroke-linecap="round" class="vw3"/><path d="M158 80 A15 15 0 0 1 178 80" fill="none" stroke="#7df9ff" stroke-width="6" stroke-linecap="round" class="vw2"/><circle cx="168" cy="88" r="5" fill="#7df9ff" class="vw1"/></g>
    <rect x="34" y="66" width="60" height="12" rx="6" fill="#3a4458"/>`;
}
function settingsScreen(id) {
  return `<rect x="22" y="44" width="176" height="330" rx="18" fill="#eef2f7"/>
    <text x="40" y="96" font-family="Mont" font-weight="900" font-size="24" fill="#141a26">Wi-Fi</text>
    <g transform="translate(150,74) scale(.2)">${'<path d="M70 121 A50 50 0 0 1 130 121" fill="none" stroke="#2f7cff" stroke-width="18" stroke-linecap="round"/><path class="sw2" d="M40 103 A88 88 0 0 1 160 103" fill="none" stroke="#2f7cff" stroke-width="18" stroke-linecap="round" opacity=".25"/><path class="sw3" d="M12 84 A126 126 0 0 1 188 84" fill="none" stroke="#2f7cff" stroke-width="18" stroke-linecap="round" opacity=".25"/><circle cx="100" cy="142" r="15" fill="#2f7cff"/>'}</g>
    <rect x="34" y="120" width="152" height="70" rx="16" fill="#fff" stroke="#d0d8e4" stroke-width="3"/>
    <rect class="segk" x="40" y="128" width="70" height="54" rx="12" fill="#2f7cff"/>
    <text class="seg24" x="75" y="163" text-anchor="middle" font-family="JB" font-weight="800" font-size="19" fill="#fff">2,4</text>
    <text class="seg5" x="146" y="163" text-anchor="middle" font-family="JB" font-weight="800" font-size="19" fill="#141a26">5</text>
    <text x="110" y="214" text-anchor="middle" font-family="JB" font-weight="800" font-size="15" fill="#6a7486">ГГц</text>
    <rect x="34" y="238" width="152" height="16" rx="8" fill="#d6dde8"/><rect x="34" y="268" width="110" height="16" rx="8" fill="#d6dde8"/><rect x="34" y="298" width="130" height="16" rx="8" fill="#d6dde8"/>`;
}
// a small plain router icon for the mountain (scene I): pure CSS divs, cheap to render hundreds
function miniRouter(par, x, y, w, k) {
  const d = document.createElement('div'); d.className = 'mr'; d.style.cssText = `left:${x}px;top:${y}px;width:${w}px;height:${w * 0.42}px;background:${['#3d4a68', '#46557a', '#36425e'][k % 3]}`;
  d.innerHTML = `<i style="left:${w * 0.18}px"></i><i style="left:${w * 0.48}px"></i><i style="left:${w * 0.78}px"></i><b></b>`;
  par.appendChild(d); return d;
}
