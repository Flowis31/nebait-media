"""envelope.py -> env.js: loudness of voice.wav at 60 values per second (0..1), for mascotTalk() in tools/mascot.js.
Run in the build folder after voice_get.sh / synth.py (and again whenever voice.wav changes). Load env.js in index.html
before engine.js:  <script src="timing.js"></script><script src="env.js"></script>"""
import json, numpy as np
from scipy.io import wavfile
from scipy import signal
sr, x = wavfile.read('voice.wav'); x = x.astype(np.float64); x = x.mean(1) if x.ndim > 1 else x; x /= np.abs(x).max() + 1e-9
x = signal.sosfilt(signal.butter(2, [200, 3500], btype='band', fs=sr, output='sos'), x)       # speech band: plosives, not rumble
FPS = 60; hop = sr // FPS; n = len(x) // hop
rms = np.sqrt(np.array([np.mean(x[i * hop:(i + 1) * hop] ** 2) for i in range(n)]))
db = 20 * np.log10(rms + 1e-6); top = np.percentile(db, 97)
v = np.clip((db - (top - 30)) / 30, 0, 1)                                                       # 30 dB window under the loud syllables
v = np.convolve(v, [0.25, 0.5, 0.25], mode='same')
open('env.js', 'w').write('window.VENV=' + json.dumps(dict(fps=FPS, v=[round(float(a), 3) for a in v])) + ';')
print(f'env.js: {n} frames, mean {v.mean():.2f}, open >0.3 in {np.mean(v > 0.3) * 100:.0f}% of frames')
