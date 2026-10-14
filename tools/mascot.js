// Mascot of the «Не байт» channel: green virus in round glasses (brand/nebait-avatar.png), detailed version from 15.10.2026.
// Load after engine.js and before art.js:  <script src="mascot.js"></script>
// mascotSVG(id) -> SVG string, viewBox 0 0 400 400, put it into a square box (300x300 is the usual size). Every instance needs its own id.
// Rig (same class names and pivots as the old mascot, so old timelines keep working):
//   .armL / .armR  rotate around the shoulders (90,230) / (310,230); r>0 swings armL up-left... check a still before relying on a sign
//   .legL / .legR  rotate around the hips (168,318) / (232,318)
//   .pup           both pupils, move with x/y (stay within about +-8 px)
//   .brL / .brR    eyebrows, move with y/r
//   .mouth         smile; sy:-1 turns it into a frown
//   .lid           eyelids, sy 0 = open, 1 = closed (mascotLife() blinks them)
// mascotLife() after creating all mascots: blinking and a slow leg sway. Loop-safe (no blink in the first 0.6 s and the last 0.8 s).
function mascotSVG(id) {
  const ink = '#0a130d';
  let spikes = '';
  for (const d of [-90, -126, -54, -162, -18, 162, 18, 130, 50]) {           // no spikes at the bottom: the legs live there
    const a = d * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    const x1 = 200 + 118 * c, y1 = 200 + 118 * s, x2 = 200 + 170 * c, y2 = 200 + 170 * s;
    spikes += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${ink}" stroke-width="26" stroke-linecap="round"/>`
      + `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#7cc423" stroke-width="12" stroke-linecap="round"/>`
      + `<circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="21" fill="url(#msb${id})" stroke="${ink}" stroke-width="8"/>`
      + `<circle cx="${(x2 - 6).toFixed(1)}" cy="${(y2 - 7).toFixed(1)}" r="5.5" fill="#fff" opacity=".8"/>`;
  }
  const arm = (cls, ox, hx, hy, tx, ty, cx) => `<g class="${cls}" style="transform-origin:${ox}px 230px">
    <path d="M${ox} 230 Q${cx} 252 ${hx} ${hy}" fill="none" stroke="${ink}" stroke-width="30" stroke-linecap="round"/>
    <path d="M${ox} 230 Q${cx} 252 ${hx} ${hy}" fill="none" stroke="#7cc423" stroke-width="15" stroke-linecap="round"/>
    <path d="M${ox} 226 Q${cx} 246 ${hx + (ox < 200 ? 4 : -4)} ${hy - 8}" fill="none" stroke="#c9ff6e" stroke-width="4" stroke-linecap="round" opacity=".7"/>
    <circle cx="${hx}" cy="${hy}" r="25" fill="url(#msw${id})" stroke="${ink}" stroke-width="8"/>
    <circle cx="${tx}" cy="${ty}" r="11" fill="url(#msw${id})" stroke="${ink}" stroke-width="6"/>
    <path d="M${hx - 12} ${hy + 4} Q${hx} ${hy + 12} ${hx + 12} ${hy + 4}" fill="none" stroke="#b7ad98" stroke-width="4" stroke-linecap="round"/>
    <circle cx="${hx - 8}" cy="${hy - 9}" r="6" fill="#fff"/></g>`;
  const leg = (cls, hx, fx, dir) => `<g class="${cls}" style="transform-origin:${hx}px 318px">
    <path d="M${hx} 312 L${fx} 360" fill="none" stroke="${ink}" stroke-width="30" stroke-linecap="round"/>
    <path d="M${hx} 312 L${fx} 360" fill="none" stroke="#7cc423" stroke-width="15" stroke-linecap="round"/>
    <path d="M${fx - 28 * dir} 382 L${fx + 36 * dir} 382 Q${fx + 38 * dir} 392 ${fx + 26 * dir} 392 L${fx - 20 * dir} 392 Q${fx - 30 * dir} 392 ${fx - 28 * dir} 382 Z" fill="#f4ecd9" stroke="${ink}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M${fx - 26 * dir} 380 Q${fx - 24 * dir} 352 ${fx} 352 Q${fx + 30 * dir} 352 ${fx + 34 * dir} 380 Z" fill="#26392d" stroke="${ink}" stroke-width="8" stroke-linejoin="round"/>
    <circle cx="${fx + 2 * dir}" cy="${367}" r="4" fill="#b8ff3d"/>
    <path d="M${fx - 8 * dir} 361 Q${fx + 6 * dir} 356 ${fx + 18 * dir} 362" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".45"/></g>`;
  const eye = (cx) => `<circle cx="${cx}" cy="190" r="48" fill="url(#mse${id})"/>`;
  const lid = (cx) => `<g class="lid" style="transform-origin:${cx}px 142px;transform:scaleY(0)"><circle cx="${cx}" cy="190" r="49" fill="url(#msl${id})"/></g>`;
  return `<svg class="mascot-svg" viewBox="0 0 400 400" style="overflow:visible;left:0;top:0;width:100%;height:100%">
  <defs>
    <radialGradient id="msg${id}" cx="38%" cy="30%" r="78%"><stop offset="0" stop-color="#ecffa8"/><stop offset=".42" stop-color="#b8ff3d"/><stop offset="1" stop-color="#6cbd18"/></radialGradient>
    <radialGradient id="msh${id}" cx="36%" cy="28%" r="80%"><stop offset=".55" stop-color="#3d7a0c" stop-opacity="0"/><stop offset="1" stop-color="#2c5e08" stop-opacity=".42"/></radialGradient>
    <radialGradient id="msb${id}" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#f2ffbf"/><stop offset=".5" stop-color="#b8ff3d"/><stop offset="1" stop-color="#6cbd18"/></radialGradient>
    <radialGradient id="msw${id}" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d9d0bb"/></radialGradient>
    <linearGradient id="mse${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dde9d4"/></linearGradient>
    <linearGradient id="msl${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8ff63"/><stop offset=".85" stop-color="#8fd82c"/><stop offset="1" stop-color="#5f9f16"/></linearGradient>
  </defs>
  ${leg('legL', 168, 158, -1)}${leg('legR', 232, 242, 1)}
  ${arm('armL', 90, 14, 290, 30, 272, 48)}${arm('armR', 310, 386, 290, 370, 272, 352)}
  ${spikes}
  <circle cx="200" cy="200" r="132" fill="url(#msg${id})" stroke="${ink}" stroke-width="12"/>
  <circle cx="200" cy="200" r="126" fill="url(#msh${id})"/>
  <path d="M100 136 A116 116 0 0 1 176 84" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".55"/>
  <circle cx="292" cy="262" r="15" fill="#5fae14" opacity=".45"/><circle cx="270" cy="292" r="8" fill="#5fae14" opacity=".4"/>
  <circle cx="106" cy="262" r="11" fill="#5fae14" opacity=".4"/><circle cx="286" cy="112" r="9" fill="#5fae14" opacity=".35"/>
  <ellipse cx="114" cy="246" rx="20" ry="11" fill="#ff8a7a" opacity=".22"/><ellipse cx="290" cy="240" rx="20" ry="11" fill="#ff8a7a" opacity=".22"/>
  ${eye(150)}${eye(250)}
  <g class="pup"><circle cx="156" cy="194" r="21" fill="${ink}"/><circle cx="256" cy="194" r="21" fill="${ink}"/>
    <circle cx="156" cy="194" r="12" fill="#1f3a26"/><circle cx="256" cy="194" r="12" fill="#1f3a26"/>
    <circle cx="164" cy="185" r="7.5" fill="#fff"/><circle cx="264" cy="185" r="7.5" fill="#fff"/>
    <circle cx="150" cy="202" r="3" fill="#fff" opacity=".8"/><circle cx="250" cy="202" r="3" fill="#fff" opacity=".8"/></g>
  ${lid(150)}${lid(250)}
  <circle cx="150" cy="190" r="55" fill="none" stroke="${ink}" stroke-width="13"/><circle cx="250" cy="190" r="55" fill="none" stroke="${ink}" stroke-width="13"/>
  <circle cx="150" cy="190" r="55" fill="none" stroke="#3b5244" stroke-width="3" stroke-dasharray="60 400" transform="rotate(200 150 190)"/>
  <circle cx="250" cy="190" r="55" fill="none" stroke="#3b5244" stroke-width="3" stroke-dasharray="60 400" transform="rotate(200 250 190)"/>
  <path d="M194 184 Q200 172 206 184" fill="none" stroke="${ink}" stroke-width="11" stroke-linecap="round"/>
  <path d="M96 178 L74 168" stroke="${ink}" stroke-width="11" stroke-linecap="round"/><path d="M304 178 L326 168" stroke="${ink}" stroke-width="11" stroke-linecap="round"/>
  <path d="M116 172 A38 38 0 0 1 138 152" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".6"/>
  <path d="M216 172 A38 38 0 0 1 238 152" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".6"/>
  <circle cx="122" cy="214" r="4" fill="#fff" opacity=".45"/><circle cx="222" cy="214" r="4" fill="#fff" opacity=".45"/>
  <path class="brL" style="transform-origin:150px 122px" d="M106 124 Q148 98 190 116" fill="none" stroke="${ink}" stroke-width="13" stroke-linecap="round"/>
  <path class="brR" style="transform-origin:250px 118px" d="M212 116 Q252 100 292 108" fill="none" stroke="${ink}" stroke-width="13" stroke-linecap="round"/>
  <g class="mouth" style="transform-origin:200px 268px">
    <path d="M160 260 Q204 296 246 256" fill="none" stroke="${ink}" stroke-width="12" stroke-linecap="round"/>
    <path d="M243 247 Q253 254 249 265" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round"/>
    <path d="M182 277 Q204 285 224 276" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/></g>
  </svg>`;
}
function mascotLife() {
  const n = Math.max(1, Math.round(TOTAL / 3.3)), P = TOTAL / n;
  $$('svg.mascot-svg').forEach((sv, i) => {
    const ph = hash(i * 3.1 + 0.7) * P;
    $$('.lid', sv).forEach(l => idle(l, t => {
      if (t < 0.6 || t > TOTAL - 0.8) return { sy: 0 };
      const u = (t + ph) % P; return { sy: u < 0.2 ? Math.sin(Math.PI * u / 0.2) : 0 };
    }));
    $$('.legL, .legR', sv).forEach((g, j) => idle(g, t => ({ r: 4 * Math.sin(W2 * 10 * t + j * Math.PI) })));
  });
}
