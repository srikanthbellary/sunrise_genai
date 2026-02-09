'use client';

import LocationClocks from './components/LocationClocks';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Clean background that blends with logo edges */}
      <div className="logo-blend-background"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm border-b border-orange-500/30">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex justify-center items-center">
            <div className="flex flex-wrap justify-center space-x-4 md:space-x-8">
              <a href="#hero" className="nav-link text-xs md:text-sm">Home</a>
              <a href="#about" className="nav-link text-xs md:text-sm">About</a>
              <a href="#services" className="nav-link text-xs md:text-sm">Services</a>
              <a href="#products" className="nav-link text-xs md:text-sm">Products</a>
              <a href="#locations" className="nav-link text-xs md:text-sm">Locations</a>
              <a href="#contact" className="nav-link text-xs md:text-sm">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="logo-container mb-6 md:mb-8 animate-fade-in-up" style={{ maxHeight: '400px', overflow: 'hidden' }}>
            <img
              src="/logo.webp"
              alt="Sunrise Gen AI"
              className="h-48 md:h-64 lg:h-96 w-auto mx-auto logo-with-glow max-w-full object-contain"
              style={{ maxHeight: '384px', maxWidth: '100%', display: 'block' }}
            />
          </div>
          <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 gen-ai-font-light content-text animate-fade-in-up animate-delay-200 px-4">
            AI-Native Software Development
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up animate-delay-400">
            <a href="#services" className="logo-button w-full sm:w-auto text-sm md:text-base">
              Explore Services
            </a>
            <a href="#contact" className="logo-button w-full sm:w-auto text-sm md:text-base">
              Start a Project
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="section-heading gen-ai-font animate-fade-in-up text-2xl md:text-3xl lg:text-4xl">About Sunrise Gen AI</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="content-text gen-ai-font-light text-base md:text-lg mb-6 md:mb-8 animate-fade-in-up animate-delay-200 px-2">
              We are an AI-native software development company building the future of intelligent software.
              Our hybrid team of human experts and AI agents delivers cutting-edge solutions that transform how businesses operate.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="project-card project-card-enhanced animate-slide-in-left animate-delay-300">
                <h3 className="project-title gen-ai-font-medium text-lg md:text-xl">Human + AI Teams</h3>
                <p className="project-description gen-ai-font-light text-sm md:text-base">
                  Expert developers working alongside AI agents for accelerated delivery.
                </p>
              </div>
              <div className="project-card project-card-enhanced animate-fade-in-up animate-delay-400">
                <h3 className="project-title gen-ai-font-medium text-lg md:text-xl">AI-First Approach</h3>
                <p className="project-description gen-ai-font-light text-sm md:text-base">
                  Every solution optimized with AI for maximum efficiency and innovation.
                </p>
              </div>
              <div className="project-card project-card-enhanced animate-slide-in-right animate-delay-500">
                <h3 className="project-title gen-ai-font-medium text-lg md:text-xl">24/7 Operations</h3>
                <p className="project-description gen-ai-font-light text-sm md:text-base">
                  Autonomous agentic systems that never sleep, continuously delivering value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="section-heading gen-ai-font animate-fade-in-up text-2xl md:text-3xl lg:text-4xl">AI-Powered Services</h2>
          <div className="max-w-5xl mx-auto">
            <p className="content-text gen-ai-font-light text-base md:text-lg mb-8 md:mb-12 animate-fade-in-up animate-delay-200 px-2 text-center">
              Every service we offer is optimized with AI for maximum efficiency, quality, and innovation.
            </p>

            {/* Tier 1: AI Agents & Intelligence */}
            <div className="mb-12">
              <h3 className="text-xl md:text-2xl gen-ai-font-medium text-neon-cyan mb-6 text-center">AI Agents & Intelligence</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="project-card project-card-enhanced animate-slide-in-left animate-delay-300">
                  <h4 className="project-title gen-ai-font-medium text-lg">Autonomous AI Agents</h4>
                  <p className="project-description gen-ai-font-light text-sm">
                    Custom agents that automate complex workflows, make decisions, and operate 24/7.
                  </p>
                </div>
                <div className="project-card project-card-enhanced animate-fade-in-up animate-delay-400">
                  <h4 className="project-title gen-ai-font-medium text-lg">AI Chatbots</h4>
                  <p className="project-description gen-ai-font-light text-sm">
                    Intelligent conversational interfaces for customer service and knowledge bases.
                  </p>
                </div>
                <div className="project-card project-card-enhanced animate-slide-in-right animate-delay-500">
                  <h4 className="project-title gen-ai-font-medium text-lg">Agentic IT Operations</h4>
                  <p className="project-description gen-ai-font-light text-sm">
                    AI-driven infrastructure management and autonomous incident response.
                  </p>
                </div>
              </div>
            </div>

            {/* Tier 2: AI-Accelerated Development */}
            <div className="mb-12">
              <h3 className="text-xl md:text-2xl gen-ai-font-medium text-neon-cyan mb-6 text-center">AI-Accelerated Development</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="project-card project-card-enhanced animate-slide-in-left animate-delay-300">
                  <h4 className="project-title gen-ai-font-medium text-lg">Mobile Apps</h4>
                  <p className="project-description gen-ai-font-light text-sm">
                    Rapid prototyping and development using AI-assisted coding and design.
                  </p>
                </div>
                <div className="project-card project-card-enhanced animate-fade-in-up animate-delay-400">
                  <h4 className="project-title gen-ai-font-medium text-lg">Web Applications</h4>
                  <p className="project-description gen-ai-font-light text-sm">
                    Full-stack web apps built with AI-enhanced development workflows.
                  </p>
                </div>
                <div className="project-card project-card-enhanced animate-slide-in-right animate-delay-500">
                  <h4 className="project-title gen-ai-font-medium text-lg">Websites</h4>
                  <p className="project-description gen-ai-font-light text-sm">
                    Modern, responsive websites with AI-generated content and optimization.
                  </p>
                </div>
              </div>
            </div>

            {/* Tier 3: AI Multimedia Studio */}
            <div>
              <h3 className="text-xl md:text-2xl gen-ai-font-medium text-neon-cyan mb-6 text-center">AI Multimedia Studio</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="project-card project-card-enhanced animate-fade-in-up animate-delay-300 text-center">
                  <h4 className="project-title gen-ai-font-medium text-base">T2T</h4>
                  <p className="project-description gen-ai-font-light text-xs">Text-to-Text</p>
                </div>
                <div className="project-card project-card-enhanced animate-fade-in-up animate-delay-400 text-center">
                  <h4 className="project-title gen-ai-font-medium text-base">T2A</h4>
                  <p className="project-description gen-ai-font-light text-xs">Text-to-Audio</p>
                </div>
                <div className="project-card project-card-enhanced animate-fade-in-up animate-delay-500 text-center">
                  <h4 className="project-title gen-ai-font-medium text-base">T2I</h4>
                  <p className="project-description gen-ai-font-light text-xs">Text-to-Image</p>
                </div>
                <div className="project-card project-card-enhanced animate-fade-in-up animate-delay-500 text-center">
                  <h4 className="project-title gen-ai-font-medium text-base">T2V</h4>
                  <p className="project-description gen-ai-font-light text-xs">Text-to-Video</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="section-heading gen-ai-font animate-fade-in-up text-2xl md:text-3xl lg:text-4xl">Our Products</h2>
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
            <p className="content-text gen-ai-font-light text-base md:text-lg animate-fade-in-up animate-delay-200 px-2">
              Products we've built using our AI-first approach - proof of our capabilities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="project-card project-card-enhanced animate-slide-in-left animate-delay-300">
              <h3 className="project-title gen-ai-font-medium text-lg md:text-xl">LabelSaber.com</h3>
              <p className="project-description gen-ai-font-light text-sm md:text-base mb-4">
                Intelligent Ingredient Analyzer powered by AI and Computer Vision OCR.
              </p>
              <button className="logo-button text-sm md:text-base">Learn More</button>
            </div>
            <div className="project-card project-card-enhanced animate-fade-in-up animate-delay-400">
              <h3 className="project-title gen-ai-font-medium text-lg md:text-xl">Swaram.ai</h3>
              <p className="project-description gen-ai-font-light text-sm md:text-base mb-4">
                Your intelligent AI Voice Companion with natural, human-like conversations.
              </p>
              <button className="logo-button text-sm md:text-base">Explore</button>
            </div>
            <div className="project-card project-card-enhanced animate-slide-in-right animate-delay-500">
              <h3 className="project-title gen-ai-font-medium text-lg md:text-xl">Lensort.com</h3>
              <p className="project-description gen-ai-font-light text-sm md:text-base mb-4">
                AI-driven analytics platform for intelligent reporting and insights.
              </p>
              <button className="logo-button text-sm md:text-base">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* Agentic Future Section - Full */}
      <section id="agentic-future" className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="section-heading gen-ai-font animate-fade-in-up text-2xl md:text-3xl lg:text-4xl">The Agentic Future</h2>
          <div className="max-w-4xl mx-auto">
            <div className="project-card project-card-enhanced animate-fade-in-up animate-delay-300">
              <p className="content-text gen-ai-font-light text-base md:text-lg mb-6 text-center">
                We're building something revolutionary: an autonomous agentic software team where AI agents
                take on roles like Developer, QA Engineer, DevOps, and Project Manager - operating 24/7.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🤖</div>
                  <p className="project-description gen-ai-font-light text-xs">AI Developer</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🔍</div>
                  <p className="project-description gen-ai-font-light text-xs">AI QA Engineer</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">⚙️</div>
                  <p className="project-description gen-ai-font-light text-xs">AI DevOps</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📋</div>
                  <p className="project-description gen-ai-font-light text-xs">AI PM</p>
                </div>
              </div>
              <p className="content-text gen-ai-font-light text-sm mt-6 text-center opacity-80">
                Currently: Human + AI hybrid teams | Future: Fully autonomous operations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="section-heading gen-ai-font animate-fade-in-up text-2xl md:text-3xl lg:text-4xl">Locations</h2>
          <div className="max-w-4xl mx-auto animate-fade-in-up animate-delay-200">
            <LocationClocks />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="section-heading gen-ai-font animate-fade-in-up text-2xl md:text-3xl lg:text-4xl">Get In Touch</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="project-card project-card-enhanced animate-slide-in-left animate-delay-300">
                <h3 className="project-title gen-ai-font-medium text-lg mb-4">Send a Message</h3>
                <form action="mailto:sunrisegenai@gmail.com" method="post" encType="text/plain">
                  <input type="text" placeholder="Your Name" className="w-full mb-4 p-3 bg-cyber-navy border border-neon-cyan/30 text-neon-cyan gen-ai-font-light text-sm focus:border-neon-cyan outline-none" />
                  <input type="email" placeholder="Your Email" className="w-full mb-4 p-3 bg-cyber-navy border border-neon-cyan/30 text-neon-cyan gen-ai-font-light text-sm focus:border-neon-cyan outline-none" />
                  <textarea placeholder="Your Message" rows={4} className="w-full mb-4 p-3 bg-cyber-navy border border-neon-cyan/30 text-neon-cyan gen-ai-font-light text-sm focus:border-neon-cyan outline-none resize-none"></textarea>
                  <button type="submit" className="logo-button w-full text-sm">Send Message</button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-6 animate-slide-in-right animate-delay-400">
                <div className="project-card project-card-enhanced">
                  <h3 className="project-title gen-ai-font-medium text-lg mb-2">📞 Phone</h3>
                  <p className="text-neon-cyan gen-ai-font-light text-lg">440-340-8383</p>
                </div>
                <div className="project-card project-card-enhanced">
                  <h3 className="project-title gen-ai-font-medium text-lg mb-2">📧 Email</h3>
                  <p className="text-neon-cyan gen-ai-font-light text-sm">sunrisegenai@gmail.com</p>
                </div>
                <div className="project-card project-card-enhanced">
                  <h3 className="project-title gen-ai-font-medium text-lg mb-2">🤖 AI Assistant</h3>
                  <p className="project-description gen-ai-font-light text-sm">Coming Soon</p>
                  <p className="text-neon-orange text-xs gen-ai-font-light mt-1">Chatbot integration in progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
