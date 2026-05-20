import { useEffect } from 'react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './ProgressBar.css'

export default function ProgressBar() {
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const bar = document.getElementById('progress')
        if (bar) bar.style.height = (self.progress * 100) + '%'
      }
    })
    return () => { st.kill() }
  }, [])

  return (
    <div className="progress-track" aria-hidden="true">
      <div className="progress-fill" id="progress"></div>
    </div>
  )
}
