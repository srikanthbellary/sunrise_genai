'use client'

import { useEffect, useRef } from 'react'
import { gsap, revealLines, riseIn } from '@/lib/motion'
import IngreCanvas from './IngreCanvas'
import Magnetic from './Magnetic'

const LABEL_ROWS: { name: string; flag?: 'high' | 'watch' }[] = [
  { name: 'Water, sugar, salt' },
  { name: 'Partially hydrogenated soybean oil', flag: 'high' },
  { name: 'High-fructose corn syrup', flag: 'watch' },
  { name: 'Sodium nitrite', flag: 'high' },
  { name: 'Red 40 (Allura Red AC)', flag: 'watch' },
  { name: 'Citric acid' },
  { name: 'Natural flavors' },
  { name: 'BHA (preservative)', flag: 'high' },
  { name: 'Ascorbic acid' },
]

const FINDINGS: { name: string; why: string; tag: string; level: 'high' | 'watch' | 'clear' }[] = [
  { name: 'Partially hydrogenated soybean oil', why: 'Industrial trans fat', tag: 'Food', level: 'high' },
  { name: 'Sodium nitrite', why: 'Cured-meat preservative', tag: 'Food', level: 'high' },
  { name: 'DMDM hydantoin', why: 'Formaldehyde releaser', tag: 'Beauty', level: 'high' },
  { name: 'Oxybenzone', why: 'UV filter under review', tag: 'Beauty', level: 'watch' },
  { name: 'Fragrance (parfum)', why: 'Undisclosed mixture', tag: 'Beauty', level: 'watch' },
]

export default function Ingre({ reduced }: { reduced: boolean }) {
  const rootRef = useRef<HTMLElement>(null)
  const scoreRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const scope = rootRef.current
    if (!scope) return

    const rows = gsap.utils.toArray<HTMLElement>('.label-row', scope)

    if (reduced) {
      rows.forEach((r) => {
        const f = r.dataset.target
        if (f) r.dataset.flag = f
      })
      gsap.set('.label-flag', { opacity: 1 })
      gsap.set(scope.querySelectorAll('.verdict'), { opacity: 1, y: 0 })
      if (scoreRef.current) scoreRef.current.textContent = '5'
      return
    }

    const ctx = gsap.context(() => {
      // The light chapter rises into full bleed as it enters.
      gsap.fromTo(
        scope,
        { scale: 0.93, borderRadius: '30px' },
        {
          scale: 1,
          borderRadius: '0px',
          ease: 'none',
          scrollTrigger: { trigger: scope, start: 'top bottom', end: 'top 12%', scrub: 0.5 },
        }
      )

      revealLines(scope, '.section-title .line-inner', scope)
      riseIn(scope, '.js-rise', scope, 0.06)
      riseIn(scope, '.finding', scope.querySelector('.findings') as Element, 0.08)

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 2.4,
        scrollTrigger: { trigger: scope, start: 'top 70%' },
      })

      tl.set(rows, { attr: { 'data-flag': '' } })
      tl.set('.label-flag', { opacity: 0 })
      tl.set('.verdict', { opacity: 0, y: 12 })
      tl.fromTo('.scan-beam', { top: '-18%' }, { top: '104%', duration: 2.1, ease: 'power1.inOut' }, 0)

      rows.forEach((row, i) => {
        const flag = row.dataset.target
        const at = 0.28 + i * 0.19
        if (!flag) return
        tl.set(row, { attr: { 'data-flag': flag } }, at)
        tl.to(row.querySelector('.label-flag'), { opacity: 1, duration: 0.3, ease: 'power2.out' }, at)
      })

      const counter = { v: 0 }
      tl.to('.verdict', { opacity: 1, y: 0, duration: 0.55, ease: 'expo.out' }, 2.15)
      tl.to(
        counter,
        {
          v: 5,
          duration: 0.6,
          ease: 'power2.out',
          onUpdate: () => {
            if (scoreRef.current) scoreRef.current.textContent = String(Math.round(counter.v))
          },
        },
        2.15
      )
    }, scope)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="ingre" className="section ingre" ref={rootRef}>
      <div className="section-head">
        <div>
          <div className="section-tag js-rise">
            <i />
            <span className="mono">03 — Product</span>
          </div>
          <h2 className="section-title">
            <span className="line-mask">
              <span className="line-inner">Ingre</span>
            </span>
            <span className="line-mask">
              <span className="line-inner">
                <span className="dim" style={{ color: 'rgba(10,12,16,0.35)' }}>
                  Know what is
                </span>
              </span>
            </span>
            <span className="line-mask">
              <span className="line-inner">
                <span className="dim" style={{ color: 'rgba(10,12,16,0.35)' }}>
                  actually in it.
                </span>
              </span>
            </span>
          </h2>
        </div>
        <div>
          <p className="lede js-rise">
            Ingredient lists are written to be skipped: eight-syllable names, four-point type, and a label designed to
            look reassuring. Ingre reads them for you.
          </p>
        </div>
      </div>

      <div className="ingre-wrap">
        <div>
          <p className="ingre-claim js-rise">
            Scan food and beauty labels. <b>See harmful ingredients.</b>
          </p>
          <p className="ingre-body js-rise">
            Point the camera at a package. Ingre pulls the ingredient list off the label, resolves the aliases that hide
            the same compound under six different names, and tells you which ones are worth caring about — and why — in
            the aisle, before you buy it.
          </p>
          <div className="ingre-meta js-rise">
            <span className="chip">Android</span>
            <span className="chip">iOS</span>
            <span className="chip">Food labels</span>
            <span className="chip">Beauty labels</span>
          </div>
          <div className="ingre-actions js-rise">
            <Magnetic href="https://ingre.ai" className="cta cta-ink cta-lg" external>
              <span>ingre.ai</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </Magnetic>
          </div>
        </div>

        <div className="js-rise">
          <div className="scanner">
            <div className="phone" data-cursor="phone">
              <div className="phone-screen">
                <span className="phone-notch" />
                <span className="scan-reticle" />
                <span className="scan-beam" />
                <div className="label-card">
                  <div className="label-head">Ingredients</div>
                  {LABEL_ROWS.map((r) => (
                    <div className="label-row" key={r.name} data-target={r.flag ?? ''} data-flag="">
                      <span>{r.name}</span>
                      <span className="label-flag">{r.flag === 'high' ? 'Avoid' : r.flag === 'watch' ? 'Watch' : ''}</span>
                    </div>
                  ))}
                </div>
                <div className="verdict">
                  <div className="verdict-score">
                    <b ref={scoreRef}>0</b>
                    <span className="mono-sm">flagged of 9</span>
                  </div>
                  <div className="verdict-note">
                    3 to avoid, 2 to watch. Tap any ingredient for the evidence behind the call.
                  </div>
                </div>
              </div>
            </div>

            <div className="findings">
              {FINDINGS.map((f) => (
                <div className="finding" key={f.name} data-level={f.level}>
                  <span className="finding-dot" />
                  <span>
                    <span className="finding-name">{f.name}</span>
                    <span className="finding-why">{f.why}</span>
                  </span>
                  <span className="finding-tag">{f.tag}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="scanner-note">Illustrative scan · Ingre for Android and iOS · ingre.ai</p>
        </div>
      </div>

      <div className="ingre-figure-wrap js-rise" data-cursor="figure">
        <div className="ingre-figure-legend">
          <span className="mono">Fig. 03 — scan · parse · flag · call</span>
          <span className="mono">Food and beauty labels · Android and iOS · ingre.ai</span>
        </div>
        <div className="ingre-figure">
          <IngreCanvas reduced={reduced} />
          <span className="canvas-corner canvas-corner-ink tl" />
          <span className="canvas-corner canvas-corner-ink tr" />
          <span className="canvas-corner canvas-corner-ink bl" />
          <span className="canvas-corner canvas-corner-ink br" />
        </div>
      </div>
    </section>
  )
}
