import Contact from '../components/Contact'
import SEO from '../components/SEO'
import PageTransition from '../components/PageTransition'

export default function ContactPage() {
  return (
    <PageTransition>
      <SEO title="Contact — Abhiraj Kochale" />
      <div className="page-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Contact />
      </div>
    </PageTransition>
  )
}
