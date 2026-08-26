'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

let lenis: Lenis | null = null

export function getLenis() {
  return lenis
}

export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    lenis = instance
    instance.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      instance.destroy()
      lenis = null
    }
  }, [enabled])
}

export function scrollToId(id: string) {
  const el = document.querySelector(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -8, duration: 1.3 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

/** Line-by-line clip reveal for headline blocks. */
export function revealLines(scope: Element, selector: string, trigger?: Element, delay = 0) {
  const nodes = gsap.utils.toArray<HTMLElement>(selector, scope)
  if (!nodes.length) return
  gsap.from(nodes, {
    yPercent: 108,
    duration: 1.15,
    ease: 'expo.out',
    stagger: 0.07,
    delay,
    scrollTrigger: trigger ? { trigger, start: 'top 82%', once: true } : undefined,
  })
}

/** Staggered rise for dense content blocks. */
export function riseIn(scope: Element, selector: string, trigger?: Element, stagger = 0.05) {
  const nodes = gsap.utils.toArray<HTMLElement>(selector, scope)
  if (!nodes.length) return
  gsap.from(nodes, {
    y: 26,
    opacity: 0,
    duration: 0.85,
    ease: 'power3.out',
    stagger,
    scrollTrigger: trigger ? { trigger, start: 'top 82%', once: true } : undefined,
  })
}

export { gsap, ScrollTrigger }
