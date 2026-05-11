import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Navbar.css'
import ThemeToggle from './ThemeToggle'

const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [hidden, setHidden]       = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const menuRef  = useRef<HTMLDivElement>(null)

  /* Smart navbar: GSAP ScrollTrigger */
  useGSAP(() => {
    ScrollTrigger.create({
      start: 'top -80', // after scrolling past 80px
      onUpdate: (self) => {
        // Toggle backdrop blur based on scroll position
        setScrolled(self.scroll() > 40)
        
        // Hide/show logic
        if (self.direction === 1 && self.scroll() > 120) {
          // Scrolling down
          setHidden(true)
        } else {
          // Scrolling up
          setHidden(false)
        }
      }
    })
  }, [])

  /* Highlight active section via IntersectionObserver */
  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection('#' + entry.target.id)
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  /* Close menu on outside click */
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${hidden ? 'navbar--hidden' : ''}`}>
      <nav className="navbar__inner container" ref={menuRef}>
        {/* Logo */}
        <a
          className="navbar__logo"
          href="#hero"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          aria-label="Abhiraj Kochale — Back to top"
        >
          AK
        </a>

        {/* Desktop links */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                className={`navbar__link ${activeSection === href ? 'navbar__link--active' : ''}`}
                href={href}
                onClick={e => { e.preventDefault(); handleNavClick(href) }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <ThemeToggle />

        {/* CTA */}
        <a
          className="navbar__cta"
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume ↗
        </a>

        {/* Hamburger (mobile) */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`} aria-hidden={!menuOpen}>
        <ul role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                className={`navbar__drawer-link ${activeSection === href ? 'navbar__drawer-link--active' : ''}`}
                href={href}
                onClick={e => { e.preventDefault(); handleNavClick(href) }}
                tabIndex={menuOpen ? 0 : -1}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              className="navbar__drawer-cta"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={menuOpen ? 0 : -1}
            >
              Resume ↗
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
