import type { Metadata, Viewport } from 'next'
import { HOME_DESCRIPTION, HOME_TITLE, SITE_URL, socialCard } from '@/lib/site'
import './globals.css'

const HOME_OG_DESCRIPTION =
  'Enterprise GenAI, built to run. Agents, retrieval, and data platforms in production, plus OpenStinger portable MCP agent memory and Ingre label scanning.'
const HOME_TWITTER_DESCRIPTION =
  'Enterprise GenAI, built to run. Agents, retrieval, and data platforms in production.'

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
  ...socialCard({
    title: HOME_TITLE,
    description: HOME_OG_DESCRIPTION,
    url: '/',
  }),
  twitter: {
    ...socialCard({
      title: HOME_TITLE,
      description: HOME_TWITTER_DESCRIPTION,
      url: '/',
    }).twitter,
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
