"""voice.wav + voice.json + sfx.json -> mix.wav (48 kHz stereo) for the «Не байт» channel.

Drop-in replacement for audio.py from the shorts-maker skill: same inputs, same sound effects, same voice chain, but a different
music bed. The skill's beat (square-wave cowbell melody in a phrygian-like minor, 7.5 kHz hats) was rejected by the channel owner on
15.10.2026 as "странная и режет ухо". This one is major-key, built from soft timbres (FM electric piano, plucked harmonics, marimba,
filtered pad), with no square waves and nothing bright above ~8 kHz.

Usage (in the build folder, next to voice.json / voice.wav / sfx.json):
    python3 audio.py                 # default style
    python3 audio.py --style tech    # pop | lofi | tech
    python3 audio.py --music-only    # also writes music.wav (no voice, no effects) for listening checks
Bars fit TOTAL exactly and the 4-bar chord cycle is aligned to the end, so the track loops with the video on a clean chord change."""
import json, sys, functools, numpy as np
from scipy.io import wavfile
from scipy import signal

DEFAULT_STYLE = 'pop'
MUSIC_BELOW_VOICE_LU = 17.0     # ducked music sits this many LU under the voice (old skill beat: ~16.3)

args = sys.argv[1:]
STYLE = args[args.index('--style') + 1] if '--style' in args else DEFAULT_STYLE
SR = 48000; TOTAL = json.load(open('voice.json'))['total']; N = int(round(TOTAL * SR)); rng = np.random.default_rng(7)
tt = lambda d: np.arange(int(d * SR)) / SR
bp = lambda x, lo, hi, o=2: signal.sosfilt(signal.butter(o, [lo, hi], btype='band', fs=SR, output='sos'), x)
lp = lambda x, f, o=2: signal.sosfilt(signal.butter(o, f, btype='low', fs=SR, output='sos'), x)
hp = lambda x, f, o=2: signal.sosfilt(signal.butter(o, f, btype='high', fs=SR, output='sos'), x)
noise = lambda t: rng.standard_normal(len(t))
hz = lambda m: 440.0 * 2 ** ((m - 69) / 12)
def fade(x, a=0.003, r=0.01):
    x = x.copy(); na, nr = int(a * SR), int(r * SR)
    if na: x[:na] *= np.linspace(0, 1, na)
    if nr: x[-nr:] *= np.linspace(1, 0, nr)
    return x
def sweep(f0, f1, d, curve=1.0):
    t = tt(d); return np.sin(2 * np.pi * np.cumsum(f0 + (f1 - f0) * (t / d) ** curve) / SR)
sq = lambda f, d: np.sign(np.sin(2 * np.pi * f * tt(d)))
class Mix:
    def __init__(s): s.b = np.zeros((N + 2 * SR, 2))
    def add(s, x, t, gain=1.0, pan=0.0):
        i = max(0, int(round(t * SR))); n = min(len(x), len(s.b) - i)
        if n > 0:
            s.b[i:i + n, 0] += x[:n] * gain * np.cos((pan + 1) * np.pi / 4) * 1.414; s.b[i:i + n, 1] += x[:n] * gain * np.sin((pan + 1) * np.pi / 4) * 1.414
    def out(s): return s.b[:N].copy()
def klufs(x):
    """Ungated BS.1770 K-weighted loudness (48 kHz coefficients)."""
    if x.ndim == 1: x = np.stack([x, x], 1)
    y = signal.lfilter([1.53512485958697, -2.69169618940638, 1.19839281085285], [1, -1.69065929318241, 0.73248077421585], x, axis=0)
    y = signal.lfilter([1, -2, 1], [1, -1.99004745483398, 0.99007225036621], y, axis=0)
    return -0.691 + 10 * np.log10(np.sum(np.mean(y ** 2, axis=0)) + 1e-12)

# ---------- instruments: soft, harmonic timbres only ----------
@functools.lru_cache(None)
def ep(m, d, det=0.0):
    """FM electric piano: bright-ish attack that mellows, long decay."""
    f = hz(m) * 2 ** (det / 1200); t = tt(d); idx = 1.6 * np.exp(-t / 0.18) + 0.6
    x = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * f * t)) + 0.1 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t / 0.35) + 0.07 * np.sin(2 * np.pi * 8 * f * t) * np.exp(-t / 0.04)
    env = np.exp(-t / 1.3) * (1 - np.exp(-t / 0.004))
    return fade(lp(x * env, 6000), 0.002, min(0.12, d / 3))
@functools.lru_cache(None)
def pluck(m, d=0.7):
    """Plucked string from decaying harmonics (upper ones die faster), exactly in tune."""
    f = hz(m); t = tt(d); x = np.zeros(len(t)); ph = np.random.default_rng(int(m)).uniform(0, 2 * np.pi, 17)
    for k in range(1, 17):
        if f * k > 9000: break
        x += k ** -1.1 * np.sin(2 * np.pi * f * k * t + ph[k]) * np.exp(-t / (0.6 / (1 + 0.5 * (k - 1))))
    return fade(x * (1 - np.exp(-t / 0.0015)) * 0.55, 0.001, 0.06)
@functools.lru_cache(None)
def mallet(m, d=0.8):
    """Marimba: fundamental plus the 4x and 10x partials, short wooden knock."""
    f = hz(m); t = tt(d)
    x = np.sin(2 * np.pi * f * t) * np.exp(-t / 0.38) + 0.25 * np.sin(2 * np.pi * 4 * f * t) * np.exp(-t / 0.06) + 0.08 * np.sin(2 * np.pi * 10 * f * t) * np.exp(-t / 0.018)
    knock = lp(np.random.default_rng(int(m) + 99).standard_normal(len(t)), 1800) * np.exp(-t / 0.006) * 0.08
    return fade((x + knock) * (1 - np.exp(-t / 0.0012)) * 0.6, 0.001, 0.06)
@functools.lru_cache(None)
def pad(chord, d):
    """Detuned saws through a 4-pole low-pass at 1.1 kHz, slow swell."""
    t = tt(d); x = np.zeros(len(t)); r = np.random.default_rng(sum(chord))
    for m in chord:
        for c in (-6, 0, 6): x += signal.sawtooth(2 * np.pi * hz(m) * 2 ** (c / 1200) * t + r.uniform(0, 6.28))
    x = lp(x / (3 * len(chord)), 1100, 4)
    env = np.minimum(1, t / 0.35) * np.minimum(1, np.maximum(0, d - t) / 0.35)
    return x * env * 0.8
@functools.lru_cache(None)
def bass(m, d):
    f = hz(m); t = tt(d); x = np.sin(2 * np.pi * f * t) + 0.22 * np.sin(4 * np.pi * f * t) + 0.06 * np.sin(6 * np.pi * f * t)
    env = (1 - np.exp(-t / 0.006)) * np.exp(-t / max(0.15, d * 1.1))
    return fade(lp(np.tanh(x * env * 1.2), 500) * 0.85, 0.003, min(0.04, d / 4))
@functools.lru_cache(None)
def kick():
    t = tt(0.38); x = np.sin(2 * np.pi * np.cumsum(48 + 75 * np.exp(-t / 0.032)) / SR) * np.exp(-t / 0.17)
    return fade(np.tanh(x * 1.5) * 0.95, 0.0015, 0.03)
@functools.lru_cache(None)
def snare():
    t = tt(0.26); body = np.sin(2 * np.pi * np.cumsum(205 - 30 * t / 0.26) / SR) * np.exp(-t / 0.045) * 0.55
    nz = lp(bp(noise(t), 900, 6000), 8000) * np.exp(-t / 0.075) * 0.6
    return fade(body + nz, 0.0008, 0.03)
@functools.lru_cache(None)
def clap():
    t = tt(0.24); e = np.zeros(len(t))
    for off in (0, 0.009, 0.019):
        i = int(off * SR); e[i:] += np.exp(-t[:len(t) - i] / (0.01 if off < 0.015 else 0.06))
    return fade(lp(bp(noise(t), 1000, 4000), 7000) * e * 0.8, 0.0008, 0.03)
@functools.lru_cache(None)
def shaker(v=0):                                      # v picks one of a few noise takes, so 16ths don't sound like a machine gun
    t = tt(0.07); return fade(lp(bp(noise(t), 3000, 9000), 8000) * np.exp(-t / 0.02) * (1 - np.exp(-t / 0.005)) * 1.0, 0.002, 0.01)
@functools.lru_cache(None)
def hat(v=0):
    t = tt(0.05); return fade(lp(hp(noise(t), 5000), 9000) * np.exp(-t / 0.011) * 0.8, 0.0005, 0.008)

# ---------- styles: chords per bar (4-bar cycle), bass roots, arpeggio tones ----------
STYLES = {
    # bright pop, I-V-vi-IV in G major
    'pop': dict(bpm=108, roots=[43, 38, 40, 36],
                chords=[(59, 62, 67), (57, 62, 66), (59, 64, 67), (60, 64, 67)],
                arp=[[67, 71, 74, 79], [66, 69, 74, 78], [64, 67, 71, 76], [64, 67, 72, 76]]),
    # mellow lo-fi, IV-iii-ii-I with sevenths in C major
    'lofi': dict(bpm=84, roots=[41, 40, 38, 36],
                 chords=[(53, 57, 60, 64), (52, 55, 59, 62), (50, 53, 57, 60), (48, 52, 55, 59)],
                 arp=[[72, 76, 77, 81], [71, 74, 76, 79], [69, 72, 74, 77], [67, 71, 72, 76]]),
    # upbeat "explainer" marimba house, vi-IV-I-V in C major
    'tech': dict(bpm=118, roots=[45, 41, 36, 43],
                 chords=[(60, 64, 69), (60, 65, 69), (60, 64, 67), (59, 62, 67)],
                 arp=[[69, 72, 76, 81], [69, 72, 77, 81], [67, 72, 76, 79], [67, 71, 74, 79]]),
}
S = STYLES[STYLE]
BARS = max(4, 2 * round(TOTAL * S['bpm'] / 480)); BAR = TOTAL / BARS; ST = BAR / 16
chord_of = lambda b: (b - BARS) % 4      # the 4-bar cycle is aligned to the END, so the last bar is always the turnaround chord before the loop
music = Mix()

def bar_pop(b, t0, intro, last, fill, lift):
    k = chord_of(b); ch = S['chords'][k]; ar = S['arp'][k]
    for j, m in enumerate(ch):                                   # EP: long chord on 1, a softer re-hit on the "and" of 3
        music.add(ep(m, BAR * 1.05, 3), t0 + j * 0.008, 0.2, pan=-0.3); music.add(ep(m, BAR * 1.05, -3), t0 + j * 0.008, 0.2, pan=0.3)
        if not last: music.add(ep(m, BAR * 0.4), t0 + 10 * ST, 0.12)
    pat = [0, 1, 2, 1, 3, 2, 1, 2] if (b // 4) % 2 == 0 else [3, 2, 1, 2, 0, 1, 2, 3]
    for i, a in enumerate(pat):                                  # plucked 8th-note arpeggio
        music.add(pluck(ar[a]), t0 + i * 2 * ST, (0.3 if intro else 0.39) * (1.0 if i % 2 == 0 else 0.8), pan=0.35 * (-1) ** i)
    if lift: music.add(pad(ch, BAR * 1.02), t0, 0.22)
    if intro: return
    r = S['roots'][k]
    for s, d, g, o in ((0, 7, 1.0, 0), (8, 5, 0.85, 0), (14, 2, 0.5, 12)):
        if last and s >= 8: continue
        music.add(bass(r + o, d * ST), t0 + s * ST, 0.55 * g)
    for s in ([0, 8] if b % 2 == 0 else [0, 8, 11]):
        if (last or fill) and s > 8: continue
        music.add(kick(), t0 + s * ST, 0.85)
    for s in (4, 12):
        if last and s > 8: continue
        music.add(snare(), t0 + s * ST, 0.9); music.add(clap(), t0 + s * ST, 0.85)
    for s in range(16):
        if last and s >= 8: continue
        music.add(shaker(s % 3), t0 + s * ST, 0.9 if s % 4 == 2 else 0.55, pan=0.3)
    if fill:
        for i, s in enumerate((13, 14, 15)): music.add(snare(), t0 + s * ST, 0.35 + 0.15 * i)

def bar_lofi(b, t0, intro, last, fill, lift):
    k = chord_of(b); ch = S['chords'][k]; ar = S['arp'][k]; sw = 0.28 * ST    # swing on the off-16ths
    for j, m in enumerate(ch):                                   # slow-strummed EP chord, soft re-hit on the swung "and" of 3
        music.add(ep(m, BAR * 1.05, 4), t0 + j * 0.018, 0.22, pan=-0.25); music.add(ep(m, BAR * 1.05, -4), t0 + j * 0.018, 0.22, pan=0.25)
        if not last: music.add(ep(m, BAR * 0.45), t0 + 10 * ST + sw, 0.11)
    mel = [(3, 2), (6, 1), (11, 3), (14, 2)] if (b // 4) % 2 == 0 else [(2, 3), (7, 2), (10, 1), (15, 0)]
    for s, a in mel:                                             # sparse marimba answers between the chords
        music.add(mallet(ar[a]), t0 + s * ST + (sw if s % 2 else 0), 0.2 if intro else 0.27, pan=0.3 * (-1) ** s)
    if lift: music.add(pad(ch, BAR * 1.02), t0, 0.16)
    if intro: return
    r = S['roots'][k]
    for s, d, g in ((0, 9, 1.0), (10, 5, 0.8)):
        if last and s >= 8: continue
        music.add(bass(r, d * ST), t0 + s * ST, 0.6 * g)
    for s in ([0, 7, 10] if b % 2 == 0 else [0, 10]):
        if (last or fill) and s > 8: continue
        music.add(kick(), t0 + s * ST + (sw if s % 2 else 0), 0.85 if s == 0 else 0.65)
    for s in (4, 12):
        if last and s > 8: continue
        music.add(lp(snare(), 5000), t0 + s * ST, 0.9)
    for s in range(0, 16, 2):
        if last and s >= 8: continue
        music.add(hat(s % 3), t0 + s * ST + (sw if s % 4 == 2 else 0), 0.9 if s % 4 == 0 else 0.6, pan=0.25)
    if fill: music.add(lp(snare(), 5000), t0 + 15 * ST + sw, 0.5)

def bar_tech(b, t0, intro, last, fill, lift):
    k = chord_of(b); ch = S['chords'][k]; ar = S['arp'][k]
    music.add(pad(ch, BAR * 1.02), t0, 0.2 if lift else 0.12)
    pat = [0, 1, 2, 3, 2, 1, 2, 3] if (b // 4) % 2 == 0 else [3, 2, 1, 0, 1, 2, 3, 2]
    for i, a in enumerate(pat):                                  # marimba 8ths, with a 16th pickup at the end of every other bar
        music.add(mallet(ar[a]), t0 + i * 2 * ST, (0.24 if intro else 0.32) * (1.0 if i % 2 == 0 else 0.78), pan=0.3 * (-1) ** i)
    if b % 2 == 1 and not intro and not last: music.add(mallet(ar[1]), t0 + 15 * ST, 0.2, pan=-0.3)
    for j, m in enumerate(ch):                                   # soft EP stabs on the offbeats
        for s in (6, 14):
            if last and s > 8: continue
            music.add(ep(m, 2.5 * ST), t0 + s * ST, 0.12 if intro else 0.15, pan=0.2 * (j - 1))
    if intro: return
    r = S['roots'][k]
    for s in (2, 6, 10, 14):                                     # offbeat bass
        if last and s > 8: continue
        music.add(bass(r, 2.4 * ST), t0 + s * ST, 0.5)
    for s in (0, 4, 8, 12):
        if (last and s > 8) or (fill and s == 12): continue
        music.add(kick(), t0 + s * ST, 0.8)
    for s in (4, 12):
        if last and s > 8: continue
        music.add(clap(), t0 + s * ST, 0.7); music.add(snare(), t0 + s * ST, 0.4)
    for s in range(16):
        if last and s >= 8: continue
        music.add(shaker(s % 3), t0 + s * ST, 0.65 if s % 4 == 2 else 0.38, pan=-0.3)
    if fill:
        for i, s in enumerate((12, 13, 14, 15)): music.add(clap(), t0 + s * ST, 0.25 + 0.12 * i)

BAR_FN = dict(pop=bar_pop, lofi=bar_lofi, tech=bar_tech)[STYLE]
for b in range(BARS):
    intro = b < 2                         # first two bars without drums so the hook line is clean
    last = b == BARS - 1                  # drums drop out halfway through the last bar before the loop point
    fill = b % 8 == 7 and not last        # small fill closing every 8 bars
    lift = (b // 4) % 2 == 1              # every other 4-bar block gets a pad layer, so the bed keeps evolving
    BAR_FN(b, b * BAR, intro, last, fill, lift)
mus = music.out()
mus = lp(mus, 9000, 2)
nf = int(0.02 * SR); mus[:nf] *= np.linspace(0, 1, nf)[:, None]; mus[-nf:] *= np.linspace(1, 0, nf)[:, None]

# ---------- sound effects (unchanged from the skill) ----------
def fx_whoosh(d=0.42):
    t = tt(d); n = noise(t); out = np.zeros(len(t)); cs = [500, 1100, 2400, 4200, 2000]; seg = len(t) // (len(cs) - 1)
    for i, c in enumerate(cs): out += bp(n, c * 0.6, c * 1.6) * np.clip(1 - np.abs(np.arange(len(t)) - i * seg) / seg, 0, 1)
    return fade(out * np.sin(np.pi * t / d) ** 1.5 * 0.9, 0.01, 0.05)
def fx_pop(): t = tt(0.09); return fade(sweep(950, 260, 0.09, 0.6) * np.exp(-t / 0.03), 0.0005, 0.01)
def fx_tick(): t = tt(0.03); return fade(np.sin(2 * np.pi * 2600 * t) * np.exp(-t / 0.006), 0.0002, 0.004)
def fx_blip(): t = tt(0.09); return fade(lp(np.sign(sweep(780, 1560, 0.09)), 5000) * np.exp(-t / 0.05) * 0.5, 0.001, 0.01)
def fx_ding():
    t = tt(0.9); return fade(sum(a * np.sin(2 * np.pi * f * t) * np.exp(-t / tau) for f, a, tau in [(1318.5, 1, .28), (1975.5, .6, .2), (2637, .45, .14), (3951, .2, .08)]) * 0.45, 0.001, 0.05)
def fx_thud(): t = tt(0.2); return fade(np.tanh((sweep(150, 48, 0.2, 0.5) * np.exp(-t / 0.07) + 0.3 * lp(noise(t), 900) * np.exp(-t / 0.02)) * 1.8) * 0.8, 0.001, 0.02)
def fx_slam(): t = tt(0.6); return fade(np.tanh((sweep(170, 36, 0.6, 0.4) * np.exp(-t / 0.16) * 1.2 + bp(noise(t), 200, 5000) * np.exp(-t / 0.05) * 0.8) * 2.4) * 0.95, 0.0005, 0.05)
def fx_impact():
    t = tt(1.3); x = sweep(95, 30, 1.3, 0.35) * np.exp(-t / 0.4) * 1.3 + hp(noise(t), 2500) * np.exp(-t / 0.25) * 0.35 + bp(noise(t), 150, 900) * np.exp(-t / 0.08) * 0.7
    return fade(np.tanh(x * 1.8), 0.0005, 0.1)
def fx_boom(): t = tt(0.9); return fade(np.tanh((sweep(120, 34, 0.9, 0.4) * np.exp(-t / 0.28) * 1.3 + hp(noise(t), 3000) * np.exp(-t / 0.12) * 0.3) * 2), 0.0005, 0.08)
def fx_zap():
    d = 0.26; t = tt(d); x = signal.sawtooth(2 * np.pi * np.cumsum(180 + 2600 * (t / d) ** 2) / SR) * 0.5 + bp(noise(t), 2000, 9000) * 0.3
    return fade(x * np.sin(np.pi * t / d) ** 0.6 * 0.7, 0.002, 0.03)
def fx_riser(d=0.95): t = tt(d); return fade(hp(noise(t), 1200) * 0.5 * (t / d) ** 2 + sweep(220, 1400, d, 2) * 0.35 * (t / d) ** 1.5, 0.02, 0.01)
def fx_clink():
    t = tt(0.22); x = sum(a * np.sin(2 * np.pi * f * t) * np.exp(-t / tau) for f, a, tau in [(2140, 1, .05), (3390, .7, .035), (5230, .5, .025), (7600, .3, .015)])
    return fade((x + hp(noise(t), 4000) * np.exp(-t / 0.004) * 0.8 + sweep(160, 70, 0.22) * np.exp(-t / 0.04) * 0.6) * 0.5, 0.0003, 0.02)
def fx_coin(): return fade(np.concatenate([lp(sq(987.8, 0.07), 6000) * 0.4, lp(sq(1318.5, 0.3), 6000) * np.exp(-tt(0.3) / 0.11) * 0.4]), 0.001, 0.02)
def fx_buzz(): t = tt(0.28); return fade(lp(np.tanh(signal.sawtooth(2 * np.pi * 98 * t) * 3) + 0.5 * signal.sawtooth(2 * np.pi * 147 * t), 2200) * 0.6, 0.003, 0.03)
def fx_glitch():
    d = 0.36; t = tt(d); n = np.repeat(noise(t)[::90], 90)[:len(t)]; return fade(hp(n, 800) * (np.sin(2 * np.pi * 23 * t) > -0.2) * (1 - t / d) * 0.5, 0.001, 0.02)
FX = dict(whoosh=fx_whoosh, pop=fx_pop, tick=fx_tick, blip=fx_blip, ding=fx_ding, thud=fx_thud, slam=fx_slam, impact=fx_impact, boom=fx_boom, zap=fx_zap,
          riser=fx_riser, riser2=lambda: fx_riser(0.72), clink=fx_clink, coin=fx_coin, buzz=fx_buzz, glitch=fx_glitch)
LEVEL = dict(whoosh=.34, pop=.5, tick=.4, blip=.38, ding=.42, thud=.5, slam=.62, impact=.5, boom=.6, zap=.45, riser=.3, riser2=.3, clink=.42, coin=.26, buzz=.4, glitch=.3)
PAN = dict(coin=0.4, clink=0.35)
fxm = Mix(); ev = json.load(open('sfx.json'))
for i, e in enumerate(ev):
    fxm.add(FX[e['name']](), e['t'], LEVEL[e['name']] * e['gain'], PAN.get(e['name'], 0.22 * (-1) ** i if e['name'] in ('tick', 'pop') else 0.0))
sf = fxm.out() * 0.42

# ---------- voice: high-pass, presence lift, gentle compression (unchanged from the skill) ----------
_, v = wavfile.read('voice.wav'); v = signal.resample_poly(v.astype(np.float64) / 32768, 320, 147); v = hp(v, 85, 4); v = v + 0.35 * bp(v, 2500, 6500)
env = np.sqrt(np.maximum(lp(v ** 2, 14), 0) + 1e-9); env /= env.max(); v = v * np.where(env > 0.16, (0.16 / env) ** 0.7, 1.0)
v = np.tanh(v / np.abs(v).max() * 1.25) / np.tanh(1.25) * 0.9; v = np.pad(v, (0, max(0, N - len(v))))[:N]

# ---------- mix: music is set by loudness relative to the voice, then ducks under it ----------
duck = np.sqrt(np.maximum(lp(v ** 2, 6), 0) + 1e-9); duck = np.clip(duck / (duck.max() * 0.35), 0, 1)
shape = 1 - 0.45 * duck
g = 10 ** ((klufs(v) - MUSIC_BELOW_VOICE_LU - klufs(mus * shape[:, None])) / 20)
mg = g * shape
mix = mus * mg[:, None] + sf * (1 - 0.2 * duck)[:, None] + np.stack([v, v], 1)
mix = np.tanh(mix * 1.05) / np.tanh(1.05); mix = mix / np.abs(mix).max() * 0.9
wavfile.write('mix.wav', SR, (mix * 32767).astype(np.int16))
if '--music-only' in args:
    mo = mus / np.abs(mus).max() * 0.7; wavfile.write('music.wav', SR, (mo * 32767).astype(np.int16))
db = lambda x: round(20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-12), 1)
print(f'mix.wav {TOTAL}s  style {STYLE}  {BARS} bars  {round(BARS * 240 / TOTAL, 1)} BPM  {len(ev)} sfx | LUFS: voice {klufs(v):.1f} '
      f'music {klufs(mus * mg[:, None]):.1f} sfx {klufs(sf):.1f} mix {klufs(mix):.1f} | rms dB: voice {db(v)} music {db(mus * mg[:, None])}')
