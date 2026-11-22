// 038 — one-off art (recurring props live in tools/props.js)
// fishing net falling from a boat line, viewBox 0 0 380 330
function netSVG() {
  let g = ''; for (let k = 0; k <= 8; k++) { g += `<path d="M${20 + k * 42} 20 Q${30 + k * 42} 170 ${10 + k * 44} 320" fill="none" stroke="#e8d9a8" stroke-width="5"/>`; }
  for (let k = 0; k <= 7; k++) { g += `<path d="M10 ${20 + k * 42} Q190 ${40 + k * 42} 370 ${20 + k * 42}" fill="none" stroke="#e8d9a8" stroke-width="5"/>`; }
  return `<svg viewBox="0 0 380 330" style="overflow:visible;left:0;top:0;width:100%;height:100%"><path d="M190 -400 L190 20" stroke="#e8d9a8" stroke-width="6"/>${g}
   <path d="M10 20 Q190 40 370 20" fill="none" stroke="${PIK}" stroke-width="10"/>${[0, 1, 2, 3, 4].map(k => `<circle cx="${30 + k * 80}" cy="${30 - (k % 2) * 4}" r="16" fill="#ff7a3d" stroke="${PIK}" stroke-width="6"/>`).join('')}</svg>`;
}
// world map strip: two coasts, the ocean between, the cable on the sea floor. viewBox 0 0 1080 700. #hpath = cable path (pathLength 100)
function mapSVG() {
  return `<svg viewBox="0 0 1080 700" style="overflow:visible;left:0;top:0;width:100%;height:100%">
  <defs><linearGradient id="hsea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2aa6c8"/><stop offset=".25" stop-color="#0f6a8f"/><stop offset="1" stop-color="#062a40"/></linearGradient>
  <linearGradient id="hland" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ad36a"/><stop offset=".12" stop-color="#3f9c4c"/><stop offset=".14" stop-color="#b08a52"/><stop offset="1" stop-color="#5a4128"/></linearGradient></defs>
  <rect x="180" y="250" width="720" height="450" fill="url(#hsea)" stroke="${PIK}" stroke-width="8"/>
  ${[0, 1, 2, 3, 4, 5].map(k => `<path d="M${200 + k * 120} 262 q30 -16 60 0 t60 0" fill="none" stroke="#bff3ff" stroke-width="6" opacity=".7"/>`).join('')}
  <path d="M180 690 Q540 720 900 690 L900 700 L180 700 Z" fill="#c9a46a"/>
  <path d="M-40 250 L300 250 Q300 400 230 520 Q200 600 180 700 L-40 700 Z" fill="url(#hland)" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M1120 250 L800 250 Q790 420 860 540 Q890 620 900 700 L1120 700 Z" fill="url(#hland)" stroke="${PIK}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M200 430 Q260 620 420 660 Q540 690 660 660 Q820 620 880 430" fill="none" stroke="#0a130d" stroke-width="22" stroke-linecap="round"/>
  <path id="hpath" pathLength="100" d="M200 430 Q260 620 420 660 Q540 690 660 660 Q820 620 880 430" fill="none" stroke="#43f0ff" stroke-width="9" stroke-linecap="round" style="stroke-dasharray:100;stroke-dashoffset:100;filter:drop-shadow(0 0 8px #43f0ff)"/>
  <path d="M130 250 L200 430 M950 250 L880 430" stroke="#0a130d" stroke-width="12" stroke-dasharray="14 10"/>
  </svg>`;
}
// hair vs glass fibre comparison (goes inside the .f-hair panel, 610x250)
function hairHTML() {
  return `<svg viewBox="0 0 610 250" style="left:0;top:0;width:610px;height:250px">
   <path d="M30 80 C150 40 260 120 380 70 S560 60 590 90" fill="none" stroke="#6b3f1f" stroke-width="16" stroke-linecap="round"/>
   <path d="M30 80 C150 40 260 120 380 70 S560 60 590 90" fill="none" stroke="#b5733a" stroke-width="7" stroke-linecap="round"/>
   <path class="fibl" pathLength="100" d="M30 180 L590 180" stroke="#bff8ff" stroke-width="5" stroke-linecap="round" style="filter:drop-shadow(0 0 6px #43f0ff);stroke-dasharray:100;stroke-dashoffset:100"/>
   <text x="34" y="40" style="font:800 30px JB" fill="#ffd34d">ВОЛОС</text><text x="34" y="228" style="font:800 30px JB" fill="#43f0ff">СТЕКЛЯННАЯ НИТЬ</text></svg>`;
}
