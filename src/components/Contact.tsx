'use client'

import { useEffect, useRef } from 'react'
import { gsap, revealLines, riseIn } from '@/lib/motion'
import Magnetic from './Magnetic'
import { CONTACT } from '@/lib/content'

export default function Contact({ reduced }: { reduced: boolean }) {
  const rootRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scope = rootRef.current
    if (!scope || reduced) return
    const ctx = gsap.context(() => {
      revealLines(scope, '.contact-title .line-inner', scope)
      riseIn(scope, '.js-rise', scope, 0.07)

      const group = marqueeRef.current?.querySelector('.mega-group') as HTMLElement | null
      if (group) {
        gsap.to(marqueeRef.current, {
          x: () => -group.offsetWidth,
          duration: 22,
          ease: 'none',
          repeat: -1,
          modifiers: { x: (value: string) => `${parseFloat(value) % group.offsetWidth}px` },
        })
      }
    }, scope)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="contact" className="contact" ref={rootRef}>
      <div className="section-tag js-rise">
        <i />
        <span className="mono">05 — Contact</span>
      </div>

      <h2 className="contact-title">
        <span className="line-mask">
          <span className="line-inner">Bring us the</span>
        </span>
        <span className="line-mask">
          <span className="line-inner">toughest problems.</span>
        </span>
        <span className="line-mask">
          <span className="line-inner">We&apos;ll solve them.</span>
        </span>
      </h2>

      <div className="contact-lead">
        <p className="lede js-rise">
          Architecture through delivery, for enterprises that need the AI to hold up in production. Tell us what is
          breaking, what is buried, or what nobody wants to map by hand.
        </p>
        <div className="contact-brief js-rise">
          <div className="contact-brief-row">
            <span>Autonomous agents</span>
            <span>Engagement</span>
          </div>
          <div className="contact-brief-row">
            <span>Agents and multi-agent systems</span>
            <span>Engagement</span>
          </div>
          <div className="contact-brief-row">
            <span>RAG and LLM architecture</span>
            <span>Engagement</span>
          </div>
          <div className="contact-brief-row">
            <span>Data processing with AI</span>
            <span>Engagement</span>
          </div>
          <div className="contact-brief-row">
            <span>Platforms and delivery</span>
            <span>Engagement</span>
          </div>
        </div>
      </div>

      <div className="contact-grid">
        <div className="contact-field js-rise">
          <span className="mono" style={{ color: 'var(--text-faint)' }}>
            Studio
          </span>
          <span className="contact-value">{CONTACT.city}</span>
        </div>
        <div className="contact-field js-rise">
          <span className="mono" style={{ color: 'var(--text-faint)' }}>
            Email
          </span>
          <a className="contact-value" href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
          </a>
        </div>
        <div className="contact-field js-rise">
          <span className="mono" style={{ color: 'var(--text-faint)' }}>
            Phone
          </span>
          <a className="contact-value tabular" href={CONTACT.phoneHref}>
            {CONTACT.phone}
          </a>
        </div>
      </div>

      <div className="js-rise" style={{ marginTop: 'clamp(2.5rem, 6vh, 4rem)' }}>
        <Magnetic
          href={`mailto:${CONTACT.email}?subject=Working%20with%20Sunrise%20Gen%20AI`}
          className="cta cta-sun cta-lg"
        >
          <span>Start a conversation</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Magnetic>
      </div>

      <div className="mega-marquee" aria-hidden="true">
        <div className="mega-track" ref={marqueeRef}>
          {[0, 1, 2].map((g) => (
            <div className="mega-group" key={g}>
              <span className="mega-word">Sunrise Gen AI</span>
              <span className="mega-dot" />
              <span className="mega-word on">Grounding the Autonomous Era</span>
              <span className="mega-dot" />
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <span className="mono">
          © {new Date().getFullYear()} {CONTACT.company} · {CONTACT.principal}
        </span>
        <span className="mono">Grounding the Autonomous Era</span>
        <span className="mono">
          <a href="https://github.com/srikanthbellary/openstinger" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {' · '}
          <a href="https://openstinger.com" target="_blank" rel="noopener noreferrer">
            openstinger.com
          </a>
          {' · '}
          <a href="https://ingre.ai" target="_blank" rel="noopener noreferrer">
            ingre.ai
          </a>
        </span>
      </footer>
    </section>
  )
}
