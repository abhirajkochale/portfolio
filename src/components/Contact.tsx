import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import './Contact.css'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLHeadingElement>(null)
  
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ctaRef.current) {
        const split = new SplitType(ctaRef.current, { types: 'words' })
        gsap.fromTo(split.words,
          { color: 'var(--text-3)' },
          {
            color: 'var(--text)',
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 75%',
              end: 'bottom 35%',
              scrub: 1.2,
            }
          }
        )
      }

      gsap.from('.contact__email, .contact__chips, .contact__form', {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.contact__email',
          start: 'top 95%',
          end: 'top 50%',
          scrub: 1,
        }
      })
    }, sectionRef)
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      ctx.revert()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1500)
  }

  return (
    <section id="contact" className="section contact" ref={sectionRef}>
      
      <div className="eyebrow contact__eyebrow">
        <span className="eyebrow__num">05</span>
        <span className="eyebrow__sep">/</span>
        <span className="eyebrow__label">Contact</span>
      </div>

      <h2 className="contact__cta" ref={ctaRef}>
        let's collaborate.
      </h2>

      <a href="mailto:kochaleabhiraj@gmail.com" className="contact__email">
        kochaleabhiraj@gmail.com
      </a>

      <div className="contact__chips">
        <a href="https://github.com/abhirajkochale" target="_blank" rel="noopener noreferrer" className="tag">
          github.com/abhirajkochale ↗
        </a>
        <a href="https://linkedin.com/in/abhiraj-kochale-543284309" target="_blank" rel="noopener noreferrer" className="tag">
          LinkedIn ↗
        </a>
        <span className="tag" style={{ pointerEvents: 'none' }}>
          Mumbai, India
        </span>
      </div>

      <form className="contact__form" onSubmit={handleSubmit}>
        <div className="contact__form-row">
          <input type="text" className="contact__input" placeholder="Your Name" required />
          <input type="email" className="contact__input" placeholder="Your Email" required />
        </div>
        <textarea className="contact__input contact__input--area" placeholder="Tell me about your project..." required></textarea>
        
        <button type="submit" className="contact__submit" disabled={status !== 'idle'}>
          {status === 'idle' ? 'SEND MESSAGE →' : status === 'sending' ? 'SENDING...' : 'SENT ✓'}
        </button>
      </form>

    </section>
  )
}
