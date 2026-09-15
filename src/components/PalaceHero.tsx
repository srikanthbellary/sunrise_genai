'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, scrollToId } from '@/lib/motion'
import PalaceCanvas from './PalaceCanvas'
import { Clock } from './Hero'
import { HERO, PALACE_CHAPTERS } from '@/lib/content'

/** Scroll-progress windows for the five chapters. Camera speed is constant; copy sidesteps. */
const WINDOWS: [number, number][] = [
  [0, 0.2],
  [0.2, 0.4],
  [0.4, 0.6],
  [0.6, 0.8],
  [0.8, 1],
]

function ArchRule() {
  return (
    <svg className="palace-rule" viewBox="0 0 64 14" aria-hidden="true">
      <path d="M0 13.5H18M46 13.5H64" />
      <path d="M22 13.5V9c0-3.3 4.2-6.5 10-8.5 5.8 2 10 5.2 10 8.5v4.5" />
    </svg>
  )
}

export default function PalaceHero({ start, reduced }: { start: boolean; reduced: boolean }) {
  const rootRef = useRef<HTMLElement>(null)
  const progressRef = useRef(0)
  const [chapter, setChapter] = useState(0)

  useEffect(() => {
    if (!start) return
    const scope = rootRef.current
    if (!scope) return

    const ctx = gsap.context(() => {
      const first = '.palace-chapter[data-n="0"]'

      if (reduced) {
        gsap.set(`${first} .line-inner, ${first} .hero-eyebrow, ${first} .hero-sub, .palace-foot, .palace-meta`, {
          yPercent: 0,
          opacity: 1,
        })
        return
      }

      // Intro: the lanterns are already lighting in the canvas; the type follows them in.
      const tl = gsap.timeline({ delay: 0.9 })
      tl.from(`${first} .hero-eyebrow`, { opacity: 0, y: 14, duration: 0.9, ease: 'power3.out' }, 0)
      tl.from('.palace-meta-block, .palace-meta-rule', { opacity: 0, x: 20, duration: 1, ease: 'power3.out', stagger: 0.1 }, 0.9)
      tl.from(`${first} .hero-title .line-inner`, { yPercent: 112, duration: 1.35, ease: 'expo.out', stagger: 0.09 }, 0.05)
      tl.from(`${first} .hero-sub > *`, { opacity: 0, y: 18, duration: 1, ease: 'power3.out', stagger: 0.09 }, 0.5)
      tl.from('.palace-foot > *', { opacity: 0, y: 12, duration: 0.9, ease: 'power3.out', stagger: 0.06 }, 0.7)

      // One master timeline whose progress is the scroll through the section.
      const master = gsap.timeline({ paused: true })
      const chapters = gsap.utils.toArray<HTMLElement>('.palace-chapter', scope)
      const fade = 0.035
      chapters.forEach((el, i) => {
        const [a, b] = WINDOWS[i]
        if (i > 0) {
          gsap.set(el, { opacity: 0, y: 30 })
          master.to(el, { opacity: 1, y: 0, duration: fade, ease: 'none' }, a + 0.012)
        }
        if (i < chapters.length - 1) {
          master.to(el, { opacity: 0, y: -24, duration: fade, ease: 'none' }, b - fade - 0.006)
        }
      })
      master.to('.palace-meta', { opacity: 0, duration: 0.05, ease: 'none' }, 0.1)
      master.to('.palace-scroll', { opacity: 0, duration: 0.04, ease: 'none' }, 0.03)
      master.to({}, { duration: 0.001 }, 1)

      let lastChapter = 0
      ScrollTrigger.create({
        trigger: scope,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.4,
        animation: master,
        onUpdate: (self) => {
          progressRef.current = self.progress
          const idx = Math.min(WINDOWS.length - 1, Math.floor(self.progress * WINDOWS.length))
          if (idx !== lastChapter) {
            lastChapter = idx
            setChapter(idx)
          }
        },
      })
    }, scope)

    return () => ctx.revert()
  }, [start, reduced])

  return (
    <section id="top" className="palace" ref={rootRef} data-reduced={reduced}>
      <div className="palace-stage">
        <PalaceCanvas start={start} reduced={reduced} progressRef={progressRef} />
        <div className="palace-scrim" aria-hidden="true" />

        <div className="palace-inner">
          <div className="palace-meta">
            <div className="palace-meta-block">
              <strong>What we build</strong>
              <span>Autonomous agents</span>
              <span>Agents and multi-agent systems</span>
              <span>RAG and LLM architecture</span>
              <span>Data processing with AI</span>
              <span>Platforms and delivery</span>
            </div>
            <div className="palace-meta-rule" />
            <div className="palace-meta-block">
              <strong>What we ship</strong>
              <span>OpenStinger · portable MCP agent memory</span>
              <span>Ingre · scan food and beauty labels</span>
            </div>
          </div>

          {PALACE_CHAPTERS.map((c, i) => (
            <div className="palace-chapter" data-n={i} data-side={c.side} key={c.n}>
              {i === 0 ? (
                <>
                  <div className="hero-eyebrow">
                    <i />
                    <span className="mono">{HERO.wordmark}</span>
                  </div>
                  <h1 className="hero-title">
                    {HERO.headline.map((line, k) => (
                      <span className="line-mask" key={line}>
                        <span className="line-inner">
                          {k === HERO.headline.length - 1 ? (
                            <>
                              built to <em>run.</em>
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
                </>
              ) : (
                <>
                  <div className="hero-eyebrow palace-eyebrow">
                    <i />
                    <span className="mono">
                      Chapter {c.n} · {c.name}
                    </span>
                  </div>
                  <h2 className="palace-title">
                    {c.title?.map((line) => (
                      <span className="line-mask" key={line}>
                        <span className="line-inner">{line}</span>
                      </span>
                    ))}
                  </h2>
                  <ArchRule />
                  <p className="palace-body">
                    {c.body?.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </p>
                  {c.cta ? (
                    <a
                      className="palace-cta"
                      href={c.cta.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToId(c.cta!.href)
                      }}
                    >
                      {c.cta.label}
                    </a>
                  ) : null}
                </>
              )}
            </div>
          ))}

          <div className="hero-foot palace-foot">
            <span className="mono">Sunrise Gen AI LLC · Florida, United States</span>
            <div className="palace-index mono" aria-label="Chapters">
              <span className="palace-scroll">
                <i />
                Scroll
              </span>
              {PALACE_CHAPTERS.map((c, i) => (
                <b key={c.n} data-active={i === chapter}>
                  {c.n}
                </b>
              ))}
              <span className="palace-index-name">{PALACE_CHAPTERS[chapter].name}</span>
            </div>
            <Clock />
          </div>
        </div>
      </div>
    </section>
  )
}
