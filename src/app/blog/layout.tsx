import type { Metadata } from 'next'
import BlogShell from '@/components/BlogShell'

export const metadata: Metadata = {
  title: 'Notes — Sunrise Gen AI',
  description:
    'Production notes on agents, harnesses, inspectable memory, and context control from Sunrise Gen AI.',
  alternates: {
    canonical: '/blog/',
    types: {
      'application/rss+xml': '/blog/rss.xml',
    },
  },
  openGraph: {
    title: 'Notes — Sunrise Gen AI',
    description:
      'Production notes on agents, harnesses, inspectable memory, and context control from Sunrise Gen AI.',
    type: 'website',
    url: '/blog/',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <BlogShell>{children}</BlogShell>
}
