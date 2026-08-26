import * as THREE from 'three'

const VOID = 0x000818
const SUN = 0xd9661c
const HOT = 0xfac345
const TEAL = 0x06b6c3

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

function pushLine(target: number[], ax: number, ay: number, az: number, bx: number, by: number, bz: number) {
  target.push(ax, ay, az, bx, by, bz)
}

function clipPush(
  target: number[],
  ax: number,
  ay: number,
  bx: number,
  by: number,
  minY: number
) {
  if (ay < minY && by < minY) return
  if (ay < minY) {
    const t = (minY - ay) / (by - ay)
    ax += (bx - ax) * t
    ay = minY
  } else if (by < minY) {
    const t = (minY - by) / (ay - by)
    bx += (ax - bx) * t
    by = minY
  }
  pushLine(target, ax, ay, 0, bx, by, 0)
}

function pushArc(
  target: number[],
  cx: number,
  cy: number,
  r: number,
  a0: number,
  a1: number,
  segs: number,
  minY = -Infinity
) {
  for (let i = 0; i < segs; i++) {
    const t0 = i / segs
    const t1 = (i + 1) / segs
    const a = a0 + (a1 - a0) * t0
    const b = a0 + (a1 - a0) * t1
    clipPush(
      target,
      cx + Math.cos(a) * r,
      cy + Math.sin(a) * r,
      cx + Math.cos(b) * r,
      cy + Math.sin(b) * r,
      minY
    )
  }
}

function lines(positions: number[], color: number, opacity: number) {
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
  })
  return new THREE.LineSegments(geometry, material)
}

function radialTexture(stops: [number, string][]) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.Texture()
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  for (const [stop, color] of stops) gradient.addColorStop(stop, color)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 256, 256)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function skyTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 4
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.Texture()
  const gradient = ctx.createLinearGradient(0, 0, 0, 256)
  gradient.addColorStop(0, '#000818')
  gradient.addColorStop(0.58, '#070f22')
  gradient.addColorStop(0.84, '#14141c')
  gradient.addColorStop(1, '#1a140f')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 4, 256)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function buildSun(cx: number, cy: number, radius: number) {
  const rand = mulberry32(26)
  const sunPos: number[] = []
  const hotPos: number[] = []
  const tealPos: number[] = []
  const group = new THREE.Group()
  const minY = -radius * 0.18

  for (let ring = 0; ring < 6; ring++) {
    const r = radius * (0.28 + ring * 0.12)
    const pieces = 3 + (ring % 3)
    let a = ring * 0.5 + rand() * 0.3
    for (let p = 0; p < pieces; p++) {
      const sweep = ((Math.PI * 2) / pieces) * (0.5 + rand() * 0.34)
      const dest = ring < 2 ? hotPos : ring % 4 === 3 ? tealPos : sunPos
      pushArc(dest, cx, cy, r, a, a + sweep, 16, minY)
      a += sweep + 0.16 + rand() * 0.22
    }
  }

  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 + 0.08
    const inner = radius * (0.1 + (i % 3) * 0.05)
    const outer = radius * (0.9 + (i % 2) * 0.05)
    const dest = i % 6 === 0 ? tealPos : i % 2 === 0 ? hotPos : sunPos
    clipPush(
      dest,
      cx + Math.cos(a) * inner,
      cy + Math.sin(a) * inner,
      cx + Math.cos(a) * outer,
      cy + Math.sin(a) * outer,
      minY
    )
  }

  for (let i = -2; i <= 2; i++) {
    const y = cy + i * radius * 0.24
    if (y < minY) continue
    const half = Math.sqrt(Math.max(0, radius * radius * 0.86 - (y - cy) * (y - cy)))
    if (half < radius * 0.14) continue
    clipPush(sunPos, cx - half * 0.92, y, cx - half * 0.14, y, minY)
    clipPush(sunPos, cx + half * 0.14, y, cx + half * 0.92, y, minY)
  }

  group.add(lines(sunPos, SUN, 0.48))
  group.add(lines(hotPos, HOT, 0.36))
  group.add(lines(tealPos, TEAL, 0.28))

  for (let i = 0; i < 14; i++) {
    const a = rand() * Math.PI * 2
    const r = radius * (0.22 + rand() * 0.68)
    const via = new THREE.Mesh(
      new THREE.CircleGeometry(0.016 + rand() * 0.01, 8),
      new THREE.MeshBasicMaterial({
        color: rand() > 0.75 ? TEAL : HOT,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      })
    )
    const vy = cy + Math.sin(a) * r
    if (vy < minY) continue
    via.position.set(cx + Math.cos(a) * r, vy, 0.02)
    group.add(via)
  }

  return group
}

function buildGround(cx: number, horizon: number, bottom: number, half: number) {
  const sunPos: number[] = []
  const tealPos: number[] = []
  const group = new THREE.Group()

  for (let i = 0; i <= 26; i++) {
    const t = i / 26
    const x2 = -half + t * half * 2
    const dest = Math.abs(x2 - cx) < 2.4 ? sunPos : tealPos
    pushLine(dest, cx, horizon, 0, x2, bottom, 0)
  }

  for (let i = 1; i <= 14; i++) {
    const t = i / 14
    const y = horizon + (bottom - horizon) * t * t
    const dest = t < 0.35 ? sunPos : tealPos
    pushLine(dest, -half, y, 0, half, y, 0)
  }

  group.add(lines(sunPos, SUN, 0.26))
  group.add(lines(tealPos, TEAL, 0.18))
  return group
}

function buildSkyline(cx: number, horizon: number) {
  const rand = mulberry32(81)
  const group = new THREE.Group()
  const material = new THREE.MeshBasicMaterial({ color: 0x050910 })
  let x = cx - 7.2
  while (x < cx + 8) {
    const w = 0.14 + rand() * 0.38
    const h = 0.08 + rand() * 0.28
    if (Math.abs(x + w / 2 - cx) > 0.95) {
      const block = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material)
      block.position.set(x + w / 2, horizon + h / 2, -0.02)
      group.add(block)
    }
    x += w + 0.06 + rand() * 0.18
  }
  return group
}

export type HeroScene = {
  resize: () => void
  frame: (time: number) => void
  dispose: () => void
}

export function createHeroScene(canvas: HTMLCanvasElement, reduced: boolean): HeroScene {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
  })
  renderer.setClearColor(VOID, 1)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(VOID)

  const camera = new THREE.OrthographicCamera(-8, 8, 5, -5, 0.1, 20)
  camera.position.z = 8

  const root = new THREE.Group()
  scene.add(root)

  const skyMap = skyTexture()
  const sky = new THREE.Mesh(
    new THREE.PlaneGeometry(48, 16),
    new THREE.MeshBasicMaterial({ map: skyMap })
  )
  sky.position.z = -1
  root.add(sky)

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(48, 10),
    new THREE.MeshBasicMaterial({ color: VOID })
  )
  floor.position.set(0, -7, -0.5)
  root.add(floor)

  let sunX = 2.35
  const horizon = -2.35
  const sunRadius = 1.02
  const sunY = horizon + sunRadius * 0.16

  const ground = buildGround(0, horizon, -8.2, 16)
  const skyline = buildSkyline(0, horizon)
  const sun = buildSun(0, 0, sunRadius)
  sun.position.set(sunX, sunY, 0)
  ground.position.x = sunX
  skyline.position.x = sunX
  root.add(ground)
  root.add(skyline)
  root.add(sun)

  const emberMap = radialTexture([
    [0, 'rgba(217,102,28,0.32)'],
    [0.3, 'rgba(217,102,28,0.1)'],
    [0.65, 'rgba(217,102,28,0.03)'],
    [1, 'rgba(217,102,28,0)'],
  ])
  const emberMat = new THREE.SpriteMaterial({
    map: emberMap,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
    opacity: 0.55,
  })
  const ember = new THREE.Sprite(emberMat)
  ember.position.set(sunX, sunY + 0.08, -0.1)
  ember.scale.set(3.4, 3.4, 1)
  root.add(ember)

  const washMap = radialTexture([
    [0, 'rgba(217,102,28,0.16)'],
    [0.4, 'rgba(217,102,28,0.05)'],
    [1, 'rgba(217,102,28,0)'],
  ])
  const washMat = new THREE.SpriteMaterial({
    map: washMap,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
    opacity: 0.32,
  })
  const wash = new THREE.Sprite(washMat)
  wash.position.set(sunX, horizon, -0.2)
  wash.scale.set(7.2, 2.6, 1)
  root.add(wash)

  const rim = lines([-16, horizon, 0, 16, horizon, 0], HOT, 0.28)
  root.add(rim)

  const breath: THREE.LineBasicMaterial[] = []
  root.traverse((object) => {
    if (object instanceof THREE.LineSegments && object.material instanceof THREE.LineBasicMaterial) {
      breath.push(object.material)
    }
  })

  const pointer = { x: 0, y: 0 }
  const eased = { x: 0, y: 0 }

  const onPointer = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect()
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
  }

  if (!reduced) {
    window.addEventListener('pointermove', onPointer, { passive: true })
  }

  const layout = (width: number) => {
    sunX = width < 760 ? 0.35 : 2.35
    sun.position.set(sunX, sunY, 0)
    ember.position.x = sunX
    wash.position.x = sunX
    ground.position.x = sunX
    skyline.position.x = sunX
  }

  const resize = () => {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    if (w < 2 || h < 2) return
    renderer.setSize(w, h, false)
    const viewH = 10
    const viewW = viewH * (w / h)
    camera.left = -viewW / 2
    camera.right = viewW / 2
    camera.top = viewH / 2
    camera.bottom = -viewH / 2
    camera.updateProjectionMatrix()
    sky.scale.set(viewW / 16, 1, 1)
    floor.scale.set(viewW / 16, 1, 1)
    layout(w)
  }

  const frame = (time: number) => {
    if (!reduced) {
      eased.x += (pointer.x - eased.x) * 0.04
      eased.y += (pointer.y - eased.y) * 0.04
      const driftX = Math.sin(time * 0.00012) * 0.05
      const driftY = Math.cos(time * 0.0001) * 0.03
      root.position.set(driftX + eased.x * 0.14, driftY + eased.y * 0.08, 0)
      sun.position.x = sunX + eased.x * 0.05
      ember.position.x = sun.position.x
      wash.position.x = sun.position.x

      const pulse = 0.92 + 0.08 * Math.sin(time * 0.0007)
      breath.forEach((material, index) => {
        const base = index % 3 === 0 ? 0.46 : index % 3 === 1 ? 0.34 : 0.22
        material.opacity = base * pulse
      })
      emberMat.opacity = 0.5 + 0.08 * Math.sin(time * 0.00055)
      washMat.opacity = 0.28 + 0.05 * Math.sin(time * 0.0004)
    }
    renderer.render(scene, camera)
  }

  const dispose = () => {
    window.removeEventListener('pointermove', onPointer)
    const materials = new Set<THREE.Material>()
    scene.traverse((object) => {
      const drawable = object as THREE.Mesh | THREE.LineSegments | THREE.Sprite
      if (!('geometry' in drawable) || !drawable.geometry) return
      drawable.geometry.dispose()
      const material = drawable.material
      if (Array.isArray(material)) material.forEach((item) => materials.add(item))
      else if (material) materials.add(material)
    })
    materials.forEach((material) => material.dispose())
    skyMap.dispose()
    emberMap.dispose()
    washMap.dispose()
    renderer.dispose()
  }

  return { resize, frame, dispose }
}
