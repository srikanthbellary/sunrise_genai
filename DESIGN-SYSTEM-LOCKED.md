# Sunrise Gen AI — Design System (Locked)

**Status:** Locked  
**Version:** 2.0.0  

This is the agreed homepage specification for this branch. Do not revert to the previous neon / film / Orbitron system.

---

## Stack

- One static HTML page. CSS and inline SVG only.
- Tiny vanilla JavaScript is allowed only to drive SVG stroke or dash-offset motion.
- No Three.js, WebGL, React, Next.js app, GSAP, Lottie, video, raster hero images, or particle fields.
- Self-host IBM Plex Sans (OFL) from `/fonts`. No Orbitron. No remote font CDNs.

The page must remain GitHub Pages-safe: relative asset paths, a static `out/` build, `.nojekyll`.

---

## Palette

Use these as a royal / tech field — not carnival neon:

```css
--void: #000818;   /* dawn / void field */
--sun:  #D9661C;
--hot:  #FAC345;
--teal: #06B6C3;
```

Warm paper (`#E8E2D6`) is permitted for body text on void. Do not introduce extra accent colors.

---

## Typography

- Family: IBM Plex Sans (400 / 500 / 600), self-hosted woff2.
- Wordmark / primary headline: 36–40px. Not one giant word. Not all-caps lockups.
- Body: 16–18px.
- Restraint over spectacle. No painted lettering.

---

## Graphics

- Simple SVG flow diagrams and wireframe paths: thin lines, nodes, arrows.
- Motion: slow dash-offset or path-draw, like a schematic breathing.
- No 3D, orbits, HUD, games, photos, film stills, blob/oval decorations.

---

## Page order (hard lock)

1. **Hero** — Wordmark “Sunrise Gen AI”. Point of view: “Production systems for operations and messy knowledge.” SVG flow in the hero. CTA to contact.
2. **What we do** — Two or three consulting offers in English (production GenAI, RAG/agents, data platforms). Not seven tiles. No fake case studies. A quiet “up to 60% workload reduction on schema / data-pipeline work” line is allowed.
3. **Product** — OpenStinger only (OSS). No Ingredient Scanner, Ingre, LabelSaber, Swaram, Lensort, Job Book, or parked domains.
4. **Media** — One sentence, not a section: Sunrise also does image, video, and audio work using gen AI for content creation. No portfolio, demos, or thumbnails.
5. **Contact** — Wellington, FL. sbellary@sunrisegenai.com. 440-340-8383. No Gmail. No Hyderabad.

---

## Forbidden

- Short films, reels, titles (Apocalyptic Roulette, No Planet For Humans, Arcane Legacy), stills, or YouTube.
- Orbitron, neon agency rooms, student neon, black-void “tech bro” chrome.
- Raster hero images, video backgrounds, Three.js / WebGL heroes.
- Mentions of other companies’ sites or unrelated product brands in code or copy.

---

## Quality

Enterprise, royal, rich, neat, clean. Dawn/void field. Readable type. Sparse color.
