import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import './Navbar.css'

const LINKS = [
  { label: 'Work',    to: '/work'    },
  { label: 'About',   to: '/about'   },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }, [location.pathname])

  useEffect(() => {
    const overlay = document.querySelector('.nav-overlay') as HTMLElement
    if (!overlay) return
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(overlay,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'cubic-bezier(0.76,0,0.24,1)' }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(overlay, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.65,
        ease: 'cubic-bezier(0.76,0,0.24,1)',
      })
    }
  }, [menuOpen])

  const isActive = (to: string) => location.pathname === to

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <Link to="/" className="nav__logo" aria-label="Home">
          AK
        </Link>

        <div className="nav__right">
          <nav className="nav__links" aria-label="Main navigation">
            {LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`nav__link ${isActive(to) ? 'nav__link--active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <a
            className="nav__resume"
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

      {/* Mobile overlay */}
      <div className="nav-overlay" aria-hidden={!menuOpen}>
        <div className="nav-overlay__inner">
          <nav className="nav-overlay__links">
            {LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="nav-overlay__link"
                tabIndex={menuOpen ? 0 : -1}
              >
                {label}
              </Link>
            ))}
          </nav>
          <a
            className="nav-overlay__resume"
            href="https://drive.google.com/file/d/1PBIsSSMcjQMXKFpYdFMTgW8a4ABVlHz8/view?usp=drive_open"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? 0 : -1}
          >
            View Résumé ↗
          </a>
          <div className="nav-overlay__meta">
            <span>Mumbai, India</span>
            <span>Full-Stack Developer</span>
          </div>
        </div>
      </div>
    </>
  )
}
