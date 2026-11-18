// 035 world: a winter night. Far: stars and snowy hills (blurred), middle: block-house silhouettes with lit windows, near: snow.
function hillsSVG() {
  let st = ''; for (let k = 0; k < 70; k++) { const x = hash(k * 1.7 + 3) * 3400, y = hash(k * 2.3 + 1) * 560, r = 2 + hash(k * 5.1) * 4;
    st += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#fff" opacity="${(0.25 + hash(k * 3.3) * 0.6).toFixed(2)}"/>`; }
  return `<svg viewBox="0 0 3400 1100" style="position:absolute;left:0;top:0;width:3400px;height:1100px">${st}
    <circle cx="2350" cy="230" r="90" fill="#eaf4ff" opacity=".9"/><circle cx="2385" cy="205" r="80" fill="#13284a" opacity=".85"/>
    <path d="M0 900 Q400 760 800 860 T1600 840 T2400 860 T3400 820 L3400 1100 L0 1100 Z" fill="#2c4a74" opacity=".9"/>
    <path d="M0 980 Q500 880 1000 960 T2000 940 T3400 950 L3400 1100 L0 1100 Z" fill="#3d6394"/></svg>`;
}
function townSVG() {
  let s = ''; let x = 0, k = 0;
  while (x < 3400) { const w = 160 + hash(k * 2.7) * 200, h = 260 + hash(k * 4.9) * 420, y = 1320 - h;
    s += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="#162b4c" stroke="#0a1426" stroke-width="6"/>
      <rect x="${x.toFixed(0)}" y="${(y - 14).toFixed(0)}" width="${w.toFixed(0)}" height="18" rx="9" fill="#e8f4ff" opacity=".85"/>`;
    for (let r = 0; r < Math.floor(h / 70) - 1; r++) for (let c = 0; c < Math.floor(w / 56); c++) { const lit = hash(k * 31 + r * 7 + c * 3) > 0.55;
      s += `<rect x="${(x + 18 + c * 56).toFixed(0)}" y="${(y + 30 + r * 70).toFixed(0)}" width="28" height="36" rx="4" fill="${lit ? '#ffd27a' : '#0e1d36'}" opacity="${lit ? .85 : 1}"/>`; }
    x += w + 30 + hash(k * 7.7) * 60; k++; }
  return `<svg viewBox="0 0 3400 1400" style="position:absolute;left:0;top:0;width:3400px;height:1400px">${s}</svg>`;
}
function floorSVG() {
  return `<svg viewBox="0 0 1080 640" style="position:absolute;left:0;top:0;width:1080px;height:640px"><defs><linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dbeeff"/><stop offset="1" stop-color="#7fa3cc"/></linearGradient></defs>
    <path d="M0 30 Q270 0 540 22 T1080 16 L1080 640 L0 640 Z" fill="url(#fl)"/><path d="M0 36 Q270 6 540 28 T1080 22" fill="none" stroke="#fff" stroke-width="10" opacity=".8"/></svg>`;
}
// block of flats with a balcony (general shot): viewBox 0 0 1080 1300; the balcony sits at x 300..780, rail top y 820
function houseSVG() {
  let win = ''; for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) { const x = 150 + c * 210, y = 120 + r * 150; if (r === 4 && (c === 1 || c === 2)) continue;
    const lit = hash(r * 4 + c + 2) > 0.45;
    win += `<rect x="${x}" y="${y}" width="150" height="104" rx="8" fill="${lit ? '#ffd27a' : '#1b3358'}" stroke="#0a1426" stroke-width="8"/><path d="M${x + 75} ${y} L${x + 75} ${y + 104}" stroke="#0a1426" stroke-width="6"/>`; }
  return `<svg viewBox="0 0 1080 1300" style="position:absolute;left:0;top:0;width:1080px;height:1300px"><defs><linearGradient id="hw" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a5a8a"/><stop offset="1" stop-color="#284470"/></linearGradient></defs>
    <rect x="100" y="60" width="880" height="1240" fill="url(#hw)" stroke="#0a1426" stroke-width="12"/>
    <rect x="86" y="40" width="908" height="34" rx="12" fill="#eaf6ff" stroke="#0a1426" stroke-width="8"/>${win}
    <rect x="330" y="700" width="420" height="160" rx="8" fill="#ffd27a" stroke="#0a1426" stroke-width="8"/><path d="M540 700 L540 860" stroke="#0a1426" stroke-width="6"/>
    <rect x="280" y="900" width="520" height="24" fill="#c9d6e6" stroke="#0a1426" stroke-width="8"/>
    <path d="M300 900 L300 1010 M780 900 L780 1010" stroke="#0a1426" stroke-width="12"/>
    <rect x="280" y="1000" width="520" height="34" rx="6" fill="#d9e6f4" stroke="#0a1426" stroke-width="8"/>
    ${[...Array(11)].map((_, k) => `<path d="M${320 + k * 44} 1000 L${320 + k * 44} 924" stroke="#0a1426" stroke-width="7"/>`).join('')}
    <path d="M276 1000 Q540 976 804 1000" fill="#fff" stroke="#fff" stroke-width="16" stroke-linecap="round"/>
    <path d="M86 46 Q540 22 994 46" fill="none" stroke="#fff" stroke-width="18" stroke-linecap="round"/></svg>`;
}
// cozy room (general shot): wall, window with snow outside, a lamp, rug; viewBox 0 0 1080 1320
function roomSVG() {
  let wp = ''; for (let k = 0; k < 14; k++) wp += `<path d="M${k * 80 + 20} 0 L${k * 80 + 20} 1100" stroke="#ffe0b0" stroke-opacity=".07" stroke-width="22"/>`;
  let sn = ''; for (let k = 0; k < 24; k++) sn += `<circle cx="${(640 + hash(k * 3.1) * 330).toFixed(0)}" cy="${(250 + hash(k * 5.7) * 300).toFixed(0)}" r="${(3 + hash(k) * 5).toFixed(1)}" fill="#fff" opacity=".85"/>`;
  return `<svg viewBox="0 0 1080 1320" style="position:absolute;left:0;top:0;width:1080px;height:1320px"><defs><linearGradient id="rw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a4430"/><stop offset="1" stop-color="#4a2618"/></linearGradient>
    <radialGradient id="rl" cx="30%" cy="10%" r="80%"><stop offset="0" stop-color="rgba(255,210,130,.5)"/><stop offset="1" stop-color="rgba(255,210,130,0)"/></radialGradient></defs>
    <rect x="0" y="0" width="1080" height="1320" fill="url(#rw)"/>${wp}
    <rect x="610" y="210" width="390" height="370" rx="14" fill="#16305a" stroke="#2a1408" stroke-width="16"/>${sn}
    <path d="M805 210 L805 580 M610 395 L1000 395" stroke="#2a1408" stroke-width="12"/><path d="M620 560 Q805 530 990 560 L990 572 L620 572 Z" fill="#fff"/>
    <rect x="590" y="580" width="430" height="26" rx="8" fill="#c9824a" stroke="#2a1408" stroke-width="8"/>
    <rect x="0" y="0" width="1080" height="1320" fill="url(#rl)"/>
    <path d="M250 0 L250 150" stroke="#2a1408" stroke-width="6"/><path d="M200 150 L300 150 L330 220 L170 220 Z" fill="#ffcf4d" stroke="#2a1408" stroke-width="7"/><ellipse cx="250" cy="228" rx="40" ry="16" fill="#fff6c0"/>
    <rect x="0" y="1100" width="1080" height="220" fill="#3a1e12"/><rect x="0" y="1092" width="1080" height="16" fill="#a8643a"/>
    <ellipse cx="540" cy="1200" rx="430" ry="70" fill="#c94a4a" stroke="#2a1408" stroke-width="8"/><ellipse cx="540" cy="1200" rx="330" ry="46" fill="none" stroke="#ffd27a" stroke-width="8" stroke-dasharray="20 16"/></svg>`;
}
