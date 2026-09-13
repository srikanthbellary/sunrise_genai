const fs = require('fs')
const path = require('path')

const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog')
const OUT_PATH = path.join(__dirname, '..', 'public', 'blog', 'rss.xml')
const SITE_URL = 'https://sunrisegenai.com'

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return null
  const block = match[1]
  const data = { tags: [] }
  let currentKey = null
  for (const line of block.split(/\r?\n/)) {
    const list = line.match(/^\s+-\s+(.+)$/)
    if (list && currentKey === 'tags') {
      data.tags.push(list[1].trim())
      continue
    }
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/)
    if (!kv) continue
    currentKey = kv[1]
    if (currentKey === 'tags') {
      data.tags = []
      continue
    }
    data[currentKey] = kv[2].trim().replace(/^['"]|['"]$/g, '')
  }
  return data
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function writeRss() {
  if (!fs.existsSync(BLOG_DIR)) return
  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith('.md'))
    .map((name) => parseFrontmatter(fs.readFileSync(path.join(BLOG_DIR, name), 'utf8')))
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}/`
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

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    '    <title>Sunrise Gen AI — Notes</title>',
    `    <link>${SITE_URL}/blog/</link>`,
    '    <description>Production notes on agents, retrieval, and data platforms from Sunrise Gen AI.</description>',
    '    <language>en-us</language>',
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true })
  fs.writeFileSync(OUT_PATH, xml)
}

writeRss()
