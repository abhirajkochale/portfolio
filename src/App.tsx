import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'

import Navbar from './components/Navbar'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import Footer from './components/Footer'
import ProgressBar from './components/ProgressBar'
import CustomCursor from './components/CustomCursor'
import GrainOverlay from './components/GrainOverlay'
import './index.css'

const Home = lazy(() => import('./pages/Home'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'))
const Work = lazy(() => import('./pages/Work'))
const WorkDetail = lazy(() => import('./pages/WorkDetail'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

export default function App() {
  const location = useLocation()

  useEffect(() => {
    // Disable smooth scrolling on touch devices natively through Lenis defaults
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Reset scroll on route change
    window.scrollTo(0, 0)

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
      lenis.destroy()
    }
  }, [location.pathname])

  return (
    <HelmetProvider>
      <Analytics />
      <GrainOverlay />
      <CustomCursor />
      <ProgressBar />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Suspense fallback={null}><Home /></Suspense>} />
            <Route path="/about" element={<Suspense fallback={null}><AboutPage /></Suspense>} />
            <Route path="/experience" element={<Suspense fallback={null}><ExperiencePage /></Suspense>} />
            <Route path="/work" element={<Suspense fallback={null}><Work /></Suspense>} />
            <Route path="/work/:slug" element={<Suspense fallback={null}><WorkDetail /></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={null}><ContactPage /></Suspense>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </HelmetProvider>
  )
}
