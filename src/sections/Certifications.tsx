import { motion, useInView } from 'framer-motion';
import { certifications } from '../data';
import { GraduationCap, Award } from 'lucide-react';
import { useRef } from 'react';

const certColors = [
  { bg: 'var(--color-pastel-blue)', border: 'var(--color-pastel-blue)' },
  { bg: 'var(--color-pastel-purple)', border: 'var(--color-pastel-purple)' }
];

export default function Certifications() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} id="certifications" className="w-full bg-bg py-16 md:pt-16 md:pb-20 border-b border-border overflow-hidden">
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
              // CERTIFICATIONS
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, idx) => {
            const colors = certColors[idx % certColors.length];
            return (
              <motion.div
                key={cert.name}
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
                    {idx === 0 ? <GraduationCap size={36} strokeWidth={1.5} /> : <Award size={36} strokeWidth={1.5} />}
                  </div>
                  <p className="font-mono text-[0.7rem] text-muted uppercase mt-4 tracking-wider">
                    {cert.issuer}
                  </p>
                  <h3 className="font-body font-bold text-[1.1rem] text-text mt-2 mb-4">
                    {cert.name}
                  </h3>
                  <p className="font-mono text-[0.72rem] text-light">
                    {cert.date}
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
