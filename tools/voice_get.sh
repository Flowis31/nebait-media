#!/bin/bash
# voice_get.sh NAME REPO   -- run in the build folder (script_lines.py, align.py there), REPO = path to the nebait-media clone.
# Gets the ElevenLabs voiceover for script_lines.py through GitHub Actions and writes voice.wav / voice.json / timing.js,
# exactly like `python3 synth.py ruslan 0.76` would. Exit 0 = done; exit 1 = no voice (reason printed): fall back to synth.py.
# The request is named NAME-<hash of the text>, so an edited script always gets a fresh voice and a rerun reuses the old one.
set -u
NAME=$1; REPO=$2; TMP=$(mktemp)
python3 align.py --request "$TMP" >/dev/null || exit 1
H=$(sha1sum "$TMP" | cut -c1-8); ID="$NAME-$H"; REQ="$REPO/voice/requests/$ID.txt"; OUT="$REPO/voice/out/$ID"
cd "$REPO" && git pull -q --rebase origin main; cd - >/dev/null
if [ ! -f "$OUT.mp3" ]; then
  mkdir -p "$REPO/voice/requests"; cp "$TMP" "$REQ"; date -u +%FT%TZ > "$REQ.retry"     # .retry makes a repeat request a real change
  (cd "$REPO" && git rm -q --ignore-unmatch "voice/out/$ID.error.txt" && git add "voice/requests/$ID.txt" "voice/requests/$ID.txt.retry" && \
   git commit -q -m "voice request: $ID" && \
   for i in 1 2 3; do git push -q origin HEAD:main && break; git pull -q --rebase origin main; done) || { echo "could not push the request"; exit 1; }
  echo "requested $ID ($(wc -c < "$TMP") bytes), waiting for GitHub Actions..."
  for i in $(seq 1 40); do
    sleep 10; (cd "$REPO" && git pull -q --rebase origin main)
    [ -f "$OUT.mp3" ] && break
    [ -f "$OUT.error.txt" ] && { echo "ElevenLabs failed:"; cat "$OUT.error.txt"; exit 1; }
  done
  [ -f "$OUT.mp3" ] || { echo "no voice after 400 s (is the workflow enabled and the secret set?)"; exit 1; }
fi
TEMPO=$(python3 -c "import json;print(json.load(open('$REPO/tools/elevenlabs.json')).get('post_tempo',1.0))")
python3 align.py "$OUT.mp3" --el "$OUT.json" --tempo "$TEMPO" && echo "voice: $OUT.mp3"
