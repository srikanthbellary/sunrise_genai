import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { OG_IMAGE, SITE_URL } from '@/lib/site'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export type BlogPostMeta = {
  title: string
  description: string
  date: string
  slug: string
  tags: string[]
  aliases: string[]
  image: string
  imageAlt: string
}

export type BlogPost = BlogPostMeta & {
  content: string
  html: string
}

marked.setOptions({
  gfm: true,
  breaks: false,
})

function readMarkdownFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR).filter((name) => name.endsWith('.md'))
}

function toIsoDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10)
  }
  const raw = String(value || '').trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw
  const parsed = new Date(raw)
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10)
  return raw
}

export function titleToSlug(title: string): string {
  return title
    .normalize('NFKD')
    .replace(/['’]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.map((item) => String(item).trim()).filter(Boolean)
}

function parsePost(filename: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
  const { data, content } = matter(raw)
  const title = String(data.title || '').trim()
  const description = String(data.description || '').trim()
  const date = toIsoDate(data.date)
  const slug = String(data.slug || filename.replace(/\.md$/, '')).trim()
  const tags = parseStringList(data.tags)
  const aliases = parseStringList(data.aliases)
  const image = String(data.image || OG_IMAGE.url).trim()
  const imageAlt = String(data.imageAlt || OG_IMAGE.alt).trim()

  if (!title || !description || !date || !slug) {
    throw new Error(`Invalid frontmatter in content/blog/${filename}`)
  }

  if (!image || image.toLowerCase().endsWith('.svg')) {
    throw new Error(`content/blog/${filename} needs a PNG/JPEG/WebP card image, not ${image || '(empty)'}`)
  }

  return {
    title,
    description,
    date,
    slug,
    tags,
    aliases,
    image,
    imageAlt,
    content,
    html: marked.parse(content) as string,
  }
}

export function postAliases(post: Pick<BlogPostMeta, 'title' | 'slug' | 'aliases'>): string[] {
  const guessed = titleToSlug(post.title)
  const unique = new Set<string>([...post.aliases, guessed])
  unique.delete(post.slug)
  unique.delete('')
  return Array.from(unique)
}

export function getAllPosts(): BlogPost[] {
  const posts = readMarkdownFiles()
    .map(parsePost)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

  const claimed = new Map<string, string>()
  for (const post of posts) {
    for (const slug of [post.slug, ...postAliases(post)]) {
      const owner = claimed.get(slug)
      if (owner && owner !== post.slug) {
        throw new Error(`Blog slug collision: /blog/${slug}/ is claimed by ${owner} and ${post.slug}`)
      }
      claimed.set(slug, post.slug)
    }
  }

  return posts
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug || postAliases(post).includes(slug))
}

export function isAliasSlug(slug: string): boolean {
  const post = getPost(slug)
  return Boolean(post && post.slug !== slug)
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export function postUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}/`
}

export function buildRssXml(posts: BlogPostMeta[] = getAllPosts()): string {
  const items = posts
    .map((post) => {
      const url = postUrl(post.slug)
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid>${url}</guid>`,
        `      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(post.description)}</description>`,
        '    </item>',
      ].join('\n')
    })
    .join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    '    <title>Sunrise Gen AI — Essays</title>',
    '    <link>https://sunrisegenai.com/blog/</link>',
    '    <description>Production essays on agents, retrieval, and data platforms from Sunrise Gen AI.</description>',
    '    <language>en-us</language>',
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
