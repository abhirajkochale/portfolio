import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import './AboutPage.css'

const SKILLS = [
  'React', 'TypeScript', 'Python', 'Node.js',
  'Supabase', 'PostgreSQL', 'Gemini API', 'Scikit-learn', 'OpenCV'
]

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

const CERTS = [
  {
    index: '01',
    title: 'Machine Learning with Python',
    issuer: 'IBM',
    date: 'August 2025',
    url: 'https://www.credly.com/badges/acde1ca6-d871-4147-9395-5e4ecd77c06a/',
  },
  {
    index: '02',
    title: 'ML Internship & Training Certificate',
    issuer: 'Wayspire Ed-Tech Pvt Ltd',
    date: 'August 2025',
    url: 'https://courses.etrain.skillsnetwork.site/certificates/cae552c379fc4987bd49539435e38de2',
  },
]

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Page header entrance
      gsap.from('.about-header__eyebrow', { opacity: 0, y: 16, duration: 0.8, delay: 0.1 })
      gsap.from('.about-header__title .line', {
        yPercent: 110,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.1,
        delay: 0.2,
      })

      // Bio photo
      gsap.from('.ap-bio__photo-wrap', {
        opacity: 0,
        scale: 0.96,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ap-bio', start: 'top 80%', once: true }
      })

      // Bio text
      if (headingRef.current) {
        const split = new SplitType(headingRef.current, { types: 'lines' })
        gsap.from(split.lines, {
          yPercent: 110,
          opacity: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 82%', once: true }
        })
      }

      gsap.from('.ap-bio__stat', {
        opacity: 0, y: 24, stagger: 0.08, duration: 0.8,
        scrollTrigger: { trigger: '.ap-bio__stats', start: 'top 84%', once: true }
      })

      // Experience rows
      gsap.from('.ap-exp-row', {
        opacity: 0, y: 40, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.ap-exp__list', start: 'top 80%', once: true }
      })

      // Certs
      gsap.from('.ap-cert', {
        opacity: 0, y: 36, scale: 0.97, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.ap-certs__grid', start: 'top 84%', once: true }
      })

      // Skills
      gsap.from('.ap-skills__tag', {
        opacity: 0, y: 16, stagger: 0.04, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.ap-skills', start: 'top 86%', once: true }
      })

    }, pageRef)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      ctx.revert()
    }
  }, [])

  return (
    <div className="about-page page" ref={pageRef} id="about">

      {/* ── Header ── */}
      <div className="about-header page-header">
        <div className="about-header__eyebrow page-header__eyebrow">About</div>
        <h1 className="about-header__title page-header__title">
          <span className="line">The</span>
          <span className="line">Person.</span>
        </h1>
      </div>

      {/* ── Bio ── */}
      <div className="ap-bio section">
        <div className="ap-bio__grid">

          <div className="ap-bio__left">
            <div className="ap-bio__photo-wrap">
              <img
                src="/profile.jpeg"
                alt="Abhiraj Kochale"
                className="ap-bio__photo"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          <div className="ap-bio__right">
            <div className="eyebrow">
              <span className="eyebrow__num">01</span>
              <span className="eyebrow__sep">/</span>
              <span className="eyebrow__label">Profile</span>
            </div>

            <p className="ap-bio__text" ref={headingRef}>
              I'm Abhiraj — a 2nd-year Computer Engineering student at KJ Somaiya, Mumbai. I build production-ready web apps and integrate AI into real products. Things used by real people, not just portfolio demos.
            </p>

            <div className="ap-bio__stats">
              {[
                { label: 'Status',       value: 'CE Student'     },
                { label: 'College',      value: 'KJ Somaiya'     },
                { label: 'CGPA',         value: '8.70 / 10'      },
                { label: 'Availability', value: 'Seeking Intern' },
              ].map(s => (
                <div key={s.label} className="ap-bio__stat">
                  <div className="ap-bio__stat-label">{s.label}</div>
                  <div className="ap-bio__stat-value">{s.value}</div>
                </div>
              ))}
            </div>

            <a
              href="https://drive.google.com/file/d/1PBIsSSMcjQMXKFpYdFMTgW8a4ABVlHz8/view?usp=drive_open"
              target="_blank"
              rel="noopener noreferrer"
              className="ap-bio__resume"
            >
              Download Résumé ↗
            </a>
          </div>

        </div>
      </div>

      {/* ── Skills ── */}
      <div className="ap-skills section">
        <div className="eyebrow">
          <span className="eyebrow__num">02</span>
          <span className="eyebrow__sep">/</span>
          <span className="eyebrow__label">Technical Stack</span>
        </div>
        <div className="ap-skills__tags">
          {SKILLS.map(s => (
            <span key={s} className="tag ap-skills__tag">{s}</span>
          ))}
        </div>
      </div>

      {/* ── Experience ── */}
      <div className="ap-exp section" id="experience">
        <div className="eyebrow">
          <span className="eyebrow__num">03</span>
          <span className="eyebrow__sep">/</span>
          <span className="eyebrow__label">Experience</span>
        </div>

        <h2 className="section-heading">The journey so far.</h2>

        <div className="ap-exp__list">
          {EXP.map(e => (
            <div className="ap-exp-row" key={e.index}>
              <div className="ap-exp-row__idx">{e.index}</div>
              <div className="ap-exp-row__main">
                <div className="ap-exp-row__role">{e.role}</div>
                <div className="ap-exp-row__company">{e.company}</div>
                <div className="ap-exp-row__desc">{e.description}</div>
                <div className="ap-exp-row__tags">
                  {e.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <div className="ap-exp-row__meta">
                <div className="ap-exp-row__date">{e.date}</div>
                <div className="ap-exp-row__loc">{e.location}</div>
                <div className="ap-exp-row__type">{e.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Certifications ── */}
      <div className="ap-certs section" id="certifications">
        <div className="eyebrow">
          <span className="eyebrow__num">04</span>
          <span className="eyebrow__sep">/</span>
          <span className="eyebrow__label">Certifications</span>
        </div>

        <h2 className="section-heading">Verified learning milestones.</h2>

        <div className="ap-certs__grid">
          {CERTS.map(c => (
            <article key={c.index} className="ap-cert">
              <div className="ap-cert__idx">{c.index}</div>
              <div className="ap-cert__issuer">{c.issuer}</div>
              <h3 className="ap-cert__title">{c.title}</h3>
              <div className="ap-cert__date">{c.date}</div>
              <div className="ap-cert__footer">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ap-cert__link"
                >
                  View Certificate ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

    </div>
  )
}
