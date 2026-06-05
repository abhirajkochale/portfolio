import About from '../components/About'
import SEO from '../components/SEO'
import PageTransition from '../components/PageTransition'

export default function AboutPage() {
  return (
    <PageTransition>
      <SEO title="About — Abhiraj Kochale" />
      <div className="page-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <About />
      </div>
    </PageTransition>
  )
}
