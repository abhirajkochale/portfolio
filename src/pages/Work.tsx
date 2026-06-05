import Projects from '../components/Projects'
import SEO from '../components/SEO'
import PageTransition from '../components/PageTransition'

export default function Work() {
  return (
    <PageTransition>
      <SEO title="Work — Abhiraj Kochale" />
      <div className="page-section" style={{ minHeight: '100vh', paddingTop: '80px' }}>
        <Projects />
      </div>
    </PageTransition>
  )
}
