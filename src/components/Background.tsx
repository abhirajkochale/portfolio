import { useEffect, useRef } from 'react'
import './Background.css'

/* ── Star Field Canvas ── */
interface Star {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  alpha: number
  dAlpha: number
  maxAlpha: number
}

function useStarField(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number
    let stars: Star[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const spawnStar = (): Star => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      alpha: Math.random() * 0.5,
      dAlpha: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      maxAlpha: Math.random() * 0.3 + 0.3, // 0.3 to 0.6 max
    })

    const init = () => {
      resize()
      stars = Array.from({ length: 120 }, spawnStar)
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach(s => {
        // Position update
        s.x += s.vx
        s.y += s.vy

        // Wrap around
        if (s.x < 0) s.x = canvas.width
        if (s.x > canvas.width) s.x = 0
        if (s.y < 0) s.y = canvas.height
        if (s.y > canvas.height) s.y = 0

        // Pulse alpha
        s.alpha += s.dAlpha
        if (s.alpha > s.maxAlpha) {
          s.alpha = s.maxAlpha
          s.dAlpha *= -1
        } else if (s.alpha < 0.05) {
          s.alpha = 0.05
          s.dAlpha *= -1
        }

        // Draw star
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        const rgb = document.body.classList.contains('light') ? '26, 26, 46' : '255, 255, 255'
        ctx.fillStyle = `rgba(${rgb}, ${s.alpha})`
        ctx.fill()
      })

      rafId = requestAnimationFrame(draw)
    }

    init()
    draw()

    window.addEventListener('resize', init)
    return () => {
      window.removeEventListener('resize', init)
      cancelAnimationFrame(rafId)
    }
  }, [canvasRef])
}

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useStarField(canvasRef)

  return (
    <>
      {/* Container for fixed background elements */}
      <div className="bg-container" aria-hidden="true">
        {/* Animated Gradient Orbs */}
        <div className="bg-orb bg-orb--gold" />
        <div className="bg-orb bg-orb--teal" />

        {/* Star Field Canvas */}
        <canvas className="bg-stars" ref={canvasRef} />
      </div>

      {/* Noise overlay stays completely on top of everything to give the film feel */}
      <div className="bg-noise" aria-hidden="true" />
    </>
  )
}
