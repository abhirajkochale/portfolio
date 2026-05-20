import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './Projects.css'

/* ── Data ────────────────────────────────────────── */
interface Project {
  title: string
  subtitle: string
  description: string
  tech: string[]
  github?: string
  live?: string
  featured: boolean
  accent?: string   // optional override colour
}

const PROJECTS: Project[] = [
  {
    title: 'Expenzo',
    subtitle: 'AI Financial Assistant',
    description:
      'AI-powered personal finance app with natural language insights from bank statements. Uses Google Gemini API to parse, categorise, and answer questions about your spending.',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Gemini API'],
    github: 'https://github.com/abhirajkochale/expenzo',
    live: 'https://expenzo-kappa.vercel.app/',
    featured: true,
  },
  {
    title: 'Parent Portal',
    subtitle: 'Preschool Management System',
    description:
      'Full-stack multi-role portal for parents, admins, and teachers. Live in production with 150+ active users and 80+ admissions processed through the platform.',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RBAC'],
    live: 'https://awesomekids-parents-portal.vercel.app/',
    featured: true,
  },
  {
    title: 'Awesome Kids Website',
    subtitle: 'Preschool Official Website',
    description:
      'Official responsive marketing website for Awesome Kids International Preschool. Database-backed dynamic content, boosted digital admissions presence significantly.',
    tech: ['React', 'TypeScript', 'Supabase'],
    live: 'https://awesome-kids.vercel.app/',
    featured: true,
  },
  {
    title: 'Resume Screening Tool',
    subtitle: 'ML Pipeline',
    description:
      'Machine learning pipeline to rank and screen resumes using TF-IDF vectorisation, Logistic Regression, and NLP preprocessing techniques.',
    tech: ['Python', 'Scikit-learn', 'NLP', 'TF-IDF'],
    github: 'https://github.com/abhirajkochale/resume-screening',
    featured: true,
  },
]

/* ── Icon components ─────────────────────────────── */
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s var(--ease-out)' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

/* ── Project Card ────────────────────────────────── */
function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card gsap-card">
      {/* Top accent bar */}
      <div className="project-card__accent" />

      <div className="project-card__body">
        {/* Header */}
        <div className="project-card__header">
          <div>
            <h3 className="project-card__title">{project.title}</h3>
            <p className="project-card__subtitle">{project.subtitle}</p>
          </div>
          {/* Link icons — top right */}
          <div className="project-card__quick-links">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__icon-link"
                aria-label="GitHub repository"
              >
                <GithubIcon />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__icon-link"
                aria-label="Live demo"
              >
                <ExternalIcon />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="project-card__desc">{project.description}</p>

        {/* Tech stack */}
        <div className="project-card__tech">
          {project.tech.map(t => (
            <span key={t} className="project-card__tech-pill">{t}</span>
          ))}
        </div>
      </div>

      {/* Footer CTA buttons */}
      <div className="project-card__footer">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__btn project-card__btn--ghost"
          >
            <GithubIcon />
            GitHub
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__btn project-card__btn--primary"
          >
            <ExternalIcon />
            Live Demo
          </a>
        )}
      </div>
    </article>
  )
}

/* ── Main Section ────────────────────────────────── */
export default function Projects() {
  const [showAll, setShowAll] = useState(false)
  const containerRef = useRef<HTMLElement>(null)

  const featured = PROJECTS.filter(p => p.featured)
  const extras = PROJECTS.filter(p => !p.featured)
  const displayed = showAll ? [...featured, ...extras] : featured

  useGSAP(() => {
    gsap.from('.gsap-card', {
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
  }, { scope: containerRef, dependencies: [showAll] })

  return (
    <section id="projects" className="section projects" ref={containerRef}>
      <div className="container">

        {/* Header */}
        <div className="projects__header">
          <div className="projects__label">
            <span className="projects__label-line" />
            <span>PROJECTS</span>
          </div>
          <div className="projects__title-row">
            <h2 className="projects__heading">Projects</h2>
            <div className="projects__count">{PROJECTS.length} total</div>
          </div>
          <p className="projects__subtitle">Things I've built and shipped.</p>
        </div>

        {/* Grid */}
        <div className="projects__grid" style={{ perspective: '1000px' }}>
          {displayed.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>

        {/* View All toggle — only show if there are extras */}
        {extras.length > 0 && (
          <div className="projects__toggle-wrap">
            <button
              className="projects__toggle-btn"
              onClick={() => setShowAll(v => !v)}
              aria-expanded={showAll}
            >
              {showAll ? 'Show Less' : `View All Projects (${extras.length} more)`}
              <ChevronIcon open={showAll} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
