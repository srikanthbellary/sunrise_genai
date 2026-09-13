import type { Metadata } from 'next'
import BlogShell from '@/components/BlogShell'
import { BLOG_INDEX_DESCRIPTION, BLOG_INDEX_TITLE, OG_IMAGE } from '@/lib/site'

export const metadata: Metadata = {
  title: BLOG_INDEX_TITLE,
  description: BLOG_INDEX_DESCRIPTION,
  alternates: {
    canonical: '/blog/',
    types: {
      'application/rss+xml': '/blog/rss.xml',
    },
  },
  openGraph: {
    title: BLOG_INDEX_TITLE,
    description: BLOG_INDEX_DESCRIPTION,
    type: 'website',
    url: '/blog/',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: BLOG_INDEX_TITLE,
    description: BLOG_INDEX_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <BlogShell>{children}</BlogShell>
}
