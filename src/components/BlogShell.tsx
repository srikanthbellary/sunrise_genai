'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/lib/motion'
import Cursor from '@/components/Cursor'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'

export default function BlogShell({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="column-rules" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      {mounted && !reduced && <Cursor />}
      <Nav />
      {children}
      <div className="blog-end">
        <SiteFooter />
      </div>
    </>
  )
}
