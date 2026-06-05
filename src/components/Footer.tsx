import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__masthead" aria-hidden="true">
        <div className="footer__name">ABHIRAJ KOCHALE</div>
      </div>
      <div className="footer__bar">
        <span className="footer__copy">
          Designed &amp; Built by Abhiraj Kochale · 2026
        </span>
        <div className="footer__links">
          <a
            href="https://github.com/abhirajkochale"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/abhiraj-kochale-543284309"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
