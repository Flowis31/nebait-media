// art.js for 006 «Пароль 123456 слил целую страну». Original drawings, ink #0a130d, flat fills + one gradient each.
const INK = '#0a130d';
const box = (vb, body, extra = '') => `<svg viewBox="${vb}" style="overflow:visible;left:0;top:0;width:100%;height:100%" ${extra}>${body}</svg>`;

function padlockSVG(id) {
  return box('0 0 300 340', `<defs><linearGradient id="pl${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe680"/><stop offset="1" stop-color="#e0a21a"/></linearGradient></defs>
    <g class="shackle" style="transform-origin:236px 150px"><path d="M64 150 V96 a86 86 0 0 1 172 0 V150" fill="none" stroke="${INK}" stroke-width="44" stroke-linecap="round"/>
    <path d="M64 150 V96 a86 86 0 0 1 172 0 V150" fill="none" stroke="#b9c4bd" stroke-width="24" stroke-linecap="round"/>
    <path d="M78 100 a72 72 0 0 1 40 -62" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".7"/></g>
    <rect x="20" y="140" width="260" height="190" rx="34" fill="url(#pl${id})" stroke="${INK}" stroke-width="12"/>
    <rect x="40" y="160" width="60" height="150" rx="20" fill="#fff" opacity=".22"/>
    <circle cx="150" cy="222" r="26" fill="${INK}"/><path d="M140 232 L134 290 H166 L160 232 Z" fill="${INK}"/>`);
}
function dbSVG(id) {   // database cylinder of three discs
  let d = '';
  for (let k = 2; k >= 0; k--) {
    const y = 70 + k * 120;
    d += `<g class="disc disc${k}"><path d="M20 ${y} V${y + 110} a190 54 0 0 0 380 0 V${y}" fill="url(#db${id})" stroke="${INK}" stroke-width="12"/>
      <ellipse cx="210" cy="${y}" rx="190" ry="54" fill="#d6ffa0" stroke="${INK}" stroke-width="12"/>
      <circle class="led" cx="330" cy="${y + 96}" r="12" fill="#ff3b5c" stroke="${INK}" stroke-width="5"/>
      <path d="M60 ${y + 80} q150 40 210 26" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".35"/></g>`;
  }
  return box('0 0 420 460', `<defs><linearGradient id="db${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5fae14"/><stop offset=".45" stop-color="#b8ff3d"/><stop offset="1" stop-color="#4a8f10"/></linearGradient></defs>${d}`);
}
function buildingSVG() {
  let win = '';
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) win += `<rect x="${70 + c * 80}" y="${150 + r * 66}" width="46" height="40" rx="6" fill="${(r + c) % 2 ? '#ffe680' : '#2a4a37'}" stroke="${INK}" stroke-width="6"/>`;
  return box('0 0 360 380', `<rect x="40" y="110" width="280" height="260" rx="10" fill="#f4ecd9" stroke="${INK}" stroke-width="10"/>
    <path d="M24 118 L180 30 L336 118 Z" fill="#ff3b5c" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>${win}
    <rect x="150" y="300" width="60" height="70" rx="6" fill="#26392d" stroke="${INK}" stroke-width="8"/>`);
}
function keySVG() {
  return box('0 0 220 100', `<circle cx="50" cy="50" r="38" fill="#ffd23d" stroke="${INK}" stroke-width="9"/><circle cx="50" cy="50" r="13" fill="#0a130d"/>
    <path d="M86 42 H206 V62 H186 V80 H166 V62 H146 V76 H126 V62 H86 Z" fill="#ffd23d" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>`);
}
function catSVG() {   // original ginger cat, sitting, front view
  return box('0 0 300 300', `<defs><radialGradient id="catg" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="#ffc77a"/><stop offset="1" stop-color="#e8862a"/></radialGradient></defs>
    <g class="tail" style="transform-origin:220px 250px"><path d="M220 250 Q300 240 280 160" fill="none" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M220 250 Q300 240 280 160" fill="none" stroke="#e8862a" stroke-width="16" stroke-linecap="round"/></g>
    <ellipse cx="150" cy="225" rx="95" ry="70" fill="url(#catg)" stroke="${INK}" stroke-width="10"/>
    <path d="M78 66 L92 130 L134 104 Z M222 66 L208 130 L166 104 Z" fill="#e8862a" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M88 84 L98 120 L120 106 Z M212 84 L202 120 L180 106 Z" fill="#ffb3a6"/>
    <circle cx="150" cy="150" r="72" fill="url(#catg)" stroke="${INK}" stroke-width="10"/>
    <path d="M120 96 l8 22 M150 90 v24 M180 96 l-8 22" stroke="#c46a18" stroke-width="7" stroke-linecap="round"/>
    <g class="ceyes"><ellipse cx="122" cy="148" rx="14" ry="17" fill="${INK}"/><ellipse cx="178" cy="148" rx="14" ry="17" fill="${INK}"/>
    <circle cx="127" cy="142" r="5" fill="#fff"/><circle cx="183" cy="142" r="5" fill="#fff"/></g>
    <path d="M142 172 h16 l-8 9 Z" fill="#ff8a7a" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M150 181 q-10 12 -22 4 M150 181 q10 12 22 4" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    <path d="M96 172 h-46 M98 184 l-42 10 M204 172 h46 M202 184 l42 10" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="112" cy="285" rx="30" ry="16" fill="#ffc77a" stroke="${INK}" stroke-width="8"/><ellipse cx="188" cy="285" rx="30" ry="16" fill="#ffc77a" stroke="${INK}" stroke-width="8"/>`);
}
function laptopSVG() {
  return box('0 0 400 300', `<rect x="50" y="10" width="300" height="200" rx="16" fill="#15281c" stroke="${INK}" stroke-width="12"/>
    <rect x="70" y="30" width="260" height="160" rx="6" fill="#0c1a12"/>
    <path d="M10 220 H390 L360 270 H40 Z" fill="#b9c4bd" stroke="${INK}" stroke-width="12" stroke-linejoin="round"/><rect x="170" y="232" width="60" height="12" rx="6" fill="#7e8a83"/>`);
}
function hoodSVG() {   // faceless hood with two glowing eyes: a generic «хакер», no real person
  return box('0 0 300 300', `<defs><radialGradient id="hdg" cx="50%" cy="30%" r="80%"><stop offset="0" stop-color="#3b4f44"/><stop offset="1" stop-color="#15201a"/></radialGradient></defs>
    <path d="M30 300 Q30 190 70 120 Q150 0 230 120 Q270 190 270 300 Z" fill="url(#hdg)" stroke="${INK}" stroke-width="10"/>
    <ellipse cx="150" cy="170" rx="72" ry="80" fill="#050806"/>
    <g class="heyes"><ellipse cx="122" cy="170" rx="13" ry="8" fill="#b8ff3d"/><ellipse cx="178" cy="170" rx="13" ry="8" fill="#b8ff3d"/></g>`);
}
function personSVG(c) {
  return box('0 0 60 80', `<circle cx="30" cy="20" r="15" fill="${c}" stroke="${INK}" stroke-width="5"/><path d="M6 78 Q6 40 30 40 Q54 40 54 78 Z" fill="${c}" stroke="${INK}" stroke-width="5"/>`);
}
function suitcaseSVG() {
  return box('0 0 200 170', `<path d="M70 40 V20 H130 V40" fill="none" stroke="${INK}" stroke-width="12"/>
    <rect x="10" y="40" width="180" height="120" rx="18" fill="#3aa0ff" stroke="${INK}" stroke-width="10"/>
    <path d="M60 40 V160 M140 40 V160" stroke="#1d6fc2" stroke-width="10"/><rect x="24" y="54" width="22" height="90" rx="8" fill="#fff" opacity=".3"/>
    <text x="100" y="112" font-family="Unb" font-weight="900" font-size="30" text-anchor="middle" fill="#fff">✈</text>`);
}
function ghostSVG() {
  return box('0 0 200 220', `<path d="M20 210 V100 a80 80 0 0 1 160 0 V210 l-27 -20 l-26 20 l-27 -20 l-26 20 l-27 -20 Z" fill="#f4ecd9" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <ellipse cx="74" cy="104" rx="14" ry="20" fill="${INK}"/><ellipse cx="126" cy="104" rx="14" ry="20" fill="${INK}"/><ellipse cx="100" cy="150" rx="14" ry="10" fill="${INK}"/>
    <path d="M40 90 a60 60 0 0 1 36 -50" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>`);
}
function envelopeSVG() {
  return box('0 0 320 220', `<rect x="10" y="10" width="300" height="200" rx="18" fill="#f4ecd9" stroke="${INK}" stroke-width="10"/>
    <path d="M14 20 L160 120 L306 20" fill="none" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <circle cx="160" cy="124" r="26" fill="#ff3b5c" stroke="${INK}" stroke-width="7"/><text x="160" y="135" font-family="Unb" font-weight="900" font-size="30" text-anchor="middle" fill="#fff" font-size="24">кр</text>`);
}
function doorSVG() {
  return box('0 0 300 460', `<rect x="10" y="10" width="280" height="440" rx="10" fill="#26392d" stroke="${INK}" stroke-width="12"/>
    <g class="leaf" style="transform-origin:28px 230px"><rect x="28" y="28" width="244" height="410" rx="6" fill="#a0612f" stroke="${INK}" stroke-width="10"/>
    <rect x="58" y="60" width="184" height="140" rx="8" fill="none" stroke="#7b4520" stroke-width="10"/><rect x="58" y="240" width="184" height="160" rx="8" fill="none" stroke="#7b4520" stroke-width="10"/>
    <circle cx="232" cy="236" r="16" fill="#ffd23d" stroke="${INK}" stroke-width="7"/>
    <g transform="rotate(-6 150 130)"><rect x="96" y="96" width="110" height="80" rx="4" fill="#ffe14d" stroke="${INK}" stroke-width="5"/>
    <text x="151" y="148" font-family="JB" font-weight="800" font-size="28" text-anchor="middle" fill="${INK}">123456</text></g></g>`);
}
