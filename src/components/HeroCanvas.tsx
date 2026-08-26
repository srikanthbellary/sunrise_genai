'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const FRAG = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uVideo;
  uniform sampler2D uPoster;
  uniform float uVideoReady;
  uniform vec2 uRes;
  uniform vec2 uMedia;
  uniform vec2 uFocus;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uReveal;
  uniform float uScroll;
  uniform vec3 uSun;
  uniform vec3 uHot;
  uniform vec3 uTeal;

  float hash11(float p) {
    p = fract(p * 0.1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
  }

  float hash21(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
      mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  vec2 coverUv(vec2 uv) {
    vec2 s = uRes / uMedia;
    float scale = max(s.x, s.y);
    vec2 size = uMedia * scale;
    vec2 offset = (size - uRes) * uFocus;
    return (uv * uRes + offset) / size;
  }

  vec3 sampleMedia(vec2 uv) {
    vec2 m = coverUv(uv);
    return uVideoReady > 0.5 ? texture2D(uVideo, m).rgb : texture2D(uPoster, m).rgb;
  }

  void main() {
    float rev = clamp(uReveal, 0.0, 1.0);
    float e = rev * rev * (3.0 - 2.0 * rev);
    float aspect = uRes.x / max(uRes.y, 1.0);

    vec2 p = vUv - 0.5;

    // Intro push-in, scroll push-out, pointer parallax.
    p *= mix(1.14, 1.0, e) + uScroll * 0.09;
    p += uMouse * vec2(0.013, 0.009) * (0.3 + 0.7 * e);

    // Gentle anamorphic bend so the horizon reads as a curve, not a ruler.
    p.y += pow(abs(p.x), 2.0) * 0.04;

    // On exit the frame breaks into horizontal bands that slide apart.
    float bandIndex = floor((p.y + 0.5) * 14.0);
    p.x += (hash11(bandIndex) * 2.0 - 1.0) * uScroll * uScroll * 0.5;

    vec2 suv = p + 0.5;

    // Heat shimmer, strongest around the horizon line.
    float horizon = 0.52;
    float heat = smoothstep(0.30, 0.0, abs(suv.y - horizon));
    float shimmer = fbm(vec2(suv.x * 9.0, suv.y * 22.0 - uTime * 0.26));
    suv.x += (shimmer - 0.5) * 0.006 * heat;
    suv.y += (shimmer - 0.5) * 0.0025 * heat;

    // Chromatic dispersion: heavy while the frame opens, then almost gone.
    vec2 dir = suv - 0.5;
    float disp = (0.0012 + 0.0075 * (1.0 - e) + 0.005 * uScroll) * (0.25 + dot(dir, dir) * 3.2);
    vec2 offs = dir * disp;

    vec3 col;
    col.r = sampleMedia(suv + offs).r;
    col.g = sampleMedia(suv).g;
    col.b = sampleMedia(suv - offs).b;

    // Dawn grade: cool the shadows, drive the highlights toward the sun.
    float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
    col += uTeal * 0.055 * (1.0 - smoothstep(0.0, 0.55, lum));
    col = mix(col, col * mix(vec3(0.80, 0.88, 1.06), vec3(1.24, 1.02, 0.72), smoothstep(0.10, 0.92, lum)), 0.9);
    col = mix(vec3(lum), col, 1.14);

    // Bloom lifted from the brightest part of the frame only.
    vec3 bloom = vec3(0.0);
    for (int i = 0; i < 6; i++) {
      float a = float(i) * 1.0471975;
      vec2 o = vec2(cos(a), sin(a)) * 0.014 * vec2(1.0, aspect);
      bloom += max(sampleMedia(suv + o) - 0.60, 0.0);
    }
    col += (bloom / 6.0) * mix(uHot, uSun, 0.3) * 2.4;

    // Instrument marks: a fixed horizon rule and one slow survey sweep.
    col += uHot * smoothstep(0.0015, 0.0, abs(suv.y - horizon)) * 0.12 * e;
    col += uTeal * smoothstep(0.0035, 0.0, abs(suv.y - fract(uTime * 0.055))) * 0.05 * e;

    float hair = smoothstep(0.494, 0.5, abs(fract(suv.x * 12.0) - 0.5));
    col += uTeal * hair * 0.028 * e * (1.0 - uScroll);

    // Aperture: the frame opens from a slit at the horizon.
    float halfH = mix(0.0018, 0.62, pow(e, 0.8));
    float halfW = mix(0.03, 0.75, pow(e, 0.6));
    float mask = smoothstep(halfH, halfH - 0.02 - 0.22 * (1.0 - e), abs(vUv.y - 0.5));
    mask *= smoothstep(halfW, halfW - 0.02 - 0.10 * (1.0 - e), abs(vUv.x - 0.5));

    vec3 voidCol = vec3(0.0, 0.031, 0.086);
    float edge = mask * (1.0 - mask) * 4.0;
    col = mix(voidCol, col, mask);
    col += mix(uSun, uHot, 0.5) * edge * (1.0 - e) * 1.5;

    col = mix(col, voidCol, smoothstep(0.3, 1.0, uScroll));

    col *= clamp(1.0 - dot(dir, dir) * 0.8, 0.0, 1.0);
    col += (hash21(vUv * uRes + fract(uTime) * 137.0) - 0.5) * 0.032;

    gl_FragColor = vec4(col, 1.0);
  }
`

type Props = {
  start: boolean
  reduced: boolean
}

export default function HeroCanvas({ start, reduced }: Props) {
  const hostRef = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)
  const revealRef = useRef({ v: 0 })

  useEffect(() => {
    if (reduced) return
    const canvas = hostRef.current
    if (!canvas) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' })
    } catch {
      setFailed(true)
      return
    }
    if (!renderer.getContext()) {
      setFailed(true)
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const video = document.createElement('video')
    video.src = '/media/sunrise-causeway.mp4'
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.autoplay = true
    video.preload = 'auto'
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.crossOrigin = 'anonymous'

    const videoTexture = new THREE.VideoTexture(video)
    videoTexture.minFilter = THREE.LinearFilter
    videoTexture.magFilter = THREE.LinearFilter
    videoTexture.generateMipmaps = false
    if ('colorSpace' in videoTexture) videoTexture.colorSpace = THREE.SRGBColorSpace

    const poster = new THREE.TextureLoader().load('/media/sunrise-causeway-poster.jpg')
    poster.minFilter = THREE.LinearFilter
    poster.magFilter = THREE.LinearFilter
    poster.generateMipmaps = false
    if ('colorSpace' in poster) poster.colorSpace = THREE.SRGBColorSpace

    const uniforms = {
      uVideo: { value: videoTexture },
      uPoster: { value: poster },
      uVideoReady: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMedia: { value: new THREE.Vector2(1920, 1080) },
      uFocus: { value: new THREE.Vector2(0.5, 0.45) },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uReveal: { value: 0 },
      uScroll: { value: 0 },
      uSun: { value: new THREE.Color('#d9661c') },
      uHot: { value: new THREE.Color('#fac345') },
      uTeal: { value: new THREE.Color('#06b6c3') },
    }

    const quad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms, depthTest: false, depthWrite: false })
    )
    quad.frustumCulled = false
    scene.add(quad)

    const resize = () => {
      const parent = canvas.parentElement
      const w = parent?.clientWidth || window.innerWidth
      const h = parent?.clientHeight || window.innerHeight
      renderer.setSize(w, h, false)
      uniforms.uRes.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio())
      // Portrait viewports hold the crop on the sun rather than the centre of frame.
      uniforms.uFocus.value.set(w / h < 1 ? 0.78 : 0.5, 0.45)
    }
    resize()
    window.addEventListener('resize', resize)

    const target = { x: 0, y: 0 }
    const onPointer = (ev: PointerEvent) => {
      target.x = (ev.clientX / window.innerWidth) * 2 - 1
      target.y = (ev.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    const onCanPlay = () => {
      uniforms.uVideoReady.value = 1
    }
    video.addEventListener('loadeddata', onCanPlay)
    video.play().catch(() => {})

    const t0 = performance.now()
    let raf = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      uniforms.uTime.value = (performance.now() - t0) / 1000
      uniforms.uMouse.value.x += (target.x - uniforms.uMouse.value.x) * 0.045
      uniforms.uMouse.value.y += (target.y - uniforms.uMouse.value.y) * 0.045
      uniforms.uReveal.value = revealRef.current.v
      const vh = window.innerHeight || 1
      uniforms.uScroll.value = Math.min(1, Math.max(0, window.scrollY / vh))
      if (video.readyState >= 2) uniforms.uVideoReady.value = 1
      renderer.render(scene, camera)
    }
    loop()

    const onLost = (ev: Event) => {
      ev.preventDefault()
      cancelAnimationFrame(raf)
      setFailed(true)
    }
    canvas.addEventListener('webglcontextlost', onLost)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      video.removeEventListener('loadeddata', onCanPlay)
      canvas.removeEventListener('webglcontextlost', onLost)
      video.pause()
      video.src = ''
      videoTexture.dispose()
      poster.dispose()
      quad.geometry.dispose()
      ;(quad.material as THREE.Material).dispose()
      renderer.dispose()
    }
  }, [reduced])

  useEffect(() => {
    if (!start || reduced) return
    const tween = gsap.to(revealRef.current, { v: 1, duration: 2.1, ease: 'expo.inOut' })
    return () => {
      tween.kill()
    }
  }, [start, reduced])

  if (reduced || failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/media/sunrise-causeway-poster.jpg" alt="" aria-hidden="true" className="hero-fallback" />
    )
  }

  return <canvas ref={hostRef} className="hero-canvas" aria-hidden="true" />
}
