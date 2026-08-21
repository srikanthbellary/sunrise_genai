'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import SmoothScroll from '@/components/SmoothScroll'
import ScrollReveal from '@/components/ScrollReveal'

export default function Home() {
  const [stars, setStars] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    fetch('https://api.github.com/repos/srikanthbellary/openstinger')
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count) {
          setStars(data.stargazers_count)
        }
      })
      .catch(() => {
        setStars(null)
      })
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <SmoothScroll>
      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 hero-gradient overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-sunrise-bg via-sunrise-bg to-transparent" />
          
          <div className="relative z-10 text-center max-w-5xl mx-auto">
            <div className="mb-8 relative">
              <Image
                src="/logo.png"
                alt="Sunrise Gen AI"
                width={384}
                height={384}
                className="mx-auto w-64 h-64 md:w-96 md:h-96 object-contain opacity-90"
                priority
              />
            </div>
            
            <p className="text-sunrise-cyan/80 text-sm md:text-base tracking-[0.3em] uppercase mb-12 font-medium">
              Grounding the Autonomous Era
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#products"
                className="px-8 py-4 border-2 border-sunrise-orange text-sunrise-orange font-bold tracking-wider uppercase text-sm hover:bg-sunrise-orange hover:text-sunrise-bg transition-all duration-300 border-glow-orange"
              >
                See Our Work
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border-2 border-sunrise-cyan text-sunrise-cyan font-bold tracking-wider uppercase text-sm hover:bg-sunrise-cyan hover:text-sunrise-bg transition-all duration-300 border-glow-cyan"
              >
                Get in Touch
              </a>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-pulse-subtle">
            <svg className="w-6 h-6 text-sunrise-cyan/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* About Section */}
        <section className="relative py-32 px-6 bg-gradient-to-b from-sunrise-bg to-sunrise-bg-light">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="divider-line w-24 mx-auto mb-16" />
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-bold text-sunrise-orange text-center mb-8 tracking-wider text-glow-orange">
                AI-NATIVE
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-sunrise-cyan/90 text-center leading-relaxed max-w-3xl mx-auto">
                Sunrise Gen AI LLC is a software studio building for the autonomous era. 
                We create open-source tools and intelligent applications that push 
                the boundaries of what AI can do.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap justify-center gap-8 mt-16 text-sm tracking-widest uppercase">
                <span className="text-sunrise-yellow/70">Florida HQ</span>
                <span className="text-sunrise-cyan/30">|</span>
                <span className="text-sunrise-yellow/70">Hyderabad Ops</span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="relative py-32 px-6 bg-sunrise-bg-light">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl md:text-4xl font-bold text-sunrise-orange text-center mb-4 tracking-wider">
                WHAT WE BUILD
              </h2>
              <p className="text-sunrise-cyan/60 text-center mb-20 tracking-widest uppercase text-sm">
                Open Source First
              </p>
            </ScrollReveal>

            {/* OpenStinger - Featured Product */}
            <ScrollReveal delay={0.1}>
              <div className="mb-24">
                <div className="border-2 border-sunrise-orange/30 p-8 md:p-12 bg-sunrise-bg/50 backdrop-blur-sm border-glow-orange">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                    <div>
                      <span className="text-sunrise-yellow text-xs tracking-[0.4em] uppercase mb-3 block">
                        Open Source Flagship
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold text-sunrise-orange tracking-wider">
                        OPENSTINGER
                      </h3>
                    </div>
                    {stars !== null && (
                      <div className="flex items-center gap-2 text-sunrise-yellow">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="font-bold tracking-wider">{stars}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xl md:text-2xl text-sunrise-cyan mb-4 font-medium">
                    Portable MCP Agent Memory
                  </p>
                  
                  <p className="text-sunrise-cyan/70 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                    Grounding the Autonomous Era. A self-hosted, MIT-licensed solution 
                    for persistent agent memory that travels with your workflows.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://github.com/srikanthbellary/openstinger"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 border-2 border-sunrise-cyan text-sunrise-cyan font-bold tracking-wider uppercase text-sm hover:bg-sunrise-cyan hover:text-sunrise-bg transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                    <a
                      href="https://openstinger.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 border-2 border-sunrise-orange text-sunrise-orange font-bold tracking-wider uppercase text-sm hover:bg-sunrise-orange hover:text-sunrise-bg transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      Website
                    </a>
                  </div>
                  
                  <div className="mt-6 flex gap-3 text-xs tracking-widest uppercase text-sunrise-cyan/50">
                    <span>MIT License</span>
                    <span>·</span>
                    <span>Self-Hosted</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Ingredient Scanner */}
            <ScrollReveal delay={0.2}>
              <div className="border border-sunrise-cyan/20 p-8 bg-sunrise-bg/30">
                <span className="text-sunrise-cyan/50 text-xs tracking-[0.4em] uppercase mb-3 block">
                  In Development
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-sunrise-cyan tracking-wider mb-4">
                  INGREDIENT SCANNER
                </h3>
                <p className="text-sunrise-cyan/70 text-base leading-relaxed">
                  Scan food labels to identify harmful ingredients instantly. 
                  Android in Google testing, iOS next.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="relative py-32 px-6 bg-gradient-to-b from-sunrise-bg-light to-sunrise-bg">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl md:text-4xl font-bold text-sunrise-orange text-center mb-4 tracking-wider">
                CONSULTING
              </h2>
              <p className="text-sunrise-cyan/60 text-center mb-16 tracking-widest uppercase text-sm">
                Enterprise AI Solutions
              </p>
            </ScrollReveal>

            <div className="space-y-8">
              <ScrollReveal delay={0.1}>
                <div className="border-l-2 border-sunrise-orange/50 pl-6">
                  <h3 className="text-lg font-bold text-sunrise-orange tracking-wider mb-2">
                    AI DATA PIPELINES
                  </h3>
                  <p className="text-sunrise-cyan/70 text-base leading-relaxed">
                    LLM-enabled data pipelines with highly accurate schema mapping. 
                    Up to 60% workload reduction achieved for enterprise clients.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="border-l-2 border-sunrise-orange/50 pl-6">
                  <h3 className="text-lg font-bold text-sunrise-orange tracking-wider mb-2">
                    AI AGENTS FOR SRE
                  </h3>
                  <p className="text-sunrise-cyan/70 text-base leading-relaxed">
                    Real-time suggestions for Site Reliability Engineering platforms. 
                    Reduce Mean Time to Resolution across your infrastructure.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="border-l-2 border-sunrise-orange/50 pl-6">
                  <h3 className="text-lg font-bold text-sunrise-orange tracking-wider mb-2">
                    INTELLIGENT LOG ANALYSIS
                  </h3>
                  <p className="text-sunrise-cyan/70 text-base leading-relaxed">
                    Query cloud logs and monitoring alerts with natural language. 
                    Valuable insights with reduced turnaround times.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-32 px-6 bg-sunrise-bg">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <div className="divider-line w-24 mx-auto mb-16" />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="text-2xl md:text-4xl font-bold text-sunrise-orange mb-8 tracking-wider text-glow-orange">
                LET&apos;S TALK
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-sunrise-cyan/80 text-lg mb-12 max-w-xl mx-auto">
                Building something that needs AI expertise? 
                Interested in OpenStinger? Let&apos;s connect.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="space-y-6">
                <a
                  href="mailto:sunrisegenai@gmail.com"
                  className="block text-lg md:text-xl text-sunrise-cyan hover:text-sunrise-orange transition-colors duration-300 tracking-wider"
                >
                  sunrisegenai@gmail.com
                </a>
                <a
                  href="tel:+14403408383"
                  className="block text-lg md:text-xl text-sunrise-cyan hover:text-sunrise-orange transition-colors duration-300 tracking-wider"
                >
                  (440) 340-8383
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <a
                href="mailto:sunrisegenai@gmail.com?subject=Project%20Inquiry"
                className="inline-block mt-12 px-10 py-5 bg-sunrise-orange text-sunrise-bg font-bold tracking-wider uppercase text-sm hover:bg-sunrise-yellow transition-all duration-300"
              >
                Start a Conversation
              </a>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-sunrise-orange/20 bg-sunrise-bg">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-sunrise-cyan/50 text-sm tracking-wider">
                © {new Date().getFullYear()} Sunrise Gen AI LLC
              </div>
              <div className="flex gap-8">
                <a
                  href="https://github.com/srikanthbellary/openstinger"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sunrise-cyan/50 hover:text-sunrise-cyan transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </SmoothScroll>
  )
}
