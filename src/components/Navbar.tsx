import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'About',      href: '#about'          },
  { label: 'Experience', href: '#experience'     },
  { label: 'Work',       href: '#projects'       },
  { label: 'Contact',    href: '#contact'        },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [active,    setActive]    = useState('')
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => setScrolled(self.scroll() > 80),
    })
    return () => { st.kill() }
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href))
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id) }),
      { rootMargin: '-50% 0px -50% 0px' }
    )
    sections.forEach(s => s && obs.observe(s))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!overlayRef.current) return
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(overlayRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'cubic-bezier(0.76,0,0.24,1)' }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(overlayRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.7,
        ease: 'cubic-bezier(0.76,0,0.24,1)',
      })
    }
  }, [menuOpen])

  const go = (href: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 450)
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a
          className="nav__logo"
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          AK
        </a>

        <div className="nav__right">
          <nav className="nav__links" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className={`nav__link ${active === href ? 'active' : ''}`}
                onClick={e => { e.preventDefault(); go(href) }}
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            className="nav__cta"
            href="https://drive.google.com/file/d/1PBIsSSMcjQMXKFpYdFMTgW8a4ABVlHz8/view?usp=drive_open"
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé ↗
          </a>

          <button
            className={`nav__burger ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <div className="nav-overlay" ref={overlayRef} aria-hidden={!menuOpen}>
        <nav className="nav-overlay__links">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="nav-overlay__link"
              onClick={e => { e.preventDefault(); go(href) }}
              tabIndex={menuOpen ? 0 : -1}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          className="nav-overlay__cta"
          href="https://drive.google.com/file/d/1PBIsSSMcjQMXKFpYdFMTgW8a4ABVlHz8/view?usp=drive_open"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={menuOpen ? 0 : -1}
        >
          View Résumé ↗
        </a>
      </div>
    </>
  )
}
