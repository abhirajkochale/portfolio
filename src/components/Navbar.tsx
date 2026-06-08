import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Work', href: '#work' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll background effect & active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Basic section tracking based on ID position
      // (Will work dynamically once sections are built)
      const sections = navLinks.map(link => document.querySelector(link.href)).filter(Boolean) as HTMLElement[];
      let current = '#hero';
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
          current = `#${section.id}`;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] h-[64px] transition-all duration-400 ease-in-out border-b ${
          isScrolled 
            ? 'bg-bg/92 backdrop-blur-md border-border' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="flex justify-between items-center h-full px-[clamp(1.5rem,5vw,3.5rem)]">
          
          {/* LEFT: Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-body font-extrabold text-[1.2rem] text-text"
          >
            AK
          </a>

          {/* CENTER: Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    ease: "easeOut", 
                    delay: 0.3 + (index * 0.06) 
                  }}
                  className={`relative font-mono text-[0.72rem] tracking-[0.18em] uppercase py-1 transition-colors duration-200 ${
                    isActive ? 'text-text font-bold' : 'text-muted hover:text-text'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-dot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-text rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>

          {/* RIGHT: Availability Pill (Desktop) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="hidden md:flex items-center gap-2 border border-muted text-muted rounded-full px-[14px] py-[5px] whitespace-nowrap font-mono text-[0.68rem]"
          >
            <span className="w-2 h-2 rounded-full bg-muted animate-availability-pulse" />
            Available
          </motion.div>

          {/* RIGHT: Mobile Menu Toggle */}
          <button 
            className="md:hidden text-text"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-bg flex flex-col p-[clamp(1.5rem,5vw,3.5rem)]"
          >
            {/* Top Bar inside Menu */}
            <div className="flex justify-between items-center h-[64px] mb-12">
              <span className="font-body font-extrabold text-[1.2rem] text-text">
                AK
              </span>
              <button 
                className="text-muted hover:text-text transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Links Stack */}
            <nav className="flex flex-col gap-8 flex-grow justify-center">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="font-body font-bold text-[clamp(2rem,8vw,3.5rem)] text-muted hover:text-text uppercase transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            {/* Bottom Contact */}
            <div className="pb-8">
              <span className="font-mono text-[0.8rem] text-muted">
                kochaleabhiraj@gmail.com
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
