'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'

type Props = {
  href: string
  className?: string
  external?: boolean
  strength?: number
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export default function Magnetic({ href, className = '', external, strength = 0.34, children, onClick }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const inner = useRef<HTMLSpanElement>(null)

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.45, ease: 'power3.out' })
    gsap.to(inner.current, { x: x * strength * 0.35, y: y * strength * 0.35, duration: 0.55, ease: 'power3.out' })
  }

  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.35)' })
    gsap.to(inner.current, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.3)' })
  }

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      data-cursor="magnetic"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span ref={inner} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.7rem' }}>
        {children}
      </span>
    </a>
  )
}
