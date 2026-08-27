'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { gsap, revealLines, riseIn } from '@/lib/motion'
import { CONTACT } from '@/lib/content'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const FAIL_COPY = 'The form could not be sent. Please try again later.'
const OK_COPY = 'Received. We will follow up shortly.'

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
      </div>

      <ContactForm />

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

function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [note, setNote] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    if (String(data.get('botcheck') || '') || String(data.get('website') || '')) {
      setStatus('success')
      setNote(OK_COPY)
      form.reset()
      return
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      setStatus('error')
      setNote(FAIL_COPY)
      return
    }

    setStatus('submitting')
    setNote('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: 'Sunrise Gen AI — site inquiry',
          from_name: `${data.get('first_name') || ''} ${data.get('last_name') || ''}`.trim(),
          first_name: data.get('first_name'),
          last_name: data.get('last_name'),
          job_title: data.get('job_title'),
          company: data.get('company'),
          phone: data.get('phone'),
          message: data.get('message'),
          botcheck: false,
        }),
      })
      const payload = (await response.json()) as { success?: boolean }
      if (!response.ok || !payload.success) {
        setStatus('error')
        setNote(FAIL_COPY)
        return
      }
      setStatus('success')
      setNote(OK_COPY)
      form.reset()
    } catch {
      setStatus('error')
      setNote(FAIL_COPY)
    }
  }

  return (
    <form id="contact-form" className="contact-form js-rise" onSubmit={onSubmit}>
      <div className="contact-form-grid">
        <Field id="first_name" name="first_name" autoComplete="given-name" label="First name" />
        <Field id="last_name" name="last_name" autoComplete="family-name" label="Last name" />
        <Field id="job_title" name="job_title" autoComplete="organization-title" label="Job title / role" />
        <Field id="company" name="company" autoComplete="organization" label="Company" />
        <Field id="phone" name="phone" type="tel" autoComplete="tel" label="Phone" />
        <label className="contact-form-field contact-form-field--wide" htmlFor="message">
          <span className="mono">Comment or question</span>
          <textarea id="message" name="message" required rows={5} />
        </label>
      </div>

      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="botcheck">
          Leave blank
          <input id="botcheck" name="botcheck" type="checkbox" tabIndex={-1} autoComplete="off" />
        </label>
        <label htmlFor="website">
          Website
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {note ? (
        <p className="contact-form-status" data-tone={status === 'success' ? 'ok' : 'err'} role="status">
          {note}
        </p>
      ) : null}

      <button className="cta cta-sun cta-lg" type="submit" disabled={status === 'submitting'}>
        <span>{status === 'submitting' ? 'Sending' : 'Send'}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </form>
  )
}

function Field({
  id,
  name,
  label,
  type = 'text',
  autoComplete,
}: {
  id: string
  name: string
  label: string
  type?: string
  autoComplete?: string
}) {
  return (
    <label className="contact-form-field" htmlFor={id}>
      <span className="mono">{label}</span>
      <input id={id} name={name} type={type} required autoComplete={autoComplete} />
    </label>
  )
}
