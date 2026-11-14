// props.js — the channel's prop library (owner's request 28.10.2026: draw recurring objects once, in detail, and improve them over time
// instead of re-drawing them simplified every morning). Load after mascot.js and before art.js:  <script src="props.js"></script>
// Every function returns an SVG string sized 100% of its box (overflow visible). Pass a unique id suffix per instance (gradient ids).
// Style: ink outline #0a130d 8-12 px, a body gradient, one rim highlight, one inner shadow, small details. Animatable parts are
// groups with class + transform-origin (listed per prop). Add new props here, not in art.js, whenever they can recur.
const PIK = '#0a130d';
const psv = (vb, inner) => `<svg viewBox="${vb}" style="overflow:visible;left:0;top:0;width:100%;height:100%">${inner}</svg>`;
const lg = (id, c0, c1, v = true) => `<linearGradient id="${id}" x1="0" y1="0" x2="${v ? 0 : 1}" y2="${v ? 1 : 0}"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></linearGradient>`;
const rg = (id, c0, c1, cx = '35%', cy = '30%') => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="80%"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></radialGradient>`;

// ---------- chatbot / robot, viewBox 0 0 400 440. Rig: .bhead (tilt, origin 200 200), .beye (sy blink), .bpup (x/y),
//            .bmouth (sy talk: 0 closed .. 1 open), .bant (antenna wobble, origin 200 70), .barmL/.barmR (origin 92/308 300),
//            .bhat (detective hat, shown when hat=true), .bglow (antenna bulb, o)
function botSVG(id, col = '#6ad1ff', hat = false) {
  const dark = '#1b2a3a';
  return psv('0 0 400 440', `<defs>${lg('bb' + id, '#ffffff', col)}${lg('bs' + id, col, '#2d6f9c')}${rg('bv' + id, '#3c556e', '#0f1a26')}${rg('bl' + id, '#fff7b0', '#ffb800')}</defs>
  <g class="barmL" style="transform-origin:92px 300px"><path d="M92 300 Q40 320 36 380" fill="none" stroke="${PIK}" stroke-width="30" stroke-linecap="round"/><path d="M92 300 Q40 320 36 380" fill="none" stroke="${col}" stroke-width="16" stroke-linecap="round"/><circle cx="36" cy="386" r="24" fill="#d9e4ee" stroke="${PIK}" stroke-width="8"/></g>
  <g class="barmR" style="transform-origin:308px 300px"><path d="M308 300 Q360 320 364 380" fill="none" stroke="${PIK}" stroke-width="30" stroke-linecap="round"/><path d="M308 300 Q360 320 364 380" fill="none" stroke="${col}" stroke-width="16" stroke-linecap="round"/><circle cx="364" cy="386" r="24" fill="#d9e4ee" stroke="${PIK}" stroke-width="8"/></g>
  <path d="M110 270 L290 270 Q306 270 306 290 L300 410 Q298 428 280 428 L120 428 Q102 428 100 410 L94 290 Q94 270 110 270 Z" fill="url(#bs${id})" stroke="${PIK}" stroke-width="11"/>
  <rect x="150" y="310" width="100" height="70" rx="14" fill="${dark}" stroke="${PIK}" stroke-width="7"/>
  <circle cx="176" cy="345" r="9" fill="#7dff8a"/><circle cx="200" cy="345" r="9" fill="#ffd34d"/><circle cx="224" cy="345" r="9" fill="#ff6b6b"/>
  <g class="bhead" style="transform-origin:200px 200px">
    <g class="bant" style="transform-origin:200px 70px"><path d="M200 70 L200 30" stroke="${PIK}" stroke-width="12" stroke-linecap="round"/><circle class="bglow" cx="200" cy="24" r="16" fill="url(#bl${id})" stroke="${PIK}" stroke-width="7"/></g>
    <rect x="70" y="70" width="260" height="200" rx="56" fill="url(#bb${id})" stroke="${PIK}" stroke-width="12"/>
    <rect x="52" y="140" width="22" height="64" rx="10" fill="${col}" stroke="${PIK}" stroke-width="8"/><rect x="326" y="140" width="22" height="64" rx="10" fill="${col}" stroke="${PIK}" stroke-width="8"/>
    <rect x="96" y="100" width="208" height="140" rx="40" fill="url(#bv${id})" stroke="${PIK}" stroke-width="8"/>
    <path d="M112 128 Q120 110 146 108" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".35"/>
    <g class="beye" style="transform-origin:200px 160px"><ellipse cx="156" cy="160" rx="24" ry="28" fill="#8ff0ff"/><ellipse cx="244" cy="160" rx="24" ry="28" fill="#8ff0ff"/>
      <g class="bpup"><circle cx="160" cy="164" r="11" fill="#0d2a3a"/><circle cx="248" cy="164" r="11" fill="#0d2a3a"/><circle cx="164" cy="158" r="4" fill="#fff"/><circle cx="252" cy="158" r="4" fill="#fff"/></g></g>
    <g class="bmouth" style="transform-origin:200px 208px;transform:scaleY(0.25)"><rect x="168" y="196" width="64" height="24" rx="12" fill="#8ff0ff"/></g>
    <path d="M86 92 Q100 80 130 78" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".7"/>
    ${hat ? `<g class="bhat"><path d="M60 92 Q200 40 340 92 Q330 108 200 104 Q70 108 60 92 Z" fill="#7a5a3a" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
      <path d="M110 92 Q120 20 200 18 Q280 20 290 92 Q200 80 110 92 Z" fill="#9b7448" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
      <path d="M116 80 Q200 66 284 80" fill="none" stroke="#3a2614" stroke-width="16"/><path d="M140 40 Q170 26 200 26" fill="none" stroke="#fff" stroke-width="6" opacity=".35" stroke-linecap="round"/></g>` : ''}
  </g>`);
}

// ---------- generic cartoon person (not a real person), viewBox 0 0 400 480. Rig: .phead (origin 200 210), .ppup, .pmouth (sy),
//            .parmL/.parmR (origin 120/280 300), .pblink (sy). skin/hair/shirt colours as params
function personSVG(id, shirt = '#ff7a3d', hair = '#3a2414', skin = '#f2c29b') {
  return psv('0 0 400 480', `<defs>${lg('ps' + id, shirt, '#b94a1a')}${rg('pk' + id, '#ffe2c8', skin)}</defs>
  <g class="parmL" style="transform-origin:120px 300px"><path d="M120 300 Q70 340 76 410" fill="none" stroke="${PIK}" stroke-width="40" stroke-linecap="round"/><path d="M120 300 Q70 340 76 410" fill="none" stroke="${shirt}" stroke-width="26" stroke-linecap="round"/><circle cx="76" cy="418" r="22" fill="url(#pk${id})" stroke="${PIK}" stroke-width="8"/></g>
  <g class="parmR" style="transform-origin:280px 300px"><path d="M280 300 Q330 340 324 410" fill="none" stroke="${PIK}" stroke-width="40" stroke-linecap="round"/><path d="M280 300 Q330 340 324 410" fill="none" stroke="${shirt}" stroke-width="26" stroke-linecap="round"/><circle cx="324" cy="418" r="22" fill="url(#pk${id})" stroke="${PIK}" stroke-width="8"/></g>
  <path d="M110 300 Q200 250 290 300 L300 470 L100 470 Z" fill="url(#ps${id})" stroke="${PIK}" stroke-width="11" stroke-linejoin="round"/>
  <path d="M170 278 L200 320 L230 278" fill="none" stroke="#fff" stroke-width="9" stroke-linejoin="round" opacity=".7"/>
  <g class="phead" style="transform-origin:200px 250px">
    <rect x="178" y="236" width="44" height="40" fill="url(#pk${id})" stroke="${PIK}" stroke-width="8"/>
    <ellipse cx="200" cy="160" rx="100" ry="110" fill="url(#pk${id})" stroke="${PIK}" stroke-width="11"/>
    <circle cx="100" cy="170" r="18" fill="url(#pk${id})" stroke="${PIK}" stroke-width="8"/><circle cx="300" cy="170" r="18" fill="url(#pk${id})" stroke="${PIK}" stroke-width="8"/>
    <path d="M98 150 Q92 50 200 46 Q312 44 304 150 Q290 100 240 96 Q200 120 150 100 Q110 110 98 150 Z" fill="${hair}" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
    <g class="pblink" style="transform-origin:200px 170px"><ellipse cx="160" cy="170" rx="20" ry="24" fill="#fff" stroke="${PIK}" stroke-width="6"/><ellipse cx="240" cy="170" rx="20" ry="24" fill="#fff" stroke="${PIK}" stroke-width="6"/>
      <g class="ppup"><circle cx="163" cy="174" r="10" fill="${PIK}"/><circle cx="243" cy="174" r="10" fill="${PIK}"/><circle cx="166" cy="169" r="3.5" fill="#fff"/><circle cx="246" cy="169" r="3.5" fill="#fff"/></g></g>
    <path d="M140 134 Q160 124 180 132 M220 132 Q240 124 260 134" fill="none" stroke="${hair}" stroke-width="9" stroke-linecap="round"/>
    <ellipse cx="130" cy="210" rx="16" ry="9" fill="#ff8a7a" opacity=".35"/><ellipse cx="270" cy="210" rx="16" ry="9" fill="#ff8a7a" opacity=".35"/>
    <path d="M196 186 Q190 206 204 208" fill="none" stroke="#c98a66" stroke-width="6" stroke-linecap="round"/>
    <g class="pmouth" style="transform-origin:200px 232px"><path d="M172 226 Q200 252 228 226 Q200 236 172 226 Z" fill="#7a1f24" stroke="${PIK}" stroke-width="7" stroke-linejoin="round"/></g>
    <path d="M130 80 Q160 60 190 62" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".3"/>
  </g>`);
}

// ---------- hanging interrogation lamp, viewBox 0 0 400 900 (lamp at the top, light cone down to y 900). .lswing (origin 200 0), .cone (o)
function lampSVG(id) {
  return psv('0 0 400 900', `<defs>${lg('lc' + id, 'rgba(255,236,170,.55)', 'rgba(255,236,170,0)')}${lg('lm' + id, '#4a5560', '#1e252c')}${rg('lb' + id, '#ffffff', '#ffd76b', '50%', '50%')}</defs>
  <g class="lswing" style="transform-origin:200px 0px"><path d="M200 0 L200 120" stroke="${PIK}" stroke-width="10"/>
  <path class="cone" d="M140 230 L260 230 L420 900 L-20 900 Z" fill="url(#lc${id})"/>
  <path d="M120 230 Q120 140 200 130 Q280 140 280 230 Z" fill="url(#lm${id})" stroke="${PIK}" stroke-width="11" stroke-linejoin="round"/>
  <path d="M140 200 Q146 160 186 150" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".35"/>
  <ellipse cx="200" cy="232" rx="56" ry="16" fill="url(#lb${id})" stroke="${PIK}" stroke-width="7"/></g>`);
}

// ---------- table seen from the front, viewBox 0 0 900 300 (top surface y 40..90)
function tableSVG(id) {
  return psv('0 0 900 300', `<defs>${lg('tt' + id, '#a8743f', '#7a5028')}${lg('tf' + id, '#6a4320', '#3e2410')}</defs>
  <path d="M20 40 L880 40 L860 90 L40 90 Z" fill="url(#tt${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
  <rect x="40" y="90" width="820" height="40" fill="url(#tf${id})" stroke="${PIK}" stroke-width="10"/>
  <rect x="80" y="130" width="40" height="170" fill="#4a2c14" stroke="${PIK}" stroke-width="9"/><rect x="780" y="130" width="40" height="170" fill="#4a2c14" stroke="${PIK}" stroke-width="9"/>
  <path d="M70 52 L520 52" stroke="#fff" stroke-width="6" opacity=".25" stroke-linecap="round"/>`);
}

// ---------- chat bubble with typing dots / text, viewBox 0 0 300 200. .dot1..3 for typing (y bounce), tail left or right
function chatSVG(id, col = '#ffffff', txt = '', tail = 'left', ink = PIK) {
  const tl = tail === 'left' ? 'M60 150 L40 196 L104 150' : 'M196 150 L260 196 L240 150';
  return psv('0 0 300 200', `<defs>${lg('cb' + id, '#ffffff', col)}</defs>
  <path d="M40 10 L260 10 Q290 10 290 40 L290 120 Q290 150 260 150 L40 150 Q10 150 10 120 L10 40 Q10 10 40 10 Z" fill="url(#cb${id})" stroke="${ink}" stroke-width="10"/>
  <path d="${tl}" fill="${col}" stroke="${ink}" stroke-width="10" stroke-linejoin="round"/><path d="${tail === 'left' ? 'M62 146 L104 146' : 'M196 146 L238 146'}" stroke="${col}" stroke-width="12"/>
  ${txt ? `<text x="150" y="${80 + Math.min(58, 250 / (txt.length * 0.85)) * 0.36}" text-anchor="middle" style="font:900 ${Math.min(58, 250 / (txt.length * 0.85)).toFixed(1)}px Unb" fill="${ink}">${txt}</text>` :
    `<circle class="dot1" cx="105" cy="80" r="16" fill="#7a8a99"/><circle class="dot2" cx="150" cy="80" r="16" fill="#7a8a99"/><circle class="dot3" cx="195" cy="80" r="16" fill="#7a8a99"/>`}
  <path d="M34 32 Q40 22 70 22" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".8"/>`);
}

// ---------- trumpet, viewBox 0 0 460 200 (.valves for presses, .bell at the right)
function trumpetSVG(id) {
  return psv('0 0 460 200', `<defs>${lg('tg' + id, '#fff3a0', '#d79a12')}</defs>
  <path d="M20 112 L330 112" stroke="${PIK}" stroke-width="30" stroke-linecap="round"/><path d="M20 112 L330 112" stroke="url(#tg${id})" stroke-width="16" stroke-linecap="round"/>
  <path d="M90 112 Q90 60 150 60 L280 60 Q320 60 320 112" fill="none" stroke="${PIK}" stroke-width="30"/><path d="M90 112 Q90 60 150 60 L280 60 Q320 60 320 112" fill="none" stroke="url(#tg${id})" stroke-width="16"/>
  <path class="bell" d="M320 112 L440 40 Q456 112 440 184 Z" fill="url(#tg${id})" stroke="${PIK}" stroke-width="11" stroke-linejoin="round"/>
  <g class="valves"><rect x="170" y="30" width="22" height="60" rx="6" fill="#ffe27a" stroke="${PIK}" stroke-width="7"/><rect x="205" y="30" width="22" height="60" rx="6" fill="#ffe27a" stroke="${PIK}" stroke-width="7"/><rect x="240" y="30" width="22" height="60" rx="6" fill="#ffe27a" stroke="${PIK}" stroke-width="7"/></g>
  <rect x="6" y="96" width="30" height="32" rx="8" fill="#c88a10" stroke="${PIK}" stroke-width="7"/><path d="M60 104 L300 104" stroke="#fff" stroke-width="5" opacity=".6" stroke-linecap="round"/>`);
}

// ---------- party mask on a stick (disguise), viewBox 0 0 320 260
function maskSVG(id, col = '#ff5fa2') {
  return psv('0 0 320 260', `<defs>${lg('mk' + id, '#ffd0e6', col)}</defs><path d="M250 120 L300 250" stroke="${PIK}" stroke-width="16" stroke-linecap="round"/><path d="M250 120 L300 250" stroke="#ffd34d" stroke-width="7" stroke-linecap="round"/>
  <path d="M20 70 Q160 10 300 70 Q300 150 220 150 Q170 150 160 118 Q150 150 100 150 Q20 150 20 70 Z" fill="url(#mk${id})" stroke="${PIK}" stroke-width="11" stroke-linejoin="round"/>
  <ellipse cx="96" cy="92" rx="36" ry="22" fill="${PIK}"/><ellipse cx="224" cy="92" rx="36" ry="22" fill="${PIK}"/><path d="M40 60 Q80 40 120 42" fill="none" stroke="#fff" stroke-width="7" opacity=".6" stroke-linecap="round"/>`);
}

// ---------- case file folder, viewBox 0 0 360 280. .fstamp slot at (180,150)
function folderSVG(id, title = 'ДЕЛО') {
  return psv('0 0 360 280', `<defs>${lg('fd' + id, '#ffe0a3', '#e3b35f')}</defs>
  <path d="M20 40 L140 40 L160 20 L340 20 L340 260 L20 260 Z" fill="#d49a42" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
  <rect x="20" y="50" width="320" height="210" rx="6" fill="url(#fd${id})" stroke="${PIK}" stroke-width="10"/>
  <text x="180" y="120" text-anchor="middle" style="font:900 44px Unb" fill="${PIK}">${title}</text><rect x="70" y="150" width="220" height="12" rx="6" fill="#b88a40"/><rect x="70" y="180" width="160" height="12" rx="6" fill="#b88a40"/>`);
}

// ---------- smartphone, viewBox 0 0 220 420; .screen holds content (rect 22..198 x 50..370)
function phonePropSVG(id, screen = '') {
  return psv('0 0 220 420', `<defs>${lg('ph' + id, '#3a3f4f', '#16181f')}${lg('pg' + id, '#e8f4ff', '#bcd6f2')}</defs>
  <rect x="8" y="8" width="204" height="404" rx="38" fill="url(#ph${id})" stroke="${PIK}" stroke-width="10"/>
  <rect x="22" y="44" width="176" height="330" rx="18" fill="url(#pg${id})"/><g class="screen">${screen}</g>
  <rect x="80" y="20" width="60" height="14" rx="7" fill="#0a0c10"/><path d="M30 60 L60 30" stroke="#fff" stroke-width="7" opacity=".25" stroke-linecap="round"/>`);
}

// ---------- laptop, viewBox 0 0 520 360 (.lscreen content area 70..450 x 40..250)
function laptopSVG(id, screen = '') {
  return psv('0 0 520 360', `<defs>${lg('lt' + id, '#c9d2dc', '#8a96a3')}${lg('ls' + id, '#203040', '#0d1620')}</defs>
  <rect x="50" y="20" width="420" height="250" rx="20" fill="url(#lt${id})" stroke="${PIK}" stroke-width="11"/>
  <rect x="70" y="40" width="380" height="210" rx="8" fill="url(#ls${id})"/><g class="lscreen">${screen}</g>
  <path d="M10 290 L510 290 L480 340 L40 340 Z" fill="url(#lt${id})" stroke="${PIK}" stroke-width="11" stroke-linejoin="round"/><rect x="210" y="300" width="100" height="14" rx="7" fill="#7a8692"/>
  <path d="M90 60 L150 60" stroke="#fff" stroke-width="6" opacity=".25" stroke-linecap="round"/>`);
}

// ---------- padlock, viewBox 0 0 240 300. .shackle (y up to open)
function padlockSVG(id, col = '#ffd34d') {
  return psv('0 0 240 300', `<defs>${lg('pl' + id, '#fff3b0', col)}</defs>
  <g class="shackle"><path d="M60 140 L60 90 Q60 30 120 30 Q180 30 180 90 L180 140" fill="none" stroke="${PIK}" stroke-width="40"/><path d="M60 140 L60 90 Q60 30 120 30 Q180 30 180 90 L180 140" fill="none" stroke="#c9d2dc" stroke-width="22"/></g>
  <rect x="20" y="130" width="200" height="160" rx="30" fill="url(#pl${id})" stroke="${PIK}" stroke-width="11"/>
  <circle cx="120" cy="196" r="20" fill="${PIK}"/><rect x="112" y="200" width="16" height="44" rx="6" fill="${PIK}"/><path d="M40 160 Q46 146 70 146" fill="none" stroke="#fff" stroke-width="8" opacity=".6" stroke-linecap="round"/>`);
}

// ---------- coin, viewBox 0 0 200 200 (flip with sx)
function coinSVG(id, sym = '₿') {
  return psv('0 0 200 200', `<defs>${rg('cn' + id, '#fff6b0', '#e0a400')}</defs><circle cx="100" cy="100" r="88" fill="url(#cn${id})" stroke="${PIK}" stroke-width="11"/>
  <circle cx="100" cy="100" r="66" fill="none" stroke="#c78f00" stroke-width="7"/><text x="100" y="128" text-anchor="middle" style="font:900 80px Unb" fill="#9a6a00">${sym}</text>
  <path d="M46 70 Q60 40 96 34" fill="none" stroke="#fff" stroke-width="8" opacity=".7" stroke-linecap="round"/>`);
}

// ---------- magnifier, viewBox 0 0 260 260 (.glass content clip optional)
function magnifierSVG(id) {
  return psv('0 0 260 260', `<defs>${rg('mg' + id, 'rgba(220,245,255,.55)', 'rgba(150,210,240,.25)')}</defs>
  <path d="M160 160 L236 236" stroke="${PIK}" stroke-width="38" stroke-linecap="round"/><path d="M160 160 L236 236" stroke="#8b5a2b" stroke-width="22" stroke-linecap="round"/>
  <circle cx="100" cy="100" r="80" fill="url(#mg${id})" stroke="${PIK}" stroke-width="16"/><circle cx="100" cy="100" r="68" fill="none" stroke="#d9e4ee" stroke-width="6"/>
  <path d="M56 78 A50 50 0 0 1 94 46" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/>`);
}

// ---------- added 30.10.2026 (ролик 017) ----------
// jacket on a hanger, viewBox 0 0 300 340. Rig: .jhang (hanger hook, o), .jsleeveL/.jsleeveR (origin 70/230 90). col = fabric colour
function jacketSVG(id, col = '#ff5f5f') {
  return psv('0 0 300 340', `<defs>${lg('jk' + id, '#ffffff', col)}${lg('jd' + id, col, '#6a1f2a')}</defs>
  <g class="jhang"><path d="M150 40 Q150 10 170 12 Q188 16 182 32" fill="none" stroke="${PIK}" stroke-width="9" stroke-linecap="round"/><path d="M60 78 L150 40 L240 78" fill="none" stroke="#8a6a44" stroke-width="10" stroke-linecap="round"/></g>
  <g class="jsleeveL" style="transform-origin:70px 90px"><path d="M70 86 Q30 150 34 250 L74 254 Q78 170 98 120 Z" fill="url(#jd${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/><rect x="30" y="236" width="46" height="24" rx="8" fill="#2a2a2a" stroke="${PIK}" stroke-width="7"/></g>
  <g class="jsleeveR" style="transform-origin:230px 90px"><path d="M230 86 Q270 150 266 250 L226 254 Q222 170 202 120 Z" fill="url(#jd${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/><rect x="224" y="236" width="46" height="24" rx="8" fill="#2a2a2a" stroke="${PIK}" stroke-width="7"/></g>
  <path d="M70 84 Q110 62 130 70 L150 120 L170 70 Q190 62 230 84 L236 310 Q150 330 64 310 Z" fill="url(#jk${id})" stroke="${PIK}" stroke-width="11" stroke-linejoin="round"/>
  <path d="M150 120 L150 318" stroke="${PIK}" stroke-width="7"/><path d="M130 70 L150 140 L118 128 Z M170 70 L150 140 L182 128 Z" fill="url(#jd${id})" stroke="${PIK}" stroke-width="7" stroke-linejoin="round"/>
  <circle cx="162" cy="180" r="7" fill="${PIK}"/><circle cx="162" cy="230" r="7" fill="${PIK}"/><circle cx="162" cy="280" r="7" fill="${PIK}"/>
  <rect x="88" y="230" width="44" height="12" rx="5" fill="${PIK}" opacity=".55"/><path d="M84 110 Q90 96 108 92" fill="none" stroke="#fff" stroke-width="8" opacity=".55" stroke-linecap="round"/>`);
}
// balance scale, viewBox 0 0 500 460. Rig: .sbeam (tilt r, origin 250 110); .spanL/.spanR follow the beam ends (counter-rotate them by -r)
// pans hang from (70,110) and (430,110); put objects above the pans at y ~ 200
function scalesSVG(id) {
  return psv('0 0 500 460', `<defs>${lg('sc' + id, '#fff2c0', '#d9a43a')}${lg('sp' + id, '#ffe9a8', '#c48a22')}</defs>
  <path d="M190 440 L310 440 L290 400 L210 400 Z" fill="url(#sc${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
  <rect x="236" y="110" width="28" height="296" rx="10" fill="url(#sc${id})" stroke="${PIK}" stroke-width="9"/>
  <g class="sbeam" style="transform-origin:250px 110px">
    <rect x="50" y="98" width="400" height="24" rx="12" fill="url(#sc${id})" stroke="${PIK}" stroke-width="9"/>
    <g class="spanL" style="transform-origin:70px 110px"><path d="M70 110 L20 220 M70 110 L120 220" stroke="${PIK}" stroke-width="5"/><path d="M6 218 L134 218 Q120 262 70 262 Q20 262 6 218 Z" fill="url(#sp${id})" stroke="${PIK}" stroke-width="9" stroke-linejoin="round"/></g>
    <g class="spanR" style="transform-origin:430px 110px"><path d="M430 110 L380 220 M430 110 L480 220" stroke="${PIK}" stroke-width="5"/><path d="M366 218 L494 218 Q480 262 430 262 Q380 262 366 218 Z" fill="url(#sp${id})" stroke="${PIK}" stroke-width="9" stroke-linejoin="round"/></g>
  </g>
  <circle cx="250" cy="98" r="22" fill="url(#sc${id})" stroke="${PIK}" stroke-width="9"/><path d="M226 140 L226 380" stroke="#fff" stroke-width="5" opacity=".4"/>`);
}
// road sign on a post, viewBox 0 0 360 420; arrow points right (mirror the box with sx:-1 for left; text stays readable if you pass flip=true)
function signpostSVG(id, txt = '', col = '#ffd34d', flip = false) {
  const ar = flip ? 'M330 70 L60 70 L20 120 L60 170 L330 170 Z' : 'M30 70 L300 70 L340 120 L300 170 L30 170 Z';
  return psv('0 0 360 420', `<defs>${lg('sg' + id, '#ffffff', col)}${lg('sw' + id, '#c08a55', '#7a4e26')}</defs>
  <rect x="166" y="150" width="28" height="262" rx="8" fill="url(#sw${id})" stroke="${PIK}" stroke-width="9"/>
  <path d="${ar}" fill="url(#sg${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
  <text x="${flip ? 195 : 165}" y="136" text-anchor="middle" style="font:900 42px Unb" fill="${PIK}">${txt}</text>
  <path d="M50 88 L150 88" stroke="#fff" stroke-width="7" opacity=".6" stroke-linecap="round"/>`);
}
// light bulb (idea), viewBox 0 0 200 260. .bray (rays group, o/s), .bglass (fill glow)
function bulbSVG(id) {
  return psv('0 0 200 260', `<defs>${rg('bu' + id, '#fffbe0', '#ffd23a')}</defs>
  <g class="bray" style="transform-origin:100px 90px"><path d="M100 2 L100 -30 M30 30 L8 8 M170 30 L192 8 M2 100 L-30 100 M198 100 L230 100" stroke="#ffd23a" stroke-width="12" stroke-linecap="round"/></g>
  <path class="bglass" d="M100 10 Q180 12 180 92 Q178 140 140 170 L140 196 L60 196 L60 170 Q22 140 20 92 Q20 12 100 10 Z" fill="url(#bu${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M78 150 Q100 110 122 150" fill="none" stroke="#e08a00" stroke-width="7"/>
  <rect x="58" y="196" width="84" height="22" rx="6" fill="#b8c2cc" stroke="${PIK}" stroke-width="8"/><rect x="64" y="218" width="72" height="20" rx="6" fill="#98a2ac" stroke="${PIK}" stroke-width="8"/><path d="M84 246 L116 246" stroke="${PIK}" stroke-width="10" stroke-linecap="round"/>
  <path d="M50 70 Q60 38 92 30" fill="none" stroke="#fff" stroke-width="9" opacity=".8" stroke-linecap="round"/>`);
}
// puppet control bar with strings, viewBox 0 0 400 200 (cross at the top; strings hang from .pstr paths, draw them on with dash: pathLength=100)
function puppetBarSVG(id, len = 600) {
  return psv('0 0 400 200', `<defs>${lg('pb' + id, '#e8c08a', '#9a6a34')}</defs>
  <path class="pstr" d="M60 60 L60 ${60 + len}" pathLength="100" stroke="#f4ecd9" stroke-width="5" style="stroke-dasharray:100;stroke-dashoffset:100"/>
  <path class="pstr" d="M340 60 L340 ${60 + len}" pathLength="100" stroke="#f4ecd9" stroke-width="5" style="stroke-dasharray:100;stroke-dashoffset:100"/>
  <path class="pstr" d="M200 30 L200 ${30 + len * 0.8}" pathLength="100" stroke="#f4ecd9" stroke-width="5" style="stroke-dasharray:100;stroke-dashoffset:100"/>
  <rect x="30" y="44" width="340" height="32" rx="14" fill="url(#pb${id})" stroke="${PIK}" stroke-width="9"/>
  <rect x="184" y="6" width="32" height="140" rx="14" fill="url(#pb${id})" stroke="${PIK}" stroke-width="9"/><path d="M48 52 L150 52" stroke="#fff" stroke-width="5" opacity=".5" stroke-linecap="round"/>`);
}

// ---------- battery, viewBox 0 0 300 140. .bfill (sx 0..1 = charge, transform-origin left; recolour its fill), .bbolt (charging bolt, o/s)
function batterySVG(id, col = '#7dff8a') {
  return psv('0 0 300 140', `<defs>${lg('bt' + id, '#4a5568', '#1c222c')}${lg('bf' + id, '#ffffff', col)}</defs>
  <rect x="270" y="44" width="24" height="52" rx="8" fill="#9aa6b2" stroke="${PIK}" stroke-width="8"/>
  <rect x="8" y="8" width="266" height="124" rx="26" fill="url(#bt${id})" stroke="${PIK}" stroke-width="11"/>
  <rect class="bfill" x="26" y="26" width="230" height="88" rx="14" fill="${col}" style="transform-origin:26px 70px"/>
  <rect x="26" y="26" width="230" height="30" rx="12" fill="#fff" opacity=".22"/>
  <path d="M30 22 L110 22" stroke="#fff" stroke-width="7" opacity=".3" stroke-linecap="round"/>
  <g class="bbolt" style="transform-origin:141px 70px"><path d="M152 18 L112 78 L140 78 L128 122 L172 58 L144 58 Z" fill="#ffe14d" stroke="${PIK}" stroke-width="7" stroke-linejoin="round"/></g>`);
}
// ---------- brightness slider, viewBox 0 0 640 140. .sfill (sx 0..1 from the left, origin 70px), .sknob (x 0..500 = level 0..1), .ssun (big sun rays, s)
function sliderSVG(id) {
  let rays = ''; for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; rays += `<path d="M${(590 + 30 * Math.cos(a)).toFixed(1)} ${(70 + 30 * Math.sin(a)).toFixed(1)} L${(590 + 46 * Math.cos(a)).toFixed(1)} ${(70 + 46 * Math.sin(a)).toFixed(1)}" stroke="#ffe14d" stroke-width="9" stroke-linecap="round"/>`; }
  return psv('0 0 640 140', `<defs>${lg('sl' + id, '#fff3a0', '#ffb800', false)}${rg('sk' + id, '#ffffff', '#c9d2dc')}</defs>
  <circle cx="22" cy="70" r="14" fill="none" stroke="#ffe14d" stroke-width="7"/>
  <rect x="58" y="48" width="512" height="44" rx="22" fill="#1a2030" stroke="${PIK}" stroke-width="9"/>
  <rect class="sfill" x="70" y="58" width="490" height="24" rx="12" fill="url(#sl${id})" style="transform-origin:70px 70px"/>
  <g class="ssun" style="transform-origin:590px 70px">${rays}<circle cx="590" cy="70" r="20" fill="#ffe14d" stroke="${PIK}" stroke-width="6"/></g>
  <g class="sknob"><circle cx="70" cy="70" r="40" fill="url(#sk${id})" stroke="${PIK}" stroke-width="10"/><circle cx="58" cy="58" r="10" fill="#fff" opacity=".8"/></g>`);
}
// ---------- sunglasses that sit on the mascot's eyes: a 400x400 overlay box placed exactly over a mascotSVG box
function sunglassesSVG(id) {
  return psv('0 0 400 400', `<defs>${lg('sg' + id, '#3a4a6a', '#05070c')}</defs>
  <path d="M96 150 Q60 140 40 150" fill="none" stroke="${PIK}" stroke-width="12" stroke-linecap="round"/><path d="M304 150 Q340 140 360 150" fill="none" stroke="${PIK}" stroke-width="12" stroke-linecap="round"/>
  <path d="M96 140 L192 140 Q196 196 150 204 Q100 204 96 140 Z" fill="url(#sg${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M208 140 L304 140 Q300 204 250 204 Q204 196 208 140 Z" fill="url(#sg${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M192 146 Q200 136 208 146" fill="none" stroke="${PIK}" stroke-width="10"/>
  <path d="M112 154 L140 154" stroke="#fff" stroke-width="7" opacity=".55" stroke-linecap="round"/><path d="M224 154 L252 154" stroke="#fff" stroke-width="7" opacity=".55" stroke-linecap="round"/>`);
}

// ---------- true-wireless earbud (from 014, detailed 01.11.2026), viewBox 0 0 400 400: head with a face, silicone tip on the left,
//            stem down-right. Rig: .ebEye (sy blink), .ebBrow (y), .ebMouth (sy), .mic1 (outer mic, s pulse), .spk (sound exit),
//            .ebGlow (status LED, o), .ebTip (silicone tip, s). face=false for a plain product earbud.
function earbudSVG(id, face = true, tip = '#9f99b8') {
  return psv('0 0 400 400', `<defs>${rg('ebg' + id, '#ffffff', '#bdb8d4', '40%', '30%')}${lg('ebs' + id, '#ffffff', '#c9c4de', false)}${rg('ebt' + id, '#ecebf4', tip, '40%', '40%')}
    <radialGradient id="ebl${id}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#b8ff3d"/><stop offset="1" stop-color="#b8ff3d" stop-opacity="0"/></radialGradient></defs>
  <ellipse cx="210" cy="392" rx="120" ry="14" fill="#000" opacity=".18"/>
  <path d="M232 208 L300 372 Q306 392 286 396 L262 398 Q244 400 238 382 L186 236 Z" fill="url(#ebs${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M246 236 L296 362" stroke="#fff" stroke-width="7" opacity=".7" stroke-linecap="round"/>
  <rect class="mic2" x="262" y="356" width="26" height="12" rx="6" fill="#26213d" transform="rotate(-21 275 362)"/>
  <g class="ebTip" style="transform-origin:96px 168px"><ellipse cx="74" cy="168" rx="58" ry="66" fill="url(#ebt${id})" stroke="${PIK}" stroke-width="10"/>
    <path d="M40 124 Q54 108 76 106" fill="none" stroke="#fff" stroke-width="7" opacity=".6" stroke-linecap="round"/>
    <ellipse class="spk" cx="40" cy="168" rx="18" ry="30" fill="#3a3456" stroke="${PIK}" stroke-width="6"/>
    ${[-14, 0, 14].map(y => `<circle cx="40" cy="${168 + y}" r="3" fill="#8f86c4"/>`).join('')}</g>
  <ellipse cx="200" cy="160" rx="132" ry="118" fill="url(#ebg${id})" stroke="${PIK}" stroke-width="11"/>
  <path d="M90 200 Q150 268 270 250" fill="none" stroke="#9d97b8" stroke-width="8" opacity=".45" stroke-linecap="round"/>
  <path d="M110 92 Q150 58 208 56" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".9"/>
  <g class="mic1" style="transform-origin:262px 66px"><ellipse cx="262" cy="66" rx="30" ry="15" fill="#2b2547" stroke="${PIK}" stroke-width="6"/>
    ${[-14, -5, 4, 13].map(x => `<circle cx="${262 + x}" cy="66" r="3" fill="#8f86c4"/>`).join('')}</g>
  <circle class="ebGlow" cx="318" cy="128" r="26" fill="url(#ebl${id})" opacity="0"/><circle cx="318" cy="128" r="7" fill="#26213d" stroke="${PIK}" stroke-width="3"/>
  ${face ? `<g class="ebFace">
    <g class="ebEye" style="transform-origin:200px 150px"><ellipse cx="166" cy="150" rx="17" ry="23" fill="${PIK}"/><ellipse cx="240" cy="150" rx="17" ry="23" fill="${PIK}"/>
    <circle cx="172" cy="141" r="6" fill="#fff"/><circle cx="246" cy="141" r="6" fill="#fff"/></g>
    <path class="ebBrow" style="transform-origin:203px 112px" d="M146 116 Q166 104 184 112 M222 112 Q240 104 260 116" fill="none" stroke="${PIK}" stroke-width="9" stroke-linecap="round"/>
    <g class="ebMouth" style="transform-origin:203px 204px"><path d="M176 196 Q203 226 230 196 Z" fill="#ff5f8f" stroke="${PIK}" stroke-width="8" stroke-linejoin="round"/></g>
    <ellipse cx="136" cy="190" rx="16" ry="9" fill="#ff8ab0" opacity=".45"/><ellipse cx="270" cy="190" rx="16" ry="9" fill="#ff8ab0" opacity=".45"/></g>` : ''}`);
}
// ---------- ear cut-away (head side, outer ear, ear canal, eardrum), viewBox 0 0 900 700. The canal runs x 470..800 at y 330..420
//            (an earbud tip sits at about x 470..560, y 375). Rig: .canal, .eardrum (sx pulse, origin 806 375)
function earCutSVG(id) {
  return psv('0 0 900 700', `<defs>${rg('ek' + id, '#ffd2b8', '#e99a7c', '40%', '35%')}${lg('ec' + id, '#9a3a48', '#5a1f2a')}</defs>
  <path d="M900 40 L520 40 Q300 60 290 300 Q280 520 520 660 L900 660 Z" fill="url(#ek${id})" stroke="${PIK}" stroke-width="12" stroke-linejoin="round"/>
  <path d="M330 140 Q380 70 500 60" fill="none" stroke="#fff" stroke-width="10" opacity=".35" stroke-linecap="round"/>
  <path d="M520 120 Q330 130 330 300 Q330 470 470 520 Q520 530 520 470 Q430 430 440 320 Q450 220 540 210 Z" fill="#f6b597" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M500 160 Q380 180 378 300" fill="none" stroke="#d98468" stroke-width="9" opacity=".6" stroke-linecap="round"/>
  <path class="canal" d="M470 330 L760 330 Q800 330 800 370 L800 380 Q800 420 760 420 L470 420 Z" fill="url(#ec${id})" stroke="${PIK}" stroke-width="10"/>
  <path d="M490 346 L740 346" stroke="#c25a68" stroke-width="6" opacity=".6" stroke-linecap="round"/>
  <g class="eardrum" style="transform-origin:806px 375px"><ellipse cx="806" cy="375" rx="16" ry="58" fill="#ffd9c9" stroke="${PIK}" stroke-width="8"/></g>`);
}
// ---------- loose silicone ear tip (side view: a soft dome on a short stem), viewBox 0 0 200 200, size label S/M/L on the dome.
function eartipSVG(id, sz = 1, label = '') {
  const rx = 88 * sz, h = 100 * sz, base = 140;
  return psv('0 0 200 200', `<defs>${rg('et' + id, '#f6f5fb', '#9f99b8', '40%', '25%')}${lg('es' + id, '#5a537a', '#2b2547', false)}</defs>
  <ellipse cx="100" cy="190" rx="${rx * 0.8}" ry="8" fill="#000" opacity=".22"/>
  <rect x="${100 - 22 * sz}" y="${base - 6}" width="${44 * sz}" height="${50 * sz}" rx="${10 * sz}" fill="url(#es${id})" stroke="${PIK}" stroke-width="8"/>
  <path d="M${100 - rx} ${base} Q${100 - rx} ${base - h * 1.25} 100 ${base - h} Q${100 + rx} ${base - h * 1.25} ${100 + rx} ${base} Q100 ${base + 18 * sz} ${100 - rx} ${base} Z" fill="url(#et${id})" stroke="${PIK}" stroke-width="9" stroke-linejoin="round"/>
  <path d="M${100 - rx * 0.62} ${base - h * 0.55} Q${100 - rx * 0.4} ${base - h * 0.95} ${100 - rx * 0.05} ${base - h * 0.98}" fill="none" stroke="#fff" stroke-width="7" opacity=".75" stroke-linecap="round"/>
  ${label ? `<text x="100" y="${base - h * 0.28}" text-anchor="middle" style="font:900 ${40 * sz + 8}px Unb" fill="#fff" stroke="${PIK}" stroke-width="8" paint-order="stroke">${label}</text>` : ''}`);
}

// ---------- added 02.11.2026 (ролик 020) ----------
// talking key = the password character, viewBox 0 0 300 560: round bow with a face at the top (centre 150,150), blade down to y 540,
// teeth on the right, "••••" engraved on the blade. Rig: .keye (sy blink, origin 150 140), .kpup (x/y), .kbrow (y), .kmouth (sy 0..1 open,
// origin 150 205), .karmL/.karmR (little arms, origin 40/260 190), .kshine (o). face=false for a plain key.
function keyCharSVG(id, face = true, col = '#ffd34d') {
  const arms = face ? `<g class="karmL" style="transform-origin:42px 190px"><path d="M42 190 Q-6 214 -14 268" fill="none" stroke="${PIK}" stroke-width="24" stroke-linecap="round"/><path d="M42 190 Q-6 214 -14 268" fill="none" stroke="#e7b21e" stroke-width="11" stroke-linecap="round"/><circle cx="-14" cy="274" r="22" fill="#fff" stroke="${PIK}" stroke-width="7"/></g>
    <g class="karmR" style="transform-origin:258px 190px"><path d="M258 190 Q306 214 314 268" fill="none" stroke="${PIK}" stroke-width="24" stroke-linecap="round"/><path d="M258 190 Q306 214 314 268" fill="none" stroke="#e7b21e" stroke-width="11" stroke-linecap="round"/><circle cx="314" cy="274" r="22" fill="#fff" stroke="${PIK}" stroke-width="7"/></g>` : '';
  const faceG = face ? `<g class="keye" style="transform-origin:150px 140px"><ellipse cx="112" cy="140" rx="27" ry="31" fill="#fff" stroke="${PIK}" stroke-width="7"/><ellipse cx="188" cy="140" rx="27" ry="31" fill="#fff" stroke="${PIK}" stroke-width="7"/>
      <g class="kpup"><circle cx="116" cy="146" r="13" fill="${PIK}"/><circle cx="192" cy="146" r="13" fill="${PIK}"/><circle cx="121" cy="139" r="5" fill="#fff"/><circle cx="197" cy="139" r="5" fill="#fff"/></g></g>
    <g class="kbrow"><path d="M84 100 Q110 86 136 98" fill="none" stroke="${PIK}" stroke-width="10" stroke-linecap="round"/><path d="M164 98 Q190 86 216 100" fill="none" stroke="${PIK}" stroke-width="10" stroke-linecap="round"/></g>
    <g class="kmouth" style="transform-origin:150px 200px;transform:scaleY(0.12)"><path d="M118 196 Q150 192 182 196 Q176 246 150 246 Q124 246 118 196 Z" fill="#5a1414" stroke="${PIK}" stroke-width="8" stroke-linejoin="round"/><ellipse cx="150" cy="232" rx="16" ry="8" fill="#ff7a8a"/></g>
    <path d="M120 196 Q150 206 180 196" fill="none" stroke="${PIK}" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="84" cy="182" rx="14" ry="8" fill="#ff8a5a" opacity=".35"/><ellipse cx="216" cy="182" rx="14" ry="8" fill="#ff8a5a" opacity=".35"/>` :
    `<circle cx="150" cy="150" r="46" fill="#3a2a0a" stroke="${PIK}" stroke-width="9"/>`;
  return psv('0 0 300 560', `<defs>${rg('kb' + id, '#fff7c2', col, '34%', '28%')}${lg('kl' + id, '#fff1a8', '#d39a12', false)}</defs>
    ${arms}
    <path d="M124 262 L124 520 Q124 544 150 544 Q176 544 176 520 L176 262 Z" fill="url(#kl${id})" stroke="${PIK}" stroke-width="11" stroke-linejoin="round"/>
    <path d="M176 380 L222 380 L222 410 L200 410 L200 430 L222 430 L222 470 L176 470" fill="url(#kl${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
    <circle cx="150" cy="320" r="7" fill="#a87410"/><circle cx="150" cy="352" r="7" fill="#a87410"/><circle cx="150" cy="384" r="7" fill="#a87410"/><circle cx="150" cy="416" r="7" fill="#a87410"/>
    <path d="M138 280 L138 500" stroke="#fff" stroke-width="6" opacity=".45" stroke-linecap="round"/>
    <rect x="112" y="246" width="76" height="30" rx="10" fill="#e9b11c" stroke="${PIK}" stroke-width="9"/>
    <circle cx="150" cy="150" r="118" fill="url(#kb${id})" stroke="${PIK}" stroke-width="12"/>
    <circle cx="150" cy="150" r="98" fill="none" stroke="#d9a114" stroke-width="6" opacity=".7"/>
    <circle cx="150" cy="44" r="14" fill="#2a1a08" stroke="${PIK}" stroke-width="7"/>
    <path class="kshine" d="M66 110 A92 92 0 0 1 120 52" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".7"/>
    ${faceG}`);
}
// steel safe, viewBox 0 0 460 480. Rig: .sdoor (opens with sx 1 -> 0.12, transform-origin 40px = left hinge), .sdial (r, origin 230 220 inside the door),
// .sinner (the dark inside, shown when the door opens; put contents above the safe box in the scene)
function safeSVG(id) {
  return psv('0 0 460 480', `<defs>${lg('sf' + id, '#b9c4d0', '#5d6977')}${lg('sd' + id, '#d9e1ea', '#7d8996')}${rg('sn' + id, '#2a3240', '#0b0f16')}</defs>
    <rect x="20" y="20" width="420" height="420" rx="34" fill="url(#sf${id})" stroke="${PIK}" stroke-width="12"/>
    <rect class="sinner" x="46" y="46" width="368" height="368" rx="20" fill="url(#sn${id})" stroke="${PIK}" stroke-width="8"/>
    <path d="M60 200 L400 200 M60 310 L400 310" stroke="#3a4454" stroke-width="8"/>
    <rect x="60" y="440" width="70" height="30" rx="8" fill="#4a5462" stroke="${PIK}" stroke-width="9"/><rect x="330" y="440" width="70" height="30" rx="8" fill="#4a5462" stroke="${PIK}" stroke-width="9"/>
    <g class="sdoor" style="transform-origin:40px 230px">
      <rect x="40" y="40" width="380" height="380" rx="24" fill="url(#sd${id})" stroke="${PIK}" stroke-width="11"/>
      <rect x="66" y="66" width="328" height="328" rx="16" fill="none" stroke="#95a2b0" stroke-width="6"/>
      <g class="sdial" style="transform-origin:230px 220px"><circle cx="230" cy="220" r="74" fill="#3d4756" stroke="${PIK}" stroke-width="10"/><circle cx="230" cy="220" r="52" fill="#596476" stroke="${PIK}" stroke-width="6"/>
        <path d="M230 150 L230 172 M300 220 L278 220 M230 290 L230 268 M160 220 L182 220" stroke="#e6edf4" stroke-width="7" stroke-linecap="round"/><path d="M230 220 L230 176" stroke="#ffd34d" stroke-width="9" stroke-linecap="round"/></g>
      <rect x="350" y="180" width="30" height="90" rx="12" fill="#3d4756" stroke="${PIK}" stroke-width="8"/>
      <path d="M70 80 L170 80" stroke="#fff" stroke-width="8" opacity=".4" stroke-linecap="round"/></g>`);
}
// take-away burger box (clamshell), viewBox 0 0 320 260. Rig: .blid (opens with r -> -70, origin 40 120 = back hinge). Inside sits at y 100..150.
function burgerBoxSVG(id, col = '#ff8a3d') {
  return psv('0 0 320 260', `<defs>${lg('bx' + id, '#ffd1a3', col)}${lg('bxl' + id, '#ffe2c2', col)}</defs>
    <path d="M20 128 L300 128 L280 240 Q278 252 264 252 L56 252 Q42 252 40 240 Z" fill="url(#bx${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M60 170 Q160 186 260 170" fill="none" stroke="#c45a14" stroke-width="7" opacity=".5"/>
    <g class="blid" style="transform-origin:30px 128px"><path d="M20 128 Q20 30 160 26 Q300 30 300 128 Z" fill="url(#bxl${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
      <path d="M118 84 Q160 52 202 84 Z" fill="#e0782a" stroke="${PIK}" stroke-width="6" stroke-linejoin="round"/><rect x="114" y="88" width="92" height="10" rx="5" fill="#6aa832"/><rect x="116" y="100" width="88" height="14" rx="7" fill="#8a4a20"/>
      <path d="M60 70 Q90 44 140 38" fill="none" stroke="#fff" stroke-width="8" opacity=".55" stroke-linecap="round"/></g>`);
}
// door with a hasp and a handle, viewBox 0 0 440 800 (door 40..400 x 40..780). Hang a padlockSVG at about (300,360);
// .dkey = a key on a string hanging from the handle (330,470), swing it with r (origin 330 470).
function doorSVG(id, col = '#b5643a') {
  return psv('0 0 440 800', `<defs>${lg('dr' + id, '#e09a62', col)}</defs>
    <rect x="20" y="20" width="400" height="780" rx="14" fill="#5a3420" stroke="${PIK}" stroke-width="12"/>
    <rect x="40" y="40" width="360" height="760" rx="8" fill="url(#dr${id})" stroke="${PIK}" stroke-width="10"/>
    <rect x="80" y="90" width="280" height="250" rx="14" fill="none" stroke="#8a4a26" stroke-width="10"/><rect x="80" y="520" width="280" height="230" rx="14" fill="none" stroke="#8a4a26" stroke-width="10"/>
    <rect x="240" y="350" width="130" height="34" rx="8" fill="#9aa6b2" stroke="${PIK}" stroke-width="8"/>
    <circle cx="330" cy="470" r="26" fill="#ffd34d" stroke="${PIK}" stroke-width="9"/><rect x="250" y="458" width="80" height="24" rx="10" fill="#ffd34d" stroke="${PIK}" stroke-width="8"/>
    <g class="dkey" style="transform-origin:330px 470px"><path d="M330 470 L330 560" stroke="#f4ecd9" stroke-width="5"/>
      <circle cx="330" cy="580" r="24" fill="#ffd34d" stroke="${PIK}" stroke-width="8"/><circle cx="330" cy="580" r="9" fill="#5a3420"/>
      <path d="M330 604 L330 680 M330 650 L350 650 M330 668 L346 668" stroke="${PIK}" stroke-width="18" stroke-linecap="round"/><path d="M330 604 L330 680 M330 650 L350 650 M330 668 L346 668" stroke="#ffd34d" stroke-width="8" stroke-linecap="round"/></g>
    <path d="M60 70 L60 760" stroke="#fff" stroke-width="7" opacity=".22" stroke-linecap="round"/>`);
}

// ---------- added 03.11.2026 (ролик 021 «Телефон врёт кассе») ----------
// talking phone character, viewBox 0 0 300 560 (body 20..280 x 20..540, screen 38..262 x 70..470). Same face rig as keyCharSVG, so one
// talk/blink loop drives both: .keye (sy blink, origin 150 220), .kpup (x/y), .kbrow (y), .kmouth (sy 0..1 talk), .karmL/.karmR (r, origin
// 22/278 300; white gloves), .klegL/.klegR (r, origin 110/190 540), .pscr (screen colour layer, o), .pnfc (contactless waves on the back, o)
function talkPhoneSVG(id, col = '#4a5fd8') {
  const arm = (cls, x0, x1, ox) => `<g class="${cls}" style="transform-origin:${ox}px 300px"><path d="M${ox} 300 Q${x0} 330 ${x1} 392" fill="none" stroke="${PIK}" stroke-width="24" stroke-linecap="round"/><path d="M${ox} 300 Q${x0} 330 ${x1} 392" fill="none" stroke="${col}" stroke-width="11" stroke-linecap="round"/><circle cx="${x1}" cy="400" r="24" fill="#fff" stroke="${PIK}" stroke-width="7"/><path d="M${x1 - 10} 392 Q${x1} 386 ${x1 + 10} 392" stroke="#c9d2dc" stroke-width="4" fill="none"/></g>`;
  const leg = (cls, x) => `<g class="${cls}" style="transform-origin:${x}px 540px"><path d="M${x} 530 L${x} 590" stroke="${PIK}" stroke-width="20" stroke-linecap="round"/><path d="M${x} 530 L${x} 590" stroke="${col}" stroke-width="8" stroke-linecap="round"/><path d="M${x - 26} 606 Q${x - 26} 584 ${x} 584 Q${x + 34} 584 ${x + 34} 606 Z" fill="#ff4d5e" stroke="${PIK}" stroke-width="8" stroke-linejoin="round"/></g>`;
  return psv('0 0 300 560', `<defs>${lg('tp' + id, '#6b7cff', col)}${lg('ts' + id, '#eaf6ff', '#a9cdf2')}${lg('tsg' + id, '#d6ffb0', '#7ddf5a')}</defs>
    ${arm('karmL', -4, -24, 22)}${arm('karmR', 304, 324, 278)}${leg('klegL', 110)}${leg('klegR', 190)}
    <rect x="20" y="20" width="260" height="520" rx="46" fill="url(#tp${id})" stroke="${PIK}" stroke-width="12"/>
    <rect x="38" y="70" width="224" height="400" rx="22" fill="url(#ts${id})" stroke="${PIK}" stroke-width="6"/>
    <rect class="pscr" x="38" y="70" width="224" height="400" rx="22" fill="url(#tsg${id})" opacity="0"/>
    <rect x="115" y="36" width="70" height="18" rx="9" fill="#0a0c10"/><circle cx="200" cy="45" r="6" fill="#2a3150"/>
    <rect x="120" y="488" width="60" height="12" rx="6" fill="#0a0c10" opacity=".5"/>
    <path d="M50 110 L104 82" stroke="#fff" stroke-width="10" opacity=".55" stroke-linecap="round"/><path d="M50 140 L80 124" stroke="#fff" stroke-width="7" opacity=".35" stroke-linecap="round"/>
    <path d="M282 120 L282 200" stroke="#2a3150" stroke-width="8" stroke-linecap="round"/>
    <g class="pnfc" opacity="0"><path d="M150 440 m-20 -6 a24 24 0 0 1 40 0 M150 440 m-36 -16 a44 44 0 0 1 72 0" fill="none" stroke="#4a5fd8" stroke-width="7" stroke-linecap="round"/></g>
    <g class="keye" style="transform-origin:150px 220px"><ellipse cx="108" cy="220" rx="30" ry="35" fill="#fff" stroke="${PIK}" stroke-width="7"/><ellipse cx="192" cy="220" rx="30" ry="35" fill="#fff" stroke="${PIK}" stroke-width="7"/>
      <g class="kpup"><circle cx="112" cy="226" r="14" fill="${PIK}"/><circle cx="196" cy="226" r="14" fill="${PIK}"/><circle cx="117" cy="219" r="5" fill="#fff"/><circle cx="201" cy="219" r="5" fill="#fff"/></g></g>
    <g class="kbrow"><path d="M76 172 Q104 156 134 168" fill="none" stroke="${PIK}" stroke-width="10" stroke-linecap="round"/><path d="M166 168 Q196 156 224 172" fill="none" stroke="${PIK}" stroke-width="10" stroke-linecap="round"/></g>
    <g class="kmouth" style="transform-origin:150px 292px;transform:scaleY(0.12)"><path d="M112 288 Q150 284 188 288 Q182 346 150 346 Q118 346 112 288 Z" fill="#5a1414" stroke="${PIK}" stroke-width="8" stroke-linejoin="round"/><ellipse cx="150" cy="330" rx="18" ry="9" fill="#ff7a8a"/></g>
    <path d="M114 288 Q150 300 186 288" fill="none" stroke="${PIK}" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="78" cy="270" rx="15" ry="9" fill="#ff8a7a" opacity=".4"/><ellipse cx="222" cy="270" rx="15" ry="9" fill="#ff8a7a" opacity=".4"/>`);
}
// bank card, viewBox 0 0 520 330. 16 number slots as dots (.cd0 .. .cd15, light them with o or fill); label = small text top right.
// Rig: .cshine (sweep a highlight with x), .cdots (whole number row). c0/c1 = card gradient
function bankCardSVG(id, c0 = '#ffb84d', c1 = '#ff5f6d', label = 'КАРТА') {
  let d = ''; for (let g = 0; g < 4; g++) for (let k = 0; k < 4; k++) { const i = g * 4 + k; d += `<circle class="cd${i}" cx="${62 + g * 112 + k * 24}" cy="214" r="9" fill="#fff"/>`; }
  return psv('0 0 520 330', `<defs>${lg('bc' + id, c0, c1, false)}<clipPath id="bclp${id}"><rect x="10" y="10" width="500" height="310" rx="34"/></clipPath></defs>
    <rect x="10" y="10" width="500" height="310" rx="34" fill="url(#bc${id})" stroke="${PIK}" stroke-width="11"/>
    <g clip-path="url(#bclp${id})"><circle cx="460" cy="40" r="150" fill="#fff" opacity=".12"/><rect class="cshine" x="-200" y="-40" width="70" height="420" fill="#fff" opacity=".28" transform="rotate(20)"/></g>
    <rect x="56" y="92" width="78" height="60" rx="12" fill="#ffe58a" stroke="${PIK}" stroke-width="7"/><path d="M56 122 L134 122 M95 92 L95 152 M74 92 L74 152 M116 92 L116 152" stroke="#c99a1a" stroke-width="4"/>
    <g fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".9"><path d="M168 104 q10 18 0 36"/><path d="M184 96 q16 26 0 52"/><path d="M200 88 q22 34 0 68"/></g>
    <g class="cdots">${d}</g>
    <rect x="56" y="256" width="170" height="16" rx="8" fill="#fff" opacity=".55"/><rect x="250" y="256" width="70" height="16" rx="8" fill="#fff" opacity=".55"/>
    <text x="470" y="74" text-anchor="end" style="font:800 30px JB" fill="#fff" opacity=".9">${label}</text>
    <circle cx="420" cy="266" r="30" fill="#ff3b5c" opacity=".9"/><circle cx="458" cy="266" r="30" fill="#ffd34d" opacity=".85"/>
    <path d="M40 40 Q120 24 200 30" fill="none" stroke="#fff" stroke-width="8" opacity=".45" stroke-linecap="round"/>`);
}
// card payment terminal, viewBox 0 0 300 520 (screen 44..256 x 52..236). Rig: .tok (green check, o), .tbad (red cross, o),
// .tglow (green screen flash, o), .twaves (contactless symbol on the screen, o / s), .tbeep (top LED, o), .tscr (screen content group)
function terminalSVG(id) {
  let keys = ''; for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) keys += `<rect x="${62 + c * 64}" y="${300 + r * 46}" width="48" height="34" rx="9" fill="${r === 3 ? ['#ff4d5e', '#ffd34d', '#5fd36b'][c] : '#e2e8f0'}" stroke="${PIK}" stroke-width="5"/>`;
  return psv('0 0 300 520', `<defs>${lg('tm' + id, '#4a5266', '#1e2330')}${lg('tsc' + id, '#d8f3ff', '#9fd3ef')}</defs>
    <rect x="20" y="20" width="260" height="480" rx="40" fill="url(#tm${id})" stroke="${PIK}" stroke-width="12"/>
    <rect x="44" y="52" width="212" height="184" rx="16" fill="url(#tsc${id})" stroke="${PIK}" stroke-width="7"/>
    <rect class="tglow" x="44" y="52" width="212" height="184" rx="16" fill="#7ddf5a" opacity="0"/>
    <g class="tscr"><g class="twaves" style="transform-origin:150px 144px" fill="none" stroke="#2a3a6a" stroke-width="9" stroke-linecap="round"><path d="M118 112 q14 32 0 64"/><path d="M140 100 q22 44 0 88"/><path d="M162 88 q30 56 0 112"/></g></g>
    <g class="tok" opacity="0"><circle cx="150" cy="144" r="58" fill="#fff" stroke="${PIK}" stroke-width="7"/><path d="M120 146 L142 168 L182 120" fill="none" stroke="#2fa84f" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></g>
    <g class="tbad" opacity="0"><circle cx="150" cy="144" r="58" fill="#fff" stroke="${PIK}" stroke-width="7"/><path d="M124 118 L176 170 M176 118 L124 170" stroke="#ff3b5c" stroke-width="16" stroke-linecap="round"/></g>
    ${keys}
    <circle class="tbeep" cx="150" cy="36" r="8" fill="#7dff8a" opacity=".25"/>
    <path d="M40 80 L40 440" stroke="#fff" stroke-width="7" opacity=".18" stroke-linecap="round"/>`);
}
// paper bus ticket, viewBox 0 0 380 200. Rig: .thole (punched holes, o), .tcode (the code text), .tstub (tear-off part, r origin 300 0)
function ticketSVG(id, code = '★★★', col = '#ffe9a8') {
  return psv('0 0 380 200', `<defs>${lg('tk' + id, '#fffbe6', col)}</defs>
    <path d="M14 20 L366 20 L366 78 Q346 100 366 122 L366 180 L14 180 L14 122 Q34 100 14 78 Z" fill="url(#tk${id})" stroke="${PIK}" stroke-width="9" stroke-linejoin="round"/>
    <path d="M290 30 L290 170" stroke="#c4a35a" stroke-width="5" stroke-dasharray="10 9"/>
    <text x="40" y="66" style="font:800 26px JB" fill="#8a6a2a">БИЛЕТ</text><text class="tcode" x="40" y="132" style="font:900 52px Unb" fill="#2a3a6a">${code}</text>
    <rect x="40" y="148" width="200" height="10" rx="5" fill="#c4a35a" opacity=".6"/>
    <g class="thole" opacity="0"><circle cx="322" cy="62" r="13" fill="#1d2a44" stroke="${PIK}" stroke-width="4"/><circle cx="334" cy="104" r="13" fill="#1d2a44" stroke="${PIK}" stroke-width="4"/><circle cx="320" cy="146" r="13" fill="#1d2a44" stroke="${PIK}" stroke-width="4"/></g>`);
}
// secure chip with a vault door (the phone's "safe chip"), viewBox 0 0 320 320. Rig: .vdoor (sx 1 -> 0.15 opens, origin 70 160), .vdial (r, origin 170 160), .vin (inside)
function chipSafeSVG(id) {
  let pins = ''; for (let k = 0; k < 5; k++) { const p = 74 + k * 43; pins += `<rect x="${p - 8}" y="0" width="16" height="36" rx="5" fill="#d8dee6" stroke="${PIK}" stroke-width="5"/><rect x="${p - 8}" y="284" width="16" height="36" rx="5" fill="#d8dee6" stroke="${PIK}" stroke-width="5"/><rect x="0" y="${p - 8}" width="36" height="16" rx="5" fill="#d8dee6" stroke="${PIK}" stroke-width="5"/><rect x="284" y="${p - 8}" width="36" height="16" rx="5" fill="#d8dee6" stroke="${PIK}" stroke-width="5"/>`; }
  return psv('0 0 320 320', `<defs>${lg('cs' + id, '#3c4a63', '#161c28')}${lg('cv' + id, '#e3e9f0', '#8d99a8')}</defs>${pins}
    <rect x="28" y="28" width="264" height="264" rx="30" fill="url(#cs${id})" stroke="${PIK}" stroke-width="11"/>
    <path d="M44 60 L44 120 M60 44 L120 44" stroke="#5fe0ff" stroke-width="5" opacity=".5" stroke-linecap="round"/>
    <rect class="vin" x="70" y="80" width="200" height="160" rx="16" fill="#0b0f16" stroke="${PIK}" stroke-width="7"/>
    <g class="vdoor" style="transform-origin:70px 160px"><rect x="70" y="80" width="200" height="160" rx="16" fill="url(#cv${id})" stroke="${PIK}" stroke-width="8"/>
      <g class="vdial" style="transform-origin:170px 160px"><circle cx="170" cy="160" r="40" fill="#3d4756" stroke="${PIK}" stroke-width="7"/><path d="M170 160 L170 128" stroke="#ffd34d" stroke-width="8" stroke-linecap="round"/><path d="M170 112 L170 120 M218 160 L210 160 M170 208 L170 200 M122 160 L130 160" stroke="#e6edf4" stroke-width="5"/></g>
      <rect x="240" y="135" width="14" height="50" rx="6" fill="#3d4756" stroke="${PIK}" stroke-width="5"/><path d="M86 96 L150 96" stroke="#fff" stroke-width="6" opacity=".45" stroke-linecap="round"/></g>`);
}

// ---------- added 04.11.2026 (ролик 022 «Утопил телефон — и в рис?») ----------
// bowl of rice, viewBox 0 0 520 380 (bowl rim y 170, mound peak y 60). Rig: .rmound (s/sy squash, origin 260 180), .rgrain (single grains,
// o/x/y for splashes), .rshine (o). Grains are placed with hash(), so every instance is identical and deterministic.
function riceBowlSVG(id, rim = '#3d7fd8') {
  let g = '';
  for (let k = 0; k < 120; k++) {
    const u = hash(k * 3.1 + 1), v = hash(k * 7.7 + 2), x = 70 + u * 380, top = 178 - 115 * Math.sin(Math.PI * (x - 70) / 380) * (0.55 + 0.45 * Math.sin(Math.PI * (x - 70) / 380));
    const y = top + v * (180 - top), r = (hash(k * 1.9) - 0.5) * 140;
    g += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="13" ry="6.5" transform="rotate(${r.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${k % 5 ? '#fffdf4' : '#efe8d4'}" stroke="#c9bf9f" stroke-width="2.5"/>`;
  }
  return psv('0 0 520 380', `<defs>${lg('rb' + id, '#ffffff', '#d7dde6')}${rg('rm' + id, '#fffef8', '#e6dcc0', '45%', '30%')}</defs>
    <ellipse cx="260" cy="356" rx="150" ry="18" fill="#000" opacity=".25"/>
    <g class="rmound" style="transform-origin:260px 180px"><path d="M60 182 Q70 70 260 56 Q450 70 460 182 Z" fill="url(#rm${id})" stroke="#bdb391" stroke-width="5"/>${g}
      <path class="rshine" d="M150 110 Q200 76 262 72" fill="none" stroke="#fff" stroke-width="12" opacity=".7" stroke-linecap="round"/></g>
    <path d="M30 170 L490 170 Q480 330 330 346 L190 346 Q40 330 30 170 Z" fill="url(#rb${id})" stroke="${PIK}" stroke-width="11" stroke-linejoin="round"/>
    <path d="M40 196 L480 196" stroke="${rim}" stroke-width="12"/><path d="M52 228 Q260 252 468 228" fill="none" stroke="${rim}" stroke-width="6" stroke-dasharray="22 14"/>
    <path d="M70 270 Q120 320 190 330" fill="none" stroke="#fff" stroke-width="9" opacity=".7" stroke-linecap="round"/>
    <rect x="200" y="340" width="120" height="24" rx="8" fill="#c9d2dc" stroke="${PIK}" stroke-width="8"/>`);
}
// water drop, viewBox 0 0 100 130 (tip at 50,0). Optional face (.dEye blink, .dMouth sy). Recolour with col.
function dropSVG(id, face = false, col = '#5fc8ff') {
  return psv('0 0 100 130', `<defs>${rg('dr' + id, '#e9fbff', col, '40%', '55%')}</defs>
    <path d="M50 4 Q86 62 88 86 Q88 124 50 126 Q12 124 12 86 Q14 62 50 4 Z" fill="url(#dr${id})" stroke="${PIK}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M30 80 Q30 62 42 50" fill="none" stroke="#fff" stroke-width="7" opacity=".85" stroke-linecap="round"/>
    ${face ? `<g class="dEye" style="transform-origin:50px 88px"><circle cx="38" cy="88" r="6" fill="${PIK}"/><circle cx="62" cy="88" r="6" fill="${PIK}"/></g><path class="dMouth" style="transform-origin:50px 106px" d="M40 104 Q50 112 60 104" fill="none" stroke="${PIK}" stroke-width="5" stroke-linecap="round"/>` : ''}`);
}
// charging-port macro (USB-C style), viewBox 0 0 760 380: metal shell, tongue with 8 pins. Rig: .pin0...pin7 (gold contacts),
// .prust (rust spots on the pins, o), .pzap (current bolts, o / s), .pwater (water inside the port, o / sx origin 380 190),
// .pcrumb (rice crumbs stuck in the port, o), .pglow (inner dark glow)
function portSVG(id) {
  let pins = '', rust = '', crumbs = '';
  for (let k = 0; k < 8; k++) {
    const x = 214 + k * 44;
    pins += `<rect class="pin${k}" x="${x}" y="168" width="26" height="44" rx="6" fill="url(#pp${id})" stroke="${PIK}" stroke-width="5"/>`;
    rust += `<circle cx="${x + 8 + 10 * hash(k)}" cy="${178 + 22 * hash(k + 4)}" r="${8 + 5 * hash(k + 9)}" fill="#b5541c"/><circle cx="${x + 18 - 8 * hash(k + 2)}" cy="${200 - 14 * hash(k + 6)}" r="${5 + 4 * hash(k + 7)}" fill="#8a3a12"/>`;
  }
  for (let k = 0; k < 14; k++) { const x = 170 + hash(k * 2.3) * 420, y = 120 + hash(k * 5.1) * 140, r = (hash(k) - 0.5) * 120;
    crumbs += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="15" ry="7" transform="rotate(${r.toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})" fill="#fffdf4" stroke="#a89c78" stroke-width="3"/>`; }
  return psv('0 0 760 380', `<defs>${lg('ps' + id, '#eef2f6', '#8a96a3')}${lg('pp' + id, '#fff1a8', '#d9a21b')}${lg('pi' + id, '#1a1f28', '#05070a')}</defs>
    <rect x="20" y="20" width="720" height="340" rx="170" fill="url(#ps${id})" stroke="${PIK}" stroke-width="14"/>
    <rect x="70" y="70" width="620" height="240" rx="120" fill="url(#pi${id})" stroke="${PIK}" stroke-width="10"/>
    <ellipse class="pglow" cx="380" cy="190" rx="250" ry="80" fill="#2a3a5a" opacity=".5"/>
    <rect x="180" y="150" width="400" height="80" rx="30" fill="#2a2f3a" stroke="${PIK}" stroke-width="8"/>${pins}
    <g class="prust" opacity="0">${rust}</g>
    <g class="pwater" opacity="0" style="transform-origin:380px 260px"><path d="M90 250 Q200 230 380 246 Q560 230 670 250 L660 290 Q380 320 100 290 Z" fill="#5fc8ff" opacity=".75"/><path d="M160 256 Q260 246 330 252" stroke="#fff" stroke-width="8" opacity=".7" stroke-linecap="round"/></g>
    <g class="pzap" opacity="0" style="transform-origin:380px 190px"><path d="M300 40 L270 120 L310 120 L280 200" fill="none" stroke="#ffe14d" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/><path d="M470 30 L440 110 L480 110 L456 180" fill="none" stroke="#ffe14d" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/></g>
    <g class="pcrumb" opacity="0">${crumbs}</g>
    <path d="M90 120 Q140 60 240 52" fill="none" stroke="#fff" stroke-width="12" opacity=".6" stroke-linecap="round"/>`);
}
// hair dryer, viewBox 0 0 380 320 (nozzle to the right at x 370, y 100). Rig: .hdwind (hot air lines, o / x), .hdbody
function hairDryerSVG(id, col = '#ff5fa2') {
  return psv('0 0 380 320', `<defs>${lg('hd' + id, '#ffd0e6', col)}</defs>
    <path d="M120 160 L100 300 Q100 312 114 312 L156 312 Q170 312 170 300 L176 170 Z" fill="url(#hd${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
    <rect x="122" y="220" width="40" height="30" rx="8" fill="#fff" stroke="${PIK}" stroke-width="6"/>
    <g class="hdbody"><circle cx="130" cy="110" r="96" fill="url(#hd${id})" stroke="${PIK}" stroke-width="11"/><rect x="200" y="66" width="140" height="88" rx="18" fill="url(#hd${id})" stroke="${PIK}" stroke-width="10"/>
      <rect x="330" y="58" width="34" height="104" rx="10" fill="#3a3f4f" stroke="${PIK}" stroke-width="8"/>
      <circle cx="130" cy="110" r="48" fill="#3a3f4f" stroke="${PIK}" stroke-width="8"/><path d="M106 110 L154 110 M130 86 L130 134 M113 93 L147 127 M147 93 L113 127" stroke="#7a8292" stroke-width="6"/>
      <path d="M70 60 Q96 30 140 26" fill="none" stroke="#fff" stroke-width="9" opacity=".6" stroke-linecap="round"/></g>
    <g class="hdwind" opacity="0" fill="none" stroke="#ff9a4d" stroke-width="9" stroke-linecap="round"><path d="M380 80 Q420 70 460 84"/><path d="M380 110 Q430 100 480 114"/><path d="M380 140 Q420 130 460 144"/></g>`);
}
// cotton swab, viewBox 0 0 380 70 (horizontal), tips at x 10..70 and 310..370
function swabSVG(id) {
  return psv('0 0 380 70', `<rect x="50" y="29" width="280" height="12" rx="6" fill="#f4f6f8" stroke="${PIK}" stroke-width="5"/>
    <ellipse cx="44" cy="35" rx="38" ry="24" fill="#fff" stroke="${PIK}" stroke-width="7"/><ellipse cx="336" cy="35" rx="38" ry="24" fill="#fff" stroke="${PIK}" stroke-width="7"/>
    <path d="M24 26 Q34 18 50 20 M316 26 Q326 18 342 20" fill="none" stroke="#c9d2dc" stroke-width="5" stroke-linecap="round"/>`);
}
// sushi roll with a phone as the filling, viewBox 0 0 440 330 (front cut face, nori around). Rig: .sface (phone face inside: .seye sy, .smouth sy),
// .schop (pair of chopsticks, r origin 380 40, o), .sseed (sesame, o)
function sushiRollSVG(id) {
  let rice = '', seed = '';
  for (let k = 0; k < 46; k++) { const a = 2 * Math.PI * k / 46 + hash(k) * 0.1, r = 120 + 14 * hash(k + 3), x = 220 + r * Math.cos(a), y = 170 + r * 0.78 * Math.sin(a);
    rice += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="14" ry="7" transform="rotate(${(a * 57.3 + 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="#fffdf4" stroke="#c9bf9f" stroke-width="2.5"/>`; }
  for (let k = 0; k < 12; k++) { const x = 90 + hash(k * 4.1) * 260, y = 70 + hash(k * 2.7) * 200; seed += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="5" ry="3" fill="#f2e2b0"/>`; }
  return psv('0 0 440 330', `<defs>${rg('sr' + id, '#ffffff', '#ece3c8')}${lg('sp' + id, '#6b7cff', '#3448c8')}</defs>
    <ellipse cx="220" cy="306" rx="190" ry="20" fill="#000" opacity=".25"/>
    <ellipse cx="220" cy="170" rx="196" ry="156" fill="#14261c" stroke="${PIK}" stroke-width="11"/>
    <ellipse cx="220" cy="170" rx="172" ry="134" fill="url(#sr${id})"/>${rice}
    <g class="sface"><rect x="152" y="96" width="136" height="150" rx="22" fill="url(#sp${id})" stroke="${PIK}" stroke-width="9"/><rect x="164" y="110" width="112" height="122" rx="12" fill="#cfe6ff"/>
      <g class="seye" style="transform-origin:220px 152px"><circle cx="198" cy="152" r="10" fill="${PIK}"/><circle cx="242" cy="152" r="10" fill="${PIK}"/></g>
      <path class="smouth" style="transform-origin:220px 196px" d="M200 200 Q220 186 240 200" fill="none" stroke="${PIK}" stroke-width="7" stroke-linecap="round"/>
      <path d="M190 132 L204 140 M250 132 L236 140" stroke="${PIK}" stroke-width="6" stroke-linecap="round"/></g>
    <g class="sseed">${seed}</g>
    <path d="M70 110 Q100 52 170 30" fill="none" stroke="#fff" stroke-width="9" opacity=".3" stroke-linecap="round"/>
    <g class="schop" style="transform-origin:380px 40px"><path d="M400 10 L250 150" stroke="${PIK}" stroke-width="20" stroke-linecap="round"/><path d="M400 10 L250 150" stroke="#d9a46a" stroke-width="10" stroke-linecap="round"/>
      <path d="M430 30 L270 160" stroke="${PIK}" stroke-width="20" stroke-linecap="round"/><path d="M430 30 L270 160" stroke="#c98d52" stroke-width="10" stroke-linecap="round"/></g>`);
}
// kitchen timer clock, viewBox 0 0 360 380 (dial centre 180 200, r 150). Rig: .chand (hour hand, r origin 180 200), .cmin (minute hand),
// .cbell (bells on top, r origin 180 50 for a ring), .cface (dial, fill)
function clockSVG(id, col = '#ff8a3d') {
  let ticks = ''; for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6, x1 = 180 + 122 * Math.sin(a), y1 = 200 - 122 * Math.cos(a), x2 = 180 + 136 * Math.sin(a), y2 = 200 - 136 * Math.cos(a);
    ticks += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${PIK}" stroke-width="${k % 3 ? 6 : 11}" stroke-linecap="round"/>`; }
  return psv('0 0 360 380', `<defs>${lg('ck' + id, '#ffd1a8', col)}${rg('cf' + id, '#ffffff', '#e3e8ef')}</defs>
    <g class="cbell" style="transform-origin:180px 50px"><circle cx="86" cy="58" r="40" fill="url(#ck${id})" stroke="${PIK}" stroke-width="10"/><circle cx="274" cy="58" r="40" fill="url(#ck${id})" stroke="${PIK}" stroke-width="10"/></g>
    <path d="M110 340 L80 376 M250 340 L280 376" stroke="${PIK}" stroke-width="14" stroke-linecap="round"/>
    <circle cx="180" cy="200" r="164" fill="url(#ck${id})" stroke="${PIK}" stroke-width="12"/>
    <circle class="cface" cx="180" cy="200" r="142" fill="url(#cf${id})" stroke="${PIK}" stroke-width="8"/>${ticks}
    <g class="chand" style="transform-origin:180px 200px"><path d="M180 200 L180 120" stroke="${PIK}" stroke-width="16" stroke-linecap="round"/></g>
    <g class="cmin" style="transform-origin:180px 200px"><path d="M180 200 L180 80" stroke="#ff3b5c" stroke-width="10" stroke-linecap="round"/></g>
    <circle cx="180" cy="200" r="16" fill="${PIK}"/><path d="M80 120 Q110 76 160 66" fill="none" stroke="#fff" stroke-width="10" opacity=".6" stroke-linecap="round"/>`);
}
// instruction booklet (open), viewBox 0 0 640 440: two pages with text lines. Rig: .mline0..mline5 (draw-on lines on the right page, pathLength 100, dash),
// .mmark (red underline, dash), .mpage (right page, sx flip origin 320 220), title on the left page
function manualSVG(id, title = 'ИНСТРУКЦИЯ', icon = 'drop') {   // icon: 'drop' (water, 022) | 'shield' (security memo, 025)
  let lines = ''; for (let k = 0; k < 6; k++) lines += `<path class="mline${k}" pathLength="100" d="M360 ${120 + k * 44} L${560 - (k % 3) * 40} ${120 + k * 44}" stroke="#5a6474" stroke-width="12" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/>`;
  return psv('0 0 640 440', `<defs>${lg('mn' + id, '#ffffff', '#e8e2d2')}</defs>
    <path d="M20 40 Q170 10 320 40 L320 420 Q170 390 20 420 Z" fill="url(#mn${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
    <g class="mpage" style="transform-origin:320px 220px"><path d="M320 40 Q470 10 620 40 L620 420 Q470 390 320 420 Z" fill="url(#mn${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>${lines}
      <path class="mmark" pathLength="100" d="M350 390 Q470 372 590 386" fill="none" stroke="#ff3b5c" stroke-width="12" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/></g>
    <text x="170" y="120" text-anchor="middle" style="font:900 27px Unb" fill="#2a3346">${title}</text>
    ${icon === 'shield' ? `<path d="M170 176 L224 196 Q226 268 170 304 Q114 268 116 196 Z" fill="#3de0ff" stroke="${PIK}" stroke-width="8" stroke-linejoin="round"/><path d="M146 240 L164 260 L198 222" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>` :
    `<circle cx="170" cy="240" r="62" fill="#5fc8ff" stroke="${PIK}" stroke-width="8"/><path d="M170 196 Q200 240 200 254 Q200 284 170 284 Q140 284 140 254 Q140 240 170 196 Z" fill="#fff" stroke="${PIK}" stroke-width="6"/>`}
    <path d="M70 340 L270 340 M90 370 L250 370" stroke="#9aa4b2" stroke-width="10" stroke-linecap="round"/><path d="M320 40 L320 420" stroke="${PIK}" stroke-width="8"/>`);
}

// ---------- added 05.11.2026 (ролик 023 «Часы отматывают разговор») ----------
// smartwatch, front view, viewBox 0 0 400 600: strap 120..280 from y 0 to 600, case 40..360 x 120..480 (rounded), screen 74..326 x 150..450,
// crown on the right (356..396, y 230..300) with a side button below. Rig: .wcrown (press with x -14, origin 376 265), .wscr (screen content
// group), .wclock (time face, o), .wrew (rewind ◀◀ arrows, o / r / s, origin 200 300), .wring (progress ring, dash, pathLength 100),
// .wl0..wl3 (text lines that draw on, dash), .wmic (orange mic dot, o), .wdim (black overlay = dimmed display, o), .wglow (flash, o),
// .wspk (speaker grill on the left side), .wmute (bell with a slash, o). col = case colour, strap = strap colour.
function smartwatchSVG(id, col = '#2b3340', strap = '#ff7a3d') {
  let lines = '';
  const wl = [[104, 236, 296], [104, 286, 268], [104, 336, 300], [104, 386, 230]];
  wl.forEach(([x, y, x2], k) => lines += `<path class="wl${k}" pathLength="100" d="M${x} ${y} L${x2} ${y}" stroke="${k % 2 ? '#9fe2ff' : '#ffffff'}" stroke-width="22" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/>`);
  let holes = ''; for (let k = 0; k < 5; k++) holes += `<circle cx="200" cy="${528 + k * 15}" r="0"/>`;
  return psv('0 0 400 600', `<defs>${lg('wst' + id, strap, '#b84a1a')}${lg('wc' + id, '#6a7586', col)}${rg('ws' + id, '#1d2a3a', '#05080d', '40%', '30%')}${lg('wcr' + id, '#e8edf3', '#8792a2')}</defs>
    <path d="M120 0 L280 0 L290 140 L110 140 Z" fill="url(#wst${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M110 460 L290 460 L280 600 L120 600 Z" fill="url(#wst${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M140 20 L150 120 M260 20 L250 120 M150 480 L140 580 M250 480 L260 580" stroke="#fff" stroke-width="5" opacity=".25" stroke-linecap="round"/>
    <circle cx="200" cy="530" r="9" fill="#7a2a10"/><circle cx="200" cy="562" r="9" fill="#7a2a10"/>
    <rect x="40" y="120" width="320" height="360" rx="88" fill="url(#wc${id})" stroke="${PIK}" stroke-width="12"/>
    <rect x="52" y="132" width="296" height="336" rx="78" fill="none" stroke="#fff" stroke-width="5" opacity=".28"/>
    <g class="wspk"><path d="M40 250 L40 330" stroke="${PIK}" stroke-width="16" stroke-linecap="round"/><path d="M34 262 L34 318" stroke="#9aa4b2" stroke-width="5" stroke-dasharray="6 7"/></g>
    <g class="wcrown" style="transform-origin:376px 265px"><rect x="352" y="228" width="44" height="74" rx="16" fill="url(#wcr${id})" stroke="${PIK}" stroke-width="9"/>
      <path d="M366 238 L366 292 M378 236 L378 294 M390 240 L390 290" stroke="#5a6474" stroke-width="4"/></g>
    <rect x="352" y="330" width="22" height="70" rx="10" fill="#5a6474" stroke="${PIK}" stroke-width="8"/>
    <rect x="74" y="150" width="252" height="300" rx="62" fill="url(#ws${id})" stroke="${PIK}" stroke-width="8"/>
    <g class="wscr">
      <g class="wclock"><text x="200" y="300" text-anchor="middle" style="font:800 92px Mont" fill="#ffffff">10:09</text>
        <text x="200" y="356" text-anchor="middle" style="font:700 30px Mont" fill="#ff9f2e">ЧТ 5</text>
        <circle cx="200" cy="198" r="16" fill="#7dff8a" opacity=".85"/></g>
      <path class="wring" pathLength="100" d="M200 170 A126 126 0 1 1 199.9 170" fill="none" stroke="#ff9f2e" stroke-width="12" stroke-linecap="round" transform="translate(0 10) scale(1 .98)" style="stroke-dasharray:100;stroke-dashoffset:100"/>
      <g class="wrew" style="transform-origin:200px 300px;opacity:0"><path d="M206 250 L130 300 L206 350 Z M286 250 L210 300 L286 350 Z" fill="#ff9f2e" stroke="${PIK}" stroke-width="7" stroke-linejoin="round"/></g>
      <g class="wtxt">${lines}</g>
      <g class="wmute" style="opacity:0;transform-origin:200px 300px"><path d="M160 340 L240 340 L228 318 L228 272 Q228 236 200 232 Q172 236 172 272 L172 318 Z" fill="#ffd34d" stroke="${PIK}" stroke-width="7" stroke-linejoin="round"/>
        <circle cx="200" cy="352" r="12" fill="#ffd34d" stroke="${PIK}" stroke-width="6"/><path d="M140 230 L262 362" stroke="#ff3b5c" stroke-width="14" stroke-linecap="round"/></g>
      <circle class="wmic" cx="200" cy="176" r="11" fill="#ff9f2e" style="opacity:0"/>
    </g>
    <rect class="wdim" x="74" y="150" width="252" height="300" rx="62" fill="#000" style="opacity:0"/>
    <rect class="wglow" x="74" y="150" width="252" height="300" rx="62" fill="#fff6d0" style="opacity:0"/>
    <path d="M96 210 Q104 170 150 162" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".35"/>`);
}
// chime bell with sound rings, viewBox 0 0 300 300 (bell centre 150,150). Rig: .cbell2 (swing r, origin 150 60), .cr1/.cr2/.cr3 (rings: o / s, origin 150 150)
function chimeBellSVG(id, col = '#ffd34d') {
  let rings = ''; [1, 2, 3].forEach(k => rings += `<g class="cr${k}" style="transform-origin:150px 150px;opacity:0"><path d="M${150 - 70 - k * 30} ${90 - k * 8} Q${150 - 100 - k * 34} 150 ${150 - 70 - k * 30} ${210 + k * 8}" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/><path d="M${150 + 70 + k * 30} ${90 - k * 8} Q${150 + 100 + k * 34} 150 ${150 + 70 + k * 30} ${210 + k * 8}" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/></g>`);
  return psv('0 0 300 300', `<defs>${lg('cb2' + id, '#fff3b0', col)}</defs>${rings}
    <g class="cbell2" style="transform-origin:150px 60px"><circle cx="150" cy="56" r="14" fill="url(#cb2${id})" stroke="${PIK}" stroke-width="8"/>
      <path d="M90 210 L210 210 L196 182 L196 120 Q196 70 150 66 Q104 70 104 120 L104 182 Z" fill="url(#cb2${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
      <path d="M120 120 Q122 92 146 84" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".7"/>
      <circle cx="150" cy="228" r="18" fill="url(#cb2${id})" stroke="${PIK}" stroke-width="8"/></g>`);
}
// autumn leaf (maple-ish), viewBox 0 0 120 120. col = leaf colour
function leafSVG(id, col = '#ff8a2e') {
  return psv('0 0 120 120', `<path d="M60 8 L72 40 L104 30 L90 60 L114 74 L80 82 L84 110 L60 92 L36 110 L40 82 L6 74 L30 60 L16 30 L48 40 Z" fill="${col}" stroke="${PIK}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M60 30 L60 114 M60 64 L86 48 M60 64 L34 48" stroke="${PIK}" stroke-width="4" opacity=".55" fill="none"/>`);
}

// ---------- added 06.11.2026 (ролик 024 «3 897 новых игр в Steam») ----------
// talking game box (a boxed game, not a real title), viewBox 0 0 360 520 (case 20..340 x 20..500, spine 20..58, cover 62..330 x 34..488).
// Same face rig as talkPhoneSVG/keyCharSVG, so one talk/blink loop drives it: .keye (sy, origin 196 170), .kpup (x/y), .kbrow (y),
// .kmouth (sy 0..1 talk), .karmL/.karmR (r, origin 24/336 300; white gloves), .klegL/.klegR (r, origin 130/250 500).
// Cover art: a hero whose raised hand has six fingers (.ghand origin 268 352; fingers .gf0 .. .gf5, origin at the palm), .gtag (the
// round «ИИ» sticker top right, o / s, origin 300 70), .gshine (sweep highlight with x). face=false gives a plain shelf box.
function gameBoxSVG(id, c0 = '#ff5fd2', c1 = '#6a3cff', title = 'КВЕСТ', face = true, tag = true) {
  const arm = (cls, x0, x1, ox) => `<g class="${cls}" style="transform-origin:${ox}px 300px"><path d="M${ox} 300 Q${x0} 330 ${x1} 392" fill="none" stroke="${PIK}" stroke-width="24" stroke-linecap="round"/><path d="M${ox} 300 Q${x0} 330 ${x1} 392" fill="none" stroke="${c1}" stroke-width="11" stroke-linecap="round"/><circle cx="${x1}" cy="400" r="24" fill="#fff" stroke="${PIK}" stroke-width="7"/><path d="M${x1 - 10} 392 Q${x1} 386 ${x1 + 10} 392" stroke="#c9d2dc" stroke-width="4" fill="none"/></g>`;
  const leg = (cls, x) => `<g class="${cls}" style="transform-origin:${x}px 500px"><path d="M${x} 490 L${x} 550" stroke="${PIK}" stroke-width="20" stroke-linecap="round"/><path d="M${x} 490 L${x} 550" stroke="${c1}" stroke-width="8" stroke-linecap="round"/><path d="M${x - 26} 566 Q${x - 26} 544 ${x} 544 Q${x + 34} 544 ${x + 34} 566 Z" fill="#ffd34d" stroke="${PIK}" stroke-width="8" stroke-linejoin="round"/></g>`;
  let fing = ''; for (let k = 0; k < 6; k++) { const a = -70 + k * 26, r = a * Math.PI / 180, x2 = 268 + Math.sin(r) * 46, y2 = 340 - Math.cos(r) * 46;
    fing += `<g class="gf${k}" style="transform-origin:268px 344px"><path d="M268 344 L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${PIK}" stroke-width="17" stroke-linecap="round"/><path d="M268 344 L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="#ffcf9f" stroke-width="8" stroke-linecap="round"/></g>`; }
  return psv('0 0 360 520', `<defs>${lg('gb' + id, c0, c1)}${lg('gs' + id, '#ffb36b', '#ff5f8a')}<clipPath id="gcl${id}"><rect x="62" y="34" width="268" height="454" rx="16"/></clipPath></defs>
    ${face ? arm('karmL', 0, -22, 24) + arm('karmR', 360, 382, 336) + leg('klegL', 130) + leg('klegR', 250) : ''}
    <rect x="20" y="20" width="320" height="480" rx="26" fill="#1e1830" stroke="${PIK}" stroke-width="12"/>
    <rect x="26" y="30" width="30" height="460" rx="10" fill="#2e2648"/><path d="M41 60 L41 460" stroke="#4b3f70" stroke-width="6" stroke-dasharray="18 14"/>
    <g clip-path="url(#gcl${id})">
      <rect x="62" y="34" width="268" height="454" fill="url(#gb${id})"/>
      <circle cx="270" cy="300" r="120" fill="url(#gs${id})" opacity=".55"/>
      <path d="M62 420 Q140 380 200 410 Q260 440 330 400 L330 488 L62 488 Z" fill="#2a1a4a" opacity=".85"/>
      <g class="ghero"><circle cx="188" cy="372" r="30" fill="#ffcf9f" stroke="${PIK}" stroke-width="8"/><path d="M160 360 Q188 322 218 356 Q200 346 188 350 Q176 346 160 360 Z" fill="#3a2414" stroke="${PIK}" stroke-width="6"/>
        <path d="M150 488 Q150 412 188 404 Q226 412 228 488 Z" fill="#26c6ff" stroke="${PIK}" stroke-width="9"/><path d="M216 420 Q240 392 262 362" stroke="${PIK}" stroke-width="22" stroke-linecap="round" fill="none"/><path d="M216 420 Q240 392 262 362" stroke="#26c6ff" stroke-width="11" stroke-linecap="round" fill="none"/>
        <g class="ghand" style="transform-origin:268px 352px">${fing}<circle cx="268" cy="350" r="19" fill="#ffcf9f" stroke="${PIK}" stroke-width="7"/></g></g>
      <rect class="gshine" x="-120" y="0" width="60" height="560" fill="#fff" opacity=".22" transform="rotate(18)"/>
    </g>
    <rect x="62" y="34" width="268" height="454" rx="16" fill="none" stroke="${PIK}" stroke-width="6"/>
    <rect x="80" y="48" width="${face ? 150 : 200}" height="44" rx="12" fill="#0f0a1c" opacity=".75"/><text x="${face ? 155 : 180}" y="80" text-anchor="middle" style="font:900 28px Unb" fill="#fff">${title}</text>
    ${face ? `<g class="keye" style="transform-origin:196px 170px"><ellipse cx="156" cy="170" rx="30" ry="35" fill="#fff" stroke="${PIK}" stroke-width="7"/><ellipse cx="236" cy="170" rx="30" ry="35" fill="#fff" stroke="${PIK}" stroke-width="7"/>
      <g class="kpup"><circle cx="160" cy="176" r="14" fill="${PIK}"/><circle cx="240" cy="176" r="14" fill="${PIK}"/><circle cx="165" cy="169" r="5" fill="#fff"/><circle cx="245" cy="169" r="5" fill="#fff"/></g></g>
    <g class="kbrow"><path d="M124 122 Q152 106 182 118" fill="none" stroke="${PIK}" stroke-width="10" stroke-linecap="round"/><path d="M210 118 Q240 106 268 122" fill="none" stroke="${PIK}" stroke-width="10" stroke-linecap="round"/></g>
    <g class="kmouth" style="transform-origin:196px 242px;transform:scaleY(0.12)"><path d="M158 238 Q196 234 234 238 Q228 292 196 292 Q164 292 158 238 Z" fill="#5a1414" stroke="${PIK}" stroke-width="8" stroke-linejoin="round"/><ellipse cx="196" cy="278" rx="17" ry="8" fill="#ff7a8a"/></g>
    <path d="M160 238 Q196 250 232 238" fill="none" stroke="${PIK}" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="122" cy="214" rx="15" ry="9" fill="#ff8a7a" opacity=".5"/><ellipse cx="270" cy="214" rx="15" ry="9" fill="#ff8a7a" opacity=".5"/>` : ''}
    ${tag ? `<g class="gtag" style="transform-origin:300px 70px"><circle cx="300" cy="70" r="40" fill="#fff36b" stroke="${PIK}" stroke-width="8"/><text x="300" y="84" text-anchor="middle" style="font:900 36px Unb" fill="${PIK}">ИИ</text></g>` : ''}
    <path d="M74 50 Q120 40 170 42" fill="none" stroke="#fff" stroke-width="7" opacity=".5" stroke-linecap="round"/>`);
}
// tally counter clicker, viewBox 0 0 260 300 (window 50..210 x 120..190). Rig: .tbtn (button press y, origin 130 40), .tdig (text in the window)
function tallySVG(id) {
  return psv('0 0 260 300', `<defs>${lg('ty' + id, '#e8eef6', '#8a9bb0')}</defs>
    <rect x="114" y="20" width="32" height="40" rx="8" class="tbtn" fill="#ff4d5e" stroke="${PIK}" stroke-width="8"/>
    <circle cx="130" cy="170" r="118" fill="url(#ty${id})" stroke="${PIK}" stroke-width="12"/><circle cx="130" cy="170" r="96" fill="none" stroke="#fff" stroke-width="5" opacity=".5"/>
    <rect x="50" y="130" width="160" height="70" rx="12" fill="#0f1420" stroke="${PIK}" stroke-width="7"/><text class="tdig" x="130" y="182" text-anchor="middle" style="font:800 48px JB" fill="#7dff8a">0000</text>
    <path d="M230 250 Q260 280 250 296" fill="none" stroke="${PIK}" stroke-width="10" stroke-linecap="round"/><circle cx="252" cy="296" r="10" fill="#c9d2dc" stroke="${PIK}" stroke-width="6"/>
    <path d="M60 110 Q90 74 140 70" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".6"/>`);
}

// =====================================================================================================================
// added 07.11.2026 (ролик 025 «Выключать телефон раз в неделю»)
// ---------- phone cutaway: the inside of a phone as a little room, viewBox 0 0 520 900.
//   Top: the SHELF (= memory/storage, keeps things when off) — plank at y 320..346, items .shp1 (photo), .sha1/.sha2 (apps), .shp2 (photos).
//   Bottom: the TABLE (= RAM, emptied when off) — top at y 690..716, items .tb1 (music), .tb2 (browser window), .tb3 (game pad).
//   .pdark — black screen overlay (o 0..1, starts hidden), .pbtn — side power button (x to press), .pscr — the wall (screen).
//   All item groups have transform-box: fill-box, so tween r/s/x/y around their own centre.
function phoneCutawaySVG(id, body = '#2b3446') {
  const fb = 'style="transform-box:fill-box;transform-origin:center"';
  return psv('0 0 520 900', `<defs>${lg('pcb' + id, '#4a5670', body)}${lg('pcw' + id, '#1f6a7a', '#0d2d3c')}${lg('pcwd' + id, '#d9955a', '#9a5a2e')}
    ${lg('pcg' + id, '#7dd3ff', '#3a7bd8')}${lg('pco' + id, '#ffcf5a', '#ff7a3d')}${lg('pcs' + id, '#ffe9a8', '#ffb84d')}</defs>
  <rect x="10" y="10" width="500" height="880" rx="74" fill="url(#pcb${id})" stroke="${PIK}" stroke-width="12"/>
  <path d="M40 120 Q40 40 120 40" fill="none" stroke="#fff" stroke-width="8" opacity=".22" stroke-linecap="round"/>
  <g class="pbtn"><rect x="504" y="250" width="22" height="110" rx="9" fill="#ff5f6d" stroke="${PIK}" stroke-width="7"/></g>
  <rect x="-6" y="230" width="18" height="70" rx="7" fill="#7a869c" stroke="${PIK}" stroke-width="6"/><rect x="-6" y="320" width="18" height="70" rx="7" fill="#7a869c" stroke="${PIK}" stroke-width="6"/>
  <rect class="pscr" x="40" y="70" width="440" height="780" rx="44" fill="url(#pcw${id})"/>
  <path d="M40 520 L480 520 L480 806 Q480 850 436 850 L84 850 Q40 850 40 806 Z" fill="#0b2430" opacity=".55"/>
  <circle cx="380" cy="160" r="60" fill="#5fe0ff" opacity=".08"/><circle cx="120" cy="470" r="90" fill="#5fe0ff" opacity=".06"/>
  <rect x="200" y="30" width="120" height="24" rx="12" fill="#0a0c10"/>
  <!-- shelf -->
  <path d="M110 346 L130 380 L150 346 Z M370 346 L390 380 L410 346 Z" fill="#7a4a26" stroke="${PIK}" stroke-width="7" stroke-linejoin="round"/>
  <rect x="66" y="318" width="388" height="30" rx="9" fill="url(#pcwd${id})" stroke="${PIK}" stroke-width="9"/><path d="M80 326 L440 326" stroke="#ffd29a" stroke-width="5" opacity=".6"/>
  <g class="shp1" ${fb}><rect x="84" y="200" width="104" height="118" rx="10" fill="#f4ecd9" stroke="${PIK}" stroke-width="8"/><rect x="98" y="214" width="76" height="72" rx="4" fill="#8fd3ff"/>
    <path d="M98 286 L124 248 L142 270 L156 254 L174 286 Z" fill="#3aa86a"/><circle cx="160" cy="232" r="9" fill="#ffd34d"/></g>
  <g class="sha1" ${fb}><rect x="206" y="234" width="84" height="84" rx="22" fill="url(#pcg${id})" stroke="${PIK}" stroke-width="8"/><path d="M228 296 L248 256 L268 296 Z" fill="#fff"/><path d="M216 246 Q222 240 236 240" stroke="#fff" stroke-width="5" opacity=".6" fill="none" stroke-linecap="round"/></g>
  <g class="sha2" ${fb}><rect x="302" y="234" width="84" height="84" rx="22" fill="url(#pco${id})" stroke="${PIK}" stroke-width="8"/><circle cx="344" cy="276" r="20" fill="none" stroke="#fff" stroke-width="9"/><path d="M312 246 Q318 240 332 240" stroke="#fff" stroke-width="5" opacity=".6" fill="none" stroke-linecap="round"/></g>
  <g class="shp2" ${fb}><rect x="398" y="262" width="46" height="56" rx="6" fill="#f4ecd9" stroke="${PIK}" stroke-width="7" transform="rotate(-8 421 290)"/><rect x="402" y="256" width="46" height="62" rx="6" fill="#fff6e0" stroke="${PIK}" stroke-width="7" transform="rotate(6 425 287)"/></g>
  <!-- table -->
  <path d="M108 716 L100 836 M412 716 L420 836" stroke="${PIK}" stroke-width="26" stroke-linecap="round"/><path d="M108 716 L100 836 M412 716 L420 836" stroke="#9a5a2e" stroke-width="12" stroke-linecap="round"/>
  <rect x="70" y="686" width="380" height="32" rx="10" fill="url(#pcwd${id})" stroke="${PIK}" stroke-width="9"/><path d="M84 695 L436 695" stroke="#ffd29a" stroke-width="5" opacity=".6"/>
  <g class="tb1" ${fb}><rect x="88" y="598" width="92" height="88" rx="16" fill="#ff8ae0" stroke="${PIK}" stroke-width="8"/><circle cx="134" cy="642" r="24" fill="#3a1d50" stroke="${PIK}" stroke-width="5"/><circle cx="134" cy="642" r="9" fill="#ffd34d"/>
    <g class="tbnote"><path d="M150 560 L150 520 L176 512 L176 552" fill="none" stroke="#ffd34d" stroke-width="8" stroke-linecap="round"/><ellipse cx="144" cy="562" rx="11" ry="8" fill="#ffd34d"/><ellipse cx="170" cy="554" rx="11" ry="8" fill="#ffd34d"/></g></g>
  <g class="tb2" ${fb}><rect x="196" y="560" width="148" height="126" rx="12" fill="#f4f7ff" stroke="${PIK}" stroke-width="8"/><rect x="196" y="560" width="148" height="28" rx="12" fill="#3a7bd8" stroke="${PIK}" stroke-width="8"/>
    <circle cx="214" cy="574" r="5" fill="#ff5f6d"/><circle cx="230" cy="574" r="5" fill="#ffd34d"/><rect x="212" y="604" width="116" height="12" rx="6" fill="#b6c3dc"/><rect x="212" y="626" width="86" height="12" rx="6" fill="#b6c3dc"/><rect x="212" y="648" width="100" height="12" rx="6" fill="#b6c3dc"/></g>
  <g class="tb3" ${fb}><path d="M362 642 Q362 618 390 618 L414 618 Q442 618 442 642 L446 668 Q448 690 428 690 Q418 690 410 676 L394 676 Q386 690 376 690 Q356 690 358 668 Z" fill="#7dff8a" stroke="${PIK}" stroke-width="8" stroke-linejoin="round"/>
    <path d="M380 640 L380 656 M372 648 L388 648" stroke="${PIK}" stroke-width="6" stroke-linecap="round"/><circle cx="420" cy="642" r="5" fill="${PIK}"/><circle cx="430" cy="654" r="5" fill="${PIK}"/></g>
  <rect class="pdark" x="40" y="70" width="440" height="780" rx="44" fill="#03070b" style="opacity:0"/>
  <path d="M70 820 L460 120" stroke="#fff" stroke-width="18" opacity=".05" stroke-linecap="round"/>`);
}

// ---------- hacker / spy in a hoodie (small, cute, eyes glow), viewBox 0 0 220 280.
//   Rig: .hkarmL/.hkarmR (origin 62/158 150), .hkeye (sy blink), .hkpup (x/y), .hkmouth (sy), .hkbody (whole, fill-box)
function hackerSVG(id, hood = '#4a3a7a') {
  return psv('0 0 220 280', `<defs>${lg('hk' + id, '#6a58a8', hood)}${rg('hkf' + id, '#2a2f44', '#0b0d16')}</defs>
  <g class="hkbody">
  <path d="M86 246 L80 272 M134 246 L140 272" stroke="${PIK}" stroke-width="20" stroke-linecap="round"/><path d="M86 246 L80 272 M134 246 L140 272" stroke="#2a2f44" stroke-width="9" stroke-linecap="round"/>
  <g class="hkarmL" style="transform-origin:62px 150px"><path d="M62 150 Q30 180 40 214" fill="none" stroke="${PIK}" stroke-width="28" stroke-linecap="round"/><path d="M62 150 Q30 180 40 214" fill="none" stroke="${hood}" stroke-width="15" stroke-linecap="round"/><circle cx="40" cy="216" r="13" fill="#1a1d2a" stroke="${PIK}" stroke-width="6"/></g>
  <g class="hkarmR" style="transform-origin:158px 150px"><path d="M158 150 Q190 180 180 214" fill="none" stroke="${PIK}" stroke-width="28" stroke-linecap="round"/><path d="M158 150 Q190 180 180 214" fill="none" stroke="${hood}" stroke-width="15" stroke-linecap="round"/><circle cx="180" cy="216" r="13" fill="#1a1d2a" stroke="${PIK}" stroke-width="6"/></g>
  <path d="M56 140 Q110 116 164 140 L176 246 Q110 262 44 246 Z" fill="url(#hk${id})" stroke="${PIK}" stroke-width="9" stroke-linejoin="round"/>
  <path d="M96 150 L100 200 M124 150 L120 200" stroke="#d9d2ff" stroke-width="5" stroke-linecap="round"/><path d="M80 214 Q110 224 140 214" fill="none" stroke="#2c2350" stroke-width="7" stroke-linecap="round"/>
  <path d="M110 12 Q190 18 182 112 Q176 150 110 152 Q44 150 38 112 Q30 18 110 12 Z" fill="url(#hk${id})" stroke="${PIK}" stroke-width="10"/>
  <ellipse cx="110" cy="96" rx="56" ry="48" fill="url(#hkf${id})" stroke="${PIK}" stroke-width="7"/>
  <g class="hkeye" style="transform-box:fill-box;transform-origin:center"><ellipse cx="88" cy="90" rx="14" ry="11" fill="#7dfcff"/><ellipse cx="132" cy="90" rx="14" ry="11" fill="#7dfcff"/>
    <g class="hkpup"><circle cx="91" cy="91" r="5" fill="${PIK}"/><circle cx="135" cy="91" r="5" fill="${PIK}"/></g></g>
  <path d="M72 72 L102 80 M148 72 L118 80" stroke="#7dfcff" stroke-width="5" stroke-linecap="round" opacity=".9"/>
  <g class="hkmouth" style="transform-box:fill-box;transform-origin:center"><path d="M92 118 Q110 132 128 118" fill="none" stroke="#7dfcff" stroke-width="6" stroke-linecap="round"/></g>
  <path d="M60 40 Q80 22 110 20" fill="none" stroke="#fff" stroke-width="6" opacity=".3" stroke-linecap="round"/></g>`);
}

// ---------- app icon with a face (a sneaky/virus app), viewBox 0 0 220 220. Rig: .apeye (sy), .appup (x/y), .apmouth (sy), .apbrow (y/r), .apbadge (s)
function appIconSVG(id, c0 = '#ff5f6d', c1 = '#8a1fd8', face = true, badge = true) {
  const fb = 'style="transform-box:fill-box;transform-origin:center"';
  return psv('0 0 220 220', `<defs>${lg('ap' + id, c0, c1)}</defs>
  <rect x="12" y="12" width="196" height="196" rx="54" fill="url(#ap${id})" stroke="${PIK}" stroke-width="11"/>
  <path d="M40 52 Q48 34 80 32" fill="none" stroke="#fff" stroke-width="9" opacity=".55" stroke-linecap="round"/>
  ${face ? `<g class="apbrow" ${fb}><path d="M56 70 L96 86 M164 70 L124 86" stroke="${PIK}" stroke-width="11" stroke-linecap="round"/></g>
  <g class="apeye" ${fb}><ellipse cx="80" cy="104" rx="20" ry="17" fill="#fff" stroke="${PIK}" stroke-width="7"/><ellipse cx="140" cy="104" rx="20" ry="17" fill="#fff" stroke="${PIK}" stroke-width="7"/>
    <g class="appup"><circle cx="84" cy="108" r="8" fill="${PIK}"/><circle cx="144" cy="108" r="8" fill="${PIK}"/></g></g>
  <g class="apmouth" ${fb}><path d="M66 146 Q110 186 154 146 Z" fill="#3a0a1a" stroke="${PIK}" stroke-width="8" stroke-linejoin="round"/><path d="M82 150 L90 162 L98 152 L106 164 L114 152 L122 164 L130 152 L138 160" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round"/></g>` : ''}
  ${badge ? `<g class="apbadge" ${fb}><circle cx="196" cy="24" r="26" fill="#ff3b5c" stroke="${PIK}" stroke-width="8"/><text x="196" y="36" text-anchor="middle" style="font:900 32px Unb" fill="#fff">!</text></g>` : ''}`);
}

// ---------- trash bin, viewBox 0 0 220 300. Rig: .tlid (lid, rotate around its left hinge 20,70)
function trashBinSVG(id, col = '#5fb0ff') {
  return psv('0 0 220 300', `<defs>${lg('tb' + id, '#c9e6ff', col)}</defs>
  <path d="M28 88 L44 288 L176 288 L192 88 Z" fill="url(#tb${id})" stroke="${PIK}" stroke-width="11" stroke-linejoin="round"/>
  <path d="M76 116 L82 260 M110 116 L110 260 M144 116 L138 260" stroke="${PIK}" stroke-width="8" stroke-linecap="round" opacity=".55"/>
  <path d="M46 104 L56 270" stroke="#fff" stroke-width="7" opacity=".5" stroke-linecap="round"/>
  <g class="tlid" style="transform-origin:20px 70px"><rect x="12" y="56" width="196" height="30" rx="12" fill="url(#tb${id})" stroke="${PIK}" stroke-width="10"/><path d="M84 56 Q84 30 110 30 Q136 30 136 56" fill="none" stroke="${PIK}" stroke-width="10"/></g>`);
}

// ---------- tear-off calendar, viewBox 0 0 260 300. txt = big text on the page (one or two words, \n splits lines), .cpage (flip, origin top)
function calendarSVG(id, top = 'УБОРКА', txt = '', col = '#ff5f6d') {
  const ls = txt.split('\n'); const fs = ls.length > 1 ? 50 : 70;
  return psv('0 0 260 300', `<defs>${lg('cl' + id, '#ffffff', '#e9e1cf')}</defs>
  <rect x="14" y="40" width="232" height="246" rx="22" fill="url(#cl${id})" stroke="${PIK}" stroke-width="10"/>
  <path d="M14 62 Q14 40 36 40 L224 40 Q246 40 246 62 L246 108 L14 108 Z" fill="${col}" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
  <text x="130" y="88" text-anchor="middle" style="font:900 32px Unb" fill="#fff">${top}</text>
  <g class="cpage" style="transform-origin:130px 108px">${ls.map((l, i) => `<text x="130" y="${190 + (i - (ls.length - 1) / 2) * 62}" text-anchor="middle" style="font:900 ${fs}px Unb" fill="${PIK}">${l}</text>`).join('')}</g>
  <rect x="62" y="20" width="18" height="44" rx="9" fill="#9aa4b0" stroke="${PIK}" stroke-width="6"/><rect x="180" y="20" width="18" height="44" rx="9" fill="#9aa4b0" stroke="${PIK}" stroke-width="6"/>`);
}

// ---------- broom, viewBox 0 0 160 420 (handle top, bristles bottom). Rotate around the top hand ~ (80, 80)
function broomSVG(id) {
  return psv('0 0 160 420', `<defs>${lg('br' + id, '#ffe08a', '#e0a33a')}</defs>
  <path d="M80 10 L80 280" stroke="${PIK}" stroke-width="26" stroke-linecap="round"/><path d="M80 10 L80 280" stroke="#b5643a" stroke-width="13" stroke-linecap="round"/>
  <path d="M50 270 L110 270 L148 404 Q80 418 12 404 Z" fill="url(#br${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M60 290 L44 396 M80 290 L80 400 M100 290 L116 396" stroke="#b07a28" stroke-width="6" stroke-linecap="round"/><rect x="44" y="258" width="72" height="24" rx="8" fill="#ff5f6d" stroke="${PIK}" stroke-width="8"/>`);
}

// ---------- big power button on a pedestal, viewBox 0 0 300 240. Rig: .pwcap (press: y down / sy), .pwglow (o)
function powerButtonSVG(id, col = '#ff5f6d') {
  return psv('0 0 300 240', `<defs>${lg('pw' + id, '#ff9aa6', col)}${lg('pwb' + id, '#4a5670', '#1c2230')}</defs>
  <ellipse class="pwglow" cx="150" cy="110" rx="130" ry="70" fill="${col}" opacity=".0"/>
  <path d="M30 170 L270 170 L250 230 L50 230 Z" fill="url(#pwb${id})" stroke="${PIK}" stroke-width="11" stroke-linejoin="round"/>
  <ellipse cx="150" cy="170" rx="120" ry="30" fill="#2b3446" stroke="${PIK}" stroke-width="10"/>
  <g class="pwcap" style="transform-origin:150px 170px"><path d="M56 150 L56 110 Q150 60 244 110 L244 150 Q150 196 56 150 Z" fill="#a8283d" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
    <ellipse cx="150" cy="110" rx="94" ry="40" fill="url(#pw${id})" stroke="${PIK}" stroke-width="10"/>
    <path d="M128 96 A30 22 0 1 0 172 96" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/><path d="M150 82 L150 108" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
    <path d="M86 98 Q100 84 130 80" fill="none" stroke="#fff" stroke-width="7" opacity=".55" stroke-linecap="round"/></g>`);
}

// ---------- gauge with two zones (left lbl0, right lbl1; labels in pills under the base, .glbl0/.glbl1), viewBox 0 0 640 430. Rig: .gneedle (rotate around 320 340; -58 = left zone, +58 = right zone)
function gaugeSVG(id, lbl0 = 'ИНОГДА', lbl1 = 'ВСЕГДА', c0 = '#ffb84d', c1 = '#5fe0ff') {
  return psv('0 0 640 430', `<defs>${lg('gz' + id, '#3a4660', '#1c2230')}</defs>
  <path d="M40 340 A280 280 0 0 1 600 340 Z" fill="url(#gz${id})" stroke="${PIK}" stroke-width="12" stroke-linejoin="round"/>
  <path d="M80 340 A240 240 0 0 1 320 100" fill="none" stroke="${c0}" stroke-width="40"/><path d="M320 100 A240 240 0 0 1 560 340" fill="none" stroke="${c1}" stroke-width="40"/>
  <path d="M80 340 A240 240 0 0 1 560 340" fill="none" stroke="${PIK}" stroke-width="6" opacity=".5"/>
  <rect x="40" y="356" width="250" height="64" rx="32" fill="#0d1a22" stroke="${c0}" stroke-width="6"/><rect x="350" y="356" width="250" height="64" rx="32" fill="#0d1a22" stroke="${c1}" stroke-width="6"/>
  <text class="glbl0" x="165" y="401" text-anchor="middle" style="font:900 36px Unb" fill="${c0}">${lbl0}</text><text class="glbl1" x="475" y="401" text-anchor="middle" style="font:900 36px Unb" fill="${c1}">${lbl1}</text>
  <g class="gneedle" style="transform-origin:320px 340px"><path d="M308 340 L320 120 L332 340 Z" fill="#fff" stroke="${PIK}" stroke-width="8" stroke-linejoin="round"/></g>
  <circle cx="320" cy="340" r="30" fill="#ff5f6d" stroke="${PIK}" stroke-width="10"/>`);
}

// ---------- popcorn bucket, viewBox 0 0 200 240
function popcornSVG(id) {
  let k = ''; for (let i = 0; i < 9; i++) k += `<circle cx="${40 + (i % 5) * 30 + (i > 4 ? 15 : 0)}" cy="${i > 4 ? 40 : 66}" r="22" fill="#fff6d8" stroke="${PIK}" stroke-width="6"/>`;
  return psv('0 0 200 240', `<path d="M24 80 L176 80 L156 232 L44 232 Z" fill="#fff" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M56 80 L66 232 M100 80 L100 232 M144 80 L134 232" stroke="#ff3b5c" stroke-width="18"/>${k}`);
}

// ---------- added 08.11.2026 (ролик 026 «Спутник GPS») ----------
// satellite with a face (the GPS narrator), viewBox 0 0 640 420: gold-foil body 240..400 x 120..300, solar wings left/right,
// transmitter horn at the bottom (300, 330), atomic-clock dial on the top (320, 92). Rig: .spanL/.spanR (wings, r origin 240/400 210),
// .seye (sy blink, origin 320 196), .spup (x/y ±8), .sbrow (y / r), .smouth (sy 0 closed .. 1 open, origin 320 252), .shorn (s pulse,
// origin 320 320), .sclockh (clock hand, r origin 320 92), .sglow (horn glow, o). face=false draws a plain satellite (eyes off).
function satelliteSVG(id, face = true, foil = '#ffcc4d') {
  const wing = (cls, x0, dir) => { let cells = '';
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const x = x0 + dir * (34 + c * 46) - (dir < 0 ? 42 : 0); cells += `<rect x="${x}" y="${150 + r * 42}" width="40" height="36" rx="5" fill="url(#sw${id})" stroke="#0f2a5a" stroke-width="3"/>`; }
    const xe = x0 + dir * 222, xa = Math.min(x0 + dir * 26, xe), xb = Math.max(x0 + dir * 26, xe);
    return `<g class="${cls}" style="transform-origin:${x0}px 210px"><path d="M${x0} 210 L${x0 + dir * 30} 210" stroke="${PIK}" stroke-width="16"/><path d="M${x0} 210 L${x0 + dir * 30} 210" stroke="#c9ced8" stroke-width="7"/>
      <rect x="${xa}" y="142" width="${xb - xa}" height="138" rx="12" fill="#1a3d7a" stroke="${PIK}" stroke-width="10"/>${cells}
      <path d="M${xa + 10} 152 L${xb - 30} 152" stroke="#bfe6ff" stroke-width="5" stroke-linecap="round" opacity=".7"/></g>`; };
  let quilt = ''; for (let k = 0; k < 5; k++) quilt += `<path d="M${258 + k * 32} 132 Q${266 + k * 32} 210 ${254 + k * 32} 290" fill="none" stroke="#b07a10" stroke-width="3" opacity=".45"/>`;
  const faceG = face ? `<g class="seye" style="transform-origin:320px 196px"><ellipse cx="284" cy="196" rx="25" ry="29" fill="#fff" stroke="${PIK}" stroke-width="7"/><ellipse cx="356" cy="196" rx="25" ry="29" fill="#fff" stroke="${PIK}" stroke-width="7"/>
      <g class="spup"><circle cx="288" cy="200" r="12" fill="${PIK}"/><circle cx="360" cy="200" r="12" fill="${PIK}"/><circle cx="292" cy="195" r="4" fill="#fff"/><circle cx="364" cy="195" r="4" fill="#fff"/></g></g>
    <g class="sbrow" style="transform-origin:320px 158px"><path d="M262 160 Q284 148 304 158" fill="none" stroke="${PIK}" stroke-width="8" stroke-linecap="round"/><path d="M336 158 Q356 148 378 160" fill="none" stroke="${PIK}" stroke-width="8" stroke-linecap="round"/></g>
    <path d="M296 248 Q320 260 344 248" fill="none" stroke="${PIK}" stroke-width="7" stroke-linecap="round"/>
    <g class="smouth" style="transform-origin:320px 250px;transform:scaleY(0)"><path d="M294 248 Q320 296 346 248 Z" fill="#5a1020" stroke="${PIK}" stroke-width="6" stroke-linejoin="round"/><ellipse cx="320" cy="270" rx="12" ry="7" fill="#ff7a8a"/></g>
    <ellipse cx="262" cy="232" rx="13" ry="7" fill="#ff8a6a" opacity=".45"/><ellipse cx="378" cy="232" rx="13" ry="7" fill="#ff8a6a" opacity=".45"/>` : '';
  return psv('0 0 640 420', `<defs>${lg('sb' + id, '#fff0b0', foil)}${lg('sw' + id, '#4f9bff', '#1f4fb0')}${rg('sg' + id, 'rgba(255,240,150,1)', 'rgba(255,200,60,0)', '50%', '50%')}${lg('sh' + id, '#e8ecf2', '#8a93a3')}</defs>
    ${wing('spanL', 240, -1)}${wing('spanR', 400, 1)}
    <g class="sglow" style="opacity:0"><circle cx="320" cy="350" r="70" fill="url(#sg${id})"/></g>
    <g class="shorn" style="transform-origin:320px 320px"><path d="M290 298 L350 298 L372 346 L268 346 Z" fill="url(#sh${id})" stroke="${PIK}" stroke-width="9" stroke-linejoin="round"/><path d="M282 338 L358 338" stroke="#fff" stroke-width="4" opacity=".6"/></g>
    <path d="M320 120 L320 106" stroke="${PIK}" stroke-width="10"/>
    <circle cx="320" cy="88" r="30" fill="#fff" stroke="${PIK}" stroke-width="8"/><path d="M320 64 L320 70 M344 88 L338 88 M320 112 L320 106 M296 88 L302 88" stroke="${PIK}" stroke-width="4"/>
    <g class="sclockh" style="transform-origin:320px 88px"><path d="M320 88 L320 68" stroke="#ff3b5c" stroke-width="6" stroke-linecap="round"/></g><circle cx="320" cy="88" r="5" fill="${PIK}"/>
    <rect x="240" y="120" width="160" height="180" rx="22" fill="url(#sb${id})" stroke="${PIK}" stroke-width="11"/>${quilt}
    <path d="M254 140 Q256 128 270 128" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".8"/>
    <rect x="370" y="270" width="18" height="18" rx="4" fill="#3dff8a" stroke="${PIK}" stroke-width="4"/>${faceG}`);
}
// stopwatch, viewBox 0 0 300 360 (dial centre 150 205, r 118). Rig: .swhand (r origin 150 205), .swbtn (crown button, y press),
// .swring (progress arc, dash, pathLength 100)
function stopwatchSVG(id, col = '#ff5f6d') {
  let ticks = ''; for (let k = 0; k < 20; k++) { const a = k * Math.PI / 10, r0 = k % 5 ? 100 : 92; ticks += `<path d="M${(150 + r0 * Math.sin(a)).toFixed(1)} ${(205 - r0 * Math.cos(a)).toFixed(1)} L${(150 + 110 * Math.sin(a)).toFixed(1)} ${(205 - 110 * Math.cos(a)).toFixed(1)}" stroke="${PIK}" stroke-width="${k % 5 ? 4 : 8}" stroke-linecap="round"/>`; }
  return psv('0 0 300 360', `<defs>${lg('swb' + id, '#ffb0b8', col)}${rg('swf' + id, '#ffffff', '#dfe6ee')}</defs>
    <g class="swbtn"><rect x="128" y="16" width="44" height="34" rx="8" fill="url(#swb${id})" stroke="${PIK}" stroke-width="8"/></g>
    <path d="M150 50 L150 74" stroke="${PIK}" stroke-width="18"/><path d="M226 82 L246 62" stroke="${PIK}" stroke-width="16" stroke-linecap="round"/>
    <circle cx="150" cy="205" r="138" fill="url(#swb${id})" stroke="${PIK}" stroke-width="11"/>
    <circle cx="150" cy="205" r="118" fill="url(#swf${id})" stroke="${PIK}" stroke-width="7"/>${ticks}
    <path class="swring" pathLength="100" d="M150 125 A80 80 0 1 1 149.9 125" fill="none" stroke="#5fc8ff" stroke-width="14" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100" opacity=".85"/>
    <g class="swhand" style="transform-origin:150px 205px"><path d="M150 225 L150 112" stroke="#ff3b5c" stroke-width="8" stroke-linecap="round"/></g><circle cx="150" cy="205" r="12" fill="${PIK}"/>
    <path d="M62 150 Q86 104 136 90" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".7"/>`);
}
// screwdriver, viewBox 0 0 120 420: handle on top (y 0..170), shaft to the tip at (60, 410). Rotate around the top or the tip.
function screwdriverSVG(id, col = '#ff7a3d') {
  return psv('0 0 120 420', `<defs>${lg('sd' + id, '#ffd0a8', col, false)}${lg('sds' + id, '#f2f5f8', '#8a93a3', false)}</defs>
    <rect x="44" y="160" width="32" height="226" rx="6" fill="url(#sds${id})" stroke="${PIK}" stroke-width="8"/><path d="M44 386 L60 414 L76 386 Z" fill="#c9ced8" stroke="${PIK}" stroke-width="7" stroke-linejoin="round"/>
    <rect x="18" y="10" width="84" height="170" rx="36" fill="url(#sd${id})" stroke="${PIK}" stroke-width="9"/>
    <path d="M42 40 L42 150 M60 34 L60 156 M78 40 L78 150" stroke="${PIK}" stroke-width="4" opacity=".35"/><path d="M32 46 Q34 26 52 22" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".7"/>`);
}
// map location pin, viewBox 0 0 200 260, the tip at (100, 250). Rig: .pdot (inner dot, s)
function pinSVG(id, col = '#ff3b5c') {
  return psv('0 0 200 260', `<defs>${lg('pn' + id, '#ff9aa8', col)}</defs>
    <path d="M100 250 Q30 160 30 96 A70 70 0 1 1 170 96 Q170 160 100 250 Z" fill="url(#pn${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
    <circle class="pdot" cx="100" cy="96" r="30" fill="#fff" stroke="${PIK}" stroke-width="8" style="transform-origin:100px 96px"/>
    <path d="M52 76 Q60 46 88 36" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".6"/>`);
}

// ---------- added 09.11.2026 (ролик 027 «320 млн заказов за неделю. Сколько сделали нейронки?») ----------
// talking taxi, FRONT view, viewBox 0 0 600 520: roof sign 230..370 x 34..92, cabin with windshield (122..478 x 112..236), body 40..560 x 246..440,
// wheels below to y 500. Face: headlights are the eyes. Same face rig as talkPhoneSVG/keyCharSVG, so one talk/blink loop drives it:
// .keye (sy blink, origin 300 330), .kpup (x/y ±10), .kbrow (y), .kmouth (grille mouth, sy 0.12 closed .. 1 open, origin 300 352),
// .tmirL/.tmirR (side mirrors = little arms, r, origin 96/504 236), .tsign (roof sign glow, o), .tbeam (headlight beams, o),
// riders = 0..4 small bot heads behind the windshield: .rider0 .. .rider3 (o / y, transform-box fill-box), .twin (windshield glass).
// col0/col1 = body gradient (yellow by default). face=false draws a plain car (eyes become ordinary lamps).
function taxiSVG(id, riders = 0, face = true, col0 = '#ffe066', col1 = '#f2a900') {
  const chk = Array.from({ length: 13 }, (_, i) => `<rect x="${66 + i * 36}" y="398" width="18" height="16" fill="${PIK}"/><rect x="${84 + i * 36}" y="414" width="18" height="16" fill="${PIK}"/>`).join('');
  const rider = k => { const x = [190, 300, 410, 245][k], y = [192, 178, 192, 226][k], c = ['#6ad1ff', '#ff8ad8', '#7dff8a', '#ffd34d'][k];
    return `<g class="rider${k}" style="transform-box:fill-box;transform-origin:50% 100%"><rect x="${x - 44}" y="${y - 40}" width="88" height="74" rx="22" fill="${c}" stroke="${PIK}" stroke-width="7"/>
      <rect x="${x - 32}" y="${y - 28}" width="64" height="44" rx="14" fill="#16263a"/><circle cx="${x - 14}" cy="${y - 6}" r="8" fill="#8ff0ff"/><circle cx="${x + 14}" cy="${y - 6}" r="8" fill="#8ff0ff"/>
      <path d="M${x} ${y - 40} L${x} ${y - 58}" stroke="${PIK}" stroke-width="6"/><circle cx="${x}" cy="${y - 62}" r="8" fill="#ffd34d" stroke="${PIK}" stroke-width="5"/></g>`; };
  const eye = (cx) => face ? `<circle cx="${cx}" cy="330" r="50" fill="#fffbe8" stroke="${PIK}" stroke-width="10"/><circle cx="${cx}" cy="330" r="38" fill="url(#tl${id})"/>`
    : `<circle cx="${cx}" cy="330" r="46" fill="url(#tl${id})" stroke="${PIK}" stroke-width="10"/>`;
  return psv('0 0 600 520', `<defs>${lg('tb' + id, col0, col1)}${lg('tw' + id, '#33507a', '#0f1a2e')}${rg('tl' + id, '#ffffff', '#ffe9a0', '40%', '35%')}${lg('tr' + id, '#2a2f3a', '#0c0f15')}
    <clipPath id="tc${id}"><path d="M172 112 L428 112 L478 236 L122 236 Z"/></clipPath></defs>
    <g class="tbeam" opacity="0"><path d="M150 330 L-60 520 L250 520 Z" fill="#fff6c8" opacity=".35"/><path d="M450 330 L350 520 L660 520 Z" fill="#fff6c8" opacity=".35"/></g>
    <rect x="62" y="400" width="96" height="104" rx="22" fill="url(#tr${id})" stroke="${PIK}" stroke-width="10"/><rect x="442" y="400" width="96" height="104" rx="22" fill="url(#tr${id})" stroke="${PIK}" stroke-width="10"/>
    <g class="tsign"><rect x="232" y="36" width="136" height="56" rx="14" fill="#fff3b0" stroke="${PIK}" stroke-width="9"/><text x="300" y="76" text-anchor="middle" style="font:900 30px Unb" fill="${PIK}">ТАКСИ</text></g>
    <rect x="238" y="40" width="124" height="14" rx="7" fill="#fff" opacity=".6"/>
    <path d="M150 92 L450 92 Q470 92 478 110 L528 246 L72 246 L122 110 Q130 92 150 92 Z" fill="url(#tb${id})" stroke="${PIK}" stroke-width="12" stroke-linejoin="round"/>
    <path class="twin" d="M172 112 L428 112 L478 236 L122 236 Z" fill="url(#tw${id})" stroke="${PIK}" stroke-width="8" stroke-linejoin="round"/>
    <g clip-path="url(#tc${id})"><path d="M200 236 Q300 150 400 236" fill="#1f2c44"/>${Array.from({ length: riders }, (_, k) => rider(k)).join('')}
      <path d="M190 124 L150 220" stroke="#fff" stroke-width="16" opacity=".22" stroke-linecap="round"/><path d="M228 124 L206 176" stroke="#fff" stroke-width="9" opacity=".18" stroke-linecap="round"/></g>
    <g class="tmirL" style="transform-origin:96px 236px"><path d="M96 236 L52 214" stroke="${PIK}" stroke-width="12" stroke-linecap="round"/><rect x="10" y="186" width="56" height="40" rx="12" fill="url(#tb${id})" stroke="${PIK}" stroke-width="8"/></g>
    <g class="tmirR" style="transform-origin:504px 236px"><path d="M504 236 L548 214" stroke="${PIK}" stroke-width="12" stroke-linecap="round"/><rect x="534" y="186" width="56" height="40" rx="12" fill="url(#tb${id})" stroke="${PIK}" stroke-width="8"/></g>
    <path d="M40 270 Q40 244 66 244 L534 244 Q560 244 560 270 L560 420 Q560 444 536 444 L64 444 Q40 444 40 420 Z" fill="url(#tb${id})" stroke="${PIK}" stroke-width="12" stroke-linejoin="round"/>
    <path d="M70 262 L530 262" stroke="#fff" stroke-width="8" opacity=".45" stroke-linecap="round"/>
    <rect x="44" y="392" width="512" height="44" fill="#f6f6f6" stroke="${PIK}" stroke-width="7"/>${chk}
    <path d="M40 392 L560 392" stroke="${PIK}" stroke-width="8"/>
    <g class="keye" style="transform-origin:300px 330px">${eye(150)}${eye(450)}
      ${face ? `<g class="kpup"><circle cx="158" cy="336" r="20" fill="${PIK}"/><circle cx="458" cy="336" r="20" fill="${PIK}"/><circle cx="165" cy="327" r="7" fill="#fff"/><circle cx="465" cy="327" r="7" fill="#fff"/></g>` : ''}</g>
    ${face ? `<g class="kbrow"><path d="M98 270 Q148 252 200 266" fill="none" stroke="${PIK}" stroke-width="13" stroke-linecap="round"/><path d="M400 266 Q452 252 502 270" fill="none" stroke="${PIK}" stroke-width="13" stroke-linecap="round"/></g>` : ''}
    <g class="kmouth" style="transform-origin:300px 352px;transform:scaleY(0.14)"><path d="M232 340 Q300 334 368 340 Q362 392 300 392 Q238 392 232 340 Z" fill="#3a0f14" stroke="${PIK}" stroke-width="9" stroke-linejoin="round"/>
      <path d="M252 344 L252 364 M276 342 L276 370 M300 341 L300 372 M324 342 L324 370 M348 344 L348 364" stroke="#c9d2dc" stroke-width="7" stroke-linecap="round"/><ellipse cx="300" cy="380" rx="26" ry="9" fill="#ff7a8a"/></g>
    <path d="M236 342 Q300 362 364 342" fill="none" stroke="${PIK}" stroke-width="9" stroke-linecap="round"/>
    ${face ? `<ellipse cx="226" cy="300" rx="16" ry="9" fill="#ff7a5a" opacity=".35"/><ellipse cx="374" cy="300" rx="16" ry="9" fill="#ff7a5a" opacity=".35"/>` : ''}`);
}
// jack-o'-lantern pumpkin, viewBox 0 0 240 220 (stem at the top centre). Rig: .pkglow (candle glow inside the carved face, o), .pkface
function pumpkinSVG(id, face = true) {
  return psv('0 0 240 220', `<defs>${rg('pk' + id, '#ffb347', '#e0661a', '40%', '35%')}${rg('pkg' + id, '#fff3a0', '#ff9a1a')}</defs>
    <path d="M120 40 Q128 14 150 8" fill="none" stroke="#3d6b2a" stroke-width="16" stroke-linecap="round"/>
    <ellipse cx="72" cy="124" rx="62" ry="78" fill="url(#pk${id})" stroke="${PIK}" stroke-width="9"/><ellipse cx="168" cy="124" rx="62" ry="78" fill="url(#pk${id})" stroke="${PIK}" stroke-width="9"/>
    <ellipse cx="120" cy="124" rx="58" ry="84" fill="url(#pk${id})" stroke="${PIK}" stroke-width="9"/>
    <path d="M60 70 Q50 90 52 116" fill="none" stroke="#fff" stroke-width="8" opacity=".35" stroke-linecap="round"/>
    ${face ? `<g class="pkface"><path d="M70 104 L96 104 L83 82 Z M144 104 L170 104 L157 82 Z" fill="url(#pkg${id})" stroke="${PIK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M62 140 Q120 190 178 140 L162 150 L150 140 L136 156 L120 142 L104 156 L90 140 L78 150 Z" fill="url(#pkg${id})" stroke="${PIK}" stroke-width="6" stroke-linejoin="round"/>
      <g class="pkglow"><circle cx="120" cy="126" r="70" fill="#ffd060" opacity=".18"/></g></g>` : ''}`);
}
// ---------- added 10.11.2026 (ролик 028 «Wi-Fi и микроволновка на одной волне») ----------
// microwave oven with a face on the control panel, viewBox 0 0 640 440: body 20..620 x 30..400, door glass 56..410 x 76..344
// (cavity seen through the mesh), panel 440..600 x 60..370. Same face rig as talkPhoneSVG/keyCharSVG/taxiSVG, so one talk/blink loop
// drives it: .keye (sy blink, origin 520 120), .kpup (x/y ±7), .kbrow (y), .kmouth (sy 0.12 closed .. 1 open, origin 520 186).
// Rig: .mwglow (warm light inside, o), .mwplate (turntable + bowl, r is not used: spin it with sx 1..-1..1), .mwsteam (steam over the
// bowl, o / y), .mwmesh (dot grid on the glass, o), .mwdial (dial, r origin 520 270), .mwdisp (display group, text in .mwtxt),
// .mwdoor (whole door, sx opens it to the left: origin 40 215), .mwbtn (start button, y press). face=false: plain appliance.
function microwaveSVG(id, face = true, col = '#e9eef2') {
  let mesh = ''; for (let y = 92; y < 336; y += 15) for (let x = 72 + ((y / 15) % 2) * 7; x < 400; x += 15) mesh += `<circle cx="${x}" cy="${y}" r="3.2"/>`;
  const fc = face ? `<g class="keye" style="transform-origin:520px 120px"><ellipse cx="490" cy="122" rx="22" ry="26" fill="#fff" stroke="${PIK}" stroke-width="6"/><ellipse cx="550" cy="122" rx="22" ry="26" fill="#fff" stroke="${PIK}" stroke-width="6"/>
      <g class="kpup"><circle cx="493" cy="127" r="10" fill="${PIK}"/><circle cx="553" cy="127" r="10" fill="${PIK}"/><circle cx="497" cy="122" r="3.6" fill="#fff"/><circle cx="557" cy="122" r="3.6" fill="#fff"/></g></g>
    <g class="kbrow"><path d="M466 88 Q488 76 510 86" fill="none" stroke="${PIK}" stroke-width="8" stroke-linecap="round"/><path d="M530 86 Q552 76 574 88" fill="none" stroke="${PIK}" stroke-width="8" stroke-linecap="round"/></g>
    <g class="kmouth" style="transform-origin:520px 176px;transform:scaleY(0.12)"><path d="M494 174 Q520 171 546 174 Q541 214 520 214 Q499 214 494 174 Z" fill="#5a1414" stroke="${PIK}" stroke-width="6" stroke-linejoin="round"/><ellipse cx="520" cy="203" rx="12" ry="6" fill="#ff7a8a"/></g>
    <path d="M495 174 Q520 184 545 174" fill="none" stroke="${PIK}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="470" cy="164" rx="11" ry="7" fill="#ff8a7a" opacity=".45"/><ellipse cx="570" cy="164" rx="11" ry="7" fill="#ff8a7a" opacity=".45"/>` : '';
  return psv('0 0 640 440', `<defs>${lg('mwb' + id, '#ffffff', col)}${lg('mwd' + id, '#3a4652', '#151b22')}${rg('mwg' + id, '#fff1b0', '#ff9a3d', '50%', '55%')}
      ${lg('mws' + id, '#ffb36b', '#e0612a')}${lg('mwp' + id, '#d8dee4', '#9aa6b2')}<clipPath id="mwc${id}"><rect x="56" y="76" width="354" height="268" rx="22"/></clipPath></defs>
    <rect x="60" y="392" width="44" height="26" rx="8" fill="#5b6672" stroke="${PIK}" stroke-width="7"/><rect x="536" y="392" width="44" height="26" rx="8" fill="#5b6672" stroke="${PIK}" stroke-width="7"/>
    <rect x="20" y="30" width="600" height="370" rx="40" fill="url(#mwb${id})" stroke="${PIK}" stroke-width="12"/>
    <path d="M44 60 Q60 44 120 42" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".9"/>
    <rect x="34" y="352" width="572" height="34" rx="16" fill="#000" opacity=".07"/>
    <g class="mwdoor" style="transform-origin:40px 215px">
      <rect x="38" y="58" width="390" height="304" rx="30" fill="#cfd6dc" stroke="${PIK}" stroke-width="9"/>
      <rect x="56" y="76" width="354" height="268" rx="22" fill="url(#mwd${id})" stroke="${PIK}" stroke-width="7"/>
      <g clip-path="url(#mwc${id})">
        <rect class="mwglow" x="56" y="76" width="354" height="268" fill="url(#mwg${id})" opacity="0"/>
        <g class="mwplate" style="transform-origin:233px 300px"><ellipse cx="233" cy="302" rx="150" ry="26" fill="url(#mwp${id})" stroke="${PIK}" stroke-width="6"/>
          <path d="M150 300 Q160 236 233 236 Q306 236 316 300 Z" fill="#ffffff" stroke="${PIK}" stroke-width="7"/><ellipse cx="233" cy="244" rx="80" ry="14" fill="url(#mws${id})" stroke="${PIK}" stroke-width="5"/>
          <path d="M176 258 Q182 280 200 290" stroke="#e6edf2" stroke-width="7" fill="none" stroke-linecap="round"/></g>
        <g class="mwsteam" opacity="0"><path d="M205 222 q-14 -20 0 -40 q14 -20 0 -40" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".8"/><path d="M245 216 q-14 -20 0 -40 q14 -20 0 -40" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".7"/></g>
        <g class="mwmesh" fill="#0b1015" opacity=".55">${mesh}</g>
        <path d="M74 96 L170 84" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".28"/><path d="M74 120 L120 114" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".2"/>
      </g>
      <rect x="400" y="150" width="20" height="120" rx="10" fill="#9aa6b2" stroke="${PIK}" stroke-width="6"/>
    </g>
    <rect x="440" y="60" width="160" height="310" rx="22" fill="#dfe5ea" stroke="${PIK}" stroke-width="7"/>
    ${fc}
    <g class="mwdisp"><rect x="462" y="226" width="116" height="26" rx="8" fill="#13241a" stroke="${PIK}" stroke-width="5"/><text class="mwtxt" x="520" y="246" text-anchor="middle" font-family="JB" font-weight="800" font-size="20" fill="#7dff8a">0:30</text></g>
    <g class="mwdial" style="transform-origin:520px 300px"><circle cx="520" cy="300" r="34" fill="#f4f7fa" stroke="${PIK}" stroke-width="7"/><path d="M520 300 L520 272" stroke="${PIK}" stroke-width="8" stroke-linecap="round"/></g>
    <g class="mwbtn"><rect x="478" y="344" width="84" height="18" rx="9" fill="#7dff8a" stroke="${PIK}" stroke-width="5"/></g>`);
}
// home Wi-Fi router with a face, viewBox 0 0 480 360: body 40..440 x 190..320 (top face 70..410 x 160..190), three antennas
// .rantL/.rantM/.rantR (r, origins at their feet 110/240/370 x 175), status LEDs .rled0 .. .rled3 (o), .rglow (o, soft halo).
// Same face rig: .keye (sy, origin 240 238), .kpup (x/y ±7), .kbrow (y), .kmouth (sy, origin 240 280). face=false: plain router.
function routerSVG(id, face = true, col = '#2f3a52') {
  const ant = (cls, x, r) => `<g class="${cls}" style="transform-origin:${x}px 175px"><g transform="rotate(${r} ${x} 175)"><rect x="${x - 13}" y="30" width="26" height="150" rx="13" fill="url(#rta${id})" stroke="${PIK}" stroke-width="7"/><path d="M${x - 4} 46 L${x - 4} 150" stroke="#fff" stroke-width="5" opacity=".35" stroke-linecap="round"/><circle cx="${x}" cy="30" r="7" fill="#7df9ff" stroke="${PIK}" stroke-width="4"/></g></g>`;
  const fc = face ? `<g class="keye" style="transform-origin:240px 238px"><ellipse cx="205" cy="238" rx="22" ry="25" fill="#fff" stroke="${PIK}" stroke-width="6"/><ellipse cx="275" cy="238" rx="22" ry="25" fill="#fff" stroke="${PIK}" stroke-width="6"/>
      <g class="kpup"><circle cx="208" cy="243" r="10" fill="${PIK}"/><circle cx="278" cy="243" r="10" fill="${PIK}"/><circle cx="212" cy="238" r="3.6" fill="#fff"/><circle cx="282" cy="238" r="3.6" fill="#fff"/></g></g>
    <g class="kbrow"><path d="M180 206 Q202 194 224 204" fill="none" stroke="${PIK}" stroke-width="8" stroke-linecap="round"/><path d="M256 204 Q278 194 300 206" fill="none" stroke="${PIK}" stroke-width="8" stroke-linecap="round"/></g>
    <g class="kmouth" style="transform-origin:240px 280px;transform:scaleY(0.12)"><path d="M218 278 Q240 275 262 278 Q258 310 240 310 Q222 310 218 278 Z" fill="#5a1414" stroke="${PIK}" stroke-width="6" stroke-linejoin="round"/><ellipse cx="240" cy="300" rx="10" ry="5" fill="#ff7a8a"/></g>
    <path d="M219 278 Q240 287 261 278" fill="none" stroke="${PIK}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="168" cy="272" rx="11" ry="7" fill="#ff8a7a" opacity=".45"/><ellipse cx="312" cy="272" rx="11" ry="7" fill="#ff8a7a" opacity=".45"/>` : '';
  const leds = [0, 1, 2, 3].map(k => `<circle class="rled${k}" cx="${360 + k * 18}" cy="296" r="6" fill="${k === 3 ? '#ffcf3d' : '#7dff8a'}"/>`).join('');
  return psv('0 0 480 360', `<defs>${lg('rtb' + id, '#56658a', col)}${lg('rtt' + id, '#7484aa', '#4a5878')}${lg('rta' + id, '#4a5878', '#232b3d')}
      <radialGradient id="rtg${id}"><stop offset="0" stop-color="#7df9ff" stop-opacity=".55"/><stop offset="1" stop-color="#7df9ff" stop-opacity="0"/></radialGradient></defs>
    <ellipse class="rglow" cx="240" cy="200" rx="260" ry="190" fill="url(#rtg${id})" opacity="0"/>
    ${ant('rantL', 110, -16)}${ant('rantM', 240, 0)}${ant('rantR', 370, 16)}
    <path d="M70 160 L410 160 L440 196 L40 196 Z" fill="url(#rtt${id})" stroke="${PIK}" stroke-width="9" stroke-linejoin="round"/>
    <rect x="40" y="190" width="400" height="130" rx="26" fill="url(#rtb${id})" stroke="${PIK}" stroke-width="10"/>
    <path d="M62 206 L150 204" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".3"/>
    <g fill="#1a2030" opacity=".55"><rect x="70" y="170" width="40" height="6" rx="3"/><rect x="120" y="170" width="40" height="6" rx="3"/><rect x="320" y="170" width="40" height="6" rx="3"/><rect x="370" y="170" width="20" height="6" rx="3"/></g>
    ${leds}<rect x="60" y="322" width="40" height="14" rx="6" fill="#1a2030"/><rect x="380" y="322" width="40" height="14" rx="6" fill="#1a2030"/>
    ${fc}`);
}
// water molecule H2O, viewBox 0 0 200 170: oxygen (100,102) r 54, hydrogens (34,44) and (166,44) r 30. Optional tiny face. .wmh (both H, o/s)
function waterMolSVG(id, face = true) {
  return psv('0 0 200 170', `<defs>${rg('wmo' + id, '#ffb0b0', '#e2384f')}${rg('wmh' + id, '#ffffff', '#c9d8e8')}</defs>
    <path d="M100 102 L34 44 M100 102 L166 44" stroke="${PIK}" stroke-width="16" stroke-linecap="round"/><path d="M100 102 L34 44 M100 102 L166 44" stroke="#f4f7fa" stroke-width="6" stroke-linecap="round"/>
    <g class="wmh"><circle cx="34" cy="44" r="30" fill="url(#wmh${id})" stroke="${PIK}" stroke-width="7"/><circle cx="166" cy="44" r="30" fill="url(#wmh${id})" stroke="${PIK}" stroke-width="7"/>
      <circle cx="26" cy="35" r="7" fill="#fff"/><circle cx="158" cy="35" r="7" fill="#fff"/></g>
    <circle cx="100" cy="102" r="54" fill="url(#wmo${id})" stroke="${PIK}" stroke-width="8"/><circle cx="82" cy="84" r="11" fill="#fff" opacity=".7"/>
    ${face ? `<circle cx="84" cy="108" r="7" fill="${PIK}"/><circle cx="116" cy="108" r="7" fill="${PIK}"/><path d="M88 126 Q100 134 112 126" fill="none" stroke="${PIK}" stroke-width="5" stroke-linecap="round"/>` : ''}`);
}
// soup bowl with steam, viewBox 0 0 320 240 (rim y 96). Rig: .sbsteam (o / y), .sbsoup (fill colour layer), .sbspoon (r origin 250 60)
function soupBowlSVG(id, soup = '#ff9a3d') {
  return psv('0 0 320 240', `<defs>${lg('sbb' + id, '#ffffff', '#cfd8e2')}${lg('sbs' + id, '#ffc27a', soup)}</defs>
    <g class="sbsteam" opacity="0"><path d="M110 80 q-16 -22 0 -44 q16 -22 0 -44" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".85"/>
      <path d="M160 70 q-16 -22 0 -44 q16 -22 0 -44" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".75"/><path d="M210 80 q-16 -22 0 -44 q16 -22 0 -44" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".65"/></g>
    <g class="sbspoon" style="transform-origin:250px 60px"><path d="M250 60 L190 104" stroke="${PIK}" stroke-width="18" stroke-linecap="round"/><path d="M250 60 L190 104" stroke="#d6dde4" stroke-width="8" stroke-linecap="round"/></g>
    <ellipse cx="160" cy="226" rx="90" ry="12" fill="#000" opacity=".18"/>
    <path d="M24 96 Q30 214 160 214 Q290 214 296 96 Z" fill="url(#sbb${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
    <ellipse class="sbsoup" cx="160" cy="98" rx="132" ry="24" fill="url(#sbs${id})" stroke="${PIK}" stroke-width="8"/>
    <circle cx="120" cy="96" r="7" fill="#fff" opacity=".6"/><circle cx="190" cy="102" r="5" fill="#7dd35a"/><circle cx="150" cy="104" r="5" fill="#ff5f4d"/>
    <path d="M52 128 Q64 180 110 196" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".9"/><path d="M60 160 L270 160" stroke="${soup}" stroke-width="10" opacity=".55"/>`);
}
// thermometer, viewBox 0 0 120 400: tube 40..80 x 20..320, bulb centre (60,340) r 44. Rig: .thfill (mercury column, sy 0..1 from the bulb,
// origin 60 320; recolour its fill), .thbulb (bulb fill), .thshine (o)
function thermometerSVG(id, col = '#ff3b5c') {
  let ticks = ''; for (let y = 60; y <= 290; y += 26) ticks += `<path d="M82 ${y} L${y % 52 === 8 ? 100 : 94} ${y}" stroke="${PIK}" stroke-width="5" stroke-linecap="round"/>`;
  return psv('0 0 120 400', `<defs>${lg('thg' + id, '#ffffff', '#dde8f0', false)}</defs>
    <rect x="34" y="14" width="52" height="320" rx="26" fill="url(#thg${id})" stroke="${PIK}" stroke-width="9"/>${ticks}
    <rect class="thfill" x="50" y="40" width="20" height="290" rx="10" fill="${col}" style="transform-origin:60px 320px"/>
    <circle class="thbulb" cx="60" cy="342" r="44" fill="${col}" stroke="${PIK}" stroke-width="9"/><circle cx="46" cy="328" r="11" fill="#fff" opacity=".6"/>
    <path d="M46 40 L46 290" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".7"/>`);
}
// Wi-Fi signal icon (three arcs + dot), viewBox 0 0 200 160. Rig: .wf0 (dot) .wf1 .wf2 .wf3 (arcs, o / recolour), .wfx (red cross, o)
function wifiIconSVG(id, col = '#7df9ff') {
  const arc = (k, r) => `<path class="wf${k}" d="M${100 - r} ${140 - r * 0.62} A${r} ${r} 0 0 1 ${100 + r} ${140 - r * 0.62}" fill="none" stroke="${col}" stroke-width="18" stroke-linecap="round"/>`;
  return psv('0 0 200 160', `<g stroke="${PIK}" stroke-width="30" fill="none" stroke-linecap="round"><path d="M70 121 A50 50 0 0 1 130 121"/><path d="M40 103 A88 88 0 0 1 160 103"/><path d="M12 84 A126 126 0 0 1 188 84"/></g>
    <path class="wf1" d="M70 121 A50 50 0 0 1 130 121" fill="none" stroke="${col}" stroke-width="16" stroke-linecap="round"/>
    <path class="wf2" d="M40 103 A88 88 0 0 1 160 103" fill="none" stroke="${col}" stroke-width="16" stroke-linecap="round"/>
    <path class="wf3" d="M12 84 A126 126 0 0 1 188 84" fill="none" stroke="${col}" stroke-width="16" stroke-linecap="round"/>
    <circle class="wf0" cx="100" cy="142" r="15" fill="${col}" stroke="${PIK}" stroke-width="7"/>
    <g class="wfx" opacity="0"><path d="M140 20 L190 70 M190 20 L140 70" stroke="${PIK}" stroke-width="26" stroke-linecap="round"/><path d="M140 20 L190 70 M190 20 L140 70" stroke="#ff3b5c" stroke-width="13" stroke-linecap="round"/></g>`);
}

// ---------- added 11.11.2026 (ролик 029 «Смахиваешь 20 приложений на ночь») ----------
// talking app (an app icon as a character), viewBox 0 0 300 400: rounded-square body 30..270 x 20..260 (a small glyph top left),
// gloved arms, legs with shoes down to y 390. Same face rig as talkPhoneSVG/keyCharSVG/taxiSVG, so one talk/blink loop drives it:
// .keye (sy blink, origin 150 130), .kpup (x/y ±9), .kbrow (y), .kmouth (sy 0.12 closed .. 1 open, origin 150 200),
// .karmL/.karmR (r, origin 32/268 180), .klegL/.klegR (r, origin 110/190 262).
// Extra states: .alid (closed sleepy eyelids over the eyes, o), .azz (three Z letters, o / y), .apause (pause badge on the forehead, o / s),
// .aice (ice block + icicles = «завис», o), .anap (night cap, o). transform-box fill-box on the badge groups.
function appCharSVG(id, c0 = '#ffb84d', c1 = '#ff5f6d') {
  const fb = 'style="transform-box:fill-box;transform-origin:center"';
  const arm = (cls, ox, x1, y1) => `<g class="${cls}" style="transform-origin:${ox}px 180px"><path d="M${ox} 180 Q${(ox + x1) / 2} ${y1 - 30} ${x1} ${y1}" fill="none" stroke="${PIK}" stroke-width="24" stroke-linecap="round"/>
    <path d="M${ox} 180 Q${(ox + x1) / 2} ${y1 - 30} ${x1} ${y1}" fill="none" stroke="${c1}" stroke-width="11" stroke-linecap="round"/>
    <circle cx="${x1}" cy="${y1 + 6}" r="25" fill="#fff" stroke="${PIK}" stroke-width="8"/><path d="M${x1 - 10} ${y1 - 8} L${x1 - 10} ${y1 + 8} M${x1 + 2} ${y1 - 10} L${x1 + 2} ${y1 + 8}" stroke="${PIK}" stroke-width="4" stroke-linecap="round" opacity=".45"/></g>`;
  const leg = (cls, x) => `<g class="${cls}" style="transform-origin:${x}px 262px"><path d="M${x} 250 L${x} 350" stroke="${PIK}" stroke-width="22" stroke-linecap="round"/><path d="M${x} 250 L${x} 350" stroke="${c1}" stroke-width="9" stroke-linecap="round"/>
    <path d="M${x - 30} 378 Q${x - 30} 344 ${x} 344 Q${x + 34} 344 ${x + 38} 372 Q${x + 38} 386 ${x + 20} 386 L${x - 22} 386 Q${x - 30} 386 ${x - 30} 378 Z" fill="#3a3f5c" stroke="${PIK}" stroke-width="8" stroke-linejoin="round"/>
    <path d="M${x - 16} 356 Q${x - 4} 350 ${x + 10} 352" stroke="#fff" stroke-width="5" opacity=".5" stroke-linecap="round" fill="none"/></g>`;
  return psv('0 0 300 400', `<defs>${lg('ac' + id, c0, c1)}${rg('acs' + id, 'rgba(255,255,255,.55)', 'rgba(255,255,255,0)')}</defs>
    ${arm('karmL', 32, -26, 250)}${arm('karmR', 268, 326, 250)}${leg('klegL', 110)}${leg('klegR', 190)}
    <rect x="30" y="20" width="240" height="240" rx="66" fill="url(#ac${id})" stroke="${PIK}" stroke-width="12"/>
    <rect x="44" y="30" width="212" height="110" rx="54" fill="url(#acs${id})" opacity=".55"/>
    <path d="M64 74 Q72 44 112 40" fill="none" stroke="#fff" stroke-width="10" opacity=".6" stroke-linecap="round"/>
    <path d="M48 232 Q150 268 252 232" fill="none" stroke="${PIK}" stroke-width="7" opacity=".18"/>
    <g class="keye" style="transform-origin:150px 130px"><ellipse cx="108" cy="130" rx="30" ry="34" fill="#fff" stroke="${PIK}" stroke-width="7"/><ellipse cx="192" cy="130" rx="30" ry="34" fill="#fff" stroke="${PIK}" stroke-width="7"/>
      <g class="kpup"><circle cx="112" cy="136" r="14" fill="${PIK}"/><circle cx="196" cy="136" r="14" fill="${PIK}"/><circle cx="117" cy="129" r="5" fill="#fff"/><circle cx="201" cy="129" r="5" fill="#fff"/></g></g>
    <g class="alid" opacity="0"><path d="M78 124 Q108 98 138 124 L138 132 Q108 150 78 132 Z M162 124 Q192 98 222 124 L222 132 Q192 150 162 132 Z" fill="${c0}" stroke="${PIK}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M80 132 Q108 152 136 132 M164 132 Q192 152 220 132" fill="none" stroke="${PIK}" stroke-width="7" stroke-linecap="round"/></g>
    <g class="kbrow"><path d="M76 84 Q104 68 134 80" fill="none" stroke="${PIK}" stroke-width="10" stroke-linecap="round"/><path d="M166 80 Q196 68 224 84" fill="none" stroke="${PIK}" stroke-width="10" stroke-linecap="round"/></g>
    <g class="kmouth" style="transform-origin:150px 200px;transform:scaleY(0.12)"><path d="M112 196 Q150 192 188 196 Q182 250 150 250 Q118 250 112 196 Z" fill="#5a1414" stroke="${PIK}" stroke-width="8" stroke-linejoin="round"/><ellipse cx="150" cy="236" rx="18" ry="8" fill="#ff7a8a"/></g>
    <path d="M114 196 Q150 208 186 196" fill="none" stroke="${PIK}" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="74" cy="182" rx="15" ry="9" fill="#ff3b5c" opacity=".3"/><ellipse cx="226" cy="182" rx="15" ry="9" fill="#ff3b5c" opacity=".3"/>
    <g class="anap" opacity="0"><path d="M60 54 Q150 -40 250 50 Q200 30 150 34 Q100 34 60 54 Z" fill="#5f6cff" stroke="${PIK}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M200 10 Q270 -10 296 40" fill="none" stroke="${PIK}" stroke-width="22" stroke-linecap="round"/><path d="M200 10 Q270 -10 296 40" fill="none" stroke="#5f6cff" stroke-width="10" stroke-linecap="round"/>
      <circle cx="298" cy="46" r="18" fill="#fff" stroke="${PIK}" stroke-width="7"/><path d="M62 54 Q150 26 248 50" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/></g>
    <g class="apause" opacity="0" ${fb}><circle cx="150" cy="-30" r="40" fill="#7df9ff" stroke="${PIK}" stroke-width="8"/><rect x="132" y="-50" width="12" height="40" rx="4" fill="${PIK}"/><rect x="156" y="-50" width="12" height="40" rx="4" fill="${PIK}"/></g>
    <g class="azz" opacity="0"><text x="250" y="20" style="font:900 54px Unb" fill="#fff" stroke="${PIK}" stroke-width="8" paint-order="stroke">Z</text><text x="290" y="-34" style="font:900 40px Unb" fill="#fff" stroke="${PIK}" stroke-width="7" paint-order="stroke">Z</text><text x="320" y="-74" style="font:900 30px Unb" fill="#fff" stroke="${PIK}" stroke-width="6" paint-order="stroke">Z</text></g>
    <g class="aice" opacity="0"><rect x="10" y="0" width="280" height="280" rx="40" fill="#bff3ff" opacity=".55" stroke="#e8fbff" stroke-width="10"/>
      <path d="M30 40 L90 20 M200 260 L270 220 M40 200 L70 250" stroke="#fff" stroke-width="8" opacity=".8" stroke-linecap="round"/>
      <path d="M40 280 L52 330 L64 280 M120 280 L128 314 L136 280 M200 280 L214 342 L228 280" fill="#d8f7ff" stroke="${PIK}" stroke-width="6" stroke-linejoin="round"/></g>`);
}
// app card from the phone's app switcher (a mini window), viewBox 0 0 260 440: header with a round app badge, content lines.
// col = header colour. Rig: .acbadge (o / s). Stack several, tween y up to "swipe away".
function appCardSVG(id, col = '#5fb0ff', kind = 0) {
  const lines = kind % 3 === 0 ? `<rect x="30" y="120" width="200" height="110" rx="14" fill="${col}" opacity=".35"/><rect x="30" y="250" width="170" height="16" rx="8" fill="#b6c3dc"/><rect x="30" y="280" width="130" height="16" rx="8" fill="#b6c3dc"/><rect x="30" y="320" width="200" height="70" rx="14" fill="#e3e9f5"/>`
    : kind % 3 === 1 ? `<circle cx="80" cy="150" r="30" fill="${col}" opacity=".5"/><rect x="124" y="132" width="100" height="14" rx="7" fill="#b6c3dc"/><rect x="124" y="156" width="70" height="14" rx="7" fill="#d4dbe9"/><circle cx="80" cy="240" r="30" fill="${col}" opacity=".35"/><rect x="124" y="222" width="100" height="14" rx="7" fill="#b6c3dc"/><rect x="124" y="246" width="60" height="14" rx="7" fill="#d4dbe9"/><circle cx="80" cy="330" r="30" fill="${col}" opacity=".25"/><rect x="124" y="312" width="100" height="14" rx="7" fill="#b6c3dc"/>`
    : `<rect x="30" y="120" width="94" height="94" rx="12" fill="${col}" opacity=".4"/><rect x="136" y="120" width="94" height="94" rx="12" fill="${col}" opacity=".25"/><rect x="30" y="226" width="94" height="94" rx="12" fill="${col}" opacity=".3"/><rect x="136" y="226" width="94" height="94" rx="12" fill="${col}" opacity=".45"/><rect x="30" y="340" width="200" height="16" rx="8" fill="#b6c3dc"/>`;
  return psv('0 0 260 440', `<rect x="6" y="6" width="248" height="428" rx="34" fill="#f4f7ff" stroke="${PIK}" stroke-width="10"/>
    <path d="M6 70 L6 40 Q6 6 40 6 L220 6 Q254 6 254 40 L254 70 Z" fill="${col}" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
    <g class="acbadge" style="transform-box:fill-box;transform-origin:center"><rect x="22" y="18" width="40" height="40" rx="12" fill="#fff" stroke="${PIK}" stroke-width="6"/></g>
    <rect x="76" y="30" width="110" height="14" rx="7" fill="#fff" opacity=".8"/>${lines}
    <path d="M24 90 L24 400" stroke="#fff" stroke-width="6" opacity=".7" stroke-linecap="round"/>`);
}
// bed, side view, viewBox 0 0 680 420: headboard (left) 20..110 x 40..380, footboard (right) 570..660 x 170..380, frame rail y 250..290,
// slats under the mattress, mattress 100..580 x 196..252, pillow, blanket. Every part is its own group with transform-box fill-box,
// so the bed can be taken apart plank by plank: .bdhead .bdfoot .bdrail .bdslat0..bdslat4 .bdmat .bdpil .bdblk (tween x/y/r, o).
function bedSVG(id, wood = '#c9824a', blanket = '#5f6cff') {
  const fb = 'style="transform-box:fill-box;transform-origin:center"';
  const slats = [0, 1, 2, 3, 4].map(k => `<g class="bdslat${k}" ${fb}><rect x="${132 + k * 90}" y="244" width="66" height="22" rx="6" fill="url(#bdw${id})" stroke="${PIK}" stroke-width="7"/></g>`).join('');
  return psv('0 0 680 420', `<defs>${lg('bdw' + id, '#f0b27a', wood)}${lg('bdb' + id, '#8a96ff', blanket)}${lg('bdm' + id, '#ffffff', '#d8e0f0')}</defs>
    <g class="bdrail" ${fb}><rect x="96" y="262" width="490" height="40" rx="10" fill="url(#bdw${id})" stroke="${PIK}" stroke-width="9"/><path d="M112 272 L570 272" stroke="#ffe0bb" stroke-width="5" opacity=".7"/></g>
    ${slats}
    <g class="bdhead" ${fb}><path d="M20 390 L20 80 Q20 36 64 36 Q110 36 110 80 L110 390 Z" fill="url(#bdw${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
      <path d="M40 110 L40 330 M64 90 L64 330 M88 110 L88 330" stroke="#8a5028" stroke-width="7" opacity=".55" stroke-linecap="round"/><path d="M34 70 Q42 50 62 48" stroke="#fff" stroke-width="7" opacity=".5" fill="none" stroke-linecap="round"/></g>
    <g class="bdfoot" ${fb}><path d="M570 390 L570 200 Q570 168 614 168 Q660 168 660 200 L660 390 Z" fill="url(#bdw${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
      <path d="M594 210 L594 340 M636 210 L636 340" stroke="#8a5028" stroke-width="7" opacity=".55" stroke-linecap="round"/></g>
    <g class="bdmat" ${fb}><rect x="104" y="196" width="470" height="56" rx="24" fill="url(#bdm${id})" stroke="${PIK}" stroke-width="9"/><path d="M130 224 L548 224" stroke="#b9c4dc" stroke-width="5" stroke-dasharray="14 12"/></g>
    <g class="bdpil" ${fb}><path d="M118 196 Q112 150 150 146 L238 148 Q262 152 256 196 Z" fill="#fff" stroke="${PIK}" stroke-width="9" stroke-linejoin="round"/><path d="M140 164 Q180 156 226 162" stroke="#d8e0f0" stroke-width="6" fill="none" stroke-linecap="round"/></g>
    <g class="bdblk" ${fb}><path d="M262 188 Q420 168 586 192 L592 262 Q560 286 520 270 Q470 290 420 272 Q360 292 300 270 Q270 260 262 236 Z" fill="url(#bdb${id})" stroke="${PIK}" stroke-width="9" stroke-linejoin="round"/>
      <path d="M300 204 Q420 190 560 208" stroke="#fff" stroke-width="7" opacity=".45" fill="none" stroke-linecap="round"/><circle cx="360" cy="236" r="9" fill="#fff" opacity=".5"/><circle cx="450" cy="230" r="9" fill="#fff" opacity=".5"/><circle cx="530" cy="240" r="9" fill="#fff" opacity=".5"/></g>`);
}
// open book with a ribbon bookmark, viewBox 0 0 460 300: pages 30..430 x 40..270, spine at x 230. Rig: .bkmark (ribbon, y / o),
// .bkpage (a page that flips around the spine: sx 1 -> -1, origin 230 155), .bkline0..5 (text lines)
function bookSVG(id, cover = '#ff5f6d') {
  const ln = (k, x) => `<rect class="bkline${k}" x="${x}" y="${84 + (k % 3) * 44}" width="150" height="14" rx="7" fill="#b9ad92"/>`;
  return psv('0 0 460 300', `<defs>${lg('bkc' + id, '#ff8a7a', cover)}</defs>
    <path d="M14 60 L230 76 L446 60 L446 286 L230 300 L14 286 Z" fill="url(#bkc${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M30 40 Q130 26 230 56 L230 276 Q130 246 30 262 Z" fill="#fbf3e0" stroke="${PIK}" stroke-width="9" stroke-linejoin="round"/>
    <path d="M430 40 Q330 26 230 56 L230 276 Q330 246 430 262 Z" fill="#fbf3e0" stroke="${PIK}" stroke-width="9" stroke-linejoin="round"/>
    ${ln(0, 56)}${ln(1, 56)}${ln(2, 56)}${ln(3, 254)}${ln(4, 254)}${ln(5, 254)}
    <g class="bkpage" style="transform-origin:230px 155px"><path d="M430 44 Q330 30 232 58 L232 272 Q330 244 430 258 Z" fill="#fffaf0" stroke="${PIK}" stroke-width="7" stroke-linejoin="round" opacity=".001"/></g>
    <g class="bkmark"><path d="M262 30 L262 236 L284 214 L306 236 L306 30 Z" fill="#ffd34d" stroke="${PIK}" stroke-width="8" stroke-linejoin="round"/><path d="M272 40 L272 200" stroke="#fff" stroke-width="5" opacity=".6"/></g>`);
}

// ---------- added 12.11.2026 (ролик 030 «Батарея вдвое больше»: ёмкость = бак) ----------
// fuel tank / jerrycan with level, viewBox 0 0 360 460. Rig: .tfill (sy from the bottom, origin 180 436), .tcap (r, origin 270 70)
function tankSVG(id, col = '#43f0ff') {
  return psv('0 0 360 460', `<defs><linearGradient id="tk${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffd34d"/><stop offset="1" stop-color="#e09a10"/></linearGradient>
    <linearGradient id="tl${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfffff"/><stop offset="1" stop-color="${col}"/></linearGradient>
    <clipPath id="tc${id}"><path d="M40 110 Q40 84 66 84 L294 84 Q320 84 320 110 L320 410 Q320 436 294 436 L66 436 Q40 436 40 410 Z"/></clipPath></defs>
    <path d="M40 110 Q40 84 66 84 L294 84 Q320 84 320 110 L320 410 Q320 436 294 436 L66 436 Q40 436 40 410 Z" fill="#2b3446"/>
    <g clip-path="url(#tc${id})"><g class="tfill" style="transform-origin:180px 436px"><rect x="40" y="110" width="280" height="326" fill="url(#tl${id})"/>
      <path d="M40 110 Q110 92 180 110 Q250 128 320 110 L320 130 L40 130 Z" fill="#fff" opacity=".45"/>
      <circle cx="110" cy="300" r="10" fill="#fff" opacity=".5"/><circle cx="210" cy="360" r="7" fill="#fff" opacity=".5"/><circle cx="260" cy="250" r="12" fill="#fff" opacity=".4"/></g></g>
    <path d="M40 110 Q40 84 66 84 L294 84 Q320 84 320 110 L320 410 Q320 436 294 436 L66 436 Q40 436 40 410 Z" fill="none" stroke="${PIK}" stroke-width="12"/>
    <rect x="60" y="94" width="18" height="320" rx="9" fill="#fff" opacity=".25"/>
    <path d="M40 180 L320 180 M40 260 L320 260 M40 340 L320 340" stroke="${PIK}" stroke-width="5" opacity=".35" stroke-dasharray="20 14"/>
    <path d="M90 84 L90 40 Q90 24 106 24 L180 24" fill="none" stroke="${PIK}" stroke-width="14" stroke-linecap="round"/>
    <g class="tcap" style="transform-origin:270px 70px"><rect x="240" y="44" width="64" height="44" rx="10" fill="#ff3b5c" stroke="${PIK}" stroke-width="10"/></g>`);
}
// glass jug with a straw, viewBox 0 0 300 420. Rig: .jfill (sy from the bottom, origin 150 408), .jstraw (hide it to draw your own straw)
function jugSVG(id) {
  return psv('0 0 300 420', `<defs><clipPath id="jc${id}"><path d="M40 120 Q40 90 70 90 L230 90 Q260 90 260 120 L260 380 Q260 408 232 408 L68 408 Q40 408 40 380 Z"/></clipPath>
    <linearGradient id="jl${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfffff"/><stop offset="1" stop-color="#43f0ff"/></linearGradient></defs>
    <path d="M40 120 Q40 90 70 90 L230 90 Q260 90 260 120 L260 380 Q260 408 232 408 L68 408 Q40 408 40 380 Z" fill="#d9e6f2" opacity=".35"/>
    <g clip-path="url(#jc${id})"><g class="jfill" style="transform-origin:150px 408px"><rect x="40" y="110" width="220" height="300" fill="url(#jl${id})"/>
      <path d="M40 112 Q95 98 150 112 Q205 126 260 112 L260 126 L40 126 Z" fill="#fff" opacity=".5"/></g></g>
    <path d="M40 120 Q40 90 70 90 L230 90 Q260 90 260 120 L260 380 Q260 408 232 408 L68 408 Q40 408 40 380 Z" fill="none" stroke="${PIK}" stroke-width="11"/>
    <path d="M62 120 L62 370" stroke="#fff" stroke-width="12" opacity=".5" stroke-linecap="round"/>
    <path d="M258 160 Q310 160 310 230 Q310 300 258 300" fill="none" stroke="${PIK}" stroke-width="14"/>
    <g class="jstraw"><path d="M170 380 L170 40 Q170 10 200 4 L330 -30" fill="none" stroke="${PIK}" stroke-width="26" stroke-linecap="round"/>
      <path d="M170 380 L170 40 Q170 10 200 4 L330 -30" fill="none" stroke="#ff5fa2" stroke-width="14" stroke-linecap="round" stroke-dasharray="22 16"/></g>`);
}
// tea cup on a saucer, viewBox 0 0 220 160
function cupSVG(id) {
  return psv('0 0 220 160', `<ellipse cx="110" cy="140" rx="100" ry="16" fill="#fff" stroke="${PIK}" stroke-width="7"/>
    <path d="M40 40 L180 40 Q178 128 110 132 Q42 128 40 40 Z" fill="#fff" stroke="${PIK}" stroke-width="8" stroke-linejoin="round"/>
    <ellipse cx="110" cy="42" rx="70" ry="12" fill="#43f0ff" stroke="${PIK}" stroke-width="6"/>
    <path d="M178 58 Q214 60 206 88 Q198 110 170 104" fill="none" stroke="${PIK}" stroke-width="9"/>
    <path d="M70 70 Q74 100 96 112" fill="none" stroke="#ff5fa2" stroke-width="7" stroke-linecap="round"/>`);
}
// phone in x-ray / cutaway: glass outline, board on top, battery block. viewBox 0 0 300 560.
// Rig: .xbat (sy from the bottom, origin 150 510), .xglow (o)
function xrayPhoneSVG(id, col = '#43f0ff') {
  return psv('0 0 300 560', `<defs><linearGradient id="xb${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${col}"/><stop offset="1" stop-color="#1a6a9a"/></linearGradient></defs>
    <rect x="16" y="16" width="268" height="528" rx="46" fill="#0c1a2a" fill-opacity=".85" stroke="#bfefff" stroke-width="10"/>
    <rect x="16" y="16" width="268" height="528" rx="46" fill="none" stroke="${PIK}" stroke-width="4" opacity=".6"/>
    <rect x="40" y="44" width="220" height="80" rx="14" fill="#1f5a3a" stroke="#7dff8a" stroke-width="5"/>
    <rect x="70" y="62" width="44" height="44" rx="6" fill="#2b3446" stroke="#7dff8a" stroke-width="4"/><rect x="130" y="66" width="30" height="16" rx="3" fill="#ffd34d"/><rect x="176" y="62" width="60" height="20" rx="4" fill="#9aa6b2"/>
    <path d="M60 140 L240 140" stroke="#7dff8a" stroke-width="4" opacity=".5" stroke-dasharray="10 8"/>
    <g class="xbat" style="transform-origin:150px 510px"><rect x="44" y="156" width="212" height="354" rx="20" fill="url(#xb${id})" stroke="${PIK}" stroke-width="8"/>
      <rect x="60" y="172" width="22" height="320" rx="11" fill="#fff" opacity=".3"/>
      <path d="M162 250 L124 342 L152 342 L138 420 L184 318 L156 318 Z" fill="#ffe14d" stroke="${PIK}" stroke-width="7" stroke-linejoin="round"/></g>
    <g class="xglow" opacity="0"><rect x="10" y="10" width="280" height="540" rx="50" fill="none" stroke="${col}" stroke-width="14" opacity=".6"/></g>`);
}

// ---------- added 12.11.2026 (ролик 031 «Наушники меняют канал до 1 600 раз в секунду») ----------
// music note = a packet of sound, viewBox 0 0 120 140. Rig: .ntx (red cross over a lost note, o). col = note colour
function noteSVG(id, col = '#7dff8a') {
  return psv('0 0 120 140', `<defs>${rg('nt' + id, '#ffffff', col)}</defs>
    <path d="M46 104 L46 22 L104 10 L104 90" fill="none" stroke="${PIK}" stroke-width="22" stroke-linejoin="round" stroke-linecap="round"/><path d="M46 48 L104 36" stroke="${PIK}" stroke-width="22"/>
    <path d="M46 104 L46 22 L104 10 L104 90" fill="none" stroke="${col}" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/><path d="M46 48 L104 36" stroke="${col}" stroke-width="9"/>
    <ellipse cx="30" cy="108" rx="25" ry="19" fill="url(#nt${id})" stroke="${PIK}" stroke-width="7" transform="rotate(-18 30 108)"/>
    <ellipse cx="88" cy="94" rx="25" ry="19" fill="url(#nt${id})" stroke="${PIK}" stroke-width="7" transform="rotate(-18 88 94)"/>
    <circle cx="22" cy="101" r="5" fill="#fff" opacity=".85"/><circle cx="80" cy="87" r="5" fill="#fff" opacity=".85"/>
    <g class="ntx" opacity="0"><path d="M18 18 L102 122 M102 18 L18 122" stroke="${PIK}" stroke-width="26" stroke-linecap="round"/><path d="M18 18 L102 122 M102 18 L18 122" stroke="#ff3b5c" stroke-width="13" stroke-linecap="round"/></g>`);
}
// «no entry» road sign (red disc, white bar), viewBox 0 0 200 200. Rig: .nebar (the white bar, sx draw-in)
function noEntrySVG(id) {
  return psv('0 0 200 200', `<defs>${rg('ne' + id, '#ff8a8a', '#d81f3c')}</defs>
    <ellipse cx="100" cy="190" rx="70" ry="9" fill="#000" opacity=".25"/>
    <circle cx="100" cy="100" r="88" fill="#fff" stroke="${PIK}" stroke-width="10"/><circle cx="100" cy="100" r="72" fill="url(#ne${id})" stroke="${PIK}" stroke-width="6"/>
    <rect class="nebar" x="44" y="82" width="112" height="36" rx="10" fill="#fff" stroke="${PIK}" stroke-width="7" style="transform-origin:100px 100px"/>
    <path d="M44 62 Q62 34 96 30" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".55"/>`);
}
// dumbbell lying on the floor, viewBox 0 0 360 180. Rig: .dweb (cobweb between the plates, draw with dash: pathLength 100), .dspider (o / y), .ddust (o)
function dumbbellSVG(id, col = '#5a6478') {
  const plate = (x, w, h) => `<rect x="${x}" y="${90 - h / 2}" width="${w}" height="${h}" rx="12" fill="url(#db${id})" stroke="${PIK}" stroke-width="9"/><path d="M${x + 8} ${96 - h / 2} L${x + 8} ${70 + h / 4}" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".35"/>`;
  return psv('0 0 360 180', `<defs>${lg('db' + id, '#8d98ad', col)}${lg('dbb' + id, '#e6ebf2', '#9aa6b8')}</defs>
    <ellipse cx="180" cy="168" rx="170" ry="12" fill="#000" opacity=".3"/>
    <rect x="70" y="76" width="220" height="28" rx="10" fill="url(#dbb${id})" stroke="${PIK}" stroke-width="8"/>
    ${plate(14, 34, 110)}${plate(52, 40, 150)}${plate(268, 40, 150)}${plate(312, 34, 110)}
    <g class="dweb" fill="none" stroke="#e8eef6" stroke-width="3.5" stroke-linecap="round" opacity=".9">
      <path pathLength="100" style="stroke-dasharray:100" d="M96 16 L180 76 L264 16 M96 16 Q180 40 264 16 M124 36 Q180 56 236 36 M150 55 Q180 66 210 55 M180 76 L180 8 M180 76 L138 12 M180 76 L222 12"/></g>
    <g class="dspider"><path d="M236 36 L236 62" stroke="#e8eef6" stroke-width="3"/><circle cx="236" cy="68" r="8" fill="${PIK}"/><path d="M228 64 L220 58 M228 70 L220 76 M244 64 L252 58 M244 70 L252 76" stroke="${PIK}" stroke-width="3" stroke-linecap="round"/></g>
    <g class="ddust" fill="#cfd6e0" opacity=".7"><circle cx="40" cy="160" r="5"/><circle cx="330" cy="158" r="4"/><circle cx="176" cy="162" r="3"/></g>`);
}
// sofa seen from the front, viewBox 0 0 700 360. part 'back' = back, arms, seat; part 'front' = a blanket thrown over the seat edge
// (draw a personSVG between the two parts and he sits ON the sofa). Rig: .sfpillow (r/y)
function sofaSVG(id, col = '#5f6cff', part = 'back') {
  if (part === 'front') return psv('0 0 700 360', `<defs>${lg('sfk' + id, '#ffd98a', '#f2a23d')}</defs>
    <path d="M150 232 Q350 214 560 232 L574 318 Q350 336 136 318 Z" fill="url(#sfk${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M180 252 Q350 238 530 252 M176 284 Q350 270 536 284" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".45"/>
    <path d="M150 316 l-6 22 M190 322 l-4 22 M520 322 l4 22 M560 316 l6 22" stroke="${PIK}" stroke-width="7" stroke-linecap="round"/>`);
  return psv('0 0 700 360', `<defs>${lg('sfb' + id, '#8f99ff', col)}${lg('sfs' + id, '#7a86ff', '#3d47b8')}</defs>
    <ellipse cx="350" cy="346" rx="330" ry="14" fill="#000" opacity=".3"/>
    <rect x="96" y="320" width="34" height="30" rx="8" fill="#3a2414" stroke="${PIK}" stroke-width="8"/><rect x="570" y="320" width="34" height="30" rx="8" fill="#3a2414" stroke="${PIK}" stroke-width="8"/>
    <path d="M90 60 Q350 20 610 60 L620 250 L80 250 Z" fill="url(#sfb${id})" stroke="${PIK}" stroke-width="11" stroke-linejoin="round"/>
    <path d="M130 84 Q350 52 570 84" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".35"/>
    <path d="M350 52 L350 240" stroke="${PIK}" stroke-width="6" opacity=".35"/>
    <rect x="70" y="220" width="560" height="104" rx="30" fill="url(#sfs${id})" stroke="${PIK}" stroke-width="11"/>
    <path d="M20 170 Q20 130 60 130 Q104 130 104 170 L104 330 L20 330 Z" fill="url(#sfb${id})" stroke="${PIK}" stroke-width="11" stroke-linejoin="round"/>
    <path d="M596 170 Q596 130 640 130 Q680 130 680 170 L680 330 L596 330 Z" fill="url(#sfb${id})" stroke="${PIK}" stroke-width="11" stroke-linejoin="round"/>
    <path d="M36 160 Q40 146 58 144 M612 160 Q616 146 634 144" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".5"/>
    <g class="sfpillow" style="transform-origin:520px 210px"><rect x="466" y="140" width="110" height="96" rx="24" fill="#ff7aa8" stroke="${PIK}" stroke-width="9" transform="rotate(10 520 190)"/><path d="M490 164 Q520 156 548 170" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".5" transform="rotate(10 520 190)"/></g>`);
}
// radio interference as a little monster («помеха»), viewBox 0 0 240 200: spiky red blob, angry eyes, biting jaw.
// Rig: .nbjaw (lower jaw, r 0 closed .. 28 open, origin 70 128), .nbeye (sy blink), .nbpup (x/y), .nbspark (zigzags around, o / s)
function noiseBugSVG(id, col = '#ff3b5c') {
  let sp = ''; for (let k = 0; k < 11; k++) { const a = (k / 11) * 2 * Math.PI, r0 = 74, r1 = 104 + 10 * (k % 2); sp += `<path d="M${(120 + r0 * Math.cos(a - .2)).toFixed(0)} ${(96 + r0 * .8 * Math.sin(a - .2)).toFixed(0)} L${(120 + r1 * Math.cos(a)).toFixed(0)} ${(96 + r1 * .8 * Math.sin(a)).toFixed(0)} L${(120 + r0 * Math.cos(a + .2)).toFixed(0)} ${(96 + r0 * .8 * Math.sin(a + .2)).toFixed(0)} Z" fill="${col}" stroke="${PIK}" stroke-width="8" stroke-linejoin="round"/>`; }
  return psv('0 0 240 200', `<defs>${rg('nb' + id, '#ff9aa8', col)}</defs>
    <g class="nbspark" fill="none" stroke="#ffe14d" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 40 l14 10 l-10 10 l16 10"/><path d="M214 30 l12 12 l-12 8 l14 12"/><path d="M200 168 l14 8 l-8 12"/></g>
    ${sp}
    <g class="nbjaw" style="transform-origin:70px 128px"><path d="M58 124 Q120 190 186 124 Z" fill="#7a0f22" stroke="${PIK}" stroke-width="9" stroke-linejoin="round"/>
      <path d="M78 128 l10 16 l10 -16 M106 128 l10 18 l10 -18 M136 128 l10 16 l10 -16" fill="#fff" stroke="${PIK}" stroke-width="5" stroke-linejoin="round"/></g>
    <ellipse cx="120" cy="92" rx="84" ry="62" fill="url(#nb${id})" stroke="${PIK}" stroke-width="10"/>
    <path d="M66 126 Q120 140 178 126" fill="none" stroke="${PIK}" stroke-width="9" stroke-linecap="round"/>
    <path d="M84 126 l9 -14 l9 14 M112 127 l9 -15 l9 15 M140 126 l9 -14 l9 14" fill="#fff" stroke="${PIK}" stroke-width="5" stroke-linejoin="round"/>
    <g class="nbeye" style="transform-origin:120px 80px"><ellipse cx="92" cy="80" rx="20" ry="22" fill="#fff" stroke="${PIK}" stroke-width="6"/><ellipse cx="150" cy="80" rx="20" ry="22" fill="#fff" stroke="${PIK}" stroke-width="6"/>
      <g class="nbpup"><circle cx="96" cy="84" r="9" fill="${PIK}"/><circle cx="154" cy="84" r="9" fill="${PIK}"/></g></g>
    <path d="M66 54 L112 68 M176 54 L130 68" stroke="${PIK}" stroke-width="10" stroke-linecap="round"/>
    <path d="M62 60 Q80 40 110 38" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".5"/>`);
}

// ---------- sausage (ролик 032), viewBox 0 0 520 200: plump sausage lying horizontally, twisted ends with string.
// face=true: eyes and a smile. Rig: .ssEye (sy blink, origin 260 92), .sspup (x/y), .ssMouth (sy, origin 260 128),
// .ssx (x-ray: water drops and salt cubes inside, o 0..1), .ssglow (contact glow at the right tip ~ (505,100), o), .ssbite (bite mark, o)
function sausageSVG(id, face = true) {
  const drop = (x, y, s) => `<path d="M${x} ${y - 16 * s} Q${x + 12 * s} ${y} ${x + 12 * s} ${y + 6 * s} Q${x + 12 * s} ${y + 18 * s} ${x} ${y + 18 * s} Q${x - 12 * s} ${y + 18 * s} ${x - 12 * s} ${y + 6 * s} Q${x - 12 * s} ${y} ${x} ${y - 16 * s} Z" fill="#7fd8ff" stroke="${PIK}" stroke-width="4"/>`;
  const salt = (x, y, r) => `<rect x="${x - 9}" y="${y - 9}" width="18" height="18" rx="3" fill="#fff" stroke="${PIK}" stroke-width="4" transform="rotate(${r} ${x} ${y})"/>`;
  return psv('0 0 520 200', `<defs>${lg('ss' + id, '#ffb2a0', '#d9483b')}${rg('ssg' + id, '#fff6b0', 'rgba(255,225,77,0)', '50%', '50%')}</defs>
    <ellipse cx="260" cy="186" rx="220" ry="12" fill="#000" opacity=".28"/>
    <path d="M20 100 l-14 -14 M20 100 l-16 8 M500 100 l14 -14 M500 100 l16 8" stroke="#f4e3c0" stroke-width="7" stroke-linecap="round"/>
    <path d="M40 100 Q30 40 110 34 L410 34 Q490 40 480 100 Q490 160 410 166 L110 166 Q30 160 40 100 Z" fill="url(#ss${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M36 100 Q26 84 20 100 Q26 116 36 100 M484 100 Q494 84 500 100 Q494 116 484 100" fill="#c23a2f" stroke="${PIK}" stroke-width="7"/>
    <path d="M110 56 Q260 46 410 56" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" opacity=".55"/>
    <path d="M150 150 Q260 158 380 150" fill="none" stroke="#8a1f18" stroke-width="7" stroke-linecap="round" opacity=".35"/>
    <g fill="#fff" opacity=".35"><circle cx="90" cy="120" r="5"/><circle cx="430" cy="78" r="4"/><circle cx="400" cy="130" r="5"/><circle cx="120" cy="80" r="3"/></g>
    <g class="ssx" opacity="0"><path d="M60 100 Q54 52 112 50 L408 50 Q466 52 460 100 Q466 148 408 150 L112 150 Q54 148 60 100 Z" fill="#26324f" opacity=".72"/>
      ${drop(110, 90, 1)}${drop(205, 112, .8)}${drop(330, 86, 1)}${drop(420, 112, .85)}${salt(160, 120, 15)}${salt(270, 82, -10)}${salt(380, 128, 30)}${salt(455, 82, 5)}${salt(80, 128, -20)}</g>
    ${face ? `<g class="ssEye" style="transform-origin:260px 92px"><ellipse cx="224" cy="92" rx="17" ry="20" fill="#fff" stroke="${PIK}" stroke-width="6"/><ellipse cx="296" cy="92" rx="17" ry="20" fill="#fff" stroke="${PIK}" stroke-width="6"/>
      <g class="sspup"><circle cx="228" cy="96" r="8" fill="${PIK}"/><circle cx="300" cy="96" r="8" fill="${PIK}"/><circle cx="231" cy="92" r="3" fill="#fff"/><circle cx="303" cy="92" r="3" fill="#fff"/></g></g>
      <g class="ssMouth" style="transform-origin:260px 128px"><path d="M238 122 Q260 146 282 122 Q260 130 238 122 Z" fill="#7a1f24" stroke="${PIK}" stroke-width="6" stroke-linejoin="round"/></g>
      <ellipse cx="196" cy="122" rx="12" ry="7" fill="#ff6a5a" opacity=".55"/><ellipse cx="324" cy="122" rx="12" ry="7" fill="#ff6a5a" opacity=".55"/>` : ''}
    <g class="ssbite" opacity="0"><path d="M470 34 Q440 50 452 72 Q430 86 446 108 Q428 124 450 146 Q444 160 470 166 L520 166 L520 34 Z" fill="#163240"/></g>
    <circle class="ssglow" cx="500" cy="100" r="60" fill="url(#ssg${id})" opacity="0"/>`);
}
// ---------- knitted mitten (ролик 032), viewBox 0 0 300 380, thumb on the left, fingertip at the top (~150,20), cuff at the bottom.
// conductive=true: silver conductive patch on the tip (.mtip) that can glow (.mglow, o). Rig: .mthumb (r, origin 92 230)
function mittenSVG(id, col = '#ff5f6d', conductive = false) {
  let knit = ''; for (let y = 70; y < 290; y += 34) knit += `<path d="M64 ${y} Q150 ${y + 14} 236 ${y}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="10 9" opacity=".35"/>`;
  let rib = ''; for (let x = 64; x <= 236; x += 22) rib += `<path d="M${x} 300 L${x} 368" stroke="${PIK}" stroke-width="4" opacity=".35"/>`;
  return psv('0 0 300 380', `<defs>${lg('mt' + id, '#ff9aa2', col)}${lg('mc' + id, '#f4f7fb', '#b9c6d6')}${lg('ms' + id, '#ffffff', '#8d9bb0')}</defs>
    <g class="mthumb" style="transform-origin:92px 230px"><path d="M92 230 Q30 220 24 160 Q22 120 52 120 Q76 122 86 170 L104 196" fill="url(#mt${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/></g>
    <path d="M64 300 L60 110 Q60 20 150 20 Q240 20 240 110 L236 300 Z" fill="url(#mt${id})" stroke="${PIK}" stroke-width="11" stroke-linejoin="round"/>
    ${knit}
    <path d="M150 120 l-14 22 l14 22 l14 -22 Z M150 190 l-14 22 l14 22 l14 -22 Z" fill="#fff" opacity=".55" stroke="${PIK}" stroke-width="4"/>
    <path d="M86 70 Q100 40 140 34" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".5"/>
    ${conductive ? `<path class="mtip" d="M92 70 Q100 24 150 24 Q200 24 208 70 Q150 86 92 70 Z" fill="url(#ms${id})" stroke="${PIK}" stroke-width="6"/>
      <circle class="mglow" cx="150" cy="30" r="60" fill="#bff6ff" opacity="0"/>` : ''}
    <rect x="52" y="290" width="196" height="84" rx="18" fill="url(#mc${id})" stroke="${PIK}" stroke-width="10"/>${rib}`);
}
// ---------- pointing hand from above (ролик 032), viewBox 0 0 300 640: sleeve at the top, index finger pointing down, tip at (150,628).
// Rig: .hx (x-ray inside the finger: water drops and salt, o), .hglow (contact glow at the tip, o), .hknuck (other fingers, sy)
function pointHandSVG(id, sleeve = '#4a7dff', skin = '#f2c29b') {
  const drop = (x, y) => `<path d="M${x} ${y - 14} Q${x + 10} ${y} ${x + 10} ${y + 5} Q${x + 10} ${y + 15} ${x} ${y + 15} Q${x - 10} ${y + 15} ${x - 10} ${y + 5} Q${x - 10} ${y} ${x} ${y - 14} Z" fill="#7fd8ff" stroke="${PIK}" stroke-width="4"/>`;
  const salt = (x, y, r) => `<rect x="${x - 8}" y="${y - 8}" width="16" height="16" rx="3" fill="#fff" stroke="${PIK}" stroke-width="4" transform="rotate(${r} ${x} ${y})"/>`;
  return psv('0 0 300 640', `<defs>${lg('hs' + id, '#8fb0ff', sleeve, false)}${rg('hk' + id, '#ffe2c8', skin)}${rg('hg' + id, '#fff6b0', 'rgba(255,225,77,0)', '50%', '50%')}</defs>
    <path d="M70 -40 L230 -40 L224 210 L76 210 Z" fill="url(#hs${id})" stroke="${PIK}" stroke-width="11" stroke-linejoin="round"/>
    <path d="M100 -30 L104 196" stroke="#fff" stroke-width="9" opacity=".3" stroke-linecap="round"/>
    <rect x="66" y="196" width="168" height="40" rx="14" fill="#fff" stroke="${PIK}" stroke-width="9"/>
    <path d="M78 230 Q60 300 84 360 Q100 400 150 404 Q206 400 222 356 Q240 296 222 230 Z" fill="url(#hk${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
    <g class="hknuck" style="transform-origin:150px 360px"><path d="M170 356 Q178 392 204 386 Q226 378 220 340 M110 360 Q104 396 84 388 Q66 378 76 340" fill="url(#hk${id})" stroke="${PIK}" stroke-width="9" stroke-linejoin="round"/></g>
    <path d="M124 380 L122 600 Q122 632 150 632 Q178 632 178 600 L176 380 Z" fill="url(#hk${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M132 596 Q150 610 168 596 L166 616 Q150 626 134 616 Z" fill="#ffd9c6" stroke="${PIK}" stroke-width="4"/>
    <path d="M134 400 L134 560" stroke="#fff" stroke-width="7" opacity=".45" stroke-linecap="round"/>
    <path d="M128 470 Q150 478 172 470 M128 530 Q150 538 172 530" fill="none" stroke="#c98a66" stroke-width="5" stroke-linecap="round"/>
    <g class="hx" opacity="0"><path d="M132 392 L130 598 Q130 622 150 622 Q170 622 170 598 L168 392 Z" fill="#26324f" opacity=".78"/>${drop(150, 430)}${salt(146, 478, 20)}${drop(152, 522)}${salt(150, 570, -15)}${drop(148, 604)}</g>
    <circle class="hglow" cx="150" cy="630" r="70" fill="url(#hg${id})" opacity="0"/>`);
}
// ---------- snowy bus stop (ролик 032), viewBox 0 0 620 560: shelter with a snow cap, glass back wall, bench, sign pole on the right.
// Rig: .bsnow (snow cap, sy origin 300 40), .bsign (sign plate, r origin 560 120), .blamp (light, o)
function busStopSVG(id, col = '#3a8fd8') {
  return psv('0 0 620 560', `<defs>${lg('bsr' + id, '#7cc0ff', col)}${lg('bsg' + id, 'rgba(210,240,255,.55)', 'rgba(120,190,230,.25)')}${lg('bsb' + id, '#d99a5c', '#9a5a2a')}</defs>
    <ellipse cx="300" cy="548" rx="300" ry="14" fill="#000" opacity=".25"/>
    <rect x="40" y="70" width="20" height="470" fill="#5a6478" stroke="${PIK}" stroke-width="8"/><rect x="420" y="70" width="20" height="470" fill="#5a6478" stroke="${PIK}" stroke-width="8"/>
    <rect x="62" y="96" width="356" height="330" rx="8" fill="url(#bsg${id})" stroke="${PIK}" stroke-width="8"/>
    <path d="M90 120 L180 400 M150 120 L200 260" stroke="#fff" stroke-width="10" opacity=".35" stroke-linecap="round"/>
    <rect x="18" y="52" width="444" height="40" rx="10" fill="url(#bsr${id})" stroke="${PIK}" stroke-width="9"/>
    <g class="bsnow" style="transform-origin:240px 52px"><path d="M10 56 Q20 22 80 26 Q140 10 210 24 Q290 8 360 24 Q440 14 470 52 Q460 66 440 58 Q400 70 350 58 Q280 72 220 58 Q150 70 90 58 Q40 70 10 56 Z" fill="#f4fbff" stroke="${PIK}" stroke-width="7" stroke-linejoin="round"/></g>
    <rect x="100" y="400" width="280" height="30" rx="10" fill="url(#bsb${id})" stroke="${PIK}" stroke-width="8"/>
    <rect x="120" y="428" width="16" height="70" fill="#5a6478" stroke="${PIK}" stroke-width="6"/><rect x="344" y="428" width="16" height="70" fill="#5a6478" stroke="${PIK}" stroke-width="6"/>
    <path d="M100 404 Q240 392 380 404" fill="none" stroke="#f4fbff" stroke-width="10" stroke-linecap="round"/>
    <rect x="550" y="110" width="16" height="430" fill="#5a6478" stroke="${PIK}" stroke-width="7"/>
    <g class="bsign" style="transform-origin:558px 112px"><circle cx="558" cy="150" r="52" fill="#ffd34d" stroke="${PIK}" stroke-width="9"/>
      <rect x="530" y="128" width="56" height="38" rx="9" fill="#2b74c9" stroke="${PIK}" stroke-width="5"/><circle cx="542" cy="172" r="7" fill="${PIK}"/><circle cx="574" cy="172" r="7" fill="${PIK}"/><rect x="536" y="134" width="44" height="14" rx="3" fill="#bfe6ff"/></g>
    <circle class="blamp" cx="240" cy="110" r="70" fill="#fff3c4" opacity=".0"/>`);
}

// ---------- added 14.11.2026 (ролик 034 «Зарядка 365 дней в розетке. Сколько съест?») ----------
// wall socket (euro type, front view), viewBox 0 0 300 300: plate 20..280, round recess centre (150,150) r 92, two holes at x 112/188.
// Rig: .skholes (the two holes, hide them when a plug sits in), .skshine (o)
function socketSVG(id, col = '#f4efe6') {
  return psv('0 0 300 300', `<defs>${lg('sk' + id, col, '#c9c1b2')}${rg('skr' + id, '#d9d2c4', '#a39b8c', '50%', '40%')}</defs>
  <rect x="26" y="34" width="254" height="254" rx="46" fill="#000" opacity=".22"/>
  <rect x="20" y="20" width="260" height="260" rx="46" fill="url(#sk${id})" stroke="${PIK}" stroke-width="10"/>
  <circle cx="150" cy="150" r="92" fill="url(#skr${id})" stroke="${PIK}" stroke-width="8"/>
  <rect x="140" y="58" width="20" height="16" rx="4" fill="#9aa3ab" stroke="${PIK}" stroke-width="5"/><rect x="140" y="226" width="20" height="16" rx="4" fill="#9aa3ab" stroke="${PIK}" stroke-width="5"/>
  <g class="skholes"><circle cx="112" cy="150" r="17" fill="#1d1a17" stroke="${PIK}" stroke-width="5"/><circle cx="188" cy="150" r="17" fill="#1d1a17" stroke="${PIK}" stroke-width="5"/></g>
  <path class="skshine" d="M44 90 Q46 46 90 42" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".7"/>`);
}
// phone charger brick plugged into a wall, front view, viewBox 0 0 260 300: body 30..230 x 30..250, cable leaves the bottom at (130,250).
// Same face rig as talkPhoneSVG/keyCharSVG: .keye (sy blink, origin 130 125), .kpup (x/y ±7), .kbrow (y), .kmouth (sy 0.12..1, origin 130 180).
// Extra: .chled (status LED, o), .chlid (sleepy closed lids, o), .chheat (heat waves above the body, o / y), .chzz (Z letters, o).
// old=true: heavy black transformer brick (bigger, ribs, sticker) for "old charger". face=false: plain brick.
function chargerSVG(id, face = true, old = false) {
  const c0 = old ? '#4a4a52' : '#ffffff', c1 = old ? '#1c1c22' : '#d9dde4', ink = PIK;
  const body = old ? `<rect x="14" y="20" width="232" height="244" rx="26" fill="url(#cg${id})" stroke="${ink}" stroke-width="10"/>
    ${[0, 1, 2, 3, 4].map(k => `<rect x="30" y="${200 + k * 0}" width="0" height="0"/>`).join('')}
    ${[0, 1, 2, 3].map(k => `<path d="M34 ${208 + k * 12} L226 ${208 + k * 12}" stroke="#0e0e12" stroke-width="5" opacity=".8"/>`).join('')}
    <rect x="150" y="34" width="80" height="48" rx="6" fill="#e8d27a" stroke="${ink}" stroke-width="5"/><path d="M160 50 L218 50 M160 64 L204 64" stroke="#5a4a1a" stroke-width="5"/>`
    : `<rect x="30" y="30" width="200" height="220" rx="44" fill="url(#cg${id})" stroke="${ink}" stroke-width="10"/>
    <rect x="44" y="214" width="172" height="26" rx="13" fill="#000" opacity=".08"/>`;
  const fc = face ? `<g class="kbrow"><path d="M78 92 Q96 82 112 90 M148 90 Q164 82 182 92" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round"/></g>
    <g class="keye" style="transform-origin:130px 125px"><ellipse cx="98" cy="125" rx="20" ry="24" fill="#fff" stroke="${ink}" stroke-width="7"/><ellipse cx="162" cy="125" rx="20" ry="24" fill="#fff" stroke="${ink}" stroke-width="7"/>
      <g class="kpup"><circle cx="100" cy="128" r="10" fill="${ink}"/><circle cx="164" cy="128" r="10" fill="${ink}"/><circle cx="104" cy="123" r="3.5" fill="#fff"/><circle cx="168" cy="123" r="3.5" fill="#fff"/></g></g>
    <g class="chlid" style="opacity:0"><path d="M76 124 Q98 136 120 124" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round"/><path d="M140 124 Q162 136 184 124" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round"/>
      <ellipse cx="98" cy="118" rx="24" ry="20" fill="${c0}"/><ellipse cx="162" cy="118" rx="24" ry="20" fill="${c0}"/><path d="M76 126 Q98 138 120 126 M140 126 Q162 138 184 126" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round"/></g>
    <circle cx="70" cy="160" r="12" fill="#ff8aa0" opacity=".55"/><circle cx="190" cy="160" r="12" fill="#ff8aa0" opacity=".55"/>
    <g class="kmouth" style="transform-origin:130px 180px"><path d="M108 172 Q130 200 152 172 Q130 184 108 172 Z" fill="#7a1f2b" stroke="${ink}" stroke-width="6" stroke-linejoin="round"/></g>` : '';
  return psv('0 0 260 300', `<defs>${lg('cg' + id, c0, c1)}</defs>
  <g class="chheat" style="opacity:0">${[60, 130, 200].map(x => `<path d="M${x} 10 Q${x - 14} -14 ${x} -38 T${x} -86" fill="none" stroke="#ff9a3d" stroke-width="9" stroke-linecap="round" opacity=".85"/>`).join('')}</g>
  ${body}
  <path d="${old ? 'M34 50 Q36 30 60 28' : 'M50 70 Q52 44 80 40'}" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity="${old ? .25 : .9}"/>
  <rect x="112" y="${old ? 258 : 244}" width="36" height="22" rx="6" fill="#2b2f38" stroke="${ink}" stroke-width="6"/>
  <circle class="chled" cx="${old ? 40 : 200}" cy="${old ? 40 : 62}" r="8" fill="#7dff8a" stroke="${ink}" stroke-width="4" style="opacity:0"/>
  ${fc}
  <g class="chzz" style="opacity:0"><text x="214" y="40" style="font:900 40px Unb" fill="#cfe3ff" stroke="${ink}" stroke-width="3">z</text><text x="236" y="6" style="font:900 52px Unb" fill="#cfe3ff" stroke="${ink}" stroke-width="3">Z</text></g>`);
}
// electricity meter (old Ferraris type) on a wall, viewBox 0 0 360 460: box 20..340 x 20..440, digit window 70..290 x 110..170
// (put live digits in .mdtx text: 5 chars), disc slot 70..290 x 220..270 with a sliding red mark .mmark (tween x from -110 to 110,
// wrap it yourself), .mglass shine (o), .mspin (motion streaks over the disc, o).
function meterSVG(id, col = '#d7dbe0') {
  return psv('0 0 360 460', `<defs>${lg('mt' + id, col, '#8f97a1')}${lg('mtd' + id, '#2b2f38', '#11131a')}${lg('mtc' + id, '#d9dde2', '#7d858f', false)}
    <clipPath id="mtcl${id}"><rect x="72" y="222" width="216" height="46" rx="10"/></clipPath></defs>
  <rect x="28" y="32" width="320" height="420" rx="34" fill="#000" opacity=".25"/>
  <rect x="20" y="20" width="320" height="420" rx="34" fill="url(#mt${id})" stroke="${PIK}" stroke-width="10"/>
  <rect x="46" y="46" width="268" height="300" rx="20" fill="#eef2f5" stroke="${PIK}" stroke-width="7"/>
  <text x="180" y="94" text-anchor="middle" style="font:800 30px JB" fill="#3a4250">кВт·ч</text>
  <rect x="70" y="110" width="220" height="62" rx="10" fill="url(#mtd${id})" stroke="${PIK}" stroke-width="7"/>
  ${[1, 2, 3, 4].map(k => `<path d="M${70 + k * 44} 112 L${70 + k * 44} 170" stroke="#3a3f4b" stroke-width="3"/>`).join('')}
  <rect x="246" y="112" width="42" height="58" fill="#c8262f" opacity=".55"/>
  <text class="mdtx" x="180" y="157" text-anchor="middle" style="font:800 46px JB;letter-spacing:15px" fill="#fff">00000</text>
  <rect x="70" y="220" width="220" height="50" rx="12" fill="url(#mtc${id})" stroke="${PIK}" stroke-width="7"/>
  <g clip-path="url(#mtcl${id})"><path d="M72 245 L288 245" stroke="#5a616b" stroke-width="4" opacity=".5"/>
    <g class="mmark"><rect x="170" y="222" width="22" height="46" fill="#e8262f"/></g>
    <g class="mspin" style="opacity:0">${[0, 1, 2, 3, 4, 5].map(k => `<path d="M${80 + k * 36} 232 L${110 + k * 36} 232 M${92 + k * 36} 258 L${120 + k * 36} 258" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>`).join('')}</g></g>
  <path d="M60 300 L300 300" stroke="#c3cad2" stroke-width="5"/><text x="180" y="330" text-anchor="middle" style="font:700 22px JB" fill="#59616c">220 В · 50 Гц</text>
  <rect x="120" y="372" width="120" height="44" rx="10" fill="#5a616b" stroke="${PIK}" stroke-width="6"/>${[0, 1, 2].map(k => `<circle cx="${146 + k * 34}" cy="394" r="9" fill="#c9a64a" stroke="${PIK}" stroke-width="4"/>`).join('')}
  <path class="mglass" d="M62 70 Q64 52 86 50" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".9"/>`);
}
// electric kettle, viewBox 0 0 320 340: body 50..250 x 60..290 on a base 40..260 x 290..330, spout to the upper left (20,80), handle right.
// Rig: .ksteam (three steam curls above the spout/lid, o / y), .klight (power light on the base, o), .kwater (water level in the window, sy origin 150 270),
// .klid (lid, r origin 210 62 for a rattling boil)
function kettleSVG(id, col = '#5fd4ff') {
  return psv('0 0 320 340', `<defs>${lg('kt' + id, col, '#2a7fb8')}${lg('ktb' + id, '#3a3f4b', '#16181f')}${lg('ktw' + id, '#bff1ff', '#58c8f0')}</defs>
  <g class="ksteam" style="opacity:0">${[0, 1, 2].map(k => `<path d="M${120 + k * 40} 36 Q${104 + k * 40} 10 ${120 + k * 40} -16 T${120 + k * 40} -70" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity="${.85 - k * .15}"/>`).join('')}</g>
  <path d="M244 110 Q306 116 300 190 Q296 248 244 256" fill="none" stroke="${PIK}" stroke-width="34" stroke-linecap="round"/>
  <path d="M244 110 Q306 116 300 190 Q296 248 244 256" fill="none" stroke="url(#ktb${id})" stroke-width="18" stroke-linecap="round"/>
  <path d="M74 104 L20 74 L28 64 L84 82 Z" fill="url(#kt${id})" stroke="${PIK}" stroke-width="9" stroke-linejoin="round"/>
  <path d="M70 70 Q150 44 236 70 L254 286 Q150 300 50 286 Z" fill="url(#kt${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
  <g class="klid" style="transform-origin:210px 62px"><path d="M92 66 Q150 36 214 66 Q150 56 92 66 Z" fill="#2b2f38" stroke="${PIK}" stroke-width="8"/><rect x="138" y="36" width="26" height="16" rx="6" fill="#2b2f38" stroke="${PIK}" stroke-width="6"/></g>
  <rect x="128" y="120" width="44" height="150" rx="18" fill="#0c3550" stroke="${PIK}" stroke-width="7"/>
  <g class="kwater" style="transform-origin:150px 268px"><rect x="132" y="170" width="36" height="96" rx="14" fill="url(#ktw${id})"/></g>
  ${[0, 1, 2].map(k => `<path d="M174 ${150 + k * 40} L186 ${150 + k * 40}" stroke="#fff" stroke-width="5" opacity=".8"/>`).join('')}
  <path d="M82 110 Q84 180 92 250" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".55"/>
  <rect x="40" y="286" width="224" height="42" rx="16" fill="url(#ktb${id})" stroke="${PIK}" stroke-width="9"/>
  <circle class="klight" cx="152" cy="307" r="9" fill="#ff7a3d" stroke="${PIK}" stroke-width="4" style="opacity:0"/>`);
}
// garden snail, side view moving right, viewBox 0 0 320 220: shell centre (130,100) r 80, head to the right (~280,150), foot along y 190.
// Rig: .snstalk (eye stalks, r origin 262 128), .snshell (shell, r/s origin 130 110), .sntrail (slime trail to the left, sx origin 60 196, o)
function snailSVG(id, shell = '#ff9a3d') {
  return psv('0 0 320 220', `<defs>${lg('sn' + id, '#ffe3a8', '#e0a85a')}${rg('sns' + id, '#ffd08a', shell, '40%', '35%')}</defs>
  <g class="sntrail" style="transform-origin:60px 196px"><path d="M-160 198 L60 198" stroke="#cfe8ff" stroke-width="12" stroke-linecap="round" opacity=".55"/></g>
  <path d="M30 196 Q24 168 70 162 L250 156 Q300 152 302 182 Q304 200 280 202 L48 204 Q30 204 30 196 Z" fill="url(#sn${id})" stroke="${PIK}" stroke-width="9" stroke-linejoin="round"/>
  <g class="snstalk" style="transform-origin:262px 128px"><path d="M256 150 L246 84 M276 150 L292 88" stroke="${PIK}" stroke-width="16" stroke-linecap="round"/><path d="M256 150 L246 84 M276 150 L292 88" stroke="#e8b46a" stroke-width="7" stroke-linecap="round"/>
    <circle cx="246" cy="80" r="14" fill="#fff" stroke="${PIK}" stroke-width="6"/><circle cx="292" cy="84" r="14" fill="#fff" stroke="${PIK}" stroke-width="6"/><circle cx="249" cy="82" r="6" fill="${PIK}"/><circle cx="295" cy="86" r="6" fill="${PIK}"/></g>
  <path d="M268 172 Q280 182 292 172" fill="none" stroke="${PIK}" stroke-width="6" stroke-linecap="round"/>
  <g class="snshell" style="transform-origin:130px 110px"><circle cx="130" cy="104" r="82" fill="url(#sns${id})" stroke="${PIK}" stroke-width="10"/>
    <path d="M130 104 m0 -10 a10 10 0 1 1 -10 12 a24 24 0 1 1 30 -26 a42 42 0 1 1 -60 46 a60 60 0 1 1 92 -66" fill="none" stroke="#a8561a" stroke-width="9" stroke-linecap="round"/>
    <path d="M76 52 Q100 30 130 28" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".7"/></g>`);
}
// travel suitcase, viewBox 0 0 320 300: body 20..300 x 70..290, handle on top (160, 30..70). Rig: .scdust (dust layer, o), .scweb (cobweb in the top-left corner, o),
// .scsticker (stickers, o)
function suitcaseSVG(id, col = '#ff5f6d') {
  return psv('0 0 320 300', `<defs>${lg('sc' + id, col, '#a8243a')}</defs>
  <path d="M120 72 L120 36 Q120 22 134 22 L186 22 Q200 22 200 36 L200 72" fill="none" stroke="${PIK}" stroke-width="16" stroke-linejoin="round"/>
  <rect x="20" y="70" width="280" height="220" rx="30" fill="url(#sc${id})" stroke="${PIK}" stroke-width="10"/>
  <path d="M96 74 L96 286 M224 74 L224 286" stroke="#6a1424" stroke-width="12"/><path d="M96 74 L96 286 M224 74 L224 286" stroke="#e6b86a" stroke-width="5"/>
  <path d="M40 110 Q42 86 66 84" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".55"/>
  <g class="scsticker"><circle cx="160" cy="200" r="34" fill="#ffe14d" stroke="${PIK}" stroke-width="6"/><path d="M144 200 L176 200 M160 184 L160 216" stroke="${PIK}" stroke-width="6"/>
    <rect x="244" y="230" width="44" height="30" rx="6" fill="#7dff8a" stroke="${PIK}" stroke-width="5" transform="rotate(-12 266 245)"/></g>
  <g class="scdust" style="opacity:0"><rect x="24" y="74" width="272" height="60" rx="26" fill="#d8cdb8" opacity=".75"/>${[0, 1, 2, 3, 4, 5, 6].map(k => `<circle cx="${50 + k * 36}" cy="${96 + 10 * Math.sin(k * 2)}" r="${5 + (k % 3) * 2}" fill="#b8ab92"/>`).join('')}</g>
  <g class="scweb" style="opacity:0"><path d="M24 76 L96 76 M24 76 L24 150 M24 76 L80 132 M24 76 L60 150 M24 76 L96 110 M46 76 Q40 98 24 102 M70 76 Q62 116 24 126 M92 78 Q80 130 26 146" fill="none" stroke="#fff" stroke-width="3.5" opacity=".9"/></g>`);
}
// chip-guard character (a microchip with pins as legs, guard cap and a torch), viewBox 0 0 300 360: chip body 60..240 x 90..270.
// Same face rig: .keye (sy, origin 150 170), .kpup (x/y ±7), .kbrow (y), .kmouth (sy 0.12..1, origin 150 222).
// Rig: .cgarmR (torch arm, r origin 236 200), .cgarmL (r origin 64 200), .cgbeam (torch beam, o / sx origin 300 196), .cglid (sleepy lids, o),
// .cgcap (cap, r origin 150 90), .cglegs (all pin-legs, sy), .cgzz (Z letters, o)
function chipGuardSVG(id) {
  const ink = PIK;
  let pins = ''; for (let k = 0; k < 5; k++) { const x = 84 + k * 33; pins += `<rect x="${x - 6}" y="268" width="12" height="40" rx="4" fill="#c9a64a" stroke="${ink}" stroke-width="5"/><rect x="${x - 6}" y="52" width="12" height="40" rx="4" fill="#c9a64a" stroke="${ink}" stroke-width="5"/>`; }
  for (let k = 0; k < 4; k++) { const y = 120 + k * 40; pins += `<rect x="34" y="${y - 6}" width="30" height="12" rx="4" fill="#c9a64a" stroke="${ink}" stroke-width="5"/><rect x="236" y="${y - 6}" width="30" height="12" rx="4" fill="#c9a64a" stroke="${ink}" stroke-width="5"/>`; }
  return psv('0 0 300 360', `<defs>${lg('cgb' + id, '#3a4050', '#141720')}${lg('cgc' + id, '#4a7dff', '#2a46a8')}</defs>
  <g class="cgbeam" style="opacity:0;transform-origin:292px 196px"><path d="M292 196 L560 120 L560 290 Z" fill="#fff6b0" opacity=".45"/></g>
  <g class="cglegs" style="transform-origin:150px 270px"><path d="M110 270 L104 340 L84 344 M190 270 L196 340 L216 344" fill="none" stroke="${ink}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/></g>
  ${pins}
  <g class="cgarmL" style="transform-origin:64px 200px"><path d="M64 200 Q30 220 24 250" fill="none" stroke="${ink}" stroke-width="14" stroke-linecap="round"/><circle cx="24" cy="254" r="16" fill="#fff" stroke="${ink}" stroke-width="6"/></g>
  <rect x="60" y="90" width="180" height="180" rx="22" fill="url(#cgb${id})" stroke="${ink}" stroke-width="10"/>
  <rect x="76" y="106" width="148" height="148" rx="14" fill="none" stroke="#5a6478" stroke-width="4"/>
  <path d="M80 112 Q82 100 96 98" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".45"/>
  <g class="cgcap" style="transform-origin:150px 90px"><path d="M70 96 Q74 40 150 36 Q226 40 230 96 Z" fill="url(#cgc${id})" stroke="${ink}" stroke-width="9" stroke-linejoin="round"/>
    <path d="M60 98 Q150 80 252 96 L262 110 Q150 96 54 112 Z" fill="#1a2a6a" stroke="${ink}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M150 50 L160 68 L180 68 L164 80 L170 98 L150 86 L130 98 L136 80 L120 68 L140 68 Z" fill="#ffe14d" stroke="${ink}" stroke-width="4"/></g>
  <g class="kbrow"><path d="M98 140 Q114 132 128 140 M172 140 Q186 132 202 140" fill="none" stroke="#cfd6e4" stroke-width="7" stroke-linecap="round"/></g>
  <g class="keye" style="transform-origin:150px 170px"><ellipse cx="114" cy="170" rx="18" ry="21" fill="#fff" stroke="${ink}" stroke-width="6"/><ellipse cx="186" cy="170" rx="18" ry="21" fill="#fff" stroke="${ink}" stroke-width="6"/>
    <g class="kpup"><circle cx="116" cy="173" r="9" fill="${ink}"/><circle cx="188" cy="173" r="9" fill="${ink}"/><circle cx="119" cy="169" r="3" fill="#fff"/><circle cx="191" cy="169" r="3" fill="#fff"/></g></g>
  <g class="cglid" style="opacity:0"><ellipse cx="114" cy="166" rx="22" ry="20" fill="#2a2f3b"/><ellipse cx="186" cy="166" rx="22" ry="20" fill="#2a2f3b"/><path d="M94 172 Q114 184 134 172 M166 172 Q186 184 206 172" fill="none" stroke="#cfd6e4" stroke-width="6" stroke-linecap="round"/></g>
  <g class="kmouth" style="transform-origin:150px 222px"><path d="M130 214 Q150 240 170 214 Q150 224 130 214 Z" fill="#7a1f2b" stroke="${ink}" stroke-width="5" stroke-linejoin="round"/></g>
  <g class="cgarmR" style="transform-origin:236px 200px"><path d="M236 200 Q262 196 272 190" fill="none" stroke="${ink}" stroke-width="14" stroke-linecap="round"/>
    <rect x="262" y="178" width="34" height="26" rx="6" fill="#ffd23f" stroke="${ink}" stroke-width="6"/><circle cx="272" cy="206" r="13" fill="#fff" stroke="${ink}" stroke-width="5"/></g>
  <g class="cgzz" style="opacity:0"><text x="224" y="60" style="font:900 44px Unb" fill="#cfe3ff" stroke="${ink}" stroke-width="3">z</text><text x="250" y="20" style="font:900 58px Unb" fill="#cfe3ff" stroke="${ink}" stroke-width="3">Z</text></g>`);
}
