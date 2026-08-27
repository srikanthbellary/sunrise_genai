'use client'

import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger, scrollToId } from '@/lib/motion'

const LINKS = [
  { id: '#consulting', label: 'Capabilities' },
  { id: '#openstinger', label: 'OpenStinger' },
  { id: '#ingre', label: 'Ingre' },
  { id: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [stuck, setStuck] = useState(false)
  const [invert, setInvert] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const st = ScrollTrigger.create({
      trigger: '#ingre',
      start: 'top 56px',
      end: 'bottom 56px',
      onToggle: (self) => setInvert(self.isActive),
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      st.kill()
    }
  }, [])

  const jump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <nav ref={navRef} className="nav" data-stuck={stuck} data-invert={invert}>
      <a className="nav-brand" href="#top" onClick={(e) => jump(e, '#top')} aria-label="Sunrise Gen AI — top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sunrise-gen-ai-logo.png" alt="Sunrise Gen AI" className="nav-lockup" />
      </a>
      <div className="nav-links">
        {LINKS.map((l) => (
          <a key={l.id} href={l.id} className="nav-link" onClick={(e) => jump(e, l.id)}>
            {l.label}
          </a>
        ))}
      </div>
      <a href="#contact-form" className="nav-cta" onClick={(e) => jump(e, '#contact-form')}>
        <span className="nav-cta-long">Start a conversation</span>
        <span className="nav-cta-short">Contact</span>
      </a>
    </nav>
  )
}
