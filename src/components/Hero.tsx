import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './Hero.css'

/* ── Typewriter config ─────────────────────────── */
const ROLES = ['Full-Stack Developer', 'AI API Integrator', 'CS Student @ KJ Somaiya']
const TYPE_SPEED = 60   // ms per character
const DELETE_SPEED = 35   // ms per character
const PAUSE_AFTER = 2000 // ms to hold full word

/* ── Particle canvas ───────────────────────────── */
interface Particle {
  x: number; y: number
  vx: number; vy: number
  r: number; alpha: number
}

function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const spawn = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.35 + 0.05,
    })

    const init = () => {
      resize()
      const count = Math.floor((canvas.width * canvas.height) / 9000)
      particles = Array.from({ length: count }, spawn)
    }

    const CONNECT_DIST = 120
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      /* update */
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      })

      /* dots */
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(226,201,126,${p.alpha})`
        ctx.fill()
      })

      /* connections */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            const opacity = (1 - dist / CONNECT_DIST) * 0.08
            ctx.beginPath()
            ctx.strokeStyle = `rgba(226,201,126,${opacity})`
            ctx.lineWidth = 0.6
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    init()
    draw()

    const ro = new ResizeObserver(init)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [canvasRef])
}

/* ── Typewriter hook ───────────────────────────── */
function useTypewriter(words: string[], startDelay: number = 0) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [started, setStarted] = useState(startDelay === 0)

  useEffect(() => {
    if (!started) {
      const startTimeout = setTimeout(() => setStarted(true), startDelay)
      return () => clearTimeout(startTimeout)
    }

    const current = words[wordIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && display === current) {
      timeout = setTimeout(() => setDeleting(true), PAUSE_AFTER)
    } else if (deleting && display === '') {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    } else {
      timeout = setTimeout(() => {
        setDisplay(prev =>
          deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        )
      }, deleting ? DELETE_SPEED : TYPE_SPEED)
    }

    return () => clearTimeout(timeout)
  }, [display, deleting, wordIdx, words])

  return display
}

/* ── Component ─────────────────────────────────── */
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useParticleCanvas(canvasRef)
  const typedRole = useTypewriter(ROLES, 800) // start after 0.8s

  useGSAP(() => {
    // "Available for internships" badge: fade in from top, 0.3s delay
    gsap.from('.hero__badge', {
      y: -30,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: 'power3.out'
    })

    // "Abhiraj" first name: slide in from left, scale from 0.9 to 1, 0.5s
    gsap.from('.hero__first-name', {
      x: -50,
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      ease: 'power3.out'
    })

    // "Kochale" last name: slide in from right, scale from 0.9 to 1, 0.6s delay
    gsap.from('.hero__name-gold', {
      x: 50,
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      delay: 0.6,
      ease: 'power3.out'
    })

    // Description, buttons, socials, scroll: fade up, 1s delay
    gsap.from('.hero__fade-up', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: 1,
      stagger: 0.15,
      ease: 'power3.out'
    })

    // Fade out scroll indicator on scroll
    gsap.to('.hero__scroll', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom center',
        scrub: true
      },
      opacity: 0,
      y: 30
    })
  }, { scope: containerRef })

  return (
    <section id="hero" className="hero" ref={containerRef}>
      {/* Particle canvas */}
      <canvas className="hero__canvas" ref={canvasRef} aria-hidden="true" />

      {/* Ambient glow orbs */}
      <div className="hero__glow hero__glow--1" aria-hidden="true" />
      <div className="hero__glow hero__glow--2" aria-hidden="true" />

      <div className="container hero__content">

        {/* Availability badge */}
        <div className="hero__badge anim-1">
          <span className="hero__badge-dot" />
          Available for internships &amp; collaborations
        </div>

        {/* Name */}
        <h1 className="hero__name">
          <span className="hero__first-name" style={{ display: 'inline-block' }}>Abhiraj</span><br />
          <span className="hero__name-gold">Kochale</span>
        </h1>

        {/* Typewriter role */}
        <p className="hero__role" aria-live="polite">
          <span className="hero__typed">{typedRole}</span>
          <span className="hero__cursor" aria-hidden="true">|</span>
        </p>

        {/* One-liner */}
        <p className="hero__tagline hero__fade-up">
          I build production-ready web apps and integrate AI into real products.
        </p>

        {/* CTA buttons */}
        <div className="hero__actions hero__fade-up">
          <a
            href="#projects"
            className="hero__btn hero__btn--primary"
            onClick={e => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View Projects
            <ArrowIcon />
          </a>
          <a
            href="https://drive.google.com/file/d/1PBIsSSMcjQMXKFpYdFMTgW8a4ABVlHz8/view?usp=drive_open"
            className="hero__btn hero__btn--outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
            <DownloadIcon />
          </a>
        </div>

        {/* Social links */}
        <div className="hero__socials hero__fade-up">
          <a
            href="https://github.com/abhirajkochale"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__social"
            aria-label="GitHub"
          >
            <GithubIcon />
            <span>GitHub</span>
          </a>

          <div className="hero__social-divider" aria-hidden="true" />

          <a
            href="https://linkedin.com/in/abhiraj-kochale-543284309"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__social"
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
            <span>LinkedIn</span>
          </a>

          <div className="hero__social-divider" aria-hidden="true" />

          <a
            href="mailto:kochaleabhiraj@gmail.com"
            className="hero__social"
            aria-label="Email"
          >
            <MailIcon />
            <span>Email</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll hero__fade-up" aria-hidden="true">
        <div className="hero__scroll-bar" />
        <span>scroll</span>
      </div>
    </section>
  )
}

/* ── SVG Icons ─────────────────────────────────── */
function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}
function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}
function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
