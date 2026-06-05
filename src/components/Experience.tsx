import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './Experience.css'

const EXP = [
  {
    index: '01',
    date: 'Jun 2025 — Aug 2025',
    role: 'Machine Learning Intern',
    company: 'Wayspire Ed-Tech Pvt Ltd',
    location: 'Remote',
    type: 'Internship',
    description: 'Built ML models for text classification and introductory CV tasks using OpenCV and Scikit-learn. Trained, evaluated, and deployed classification pipelines.',
    tags: ['Python', 'ML', 'OpenCV', 'Scikit-learn'],
  },
  {
    index: '02',
    date: '2024 — Present',
    role: 'Social Media Manager',
    company: 'Awesome Kids International Preschool',
    location: 'Mumbai',
    type: 'Part-time',
    description: 'Grew Instagram engagement by 30%+ through consistent content strategy and creative campaigns. Managed brand voice and posting cadence.',
    tags: ['Content Strategy', 'Instagram', 'Analytics'],
  },
  {
    index: '03',
    date: 'Oct 2025 — Present',
    role: 'Marketing Team Member',
    company: 'SMLRA',
    location: 'Mumbai',
    type: 'Volunteer',
    description: 'Supported sponsorship outreach and event marketing for ML workshops and community initiatives across Mumbai.',
    tags: ['Marketing', 'Outreach', 'ML Events'],
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-row', {
        opacity: 0,
        y: 50,
        stagger: {
          each: 0.12,
          from: 'start',
        },
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.exp__list',
          start: 'top 82%',
          once: true,
        },
      })
    }, sectionRef)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      ctx.revert()
    }
  }, [])

  return (
    <section id="experience" className="section experience" ref={sectionRef}>

      <div className="eyebrow">
        <span className="eyebrow__num">02</span>
        <span className="eyebrow__sep">/</span>
        <span className="eyebrow__label">Experience</span>
      </div>

      <h2 className="section-heading">
        The journey so far.
      </h2>

      <div className="exp__list">
        {EXP.map((e) => (
          <div className="exp-row" key={e.index}>

            <div className="exp-row__index">{e.index}</div>

            <div className="exp-row__main">
              <div className="exp-row__role">{e.role}</div>
              <div className="exp-row__company">{e.company}</div>
              <div className="exp-row__desc">{e.description}</div>
              <div className="exp-row__tags">
                {e.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>

            <div className="exp-row__meta">
              <div className="exp-row__date">{e.date}</div>
              <div className="exp-row__loc">{e.location}</div>
              <div className="exp-row__type">{e.type}</div>
            </div>

          </div>
        ))}
      </div>

    </section>
  )
}
