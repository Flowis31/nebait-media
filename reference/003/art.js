function mascotSVG(id) {
  let knobs = '';
  for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5 + 0.3, x1 = 200 + 128 * Math.cos(a), y1 = 200 + 128 * Math.sin(a), x2 = 200 + 172 * Math.cos(a), y2 = 200 + 172 * Math.sin(a);
    knobs += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#0a130d" stroke-width="26" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#8fdc2a" stroke-width="12" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="19" fill="#b8ff3d" stroke="#0a130d" stroke-width="8"/>`; }
  return `<svg viewBox="0 0 400 400" style="overflow:visible;left:0;top:0;width:100%;height:100%">
  <defs><radialGradient id="mg${id}" cx="40%" cy="32%" r="75%"><stop offset="0" stop-color="#e2ff8a"/><stop offset="1" stop-color="#74c81c"/></radialGradient></defs>
  <g class="armL" style="transform-origin:90px 230px"><line x1="90" y1="230" x2="10" y2="290" stroke="#0a130d" stroke-width="30" stroke-linecap="round"/><line x1="90" y1="230" x2="10" y2="290" stroke="#8fdc2a" stroke-width="14" stroke-linecap="round"/><circle cx="10" cy="290" r="22" fill="#b8ff3d" stroke="#0a130d" stroke-width="8"/></g>
  <g class="armR" style="transform-origin:310px 230px"><line x1="310" y1="230" x2="390" y2="290" stroke="#0a130d" stroke-width="30" stroke-linecap="round"/><line x1="310" y1="230" x2="390" y2="290" stroke="#8fdc2a" stroke-width="14" stroke-linecap="round"/><circle cx="390" cy="290" r="22" fill="#b8ff3d" stroke="#0a130d" stroke-width="8"/></g>
  ${knobs}
  <circle cx="200" cy="200" r="132" fill="url(#mg${id})" stroke="#0a130d" stroke-width="12"/>
  <circle cx="150" cy="190" r="50" fill="#fff" stroke="#0a130d" stroke-width="11"/><circle cx="250" cy="190" r="50" fill="#fff" stroke="#0a130d" stroke-width="11"/>
  <g class="pup"><circle cx="156" cy="194" r="20" fill="#0a130d"/><circle cx="256" cy="194" r="20" fill="#0a130d"/><circle cx="163" cy="186" r="7" fill="#fff"/><circle cx="263" cy="186" r="7" fill="#fff"/></g>
  <path class="brL" style="transform-origin:150px 125px" d="M108 128 Q150 104 190 122" fill="none" stroke="#0a130d" stroke-width="12" stroke-linecap="round"/>
  <path class="brR" style="transform-origin:250px 125px" d="M212 120 L290 112" fill="none" stroke="#0a130d" stroke-width="12" stroke-linecap="round"/>
  <path class="mouth" style="transform-origin:200px 268px" d="M160 262 Q205 296 248 258" fill="none" stroke="#0a130d" stroke-width="12" stroke-linecap="round"/>
  </svg>`;
}
function boltSVG() { return `<svg viewBox="0 0 60 100" style="left:0;top:0;width:100%;height:100%"><path d="M36 2 L6 56 H28 L20 98 L54 40 H32 Z" fill="#ffe14d" stroke="#0a130d" stroke-width="6" stroke-linejoin="round"/></svg>`; }
function sunSVG() { let r = ''; for (let k = 0; k < 12; k++) r += `<line x1="150" y1="20" x2="150" y2="52" stroke="#ff9a2e" stroke-width="16" stroke-linecap="round" transform="rotate(${k * 30} 150 150)"/>`;
  return `<svg viewBox="0 0 300 300" style="overflow:visible;left:0;top:0;width:100%;height:100%">${r}<circle cx="150" cy="150" r="78" fill="#ffc83d" stroke="#0a130d" stroke-width="10"/></svg>`; }
function steamSVG() { return `<svg viewBox="0 0 300 300" style="overflow:visible;left:0;top:0;width:100%;height:100%">${[60, 150, 240].map(x => `<path class="stm" pathLength="100" d="M${x} 290 q-40 -50 0 -95 q40 -50 0 -95 q-30 -40 0 -90" fill="none" stroke="#f4ecd9" stroke-width="16" stroke-linecap="round"/>`).join('')}</svg>`; }
