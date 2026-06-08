import { motion } from 'framer-motion';
import { certifications } from '../data';
import { useReveal } from '../hooks/useReveal';

export default function Certifications() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="certifications" className="w-full bg-bg py-24 md:py-32" ref={ref as any}>
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,3.5rem)]">
        
        <div className="mb-16">
          <p className="font-mono text-[0.7rem] text-accent tracking-[0.2em] mb-4 uppercase">
            // CERTIFICATIONS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-bg-card border border-border rounded-[12px] p-8 transition-colors duration-300 hover:border-accent/40"
            >
              <div className="text-3xl mb-4">{cert.icon}</div>
              <p className="font-mono text-[0.7rem] text-accent uppercase mt-4 tracking-wider">
                {cert.issuer}
              </p>
              <h3 className="font-body font-bold text-[1.1rem] text-text mt-2 mb-4">
                {cert.name}
              </h3>
              <p className="font-mono text-[0.7rem] text-muted">
                {cert.date}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
