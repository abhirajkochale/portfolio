import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { experience } from '../data';
import { useReveal } from '../hooks/useReveal';

export default function Experience() {
  const { ref: sectionRef } = useReveal(0.12);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="w-full bg-bg py-24 md:py-32" ref={sectionRef as any}>
      <div className="w-full max-w-[1000px] mx-auto px-[clamp(1.5rem,5vw,3.5rem)]">
        
        <div className="mb-16">
          <p className="font-mono text-[0.7rem] text-accent tracking-[0.2em] mb-4 uppercase">
            // EXPERIENCE
          </p>
          <h2 className="font-body font-extrabold text-[clamp(2.5rem,5vw,4rem)] text-text mb-2 leading-tight">
            Where I've Worked
          </h2>
        </div>

        <div className="relative ml-4 pl-4 md:pl-8" ref={containerRef}>
          {/* Static Background Line */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border" />
          
          {/* Animated Draw Line */}
          <motion.div 
            className="absolute left-[-0.5px] top-0 bottom-0 w-[2px] bg-accent origin-top"
            style={{ scaleY }}
          />

          {experience.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative py-8 border-b border-border last:border-0 pl-2"
            >
              {/* Dot */}
              <div className="absolute left-[-22px] md:left-[-38px] top-[40px] w-2 h-2 rounded-full bg-accent z-10" />
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
                <h3 className="font-body font-bold text-[1.2rem] text-text">
                  {exp.company}
                </h3>
                <div className="flex flex-col md:items-end mt-1 md:mt-0">
                  <span className="font-mono text-[0.8rem] text-accent">
                    {exp.role}
                  </span>
                  <span className="font-mono text-[0.7rem] text-muted mt-1">
                    {exp.period} · {exp.location}
                  </span>
                </div>
              </div>

              <ul className="flex flex-col gap-3 mt-6">
                {exp.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="text-accent mt-[2px]">→</span>
                    <span className="font-body font-normal text-[0.9rem] text-muted leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
