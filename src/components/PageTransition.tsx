import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  // Since we use AnimatePresence mode="wait", the exit animation fully completes 
  // before the next route mounts. This enables a seamless 2-phase wipe effect.
  
  return (
    <>
      {/* ── Enter Mask (Slide Up to Reveal) ── */}
      {/* When the route mounts, it starts fully covering the screen, then slides up. */}
      <motion.div
        initial={{ top: 0 }}
        animate={{ top: '-100vh' }}
        exit={{ top: '-100vh' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          height: '100vh',
          background: 'var(--text)',
          zIndex: 9999,
          pointerEvents: 'none'
        }}
      />

      {/* ── Exit Mask (Slide Up to Cover) ── */}
      {/* When leaving the route, it starts hidden at the bottom, then slides up to cover. */}
      <motion.div
        initial={{ top: '100vh' }}
        animate={{ top: '100vh' }}
        exit={{ top: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          height: '100vh',
          background: 'var(--text)',
          zIndex: 9999,
          pointerEvents: 'none'
        }}
      />

      {/* ── Route Content ── */}
      {/* Ensure the DOM renders completely invisibly while the mask prepares to reveal it */}
      <motion.div
        initial={{ opacity: 0, visibility: 'hidden' }}
        animate={{ opacity: 1, visibility: 'visible', transition: { delay: 0.1, duration: 0.4 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        {children}
      </motion.div>
    </>
  )
}
