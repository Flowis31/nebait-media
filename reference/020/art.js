// 020 art: one-off pieces for «Пароль от базы спрятали в приложении» — night street by a burger diner (world), app icon, code panel,
// data cards, database, newspaper, band-aid patch. Recurring props (talking key, safe, burger box, door, padlock, person, bot, phone,
// laptop, magnifier, mask) live in tools/props.js.
const AK = '#0a130d';
const sv = (vb, inner) => `<svg viewBox="${vb}" style="overflow:visible;left:0;top:0;width:100%;height:100%">${inner}</svg>`;
const h3 = (k, s) => hash(k * 1.37 + s * 7.11);

// far layer: night skyline with lit windows, viewBox 0 0 2400 700
function skylineSVG() {
  let b = '';
  for (let i = 0; i < 26; i++) {
    const w = 70 + 80 * h3(i, 1), x = i * 95 - 20, hgt = 220 + 380 * h3(i, 2), y = 700 - hgt;
    b += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${hgt.toFixed(0)}" fill="${i % 2 ? '#3a1d3e' : '#2f1834'}"/>`;
    for (let r = 0; r < hgt / 46 - 1; r++) for (let c = 0; c < w / 30 - 1; c++) if (h3(i * 31 + r * 7 + c, 3) > 0.62)
      b += `<rect x="${(x + 12 + c * 28).toFixed(0)}" y="${(y + 18 + r * 46).toFixed(0)}" width="14" height="20" rx="2" fill="${h3(r + c, i) > 0.5 ? '#ffcf6b' : '#ff9a5c'}" opacity="${(0.55 + 0.4 * h3(r, c + i)).toFixed(2)}"/>`;
  }
  return sv('0 0 2400 700', `<circle cx="1800" cy="120" r="70" fill="#ffe9c2" opacity=".9"/><circle cx="1780" cy="105" r="70" fill="#2b1424" opacity=".0"/>${b}`);
}
// mid layer: the diner facade, viewBox 0 0 3400 1300: brick wall, warm windows, striped awnings, a neon burger sign
function dinerSVG() {
  let s = `<defs><linearGradient id="dw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a2a2e"/><stop offset="1" stop-color="#3b1720"/></linearGradient>
   <linearGradient id="dwin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd58a"/><stop offset="1" stop-color="#ff9a4d"/></linearGradient></defs>
   <rect x="0" y="260" width="3400" height="1040" fill="url(#dw)"/>`;
  for (let r = 0; r < 26; r++) for (let c = 0; c < 44; c++) if (h3(r * 50 + c, 9) > 0.55) s += `<rect x="${c * 80 + (r % 2) * 40}" y="${270 + r * 40}" width="72" height="32" rx="4" fill="#7a3236" opacity=".45"/>`;
  for (let k = 0; k < 5; k++) {
    const x = 120 + k * 700;
    s += `<rect x="${x}" y="520" width="440" height="420" rx="18" fill="url(#dwin)" stroke="${AK}" stroke-width="14" opacity=".85"/>
     <path d="M${x + 220} 520 L${x + 220} 940" stroke="${AK}" stroke-width="10" opacity=".6"/>
     <path d="M${x - 30} 520 L${x + 470} 520 L${x + 440} 430 L${x} 430 Z" fill="#ff4d5e" stroke="${AK}" stroke-width="10" stroke-linejoin="round"/>`;
    for (let j = 0; j < 6; j++) s += `<path d="M${x + j * 80 - 10} 520 L${x + j * 80 + 30} 430" stroke="#fff3e0" stroke-width="26" opacity=".85"/>`;
    s += `<circle cx="${x + 120}" cy="790" r="34" fill="#c45a20" opacity=".45"/><circle cx="${x + 320}" cy="800" r="40" fill="#c45a20" opacity=".4"/>`;
  }
  for (let k = 0; k < 3; k++) { const x = 400 + k * 1200;
    s += `<g opacity=".95"><path d="M${x} 360 Q${x + 90} 290 ${x + 180} 360 Z" fill="none" stroke="#ffb84d" stroke-width="12"/><path d="M${x - 6} 378 L${x + 186} 378" stroke="#7dff8a" stroke-width="10" stroke-linecap="round"/>
      <path d="M${x} 398 L${x + 180} 398 Q${x + 170} 420 ${x + 90} 420 Q${x + 10} 420 ${x} 398" fill="none" stroke="#ff6a4d" stroke-width="12"/></g>`; }
  return sv('0 0 3400 1300', s);
}
// near layer: street lamps and a curb, viewBox 0 0 3400 1300
function streetSVG() {
  let s = '';
  for (let k = 0; k < 4; k++) { const x = 200 + k * 950;
    s += `<rect x="${x}" y="120" width="26" height="1180" fill="#1a0c14"/><path d="M${x + 13} 130 Q${x + 13} 80 ${x + 90} 84" fill="none" stroke="#1a0c14" stroke-width="22"/>
      <ellipse cx="${x + 110}" cy="96" rx="44" ry="20" fill="#1a0c14"/><ellipse cx="${x + 110}" cy="110" rx="30" ry="10" fill="#ffe6a8"/>`; }
  return sv('0 0 3400 1300', s);
}
// app icon: red rounded square with a burger, viewBox 0 0 200 200
function appIconSVG(id) {
  return sv('0 0 200 200', `<defs><linearGradient id="ai${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7a6a"/><stop offset="1" stop-color="#d9263c"/></linearGradient></defs>
   <rect x="10" y="10" width="180" height="180" rx="46" fill="url(#ai${id})" stroke="${AK}" stroke-width="10"/>
   <path d="M50 94 Q100 34 150 94 Z" fill="#ffb24d" stroke="${AK}" stroke-width="8" stroke-linejoin="round"/><circle cx="84" cy="74" r="4" fill="#fff3d0"/><circle cx="108" cy="66" r="4" fill="#fff3d0"/><circle cx="122" cy="80" r="4" fill="#fff3d0"/>
   <rect x="44" y="98" width="112" height="14" rx="7" fill="#7dd33a" stroke="${AK}" stroke-width="6"/><rect x="46" y="114" width="108" height="20" rx="10" fill="#8a4a20" stroke="${AK}" stroke-width="7"/>
   <path d="M50 138 L150 138 Q146 160 100 160 Q54 160 50 138 Z" fill="#ffb24d" stroke="${AK}" stroke-width="8" stroke-linejoin="round"/>
   <path d="M30 60 Q36 30 70 26" fill="none" stroke="#fff" stroke-width="8" opacity=".45" stroke-linecap="round"/>`);
}
// phone screen content for phonePropSVG: an app with menu cards (screen rect 22..198 x 44..374)
function appScreen(id) {
  return `<rect x="22" y="44" width="176" height="64" fill="#ff4d5e"/><circle cx="54" cy="76" r="18" fill="#fff3e0"/><rect x="82" y="66" width="90" height="20" rx="10" fill="#fff3e0"/>
   <rect x="36" y="124" width="148" height="70" rx="14" fill="#fff" stroke="#d9c7b0" stroke-width="4"/><circle cx="68" cy="159" r="20" fill="#ffb24d"/><rect x="98" y="146" width="70" height="12" rx="6" fill="#c9b49a"/><rect x="98" y="166" width="50" height="12" rx="6" fill="#e0d2c0"/>
   <rect x="36" y="206" width="148" height="70" rx="14" fill="#fff" stroke="#d9c7b0" stroke-width="4"/><circle cx="68" cy="241" r="20" fill="#7dd33a"/><rect x="98" y="228" width="70" height="12" rx="6" fill="#c9b49a"/><rect x="98" y="248" width="50" height="12" rx="6" fill="#e0d2c0"/>
   <rect x="36" y="290" width="148" height="56" rx="28" fill="#ff4d5e"/><rect x="70" y="310" width="80" height="16" rx="8" fill="#fff"/>`;
}
// database cylinder of customers, viewBox 0 0 300 340 (three discs, little people on the front)
function dbSVG(id) {
  let d = ''; for (let k = 0; k < 3; k++) { const y = 60 + k * 90;
    d += `<path d="M30 ${y} L30 ${y + 80} Q150 ${y + 130} 270 ${y + 80} L270 ${y} Z" fill="url(#db${id})" stroke="${AK}" stroke-width="10" stroke-linejoin="round"/>`;
    for (let j = 0; j < 4; j++) { const x = 72 + j * 52; d += `<circle cx="${x}" cy="${y + 40 + (j % 3 === 0 ? 4 : 10)}" r="11" fill="#fff3e0"/><path d="M${x - 16} ${y + 76 + (j % 3 === 0 ? 4 : 10)} Q${x} ${y + 50} ${x + 16} ${y + 76 + (j % 3 === 0 ? 4 : 10)}" fill="#fff3e0"/>`; } }
  return sv('0 0 300 340', `<defs><linearGradient id="db${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5fc8ff"/><stop offset=".5" stop-color="#9fe2ff"/><stop offset="1" stop-color="#3a8fd0"/></linearGradient></defs>
   ${d}<ellipse cx="150" cy="60" rx="120" ry="40" fill="#c9f0ff" stroke="${AK}" stroke-width="10"/>`);
}
// data cards that fly out of the safe: name, phone, birthday, viewBox 0 0 240 180
function dataCard(id, kind) {
  const ic = kind === 'name' ? `<circle cx="70" cy="74" r="26" fill="#ffcf9a" stroke="${AK}" stroke-width="7"/><path d="M30 140 Q70 92 110 140 Z" fill="#5f8cff" stroke="${AK}" stroke-width="7" stroke-linejoin="round"/>`
    : kind === 'phone' ? `<path d="M44 52 Q40 44 50 40 L68 36 L80 70 L66 80 Q74 104 96 118 L108 104 L138 120 L132 140 Q128 150 118 148 Q50 132 44 52 Z" fill="#7dd33a" stroke="${AK}" stroke-width="7" stroke-linejoin="round" transform="translate(-6 0)"/>`
    : `<rect x="36" y="90" width="96" height="50" rx="10" fill="#ff8fb4" stroke="${AK}" stroke-width="7"/><rect x="46" y="70" width="76" height="26" rx="8" fill="#ffd1e0" stroke="${AK}" stroke-width="6"/><path d="M84 70 L84 46" stroke="${AK}" stroke-width="7"/><path d="M84 30 Q94 40 84 48 Q74 40 84 30 Z" fill="#ffd34d" stroke="${AK}" stroke-width="5"/>`;
  return sv('0 0 240 180', `<rect x="8" y="8" width="224" height="164" rx="24" fill="#fff8ec" stroke="${AK}" stroke-width="9"/>${ic}
   <rect x="146" y="58" width="68" height="14" rx="7" fill="#c9b49a"/><rect x="146" y="86" width="56" height="14" rx="7" fill="#e0d2c0"/><rect x="146" y="114" width="64" height="14" rx="7" fill="#e0d2c0"/>`);
}
// code panel with lines; one line (.kline) is where the password hides; viewBox 0 0 620 460
function codeSVG(id) {
  let l = ''; const cols = ['#ff7ab0', '#7dd3ff', '#ffd34d', '#b8ff3d', '#c9b8ff'];
  for (let r = 0; r < 9; r++) { let x = 40 + (r % 3) * 30; const y = 70 + r * 42;
    for (let k = 0; k < 3; k++) { const w = 50 + 120 * h3(r * 5 + k, 4); if (x + w > 580) break; l += `<rect x="${x.toFixed(0)}" y="${y}" width="${w.toFixed(0)}" height="18" rx="9" fill="${cols[(r + k) % 5]}" opacity=".8"/>`; x += w + 18; } }
  return sv('0 0 620 460', `<rect x="6" y="6" width="608" height="448" rx="28" fill="#1a1028" stroke="${AK}" stroke-width="10"/><rect x="6" y="6" width="608" height="44" rx="22" fill="#2c1c40"/>
   <circle cx="40" cy="28" r="9" fill="#ff5f5f"/><circle cx="68" cy="28" r="9" fill="#ffd34d"/><circle cx="96" cy="28" r="9" fill="#7dff8a"/>${l}
   <g class="kline"><rect x="30" y="232" width="560" height="40" rx="12" fill="#ffd34d" opacity=".0" class="khl"/><text x="50" y="262" style="font:700 30px JB" fill="#ffe9a8">pass = "••••••••"</text></g>`);
}
// newspaper («журналисты»), viewBox 0 0 300 360
function newsSVG(id) {
  return sv('0 0 300 360', `<path d="M30 30 L270 20 L280 330 L40 340 Z" fill="#f4ecd9" stroke="${AK}" stroke-width="10" stroke-linejoin="round"/>
   <text x="150" y="88" text-anchor="middle" style="font:900 34px Unb" fill="${AK}" transform="rotate(-2 150 88)">НОВОСТИ</text>
   <path d="M56 110 L250 102" stroke="${AK}" stroke-width="6"/><rect x="58" y="128" width="96" height="80" rx="6" fill="#ffb84d" stroke="${AK}" stroke-width="6" transform="rotate(-2 100 160)"/>
   <path d="M168 132 L246 128 M168 154 L246 150 M168 176 L240 172 M60 230 L250 222 M62 254 L250 246 M64 278 L230 272 M64 302 L246 296" stroke="#8a7a64" stroke-width="9" stroke-linecap="round"/>`);
}
// band-aid patch, viewBox 0 0 360 140
function patchSVG(id) {
  return sv('0 0 360 140', `<rect x="10" y="20" width="340" height="100" rx="50" fill="#ffc48a" stroke="${AK}" stroke-width="10"/><rect x="120" y="28" width="120" height="84" rx="14" fill="#f2e2cc" stroke="#c99a6a" stroke-width="5"/>
   <circle cx="150" cy="52" r="5" fill="#c99a6a"/><circle cx="180" cy="70" r="5" fill="#c99a6a"/><circle cx="210" cy="52" r="5" fill="#c99a6a"/><circle cx="150" cy="90" r="5" fill="#c99a6a"/><circle cx="210" cy="90" r="5" fill="#c99a6a"/>
   <path d="M40 46 Q60 34 96 34" fill="none" stroke="#fff" stroke-width="7" opacity=".5" stroke-linecap="round"/>`);
}
// a hole in the phone's back = the leak, viewBox 0 0 200 200 (.hole)
function holeSVG() {
  return sv('0 0 200 200', `<path class="hole" d="M100 30 L120 70 L170 64 L136 104 L160 150 L110 128 L70 172 L74 120 L28 100 L76 82 Z" fill="#14060c" stroke="#ffd34d" stroke-width="6" stroke-linejoin="round"/>`);
}
function checkIcon(cls = 'okp') {
  return sv('0 0 140 140', `<circle cx="70" cy="70" r="60" fill="#25a04a" stroke="${AK}" stroke-width="9"/><path class="${cls}" d="M40 72 L62 94 L102 50" pathLength="100" fill="none" stroke="#fff" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" style="stroke-dasharray:100;stroke-dashoffset:100"/>`);
}
function crossIcon(cls = 'xp') {
  return sv('0 0 140 140', `<circle cx="70" cy="70" r="60" fill="#e3243f" stroke="${AK}" stroke-width="9"/><path class="${cls}" d="M44 44 L96 96 M96 44 L44 96" pathLength="100" fill="none" stroke="#fff" stroke-width="15" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/>`);
}
function bellSVG() {
  return sv('0 0 110 110', `<g class="bell" style="transform-origin:55px 14px"><path d="M55 10 Q86 12 88 52 L92 76 L18 76 L22 52 Q24 12 55 10 Z" fill="#ffe14d" stroke="${AK}" stroke-width="8" stroke-linejoin="round"/><circle cx="55" cy="88" r="11" fill="#ffe14d" stroke="${AK}" stroke-width="7"/></g>`);
}
// phone parts for the "любое приложение можно разобрать" takeaway: screen, board, battery-ish block; viewBox 0 0 220 420 each
function boardSVG() {
  return sv('0 0 220 420', `<rect x="20" y="20" width="180" height="380" rx="30" fill="#1f6a3a" stroke="${AK}" stroke-width="10"/>
   <rect x="50" y="60" width="70" height="70" rx="8" fill="#2b3340" stroke="${AK}" stroke-width="7"/><rect x="134" y="60" width="40" height="40" rx="6" fill="#c9d2dc" stroke="${AK}" stroke-width="6"/>
   <path d="M60 170 L160 170 M60 200 L120 200 L120 260 M150 200 L150 300 L80 300" stroke="#ffd34d" stroke-width="7" fill="none" stroke-linecap="round"/>
   <rect x="50" y="320" width="120" height="50" rx="8" fill="#2b3340" stroke="${AK}" stroke-width="7"/>`);
}
