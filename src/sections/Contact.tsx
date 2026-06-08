import { motion, useInView } from 'framer-motion';
import { personal } from '../data';
import { useRef } from 'react';

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} id="contact" className="relative w-full bg-bg-dark border-t border-border-dark py-16 md:py-24 overflow-hidden">
      
      {/* Soft Blob */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full opacity-15 pointer-events-none z-0 blur-[60px]"
           style={{ background: 'radial-gradient(circle, var(--color-pastel-purple) 0%, transparent 70%)' }} />

      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,3.5rem)] flex flex-col items-center text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center"
        >
          <h2 className="font-body font-black text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-accent-inv tracking-tight uppercase">
            Ready to
          </h2>
          <h2 
            className="font-body font-black text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight uppercase"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px var(--color-accent-inv)'
            }}
          >
            Together?
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <a 
            href={`mailto:${personal.email}`}
            className="font-mono text-[1rem] md:text-[1.2rem] text-pastel-yellow border-b border-pastel-yellow/40 hover:border-pastel-yellow transition-colors pb-1"
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
          className="flex items-center gap-6 mt-16"
        >
          <a href={personal.github} target="_blank" rel="noreferrer" className="font-mono text-[0.8rem] tracking-[0.1em] uppercase transition-colors" style={{ color: '#6B6560' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-inv)'} onMouseLeave={(e) => e.currentTarget.style.color = '#6B6560'}>
            GitHub
          </a>
          <span style={{ color: '#6B6560' }}>·</span>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="font-mono text-[0.8rem] tracking-[0.1em] uppercase transition-colors" style={{ color: '#6B6560' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-inv)'} onMouseLeave={(e) => e.currentTarget.style.color = '#6B6560'}>
            LinkedIn
          </a>
          <span style={{ color: '#6B6560' }}>·</span>
          <a href={personal.resume} target="_blank" rel="noreferrer" className="font-mono text-[0.8rem] tracking-[0.1em] uppercase transition-colors" style={{ color: '#6B6560' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-inv)'} onMouseLeave={(e) => e.currentTarget.style.color = '#6B6560'}>
            Resume
          </a>
        </motion.div>
        
      </div>
    </section>
  );
}
