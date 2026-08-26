import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://sunrisegenai.com'),
  title: 'Sunrise Gen AI — Enterprise GenAI, built to run',
  description:
    'Sunrise Gen AI LLC is an enterprise GenAI and data practice in Wellington, FL. Agents inside operations, grounded retrieval, and data platforms in production — plus OpenStinger and Ingre.',
  keywords: [
    'enterprise GenAI consulting',
    'agentic operations',
    'incident intelligence',
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
      'Enterprise GenAI, built to run. Agents, retrieval, and data platforms in production, plus OpenStinger portable MCP agent memory and Ingre label scanning.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sunrise Gen AI',
    images: [
      {
        url: '/sunrise-gen-ai-icon.png',
        width: 1024,
        height: 1024,
        alt: 'Sunrise Gen AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunrise Gen AI — Grounding the Autonomous Era',
    description: 'Enterprise GenAI, built to run. Agents, retrieval, and data platforms in production.',
    images: ['/sunrise-gen-ai-icon.png'],
  },
  icons: {
    icon: '/sunrise-gen-ai-icon.png',
    apple: '/sunrise-gen-ai-icon.png',
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
