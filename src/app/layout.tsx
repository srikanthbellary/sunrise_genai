import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://sunrisegenai.com'),
  title: 'Sunrise Gen AI — Production systems for operations and messy knowledge',
  description:
    'Sunrise Gen AI is an enterprise AI and data practice in Wellington, FL. Agentic operations, retrieval over messy knowledge, and GenAI data pipelines that hold up in production — plus OpenStinger and Ingre.',
  keywords: [
    'enterprise AI consulting',
    'agentic operations',
    'SRE agents',
    'RAG',
    'GraphRAG',
    'MCP',
    'data engineering',
    'OpenStinger',
    'Ingre',
    'Sunrise Gen AI',
  ],
  authors: [{ name: 'Sunrise Gen AI LLC' }],
  openGraph: {
    title: 'Sunrise Gen AI — Grounding the Autonomous Era',
    description:
      'Production systems for operations and messy knowledge. Enterprise AI and data consulting, OpenStinger portable MCP agent memory, and Ingre label scanning.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sunrise Gen AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunrise Gen AI — Grounding the Autonomous Era',
    description: 'Production systems for operations and messy knowledge.',
  },
  icons: {
    icon: '/logo-nav.webp',
    apple: '/logo-nav.webp',
  },
}

export const viewport: Viewport = {
  themeColor: '#000816',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/cormorant-garamond-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/source-serif-4-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
