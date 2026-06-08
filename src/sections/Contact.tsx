import { motion } from 'framer-motion';
import { personal } from '../data';
import { useReveal } from '../hooks/useReveal';

export default function Contact() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="contact" className="w-full bg-bg-soft border-t border-border py-[120px]" ref={ref as any}>
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,3.5rem)] flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center"
        >
          <h2 className="font-body font-black text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-text tracking-tight uppercase">
            Ready to
          </h2>
          <h2 
            className="font-body font-black text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight uppercase"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px var(--color-text)'
            }}
          >
            Together?
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <a 
            href={`mailto:${personal.email}`}
            className="font-mono text-[1rem] md:text-[1.2rem] text-accent relative pb-1 group overflow-hidden"
          >
            {personal.email}
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-accent -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </a>
          <p className="font-mono text-[0.8rem] text-muted">
            {personal.location}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-6 mt-16"
        >
          <a href={personal.github} target="_blank" rel="noreferrer" className="font-mono text-[0.8rem] text-muted hover:text-accent transition-colors tracking-[0.1em] uppercase">
            GitHub
          </a>
          <span className="text-muted">·</span>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="font-mono text-[0.8rem] text-muted hover:text-accent transition-colors tracking-[0.1em] uppercase">
            LinkedIn
          </a>
          <span className="text-muted">·</span>
          <a href={personal.resume} target="_blank" rel="noreferrer" className="font-mono text-[0.8rem] text-muted hover:text-accent transition-colors tracking-[0.1em] uppercase">
            Resume
          </a>
        </motion.div>
        
      </div>
    </section>
  );
}
