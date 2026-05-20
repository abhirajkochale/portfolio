import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


import './ProgressBar.css'

export default function ProgressBar() {
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        if (fillRef.current) {
          fillRef.current.style.height = `${self.progress * 100}%`
        }
      },
    })
    return () => st.kill()
  }, [])

  return (
    <div className="progress-bar" aria-hidden="true">
      <div className="progress-bar__fill" ref={fillRef} />
    </div>
  )
}
