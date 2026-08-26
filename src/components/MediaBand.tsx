'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const SENTENCE =
  'Sunrise also creates image, video, and audio with generative AI for content production.'

export default function MediaBand({ reduced }: { reduced: boolean }) {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const scope = rootRef.current
    if (!scope || reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.media-word',
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.35,
          scrollTrigger: { trigger: scope, start: 'top 78%', end: 'bottom 62%', scrub: 0.6 },
        }
      )
    }, scope)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="media" className="media-band" ref={rootRef}>
      <div className="media-grid">
        <div className="section-tag" style={{ marginBottom: 0 }}>
          <i />
          <span className="mono">04 — Media</span>
        </div>
        <p className="media-line">
          {SENTENCE.split(' ').map((w, i) => (
            <span className="media-word" key={`${w}-${i}`} style={{ display: 'inline-block', marginRight: '0.28em' }}>
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
