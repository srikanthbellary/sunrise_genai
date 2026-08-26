# Sunrise Gen AI — design lock

**Status:** locked by the owner  
**Fold:** approved mock (left copy, circuit sun on a digital horizon)  
**Type:** real self-hosted Geist Sans. The mock’s painted letters are not a font.

This is the only design source for sunrisegenai.com. Do not revert to Orbitron, a black room, billboard type, empty ovals, or a video hero.

---

## What the first screen is

Desktop fold: dark navy void, warm dawn. A **circuit-board sun** rising on a digital horizon (gold/orange traces, teal accents). Light comes from the sun.

- Modest wordmark, top-left: `Sunrise Gen AI` (AI may use `--sun`; same family).
- Human-sized headline, left column: **Production systems for operations and messy knowledge.**
- Two short body lines, then Wellington, Florida.
- Small nav, top-right: Work, Product, Contact.
- Email `sbellary@sunrisegenai.com` small at the bottom of the fold.
- A tiny rising-sun mark is allowed.

This is original Sunrise. Do not mention or imitate other sites in code or comments.

---

## Hero sun (graphic lock)

The circuit sun is **hero only**, built with **Three.js** as a thin layer over the approved fold (`three` is a project dependency). It is a graphic, not a 3D world: one quiet loop (slow drift, light mouse parallax, traces that breathe). No orbit controls, fly-through, spaceship, particle fountain, or HUD.

Owner corrections that override the painted mock:

- **Smaller:** about half the mock’s sun scale. Sit it lower on the horizon. It must not dominate the viewport.
- **Ember, not a spotlight:** no white-hot glare. Warm gold/orange/teal traces. The page stays dark-navy; light is present but not blinding.

Once the user scrolls, **do not** repeat the sun and **do not** use Three.js or any extra 3D. No background images, photos, film stills, canvas fields, or decorative illustrations in later sections.

---

## Type lock

The fold mock painted glyphs. Do not recreate or trace that lettering.

| Token | Spec |
| --- | --- |
| Family | Geist Sans (OFL), files in `public/fonts` |
| Load | `@font-face` only. No runtime Google Fonts CSS |
| Headline | ~36–40px desktop, weight 500–600, normal tracking (not 0.2em+) |
| Body | 16–18px |
| Wordmark | Small, same family |
| Forbidden | Orbitron, painted/traced mock letters, giant viewport-filling words, novelty “AI” cuts |

---

## Color system

Use these as a system — royal, enterprise, tech, digital — not a flat black page and not a poster.

```css
--void: #000818;
--royal: #0a1633;
--indigo: #0d1b3f;
--sun: #D9661C;
--hot: #FAC345;
--teal: #06B6C3;
```

- Void and deeper navy/indigo fields for sections.
- Sun and hot as **signal**: rules, links, small marks.
- Teal as the cool digital accent.
- Enough chroma to feel like a Gen AI firm.

Below the fold: **type + this palette only**.

---

## Page (one scroll)

One page. After the fold:

1. **Work** — two or three short offers in English (not seven tiles).
2. **Product** — OpenStinger only.
3. **Craft** — films as a small text row, not a business unit.
4. **Contact** — `sbellary@sunrisegenai.com`, `440-340-8383`, Wellington, Florida.

Body line for the firm: we design production systems for operations and messy knowledge, and we ship the tools we use.

---

## Hosting

Keep GitHub Pages static export:

- `output: 'export'`
- `trailingSlash: true`
- `images.unoptimized: true`
- Existing `.github/workflows/deploy.yml`

---

## Do not

- Recreate the black-room / billboard / empty-oval / corner-bracket homepage.
- Use video or the causeway clip.
- List Ingre, Ingredient Scanner, LabelSaber, Swaram, Lensort, Job Book, or parked domains.
- Add Hyderabad. No Gmail. No fake case studies.
- Use decorative ovals or rings that mean nothing.

---

## Always

- Start from this lock, not from older docs that named Orbitron.
- Keep the first screen recognizable as the approved fold, with real type and a smaller ember sun.
- Keep later sections quiet: type and color, no second graphic.
