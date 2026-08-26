'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, revealLines, riseIn } from '@/lib/motion'
import MemoryCanvas from './MemoryCanvas'
import Magnetic from './Magnetic'

export default function OpenStinger({ reduced }: { reduced: boolean }) {
  const rootRef = useRef<HTMLElement>(null)
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    let alive = true
    fetch('https://api.github.com/repos/srikanthbellary/openstinger')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d && typeof d.stargazers_count === 'number') setStars(d.stargazers_count)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    const scope = rootRef.current
    if (!scope || reduced) return
    const ctx = gsap.context(() => {
      revealLines(scope, '.section-title .line-inner', scope)
      riseIn(scope, '.js-rise', scope, 0.07)
    }, scope)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="openstinger" className="section stinger" ref={rootRef}>
      <div className="section-head">
        <div>
          <div className="section-tag js-rise">
            <i />
            <span className="mono">02 — Open source</span>
          </div>
          <h2 className="section-title">
            <span className="line-mask">
              <span className="line-inner">OpenStinger</span>
            </span>
            <span className="line-mask">
              <span className="line-inner">
                <span className="dim">Portable MCP</span>
              </span>
            </span>
            <span className="line-mask">
              <span className="line-inner">
                <span className="dim">agent memory.</span>
              </span>
            </span>
          </h2>
        </div>
        <div>
          <p className="lede js-rise">
            Agents forget the moment the session closes, and every tool keeps its own private notebook. OpenStinger
            gives them one memory that travels: written once, recalled from any MCP client you happen to be using
            tomorrow.
          </p>
        </div>
      </div>

      <div className="stinger-grid">
        <div>
          <p className="stinger-kicker js-rise">Memory that outlives the session — and the tool.</p>
          <p className="stinger-body js-rise">
            Entities, decisions, threads, and artifacts land in a store you host. Any MCP-capable client can write to it
            and read from it, so context follows the work instead of the vendor. Self-hosted by design: your agents&rsquo;
            memory of your business stays yours.
          </p>
          <div className="stinger-facts js-rise">
            <span className="chip chip-sun">MCP native</span>
            <span className="chip chip-teal">Self-hosted</span>
            <span className="chip">Open source</span>
            {stars !== null && <span className="chip">{stars} stars on GitHub</span>}
          </div>
          <div className="js-rise" style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
            <Magnetic href="https://github.com/srikanthbellary/openstinger" className="cta cta-sun" external>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
              </svg>
              <span>github.com/srikanthbellary/openstinger</span>
            </Magnetic>
            <Magnetic href="https://openstinger.com" className="cta cta-teal" external>
              <span>openstinger.com</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </Magnetic>
          </div>
        </div>

        <div className="stinger-canvas-wrap js-rise" data-cursor="canvas">
          <MemoryCanvas reduced={reduced} />
          <span className="canvas-label">Fig. 02 — write / recall across clients</span>
          <span className="canvas-corner tl" />
          <span className="canvas-corner tr" />
          <span className="canvas-corner bl" />
          <span className="canvas-corner br" />
        </div>
      </div>
    </section>
  )
}
