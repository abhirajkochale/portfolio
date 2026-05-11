import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './Certifications.css'

interface Cert {
  title: string
  issuer: string
  date: string
  credentialUrl?: string
}

const CERTS: Cert[] = [
  {
    title: 'Machine Learning with Python',
    issuer: 'IBM',
    date: 'August 2025',
    credentialUrl: '#',
  },
  {
    title: 'ML Internship & Training Certificate',
    issuer: 'Wayspire Ed-Tech Pvt Ltd',
    date: 'August 2025',
    credentialUrl: '#',
  },
]

/* ── Award icon (inline SVG, no dependency) ──────────────── */
function AwardIcon() {
  return (
    <svg
      className="cert-card__award-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}

/* ── External link icon ─────────────────────────────────── */
function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

/* ── Card ─────────────────────────────────────────────────── */
function CertCard({ cert }: { cert: Cert }) {
  return (
    <article className="cert-card gsap-cert-card">
      {/* Gold left border accent — CSS handles this */}

      <div className="cert-card__inner">
        {/* Icon column */}
        <div className="cert-card__icon-col">
          <div className="cert-card__icon-wrap">
            <AwardIcon />
          </div>
        </div>

        {/* Content column */}
        <div className="cert-card__content">
          <h3 className="cert-card__title">{cert.title}</h3>
          <p className="cert-card__issuer">{cert.issuer}</p>

          <div className="cert-card__meta">
            <span className="cert-card__date">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {cert.date}
            </span>
          </div>

          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-card__view-link"
            >
              View Certificate
              <ExternalIcon />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

/* ── Section ─────────────────────────────────────────────── */
export default function Certifications() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.gsap-cert-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      rotateX: 8,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    })
  }, { scope: containerRef })

  return (
    <section id="certifications" className="section certifications" ref={containerRef}>
      <div className="container">

        <div className="certs__header">
          <div className="certs__label">
            <span className="certs__label-line" />
            <span>CERTIFICATIONS</span>
          </div>
          <h2 className="certs__heading">Certifications</h2>
          <p className="certs__subtitle">Verified learning milestones.</p>
        </div>

        <div className="certs__grid" style={{ perspective: '1000px' }}>
          {CERTS.map((c, i) => <CertCard key={i} cert={c} />)}
        </div>

      </div>
    </section>
  )
}
