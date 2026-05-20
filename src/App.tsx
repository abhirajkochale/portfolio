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
      const sections = gsap.utils.toArray('.page-section')
      
      sections.forEach((sec: any, i) => {
        // Alternate slide in from left/right
        const xOffset = i % 2 === 0 ? -120 : 120

        gsap.from(sec, {
          opacity: 0,
          x: xOffset,
          scrollTrigger: {
            trigger: sec,
            start: 'top 95%',
            end: 'top 50%',
            scrub: 1,
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
