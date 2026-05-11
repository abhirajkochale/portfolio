import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './Contact.css'

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Header reveals
    gsap.from('.contact__label', { scrollTrigger: { trigger: containerRef.current, start: 'top 85%' }, x: -40, opacity: 0, duration: 0.8, ease: 'power3.out' })
    gsap.from('.contact__heading', { scrollTrigger: { trigger: containerRef.current, start: 'top 85%' }, clipPath: 'inset(100% 0 0 0)', y: 40, duration: 0.9, ease: 'power3.out' })
    gsap.from('.contact__subtitle', { scrollTrigger: { trigger: containerRef.current, start: 'top 85%' }, y: 20, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' })

    // Stagger content (email, socials, form)
    gsap.from('.contact__stagger', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    })
  }, { scope: containerRef })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    /* Wire up to Formspree / EmailJS when ready */
    await new Promise(r => setTimeout(r, 1200))
    setStatus('sent')
  }

  return (
    <section id="contact" className="section contact" ref={containerRef}>
      <div className="container">

        {/* ── Header ── */}
        <div className="contact__header">
          <div className="contact__label">
            <span className="contact__label-line" />
            <span>CONTACT</span>
          </div>
          <h2 className="contact__heading">Let's Connect</h2>
          <p className="contact__subtitle">
            Open to internships, collaborations, and cool ideas.
          </p>
        </div>

        {/* ── Email CTA ── */}
        <a href="mailto:kochaleabhiraj@gmail.com" className="contact__email-cta contact__stagger">
          kochaleabhiraj@gmail.com
          <span className="contact__email-arrow">↗</span>
        </a>

        {/* ── Social links ── */}
        <div className="contact__socials contact__stagger">
          <a href="https://github.com/abhirajkochale"
            target="_blank" rel="noopener noreferrer"
            className="contact__social-item">
            <GithubIcon />
            <div>
              <p className="contact__social-label">GitHub</p>
              <p className="contact__social-value">github.com/abhirajkochale</p>
            </div>
          </a>

          <a href="https://linkedin.com/in/abhiraj-kochale-543284309"
            target="_blank" rel="noopener noreferrer"
            className="contact__social-item">
            <LinkedinIcon />
            <div>
              <p className="contact__social-label">LinkedIn</p>
              <p className="contact__social-value">Abhiraj Kochale</p>
            </div>
          </a>

          <div className="contact__social-item contact__social-item--no-link">
            <LocationIcon />
            <div>
              <p className="contact__social-label">Location</p>
              <p className="contact__social-value">Mumbai, India</p>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="contact__divider contact__stagger">
          <span>or send a message</span>
        </div>

        {/* ── Contact form ── */}
        <form className="contact__form contact__stagger" onSubmit={handleSubmit} noValidate>
          <div className="contact__form-row">
            <div className="contact__field">
              <label htmlFor="c-name" className="contact__field-label">Name</label>
              <input id="c-name" name="name" type="text"
                className="contact__input" placeholder="Your name"
                value={form.name} onChange={handleChange}
                required disabled={status === 'sent'} />
            </div>
            <div className="contact__field">
              <label htmlFor="c-email" className="contact__field-label">Email</label>
              <input id="c-email" name="email" type="email"
                className="contact__input" placeholder="your@email.com"
                value={form.email} onChange={handleChange}
                required disabled={status === 'sent'} />
            </div>
          </div>

          <div className="contact__field">
            <label htmlFor="c-message" className="contact__field-label">Message</label>
            <textarea id="c-message" name="message"
              className="contact__input contact__textarea"
              placeholder="What's on your mind?" rows={5}
              value={form.message} onChange={handleChange}
              required disabled={status === 'sent'} />
          </div>

          <div className="contact__form-footer">
            <button type="submit" className="contact__submit"
              disabled={status === 'sending' || status === 'sent'}>
              {status === 'sending' && <span className="contact__spinner" aria-hidden="true" />}
              {status === 'idle'    && 'Send Message →'}
              {status === 'sending' && 'Sending…'}
              {status === 'sent'    && '✓ Sent!'}
              {status === 'error'   && 'Try Again'}
            </button>

            {status === 'sent' && (
              <p className="contact__success">
                Thanks! I'll get back to you soon. 🎉
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

/* ── Icons ── */
function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}
function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}
function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  )
}
