'use client'

import { useEffect, useRef, useState, type MutableRefObject } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { PalaceScene } from '@/lib/palaceScene'

type Props = {
  start: boolean
  reduced: boolean
  /** Scroll progress 0..1 through the flythrough, written by the hero's ScrollTrigger. */
  progressRef: MutableRefObject<number>
}

const POSTER = '/media/palace-sunrise-poster.jpg'

export default function PalaceCanvas({ start, reduced, progressRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)
  const igniteRef = useRef({ v: 0 })

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
    // Every material is a hand-written shader that outputs display colour directly.
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    renderer.setClearColor(0x000816, 1)

    const world = new PalaceScene()
    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    let smooth = reduced ? 1 : progressRef.current
    let raf = 0
    let running = false
    let inView = true
    let last = performance.now()
    const t0 = last

    const dprFor = (w: number, h: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      // Hold the fill budget near 4.5M device pixels so 4K desktops and 3x phones stay smooth.
      const budget = 4_500_000
      const px = w * h * dpr * dpr
      return px > budget ? Math.max(1, dpr * Math.sqrt(budget / px)) : dpr
    }

    const renderStatic = () => {
      world.update(1, 0, { x: 0, y: 0 }, 1)
      renderer.render(world.scene, world.camera)
    }

    const resize = () => {
      const parent = canvas.parentElement
      const w = parent?.clientWidth || window.innerWidth
      const h = parent?.clientHeight || window.innerHeight
      const dpr = dprFor(w, h)
      renderer.setPixelRatio(dpr)
      renderer.setSize(w, h, false)
      world.setViewport(w, h, dpr)
      if (reduced) renderStatic()
    }

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      smooth += (progressRef.current - smooth) * (1 - Math.exp(-dt * 7))
      pointer.x += (target.x - pointer.x) * 0.05
      pointer.y += (target.y - pointer.y) * 0.05
      world.update(smooth, (now - t0) / 1000, pointer, igniteRef.current.v)
      renderer.render(world.scene, world.camera)
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      frame(now)
    }
    const play = () => {
      if (running || reduced) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }
    const pause = () => {
      if (!running) return
      running = false
      cancelAnimationFrame(raf)
    }

    resize()
    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    const onPointer = (ev: PointerEvent) => {
      target.x = (ev.clientX / window.innerWidth) * 2 - 1
      target.y = (ev.clientY / window.innerHeight) * 2 - 1
    }
    if (!reduced) window.addEventListener('pointermove', onPointer, { passive: true })

    // Pause offscreen and in background tabs.
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (inView && !document.hidden) play()
        else pause()
      },
      { threshold: 0 }
    )
    io.observe(canvas)
    const onVisibility = () => {
      if (document.hidden) pause()
      else if (inView) play()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const onLost = (ev: Event) => {
      ev.preventDefault()
      pause()
      setFailed(true)
    }
    canvas.addEventListener('webglcontextlost', onLost)

    if (reduced) renderStatic()
    else play()

    return () => {
      pause()
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      canvas.removeEventListener('webglcontextlost', onLost)
      world.dispose()
      renderer.dispose()
    }
  }, [reduced, progressRef])

  // The hall lights itself lantern by lantern once the preloader hands over.
  useEffect(() => {
    if (!start || reduced) return
    const tween = gsap.to(igniteRef.current, { v: 1, duration: 2.8, ease: 'power2.inOut' })
    return () => {
      tween.kill()
    }
  }, [start, reduced])

  if (failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={POSTER} alt="" aria-hidden="true" className="palace-fallback" />
  }

  return <canvas ref={canvasRef} className="palace-canvas" aria-hidden="true" />
}
