import { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './Hero.css'

// ── Animation Variants ──

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
}

const charVariants = {
  hidden: {
    y: 120,
    opacity: 0,
    rotate: 8,
  },
  visible: {
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
}

function SplitWord({ word }: { word: string }) {
  return (
    <div className="hero__word">
      {word.split('').map((char, i) => (
        <div className="hero__char-clip" key={i}>
          <motion.span className="hero__char" variants={charVariants}>
            {char}
          </motion.span>
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  const heroRef    = useRef<HTMLElement>(null)
  const controls   = useAnimation()
  // Ensure animation only fires once, even in React Strict Mode (double-invoke)
  const hasPlayed  = useRef(false)

  useEffect(() => {
    if (!hasPlayed.current) {
      hasPlayed.current = true
      controls.start('visible')
    }
  }, [controls])

  // GSAP scroll scrub — unchanged
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.6,
        },
      })

      tl.to('.hero__name-outer', { 
        scale: 12, 
        opacity: 0, 
        ease: 'none',
        modifiers: {
          scale: gsap.utils.clamp(0.5, 1.2)
        }
      }, 0)
        .to('.hero__name-clip--1 .hero__word', { xPercent: -20, ease: 'none' }, 0)
        .to('.hero__name-clip--2 .hero__word', { xPercent: 20, ease: 'none' }, 0)
        .to('.hero__meta--top',    { opacity: 0, y: -28, ease: 'none' }, 0)
        .to('.hero__meta--bottom', { opacity: 0, y: 28,  ease: 'none' }, 0)
        .to('.hero__edge--left',   { opacity: 0, ease: 'none' }, 0)
        .to('.hero__edge--right',  { opacity: 0, ease: 'none' }, 0)
    }, heroRef)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      ctx.revert()
    }
  }, [])

  // Compute total stagger duration so we can offset subsequent elements
  // ABHIRAJ = 7 chars, KOCHALE = 7 chars → last char fires at 14 * 0.04 = 0.56s, anim takes 0.9s → finishes at ~1.46s
  const SUBTITLE_DELAY = 1.0
  const META_DELAY     = 1.3
  const EDGES_DELAY    = 1.6

  return (
    <section className="hero" ref={heroRef} id="hero">
      <div className="hero__pin">

        {/* Edge labels */}
        <motion.div
          className="hero__edge hero__edge--left"
          variants={fadeUpVariants}
          initial="hidden"
          animate={controls}
          custom={EDGES_DELAY}
        >
          Full-Stack Developer · KJ Somaiya
        </motion.div>
        <motion.div
          className="hero__edge hero__edge--right"
          variants={fadeUpVariants}
          initial="hidden"
          animate={controls}
          custom={EDGES_DELAY}
        >
          Portfolio · 2026
        </motion.div>

        {/* Top Row */}
        <motion.div
          className="hero__meta hero__meta--top"
          variants={fadeUpVariants}
          initial="hidden"
          animate={controls}
          custom={SUBTITLE_DELAY}
        >
          <div className="hero__scroll-hint">
            Scroll to explore <span className="hero__scroll-arrow">↓</span>
          </div>
          <span>Mumbai, India</span>
        </motion.div>

        {/* Name — Container constrained */}
        <div className="hero__name-container">
          <motion.div
            className="hero__name-outer"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <div className="hero__name-clip hero__name-clip--1">
              <SplitWord word="ABHIRAJ" />
            </div>
            <div className="hero__name-clip hero__name-clip--2">
              <div className="hero__word">
                {'KOCHALE'.split('').map((char, i) => (
                  <div className="hero__char-clip" key={i}>
                    <motion.span className="hero__char" variants={charVariants}>
                      {char}
                    </motion.span>
                  </div>
                ))}
                <div className="hero__char-clip" style={{ alignSelf: 'flex-end' }}>
                  <span className="hero__cursor" aria-hidden="true" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <motion.div
          className="hero__meta--bottom"
          variants={fadeUpVariants}
          initial="hidden"
          animate={controls}
          custom={META_DELAY}
        >
          <div className="hero__meta--bottom-left">
            <span className="hero__role">Full‑Stack Developer</span>
            <span className="hero__stack">React · Python · AI · TypeScript</span>
          </div>
          <span className="hero__location">Available for internships ↗</span>
        </motion.div>

      </div>
    </section>
  )
}
