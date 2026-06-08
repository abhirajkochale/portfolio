import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { experience } from '../data';

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const titleWords = "Where I've Worked".split(" ");

  return (
    <section ref={sectionRef} id="experience" className="w-full bg-bg py-16 md:py-24 border-b border-border">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} 
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-[1000px] mx-auto px-[clamp(1.5rem,5vw,3.5rem)]"
      >
        
        <div className="mb-16">
          <motion.p 
            initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[0.7rem] text-muted tracking-[0.2em] mb-4 uppercase"
          >
            // EXPERIENCE
          </motion.p>
          <h2 className="font-body font-extrabold text-[clamp(2.5rem,5vw,4rem)] text-text mb-2 leading-tight flex flex-wrap gap-[0.3em]">
            {titleWords.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <motion.span 
                  initial={{ clipPath: "inset(0 0 100% 0)" }}
                  animate={isInView ? { clipPath: "inset(0 0 0% 0)" } : { clipPath: "inset(0 0 100% 0)" }}
                  transition={{ duration: 0.8, delay: i * 0.07 }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>

        <div className="relative ml-4 pl-4 md:pl-8" ref={containerRef}>
          {/* Static Background Line */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border" />
          
          {/* Animated Draw Line */}
          <motion.div 
            className="absolute left-[0px] top-0 bottom-0 w-[1px] bg-text origin-top"
            style={{ scaleY }}
          />

          {experience.map((exp, i) => {
            const isWayspire = exp.company.toLowerCase().includes('wayspire');
            
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative py-8 border-b border-border last:border-0"
              >
                {/* Wayspire Highlight Container */}
                <div className={`transition-all duration-300 ${isWayspire ? 'border-l-[3px] border-pastel-purple pl-[1rem] -ml-[1rem]' : ''}`}>
                  
                  {/* Dot */}
                  <div 
                    className={`absolute ${isWayspire ? 'left-[calc(-1rem-13px)] md:left-[calc(-2rem-13px)]' : 'left-[-21px] md:left-[-37px]'} top-[40px] w-[10px] h-[10px] rounded-full bg-text z-10`}
                    style={{ boxShadow: '0 0 0 4px var(--bg), 0 0 0 5px var(--border)' }} 
                  />
                  
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
                    <h3 className="font-body font-bold text-[1.2rem] text-text">
                      {exp.company}
                    </h3>
                    <div className="flex flex-col md:items-end mt-1 md:mt-0">
                      <span className="font-mono text-[0.8rem] text-muted">
                        {exp.role}
                      </span>
                      <span className="font-mono text-[0.72rem] text-light mt-1">
                        {exp.period} · {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-3 mt-6">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-muted mt-[2px]">→</span>
                        <span className="font-body font-normal text-[0.9rem] text-muted leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}
