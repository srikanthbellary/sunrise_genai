import Link from 'next/link'
import { formatPostDate, getAllPosts } from '@/lib/blog'

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <main className="blog-page">
      <header className="blog-hero">
        <div className="section-tag">
          <i />
          <span className="mono">Notes</span>
        </div>
        <h1 className="blog-title">
          Production notes.
          <em> Agents that finish the job.</em>
        </h1>
        <p className="lede blog-lede">
          Short writing from Sunrise Gen AI on harnesses, inspectable memory, and the stops that keep a loop honest.
          For the work itself, start at{' '}
          <a href="https://sunrisegenai.com">sunrisegenai.com</a>.
        </p>
        <p className="blog-feed">
          <a className="mono" href="/blog/rss.xml">
            RSS
          </a>
        </p>
      </header>

      <ol className="blog-list">
        {posts.map((post) => (
          <li key={post.slug} className="blog-card">
            <Link href={`/blog/${post.slug}/`} className="blog-card-link">
              <span className="blog-card-tick" aria-hidden="true" />
              <time className="mono blog-card-date" dateTime={post.date}>
                {formatPostDate(post.date)}
              </time>
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-desc">{post.description}</p>
              {post.tags.length ? (
                <ul className="blog-tags">
                  {post.tags.map((tag) => (
                    <li key={tag} className="mono">
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </Link>
          </li>
        ))}
      </ol>
    </main>
  )
}
