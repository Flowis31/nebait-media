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
function manualSVG(id, title = 'ИНСТРУКЦИЯ') {
  let lines = ''; for (let k = 0; k < 6; k++) lines += `<path class="mline${k}" pathLength="100" d="M360 ${120 + k * 44} L${560 - (k % 3) * 40} ${120 + k * 44}" stroke="#5a6474" stroke-width="12" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/>`;
  return psv('0 0 640 440', `<defs>${lg('mn' + id, '#ffffff', '#e8e2d2')}</defs>
    <path d="M20 40 Q170 10 320 40 L320 420 Q170 390 20 420 Z" fill="url(#mn${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
    <g class="mpage" style="transform-origin:320px 220px"><path d="M320 40 Q470 10 620 40 L620 420 Q470 390 320 420 Z" fill="url(#mn${id})" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>${lines}
      <path class="mmark" pathLength="100" d="M350 390 Q470 372 590 386" fill="none" stroke="#ff3b5c" stroke-width="12" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100"/></g>
    <text x="170" y="120" text-anchor="middle" style="font:900 27px Unb" fill="#2a3346">${title}</text>
    <circle cx="170" cy="240" r="62" fill="#5fc8ff" stroke="${PIK}" stroke-width="8"/><path d="M170 196 Q200 240 200 254 Q200 284 170 284 Q140 284 140 254 Q140 240 170 196 Z" fill="#fff" stroke="${PIK}" stroke-width="6"/>
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
