'use client'

import { useEffect, useRef, useState } from 'react'
import DysonCanvas from './DysonCanvas'
import { HERO } from '@/lib/content'

export default function DysonHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const typeRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const [reduced, setReduced] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    setMounted(true)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reduced) {
      progressRef.current = 1
      return
    }
    const section = sectionRef.current
    if (!section) return
    // Review aid: ?p=0.5 pins the scrub so a frame can be inspected without scrolling.
    const pinned = parseFloat(new URLSearchParams(window.location.search).get('p') ?? '')
    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const travel = Math.max(1, rect.height - vh)
      const p = Number.isFinite(pinned) ? Math.min(1, Math.max(0, pinned)) : Math.min(1, Math.max(0, -rect.top / travel))
      progressRef.current = p
      const type = typeRef.current
      if (type) {
        type.style.transform = `translate3d(0, ${(-p * 34).toFixed(2)}px, 0)`
        type.style.opacity = String(1 - Math.max(0, (p - 0.55) / 0.45) * 0.55)
      }
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  return (
    <section className="dyson" ref={sectionRef} data-reduced={reduced}>
      <div className="dyson-stage">
        {mounted && <DysonCanvas progressRef={progressRef} reduced={reduced} />}
        <div className="dyson-scrim" />

        <div className="dyson-inner">
          <div className="dyson-type" ref={typeRef}>
            <div className="hero-eyebrow">
              <i />
              <span className="mono">{HERO.wordmark}</span>
            </div>
            <h1 className="hero-title">
              <span className="line-mask">
                <span className="line-inner">{HERO.headline[0]}</span>
              </span>
              <span className="line-mask">
                <span className="line-inner">
                  built to <em>run.</em>
                </span>
              </span>
            </h1>
            <div className="hero-sub">
              <span className="hero-tagline">{HERO.tagline}</span>
              <p className="hero-lede">Agents, retrieval, and data platforms in production.</p>
            </div>
          </div>

          <div className="dyson-foot">
            <span className="mono">Sunrise Gen AI LLC · Florida, United States</span>
            <span className="hero-scroll mono">
              <i />
              Scroll to glide
            </span>
            <span className="mono dyson-fig">Preview · Outer structure, inward face</span>
          </div>
        </div>

        <span className="canvas-corner tl" />
        <span className="canvas-corner tr" />
        <span className="canvas-corner bl" />
        <span className="canvas-corner br" />
      </div>
    </section>
  )
}
