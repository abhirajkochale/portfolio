import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Marquee from './components/Marquee';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import { motion } from 'framer-motion';

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text selection:bg-pastel-purple selection:text-text">
      
      {/* Page Load Sweep Line */}
      <motion.div 
        initial={{ width: "0%", opacity: 1 }}
        animate={{ width: "100%", opacity: 0 }}
        transition={{ 
          width: { duration: 0.8, ease: "easeOut" }, 
          opacity: { duration: 0.3, delay: 0.8, ease: "linear" } 
        }}
        className="fixed top-0 left-0 h-[2px] bg-pastel-purple z-[200] pointer-events-none"
      />

      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Marquee />
        <Experience />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
