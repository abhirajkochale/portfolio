import { motion, useInView } from 'framer-motion';
import { personal } from '../data';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      });
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative w-full bg-bg-dark border-t border-border-dark py-16 md:py-20 overflow-hidden">

      {/* Soft Blob */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full opacity-15 pointer-events-none z-0 blur-[60px]"
        style={{ background: 'radial-gradient(circle, var(--color-pastel-purple) 0%, transparent 70%)' }} />

      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,3.5rem)] grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 relative z-10">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col items-start text-left w-full h-full">
          <div className="flex flex-col items-start">
            <motion.h2
              initial={{ opacity: 0, x: -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-body font-black text-[clamp(2.5rem,10vw,4rem)] md:text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.95] text-accent-inv tracking-tight uppercase"
            >
              LET'S BUILD
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-body font-black text-[clamp(2.5rem,10vw,4rem)] md:text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.95] tracking-tight uppercase"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1.5px var(--accent-inv)'
              }}
            >
              TOGETHER.
            </motion.h2>
          </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex flex-col items-start gap-4 pt-12 border-t w-full"
          style={{ borderColor: '#2C2825' }}
        >
          <a
            href={`mailto:${personal.email}`}
            className="font-mono text-[1.3rem] text-pastel-yellow border-b border-pastel-yellow/40 hover:border-pastel-yellow transition-colors pb-1"
          >
            {personal.email}
          </a>
          <p className="font-mono text-[0.8rem]" style={{ color: '#A8A29E' }}>
            {personal.location}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center gap-4 md:gap-6 mt-16"
        >
          <a href={personal.github} target="_blank" rel="noreferrer" className="font-mono text-[0.95rem] tracking-[0.1em] uppercase transition-colors" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-inv)'} onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
            GitHub
          </a>
          <span style={{ color: '#9CA3AF' }}>·</span>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="font-mono text-[0.95rem] tracking-[0.1em] uppercase transition-colors" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-inv)'} onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
            LinkedIn
          </a>
          <span style={{ color: '#9CA3AF' }}>·</span>
          <a href="https://drive.google.com/file/d/17vhsogk_DDxe4Jx1uIzZX9m30BVMXis0/view" target="_blank" rel="noreferrer" className="font-mono text-[0.95rem] tracking-[0.1em] uppercase transition-colors" style={{ color: '#9CA3AF' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-inv)'} onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
            Resume
          </a>
        </motion.div>
        </div>

        {/* RIGHT COLUMN: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col justify-center w-full"
        >
          {isSubmitted ? (
            <div className="p-8 rounded-[12px] bg-[rgba(255,255,255,0.07)] border border-white/20 text-center">
              <h3 className="font-body text-xl text-white mb-2">Message sent!</h3>
              <p className="font-mono text-sm text-white/70">I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              <input 
                type="text" 
                name="name"
                required 
                placeholder="Your name" 
                className="w-full bg-[rgba(255,255,255,0.07)] border border-white/50 rounded-[8px] px-4 py-3 font-mono text-[0.9rem] text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
              />
              <input 
                type="email" 
                name="email"
                required 
                placeholder="your@email.com" 
                className="w-full bg-[rgba(255,255,255,0.07)] border border-white/50 rounded-[8px] px-4 py-3 font-mono text-[0.9rem] text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
              />
              <textarea 
                name="message"
                required 
                rows={4}
                placeholder="What are you building?" 
                className="w-full bg-[rgba(255,255,255,0.07)] border border-white/50 rounded-[8px] px-4 py-3 font-mono text-[0.9rem] text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors resize-none"
              ></textarea>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full sm:w-auto self-start px-6 py-3 font-mono text-[0.9rem] uppercase tracking-wider text-white border border-white rounded-[8px] hover:bg-white hover:text-black transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
