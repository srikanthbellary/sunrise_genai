'use client'

import { useEffect, useRef } from 'react'
import { gsap, revealLines, riseIn } from '@/lib/motion'
import { MEDIA_MODELS, MEDIA_SENTENCE, MEDIA_USES } from '@/lib/content'

export default function MediaBand({ reduced }: { reduced: boolean }) {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const scope = rootRef.current
    if (!scope || reduced) return
    const ctx = gsap.context(() => {
      revealLines(scope, '.section-title .line-inner', scope)
      riseIn(scope, '.js-rise', scope, 0.06)
      riseIn(scope, '.matrix-cell', scope.querySelector('.matrix') as Element, 0.06)

      gsap.fromTo(
        '.media-word',
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.35,
          scrollTrigger: {
            trigger: scope.querySelector('.media-statement') as Element,
            start: 'top 88%',
            end: 'bottom 68%',
            scrub: 0.6,
          },
        }
      )
    }, scope)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="media" className="section media-band" ref={rootRef}>
      <div className="section-head">
        <div>
          <div className="section-tag js-rise">
            <i />
            <span className="mono">04 — Media</span>
          </div>
          <h2 className="section-title">
            <span className="line-mask">
              <span className="line-inner">Content generation</span>
            </span>
            <span className="line-mask">
              <span className="line-inner">
                <span className="dim">with image, text,</span>
              </span>
            </span>
            <span className="line-mask">
              <span className="line-inner">
                <span className="dim">and video models.</span>
              </span>
            </span>
          </h2>
        </div>
        <div>
          <p className="lede js-rise">
            Sunrise produces content with generative models — the visuals, the words, and the motion — made for the
            brief instead of picked out of a library. The same practice that puts models into operations runs them for
            the work a marketing team has to ship.
          </p>
          <div className="js-rise" style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {MEDIA_USES.map((u) => (
              <span className="chip chip-sun" key={u}>
                {u}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="media-line media-statement">
        {MEDIA_SENTENCE.split(' ').map((w, i) => (
          <span className="media-word" key={`${w}-${i}`} style={{ display: 'inline-block', marginRight: '0.28em' }}>
            {w}
          </span>
        ))}
      </p>

      <div className="matrix">
        {MEDIA_MODELS.map((m) => (
          <div className="matrix-cell" key={m.n} data-cursor="cell">
            <div className="matrix-n">{m.n}</div>
            <h3 className="matrix-title">{m.title}</h3>
            <p className="matrix-body">{m.body}</p>
            <p className="matrix-meta mono">{m.output}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
