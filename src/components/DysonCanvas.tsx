'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * Dyson orbital flythrough.
 *
 * World units: the sun has radius 5.5 and sits at the origin. The outer structure is a ring of
 * radius 60 in the XZ plane; the camera rides inside its truss gallery, heading along the ring
 * with the look yawed toward the sun so the star sits right of centre. The inner structure is a
 * second, inclined orbit at radius 38, built only on the near half so it reads as a broad arc
 * below the star and never closes into a hoop. Everything is procedural: no textures on disk,
 * no models, no network.
 */

const SUN_R = 5.5
const R_OUT = 60
const R_IN = 38
const SEG_LEN = 4
const N_SEG = Math.round((2 * Math.PI * R_OUT) / SEG_LEN)
const D_THETA = (2 * Math.PI) / N_SEG
const ARC_TOTAL = N_SEG * SEG_LEN
const IN_TILT = THREE.MathUtils.degToRad(16)
const IN_ARC = THREE.MathUtils.degToRad(80)

// Gallery cross-section, in segment-local units. +x is outward (away from the sun), +y up, +z forward.
const WALL_X = 2.2
const EDGE_X = -1.2
const CEIL_Y = 2.0
const FLOOR_Y = -1.6

const DOCK_LEAD = 16
const DOCK_LEN = 10
const CRUISE_SPEED = 0.8
const SCROLL_ARC = 26

const COL = {
  void: new THREE.Color('#000816'),
  sun: new THREE.Color('#d9661c'),
  hot: new THREE.Color('#fac345'),
  teal: new THREE.Color('#06b6c3'),
}

type Props = {
  /** Scroll progress 0..1, read every frame. */
  progressRef: React.MutableRefObject<number>
  reduced: boolean
}

function circuitTexture(): THREE.CanvasTexture {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#0b111c'
  ctx.fillRect(0, 0, size, size)

  // Panel seams.
  ctx.strokeStyle = 'rgba(255,255,255,0.05)'
  ctx.lineWidth = 1
  for (let i = 0; i <= 4; i++) {
    const p = (i / 4) * size
    ctx.beginPath()
    ctx.moveTo(p, 0)
    ctx.lineTo(p, size)
    ctx.moveTo(0, p)
    ctx.lineTo(size, p)
    ctx.stroke()
  }

  // Sparse orthogonal circuit runs with pads, in the logo's language.
  let seed = 7
  const rnd = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  ctx.lineCap = 'square'
  for (let i = 0; i < 46; i++) {
    let x = Math.floor(rnd() * 16) * 16 + 8
    let y = Math.floor(rnd() * 16) * 16 + 8
    const gold = rnd() > 0.35 ? '#d9661c' : '#fac345'
    ctx.strokeStyle = gold
    ctx.fillStyle = gold
    ctx.lineWidth = rnd() > 0.8 ? 2 : 1
    ctx.beginPath()
    ctx.moveTo(x, y)
    const steps = 2 + Math.floor(rnd() * 3)
    for (let s = 0; s < steps; s++) {
      const run = (1 + Math.floor(rnd() * 4)) * 16
      if (rnd() > 0.5) x += rnd() > 0.5 ? run : -run
      else y += rnd() > 0.5 ? run : -run
      x = Math.max(8, Math.min(size - 8, x))
      y = Math.max(8, Math.min(size - 8, y))
      ctx.lineTo(x, y)
    }
    ctx.stroke()
    ctx.fillRect(x - 2, y - 2, 4, 4)
    if (rnd() > 0.6) {
      ctx.beginPath()
      ctx.arc(x, y, 3.5, 0, Math.PI * 2)
      ctx.stroke()
    }
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.anisotropy = 4
  return tex
}

function glowTexture(inner: string, mid: string, midStop: number): THREE.CanvasTexture {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, inner)
  g.addColorStop(midStop, mid)
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/** World matrix for the gallery frame at ring azimuth theta: x outward, y up, z forward. */
function ringMatrix(theta: number, out: THREE.Matrix4): THREE.Matrix4 {
  const c = Math.cos(theta)
  const s = Math.sin(theta)
  const outward = new THREE.Vector3(c, 0, s)
  const up = new THREE.Vector3(0, 1, 0)
  const forward = new THREE.Vector3(-s, 0, c)
  out.makeBasis(outward, up, forward)
  out.setPosition(R_OUT * c, 0, R_OUT * s)
  return out
}

const SUN_VERT = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vN = normalize(mat3(modelMatrix) * normal);
    vV = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`
const SUN_FRAG = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  uniform float uTime;
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  void main() {
    float f = pow(1.0 - clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0), 1.7);
    vec3 core = vec3(1.0, 0.94, 0.74);
    vec3 limb = vec3(0.96, 0.52, 0.14);
    vec3 col = mix(core, limb, f);
    float grain = hash(floor(vN * 40.0 + uTime * 0.15)) * 0.06;
    col *= 1.0 - grain * f;
    gl_FragColor = vec4(col * 1.35, 1.0);
  }
`

type Slot = { theta: number; local: THREE.Vector3; arc: number }

type Module = {
  group: THREE.Group
  clamps: THREE.Mesh[]
  dockLight: THREE.Mesh
  tug: THREE.Mesh
  slot: number
}

export default function DysonCanvas({ progressRef, reduced }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' })
    } catch {
      setFailed(true)
      return
    }
    if (!renderer.getContext()) {
      setFailed(true)
      return
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.08
    renderer.setClearColor(COL.void, 1)

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(COL.void.getHex(), 0.0034)

    const camera = new THREE.PerspectiveCamera(53, 1, 0.1, 2600)
    scene.add(camera)

    // --- Light -----------------------------------------------------------------------------
    const sunLight = new THREE.PointLight(0xffc98a, 2.8, 0, 0)
    scene.add(sunLight)
    scene.add(new THREE.AmbientLight(0x16294a, 1.1))
    const fill = new THREE.DirectionalLight(0x2b4d80, 0.55)
    fill.position.set(0, 1, 0)
    scene.add(fill)

    // --- Materials -------------------------------------------------------------------------
    const circuit = circuitTexture()
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x2a3344, metalness: 0.78, roughness: 0.42 })
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x8c96a8,
      map: circuit,
      metalness: 0.66,
      roughness: 0.5,
      emissive: COL.sun,
      emissiveMap: circuit,
      emissiveIntensity: 0.55,
    })
    const hexMat = new THREE.MeshStandardMaterial({
      color: 0x141a26,
      metalness: 0.7,
      roughness: 0.36,
      emissive: 0x0b1524,
      emissiveIntensity: 0.6,
    })
    const moduleMat = new THREE.MeshStandardMaterial({
      color: 0x9aa4b8,
      map: circuit,
      metalness: 0.7,
      roughness: 0.4,
      emissive: COL.hot,
      emissiveMap: circuit,
      emissiveIntensity: 1.1,
    })
    const tealMat = new THREE.MeshBasicMaterial({ color: COL.teal })
    const hotMat = new THREE.MeshBasicMaterial({ color: COL.hot })

    // --- Outer structure: instanced gallery ------------------------------------------------
    const box = new THREE.BoxGeometry(1, 1, 1)
    const hexGeo = new THREE.CylinderGeometry(0.62, 0.62, 0.08, 6)

    const steelList: THREE.Matrix4[] = []
    const plateList: THREE.Matrix4[] = []
    const tealList: THREE.Matrix4[] = []
    const hotList: THREE.Matrix4[] = []
    const hexList: THREE.Matrix4[] = []
    const slots: Slot[] = []

    const frame = new THREE.Matrix4()
    const local = new THREE.Matrix4()
    const dummy = new THREE.Object3D()

    const push = (list: THREE.Matrix4[], x: number, y: number, z: number, sx: number, sy: number, sz: number, rx = 0, ry = 0, rz = 0) => {
      dummy.position.set(x, y, z)
      dummy.rotation.set(rx, ry, rz)
      dummy.scale.set(sx, sy, sz)
      dummy.updateMatrix()
      list.push(new THREE.Matrix4().multiplyMatrices(frame, dummy.matrix))
    }

    for (let k = 0; k < N_SEG; k++) {
      const theta = k * D_THETA
      ringMatrix(theta, frame)

      // Four chords.
      for (const x of [WALL_X, EDGE_X]) for (const y of [CEIL_Y, FLOOR_Y]) push(steelList, x, y, 0, 0.16, 0.16, SEG_LEN + 0.02)
      // Outer wall posts and one diagonal.
      for (const z of [-1, 1]) push(steelList, WALL_X, 0.2, z, 0.12, 3.6, 0.12)
      push(steelList, WALL_X, 0.2, 0, 0.08, 4.15, 0.08, k % 2 ? 0.5 : -0.5)
      // Deck plate.
      push(plateList, (WALL_X + EDGE_X) / 2, FLOOR_Y - 0.06, 0, WALL_X - EDGE_X, 0.08, SEG_LEN)
      // Outer wall plate, with gaps where the framework is unfinished.
      if (k % 3 !== 2) push(plateList, WALL_X + 0.08, 0.2, 0, 0.06, 3.7, SEG_LEN)
      // Transverse rib every second segment.
      if (k % 2 === 0) {
        push(steelList, EDGE_X, 0.2, 0, 0.12, 3.6, 0.12)
        push(steelList, (WALL_X + EDGE_X) / 2, CEIL_Y, 0, WALL_X - EDGE_X, 0.12, 0.12)
        push(steelList, (WALL_X + EDGE_X) / 2, FLOOR_Y, 0, WALL_X - EDGE_X, 0.12, 0.12)
        push(hotList, EDGE_X - 0.1, -1.3, 0, 0.07, 0.07, 0.07)
      }
      // Teal running lights on the inward top chord.
      for (const z of [-1, 1]) push(tealList, EDGE_X - 0.1, CEIL_Y - 0.12, z, 0.09, 0.09, 0.09)

      // Ceiling hex tiling, with docking slots left open on odd segments.
      for (let r = 0; r < 4; r++) {
        const z = -SEG_LEN / 2 + 0.475 + r * 0.95
        const odd = (k * 4 + r) % 2 === 1
        const cols = odd ? [-0.1, 1.0] : [-0.65, 0.45, 1.55]
        for (let c = 0; c < cols.length; c++) {
          const x = cols[c]
          const isSlot = k % 2 === 1 && r === 1 && c === 1
          if (isSlot) {
            slots.push({ theta, local: new THREE.Vector3(x, CEIL_Y + 0.05, z), arc: k * SEG_LEN + z })
            continue
          }
          push(hexList, x, CEIL_Y + 0.05, z, 1, 1, 1, 0, (k + r) % 2 ? Math.PI / 6 : 0)
        }
      }
    }

    const makeInstanced = (geo: THREE.BufferGeometry, mat: THREE.Material, list: THREE.Matrix4[]) => {
      const mesh = new THREE.InstancedMesh(geo, mat, list.length)
      list.forEach((m, i) => mesh.setMatrixAt(i, m))
      mesh.instanceMatrix.needsUpdate = true
      mesh.frustumCulled = false
      scene.add(mesh)
      return mesh
    }
    makeInstanced(box, steelMat, steelList)
    makeInstanced(box, plateMat, plateList)
    makeInstanced(box, tealMat, tealList)
    makeInstanced(box, hotMat, hotList)
    makeInstanced(hexGeo, hexMat, hexList)

    // Docked modules: one instance per slot, scaled to zero until the module locks in.
    const docked = new THREE.InstancedMesh(hexGeo, moduleMat, slots.length)
    docked.frustumCulled = false
    const slotMatrix: THREE.Matrix4[] = slots.map((s) => {
      ringMatrix(s.theta, frame)
      dummy.position.copy(s.local)
      dummy.rotation.set(0, Math.PI / 6, 0)
      dummy.scale.set(1, 1, 1)
      dummy.updateMatrix()
      return new THREE.Matrix4().multiplyMatrices(frame, dummy.matrix)
    })
    const zero = new THREE.Matrix4().makeScale(0, 0, 0)
    slotMatrix.forEach((_, i) => docked.setMatrixAt(i, zero))
    scene.add(docked)

    // Flying modules: a small pool reused for whichever slots are mid-dock.
    const modules: Module[] = []
    const clampGeo = new THREE.BoxGeometry(0.08, 0.3, 0.1)
    const lightGeo = new THREE.SphereGeometry(0.07, 8, 8)
    for (let i = 0; i < 4; i++) {
      const group = new THREE.Group()
      const plate = new THREE.Mesh(hexGeo, moduleMat)
      plate.rotation.y = Math.PI / 6
      group.add(plate)
      const clamps: THREE.Mesh[] = []
      for (let c = 0; c < 4; c++) {
        const clamp = new THREE.Mesh(clampGeo, steelMat)
        group.add(clamp)
        clamps.push(clamp)
      }
      const dockLight = new THREE.Mesh(lightGeo, hotMat)
      dockLight.position.set(0, -0.14, 0)
      group.add(dockLight)
      const tug = new THREE.Mesh(lightGeo, tealMat)
      group.add(tug)
      group.visible = false
      scene.add(group)
      modules.push({ group, clamps, dockLight, tug, slot: -1 })
    }

    // --- Inner structure: inclined orbit, built on the near half only ---------------------
    const inner = new THREE.Group()
    inner.rotation.order = 'YXZ'
    scene.add(inner)
    const nIn = 56
    const segIn = (2 * Math.PI * R_IN) / nIn
    const innerList: THREE.Matrix4[] = []
    const innerRailList: THREE.Matrix4[] = []
    frame.identity()
    for (let i = 0; i < nIn; i++) {
      let phi = (i / nIn) * Math.PI * 2
      if (phi > Math.PI) phi -= Math.PI * 2
      if (Math.abs(phi) > IN_ARC) continue
      const built = Math.abs(phi) < IN_ARC - 0.25
      dummy.position.set(R_IN * Math.cos(phi), 0, R_IN * Math.sin(phi))
      dummy.rotation.set(0, -phi, 0)
      dummy.scale.set(built ? 4.2 : 1.6, 0.26, segIn + 0.02)
      dummy.updateMatrix()
      innerList.push(dummy.matrix.clone())
      dummy.position.set((R_IN - 2.2) * Math.cos(phi), 0.3, (R_IN - 2.2) * Math.sin(phi))
      dummy.scale.set(0.16, 0.5, segIn + 0.02)
      dummy.updateMatrix()
      innerRailList.push(dummy.matrix.clone())
    }
    const innerMesh = new THREE.InstancedMesh(box, plateMat, innerList.length)
    innerList.forEach((m, i) => innerMesh.setMatrixAt(i, m))
    innerMesh.instanceMatrix.needsUpdate = true
    innerMesh.frustumCulled = false
    inner.add(innerMesh)
    const innerRail = new THREE.InstancedMesh(box, steelMat, innerRailList.length)
    innerRailList.forEach((m, i) => innerRail.setMatrixAt(i, m))
    innerRail.instanceMatrix.needsUpdate = true
    innerRail.frustumCulled = false
    inner.add(innerRail)

    // Mirror swarm sliding into line along the inner orbit.
    const swarmCount = 1800
    const swarmPos = new Float32Array(swarmCount * 3)
    for (let i = 0; i < swarmCount; i++) {
      const phi = (Math.random() * 2 - 1) * (IN_ARC + 0.5)
      const r = R_IN + (Math.random() - 0.5) * 6 + (Math.abs(phi) > IN_ARC ? Math.random() * 4 : 0)
      swarmPos[i * 3] = r * Math.cos(phi)
      swarmPos[i * 3 + 1] = (Math.random() - 0.5) * 1.8
      swarmPos[i * 3 + 2] = r * Math.sin(phi)
    }
    const swarmGeo = new THREE.BufferGeometry()
    swarmGeo.setAttribute('position', new THREE.BufferAttribute(swarmPos, 3))
    const swarmMat = new THREE.PointsMaterial({
      color: COL.hot,
      size: 0.42,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    inner.add(new THREE.Points(swarmGeo, swarmMat))

    // --- Sun ---------------------------------------------------------------------------------
    const sunUniforms = { uTime: { value: 0 } }
    const sunMat = new THREE.ShaderMaterial({ vertexShader: SUN_VERT, fragmentShader: SUN_FRAG, uniforms: sunUniforms, fog: false })
    sunMat.toneMapped = false
    const sun = new THREE.Mesh(new THREE.SphereGeometry(SUN_R, 64, 40), sunMat)
    scene.add(sun)

    const haloTex = glowTexture('rgba(250,195,69,0.95)', 'rgba(217,102,28,0.28)', 0.32)
    const coronaTex = glowTexture('rgba(250,195,69,0.55)', 'rgba(217,102,28,0.12)', 0.4)
    const spriteMat = (map: THREE.Texture, opacity: number) =>
      new THREE.SpriteMaterial({ map, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
    const halo = new THREE.Sprite(spriteMat(haloTex, 0.9))
    halo.scale.set(SUN_R * 3.2, SUN_R * 3.2, 1)
    scene.add(halo)
    const corona = new THREE.Sprite(spriteMat(coronaTex, 0.55))
    corona.scale.set(SUN_R * 7.5, SUN_R * 7.5, 1)
    scene.add(corona)
    const flare = new THREE.Sprite(spriteMat(coronaTex, 0.5))
    flare.scale.set(SUN_R * 22, SUN_R * 0.42, 1)
    scene.add(flare)

    // --- Stars -------------------------------------------------------------------------------
    const starCount = 2600
    const starPos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(1400)
      starPos[i * 3] = v.x
      starPos[i * 3 + 1] = v.y
      starPos[i * 3 + 2] = v.z
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    const starMat = new THREE.PointsMaterial({ color: 0xc9d2e6, size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0.7, fog: false, depthWrite: false })
    scene.add(new THREE.Points(starGeo, starMat))

    // --- Camera rig ---------------------------------------------------------------------------
    const camFrame = new THREE.Matrix4()
    const camPos = new THREE.Vector3()
    const camTarget = new THREE.Vector3()
    const fwd = new THREE.Vector3()
    const inward = new THREE.Vector3()
    const upV = new THREE.Vector3(0, 1, 0)
    const tmp = new THREE.Vector3()
    let aspect = 1

    const placeCamera = (arc: number, p: number) => {
      const theta = arc / R_OUT
      ringMatrix(theta, camFrame)
      const e = p * p * (3 - 2 * p)
      const portrait = THREE.MathUtils.clamp((1.78 - aspect) / (1.78 - 0.5), 0, 1)
      const yaw = THREE.MathUtils.degToRad(THREE.MathUtils.lerp(63, 76, portrait)) + e * THREE.MathUtils.degToRad(3)
      const pitch = THREE.MathUtils.degToRad(THREE.MathUtils.lerp(0.5, -4.5, e))
      const roll = THREE.MathUtils.degToRad(-2.2 * e)

      const localX = THREE.MathUtils.lerp(0.35, 0.15, e)
      const localY = THREE.MathUtils.lerp(0.2, -1.05, e)
      camPos.set(localX, localY, 0).applyMatrix4(camFrame)

      fwd.setFromMatrixColumn(camFrame, 2)
      inward.setFromMatrixColumn(camFrame, 0).negate()
      tmp.copy(fwd).multiplyScalar(Math.cos(yaw)).addScaledVector(inward, Math.sin(yaw))
      tmp.multiplyScalar(Math.cos(pitch)).addScaledVector(upV, Math.sin(pitch))
      camTarget.copy(camPos).add(tmp)

      camera.position.copy(camPos)
      camera.up.set(0, 1, 0)
      camera.lookAt(camTarget)
      camera.rotateZ(roll)

      inner.rotation.set(0, -theta, -IN_TILT)
    }

    // --- Docking -----------------------------------------------------------------------------
    const slotWorld = new THREE.Vector3()
    const startPos = new THREE.Vector3()
    const ctrlPos = new THREE.Vector3()
    const qSlot = new THREE.Quaternion()
    const qStart = new THREE.Quaternion()
    const eStart = new THREE.Euler(0.9, 0.4, -0.7)
    const cubic = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, t: number, out: THREE.Vector3) => {
      const u = 1 - t
      return out.set(0, 0, 0).addScaledVector(a, u * u).addScaledVector(b, 2 * u * t).addScaledVector(c, t * t)
    }

    const updateDocking = (arc: number, time: number) => {
      let poolIdx = 0
      for (let i = 0; i < slots.length; i++) {
        let rel = slots[i].arc - arc
        rel = ((rel % ARC_TOTAL) + ARC_TOTAL) % ARC_TOTAL
        if (rel > ARC_TOTAL / 2) rel -= ARC_TOTAL
        const d = THREE.MathUtils.clamp((DOCK_LEAD - rel) / DOCK_LEN, 0, 1)
        docked.setMatrixAt(i, d >= 1 ? slotMatrix[i] : zero)
        if (d > 0 && d < 1 && poolIdx < modules.length) {
          const m = modules[poolIdx++]
          m.group.visible = true
          ringMatrix(slots[i].theta, frame)
          slotWorld.copy(slots[i].local).applyMatrix4(frame)
          qSlot.setFromRotationMatrix(frame)
          // Start out in the void on the sun side, below and slightly ahead of the slot.
          startPos.set(slots[i].local.x - 7.5, slots[i].local.y - 5.5, slots[i].local.z + 3).applyMatrix4(frame)
          ctrlPos.set(slots[i].local.x - 3.2, slots[i].local.y - 3.2, slots[i].local.z + 0.6).applyMatrix4(frame)
          const t = d * d * (3 - 2 * d)
          cubic(startPos, ctrlPos, slotWorld, t, m.group.position)
          qStart.setFromEuler(eStart).premultiply(qSlot)
          m.group.quaternion.copy(qStart).slerp(qSlot, Math.min(1, t * 1.25))
          const close = THREE.MathUtils.clamp((d - 0.82) / 0.16, 0, 1)
          for (let c = 0; c < 4; c++) {
            const a = (c / 4) * Math.PI * 2 + Math.PI / 6
            const r = THREE.MathUtils.lerp(0.95, 0.58, close)
            m.clamps[c].position.set(Math.cos(a) * r, THREE.MathUtils.lerp(-0.34, -0.12, close), Math.sin(a) * r)
            m.clamps[c].rotation.set(0, -a, THREE.MathUtils.lerp(0.9, 0, close))
          }
          const pulse = 0.5 + 0.5 * Math.sin(time * 18)
          m.dockLight.visible = d > 0.7
          m.dockLight.scale.setScalar(1 + pulse * close * 1.4)
          m.tug.visible = d < 0.85
          m.tug.position.set(0, -0.2, 0.9)
        }
      }
      for (; poolIdx < modules.length; poolIdx++) modules[poolIdx].group.visible = false
      docked.instanceMatrix.needsUpdate = true
    }

    // --- Size / DPR ----------------------------------------------------------------------------
    const resize = () => {
      const parent = canvas.parentElement
      const w = parent?.clientWidth || window.innerWidth
      const h = parent?.clientHeight || window.innerHeight
      const budget = 4.4e6
      const dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(budget / Math.max(1, w * h)))
      renderer.setPixelRatio(dpr)
      renderer.setSize(w, h, false)
      aspect = w / h
      camera.aspect = aspect
      const portrait = THREE.MathUtils.clamp((1.78 - aspect) / (1.78 - 0.5), 0, 1)
      camera.fov = THREE.MathUtils.lerp(53, 78, portrait)
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    // --- Loop ---------------------------------------------------------------------------------
    let raf = 0
    let running = false
    let visible = true
    let smooth = reduced ? 1 : 0
    const t0 = performance.now()
    let last = t0
    let cruise = 0

    const renderFrame = (time: number) => {
      sunUniforms.uTime.value = time
      const arc = cruise + smooth * SCROLL_ARC + 2.6
      placeCamera(arc, smooth)
      updateDocking(arc, time)
      renderer.render(scene, camera)
    }

    const loop = () => {
      if (!running) return
      raf = requestAnimationFrame(loop)
      const now = performance.now()
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      cruise += CRUISE_SPEED * dt
      const target = THREE.MathUtils.clamp(progressRef.current, 0, 1)
      smooth += (target - smooth) * Math.min(1, dt * 6)
      renderFrame((now - t0) / 1000)
    }

    const start = () => {
      if (running || reduced) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    if (reduced) {
      renderFrame(0)
      const rerender = () => {
        resize()
        renderFrame(0)
      }
      window.addEventListener('resize', rerender)
      return () => {
        window.removeEventListener('resize', rerender)
        window.removeEventListener('resize', resize)
        renderer.dispose()
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true
        if (visible && !document.hidden) start()
        else stop()
      },
      { threshold: 0 }
    )
    io.observe(canvas)
    const onVis = () => {
      if (document.hidden) stop()
      else if (visible) start()
    }
    document.addEventListener('visibilitychange', onVis)
    start()

    const onLost = (ev: Event) => {
      ev.preventDefault()
      stop()
      setFailed(true)
    }
    canvas.addEventListener('webglcontextlost', onLost)

    return () => {
      stop()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('webglcontextlost', onLost)
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
      })
      ;[steelMat, plateMat, hexMat, moduleMat, tealMat, hotMat, sunMat, swarmMat, starMat].forEach((m) => m.dispose())
      ;[circuit, haloTex, coronaTex].forEach((t) => t.dispose())
      renderer.dispose()
    }
  }, [progressRef, reduced])

  if (failed) {
    return <div className="dyson-fallback" aria-hidden="true" />
  }

  return <canvas ref={canvasRef} className="dyson-canvas" aria-hidden="true" />
}
