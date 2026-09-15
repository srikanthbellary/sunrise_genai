# Seedance 2.5 T2V prompt — Dyson hero (15 Sep 2026, rev 3)

Prompt engineering only. No video was generated, no Seedance / Atlas API call was made, no
homepage change. Do not run until Srikanth says go.

Rev 3 is **T2V only, no `@Image` lines**. It patches two failures Srikanth saw in the latest T2V
take: the ring rendered *outside* the sun as a separate object beside it, and the palette came
out washed gray / teal. Rev 2 (reference-to-video with four refs) and rev 1 (first T2V) are kept
verbatim under [Previous](#previous) at the bottom.

## 1. Final T2V prompt (Seedance 2.5 · text-to-video · 16:9 · 15 s · no refs)

```text
16:9, 15 s, photoreal, one continuous take, no cuts.

FPV tracking shot, low angle, steady high-speed glide along the inside of a colossal orbital ring: a structure so wide it takes a vast orbit around a star, with the star at the center of that orbit. The camera rides it and looks forward along it and slightly inward across the orbit, so the star sits ahead and right of center, inside the curve. The ring runs overhead and to the left as a curved wall and ceiling of steel trusses and hexagonal solar panels with no visible ends, bending ahead and to the right around the star. The right side is open toward the center of the orbit, where the star is. The far side of the same ring continues as a thin arc beyond the star, so the star is always between the near wall and the far arc: enclosed by the ring, in front of its far side, never beside it. It is never next to the star and never a separate object floating past it; it wraps all the way around the star at a vast distance, and the star is inside it.

The star: a clean, unbroken disk about one fifth of the frame height, burnt orange at the core and hot gold at the rim, a clear presence but secondary to the near wall, with wide open black space on every side of it. Inside the outer ring, a second, smaller ring follows its own vast orbit around the same star: seen at a shallow angle as a broad, flattened arc of dark panels and glinting mirror satellites sweeping across the lower part of the frame and running out of frame on both sides, its far side thinning to a hairline that passes just below and beyond the star. The star sits above the near edge of that arc and in front of its far edge: inside the inner ring too. Both rings are many times wider than the star, and nothing built ever comes near the star's glare.

Color: deep navy void with faint stars, never gray. The star is the only light source and it is hot: burnt-orange core, golden-yellow corona, warm gold flare. Its light rakes across dark brushed steel and turns every truss edge and panel rim warm gold and amber, with deep navy shadows and rich contrast. Running lights and docking lights are warm amber. Every light in the shot is warm; no gray haze, no cool teal cast.

0–5s: trusses and panels race past overhead and left, their rims blazing gold. Ahead and inward, the wall bends around the star; robotic arms swing a new hexagonal module toward an open gap.
5–10s: we pass beneath the gap as the module docks: clamps close, amber docking lights flash, the seam locks. Through the unfinished framework, the inner arc of satellites glints below the star.
10–15s: the ring keeps bending around the star and we follow the bend; a curved panel deck sweeps up into the lower frame like a horizon, and the star sits just above that edge, still whole and right of center, flaring warm gold across the panel grid. The camera keeps gliding forward; the near wall stays large in frame.

IMAX detail, volumetric golden light through the gaps, smooth gimbal glide, no camera shake. Camera heading stays fixed, forward along the wall and slightly inward; it never pans to face the star head-on. The star stays right of center, a clean unbroken disk about one fifth of the frame height for the whole shot: never a tiny dot, never filling the frame. Wide black space always separates the star from everything built; nothing hugs or touches the star. No bullseye, no concentric circles stamped flat on the star, no face-on hoop, no top-down diagram, no poster composition. No text, no subtitles, no logo, no people, no planets, no UI panels.
```

Drop-in for the runner: replace the `PROMPT` string with the block above, keep `ratio: 16:9`,
`generate_audio: false`, `watermark: false`, no `reference_image` entries.

Duration fallback (the runner steps 15 s → 10 s → 5 s): rescale the beats, do not drop them.
10 s = `0–3s / 3–7s / 7–10s`. 5 s = delete the three timestamp labels and keep the paragraph;
the geometry lives in the first two paragraphs and the closing paragraph, not in the beats.

## 2. What Srikanth's feedback changed

### Fix 1 — the sun is INSIDE the ring

The rev 2 T2V take drew the ring beyond the sun as a separate object beside it. Rev 3 states the
enclosure five ways, in geometry the lens can see rather than as a label:

| Line | What it fixes |
| --- | --- |
| "a vast orbit around a star, with the star at the center of that orbit" | Orbit geometry: star at the center, ring around it. |
| "looks forward along it and slightly inward across the orbit, so the star sits ahead and right of center, inside the curve" | Explains *why* the star is right of center: the camera is yawed inward from the ring's tangent, toward the orbit's center. The open right side faces the star. |
| "The far side of the same ring continues as a thin arc beyond the star, so the star is always between the near wall and the far arc" | The single strongest cue of enclosure: near wall on one side of the star, far arc on the other. |
| "never next to the star and never a separate object floating past it; it wraps all the way around the star at a vast distance, and the star is inside it" | Direct denial of the failure, then the positive restatement. |
| "The star sits above the near edge of that arc and in front of its far edge: inside the inner ring too" | Same enclosure for the inner ring, read as near-edge-below / far-edge-behind. |

`ring` is back in the prompt (rev 1 and rev 2 kept it out because the word's prior is a face-on
bullseye). The trade is deliberate: without refs, "structure" gave the model no reason to wrap
the object around the star, and the take failed in the *opposite* direction. The bullseye is
now held off by the camera-first framing (FPV inside, wall overhead-left, star off-center,
heading never faces the star) plus the unchanged tail (`no face-on hoop, no concentric circles
stamped flat on the star`). `Dyson`, `sphere`, `encircle`, `halo` stay out.

Vast radius is kept: "so wide it takes a vast orbit", "at a vast distance", "many times wider than
the star", "nothing built ever comes near the star's glare", and the far arc is "thin" while the
near wall has "no visible ends".

### Fix 2 — warm Sunrise palette, not bleak

| Rev 2 T2V wording | Rev 3 wording |
| --- | --- |
| "Navy-black void" | "deep navy void with faint stars, never gray" |
| "orange-gold disk" | "burnt orange at the core and hot gold at the rim" (the `--sun #D9661C` / `--hot #FAC345` pair, described in words so nothing renders as on-screen text) |
| "hard raking orange-gold light, long shadows" | "rakes across dark brushed steel and turns every truss edge and panel rim warm gold and amber, with deep navy shadows and rich contrast" |
| "small teal running lights" | "Running lights and docking lights are warm amber" — teal removed entirely; it was seeding the cool cast |
| — | "The star is the only light source and it is hot", "Every light in the shot is warm", "volumetric golden light", "rims blazing gold" |
| — | one short palette negative: "no gray haze, no cool teal cast" |

The hex codes are not in the prompt on purpose: Seedance reads them weakly as color and
sometimes strongly as text to draw. The words carry the palette; the doc carries the codes.

## 3. Negatives

Seedance 2.5 has no `negative_prompt` field; negatives live in the prompt text and read most
reliably as the last sentences. Every negative below has a positive twin earlier in the prompt.

### Geometry and scale failures (tail)

| Failure | Negative | Positive twin |
| --- | --- | --- |
| Ring beside / outside the sun | "never next to the star and never a separate object floating past it" | "star at the center of that orbit", "star is always between the near wall and the far arc", "the star is inside it" |
| Tiny sun (dot) | `never a tiny dot` | "about one fifth of the frame height, a clear presence" |
| Sun filling the canvas | `never filling the frame` | "secondary to the near wall", "wide open black space on every side of it" |
| Rings hugging the sun | `Wide black space always separates the star from everything built; nothing hugs or touches the star` | "at a vast distance", "many times wider than the star" |
| Bullseye overlay | `No bullseye, no concentric circles stamped flat on the star, no face-on hoop` | "never pans to face the star head-on", "curved wall ... with no visible ends", inner arc "running out of frame on both sides" |
| Bleak / gray / teal | `no gray haze, no cool teal cast` | "deep navy void ... never gray", "Every light in the shot is warm", amber lights |

Plus the standing tail: `no top-down diagram, no poster composition. No text, no subtitles, no
logo, no people, no planets, no UI panels.` Palace, palms, Earth, dashboards stay out; unrelated
nouns in a negative are still nouns in the prompt.

### Frame review — reject the take if

- The ring is beside the sun, beyond the sun, or reads as an object the sun is *not* inside. The near wall must be on one side of the star and a thin far arc on the other.
- The right side of frame is closed by structure (the camera is looking outward, not inward).
- The star is smaller than roughly a tenth of frame height or larger than roughly a third.
- The star is centred, or anything built touches, overlaps, or sits within one star-diameter of its edge.
- Any full circle or ellipse is visible around the star, on the star, or through the star.
- The outer ring reads as a shape you can see whole (hoop, wheel). It must read as a curved wall / ceiling too big to see the ends of.
- The inner ring is missing, is a hairline only, or closes into a visible circle.
- The void is gray, the metal is neutral silver, or any light is teal / cyan / white. Highlights must be gold and amber; shadows navy.
- The camera is outside the ring looking in, static, or drifting sideways instead of gliding forward.
- The self-assembly is not readable: no module moving, no dock, no clamp close.

---

## Previous

### Rev 2 — reference-to-video prompt (superseded; needs four refs)

Ran with the Fable stills in this order: `@Image1` = `01-outer-ring-flythrough.jpg`,
`@Image2` = `02-wide-two-rings-sun.jpg`, `@Image3` = `03-self-assembly-docking.jpg`,
`@Image4` = `04-sunrise-end-frame-flare.jpg` (stills on PR #35), each as a `reference_image`
after the text in the Atlas `content` array. Dead `@Image` pointers make the model drop the
clause, so never send these tags without the files.

```text
16:9, 15 s, photoreal, one continuous take, no cuts.

@Image1 defines the camera and the near structure: FPV inside the outer structure, low angle, gliding forward along it, trusses and hexagonal panels overhead and to the left, the void open on the right, the star ahead and right of center. Use only the camera position, lens, motion, and the near truss and panel materials. Do not copy the far circles around the star in that image.
@Image2 defines the scale relationship only: the built structures are vastly wider than the star, the star is a distant mid-size disk, and a second, smaller structure is clearly visible between the outer structure and the star. Use only that scale and the dark panel material. Do not use its camera position or its outside-looking-in composition, and do not copy how close its particles sit to the star: here every structure sits many times farther out.
@Image3 defines the hexagonal panel module, the docking hardware, clamps and docking lights, and the self-assembly action. Use only the module structure, material, and mechanism.
@Image4 defines the closing light: warm orange-gold flare and a panel grid catching low raking light. Use only the lighting, flare, and color; do not change the camera.

We glide fast and steady along the inside of a colossal outer structure that orbits the star at a vast distance. Its orbit is so wide that from inside the curve is barely visible: it reads as a curved wall and ceiling of steel trusses and hexagonal solar panels with no visible ends, running overhead and to the left and bending gently ahead toward a distant vanishing point; its far side is a hairline arc beyond the star. The right side is open to the void. Far ahead, right of center, the star: a clean, unbroken orange-gold disk about one fifth of the frame height, a clear presence but secondary to the near structure, with wide open black space on every side of it. Between the outer structure and the star, the inner structure follows a smaller but still vast orbit of its own: a broad, flattened arc of dark panels and glinting mirror satellites, seen at a shallow angle, sweeping across the lower part of the frame far below and beyond the star, running out of frame on both sides, its far side thinning to a hairline near the star. It is inner only next to the outer structure; it is still many times wider than the star, with wide black space between it and the star's edge. Nothing built ever comes near the star's glare: the star is a distant lamp, the structures are the room. Materials and lighting match the references throughout: dark brushed steel, hexagonal panels with fine gold circuit lines, hard raking orange-gold light, long shadows, small teal running lights.

0–5s: trusses and panels race past overhead and left. Ahead, robotic arms swing a new hexagonal module toward an open gap. Low ahead, the inner structure's broad arc glints in the light.
5–10s: we pass beneath the gap as the module docks: clamps close, docking lights flash, the seam locks. Through the unfinished framework, deep space and the inner structure's arc of satellites stay clearly visible far below the star.
10–15s: the outer structure bends right and we bank gently with it; a curved panel deck sweeps up into the lower frame like a horizon. The star sits just above that edge, still whole and right of center, and its light flares warm gold across the panel grid. The camera keeps gliding forward; the near structure stays large in frame.

Navy-black void, faint stars, volumetric light through the gaps, IMAX detail, smooth gimbal glide, no camera shake. Camera heading stays along the structure and never turns to face the star. The star stays right of center, a clean unbroken disk about one fifth of the frame height for the whole shot: never a tiny dot, never filling the frame. Wide black space always separates the star from everything built; nothing hugs or touches the star. No bullseye, no concentric circles stamped flat on the star, no face-on hoop, no top-down diagram, no poster composition. No text, no subtitles, no logo, no people, no planets, no UI panels.
```

Why it was superseded: run as T2V (refs stripped), "structure" gave the model nothing to wrap
around the star, and it drew the ring beside the sun. "The right side is open to the void" also
pointed the open side away from the star. Teal running lights seeded the cool cast.

### Rev 1 — first T2V prompt (superseded)

From PR #36. Failed on the Atlas run with sun-centred concentric rings (bullseye).

```text
16:9, photoreal, one continuous take, no cuts. FPV tracking shot, low angle, steady high-speed glide forward along the inside of a colossal curved orbital megastructure: a sweeping arch of hexagonal solar panels and steel trusses runs overhead and to the left, bending ahead toward a distant vanishing point, like flying along the inside of an enormous curving truss bridge in space. The right side is open to the void. Far ahead, right of center, a brilliant orange-gold star: a clean, unbroken disk, small in frame, open black space around it.

0–5s: panels and truss segments race past above and left. Hard sunlight rakes across brushed metal; long shadows; small teal running lights. Ahead, robotic arms swing a new panel section toward an open gap.
5–10s: we fly beneath the gap as the panel docks: clamps close, docking lights flash, the seam locks. Deep space shows through the unfinished framework.
10–15s: the structure bends right and we follow the bend; its far section thins to a hairline curve that passes beside the star and disappears behind it. Near the star, hundreds of tiny mirrored satellites glint like dust, some still sliding into line; a thin unfinished inner arc of panels, seen nearly edge-on, cuts a bright hairline just below the star. The camera keeps gliding forward; the near structure stays large in frame.

Navy-black void, faint stars, volumetric light through the gaps, IMAX detail, smooth gimbal glide, no camera shake. Camera heading stays along the structure and never turns to face the star. The star stays right of center and stays a clean unbroken disk for the whole shot. No text, no subtitles, no logo, no people, no planets, no UI panels. No bullseye or concentric rings around the star, no top-down diagram, no infographic or poster composition.
```

Words still kept out of every revision: `Dyson`, `sphere`, `halo`, `encircle`, capitalised
`OUTER` / `INNER` labels, `Enterprise GenAI mood`, `palace`, `palms`, `Earth tourism`,
`glass UI dashboards`. Rev 3 re-admits `ring` (see §2, Fix 1) and drops `teal`.
