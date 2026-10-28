#!/bin/bash
# strip.sh out.jpg T0 T1 [N=12]  -> N evenly spaced frames between T0 and T1 in one row-wrapped sheet (6 per row).
# Motion check (owner 28.10.2026): look at every scene as a strip at ~10 fps before rendering, not only at single stills.
out=$1; t0=$2; t1=$3; n=${4:-12}; rm -f frames/s_*.png
ts=$(python3 -c "print(' '.join(f'{$t0+($t1-$t0)*i/max(1,$n-1):.3f}' for i in range($n)))")
python3 render.py stills $ts 2>&1 | grep -E "LOG|ERR|Error|Timeout" | head -10
ffmpeg -y -v error -pattern_type glob -i 'frames/s_*.png' -vf "scale=270:480,tile=6x$(( (n+5)/6 )):padding=4:color=white" -frames:v 1 -q:v 3 "$out"
