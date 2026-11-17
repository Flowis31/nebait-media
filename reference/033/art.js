// 033 world: a night photo studio. Far: city bokeh lights (blurred), middle: floating RGB pixel tiles, near: a desk edge.
function bokehSVG() {
  let s = ''; const cols = ['#ff9f43', '#4dc9ff', '#ff5f8a', '#ffe14d', '#7d8cff'];
  for (let k = 0; k < 46; k++) { const x = hash(k * 1.3 + 2) * 3400, y = 80 + hash(k * 2.9 + 5) * 900, r = 26 + hash(k * 4.1) * 70;
    s += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(0)}" fill="${cols[k % 5]}" opacity="${(0.12 + hash(k * 7.7) * 0.22).toFixed(2)}"/>`; }
  return `<svg viewBox="0 0 3400 1100" style="position:absolute;left:0;top:0;width:3400px;height:1100px">${s}</svg>`;
}
function tilesSVG() {
  let s = ''; const cols = ['#ff4d5e', '#4dff88', '#4d8cff'];
  for (let k = 0; k < 34; k++) { const x = hash(k * 3.1 + 1) * 3400, y = 120 + hash(k * 1.9 + 8) * 1150, w = 26 + hash(k * 5.3) * 46, r = (hash(k * 9.1) - 0.5) * 40;
    s += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${w.toFixed(0)}" rx="${(w * 0.2).toFixed(0)}" fill="${cols[k % 3]}" opacity=".22" stroke="#fff" stroke-opacity=".25" stroke-width="3" transform="rotate(${r.toFixed(0)} ${(x + w / 2).toFixed(0)} ${(y + w / 2).toFixed(0)})"/>`; }
  return `<svg viewBox="0 0 3400 1400" style="position:absolute;left:0;top:0;width:3400px;height:1400px">${s}</svg>`;
}
function floorSVG() {
  return `<svg viewBox="0 0 1080 640" style="position:absolute;left:0;top:0;width:1080px;height:640px"><defs><linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2a5a"/><stop offset="1" stop-color="#140c26"/></linearGradient></defs>
    <rect x="0" y="0" width="1080" height="640" fill="url(#fl)"/><rect x="0" y="0" width="1080" height="10" fill="#ff9f43" opacity=".35"/><path d="M0 60 L1080 60" stroke="#fff" stroke-opacity=".06" stroke-width="4"/></svg>`;
}
// communal room for the joke scene: wallpaper, a door, a lamp, a clothesline
function roomSVG() {
  let wp = ''; for (let k = 0; k < 14; k++) wp += `<path d="M${k * 80 + 20} 0 L${k * 80 + 20} 1300" stroke="#ffd9a8" stroke-opacity=".08" stroke-width="22"/>`;
  return `<svg viewBox="0 0 1080 1300" style="position:absolute;left:0;top:0;width:1080px;height:1300px"><defs><linearGradient id="rw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3a52"/><stop offset="1" stop-color="#3a2238"/></linearGradient>
    <radialGradient id="rl" cx="50%" cy="0%" r="70%"><stop offset="0" stop-color="rgba(255,220,140,.45)"/><stop offset="1" stop-color="rgba(255,220,140,0)"/></radialGradient></defs>
    <rect x="0" y="0" width="1080" height="1300" fill="url(#rw)"/>${wp}<rect x="0" y="0" width="1080" height="1300" fill="url(#rl)"/>
    <rect x="0" y="1060" width="1080" height="240" fill="#2a1626"/><rect x="0" y="1052" width="1080" height="18" fill="#7a4a3a" stroke="#0a130d" stroke-width="6"/>
    <path d="M60 300 Q540 380 1020 300" stroke="#e8e0d0" stroke-width="5" fill="none"/>
    <path d="M200 334 l40 0 l-6 70 l-28 0 z" fill="#ff7a5a" stroke="#0a130d" stroke-width="5"/><path d="M700 344 l60 0 l-4 54 l-52 0 z" fill="#5fb0ff" stroke="#0a130d" stroke-width="5"/><path d="M460 352 l34 0 l0 80 l-34 0 z" fill="#ffe14d" stroke="#0a130d" stroke-width="5"/>
    <path d="M540 0 L540 120" stroke="#0a130d" stroke-width="6"/><path d="M500 120 L580 120 L600 170 L480 170 Z" fill="#ffcf4d" stroke="#0a130d" stroke-width="6"/><ellipse cx="540" cy="178" rx="30" ry="14" fill="#fff6c0"/></svg>`;
}
