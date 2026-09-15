# Seedance 2.5 T2V prompt — Dyson hero (15 Sep 2026)

Prompt engineering only. No video was generated, no API call was made, no homepage change.
T2V only per Srikanth; the still / look-lock and I2V variants were dropped.

Supersedes the "Use this" draft in `ATLAS-PROMPT-CORRECTED.md` and the `PROMPT` string in
`run_atlas_dyson_swarm.py`. Drop-in: replace `PROMPT` with the block below, keep
`ratio: 16:9`, `generate_audio: false`, `watermark: false`. Do not run until Srikanth says go.

## 1. T2V prompt (Seedance 2.5 · text-to-video · 16:9 · 15 s)

```text
16:9, photoreal, one continuous take, no cuts. FPV tracking shot, low angle, steady high-speed glide forward along the inside of a colossal curved orbital megastructure: a sweeping arch of hexagonal solar panels and steel trusses runs overhead and to the left, bending ahead toward a distant vanishing point, like flying along the inside of an enormous curving truss bridge in space. The right side is open to the void. Far ahead, right of center, a brilliant orange-gold star: a clean, unbroken disk, small in frame, open black space around it.

0–5s: panels and truss segments race past above and left. Hard sunlight rakes across brushed metal; long shadows; small teal running lights. Ahead, robotic arms swing a new panel section toward an open gap.
5–10s: we fly beneath the gap as the panel docks: clamps close, docking lights flash, the seam locks. Deep space shows through the unfinished framework.
10–15s: the structure bends right and we follow the bend; its far section thins to a hairline curve that passes beside the star and disappears behind it. Near the star, hundreds of tiny mirrored satellites glint like dust, some still sliding into line; a thin unfinished inner arc of panels, seen nearly edge-on, cuts a bright hairline just below the star. The camera keeps gliding forward; the near structure stays large in frame.

Navy-black void, faint stars, volumetric light through the gaps, IMAX detail, smooth gimbal glide, no camera shake. Camera heading stays along the structure and never turns to face the star. The star stays right of center and stays a clean unbroken disk for the whole shot. No text, no subtitles, no logo, no people, no planets, no UI panels. No bullseye or concentric rings around the star, no top-down diagram, no infographic or poster composition.
```

Duration fallback (the runner steps 15 s → 10 s → 5 s): rescale the beats, do not drop them.
10 s = `0–3s / 3–7s / 7–10s`. 5 s = delete the three timestamp labels and keep the paragraph;
the geometry lives in the opening and closing paragraphs, not in the beats.

## 2. Negatives / anti-patterns

### In-prompt negative tail

Seedance 2.5 has no `negative_prompt` field in the Atlas body; negatives live in the prompt
text and read most reliably as the last sentences. The tail above is deliberately short and
aimed at the one failure that matters:

- `No bullseye or concentric rings around the star`
- `no top-down diagram`
- `no infographic or poster composition`
- `No text, no subtitles, no logo, no people, no planets, no UI panels`

Do not grow this list. Every extra noun in a negative is a seed for that noun.

### Words kept out of the prompt on purpose

| Word / phrase | Why it is gone |
| --- | --- |
| `Dyson` | The model's prior for "Dyson" is a face-on ring around a star. The word alone draws the bullseye. |
| `ring`, `sphere`, `halo`, `encircle`, `around the sun` | Same prior. Replaced by what the lens actually sees: arch, curve, hairline that disappears behind the star. |
| `concentric` (as description) | Only appears once, inside the negative. |
| `looking toward the sun`, `cruises through ... while looking toward` | Turned the camera into a sun-facing wide shot, which is the poster framing. Replaced by "heading stays along the structure and never turns to face the star". |
| `OUTER` / `INNER` (as capitalised labels) | Diagram vocabulary. The model rendered a labelled diagram. Inner and outer are now described as near-large and far-hairline. |
| `Enterprise GenAI mood` | Not a visual instruction. Translated into: steady glide, no shake, hard raking light, brushed metal, teal running lights. |
| `palace`, `palms`, `Earth tourism`, `glass UI dashboards` | Stale negatives carried over from a different prompt's failure. Unrelated nouns in a negative are still nouns in the prompt. |

### Frame review — reject the take if

- The star is centred, or larger than roughly a fifth of frame width.
- Any full circle or ellipse is visible around the star, on the star, or through the star.
- The structure reads as a shape you can see whole (a ring, a hoop, a wheel). It must read as a curved wall/ceiling too big to see the ends of.
- The camera is outside the structure looking at it (poster wide shot), static, or drifting sideways instead of gliding forward.
- The image looks like a top-down diagram, infographic, or flat-lit render.
- The inner arc near the star is a visible circle rather than a thin edge-on hairline.
- Panels are static. At least one docking event must be visible.

## 3. Why this beats the failed prompt

1. **Camera first, star last.** The failed prompt spent its first 20–30 words on "OUTER Dyson ring ... looking toward a brilliant orange-gold sun". Seedance locks subject and framing from the opening, so it locked "ring + sun" and drew the bullseye. The new opening is the FPV move and the structure overhead-left; the star arrives as a small, off-centre, unbroken disk.
2. **Geometry is described as what the lens sees, not as nouns.** "Ring" becomes an arch that runs overhead, bends ahead, thins to a hairline, and disappears behind the star. The only way to draw that is edge-on or oblique.
3. **The words with the bad prior are gone.** No `Dyson`, `ring`, `sphere`, `encircle`, `around`. The failed prompt used the ring noun three times and the model obliged.
4. **Timestamped beats separate camera motion from subject motion.** Camera is one axis (constant forward glide, heading fixed along the structure). Self-assembly is the other (arms swing, panel docks, clamps close) and gets its own 5-second slot instead of a parenthetical.
5. **Negatives are short, last, and aimed at the actual failure.** Bullseye, concentric, top-down diagram, poster composition. The stale palace/palms/Earth/dashboard negatives are removed so they stop seeding the frame.
