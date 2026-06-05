import { useEffect, useState } from 'react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './ProgressBar.css'

export default function ProgressBar() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        // Update horizontal progress bar
        const bar = document.getElementById('progress-fill')
        if (bar) bar.style.width = (self.progress * 100) + '%'

        // Update percentage text
        const currentPct = Math.round(self.progress * 100)
        setPct(currentPct)
        
        // Show indicator only when scrolled past 2% to avoid showing it while sitting at the top hero
        const indicator = document.getElementById('scroll-pct')
        if (indicator) {
          if (self.progress > 0.02 && self.progress < 0.99) {
            indicator.classList.add('is-visible')
          } else {
            indicator.classList.remove('is-visible')
          }
        }
      }
    })
    
    return () => { st.kill() }
  }, [])

  return (
    <>
      <div className="progress-track" aria-hidden="true">
        <div className="progress-fill" id="progress-fill"></div>
      </div>
      
      <div className="scroll-pct" id="scroll-pct" aria-hidden="true">
        {pct}%
      </div>
    </>
  )
}
