import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__left">
        Designed &amp; Built by Abhiraj Kochale &middot; 2026
      </div>
      <div className="footer__right">
        <a href="https://github.com/abhirajkochale" target="_blank" rel="noopener noreferrer" className="footer__link">
          GITHUB
        </a>
        <a href="https://linkedin.com/in/abhiraj-kochale-543284309" target="_blank" rel="noopener noreferrer" className="footer__link">
          LINKEDIN
        </a>
      </div>
    </footer>
  )
}
