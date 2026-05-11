import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './Experience.css'

/* ── Data ──────────────────────────────────────────────── */
interface WP {
  id: number
  cx: number; cy: number
  role: string; company: string
  period: string; location: string
  description: string
  tags: string[]
  icon: string
  cardSide: 'left' | 'right'
}

const VB_W = 1000
const VB_H = 800

const WAYPOINTS: WP[] = [
  {
    id: 0, cx: 240, cy: 110,
    role: 'Machine Learning Intern',
    company: 'Wayspire Ed-Tech Pvt Ltd',
    period: 'June 2025 – Aug 2025', location: 'Remote',
    description: 'Built ML models for text classification and introductory CV tasks using OpenCV and Scikit-learn.',
    tags: ['Python', 'ML', 'OpenCV', 'Scikit-learn'],
    icon: '🧠', cardSide: 'right',
  },
  {
    id: 1, cx: 740, cy: 380,
    role: 'Social Media Manager',
    company: 'Awesome Kids International Preschool',
    period: '2024 – Present', location: 'Mumbai',
    description: 'Grew Instagram engagement by 30%+ through consistent content strategy and creative campaigns.',
    tags: ['Content Strategy', 'Instagram', 'Analytics'],
    icon: '📱', cardSide: 'left',
  },
  {
    id: 2, cx: 290, cy: 650,
    role: 'Marketing Team Member',
    company: 'SMLRA',
    period: 'Oct 2024 – Present', location: 'Mumbai',
    description: 'Supported sponsorship outreach and event marketing for ML workshops and community initiatives.',
    tags: ['Marketing', 'Outreach', 'ML Events'],
    icon: '🎯', cardSide: 'right',
  },
]

const MAP_PATH = `M 240,110 C 280,240 700,240 740,380 C 780,520 330,520 290,650`

/* Percentage helpers from viewBox coords */
const pct = (v: number, max: number) => `${((v / max) * 100).toFixed(2)}%`

/* ── Boat SVG ────────────────────────────────────────────── */
function Boat() {
  return (
    <g transform="translate(-18,-32)">
      {/* Hull */}
      <path d="M4,28 L32,28 L28,36 L8,36 Z" fill="#e2c97e" opacity="0.95" />
      {/* Mast */}
      <line x1="18" y1="6" x2="18" y2="28" stroke="#e2c97e" strokeWidth="1.8" />
      {/* Main sail */}
      <path d="M18,8 L30,25 L18,25 Z" fill="rgba(226,201,126,0.85)" />
      {/* Fore sail */}
      <path d="M18,8 L7,25 L18,25 Z" fill="rgba(226,201,126,0.5)" />
      {/* Flag */}
      <path d="M18,6 L24,10 L18,14 Z" fill="#e2c97e" />
    </g>
  )
}

/* ── Compass Rose ────────────────────────────────────────── */
function CompassRose({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`} opacity={0.18}>
      {['N','E','S','W'].map((d, i) => (
        <text
          key={d}
          x={[0,22,-1,-22][i]} y={[-18,5,26,5][i]}
          textAnchor="middle" dominantBaseline="middle"
          fill="#e2c97e" fontSize="9" fontWeight="700"
          fontFamily="'Syne', sans-serif" letterSpacing="1"
        >{d}</text>
      ))}
      {[0,45,90,135].map(a => (
        <line key={a}
          x1={0} y1={0}
          x2={Math.cos((a-90)*Math.PI/180)*16}
          y2={Math.sin((a-90)*Math.PI/180)*16}
          stroke="#e2c97e" strokeWidth={a%90===0 ? 1.5 : 0.8}
        />
      ))}
      <circle cx={0} cy={0} r={5} fill="none" stroke="#e2c97e" strokeWidth={1} />
      <circle cx={0} cy={0} r={1.5} fill="#e2c97e" />
    </g>
  )
}

/* ── Experience card ─────────────────────────────────────── */
function ExpCard({ wp, active }: { wp: WP; active: boolean }) {
  const xPct = parseFloat(pct(wp.cx, VB_W))
  const yPct = parseFloat(pct(wp.cy, VB_H))

  const posStyle: React.CSSProperties =
    wp.cardSide === 'right'
      ? { left: `calc(${xPct}% + 52px)`, top: `calc(${yPct}% - 60px)` }
      : { right: `calc(${100 - xPct}% + 52px)`, top: `calc(${yPct}% - 60px)` }

  return (
    <div
      className={`exp-card ${active ? 'exp-card--active' : ''}`}
      style={posStyle}
      aria-hidden={!active}
    >
      <div className="exp-card__icon">{wp.icon}</div>
      <div className="exp-card__body">
        <p className="exp-card__role">{wp.role}</p>
        <p className="exp-card__company">{wp.company}</p>
        <div className="exp-card__meta">
          <span>{wp.period}</span>
          <span className="exp-card__dot" />
          <span>{wp.location}</span>
        </div>
        <p className="exp-card__desc">{wp.description}</p>
        <div className="exp-card__tags">
          {wp.tags.map(t => <span key={t} className="exp-card__tag">{t}</span>)}
        </div>
      </div>
    </div>
  )
}

/* ── Main component ──────────────────────────────────────── */
export default function Experience() {
  const [active, setActive] = useState(0)
  const containerRef = useRef<HTMLElement>(null)
  const boat = WAYPOINTS[active]

  useGSAP(() => {
    // The path draws itself as you scroll
    gsap.set('.gsap-map-trace', { strokeDasharray: 2500, strokeDashoffset: 2500 })
    gsap.to('.gsap-map-trace', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom 40%',
        scrub: 1, // Smooth scrubbing
      },
      strokeDashoffset: 0,
      ease: 'none'
    })
  }, { scope: containerRef })

  return (
    <section id="experience" className="section experience" ref={containerRef}>
      <div className="container">
        {/* Header */}
        <div className="experience__header">
          <div className="experience__label">
            <span className="experience__label-line" />
            <span>EXPERIENCE</span>
          </div>
          <h2 className="experience__heading">Experience</h2>
          <p className="experience__subtitle">The journey so far.</p>
        </div>

        {/* Legend */}
        <div className="experience__legend">
          {WAYPOINTS.map(wp => (
            <button
              key={wp.id}
              className={`legend-btn ${active === wp.id ? 'legend-btn--active' : ''}`}
              onClick={() => setActive(wp.id)}
            >
              <span className="legend-btn__dot" />
              {wp.role}
            </button>
          ))}
        </div>

        {/* Map */}
        <div className="experience__map">
          {/* SVG map */}
          <svg
            className="experience__svg"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Grid */}
            <defs>
              <pattern id="mapgrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(226,201,126,0.04)" strokeWidth="1"/>
              </pattern>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <rect width={VB_W} height={VB_H} fill="url(#mapgrid)" />

            {/* Border */}
            <rect x="12" y="12" width={VB_W-24} height={VB_H-24}
              fill="none" stroke="rgba(226,201,126,0.08)" strokeWidth="1"
              strokeDasharray="6 4" rx="8" />

            {/* Path shadow */}
            <path d={MAP_PATH} fill="none"
              stroke="rgba(226,201,126,0.05)" strokeWidth="14" strokeLinecap="round" />

            {/* Dashed winding path */}
            <path d={MAP_PATH} fill="none"
              stroke="rgba(226,201,126,0.25)" strokeWidth="2.5"
              strokeDasharray="12 8" strokeLinecap="round" />

            {/* Accent trace on path up to active (visual) */}
            <path d={MAP_PATH} fill="none"
              stroke="#e2c97e" strokeWidth="2.5"
              strokeLinecap="round" className="gsap-map-trace" />

            {/* Decorative X marks */}
            {[[820,120],[120,440],[600,680],[880,600]].map(([x,y],i) => (
              <g key={i} transform={`translate(${x},${y})`} opacity={0.12}>
                <line x1="-6" y1="-6" x2="6" y2="6" stroke="#e2c97e" strokeWidth="1.5" />
                <line x1="6" y1="-6" x2="-6" y2="6" stroke="#e2c97e" strokeWidth="1.5" />
              </g>
            ))}

            {/* Compass */}
            <CompassRose x={870} y={700} />

            {/* Waypoints */}
            {WAYPOINTS.map(wp => (
              <g key={wp.id} onClick={() => setActive(wp.id)}
                className="waypoint" style={{ cursor: 'pointer' }}>
                {/* Pulse ring on active */}
                {active === wp.id && (
                  <circle cx={wp.cx} cy={wp.cy} r="32"
                    fill="none" stroke="rgba(226,201,126,0.2)"
                    strokeWidth="1" className="waypoint__pulse" />
                )}
                {/* Outer ring */}
                <circle cx={wp.cx} cy={wp.cy} r="22"
                  fill={active === wp.id ? 'rgba(226,201,126,0.15)' : 'rgba(13,13,26,0.7)'}
                  stroke={active === wp.id ? '#e2c97e' : 'rgba(226,201,126,0.3)'}
                  strokeWidth={active === wp.id ? '2' : '1.5'}
                  filter={active === wp.id ? 'url(#glow)' : undefined}
                  style={{ transition: 'all 0.4s ease' }} />
                {/* Inner dot */}
                <circle cx={wp.cx} cy={wp.cy} r="7"
                  fill={active === wp.id ? '#e2c97e' : 'rgba(226,201,126,0.3)'}
                  style={{ transition: 'all 0.4s ease' }} />
                {/* Number label */}
                <text x={wp.cx} y={wp.cy + 1}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={active === wp.id ? '#0d0d1a' : 'rgba(226,201,126,0.6)'}
                  fontSize="8" fontWeight="800"
                  fontFamily="'Syne',sans-serif"
                  style={{ transition: 'all 0.4s ease' }}
                >{wp.id + 1}</text>
              </g>
            ))}

            {/* Boat — animates to active waypoint */}
            <g style={{
              transform: `translate(${boat.cx}px, ${boat.cy}px)`,
              transition: 'transform 0.85s cubic-bezier(0.22,1,0.36,1)',
            }}>
              <Boat />
            </g>
          </svg>

          {/* Experience cards — one per waypoint */}
          {WAYPOINTS.map(wp => (
            <ExpCard key={wp.id} wp={wp} active={active === wp.id} />
          ))}
        </div>

        {/* Mobile fallback */}
        <div className="experience__mobile-list">
          {WAYPOINTS.map(wp => (
            <div
              key={wp.id}
              className={`mobile-exp-item ${active === wp.id ? 'mobile-exp-item--active' : ''}`}
              onClick={() => setActive(wp.id)}
            >
              <div className="mobile-exp-item__icon">{wp.icon}</div>
              <div>
                <p className="mobile-exp-item__role">{wp.role}</p>
                <p className="mobile-exp-item__company">{wp.company}</p>
                <p className="mobile-exp-item__period">{wp.period} · {wp.location}</p>
                {active === wp.id && (
                  <>
                    <p className="mobile-exp-item__desc">{wp.description}</p>
                    <div className="mobile-exp-item__tags">
                      {wp.tags.map(t => <span key={t}>{t}</span>)}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
