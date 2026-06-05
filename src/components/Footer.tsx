import { Link } from 'react-router-dom'
import Marquee from './Marquee'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <Marquee />
      <div className="footer__masthead" aria-hidden="true">
        <span className="footer__name">ABHIRAJ</span>
        <span className="footer__name">KOCHALE</span>
      </div>
      <div className="footer__bar">
        <span className="footer__copy">
          Designed &amp; Built by Abhiraj Kochale · 2026
        </span>
        <nav className="footer__links" aria-label="Footer navigation">
          <Link to="/work"    className="footer__link">Work</Link>
          <Link to="/about"   className="footer__link">About</Link>
          <Link to="/contact" className="footer__link">Contact</Link>
          <a
            href="https://github.com/abhirajkochale"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}
