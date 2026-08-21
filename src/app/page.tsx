'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [stars, setStars] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  
  const mainRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const studioRef = useRef<HTMLElement>(null)
  const capabilitiesRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLElement>(null)
  const consultingRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    setMounted(true)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReducedMotion(prefersReducedMotion)
    
    fetch('https://api.github.com/repos/srikanthbellary/openstinger')
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count !== undefined) {
          setStars(data.stargazers_count)
        }
      })
      .catch(() => setStars(null))
  }, [])

  useEffect(() => {
    if (!mounted || reducedMotion) return

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })
    heroTl.to('.hero-tagline', { opacity: 0, y: -50 }, 0)
    heroTl.to('.scroll-indicator', { opacity: 0 }, 0)

    const studioTl = gsap.timeline({
      scrollTrigger: {
        trigger: studioRef.current,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
      }
    })
    studioTl.from('.studio-title', { 
      clipPath: 'inset(0 0 100% 0)', 
      y: 100, 
      opacity: 0 
    }, 0)
    studioTl.to('.studio-title', { 
      clipPath: 'inset(0 0 0% 0)' 
    }, 0)
    studioTl.from('.studio-subtitle', { y: 60, opacity: 0 }, 0.1)
    studioTl.from('.studio-locations', { y: 40, opacity: 0 }, 0.2)

    gsap.from('.products-header', {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0,
      duration: 1.2,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: productsRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    })

    gsap.from('.consulting-header', {
      clipPath: 'inset(0 0 0 100%)',
      opacity: 0,
      duration: 1.2,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: consultingRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    })

    if (railRef.current && capabilitiesRef.current) {
      const railWidth = railRef.current.scrollWidth
      const viewportWidth = window.innerWidth
      const scrollDistance = railWidth - viewportWidth + 100

      gsap.to(railRef.current, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: capabilitiesRef.current,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      })
    }

    const productCards = gsap.utils.toArray('.product-card')
    productCards.forEach((card, i) => {
      gsap.from(card as Element, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card as Element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        delay: i * 0.15
      })
    })

    const consultingItems = gsap.utils.toArray('.consulting-item')
    consultingItems.forEach((item, i) => {
      gsap.from(item as Element, {
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item as Element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        delay: i * 0.1
      })
    })

    const mediaItems = gsap.utils.toArray('.media-item')
    mediaItems.forEach((item, i) => {
      gsap.from(item as Element, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item as Element,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        delay: i * 0.08
      })
    })

    gsap.from('.contact-content > *', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: contactRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      }
    })

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [mounted, reducedMotion])

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion) return
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' })
  }

  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion) return
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
  }

  if (!mounted) return null

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex justify-center gap-8 md:gap-12 bg-void/80 backdrop-blur-sm border-b border-sun/10">
        <a href="#studio" className="nav-link">Studio</a>
        <a href="#products" className="nav-link">Products</a>
        <a href="#consulting" className="nav-link">Consulting</a>
        <a href="#contact" className="nav-link">Contact</a>
      </nav>

      <main ref={mainRef}>
        {/* Hero Section - Full Viewport Video */}
        <section ref={heroRef} className="video-hero">
          {!reducedMotion ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/media/poster-frame.jpg"
              className="video-bg"
            >
              <source src="/media/sunrise-logo-loop.mp4" type="video/mp4" />
            </video>
          ) : (
            <Image
              src="/media/poster-frame.jpg"
              alt="Sunrise Gen AI"
              fill
              className="poster-fallback object-cover"
              style={{ display: 'block' }}
              priority
            />
          )}
          
          <div className="video-vignette" />
          <div className="video-edge-fade" />
          
          <div className="hero-tagline">
            <p className="hero-wordmark">Grounding the Autonomous Era</p>
          </div>
          
          <div className="scroll-indicator">
            <div className="scroll-indicator-line" />
          </div>
        </section>

        {/* Studio Section */}
        <section ref={studioRef} id="studio" className="min-h-screen flex items-center justify-center px-6 py-32 bg-void">
          <div className="max-w-5xl mx-auto text-center">
            <div className="divider-sharp mx-auto mb-12" />
            
            <p className="chapter-number mb-6 text-teal">01 — Studio</p>
            
            <h2 className="studio-title chapter-title text-sun text-glow-sun mb-8">
              AI-NATIVE
            </h2>
            
            <p className="studio-subtitle text-lg md:text-xl text-teal/80 leading-relaxed max-w-3xl mx-auto mb-16">
              Sunrise Gen AI LLC is a software studio building for the autonomous era. 
              We create open-source tools, intelligent applications, and AI-generated media 
              that push the boundaries of what&apos;s possible.
            </p>
            
            <div className="studio-locations flex flex-wrap justify-center gap-4 md:gap-8 text-xs tracking-widest uppercase">
              <span className="text-hot/80">Wellington, FL — HQ</span>
              <span className="text-teal/30 hidden md:inline">|</span>
              <span className="text-hot/80">Hyderabad — Ops</span>
            </div>
          </div>
        </section>

        {/* Capabilities Horizontal Rail */}
        <section ref={capabilitiesRef} id="capabilities" className="h-screen bg-void-deep overflow-hidden">
          <div className="h-full flex items-center">
            <div ref={railRef} className="horizontal-rail">
              <div className="horizontal-rail-item flex items-center pl-8 md:pl-16">
                <div>
                  <p className="chapter-number mb-4 text-teal">02 — What We Do</p>
                  <h2 className="chapter-title text-sun">CAPABILITIES</h2>
                </div>
              </div>
              
              <div className="horizontal-rail-item">
                <div className="card-sharp p-8 h-full">
                  <span className="text-sun text-xs tracking-widest uppercase">Apps</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-teal mt-4 mb-4 uppercase tracking-tight">
                    Mobile &amp; Web
                  </h3>
                  <p className="text-teal/70 text-sm leading-relaxed">
                    AI-powered applications with computer vision, natural language processing, 
                    and intelligent automation. From concept to app store.
                  </p>
                </div>
              </div>
              
              <div className="horizontal-rail-item">
                <div className="card-sharp p-8 h-full">
                  <span className="text-sun text-xs tracking-widest uppercase">Media</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-teal mt-4 mb-4 uppercase tracking-tight">
                    T2S / T2I / T2V
                  </h3>
                  <p className="text-teal/70 text-sm leading-relaxed">
                    Text-to-speech voice overs, text-to-image posters and assets, 
                    text-to-video short films and advertisements. Full gen-AI media pipeline.
                  </p>
                </div>
              </div>
              
              <div className="horizontal-rail-item">
                <div className="card-sharp p-8 h-full">
                  <span className="text-sun text-xs tracking-widest uppercase">Enterprise</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-teal mt-4 mb-4 uppercase tracking-tight">
                    Consulting
                  </h3>
                  <p className="text-teal/70 text-sm leading-relaxed">
                    LLM-enabled data pipelines, AI agents for SRE, intelligent log analysis. 
                    Enterprise-grade AI solutions that deliver measurable ROI.
                  </p>
                </div>
              </div>
              
              <div className="horizontal-rail-item flex items-center pr-16">
                <div className="text-center">
                  <div className="stat-number text-sun text-glow-sun">60<span className="stat-unit">%</span></div>
                  <p className="text-teal/60 text-xs tracking-widest uppercase mt-4">
                    Workload Reduction Achieved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section ref={productsRef} id="products" className="min-h-screen px-6 py-32 bg-void">
          <div className="max-w-5xl mx-auto">
            <div className="products-header">
              <p className="chapter-number mb-4 text-teal">03 — Products</p>
              <h2 className="chapter-title text-sun text-glow-sun mb-4">WHAT WE BUILD</h2>
              <p className="text-teal/50 text-xs tracking-widest uppercase mb-16">Open Source First</p>
            </div>
            
            <div className="products-grid">
              {/* OpenStinger - Featured */}
              <div className="product-card card-sharp card-featured p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <span className="text-hot text-xs tracking-widest uppercase">OSS Flagship</span>
                    <h3 className="text-3xl md:text-4xl font-black text-sun mt-2 tracking-tight uppercase">
                      OPENSTINGER
                    </h3>
                  </div>
                  {stars !== null && (
                    <div className="flex items-center gap-2 text-hot">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="font-bold tracking-wider">{stars}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-xl md:text-2xl text-teal font-semibold mb-4">
                  Portable MCP Agent Memory
                </p>
                
                <p className="text-teal/70 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                  A self-hosted, MIT-licensed solution for persistent agent memory 
                  that travels with your workflows. Grounding the autonomous era.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://github.com/srikanthbellary/openstinger"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-cta magnetic-cta-teal"
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a
                    href="https://openstinger.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-cta magnetic-cta-sun"
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                  >
                    Website
                  </a>
                </div>
                
                <div className="mt-6 flex gap-3 text-xs tracking-widest uppercase text-teal/40">
                  <span>MIT License</span>
                  <span>·</span>
                  <span>Self-Hosted</span>
                </div>
              </div>
              
              {/* Ingredient Scanner */}
              <div className="product-card card-sharp p-8">
                <span className="text-teal/50 text-xs tracking-widest uppercase">In Development</span>
                <h3 className="text-xl md:text-2xl font-bold text-teal mt-3 mb-4 tracking-tight uppercase">
                  Ingredient Scanner
                </h3>
                <p className="text-teal/60 text-sm leading-relaxed mb-6">
                  Scan food labels to identify harmful ingredients instantly. 
                  AI-powered analysis for healthier choices.
                </p>
                <p className="text-hot/70 text-xs tracking-widest uppercase">
                  Android in Google Testing · iOS Next
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Consulting Section */}
        <section ref={consultingRef} id="consulting" className="min-h-screen px-6 py-32 bg-void-deep">
          <div className="max-w-5xl mx-auto">
            <div className="consulting-header">
              <p className="chapter-number mb-4 text-teal">04 — Consulting</p>
              <h2 className="chapter-title text-sun text-glow-sun mb-4">ENTERPRISE AI</h2>
              <p className="text-teal/50 text-xs tracking-widest uppercase mb-16">Solutions That Scale</p>
            </div>
            
            <div className="consulting-grid">
              <div className="consulting-item capability-item">
                <h3 className="text-lg font-bold text-sun tracking-wide uppercase mb-3">
                  AI Data Pipelines
                </h3>
                <p className="text-teal/70 text-sm leading-relaxed">
                  LLM-enabled data pipelines with highly accurate schema mapping. 
                  Up to 60% workload reduction achieved for enterprise clients.
                </p>
              </div>
              
              <div className="consulting-item capability-item">
                <h3 className="text-lg font-bold text-sun tracking-wide uppercase mb-3">
                  AI Agents for SRE
                </h3>
                <p className="text-teal/70 text-sm leading-relaxed">
                  Real-time suggestions for Site Reliability Engineering platforms. 
                  Reduce Mean Time to Resolution across your infrastructure.
                </p>
              </div>
              
              <div className="consulting-item capability-item">
                <h3 className="text-lg font-bold text-sun tracking-wide uppercase mb-3">
                  Intelligent Log Analysis
                </h3>
                <p className="text-teal/70 text-sm leading-relaxed">
                  Query cloud logs and monitoring alerts with natural language. 
                  Valuable insights with reduced turnaround times.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Media Section - Films Rail */}
        <section ref={mediaRef} id="media" className="px-6 py-32 bg-void">
          <div className="max-w-5xl mx-auto">
            <p className="chapter-number mb-4 text-teal">05 — Media</p>
            <h2 className="chapter-title text-sun text-glow-sun mb-4">T2V FILMS</h2>
            <p className="text-teal/50 text-xs tracking-widest uppercase mb-16">Gen-AI Short Films</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="media-item">
                <div className="card-sharp p-6">
                  <h3 className="film-title text-teal mb-2">Apocalyptic Roulette</h3>
                  <p className="film-meta text-teal">AI Short Film — Extinction Events</p>
                </div>
              </div>
              
              <div className="media-item">
                <div className="card-sharp p-6">
                  <h3 className="film-title text-teal mb-2">No Planet For Humans</h3>
                  <p className="film-meta text-teal">AI Short Film — Sentient AI Risks</p>
                </div>
              </div>
              
              <div className="media-item">
                <div className="card-sharp p-6">
                  <h3 className="film-title text-teal mb-2">Arcane Legacy</h3>
                  <p className="film-meta text-teal">RunwayML Gen:48 Festival</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} id="contact" className="min-h-screen flex items-center px-6 py-32 bg-void-deep">
          <div className="max-w-3xl mx-auto text-center contact-content">
            <div className="divider-sharp mx-auto mb-12" />
            
            <p className="chapter-number mb-6 text-teal">06 — Contact</p>
            
            <h2 className="chapter-title text-sun text-glow-sun mb-8">LET&apos;S TALK</h2>
            
            <p className="text-teal/70 text-lg mb-12 max-w-xl mx-auto">
              Building something that needs AI expertise? 
              Interested in OpenStinger? Let&apos;s connect.
            </p>
            
            <div className="space-y-4 mb-12">
              <a
                href="mailto:sunrisegenai@gmail.com"
                className="block text-lg md:text-xl text-teal hover:text-sun transition-colors duration-300 tracking-wider"
              >
                sunrisegenai@gmail.com
              </a>
              <a
                href="tel:+14403408383"
                className="block text-lg md:text-xl text-teal hover:text-sun transition-colors duration-300 tracking-wider"
              >
                (440) 340-8383
              </a>
            </div>
            
            <a
              href="mailto:sunrisegenai@gmail.com?subject=Project%20Inquiry"
              className="magnetic-cta magnetic-cta-sun"
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
            >
              Start a Conversation
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-sun/20 bg-void-deep">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-teal/40 text-xs tracking-wider uppercase">
                © {new Date().getFullYear()} Sunrise Gen AI LLC
              </div>
              <div className="flex gap-8">
                <a
                  href="https://github.com/srikanthbellary/openstinger"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
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
    </>
  )
}
