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
    <section ref={sectionRef} id="skills" className="w-full bg-bg-alt py-16 md:py-20 border-b border-border overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} 
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,3.5rem)]"
      >
        
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <motion.div 
              initial={{ width: 0 }} animate={isInView ? { width: 16 } : { width: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
              className="h-[1px] bg-muted"
            />
            <motion.p 
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.4, delay: 0.5 }}
              className="font-mono text-[0.7rem] text-muted tracking-[0.2em] uppercase"
            >
              // CAPABILITIES
            </motion.p>
          </div>
          <h2 className="font-body font-black text-[clamp(3rem,6vw,5rem)] leading-none text-text mb-2 flex flex-wrap gap-[0.2em]">
            {titleWords.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <motion.span 
                  initial={{ clipPath: "inset(0 0 100% 0)" }}
                  animate={isInView ? { clipPath: "inset(0 0 0% 0)" } : { clipPath: "inset(0 0 100% 0)" }}
                  transition={{ duration: 0.75, delay: i * 0.08 }}
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
              className="flex flex-col py-6 md:py-8 border-b border-border last:border-0 last:pb-0"
            >
              <div className="mb-4">
                <h3 className="font-mono text-[0.7rem] text-light uppercase tracking-wider">
                  {category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-3 w-full">
                {items.map(skill => {
                  const color = pastelColors[globalSkillIndex % pastelColors.length];
                  const currentIdx = globalSkillIndex;
                  globalSkillIndex++;

                  return (
                    <motion.span 
                      key={skill}
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: currentIdx * 0.025 }}
                      style={{ backgroundColor: color }}
                      className="text-text font-mono text-[0.78rem] font-medium rounded-[6px] px-[14px] py-[6px] cursor-default transition-transform duration-150 ease-in-out hover:opacity-75 hover:scale-105"
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
