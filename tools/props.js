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
