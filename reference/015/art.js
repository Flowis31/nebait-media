// 015 «Бутылка воды за вопрос?» — art. Warm copper laboratory world, water in cyan.
const INK = '#1a0f0a';
const sv = (vb, inner, extra = '') => `<svg viewBox="${vb}" style="overflow:visible;left:0;top:0;width:100%;height:100%" ${extra}>${inner}</svg>`;

// Plastic water bottle, viewBox 0 0 300 640. .lvl = water (scaleY from the bottom, origin 150px 600px), .wv = wave on top of it
function bottleSVG(id, lvl = 1) {
  return sv('0 0 300 640', `
  <defs>
    <clipPath id="bc${id}"><path d="M112 40 L188 40 L188 92 Q250 130 252 200 L252 250 Q236 268 252 288 L252 360 Q236 378 252 398 L252 560 Q252 604 210 604 L90 604 Q48 604 48 560 L48 398 Q64 378 48 360 L48 288 Q64 268 48 250 L48 200 Q50 130 112 92 Z"/></clipPath>
    <linearGradient id="bw${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3cc4ff"/><stop offset=".45" stop-color="#8fe3ff"/><stop offset="1" stop-color="#1e8fe0"/></linearGradient>
    <linearGradient id="bg${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e9f8ff" stop-opacity=".55"/><stop offset=".5" stop-color="#ffffff" stop-opacity=".18"/><stop offset="1" stop-color="#bfe6ff" stop-opacity=".5"/></linearGradient>
  </defs>
  <g clip-path="url(#bc${id})">
    <rect x="0" y="0" width="300" height="640" fill="url(#bg${id})"/>
    <g class="lvl" style="transform-origin:150px 604px;transform:scaleY(${lvl})">
      <rect x="0" y="150" width="300" height="470" fill="url(#bw${id})"/>
      <path class="wv" d="M0 150 Q37 136 75 150 T150 150 T225 150 T300 150 L300 170 L0 170 Z" fill="#c9f2ff"/>
      <circle cx="110" cy="420" r="9" fill="#e8fbff" opacity=".7"/><circle cx="180" cy="500" r="6" fill="#e8fbff" opacity=".7"/><circle cx="140" cy="300" r="5" fill="#e8fbff" opacity=".6"/>
    </g>
  </g>
  <path d="M112 40 L188 40 L188 92 Q250 130 252 200 L252 250 Q236 268 252 288 L252 360 Q236 378 252 398 L252 560 Q252 604 210 604 L90 604 Q48 604 48 560 L48 398 Q64 378 48 360 L48 288 Q64 268 48 250 L48 200 Q50 130 112 92 Z" fill="none" stroke="${INK}" stroke-width="12" stroke-linejoin="round"/>
  <rect x="48" y="300" width="204" height="96" fill="#ff7a3d" stroke="${INK}" stroke-width="10"/>
  <path d="M70 348 Q100 320 130 348 T190 348 T230 340" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
  <rect x="100" y="4" width="100" height="46" rx="10" fill="#2f7de1" stroke="${INK}" stroke-width="10"/>
  <path d="M112 16 L112 40 M130 16 L130 40 M148 16 L148 40 M166 16 L166 40 M184 16 L184 40" stroke="#1b4f9a" stroke-width="5"/>
  <path d="M78 190 Q74 300 80 520" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".55"/>`);
}

// Chat bubble with a question mark, viewBox 0 0 220 180
function bubbleSVG(col = '#ffffff', txt = '?') {
  return sv('0 0 220 180', `<path d="M30 10 L190 10 Q210 10 210 30 L210 110 Q210 130 190 130 L90 130 L50 170 L58 130 L30 130 Q10 130 10 110 L10 30 Q10 10 30 10 Z" fill="${col}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
  <text x="110" y="104" text-anchor="middle" style="font:900 92px Unb" fill="${INK}">${txt}</text>`);
}

// Server rack, viewBox 0 0 260 560. .heat = red glow overlay, .led = lights
function rackSVG(id) {
  let units = '';
  for (let k = 0; k < 7; k++) {
    const y = 40 + k * 70;
    units += `<rect x="30" y="${y}" width="200" height="56" rx="8" fill="#3a3f4f" stroke="${INK}" stroke-width="6"/>
      <rect x="46" y="${y + 18}" width="110" height="8" rx="4" fill="#23262f"/><rect x="46" y="${y + 32}" width="110" height="8" rx="4" fill="#23262f"/>
      <circle class="led" cx="190" cy="${y + 28}" r="9" fill="#7dff8a"/><circle class="led" cx="212" cy="${y + 28}" r="6" fill="#4de1ff"/>`;
  }
  return sv('0 0 260 560', `<rect x="10" y="10" width="240" height="540" rx="18" fill="#232633" stroke="${INK}" stroke-width="12"/>${units}
  <rect class="heat" x="10" y="10" width="240" height="540" rx="18" fill="#ff4a1c" opacity="0"/>
  <path d="M26 30 L26 530" stroke="#fff" stroke-width="6" opacity=".18" stroke-linecap="round"/>`);
}

// Phone, viewBox 0 0 200 360
function phoneSVG() {
  return sv('0 0 200 360', `<rect x="10" y="10" width="180" height="340" rx="30" fill="#2b2e3a" stroke="${INK}" stroke-width="10"/>
  <rect x="24" y="40" width="152" height="270" rx="12" fill="#eaf4ff"/>
  <rect x="40" y="70" width="100" height="40" rx="18" fill="#c8d7ea"/><rect x="62" y="130" width="100" height="40" rx="18" fill="#7cc7ff"/>
  <rect x="40" y="190" width="80" height="40" rx="18" fill="#c8d7ea"/><rect x="36" y="262" width="128" height="32" rx="16" fill="#fff" stroke="#9fb3cc" stroke-width="4"/>
  <circle cx="100" cy="27" r="6" fill="#111"/>`);
}

// Measuring beaker, viewBox 0 0 240 300. .bw = water (scaleY from bottom), marks on the side
function beakerSVG(id) {
  return sv('0 0 240 300', `<defs><clipPath id="kc${id}"><path d="M40 30 L200 30 L200 260 Q200 286 174 286 L66 286 Q40 286 40 260 Z"/></clipPath>
  <linearGradient id="kw${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3cc4ff"/><stop offset=".5" stop-color="#9be8ff"/><stop offset="1" stop-color="#1e8fe0"/></linearGradient></defs>
  <g clip-path="url(#kc${id})"><rect x="0" y="0" width="240" height="300" fill="#ffffff" opacity=".22"/>
    <g class="bw" style="transform-origin:120px 286px;transform:scaleY(0)"><rect x="0" y="40" width="240" height="260" fill="url(#kw${id})"/></g></g>
  <path d="M26 30 L214 30 M40 30 L40 260 Q40 286 66 286 L174 286 Q200 286 200 260 L200 30" fill="none" stroke="${INK}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M200 80 L174 80 M200 130 L182 130 M200 180 L174 180 M200 230 L182 230" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
  <path d="M60 60 L60 250" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".55"/>`);
}

// Single water drop, viewBox 0 0 60 80
function dropSVG(col = '#5fd0ff') {
  return sv('0 0 60 80', `<path d="M30 4 Q54 40 54 52 A24 24 0 0 1 6 52 Q6 40 30 4 Z" fill="${col}" stroke="${INK}" stroke-width="6"/><ellipse cx="21" cy="50" rx="6" ry="9" fill="#fff" opacity=".7"/>`);
}

// Faucet, viewBox 0 0 360 260 (spout end at about 300,210)
function tapSVG() {
  return sv('0 0 360 260', `<rect x="0" y="70" width="60" height="110" rx="10" fill="#b9c3cf" stroke="${INK}" stroke-width="10"/>
  <path d="M50 100 L260 100 Q320 100 320 160 L320 200 L280 200 L280 165 Q280 140 255 140 L50 140 Z" fill="#d9e1ea" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
  <rect x="130" y="40" width="40" height="64" fill="#b9c3cf" stroke="${INK}" stroke-width="10"/>
  <g class="handle" style="transform-origin:150px 40px"><rect x="80" y="18" width="140" height="34" rx="17" fill="#ff5a3c" stroke="${INK}" stroke-width="10"/></g>
  <path d="M70 112 L250 112" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".7"/>`);
}

// Thermometer, viewBox 0 0 120 460. .mer = mercury column (scaleY from bottom)
function thermoSVG() {
  return sv('0 0 120 460', `<rect x="34" y="10" width="52" height="360" rx="26" fill="#fff" stroke="${INK}" stroke-width="10"/>
  <g class="mer" style="transform-origin:60px 380px;transform:scaleY(.25)"><rect x="48" y="40" width="24" height="340" rx="12" fill="#ff3b2c"/></g>
  <circle cx="60" cy="400" r="50" fill="#ff3b2c" stroke="${INK}" stroke-width="10"/><circle cx="46" cy="386" r="12" fill="#fff" opacity=".6"/>
  <path d="M86 80 L104 80 M86 140 L100 140 M86 200 L104 200 M86 260 L100 260" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`);
}

// Scientific paper, viewBox 0 0 320 400
function paperSVG() {
  let rows = ''; for (let k = 0; k < 7; k++) rows += `<rect x="36" y="${150 + k * 30}" width="${k % 3 === 2 ? 160 : 248}" height="12" rx="6" fill="#c9bfa8"/>`;
  return sv('0 0 320 400', `<path d="M14 14 L250 14 L306 70 L306 386 L14 386 Z" fill="#fbf5e6" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M250 14 L250 70 L306 70" fill="#e6dcc4" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
  <rect x="36" y="44" width="190" height="22" rx="8" fill="${INK}"/><rect x="36" y="82" width="140" height="16" rx="8" fill="#9a8e74"/>${rows}`);
}

// Toothbrush, viewBox 0 0 300 80
function brushSVG() {
  let br = ''; for (let k = 0; k < 7; k++) br += `<rect x="${200 + k * 12}" y="6" width="8" height="30" rx="3" fill="#e9fbff" stroke="${INK}" stroke-width="3"/>`;
  return sv('0 0 300 80', `${br}<rect x="0" y="34" width="290" height="30" rx="15" fill="#4de1ff" stroke="${INK}" stroke-width="8"/>`);
}

// Bucket, viewBox 0 0 260 240, .bkw = water
function bucketSVG(id) {
  return sv('0 0 260 240', `<defs><clipPath id="uc${id}"><path d="M30 60 L230 60 L208 226 L52 226 Z"/></clipPath></defs>
  <path d="M40 60 Q130 -30 220 60" fill="none" stroke="${INK}" stroke-width="9"/>
  <g clip-path="url(#uc${id})"><rect x="0" y="0" width="260" height="240" fill="#ffd27a"/><g class="bkw" style="transform-origin:130px 226px;transform:scaleY(0)"><rect x="0" y="62" width="260" height="180" fill="#3cb8ff"/></g></g>
  <path d="M30 60 L230 60 L208 226 L52 226 Z" fill="none" stroke="${INK}" stroke-width="11" stroke-linejoin="round"/>`);
}

// Magnifier, viewBox 0 0 260 260
function lensSVG() {
  return sv('0 0 260 260', `<path d="M160 160 L236 236" stroke="${INK}" stroke-width="36" stroke-linecap="round"/><path d="M160 160 L236 236" stroke="#8b5a2b" stroke-width="20" stroke-linecap="round"/>
  <circle cx="100" cy="100" r="80" fill="#cfefff" fill-opacity=".35" stroke="${INK}" stroke-width="16"/><path d="M58 76 A50 50 0 0 1 96 46" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/>`);
}

function bellSVG() {
  return sv('0 0 110 110', `<g class="bell" style="transform-origin:55px 14px"><path d="M55 10 Q86 12 88 52 L92 76 L18 76 L22 52 Q24 12 55 10 Z" fill="#ffe14d" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/><circle cx="55" cy="88" r="11" fill="#ffe14d" stroke="${INK}" stroke-width="7"/></g>`);
}

// Lab coat collar for the mascot? No: the mascot stays as is. Safety goggles strap instead — a small headband prop, viewBox 0 0 400 120
function gogglesSVG() {
  return sv('0 0 400 120', `<rect x="20" y="40" width="360" height="26" rx="13" fill="#ff7a3d" stroke="${INK}" stroke-width="8"/>`);
}
