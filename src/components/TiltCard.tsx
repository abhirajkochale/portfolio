import { useRef, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useRelativeMouse } from '../hooks/useRelativeMouse'
import './TiltCard.css'

interface TiltCardProps {
  children: ReactNode
  className?: string
  tooltipTitle: string
  tooltipGradient: string
}

export default function TiltCard({
  children,
  className = '',
  tooltipTitle,
  tooltipGradient,
}: TiltCardProps) {
  const cardRef    = useRef<HTMLDivElement>(null)
  const glareRef   = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const { x, y, isActive } = useRelativeMouse(cardRef)
  const MAX_TILT = 8

  // Physics update loop reacting to mouse state
  useEffect(() => {
    const card = cardRef.current
    const glare = glareRef.current
    const tooltip = tooltipRef.current
    if (!card || !glare || !tooltip) return

    if (!isActive) {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
      return
    }

    const rect = card.getBoundingClientRect()
    const cx   = rect.width  / 2
    const cy   = rect.height / 2

    // Normalised -1 → +1 within the card using relative X/Y
    const nx = (x - cx) / cx
    const ny = (y - cy) / cy

    const rotX = -ny * MAX_TILT
    const rotY =  nx * MAX_TILT

    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`

    // Glare: position as percentage within card
    const glareX = (x / rect.width)  * 100
    const glareY = (y / rect.height) * 100
    glare.style.background =
      `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12), transparent 60%)`

    // Tooltip: offset slightly from cursor using relative X/Y
    tooltip.style.left = (x + 16) + 'px'
    tooltip.style.top  = (y - 200) + 'px'
  }, [x, y, isActive])

  return (
    <>
      <div
        ref={cardRef}
        className={`tilt-card ${className}`}
      >
        {/* Glare overlay */}
        <div ref={glareRef} className="tilt-card__glare" aria-hidden="true" />

        {children}
      </div>

      {/* Floating tooltip — positioned relative to the card */}
      <div
        ref={tooltipRef}
        className={`proj-tooltip ${isActive ? 'is-visible' : ''}`}
        aria-hidden="true"
      >
        <div
          className="proj-tooltip__preview"
          style={{ background: tooltipGradient }}
        >
          <span className="proj-tooltip__name">{tooltipTitle}</span>
        </div>
      </div>
    </>
  )
}
