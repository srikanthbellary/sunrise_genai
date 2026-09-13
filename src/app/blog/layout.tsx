import type { Metadata } from 'next'
import BlogShell from '@/components/BlogShell'
import { BLOG_INDEX_DESCRIPTION, BLOG_INDEX_TITLE, socialCard } from '@/lib/site'

export const metadata: Metadata = {
  title: BLOG_INDEX_TITLE,
  description: BLOG_INDEX_DESCRIPTION,
  alternates: {
    canonical: '/blog/',
    types: {
      'application/rss+xml': '/blog/rss.xml',
    },
  },
  ...socialCard({
    title: BLOG_INDEX_TITLE,
    description: BLOG_INDEX_DESCRIPTION,
    url: '/blog/',
  }),
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <BlogShell>{children}</BlogShell>
}
