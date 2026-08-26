'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

export type HeroFieldHandle = {
  setScroll: (t: number) => void
}

const VERT = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform float uReveal;
uniform float uScroll;
uniform float uGrain;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

float lineSeg(vec2 p, vec2 a, vec2 b, float w) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-5), 0.0, 1.0);
  return smoothstep(w, 0.0, length(pa - ba * h));
}

float plusMark(vec2 p, vec2 c, float s, float w) {
  vec2 d = p - c;
  float hx = smoothstep(w, 0.0, abs(d.y)) * smoothstep(s, s * 0.4, abs(d.x));
  float hy = smoothstep(w, 0.0, abs(d.x)) * smoothstep(s, s * 0.4, abs(d.y));
  return max(hx, hy);
}

void main() {
  vec2 res = uResolution;
  vec2 uv = gl_FragCoord.xy / res;
  float aspect = res.x / max(res.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 mouse = (uMouse - 0.5) * 0.05;

  float horizon = 0.34 + uScroll * 0.10;
  float sunX = 0.78 * aspect + mouse.x;
  float sunY = horizon - 0.018 + mouse.y * 0.25;

  vec3 voidC = vec3(0.0, 0.0314, 0.0941);
  vec3 sunC  = vec3(0.851, 0.400, 0.110);
  vec3 hotC  = vec3(0.980, 0.765, 0.271);
  vec3 tealC = vec3(0.024, 0.714, 0.765);
  vec3 paper = vec3(0.910, 0.886, 0.839);

  float y = uv.y;
  float above = smoothstep(horizon - 0.0012, horizon + 0.0012, y);

  vec2 suv = p;
  float sunDist = length(suv - vec2(sunX, sunY));

  float scatter = exp(-abs(y - horizon) * 5.4);
  float glow = exp(-sunDist * 3.6);
  float haze = exp(-sunDist * 1.15) * scatter;

  vec3 sky = mix(voidC, tealC * 0.18, pow(smoothstep(horizon, 1.0, y), 1.15) * 0.55);
  sky = mix(sky, sunC, scatter * 0.58);
  sky = mix(sky, hotC, glow * 0.72);
  sky += hotC * haze * 0.42;
  sky += sunC * exp(-sunDist * 8.0) * 0.55;

  float disk = smoothstep(0.028, 0.0, sunDist);
  sky += mix(sunC, hotC, 0.7) * disk * 1.35;

  vec3 ground = voidC * vec3(0.55, 0.62, 0.75);
  float rY = horizon - (y - horizon);
  float reflScatter = exp(-abs(rY - horizon) * 7.5) * (1.0 - above);
  ground = mix(ground, sunC * 0.22, reflScatter);
  float rDist = length(vec2(suv.x, horizon - (suv.y - horizon)) - vec2(sunX, sunY));
  ground += hotC * exp(-rDist * 4.8) * 0.18 * (1.0 - above);

  float floorLine = smoothstep(0.12, 0.0, abs(y - (horizon * 0.35)));
  ground += paper * floorLine * 0.015 * (1.0 - above);

  vec3 col = mix(ground, sky, above);

  float hline = smoothstep(0.0018, 0.0, abs(y - horizon));
  col = mix(col, mix(sunC, hotC, 0.45), hline * 0.85 * uReveal);

  float meridian = smoothstep(0.0014, 0.0, abs(suv.x - sunX));
  meridian *= smoothstep(horizon, horizon + 0.02, y) * smoothstep(0.92, 0.55, y);
  col += mix(sunC, paper, 0.4) * meridian * 0.12 * uReveal;

  vec2 nUv = vec2(p.x, uv.y) * vec2(2.8, 3.4) + vec2(uTime * 0.011, uTime * 0.0035);
  nUv += mouse * 2.4;
  float n = fbm(nUv);
  n += (y - horizon) * 0.42;
  float bands = abs(fract(n * 9.0) - 0.5);
  float contour = smoothstep(0.07, 0.0, bands);
  contour *= smoothstep(horizon + 0.01, horizon + 0.10, y);
  contour *= smoothstep(0.96, 0.58, y);
  contour *= (0.18 + 0.06 * sin(uTime * 0.17 + n * 6.0));
  col += paper * contour * uReveal;

  vec2 nodes[7];
  nodes[0] = vec2(0.18 * aspect, 0.72);
  nodes[1] = vec2(0.31 * aspect, 0.81);
  nodes[2] = vec2(0.44 * aspect, 0.68);
  nodes[3] = vec2(0.22 * aspect, 0.58);
  nodes[4] = vec2(0.52 * aspect, 0.77);
  nodes[5] = vec2(0.38 * aspect, 0.88);
  nodes[6] = vec2(0.12 * aspect, 0.64);

  float diagram = 0.0;
  diagram += lineSeg(p, nodes[0], nodes[1], 0.0011);
  diagram += lineSeg(p, nodes[0], nodes[2], 0.0011);
  diagram += lineSeg(p, nodes[0], nodes[3], 0.0011);
  diagram += lineSeg(p, nodes[1], nodes[4], 0.0011);
  diagram += lineSeg(p, nodes[2], nodes[4], 0.0011);
  diagram += lineSeg(p, nodes[1], nodes[5], 0.0011);
  diagram += lineSeg(p, nodes[3], nodes[6], 0.0011);
  diagram += lineSeg(p, nodes[6], nodes[0], 0.0011);

  float marks = 0.0;
  for (int i = 0; i < 7; i++) {
    marks += plusMark(p, nodes[i], 0.007, 0.00115);
  }

  float pulse = 0.55 + 0.45 * sin(uTime * 0.35);
  float diagFade = smoothstep(0.28, 0.85, uReveal) * (0.22 + 0.08 * pulse);
  col += paper * clamp(diagram, 0.0, 1.0) * diagFade * 0.55;
  col += mix(hotC, paper, 0.6) * marks * diagFade;

  float rise = max(uReveal, 0.0001);
  float distH = abs(y - horizon);
  float bloom = 1.0 - smoothstep(0.0, 0.72 * rise, distH);
  float reveal = mix(bloom, 1.0, smoothstep(0.45, 1.0, uReveal));
  col *= reveal;

  float g = (hash(gl_FragCoord.xy + floor(uTime * 24.0) * 17.0) - 0.5) * uGrain;
  col += g;

  vec2 vig = uv * 2.0 - 1.0;
  col *= 1.0 - dot(vig, vig) * 0.32;

  col = mix(voidC, col, smoothstep(0.0, 0.12, uReveal));

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)
  if (!sh) return null
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(sh))
    gl.deleteShader(sh)
    return null
  }
  return sh
}

const HeroField = forwardRef<HeroFieldHandle>(function HeroField(_, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollRef = useRef(0)
  const fallbackRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    setScroll: (t: number) => {
      scrollRef.current = Math.max(0, Math.min(1, t))
    },
  }))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: 'high-performance',
    })

    if (!gl) {
      if (fallbackRef.current) fallbackRef.current.hidden = false
      canvas.hidden = true
      return
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) {
      if (fallbackRef.current) fallbackRef.current.hidden = false
      canvas.hidden = true
      return
    }

    const prog = gl.createProgram()
    if (!prog) return
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      if (fallbackRef.current) fallbackRef.current.hidden = false
      canvas.hidden = true
      return
    }

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    )
    const loc = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    gl.useProgram(prog)

    const uResolution = gl.getUniformLocation(prog, 'uResolution')
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uMouse = gl.getUniformLocation(prog, 'uMouse')
    const uReveal = gl.getUniformLocation(prog, 'uReveal')
    const uScroll = gl.getUniformLocation(prog, 'uScroll')
    const uGrain = gl.getUniformLocation(prog, 'uGrain')

    const mouse = { x: 0.72, y: 0.36, tx: 0.72, ty: 0.36 }
    let reveal = reduced ? 1 : 0
    let running = true
    let visible = true
    let raf = 0
    const t0 = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const pw = Math.max(1, Math.floor(w * dpr))
      const ph = Math.max(1, Math.floor(h * dpr))
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw
        canvas.height = ph
      }
      gl.viewport(0, 0, pw, ph)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      mouse.tx = e.clientX / window.innerWidth
      mouse.ty = 1 - e.clientY / window.innerHeight
    }

    const onVis = () => {
      visible = document.visibilityState === 'visible'
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVis)

    const draw = (now: number) => {
      if (!running) return
      if (visible) {
        const elapsed = (now - t0) / 1000
        if (!reduced) {
          reveal = Math.min(1, elapsed / 2.35)
          mouse.x += (mouse.tx - mouse.x) * 0.045
          mouse.y += (mouse.ty - mouse.y) * 0.045
        }
        resize()
        gl.uniform2f(uResolution, canvas.width, canvas.height)
        gl.uniform1f(uTime, reduced ? 0 : elapsed)
        gl.uniform2f(uMouse, mouse.x, mouse.y)
        gl.uniform1f(uReveal, reveal)
        gl.uniform1f(uScroll, scrollRef.current)
        gl.uniform1f(uGrain, reduced ? 0.018 : 0.04)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
      }
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVis)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="hero-field"
        aria-hidden="true"
      />
      <div
        ref={fallbackRef}
        className="hero-field-fallback"
        hidden
        aria-hidden="true"
      />
    </>
  )
})

export default HeroField
