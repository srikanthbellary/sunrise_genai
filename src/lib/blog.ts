import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')
const SITE_URL = 'https://sunrisegenai.com'

export type BlogPostMeta = {
  title: string
  description: string
  date: string
  slug: string
  tags: string[]
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

function parsePost(filename: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
  const { data, content } = matter(raw)
  const title = String(data.title || '').trim()
  const description = String(data.description || '').trim()
  const date = toIsoDate(data.date)
  const slug = String(data.slug || filename.replace(/\.md$/, '')).trim()
  const tags = Array.isArray(data.tags) ? data.tags.map((tag) => String(tag)) : []

  if (!title || !description || !date || !slug) {
    throw new Error(`Invalid frontmatter in content/blog/${filename}`)
  }

  return {
    title,
    description,
    date,
    slug,
    tags,
    content,
    html: marked.parse(content) as string,
  }
}

export function getAllPosts(): BlogPost[] {
  return readMarkdownFiles()
    .map(parsePost)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug)
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
