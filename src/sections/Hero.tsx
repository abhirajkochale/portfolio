import { motion, useScroll, useTransform } from 'framer-motion';
import { personal } from '../data';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  const portraitY = useTransform(scrollY, [0, 500], [0, -60]);
  const nameScale = useTransform(scrollY, [0, 300], [1, 0.94]);
  const nameOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const easeReveal: [number, number, number, number] = [0.76, 0, 0.24, 1];

  const maskReveal = {
    hidden: { clipPath: "inset(0 0 100% 0)" },
    visible: (custom: number) => ({
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: 1.2, ease: easeReveal, delay: custom * 0.15 }
    })
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] as [number, number, number, number], delay: custom }
    })
  };

  return (
    <section ref={containerRef} id="hero" className="relative w-full min-h-[100vh] bg-bg flex items-center overflow-hidden pt-24 md:pt-0 pb-16 md:pb-24">
      
      {/* Soft Blob */}
      <div className="absolute top-[-20%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-50 pointer-events-none z-0 blur-[60px]"
           style={{ background: 'radial-gradient(circle, var(--color-pastel-blue) 0%, transparent 70%)' }} />

      {/* Absolute Texts */}
      <div className="absolute top-[24px] left-[32px] font-mono text-[0.65rem] text-muted tracking-[0.2em] uppercase z-10 hidden md:block">
        ABHIRAJ KOCHALE — PORTFOLIO 2025
      </div>
      <div className="absolute bottom-[24px] left-[32px] font-mono text-[0.65rem] text-muted z-10 hidden md:block">
        {personal.location} ↗
      </div>
      <motion.div 
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[24px] right-[32px] font-mono text-[0.65rem] text-muted z-10 hidden md:block"
      >
        Scroll to explore ↓
      </motion.div>

      {/* Main Content Container */}
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,3.5rem)] relative z-10">
        
        <div className="max-w-[800px] flex flex-col">
          
          {/* Row 1: Availability Badge */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0 }}
            className="inline-flex self-start items-center gap-2 font-mono text-[0.7rem] bg-pastel-green text-[#1C6B3A] rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1C6B3A] animate-availability-pulse" />
            Available for Internships
          </motion.div>

          {/* Row 2: Giant Name */}
          <motion.div className="flex flex-col origin-left" style={{ scale: nameScale, opacity: nameOpacity }}>
            <motion.h1 custom={0} variants={maskReveal} initial="hidden" animate="visible" className="font-body font-black text-[clamp(5rem,12vw,10rem)] leading-[0.9] text-text tracking-tight uppercase">
              {personal.name.first}
            </motion.h1>
            <motion.h1 custom={1} variants={maskReveal} initial="hidden" animate="visible" className="font-body font-black text-[clamp(5rem,12vw,10rem)] leading-[0.9] tracking-tight uppercase"
              style={{ color: 'transparent', WebkitTextStroke: '2px var(--color-text)' }}>
              {personal.name.last}
            </motion.h1>
          </motion.div>

          {/* Row 3: Role */}
          <motion.p custom={0.6} variants={fadeUp} initial="hidden" animate="visible" className="font-body font-medium text-[1.1rem] text-muted mt-6">
            {personal.role}
          </motion.p>

          {/* Row 4: Tagline */}
          <motion.p custom={0.75} variants={fadeUp} initial="hidden" animate="visible" className="font-body font-normal text-[1rem] text-light mt-2">
            {personal.tagline}
          </motion.p>

          {/* Row 5: CTAs */}
          <motion.div custom={0.9} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap items-center gap-8 mt-10 font-body text-[0.95rem]">
            <a href="#work" className="text-text border-b-[1.5px] border-text pb-0.5 hover:text-muted transition-colors">
              View My Work →
            </a>
            <a href={personal.resume} target="_blank" rel="noreferrer" className="text-muted border-b border-border pb-0.5 hover:text-text transition-colors">
              Download Resume ↗
            </a>
          </motion.div>

          {/* Row 6: Stats Strip */}
          <div className="flex flex-wrap items-center gap-y-4 mt-12">
            {personal.stats.map((stat, idx) => (
              <motion.div key={stat.label} custom={1 + (idx * 0.1)} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center">
                <div className="flex items-baseline gap-2">
                  <span className="font-body font-bold text-[1.3rem] text-text">{stat.value}</span>
                  <span className="font-mono font-normal text-[0.7rem] text-muted uppercase tracking-wider">{stat.label}</span>
                </div>
                {idx !== personal.stats.length - 1 && <span className="mx-4 md:mx-6 text-[1.3rem] text-border">·</span>}
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* RIGHT SIDE: Profile Photo (Desktop Only) */}
      <motion.div 
        style={{ y: portraitY }}
        className="hidden lg:block absolute right-[8%] top-1/2 -translate-y-1/2 w-[280px] z-10"
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 0.3, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }} className="relative">
          <img src="/abhiraj.jpeg" alt="Abhiraj Kochale" className="w-full aspect-[4/5] object-cover rounded-[4px]" style={{ boxShadow: '0 0 0 1px var(--color-border), 16px 16px 0 0 var(--color-pastel-purple)' }} />
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} className="font-mono text-[0.65rem] text-light text-center mt-8">
          ↑ That's me
        </motion.p>
      </motion.div>

    </section>
  );
}
