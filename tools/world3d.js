// world3d.js for the «Не байт» channel: a real perspective stage on top of engine.js (owner's decision 10.11.2026, 3D pilot).
// Idea: a "diorama". The world is true 3D (ground, extruded boxes, walls, light beams) and the camera really flies through it
// (crane up over a city, dive to a phone on a table, orbit an object), while characters and props stay the channel's 2D
// drawings (mascot.js, props.js) standing in that world as cut-outs that always turn to the camera. Pure CSS 3D transforms:
// deterministic, every frame is a function of t, renders in the same Playwright pipeline. Load after engine.js.
//
// Coordinates: x to the right, y UP (height above the ground), z TOWARD the viewer. Units are stage px at the focus distance.
//
//   const W = world3d('#B .cam', { eyeY: 860, P: 1400 });          // one world per scene, inside the scene (or its .cam)
//   W.sky('linear-gradient(#0b1033,#2a1d6b 60%,#ff8a5c)');          // 2D backdrop, drifts a little with the camera
//   W.ground({ css: 'background:#2b2e47', haze: '#0b1033' });       // big floor plane, dissolves into `haze` far away
//   W.box(x, z, w, d, h, { color:'#5a4fcf', face:W.windows('#5a4fcf') });   // building, table, server rack, shelf
//   W.plane(x, y, z, w, h, { ry:90, css:'background:#fff' });       // any flat quad: wall, screen, poster, road sign
//   const m = W.card(mascotSVG('m1'), x, y, z, 340, 340);           // 2D cut-out, bottom-centre at (x,y,z), faces the camera
//   tw(m, t, .4, { r:[0,-8] });                                     // the returned element takes normal tw()/idle() (in its own plane)
//   W.move(m, t, .8, { x: 300, z: -400 });                          // walk / fly in the world;  W.jump(m, t, 140)
//   const b = W.beam([x0,y0,z0], [x1,y1,z1], '#7df9ff', 14);  W.grow(b, t, .5);   // signal, laser, wire, trajectory
//   W.cam(0, 0, { x:0, y:200, z:0, dist:1400, pitch:10, yaw:0 });   // camera looks AT (x,y,z) from `dist`, pitch>0 = from above
//   W.cam(t, 1.2, { y:900, dist:3200, pitch:38, yaw:-25 });         // fly: only the listed fields change, eased (inOut)
//   W.drift(1.2);                                                   // loop-safe handheld float (degrees), no dead frames
//
// Rules: never put opacity / filter / blur / overflow / clip-path on the world or on a box (it flattens the 3D): fade and blur
// only cards (the element W.card returns) or the whole scene. Scene transitions (tZoom, tWhip, morphCut...) work as usual
// because they act on the scene. Captions, chips, big numbers and the stamp stay 2D on top, as in every other video.
function world3d(par, o = {}) {
  const P = o.P || 1400, eyeY = o.eyeY || 860, host = typeof par === 'string' ? $(par) : par;
  const css = (el, s) => { el.style.cssText += ';' + s; return el; };
  const mkd = (p, s, html) => { const d = document.createElement('div'); d.style.cssText = 'position:absolute;transform-style:preserve-3d;' + s; if (html != null) d.innerHTML = html; p.appendChild(d); return d; };
  const stage = mkd(host, `left:0;top:0;width:1080px;height:1920px;transform-style:flat;perspective:${P}px;perspective-origin:540px ${eyeY}px`);
  stage.className = 'w3';
  const skyEl = mkd(stage, 'left:-600px;top:-200px;width:2280px;height:2320px;transform-style:flat');
  const world = mkd(stage, `left:540px;top:${eyeY}px;width:0;height:0`);
  world.className = 'w3w';
  const num = v => +v.toFixed(3);
  const W = { stage, world, P, cards: [], camKeys: [], init: { x: 0, y: 0, z: 0, dist: P, pitch: 8, yaw: 0, roll: 0 }, driftAmp: 0, state: null };
  const ease = (n, p) => (E[n] || E.inOut)(Math.max(0, Math.min(1, p)));
  // sequential keyframes: each key starts from wherever the previous ones left the value
  const run = (keys, init, t) => {
    const cur = Object.assign({}, init);
    for (const k of keys) {
      if (t < k.t) break;
      const p = k.d > 0 ? ease(k.ease, (t - k.t) / k.d) : 1;
      for (const f in k.to) { const a = k.from && f in k.from ? k.from[f] : cur[f]; cur[f] = a + (k.to[f] - a) * p; }
    }
    return cur;
  };
  const addKey = (list, t, d, to, e) => { list.push({ t, d, to, ease: e }); list.sort((a, b) => a.t - b.t); };

  W.sky = (bg) => { css(skyEl, 'background:' + bg); return skyEl; };
  W.cam = (t, d, to, e = 'inOut') => { if (t <= 0 && d <= 0) Object.assign(W.init, to); else addKey(W.camKeys, t, d, to, e); };
  W.drift = (amp = 1) => { W.driftAmp = amp; };

  W.ground = (g = {}) => {   // g.haze: colour the floor dissolves into far away (match the bottom of the sky)
    const s = g.size || 7000, hz = g.haze === false ? '' : `radial-gradient(closest-side,transparent ${g.solid || 40}%,${g.haze || '#0b1033'} 96%),`;
    const bg = (g.css || 'background:#2b2e47').replace(/^background:/, '');
    return mkd(world, `left:${-s / 2}px;top:${-s / 2}px;width:${s}px;height:${s}px;transform:rotateX(90deg);transform-style:flat;background:${hz}${bg}`);
  };
  // flat quad centred at (x,y,z); ry/rx/rz in degrees (ry:90 = a side wall, rx:90 = lies flat)
  W.plane = (x, y, z, w, h, q = {}) => mkd(world, `left:${-w / 2}px;top:${-h / 2}px;width:${w}px;height:${h}px;transform:translate3d(${x}px,${-y}px,${z}px) rotateY(${q.ry || 0}deg) rotateX(${q.rx || 0}deg) rotateZ(${q.rz || 0}deg);transform-style:flat;${q.css || ''}`, q.html);
  // window pattern for building faces
  W.windows = (wall, lit = '#ffdd78', cw = 74, ch = 78) => {   // pre-drawn tile (much faster to raster than stacked gradients)
    const cv = document.createElement('canvas'); cv.width = cw; cv.height = ch; const g = cv.getContext('2d');
    g.fillStyle = wall; g.fillRect(0, 0, cw, ch); g.fillStyle = lit; g.fillRect(cw * .3, ch * .44, cw * .4, ch * .56);
    return `background:url(${cv.toDataURL()}) 0 0/${cw}px ${ch}px`;
  };
  // extruded box standing on the ground (or lifted by q.y): front/back/left/right/top faces with simple directional shading
  W.box = (x, z, w, d, h, q = {}) => {
    const col = q.color || '#5a4fcf', ink = q.ink == null ? 6 : q.ink, face = (q.face || `background:${col}`).replace(/^background:/, ''), y = q.y || 0;
    const shade = br => br >= 1 ? `linear-gradient(rgba(255,255,255,${num(br - 1)}),rgba(255,255,255,${num(br - 1)}))` : `linear-gradient(rgba(6,8,30,${num(1 - br)}),rgba(6,8,30,${num(1 - br)}))`;
    const g = mkd(world, `left:0;top:0;transform:translate3d(${x}px,${-y}px,${z}px) rotateY(${q.ry || 0}deg)`);
    const f = (fw, fh, tr, br, extra = '') => mkd(g, `left:${-fw / 2}px;top:${-fh}px;width:${fw}px;height:${fh}px;transform-style:flat;backface-visibility:hidden;box-sizing:border-box;border:${ink}px solid #0a130d;background:${shade(br)},${face};transform:${tr};${extra}`);
    g.front = f(w, h, `translateZ(${d / 2}px)`, 1); if (q.front) g.front.innerHTML = q.front;
    g.back = f(w, h, `rotateY(180deg) translateZ(${d / 2}px)`, .55);
    g.right = f(d, h, `rotateY(90deg) translateZ(${w / 2}px)`, .68);
    g.left = f(d, h, `rotateY(-90deg) translateZ(${w / 2}px)`, .5);
    g.top = mkd(g, `left:${-w / 2}px;top:${-d / 2}px;width:${w}px;height:${d}px;transform-style:flat;backface-visibility:hidden;box-sizing:border-box;border:${ink}px solid #0a130d;background:${shade(1.22)},${q.top || col};transform:translateY(${-h}px) rotateX(90deg)`);
    if (q.shadow === true && !y) mkd(world, `left:${-w * .85}px;top:${-d * .85}px;width:${w * 1.7}px;height:${d * 1.7}px;transform:translate3d(${x}px,-1px,${z}px) rotateX(90deg);transform-style:flat;background:radial-gradient(closest-side,rgba(0,0,0,.5) 55%,rgba(0,0,0,0))`);
    return g;
  };
  // 2D cut-out standing in the world. Bottom-centre at (x,y,z). q.face: 'cam' (default, turns to the camera) or 'fixed' (keeps q.ry).
  // q.tilt (0..1): how much it leans back with the camera pitch, so a top view does not flatten it (default .6).
  W.card = (html, x, y, z, w, h, q = {}) => {
    const wrap = mkd(world, 'left:0;top:0');
    const inner = mkd(wrap, `left:${-w / 2}px;top:${-h}px;width:${w}px;height:${h}px;transform-origin:50% 100%;transform-style:flat`, html);
    if (q.cls) inner.className = q.cls;
    let sh = null;
    if (q.shadow !== false) sh = mkd(world, `left:${-w * .42}px;top:${-w * .2}px;width:${w * .84}px;height:${w * .4}px;transform-style:flat;border-radius:50%;background:radial-gradient(closest-side,rgba(0,0,0,.55),rgba(0,0,0,0))`);
    const c = { wrap, inner, sh, init: { x, y, z }, keys: [], face: q.face || 'cam', ry: q.ry || 0, tilt: q.tilt == null ? .6 : q.tilt };
    inner._w3 = c; W.cards.push(c); return inner;
  };
  W.move = (el, t, d, to, e = 'inOut') => { const c = el._w3; if (t <= 0 && d <= 0) Object.assign(c.init, to); else addKey(c.keys, t, d, to, e); };
  // jump with anticipation and squash; the shadow shrinks by itself
  W.jump = (el, t, hgt = 140, d = 0.5) => {
    const c = el._w3; c.keys.push({ t, d: d / 2, to: { y: hgt }, rel: true, ease: 'out' }, { t: t + d / 2, d: d / 2, to: { y: -hgt }, rel: true, ease: 'in' }); c.keys.sort((a, b) => a.t - b.t);
    tw(el, t - 0.12, 0.12, { sy: [1, 0.86], sx: [1, 1.08] }, 'out'); tw(el, t, d / 2, { sy: [0.86, 1.08], sx: [1.08, 0.95] }, 'out');
    tw(el, t + d / 2, d / 2, { sy: [1.08, 1], sx: [0.95, 1] }, 'in'); tw(el, t + d, 0.08, { sy: [1, 0.88], sx: [1, 1.1] }, 'out'); tw(el, t + d + 0.08, 0.3, { sy: [0.88, 1], sx: [1.1, 1] }, 'back');
  };
  // glowing line between two world points (two crossed planes, visible from any side). W.grow(beam, t, d) draws it on.
  W.beam = (a, b, color = '#7df9ff', th = 14) => {
    const dx = b[0] - a[0], dy = -(b[1] - a[1]), dz = b[2] - a[2], len = Math.hypot(dx, dy, dz);
    const yaw = Math.atan2(-dz, dx) * 180 / Math.PI, pit = Math.atan2(dy, Math.hypot(dx, dz)) * 180 / Math.PI;
    const g = mkd(world, `left:0;top:0;transform:translate3d(${a[0]}px,${-a[1]}px,${a[2]}px) rotateY(${yaw}deg) rotateZ(${pit}deg)`);
    const sc = mkd(g, 'left:0;top:0;transform-origin:0 0');
    for (const r of [0, 90]) mkd(sc, `left:0;top:${-th / 2}px;width:${len}px;height:${th}px;transform-style:flat;border-radius:${th}px;background:${color};box-shadow:0 0 ${th * 2.5}px ${th * .8}px ${color};transform-origin:0 50%;transform:rotateX(${r}deg)`);
    g._sc = sc; g._grow = null; return g;
  };
  W.grow = (beam, t, d = 0.5, e = 'out') => { beam._grow = { t, d, e }; beam._sc.style.transform = 'scaleX(0)'; (W.beams = W.beams || []).push(beam); };
  // ready-made city on a street grid: blocks of buildings with lit windows, roads along x=0 and z=0 stay free
  W.city = (c = {}) => {
    const n = c.n || 3, step = c.step || 620, cols = c.colors || ['#5a4fcf', '#3f7bd8', '#c2507a', '#2f9c8f', '#7a55c9', '#d0703c'], seed = c.seed || 1, out = [];
    let k = 0;
    for (let gx = -n; gx <= n; gx++) for (let gz = -n - 1; gz <= (c.front || 0); gz++) {
      if (gx === 0 || gz === 0) continue;
      if (c.clear && Math.abs(gx) <= c.clear && gz > -c.clear) continue;
      k++; const hh = (c.hMin || 240) + hash(k * 1.7 + seed) * ((c.hMax || 900) - (c.hMin || 240)), col = cols[Math.floor(hash(k * 3.1 + seed) * cols.length)], sz = (c.size || 320) * (0.8 + 0.4 * hash(k + seed * 5));
      out.push(W.box(gx * step - Math.sign(gx) * 60, gz * step - 200, sz, sz, hh, { color: col, face: W.windows(col, c.lit || '#ffdd78') }));
    }
    return out;
  };

  custom(t => {
    const s = run(W.camKeys, W.init, t);
    if (W.driftAmp) { s.yaw += W.driftAmp * Math.sin(W2 * 5 * t); s.pitch += W.driftAmp * 0.6 * Math.cos(W2 * 7 * t); s.roll += W.driftAmp * 0.25 * Math.sin(W2 * 3 * t); }
    W.state = s;
    world.style.transform = `translateZ(${num(P - s.dist)}px) rotateZ(${num(s.roll)}deg) rotateX(${num(-s.pitch)}deg) rotateY(${num(-s.yaw)}deg) translate3d(${num(-s.x)}px,${num(s.y)}px,${num(-s.z)}px)`;
    skyEl.style.transform = `translate(${num(-s.yaw * 9)}px,${num(s.pitch * 7)}px)`;
    for (const c of W.cards) {
      const p = Object.assign({}, c.init);
      for (const k of c.keys) { if (t < k.t) break; const e = k.d > 0 ? ease(k.ease, (t - k.t) / k.d) : 1; for (const f in k.to) p[f] = k.rel ? p[f] + k.to[f] * e : p[f] + (k.to[f] - p[f]) * e; }
      const ry = c.face === 'cam' ? s.yaw : c.ry, rx = c.face === 'cam' ? s.pitch * c.tilt : 0;
      c.wrap.style.transform = `translate3d(${num(p.x)}px,${num(-p.y)}px,${num(p.z)}px) rotateY(${num(ry)}deg) rotateX(${num(rx)}deg)`;
      if (c.sh) { const k = Math.max(0.35, 1 - p.y / 900); c.sh.style.transform = `translate3d(${num(p.x)}px,-2px,${num(p.z)}px) rotateX(90deg) scale(${num(k)})`; c.sh.style.opacity = num(Math.max(0, 1 - p.y / 1400)); }
    }
    for (const b of (W.beams || [])) { const g = b._grow, p = g.d > 0 ? ease(g.e, (t - g.t) / g.d) : 1; b._sc.style.transform = `scaleX(${t < g.t ? 0 : num(p)})`; }
  });
  return W;
}
