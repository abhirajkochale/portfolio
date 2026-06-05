import { useEffect, useRef } from 'react'
import { Analytics } from '@vercel/analytics/react'
import gsap from 'gsap'

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
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('.page-section')

      sections.forEach((sec) => {
        gsap.from(sec, {
          opacity: 0,
          y: 64,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 90%',
            once: true,
          }
        })
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <Analytics />
      <ProgressBar />
      <Navbar />
      <main ref={mainRef}>
        <Hero />
        <div className="page-section"><About /></div>
        <div className="page-section"><Experience /></div>
        <div className="page-section"><Projects /></div>
        <div className="page-section"><Marquee /></div>
        <div className="page-section"><Certifications /></div>
        <div className="page-section"><Contact /></div>
      </main>
      <Footer />
    </>
  )
}
