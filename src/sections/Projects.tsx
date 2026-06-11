import { motion, useInView } from 'framer-motion';
import { projects } from '../data';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const cardColors = [
  { border: 'var(--color-pastel-purple)', badgeBg: 'var(--color-pastel-purple)', badgeText: '#4C1D95' },
  { border: 'var(--color-pastel-blue)', badgeBg: 'var(--color-pastel-blue)', badgeText: '#1E3A5F' },
  { border: 'var(--color-pastel-green)', badgeBg: 'var(--color-pastel-green)', badgeText: '#1C4A2E' }
];

export default function Projects() {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const titleWords = "Things I've Built".split(" ");

  return (
    <section ref={sectionRef} id="work" className="w-full bg-bg-alt py-16 md:py-20 flex flex-col border-y border-border overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} 
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,3.5rem)]"
      >
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <motion.div 
              initial={{ width: 0 }} animate={isInView ? { width: 16 } : { width: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
              className="h-[1px] bg-muted"
            />
            <motion.p 
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.4, delay: 0.5 }}
              className="font-mono text-[0.7rem] text-muted tracking-[0.2em] uppercase"
            >
              // SELECTED WORK
            </motion.p>
          </div>
          <h2 className="font-body font-black text-[clamp(3rem,8vw,6rem)] leading-[1.1] text-text mb-2 flex flex-wrap gap-[0.2em] w-[110%]">
            {titleWords.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block pb-[0.2em] -mb-[0.2em]">
                <motion.span 
                  initial={{ clipPath: "inset(0 0 100% 0)" }}
                  animate={isInView ? { clipPath: "inset(-20% 0 -20% 0)" } : { clipPath: "inset(0 0 100% 0)" }}
                  transition={{ duration: 0.75, delay: i * 0.08 }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>
          <p className="font-mono text-[0.85rem] text-light mt-4">
            Real products. Real users. Real impact.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="flex flex-col">
          {featuredProjects.map((project, index) => {
            const colors = cardColors[index % cardColors.length];
            const delays = [0, 0.2, 0.4];
            const delay = delays[index] ?? (index * 0.2);

            return (
              <FeaturedProjectCard 
                key={project.id} 
                project={project} 
                colors={colors} 
                delay={delay} 
                isInView={isInView} 
              />
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

function FeaturedProjectCard({ project, colors, delay, isInView }: { project: any, colors: any, delay: number, isInView: boolean }) {
  const images = project.images || [`/images/${project.id}.png`];
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{ duration: 0.7, delay }}
      className="group relative bg-bg-card border border-border rounded-[16px] p-[32px] mb-6 transition-all duration-300 ease-out hover:-translate-y-1"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.10)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'}
    >
      {/* Left Border Hover Flash */}
      <div className="absolute inset-y-0 left-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-[16px]" style={{ backgroundColor: colors.border }} />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
        
        {/* Left Column (40%) */}
        <div className="w-full lg:w-[40%] flex flex-col order-2 lg:order-1">
          <div className="flex items-center w-full">
            <span className="font-mono text-[0.65rem] rounded-full px-3 py-1" style={{ backgroundColor: colors.badgeBg, color: colors.badgeText }}>
              {project.badge}
            </span>
            <span className="font-mono text-[0.65rem] text-muted ml-auto">
              {project.year}
            </span>
          </div>

          <h3 className="font-body font-extrabold text-[clamp(2rem,3.5vw,2.8rem)] text-text mt-3 leading-tight">
            {project.name}
          </h3>
          <p className="font-body font-medium text-[1.05rem] text-muted mt-1.5">
            {project.tagline}
          </p>

          <p className="font-body font-normal text-[0.9rem] text-light mt-3 max-w-[420px]">
            {project.description}
          </p>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="font-mono text-[0.85rem] text-muted flex items-center gap-2">
              <span className="text-[#22c55e]">●</span> {project.impact}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {project.stack.map((tech: string) => (
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

        {/* Right Column (60%) - Carousel */}
        <div className="w-full lg:w-[60%] flex flex-col justify-center self-center order-1 lg:order-2 mb-6 lg:mb-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: delay + 0.1 }}
            className="w-full rounded-[8px] flex items-center justify-center overflow-hidden relative shadow-sm border border-border/50 block group/carousel"
          >
            <a 
              href={project.live || project.github || "#"}
              target="_blank"
              rel="noreferrer"
              className="block w-full cursor-pointer"
            >
              <img 
                src={images[currentImage]} 
                alt={project.name} 
                className="w-full h-auto block transition-transform duration-700"
              />
            </a>

            {images.length > 1 && (
              <>
                {/* Left Arrow */}
                <button 
                  onClick={prevImage}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-bg/80 hover:bg-bg backdrop-blur-sm text-text p-1.5 md:p-2 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 shadow-sm z-10"
                >
                  <ChevronLeft size={20} />
                </button>
                {/* Right Arrow */}
                <button 
                  onClick={nextImage}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-bg/80 hover:bg-bg backdrop-blur-sm text-text p-1.5 md:p-2 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 shadow-sm z-10"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-bg/50 backdrop-blur-sm px-2 py-1 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 z-10">
                  {images.map((_: any, i: number) => (
                    <button 
                      key={i}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentImage(i); }}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentImage ? 'bg-text' : 'bg-text/30'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
