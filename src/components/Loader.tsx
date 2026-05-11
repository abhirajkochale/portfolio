import { useState, useEffect } from 'react'
import './Loader.css'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setHiding(true), 1200)
    const t2 = setTimeout(() => onDone(), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div className={`loader ${hiding ? 'loader--hide' : ''}`} aria-hidden="true">
      <div className="loader__inner">
        <span className="loader__logo">AK</span>
        <div className="loader__bar">
          <div className="loader__progress" />
        </div>
      </div>
    </div>
  )
}
