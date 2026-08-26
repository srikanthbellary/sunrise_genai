'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import HeroField, { type HeroFieldHandle } from '@/components/HeroField'
import SiteCursor from '@/components/SiteCursor'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [stars, setStars] = useState<number | null>(null)
  const [ready, setReady] = useState(false)

  const heroRef = useRef<HTMLElement>(null)
  const fieldRef = useRef<HeroFieldHandle>(null)
  const filmsRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 80)
    fetch('https://api.github.com/repos/srikanthbellary/openstinger')
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count)
        }
      })
      .catch(() => setStars(null))
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const desktop = window.matchMedia('(min-width: 800px)').matches

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.3,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    if (heroRef.current) {
      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=70%',
          scrub: 0.6,
          pin: desktop,
          anticipatePin: 1,
          onUpdate: (self) => fieldRef.current?.setScroll(self.progress),
        },
      })
        .to('.hero-copy', { y: -36, opacity: 0, ease: 'none' }, 0)
        .to('.scroll-indicator', { opacity: 0, ease: 'none' }, 0)
    }

    if (desktop && filmsRef.current && trackRef.current) {
      const getDistance = () =>
        Math.max(0, trackRef.current!.scrollWidth - window.innerWidth + 48)

      gsap.to(trackRef.current, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: filmsRef.current,
          start: 'top 18%',
          end: () => `+=${Math.max(getDistance(), 320)}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      gsap.ticker.remove(ticker)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <SiteCursor />

      <header className="site-nav">
        <a href="/" className="nav-wordmark">
          Sunrise Gen AI
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#work" className="nav-link">
            Work
          </a>
          <a href="#product" className="nav-link">
            Product
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </nav>
      </header>

      <main>
        <section ref={heroRef} className={`hero${ready ? ' is-ready' : ''}`}>
          <HeroField ref={fieldRef} />
          <div className="hero-copy">
            <p className="hero-kicker">Wellington, Florida</p>
            <h1 className="hero-lede">
              Production systems for operations and messy knowledge.
            </h1>
            <span className="hero-serif">We ship the tools we use.</span>
          </div>
          <div className="scroll-indicator" aria-hidden="true">
            Scroll
          </div>
        </section>

        <section id="work" className="section">
          <div className="wrap">
            <p className="eyebrow">Work</p>
            <h2 className="section-title">What we take on</h2>
            <p className="section-intro">
              We design production systems for operations and messy knowledge —
              and we ship the tools we use.
            </p>
            <div className="work-grid">
              <article className="work-item">
                <h3>Operations</h3>
                <p>
                  When an incident starts, the answer is usually already in
                  tickets, runbooks, and monitoring. We wire that material into
                  systems that recommend the next action — not another dashboard.
                </p>
              </article>
              <article className="work-item">
                <h3>Knowledge</h3>
                <p>
                  Most enterprises do not have a knowledge problem. They have a
                  trust problem. We build retrieval over the documents people
                  already use, with enough grounding that an answer can be
                  checked.
                </p>
              </article>
              <article className="work-item">
                <h3>Data</h3>
                <p>
                  Schema mapping across messy, multi-source systems is where
                  projects stall. We design the pipelines and the mapping work.
                </p>
                <p className="work-note">
                  Up to 60% workload reduction on schema and data-pipeline work.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="product" className="section">
          <div className="wrap">
            <p className="eyebrow">Product</p>
            <div className="product-row">
              <div>
                <h2 className="product-name">OpenStinger</h2>
                <p className="product-lede">Portable memory for MCP agents.</p>
              </div>
              <p className="product-body">
                Self-hosted, MIT-licensed memory that travels with the workflow.
                The tool we use when agents need to remember — and the one we
                ship.
              </p>
              <div className="product-aside">
                <a
                  href="https://github.com/srikanthbellary/openstinger"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                  data-cursor="hover"
                >
                  GitHub{stars !== null ? ` · ${stars}` : ''}
                </a>
                <a
                  href="https://openstinger.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                  data-cursor="hover"
                >
                  openstinger.com
                </a>
                <p className="product-meta">MIT · Self-hosted</p>
              </div>
            </div>
          </div>
        </section>

        <section ref={filmsRef} id="craft" className="films section">
          <div className="films-pin">
            <div className="films-head">
              <p className="eyebrow">Craft</p>
              <h2 className="section-title">Short films</h2>
              <p className="section-intro">
                Proof of taste — not a product line.
              </p>
            </div>
            <div ref={trackRef} className="films-track">
              <article className="film-panel">
                <p className="film-index">01</p>
                <h3 className="film-title">Apocalyptic Roulette</h3>
                <p className="film-meta">
                  Extinction events, pulled into one storyline.
                </p>
              </article>
              <article className="film-panel">
                <p className="film-index">02</p>
                <h3 className="film-title">No Planet For Humans</h3>
                <p className="film-meta">
                  Sentient systems, and the world they leave.
                </p>
              </article>
              <article className="film-panel">
                <p className="film-index">03</p>
                <h3 className="film-title">Arcane Legacy</h3>
                <p className="film-meta">
                  RunwayML Gen:48. Forty-eight hours.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="wrap contact-row">
            <div>
              <p className="eyebrow">Contact</p>
              <h2 className="section-title">Start with a note</h2>
              <a
                href="mailto:sbellary@sunrisegenai.com"
                className="contact-email"
                data-cursor="hover"
              >
                sbellary@sunrisegenai.com
              </a>
              <a href="tel:+14403408383" className="contact-phone" data-cursor="hover">
                440-340-8383
              </a>
            </div>
            <p className="contact-place">
              Sunrise Gen AI LLC
              <br />
              Wellington, Florida
            </p>
          </div>
        </section>

        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Sunrise Gen AI LLC</span>
          <span>Wellington, FL</span>
        </footer>
      </main>
    </>
  )
}
