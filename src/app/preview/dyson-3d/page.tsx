import type { Metadata } from 'next'
import Link from 'next/link'
import DysonHero from '@/components/DysonHero'

export const metadata: Metadata = {
  title: 'Preview: Dyson flythrough hero · Sunrise Gen AI',
  description: 'Review route for the Three.js orbital flythrough hero. Not linked from the site.',
  robots: { index: false, follow: false },
}

export default function DysonPreviewPage() {
  return (
    <main className="dyson-page">
      <DysonHero />
      <section className="dyson-after">
        <div className="section-tag">
          <i />
          <span className="mono">End of preview</span>
        </div>
        <p className="lede">
          Review route only. The live fold is unchanged. Scroll back up to glide again, or return to the{' '}
          <Link href="/">homepage</Link>.
        </p>
      </section>
    </main>
  )
}
