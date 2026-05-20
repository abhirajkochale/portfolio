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
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const split = new SplitType(headingRef.current, { types: 'lines' })
        gsap.from(split.lines, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          }
        })
      }

      gsap.from('.about__stat', {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        scrollTrigger: { 
          trigger: '.about__stats', 
          start: 'top 90%', 
          end: 'top 50%',
          scrub: 1
        }
      })

      gsap.from('.about__photo-wrapper', {
        opacity: 0,
        y: 80,
        scrollTrigger: { 
          trigger: '.about__right', 
          start: 'top 85%', 
          end: 'top 40%',
          scrub: 1
        }
      })

      gsap.from('.about__bio', {
        opacity: 0,
        y: 40,
        scrollTrigger: { 
          trigger: '.about__right', 
          start: 'top 75%', 
          end: 'top 35%',
          scrub: 1 
        }
      })

      if (skillsRef.current) {
        gsap.from(skillsRef.current.querySelectorAll('.tag'), {
          opacity: 0,
          y: 20,
          scale: 0.94,
          stagger: 0.05,
          scrollTrigger: { 
            trigger: skillsRef.current, 
            start: 'top 90%', 
            end: 'top 60%',
            scrub: 1
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

        {/* Left Col */}
        <div className="about__left">
          <div className="eyebrow">
            <span className="eyebrow__num">01</span>
            <span className="eyebrow__sep">/</span>
            <span className="eyebrow__label">About</span>
          </div>

          <h2 className="about__heading" ref={headingRef}>
            Building full-stack apps &amp; integrating AI into real products.
          </h2>

          <div className="about__stats">
            {[
              { label: 'Status', value: 'CE Student' },
              { label: 'College', value: 'KJ Somaiya' },
              { label: 'CGPA', value: '8.70 / 10' },
              { label: 'Availability', value: 'Seeking Intern' },
            ].map(s => (
              <div key={s.label} className="about__stat">
                <div className="about__stat-label">{s.label}</div>
                <div className="about__stat-value">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col */}
        <div className="about__right">
          <div className="about__photo-wrapper">
            <img src="/profile.jpeg" alt="Abhiraj Kochale" className="about__photo" loading="lazy" decoding="async" />
          </div>
          <p className="about__bio">
            I'm Abhiraj — a 2nd-year Computer Engineering student at KJ Somaiya, Mumbai. I build production-ready web apps and integrate AI into real products — things used by real people.
          </p>
        </div>

      </div>

      {/* Skills Row */}
      <div className="about__skills" ref={skillsRef}>
        <span className="about__skills-label">Technical Skills</span>
        {SKILLS.map(s => (
          <span key={s} className="tag">{s}</span>
        ))}
      </div>
    </section>
  )
}
