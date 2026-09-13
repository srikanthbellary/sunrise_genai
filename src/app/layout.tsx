import type { Metadata, Viewport } from 'next'
import { HOME_DESCRIPTION, HOME_TITLE, OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
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
  alternates: { canonical: '/' },
  openGraph: {
    title: HOME_TITLE,
    description:
      'Enterprise GenAI, built to run. Agents, retrieval, and data platforms in production, plus OpenStinger portable MCP agent memory and Ingre label scanning.',
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME,
    url: '/',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: 'Enterprise GenAI, built to run. Agents, retrieval, and data platforms in production.',
    images: [OG_IMAGE.url],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/sunrise-gen-ai-icon.png', type: 'image/png', sizes: '1024x1024' },
    ],
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
