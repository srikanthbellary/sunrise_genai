'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, revealLines, riseIn } from '@/lib/motion'
import { CAPABILITIES, OFFERS, PROOF } from '@/lib/content'

export default function Consulting({ reduced }: { reduced: boolean }) {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLElement>(null)
  const footRef = useRef<HTMLDivElement>(null)

  const markActive = (index: number) => {
    const items = footRef.current?.children
    if (!items) return
    for (let i = 0; i < items.length; i++) {
      ;(items[i] as HTMLElement).dataset.active = String(i === index)
    }
  }

  useEffect(() => {
    const viewport = rootRef.current?.querySelector('.rail-viewport') as HTMLElement | null
    if (!viewport) return
    const onScroll = () => {
      const max = viewport.scrollWidth - viewport.clientWidth
      if (max <= 0) return
      const p = viewport.scrollLeft / max
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`
      markActive(Math.min(OFFERS.length - 1, Math.round(p * (OFFERS.length - 1))))
    }
    viewport.addEventListener('scroll', onScroll, { passive: true })
    return () => viewport.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const scope = rootRef.current
    if (!scope || reduced) return

    const ctx = gsap.context(() => {
      revealLines(scope, '.consulting-head .line-inner', scope)
      riseIn(scope, '.consulting-head .js-rise', scope, 0.07)
      riseIn(scope, '.matrix-cell', scope.querySelector('.matrix') as Element, 0.045)
      riseIn(scope, '.creds-item', scope.querySelector('.creds') as Element, 0.08)

      const mm = gsap.matchMedia()
      mm.add('(min-width: 901px)', () => {
        const track = trackRef.current
        const stage = stageRef.current
        if (!track || !stage) return
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96)

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) gsap.set(progressRef.current, { scaleX: self.progress })
              markActive(Math.min(OFFERS.length - 1, Math.floor(self.progress * OFFERS.length)))
            },
          },
        })

        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
          gsap.set(track, { x: 0 })
        }
      })

      return () => mm.revert()
    }, scope)

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => {
      window.clearTimeout(refresh)
      ctx.revert()
    }
  }, [reduced])

  return (
    <section id="consulting" className="section rail-section" ref={rootRef}>
      <div className="section-head consulting-head">
        <div>
          <div className="section-tag js-rise">
            <i />
            <span className="mono">01 — What we do</span>
          </div>
          <h2 className="section-title">
            <span className="line-mask">
              <span className="line-inner">We build</span>
            </span>
            <span className="line-mask">
              <span className="line-inner">production</span>
            </span>
            <span className="line-mask">
              <span className="line-inner">GenAI for</span>
            </span>
            <span className="line-mask">
              <span className="line-inner">
                <span className="dim">operations,</span>
              </span>
            </span>
            <span className="line-mask">
              <span className="line-inner">
                <span className="dim">knowledge, and</span>
              </span>
            </span>
            <span className="line-mask">
              <span className="line-inner">
                <span className="dim">data.</span>
              </span>
            </span>
          </h2>
        </div>
        <div>
          <p className="lede js-rise">
            Sunrise Gen AI is an enterprise GenAI and data practice. We are engaged when the model has to survive
            contact with production: live telemetry, real tickets, regulated workflows, and data that never agreed on a
            schema. These are the offers.
          </p>
          <div className="js-rise" style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span className="chip chip-sun">MCP-native delivery</span>
            <span className="chip chip-teal">Evaluation &amp; guardrails</span>
            <span className="chip">AWS · Azure · GCP</span>
          </div>
        </div>
      </div>

      <div className="rail-stage" ref={stageRef}>
        <div className="rail-head">
          <span className="mono">What we deliver</span>
          <span className="mono rail-hint">Keep scrolling — the rail advances</span>
          <span className="mono tabular">{String(OFFERS.length).padStart(2, '0')} offers</span>
        </div>
        <div className="rail-viewport">
          <div className="rail-track" ref={trackRef}>
            {OFFERS.map((offer, i) => (
              <article className="engagement" key={offer.id} data-cursor="card">
                <header className="engagement-top">
                  <span className="mono-sm tabular">
                    {String(i + 1).padStart(2, '0')} / {String(OFFERS.length).padStart(2, '0')}
                  </span>
                  <span className="mono-sm">{offer.discipline}</span>
                </header>

                <h3 className="engagement-client">{offer.title}</h3>
                <p className="engagement-program">{offer.kicker}</p>
                <p className="engagement-summary">{offer.summary}</p>

                <ul className="engagement-points">
                  {offer.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>

                {offer.metrics && (
                  <div className="engagement-metrics engagement-metrics-2">
                    {offer.metrics.map((m) => (
                      <div key={m.value}>
                        <div className="metric-value">{m.value}</div>
                        <div className="metric-label">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
        <div className="rail-progress">
          <i ref={progressRef} />
        </div>
        <div className="rail-foot" ref={footRef}>
          {OFFERS.map((offer, i) => (
            <span className="rail-foot-item mono" key={offer.id} data-active={i === 0}>
              <em style={{ fontStyle: 'normal' }}>{String(i + 1).padStart(2, '0')}</em> {offer.title}
            </span>
          ))}
        </div>
      </div>

      <div className="matrix">
        {CAPABILITIES.map((c) => (
          <div className="matrix-cell" key={c.n} data-cursor="cell">
            <div className="matrix-n">{c.n}</div>
            <h3 className="matrix-title">{c.title}</h3>
            <p className="matrix-body">{c.body}</p>
          </div>
        ))}
      </div>

      <div className="creds">
        {PROOF.map((p) => (
          <div className="creds-item" key={p.value}>
            <span className="creds-value tabular">{p.value}</span>
            <span className="mono">{p.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
