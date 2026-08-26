'use client'

import { useEffect, useRef } from 'react'

export default function SiteCursor() {
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ring = ringRef.current
    if (!ring) return

    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) {
      ring.hidden = true
      document.documentElement.classList.remove('has-cursor')
      return
    }

    document.documentElement.classList.add('has-cursor')
    ring.hidden = false

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const target = { x: pos.x, y: pos.y }
    let hover = false
    let raf = 0
    let running = true

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      const el = e.target as Element | null
      hover = !!el?.closest('a, button, [data-cursor="hover"]')
    }

    const tick = () => {
      if (!running) return
      pos.x += (target.x - pos.x) * 0.18
      pos.y += (target.y - pos.y) * 0.18
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${hover ? 1.65 : 1})`
      ring.classList.toggle('is-hover', hover)
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return <div ref={ringRef} className="site-cursor" hidden aria-hidden="true" />
}
