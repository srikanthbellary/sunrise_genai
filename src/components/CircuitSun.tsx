'use client'

import { useEffect, useRef } from 'react'
import { createHeroScene } from '@/lib/heroScene'

export default function CircuitSun() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hero = createHeroScene(canvas, reduced)
    let frame = 0
    let alive = true

    const onResize = () => {
      hero.resize()
      if (reduced) hero.frame(0)
    }

    onResize()
    const observer = new ResizeObserver(onResize)
    observer.observe(canvas)

    if (!reduced) {
      const tick = (time: number) => {
        if (!alive) return
        hero.frame(time)
        frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    return () => {
      alive = false
      cancelAnimationFrame(frame)
      observer.disconnect()
      hero.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="circuit-sun" aria-hidden="true" />
}
