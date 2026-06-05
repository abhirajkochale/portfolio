import './ProgressBar.css'
import { useEffect } from 'react'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function ProgressBar() {
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const bar = document.getElementById('progress-fill')
        if (bar) bar.style.transform = `scaleX(${self.progress})`
      }
    })
    return () => { st.kill() }
  }, [])

  return (
    <div className="progress-track" aria-hidden="true">
      <div className="progress-fill" id="progress-fill" />
    </div>
  )
}
