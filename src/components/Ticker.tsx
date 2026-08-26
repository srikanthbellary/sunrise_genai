'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TICKER } from '@/lib/content'

export default function Ticker({ reduced }: { reduced: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return
    const track = trackRef.current
    if (!track) return
    const group = track.querySelector('.ticker-group') as HTMLElement | null
    if (!group) return

    const tween = gsap.to(track, {
      x: () => -group.offsetWidth,
      duration: 26,
      ease: 'none',
      repeat: -1,
      modifiers: { x: (value: string) => `${parseFloat(value) % group.offsetWidth}px` },
    })

    return () => {
      tween.kill()
    }
  }, [reduced])

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track" ref={trackRef}>
        {[0, 1, 2].map((g) => (
          <div className="ticker-group" key={g}>
            {TICKER.map((t) => (
              <span className="ticker-item" key={`${g}-${t}`}>
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
