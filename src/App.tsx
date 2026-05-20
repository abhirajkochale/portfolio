import { useEffect, useRef } from 'react'
import { Analytics } from '@vercel/analytics/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

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
        // Set dynamic z-index to guarantee stacking order
        gsap.set(sec, { zIndex: i + 10 })

        ScrollTrigger.create({
          trigger: sec,
          start: () => (sec.offsetHeight <= window.innerHeight ? 'top top' : 'bottom bottom'),
          pin: true,
          pinSpacing: false,
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
