// 021 art: one-off pieces for «Телефон врёт кассе» — a supermarket in the evening (world: shelves far, checkout hall mid, tiled floor near),
// a metro car and a bus interior for the two jokes, a ticket validator, a cashier's thought bubble, a Pinocchio nose, a ruler, a mask of the
// mascot's face on a stick. Recurring props (talking phone, bank card, terminal, ticket, chip-safe, person, mask, sunglasses) are in tools/props.js.
const AK = '#0a130d';
const sv = (vb, inner) => `<svg viewBox="${vb}" style="overflow:visible;left:0;top:0;width:100%;height:100%">${inner}</svg>`;
const h3 = (k, s) => hash(k * 1.37 + s * 7.11);
const GOODS = ['#ff5f6d', '#ffd34d', '#5fe0ff', '#7ddf5a', '#ff9a4d', '#c58cff', '#ffffff'];

// far layer: shelves full of goods, viewBox 0 0 2400 1000
function shelvesSVG() {
  let s = `<rect x="0" y="0" width="2400" height="1000" fill="#14304a"/>`;
  for (let u = 0; u < 6; u++) {
    const x0 = u * 400 + 20;
    s += `<rect x="${x0}" y="120" width="360" height="860" rx="10" fill="#1d4262" stroke="#0c1c2c" stroke-width="10"/>`;
    for (let r = 0; r < 5; r++) {
      const y = 260 + r * 160;
      s += `<rect x="${x0}" y="${y}" width="360" height="18" fill="#2c5a80"/>`;
      let x = x0 + 14;
      for (let k = 0; x < x0 + 330; k++) {
        const w = 34 + 30 * h3(u * 40 + r * 9 + k, 1), h = 70 + 60 * h3(u * 40 + r * 9 + k, 2), c = GOODS[Math.floor(h3(u * 40 + r * 9 + k, 3) * 7)];
        if (x + w > x0 + 346) break;
        s += `<rect x="${x.toFixed(0)}" y="${(y - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" rx="6" fill="${c}" opacity=".78"/><rect x="${(x + 5).toFixed(0)}" y="${(y - h + 14).toFixed(0)}" width="${(w - 10).toFixed(0)}" height="12" rx="4" fill="#fff" opacity=".35"/>`;
        x += w + 6;
      }
    }
  }
  return sv('0 0 2400 1000', s);
}
// mid layer: the checkout hall, viewBox 0 0 3400 1300 — ceiling lamps, hanging «КАССА» signs, counters
function hallSVG() {
  let s = `<defs><linearGradient id="hc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9eef5"/><stop offset="1" stop-color="#9fb0c4"/></linearGradient>
    <linearGradient id="hl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(255,250,220,.35)"/><stop offset="1" stop-color="rgba(255,250,220,0)"/></linearGradient></defs>`;
  for (let k = 0; k < 9; k++) {
    const x = 80 + k * 400;
    s += `<rect x="${x}" y="40" width="240" height="22" rx="11" fill="#fffbe6" stroke="#0c1c2c" stroke-width="6"/><path d="M${x} 62 L${x - 60} 420 L${x + 300} 420 L${x + 240} 62 Z" fill="url(#hl)"/>`;
  }
  for (let k = 0; k < 5; k++) {
    const x = 160 + k * 700;
    s += `<path d="M${x + 60} 0 L${x + 60} 130 M${x + 220} 0 L${x + 220} 130" stroke="#0c1c2c" stroke-width="6"/>
      <rect x="${x}" y="130" width="280" height="90" rx="18" fill="#ff4d5e" stroke="${AK}" stroke-width="9"/><text x="${x + 140}" y="194" text-anchor="middle" style="font:900 48px Unb" fill="#fff">КАССА ${k + 1}</text>
      <rect x="${x - 40}" y="930" width="420" height="240" rx="20" fill="url(#hc)" stroke="${AK}" stroke-width="10"/><rect x="${x - 40}" y="930" width="420" height="40" rx="14" fill="#3a4a60" stroke="${AK}" stroke-width="8"/>
      <rect x="${x + 280}" y="820" width="70" height="110" rx="10" fill="#2a3346" stroke="${AK}" stroke-width="7"/><rect x="${x + 290}" y="832" width="50" height="40" rx="6" fill="#5fe0ff" opacity=".7"/>`;
  }
  return sv('0 0 3400 1300', s);
}
// near layer: floor tiles in perspective-ish stripes (no svg, CSS) — see #floor in index.html

// metro car interior (joke 1), a full-scene backdrop, viewBox 0 0 1080 1920
function metroSVG() {
  let s = `<defs><linearGradient id="mw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfd8e3"/><stop offset="1" stop-color="#8d9bae"/></linearGradient>
    <linearGradient id="mt" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0b1220"/><stop offset=".5" stop-color="#1c2a40"/><stop offset="1" stop-color="#0b1220"/></linearGradient></defs>
    <rect x="0" y="0" width="1080" height="1920" fill="url(#mw)"/><rect x="0" y="1180" width="1080" height="740" fill="#5a6474"/>
    <rect x="0" y="1180" width="1080" height="14" fill="#3a4250"/>`;
  for (let k = 0; k < 2; k++) s += `<rect x="${60 + k * 540}" y="300" width="420" height="380" rx="40" fill="url(#mt)" stroke="${AK}" stroke-width="12"/>
    <path d="M${100 + k * 540} 360 L${200 + k * 540} 330" stroke="#fff" stroke-width="10" opacity=".25" stroke-linecap="round"/>
    <rect class="mlight${k}" x="${120 + k * 540}" y="460" width="120" height="16" rx="8" fill="#ffd34d" opacity=".7"/>`;
  s += `<rect x="0" y="210" width="1080" height="20" fill="#f4f6f8" stroke="${AK}" stroke-width="6"/>
    <rect x="520" y="200" width="40" height="1000" rx="14" fill="#ffd34d" stroke="${AK}" stroke-width="9"/>
    <rect x="0" y="760" width="1080" height="60" fill="#ff4d5e" opacity=".85"/><text x="540" y="806" text-anchor="middle" style="font:900 40px Unb" fill="#fff" opacity=".9">М · М · М · М · М</text>`;
  return sv('0 0 1080 1920', s);
}
// bus interior (joke 2), full-scene backdrop
function busSVG() {
  let s = `<defs><linearGradient id="bw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe2a8"/><stop offset="1" stop-color="#e3a95a"/></linearGradient>
    <linearGradient id="bs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fe2ff"/><stop offset="1" stop-color="#e8f7ff"/></linearGradient></defs>
    <rect x="0" y="0" width="1080" height="1920" fill="url(#bw)"/><rect x="0" y="1200" width="1080" height="720" fill="#6a5a4a"/>
    <rect x="40" y="250" width="1000" height="420" rx="30" fill="url(#bs)" stroke="${AK}" stroke-width="12"/>
    <g class="bstreet">`;
  for (let k = 0; k < 8; k++) s += `<rect x="${60 + k * 260}" y="${470 - 140 * h3(k, 4)}" width="${120 + 60 * h3(k, 5)}" height="${200 + 140 * h3(k, 4)}" fill="${['#7a9cc6', '#9ab4d6', '#6f8fb8'][k % 3]}" opacity=".8"/>`;
  s += `</g><rect x="40" y="250" width="1000" height="420" rx="30" fill="none" stroke="${AK}" stroke-width="12"/><path d="M540 250 L540 670" stroke="${AK}" stroke-width="12"/>
    <rect x="0" y="180" width="1080" height="24" rx="12" fill="#ff8a3d" stroke="${AK}" stroke-width="7"/>
    <rect x="160" y="190" width="30" height="1010" rx="12" fill="#ffd34d" stroke="${AK}" stroke-width="8"/>`;
  return sv('0 0 1080 1920', s);
}
// ticket validator (компостер), viewBox 0 0 260 420. Rig: .vjaw (the punch, y), .vled (o)
function validatorSVG() {
  return sv('0 0 260 420', `<defs><linearGradient id="vd" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff6b4d"/><stop offset="1" stop-color="#c23a22"/></linearGradient></defs>
    <rect x="110" y="300" width="40" height="120" fill="#8a96a3" stroke="${AK}" stroke-width="8"/>
    <rect x="20" y="20" width="220" height="290" rx="30" fill="url(#vd)" stroke="${AK}" stroke-width="11"/>
    <rect x="50" y="60" width="160" height="22" rx="11" fill="${AK}"/><rect class="vled" x="100" y="110" width="60" height="20" rx="10" fill="#7dff8a" opacity=".3"/>
    <g class="vjaw"><rect x="60" y="150" width="140" height="56" rx="12" fill="#e2e8f0" stroke="${AK}" stroke-width="8"/><path d="M80 206 L80 222 M130 206 L130 222 M180 206 L180 222" stroke="${AK}" stroke-width="10" stroke-linecap="round"/></g>
    <path d="M40 50 L40 270" stroke="#fff" stroke-width="7" opacity=".3" stroke-linecap="round"/>`);
}
// cashier's thought bubble, viewBox 0 0 420 320 (content slot about 70..350 x 50..230)
function bubbleSVG() {
  return sv('0 0 420 320', `<path d="M70 230 Q20 230 24 170 Q10 100 80 80 Q100 20 180 34 Q240 0 300 40 Q380 40 390 110 Q420 170 370 210 Q350 250 290 240 Q230 270 170 244 Q120 260 70 230 Z" fill="#fff" stroke="${AK}" stroke-width="10" stroke-linejoin="round"/>
    <circle cx="120" cy="272" r="20" fill="#fff" stroke="${AK}" stroke-width="8"/><circle cx="90" cy="306" r="11" fill="#fff" stroke="${AK}" stroke-width="7"/>`);
}
// Pinocchio nose, viewBox 0 0 200 60 (grows with sx from the left end)
function noseSVG() {
  return sv('0 0 200 60', `<path d="M6 10 Q120 18 196 30 Q120 42 6 50 Z" fill="#ffb37a" stroke="${AK}" stroke-width="8" stroke-linejoin="round"/><path d="M20 22 Q90 24 150 28" stroke="#fff" stroke-width="5" opacity=".5" fill="none" stroke-linecap="round"/>`);
}
// ruler with a 4 cm mark, viewBox 0 0 520 110
function rulerSVG() {
  let t = ''; for (let k = 0; k <= 50; k++) { const x = 30 + k * 9.2, h = k % 10 === 0 ? 40 : k % 5 === 0 ? 28 : 16; t += `<path d="M${x.toFixed(1)} 14 L${x.toFixed(1)} ${14 + h}" stroke="${AK}" stroke-width="${k % 10 === 0 ? 4 : 2.5}"/>`; }
  for (let k = 0; k <= 5; k++) t += `<text x="${30 + k * 92}" y="88" text-anchor="middle" style="font:800 22px JB" fill="${AK}">${k}</text>`;
  return sv('0 0 520 110', `<rect x="6" y="6" width="508" height="98" rx="12" fill="#ffe9a8" stroke="${AK}" stroke-width="8"/>${t}
    <rect class="rmark" x="30" y="10" width="368" height="90" rx="8" fill="#5fe0ff" opacity=".35"/>`);
}
