import { motion, useInView } from 'framer-motion';
import { achievements } from '../data';
import { Trophy, Medal } from 'lucide-react';
import { useRef } from 'react';

const achievementColors = [
  { bg: 'var(--color-pastel-yellow)', border: 'var(--color-pastel-yellow)' },
  { bg: 'var(--color-pastel-green)', border: 'var(--color-pastel-green)' }
];

export default function Achievements() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} id="achievements" className="w-full bg-bg py-16 md:py-20 border-b border-border overflow-hidden">
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
              // ACHIEVEMENTS
            </motion.p>
          </div>
          <h2 className="font-body font-black text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] text-text mb-2 flex flex-wrap gap-[0.2em]">
            Milestones & Recognition
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, idx) => {
            const colors = achievementColors[idx % achievementColors.length];
            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + (idx * 0.15) }}
                className="rounded-[16px] p-6 md:p-8 relative overflow-hidden group"
                style={{ border: `1px solid ${colors.border}` }}
              >
                {/* 0.3 opacity background block to tint without affecting text */}
                <div className="absolute inset-0 opacity-[0.3]" style={{ backgroundColor: colors.bg }} />

                <div className="relative z-10">
                  <div className="mb-4 text-text">
                    {idx === 0 ? <Trophy size={36} strokeWidth={1.5} /> : <Medal size={36} strokeWidth={1.5} />}
                  </div>
                  <h3 className="font-body font-bold text-[1.2rem] text-text mt-2 mb-3">
                    {achievement.title}
                  </h3>
                  <p className="font-body text-[0.95rem] text-muted leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
