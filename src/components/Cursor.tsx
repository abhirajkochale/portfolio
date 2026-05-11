import { useEffect, useRef, useState } from 'react'
import './Cursor.css'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  // Track the actual mouse position
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  
  // Track the trailing ring position
  const ringPos  = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

  // Use state only for the visual hover mode so it doesn't run 60fps React updates
  const [hoverMode, setHoverMode] = useState<'default' | 'clickable' | 'text'>('default')
  
  // Track visibility to hide when mouse leaves the window
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only initialize on devices with a fine pointer (mouse/trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) return

    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true)
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY

      // Dot follows exactly, so update it immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    // Event delegation for hover states
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target || !target.closest) return

      const isClickable = target.closest('a, button, input, textarea, .project-card, .legend-btn, .waypoint, summary')

      if (isClickable) {
        setHoverMode('clickable')
      } else {
        setHoverMode('default')
      }
    }

    // Animation loop for the lagging ring
    const render = () => {
      // Lerp formula: current += (target - current) * 0.12
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12

      if (ringRef.current) {
        // We handle the base translation. 
        // Scaling/squishing is handled in CSS via classes that add a secondary transform on an inner element,
        // or we just apply the class to the root and rely on CSS transitions for the scale.
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
      }

      rafId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('mouseenter', onMouseEnter)
    window.addEventListener('mouseover', onMouseOver)

    // Start animation loop
    rafId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('mouseenter', onMouseEnter)
      window.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // If on a touch device, just don't render the custom cursor
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <div className={`cursor-wrapper ${isVisible ? 'is-visible' : ''} mode-${hoverMode}`} aria-hidden="true">
      {/* Exact dot */}
      <div className="cursor-dot" ref={dotRef} />
      
      {/* Trailing ring */}
      <div className="cursor-ring" ref={ringRef}>
        <div className="cursor-ring__inner" />
      </div>
    </div>
  )
}
