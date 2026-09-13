'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ScrollTrigger, scrollToId } from '@/lib/motion'

const LINKS = [
  { href: '/#consulting', hash: '#consulting', label: 'Capabilities' },
  { href: '/#openstinger', hash: '#openstinger', label: 'OpenStinger' },
  { href: '/#ingre', hash: '#ingre', label: 'Ingre' },
  { href: '/blog/', hash: null, label: 'Blog' },
]

export default function Nav() {
  const pathname = usePathname()
  const onHome = pathname === '/'
  const onBlog = pathname === '/blog' || pathname === '/blog/' || pathname.startsWith('/blog/')
  const [stuck, setStuck] = useState(false)
  const [invert, setInvert] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    if (!onHome) {
      setInvert(false)
      return () => window.removeEventListener('scroll', onScroll)
    }

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
  }, [onHome])

  const jumpHome = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!onHome) return
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <nav ref={navRef} className="nav" data-stuck={stuck} data-invert={invert}>
      <a
        className="nav-brand"
        href={onHome ? '#top' : '/'}
        onClick={(e) => jumpHome(e, '#top')}
        aria-label="Sunrise Gen AI — top"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sunrise-gen-ai-logo.png" alt="Sunrise Gen AI" className="nav-lockup" />
      </a>
      <div className="nav-links">
        {LINKS.map((l) => {
          const active = l.hash === null && onBlog
          const hash = l.hash
          return (
            <a
              key={l.href}
              href={onHome && hash ? hash : l.href}
              className="nav-link"
              data-active={active}
              onClick={hash ? (e) => jumpHome(e, hash) : undefined}
            >
              {l.label}
            </a>
          )
        })}
      </div>
      <a
        href={onHome ? '#contact-form' : '/#contact-form'}
        className="nav-cta"
        onClick={(e) => jumpHome(e, '#contact-form')}
      >
        <span className="nav-cta-long">Start a conversation</span>
        <span className="nav-cta-short">Contact</span>
      </a>
    </nav>
  )
}
