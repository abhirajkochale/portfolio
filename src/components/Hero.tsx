import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance
      gsap.from('.hero__word', {
        yPercent: 105,
        duration: 1.3,
        ease: 'power4.out',
        stagger: 0.14,
        delay: 0.1,
      })
      gsap.from('.hero__meta', {
        opacity: 0,
        y: 14,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        delay: 0.9,
      })

      // Scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.4,
        },
      })

      tl.to('.hero__name-outer', {
        scale: 11,
        opacity: 0,
        ease: 'none',
      }, 0)
        .to('.hero__name-clip--1 .hero__word', {
          xPercent: -18,
          ease: 'none',
        }, 0)
        .to('.hero__name-clip--2 .hero__word', {
          xPercent: 18,
          ease: 'none',
        }, 0)
        .to('.hero__meta--top', {
          opacity: 0, y: -24,
          ease: 'none',
        }, 0)
        .to('.hero__meta--bottom', {
          opacity: 0, y: 24,
          ease: 'none',
        }, 0)
    }, heroRef)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      ctx.revert()
    }
  }, [])

  return (
    <section className="hero" ref={heroRef} id="hero">
      <div className="hero__pin">

        <div className="hero__meta hero__meta--top">
          <div className="hero__scroll-hint">
            Scroll to explore ↓
          </div>
        </div>

        <div className="hero__name-outer">
          <div className="hero__name-clip hero__name-clip--1">
            <h1 className="hero__word">ABHIRAJ</h1>
          </div>
          <div className="hero__name-clip hero__name-clip--2">
            <h1 className="hero__word">KOCHALE</h1>
          </div>
        </div>

        <div className="hero__meta hero__meta--bottom">
          <span className="hero__role">Full‑Stack Developer</span>
          <span className="hero__stack">React · Python · AI · TypeScript</span>
          <span className="hero__location">Mumbai, India</span>
        </div>

      </div>
    </section>
  )
}
