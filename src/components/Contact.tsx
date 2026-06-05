import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import './Contact.css'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const ctaRef     = useRef<HTMLHeadingElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-light scrub on heading
      if (ctaRef.current) {
        const split = new SplitType(ctaRef.current, { types: 'words' })
        gsap.fromTo(split.words,
          { color: 'var(--text-3)' },
          {
            color: 'var(--text)',
            stagger: 0.08,
            ease: 'none',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 78%',
              end: 'bottom 30%',
              scrub: 1.4,
            }
          }
        )
      }

      // Email + chips slide up
      gsap.from(['.contact__email-display', '.contact__chips'], {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact__email-display',
          start: 'top 88%',
          once: true,
        }
      })

      // Form slides up
      gsap.from('.contact__form', {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact__form',
          start: 'top 90%',
          once: true,
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

      {/* Email */}
      <div className="contact__email-display">
        <a href="mailto:kochaleabhiraj@gmail.com" className="contact__email-link">
          kochaleabhiraj@gmail.com
        </a>
      </div>

      {/* Social chips */}
      <div className="contact__chips">
        <a
          href="https://github.com/abhirajkochale"
          target="_blank"
          rel="noopener noreferrer"
          className="tag"
        >
          github.com/abhirajkochale ↗
        </a>
        <a
          href="https://linkedin.com/in/abhiraj-kochale-543284309"
          target="_blank"
          rel="noopener noreferrer"
          className="tag"
        >
          LinkedIn ↗
        </a>
        <span className="tag" style={{ pointerEvents: 'none', cursor: 'default' }}>
          Mumbai, India
        </span>
      </div>

      <hr className="contact__divider" />

      {/* Form */}
      <form className="contact__form" onSubmit={handleSubmit}>
        <div className="contact__form-label">Or send a message directly</div>

        <div className="contact__form-row">
          <div className="contact__input-wrap">
            <input
              type="text"
              className="contact__input"
              placeholder="Your Name"
              required
              aria-label="Your Name"
            />
          </div>
          <div className="contact__input-wrap">
            <input
              type="email"
              className="contact__input"
              placeholder="Your Email"
              required
              aria-label="Your Email"
            />
          </div>
        </div>

        <div className="contact__form-bottom">
          <div className="contact__input-wrap">
            <textarea
              className="contact__input contact__input--area"
              placeholder="Tell me about your project..."
              required
              aria-label="Message"
            />
          </div>
        </div>

        <button
          type="submit"
          className="contact__submit"
          disabled={status !== 'idle'}
        >
          {status === 'idle'
            ? 'Send Message →'
            : status === 'sending'
            ? 'Sending...'
            : 'Message Sent ✓'}
        </button>
      </form>

    </section>
  )
}
