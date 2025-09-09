import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sunrise Gen AI - Future of AI Technology | AI Apps, Multimedia & Consulting',
  description: 'Florida-based Sunrise Gen AI LLC creates cutting-edge AI mobile apps (LabelSaber, Swaram, Lensort), AI-generated multimedia content, and enterprise AI consulting services. Leading the future of generative AI technology.',
  keywords: 'AI, artificial intelligence, mobile apps, multimedia, consulting, generative AI, machine learning, LabelSaber, Swaram, Lensort, AI data pipelines, AI agents, AI chatbots, Florida AI company',
  authors: [{ name: 'Sunrise Gen AI LLC' }],
  creator: 'Sunrise Gen AI LLC',
  publisher: 'Sunrise Gen AI LLC',
  robots: 'index, follow',
  metadataBase: new URL('https://sunrisegen.ai'),
  alternates: {
    canonical: 'https://sunrisegen.ai',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sunrisegen.ai',
    siteName: 'Sunrise Gen AI',
    title: 'Sunrise Gen AI - Future of AI Technology',
    description: 'Cutting-edge AI mobile apps, multimedia content, and consulting services from Florida-based Sunrise Gen AI LLC.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Sunrise Gen AI Logo - Cyberpunk style logo with circuit patterns',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunrise Gen AI - Future of AI Technology',
    description: 'Cutting-edge AI mobile apps, multimedia content, and consulting services.',
    images: ['/logo.png'],
  },
}

// Viewport configuration
export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#00F5FF',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${inter.variable} font-sans antialiased overflow-x-hidden`}>
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-500 text-white px-4 py-2 rounded z-50">
          Skip to main content
        </a>
        
        <div className="min-h-screen">
          {/* Main Content */}
          <main id="main-content" className="relative z-10">
            {children}
          </main>
        </div>
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Sunrise Gen AI LLC",
              "url": "https://sunrisegen.ai",
              "logo": "https://sunrisegen.ai/logo.png",
              "description": "Florida-based company specializing in AI mobile apps, multimedia content, and consulting services",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "FL",
                "addressCountry": "US"
              },
              "sameAs": [
                "https://sunrisegenai.com"
              ],
              "foundingDate": "2024",
              "industry": "Artificial Intelligence",
              "services": [
                "AI Mobile Applications",
                "AI-Generated Multimedia",
                "AI Consulting Services"
              ]
            })
          }}
        />
      </body>
    </html>
  )
}
