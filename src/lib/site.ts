import type { Metadata } from 'next'
import { PUBLIC_CONTACT_EMAIL } from '@/lib/public-email'

export const SITE_URL = 'https://sunrisegenai.com'
export const SITE_NAME = 'Sunrise Gen AI'
export const HEADER_LINE = 'We build production GenAI for operations, knowledge, and data.'
export const TWITTER_SITE = '@SunriseGenAI'

export type SocialImage = {
  url: string
  secureUrl: string
  width: number
  height: number
  type: 'image/png'
  alt: string
}

export const OG_IMAGE: SocialImage = {
  url: '/og.png',
  secureUrl: `${SITE_URL}/og.png`,
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: 'Sunrise Gen AI lockup — circuit sun over the wordmark',
}

export const HOME_TITLE = 'Sunrise Gen AI — Enterprise GenAI, built to run'
export const HOME_DESCRIPTION =
  'Sunrise Gen AI LLC is an enterprise GenAI and data practice in Florida, United States. Agents inside operations, grounded retrieval, and data platforms in production, plus OpenStinger and Ingre.'

export const BLOG_INDEX_TITLE = 'Essays — Sunrise Gen AI'
export const BLOG_INDEX_DESCRIPTION =
  'Production essays on agents, harnesses, inspectable memory, and context control from Sunrise Gen AI.'

export const PRIVACY_TITLE = 'Privacy — Sunrise Gen AI'
export const PRIVACY_DESCRIPTION =
  `How Sunrise Gen AI LLC handles inquiries sent through the site contact form and optional chat. Studio in Florida, United States. Reach us at ${PUBLIC_CONTACT_EMAIL} or on the form.`

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sunrise Gen AI LLC',
    url: SITE_URL,
    email: PUBLIC_CONTACT_EMAIL,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: PUBLIC_CONTACT_EMAIL,
      url: `${SITE_URL}/#contact`,
    },
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Florida',
      addressCountry: 'US',
    },
  }
}

export const NOT_FOUND_TITLE = 'Page not found — Sunrise Gen AI'
export const NOT_FOUND_DESCRIPTION = HEADER_LINE

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

export function socialImage(url: string = OG_IMAGE.url, alt: string = OG_IMAGE.alt): SocialImage {
  const path = url.startsWith('http') ? new URL(url).pathname : url
  return {
    url: path,
    secureUrl: absoluteUrl(path),
    width: OG_IMAGE.width,
    height: OG_IMAGE.height,
    type: 'image/png',
    alt,
  }
}

type SocialCardInput = {
  title: string
  description: string
  url: string
  type?: 'website' | 'article'
  publishedTime?: string
  image?: SocialImage
}

export function socialCard({
  title,
  description,
  url,
  type = 'website',
  publishedTime,
  image = OG_IMAGE,
}: SocialCardInput): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      title,
      description,
      type,
      locale: 'en_US',
      siteName: SITE_NAME,
      url,
      ...(publishedTime ? { publishedTime } : {}),
      images: [
        {
          url: image.url,
          secureUrl: image.secureUrl,
          width: image.width,
          height: image.height,
          type: image.type,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_SITE,
      title,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  }
}
