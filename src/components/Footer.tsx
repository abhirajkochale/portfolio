import './Footer.css'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__empty" aria-hidden="true" />
        
        <p className="footer__text">
          Designed &amp; Built by Abhiraj Kochale &bull; 2025
        </p>

        <div className="footer__btn-wrapper">
          <button 
            className="footer__top-btn" 
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            Back to top &uarr;
          </button>
        </div>
      </div>
    </footer>
  )
}
