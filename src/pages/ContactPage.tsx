import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import './ContactPage.css'

export default function ContactPage() {
  const pageRef  = useRef<HTMLDivElement>(null)
  const ctaRef   = useRef<HTMLHeadingElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Header entrance
      gsap.from('.contact-header .page-header__eyebrow', { opacity: 0, y: 16, duration: 0.8, delay: 0.1 })
      gsap.from('.contact-header .line', {
        yPercent: 110, duration: 1.2, ease: 'power4.out', stagger: 0.1, delay: 0.2,
      })

      // Word scrub on CTA heading
      if (ctaRef.current) {
        const split = new SplitType(ctaRef.current, { types: 'words' })
        gsap.fromTo(split.words,
          { color: 'var(--text-3)' },
          {
            color: 'var(--text)',
            stagger: 0.07,
            ease: 'none',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 78%',
              end: 'bottom 32%',
              scrub: 1.4,
            }
          }
        )
      }

      // Links + form slide up
      gsap.from('.cp-email', {
        opacity: 0, y: 36, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.cp-email', start: 'top 88%', once: true }
      })

      gsap.from('.cp-social__item', {
        opacity: 0, x: -24, stagger: 0.08, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.cp-social', start: 'top 88%', once: true }
      })

      gsap.from('.cp-form', {
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.cp-form', start: 'top 88%', once: true }
      })

    }, pageRef)

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
    <div className="contact-page page" ref={pageRef} id="contact">

      {/* Header */}
      <div className="contact-header page-header">
        <div className="page-header__eyebrow">Contact</div>
        <h1 className="page-header__title">
          <span className="line">Get in</span>
          <span className="line">touch.</span>
        </h1>
      </div>

      <div className="cp-inner section">

        {/* CTA heading */}
        <h2 className="cp-cta" ref={ctaRef}>
          let's collaborate.
        </h2>

        {/* Email */}
        <a href="mailto:kochaleabhiraj@gmail.com" className="cp-email">
          kochaleabhiraj@gmail.com
        </a>

        {/* Social links */}
        <div className="cp-social">
          <a
            href="https://github.com/abhirajkochale"
            target="_blank"
            rel="noopener noreferrer"
            className="cp-social__item"
          >
            <span className="cp-social__label">GitHub</span>
            <span className="cp-social__handle">@abhirajkochale ↗</span>
          </a>
          <a
            href="https://linkedin.com/in/abhiraj-kochale-543284309"
            target="_blank"
            rel="noopener noreferrer"
            className="cp-social__item"
          >
            <span className="cp-social__label">LinkedIn</span>
            <span className="cp-social__handle">abhiraj-kochale ↗</span>
          </a>
          <div className="cp-social__item cp-social__item--static">
            <span className="cp-social__label">Location</span>
            <span className="cp-social__handle">Mumbai, India</span>
          </div>
        </div>

        <hr className="cp-divider" />

        {/* Form */}
        <form className="cp-form" onSubmit={handleSubmit} noValidate>
          <div className="cp-form__label">Or send a direct message</div>

          <div className="cp-form__row">
            <div className="cp-form__field">
              <input
                type="text"
                className="cp-form__input"
                placeholder="Your Name"
                required
                aria-label="Your Name"
              />
            </div>
            <div className="cp-form__field">
              <input
                type="email"
                className="cp-form__input"
                placeholder="Your Email"
                required
                aria-label="Your Email"
              />
            </div>
          </div>

          <div className="cp-form__field cp-form__field--full">
            <textarea
              className="cp-form__input cp-form__input--area"
              placeholder="Tell me about your project..."
              required
              aria-label="Message"
            />
          </div>

          <button
            type="submit"
            className="cp-form__submit"
            disabled={status !== 'idle'}
          >
            {status === 'idle'
              ? 'Send Message →'
              : status === 'sending'
              ? 'Sending...'
              : 'Message Sent ✓'}
          </button>
        </form>

      </div>
    </div>
  )
}
