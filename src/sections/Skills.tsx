import { motion } from 'framer-motion';
import { skills } from '../data';
import { useReveal } from '../hooks/useReveal';

export default function Skills() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="skills" className="w-full bg-bg py-24 md:py-32" ref={ref as any}>
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,3.5rem)]">
        
        <div className="mb-16">
          <p className="font-mono text-[0.7rem] text-accent tracking-[0.2em] mb-4 uppercase">
            // CAPABILITIES
          </p>
          <h2 className="font-body font-extrabold text-[clamp(2.5rem,5vw,4rem)] text-text mb-2 leading-tight">
            My Tech Stack
          </h2>
        </div>

        <div className="flex flex-col">
          {Object.entries(skills).map(([category, items], idx) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col md:flex-row md:items-center py-8 border-b border-border last:border-0"
            >
              <div className="w-full md:w-[200px] mb-6 md:mb-0">
                <h3 className="font-mono text-[0.7rem] text-muted uppercase tracking-wider">
                  {category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-3 flex-1">
                {items.map(skill => (
                  <span 
                    key={skill}
                    className="bg-bg-card border border-border text-text font-mono text-[0.8rem] rounded-[4px] px-4 py-2 transition-colors duration-200 hover:border-accent hover:text-accent cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
