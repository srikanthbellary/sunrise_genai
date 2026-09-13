import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BlogAliasRedirect from '@/components/BlogAliasRedirect'
import { formatPostDate, getAllPosts, getPost, isAliasSlug, postAliases, postUrl } from '@/lib/blog'
import { socialCard, socialImage } from '@/lib/site'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return getAllPosts().flatMap((post) => [
    { slug: post.slug },
    ...postAliases(post).map((slug) => ({ slug })),
  ])
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getPost(params.slug)
  if (!post) return {}

  const canonical = `/blog/${post.slug}/`
  const title = `${post.title} — Sunrise Gen AI`
  const image = socialImage(post.image, post.imageAlt)

  return {
    title,
    description: post.description,
    alternates: { canonical },
    ...socialCard({
      title,
      description: post.description,
      url: canonical,
      type: 'article',
      publishedTime: post.date,
      image,
    }),
  }
}

export default function BlogPostPage({ params }: { params: Params }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  if (isAliasSlug(params.slug)) {
    const href = `/blog/${post.slug}/`
    return (
      <>
        <meta httpEquiv="refresh" content={`0;url=${href}`} />
        <BlogAliasRedirect href={href} title={post.title} />
      </>
    )
  }

  const posts = getAllPosts()
  const index = posts.findIndex((item) => item.slug === post.slug)
  const newer = index > 0 ? posts[index - 1] : undefined
  const older = index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined

  return (
    <main className="blog-page blog-page--post">
      <article className="blog-article">
        <p className="blog-back">
          <Link href="/blog/" className="mono">
            All essays
          </Link>
        </p>
        <div className="section-tag">
          <i />
          <time className="mono" dateTime={post.date}>
            {formatPostDate(post.date)}
          </time>
        </div>
        <h1 className="blog-title blog-title--post">{post.title}</h1>
        <p className="lede blog-lede">{post.description}</p>
        {post.tags.length ? (
          <ul className="blog-tags">
            {post.tags.map((tag) => (
              <li key={tag} className="mono">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      <aside className="blog-after">
        <p className="lede">
          Architecture through delivery — agents, retrieval, and data platforms in production.{' '}
          <a href="/#contact-form">Start a conversation</a>.
        </p>
        <nav className="blog-pager" aria-label="More essays">
          {newer ? (
            <Link href={`/blog/${newer.slug}/`} className="blog-pager-link">
              <span className="mono">Newer</span>
              <span>{newer.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {older ? (
            <Link href={`/blog/${older.slug}/`} className="blog-pager-link blog-pager-link--next">
              <span className="mono">Older</span>
              <span>{older.title}</span>
            </Link>
          ) : null}
        </nav>
      </aside>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            image: socialImage(post.image, post.imageAlt).secureUrl,
            url: postUrl(post.slug),
            author: {
              '@type': 'Organization',
              name: 'Sunrise Gen AI LLC',
              url: 'https://sunrisegenai.com',
            },
          }),
        }}
      />
    </main>
  )
}
