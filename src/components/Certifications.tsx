import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
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

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cert-card', {
        opacity: 0, 
        y: 80, 
        stagger: 0.1, 
        scrollTrigger: { 
          trigger: '.certs__grid', 
          start: 'top 85%', 
          end: 'top 40%',
          scrub: 1 
        }
      })
    }, sectionRef)
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      ctx.revert()
    }
  }, [])

  return (
    <section id="certifications" className="section certifications" ref={sectionRef}>
      
      <div className="eyebrow">
        <span className="eyebrow__num">04</span>
        <span className="eyebrow__sep">/</span>
        <span className="eyebrow__label">Certifications</span>
      </div>

      <h2 className="about__heading" style={{ marginBottom: '48px' }}>
        Verified learning milestones.
      </h2>

      <div className="certs__grid">
        {CERTS.map((c, i) => (
          <article key={i} className="cert-card">
            <div className="cert-card__issuer">{c.issuer}</div>
            <h3 className="cert-card__title">{c.title}</h3>
            <div className="cert-card__date">{c.date}</div>
            <div className="cert-card__footer">
              {c.credentialUrl && (
                <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="cert-card__link">
                  VIEW CERTIFICATE ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

    </section>
  )
}
