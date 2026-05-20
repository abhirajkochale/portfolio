import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import './Projects.css'

const GRID_PROJECTS = [
  {
    num: '02',
    title: 'Expenzo',
    category: 'AI Financial App',
    description: 'Natural language insights from bank statements via Google Gemini API. Parse, categorise, and query your spending.',
    tech: ['React', 'TypeScript', 'Supabase', 'Gemini API'],
    github: 'https://github.com/abhirajkochale/expenzo',
    live: 'https://expenzo-kappa.vercel.app/',
  },
  {
    num: '03',
    title: 'Awesome Kids Website',
    category: 'Marketing Site',
    description: 'Official responsive site for Awesome Kids International Preschool with database-backed dynamic content.',
    tech: ['React', 'TypeScript', 'Supabase'],
    live: 'https://awesome-kids.vercel.app/',
  },
  {
    num: '04',
    title: 'Resume Screening',
    category: 'ML Pipeline',
    description: 'Rank and screen resumes using TF-IDF vectorisation, Logistic Regression, and NLP preprocessing.',
    tech: ['Python', 'Scikit-learn', 'NLP', 'TF-IDF'],
    github: 'https://github.com/abhirajkochale/resume-screening',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Featured card
      gsap.from('.proj-featured', {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.proj-featured', start: 'top 75%', once: true },
      })

      // Mini cards
      gsap.from('.proj-mini', {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.proj-grid', start: 'top 78%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="proj__container">

        <div className="proj__header">
          <div>
            <div className="s-eyebrow">
              <span className="s-num">03</span>
              <span className="s-label">/ Selected Work</span>
            </div>
            <h2 className="s-heading">Things I've built and shipped.</h2>
          </div>
          <span className="proj__count">(4 projects)</span>
        </div>

        {/* ── Featured: Parent Portal ── */}
        <article className="proj-featured">
          <div className="proj-featured__left">
            <span className="proj-featured__num">01</span>
            <h3 className="proj-featured__title">Parent Portal</h3>
            <p className="proj-featured__cat">Preschool Management System</p>
            <p className="proj-featured__desc">
              Full-stack multi-role portal for parents, admins, and teachers. Live in
              production with role-based access control (RBAC), real-time data, and
              a clean admin dashboard.
            </p>
            <div className="proj-featured__tags">
              {['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RBAC'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
            <div className="proj-featured__footer">
              <a href="https://awesomekids-parents-portal.vercel.app/" target="_blank" rel="noopener noreferrer" className="proj-link">
                VIEW LIVE DEMO ↗
              </a>
            </div>
          </div>

          <div className="proj-featured__right">
            <div className="proj-stat">
              <span className="proj-stat__num">150+</span>
              <span className="proj-stat__label">Active Users</span>
            </div>
            <div className="proj-stat">
              <span className="proj-stat__num">80+</span>
              <span className="proj-stat__label">Admissions Processed</span>
            </div>
          </div>
        </article>

        {/* ── Mini grid ── */}
        <div className="proj-grid">
          {GRID_PROJECTS.map(p => (
            <article key={p.num} className="proj-mini">
              <div className="proj-mini__body">
                <span className="proj-mini__num">{p.num}</span>
                <h3 className="proj-mini__title">{p.title}</h3>
                <p className="proj-mini__cat">{p.category}</p>
                <p className="proj-mini__desc">{p.description}</p>
                <div className="proj-mini__tags">
                  {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <div className="proj-mini__footer">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="proj-link">
                    VIEW PROJECT ↗
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-link proj-link--dim">
                    GITHUB ↗
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
