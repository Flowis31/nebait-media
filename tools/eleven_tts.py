"""Runs in GitHub Actions (.github/workflows/voice.yml), not in the build session: ElevenLabs is not reachable from there.
For every voice/requests/NAME.txt without voice/out/NAME.mp3 it calls ElevenLabs text-to-speech with timestamps and saves
voice/out/NAME.mp3 and voice/out/NAME.json (request text, character alignment, voice and model used).
On failure it writes voice/out/NAME.error.txt instead, so the build session can see the reason and fall back to piper.
Voice and settings: tools/elevenlabs.json (the owner's choice: Adam - Dominant, Firm, stability 50, similarity 75).
The API key comes from the repository secret ELEVENLABS_API_KEY."""
import os, sys, json, glob, base64, urllib.request, urllib.error
CFG = json.load(open('tools/elevenlabs.json')); KEY = os.environ.get('ELEVENLABS_API_KEY', '').strip()
os.makedirs('voice/out', exist_ok=True)
todo = [p for p in sorted(glob.glob('voice/requests/*.txt')) if not os.path.exists('voice/out/' + os.path.basename(p)[:-4] + '.mp3')]
print(len(todo), 'request(s) without a voice')
def call(text, model):
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{CFG['voice_id']}/with-timestamps?output_format={CFG['output_format']}"
    body = dict(text=text, model_id=model, voice_settings=dict(stability=CFG['stability'], similarity_boost=CFG['similarity_boost']))
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={'xi-api-key': KEY, 'Content-Type': 'application/json', 'Accept': 'application/json'})
    return json.load(urllib.request.urlopen(req, timeout=600))
for p in todo:
    name = os.path.basename(p)[:-4]; text = open(p, encoding='utf-8').read().strip(); err = f'voice/out/{name}.error.txt'
    if not KEY:
        open(err, 'w').write('The repository secret ELEVENLABS_API_KEY is not set.\n'); print(name, 'no key'); continue
    r, used, why = None, None, []
    for model in [CFG['model_id'], CFG.get('fallback_model_id')]:
        if not model: continue
        try: r, used = call(text, model), model; break
        except urllib.error.HTTPError as e: why.append(f'{model}: HTTP {e.code} {e.read()[:1500].decode("utf-8", "replace")}')
        except Exception as e: why.append(f'{model}: {e!r}')
    if r is None:
        open(err, 'w').write('\n'.join(why) + '\n'); print(name, 'failed:', why); continue
    open(f'voice/out/{name}.mp3', 'wb').write(base64.b64decode(r['audio_base64']))
    json.dump(dict(text=text, voice_id=CFG['voice_id'], model_id=used, alignment=r.get('alignment'), normalized_alignment=r.get('normalized_alignment')),
              open(f'voice/out/{name}.json', 'w', encoding='utf-8'), ensure_ascii=False)
    if os.path.exists(err): os.remove(err)
    print(name, 'ok,', used, len(text), 'characters')
