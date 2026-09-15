'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useReducedMotion } from '@/lib/motion'
import manifest from '@/lib/heroScrubManifest.json'

type Chapter = {
  index: string
  title: string
  kicker: string
  body: string
  points: string[]
  href?: { label: string; url: string }
}

const CHAPTERS: Chapter[] = [
  {
    index: '01',
    title: 'What we do',
    kicker: 'Agents, retrieval, and data platforms in production.',
    body:
      'We build the systems that let enterprises run GenAI as infrastructure — not a demo. Every offer ships with an evaluation gate and a person on the last step.',
    points: [
      'Autonomous agents',
      'Agents and multi-agent systems',
      'RAG and LLM architecture',
      'Data processing with AI',
      'Platforms and delivery',
    ],
  },
  {
    index: '02',
    title: 'OpenStinger',
    kicker: 'Portable MCP agent memory.',
    body:
      'Agents forget the moment the session closes, and every tool keeps its own private notebook. OpenStinger gives them one memory that travels — written once, recalled from any MCP client you use tomorrow.',
    points: ['One memory across MCP clients', 'Written once, recalled anywhere', 'Outlives the session and the tool'],
  },
  {
    index: '03',
    title: 'Ingre',
    kicker: 'Scan food and beauty labels. See harmful ingredients.',
    body:
      'Point a phone at a label and get a plain reading of what is in it — the ingredients worth a second look, surfaced in seconds.',
    points: ['Food and beauty labels', 'Android and iOS'],
    href: { label: 'ingre.ai', url: 'https://ingre.ai' },
  },
  {
    index: '04',
    title: 'Media',
    kicker: 'Content generation, held to a brand voice.',
    body:
      'Image, text, and video models producing marketing materials, campaigns, and web content — every variant written to a brief and kept on-brand.',
    points: ['Marketing materials', 'Campaigns', 'Web content'],
  },
  {
    index: '05',
    title: 'Contact',
    kicker: 'Tell us what has to run.',
    body: 'Sunrise Gen AI LLC · Florida, United States. Start with the form and we will come back with a scoped plan.',
    points: ['Florida, United States', 'Form'],
    href: { label: 'Open the form', url: '/#contact' },
  },
]

function frameSrc(i: number) {
  const n = String(i + 1).padStart(manifest.pad, '0')
  return `${manifest.base}/${manifest.pattern.replace('{index}', n)}`
}

/** Draw `img` cover-fit into the canvas, matching CSS object-fit: cover. */
function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight)
  const dw = img.naturalWidth * scale
  const dh = img.naturalHeight * scale
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
}

export default function HeroScrub() {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<(HTMLImageElement | null)[]>([])
  const currentRef = useRef(-1)
  const [loaded, setLoaded] = useState(0)
  const [frameLabel, setFrameLabel] = useState(1)

  const count = manifest.count

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let w = 0
    let h = 0
    let dpr = 1

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      currentRef.current = -1
      render(lastTarget)
    }

    // Nearest decoded frame so the plate never blanks while later frames stream in.
    const nearestLoaded = (i: number) => {
      const frames = framesRef.current
      if (frames[i]) return i
      for (let d = 1; d < count; d++) {
        if (frames[i - d]) return i - d
        if (frames[i + d]) return i + d
      }
      return -1
    }

    let lastTarget = 0
    const render = (target: number) => {
      lastTarget = target
      const i = nearestLoaded(target)
      if (i < 0 || i === currentRef.current) return
      const img = framesRef.current[i]
      if (!img) return
      currentRef.current = i
      ctx.fillStyle = '#00040d'
      ctx.fillRect(0, 0, w, h)
      drawCover(ctx, img, w, h)
      setFrameLabel(i + 1)
    }

    // Load the first frame immediately, then the rest in scroll order.
    let cancelled = false
    let done = 0
    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image()
        img.decoding = 'async'
        img.onload = () => {
          if (cancelled) return resolve()
          framesRef.current[i] = img
          done += 1
          setLoaded(done)
          if (i === lastTarget || currentRef.current < 0) render(lastTarget)
          resolve()
        }
        img.onerror = () => resolve()
        img.src = frameSrc(i)
      })

    framesRef.current = new Array(count).fill(null)
    load(0).then(async () => {
      // Four parallel lanes keeps the request queue shallow on HTTP/1.1 hosts like Pages.
      let next = 1
      const lane = async () => {
        while (!cancelled && next < count) {
          const i = next++
          await load(i)
        }
      }
      await Promise.all([lane(), lane(), lane(), lane()])
    })

    resize()
    window.addEventListener('resize', resize)

    const root = rootRef.current
    let trigger: ScrollTrigger | undefined
    if (root && !reduced) {
      trigger = ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const target = Math.min(count - 1, Math.max(0, Math.round(self.progress * (count - 1))))
          render(target)
        },
      })
    } else if (reduced) {
      render(Math.floor(count / 2))
    }

    return () => {
      cancelled = true
      window.removeEventListener('resize', resize)
      trigger?.kill()
    }
  }, [count, reduced])

  useEffect(() => {
    const root = rootRef.current
    if (!root || reduced) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.scrub-chapter').forEach((el) => {
        gsap.from(el.querySelectorAll('.scrub-rise'), {
          y: 28,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: 'top 70%', once: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  const pct = count ? Math.round((loaded / count) * 100) : 0

  return (
    <section className="scrub" ref={rootRef} data-frames={count}>
      <div className="scrub-stage">
        <canvas ref={canvasRef} className="scrub-canvas" aria-hidden />
        <div className="scrub-scrim" />
        <div className="scrub-hud mono" aria-hidden>
          <span>Rann Mahal · scroll-scrub</span>
          <span className="tabular">
            frame {String(frameLabel).padStart(3, '0')} / {String(count).padStart(3, '0')}
          </span>
          <span className="tabular">{pct < 100 ? `loading ${pct}%` : 'ready'}</span>
        </div>
      </div>

      <div className="scrub-flow">
        <div className="scrub-chapter scrub-fold" data-side="left">
          <div className="scrub-card">
            <div className="scrub-eyebrow mono scrub-rise">
              <i />
              <span>Sunrise Gen AI</span>
            </div>
            <h1 className="scrub-title display">
              <span className="scrub-rise">Enterprise GenAI,</span>
              <span className="scrub-rise">
                built to <em>run.</em>
              </span>
            </h1>
            <p className="scrub-tagline lede scrub-rise">Agents, retrieval, and data platforms in production.</p>
            <span className="scrub-scroll mono scrub-rise">
              <i />
              Scroll
            </span>
          </div>
        </div>

        {CHAPTERS.map((c, i) => (
          <article key={c.index} className="scrub-chapter" data-side={i % 2 === 0 ? 'right' : 'left'}>
            <div className="scrub-card">
              <div className="scrub-index mono scrub-rise">
                <span>{c.index}</span>
                <i />
                <span>{c.title}</span>
              </div>
              <h2 className="scrub-h2 scrub-rise">{c.kicker}</h2>
              <p className="scrub-body body scrub-rise">{c.body}</p>
              <ul className="scrub-points scrub-rise">
                {c.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {c.href && (
                <a
                  className="scrub-link mono scrub-rise"
                  href={c.href.url}
                  target={c.href.url.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.url.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {c.href.label} <span aria-hidden>→</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
