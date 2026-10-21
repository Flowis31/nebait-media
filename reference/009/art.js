const INK = '#0a130d';
function earthSVG(id) {
  const land = `<path d="M40 120 q30 -40 70 -20 q20 30 60 20 q30 -10 40 30 q-10 40 -50 40 q-30 30 -70 10 q-40 -20 -50 -80z"/>
    <path d="M190 230 q40 -20 70 10 q20 40 -10 70 q-30 20 -50 -10 q-30 -30 -10 -70z"/>
    <path d="M230 60 q30 -20 60 0 q10 30 -20 40 q-30 0 -40 -40z"/>
    <path d="M60 260 q20 -10 40 10 q0 30 -30 30 q-20 -10 -10 -40z"/>`;
  return `<svg class="earth-svg" viewBox="0 0 400 400" style="overflow:visible;left:0;top:0;width:100%;height:100%">
  <defs><radialGradient id="eo${id}" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#8fe0ff"/><stop offset=".5" stop-color="#3aa3f0"/><stop offset="1" stop-color="#1b5fbf"/></radialGradient>
  <clipPath id="ec${id}"><circle cx="200" cy="200" r="150"/></clipPath>
  <radialGradient id="en${id}" cx="85%" cy="60%" r="70%"><stop offset=".3" stop-color="#06101f" stop-opacity=".55"/><stop offset="1" stop-color="#06101f" stop-opacity="0"/></radialGradient></defs>
  <circle cx="200" cy="200" r="168" fill="none" stroke="#7fd4ff" stroke-width="10" opacity=".25"/>
  <circle cx="200" cy="200" r="150" fill="url(#eo${id})"/>
  <g clip-path="url(#ec${id})"><g class="cont" fill="#5fd35a" stroke="${INK}" stroke-width="6" stroke-linejoin="round">
    <g transform="translate(50 0)">${land}</g><g transform="translate(410 0)">${land}</g><g transform="translate(-310 0)">${land}</g></g>
    <circle cx="200" cy="200" r="150" fill="url(#en${id})"/></g>
  <path d="M95 120 A130 130 0 0 1 170 70" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".55"/>
  <circle cx="200" cy="200" r="150" fill="none" stroke="${INK}" stroke-width="12"/></svg>`;
}
function sunSVG() { let r = ''; for (let k = 0; k < 12; k++) r += `<line x1="150" y1="18" x2="150" y2="52" stroke="#ff9a2e" stroke-width="16" stroke-linecap="round" transform="rotate(${k * 30} 150 150)"/>`;
  return `<svg viewBox="0 0 300 300" style="overflow:visible;left:0;top:0;width:100%;height:100%">${r}<circle cx="150" cy="150" r="80" fill="#ffc83d" stroke="${INK}" stroke-width="10"/><path d="M110 120 A50 50 0 0 1 140 98" fill="none" stroke="#fff3b0" stroke-width="10" stroke-linecap="round"/></svg>`; }
function atomSVG() { return `<svg viewBox="0 0 100 100" style="overflow:visible;left:0;top:0;width:100%;height:100%">
  ${[0, 60, 120].map(a => `<ellipse cx="50" cy="50" rx="44" ry="16" fill="none" stroke="#b8ff3d" stroke-width="5" transform="rotate(${a} 50 50)"/>`).join('')}<circle cx="50" cy="50" r="10" fill="#ff3b5c" stroke="${INK}" stroke-width="3"/></svg>`; }
function pulseSVG() { return `<svg viewBox="0 0 440 80" style="overflow:visible;left:0;top:0;width:100%;height:100%"><path class="pl" pathLength="100" d="M0 40 H60 l12 -28 l14 56 l12 -28 H170 l12 -28 l14 56 l12 -28 H280 l12 -28 l14 56 l12 -28 H440" fill="none" stroke="#b8ff3d" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/></svg>`; }
function serverSVG(id) {
  const unit = y => `<rect x="30" y="${y}" width="270" height="110" rx="14" fill="#26392d" stroke="${INK}" stroke-width="8"/><rect x="55" y="${y + 40}" width="120" height="14" rx="7" fill="#0c1a12"/><rect x="55" y="${y + 64}" width="90" height="14" rx="7" fill="#0c1a12"/>
    <circle class="led" cx="250" cy="${y + 40}" r="10" fill="#b8ff3d"/><circle class="led" cx="250" cy="${y + 72}" r="10" fill="#b8ff3d"/>`;
  return `<svg viewBox="0 0 330 470" style="overflow:visible;left:0;top:0;width:100%;height:100%">
  <rect x="10" y="10" width="310" height="450" rx="26" fill="#3b5244" stroke="${INK}" stroke-width="10"/>${unit(40)}${unit(170)}${unit(300)}
  <g class="seyes"><circle cx="120" cy="105" r="22" fill="#fff" stroke="${INK}" stroke-width="6"/><circle cx="200" cy="105" r="22" fill="#fff" stroke="${INK}" stroke-width="6"/>
  <circle class="spup" cx="124" cy="108" r="9" fill="${INK}"/><circle class="spup" cx="204" cy="108" r="9" fill="${INK}"/></g></svg>`;
}
function phoneSVG() { return `<svg viewBox="0 0 360 640" style="overflow:visible;left:0;top:0;width:100%;height:100%"><rect x="6" y="6" width="348" height="628" rx="52" fill="#0c1a12" stroke="#f4ecd9" stroke-width="12"/><rect x="130" y="24" width="100" height="22" rx="11" fill="#26392d"/></svg>`; }
function gavelSVG() { return `<svg viewBox="0 0 300 300" style="overflow:visible;left:0;top:0;width:100%;height:100%">
  <rect x="140" y="110" width="26" height="180" rx="12" fill="#b07a45" stroke="${INK}" stroke-width="8" transform="rotate(-35 153 200)"/>
  <rect x="40" y="40" width="190" height="90" rx="22" fill="#8a5a2e" stroke="${INK}" stroke-width="10" transform="rotate(-35 135 85)"/>
  <rect x="40" y="58" width="190" height="20" fill="#c99358" transform="rotate(-35 135 85)"/></svg>`; }
function hourglassSVG() { return `<svg viewBox="0 0 220 320" style="overflow:visible;left:0;top:0;width:100%;height:100%">
  <defs><clipPath id="hgT"><path d="M40 40 L180 40 L110 160 Z"/></clipPath><clipPath id="hgB"><path d="M110 160 L180 280 L40 280 Z"/></clipPath></defs>
  <path d="M40 40 L180 40 L110 160 L180 280 L40 280 L110 160 Z" fill="#dff6ff" fill-opacity=".25" stroke="#f4ecd9" stroke-width="8" stroke-linejoin="round"/>
  <g clip-path="url(#hgT)"><rect class="sandT" x="30" y="40" width="160" height="120" fill="#ffc83d" style="transform-origin:110px 160px"/></g>
  <g clip-path="url(#hgB)"><rect class="sandB" x="30" y="160" width="160" height="120" fill="#ffc83d" style="transform-origin:110px 280px"/></g>
  <rect x="20" y="16" width="180" height="26" rx="10" fill="#b07a45" stroke="${INK}" stroke-width="8"/><rect x="20" y="278" width="180" height="26" rx="10" fill="#b07a45" stroke="${INK}" stroke-width="8"/></svg>`; }
function arrowRingSVG() { return `<svg viewBox="0 0 600 600" style="overflow:visible;left:0;top:0;width:100%;height:100%"><path class="ring" pathLength="100" d="M300 30 A270 270 0 1 1 52 190" fill="none" stroke="#ffc83d" stroke-width="12" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"/>
  <path class="ringhead" d="M30 230 L52 168 L96 214 Z" fill="#ffc83d" stroke="${INK}" stroke-width="5"/></svg>`; }
