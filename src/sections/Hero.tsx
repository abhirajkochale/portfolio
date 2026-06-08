import { motion } from 'framer-motion';
import { personal } from '../data';

export default function Hero() {
  const easeReveal: [number, number, number, number] = [0.76, 0, 0.24, 1];

  const maskReveal = {
    hidden: { clipPath: "inset(0 0 100% 0)" },
    visible: (custom: number) => ({
      clipPath: "inset(0 0 0% 0)",
      transition: {
        duration: 1.2,
        ease: easeReveal,
        delay: custom * 0.15
      }
    })
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1] as [number, number, number, number],
        delay: custom
      }
    })
  };

  return (
    <section id="hero" className="relative w-full min-h-screen bg-bg flex items-center overflow-hidden pt-24 md:pt-0">
      
      {/* Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Decorative Dot */}
      <div className="absolute bottom-[15%] left-[40%] w-[6px] h-[6px] bg-accent rounded-full z-0" />

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0 }}
            className="inline-flex self-start items-center gap-2 font-mono text-[0.7rem] text-[#22c55e] border border-[#22c55e]/40 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-availability-pulse" />
            Available for Internships
          </motion.div>

          {/* Row 2: Giant Name */}
          <div className="flex flex-col">
            <motion.h1 
              custom={0}
              variants={maskReveal}
              initial="hidden"
              animate="visible"
              className="font-body font-black text-[clamp(5rem,12vw,10rem)] leading-[0.9] text-text tracking-tight uppercase"
            >
              {personal.name.first}
            </motion.h1>
            <motion.h1 
              custom={1}
              variants={maskReveal}
              initial="hidden"
              animate="visible"
              className="font-body font-black text-[clamp(5rem,12vw,10rem)] leading-[0.9] tracking-tight uppercase"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1.5px var(--color-text)'
              }}
            >
              {personal.name.last}
            </motion.h1>
          </div>

          {/* Row 3: Role */}
          <motion.p 
            custom={0.6}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-body font-medium text-[1.1rem] text-muted mt-6"
          >
            {personal.role}
          </motion.p>

          {/* Row 4: Tagline */}
          <motion.p 
            custom={0.75}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-body font-normal text-[1rem] text-muted opacity-70 mt-2"
          >
            {personal.tagline}
          </motion.p>

          {/* Row 5: CTAs */}
          <motion.div 
            custom={0.9}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-8 mt-10 font-body text-[0.95rem]"
          >
            <a 
              href="#work" 
              className="group relative text-accent font-semibold pb-1 overflow-hidden"
            >
              View My Work →
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-accent -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </a>
            <a 
              href={personal.resume} 
              target="_blank" 
              rel="noreferrer" 
              className="group relative text-muted hover:text-text transition-colors pb-1 overflow-hidden"
            >
              Download Resume ↗
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-text -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </a>
          </motion.div>

          {/* Row 6: Stats Strip */}
          <div className="flex flex-wrap items-center gap-y-4 mt-12">
            {personal.stats.map((stat, idx) => (
              <motion.div 
                key={stat.label}
                custom={1 + (idx * 0.1)}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex items-center"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-mono font-semibold text-[1.3rem] text-text">
                    {stat.value}
                  </span>
                  <span className="font-mono font-normal text-[0.7rem] text-muted uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
                
                {/* Separator */}
                {idx !== personal.stats.length - 1 && (
                  <span className="mx-4 md:mx-6 text-[1.3rem] text-border">·</span>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* RIGHT SIDE: Profile Photo (Desktop Only) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.3, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }}
        className="hidden lg:block absolute right-[8%] top-1/2 -translate-y-1/2 w-[280px] z-10"
      >
        <div className="relative">
          <img 
            src="/abhiraj.jpeg" 
            alt="Abhiraj Kochale"
            className="w-full aspect-[4/5] object-cover rounded-[4px] grayscale-[20%] contrast-110"
            style={{
              boxShadow: '0 0 0 1px var(--color-border), 24px 24px 0 0 var(--color-accent)'
            }}
          />
        </div>
        <p className="font-mono text-[0.65rem] text-muted text-center mt-8">
          ↑ That's me
        </p>
      </motion.div>

    </section>
  );
}
