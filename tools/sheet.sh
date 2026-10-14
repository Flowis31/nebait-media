#!/bin/bash
# sheet.sh out.jpg t1 t2 ...  -> exact frames at those times, tiled 4 per row (look at this instead of single screenshots); also refreshes sfx.json
out=$1; shift; rm -f frames/s_*.png
python3 render.py stills "$@" 2>&1 | grep -E "LOG|ERR|Error|Timeout" | head -10
n=$#; cols=$(( n<4 ? n : 4 )); rows=$(( (n+cols-1)/cols ))
ffmpeg -y -v error -pattern_type glob -i 'frames/s_*.png' -vf "scale=405:720,tile=${cols}x${rows}:padding=6:color=white" -frames:v 1 -q:v 3 "$out"
