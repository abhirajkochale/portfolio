import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import GithubHeatmap from './GithubHeatmap'
import './About.css'

const SKILLS = [
  'React', 'TypeScript', 'Python', 'Node.js',
  'Supabase', 'PostgreSQL', 'Gemini API', 'Scikit-learn', 'OpenCV'
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading: clip-path horizontal reveal ──
      gsap.fromTo('.about__heading',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about__heading',
            start: 'top 80%',
            once: true,
          }
        }
      )

      // ── Photo: scale in from 0.92 ──
      gsap.fromTo('.about__photo-wrapper',
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about__right',
            start: 'top 80%',
            once: true,
          }
        }
      )

      // ── Bio ──
      gsap.fromTo('.about__bio',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: '.about__bio',
            start: 'top 82%',
            once: true,
          }
        }
      )

      // ── Stats: stagger up ──
      gsap.fromTo('.about__stat',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about__stats',
            start: 'top 82%',
            once: true,
          }
        }
      )

      // ── Resume link ──
      gsap.fromTo('.about__resume-link',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about__resume-link',
            start: 'top 88%',
            once: true,
          }
        }
      )

      // ── Skills tags: stagger up ──
      gsap.fromTo('.about__skills .tag',
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about__skills',
            start: 'top 86%',
            once: true,
          }
        }
      )

    }, sectionRef)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      ctx.revert()
    }
  }, [])

  return (
    <section id="about" className="section about" ref={sectionRef}>
      <div className="about__grid">

        {/* Left */}
        <div className="about__left">
          <div className="eyebrow">
            <span className="eyebrow__num">01</span>
            <span className="eyebrow__sep">/</span>
            <span className="eyebrow__label">About</span>
          </div>

          <h2 className="about__heading">
            Building full-stack apps&nbsp;&amp; integrating AI into real products.
          </h2>

          <div className="about__stats">
            {[
              { label: 'Status',       value: 'CE Student'      },
              { label: 'College',      value: 'KJ Somaiya'      },
              { label: 'CGPA',         value: '8.70 / 10'       },
              { label: 'Availability', value: 'Seeking Intern'  },
            ].map(s => (
              <div key={s.label} className="about__stat">
                <div className="about__stat-label">{s.label}</div>
                <div className="about__stat-value">{s.value}</div>
              </div>
            ))}
          </div>

          <a
            href="https://drive.google.com/file/d/1PBIsSSMcjQMXKFpYdFMTgW8a4ABVlHz8/view?usp=drive_open"
            target="_blank"
            rel="noopener noreferrer"
            className="about__resume-link"
          >
            View Résumé ↗
          </a>

          <GithubHeatmap />
        </div>

        {/* Right */}
        <div className="about__right">
          <div className="about__photo-wrapper">
            <img
              src="/profile.jpeg"
              alt="Abhiraj Kochale"
              className="about__photo"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="about__bio">
            I'm Abhiraj — a 2nd-year Computer Engineering student at KJ&nbsp;Somaiya, Mumbai. I build production-ready web apps and integrate AI into real products — things used by real people.
          </p>
        </div>

      </div>

      {/* Skills */}
      <div className="about__skills">
        <span className="about__skills-label">Stack</span>
        {SKILLS.map(s => (
          <span key={s} className="tag">{s}</span>
        ))}
      </div>
    </section>
  )
}
