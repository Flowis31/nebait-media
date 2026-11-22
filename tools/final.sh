#!/bin/bash
# final.sh out.mp4  (needs list.txt + part*.mkv from `render.py all`, and mix.wav) -> H.264/AAC + review.jpg, one frame every 0.5 s (frame n ~ t = 0.23 + 0.5 n)
# crf 23 since 28.10.2026: film grain (lookFX) made crf 19 files ~140 MB; crf 23 keeps them ~25 MB, under GitHub 100 MB and Metricool limits
set -e
ffmpeg -y -v error -f concat -safe 0 -i list.txt -i mix.wav -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p -profile:v high -r 60 -movflags +faststart -c:a aac -b:a 256k -ar 48000 -shortest "$1"
# 22.11.2026 (038, 3D-пилот): 3D-сцены с зерном дали 111 МБ при crf 23 — больше лимита GitHub 100 МБ. Если файл больше 90 МБ, перекодируем с crf 25 (~40 МБ).
if [ $(stat -c %s "$1") -gt 90000000 ]; then ffmpeg -y -v error -f concat -safe 0 -i list.txt -i mix.wav -c:v libx264 -preset medium -crf 25 -pix_fmt yuv420p -profile:v high -r 60 -movflags +faststart -c:a aac -b:a 256k -ar 48000 -shortest "$1"; fi
ffprobe -v error -show_entries format=duration,size:stream=codec_name,width,height,r_frame_rate -of default=nw=1 "$1" | tr '\n' ' '; echo
dur=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$1"); rows=$(python3 -c "import math;print(max(1,math.ceil($dur*2/10)))")
ffmpeg -y -v error -i "$1" -vf "fps=2,scale=270:480,tile=10x${rows}:padding=4:color=white" -frames:v 1 -q:v 3 review.jpg
ffmpeg -v info -i "$1" -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:" | tail -2 | tr '\n' ' '; echo
