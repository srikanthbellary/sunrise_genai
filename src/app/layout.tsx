import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sunrise Gen AI | Production systems for operations and messy knowledge',
  description:
    'Sunrise Gen AI LLC designs production systems for operations and messy knowledge, and ships the tools we use. Wellington, Florida.',
  keywords: ['Sunrise Gen AI', 'enterprise AI', 'operations', 'knowledge systems', 'OpenStinger', 'Wellington'],
  openGraph: {
    title: 'Sunrise Gen AI',
    description:
      'Production systems for operations and messy knowledge. Wellington, Florida.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
