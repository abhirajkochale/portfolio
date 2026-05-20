import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import './Experience.css'

const EXP = [
  {
    date:    'Jun 2025 — Aug 2025',
    role:    'Machine Learning Intern',
    company: 'Wayspire Ed-Tech Pvt Ltd',
    location:'Remote',
    description: 'Built ML models for text classification and introductory CV tasks using OpenCV and Scikit-learn. Trained, evaluated, and deployed classification pipelines.',
    tags: ['Python', 'ML', 'OpenCV', 'Scikit-learn'],
  },
  {
    date:    '2024 — Present',
    role:    'Social Media Manager',
    company: 'Awesome Kids International Preschool',
    location:'Mumbai',
    description: 'Grew Instagram engagement by 30%+ through consistent content strategy and creative campaigns. Managed brand voice and posting cadence.',
    tags: ['Content Strategy', 'Instagram', 'Analytics'],
  },
  {
    date:    'Oct 2024 — Present',
    role:    'Marketing Team Member',
    company: 'SMLRA',
    location:'Mumbai',
    description: 'Supported sponsorship outreach and event marketing for ML workshops and community initiatives across Mumbai.',
    tags: ['Marketing', 'Outreach', 'ML Events'],
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>('.exp-row').forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          x: -32,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: row, start: 'top 82%', once: true },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" className="experience" ref={sectionRef}>
      <div className="exp__container">

        <div className="s-eyebrow">
          <span className="s-num">02</span>
          <span className="s-label">/ Experience</span>
        </div>

        <h2 className="s-heading" style={{ marginBottom: '56px' }}>
          The journey so far.
        </h2>

        <div className="exp__list">
          {EXP.map((e, i) => (
            <div className="exp-row" key={i}>
              <span className="exp-row__date">{e.date}</span>

              <div className="exp-row__body">
                <p className="exp-row__role">{e.role}</p>
                <p className="exp-row__company">{e.company}</p>
                <p className="exp-row__desc">{e.description}</p>
                <div className="exp-row__tags">
                  {e.tags.map(t => (
                    <span key={t} className="tag exp-row__tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="exp-row__right">
                <p className="exp-row__company-col">{e.company}</p>
                <p className="exp-row__location">{e.location}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
