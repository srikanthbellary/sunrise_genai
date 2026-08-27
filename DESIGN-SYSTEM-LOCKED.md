# SUNRISE GEN AI — DESIGN SYSTEM (LOCKED)

**Status**: Current for the competition homepage
**Supersedes**: the December 2024 Orbitron / neon / four-colour lock, which is void.

This file is authoritative. If an older instruction conflicts with it, this file wins.

---

## 1. Palette

```css
--void:       #000816;  /* page field */
--void-deep:  #00040D;  /* deepest bands */
--sun:        #D9661C;  /* primary accent */
--hot:        #FAC345;  /* highlight, italic emphasis, metrics */
--teal:       #06B6C3;  /* signal, taglines, recall paths */
--bone:       #F2EDE4;  /* the light chapter (Ingre) */
--ink:        #0A0C10;  /* type on bone */
```

Off-white text (`rgba(238,234,226,·)`) is part of the system. Neon cyan `#00F5FF`,
orange `#FF6B35`, and yellow `#FFD23F` are **retired**.

---

## 2. Typography — self-hosted, no runtime Google Fonts

| Role | Family | Files |
| --- | --- | --- |
| Display, wordmark, headings | **Cormorant Garamond** (variable 300–700, roman + italic) | `public/fonts/cormorant-garamond-*.woff2` |
| Body, labels, UI | **Source Serif 4** (variable 200–900) | `public/fonts/source-serif-4-*.woff2` |

Both are SIL OFL and committed to this repository. `@font-face` lives in
`src/app/globals.css`; the latin files are preloaded in `src/app/layout.tsx`.

**Forbidden**: Orbitron. Also forbidden as the page's voice: Geist, Inter, IBM Plex,
Arial, `system-ui`, and any default SaaS grotesque. No `<link>` to fonts.googleapis.com.

Small labels are Source Serif 4, uppercase, 600 weight, `letter-spacing: 0.22em`.
Display type is Cormorant at `letter-spacing: -0.012em` — never tight grotesque tracking.

---

## 3. Page order (locked)

1. **Fold** — WebGL dawn hero over `sunrise-causeway.mp4`. Wordmark, headline
   **Enterprise GenAI, built to run.**, subline *Agents, retrieval, and data platforms
   in production.*, tagline *Grounding the Autonomous Era*, and a
   "what we build / what we ship" meta panel.
2. **01 What we do** — scroll-pinned rail of the five **offers** (autonomous agents,
   agents and multi-agent systems, RAG and LLM architecture, data processing with AI,
   platforms and delivery), then the nine-cell capability matrix and the proof strip.
3. **02 OpenStinger** — portable MCP agent memory, with the animated write/recall
   figure. Links to github.com/srikanthbellary/openstinger and openstinger.com.
4. **03 Ingre** — the light chapter. **Ingre is a pitch and must stay on the page.**
   *Scan food and beauty labels. See harmful ingredients.* Android and iOS. ingre.ai.
   Carries two originals: the device scan, and Fig. 03 — an original schematic in the
   same drawn language as the OpenStinger figure, reading scan → parse → flag → call.
5. **04 Media** — a full chapter, not a one-liner: content generation with image, text,
   and video models, for marketing materials, campaigns, and web content. No film
   titles, no reel, no portfolio of shorts.
6. **05 Contact** — Wellington, FL · sbellary@sunrisegenai.com · 440-340-8383.

---

## 4. Content rules

**This is Sunrise Gen AI LLC selling to enterprises. It is not a personal site.**
Capabilities are written as offers — what we deliver for a client — never as a career
history. A principal may be named in the footer; the hero and the offers are the company.

**Never write**, on any page:

- Any past employer as a Sunrise engagement, biography, or case study — including
  Verizon, Cognizant, Circana, Interas, Thermo Fisher, Persistent, CVS, Change
  Healthcare, or McDonald's. They are personal employers, not Sunrise clients.
- A résumé timeline, years-of-experience counts, personal certifications, or "I led".
- Invented Sunrise clients, invented case studies, or logos we do not have.
- The dead hero line "Production systems for operations and messy knowledge", or the
  phrase "messy knowledge" in the hero.
- For Ingre: "Play testing", "Google testing", "Mac Studio", "Flutter",
  "in development", or the old name "LabelSaber". Ingre is a product pitch, not a
  status report.
- Gmail addresses. Hyderabad. A film reel or named short films.
- Job Book, Swaram, Lensort, parked domains, PBL, or study forks.

**Outcome claims** are limited to the two firm ones, and they are framed as what we
deliver, not where anyone worked: *up to 60% less time on schema and mapping work* and
*3× throughput on attribute mapping*.

Every diagram on the page is drawn by us in the house language — hairline grid,
bordered stations, small caps labels, corner ticks, travelling packets. No stock icons,
no illustration packs, no photography of people.

**Always keep**: the five offers, the capability matrix, OpenStinger, Ingre with both of
its graphics, the media chapter, and the Wellington contact block.

---

## 5. Motion

Lenis smooth scroll driven by the GSAP ticker; ScrollTrigger for pinning, wipes, and
scrubs. Signature moments: the preloader collapsing to a slit that the hero aperture
opens from, the pinned consulting rail, the band-dissolve as the hero exits, the light
Ingre chapter rising into full bleed, and the label scan.

Everything degrades: `prefers-reduced-motion` skips the preloader, the custom cursor,
and every scrub; WebGL failure falls back to the poster image; the pinned rail becomes
a native snap-scroller under 900px.

---

## 6. Build

Next.js App Router, `output: 'export'`, `images.unoptimized`, `trailingSlash`. The
existing GitHub Pages workflow builds this branch unchanged. `npm run build` must pass.
