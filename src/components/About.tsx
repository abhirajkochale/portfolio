import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import './About.css'

const SKILLS = [
  'React', 'TypeScript', 'Python', 'Node.js',
  'Supabase', 'PostgreSQL', 'Gemini API', 'Scikit-learn', 'OpenCV'
]

export default function About() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLHeadingElement>(null)
  const skillsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading line-by-line scrub
      if (headingRef.current) {
        const split = new SplitType(headingRef.current, { types: 'lines' })
        gsap.from(split.lines, {
          yPercent: 110,
          opacity: 0,
          stagger: 0.08,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 82%',
            end: 'top 38%',
            scrub: 1.2,
          }
        })
      }

      // Stats staggered up
      gsap.from('.about__stat', {
        opacity: 0,
        y: 32,
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.about__stats',
          start: 'top 88%',
          end: 'top 52%',
          scrub: 1,
        }
      })

      // Resume link
      gsap.from('.about__resume-link', {
        opacity: 0,
        y: 16,
        scrollTrigger: {
          trigger: '.about__resume-link',
          start: 'top 90%',
          end: 'top 65%',
          scrub: 1,
        }
      })

      // Photo
      gsap.from('.about__photo-wrapper', {
        opacity: 0,
        y: 60,
        scale: 0.97,
        scrollTrigger: {
          trigger: '.about__right',
          start: 'top 85%',
          end: 'top 42%',
          scrub: 1.2,
        }
      })

      // Bio
      gsap.from('.about__bio', {
        opacity: 0,
        y: 30,
        scrollTrigger: {
          trigger: '.about__bio',
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1,
        }
      })

      // Skills
      if (skillsRef.current) {
        gsap.from(skillsRef.current.querySelectorAll('.tag'), {
          opacity: 0,
          y: 14,
          stagger: 0.04,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 90%',
            end: 'top 62%',
            scrub: 1,
          }
        })
      }
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

          <h2 className="about__heading" ref={headingRef}>
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
      <div className="about__skills" ref={skillsRef}>
        <span className="about__skills-label">Stack</span>
        {SKILLS.map(s => (
          <span key={s} className="tag">{s}</span>
        ))}
      </div>
    </section>
  )
}
