import { useEffect, useRef } from 'react'

// Ported from the owner's 21st.dev "grid-pulse" component, fixed to the dark ground.

/** Hue at the top of the field and how far it turns by the bottom: yellow,
 *  through orange, red, magenta and blue, to green. */
const HUE_TOP = 60
const HUE_SPAN = 270
/** Each cell takes one of these lightnesses, so a sweep reads as a field of tints. */
const TINTS = [72, 65, 58, 51, 44]
/** How faint a cell goes right behind a line of text. */
const FAINT = 0.13
/** How many cells it takes to come back up to full strength. */
const FADE = 2.2
/** Clearing kept around each line of text, in px. */
const PAD = 5
const FADE_IN = 160
const FADE_OUT = 750

type Cell = {
  col: number
  row: number
  colour: string
  /** How much of its colour the cell is allowed, 0 to 1. */
  dim: number
  born: number
  /** When it starts to fade out. */
  until: number
}

const easeOut = (t: number) => 1 - (1 - t) ** 2
const easeIn = (t: number) => t * t

/**
 * A fine grid that takes colour where the pointer passes and lets it go a moment later,
 * with a few cells lighting on their own. Decoration only: hidden from assistive tech,
 * transparent to the pointer, drawn on one canvas that sleeps whenever nothing is lit,
 * paused off screen, and still for readers who ask for reduced motion.
 */
export function GridPulse({
  cell = 24,
  reach = 2.6,
  ambient = 2,
  maxLit = 180,
  avoid = '[data-grid-avoid]',
}: {
  /** Cell size in px. Must match the hairlines' background-size in CSS. */
  cell?: number
  /** How far from the pointer a cell can still catch light, in cells. */
  reach?: number
  /** How many cells light on their own each beat. */
  ambient?: number
  /** A lid, so a fast sweep cannot light the whole field at once. */
  maxLit?: number
  /** Elements whose lines of text the light holds back from, looked up inside the grid's parent. */
  avoid?: string
}) {
  const box = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = box.current
    const paper = canvas.current
    const ctx = paper?.getContext('2d')
    if (!el || !paper || !ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cols = 1
    let rows = 1
    let width = 0
    let height = 0
    let clear: DOMRect[] = []
    const cells = new Map<string, Cell>()

    // Protect the lines of text, not the boxes that hold them.
    const measureText = () => {
      const bounds = el.getBoundingClientRect()
      const scope = el.parentElement ?? document
      clear = [...scope.querySelectorAll(avoid)].flatMap((node) => {
        const range = document.createRange()
        range.selectNodeContents(node)
        const lines = [...range.getClientRects()].filter((r) => r.width > 0 && r.height > 0)
        const boxes = lines.length > 0 ? lines : [node.getBoundingClientRect()]
        return boxes.map(
          (r) => new DOMRect(r.left - bounds.left - PAD, r.top - bounds.top - PAD, r.width + PAD * 2, r.height + PAD * 2),
        )
      })
    }

    // One loop draws every cell; it runs only while something is lit.
    let frame = 0
    const draw = (now: number) => {
      frame = 0
      ctx.clearRect(0, 0, width, height)
      for (const [key, c] of cells) {
        let alpha: number
        if (now < c.until) {
          alpha = easeOut(Math.min(1, (now - c.born) / FADE_IN))
        } else {
          const t = (now - c.until) / FADE_OUT
          if (t >= 1) {
            cells.delete(key)
            continue
          }
          alpha = 1 - easeIn(t)
        }
        ctx.globalAlpha = alpha * c.dim
        ctx.fillStyle = c.colour
        // Inset by the hairline, so the grid still shows between lit cells.
        ctx.fillRect(c.col * cell + 1, c.row * cell + 1, cell - 1, cell - 1)
      }
      ctx.globalAlpha = 1
      if (cells.size > 0) frame = requestAnimationFrame(draw)
    }
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw)
    }

    const measure = () => {
      width = el.clientWidth
      height = el.clientHeight
      cols = Math.max(1, Math.ceil(width / cell))
      rows = Math.max(1, Math.ceil(height / cell))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      paper.width = Math.round(width * dpr)
      paper.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      measureText()
      wake()
    }

    /** Cells behind the words go faint rather than dark: a dip in brightness reads as depth. */
    const brightness = (col: number, row: number) => {
      const x = col * cell + cell / 2
      const y = row * cell + cell / 2
      let nearest = Number.POSITIVE_INFINITY
      for (const r of clear) {
        const dx = Math.max(r.left - x, 0, x - r.right)
        const dy = Math.max(r.top - y, 0, y - r.bottom)
        nearest = Math.min(nearest, Math.hypot(dx, dy))
        if (nearest === 0) break
      }
      if (nearest === Number.POSITIVE_INFINITY) return 1
      return FAINT + (1 - FAINT) * Math.min(1, nearest / (FADE * cell))
    }

    const ink = (row: number) => {
      const t = rows > 1 ? Math.min(1, row / (rows - 1)) : 0
      const hue = (((HUE_TOP - t * HUE_SPAN) % 360) + 360) % 360
      const tint = TINTS[Math.floor(Math.random() * TINTS.length)]
      return `hsl(${Math.round(hue)} 94% ${tint}%)`
    }

    /** Lights one cell, unless it is off the grid or already lit. */
    const light = (col: number, row: number, hold: number) => {
      if (col < 0 || row < 0 || col >= cols || row >= rows) return
      if (cells.size >= maxLit) return
      const key = `${col},${row}`
      const now = performance.now()
      const lit = cells.get(key)
      if (lit && now < lit.until) return
      // A cell caught again while fading picks up from where it had got to.
      let born = now
      if (lit) {
        const faded = 1 - easeIn(Math.min(1, (now - lit.until) / FADE_OUT))
        born = now - (1 - Math.sqrt(1 - faded)) * FADE_IN
      }
      cells.set(key, { col, row, colour: lit?.colour ?? ink(row), dim: brightness(col, row), born, until: now + hold })
      wake()
    }

    // The pointer paints. Cells further from it catch light less often, so the trail's edge breaks up.
    let pending = 0
    let at: { x: number; y: number } | null = null
    const paint = () => {
      pending = 0
      if (!at) return
      const cx = Math.floor(at.x / cell)
      const cy = Math.floor(at.y / cell)
      const span = Math.ceil(reach)
      for (let dy = -span; dy <= span; dy++) {
        for (let dx = -span; dx <= span; dx++) {
          const away = Math.hypot(dx, dy)
          if (away > reach) continue
          if (Math.random() > 1 - away / (reach + 0.6)) continue
          light(cx + dx, cy + dy, 260 + Math.random() * 900)
        }
      }
    }
    // Listened for on the window, because the grid sits under the content.
    const onMove = (event: PointerEvent) => {
      const bounds = el.getBoundingClientRect()
      at = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
      if (!pending) pending = requestAnimationFrame(paint)
    }

    // A few cells light on their own, so the grid is alive with no pointer. Paused out of sight.
    let visible = true
    let beat = 0
    const drift = () => {
      beat = window.setTimeout(drift, 1400 + Math.random() * 1800)
      if (!visible || document.hidden) return
      for (let i = 0; i < ambient; i++) {
        light(Math.floor(Math.random() * cols), Math.floor(Math.random() * rows), 900 + Math.random() * 1600)
      }
    }
    beat = window.setTimeout(drift, 500)

    const sight = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true
    })
    sight.observe(el)
    const resize = new ResizeObserver(measure)
    resize.observe(el)
    measure()
    // Lines of text move once the web fonts arrive.
    document.fonts?.ready.then(measureText).catch(() => {})
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      sight.disconnect()
      resize.disconnect()
      cancelAnimationFrame(frame)
      cancelAnimationFrame(pending)
      clearTimeout(beat)
      window.removeEventListener('pointermove', onMove)
    }
  }, [cell, reach, ambient, maxLit, avoid])

  return (
    <div ref={box} className="pulse" aria-hidden="true" style={{ backgroundSize: `${cell}px ${cell}px` }}>
      <canvas ref={canvas} />
    </div>
  )
}
