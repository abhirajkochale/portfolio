import { useEffect, useRef } from 'react'
import './CustomCursor.css'

type CursorState = 'default' | 'hovering' | 'image'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only attach on true pointer devices, not touch
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Real mouse position (for dot — exact)
    let mouseX = -200
    let mouseY = -200

    // Lerp position (for ring — smooth)
    let ringX = -200
    let ringY = -200

    // Track RAF id for cleanup
    let rafId: number

    const LERP_FACTOR = 0.12

    // Lerp helper
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      // Dot follows exactly via direct style update
      dot.style.left = mouseX + 'px'
      dot.style.top  = mouseY + 'px'

      // Ring lerps toward mouse position
      ringX = lerp(ringX, mouseX, LERP_FACTOR)
      ringY = lerp(ringY, mouseY, LERP_FACTOR)
      ring.style.left = ringX + 'px'
      ring.style.top  = ringY + 'px'

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    // Track mouse
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.classList.remove('is-hidden')
      ring.classList.remove('is-hidden')
    }

    // Hide when cursor leaves window
    const onMouseLeave = () => {
      dot.classList.add('is-hidden')
      ring.classList.add('is-hidden')
    }

    const onMouseEnter = () => {
      dot.classList.remove('is-hidden')
      ring.classList.remove('is-hidden')
    }

    // Determine hover state
    const getState = (el: Element): CursorState => {
      if (el.closest('img, .proj-featured__right')) return 'image'
      if (el.closest('a, button, [role="button"], .proj-mini, .cert-card')) return 'hovering'
      return 'default'
    }

    const applyState = (state: CursorState) => {
      ring.classList.remove('is-hovering', 'is-image')
      if (state === 'hovering') ring.classList.add('is-hovering')
      if (state === 'image')    ring.classList.add('is-image')
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element
      applyState(getState(target))
    }

    const onMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null
      if (!related) {
        applyState('default')
        return
      }
      applyState(getState(related))
    }

    document.addEventListener('mousemove',  onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseover',  onMouseOver)
    document.addEventListener('mouseout',   onMouseOut)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove',  onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseover',  onMouseOver)
      document.removeEventListener('mouseout',   onMouseOut)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot  is-hidden" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring is-hidden" aria-hidden="true">
        <span className="cursor-ring__label">VIEW</span>
      </div>
    </>
  )
}
