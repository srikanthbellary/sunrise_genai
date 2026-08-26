'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...pos }
    let visible = false

    const move = (ev: PointerEvent) => {
      pos.x = ev.clientX
      pos.y = ev.clientY
      if (!visible) {
        visible = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      }
      const interactive = (ev.target as HTMLElement)?.closest?.('a, button, [data-cursor]')
      ring.dataset.state = interactive ? 'active' : 'idle'
    }

    const leave = () => {
      visible = false
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 })
    }

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16
      ringPos.y += (pos.y - ringPos.y) * 0.16
      gsap.set(dot, { x: pos.x, y: pos.y })
      gsap.set(ring, { x: ringPos.x, y: ringPos.y })
    }

    gsap.set([dot, ring], { opacity: 0 })
    gsap.ticker.add(tick)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" data-state="idle" aria-hidden="true" />
    </>
  )
}
