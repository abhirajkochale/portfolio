import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

import SplitType from 'split-type'
import './Contact.css'

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const sectionRef = useRef<HTMLElement>(null)
  const ctaRef     = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow + email + chips
      gsap.from('.contact__top-el', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })

      // CTA word-by-word colour reveal (scrub)
      if (ctaRef.current) {
        const split = new SplitType(ctaRef.current, { types: 'words' })
        // Set initial colour to dim
        gsap.set(split.words, { color: 'var(--text-3)' })
        gsap.to(split.words, {
          color: 'var(--text)',
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 1,
          },
        })
      }

      // Form fields
      gsap.from('.contact__field', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.contact__form', start: 'top 85%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1200))
    setStatus('sent')
  }

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact__container">

        {/* Eyebrow */}
        <div className="s-eyebrow contact__top-el" style={{ justifyContent: 'center' }}>
          <span className="s-num">05</span>
          <span className="s-label">/ Contact</span>
        </div>

        {/* Giant CTA */}
        <h2 className="contact__cta" ref={ctaRef}>
          let's collaborate.
        </h2>

        {/* Email */}
        <a
          href="mailto:kochaleabhiraj@gmail.com"
          className="contact__email contact__top-el"
        >
          kochaleabhiraj@gmail.com
        </a>

        {/* Chips */}
        <div className="contact__chips contact__top-el">
          <a href="https://github.com/abhirajkochale" target="_blank" rel="noopener noreferrer" className="tag">
            GitHub ↗
          </a>
          <a href="https://linkedin.com/in/abhiraj-kochale-543284309" target="_blank" rel="noopener noreferrer" className="tag">
            LinkedIn ↗
          </a>
          <span className="tag">Mumbai, India</span>
        </div>

        {/* Form */}
        <form className="contact__form contact__top-el" onSubmit={handleSubmit} noValidate>
          <div className="contact__row">
            <div className="contact__field">
              <label htmlFor="c-name" className="contact__label">Name</label>
              <input
                id="c-name" name="name" type="text"
                className="contact__input"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                disabled={status === 'sent'}
              />
            </div>
            <div className="contact__field">
              <label htmlFor="c-email" className="contact__label">Email</label>
              <input
                id="c-email" name="email" type="email"
                className="contact__input"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
                disabled={status === 'sent'}
              />
            </div>
          </div>

          <div className="contact__field" style={{ marginTop: '24px' }}>
            <label htmlFor="c-msg" className="contact__label">Message</label>
            <textarea
              id="c-msg" name="message"
              className="contact__input contact__textarea"
              placeholder="What's on your mind?"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              disabled={status === 'sent'}
            />
          </div>

          <div className="contact__form-footer">
            <button
              type="submit"
              className="contact__submit"
              disabled={status === 'sending' || status === 'sent'}
            >
              {status === 'idle'    && 'SEND MESSAGE →'}
              {status === 'sending' && 'SENDING…'}
              {status === 'sent'    && '✓ SENT'}
              {status === 'error'   && 'TRY AGAIN'}
            </button>
            {status === 'sent' && (
              <p className="contact__success">Thanks! I'll get back to you soon.</p>
            )}
          </div>
        </form>

      </div>
    </section>
  )
}
