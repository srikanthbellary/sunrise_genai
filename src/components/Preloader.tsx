'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Preloader({ onDone, skip }: { onDone: () => void; skip: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLElement>(null)
  const countRef = useRef<HTMLDivElement>(null)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (skip) {
      setGone(true)
      onDone()
      return
    }
    const counter = { v: 0 }
    const tl = gsap.timeline({ onComplete: () => setGone(true) })

    tl.to(barRef.current, { scaleX: 1, duration: 1.25, ease: 'power2.inOut' }, 0)
    tl.to(
      counter,
      {
        v: 100,
        duration: 1.25,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
        },
      },
      0
    )
    tl.to('.preloader-fade', { opacity: 0, duration: 0.35, ease: 'power2.in' }, 1.2)
    // Collapse to a slit at the horizon so the hero aperture takes over from here.
    tl.to(rootRef.current, { clipPath: 'inset(50% 0% 50% 0%)', duration: 0.85, ease: 'expo.inOut' }, 1.28)
    // Hand off to the hero aperture while the curtain is still closing.
    tl.call(onDone, undefined, 1.34)

    return () => {
      tl.kill()
    }
  }, [onDone, skip])

  if (gone) return null

  return (
    <div ref={rootRef} className="preloader" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
      <div className="preloader-fade" style={{ position: 'absolute', inset: 'var(--gutter)', pointerEvents: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className="mono">Sunrise Gen AI</span>
          <span className="mono" style={{ color: 'var(--teal)' }}>
            Grounding the Autonomous Era
          </span>
        </div>
      </div>
      <div className="preloader-fade preloader-count" ref={countRef}>
        000
      </div>
      <div className="preloader-fade mono" style={{ paddingBottom: '0.6rem' }}>
        Wellington, FL
      </div>
      <div className="preloader-bar preloader-fade">
        <i ref={barRef} />
      </div>
    </div>
  )
}
