import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import './Hero.css'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entrance animation (on load, once) ──────────
      gsap.from('.hero__word', {
        yPercent: 110,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 0.2,
      })
      gsap.from(['.hero__top-line', '.hero__bottom-line'], {
        opacity: 0,
        y: 12,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
        delay: 0.9,
      })

      // ── Scroll scrub ────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      })

      tl.to('.hero__name-wrap', { scale: 12, opacity: 0, ease: 'none' }, 0)
        .to('.hero__name-row--1', { x: '-8vw', ease: 'none' }, 0)
        .to('.hero__name-row--2', { x: '8vw',  ease: 'none' }, 0)
        .to('.hero__top-line',    { opacity: 0, y: -20, ease: 'none' }, 0)
        .to('.hero__bottom-line', { opacity: 0, y: 20,  ease: 'none' }, 0)
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={heroRef} id="hero">
      <div className="hero__pin">

        {/* Top info bar */}
        <div className="hero__top-line">
          <span className="hero__avail">
            <span className="hero__dot" aria-hidden="true" />
            Available for internships
          </span>
          <span className="hero__year">2026</span>
        </div>

        {/* Name — centred, will scrub out */}
        <div className="hero__name-wrap" aria-label="Abhiraj Kochale">
          <div className="hero__name-row hero__name-row--1">
            <div className="hero__word-clip">
              <span className="hero__word">ABHIRAJ</span>
            </div>
          </div>
          <div className="hero__name-row hero__name-row--2">
            <div className="hero__word-clip">
              <span className="hero__word">KOCHALE</span>
            </div>
          </div>
        </div>

        {/* Bottom info bar */}
        <div className="hero__bottom-line">
          <span className="hero__role">Full‑Stack Developer</span>
          <span className="hero__stack">React · Python · AI · TypeScript</span>
        </div>

      </div>
    </section>
  )
}
