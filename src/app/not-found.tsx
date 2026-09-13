import Link from 'next/link'
import BlogShell from '@/components/BlogShell'
import { HEADER_LINE } from '@/lib/site'

export default function NotFound() {
  return (
    <BlogShell>
      <main className="blog-page">
        <header className="blog-hero">
          <div className="section-tag">
            <i />
            <span className="mono">404</span>
          </div>
          <h1 className="blog-title">
            This page is not
            <em> on the site.</em>
          </h1>
          <p className="lede blog-lede">{HEADER_LINE}</p>
          <p className="lede blog-lede">The address may have moved, or it was never published.</p>
          <p className="blog-feed">
            <Link href="/" className="cta cta-sun">
              <span>Back to the homepage</span>
            </Link>
          </p>
        </header>
      </main>
    </BlogShell>
  )
}
