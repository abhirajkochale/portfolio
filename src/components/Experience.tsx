import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './Experience.css'

// ── Data ─────────────────────────────────────────────────────────────

const EXP = [
  {
    index: '01',
    role: 'Machine Learning Intern',
    company: 'Wayspire Ed-Tech Pvt Ltd',
    date: 'Jun 2025 — Aug 2025',
    location: 'Remote',
    type: 'Internship',
    description:
      'Built ML models for text classification and introductory CV tasks using OpenCV and Scikit-learn. Trained, evaluated, and deployed classification pipelines on real educational datasets.',
    tags: ['Python', 'ML', 'OpenCV', 'Scikit-learn'],
    metrics: [
      { name: 'Model Accuracy',       value: 78, pct: '78%' },
      { name: 'Feature Engineering',  value: 85, pct: '85%' },
      { name: 'Pipeline Speed',       value: 65, pct: '65%' },
    ],
  },
  {
    index: '02',
    role: 'Social Media Manager',
    company: 'Awesome Kids International Preschool',
    date: '2024 — Present',
    location: 'Mumbai',
    type: 'Part-time',
    description:
      'Grew Instagram engagement by 30%+ through consistent content strategy and creative campaigns. Managed brand voice, visual identity, and posting cadence to increase organic reach significantly.',
    tags: ['Content Strategy', 'Instagram', 'Analytics'],
    metrics: [
      { name: 'Engagement Growth', value: 82, pct: '82%' },
      { name: 'Organic Reach',     value: 70, pct: '70%' },
      { name: 'Content Quality',   value: 90, pct: '90%' },
    ],
  },
  {
    index: '03',
    role: 'Marketing Team Member',
    company: 'SMLRA',
    date: 'Oct 2025 — Present',
    location: 'Mumbai',
    type: 'Volunteer',
    description:
      'Supported sponsorship outreach and event marketing for ML workshops and community initiatives. Coordinated with external partners and contributed to growing the local ML community across Mumbai.',
    tags: ['Marketing', 'Outreach', 'ML Events'],
    metrics: [
      { name: 'Sponsor Acquisition', value: 55, pct: '55%' },
      { name: 'Event Coverage',      value: 75, pct: '75%' },
      { name: 'Partner Outreach',    value: 62, pct: '62%' },
    ],
  },
]

// ── Component ─────────────────────────────────────────────────────────

export default function Experience() {
  const sectionRef  = useRef<HTMLElement>(null)
  const pinRef      = useRef<HTMLDivElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const fillRef     = useRef<HTMLDivElement>(null)
  const dotRef      = useRef<HTMLDivElement>(null)
  const stRef       = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    // Bail out on mobile (handled via CSS fallback)
    if (window.matchMedia('(max-width: 900px)').matches) return

    const section = sectionRef.current
    const pin     = pinRef.current
    const track   = trackRef.current
    const fill    = fillRef.current
    const dot     = dotRef.current
    if (!section || !pin || !track || !fill || !dot) return

    const N    = EXP.length
    const panelW = window.innerWidth
    const totalScroll = panelW * (N - 1) // px to travel horizontally

    // Give the outer section enough height for the pin travel
    section.style.height = `calc(100vh + ${totalScroll}px)`

    const ctx = gsap.context(() => {

      // ── Section heading clip-path reveal ──
      gsap.fromTo('.experience .section-heading',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.experience .section-heading',
            start: 'top 80%',
            once: true,
          }
        }
      )

      // ── Main horizontal scroll ──
      stRef.current = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end:   `+=${totalScroll}`,
        pin:   pin,
        anticipatePin: 1,
        scrub: 1.2,
        onUpdate(self) {
          // Translate track
          gsap.set(track, { x: -self.progress * totalScroll })

          // Timeline fill + dot
          if (fill) fill.style.width = `${self.progress * 100}%`
          if (dot)  dot.style.left   = `${self.progress * 100}%`

          // Determine which panel is most visible, activate bar fills
          const panelIdx = Math.round(self.progress * (N - 1))
          document.querySelectorAll('.exp-panel').forEach((panel, i) => {
            panel.classList.toggle('is-active', i === panelIdx)
          })
        },
      })

    }, section)

    return () => {
      stRef.current?.kill()
      ctx.revert()
      if (section) section.style.height = ''
    }
  }, [])

  return (
    <section
      id="experience"
      className="section experience exp-h-section"
      ref={sectionRef}
    >
      {/* Pin box — sticky container */}
      <div className="exp-h-pin" ref={pinRef}>

        {/* Section eyebrow + heading */}
        <div className="exp-h-header">
          <div className="eyebrow">
            <span className="eyebrow__num">02</span>
            <span className="eyebrow__sep">/</span>
            <span className="eyebrow__label">Experience</span>
          </div>
          <h2 className="section-heading">The journey so far.</h2>
        </div>

        {/* Horizontal track */}
        <div className="exp-track" ref={trackRef}>
          {EXP.map((e, panelIdx) => (
            <div
              className={`exp-panel ${panelIdx === 0 ? 'is-active' : ''}`}
              key={e.index}
            >
              {/* Giant faded BG number */}
              <div className="exp-panel__bg-num" aria-hidden="true">
                {e.index}
              </div>

              {/* Left: role info */}
              <div className="exp-panel__left">
                <div className="exp-panel__index">{e.index} / {EXP.length.toString().padStart(2, '0')}</div>
                <div className="exp-panel__role">{e.role}</div>
                <div className="exp-panel__company">{e.company}</div>
                <div className="exp-panel__meta">
                  <span>{e.date}</span>
                  <span>·</span>
                  <span>{e.location}</span>
                  <span>·</span>
                  <span>{e.type}</span>
                </div>
              </div>

              {/* Right: description + tags + chart */}
              <div className="exp-panel__right">
                <p className="exp-panel__desc">{e.description}</p>

                <div className="exp-panel__tags">
                  {e.tags.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>

                {/* Vertical bar chart */}
                <div className="exp-chart">
                  <div className="exp-chart__label">Contribution Metrics</div>
                  {e.metrics.map(m => (
                    <div className="exp-bar" key={m.name}>
                      <div className="exp-bar__name">{m.name}</div>
                      <div className="exp-bar__track">
                        <div
                          className="exp-bar__fill"
                          style={{ width: `${m.value}%`, transform: 'scaleX(0)' }}
                        />
                      </div>
                      <div className="exp-bar__pct">{m.pct}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Horizontal timeline */}
        <div className="exp-h-timeline">
          <div className="exp-h-timeline__fill" ref={fillRef} />
          <div className="exp-h-timeline__dot"  ref={dotRef}  />
          {/* Tick marks at each panel boundary */}
          {EXP.map((_, i) => (
            <div
              key={i}
              className="exp-h-timeline__tick"
              style={{ left: `${(i / (EXP.length - 1)) * 100}%` }}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="exp-h-indicator">
          Scroll to explore
          <span className="exp-h-indicator__arrow">→</span>
        </div>

      </div>
    </section>
  )
}
