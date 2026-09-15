import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

/**
 * The digital palace: a procedural Three.js world the scroll scrubs a camera through.
 * Hall of columns and pointed arches -> open court with a reflecting pool -> the great
 * gate -> a causeway of palms -> the sun clearing the horizon with the wordmark's flare.
 *
 * Everything is generated at runtime from geometry and GLSL. No textures, no models,
 * no network. Lighting is a hand-rolled shader: lantern points, the rising sun, a sky
 * gradient, and gold circuit filigree drawn in world space (the lower half of the logo).
 */

/** Lantern lights sampled per fragment. The nearest lanterns to the camera fill these. */
const NL = 12

const VOID = new THREE.Color('#000816')

const GLSL_COMMON = /* glsl */ `
  #define NL ${NL}
  uniform float uTime;
  uniform float uDawn;
  uniform float uRise;
  uniform vec3 uSunPos;
  uniform vec3 uCamPos;
  uniform vec3 uLanterns[NL];
  uniform float uLanternGlow[NL];

  const vec3 VOID = vec3(0.0, 0.031, 0.086);
  const vec3 SUN  = vec3(0.851, 0.400, 0.110);
  const vec3 HOT  = vec3(0.980, 0.765, 0.271);
  const vec3 GOLD = vec3(0.900, 0.600, 0.220);

  float hash21(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
      mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // Sky by direction. Navy night that warms along the horizon toward +Z as dawn rises.
  vec3 skyColor(vec3 d, float dawn) {
    float y = d.y;
    vec3 flat_ = normalize(vec3(d.x, 0.0, d.z) + vec3(0.0, 0.0, 1e-4));
    float az = max(flat_.z, 0.0);
    float az3 = pow(az, 3.0);
    vec3 col = mix(vec3(0.016, 0.05, 0.12), VOID, smoothstep(-0.02, 0.5, y));
    float band = exp(-max(y, 0.0) * 7.0);
    float haze = exp(-max(y, 0.0) * 2.3);
    col += mix(SUN, HOT, 0.45) * band * (0.18 + 0.82 * az3) * dawn * 1.15;
    col += mix(SUN, HOT, 0.5) * haze * (0.15 + 0.85 * az3) * dawn * 0.5;
    col += vec3(0.10, 0.09, 0.16) * haze * dawn * 0.5;
    col = mix(col, vec3(0.004, 0.012, 0.03), smoothstep(0.0, -0.06, y));
    return col;
  }

  // Circuit filigree in the logo's language: sparse long orthogonal runs that break
  // into segments, a pad wherever a run stops, a ring where two runs cross.
  float circuit(vec2 p) {
    vec2 id = floor(p);
    vec2 f = fract(p) - 0.5;
    float w = 0.04;
    float aa = fwidth(p.x) * 0.9 + 0.004;

    float rowOn = step(0.74, hash21(vec2(0.0, id.y) + 11.0));
    float colOn = step(0.80, hash21(vec2(id.x, 0.0) + 23.0));
    float hereH = rowOn * step(0.18, hash21(id + 5.0));
    float hereV = colOn * step(0.18, hash21(id + 9.0));
    float prevH = rowOn * step(0.18, hash21(id - vec2(1.0, 0.0) + 5.0));
    float nextH = rowOn * step(0.18, hash21(id + vec2(1.0, 0.0) + 5.0));
    float prevV = colOn * step(0.18, hash21(id - vec2(0.0, 1.0) + 9.0));
    float nextV = colOn * step(0.18, hash21(id + vec2(0.0, 1.0) + 9.0));

    float lh = hereH * (1.0 - smoothstep(w - aa, w + aa, abs(f.y))) * max(step(f.x, 0.0) * prevH, step(0.0, f.x) * nextH);
    float lv = hereV * (1.0 - smoothstep(w - aa, w + aa, abs(f.x))) * max(step(f.y, 0.0) * prevV, step(0.0, f.y) * nextV);

    float d = length(f);
    float endH = hereH * (1.0 - prevH * nextH);
    float endV = hereV * (1.0 - prevV * nextV);
    float pad = (1.0 - smoothstep(0.06 - aa, 0.075 + aa, d)) * max(endH, endV);
    float ring = (1.0 - smoothstep(0.012, 0.03 + aa, abs(d - 0.11))) * hereH * hereV;
    float dot_ = (1.0 - smoothstep(0.025, 0.04 + aa, d)) * step(0.965, hash21(id + 31.0)) * (1.0 - hereH) * (1.0 - hereV);
    return max(max(lh, lv), max(max(pad, ring), dot_));
  }

  vec3 fogColor(vec3 world, float dawn) {
    return mix(VOID * 0.85, mix(SUN, HOT, 0.4) * 0.5, dawn * smoothstep(-16.0, 22.0, world.z));
  }

  vec3 tone(vec3 c) {
    return 1.0 - exp(-c * 1.35);
  }
`

const WORLD_VERT = /* glsl */ `
  varying vec3 vWorld;
  varying vec3 vNormal;
  void main() {
    #ifdef USE_INSTANCING
      mat4 m = modelMatrix * instanceMatrix;
    #else
      mat4 m = modelMatrix;
    #endif
    vec4 wp = m * vec4(position, 1.0);
    vWorld = wp.xyz;
    vNormal = normalize(mat3(m) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`

const STONE_FRAG =
  GLSL_COMMON +
  /* glsl */ `
  uniform vec3 uBase;
  uniform float uPattern;
  uniform float uScale;
  uniform float uPolish;
  uniform float uBand;
  varying vec3 vWorld;
  varying vec3 vNormal;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 toCam = uCamPos - vWorld;
    float dist = length(toCam);
    vec3 V = toCam / max(dist, 1e-4);
    if (dot(N, V) < 0.0) N = -N;

    float grain = vnoise(vWorld.xz * 1.9 + vWorld.y * 1.3) * 0.6 + vnoise(vWorld.xy * 4.0 + vWorld.z) * 0.4;
    vec3 base = uBase * (0.78 + 0.44 * grain);

    float up = N.y * 0.5 + 0.5;
    vec3 col = base * mix(vec3(0.35, 0.42, 0.62), vec3(0.85, 0.92, 1.1), up) * 0.8;

    float lamp = 0.0;
    for (int i = 0; i < NL; i++) {
      vec3 L = uLanterns[i] - vWorld;
      float d2 = dot(L, L);
      float att = 1.0 / (1.0 + d2 * 0.16);
      float ndl = max(dot(N, L * inversesqrt(d2 + 1e-4)), 0.0) * 0.75 + 0.25;
      lamp += att * ndl * uLanternGlow[i];
    }
    col += base * mix(GOLD, HOT, 0.4) * lamp * 3.0 + mix(SUN, GOLD, 0.5) * lamp * 0.4;

    // The sun only reaches surfaces beyond the gate: a cheap stand-in for shadowing.
    float outside = smoothstep(9.0, 15.0, vWorld.z);
    vec3 sunDir = normalize(uSunPos - vWorld);
    col += base * mix(SUN, HOT, 0.55) * max(dot(N, sunDir), 0.0) * uRise * outside * 2.2;
    col += base * mix(SUN, HOT, 0.3) * uDawn * outside * 0.35 * up;
    float rim = pow(1.0 - max(dot(N, V), 0.0), 3.0);
    col += mix(SUN, HOT, 0.5) * rim * max(-V.z, 0.0) * uDawn * outside * 0.35;

    if (uPolish > 0.0) {
      vec3 R = reflect(-V, N);
      float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
      col += skyColor(R, uDawn) * fres * uPolish * (0.35 + 0.65 * outside);
    }

    vec2 pc = abs(N.y) > 0.6 ? vWorld.xz : (abs(N.x) > 0.6 ? vWorld.zy : vWorld.xy);
    float fil = circuit(pc * uScale);
    float pulse = 0.55 + 0.45 * sin(vWorld.z * 0.5 - uTime * 1.5 + vWorld.x * 0.3);
    float packet = smoothstep(0.93, 1.0, fract(vWorld.z * 0.12 - uTime * 0.28 + hash21(floor(pc * uScale)) * 0.6));
    float band = uBand > 0.0 ? mix(0.18, 1.0, 1.0 - smoothstep(uBand * 0.55, uBand, abs(vWorld.x))) : 1.0;
    float near = 1.0 - smoothstep(28.0, 75.0, dist);
    float glow = uPattern * band * near * (0.28 + 0.42 * pulse + 1.6 * packet);
    col += mix(GOLD, HOT, 0.5) * fil * glow;

    float f = 1.0 - exp(-dist * dist * 0.00021);
    col = mix(col, fogColor(vWorld, uDawn), f);

    gl_FragColor = vec4(tone(col), 1.0);
  }
`

const WATER_FRAG =
  GLSL_COMMON +
  /* glsl */ `
  varying vec3 vWorld;
  varying vec3 vNormal;

  void main() {
    vec3 toCam = uCamPos - vWorld;
    float dist = length(toCam);
    vec3 V = toCam / max(dist, 1e-4);

    float t = uTime * 0.32;
    float e = 0.35;
    vec2 q = vWorld.xz * 0.85;
    float n0 = vnoise(q + t) * 0.7 + vnoise(q * 2.3 - t * 1.3) * 0.3;
    float nx = vnoise(q + vec2(e, 0.0) + t) * 0.7 + vnoise((q + vec2(e, 0.0)) * 2.3 - t * 1.3) * 0.3;
    float nz = vnoise(q + vec2(0.0, e) + t) * 0.7 + vnoise((q + vec2(0.0, e)) * 2.3 - t * 1.3) * 0.3;
    vec3 N = normalize(vec3((n0 - nx) / e * 0.09, 1.0, (n0 - nz) / e * 0.09));

    vec3 R = reflect(-V, N);
    R.y = abs(R.y);
    float fres = 0.04 + 0.96 * pow(1.0 - max(dot(N, V), 0.0), 4.0);
    vec3 col = vec3(0.004, 0.02, 0.045);
    // The court pool holds a little teal under the lanterns, the water court of the piece.
    col += vec3(0.01, 0.07, 0.085) * (1.0 - smoothstep(6.0, 12.0, vWorld.z));
    col += skyColor(R, uDawn) * (0.5 + 0.5 * fres);

    vec3 sunDir = normalize(uSunPos - vWorld);
    float sd = max(dot(R, sunDir), 0.0);
    col += mix(SUN, HOT, 0.6) * (pow(sd, 40.0) * 1.1 + pow(sd, 400.0) * 4.0) * uRise;

    for (int i = 0; i < NL; i++) {
      vec3 L = uLanterns[i] - vWorld;
      float d2 = dot(L, L);
      vec3 Ld = L * inversesqrt(d2 + 1e-4);
      float g = pow(max(dot(R, Ld), 0.0), 50.0);
      col += mix(GOLD, HOT, 0.5) * g * uLanternGlow[i] * 3.0 / (1.0 + d2 * 0.02);
      col += GOLD * uLanternGlow[i] * 0.06 / (1.0 + d2 * 0.4);
    }

    float f = 1.0 - exp(-dist * dist * 0.00012);
    col = mix(col, fogColor(vWorld, uDawn), f);
    gl_FragColor = vec4(tone(col), 1.0);
  }
`

const SKY_VERT = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const SKY_FRAG =
  GLSL_COMMON +
  /* glsl */ `
  varying vec3 vDir;
  void main() {
    vec3 d = normalize(vDir);
    vec3 col = skyColor(d, uDawn);
    vec3 c = floor(d * 260.0);
    float s = hash21(c.xy + c.z * 13.7);
    float tw = 0.6 + 0.4 * sin(uTime * 1.3 + s * 40.0);
    float star = smoothstep(0.9965, 1.0, s) * tw * smoothstep(0.02, 0.2, d.y) * (1.0 - uDawn * 0.9);
    col += vec3(0.8, 0.85, 1.0) * star * 0.7;
    gl_FragColor = vec4(tone(col), 1.0);
  }
`

const QUAD_VERT = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorld;
  void main() {
    vUv = uv - 0.5;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`

const SUN_FRAG =
  GLSL_COMMON +
  /* glsl */ `
  uniform float uHorizon;
  varying vec2 vUv;
  varying vec3 vWorld;
  void main() {
    float d = length(vUv);
    float disc = 1.0 - smoothstep(0.095, 0.105, d);
    vec3 core = mix(HOT, vec3(1.0, 0.94, 0.78), smoothstep(0.1, 0.0, d));
    float corona = exp(-d * 14.0) * 0.8 + exp(-d * 4.5) * 0.3;
    float edge = 1.0 - smoothstep(0.3, 0.5, d);
    vec3 col = (core * disc * 2.0 + mix(SUN, HOT, 0.5) * corona) * edge;
    col *= 0.96 + 0.04 * sin(uTime * 2.0 + d * 30.0);
    float cut = smoothstep(uHorizon - 0.4, uHorizon + 0.6, vWorld.y);
    gl_FragColor = vec4(col * cut * uRise, 1.0);
  }
`

const FLARE_FRAG =
  GLSL_COMMON +
  /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorld;
  void main() {
    vec2 p = vUv;
    float h = exp(-abs(p.x) * 5.5);
    float v = exp(-abs(p.y) * 34.0);
    float core = exp(-length(p * vec2(1.0, 7.0)) * 6.0);
    float a = h * v * 2.2 + core * 0.8;
    vec3 col = mix(HOT, vec3(1.0, 0.96, 0.85), core) * a * uRise;
    gl_FragColor = vec4(col, 1.0);
  }
`

const GLOW_VERT = /* glsl */ `
  attribute float aSeed;
  attribute float aOrder;
  attribute float aSize;
  uniform float uTime;
  uniform float uIgnite;
  uniform float uPx;
  uniform float uDpr;
  varying float vA;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float flick = 0.82 + 0.18 * sin(uTime * 3.1 + aSeed * 17.0) * sin(uTime * 7.3 + aSeed * 5.0);
    float ign = smoothstep(aOrder, aOrder + 0.12, uIgnite);
    vA = flick * ign;
    float dist = max(-mv.z, 0.5);
    gl_PointSize = min(aSize * uPx / dist, 260.0 * uDpr);
    gl_Position = projectionMatrix * mv;
  }
`

const GLOW_FRAG = /* glsl */ `
  varying float vA;
  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float d = length(p) * 2.0;
    float g = exp(-d * d * 5.0) * 0.9 + exp(-d * 1.5) * 0.2;
    g *= smoothstep(1.0, 0.85, d);
    vec3 col = vec3(0.94, 0.68, 0.25) * g * vA;
    gl_FragColor = vec4(col, 1.0);
  }
`

const LANTERN_VERT = /* glsl */ `
  attribute float aSeed;
  attribute float aOrder;
  uniform float uTime;
  uniform float uIgnite;
  varying float vA;
  varying vec3 vN;
  varying vec3 vLocal;
  void main() {
    mat4 m = modelMatrix * instanceMatrix;
    float flick = 0.82 + 0.18 * sin(uTime * 3.1 + aSeed * 17.0) * sin(uTime * 7.3 + aSeed * 5.0);
    vA = flick * smoothstep(aOrder, aOrder + 0.12, uIgnite);
    vN = normalize(mat3(m) * normal);
    vLocal = position;
    gl_Position = projectionMatrix * viewMatrix * m * vec4(position, 1.0);
  }
`

const LANTERN_FRAG = /* glsl */ `
  varying float vA;
  varying vec3 vN;
  varying vec3 vLocal;
  void main() {
    vec3 warm = vec3(0.99, 0.85, 0.52);
    vec3 dark = vec3(0.02, 0.03, 0.06);
    // Lattice: a few dark ribs so the lantern reads as a cage around a flame.
    float rib = step(0.92, abs(sin(atan(vLocal.z, vLocal.x) * 3.0))) + step(0.9, abs(sin(vLocal.y * 22.0)));
    float cage = clamp(rib, 0.0, 1.0) * step(0.1, vA);
    vec3 col = mix(dark, warm * 1.7, vA);
    col = mix(col, dark * 2.0, cage * 0.85);
    gl_FragColor = vec4(col, 1.0);
  }
`

const DUST_VERT = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uPx;
  uniform float uDpr;
  varying float vA;
  void main() {
    vec3 p = position;
    p.x += sin(uTime * 0.21 + aSeed * 6.283) * 0.6;
    p.y += sin(uTime * 0.17 + aSeed * 12.0) * 0.4;
    p.z += cos(uTime * 0.15 + aSeed * 3.0) * 0.6;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float dist = max(-mv.z, 0.5);
    vA = smoothstep(1.5, 6.0, dist) * (1.0 - smoothstep(30.0, 70.0, dist)) * (0.45 + 0.55 * sin(uTime * 0.9 + aSeed * 20.0));
    gl_PointSize = min(0.08 * uPx / dist, 7.0 * uDpr);
    gl_Position = projectionMatrix * mv;
  }
`

const DUST_FRAG = /* glsl */ `
  varying float vA;
  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float d = length(p) * 2.0;
    float g = exp(-d * d * 4.0) * smoothstep(1.0, 0.7, d);
    gl_FragColor = vec4(vec3(0.95, 0.72, 0.3) * g * vA * 0.75, 1.0);
  }
`

/* ------------------------------------------------------------------ */

type Lantern = { pos: THREE.Vector3; seed: number; order: number }

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Wall panel with a pointed (two-centre) arch cut through it.
 * `a` half-span, `s` springing height, `r` arc radius (a <= r <= 2a).
 */
function archPanel(width: number, height: number, a: number, s: number, r: number, depth: number) {
  const shape = new THREE.Shape()
  shape.moveTo(-width / 2, 0)
  shape.lineTo(width / 2, 0)
  shape.lineTo(width / 2, height)
  shape.lineTo(-width / 2, height)
  shape.closePath()

  const hole = new THREE.Path()
  const cx = r - a
  const apex = s + Math.sqrt(2 * r * a - a * a)
  hole.moveTo(-a, 0)
  hole.lineTo(-a, s)
  // Left arc is centred at (+cx, s), right arc at (-cx, s).
  const a0 = Math.atan2(0, -a - cx)
  const a1 = Math.atan2(apex - s, -cx)
  hole.absarc(cx, s, r, a0, a1, true)
  const b0 = Math.atan2(apex - s, cx)
  const b1 = Math.atan2(0, a + cx)
  hole.absarc(-cx, s, r, b0, b1, true)
  hole.lineTo(a, 0)
  hole.closePath()
  shape.holes.push(hole)

  const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 18 })
  geo.translate(0, 0, -depth / 2)
  return geo
}

/** Gold hairline following the arch opening: the luminous edge of every doorway. */
function archOutline(a: number, s: number, r: number, drop = 0) {
  const pts: THREE.Vector3[] = []
  const cx = r - a
  const apex = s + Math.sqrt(2 * r * a - a * a)
  pts.push(new THREE.Vector3(-a, drop, 0))
  const steps = 22
  const a0 = Math.atan2(0, -a - cx)
  const a1 = Math.atan2(apex - s, -cx)
  for (let i = 0; i <= steps; i++) {
    const t = a0 + (a1 - a0) * (i / steps)
    pts.push(new THREE.Vector3(cx + Math.cos(t) * r, s + Math.sin(t) * r, 0))
  }
  const b0 = Math.atan2(apex - s, cx)
  const b1 = Math.atan2(0, a + cx)
  for (let i = 0; i <= steps; i++) {
    const t = b0 + (b1 - b0) * (i / steps)
    pts.push(new THREE.Vector3(-cx + Math.cos(t) * r, s + Math.sin(t) * r, 0))
  }
  pts.push(new THREE.Vector3(a, drop, 0))
  return new THREE.BufferGeometry().setFromPoints(pts)
}

function columnGeometry(height: number) {
  const shaft = new THREE.CylinderGeometry(0.4, 0.48, height - 1.3, 14, 1)
  shaft.translate(0, (height - 1.3) / 2 + 0.5, 0)
  const base = new THREE.BoxGeometry(1.25, 0.5, 1.25)
  base.translate(0, 0.25, 0)
  const neck = new THREE.CylinderGeometry(0.62, 0.42, 0.55, 14, 1)
  neck.translate(0, height - 0.8 + 0.275, 0)
  const cap = new THREE.BoxGeometry(1.35, 0.3, 1.35)
  cap.translate(0, height - 0.25, 0)
  return mergeGeometries([shaft, base, neck, cap], false) as THREE.BufferGeometry
}

function lanternGeometry() {
  const body = new THREE.CylinderGeometry(0.17, 0.2, 0.42, 6, 1)
  const cap = new THREE.ConeGeometry(0.22, 0.16, 6)
  cap.translate(0, 0.29, 0)
  const foot = new THREE.CylinderGeometry(0.1, 0.16, 0.08, 6)
  foot.translate(0, -0.25, 0)
  return mergeGeometries([body, cap, foot], false) as THREE.BufferGeometry
}

function frondGeometry(len: number, w0: number) {
  const segs = 10
  const pos: number[] = []
  const nrm: number[] = []
  const idx: number[] = []
  for (let i = 0; i <= segs; i++) {
    const t = i / segs
    const x = t * len
    const y = 0.55 * Math.sin(t * Math.PI * 0.5) - 1.9 * t * t
    const w = (w0 * (1 - t) * (0.35 + 0.65 * Math.sin(t * Math.PI)) + 0.02) * (i % 2 === 0 ? 1 : 0.72)
    pos.push(x, y, -w, x, y, w)
    nrm.push(0, 1, 0, 0, 1, 0)
  }
  for (let i = 0; i < segs; i++) {
    const a = i * 2
    idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3))
  geo.setIndex(idx)
  return geo
}

function palmGeometry(rand: () => number) {
  const h = 7.4
  const lean = 0.45
  const trunk = new THREE.CylinderGeometry(0.15, 0.3, h, 8, 7)
  trunk.deleteAttribute('uv')
  trunk.translate(0, h / 2, 0)
  const p = trunk.attributes.position as THREE.BufferAttribute
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i)
    const k = y / h
    p.setX(i, p.getX(i) + lean * k * k)
  }
  trunk.computeVertexNormals()

  const parts: THREE.BufferGeometry[] = [trunk]
  const bud = new THREE.SphereGeometry(0.28, 10, 8)
  bud.deleteAttribute('uv')
  bud.translate(lean, h, 0)
  parts.push(bud)

  const count = 9
  for (let i = 0; i < count; i++) {
    const frond = frondGeometry(3.1 + rand() * 0.8, 0.5)
    const pitch = -(0.05 + rand() * 0.35)
    const yaw = (i / count) * Math.PI * 2 + (rand() - 0.5) * 0.35
    const m = new THREE.Matrix4()
    m.makeRotationZ(pitch)
    const ry = new THREE.Matrix4().makeRotationY(yaw)
    m.premultiply(ry)
    m.setPosition(lean, h + 0.1, 0)
    frond.applyMatrix4(m)
    parts.push(frond)
  }
  return mergeGeometries(parts, false) as THREE.BufferGeometry
}

/* ------------------------------------------------------------------ */

export type PalaceUniforms = {
  uTime: { value: number }
  uDawn: { value: number }
  uRise: { value: number }
  uIgnite: { value: number }
  uHorizon: { value: number }
  uSunPos: { value: THREE.Vector3 }
  uCamPos: { value: THREE.Vector3 }
  uLanterns: { value: THREE.Vector3[] }
  uLanternGlow: { value: Float32Array }
  uPx: { value: number }
  uDpr: { value: number }
}

export class PalaceScene {
  readonly scene = new THREE.Scene()
  readonly camera = new THREE.PerspectiveCamera(48, 1, 0.1, 1200)
  readonly uniforms: PalaceUniforms

  private lanterns: Lantern[] = []
  private camCurve: THREE.CatmullRomCurve3
  private lookCurve: THREE.CatmullRomCurve3
  private sky: THREE.Mesh
  private sun: THREE.Mesh
  private flare: THREE.Mesh
  private disposables: { dispose(): void }[] = []
  private tmpCam = new THREE.Vector3()
  private tmpLook = new THREE.Vector3()
  private sorted: { l: Lantern; d: number }[] = []

  constructor() {
    this.uniforms = {
      uTime: { value: 0 },
      uDawn: { value: 0 },
      uRise: { value: 0 },
      uIgnite: { value: 0 },
      uHorizon: { value: 3 },
      uSunPos: { value: new THREE.Vector3(0, -20, 380) },
      uCamPos: { value: new THREE.Vector3() },
      uLanterns: { value: Array.from({ length: NL }, () => new THREE.Vector3(0, -100, 0)) },
      uLanternGlow: { value: new Float32Array(NL) },
      uPx: { value: 800 },
      uDpr: { value: 1 },
    }

    this.camCurve = new THREE.CatmullRomCurve3(
      [
        [-0.7, 3.1, -52],
        [0.8, 3.0, -44],
        [-0.9, 3.0, -35],
        [0.5, 2.8, -26],
        [-1.3, 2.6, -16],
        [1.1, 2.5, -6],
        [0.2, 2.8, 4],
        [0.0, 3.0, 12.5],
        [0.6, 3.3, 22],
        [-0.5, 3.6, 32],
        [0.0, 3.9, 41],
        [0.0, 4.0, 44],
      ].map(([x, y, z]) => new THREE.Vector3(x, y, z)),
      false,
      'centripetal',
      0.5
    )
    this.lookCurve = new THREE.CatmullRomCurve3(
      [
        [0.3, 3.9, -36],
        [0.0, 4.2, -28],
        [0.0, 4.4, -18],
        [0.0, 4.0, -8],
        [-0.8, 1.8, -2],
        [0.0, 5.0, 12],
        [0.0, 5.5, 40],
        [0.0, 4.5, 140],
        [0.0, 5.0, 380],
        [0.0, 4.2, 380],
        [0.0, 3.4, 380],
        [0.0, 3.2, 380],
      ].map(([x, y, z]) => new THREE.Vector3(x, y, z)),
      false,
      'centripetal',
      0.5
    )

    this.scene.background = VOID

    this.buildArchitecture()
    this.buildLanterns()
    this.buildPalms()
    this.buildDust()
    this.sky = this.buildSky()
    const { sun, flare } = this.buildSun()
    this.sun = sun
    this.flare = flare
  }

  /* ------------------------------ materials ------------------------------ */

  private stone(opts: { base: string; pattern?: number; scale?: number; polish?: number; band?: number; side?: THREE.Side }) {
    const mat = new THREE.ShaderMaterial({
      vertexShader: WORLD_VERT,
      fragmentShader: STONE_FRAG,
      uniforms: {
        ...this.shared(),
        uBase: { value: new THREE.Color(opts.base) },
        uPattern: { value: opts.pattern ?? 0.35 },
        uScale: { value: opts.scale ?? 1.6 },
        uPolish: { value: opts.polish ?? 0 },
        uBand: { value: opts.band ?? 0 },
      },
      side: opts.side ?? THREE.FrontSide,
    })
    this.disposables.push(mat)
    return mat
  }

  private shared() {
    const u = this.uniforms
    return {
      uTime: u.uTime,
      uDawn: u.uDawn,
      uRise: u.uRise,
      uSunPos: u.uSunPos,
      uCamPos: u.uCamPos,
      uLanterns: u.uLanterns,
      uLanternGlow: u.uLanternGlow,
    }
  }

  private track<T extends { dispose(): void }>(d: T) {
    this.disposables.push(d)
    return d
  }

  /* ---------------------------- architecture ----------------------------- */

  private buildArchitecture() {
    const wallMat = this.stone({ base: '#0e1d38', pattern: 0.5, scale: 1.1 })
    const gateMat = this.stone({ base: '#10203d', pattern: 0.85, scale: 0.9 })
    const floorMat = this.stone({ base: '#0a1730', pattern: 1.5, scale: 1.4, polish: 0.5, band: 4.2 })
    const columnMat = this.stone({ base: '#12223f', pattern: 0.35, scale: 2.2 })
    const ceilingMat = this.stone({ base: '#0b172c', pattern: 0.6, scale: 0.7 })

    const add = (geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0, ry = 0) => {
      const m = new THREE.Mesh(this.track(geo), mat)
      m.position.set(x, y, z)
      m.rotation.y = ry
      this.scene.add(m)
      return m
    }

    // Floors: the palace interior and the causeway out to the horizon.
    add(new THREE.BoxGeometry(30, 0.4, 70), floorMat, 0, -0.2, -23)
    add(new THREE.BoxGeometry(16, 0.4, 62), floorMat, 0, -0.2, 43)

    // Water: the court pool and the open water either side of the causeway.
    const waterMat = new THREE.ShaderMaterial({ vertexShader: WORLD_VERT, fragmentShader: WATER_FRAG, uniforms: this.shared() })
    this.track(waterMat)
    const pool = add(new THREE.PlaneGeometry(6, 22), waterMat, 0, 0.02, -7)
    pool.rotation.x = -Math.PI / 2
    const sea = add(new THREE.PlaneGeometry(700, 340), waterMat, 0, -0.6, 182)
    sea.rotation.x = -Math.PI / 2
    sea.frustumCulled = false

    // Pool coping.
    add(new THREE.BoxGeometry(0.5, 0.3, 22.6), wallMat, -3.25, 0.15, -7)
    add(new THREE.BoxGeometry(0.5, 0.3, 22.6), wallMat, 3.25, 0.15, -7)
    add(new THREE.BoxGeometry(7, 0.3, 0.5), wallMat, 0, 0.15, -18.25)
    add(new THREE.BoxGeometry(7, 0.3, 0.5), wallMat, 0, 0.15, 4.25)

    // Hall envelope: side walls, ceiling, and the wall behind the first frame.
    add(new THREE.BoxGeometry(0.5, 10, 34), wallMat, -10, 5, -39)
    add(new THREE.BoxGeometry(0.5, 10, 34), wallMat, 10, 5, -39)
    add(new THREE.BoxGeometry(20.5, 0.4, 34), ceilingMat, 0, 10.2, -39)
    add(new THREE.BoxGeometry(20.5, 10.6, 0.6), wallMat, 0, 5.3, -56.3)

    // Court envelope: outer walls and the arcade roofs, sky open in the middle.
    add(new THREE.BoxGeometry(0.5, 9, 32), wallMat, -15, 4.5, -6)
    add(new THREE.BoxGeometry(0.5, 9, 32), wallMat, 15, 4.5, -6)
    add(new THREE.BoxGeometry(4.6, 0.35, 32), ceilingMat, -13, 8.6, -6)
    add(new THREE.BoxGeometry(4.6, 0.35, 32), ceilingMat, 13, 8.6, -6)
    // Low walls closing the hall aisles into the court.
    add(new THREE.BoxGeometry(5, 9, 0.5), wallMat, -12.5, 4.5, -22)
    add(new THREE.BoxGeometry(5, 9, 0.5), wallMat, 12.5, 4.5, -22)

    // Columns: hall nave line and court arcade line.
    const colGeo = this.track(columnGeometry(10))
    const colPositions: [number, number][] = []
    for (const z of [-54, -48, -42, -36, -30, -24]) colPositions.push([-6, z], [6, z])
    const colGeoCourt = this.track(columnGeometry(8.6))
    const courtPositions: [number, number][] = []
    for (const z of [-20, -14, -8, -2, 4]) courtPositions.push([-11, z], [11, z])
    const placeColumns = (geo: THREE.BufferGeometry, list: [number, number][]) => {
      const inst = new THREE.InstancedMesh(geo, columnMat, list.length)
      const m = new THREE.Matrix4()
      list.forEach(([x, z], i) => {
        m.makeTranslation(x, 0, z)
        inst.setMatrixAt(i, m)
      })
      inst.instanceMatrix.needsUpdate = true
      inst.computeBoundingSphere()
      this.scene.add(inst)
    }
    placeColumns(colGeo, colPositions)
    placeColumns(colGeoCourt, courtPositions)

    // Side arches along the nave (panels in the YZ plane) and along the court arcade.
    const sideArch = this.track(archPanel(6, 10, 2.2, 4.2, 3.6, 0.5))
    const sideInst = new THREE.InstancedMesh(sideArch, wallMat, 10)
    const m = new THREE.Matrix4()
    const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
    const one = new THREE.Vector3(1, 1, 1)
    let i = 0
    for (const z of [-51, -45, -39, -33, -27]) {
      for (const x of [-6, 6]) {
        m.compose(new THREE.Vector3(x, 0, z), q, one)
        sideInst.setMatrixAt(i++, m)
      }
    }
    sideInst.instanceMatrix.needsUpdate = true
    sideInst.computeBoundingSphere()
    this.scene.add(sideInst)

    const courtArch = this.track(archPanel(6, 8.6, 2.3, 3.6, 3.8, 0.5))
    const courtInst = new THREE.InstancedMesh(courtArch, wallMat, 8)
    i = 0
    for (const z of [-17, -11, -5, 1]) {
      for (const x of [-11, 11]) {
        m.compose(new THREE.Vector3(x, 0, z), q, one)
        courtInst.setMatrixAt(i++, m)
      }
    }
    courtInst.instanceMatrix.needsUpdate = true
    courtInst.computeBoundingSphere()
    this.scene.add(courtInst)

    // Transverse ribs across the nave frame the view forward, Rann Mahal style.
    const rib = this.track(archPanel(12.2, 10, 4.8, 4.0, 5.5, 0.6))
    const ribInst = new THREE.InstancedMesh(rib, wallMat, 4)
    ;[-50, -38, -26, -22].forEach((z, k) => {
      m.makeTranslation(0, 0, z)
      ribInst.setMatrixAt(k, m)
    })
    ribInst.instanceMatrix.needsUpdate = true
    ribInst.computeBoundingSphere()
    this.scene.add(ribInst)

    // The great gate.
    add(archPanel(30.4, 13, 4, 5, 5.6, 1.6), gateMat, 0, 0, 12)
    const merlon = this.track(new THREE.BoxGeometry(0.9, 0.9, 1.4))
    const merlons = new THREE.InstancedMesh(merlon, gateMat, 21)
    for (let k = 0; k < 21; k++) {
      m.makeTranslation(-15 + k * 1.5, 13.45, 12)
      merlons.setMatrixAt(k, m)
    }
    merlons.instanceMatrix.needsUpdate = true
    merlons.computeBoundingSphere()
    this.scene.add(merlons)

    // Causeway parapets and the palm plinths out in the water.
    add(new THREE.BoxGeometry(0.5, 0.5, 60), wallMat, -7.75, 0.25, 44)
    add(new THREE.BoxGeometry(0.5, 0.5, 60), wallMat, 7.75, 0.25, 44)

    // Gold hairlines on every arch opening.
    const lineMat = this.track(
      new THREE.LineBasicMaterial({ color: '#f0b64a', transparent: true, opacity: 0.55, depthWrite: false })
    )
    const lineDim = this.track(
      new THREE.LineBasicMaterial({ color: '#d9661c', transparent: true, opacity: 0.35, depthWrite: false })
    )
    const sideLine = this.track(archOutline(2.2, 4.2, 3.6))
    for (const z of [-51, -45, -39, -33, -27]) {
      for (const x of [-6, 6]) {
        for (const dz of [-0.26, 0.26]) {
          const l = new THREE.Line(sideLine, lineDim)
          l.position.set(x + dz, 0.02, z)
          l.rotation.y = Math.PI / 2
          this.scene.add(l)
        }
      }
    }
    const courtLine = this.track(archOutline(2.3, 3.6, 3.8))
    for (const z of [-17, -11, -5, 1]) {
      for (const x of [-11, 11]) {
        const l = new THREE.Line(courtLine, lineDim)
        l.position.set(x + (x < 0 ? 0.26 : -0.26), 0.02, z)
        l.rotation.y = Math.PI / 2
        this.scene.add(l)
      }
    }
    const ribLine = this.track(archOutline(4.8, 4.0, 5.5))
    for (const z of [-50, -38, -26, -22]) {
      for (const dz of [-0.31, 0.31]) {
        const l = new THREE.Line(ribLine, lineMat)
        l.position.set(0, 0.02, z + dz)
        this.scene.add(l)
      }
    }
    const gateLine = this.track(archOutline(4, 5, 5.6))
    for (const dz of [-0.81, 0.81]) {
      const l = new THREE.Line(gateLine, lineMat)
      l.position.set(0, 0.02, 12 + dz)
      this.scene.add(l)
    }
  }

  /* ------------------------------ lanterns ------------------------------- */

  private buildLanterns() {
    const list: THREE.Vector3[] = []
    // Hanging under the nave side arches, and standing at each column foot.
    for (const z of [-51, -45, -39, -33, -27]) for (const x of [-6, 6]) list.push(new THREE.Vector3(x, 6.1, z))
    for (const z of [-54, -48, -42, -36, -30, -24]) for (const x of [-5.1, 5.1]) list.push(new THREE.Vector3(x, 0.5, z))
    // Court: hanging in the arcade, standing along the pool coping.
    for (const z of [-17, -11, -5, 1]) for (const x of [-11, 11]) list.push(new THREE.Vector3(x, 5.6, z))
    for (const z of [-16, -12, -8, -4, 0, 4]) for (const x of [-3.7, 3.7]) list.push(new THREE.Vector3(x, 0.55, z))
    // Gate: flanking the opening and on the parapet ends.
    list.push(new THREE.Vector3(-5.4, 3.6, 11.1), new THREE.Vector3(5.4, 3.6, 11.1))
    // Causeway: on the parapets, out to the horizon.
    for (let z = 16; z <= 70; z += 6) for (const x of [-7.75, 7.75]) list.push(new THREE.Vector3(x, 0.8, z))

    const rand = mulberry32(7)
    const zs = list.map((p) => p.z)
    const zMin = Math.min(...zs)
    const zMax = Math.max(...zs)
    this.lanterns = list.map((pos) => ({
      pos,
      seed: rand(),
      order: ((pos.z - zMin) / (zMax - zMin)) * 0.85,
    }))

    const n = this.lanterns.length
    const geo = this.track(lanternGeometry())
    const seeds = new Float32Array(n)
    const orders = new Float32Array(n)
    this.lanterns.forEach((l, i) => {
      seeds[i] = l.seed
      orders[i] = l.order
    })
    geo.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 1))
    geo.setAttribute('aOrder', new THREE.InstancedBufferAttribute(orders, 1))
    const bodyMat = this.track(
      new THREE.ShaderMaterial({
        vertexShader: LANTERN_VERT,
        fragmentShader: LANTERN_FRAG,
        uniforms: { uTime: this.uniforms.uTime, uIgnite: this.uniforms.uIgnite },
      })
    )
    const bodies = new THREE.InstancedMesh(geo, bodyMat, n)
    const m = new THREE.Matrix4()
    this.lanterns.forEach((l, i) => {
      m.makeTranslation(l.pos.x, l.pos.y, l.pos.z)
      bodies.setMatrixAt(i, m)
    })
    bodies.instanceMatrix.needsUpdate = true
    bodies.computeBoundingSphere()
    this.scene.add(bodies)

    // Chains for the hanging lanterns.
    const chain: number[] = []
    for (const l of this.lanterns) {
      if (l.pos.y > 5) chain.push(l.pos.x, l.pos.y + 0.3, l.pos.z, l.pos.x, l.pos.y > 6 ? 10 : 8.6, l.pos.z)
    }
    const chainGeo = this.track(new THREE.BufferGeometry())
    chainGeo.setAttribute('position', new THREE.Float32BufferAttribute(chain, 3))
    const chainMat = this.track(new THREE.LineBasicMaterial({ color: '#c9a25a', transparent: true, opacity: 0.35 }))
    this.scene.add(new THREE.LineSegments(chainGeo, chainMat))

    // Glow sprites.
    const gpos = new Float32Array(n * 3)
    const gsize = new Float32Array(n)
    this.lanterns.forEach((l, i) => {
      gpos.set([l.pos.x, l.pos.y, l.pos.z], i * 3)
      gsize[i] = l.pos.y > 5 ? 3.2 : 2.4
    })
    const glowGeo = this.track(new THREE.BufferGeometry())
    glowGeo.setAttribute('position', new THREE.BufferAttribute(gpos, 3))
    glowGeo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    glowGeo.setAttribute('aOrder', new THREE.BufferAttribute(orders, 1))
    glowGeo.setAttribute('aSize', new THREE.BufferAttribute(gsize, 1))
    const glowMat = this.track(
      new THREE.ShaderMaterial({
        vertexShader: GLOW_VERT,
        fragmentShader: GLOW_FRAG,
        uniforms: {
          uTime: this.uniforms.uTime,
          uIgnite: this.uniforms.uIgnite,
          uPx: this.uniforms.uPx,
          uDpr: this.uniforms.uDpr,
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    )
    const glow = new THREE.Points(glowGeo, glowMat)
    glow.frustumCulled = false
    this.scene.add(glow)
  }

  /* -------------------------------- palms -------------------------------- */

  private buildPalms() {
    const rand = mulberry32(21)
    const palmMat = this.stone({ base: '#050b16', pattern: 0.28, scale: 2.6, side: THREE.DoubleSide })
    const plinthMat = this.stone({ base: '#0e1d38', pattern: 0.5, scale: 1.8 })

    const spots: [number, number, number][] = []
    for (let z = 20; z <= 66; z += 9) {
      spots.push([-10.2, z + (rand() - 0.5) * 2, 0.8 + rand() * 0.35])
      spots.push([10.2, z + 4 + (rand() - 0.5) * 2, 0.8 + rand() * 0.35])
    }
    // Two inside the court, by the gate, like the potted trees of a courtyard.
    spots.push([-8.2, 7.5, 0.72], [8.2, 7.5, 0.7])

    const geo = this.track(palmGeometry(rand))
    const inst = new THREE.InstancedMesh(geo, palmMat, spots.length)
    const plinth = this.track(new THREE.BoxGeometry(2.4, 1.2, 2.4))
    const plinths = new THREE.InstancedMesh(plinth, plinthMat, spots.length)
    const m = new THREE.Matrix4()
    const q = new THREE.Quaternion()
    const s = new THREE.Vector3()
    spots.forEach(([x, z, sc], i) => {
      const inside = z < 12
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rand() * Math.PI * 2)
      s.set(sc, sc, sc)
      m.compose(new THREE.Vector3(x, inside ? 0 : 0.0, z), q, s)
      inst.setMatrixAt(i, m)
      m.compose(new THREE.Vector3(x, inside ? -0.4 : -0.6, z), new THREE.Quaternion(), new THREE.Vector3(1, 1, 1))
      plinths.setMatrixAt(i, m)
    })
    inst.instanceMatrix.needsUpdate = true
    inst.computeBoundingSphere()
    plinths.instanceMatrix.needsUpdate = true
    plinths.computeBoundingSphere()
    this.scene.add(inst, plinths)
  }

  /* -------------------------------- dust --------------------------------- */

  private buildDust() {
    const rand = mulberry32(3)
    const n = 900
    const pos = new Float32Array(n * 3)
    const seed = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      const z = -56 + rand() * 120
      const spread = z < 12 ? 9 : 7
      pos.set([(rand() - 0.5) * 2 * spread, 0.4 + rand() * 8.5, z], i * 3)
      seed[i] = rand()
    }
    const geo = this.track(new THREE.BufferGeometry())
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    const mat = this.track(
      new THREE.ShaderMaterial({
        vertexShader: DUST_VERT,
        fragmentShader: DUST_FRAG,
        uniforms: { uTime: this.uniforms.uTime, uPx: this.uniforms.uPx, uDpr: this.uniforms.uDpr },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    )
    const pts = new THREE.Points(geo, mat)
    pts.frustumCulled = false
    this.scene.add(pts)
  }

  /* ------------------------------- sky, sun ------------------------------ */

  private buildSky() {
    const geo = this.track(new THREE.SphereGeometry(520, 48, 24))
    const mat = this.track(
      new THREE.ShaderMaterial({
        vertexShader: SKY_VERT,
        fragmentShader: SKY_FRAG,
        uniforms: this.shared(),
        side: THREE.BackSide,
        depthWrite: false,
      })
    )
    const sky = new THREE.Mesh(geo, mat)
    sky.frustumCulled = false
    sky.renderOrder = -10
    this.scene.add(sky)
    return sky
  }

  private buildSun() {
    const sunGeo = this.track(new THREE.PlaneGeometry(130, 130))
    const sunMat = this.track(
      new THREE.ShaderMaterial({
        vertexShader: QUAD_VERT,
        fragmentShader: SUN_FRAG,
        uniforms: { ...this.shared(), uHorizon: this.uniforms.uHorizon },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      })
    )
    const sun = new THREE.Mesh(sunGeo, sunMat)
    sun.position.set(0, -20, 380)
    sun.frustumCulled = false
    this.scene.add(sun)

    const flareGeo = this.track(new THREE.PlaneGeometry(380, 40))
    const flareMat = this.track(
      new THREE.ShaderMaterial({
        vertexShader: QUAD_VERT,
        fragmentShader: FLARE_FRAG,
        uniforms: this.shared(),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      })
    )
    const flare = new THREE.Mesh(flareGeo, flareMat)
    flare.position.set(0, 3, 379)
    flare.frustumCulled = false
    this.scene.add(flare)
    return { sun, flare }
  }

  /* -------------------------------- update ------------------------------- */

  setViewport(widthPx: number, heightPx: number, dpr: number) {
    const aspect = widthPx / Math.max(heightPx, 1)
    this.camera.aspect = aspect
    // Portrait phones need a wider view or the nave collapses to a slot.
    this.camera.fov = aspect < 0.8 ? 66 : aspect < 1.1 ? 56 : 48
    this.camera.updateProjectionMatrix()
    this.uniforms.uPx.value = (heightPx * dpr) / (2 * Math.tan((this.camera.fov * Math.PI) / 360))
    this.uniforms.uDpr.value = dpr
  }

  /**
   * @param p scroll progress 0..1 through the flythrough
   * @param time seconds
   * @param pointer normalised -1..1 pointer offset for parallax
   */
  update(p: number, time: number, pointer: { x: number; y: number }, ignite: number) {
    const t = clamp01(p)
    const u = this.uniforms
    u.uTime.value = time
    u.uIgnite.value = ignite

    this.camCurve.getPointAt(t, this.tmpCam)
    this.lookCurve.getPointAt(t, this.tmpLook)
    this.tmpCam.y += Math.sin(time * 0.6) * 0.05
    this.tmpCam.x += Math.sin(time * 0.37) * 0.03
    this.tmpLook.x += pointer.x * 0.9
    this.tmpLook.y += -pointer.y * 0.55
    this.camera.position.copy(this.tmpCam)
    this.camera.lookAt(this.tmpLook)
    u.uCamPos.value.copy(this.tmpCam)

    const dawn = smoothstep(0.32, 0.95, t)
    const rise = smoothstep(0.6, 1.0, t)
    u.uDawn.value = dawn
    u.uRise.value = rise

    const horizon = this.tmpCam.y
    u.uHorizon.value = horizon
    // Ends about 40% below the horizon line: the wordmark's half disc with the flare through it.
    this.sun.position.set(0, horizon - 20 + 23.5 * rise, 380)
    u.uSunPos.value.copy(this.sun.position)
    this.flare.position.set(0, horizon + 0.25, 379)
    this.flare.scale.set(0.35 + 0.65 * rise, 0.6 + 0.4 * rise, 1)
    this.sky.position.copy(this.tmpCam)

    // Nearest lanterns feed the surface shaders. Weight the ones ahead of the camera.
    const list = this.sorted
    list.length = 0
    for (const l of this.lanterns) {
      const dx = l.pos.x - this.tmpCam.x
      const dy = l.pos.y - this.tmpCam.y
      const dz = l.pos.z - this.tmpCam.z
      const behind = dz < -2 ? 1.8 : 1
      list.push({ l, d: (dx * dx + dy * dy + dz * dz) * behind })
    }
    list.sort((a, b) => a.d - b.d)
    for (let i = 0; i < NL; i++) {
      const entry = list[i]
      if (!entry) {
        u.uLanterns.value[i].set(0, -100, 0)
        u.uLanternGlow.value[i] = 0
        continue
      }
      const { l } = entry
      u.uLanterns.value[i].copy(l.pos)
      const flick = 0.82 + 0.18 * Math.sin(time * 3.1 + l.seed * 17) * Math.sin(time * 7.3 + l.seed * 5)
      u.uLanternGlow.value[i] = flick * smoothstep(l.order, l.order + 0.12, ignite)
    }
  }

  dispose() {
    for (const d of this.disposables) d.dispose()
    this.disposables.length = 0
    this.scene.clear()
  }
}
