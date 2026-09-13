/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

try {
  require('./scripts/write-rss.cjs')
} catch (error) {
  console.warn('RSS feed was not generated:', error)
}

module.exports = nextConfig
