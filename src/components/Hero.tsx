'use client'

import { useEffect, useRef, useState } from 'react'
import HeroCanvas from './HeroCanvas'
import { gsap } from 'gsap'
import { HERO } from '@/lib/content'

function Clock() {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date())
      )
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])
  return <span className="mono hero-clock tabular">{time ? `${time} ET` : '\u00a0'}</span>
}

export default function Hero({ start, reduced }: { start: boolean; reduced: boolean }) {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!start) return
    const scope = rootRef.current
    if (!scope) return

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.line-inner, .hero-eyebrow, .hero-sub, .hero-foot', { yPercent: 0, opacity: 1 })
        return
      }
      const tl = gsap.timeline({ delay: 0.55 })
      tl.from('.hero-eyebrow', { opacity: 0, y: 14, duration: 0.9, ease: 'power3.out' }, 0)
      tl.from('.hero-meta-block, .hero-meta-rule', { opacity: 0, x: 20, duration: 1, ease: 'power3.out', stagger: 0.1 }, 0.9)
      tl.from(
        '.hero-title .line-inner',
        { yPercent: 112, duration: 1.35, ease: 'expo.out', stagger: 0.09 },
        0.05
      )
      tl.from('.hero-sub > *', { opacity: 0, y: 18, duration: 1, ease: 'power3.out', stagger: 0.09 }, 0.5)
      tl.from('.hero-foot > *', { opacity: 0, y: 12, duration: 0.9, ease: 'power3.out', stagger: 0.06 }, 0.7)

      gsap.to('.hero-type', {
        yPercent: -26,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, scope)

    return () => ctx.revert()
  }, [start, reduced])

  return (
    <section id="top" className="hero" ref={rootRef}>
      <HeroCanvas start={start} reduced={reduced} />
      <div className="hero-scrim" />

      <div className="hero-inner">
        <div className="hero-meta">
          <div className="hero-meta-block">
            <strong>In production</strong>
            <span>Agents for SRE — Verizon</span>
            <span>Attribute &amp; schema mapping — Circana</span>
            <span>Mainframe to cloud — Thermo Fisher</span>
          </div>
          <div className="hero-meta-rule" />
          <div className="hero-meta-block">
            <strong>Shipping</strong>
            <span>OpenStinger — portable MCP agent memory</span>
            <span>Ingre — scan food and beauty labels</span>
          </div>
        </div>

        <div className="hero-type">
          <div className="hero-eyebrow">
            <i />
            <span className="mono">{HERO.wordmark}</span>
          </div>

          <h1 className="hero-title">
            {HERO.headline.map((line, i) => (
              <span className="line-mask" key={line}>
                <span className="line-inner">
                  {i === 2 ? (
                    <>
                      messy <em>knowledge.</em>
                    </>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          <div className="hero-sub">
            <span className="hero-tagline">{HERO.tagline}</span>
            <p className="hero-lede">{HERO.lede}</p>
          </div>
        </div>

        <div className="hero-foot">
          <span className="mono">Enterprise AI &amp; data · Est. Wellington, FL</span>
          <span className="hero-scroll mono">
            <i />
            Scroll
          </span>
          <Clock />
        </div>
      </div>
    </section>
  )
}
