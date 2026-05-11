import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './SectionLabel.css'

interface SectionLabelProps {
  number: string
  title: string
  subtitle?: string
}

export default function SectionLabel({ number, title, subtitle }: SectionLabelProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Small label header: slide in from left
    gsap.from('.gsap-label-header', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
      },
      x: -40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })

    // Big heading: clip reveal
    gsap.from('.gsap-clip-title', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
      },
      clipPath: 'inset(100% 0 0 0)',
      y: 40,
      duration: 0.9,
      ease: 'power3.out'
    })

    if (subtitle) {
      gsap.from('.gsap-fade-subtitle', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      })
    }
  }, { scope: containerRef })

  return (
    <div className="section-label" ref={containerRef}>
      <div className="section-label__header gsap-label-header">
        <span className="section-label__number">{number}</span>
        <div className="section-label__line" />
      </div>
      <h2 className="section-label__title gsap-clip-title">{title}</h2>
      {subtitle && <p className="section-label__subtitle gsap-fade-subtitle">{subtitle}</p>}
    </div>
  )
}
