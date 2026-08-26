'use client'

import { useEffect, useRef } from 'react'

const CLIENTS = ['Cursor', 'Claude Code', 'Your agent']
const RECORDS = ['entity · customer_id', 'decision · retry policy', 'thread · incident 4471', 'artifact · schema map', 'fact · on-call rota', 'entity · service graph']

type Packet = { client: number; row: number; dir: 1 | -1; t: number }

const LABEL_FAMILY = "'Source Serif 4', Georgia, serif"
const labelFont = (size: number) => `600 ${size}px ${LABEL_FAMILY}`

const SUN = '#d9661c'
const HOT = '#fac345'
const TEAL = '#06b6c3'

export default function MemoryCanvas({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let raf = 0
    let running = !reduced
    const packets: Packet[] = []
    const rowHeat = new Array(RECORDS.length).fill(0)
    let last = performance.now()
    let spawnAt = 0.35

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const metrics = () => {
      const pad = 12
      const chipW = Math.min(112, Math.max(72, width * 0.28))
      const coreX = pad + chipW + Math.max(22, width * 0.06)
      return { pad, chipW, coreX, fs: width < 420 ? 8 : 9.5 }
    }
    const clientPos = (i: number) => {
      const { pad, chipW } = metrics()
      return { x: pad + chipW, y: height * (0.26 + i * 0.24) }
    }
    const coreBox = () => {
      const { pad, coreX } = metrics()
      return { x: coreX, y: height * 0.12, w: width - coreX - pad, h: height * 0.7 }
    }
    const rowPos = (i: number) => {
      const box = coreBox()
      const pad = 10
      const rowH = (box.h - pad * 2) / RECORDS.length
      return { x: box.x + pad, y: box.y + pad + rowH * i, w: box.w - pad * 2, h: rowH - 4 }
    }
    const fit = (text: string, max: number) => {
      if (ctx.measureText(text).width <= max) return text
      let t = text
      while (t.length > 1 && ctx.measureText(t + '…').width > max) t = t.slice(0, -1)
      return t + '…'
    }

    const bezier = (t: number, a: { x: number; y: number }, c: { x: number; y: number }, b: { x: number; y: number }) => {
      const mt = 1 - t
      return {
        x: mt * mt * a.x + 2 * mt * t * c.x + t * t * b.x,
        y: mt * mt * a.y + 2 * mt * t * c.y + t * t * b.y,
      }
    }

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      ctx.clearRect(0, 0, width, height)

      // background hairline grid
      ctx.strokeStyle = 'rgba(238,234,226,0.05)'
      ctx.lineWidth = 1
      const step = 26
      ctx.beginPath()
      for (let x = step; x < width; x += step) {
        ctx.moveTo(Math.round(x) + 0.5, 0)
        ctx.lineTo(Math.round(x) + 0.5, height)
      }
      for (let y = step; y < height; y += step) {
        ctx.moveTo(0, Math.round(y) + 0.5)
        ctx.lineTo(width, Math.round(y) + 0.5)
      }
      ctx.stroke()

      const box = coreBox()

      // wires
      CLIENTS.forEach((_, i) => {
        const a = clientPos(i)
        const b = { x: box.x, y: box.y + box.h * (0.25 + i * 0.25) }
        const c = { x: (a.x + b.x) / 2 + 18, y: a.y }
        ctx.strokeStyle = 'rgba(238,234,226,0.16)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.quadraticCurveTo(c.x, c.y, b.x, b.y)
        ctx.stroke()
      })

      // client chips
      const m = metrics()
      ctx.font = labelFont(m.fs)
      ctx.textBaseline = 'middle'
      CLIENTS.forEach((name, i) => {
        const p = clientPos(i)
        ctx.strokeStyle = 'rgba(238,234,226,0.22)'
        ctx.fillStyle = 'rgba(0,6,18,0.85)'
        ctx.beginPath()
        ctx.rect(m.pad, p.y - 11, m.chipW, 22)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = 'rgba(238,234,226,0.72)'
        ctx.fillText(fit(name, m.chipW - 22), m.pad + 9, p.y + 0.5)
        ctx.fillStyle = TEAL
        ctx.fillRect(p.x - 6, p.y - 1.5, 3, 3)
      })

      // core
      ctx.strokeStyle = 'rgba(250,195,69,0.35)'
      ctx.fillStyle = 'rgba(217,102,28,0.05)'
      ctx.beginPath()
      ctx.rect(box.x, box.y, box.w, box.h)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = 'rgba(250,195,69,0.85)'
      ctx.font = labelFont(m.fs - 0.5)
      ctx.fillText('OPENSTINGER · MEMORY', box.x, box.y - 10)

      // memory rows
      RECORDS.forEach((label, i) => {
        const r = rowPos(i)
        const heat = rowHeat[i]
        ctx.strokeStyle = `rgba(238,234,226,${0.1 + heat * 0.45})`
        ctx.fillStyle = `rgba(250,195,69,${heat * 0.16})`
        ctx.beginPath()
        ctx.rect(r.x, r.y, r.w, r.h)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = `rgba(238,234,226,${0.4 + heat * 0.5})`
        ctx.font = labelFont(m.fs - 0.5)
        ctx.fillText(fit(label, r.w - 20), r.x + 8, r.y + r.h / 2)
        ctx.fillStyle = heat > 0.05 ? HOT : 'rgba(238,234,226,0.25)'
        ctx.fillRect(r.x + r.w - 8, r.y + r.h / 2 - 1.5, 3, 3)
        rowHeat[i] = Math.max(0, heat - dt * 0.55)
      })

      // packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i]
        p.t += dt * 0.55
        const a = clientPos(p.client)
        const r = rowPos(p.row)
        const b = { x: box.x, y: r.y + r.h / 2 }
        const c = { x: (a.x + b.x) / 2 + 18, y: a.y }
        const t = p.dir === 1 ? p.t : 1 - p.t
        const pos = bezier(Math.max(0, Math.min(1, t)), a, c, b)
        ctx.fillStyle = p.dir === 1 ? SUN : TEAL
        ctx.fillRect(pos.x - 2.5, pos.y - 2.5, 5, 5)
        ctx.strokeStyle = p.dir === 1 ? 'rgba(217,102,28,0.35)' : 'rgba(6,182,195,0.35)'
        ctx.beginPath()
        ctx.rect(pos.x - 5.5, pos.y - 5.5, 11, 11)
        ctx.stroke()
        if (p.t >= 1) {
          rowHeat[p.row] = 1
          packets.splice(i, 1)
        }
      }

      spawnAt -= dt
      if (spawnAt <= 0 && packets.length < 4) {
        spawnAt = 0.75 + Math.random() * 0.7
        packets.push({
          client: Math.floor(Math.random() * CLIENTS.length),
          row: Math.floor(Math.random() * RECORDS.length),
          dir: Math.random() > 0.45 ? 1 : -1,
          t: 0,
        })
      }

      // legend
      const ly = height * 0.94
      ctx.font = labelFont(m.fs - 0.5)
      ctx.fillStyle = SUN
      ctx.fillRect(m.pad, ly - 2, 8, 3)
      ctx.fillStyle = 'rgba(238,234,226,0.34)'
      ctx.fillText('write', m.pad + 14, ly)
      ctx.fillStyle = TEAL
      ctx.fillRect(m.pad + 60, ly - 2, 8, 3)
      ctx.fillStyle = 'rgba(238,234,226,0.34)'
      ctx.fillText('recall', m.pad + 74, ly)

      if (running) raf = requestAnimationFrame(draw)
    }

    if (reduced) {
      draw(performance.now())
    } else {
      raf = requestAnimationFrame(draw)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return
        if (entry.isIntersecting && !running) {
          running = true
          last = performance.now()
          raf = requestAnimationFrame(draw)
        } else if (!entry.isIntersecting && running) {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [reduced])

  return <canvas ref={ref} aria-hidden="true" />
}
