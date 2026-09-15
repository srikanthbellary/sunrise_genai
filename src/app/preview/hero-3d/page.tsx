import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'
import { HOME_DESCRIPTION, socialCard } from '@/lib/site'

const TITLE = 'Hero preview: the digital palace · Sunrise Gen AI'

/**
 * Review route for the scroll-driven 3D hero. Renders the full homepage with the
 * palace flythrough in place of the causeway video. Not indexed, not in the sitemap.
 */
export const metadata: Metadata = {
  title: TITLE,
  description: HOME_DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: { canonical: '/' },
  ...socialCard({ title: TITLE, description: HOME_DESCRIPTION, url: '/preview/hero-3d/' }),
}

export default function HeroPreviewPage() {
  return <HomePage hero="palace" />
}
