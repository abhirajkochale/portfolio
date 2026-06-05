import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import Navbar      from './components/Navbar'
import Footer      from './components/Footer'
import ProgressBar from './components/ProgressBar'
import Cursor      from './components/Cursor'

import Home        from './pages/Home'
import Work        from './pages/Work'
import AboutPage   from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

import './index.css'

// Reset scroll position + ScrollTrigger on every route change
function ScrollReset() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.getAll().forEach(t => t.kill())
    ScrollTrigger.refresh()
  }, [location.pathname])

  return null
}

// Page entrance animation
function PageEntrance() {
  const location = useLocation()

  useEffect(() => {
    const el = document.querySelector('main, .page') as HTMLElement
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', clearProps: 'all' }
    )
  }, [location.pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <Cursor />
      <ProgressBar />
      <Navbar />
      <ScrollReset />
      <PageEntrance />

      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/work"    element={<Work />} />
        <Route path="/about"   element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}
