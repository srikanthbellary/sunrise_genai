# 🏗️ Project Structure & Architecture

## 📁 Complete Directory Structure

```
sunrise-genai-website/
├── app/                           # Next.js 14+ App Router
│   ├── components/               # Reusable React components
│   │   ├── ui/                  # Basic UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Modal.tsx
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/            # Page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── AppsSection.tsx
│   │   │   ├── MultimediaSection.tsx
│   │   │   ├── ConsultingSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── 3d/                  # Three.js components
│   │   │   ├── Scene.tsx
│   │   │   ├── LogoModel.tsx
│   │   │   ├── ParticleSystem.tsx
│   │   │   └── BackgroundEffect.tsx
│   │   └── animations/          # Animation components
│   │       ├── FadeIn.tsx
│   │       ├── SlideUp.tsx
│   │       ├── ParallaxSection.tsx
│   │       └── ScrollReveal.tsx
│   ├── hooks/                   # Custom React hooks
│   │   ├── useScrollProgress.ts
│   │   ├── useIntersection.ts
│   │   ├── useWindowSize.ts
│   │   └── use3DEffects.ts
│   ├── fonts/                   # Custom fonts
│   │   ├── inter/
│   │   └── orbitron/
│   ├── globals.css             # Global CSS styles
│   ├── layout.tsx              # Root layout component
│   └── page.tsx                # Main page (SPA)
├── public/                      # Static assets
│   ├── images/                 # Image assets
│   │   ├── logo/
│   │   │   ├── sunrise-logo.png
│   │   │   ├── sunrise-logo.svg
│   │   │   └── favicon.ico
│   │   ├── apps/               # App screenshots
│   │   │   ├── labelsaber/
│   │   │   ├── swaram/
│   │   │   └── lensort/
│   │   ├── multimedia/         # Film thumbnails
│   │   │   ├── apocalyptic-roulette/
│   │   │   ├── no-planet/
│   │   │   └── arcane-legacy/
│   │   └── backgrounds/        # Background images
│   ├── models/                 # 3D models and assets
│   │   ├── logo-3d.glb
│   │   └── particles.json
│   ├── videos/                 # Video assets
│   │   └── hero-background.mp4
│   └── icons/                  # Icon assets
│       ├── social/
│       └── ui/
├── lib/                        # Utility functions
│   ├── utils.ts               # General utilities
│   ├── constants.ts           # App constants
│   ├── animations.ts          # Animation configurations
│   ├── three-utils.ts         # Three.js utilities
│   └── scroll-utils.ts        # Smooth scroll utilities
├── types/                      # TypeScript type definitions
│   ├── global.d.ts           # Global types
│   ├── components.ts         # Component prop types
│   ├── three.d.ts           # Three.js types
│   └── animations.ts        # Animation types
├── styles/                     # CSS modules and styles
│   ├── components/
│   └── globals/
├── config/                     # Configuration files
│   ├── site.ts              # Site configuration
│   ├── theme.ts             # Design system config
│   └── animations.ts        # Animation presets
├── docs/                       # Documentation
│   ├── DEPLOYMENT.md
│   ├── CONTRIBUTING.md
│   └── API.md
├── .env.local                  # Environment variables
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── .eslintrc.json            # ESLint configuration
├── .prettierrc               # Prettier configuration
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
├── README.md                 # Project documentation
├── project-structure.md      # This file
└── project-tracker.md        # Development tracker
```

## 🏛️ Architecture Overview

### 1. **Single Page Application (SPA) Design**
- **One main page** (`app/page.tsx`) with multiple sections
- **Smooth scrolling** navigation between sections
- **Section-based routing** using scroll position and intersection observers
- **Progressive loading** of 3D assets and animations

### 2. **Component Architecture**

#### **Atomic Design Principles**
```
Atoms (ui/)          → Basic UI elements
Molecules (sections/) → Page sections
Organisms (layout/)  → Complex layouts
Templates (page.tsx) → Page structure
```

#### **Component Hierarchy**
```
App (layout.tsx)
├── Navigation
├── HeroSection
│   ├── 3D Logo Scene
│   ├── Particle System
│   └── Animated Text
├── AboutSection
├── AppsSection
│   └── ProjectCard[]
├── MultimediaSection
│   └── MediaCard[]
├── ConsultingSection
└── ContactSection
    └── ContactForm
```

### 3. **State Management**

#### **Local State (useState)**
- Component-specific animations
- Form inputs and validation
- UI interactions (modals, dropdowns)

#### **Global State (Context/Zustand)**
- Scroll progress
- Active section tracking
- Theme preferences
- 3D scene state

#### **Custom Hooks**
- `useScrollProgress` - Track scroll position
- `useIntersection` - Section visibility detection
- `useWindowSize` - Responsive behavior
- `use3DEffects` - Three.js animations

### 4. **Styling Architecture**

#### **Tailwind CSS Strategy**
```css
/* Design Tokens in tailwind.config.js */
colors: {
  neon: {
    orange: '#FF6B35',
    yellow: '#FFD23F',
    cyan: '#00F5FF',
  },
  cyber: {
    navy: '#0A0B1E',
    blue: '#1A1B3A',
  }
}

/* Component Classes */
.btn-neon → Neon button style
.text-glow → Glowing text effect
.card-cyber → Cyberpunk card design
```

#### **CSS Organization**
- **Global styles** in `globals.css`
- **Component styles** via Tailwind classes
- **Custom animations** in CSS modules
- **3D effects** via Three.js materials

### 5. **Animation System**

#### **Framer Motion Hierarchy**
```
Page Container (layoutId)
├── Section Animations (viewport triggers)
├── Component Animations (hover, click)
└── Text Animations (typewriter, glow)
```

#### **Animation Triggers**
- **Scroll-based** - Elements animate as they enter viewport
- **Interaction-based** - Hover, click, focus effects
- **Time-based** - Continuous 3D animations
- **Loading-based** - Page entrance animations

### 6. **3D Graphics Pipeline**

#### **Three.js Integration**
```
React Three Fiber
├── Canvas (WebGL Context)
├── Scene (3D World)
├── Camera (Perspective)
├── Lights (Ambient + Point)
├── Models (Logo, Particles)
└── Controls (Mouse interaction)
```

#### **Performance Optimization**
- **LOD (Level of Detail)** for complex models
- **Frustum culling** for off-screen objects
- **Texture optimization** and compression
- **Frame rate limiting** for mobile devices

### 7. **Data Flow**

#### **Content Structure**
```typescript
interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: 'app' | 'multimedia' | 'consulting';
  image: string;
  url?: string;
  technologies: string[];
  status: 'completed' | 'in-progress' | 'coming-soon';
}
```

#### **Section Data**
```typescript
interface SectionConfig {
  id: string;
  title: string;
  subtitle?: string;
  background: 'gradient' | 'video' | '3d';
  animation: AnimationConfig;
  content: React.ComponentType;
}
```

### 8. **Performance Strategy**

#### **Loading Optimization**
- **Critical CSS** inlined in head
- **Progressive image loading** with blur placeholders
- **3D asset streaming** for large models
- **Code splitting** by section

#### **Runtime Optimization**
- **Virtual scrolling** for large lists
- **Intersection observers** for lazy loading
- **RequestAnimationFrame** for smooth animations
- **Web Workers** for heavy computations

### 9. **SEO & Accessibility**

#### **Meta Tags & Structured Data**
```typescript
export const metadata = {
  title: 'Sunrise Gen AI - Future of AI Technology',
  description: 'Cutting-edge AI mobile apps, multimedia, and consulting',
  openGraph: { /* Social sharing */ },
  jsonLd: { /* Structured data */ }
}
```

#### **Accessibility Features**
- **ARIA labels** for screen readers
- **Keyboard navigation** for all interactions
- **Reduced motion** preferences
- **Color contrast** compliance (WCAG 2.1)

### 10. **Build & Deployment**

#### **Build Process**
```bash
Next.js Build Pipeline
├── TypeScript compilation
├── CSS optimization (Tailwind purge)
├── Image optimization (next/image)
├── Bundle analysis
└── Static generation
```

#### **Deployment Strategy**
- **Vercel** for automatic deployments
- **CDN optimization** for global performance
- **Environment variables** for configuration
- **Preview deployments** for testing

## 🔧 Configuration Files

### **next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['example.com'],
  },
  webpack: (config) => {
    // Three.js optimizations
    config.externals.push({
      'three': 'THREE'
    });
    return config;
  },
}
```

### **tailwind.config.js**
```javascript
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: { /* Custom color palette */ },
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
```

This architecture ensures a scalable, maintainable, and high-performance website that showcases cutting-edge AI capabilities while remaining accessible and SEO-friendly. 