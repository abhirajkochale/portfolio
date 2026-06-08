import { motion } from 'framer-motion';
import { projects } from '../data';

export default function Projects() {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        delay: custom * 0.15
      }
    })
  };

  return (
    <section id="work" className="w-full min-h-screen bg-bg py-24 md:py-32 flex flex-col">
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,3.5rem)]">
        
        {/* Section Header */}
        <div className="mb-16">
          <p className="font-mono text-[0.7rem] text-accent tracking-[0.2em] mb-4">
            // SELECTED WORK
          </p>
          <h2 className="font-body font-extrabold text-[clamp(2.5rem,5vw,4rem)] text-text mb-2 leading-tight">
            Things I've Built
          </h2>
          <p className="font-mono text-[0.85rem] text-muted">
            Real products. Real users. Real impact.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="flex flex-col">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="group relative bg-bg-card border border-border rounded-[12px] p-6 md:p-10 mb-6 transition-all duration-350 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_60px_rgba(232,255,71,0.05)]"
            >
              {/* Left Border Hover Flash via pseudo-element to prevent layout shift */}
              <div className="absolute inset-y-0 left-0 w-[3px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-350 rounded-l-[12px]" />

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
                
                {/* Left Column (55%) */}
                <div className="w-full lg:w-[55%] flex flex-col">
                  {/* Top Row */}
                  <div className="flex items-center w-full">
                    <span className="bg-accent/20 border border-accent/40 text-accent font-mono text-[0.65rem] rounded-full px-3 py-1">
                      {project.badge}
                    </span>
                    <span className="font-mono text-[0.65rem] text-muted ml-auto">
                      {project.year}
                    </span>
                  </div>

                  {/* Project Titles */}
                  <h3 className="font-body font-extrabold text-[clamp(1.8rem,3vw,2.5rem)] text-text mt-4">
                    {project.name}
                  </h3>
                  <p className="font-body font-medium text-[1rem] text-muted mt-2">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="font-body font-normal text-[0.9rem] text-muted/80 mt-4 max-w-[420px]">
                    {project.description}
                  </p>

                  {/* Impact Line */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="font-mono text-[0.75rem] text-[#22c55e]">
                      {project.impact}
                    </p>
                  </div>

                  {/* Stack Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.stack.map(tech => (
                      <span key={tech} className="bg-bg border border-border text-muted font-mono text-[0.7rem] rounded-[4px] px-2.5 py-1">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-6 mt-6">
                    {project.live && (
                      <a 
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="relative text-accent font-mono text-[0.8rem] pb-1 overflow-hidden group/link"
                      >
                        Live Demo ↗
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent -translate-x-[101%] group-hover/link:translate-x-0 transition-transform duration-300 ease-out" />
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="relative text-muted hover:text-text font-mono text-[0.8rem] pb-1 overflow-hidden group/link transition-colors"
                      >
                        GitHub →
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-text -translate-x-[101%] group-hover/link:translate-x-0 transition-transform duration-300 ease-out" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column (45%) */}
                <div className="w-full lg:w-[45%] h-full flex flex-col justify-center">
                  <div className="w-full aspect-[16/10] rounded-[8px] border border-border bg-gradient-to-br from-accent/15 to-bg-soft flex items-center justify-center overflow-hidden">
                    {/* Placeholder image representation */}
                    <span className="font-body font-bold text-4xl text-muted/20 text-center px-4 select-none">
                      {project.name}
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Projects */}
        <div className="mt-16">
          <p className="font-mono text-[0.7rem] text-muted mb-8 tracking-[0.1em]">
            // OTHER WORK
          </p>
          <div className="flex flex-col">
            {otherProjects.map((project, index) => (
              <motion.a
                href={project.github || project.live || "#"}
                target="_blank"
                rel="noreferrer"
                key={project.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="group flex items-center gap-4 md:gap-8 border-t border-border py-5 px-4 -mx-4 transition-colors duration-200 hover:bg-bg-soft"
              >
                <span className="font-mono text-[0.7rem] text-muted/50 w-8">
                  {project.index}
                </span>
                <span className="font-body font-bold text-[1.1rem] text-text group-hover:text-accent transition-colors duration-200">
                  {project.name}
                </span>
                <span className="font-mono text-[0.7rem] text-muted hidden md:block">
                  — {project.stack.slice(0, 3).join(' · ')}
                </span>
                <span className="ml-auto text-muted group-hover:text-accent transition-colors duration-200">
                  {project.live ? '↗' : '→'}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
