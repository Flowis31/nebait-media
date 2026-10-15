"""External voiceover (ElevenLabs) for the «Не байт» pipeline. Replaces `synth.py VOICE LS` when the voice comes from elsewhere:
writes the same voice.wav (48 kHz), voice.json and timing.js, so scenes, captions and audio.py work unchanged.
script_lines.py in the current folder must be exactly what the voice says.

    python3 align.py --request OUT.txt               text for ElevenLabs built from script_lines.py (one paragraph per line)
    python3 align.py VOICE.mp3 --el VOICE.json       exact word timings from the ElevenLabs character alignment
                                                     (VOICE.json is what tools/eleven_tts.py saves next to the mp3)
    python3 align.py VOICE.mp3 [ruslan] [0.76]       a recording without alignment (made by hand in the ElevenLabs app):
                                                     word timings by DTW against a piper reading of the same script

The edit is the same in both modes: 0.12 s of silence before the first word, pauses between lines longer than the script's
pause + 0.35 s are shortened, 0.10 s of silence after the last word (the video loops).
The DTW mode needs the kit (synth.py, dl/piper, voices/ruslan); the --el and --request modes need only ffmpeg and numpy."""
import sys, os, json, shutil, subprocess, tempfile, difflib
import numpy as np
from scipy.io import wavfile

OUT_SR = 48000

def script_lines():
    from importlib import util as u
    spec = u.spec_from_file_location('sl', os.path.abspath('script_lines.py')); m = u.module_from_spec(spec); spec.loader.exec_module(m)
    return m.LINES

def el_text(LINES):
    """Request text and, for every display token, the character span of its spoken words in that text.
    Spoken forms are the ones synth.py reads (numbers already in words); ';' (an espeak pause) becomes ' —'.
    A line that continues a sentence follows on the same line; a finished sentence starts a new line, and after a punchline
    (script pause >= 0.45 s) comes an empty line, so the voice holds a beat. The last line ends with '…' (it runs into the loop)."""
    parts, toks, pos, cap = [], [], 0, True
    for li, (key, txt, gap) in enumerate(LINES):
        out = []; tl = txt.split()
        for ti, t in enumerate(tl):
            d, _, v = t.partition('|'); spoken = (v or d).replace('~', ' ').split(); cores = []
            for k, w in enumerate(spoken):
                if li == len(LINES) - 1 and ti == len(tl) - 1 and k == len(spoken) - 1: w = w.rstrip(',.;') + '…'
                if w.endswith(';'): w = w[:-1] + ' —'
                if cap: w = w[:1].upper() + w[1:]; cap = False
                start = pos + sum(len(o) + 1 for o in out); core = w.rstrip(' —…,.;:!?»"')
                cores.append((start, start + len(core))); out.append(w)
            toks.append(dict(d=d.replace('~', ' '), line=key, span=(cores[0][0], cores[-1][1])))
        line = ' '.join(out); ends = line.rstrip('»"').endswith(('.', '?', '!', '…'))
        sep = '' if li == len(LINES) - 1 else ('\n\n' if ends and gap >= 0.45 else '\n' if ends else ' ')
        parts.append(line + sep); pos += len(line) + len(sep); cap = ends
    return ''.join(parts), toks

def load(path, sr):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(sr), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)

def finish(src, LINES, words, spans, note):
    """words: [{d, t0, t1, line}] in recording time; spans: [(s0, s1)] per line in recording time. Edit, write the three files."""
    GAPS = [g for _, _, g in LINES]; NL = len(LINES)
    xo = load(src, OUT_SR); xo = xo / (np.abs(xo).max() + 1e-9)
    cuts = [(0.0, max(0.0, spans[0][0] - 0.12))]
    for li in range(NL - 1):
        a, b = spans[li][1], spans[li + 1][0]; cap = GAPS[li] + 0.35
        if b - a > cap: m0 = a + cap / 2; cuts.append((m0, m0 + (b - a - cap)))
    end_keep = spans[-1][1] + 0.10
    lead = max(0.0, 0.12 - (spans[0][0] - cuts[0][1]))
    def tmap(t):
        s = t + lead
        for a, b in cuts:
            if t >= b: s -= (b - a)
            elif t > a: s -= (t - a)
        return s
    if end_keep * OUT_SR > len(xo): xo = np.pad(xo, (0, int(end_keep * OUT_SR) - len(xo) + 1))   # the file may stop right on the last word
    keep = np.ones(len(xo), bool)
    for a, b in cuts: keep[int(a * OUT_SR):int(b * OUT_SR)] = False
    keep[int(end_keep * OUT_SR):] = False
    y = xo[keep]
    for a, b in cuts[1:]:                                             # joins sit inside silence; a 5 ms dip hides any click
        p = int(round((tmap(b) - lead) * OUT_SR)); n = int(0.005 * OUT_SR)
        if n < p < len(y) - n: y[p - n:p + n] *= np.concatenate([np.linspace(1, 0.3, n), np.linspace(0.3, 1, n)])
    if lead > 0: y = np.concatenate([np.zeros(int(round(lead * OUT_SR))), y])
    total = round(len(y) / OUT_SR, 3)
    wavfile.write('voice.wav', OUT_SR, (y / (np.abs(y).max() + 1e-9) * 0.95 * 32767).astype(np.int16))
    W = [dict(d=w['d'], t0=round(tmap(w['t0']), 3), t1=round(tmap(w['t1']), 3), line=w['line']) for w in words]
    for k in range(1, len(W)):                                        # ordered, at least 40 ms per word
        W[k]['t0'] = max(W[k]['t0'], W[k - 1]['t0'] + 0.04); W[k - 1]['t1'] = max(W[k - 1]['t1'], W[k - 1]['t0'] + 0.04)
    LN = [dict(key=key, t0=round(tmap(s0), 3), t1=round(min(tmap(s1), total), 3)) for (key, _, _), (s0, s1) in zip(LINES, spans)]
    T = dict(total=total, words=W, lines=LN)
    json.dump(T, open('voice.json', 'w'), ensure_ascii=False, indent=1)
    open('timing.js', 'w').write('window.TIMING=' + json.dumps(T, ensure_ascii=False) + ';')
    print(f'{note}: total {total}s, {len(W)} tokens ({len(W) / total:.2f}/s), {len(cuts) - 1} long pauses shortened')
    for l in LN: print(f"  {l['key']:8s} {l['t0']:7.3f} {l['t1']:7.3f}")

def from_elevenlabs(src, aj):
    LINES = script_lines(); text, toks = el_text(LINES)
    A = json.load(open(aj)); al = A.get('alignment') or A.get('normalized_alignment')
    chars, st, en = al['characters'], al['character_start_times_seconds'], al['character_end_times_seconds']
    if A.get('text') and A['text'] != text: sys.exit('script_lines.py differs from the text this voice was generated from: request a new voice')
    got = ''.join(chars); idx = list(range(len(text)))
    if got != text:                                                   # map our character positions onto the returned ones
        sm = difflib.SequenceMatcher(None, text, got, autojunk=False); m = {}
        for a, b, n in sm.get_matching_blocks():
            for k in range(n): m[a + k] = b + k
        idx = [m.get(i) for i in range(len(text))]
    def ct(i, side):
        j = idx[i]; d = 0
        while j is None and d < 20:                                   # nearest mapped neighbour
            d += 1; j = idx[min(len(idx) - 1, i + (d if side == 0 else -d))]
        return (st if side == 0 else en)[j]
    words = [dict(d=t['d'], t0=ct(t['span'][0], 0), t1=ct(t['span'][1] - 1, 1), line=t['line']) for t in toks]
    spans = []
    for key, _, _ in LINES:
        ws = [w for w in words if w['line'] == key]; spans.append((max(0.0, ws[0]['t0'] - 0.03), ws[-1]['t1'] + 0.05))
    finish(src, LINES, words, spans, f'aligned {src} (ElevenLabs timestamps)')

def from_recording(src, VOICE='ruslan', LS='0.76'):
    from scipy.fft import dct
    SR = 22050; FR = 220; HOP = FR / SR
    LINES = script_lines(); GAPS = [g for _, _, g in LINES]
    ref_dir = tempfile.mkdtemp()
    for f in ('synth.py', 'script_lines.py'): shutil.copy(f, ref_dir)
    for d in ('dl', 'voices'): os.symlink(os.path.abspath(d), os.path.join(ref_dir, d))
    subprocess.run([sys.executable, 'synth.py', VOICE, LS], cwd=ref_dir, check=True, capture_output=True)
    R = json.load(open(os.path.join(ref_dir, 'voice.json')))
    _, ra = wavfile.read(os.path.join(ref_dir, 'voice.wav')); ra = ra.astype(np.float64) / 32768
    shutil.rmtree(ref_dir, ignore_errors=True); NL = len(R['lines'])
    x = load(src, SR); x = x / (np.abs(x).max() + 1e-9)
    nfr = len(x) // FR
    env = np.sqrt(np.convolve(x[:nfr * FR] ** 2, np.ones(FR * 3) / (FR * 3), 'same')[::FR][:nfr] + 1e-12)
    edb = 20 * np.log10(env + 1e-9); thr = max(np.percentile(edb, 95) - 32, np.percentile(edb, 10) + 8); sil = edb < thr
    first = np.argmax(~sil); last = nfr - np.argmax(~sil[::-1]); pauses = []; i = 0
    while i < nfr:
        if sil[i]:
            j = i
            while j < nfr and sil[j]: j += 1
            if i > first and j < last and (j - i) * HOP >= 0.06: pauses.append((i * HOP, j * HOP))
            i = j
        else: i += 1
    t_first, t_last = first * HOP, last * HOP
    rdur = np.array([l['t1'] - l['t0'] for l in R['lines']]); P = len(pauses)
    if P < NL - 1: sys.exit(f'only {P} pauses for {NL} lines: the recording runs lines together')
    starts = [t_first] + [p[1] for p in pauses]; ends = [p[0] for p in pauses] + [t_last]
    mu = np.log((t_last - t_first - sum(p[1] - p[0] for p in pauses) * 0.5) / rdur.sum())
    def cost(li, a, b):
        d = ends[b] - starts[a]
        return 1e9 if d <= 0.05 else (np.log(d / rdur[li]) - mu) ** 2
    bonus = lambda b: 0.6 * np.log(pauses[b][1] - pauses[b][0]) if b < P else 0
    INF = 1e18; f = np.full((NL, P + 1), INF); back = np.zeros((NL, P + 1), int)
    for b in range(P + 1): f[0, b] = cost(0, 0, b) - bonus(b)
    for li in range(1, NL):
        for b in range(li, P + 1):
            best, arg = INF, -1
            for a in range(li, b + 1):
                v = f[li - 1, a - 1]
                if v < INF:
                    c = v + cost(li, a, b) - bonus(b)
                    if c < best: best, arg = c, a
            f[li, b] = best; back[li, b] = arg
    if f[NL - 1, P] >= INF: sys.exit('could not split the recording into lines')
    spans = []; b = P
    for li in range(NL - 1, -1, -1):
        a = back[li, b] if li else 0; spans.append((starts[a], ends[b])); b = a - 1
    spans = spans[::-1]; MEL = {}
    def mfcc(y):
        n_fft = 512
        if len(y) < n_fft: y = np.pad(y, (0, n_fft - len(y)))
        nf = 1 + (len(y) - n_fft) // FR; idx = np.arange(n_fft)[None, :] + FR * np.arange(nf)[:, None]
        S = np.abs(np.fft.rfft(y[idx] * np.hanning(n_fft), axis=1)) ** 2
        if 'm' not in MEL:
            mel = lambda h: 2595 * np.log10(1 + h / 700); imel = lambda m: 700 * (10 ** (m / 2595) - 1)
            bins = np.floor((n_fft + 1) * imel(np.linspace(mel(80), mel(8000), 28)) / SR).astype(int); M = np.zeros((26, n_fft // 2 + 1))
            for k in range(1, 27):
                l, c, r = bins[k - 1], bins[k], bins[k + 1]
                M[k - 1, l:c] = (np.arange(l, c) - l) / max(1, c - l); M[k - 1, c:r] = (r - np.arange(c, r)) / max(1, r - c)
            MEL['m'] = M
        m = dct(np.log(S @ MEL['m'].T + 1e-10), type=2, axis=1, norm='ortho')[:, 1:14]
        return (m - m.mean(0)) / (m.std(0) + 1e-6)
    def dtw(A, B):
        C = np.sqrt(((A[:, None, :] - B[None, :, :]) ** 2).sum(-1)); n, m = C.shape
        D = np.full((n + 1, m + 1), np.inf); D[0, 0] = 0
        for i in range(1, n + 1):
            Ci, Dp, Di = C[i - 1], D[i - 1], D[i]; diag = np.minimum(Dp[:-1], Dp[1:])
            for j in range(1, m + 1): Di[j] = Ci[j - 1] + (diag[j - 1] if diag[j - 1] < Di[j - 1] else Di[j - 1])
        i, j, path = n, m, []
        while i > 0 and j > 0:
            path.append((i - 1, j - 1)); k = np.argmin([D[i - 1, j - 1], D[i - 1, j], D[i, j - 1]])
            if k == 0: i, j = i - 1, j - 1
            elif k == 1: i -= 1
            else: j -= 1
        return path[::-1]
    words = []
    for L, (s0, s1) in zip(R['lines'], spans):
        ry = ra[int(L['t0'] * SR):int(L['t1'] * SR)]; hy = x[int(s0 * SR):int(s1 * SR)]; hm = {}
        for i, j in dtw(mfcc(hy), mfcc(ry)): hm.setdefault(j, []).append(i)
        jj = np.array(sorted(hm)); ii = np.array([np.mean(hm[j]) for j in jj])
        to_h = lambda tr: s0 + float(np.interp((tr - L['t0']) / HOP, jj, ii)) * HOP
        ws = [w for w in R['words'] if w['line'] == L['key']]; n0 = len(words)
        words += [dict(d=w['d'], t0=to_h(w['t0']), t1=to_h(w['t1']), line=L['key']) for w in ws]
        words[n0]['t0'] = max(s0, min(words[n0]['t0'], s0 + 0.02)); words[-1]['t1'] = s1
    finish(src, LINES, words, spans, f'aligned {src} (DTW, {P} pauses)')

if __name__ == '__main__':
    a = sys.argv[1:]
    if a[0] == '--request':
        text, _ = el_text(script_lines()); open(a[1], 'w').write(text + '\n'); print(f'{a[1]}: {len(text)} characters')
    elif '--el' in a: from_elevenlabs(a[0], a[a.index('--el') + 1])
    else: from_recording(a[0], *(a[1:3]))
