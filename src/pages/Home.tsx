import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import Marquee from '../components/Marquee'
import './Home.css'

export default function Home() {
  const heroRef    = useRef<HTMLElement>(null)
  const introRef   = useRef<HTMLDivElement>(null)
  const featRef    = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero entrance ──
      gsap.from('.home-hero__word', {
        yPercent: 110,
        duration: 1.5,
        ease: 'power4.out',
        stagger: 0.18,
        delay: 0.1,
      })

      gsap.from(['.home-hero__top', '.home-hero__bottom'], {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.8,
      })

      gsap.from(['.home-hero__edge--l', '.home-hero__edge--r'], {
        opacity: 0,
        duration: 1,
        delay: 1.5,
      })

      // ── Hero scroll scrub ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.home-hero',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.8,
        }
      })

      tl.to('.home-hero__name', { scale: 14, opacity: 0, ease: 'none' }, 0)
        .to('.home-hero__clip--1 .home-hero__word', { xPercent: -18, ease: 'none' }, 0)
        .to('.home-hero__clip--2 .home-hero__word', { xPercent: 18, ease: 'none' }, 0)
        .to('.home-hero__top',    { opacity: 0, y: -30, ease: 'none' }, 0)
        .to('.home-hero__bottom', { opacity: 0, y: 30,  ease: 'none' }, 0)
        .to('.home-hero__edge--l', { opacity: 0, ease: 'none' }, 0)
        .to('.home-hero__edge--r', { opacity: 0, ease: 'none' }, 0)

      // ── Intro ──
      if (introRef.current) {
        const split = new SplitType(introRef.current.querySelector('.home-intro__text')!, { types: 'lines' })
        gsap.from(split.lines, {
          yPercent: 110,
          opacity: 0,
          stagger: 0.08,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 80%',
            once: true,
          }
        })
      }

      gsap.from('.home-intro__link', {
        opacity: 0,
        y: 16,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.home-intro__link',
          start: 'top 88%',
          once: true,
        }
      })

      // ── Featured project ──
      gsap.fromTo('.home-feat__card',
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.home-feat__card',
            start: 'top 84%',
            once: true,
          }
        }
      )

      gsap.from('.home-feat__details > *', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.home-feat__details',
          start: 'top 85%',
          once: true,
        }
      })

    }, heroRef)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      ctx.revert()
    }
  }, [])

  return (
    <main ref={heroRef} className="home">

      {/* ── Hero ── */}
      <section className="home-hero" id="hero">
        <div className="home-hero__pin">

          <div className="home-hero__edge home-hero__edge--l">Full-Stack Developer · KJ Somaiya</div>
          <div className="home-hero__edge home-hero__edge--r">Portfolio · 2026</div>

          {/* Top meta */}
          <div className="home-hero__top">
            <div className="home-hero__scroll">
              Scroll to explore
              <span className="home-hero__arrow">↓</span>
            </div>
            <div className="home-hero__avail">
              <span className="home-hero__dot" />
              Available for internships
            </div>
          </div>

          {/* Name */}
          <div className="home-hero__name">
            <div className="home-hero__clip home-hero__clip--1">
              <h1 className="home-hero__word">ABHIRAJ</h1>
            </div>
            <div className="home-hero__clip home-hero__clip--2">
              <span className="home-hero__word">
                KOCHALE<span className="home-hero__cursor" aria-hidden />
              </span>
            </div>
          </div>

          {/* Bottom meta */}
          <div className="home-hero__bottom">
            <div className="home-hero__bottom-l">
              <span className="home-hero__role">Full‑Stack Developer</span>
              <span className="home-hero__stack">React · Python · AI · TypeScript</span>
            </div>
            <span className="home-hero__location">Mumbai, India</span>
          </div>

        </div>
      </section>

      {/* ── Intro strip ── */}
      <div className="home-intro" ref={introRef}>
        <div className="home-intro__inner">
          <p className="home-intro__text">
            I'm Abhiraj — a Computer Engineering student at KJ&nbsp;Somaiya building production-ready web apps and integrating AI into real products. Things used by real people.
          </p>
          <div className="home-intro__actions">
            <Link to="/about" className="home-intro__link cta-link">
              About me →
            </Link>
            <a
              href="https://drive.google.com/file/d/1PBIsSSMcjQMXKFpYdFMTgW8a4ABVlHz8/view?usp=drive_open"
              target="_blank"
              rel="noopener noreferrer"
              className="home-intro__link cta-link"
            >
              Résumé ↗
            </a>
          </div>
        </div>
      </div>

      {/* ── Marquee strip ── */}
      <Marquee />

      {/* ── Featured project ── */}
      <section className="home-feat" ref={featRef}>
        <div className="home-feat__inner">
          <div className="home-feat__label">
            <span className="home-feat__num">01</span>
            Featured Project
          </div>

          <article className="home-feat__card">
            <div className="home-feat__card-bg" aria-hidden />
            <div className="home-feat__details">
              <h2 className="home-feat__title">Parent Portal</h2>
              <div className="home-feat__cat">Preschool Management System</div>
              <p className="home-feat__desc">
                Full-stack multi-role portal for parents, admins, and teachers. Live in production with role-based access control, real-time data, and a clean admin dashboard.
              </p>
              <div className="home-feat__tags">
                {['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RBAC'].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <div className="home-feat__stats">
                <div className="home-feat__stat">
                  <span className="home-feat__stat-num">150+</span>
                  <span className="home-feat__stat-label">Active Users</span>
                </div>
                <div className="home-feat__stat">
                  <span className="home-feat__stat-num">80+</span>
                  <span className="home-feat__stat-label">Admissions</span>
                </div>
              </div>
              <div className="home-feat__footer">
                <a
                  href="https://awesomekids-parents-portal.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-feat__cta"
                >
                  View Live Demo ↗
                </a>
              </div>
            </div>
          </article>

          <div className="home-feat__more">
            <Link to="/work" className="home-feat__all">
              View all projects
              <span className="home-feat__all-arrow">→</span>
            </Link>
            <span className="home-feat__count">(4 total)</span>
          </div>
        </div>
      </section>

    </main>
  )
}
