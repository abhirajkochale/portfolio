import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entrance sequence ──
      gsap.from('.hero__word', {
        yPercent: 108,
        duration: 1.4,
        ease: 'power4.out',
        stagger: 0.16,
        delay: 0.1,
      })

      gsap.from(['.hero__meta--top', '.hero__meta--bottom'], {
        opacity: 0,
        y: 16,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.85,
      })

      gsap.from(['.hero__edge--left', '.hero__edge--right'], {
        opacity: 0,
        duration: 1,
        delay: 1.4,
        ease: 'power2.out',
      })

      // ── Scroll scrub ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.6,
        },
      })

      tl.to('.hero__name-outer', { scale: 12, opacity: 0, ease: 'none' }, 0)
        .to('.hero__name-clip--1 .hero__word', { xPercent: -20, ease: 'none' }, 0)
        .to('.hero__name-clip--2 .hero__word', { xPercent: 20, ease: 'none' }, 0)
        .to('.hero__meta--top', { opacity: 0, y: -28, ease: 'none' }, 0)
        .to('.hero__meta--bottom', { opacity: 0, y: 28, ease: 'none' }, 0)
        .to('.hero__edge--left', { opacity: 0, ease: 'none' }, 0)
        .to('.hero__edge--right', { opacity: 0, ease: 'none' }, 0)
    }, heroRef)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      ctx.revert()
    }
  }, [])

  return (
    <section className="hero" ref={heroRef} id="hero">
      <div className="hero__pin">

        <div className="hero__edge hero__edge--left">Full-Stack Developer · KJ Somaiya</div>
        <div className="hero__edge hero__edge--right">Portfolio · 2026</div>

        {/* Top Row */}
        <div className="hero__meta hero__meta--top">
          <div className="hero__scroll-hint">
            Scroll to explore <span className="hero__scroll-arrow">↓</span>
          </div>
          <span>Mumbai, India</span>
        </div>

        {/* Name */}
        <div className="hero__name-outer">
          <div className="hero__name-clip hero__name-clip--1">
            <h1 className="hero__word">ABHIRAJ</h1>
          </div>
          <div className="hero__name-clip hero__name-clip--2">
            <span className="hero__word">
              KOCHALE<span className="hero__cursor" aria-hidden="true" />
            </span>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="hero__meta--bottom">
          <div className="hero__meta--bottom-left">
            <span className="hero__role">Full‑Stack Developer</span>
            <span className="hero__stack">React · Python · AI · TypeScript</span>
          </div>
          <span className="hero__location">Available for internships ↗</span>
        </div>

      </div>
    </section>
  )
}
