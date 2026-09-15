import type { Metadata } from 'next'
import HeroScrub from '@/components/HeroScrub'
import './hero-scrub.css'

export const metadata: Metadata = {
  title: 'Preview · Hero scroll-scrub — Sunrise Gen AI',
  robots: { index: false, follow: false },
}

export default function HeroScrubPreview() {
  return (
    <main className="scrub-page">
      <HeroScrub />
      <footer className="scrub-foot">
        <span className="mono">Preview only · not linked from the live page</span>
        <a className="mono" href="/">
          Back to sunrisegenai.com →
        </a>
      </footer>
    </main>
  )
}
