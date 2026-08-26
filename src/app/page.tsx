'use client'

import { useCallback, useEffect, useState } from 'react'
import { ScrollTrigger, useReducedMotion, useSmoothScroll } from '@/lib/motion'
import Preloader from '@/components/Preloader'
import Cursor from '@/components/Cursor'
import Nav from '@/components/Nav'
import ProgressRail from '@/components/ProgressRail'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import Consulting from '@/components/Consulting'
import OpenStinger from '@/components/OpenStinger'
import Ingre from '@/components/Ingre'
import MediaBand from '@/components/MediaBand'
import Contact from '@/components/Contact'

export default function Page() {
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [started, setStarted] = useState(false)

  useSmoothScroll(mounted && !reduced)

  useEffect(() => {
    setMounted(true)
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!started) return
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => window.clearTimeout(id)
  }, [started])

  const onReady = useCallback(() => setStarted(true), [])

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

      <Preloader onDone={onReady} skip={reduced} />
      {mounted && !reduced && <Cursor />}

      <Nav />
      <ProgressRail />

      <main>
        <Hero start={started || reduced} reduced={reduced} />
        <Ticker reduced={reduced} />
        <Consulting reduced={reduced} />
        <OpenStinger reduced={reduced} />
        <Ingre reduced={reduced} />
        <MediaBand reduced={reduced} />
        <Contact reduced={reduced} />
      </main>
    </>
  )
}
