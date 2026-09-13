#!/usr/bin/env node
/**
 * Fail the build if any public HTML page is missing a large-image card,
 * or if a title-shaped essay slug was not exported as a 200 page.
 *
 * X/Twitter and LinkedIn need og:image + twitter:image + twitter:card=summary_large_image
 * pointing at a real PNG/JPEG/WebP. SVG is not a card image.
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const OUT = path.join(ROOT, 'out')
const BLOG_DIR = path.join(ROOT, 'content', 'blog')
const SITE = 'https://sunrisegenai.com'

const errors = []

function fail(message) {
  errors.push(message)
}

function titleToSlug(title) {
  return String(title)
    .normalize('NFKD')
    .replace(/['’]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null
  const data = { tags: [], aliases: [] }
  let currentKey = null
  for (const line of match[1].split(/\r?\n/)) {
    const list = line.match(/^\s+-\s+(.+)$/)
    if (list && (currentKey === 'tags' || currentKey === 'aliases')) {
      data[currentKey].push(list[1].trim())
      continue
    }
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/)
    if (!kv) continue
    currentKey = kv[1]
    if (currentKey === 'tags' || currentKey === 'aliases') {
      data[currentKey] = []
      continue
    }
    data[currentKey] = kv[2].trim().replace(/^['"]|['"]$/g, '')
  }
  return data
}

function loadPosts() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith('.md'))
    .map((name) => parseFrontmatter(fs.readFileSync(path.join(BLOG_DIR, name), 'utf8')))
    .filter(Boolean)
}

function htmlPathFor(urlPath) {
  const trimmed = urlPath.replace(/\/+$/, '') || ''
  if (!trimmed) return path.join(OUT, 'index.html')
  return path.join(OUT, trimmed.replace(/^\//, ''), 'index.html')
}

function pngSize(filePath) {
  const buf = fs.readFileSync(filePath)
  if (buf.length < 24 || buf[0] !== 0x89 || buf[1] !== 0x50) {
    throw new Error(`${filePath} is not a PNG`)
  }
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), bytes: buf.length }
}

function meta(html, kind, key) {
  const attr = kind === 'property' ? 'property' : 'name'
  const re = new RegExp(
    `<meta\\s+[^>]*${attr}="${key}"[^>]*content="([^"]+)"|<meta\\s+[^>]*content="([^"]+)"[^>]*${attr}="${key}"`,
    'i',
  )
  const match = html.match(re)
  return match ? match[1] || match[2] : ''
}

function allMeta(html, kind, key) {
  const attr = kind === 'property' ? 'property' : 'name'
  const re = new RegExp(`<meta\\s+[^>]*${attr}="${key}"[^>]*content="([^"]+)"`, 'gi')
  const values = []
  let match
  while ((match = re.exec(html))) values.push(match[1])
  return values
}

function localImagePath(imageUrl) {
  let pathname
  try {
    pathname = imageUrl.startsWith('http') ? new URL(imageUrl).pathname : imageUrl
  } catch {
    return null
  }
  if (!pathname.startsWith('/')) return null
  return path.join(OUT, pathname.replace(/^\//, ''))
}

function checkPage(urlPath, htmlFile) {
  if (!fs.existsSync(htmlFile)) {
    fail(`missing export for ${urlPath} (${path.relative(ROOT, htmlFile)})`)
    return
  }

  const html = fs.readFileSync(htmlFile, 'utf8')
  const card = meta(html, 'name', 'twitter:card')
  const ogImages = allMeta(html, 'property', 'og:image')
  const twitterImages = allMeta(html, 'name', 'twitter:image').concat(
    allMeta(html, 'name', 'twitter:image:src'),
  )

  if (card !== 'summary_large_image') {
    fail(`${urlPath} twitter:card must be summary_large_image (got ${card || 'missing'})`)
  }
  if (!ogImages.length) fail(`${urlPath} missing og:image`)
  if (!twitterImages.length) fail(`${urlPath} missing twitter:image`)

  const imageUrl = twitterImages[0] || ogImages[0]
  if (!imageUrl) return

  if (!imageUrl.startsWith('https://')) {
    fail(`${urlPath} card image must be an https URL (got ${imageUrl})`)
  }
  if (/\.svg(?:$|\?)/i.test(imageUrl)) {
    fail(`${urlPath} card image cannot be SVG (${imageUrl})`)
  }

  const filePath = localImagePath(imageUrl)
  if (!filePath || !fs.existsSync(filePath)) {
    fail(`${urlPath} card image 200 failed: ${imageUrl} is not in the export`)
    return
  }

  try {
    const { width, height, bytes } = pngSize(filePath)
    if (width < 300 || height < 157) {
      fail(`${urlPath} card image ${imageUrl} is ${width}×${height}; X needs at least 300×157`)
    }
    if (bytes < 1024) {
      fail(`${urlPath} card image ${imageUrl} is too small (${bytes} bytes)`)
    }
  } catch (error) {
    fail(`${urlPath} ${error.message}`)
  }
}

function collectHtmlFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '_next' || entry.name.startsWith('.')) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) collectHtmlFiles(full, acc)
    else if (entry.name.endsWith('.html')) acc.push(full)
  }
  return acc
}

function main() {
  if (!fs.existsSync(OUT)) {
    console.error('out/ is missing. Run next build first.')
    process.exit(1)
  }

  const posts = loadPosts()
  const required = new Set(['/', '/blog/', '/privacy/'])

  for (const post of posts) {
    required.add(`/blog/${post.slug}/`)
    const aliases = new Set([...(post.aliases || []), titleToSlug(post.title)])
    aliases.delete(post.slug)
    aliases.delete('')
    for (const alias of aliases) required.add(`/blog/${alias}/`)
  }

  for (const urlPath of [...required].sort()) {
    checkPage(urlPath, htmlPathFor(urlPath))
  }

  const notFound = path.join(OUT, '404.html')
  checkPage('/404.html', notFound)

  for (const htmlFile of collectHtmlFiles(OUT)) {
    const rel = path.relative(OUT, htmlFile).replace(/\\/g, '/')
    const urlPath = rel === 'index.html' ? '/' : rel === '404.html' ? '/404.html' : `/${rel.replace(/\/index\.html$/, '/')}`
    if (required.has(urlPath) || urlPath === '/404.html') continue
    if (urlPath.includes('/_not-found')) {
      checkPage(urlPath, htmlFile)
    }
  }

  if (errors.length) {
    console.error(`Social card check failed (${errors.length}):`)
    for (const error of errors) console.error(`  - ${error}`)
    process.exit(1)
  }

  console.log(`Social card check passed for ${required.size} public URLs plus 404.html`)
  for (const urlPath of [...required].sort()) {
    console.log(`  ${SITE}${urlPath}`)
  }
}

main()
