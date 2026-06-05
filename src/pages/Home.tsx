import Hero from '../components/Hero'
import SEO from '../components/SEO'
import PageTransition from '../components/PageTransition'

export default function Home() {
  return (
    <PageTransition>
      <SEO title="Abhiraj Kochale — Full Stack Developer & ML Engineer" />
      <Hero />
    </PageTransition>
  )
}
