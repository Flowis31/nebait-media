#!/bin/bash
# final.sh out.mp4  (needs list.txt + part*.mkv from `render.py all`, and mix.wav) -> H.264/AAC + review.jpg, one frame every 0.5 s (frame n ~ t = 0.23 + 0.5 n)
set -e
ffmpeg -y -v error -f concat -safe 0 -i list.txt -i mix.wav -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -profile:v high -r 60 -movflags +faststart -c:a aac -b:a 256k -ar 48000 -shortest "$1"
ffprobe -v error -show_entries format=duration,size:stream=codec_name,width,height,r_frame_rate -of default=nw=1 "$1" | tr '\n' ' '; echo
dur=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$1"); rows=$(python3 -c "import math;print(max(1,math.ceil($dur*2/10)))")
ffmpeg -y -v error -i "$1" -vf "fps=2,scale=270:480,tile=10x${rows}:padding=4:color=white" -frames:v 1 -q:v 3 review.jpg
ffmpeg -v info -i "$1" -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:" | tail -2 | tr '\n' ' '; echo
