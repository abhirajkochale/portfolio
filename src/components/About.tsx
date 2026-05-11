import { useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './About.css'

/* ─── Data ───────────────────────────────────────────── */
const SKILLS = [
  { label: 'React', icon: '⚛️' },
  { label: 'TypeScript', icon: '📘' },
  { label: 'Python', icon: '🐍' },
  { label: 'Node.js', icon: '🟢' },
  { label: 'Supabase', icon: '🦋' },
  { label: 'PostgreSQL', icon: '🐘' },
  { label: 'Gemini API', icon: '✨' },
  { label: 'Scikit-learn', icon: '🤖' },
]

const STATS = [
  { label: 'Class', value: 'CE Student' },
  { label: 'School', value: 'KJ Somaiya' },
  { label: 'CGPA', value: '8.70 / 10' },
  { label: 'Status', value: 'Seeking Intern' },
]

/* ─── Parallax Card ──────────────────────────────────── */
interface ParallaxState {
  bgX: number; bgY: number
  midX: number; midY: number
  fgX: number; fgY: number
  glareX: number; glareY: number
  rotX: number; rotY: number
  active: boolean
}

const DEFAULT_STATE: ParallaxState = {
  bgX: 0, bgY: 0,
  midX: 0, midY: 0,
  fgX: 0, fgY: 0,
  glareX: 50, glareY: 50,
  rotX: 0, rotY: 0,
  active: false,
}

/* Speed multipliers — lower = slower (bg) → faster (fg) */
const BG_SPEED = 6
const MID_SPEED = 14
const FG_SPEED = 22
const ROT_MAX = 12   // max tilt degrees

function ParallaxCard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<ParallaxState>(DEFAULT_STATE)
  const rafRef = useRef<number>(0)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    // Normalized -0.5 → 0.5
    const nx = (e.clientX - left) / width - 0.5
    const ny = (e.clientY - top) / height - 0.5

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      setState({
        bgX: nx * BG_SPEED, bgY: ny * BG_SPEED,
        midX: nx * MID_SPEED, midY: ny * MID_SPEED,
        fgX: nx * FG_SPEED, fgY: ny * FG_SPEED,
        glareX: (nx + 0.5) * 100,
        glareY: (ny + 0.5) * 100,
        rotX: -ny * ROT_MAX,
        rotY: nx * ROT_MAX,
        active: true,
      })
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    setState(DEFAULT_STATE)
  }, [])

  const { bgX, bgY, midX, midY, fgX, fgY, glareX, glareY, rotX, rotY, active } = state

  return (
    <div
      className={`parallax-card ${active ? 'parallax-card--active' : ''}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
      }}
      aria-label="Interactive profile parallax card"
    >
      {/* ── Layer 0: Background ── */}
      <div
        className="parallax-layer parallax-layer--bg"
        style={{ transform: `translate(${bgX}px, ${bgY}px) scale(1.12)` }}
      >
        <img src="/parallax-bg.png" alt="" aria-hidden="true" draggable={false} loading="lazy" />
        {/* CSS grid overlay on top of bg image */}
        <div className="parallax-grid-overlay" aria-hidden="true" />
      </div>

      {/* ── Layer 1: Profile Photo (midground) ── */}
      <div
        className="parallax-layer parallax-layer--mid"
        style={{ transform: `translate(${midX}px, ${midY}px)` }}
      >
        {/* Replace /profile.jpg with your actual photo */}
        <div className="parallax-photo-wrap">
          <img
            src="/profile.jpeg"
            alt="Abhiraj Kochale"
            className="parallax-photo"
            loading="lazy"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          {/* Fallback avatar */}
          <div className="parallax-avatar-fallback" aria-hidden="true">

          </div>
        </div>
      </div>

      {/* ── Layer 2: Foreground particles ── */}
      <div
        className="parallax-layer parallax-layer--fg"
        style={{ transform: `translate(${fgX}px, ${fgY}px) scale(1.08)` }}
      >
        <img src="/parallax-fg.png" alt="" aria-hidden="true" draggable={false} loading="lazy" />
      </div>

      {/* ── Glare overlay ── */}
      {active && (
        <div
          className="parallax-glare"
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(226,201,126,0.12) 0%, transparent 65%)`,
          }}
        />
      )}

      {/* ── Floating stat chips ── */}
      <div className="parallax-chip parallax-chip--tl" aria-hidden="true">
        <span className="chip-dot" />CGPA 8.70
      </div>
      <div className="parallax-chip parallax-chip--br" aria-hidden="true">
        <span className="chip-dot chip-dot--green" />Open to work
      </div>
    </div>
  )
}

/* ─── Skill Pill ─────────────────────────────────────── */
function SkillPill({ label, icon }: { label: string; icon: string }) {
  return (
    <span className="skill-pill">
      <span className="skill-pill__icon" aria-hidden="true">{icon}</span>
      {label}
    </span>
  )
}

/* ─── About section ──────────────────────────────────── */
export default function About() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Left: Photo card slides in from left
    gsap.from('.about__visual', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })

    // Right: Info slides in from right simultaneously
    gsap.from('.about__sheet', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      x: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
  }, { scope: containerRef })

  return (
    <section id="about" className="section about" ref={containerRef}>
      <div className="container about__grid">

        {/* ── Left: Parallax card ── */}
        <div className="about__visual">
          <ParallaxCard />
        </div>

        {/* ── Right: Character sheet ── */}
        <div className="about__sheet">

          {/* Section label */}
          <div className="about__section-label">
            <span className="about__label-line" aria-hidden="true" />
            <span>ABOUT</span>
          </div>

          {/* Header row */}
          <div className="about__header">
            <h2 className="about__heading">Character Sheet</h2>
            <div className="about__level-badge">
              <span className="about__level-icon" aria-hidden="true">⚔</span>
              Lv.&nbsp;20
            </div>
          </div>

          {/* Name + badge */}
          <div className="about__name-row">
            <p className="about__name">Abhiraj Kochale</p>
            <span className="about__role-badge">Full-Stack Developer</span>
          </div>

          {/* Stat bars */}
          <div className="about__stats-grid" role="list">
            {STATS.map(s => (
              <div className="about__stat-row" key={s.label} role="listitem">
                <span className="about__stat-label">{s.label}</span>
                <span className="about__stat-value">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Separator */}
          <div className="about__divider" aria-hidden="true" />

          {/* Bio */}
          <p className="about__bio">
            Hi, I'm Abhiraj — a 2nd-year Computer Engineering student at{' '}
            <strong>KJ Somaiya, Mumbai</strong> (CGPA: 8.70). I love building
            things — from full-stack apps to AI-powered tools. I'm a hands-on
            developer who ships real products used by real people.
          </p>

          {/* Skills */}
          <div className="about__skills-section">
            <h3 className="about__skills-heading">
              <span aria-hidden="true">◈</span> Abilities
            </h3>
            <div className="about__skills-grid" role="list">
              {SKILLS.map(s => (
                <SkillPill key={s.label} {...s} />
              ))}
            </div>
          </div>

          {/* Connect row */}
          <div className="about__connect">
            <span className="about__connect-label">Connect</span>
            <div className="about__connect-links">
              <a
                href="https://github.com/abhirajkochale"
                target="_blank"
                rel="noopener noreferrer"
                className="about__connect-link"
                aria-label="GitHub"
              >
                <GithubIcon />
              </a>
              <a
                href="https://linkedin.com/in/abhiraj-kochale-543284309"
                target="_blank"
                rel="noopener noreferrer"
                className="about__connect-link"
                aria-label="LinkedIn"
              >
                <LinkedinIcon />
              </a>
              <a
                href="mailto:kochaleabhiraj@gmail.com"
                className="about__connect-link"
                aria-label="Email"
              >
                <MailIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Icons ──────────────────────────────────────────── */
function GithubIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}
function LinkedinIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
