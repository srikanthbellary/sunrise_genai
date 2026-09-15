# Seedance 2.5 reference-to-video prompt — Dyson hero (15 Sep 2026, rev 2)

Prompt engineering only. No video was generated, no Seedance / Atlas API call was made, no
homepage change. Do not run until Srikanth says go.

Rev 2 turns the rev 1 text-to-video prompt into ONE reference-to-video prompt that runs with the
four Fable stills as multi-image refs. The rev 1 T2V prompt is kept verbatim under
[Previous](#previous--rev-1-t2v-prompt-superseded) at the bottom.

## 0. Reference wiring

Seedance addresses references by their position in the request, not by filename. `@Image1` is
the first `reference_image` in the body, `@Image2` the second, and so on. Upload in exactly this
order or every tag in the prompt points at the wrong still. Every ref gets one explicit job in
the prompt; a ref the prompt never names gets blended into the others.

| Tag | File (on PR #35, `mocks/hero-dyson-2026-09-15/`) | Job in the prompt | Deliberately not taken |
| --- | --- | --- | --- |
| `@Image1` | `01-outer-ring-flythrough.jpg` | Camera: FPV inside the outer structure, low angle, forward glide, trusses overhead-left, void right, star ahead right of center. Near truss / panel materials. | The far circles drawn around the star in that still (that is the bullseye). |
| `@Image2` | `02-wide-two-rings-sun.jpg` | Scale relationship only: outer structure huge, star a distant mid-size disk, a second smaller structure clearly visible between them. Dark panel material. | Its camera (outside, looking in), its poster-wide composition, and how close its particle swarm sits to the star. |
| `@Image3` | `03-self-assembly-docking.jpg` | Hexagonal module, docking hardware, clamps, docking lights, the self-assembly action. | Nothing else; its static close-up framing is not the shot. |
| `@Image4` | `04-sunrise-end-frame-flare.jpg` | Closing light: warm orange-gold flare, panel grid catching low raking light. | Its camera. The glide never stops or turns. |

Atlas body shape (four `reference_image` entries after the text, in the order above; keep
`ratio: 16:9`, `generate_audio: false`, `watermark: false`; keep whatever Seedance 2.5 model id
the runner already uses):

```json
{
  "content": [
    { "type": "text", "text": "<PROMPT BELOW>" },
    { "type": "image_url", "image_url": { "url": "<01-outer-ring-flythrough.jpg>" }, "role": "reference_image" },
    { "type": "image_url", "image_url": { "url": "<02-wide-two-rings-sun.jpg>" }, "role": "reference_image" },
    { "type": "image_url", "image_url": { "url": "<03-self-assembly-docking.jpg>" }, "role": "reference_image" },
    { "type": "image_url", "image_url": { "url": "<04-sunrise-end-frame-flare.jpg>" }, "role": "reference_image" }
  ],
  "ratio": "16:9",
  "duration": 15,
  "generate_audio": false,
  "watermark": false
}
```

The `@Image1` form is what fal / Runware / most wrappers document; BytePlus ModelArk's own guide
writes `@Image 1` with a space and accepts both. Match whichever form the runner's provider shows
in its examples. Do not use `[Image 1]` bracket syntax on the Ark body.

## 1. Final prompt (Seedance 2.5 · reference-to-video · 16:9 · 15 s · 4 image refs)

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

Duration fallback (the runner steps 15 s → 10 s → 5 s): rescale the beats, do not drop them.
10 s = `0–3s / 3–7s / 7–10s`. 5 s = delete the three timestamp labels and keep the paragraph;
the geometry lives in the scene paragraph and the closing paragraph, not in the beats.

T2V fallback (refs unavailable): delete the four `@Image` lines and nothing else. The scene
paragraph carries the whole geometry on its own; a dead `@Image` pointer makes the model drop the
clause that carried it, so never send the tags without the files.

## 2. Locked ideas → where they live in the prompt

| Lock | Prompt line(s) |
| --- | --- |
| 1. Rings much, much bigger in diameter than the sun; vast orbital radius; rings would burn if close | "orbits the star at a vast distance", "so wide that from inside the curve is barely visible", "still many times wider than the star", "Nothing built ever comes near the star's glare: the star is a distant lamp, the structures are the room", `@Image2` exclusion "here every structure sits many times farther out". |
| 2. Rings in orbit around the sun, correct orbital geometry | "orbits the star at a vast distance" (outer) and "follows a smaller but still vast orbit of its own" (inner); outer far side is "a hairline arc beyond the star"; inner is "a broad, flattened arc ... seen at a shallow angle ... its far side thinning to a hairline near the star" (an orbit seen obliquely from inside a wider orbit). |
| 3. Outer ring: camera flies through / along it | "FPV inside the outer structure ... gliding forward along it", "We glide fast and steady along the inside", "Camera heading stays along the structure". |
| 4. Inner ring clearly visible from far while cruising the outer | "a second, smaller structure is clearly visible", "sweeping across the lower part of the frame far below and beyond the star", present in all three beats. |
| 5. Sun size: mid-size disk, ~1/6–1/4 frame height, readable but secondary | "about one fifth of the frame height, a clear presence but secondary to the near structure", repeated in the closing lock, "never a tiny dot, never filling the frame". |
| 6. Prior camera wins | Overhead-left / void-right / star ahead right of center (`@Image1` line and scene paragraph); "never turns to face the star"; "clean unbroken disk"; no bullseye / face-on hoop; docking beat at 5–10s; palace / palms / UI are not in the prompt text except `no UI panels`. |

"Ring" as a noun stays out of the prompt (see rev 1's word table, still valid). The two rings
are the "outer structure" and the "inner structure", both described as orbiting the star and as
what the lens sees from inside the outer one: a curved wall with no visible ends, and a broad
flattened arc. That is the only way to draw them that is not a hoop.

## 3. Negatives

Seedance 2.5 has no `negative_prompt` field; negatives live in the prompt text and read most
reliably as the last sentences. Its guide prefers positive phrasing for everything except
subtitles / audio, so every negative below has a positive twin earlier in the prompt.

### Scale-failure negatives (short list, in the tail)

| Failure | Negative in the tail | Positive twin in the body |
| --- | --- | --- |
| Tiny sun (dot) | `never a tiny dot` | "about one fifth of the frame height, a clear presence" |
| Sun filling the canvas | `never filling the frame` | "secondary to the near structure", "wide open black space on every side of it" |
| Rings hugging the sun | `Wide black space always separates the star from everything built; nothing hugs or touches the star` | "orbits the star at a vast distance", "many times wider than the star", `@Image2` "do not copy how close its particles sit to the star" |
| Bullseye overlay | `No bullseye, no concentric circles stamped flat on the star, no face-on hoop` | "never turns to face the star", "curved wall ... with no visible ends", "broad, flattened arc ... running out of frame on both sides", `@Image1` "Do not copy the far circles around the star" |

Plus the standing tail: `no top-down diagram, no poster composition. No text, no subtitles, no
logo, no people, no planets, no UI panels.`

Do not grow this list. Every extra noun in a negative is a seed for that noun; palace, palms,
Earth, dashboards stay out.

### Frame review — reject the take if

- The star is smaller than roughly a tenth of frame height (dot) or larger than roughly a third (wall of light).
- The star is centred, or anything built touches, overlaps, or sits within one star-diameter of its edge.
- Any full circle or ellipse is visible around the star, on the star, or through the star.
- The outer structure reads as a shape you can see whole (hoop, wheel). It must read as a curved wall / ceiling too big to see the ends of.
- The inner structure is missing, is a hairline only, or closes into a visible circle. It must be a broad, flattened arc that exits the frame on both sides.
- The camera is outside the structure looking in (`@Image2` composition leaked), static, or drifting sideways instead of gliding forward.
- The self-assembly is not readable: no module moving, no dock, no clamp close.
- The end frame stops the glide or turns to face the star.

## 4. What changed from rev 1

1. **Multi-image refs wired in.** Four role-bound `@Image` lines open the prompt, each with a
   "use only" scope and an exclusion for the part of the still that would break the shot
   (`@Image1` far circles, `@Image2` composition and swarm-close-to-sun).
2. **Scale gap is now the spine.** Rev 1 said "small in frame" and let the model choose the
   orbit radius. Rev 2 states the orbit is vast, that the inner structure is still many times
   wider than the star, and that nothing built approaches the glare.
3. **Inner ring promoted from hairline to clearly visible.** Rev 1 had it as "a thin unfinished
   inner arc ... cuts a bright hairline". Rev 2 makes it a broad flattened arc seen at a shallow
   angle, present in every beat, exiting the frame on both sides so it can never close into a hoop.
4. **Sun size raised.** Rev 1: "small in frame" and reject if over a fifth of frame *width*.
   Rev 2: about one fifth of frame *height*, a clear presence, with a floor (not a dot) and a
   ceiling (not filling the frame).
5. **End beat uses `@Image4` light without breaking the camera rule.** The near deck sweeps up
   like a horizon and the star sits just above it, whole; the glide continues and the star stays
   right of center and unbroken.
6. **Orbit vocabulary reintroduced, carefully.** Both structures are said to orbit the star
   so the geometry is explicit; "ring", "Dyson", "sphere", "encircle" stay out.

---

## Previous — rev 1 T2V prompt (superseded)

Kept verbatim from PR #36 for comparison. Do not run this one.

```text
16:9, photoreal, one continuous take, no cuts. FPV tracking shot, low angle, steady high-speed glide forward along the inside of a colossal curved orbital megastructure: a sweeping arch of hexagonal solar panels and steel trusses runs overhead and to the left, bending ahead toward a distant vanishing point, like flying along the inside of an enormous curving truss bridge in space. The right side is open to the void. Far ahead, right of center, a brilliant orange-gold star: a clean, unbroken disk, small in frame, open black space around it.

0–5s: panels and truss segments race past above and left. Hard sunlight rakes across brushed metal; long shadows; small teal running lights. Ahead, robotic arms swing a new panel section toward an open gap.
5–10s: we fly beneath the gap as the panel docks: clamps close, docking lights flash, the seam locks. Deep space shows through the unfinished framework.
10–15s: the structure bends right and we follow the bend; its far section thins to a hairline curve that passes beside the star and disappears behind it. Near the star, hundreds of tiny mirrored satellites glint like dust, some still sliding into line; a thin unfinished inner arc of panels, seen nearly edge-on, cuts a bright hairline just below the star. The camera keeps gliding forward; the near structure stays large in frame.

Navy-black void, faint stars, volumetric light through the gaps, IMAX detail, smooth gimbal glide, no camera shake. Camera heading stays along the structure and never turns to face the star. The star stays right of center and stays a clean unbroken disk for the whole shot. No text, no subtitles, no logo, no people, no planets, no UI panels. No bullseye or concentric rings around the star, no top-down diagram, no infographic or poster composition.
```

Rev 1 word table (still applies to rev 2):

| Word / phrase | Why it is gone |
| --- | --- |
| `Dyson` | The model's prior for "Dyson" is a face-on ring around a star. The word alone draws the bullseye. |
| `ring`, `sphere`, `halo`, `encircle`, `around the sun` | Same prior. Replaced by what the lens actually sees: curved wall, arc, hairline beyond the star. |
| `concentric` (as description) | Only appears once, inside the negative. |
| `looking toward the sun` | Turned the camera into a sun-facing wide shot, which is the poster framing. Replaced by "heading stays along the structure and never turns to face the star". |
| `OUTER` / `INNER` (as capitalised labels) | Diagram vocabulary. The model rendered a labelled diagram. Now lower-case role names: outer structure, inner structure. |
| `Enterprise GenAI mood` | Not a visual instruction. Translated into: steady glide, no shake, hard raking light, brushed metal, teal running lights. |
| `palace`, `palms`, `Earth tourism`, `glass UI dashboards` | Stale negatives carried over from a different prompt's failure. Unrelated nouns in a negative are still nouns in the prompt. |
