import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Marquee from './components/Marquee'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProgressBar from './components/ProgressBar'
import './index.css'

export default function App() {
  return (
    <>
      <Analytics />
      <ProgressBar />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Marquee />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
