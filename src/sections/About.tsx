import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} id="about" className="w-full bg-bg py-16 md:py-24 flex flex-col overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,3.5rem)]"
      >

        {/* Section Header */}
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
              // ABOUT
            </motion.p>
          </div>

          <h2 className="font-body font-black text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] text-text mb-2">
            I Build Things That Ship
          </h2>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 max-w-[800px] font-body text-[1.1rem] md:text-[1.2rem] text-text leading-relaxed">
          <p>
            I am a Computer Engineering student at KJ Somaiya focused on building and deploying full-stack web and mobile applications. From a production-ready parent portal serving 300+ users to AI-powered journey safety platforms like SAKHI, I care about practical product development that solves real problems.
          </p>
          <p>
            I work across full-stack web development, mobile development, AI/ML, backend APIs, and databases. My technical stack includes React, React Native, Python, FastAPI, Supabase, PostgreSQL, and integrating machine learning workflows with tools like XGBoost and the Gemini API.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-8 mt-10 font-body text-[0.95rem]">
          <a href="https://drive.google.com/file/d/1kUcZJAG2pRXyKAz8lzwpg8UQTMhXNKMI/view" target="_blank" rel="noreferrer" className="text-text border-b-[1.5px] border-text pb-0.5 hover:text-muted transition-colors">
            View my resume →
          </a>
          <a href="https://github.com/abhirajkochale" target="_blank" rel="noreferrer" className="text-text border-b-[1.5px] border-text pb-0.5 hover:text-muted transition-colors">
            github.com/abhirajkochale →
          </a>
        </div>

      </motion.div>
    </section>
  );
}
