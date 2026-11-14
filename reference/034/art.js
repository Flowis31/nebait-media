// art.js for 034 — world and one-off drawings (recurring props live in tools/props.js: socketSVG, chargerSVG, meterSVG, kettleSVG,
// snailSVG, suitcaseSVG, chipGuardSVG). World: a flat at night, panoramic windows onto a night city (far), the wall with
// windows and curtains (mid), the floor (near) — parallax with camX.
const AK = '#0a130d';
// far layer: night city skyline with lit windows and a moon, 3400 x 900
function citySVG() {
  let s = '', x = 0, k = 0;
  for (let i = 0; i < 90; i++) s += `<circle cx="${(hash(i * 3.1) * 3400).toFixed(0)}" cy="${(hash(i * 7.3) * 380).toFixed(0)}" r="${(1.5 + 2.5 * hash(i * 1.7)).toFixed(1)}" fill="#fff" opacity="${(0.3 + 0.6 * hash(i * 5.5)).toFixed(2)}"/>`;
  s += `<circle cx="760" cy="200" r="70" fill="#fff4cf"/><circle cx="790" cy="185" r="62" fill="#1a1030" opacity=".0"/><circle cx="740" cy="190" r="12" fill="#e8dcae"/><circle cx="785" cy="225" r="9" fill="#e8dcae"/>`;
  s += `<circle cx="2460" cy="230" r="54" fill="#fff4cf" opacity=".9"/>`;
  while (x < 3400) {
    const w = 120 + 140 * hash(k * 2.3), h = 260 + 360 * hash(k * 4.1), y = 900 - h, c = ['#2a1b44', '#331f52', '#24183c', '#3a2560'][k % 4];
    s += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${c}"/>`;
    if (hash(k * 6.1) > 0.6) s += `<rect x="${(x + w / 2 - 4).toFixed(0)}" y="${(y - 60).toFixed(0)}" width="8" height="60" fill="${c}"/><circle cx="${(x + w / 2).toFixed(0)}" cy="${(y - 62).toFixed(0)}" r="7" fill="#ff5f6d"/>`;
    for (let wy = y + 30; wy < 880; wy += 56) for (let wx = x + 18; wx < x + w - 26; wx += 40) {
      const on = hash(wx * 0.13 + wy * 0.7) > 0.55; if (on) s += `<rect class="win" x="${wx.toFixed(0)}" y="${wy.toFixed(0)}" width="20" height="28" rx="3" fill="#ffd27a" opacity=".85"/>`;
    }
    x += w + 14 + 30 * hash(k * 9.1); k++;
  }
  return `<svg viewBox="0 0 3400 900" style="left:0;top:0;width:3400px;height:900px">${s}</svg>`;
}
// mid layer: the flat's wall (burgundy wallpaper) with big windows (holes onto the city) and curtains, 3400 x 1400
function wallSVG() {
  let holes = '', cur = '', stripes = '';
  for (let x = 0; x < 3400; x += 40) stripes += `<rect x="${x}" y="0" width="14" height="1400" fill="#5a2232" opacity=".35"/>`;
  for (let wx = 120; wx < 3400; wx += 760) {
    holes += ` M${wx} 120 L${wx + 520} 120 L${wx + 520} 820 L${wx} 820 Z`;
    cur += `<path d="M${wx - 70} 80 Q${wx - 20} 460 ${wx - 80} 900 L${wx + 40} 900 Q${wx + 70} 460 ${wx + 30} 80 Z" fill="#c84a5a" stroke="${AK}" stroke-width="8"/>
      <path d="M${wx + 490} 80 Q${wx + 450} 460 ${wx + 480} 900 L${wx + 600} 900 Q${wx + 540} 460 ${wx + 590} 80 Z" fill="#c84a5a" stroke="${AK}" stroke-width="8"/>
      <path d="M${wx - 40} 120 Q${wx - 10} 460 ${wx - 50} 880 M${wx + 560} 120 Q${wx + 530} 460 ${wx + 560} 880" stroke="#8a2a3a" stroke-width="10" fill="none"/>
      <path d="M${wx + 260} 120 L${wx + 260} 820 M${wx} 470 L${wx + 520} 470" stroke="#3a1622" stroke-width="22"/>
      <rect x="${wx - 30}" y="820" width="580" height="40" rx="10" fill="#e8c9a8" stroke="${AK}" stroke-width="8"/>`;
  }
  return `<svg viewBox="0 0 3400 1400" style="left:0;top:0;width:3400px;height:1400px"><defs><clipPath id="wcl"><path d="M0 0 L3400 0 L3400 1400 L0 1400 Z${holes}" clip-rule="evenodd"/></clipPath></defs>
    <g clip-path="url(#wcl)"><rect x="0" y="0" width="3400" height="1400" fill="#46192a"/>${stripes}</g>
    <path d="${holes}" fill="none" stroke="${AK}" stroke-width="14"/>
    <rect x="0" y="0" width="3400" height="60" fill="#3a1424"/><path d="M0 60 L3400 60" stroke="#e8c9a8" stroke-width="10"/>${cur}
    <rect x="0" y="1290" width="3400" height="40" fill="#e8c9a8" stroke="${AK}" stroke-width="8"/></svg>`;
}
// near layer: wooden floor, 1080 x 640
function floorSVG() {
  let s = ''; for (let k = 0; k < 9; k++) s += `<path d="M0 ${20 + k * 70} L1080 ${20 + k * 70}" stroke="#3a1e12" stroke-width="5" opacity=".6"/>`;
  for (let k = 0; k < 24; k++) { const y = 20 + (k % 9) * 70, x = hash(k * 4.3) * 1080; s += `<path d="M${x.toFixed(0)} ${y} L${x.toFixed(0)} ${y + 70}" stroke="#3a1e12" stroke-width="4" opacity=".5"/>`; }
  return `<svg viewBox="0 0 1080 640" style="left:0;top:0;width:1080px;height:640px"><defs><linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a5a34"/><stop offset=".35" stop-color="#6e3b22"/><stop offset="1" stop-color="#2a140c"/></linearGradient></defs>
    <rect width="1080" height="640" fill="url(#fl)"/>${s}</svg>`;
}
// charger cut in half, viewBox 0 0 900 760: shell 80..840 x 80..700; prongs out to the left (y 330 / 430); transformer 330..530 x 250..530;
// chip 600..730 x 130..260 (.ccchip, its eyes .ccEye); capacitors; USB port at the right (840, 380..440). .ccglow (core glow, o)
const CC_IN = [[-60, 380], [150, 380], [210, 300], [330, 300]];        // prongs -> coil (stage coords inside the svg box)
const CC_OUT = [[530, 420], [640, 420], [700, 410], [860, 410]];       // coil -> port
function chargerCutSVG(id) {
  let coils = ''; for (let k = 0; k < 9; k++) coils += `<rect x="${352 + k * 20}" y="282" width="14" height="216" rx="7" fill="#d9822b" stroke="${AK}" stroke-width="4"/>`;
  return `<svg viewBox="0 0 900 760" style="overflow:visible;left:0;top:0;width:100%;height:100%"><defs>
    <linearGradient id="ccs${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cfd5de"/></linearGradient>
    <linearGradient id="cci${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2d1a3c"/><stop offset="1" stop-color="#160c22"/></linearGradient>
    <radialGradient id="ccg${id}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffe14d" stop-opacity=".8"/><stop offset="1" stop-color="#ffe14d" stop-opacity="0"/></radialGradient></defs>
    <rect x="-80" y="356" width="150" height="48" rx="20" fill="#c3cad2" stroke="${AK}" stroke-width="9"/><rect x="-80" y="356" width="40" height="48" rx="20" fill="#e6ebf0"/>
    <rect x="80" y="80" width="760" height="620" rx="90" fill="url(#ccs${id})" stroke="${AK}" stroke-width="14"/>
    <rect x="118" y="118" width="684" height="544" rx="62" fill="url(#cci${id})" stroke="${AK}" stroke-width="8"/>
    <path d="M140 640 L780 640" stroke="#3a7a4a" stroke-width="28" opacity=".9"/>
    <path d="M150 380 L210 380 L210 300 L330 300" fill="none" stroke="#ffb547" stroke-width="16" stroke-linejoin="round" opacity=".55"/>
    <path d="M530 420 L640 420 L700 410 L840 410" fill="none" stroke="#5fe8ff" stroke-width="10" stroke-linejoin="round" opacity=".55"/>
    <circle class="ccglow" cx="430" cy="390" r="190" fill="url(#ccg${id})" style="opacity:0"/>
    <rect x="330" y="250" width="200" height="280" rx="16" fill="#3a3f4b" stroke="${AK}" stroke-width="9"/><rect x="346" y="266" width="168" height="248" rx="10" fill="#55607a"/>${coils}
    <rect x="160" y="480" width="56" height="120" rx="20" fill="#4a7dff" stroke="${AK}" stroke-width="7"/><rect x="232" y="500" width="50" height="100" rx="18" fill="#4a7dff" stroke="${AK}" stroke-width="7"/>
    <path d="M176 500 L176 580 M246 520 L246 580" stroke="#fff" stroke-width="5" opacity=".5"/>
    <g class="ccchip"><rect x="600" y="130" width="130" height="130" rx="14" fill="#141720" stroke="${AK}" stroke-width="8"/>
      ${[0, 1, 2, 3].map(k => `<rect x="${612 + k * 30}" y="114" width="12" height="18" fill="#c9a64a"/><rect x="${612 + k * 30}" y="258" width="12" height="18" fill="#c9a64a"/>`).join('')}
      <g class="ccEye" style="transform-origin:665px 190px"><circle cx="645" cy="190" r="13" fill="#fff"/><circle cx="685" cy="190" r="13" fill="#fff"/><circle cx="647" cy="193" r="6" fill="${AK}"/><circle cx="687" cy="193" r="6" fill="${AK}"/></g>
      <path d="M665 260 L665 300 L560 300 L560 260" fill="none" stroke="#8a93a6" stroke-width="5"/></g>
    <rect x="800" y="376" width="60" height="68" rx="12" fill="#2b2f38" stroke="${AK}" stroke-width="7"/><rect x="814" y="398" width="34" height="24" rx="6" fill="#0c0d12"/>
    <path d="M130 160 Q134 112 186 108" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".7"/></svg>`;
}
// power dial (wattmeter), viewBox 0 0 640 440: arc centre (320,360) r 260, needle .wneedle (r origin 320 360; -80 = zero, +80 = full).
function wattDialSVG(id) {
  let ticks = '';
  for (let k = 0; k <= 20; k++) { const a = (-170 + k * 8) * Math.PI / 180, r0 = k % 5 ? 228 : 210, x0 = 320 + r0 * Math.cos(a), y0 = 360 + r0 * Math.sin(a), x1 = 320 + 252 * Math.cos(a), y1 = 360 + 252 * Math.sin(a);
    ticks += `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} L${x1.toFixed(1)} ${y1.toFixed(1)}" stroke="${AK}" stroke-width="${k % 5 ? 5 : 9}" stroke-linecap="round"/>`; }
  return `<svg viewBox="0 0 640 440" style="overflow:visible;left:0;top:0;width:100%;height:100%"><defs>
    <linearGradient id="wd${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff8e8"/><stop offset="1" stop-color="#e6d6b4"/></linearGradient>
    <linearGradient id="wz${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7dff8a"/><stop offset=".5" stop-color="#ffe14d"/><stop offset="1" stop-color="#ff3b5c"/></linearGradient></defs>
    <path d="M20 380 A300 300 0 0 1 620 380 L620 420 L20 420 Z" fill="#3a2a44" stroke="${AK}" stroke-width="12"/>
    <path d="M50 370 A270 270 0 0 1 590 370 Z" fill="url(#wd${id})" stroke="${AK}" stroke-width="8"/>
    <path d="M75 318 A250 250 0 0 1 565 318" fill="none" stroke="url(#wz${id})" stroke-width="22" opacity=".8"/>
    ${ticks}<text x="320" y="250" text-anchor="middle" style="font:900 48px Unb" fill="#3a2a44">Вт</text>
    <g class="wneedle" style="transform-origin:320px 360px"><path d="M312 360 L320 120 L328 360 Z" fill="#ff3b5c" stroke="${AK}" stroke-width="6" stroke-linejoin="round"/></g>
    <circle cx="320" cy="360" r="30" fill="#3a2a44" stroke="${AK}" stroke-width="8"/><path d="M90 300 Q130 200 220 150" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".7"/></svg>`;
}
// light switch row on the inside wall of the charger (for the chip-guard scene), viewBox 0 0 200 280. .swk (toggle, r origin 100 140), .swl (lamp, o)
function switchSVG(id) {
  return `<svg viewBox="0 0 200 280" style="overflow:visible;left:0;top:0;width:100%;height:100%">
    <circle class="swl" cx="100" cy="30" r="26" fill="#ffe14d" stroke="${AK}" stroke-width="7"/><circle cx="100" cy="30" r="26" fill="#2a2030" stroke="${AK}" stroke-width="7" class="swoff" style="opacity:0"/>
    <rect x="30" y="80" width="140" height="190" rx="24" fill="#e9e3d8" stroke="${AK}" stroke-width="9"/><rect x="60" y="110" width="80" height="130" rx="16" fill="#cfc6b6" stroke="${AK}" stroke-width="6"/>
    <g class="swk" style="transform-origin:100px 175px"><rect x="70" y="120" width="60" height="58" rx="12" fill="#fff" stroke="${AK}" stroke-width="6"/></g></svg>`;
}
