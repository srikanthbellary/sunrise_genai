'use client'

import { useEffect } from 'react'
import { HEADER_LINE } from '@/lib/site'

type Props = {
  href: string
  title: string
}

export default function BlogAliasRedirect({ href, title }: Props) {
  useEffect(() => {
    window.location.replace(href)
  }, [href])

  return (
    <main className="blog-page">
      <header className="blog-hero">
        <div className="section-tag">
          <i />
          <span className="mono">Essay</span>
        </div>
        <h1 className="blog-title blog-title--post">{title}</h1>
        <p className="lede blog-lede">{HEADER_LINE}</p>
        <p className="lede blog-lede">
          This essay lives at{' '}
          <a href={href} rel="canonical">
            {href}
          </a>
          .
        </p>
      </header>
    </main>
  )
}
