import { motion, useInView } from 'framer-motion';
import { skills } from '../data';
import { useRef } from 'react';

const pastelColors = [
  'var(--color-pastel-blue)',
  'var(--color-pastel-pink)',
  'var(--color-pastel-green)',
  'var(--color-pastel-yellow)',
  'var(--color-pastel-purple)',
  'var(--color-pastel-peach)'
];

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const titleWords = "My Tech Stack".split(" ");

  let globalSkillIndex = 0;

  return (
    <section ref={sectionRef} id="skills" className="w-full bg-bg-alt py-16 md:py-24 border-b border-border">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} 
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,3.5rem)]"
      >
        
        <div className="mb-16">
          <motion.p 
            initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[0.7rem] text-muted tracking-[0.2em] mb-4 uppercase"
          >
            // CAPABILITIES
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

        <div className="flex flex-col border-t border-border mt-8">
          {Object.entries(skills).map(([category, items]) => (
            <div 
              key={category}
              className="flex flex-col md:flex-row md:items-start py-6 md:py-8 border-b border-border last:border-0"
            >
              <div className="w-[140px] shrink-0 mb-4 md:mb-0 mt-1">
                <h3 className="font-mono text-[0.7rem] text-light uppercase tracking-wider">
                  {category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-3 flex-1">
                {items.map(skill => {
                  const color = pastelColors[globalSkillIndex % pastelColors.length];
                  const currentIdx = globalSkillIndex;
                  globalSkillIndex++;

                  return (
                    <motion.span 
                      key={skill}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + (currentIdx * 0.03) }}
                      style={{ backgroundColor: color }}
                      className="text-text font-mono text-[0.78rem] font-medium rounded-[6px] px-[14px] py-[6px] cursor-default transition-all duration-150 ease-in-out hover:opacity-75 hover:scale-105"
                    >
                      {skill}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
