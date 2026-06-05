import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import TiltCard from './TiltCard'
import './Projects.css'

// Gradient palettes for the tooltip previews
const TOOLTIPS: Record<string, string> = {
  expenzo:
    'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
  'awesome-kids-website':
    'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
  'resume-screening':
    'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
}

const GRID_PROJECTS = [
  {
    num: '02',
    slug: 'expenzo',
    title: 'Expenzo',
    category: 'AI Financial App',
    description:
      'Natural language insights from bank statements via Google Gemini API. Parse, categorise, and query your spending.',
    tech: ['React', 'TypeScript', 'Supabase', 'Gemini API'],
  },
  {
    num: '03',
    slug: 'awesome-kids-website',
    title: 'Awesome Kids Website',
    category: 'Marketing Site',
    description:
      'Official responsive site for Awesome Kids International Preschool with database-backed dynamic content.',
    tech: ['React', 'TypeScript', 'Supabase'],
  },
  {
    num: '04',
    slug: 'resume-screening',
    title: 'Resume Screening',
    category: 'ML Pipeline',
    description:
      'Rank and screen resumes using TF-IDF vectorisation, Logistic Regression, and NLP preprocessing.',
    tech: ['Python', 'Scikit-learn', 'NLP', 'TF-IDF'],
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading: clip-path horizontal reveal
      gsap.fromTo(
        '.projects .section-heading',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects .section-heading',
            start: 'top 80%',
            once: true,
          },
        }
      )

      // Featured card: clip-path bottom reveal
      gsap.fromTo(
        '.proj-featured',
        { clipPath: 'inset(0 0 100% 0)', opacity: 1 },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.proj-featured',
            start: 'top 80%',
            once: true,
          },
        }
      )

      // Mini cards: stagger in from below
      gsap.fromTo(
        '.proj-mini',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.proj-grid',
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
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

      {/* Featured card — no tilt (hero piece stays flat) */}
      <article className="proj-featured">
        <div className="proj-featured__left">
          <div className="proj-featured__num">01</div>
          <h3 className="proj-featured__title">Parent Portal</h3>
          <div className="proj-featured__cat">Preschool Management System</div>
          <p className="proj-featured__desc">
            Full-stack multi-role portal for parents, admins, and teachers. Live
            in production with role-based access control (RBAC), real-time data,
            and a clean admin dashboard.
          </p>
          <div className="proj-featured__tags">
            {['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RBAC'].map(
              (t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              )
            )}
          </div>
          <div className="proj-featured__footer">
            <Link
              to="/work/parent-portal"
              className="proj__link proj__link--primary"
            >
              View Case Study ↗
            </Link>
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

      {/* Bento grid — each card gets 3D tilt + glare + floating tooltip */}
      <div className="proj-grid">
        {GRID_PROJECTS.map((p) => (
          <TiltCard
            key={p.num}
            className="proj-mini"
            tooltipTitle={p.title}
            tooltipGradient={TOOLTIPS[p.slug]}
          >
            <div className="proj-mini__num">{p.num}</div>
            <h3 className="proj-mini__title">{p.title}</h3>
            <div className="proj-mini__cat">{p.category}</div>
            <p className="proj-mini__desc">{p.description}</p>
            <div className="proj-mini__tags">
              {p.tech.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
            <div className="proj-mini__footer">
              <Link to={`/work/${p.slug}`} className="proj__link">
                View Case Study ↗
              </Link>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  )
}
