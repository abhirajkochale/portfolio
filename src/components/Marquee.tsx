import { motion } from 'framer-motion';

export default function Marquee() {
  const text = "REACT · TYPESCRIPT · SUPABASE · POSTGRESQL · GEMINI API · PYTHON · ML · FRAMER MOTION · ";
  const repeatedText = Array(4).fill(text).join("");

  return (
    <div 
      className="w-full h-[52px] bg-bg-dark flex items-center overflow-hidden border-y border-border-dark select-none"
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
      }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
        className="flex whitespace-nowrap font-mono text-[0.8rem] text-accent-inv opacity-60"
      >
        <span>{repeatedText}</span>
      </motion.div>
    </div>
  );
}
