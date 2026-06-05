import Experience from '../components/Experience'
import SkillsConstellation from '../components/SkillsConstellation'
import Certifications from '../components/Certifications'
import SEO from '../components/SEO'
import PageTransition from '../components/PageTransition'

export default function ExperiencePage() {
  return (
    <PageTransition>
      <SEO title="Experience — Abhiraj Kochale" />
      <div className="page-section" style={{ minHeight: '100vh' }}>
        <Experience />
      </div>
      <div className="page-section">
        <SkillsConstellation />
      </div>
      <div className="page-section">
        <Certifications />
      </div>
    </PageTransition>
  )
}
