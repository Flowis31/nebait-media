// engine.js for the «Не байт» channel = engine.js from the shorts-maker skill + smooth motion (owner's request, 15.10.2026):
//  * new easings: expo, quart, glide (soft ~3.5% settle), spring (~7.5%), spring2 (~10%), wobble (~16%), sine;
//  * SMOOTH mode (on by default, window.SMOOTH=false turns it off): every tween with ease out/out5/back/back2/elastic is
//    re-eased to glide/expo/spring/spring2/wobble and lengthened x1.6 (at most +0.4 s), but never past the start of the next tween
//    on the same element and property, so chained moves stay continuous. Objects glide to a stop instead of halting.
//  * slideIn(sel, t, from, d) for panels/cards, default .panel / .chip styles, softer caption pop.
// Deterministic timeline: every frame is a pure function of t (no CSS animations, no rAF, no Math.random).
const TOTAL = TIMING.total, W2 = 2 * Math.PI / TOTAL;   // use W2*k*t (integer k) for idle motion -> seamless loop
const E = {
  lin: x => x, out: x => 1 - Math.pow(1 - x, 3), out5: x => 1 - Math.pow(1 - x, 5), in: x => x * x * x,
  inOut: x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
  back: x => 1 + 2.70158 * Math.pow(x - 1, 3) + 1.70158 * Math.pow(x - 1, 2),
  back2: x => 1 + 4.2 * Math.pow(x - 1, 3) + 3.2 * Math.pow(x - 1, 2),
  elastic: x => x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -9 * x) * Math.sin((x * 9 - 0.75) * (2 * Math.PI) / 3) + 1,
};
Object.assign(E, {
  expo: x => x >= 1 ? 1 : (1 - Math.pow(2, -10 * x)) / (1 - Math.pow(2, -10)),
  quart: x => 1 - Math.pow(1 - x, 4),
  glide: x => x >= 1 ? 1 : 1 - Math.exp(-6 * x) * Math.cos(1.5 * Math.PI * x),     // fast start, long soft stop, ~3% settle
  spring: x => x >= 1 ? 1 : 1 - Math.exp(-7.5 * x) * Math.cos(2.5 * Math.PI * x),  // ~7.5% overshoot, one soft settle
  spring2: x => x >= 1 ? 1 : 1 - Math.exp(-6.5 * x) * Math.cos(2.5 * Math.PI * x),  // ~10% overshoot
  wobble: x => x >= 1 ? 1 : 1 - Math.exp(-7 * x) * Math.cos(3.5 * Math.PI * x),   // ~16%, two settles
  sine: x => -(Math.cos(Math.PI * x) - 1) / 2,
});
const SMOOTH_MAP = { out: 'glide', out5: 'expo', back: 'spring', back2: 'spring2', elastic: 'wobble' };
function smoothen() {
  if (window.SMOOTH === false) return;
  const by = new Map();
  tweens.forEach(w => { const a = by.get(w.el) || []; a.push(w); by.set(w.el, a); });
  by.forEach(list => {
    list.sort((a, b) => a.t0 - b.t0 || a.n - b.n);
    list.forEach((w, i) => {
      const to = SMOOTH_MAP[w.ease]; if (!to) return;
      const keys = Object.keys(w.props); let gap = Infinity;
      for (let j = i + 1; j < list.length; j++) if (keys.some(k => k in list[j].props)) { gap = list[j].t0 - w.t0; break; }
      w.ease = to;
      if (w.dur > 0.02) w.dur = Math.max(w.dur, Math.min(w.dur * 1.6, w.dur + 0.4, gap));
    });
  });
}
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const els = sel => typeof sel === 'string' ? $$(sel) : Array.isArray(sel) ? sel : [sel];
const tweens = [], idles = [], customs = [], scenes = [], shakes = [], SFX = [];
let seq = 0, sorted = null;
// tw(sel, start, dur, {prop:[from,to]}, ease). Props: x y r s sx sy o blur clip dash. Before its first tween an element shows that tween's "from".
function tw(sel, t0, dur, props, ease = 'out') {
  const l = els(sel); if (!l.length) console.warn('tw: nothing matches', sel);
  l.forEach(el => tweens.push({ el, t0, dur, props, ease, n: seq++ }));
}
function idle(sel, fn) { els(sel).forEach(el => idles.push({ el, fn })); }   // fn(t) -> {x,y,r} added, {s} multiplied
function custom(fn) { customs.push(fn); }                                    // fn(t): anything else (counters, text)
function scene(sel, tIn, tOut) { scenes.push({ el: $(sel), tIn, tOut }); }   // display:none outside [tIn,tOut)
function sceneCuts(ids, cuts) { ids.forEach((id, i) => scene(id, i ? cuts[i] - 0.4 : 0, i < ids.length - 1 ? cuts[i + 1] + 0.5 : TOTAL + 1)); }
function sfx(name, t, gain = 1) { SFX.push({ name, t: +t.toFixed(3), gain }); }
function shake(t, dur = 0.3, amp = 22) { shakes.push({ t, dur, amp }); }
function hash(n) { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }  // seeded pseudo-random

const LN = {}, WD = {};
TIMING.lines.forEach(l => LN[l.key] = l); TIMING.words.forEach(w => (WD[w.line] = WD[w.line] || []).push(w));
const L = k => LN[k], wt = (k, i) => WD[k][i].t0, we = (k, i) => WD[k][i].t1;   // line; word start; word end

function punch(sel, t, amt = 0.14, d = 0.32) { tw(sel, t - 0.03, 0.09, { s: [1, 1 + amt] }, 'out'); tw(sel, t + 0.06, d, { s: [1 + amt, 1] }, 'back'); }
function popIn(sel, t, d = 0.34, from = 0.3) { tw(sel, t, d, { s: [from, 1], o: [0, 1] }, 'back'); }
// slideIn: panels and cards travel in and glide to a stop. from: left | right | up | down
function slideIn(sel, t, from = 'left', d = 0.7, dist = 220) {
  const dx = from === 'left' ? -dist : from === 'right' ? dist : 0, dy = from === 'up' ? -dist : from === 'down' ? dist : 0;
  tw(sel, t, d, { x: [dx, 0], y: [dy, 0], o: [0, 1] }, 'expo');
}
function slideOut(sel, t, to = 'left', d = 0.35, dist = 220) {
  const dx = to === 'left' ? -dist : to === 'right' ? dist : 0, dy = to === 'up' ? -dist : to === 'down' ? dist : 0;
  tw(sel, t, d, { x: [0, dx], y: [0, dy], o: [1, 0] }, 'in');
}
document.head.insertAdjacentHTML('beforeend', `<style>
.panel{background:linear-gradient(180deg,rgba(22,44,30,.92),rgba(10,22,15,.92));border:3px solid rgba(184,255,61,.28);border-left:12px solid var(--acc);border-radius:30px;box-shadow:0 26px 60px rgba(0,0,0,.5),inset 0 2px 0 rgba(255,255,255,.08)}
.panel.red{border-left-color:var(--red);border-color:rgba(255,59,92,.3)}
.chip{background:rgba(10,22,15,.88);border:3px solid rgba(184,255,61,.35);border-radius:999px;box-shadow:0 14px 34px rgba(0,0,0,.45)}
</style>`);
function hide(sel) { tw(sel, 0, 0.001, { o: [0, 0] }); }
function stamp(sel, t, rot = -9, amp = 26) { tw(sel, t, 0.15, { s: [3.2, 1], o: [0, 1], r: [rot - 17, rot] }, 'in'); shake(t + 0.15, 0.32, amp); sfx('slam', t + 0.13, 1.1); }

const SETTERS = {
  clip: (el, v) => { el.style.clipPath = `circle(${v}px at ${el.dataset.cx || 540}px ${el.dataset.cy || 960}px)`; },
  dash: (el, v) => { el.style.strokeDashoffset = v; },   // draw-on line: pathLength="100" + stroke-dasharray:100, tween dash 100 -> 0
};
function seek(t) {
  if (!sorted) { smoothen(); sorted = tweens.slice().sort((a, b) => a.t0 - b.t0 || a.n - b.n); }
  for (const sc of scenes) sc.el.style.display = (t >= sc.tIn && t < sc.tOut) ? 'block' : 'none';
  const st = new Map();
  for (const w of sorted) {
    let s = st.get(w.el); if (!s) { s = {}; st.set(w.el, s); }
    for (const k in w.props) {
      const [a, b] = w.props[k];
      if (t >= w.t0) { const p = w.dur > 0 ? Math.min(1, (t - w.t0) / w.dur) : 1; s[k] = a + (b - a) * E[w.ease](p); }
      else if (!(k in s)) s[k] = a;
    }
  }
  for (const id of idles) {
    let s = st.get(id.el); if (!s) { s = {}; st.set(id.el, s); }
    const add = id.fn(t);
    for (const k in add) { if (k === 's') s.s = (s.s ?? 1) * add.s; else s[k] = (s[k] ?? 0) + add[k]; }
  }
  let shx = 0, shy = 0;
  for (const sh of shakes) if (t >= sh.t && t < sh.t + sh.dur) {
    const p = (t - sh.t) / sh.dur, a = sh.amp * Math.pow(1 - p, 2), f = Math.floor((t - sh.t) * 60);
    shx += (hash(f * 2.1 + sh.t) - .5) * 2 * a; shy += (hash(f * 3.7 + sh.t + 9) - .5) * 2 * a;
  }
  $('#shake').style.transform = `translate(${shx.toFixed(2)}px,${shy.toFixed(2)}px)`;
  st.forEach((s, el) => {
    if ('x' in s || 'y' in s || 'r' in s || 's' in s || 'sx' in s || 'sy' in s) {
      const sc = s.s ?? 1;
      el.style.transform = `translate(${(s.x ?? 0).toFixed(2)}px,${(s.y ?? 0).toFixed(2)}px) rotate(${(s.r ?? 0).toFixed(3)}deg) scale(${((s.sx ?? 1) * sc).toFixed(4)},${((s.sy ?? 1) * sc).toFixed(4)})`;
    }
    if ('o' in s) el.style.opacity = Math.max(0, Math.min(1, s.o)).toFixed(3);
    if ('blur' in s) el.style.filter = s.blur > 0.05 ? `blur(${s.blur.toFixed(2)}px)` : 'none';
    for (const k in SETTERS) if (k in s) SETTERS[k](el, s[k]);
  });
  for (const f of customs) f(t);
}

// ---------- transitions: a = outgoing scene, b = incoming scene (must come later in the DOM), t = cut centre ----------
function tZoom(a, b, t, d = 0.5) {
  tw(a, t - d / 2, d * .7, { s: [1, 1.9], o: [1, 0], blur: [0, 14] }, 'in'); tw(b, t - d * .15, d * .65, { s: [0.62, 1], o: [0, 1] }, 'out5'); sfx('whoosh', t - d / 2, 1);
}
function tSlideUp(a, b, t, d = 0.55) {
  tw(a, t - d / 2, d * .8, { y: [0, -520], o: [1, 0], s: [1, .9] }, 'inOut'); tw(b, t - d / 2, d, { y: [1500, 0] }, 'out5'); sfx('whoosh', t - d / 2, .9);
}
function tWhip(a, b, t, d = 0.46, dir = 1) {
  tw(a, t - d / 2, d * .6, { x: [0, -1200 * dir], blur: [0, 10] }, 'in'); tw(b, t - d * .12, d * .62, { x: [1200 * dir, 0], blur: [10, 0] }, 'out5'); sfx('whoosh', t - d / 2, 1.1);
}
function tCircle(a, b, t, cx = 540, cy = 760, d = 0.6) {   // scenes have no background of their own, so the old one has to fade
  $(b).dataset.cx = cx; $(b).dataset.cy = cy;
  tw(b, t - d / 2, d, { clip: [0, 2300] }, 'inOut'); tw(a, t - d / 2, d * .62, { s: [1, .9], o: [1, 0] }, 'inOut'); sfx('whoosh', t - d / 2, .8);
}
function tDrop(a, b, t, d = 0.5) {
  tw(a, t - d / 2, d * .7, { y: [0, 700], o: [1, 0], r: [0, 4] }, 'in'); tw(b, t - d * .25, d * .75, { y: [-1500, 0] }, 'out5'); sfx('whoosh', t - d / 2, .9);
}
// Seamless loop: `clone` is a frozen copy of scene A's frame-0 pose that fades in over the last scene, then zooms to A's starting scale.
// Scene A must begin with tw('#A', 0, .5, {s:[zoom,1]}, 'out5'); anything that is also in the last scene (mascot) is hidden once the clone is opaque.
function loopTo(clone, t, zoom = 1.13) {
  scene(clone, t - 0.05, TOTAL + 1); tw(clone, t, 0.4, { o: [0, 1] }, 'lin'); tw(clone, TOTAL - 0.42, 0.42, { s: [1, zoom] }, 'in'); sfx('riser2', TOTAL - 0.75, .8);
}

// ---------- animated background (cheap: gradients on promoted layers, never filter:blur) ----------
custom(t => {
  const g = $('#grid'), b1 = $('#blob1'), b2 = $('#blob2');
  if (g) g.style.transform = `translateY(${((t / TOTAL) * 44 * 9) % 44}px)`;
  if (b1) b1.style.transform = `translate(${Math.sin(W2 * 2 * t) * 160}px,${Math.cos(W2 * 3 * t) * 200}px)`;
  if (b2) b2.style.transform = `translate(${Math.cos(W2 * 2 * t) * -180}px,${Math.sin(W2 * 3 * t) * 160}px)`;
});

// ---------- captions: 1-3 words at a time, the spoken word lit. chunks = {lineKey:[sizes]} overrides the automatic split ----------
function captions(chunksBy = {}, skip = []) {
  const bare = s => s.replace(/[^\p{L}\p{N}]/gu, ''), punct = s => /[.,!?:;…—]$/.test(s), MAXC = 17;
  const auto = ws => {            // short words (<=2 letters) glue to the next word; a chunk holds <=2 full words and <=MAXC chars
    const units = []; let pre = [];
    ws.forEach((w, i) => { pre.push(w); if (bare(w.d).length > 2 || punct(w.d) || i === ws.length - 1) { units.push(pre); pre = []; } });
    const out = []; let n = 0, full = 0, chars = 0, closed = true;
    units.forEach(u => {
      const c = u.reduce((a, w) => a + w.d.length + 1, 0);
      if (closed || full >= 2 || chars + c > MAXC) { if (n) out.push(n); n = 0; full = 0; chars = 0; }
      n += u.length; full++; chars += c; closed = punct(u[u.length - 1].d);
    });
    if (n) out.push(n); return out;
  };
  const chunks = [];
  TIMING.lines.forEach(l => {
    if (skip.includes(l.key)) return;
    const ws = WD[l.key], sizes = chunksBy[l.key] || auto(ws); let i = 0;
    if (sizes.reduce((a, b) => a + b, 0) !== ws.length) console.warn('caption sizes do not add up for', l.key);
    sizes.forEach(n => { const part = ws.slice(i, i + n); i += n; chunks.push({ ws: part, t0: part[0].t0, t1: part[part.length - 1].t1 }); });
  });
  chunks.forEach((c, i) => {
    const nx = chunks[i + 1];
    c.show = c.t0 - 0.05; c.hide = nx && nx.t0 - c.t1 < 0.55 ? nx.t0 - 0.05 : c.t1 + 0.3;
    c.el = document.createElement('div'); c.el.className = 'chunk';
    c.spans = c.ws.map(w => { const s = document.createElement('span'); s.textContent = w.d.replace(/[.,:;]+$/, ''); c.el.appendChild(s); return s; });
    $('#cap').appendChild(c.el);
  });
  custom(t => {
    for (const c of chunks) {
      const on = t >= c.show && t < c.hide; c.el.style.display = on ? 'block' : 'none'; if (!on) continue;
      const p = Math.min(1, (t - c.show) / 0.24);
      c.el.style.transform = `scale(${(0.78 + 0.22 * E.spring(p)).toFixed(4)})`; c.el.style.opacity = Math.min(1, p * 3).toFixed(3);
      let cur = 0; c.ws.forEach((w, i) => { if (t >= w.t0 - 0.04) cur = i; });
      c.spans.forEach((s, i) => s.classList.toggle('on', i === cur));
    }
  });
}

// boot(build, {chunks, noCaption}): wait for fonts (layout is measured in build), build the timeline, expose seek() to the renderer
async function boot(build, opt = {}) {
  await Promise.all(['900 20px Unb', 'italic 700 20px PF', '900 20px PF', '700 20px JB', '900 20px Mont', '800 20px Mont'].map(f => document.fonts.load(f, 'Aaбв')));
  build(); captions(opt.chunks, opt.noCaption);
  window.SFX = SFX; window.TOTAL = TOTAL; window.seek = seek; seek(0); window.READY = true;
}
