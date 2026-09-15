# Hero mood concept — Dyson rings (2026-09-15)

**Design concept only.** Nothing in this folder is wired into the site. `src/app/page.tsx`
and the live fold are untouched. Whether this becomes a real-time 3D scene or a rendered
video is a later decision; this package fixes the *world*, the *shots*, and the *light*
so either implementation lands in the same place.

Open `contact-sheet.html` locally to view everything on one page (palette, stills,
headline overlay test).

## World (locked)

The camera cruises through the interior of an **outer Dyson ring**. Ahead, through the
ring's aperture, the **sun** — and around it a smaller **inner Dyson ring / swarm** that is
still self-assembling. As we fly, mechanical structure builds itself in frame: hexagonal
collector panels dock into open bays, latches close, truss struts slide home. The flight
ends on a sunrise: the sun cresting the inner ring's mechanical horizon with a single
razor-thin horizontal flare — the brand lockup, seen in the world.

Tone: full sci-fi, hard-surface, cinematic. Enterprise GenAI. Not tourism, not a game
menu, not a dashboard.

## Shot list

| # | File | Brief item | Camera | What is happening | Hero note |
| --- | --- | --- | --- | --- | --- |
| 01 | `01-outer-ring-flythrough.jpg` | (a) flying through outer ring | Inside the outer ring's structural corridor, looking forward along the flight path. Wide lens, slight roll. | Trusses and panel bays stream past on all sides; the sun and the silhouetted inner ring sit in the aperture ahead. Nearest girders carry motion blur. | Opening beat. Headline is *not* readable over this frame; it is the travel, not the landing. |
| 02 | `02-wide-two-rings-sun.jpg` | (b) wide two-ring + sun | Just above the plane of the outer ring, near segment in the lower foreground, sun centred. | Establishing wide. Inner ring is about two-thirds built; a swarm of collector panels streams toward the gaps. Horizontal flare through the sun. | Mid-flight reveal. Also the strongest single "poster" of the world. |
| 03 | `03-self-assembly-docking.jpg` | (c) self-assembly, mechanical | Close on one open bay in the truss lattice, sun off-frame right. | A circuit-etched hexagonal panel drifts the last metre into its bay; latches rotate closed, guide pins align, a strut slides home on rails. Two more panels queue behind. Frozen thruster vapour. | The "it builds itself" beat. This is the shot that sells mechanical honesty. |
| 03b | `03b-self-assembly-manipulators.jpg` | (c) self-assembly, alternate | Overhead of a truss node. | Two articulated manipulators seat a panel; ring curvature and beacons in bokeh behind. | Alternate mechanical detail. One stray cool beacon was retouched to amber (see Provenance). |
| 04 | `04-sunrise-end-frame-flare.jpg` | (d) sunrise / end frame | Skimming the inner ring's plated surface from just above its plane, horizon low in frame, sun slightly right of centre. | Sun crests the mechanical horizon; one thin horizontal anamorphic flare spans the full width. Sunlit plating reveals a faint gold circuit-trace pattern. Outer-ring trusses silhouette the lower corners. | **End frame and hold.** Upper-left two-thirds is clear navy for the headline. This is the poster / reduced-motion still. |

`alt/04-alt-flat-logo-echo.jpg` is the first pass at (d). It is the most literal echo of
the logo lockup (dome, hairline, circuit field) but reads as a flat plane rather than a
ring surface. Kept for reference only; do not implement it as-is.

## Lighting notes

- **One key light: the sun.** Everything is lit by it. No fill lights, no cool
  ambient, no studio rim. Shadow sides fall into navy, not grey.
- **Palette.** Void `#00061A` / `#000816` (page field). Sun core `#FAC345` (hot) with
  corona falling to `#D9661C` (sun). Structure is dark gunmetal that only ever reads
  as *navy-black* or *gold-rimmed*. Practicals (beacons, ports) are warm amber only.
  Retired colours (`#00F5FF`, `#FF6B35`, `#FFD23F`) and the system teal do **not**
  appear anywhere in this world.
- **Rim over form.** Structure is described by hard gold rim light on bevels and edges,
  not by diffuse shading. Aim for silhouettes with lit edges.
- **The flare is horizontal and thin.** A single anamorphic streak at the sun's
  horizon line — the same hairline as the logo. No starbursts, no ghost rings, no
  chromatic rainbow. It should be the only lens artefact in the frame.
- **Exposure.** Sun clips to white-gold; deep shadows stay readable but low. Keep the
  bloom tight; the void must stay void.
- **Texture.** Subtle film grain, no vignette heavier than the natural falloff. Panel
  faces carry the etched gold circuit hairline only where the key light catches them —
  it never self-illuminates.

## Material and structure language

- Hexagonal collector panels, segmented plating, exposed truss lattice, docking bays
  with rotating latches, guide pins, rails, radiator fins, cable runs.
- Gold circuit-trace hairline (from the logo) is an *etched surface pattern* on panel
  faces and sunlit plating. It is never glowing wireframe, never a HUD, never a floor.
- Scale cues: beacons, seam density, and stacked repetition. The rings must feel
  kilometres deep, not model-sized.

## What must stay, whichever way it is built (3D or video)

1. **Camera path.** Inside the outer ring → clear the aperture → wide reveal of sun and
   inner ring → pass a self-assembly beat close enough to see latches → settle and hold
   on the sunrise end frame (shot 04). Roughly 8–12 seconds if linear.
2. **Two rings, one sun.** Outer ring is the one we travel through; inner ring is the
   one that is still assembling. Never invert this.
3. **Self-assembly is mechanical.** Panels dock, latches close, struts lock. No
   dissolves, no particle magic, no energy ribbons pulling parts together.
4. **End frame composition.** Horizon in the lower third, sun slightly right of
   centre, one horizontal flare, clear navy in the upper-left two-thirds for
   *Enterprise GenAI, built to run.* and the subline. Shot 04 is the poster and the
   `prefers-reduced-motion` still.
5. **Palette and light.** Sun as sole key, gold/amber practicals only, no cool light.
6. **Hard bans carry over.** No palace, gates, courtyards, lanterns, palms, glass UI
   slabs, teal energy ribbons, wireframe tech-sun gadget, floor grid. No people. No
   text or UI inside the scene.

Implementation-agnostic guardrails (for whoever picks this up later):

- *If 3D:* instanced panels and trusses, a single directional light plus an emissive sun
  sphere, bloom plus a horizontal streak in post. Ship shot 04 as the poster/fallback.
- *If video:* export at hero aspect, hold the last frame, use shot 04 as the poster
  frame, and keep the file within the existing hero video's budget.
- Either way the headline sits over the *end* frame, not over the flight.

## Provenance

- Generated 2026-09-15 with the in-session image model at 1280×720 (16:9), one pass
  each plus one regeneration pass for shots (c) and (d). The regenerated (c) and (d)
  were stronger and are the primaries; the first (c) is kept as `03b`, the first (d)
  in `alt/`.
- `03b-self-assembly-manipulators.jpg`: one small cyan beacon (top centre) was retinted
  to warm amber at matched luminance. No other retouching on any frame.
- Brand reference used during generation: `public/sunrise-gen-ai-logo.png` (gold sun,
  horizontal hairline, circuit field). No text from it appears in any frame.
- Files are JPEG at source resolution. These are mood and composition references, not
  production plates.
