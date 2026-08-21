import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sunrise Gen AI | Enterprise AI & Data Consulting',
  description: 'Sunrise Gen AI LLC is an enterprise AI and data consultancy in Wellington, FL. Production systems for operations, knowledge, and multi-source data — plus open-source tools and a mobile product.',
  keywords: ['Enterprise Consulting', 'AI', 'Data Platforms', 'RAG', 'GraphRAG', 'SRE', 'MCP', 'OpenStinger', 'Gen AI', 'MLOps'],
  openGraph: {
    title: 'Sunrise Gen AI | Enterprise AI & Data Consulting',
    description: 'Enterprise AI and data consulting. Production systems for operations, knowledge, and multi-source data.',
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
      <body>
        {children}
      </body>
    </html>
  )
}
