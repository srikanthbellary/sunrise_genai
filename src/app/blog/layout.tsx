import type { Metadata } from 'next'
import BlogShell from '@/components/BlogShell'

export const metadata: Metadata = {
  title: 'Essays — Sunrise Gen AI',
  description:
    'Production essays on agents, harnesses, inspectable memory, and context control from Sunrise Gen AI.',
  alternates: {
    canonical: '/blog/',
    types: {
      'application/rss+xml': '/blog/rss.xml',
    },
  },
  openGraph: {
    title: 'Essays — Sunrise Gen AI',
    description:
      'Production essays on agents, harnesses, inspectable memory, and context control from Sunrise Gen AI.',
    type: 'website',
    url: '/blog/',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <BlogShell>{children}</BlogShell>
}
