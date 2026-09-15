#!/usr/bin/env bash
# Extract a scroll-scrub frame sequence from the hero plate.
#
#   scripts/extract-hero-frames.sh [source.mp4] [target-frame-count]
#
# Defaults: public/media/atlas-dyson-plate.mp4, 150 frames.
# Writes public/media/hero-scrub/frames/f_0001.webp … and src/lib/heroScrubManifest.json.
# Requires ffmpeg + ffprobe.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${1:-$ROOT/public/media/atlas-dyson-plate.mp4}"
TARGET="${2:-150}"
WIDTH="${WIDTH:-1280}"
QUALITY="${QUALITY:-72}"
OUT_DIR="$ROOT/public/media/hero-scrub/frames"
MANIFEST="$ROOT/src/lib/heroScrubManifest.json"

[ -f "$SRC" ] || { echo "source not found: $SRC" >&2; exit 1; }

DURATION="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$SRC")"
FPS="$(awk -v t="$TARGET" -v d="$DURATION" 'BEGIN { printf "%.4f", t / d }')"

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

# -vsync 0 keeps going on a truncated plate instead of padding with duplicates.
ffmpeg -v error -stats -i "$SRC" \
  -vf "fps=${FPS},scale=${WIDTH}:-2:flags=lanczos" \
  -vsync 0 -c:v libwebp -quality "$QUALITY" -compression_level 6 \
  "$OUT_DIR/f_%04d.webp"

COUNT="$(find "$OUT_DIR" -name 'f_*.webp' | wc -l | tr -d ' ')"
[ "$COUNT" -gt 0 ] || { echo "no frames extracted" >&2; exit 1; }

FIRST="$OUT_DIR/f_0001.webp"
FW="$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$FIRST")"
FH="$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$FIRST")"

cat > "$MANIFEST" <<JSON
{
  "base": "/media/hero-scrub/frames",
  "pattern": "f_{index}.webp",
  "pad": 4,
  "count": $COUNT,
  "width": $FW,
  "height": $FH,
  "sourceDuration": $DURATION,
  "source": "$(basename "$SRC")"
}
JSON

TOTAL_KB="$(du -sk "$OUT_DIR" | cut -f1)"
echo "wrote $COUNT frames (${FW}x${FH}, ${TOTAL_KB} KB) -> $OUT_DIR"
echo "manifest -> $MANIFEST"
