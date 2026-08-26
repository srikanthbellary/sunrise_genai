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
  const povRef = useRef<HTMLElement>(null)
  const workRef = useRef<HTMLElement>(null)
  const productRef = useRef<HTMLElement>(null)
  const filmsRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLElement>(null)

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

    const desktop = window.matchMedia('(min-width: 768px)').matches

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    if (heroRef.current) {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=90%',
          scrub: 0.65,
          pin: desktop,
          anticipatePin: 1,
          onUpdate: (self) => fieldRef.current?.setScroll(self.progress),
        },
      })
      heroTl.to('.hero-copy', { y: -80, opacity: 0, ease: 'none' }, 0)
      heroTl.to('.scroll-indicator', { opacity: 0, ease: 'none' }, 0)
    }

    if (povRef.current) {
      gsap.fromTo(
        '.pov-wipe',
        { clipPath: 'inset(0 0 100% 0)', y: 40 },
        {
          clipPath: 'inset(0 0 0% 0)',
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: povRef.current,
            start: 'top 70%',
            end: 'top 22%',
            scrub: 0.7,
          },
        }
      )
    }

    if (desktop && workRef.current) {
      const panels = gsap.utils.toArray<HTMLElement>('.work-panel')
      gsap.set(panels, { zIndex: (i) => i + 1 })
      gsap.set(panels.slice(1), { clipPath: 'inset(100% 0 0 0)' })

      const workTl = gsap.timeline({
        scrollTrigger: {
          trigger: workRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * panels.length}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      panels.forEach((panel, i) => {
        if (i === 0) return
        workTl.to(panel, { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'none' })
      })
    }

    if (productRef.current) {
      gsap.from('.product-reveal', {
        y: 48,
        opacity: 0,
        duration: 1.05,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: productRef.current,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      })
    }

    if (desktop && filmsRef.current && trackRef.current) {
      const getDistance = () =>
        Math.max(0, trackRef.current!.scrollWidth - window.innerWidth + 80)

      gsap.to(trackRef.current, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: filmsRef.current,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }

    if (contactRef.current) {
      gsap.from('.contact-reveal', {
        y: 36,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
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

  const magnetMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, { x: x * 0.22, y: y * 0.22, duration: 0.3, ease: 'power3.out' })
  }

  const magnetLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.45, ease: 'power3.out' })
  }

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <div className="marks" aria-hidden="true">
        <span className="marks-tr" />
        <span className="marks-bl" />
      </div>
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
            <h1 className="hero-title">
              <span className="hero-display">Sunrise</span>
              <span className="hero-meta">Gen AI</span>
            </h1>
            <p className="hero-lede">
              Production systems for operations and messy knowledge.
            </p>
          </div>
          <div className="scroll-indicator" aria-hidden="true">
            <span>Scroll</span>
            <div className="scroll-indicator-line" />
          </div>
        </section>

        <section ref={povRef} className="pov">
          <div className="pov-pin">
            <p className="pov-line">
              <span className="pov-wipe">
                We design those systems — and we ship the tools we use.
              </span>
            </p>
          </div>
        </section>

        <section ref={workRef} id="work" className="work">
          <div className="work-pin">
            <article className="work-panel">
              <p className="eyebrow">Work</p>
              <p className="frac">1 / 3</p>
              <h2 className="work-title">Operations</h2>
              <p className="work-lede">
                When an incident starts, the answer is usually already in
                tickets, runbooks, and monitoring. We wire that material into
                systems that recommend the next action — not another dashboard.
              </p>
            </article>
            <article className="work-panel">
              <p className="eyebrow">Work</p>
              <p className="frac">2 / 3</p>
              <h2 className="work-title">Knowledge</h2>
              <p className="work-lede">
                Most enterprises do not have a knowledge problem. They have a
                trust problem. We build retrieval over the documents people
                already use, with enough grounding that an answer can be
                checked.
              </p>
            </article>
            <article className="work-panel">
              <p className="eyebrow">Work</p>
              <p className="frac">3 / 3</p>
              <h2 className="work-title">Data</h2>
              <p className="work-lede">
                Schema mapping across messy, multi-source systems is where
                projects stall. We design the pipelines and the mapping work.
              </p>
              <p className="work-note">
                Up to 60% workload reduction on schema and data-pipeline work.
              </p>
            </article>
          </div>
        </section>

        <section ref={productRef} id="product" className="section product">
          <div className="product-inner">
            <p className="eyebrow product-reveal">Product</p>
            <h2 className="product-name product-reveal">OpenStinger</h2>
            <p className="product-lede product-reveal">
              Portable memory for MCP agents.
            </p>
            <p className="product-body product-reveal">
              Self-hosted, MIT-licensed memory that travels with the workflow.
              The tool we use when agents need to remember — and the one we
              ship.
            </p>
            <div className="product-links product-reveal">
              <a
                href="https://github.com/srikanthbellary/openstinger"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
                data-cursor="hover"
                onMouseMove={magnetMove}
                onMouseLeave={magnetLeave}
              >
                GitHub{stars !== null ? ` · ${stars}` : ''}
              </a>
              <a
                href="https://openstinger.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
                data-cursor="hover"
                onMouseMove={magnetMove}
                onMouseLeave={magnetLeave}
              >
                openstinger.com
              </a>
            </div>
            <p className="product-meta product-reveal">MIT · Self-hosted</p>
          </div>
        </section>

        <section ref={filmsRef} id="craft" className="films">
          <div className="films-pin">
            <div className="films-head">
              <p className="eyebrow">Craft</p>
              <h2>Short films</h2>
              <p>Proof of taste — not a product line.</p>
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

        <section ref={contactRef} id="contact" className="section contact">
          <div>
            <p className="eyebrow contact-reveal">Contact</p>
            <a
              href="mailto:sbellary@sunrisegenai.com"
              className="contact-email contact-reveal"
              data-cursor="hover"
              onMouseMove={magnetMove}
              onMouseLeave={magnetLeave}
            >
              sbellary@sunrisegenai.com
            </a>
            <a
              href="tel:+14403408383"
              className="contact-phone contact-reveal"
              data-cursor="hover"
            >
              440-340-8383
            </a>
            <p className="contact-place contact-reveal">
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
