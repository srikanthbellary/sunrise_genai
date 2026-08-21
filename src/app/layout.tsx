import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sunrise Gen AI | AI-Native Software Studio',
  description: 'Sunrise Gen AI LLC is an AI-native software studio building open-source tools, intelligent applications, and AI-generated media. Florida HQ, Hyderabad ops.',
  keywords: ['AI', 'Software Studio', 'Open Source', 'MCP', 'Agent Memory', 'OpenStinger', 'Gen AI', 'T2V', 'AI Films'],
  openGraph: {
    title: 'Sunrise Gen AI | AI-Native Software Studio',
    description: 'Building open-source tools and intelligent applications for the autonomous era.',
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
