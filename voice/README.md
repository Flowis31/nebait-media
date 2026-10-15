# Озвучка ElevenLabs

`requests/NAME.txt` — текст, который сессия сборки отправила на озвучку (`tools/voice_get.sh`).
`out/NAME.mp3` + `out/NAME.json` — голос и посимвольные тайминги, их кладёт GitHub Actions (`.github/workflows/voice.yml`, `tools/eleven_tts.py`).
`out/NAME.error.txt` — почему не получилось (нет секрета, кончились символы, ошибка API).

Голос и настройки: `tools/elevenlabs.json`. Ключ: секрет репозитория `ELEVENLABS_API_KEY` (Settings → Secrets and variables → Actions).
