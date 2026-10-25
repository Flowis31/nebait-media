// 012 «QR-код с дыркой всё равно работает» — art. Every function returns an SVG string; ids get a suffix.
const INK = '#0a130d';
const sv = (vb, body, extra = '') => `<svg viewBox="${vb}" style="overflow:visible;left:0;top:0;width:100%;height:100%" ${extra}>${body}</svg>`;

// QR code card, version-1 look (21x21 modules), drawn pattern (illustration, it encodes nothing). viewBox 0 0 600 600, module 24 px, origin 48.
//  rect.md every dark module, data-d = row+col (for fill waves), data-r / data-c
//  .q4     modules of the bottom-right quarter (rows 11-20, cols 11-20)      .q6  the small corner chunk (rows 15-20, cols 15-20)
//  .fp0 .fp1 .fp2  the three corner squares (top-left, top-right, bottom-left), each with its own transform-origin
//  o.hole: the centre 7x7 is cut out of the card (see-through) and gets a dashed edge (.qhl)
const QU = 24, QO = 48;
function qrDark(r, c) {
  if (r === 6 || c === 6) return (r + c) % 2 === 0;                    // timing lines
  const h = hash(r * 31.7 + c * 7.3 + 1.9); return h > 0.5;
}
function qrSVG(id, o = {}) {
  const inFinder = (r, c) => (r < 8 && c < 8) || (r < 8 && c > 12) || (r > 12 && c < 8);
  const inHole = (r, c) => o.hole && r >= 7 && r <= 13 && c >= 7 && c <= 13;
  let mods = '';
  for (let r = 0; r < 21; r++) for (let c = 0; c < 21; c++) {
    if (inFinder(r, c) || inHole(r, c) || !qrDark(r, c)) continue;
    const cls = 'md' + (r >= 11 && c >= 11 ? ' q4' : '') + (r >= 15 && c >= 15 ? ' q6' : '');
    mods += `<rect class="${cls}" data-d="${r + c}" data-r="${r}" data-c="${c}" x="${QO + c * QU + 1}" y="${QO + r * QU + 1}" width="${QU - 2}" height="${QU - 2}" rx="4" fill="${INK}"/>`;
  }
  const fp = (k, r, c) => { const x = QO + c * QU, y = QO + r * QU, cx = x + 3.5 * QU, cy = y + 3.5 * QU;
    return `<g class="fp fp${k}" style="transform-origin:${cx}px ${cy}px">
      <rect x="${x + 12}" y="${y + 12}" width="${7 * QU - 24}" height="${7 * QU - 24}" rx="14" fill="none" stroke="${INK}" stroke-width="24"/>
      <rect x="${x + 2 * QU}" y="${y + 2 * QU}" width="${3 * QU}" height="${3 * QU}" rx="10" fill="${INK}"/>
      <rect class="fpg" x="${x - 6}" y="${y - 6}" width="${7 * QU + 12}" height="${7 * QU + 12}" rx="22" fill="none" stroke="#b8ff3d" stroke-width="10" opacity="0"/></g>`; };
  const hx = QO + 7 * QU, hs = 7 * QU;
  const paper = o.hole
    ? `<path d="M10 40 Q10 10 40 10 L560 10 Q590 10 590 40 L590 560 Q590 590 560 590 L40 590 Q10 590 10 560 Z M${hx} ${hx + 18} Q${hx} ${hx} ${hx + 18} ${hx} L${hx + hs - 18} ${hx} Q${hx + hs} ${hx} ${hx + hs} ${hx + 18} L${hx + hs} ${hx + hs - 18} Q${hx + hs} ${hx + hs} ${hx + hs - 18} ${hx + hs} L${hx + 18} ${hx + hs} Q${hx} ${hx + hs} ${hx} ${hx + hs - 18} Z" fill="url(#qp${id})" fill-rule="evenodd" stroke="${INK}" stroke-width="10"/>
       <rect class="qhl" style="transform-box:fill-box;transform-origin:center" x="${hx - 8}" y="${hx - 8}" width="${hs + 16}" height="${hs + 16}" rx="24" fill="none" stroke="#ff3b5c" stroke-width="6" stroke-dasharray="18 12"/>`
    : `<rect x="10" y="10" width="580" height="580" rx="30" fill="url(#qp${id})" stroke="${INK}" stroke-width="10"/>`;
  return sv('0 0 600 600', `<defs><linearGradient id="qp${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#e6dcc4"/></linearGradient></defs>
    ${paper}<g class="mods">${mods}</g>${fp(0, 0, 0)}${fp(1, 0, 14)}${fp(2, 14, 0)}
    <path d="M40 40 L200 40" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".6"/>`);
}

// Generic cat face (original drawing). viewBox 0 0 200 200. .cEye eyes (sy for blink), .cMouth
function catSVG(id) {
  return sv('0 0 200 200', `<defs><radialGradient id="ct${id}" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="#ffd08a"/><stop offset=".6" stop-color="#ff9f3d"/><stop offset="1" stop-color="#d9731c"/></radialGradient></defs>
    <path d="M38 78 L30 14 L82 46 Q100 40 118 46 L170 14 L162 78 Q182 104 172 136 Q156 182 100 184 Q44 182 28 136 Q18 104 38 78 Z" fill="url(#ct${id})" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
    <path d="M42 30 L70 50 L46 64 Z" fill="#ffb7a8"/><path d="M158 30 L130 50 L154 64 Z" fill="#ffb7a8"/>
    <path d="M86 52 L92 76 M100 50 L100 76 M114 52 L108 76" stroke="#c45f10" stroke-width="7" stroke-linecap="round"/>
    <g class="cEye" style="transform-origin:100px 108px"><ellipse cx="70" cy="108" rx="16" ry="20" fill="${INK}"/><ellipse cx="130" cy="108" rx="16" ry="20" fill="${INK}"/>
      <circle cx="76" cy="100" r="6" fill="#fff"/><circle cx="136" cy="100" r="6" fill="#fff"/></g>
    <path d="M92 132 L108 132 L100 142 Z" fill="#ff6f8a" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path class="cMouth" style="transform-box:fill-box;transform-origin:center top" d="M100 142 Q92 156 80 150 M100 142 Q108 156 120 150" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <path d="M60 140 L14 132 M60 150 L16 158 M140 140 L186 132 M140 150 L184 158" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`);
}

// Phone (no brand). viewBox 0 0 300 560. .scan laser line, .ok green check, .bad red cross, .lnk link pill on the screen, .scrq mini QR on screen
function phoneSVG(id) {
  return sv('0 0 300 560', `<defs><linearGradient id="ph${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a4a66"/><stop offset="1" stop-color="#1b2335"/></linearGradient>
      <linearGradient id="ps${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d3b2a"/><stop offset="1" stop-color="#0d1c14"/></linearGradient></defs>
    <rect x="8" y="8" width="284" height="544" rx="48" fill="url(#ph${id})" stroke="${INK}" stroke-width="10"/>
    <rect x="28" y="44" width="244" height="472" rx="28" fill="url(#ps${id})" stroke="${INK}" stroke-width="6"/>
    <rect x="118" y="20" width="64" height="14" rx="7" fill="${INK}"/>
    <path d="M60 130 L60 100 L90 100 M210 100 L240 100 L240 130 M240 380 L240 410 L210 410 M90 410 L60 410 L60 380" fill="none" stroke="#f4ecd9" stroke-width="8" stroke-linecap="round" opacity=".85"/>
    <g class="scrq" style="transform-origin:150px 255px"><rect x="90" y="195" width="120" height="120" rx="10" fill="#f4ecd9"/>
      <rect x="100" y="205" width="34" height="34" rx="6" fill="none" stroke="${INK}" stroke-width="8"/><rect x="166" y="205" width="34" height="34" rx="6" fill="none" stroke="${INK}" stroke-width="8"/>
      <rect x="100" y="271" width="34" height="34" rx="6" fill="none" stroke="${INK}" stroke-width="8"/>
      <rect x="146" y="250" width="12" height="12" fill="${INK}"/><rect x="170" y="262" width="12" height="12" fill="${INK}"/><rect x="186" y="286" width="12" height="12" fill="${INK}"/><rect x="146" y="290" width="12" height="12" fill="${INK}"/></g>
    <rect class="scan" x="44" y="250" width="212" height="10" rx="5" fill="#ff3b5c" style="filter:drop-shadow(0 0 10px #ff3b5c)"/>
    <g class="ok" style="transform-origin:150px 255px"><circle cx="150" cy="255" r="74" fill="#b8ff3d" stroke="${INK}" stroke-width="10"/><path d="M112 258 L140 286 L192 226" fill="none" stroke="${INK}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/></g>
    <g class="bad" style="transform-origin:150px 255px"><circle cx="150" cy="255" r="74" fill="#ff3b5c" stroke="${INK}" stroke-width="10"/><path d="M118 223 L182 287 M182 223 L118 287" stroke="${INK}" stroke-width="18" stroke-linecap="round"/></g>
    <g class="lnk" style="transform-origin:150px 440px"><rect x="44" y="410" width="212" height="60" rx="30" fill="#f4ecd9" stroke="${INK}" stroke-width="6"/>
      <g transform="translate(62 420) scale(.4)">${chainInner()}</g><rect x="128" y="432" width="104" height="16" rx="8" fill="#5b8cff"/></g>`);
}
function chainInner() {
  return `<rect x="6" y="20" width="62" height="40" rx="20" fill="none" stroke="${INK}" stroke-width="14"/><rect x="42" y="20" width="62" height="40" rx="20" fill="none" stroke="#5b8cff" stroke-width="14"/>`;
}
// Link pill "ссылка" split into 4 coloured pieces (.lp0..3). viewBox 0 0 640 140
const LPC = ['#ff3b5c', '#ffb03d', '#3dd6ff', '#c58bff'];
function linkSVG() {
  let p = '';
  for (let k = 0; k < 4; k++) p += `<g class="lp lp${k}" style="transform-origin:${190 + k * 110}px 70px"><rect x="${140 + k * 110}" y="38" width="100" height="64" rx="16" fill="${LPC[k]}" stroke="${INK}" stroke-width="7"/>
    <rect x="${156 + k * 110}" y="62" width="${40 + (k * 17) % 30}" height="14" rx="7" fill="${INK}" opacity=".55"/></g>`;
  return sv('0 0 640 140', `<rect x="6" y="6" width="628" height="128" rx="64" fill="#f4ecd9" stroke="${INK}" stroke-width="10"/>
    <g transform="translate(26 30) scale(.8)">${chainInner()}</g>${p}`);
}
// Scissors. viewBox 0 0 320 200, pivot (170,100). .bA .bB blades
function scissorsSVG() {
  const blade = (cls, flip) => `<g class="${cls}" style="transform-origin:170px 100px"><g transform="${flip ? 'scale(1,-1) translate(0,-200)' : ''}">
    <path d="M170 100 L312 82 Q318 92 306 98 L170 112 Z" fill="#dfe8ee" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M170 104 L300 92" stroke="#fff" stroke-width="4" opacity=".7"/>
    <path d="M170 104 L104 132" stroke="${INK}" stroke-width="20" stroke-linecap="round"/>
    <ellipse cx="72" cy="146" rx="46" ry="34" fill="none" stroke="${INK}" stroke-width="22"/><ellipse cx="72" cy="146" rx="46" ry="34" fill="none" stroke="${flip ? '#ff3b5c' : '#ffb03d'}" stroke-width="12"/></g></g>`;
  return sv('0 0 320 200', blade('bA', false) + blade('bB', true) + `<circle cx="170" cy="100" r="11" fill="#8fa698" stroke="${INK}" stroke-width="6"/>`);
}
// Mug of coffee. viewBox 0 0 240 240. .steam
function mugSVG(id) {
  return sv('0 0 240 240', `<defs><linearGradient id="mg${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff6a84"/><stop offset="1" stop-color="#c8243f"/></linearGradient></defs>
    <path class="steam" d="M80 50 Q66 30 82 14 M120 46 Q106 26 122 8" fill="none" stroke="#f4ecd9" stroke-width="8" stroke-linecap="round" opacity=".6"/>
    <path d="M176 100 Q228 100 224 140 Q220 178 172 176" fill="none" stroke="${INK}" stroke-width="26"/><path d="M176 100 Q228 100 224 140 Q220 178 172 176" fill="none" stroke="#c8243f" stroke-width="12"/>
    <path d="M30 70 L190 70 L176 214 Q174 230 156 230 L64 230 Q46 230 44 214 Z" fill="url(#mg${id})" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
    <ellipse cx="110" cy="72" rx="80" ry="16" fill="#5a3216" stroke="${INK}" stroke-width="8"/>
    <path d="M56 100 Q58 170 70 206" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".35"/>`);
}
// Coffee stain, blobby. viewBox 0 0 300 300
function stainSVG(k = 0) {
  let d = '';
  for (let i = 0; i <= 24; i++) { const a = i / 24 * Math.PI * 2, r = 120 + 26 * Math.sin(a * 5 + k) + 14 * Math.sin(a * 9 + 2 * k); d += (i ? 'L' : 'M') + (150 + r * Math.cos(a)).toFixed(1) + ' ' + (150 + r * Math.sin(a)).toFixed(1); }
  return sv('0 0 300 300', `<path d="${d}Z" fill="#7a4520" opacity=".86"/><path d="${d}Z" fill="none" stroke="#4e2a10" stroke-width="10" opacity=".7" transform="translate(150 150) scale(.93) translate(-150 -150)"/>
    <ellipse cx="110" cy="110" rx="30" ry="16" fill="#a8693a" opacity=".6"/>`);
}
// Receipt (no text, grey bars). viewBox 0 0 460 760, QR area at (80,330) 300x300 is left free
function receiptSVG() {
  let bars = '', zz = 'M10 0 L450 0 L450 720';
  for (let k = 0; k < 11; k++) zz += ` L${450 - (k * 2 + 1) * 20} 750 L${450 - (k * 2 + 2) * 20} 720`;
  zz += ' L10 720 Z';
  [[60, 300], [110, 220], [150, 260], [190, 180], [240, 300]].forEach(([y, w], i) => bars += `<rect x="${i === 0 ? 80 : 60}" y="${y}" width="${w}" height="${i === 0 ? 26 : 16}" rx="8" fill="${i === 0 ? '#3b5244' : '#b9b09a'}"/><rect x="${330}" y="${y}" width="70" height="16" rx="8" fill="#b9b09a" opacity="${i ? 1 : 0}"/>`);
  return sv('0 0 460 760', `<path d="${zz}" fill="#fffaf0" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>${bars}
    <path d="M60 290 L400 290" stroke="#b9b09a" stroke-width="5" stroke-dasharray="14 10"/>`);
}
// Eraser. viewBox 0 0 240 130
function eraserSVG() {
  return sv('0 0 240 130', `<g transform="rotate(-12 120 65)"><rect x="20" y="30" width="200" height="74" rx="16" fill="#ff8fb0" stroke="${INK}" stroke-width="9"/>
    <rect x="120" y="30" width="100" height="74" rx="0" fill="#5b8cff" stroke="${INK}" stroke-width="9"/><path d="M40 48 L110 48" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".5"/></g>`);
}
// Light bulb. viewBox 0 0 160 220
function bulbSVG() {
  return sv('0 0 160 220', `<path d="M80 10 Q148 12 148 80 Q148 118 112 144 L112 168 L48 168 L48 144 Q12 118 12 80 Q12 12 80 10 Z" fill="#ffe14d" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
    <path d="M50 70 Q54 40 82 34" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".7"/>
    <rect x="46" y="170" width="68" height="20" rx="8" fill="#8fa698" stroke="${INK}" stroke-width="7"/><rect x="54" y="190" width="52" height="18" rx="8" fill="#8fa698" stroke="${INK}" stroke-width="7"/>`);
}
// Upside-down arrow (round). viewBox 0 0 200 200
function spinSVG() {
  return sv('0 0 200 200', `<path d="M40 100 A60 60 0 1 1 100 160" fill="none" stroke="#b8ff3d" stroke-width="16" stroke-linecap="round"/><path d="M70 150 L104 162 L92 128" fill="none" stroke="#b8ff3d" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>`);
}
