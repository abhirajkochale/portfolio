import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import './Certifications.css'

const CERTS = [
  {
    title: 'Machine Learning with Python',
    issuer: 'IBM',
    date: 'August 2025',
    credentialUrl: 'https://www.credly.com/badges/acde1ca6-d871-4147-9395-5e4ecd77c06a/',
  },
  {
    title: 'ML Internship & Training Certificate',
    issuer: 'Wayspire Ed-Tech Pvt Ltd',
    date: 'August 2025',
    credentialUrl: 'https://courses.etrain.skillsnetwork.site/certificates/cae552c379fc4987bd49539435e38de2',
  },
]

function AwardMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cert-card', {
        opacity: 0,
        y: 32,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.certs__grid', start: 'top 80%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="certifications" className="certifications" ref={sectionRef}>
      <div className="certs__container">

        <div className="s-eyebrow">
          <span className="s-num">04</span>
          <span className="s-label">/ Certifications</span>
        </div>

        <h2 className="s-heading" style={{ marginBottom: '48px' }}>
          Verified learning milestones.
        </h2>

        <div className="certs__grid">
          {CERTS.map((c, i) => (
            <article key={i} className="cert-card">
              <div className="cert-card__top">
                <span className="cert-card__issuer-icon"><AwardMark /></span>
                <span className="cert-card__issuer">{c.issuer}</span>
              </div>
              <h3 className="cert-card__title">{c.title}</h3>
              <p className="cert-card__date">{c.date}</p>
              <div className="cert-card__footer">
                {c.credentialUrl && (
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-card__link"
                  >
                    VIEW CERTIFICATE ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
