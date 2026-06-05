import { useEffect, useRef, useCallback } from 'react'
import './SkillsConstellation.css'

// ── Type Definitions ──────────────────────────────────────────────────

type Category = 'frontend' | 'ml_ai' | 'database' | 'tools'

interface SkillNode {
  label:       string
  category:    Category
  proficiency: string
  // runtime state
  x:   number
  y:   number
  vx:  number
  vy:  number
  r:   number          // base radius
  targetR: number      // animated radius
  hovered: boolean
}

// ── Category Colour Palette (subtle, on cream #F5F1EA) ─────────────

const CATEGORY_COLORS: Record<Category, { fill: string; line: string }> = {
  frontend: { fill: '#7C4B1F', line: '#7C4B1F' },   // warm amber/ochre
  ml_ai:    { fill: '#1A4A7A', line: '#1A4A7A' },   // cool navy
  database: { fill: '#2D5A3D', line: '#2D5A3D' },   // muted forest green
  tools:    { fill: '#5A2D6E', line: '#5A2D6E' },   // dusty plum
}

// Dynamic colors read from DOM variables
// --bg, --text
const BASE_R       = 5
const HOVER_R      = 9
const CONNECT_DIST = 150
const SPEED        = 0.35  // pixels per frame

// ── Skill Data ────────────────────────────────────────────────────────

const SKILLS_DATA: Omit<SkillNode, 'x'|'y'|'vx'|'vy'|'r'|'targetR'|'hovered'>[] = [
  { label: 'React',        category: 'frontend',  proficiency: 'Advanced (2 yrs)' },
  { label: 'TypeScript',   category: 'frontend',  proficiency: 'Advanced (2 yrs)' },
  { label: 'TailwindCSS',  category: 'frontend',  proficiency: 'Proficient'       },
  { label: 'GSAP',         category: 'frontend',  proficiency: 'Proficient'       },
  { label: 'Node.js',      category: 'frontend',  proficiency: 'Intermediate'     },
  { label: 'Python',       category: 'ml_ai',     proficiency: 'Advanced (3 yrs)' },
  { label: 'Scikit-learn', category: 'ml_ai',     proficiency: 'Intermediate'     },
  { label: 'OpenCV',       category: 'ml_ai',     proficiency: 'Intermediate'     },
  { label: 'Gemini API',   category: 'ml_ai',     proficiency: 'Proficient'       },
  { label: 'Supabase',     category: 'database',  proficiency: 'Advanced'         },
  { label: 'PostgreSQL',   category: 'database',  proficiency: 'Intermediate'     },
  { label: 'Git',          category: 'tools',     proficiency: 'Advanced'         },
]

// ── Random helpers ────────────────────────────────────────────────────

const rand = (min: number, max: number) =>
  min + Math.random() * (max - min)

const randVel = () => {
  const speed = SPEED * (0.5 + Math.random())
  const sign  = Math.random() > 0.5 ? 1 : -1
  return speed * sign
}

// ── Component ─────────────────────────────────────────────────────────

export default function SkillsConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef  = useRef<SkillNode[]>([])
  const rafRef    = useRef<number>(0)
  const mouseRef  = useRef<{ x: number; y: number }>({ x: -999, y: -999 })
  const wrapperRef = useRef<HTMLDivElement>(null)
  
  // Theme colors ref for the render loop
  const themeColorsRef = useRef({ bg: '#F5F1EA', hover: '#0C0C0C' })

  // Tooltip state managed via DOM for zero-React-overhead
  const tooltipRef = useRef<HTMLDivElement>(null)

  // ── Initialise nodes ──────────────────────────────────────────────

  const initNodes = useCallback((w: number, h: number) => {
    nodesRef.current = SKILLS_DATA.map(s => ({
      ...s,
      x: rand(60, w - 60),
      y: rand(60, h - 60),
      vx: randVel(),
      vy: randVel(),
      r:  BASE_R,
      targetR: BASE_R,
      hovered: false,
    }))
  }, [])

  // ── Draw one frame ────────────────────────────────────────────────

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const W = canvas.width
    const H = canvas.height

    // Clear
    ctx.fillStyle = themeColorsRef.current.bg
    ctx.fillRect(0, 0, W, H)

    const nodes = nodesRef.current
    const { x: mx, y: my } = mouseRef.current

    // Update hover + move nodes + physics
    let hoveredNode: SkillNode | null = null
    
    // First pass: movement and boundaries
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i]

      // Mouse distance
      const dx = mx - n.x
      const dy = my - n.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      n.hovered  = dist < HOVER_R + 12  // generous hit area
      if (n.hovered) hoveredNode = n

      // Lerp radius
      n.targetR = n.hovered ? HOVER_R : BASE_R
      n.r += (n.targetR - n.r) * 0.18

      // Move
      n.x += n.vx
      n.y += n.vy

      // Explicit bounding box enforcement (clamps safely inside)
      if (n.x - n.r < 0) { 
        n.x = n.r
        n.vx = Math.abs(n.vx) 
      } else if (n.x + n.r > W) { 
        n.x = W - n.r
        n.vx = -Math.abs(n.vx) 
      }
      
      if (n.y - n.r < 0) { 
        n.y = n.r
        n.vy = Math.abs(n.vy) 
      } else if (n.y + n.r > H) { 
        n.y = H - n.r
        n.vy = -Math.abs(n.vy) 
      }

      // Distance-check collision logic against other nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j]
        const cdx = n2.x - n.x
        const cdy = n2.y - n.y
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy)
        const minDist = n.r + n2.r + 15 // 15px clear padding gap
        
        if (cdist < minDist && cdist > 0) {
          // Resolve overlap (push apart)
          const overlap = minDist - cdist
          const angle = Math.atan2(cdy, cdx)
          const moveX = (Math.cos(angle) * overlap) / 2
          const moveY = (Math.sin(angle) * overlap) / 2
          
          n.x -= moveX
          n.y -= moveY
          n2.x += moveX
          n2.y += moveY
          
          // Elastic velocity bounce
          const tempVx = n.vx
          const tempVy = n.vy
          n.vx = n2.vx
          n.vy = n2.vy
          n2.vx = tempVx
          n2.vy = tempVy
        }
      }
    }

    // ── Connection lines ──────────────────────────────────────────
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i]
        const b = nodes[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d > CONNECT_DIST) continue

        const alpha = (1 - d / CONNECT_DIST) * 0.28
        const isActive = a.hovered || b.hovered

        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = themeColorsRef.current.hover
        ctx.globalAlpha = isActive ? alpha * 2.2 : alpha
        ctx.lineWidth   = isActive ? 0.8 : 0.5
        ctx.stroke()
        ctx.globalAlpha = 1 // reset
      }
    }

    // ── Draw nodes ────────────────────────────────────────────────
    const FONT_SIZE = 10
    ctx.font = `${FONT_SIZE}px 'Inter', sans-serif`

    for (const n of nodes) {
      const col = CATEGORY_COLORS[n.category]
      const fillColor = n.hovered ? themeColorsRef.current.hover : col.fill

      // Outer glow ring on hover
      if (n.hovered) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r + 5, 0, Math.PI * 2)
        ctx.strokeStyle = themeColorsRef.current.hover
        ctx.globalAlpha = 0.15
        ctx.lineWidth   = 1.5
        ctx.stroke()
        ctx.globalAlpha = 1 // reset
      }

      // Circle fill
      ctx.beginPath()
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
      ctx.fillStyle = fillColor
      ctx.fill()

      // Label
      ctx.fillStyle  = n.hovered ? themeColorsRef.current.hover : col.fill
      ctx.textAlign  = 'center'
      ctx.textBaseline = 'top'
      ctx.globalAlpha = n.hovered ? 1 : 0.75
      ctx.fillText(n.label, n.x, n.y + n.r + 5)
      ctx.globalAlpha = 1
    }

    // ── Tooltip (DOM, not canvas) ────────────────────────────────
    const tip = tooltipRef.current
    if (tip) {
      if (hoveredNode) {
        const col  = CATEGORY_COLORS[hoveredNode.category]
        tip.style.display   = 'flex'
        tip.style.left      = (hoveredNode.x + 14) + 'px'
        tip.style.top       = (hoveredNode.y - 48) + 'px'
        tip.style.borderColor = col.fill
        tip.querySelector('.sc-tip__label')!.textContent = hoveredNode.label
        tip.querySelector('.sc-tip__level')!.textContent = hoveredNode.proficiency
        tip.querySelector('.sc-tip__dot')!.setAttribute('style', `background:${col.fill}`)
      } else {
        tip.style.display = 'none'
      }
    }

    rafRef.current = requestAnimationFrame(draw)
  }, [])

  // ── Resize handler ────────────────────────────────────────────────

  const resize = useCallback(() => {
    const canvas  = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return
    const W = wrapper.clientWidth
    const H = 400
    canvas.width  = W
    canvas.height = H

    // Only re-init on first run (nodes don't exist yet)
    if (nodesRef.current.length === 0) {
      initNodes(W, H)
    } else {
      // Re-clamp existing nodes within new bounds
      for (const n of nodesRef.current) {
        n.x = Math.min(Math.max(n.x, n.r), W - n.r)
        n.y = Math.min(Math.max(n.y, n.r), H - n.r)
      }
    }
  }, [initNodes])

  // ── Mouse tracking (relative to canvas) ─────────────────────────

  const onMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  const onMouseLeave = useCallback(() => {
    mouseRef.current = { x: -999, y: -999 }
  }, [])

  // ── Lifecycle ────────────────────────────────────────────────────

  useEffect(() => {
    resize()

    const ro = new ResizeObserver(resize)
    if (wrapperRef.current) ro.observe(wrapperRef.current)

    // Theme tracking
    const updateColors = () => {
      const style = getComputedStyle(document.documentElement)
      themeColorsRef.current = {
        bg: style.getPropertyValue('--bg').trim() || '#F5F1EA',
        hover: style.getPropertyValue('--text').trim() || '#0C0C0C'
      }
    }
    updateColors()
    
    const themeObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === 'data-theme') updateColors()
      }
    })
    themeObserver.observe(document.documentElement, { attributes: true })

    const canvas = canvasRef.current!
    canvas.addEventListener('mousemove',  onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      themeObserver.disconnect()
      canvas.removeEventListener('mousemove',  onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [draw, onMouseLeave, onMouseMove, resize])

  return (
    <div className="sc-wrapper" ref={wrapperRef}>
      {/* Category legend */}
      <div className="sc-legend">
        <span className="sc-legend__item sc-legend__item--frontend">Frontend</span>
        <span className="sc-legend__item sc-legend__item--ml">ML / AI</span>
        <span className="sc-legend__item sc-legend__item--db">Database</span>
        <span className="sc-legend__item sc-legend__item--tools">Tools</span>
      </div>

      <canvas ref={canvasRef} className="sc-canvas" />

      {/* Floating tooltip — DOM-rendered for crisp text */}
      <div
        ref={tooltipRef}
        className="sc-tip"
        style={{ display: 'none' }}
        aria-hidden="true"
      >
        <span className="sc-tip__dot" />
        <div>
          <div className="sc-tip__label" />
          <div className="sc-tip__level" />
        </div>
      </div>
    </div>
  )
}
