import { motion, useInView } from 'framer-motion';
import { projects } from '../data';
import { useRef } from 'react';

const cardColors = [
  { border: 'var(--color-pastel-purple)', badgeBg: 'var(--color-pastel-purple)', badgeText: '#4C1D95', grad: 'linear-gradient(135deg, var(--color-pastel-purple), var(--color-pastel-blue))' },
  { border: 'var(--color-pastel-blue)', badgeBg: 'var(--color-pastel-blue)', badgeText: '#1E3A5F', grad: 'linear-gradient(135deg, var(--color-pastel-blue), var(--color-pastel-green))' },
  { border: 'var(--color-pastel-green)', badgeBg: 'var(--color-pastel-green)', badgeText: '#1C4A2E', grad: 'linear-gradient(135deg, var(--color-pastel-green), var(--color-pastel-yellow))' }
];

export default function Projects() {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const titleWords = "Things I've Built".split(" ");

  return (
    <section ref={sectionRef} id="work" className="w-full bg-bg-alt py-16 md:py-24 flex flex-col border-y border-border">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} 
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,3.5rem)]"
      >
        
        {/* Section Header */}
        <div className="mb-16">
          <motion.p 
            initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[0.7rem] text-muted tracking-[0.2em] mb-4"
          >
            // SELECTED WORK
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
          <p className="font-mono text-[0.85rem] text-light">
            Real products. Real users. Real impact.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="flex flex-col">
          {featuredProjects.map((project, index) => {
            const colors = cardColors[index % cardColors.length];
            const delays = [0, 0.15, 0.25];
            const delay = delays[index] ?? (index * 0.1);

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ duration: 0.8, delay }}
                className="group relative bg-bg-card border border-border rounded-[16px] p-6 md:p-10 mb-6 transition-all duration-300 ease-out hover:-translate-y-1"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.10)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'}
              >
                {/* Left Border Hover Flash */}
                <div className="absolute inset-y-0 left-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-[16px]" style={{ backgroundColor: colors.border }} />

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
                  
                  {/* Left Column (55%) */}
                  <div className="w-full lg:w-[55%] flex flex-col">
                    <div className="flex items-center w-full">
                      <span className="font-mono text-[0.65rem] rounded-full px-3 py-1" style={{ backgroundColor: colors.badgeBg, color: colors.badgeText }}>
                        {project.badge}
                      </span>
                      <span className="font-mono text-[0.65rem] text-muted ml-auto">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="font-body font-extrabold text-[clamp(1.8rem,3vw,2.5rem)] text-text mt-4">
                      {project.name}
                    </h3>
                    <p className="font-body font-medium text-[1rem] text-muted mt-2">
                      {project.tagline}
                    </p>

                    <p className="font-body font-normal text-[0.9rem] text-light mt-4 max-w-[420px]">
                      {project.description}
                    </p>

                    <div className="mt-6 pt-6 border-t border-border">
                      <p className="font-mono text-[0.75rem] text-[#1C6B3A]">
                        {project.impact}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.stack.map(tech => (
                        <span key={tech} className="bg-bg-alt border border-border text-muted font-mono text-[0.72rem] rounded-[4px] px-2.5 py-1">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-6 mt-6">
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noreferrer" className="text-text font-mono text-[0.8rem] border-b border-text pb-0.5 hover:text-muted transition-colors">
                          Live Demo ↗
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="text-muted hover:text-text font-mono text-[0.8rem] transition-colors pb-1">
                          GitHub →
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column (45%) */}
                  <div className="w-full lg:w-[45%] h-full flex flex-col justify-center">
                    <div className="w-full aspect-[16/10] rounded-[8px] border border-border flex items-center justify-center overflow-hidden" style={{ background: colors.grad, opacity: 0.6 }}>
                      <span className="font-mono font-bold text-4xl text-muted opacity-40 text-center px-4 select-none">
                        {project.name}
                      </span>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Secondary Projects */}
        <div className="mt-16">
          <p className="font-mono text-[0.7rem] text-muted mb-8 tracking-[0.1em]">
            // OTHER WORK
          </p>
          <div className="flex flex-col">
            {otherProjects.map((project) => (
              <a
                href={project.github || project.live || "#"}
                target="_blank"
                rel="noreferrer"
                key={project.id}
                className="group flex items-center gap-4 md:gap-8 border-t border-border py-5 px-4 -mx-4 transition-colors duration-200 hover:bg-bg-card bg-transparent"
              >
                <span className="font-mono text-[0.7rem] text-muted/50 w-8">
                  {project.index}
                </span>
                <span className="font-body font-bold text-[1.1rem] text-text">
                  {project.name}
                </span>
                <span className="font-mono text-[0.7rem] text-light hidden md:block">
                  — {project.stack.slice(0, 3).join(' · ')}
                </span>
                <span className="ml-auto text-muted">
                  {project.live ? '↗' : '→'}
                </span>
              </a>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
}
