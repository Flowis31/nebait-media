// 014 art: earbud (talking narrator), bus, city layers, ear cut-away, neighbour's speaker, megaphone, noise meter, bell.
const INK = '#0a130d';
const sv = (vb, body, extra = '') => `<svg viewBox="${vb}" style="overflow:visible;left:0;top:0;width:100%;height:100%" ${extra}>${body}</svg>`;

// Earbud: head with a face, silicone tip on the left, stem down-right. Parts: .ebEye .ebMouth .ebBrow .mic1 (outer mic) .spk (sound exit)
function earbudSVG(id, face = true) {
  return sv('0 0 400 400', `<defs>
    <radialGradient id="ebg${id}" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#eceaf4"/><stop offset="1" stop-color="#bdb8d4"/></radialGradient>
    <linearGradient id="ebs${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c9c4de"/></linearGradient>
    <radialGradient id="ebt${id}" cx="40%" cy="40%" r="70%"><stop offset="0" stop-color="#e9e6f2"/><stop offset="1" stop-color="#9f99b8"/></radialGradient></defs>
    <path d="M232 208 L300 372 Q306 392 286 396 L262 398 Q244 400 238 382 L186 236 Z" fill="url(#ebs${id})" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <rect class="mic2" x="262" y="356" width="26" height="12" rx="6" fill="#26213d" transform="rotate(-21 275 362)"/>
    <ellipse cx="74" cy="168" rx="58" ry="66" fill="url(#ebt${id})" stroke="${INK}" stroke-width="10"/>
    <ellipse class="spk" cx="40" cy="168" rx="18" ry="30" fill="#3a3456" stroke="${INK}" stroke-width="6"/>
    <ellipse cx="200" cy="160" rx="132" ry="118" fill="url(#ebg${id})" stroke="${INK}" stroke-width="11"/>
    <path d="M110 92 Q150 58 208 56" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".9"/>
    <g class="mic1" style="transform-origin:262px 66px"><ellipse cx="262" cy="66" rx="30" ry="15" fill="#2b2547" stroke="${INK}" stroke-width="6"/>
      ${[-14, -5, 4, 13].map(x => `<circle cx="${262 + x}" cy="66" r="3" fill="#8f86c4"/>`).join('')}</g>
    ${face ? `<g class="ebFace">
      <g class="ebEye" style="transform-origin:200px 150px"><ellipse cx="166" cy="150" rx="17" ry="23" fill="${INK}"/><ellipse cx="240" cy="150" rx="17" ry="23" fill="${INK}"/>
      <circle cx="172" cy="141" r="6" fill="#fff"/><circle cx="246" cy="141" r="6" fill="#fff"/></g>
      <path class="ebBrow" style="transform-origin:203px 112px" d="M146 116 Q166 104 184 112 M222 112 Q240 104 260 116" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
      <g class="ebMouth" style="transform-origin:203px 204px"><path d="M176 196 Q203 226 230 196 Z" fill="#ff5f8f" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/></g>
      <ellipse cx="136" cy="190" rx="16" ry="9" fill="#ff8ab0" opacity=".45"/><ellipse cx="270" cy="190" rx="16" ry="9" fill="#ff8ab0" opacity=".45"/></g>` : ''}`);
}

function busSVG(id) {
  const win = [70, 170, 270, 370, 470].map(x => `<rect x="${x}" y="58" width="78" height="66" rx="10" fill="#ffe9a3" stroke="${INK}" stroke-width="7"/>`).join('');
  const wheel = cx => `<g class="wheel" style="transform-origin:${cx}px 250px"><circle cx="${cx}" cy="250" r="44" fill="#26213d" stroke="${INK}" stroke-width="9"/><circle cx="${cx}" cy="250" r="16" fill="#b9b3d6"/><path d="M${cx - 30} 250 L${cx + 30} 250 M${cx} 220 L${cx} 280" stroke="#6d6690" stroke-width="7"/></g>`;
  return sv('0 0 700 300', `<defs><linearGradient id="bus${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb84d"/><stop offset="1" stop-color="#ff7a3d"/></linearGradient></defs>
    <rect x="20" y="30" width="660" height="210" rx="40" fill="url(#bus${id})" stroke="${INK}" stroke-width="10"/>
    ${win}<rect x="590" y="58" width="70" height="130" rx="12" fill="#bfe8ff" stroke="${INK}" stroke-width="7"/>
    <rect x="20" y="150" width="660" height="20" fill="#e85a2a" stroke="${INK}" stroke-width="6"/>
    <circle cx="666" cy="210" r="14" fill="#fff6c8" stroke="${INK}" stroke-width="6"/>
    <path d="M10 214 L-30 222" stroke="#8f86c4" stroke-width="12" stroke-linecap="round"/>
    ${wheel(150)}${wheel(540)}`);
}

// Ear cut-away: head side, ear, canal; earbud sits in the canal. .canal .inMic .eardrum
function earSVG() {
  return sv('0 0 900 700', `<defs><radialGradient id="skin" cx="40%" cy="35%" r="80%"><stop offset="0" stop-color="#ffd2b8"/><stop offset="1" stop-color="#e99a7c"/></radialGradient></defs>
    <path d="M900 40 L520 40 Q300 60 290 300 Q280 520 520 660 L900 660 Z" fill="url(#skin)" stroke="${INK}" stroke-width="12" stroke-linejoin="round"/>
    <path d="M520 120 Q330 130 330 300 Q330 470 470 520 Q520 530 520 470 Q430 430 440 320 Q450 220 540 210 Z" fill="#f6b597" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <path class="canal" d="M470 330 L760 330 Q800 330 800 370 L800 380 Q800 420 760 420 L470 420 Z" fill="#7a2f3b" stroke="${INK}" stroke-width="10"/>
    <ellipse class="eardrum" cx="806" cy="375" rx="16" ry="58" fill="#ffd9c9" stroke="${INK}" stroke-width="8"/>`);
}
function speakerSVG(id) {
  const cone = (cy, r) => `<g class="cone" style="transform-origin:150px ${cy}px"><circle cx="150" cy="${cy}" r="${r}" fill="#2b2547" stroke="${INK}" stroke-width="9"/><circle cx="150" cy="${cy}" r="${r * 0.45}" fill="#58508a" stroke="${INK}" stroke-width="7"/><circle cx="150" cy="${cy}" r="${r * 0.15}" fill="#b9b3d6"/></g>`;
  return sv('0 0 300 440', `<rect x="10" y="10" width="280" height="420" rx="30" fill="#4a416f" stroke="${INK}" stroke-width="10"/>${cone(120, 72)}${cone(310, 100)}`);
}
function megaphoneSVG() {
  return sv('0 0 300 200', `<path d="M40 70 L200 10 L200 190 L40 130 Z" fill="#ff5f8f" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <rect x="10" y="60" width="44" height="80" rx="12" fill="#ffe14d" stroke="${INK}" stroke-width="9"/>
    <ellipse cx="200" cy="100" rx="22" ry="90" fill="#ffd0de" stroke="${INK}" stroke-width="9"/><path d="M90 130 L110 190" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>`);
}
function meterSVG() {
  const ticks = []; for (let k = 0; k <= 10; k++) { const a = Math.PI * (1 - k / 10); ticks.push(`<path d="M${200 + 150 * Math.cos(a)} ${210 - 150 * Math.sin(a)} L${200 + 172 * Math.cos(a)} ${210 - 172 * Math.sin(a)}" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`); }
  return sv('0 0 400 260', `<path d="M20 220 A180 180 0 0 1 380 220 Z" fill="#f4ecd9" stroke="${INK}" stroke-width="10"/>
    <path d="M44 210 A156 156 0 0 1 200 54" fill="none" stroke="#5fd17a" stroke-width="22"/><path d="M200 54 A156 156 0 0 1 310 100" fill="none" stroke="#ffd23d" stroke-width="22"/><path d="M310 100 A156 156 0 0 1 356 210" fill="none" stroke="#ff3b5c" stroke-width="22"/>
    ${ticks.join('')}<g class="needle" style="transform-origin:200px 210px"><path d="M200 210 L200 70" stroke="${INK}" stroke-width="12" stroke-linecap="round"/></g><circle cx="200" cy="210" r="20" fill="${INK}"/>`);
}
function bellSVG() {
  return sv('0 0 120 120', `<g class="bell" style="transform-origin:60px 14px"><path d="M60 14 Q92 14 92 54 L92 78 L104 92 L16 92 L28 78 L28 54 Q28 14 60 14 Z" fill="#ffe14d" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/><circle cx="60" cy="102" r="12" fill="#ffe14d" stroke="${INK}" stroke-width="7"/></g>`);
}
// sine path across [x0,x1] around y0, amplitude a, `hills` full periods, phase ph (radians). Used per frame for living waves.
function wavePath(x0, x1, y0, a, hills, ph = 0, n = 90) {
  let d = '';
  for (let i = 0; i <= n; i++) { const u = i / n, x = x0 + (x1 - x0) * u, y = y0 - a * Math.sin(2 * Math.PI * hills * u + ph); d += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); }
  return d;
}
