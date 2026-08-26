# Self-hosted typefaces

Both families ship with this repository and are served from `/fonts/`. No runtime
request is made to Google Fonts or any other third-party host.

| Family | Role | Files | Licence |
| --- | --- | --- | --- |
| Cormorant Garamond (variable, 300–700) | Display, wordmark, headings | `cormorant-garamond-latin.woff2`, `cormorant-garamond-latin-ext.woff2`, `cormorant-garamond-italic-latin.woff2` | SIL Open Font Licence 1.1 |
| Source Serif 4 (variable, 200–900) | Body copy, labels, UI | `source-serif-4-latin.woff2`, `source-serif-4-latin-ext.woff2` | SIL Open Font Licence 1.1 |

- Cormorant Garamond — Christian Thalmann, Catharsis Fonts. <https://github.com/CatharsisFonts/Cormorant>
- Source Serif 4 — Frank Grießhammer, Adobe. <https://github.com/adobe-fonts/source-serif>

The subsets are the standard `latin` and `latin-ext` ranges; `@font-face` blocks with
matching `unicode-range` declarations live in `src/app/globals.css`, and the two latin
files are preloaded from `src/app/layout.tsx`.
