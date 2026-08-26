#!/bin/sh
set -eu
cd "$(dirname "$0")"
mkdir -p out/fonts
cp index.html out/
cp fonts/*.woff2 fonts/OFL.txt out/fonts/
touch out/.nojekyll
echo "Wrote out/"
