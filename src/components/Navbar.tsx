import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'About',      href: '/about'          },
  { label: 'Experience', href: '/experience'     },
  { label: 'Work',       href: '/work'           },
  { label: 'Contact',    href: '/contact'        },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => setScrolled(self.scroll() > 80),
    })
    return () => { st.kill() }
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

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <NavLink
          className="nav__logo"
          to="/"
          onClick={() => { if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          AK
        </NavLink>

        <div className="nav__right">
          <nav className="nav__links" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <NavLink
                key={href}
                to={href}
                className={({ isActive }) => `nav__link ${isActive ? 'active' : ''}`}
              >
                {label}
              </NavLink>
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
            className="nav__theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

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
            <NavLink
              key={href}
              to={href}
              className="nav-overlay__link"
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              {label}
            </NavLink>
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
