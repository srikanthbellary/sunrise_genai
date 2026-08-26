'use client'

import { useEffect, useState } from 'react'
import { scrollToId } from '@/lib/motion'

const SECTIONS = [
  { id: 'top', n: '00', label: 'Fold' },
  { id: 'consulting', n: '01', label: 'Consulting' },
  { id: 'openstinger', n: '02', label: 'OpenStinger' },
  { id: 'ingre', n: '03', label: 'Ingre' },
  { id: 'media', n: '04', label: 'Media' },
  { id: 'contact', n: '05', label: 'Contact' },
]

export default function ProgressRail() {
  const [active, setActive] = useState('top')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <aside className="progress-rail" aria-label="Section navigation">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="progress-item"
          data-active={active === s.id}
          onClick={(e) => {
            e.preventDefault()
            scrollToId(`#${s.id}`)
          }}
        >
          <span>{s.label}</span>
          <em style={{ fontStyle: 'normal' }}>{s.n}</em>
          <i />
        </a>
      ))}
    </aside>
  )
}
