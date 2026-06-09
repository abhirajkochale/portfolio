import { motion, useInView } from 'framer-motion';
import { personal } from '../data';
import { useRef } from 'react';

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} id="contact" className="relative w-full bg-bg-dark border-t border-border-dark py-16 md:py-20 overflow-hidden">

      {/* Soft Blob */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full opacity-15 pointer-events-none z-0 blur-[60px]"
        style={{ background: 'radial-gradient(circle, var(--color-pastel-purple) 0%, transparent 70%)' }} />

      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,3.5rem)] flex flex-col items-start text-left relative z-10">

        <div className="flex flex-col items-start">
          <motion.h2
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-body font-black text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-accent-inv tracking-tight uppercase"
          >
            LET'S BUILD
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-body font-black text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight uppercase"
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
    </section>
  );
}
