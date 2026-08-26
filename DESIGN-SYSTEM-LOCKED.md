# Sunrise Gen AI Design System

**Status**: LOCKED  
**Date**: 25–26 August 2026  
**Supersedes**: December 2024 lock (Orbitron-everywhere, neon `#00F5FF` / `#FF6B35`, all-caps tracking, logo-as-hero, “Cutting-Edge AI Solutions,” LabelSaber / Swaram / Lensort, video causeway hero)

Srikanth Bellary authorized this replacement on 25 August 2026. The December lock *is* the college look. Do not revert to it.

---

## Host (do not change)

- Next.js `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`
- Existing GitHub Pages workflow → sunrisegenai.com
- No Vercel. No backend. No paid CDN. No new huge video.
- Self-host OFL/SIL fonts in `public/fonts`
- GSAP + Lenis are the motion stack. Small client-only libraries are allowed only if `next build` static export still succeeds.

---

## Hero — original graphics, never video

**There is no hero video.** Do not restore `sunrise-causeway.mp4`, a poster, or any clip as background or fallback.

The hero is an original full-viewport WebGL field (one fullscreen quad, no three.js):

- Atmospheric sunrise built from the mark colors (void, sun, hot, teal)
- A living topographic / intelligence field (contour lines + sparse plus-marks), not particles
- Architectural: light, type, space. Controlled. Expensive.
- Intro is cinematic (horizon reveal, then type). First 10 seconds must shock from craft.

**Forbidden in the hero (and the page):**

- Video, poster-as-hero, stock Lottie
- Particle playgrounds, spaceship, synthwave grid race, bouncy orbs, gamified HUD
- Circuit-grid wallpaper, glow soup, bounce, student neon
- three.js toy scenes

`prefers-reduced-motion: reduce` → static first frame, no intro, no pin/scrub. If WebGL fails, a CSS sunrise gradient — still not a video.

Phone: keep the sun weighted to the right (compositional heir of the old 85% crop). No `object-position` video crop.

---

## Color

Accents from the real mark, used as light — not carnival neon.

```css
:root {
  --void: #000818;
  --void-deep: #000000;
  --paper: #E8E2D6;
  --paper-dim: rgba(232, 226, 214, 0.55);
  --sun: #D9661C;
  --hot: #FAC345;
  --teal: #06B6C3;
}
```

- Body text is **paper on void**, not teal-on-navy.
- Sun / hot / teal appear as light, hairlines, and links.
- No `#00F5FF`, no `#FF6B35` neon lock.

---

## Type

- **UI / body**: Geist (self-hosted, SIL OFL) — one grotesque. Never Orbitron as the body font.
- **One display line**: Instrument Serif italic (self-hosted, SIL OFL). Only one role. Never set paragraphs in a display or sci-fi mono.
- Sentence case. Tight tracking on large Geist. No all-caps chapter chrome (`01 —`, `02 —`).
- Header is **title-only**: the wordmark is the name, set in type. No giant logo-as-the-page. Logo files may exist for favicon only.

---

## Motion

Polar26 energy, Sunrise material:

- Pinned sequences, clip-path wipes, a horizontal craft reel
- Custom cursor and magnetic targets only when they feel expensive (no elastic bounce)
- Quiet page grain is fine; particle fields are not
- Desktop pins; mobile stacks or native horizontal snap — do not pin-jank on a phone

---

## Content

- **Company**: Sunrise Gen AI LLC, Wellington, FL only. No Hyderabad.
- **Contact**: `sbellary@sunrisegenai.com`, `440-340-8383`. No `sunrisegenai@gmail.com` on the page.
- **Point of view** (one, not a manifesto): we design production systems for operations and messy knowledge, and we ship the tools we use.
- **Consulting**: two or three offers in plain English. No seven interchangeable tiles. No agentic-ops / RAG / pipelines / multi-cloud / mainframe / LLM / ARB laundry list.
- **Product on the homepage**: OpenStinger only (OSS — GitHub + openstinger.com). Ingredient Scanner / Ingre / LabelSaber / Swaram / Lensort / Job Book stay off this page.
- **Films** (Apocalyptic Roulette, No Planet For Humans, Arcane Legacy): horizontal craft reel — proof of taste, not a fourth business unit.
- **60%** schema / data-pipeline line may remain as a quiet sentence, not a giant badge.
- No fake case studies, invented client logos, or parked domains.

---

## Quality bar

A VP should take a meeting **and** a designer should feel the craft. The site is the demo of technical and creative power on static GitHub Pages. Tasteful brochure = fail. Student neon = fail. Game demo = fail.

---

*Locked 26 August 2026. Deviations require Srikanth Bellary.*
