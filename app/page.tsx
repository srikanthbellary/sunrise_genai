'use client';

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
              <a href="#about" className="nav-link text-xs md:text-sm">About</a>
              <a href="#consulting" className="nav-link text-xs md:text-sm">Consulting</a>
              <a href="#apps" className="nav-link text-xs md:text-sm">Mobile Apps</a>
              <a href="#multimedia" className="nav-link text-xs md:text-sm">Multimedia</a>
              <a href="#contact" className="nav-link text-xs md:text-sm">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="logo-container mb-6 md:mb-8 animate-fade-in-up">
            <img 
              src="/logo.webp" 
              alt="Sunrise Gen AI" 
              className="h-48 md:h-64 lg:h-96 w-auto mx-auto logo-with-glow"
            />
          </div>
          <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 gen-ai-font-light content-text animate-fade-in-up animate-delay-200 px-4">
            Cutting-Edge AI Solutions for the Future
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up animate-delay-400">
            <button className="logo-button w-full sm:w-auto text-sm md:text-base">
              Explore Our Apps
            </button>
            <button className="logo-button w-full sm:w-auto text-sm md:text-base">
              Watch Our Films
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="section-heading gen-ai-font animate-fade-in-up text-2xl md:text-3xl lg:text-4xl">About Sunrise Gen AI</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="content-text gen-ai-font-light text-base md:text-lg mb-6 md:mb-8 animate-fade-in-up animate-delay-200 px-2">
              We are a Florida-based company pushing the boundaries of what's possible with Generative AI. 
              Our mission is to create cutting-edge solutions that transform industries and revolutionize user experiences.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="project-card project-card-enhanced animate-slide-in-left animate-delay-300">
                <h3 className="project-title gen-ai-font-medium text-lg md:text-xl">Consulting</h3>
                <p className="project-description gen-ai-font-light text-sm md:text-base">
                  Expert AI consulting services to help enterprises harness the power of generative AI.
                </p>
              </div>
              <div className="project-card project-card-enhanced animate-fade-in-up animate-delay-400">
                <h3 className="project-title gen-ai-font-medium text-lg md:text-xl">Mobile Apps</h3>
                <p className="project-description gen-ai-font-light text-sm md:text-base">
                  AI-powered mobile applications that solve real-world problems with intelligent automation.
                </p>
              </div>
              <div className="project-card project-card-enhanced animate-slide-in-right animate-delay-500">
                <h3 className="project-title gen-ai-font-medium text-lg md:text-xl">Multimedia</h3>
                <p className="project-description gen-ai-font-light text-sm md:text-base">
                  Revolutionary AI-generated films and content that push creative boundaries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Section */}
      <section id="consulting" className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="section-heading gen-ai-font animate-fade-in-up text-2xl md:text-3xl lg:text-4xl">AI Consulting</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="content-text gen-ai-font-light text-base md:text-lg mb-6 md:mb-8 animate-fade-in-up animate-delay-200 px-2">
              We help enterprises and organizations harness the power of Generative AI 
              to transform their operations and unlock new possibilities.
            </p>
            <div className="space-y-6 md:space-y-8">
              <div className="project-card project-card-enhanced animate-slide-in-left animate-delay-300">
                <h3 className="project-title gen-ai-font-medium text-lg md:text-xl">AI Data Pipelines</h3>
                <p className="project-description gen-ai-font-light text-sm md:text-base mb-4">
                  AI/LLM enabled Data Pipelines with highly accurate schema mapping 
                  (Up to 60% workload reduction achieved).
                </p>
                <button className="logo-button text-sm md:text-base">Learn More</button>
              </div>
              
              <div className="project-card project-card-enhanced animate-fade-in-up animate-delay-400">
                <h3 className="project-title gen-ai-font-medium text-lg md:text-xl">AI Agents</h3>
                <p className="project-description gen-ai-font-light text-sm md:text-base mb-4">
                  AI/LLM enabled Agents providing real-time suggestions for Site Reliability Engineering [SRE] Platforms 
                  (Reduce Mean Time to Resolution [MTTR]).
                </p>
                <button className="logo-button text-sm md:text-base">Learn More</button>
              </div>
              
              <div className="project-card project-card-enhanced animate-slide-in-right animate-delay-500">
                <h3 className="project-title gen-ai-font-medium text-lg md:text-xl">AI Chatbots</h3>
                <p className="project-description gen-ai-font-light text-sm md:text-base mb-4">
                  AI/LLM enabled Chatbots to query cloud logs and monitoring alerts 
                  (Providing valuable insights and reduce turn around times).
                </p>
                <button className="logo-button text-sm md:text-base">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Apps Section */}
      <section id="apps" className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="section-heading gen-ai-font animate-fade-in-up text-2xl md:text-3xl lg:text-4xl">Gen AI Mobile Apps</h2>
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
            <p className="content-text gen-ai-font-light text-base md:text-lg animate-fade-in-up animate-delay-200 px-2">
              We develop AI-enabled and LLM-integrated cutting-edge mobile applications that 
              innovate new solutions for diverse user needs. Our apps harness the power of 
              artificial intelligence to deliver intelligent, intuitive experiences that 
              transform how people interact with technology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="project-card project-card-enhanced animate-slide-in-left animate-delay-300">
              <h3 className="project-title gen-ai-font-medium text-lg md:text-xl">LabelSaber.com</h3>
              <p className="project-description gen-ai-font-light text-sm md:text-base mb-4">
                Intelligent Ingredient Analyzer powered by AI and Computer Vision OCR. 
                Instantly analyze food labels and get detailed nutritional insights.
              </p>
              <button className="logo-button text-sm md:text-base">Learn More</button>
            </div>
            <div className="project-card project-card-enhanced animate-fade-in-up animate-delay-400">
              <h3 className="project-title gen-ai-font-medium text-lg md:text-xl">Swaram.ai</h3>
              <p className="project-description gen-ai-font-light text-sm md:text-base mb-4">
                Your intelligent AI Voice Companion that understands context and provides 
                natural, human-like conversations.
              </p>
              <button className="logo-button text-sm md:text-base">Explore</button>
            </div>
            <div className="project-card project-card-enhanced animate-slide-in-right animate-delay-500">
              <h3 className="project-title gen-ai-font-medium text-lg md:text-xl">Lensort.com</h3>
              <p className="project-description gen-ai-font-light text-sm md:text-base mb-4">
                Intelligent Photos and Documents organizer that uses AI to automatically 
                categorize and sort your digital life.
              </p>
              <button className="logo-button text-sm md:text-base">Try Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Multimedia Section */}
      <section id="multimedia" className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="section-heading gen-ai-font animate-fade-in-up text-2xl md:text-3xl lg:text-4xl">AI Multimedia</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="content-text gen-ai-font-light text-base md:text-lg mb-6 md:mb-8 animate-fade-in-up animate-delay-200 px-2">
              We create groundbreaking AI-generated films that push the boundaries of 
              storytelling and showcase the transformative power of artificial intelligence in multimedia.
            </p>
            <div className="project-card project-card-enhanced animate-fade-in-up animate-delay-400">
              <h3 className="project-title gen-ai-font-medium text-lg md:text-xl">Gen AI Ads and Short Films</h3>
              <p className="project-description gen-ai-font-light text-sm md:text-base mb-4">
                We specialize in creating thought-provoking AI-generated short films that explore 
                diverse themes including dystopian and utopian futures, philosophical questions, 
                futuristic societies, and fun-loving adventures. Our films showcase the creative 
                potential of artificial intelligence in storytelling and visual narrative.
              </p>
              <button className="logo-button text-sm md:text-base">Coming Soon</button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="section-heading gen-ai-font animate-fade-in-up text-2xl md:text-3xl lg:text-4xl">Contact Us</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="content-text gen-ai-font-light text-base md:text-lg mb-6 md:mb-8 animate-fade-in-up animate-delay-200 px-2">
              Ready to explore the future of AI? Get in touch with our team.
            </p>
            <div className="project-card project-card-enhanced animate-fade-in-up animate-delay-400">
              <h3 className="project-title gen-ai-font-medium text-lg md:text-xl">Sunrise Gen AI LLC</h3>
              <p className="project-description gen-ai-font-light text-sm md:text-base mb-4">
                Florida, USA<br/>
                sunrisegen.ai | sunrisegenai.com
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                <button className="logo-button w-full sm:w-auto text-sm md:text-base">Send Email</button>
                <button className="logo-button w-full sm:w-auto text-sm md:text-base">Schedule Call</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
