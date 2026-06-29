import { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
} from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import V2Page from './pages/V2Page.jsx';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import AboutSection from './components/AboutSection';
import SolutionsSection from './components/SolutionsSection';
import IndustriesSection from './components/IndustriesSection';
import WorkshopsSection from './components/WorkshopsSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import InsightsSection from './components/InsightsSection';
import Footer from './components/Footer';

// Offsets anchored sections below the fixed navbar when scrolled to.
const anchor = { scrollMarginTop: '120px' };

const MARQUEE_ITEMS = [
  'Leadership & Performance',
  'Bespoke & Coaching',
  'Experiential Learning',
  'Assessment',
  'Workforce Solutions',
  'Platform Solutions',
  'Staffing Solutions',
  'Employee Assessments',
];

// One copy of the marquee content; rendered twice for a seamless -50% loop.
function MarqueeGroup() {
  return (
    <>
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i} className={styles.marqueeItem}>
          {item} <span className={styles.marqueeStar}>✦</span>
        </span>
      ))}
    </>
  );
}

function App() {
  // Scroll progress bar driven by page scroll, smoothed with a spring.
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Custom cursor: sharp navy dot follows exactly, soft orange glow lags via spring.
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const glowX = useSpring(cursorX, { stiffness: 150, damping: 15 });
  const glowY = useSpring(cursorY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  const HomePage = (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          transformOrigin: '0%',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: 'var(--accent)',
          zIndex: 9999,
        }}
      />

      {/* Custom cursor */}
      <motion.div
        className={styles.cursorGlow}
        style={{ x: glowX, y: glowY }}
      />
      <motion.div
        className={styles.cursorDot}
        style={{ x: cursorX, y: cursorY }}
      />

      <Navbar />

      <main>
        <Hero />

        {/* Scrolling marquee ticker */}
        <div className={styles.marquee}>
          <div className={styles.marqueeTrack}>
            <MarqueeGroup />
            <MarqueeGroup />
          </div>
        </div>

        <StatsBar />
        <div id="about" style={anchor}>
          <AboutSection />
        </div>
        <div id="solutions" style={anchor}>
          <SolutionsSection />
        </div>
        <div id="industries" style={anchor}>
          <IndustriesSection />
        </div>
        <div id="workshops" style={anchor}>
          <WorkshopsSection />
        </div>
        <div id="testimonials" style={anchor}>
          <TestimonialsSection />
        </div>
        <div id="contact" style={anchor}>
          <ContactSection />
        </div>
        <div id="insights" style={anchor}>
          <InsightsSection />
        </div>
      </main>

      <Footer />

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            aria-label="Back to top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              width: 52,
              height: 52,
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
              zIndex: 9998,
            }}
          >
            <ChevronUp size={26} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <Routes>
      <Route path="/" element={HomePage} />
      <Route path="/v2" element={<V2Page />} />
    </Routes>
  );
}

export default App;
