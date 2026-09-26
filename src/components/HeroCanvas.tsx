'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  start: boolean
  reduced: boolean
}

export default function HeroCanvas({ start: _start, reduced }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (reduced) return
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => setFailed(true))
  }, [reduced])

  if (reduced || failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/media/sunrise-causeway-poster.jpg" alt="" aria-hidden="true" className="hero-fallback" />
    )
  }

  return (
    <video
      ref={videoRef}
      className="hero-canvas hero-video"
      src="/media/sunrise-causeway.mp4"
      poster="/media/sunrise-causeway-poster.jpg"
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      aria-hidden="true"
    />
  )
}
