import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { personal } from '../data';
import { useRef, useState } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolledPast(latest > 80);
  });

  const portraitY = useTransform(scrollY, [0, 400], [0, -20]);
  const nameY = useTransform(scrollY, [0, 400], [0, -40]);
  const nameOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const easeReveal: [number, number, number, number] = [0.76, 0, 0.24, 1];

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useTransform(mouseY, [0, 1], [6, -6]);
  const rotateY = useTransform(mouseX, [0, 1], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const maskReveal = {
    hidden: { clipPath: "inset(-20% -20% 100% -20%)" },
    visible: (custom: number) => ({
      clipPath: "inset(-20% -20% -20% -20%)",
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
    <section ref={containerRef} id="hero" className="relative w-full bg-bg flex flex-col overflow-hidden pt-[120px] pb-16 md:pb-24">

      {/* Soft Blob */}
      <div className="absolute top-[-20%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-50 pointer-events-none z-0 blur-[60px]"
        style={{ background: 'radial-gradient(circle, var(--color-pastel-blue) 0%, transparent 70%)' }} />

      <div className="absolute bottom-[24px] left-[32px] font-mono text-[0.65rem] text-muted z-10 hidden md:block">
        {personal.location}
      </div>
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-[24px] right-[32px] font-mono text-[0.65rem] text-muted z-10 hidden md:block transition-all duration-400 ease-in-out ${isScrolledPast ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
      >
        Scroll to explore ↓
      </motion.div>

      {/* Main Content */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-[clamp(1.5rem,5vw,3.5rem)] relative z-10 flex flex-col flex-grow">

        {/* RIGHT SIDE: Profile Photo (Desktop Only) */}
        <motion.div
          style={{ y: portraitY, rotateX, rotateY, zIndex: 10 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="hidden lg:block absolute right-[clamp(1.5rem,5vw,3.5rem)] top-0 w-[300px] perspective-[1000px]"
        >
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1.6, delay: 0.3, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }} 
            className="relative bg-white rounded-[12px] p-2 transition-transform duration-150 ease-out"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
          >
            <img src="/abhiraj.jpeg" alt="Abhiraj Kochale" className="w-full aspect-[3/4] object-cover object-[center_top] rounded-[8px]" />
          </motion.div>
        </motion.div>

        <div className="w-full flex flex-col relative z-20 pointer-events-none">
          {/* Re-enable pointer events for interactive children */}
          <motion.div className="flex flex-row items-center gap-3 sm:gap-6 origin-left pointer-events-auto -ml-2 sm:ml-0" style={{ y: nameY, opacity: nameOpacity }}>
            
            {/* Mobile Portrait Inline */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
              className="lg:hidden w-[85px] h-[85px] sm:w-[130px] sm:h-[130px] rounded-full overflow-hidden border border-border/50 shadow-sm pointer-events-auto flex-shrink-0"
            >
              <img src="/abhiraj.jpeg" alt="Abhiraj Kochale" className="w-full h-full object-cover object-[center_top] scale-[1.15]" />
            </motion.div>

            <div className="flex flex-col">
              <motion.h1 custom={0} variants={maskReveal} initial="hidden" animate="visible" className="font-body font-black text-[clamp(2.5rem,9vw,10rem)] md:text-[clamp(4rem,10vw,10rem)] lg:text-[clamp(4.5rem,8.5vw,8rem)] leading-[0.9] text-text tracking-tight uppercase">
                {personal.name.first}
              </motion.h1>
              <motion.h1 custom={1} variants={maskReveal} initial="hidden" animate="visible" className="font-body font-black text-[clamp(2.5rem,9vw,10rem)] md:text-[clamp(4rem,10vw,10rem)] lg:text-[clamp(4.5rem,8.5vw,8rem)] leading-[0.9] tracking-tight uppercase"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '1.5px var(--text)'
                }}
              >
                {personal.name.last}
              </motion.h1>
            </div>
            
          </motion.div>

          <motion.p custom={0.6} variants={fadeUp} initial="hidden" animate="visible" className="font-body font-medium text-[1.1rem] text-muted mt-6 max-w-[500px] pointer-events-auto">
            {personal.role}
          </motion.p>

          <motion.p custom={0.75} variants={fadeUp} initial="hidden" animate="visible" className="font-body font-normal text-[1rem] text-light mt-2 max-w-[500px] pointer-events-auto">
            {personal.tagline}
          </motion.p>

          <motion.div custom={0.9} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap items-center gap-8 mt-8 font-body text-[0.95rem] pointer-events-auto">
            <a href="#work" className="text-text border-b-[1.5px] border-text pb-0.5 hover:text-muted transition-colors">
              View My Work →
            </a>
            <a href="https://drive.google.com/file/d/17vhsogk_DDxe4Jx1uIzZX9m30BVMXis0/view" target="_blank" rel="noreferrer" className="text-muted border-b border-border pb-0.5 hover:text-text transition-colors">
              Resume ↗
            </a>
          </motion.div>

          {/* Stats Strip */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap items-center gap-y-6 gap-x-4 md:gap-x-0 pt-8 border-t border-border mt-8 w-full max-w-[600px] pointer-events-auto">
            {personal.stats.map((stat, idx) => (
              <motion.div key={stat.label} custom={1 + (idx * 0.1)} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center">
                <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-2">
                  <span className="font-body font-bold text-[1.5rem] md:text-[1.3rem] text-text leading-none">{stat.value}</span>
                  <span className="font-mono font-normal text-[0.65rem] md:text-[0.7rem] text-muted uppercase tracking-wider">{stat.label}</span>
                </div>
                {idx !== personal.stats.length - 1 && <span className="hidden md:inline mx-4 md:mx-6 text-[1.3rem] text-border">·</span>}
              </motion.div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
