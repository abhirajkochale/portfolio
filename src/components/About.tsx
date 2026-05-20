import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import SplitType from 'split-type'
import './About.css'

const SKILLS = [
  'React', 'TypeScript', 'Python', 'Node.js',
  'Supabase', 'PostgreSQL', 'Gemini API', 'Scikit-learn',
]

export default function About() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLHeadingElement>(null)
  const tagsRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SplitType heading lines reveal
      if (headingRef.current) {
        const split = new SplitType(headingRef.current, { types: 'lines' })
        gsap.from(split.lines, {
          yPercent: 105,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 78%', once: true },
        })
      }

      // Stats + left column
      gsap.from('.about__stats-cell', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.about__stats', start: 'top 82%', once: true },
      })

      // Photo + right col
      gsap.from('.about__photo-wrap', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about__right', start: 'top 80%', once: true },
      })

      gsap.from('.about__bio', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.2,
        scrollTrigger: { trigger: '.about__right', start: 'top 78%', once: true },
      })

      // Tags stagger
      if (tagsRef.current) {
        gsap.from(tagsRef.current.querySelectorAll('.about__tag'), {
          opacity: 0,
          y: 16,
          scale: 0.92,
          stagger: 0.05,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: tagsRef.current, start: 'top 85%', once: true },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about__container">

        <div className="about__grid">
          {/* ── Left ── */}
          <div className="about__left">
            <div className="s-eyebrow">
              <span className="s-num">01</span>
              <span className="s-label">/ About</span>
            </div>

            <h2 className="s-heading about__heading" ref={headingRef}>
              Building full-stack apps &amp; integrating AI into real products.
            </h2>

            <div className="about__stats" role="list">
              {[
                { label: 'Field',   value: 'CE Student'     },
                { label: 'College', value: 'KJ Somaiya'     },
                { label: 'CGPA',    value: '8.70 / 10'      },
                { label: 'Status',  value: 'Seeking Intern' },
              ].map(s => (
                <div className="about__stats-cell" key={s.label} role="listitem">
                  <span className="about__stat-label">{s.label}</span>
                  <span className="about__stat-value">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right ── */}
          <div className="about__right">
            <div className="about__photo-wrap">
              <img
                src="/profile.jpeg"
                alt="Abhiraj Kochale"
                className="about__photo"
                loading="lazy"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              <div className="about__photo-fallback" aria-hidden="true">AK</div>

              <div className="about__badge about__badge--status">
                <span className="about__badge-dot" aria-hidden="true" />
                Open to work
              </div>
              <div className="about__badge about__badge--cgpa">
                CGPA 8.70
              </div>
            </div>

            <p className="about__bio">
              I'm Abhiraj — a 2nd-year Computer Engineering student at{' '}
              <strong>KJ Somaiya, Mumbai</strong> (CGPA: 8.70). I build
              production-ready web apps and integrate AI into real products
              — things used by real people.
            </p>
          </div>
        </div>

        {/* ── Skills row ── */}
        <div className="about__skills" ref={tagsRef}>
          <p className="about__skills-label">Technical Skills</p>
          <div className="about__tags">
            {SKILLS.map(s => (
              <span key={s} className="tag about__tag">{s}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
