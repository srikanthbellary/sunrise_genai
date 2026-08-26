import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sunrise Gen AI',
  description:
    'Sunrise Gen AI LLC designs production systems for operations and messy knowledge. Enterprise AI in Wellington, Florida — and the tools we use, including OpenStinger.',
  keywords: [
    'Sunrise Gen AI',
    'Enterprise AI',
    'operations',
    'knowledge systems',
    'OpenStinger',
    'Wellington Florida',
  ],
  openGraph: {
    title: 'Sunrise Gen AI',
    description:
      'Production systems for operations and messy knowledge. Wellington, Florida.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-nav.webp" type="image/webp" />
      </head>
      <body>{children}</body>
    </html>
  )
}
