import { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Background from './components/Background'

export default function App() {
  const [loading, setLoading] = useState(true)

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [loading])

  return (
    <>
      <Analytics />
      <Background />
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
      <Cursor />
    </>
  )
}
