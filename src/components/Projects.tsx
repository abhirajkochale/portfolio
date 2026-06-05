import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
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
      // Featured card: clip-path reveal
      gsap.fromTo('.proj-featured',
        { clipPath: 'inset(0 0 100% 0)', opacity: 1 },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.proj-featured',
            start: 'top 82%',
            once: true,
          }
        }
      )

      // Mini cards stagger
      gsap.from('.proj-mini', {
        opacity: 0,
        y: 60,
        scale: 0.97,
        stagger: 0.1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.proj-grid',
          start: 'top 84%',
          once: true,
        }
      })
    }, sectionRef)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      ctx.revert()
    }
  }, [])

  return (
    <section id="projects" className="section projects" ref={sectionRef}>

      <div className="proj__header">
        <div>
          <div className="eyebrow">
            <span className="eyebrow__num">03</span>
            <span className="eyebrow__sep">/</span>
            <span className="eyebrow__label">Selected Work</span>
          </div>
          <h2 className="section-heading" style={{ marginBottom: 0 }}>
            Things I've built and shipped.
          </h2>
        </div>
        <div className="proj__count">(4 projects)</div>
      </div>

      {/* Featured — inverted */}
      <article className="proj-featured">
        <div className="proj-featured__left">
          <div className="proj-featured__num">01</div>
          <h3 className="proj-featured__title">Parent Portal</h3>
          <div className="proj-featured__cat">Preschool Management System</div>
          <p className="proj-featured__desc">
            Full-stack multi-role portal for parents, admins, and teachers. Live in production with role-based access control (RBAC), real-time data, and a clean admin dashboard.
          </p>
          <div className="proj-featured__tags">
            {['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RBAC'].map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          <div className="proj-featured__footer">
            <a
              href="https://awesomekids-parents-portal.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="proj__link proj__link--primary"
            >
              View Live Demo ↗
            </a>
          </div>
        </div>

        <div className="proj-featured__right">
          <div className="proj-stat">
            <div className="proj-stat__num">150+</div>
            <div className="proj-stat__label">Active Users</div>
          </div>
          <div className="proj-stat">
            <div className="proj-stat__num">80+</div>
            <div className="proj-stat__label">Admissions Processed</div>
          </div>
        </div>
      </article>

      {/* Bento grid */}
      <div className="proj-grid">
        {GRID_PROJECTS.map(p => (
          <article key={p.num} className="proj-mini">
            <div className="proj-mini__num">{p.num}</div>
            <h3 className="proj-mini__title">{p.title}</h3>
            <div className="proj-mini__cat">{p.category}</div>
            <p className="proj-mini__desc">{p.description}</p>
            <div className="proj-mini__tags">
              {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
            <div className="proj-mini__footer">
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="proj__link">
                  View Project ↗
                </a>
              )}
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj__link">
                  GitHub ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

    </section>
  )
}
