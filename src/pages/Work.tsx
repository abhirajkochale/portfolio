import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './Work.css'

const PROJECTS = [
  {
    num: '01',
    title: 'Parent Portal',
    category: 'Preschool Management System',
    year: '2024',
    description: 'Full-stack multi-role portal for parents, admins, and teachers. Live in production with role-based access control (RBAC), real-time data, and a clean admin dashboard.',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RBAC'],
    live: 'https://awesomekids-parents-portal.vercel.app/',
    stats: [{ num: '150+', label: 'Active Users' }, { num: '80+', label: 'Admissions Processed' }],
  },
  {
    num: '02',
    title: 'Expenzo',
    category: 'AI Financial App',
    year: '2024',
    description: 'Natural language insights from bank statements via Google Gemini API. Parse, categorise, and query your spending in plain English.',
    tech: ['React', 'TypeScript', 'Supabase', 'Gemini API'],
    github: 'https://github.com/abhirajkochale/expenzo',
    live: 'https://expenzo-kappa.vercel.app/',
  },
  {
    num: '03',
    title: 'Awesome Kids Website',
    category: 'Marketing Site',
    year: '2024',
    description: 'Official responsive site for Awesome Kids International Preschool with database-backed dynamic content and a custom CMS.',
    tech: ['React', 'TypeScript', 'Supabase'],
    live: 'https://awesome-kids.vercel.app/',
  },
  {
    num: '04',
    title: 'Resume Screening',
    category: 'ML Pipeline',
    year: '2025',
    description: 'Rank and screen resumes using TF-IDF vectorisation, Logistic Regression, and NLP preprocessing. Reduces manual screening by 80%.',
    tech: ['Python', 'Scikit-learn', 'NLP', 'TF-IDF'],
    github: 'https://github.com/abhirajkochale/resume-screening',
  },
]

export default function Work() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page header
      gsap.from('.work-header__eyebrow', {
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', delay: 0.1,
      })
      gsap.from('.work-header__title .line', {
        yPercent: 110, duration: 1.2, ease: 'power4.out', stagger: 0.1, delay: 0.2,
      })

      // Project rows
      gsap.from('.work-item', {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.work-list',
          start: 'top 80%',
          once: true,
        }
      })
    }, pageRef)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      ctx.revert()
    }
  }, [])

  return (
    <div className="work-page page" ref={pageRef} id="projects">

      {/* Header */}
      <div className="work-header page-header">
        <div className="work-header__eyebrow page-header__eyebrow">
          Selected Work
        </div>
        <h1 className="work-header__title page-header__title">
          <span className="line">Projects</span>
        </h1>
      </div>

      {/* Projects */}
      <div className="work-list">
        {PROJECTS.map((p) => (
          <article className="work-item" key={p.num}>
            <div className="work-item__inner">

              {/* Header row */}
              <div className="work-item__head">
                <span className="work-item__num">{p.num}</span>
                <span className="work-item__year">{p.year}</span>
              </div>

              {/* Main content */}
              <div className="work-item__body">
                <div className="work-item__left">
                  <h2 className="work-item__title">{p.title}</h2>
                  <div className="work-item__cat">{p.category}</div>
                  <p className="work-item__desc">{p.description}</p>
                  {p.stats && (
                    <div className="work-item__stats">
                      {p.stats.map(s => (
                        <div key={s.label} className="work-item__stat">
                          <span className="work-item__stat-num">{s.num}</span>
                          <span className="work-item__stat-label">{s.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="work-item__right">
                  <div className="work-item__tags">
                    {p.tech.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  <div className="work-item__links">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-item__link"
                      >
                        View Live ↗
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-item__link"
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
