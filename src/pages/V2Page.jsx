import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Zap,
  BarChart2,
  Monitor,
  Briefcase,
  ShieldCheck,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatsBar from '../components/StatsBar';
import styles from './V2Page.module.css';

// SVG coordinate space for the journey map.
const VW = 1200;
const VH = 460;
const MAP_H = 440; // rendered pixel height (vertical scale reference)

const STOPS = [
  { name: 'Leadership & Performance', icon: TrendingUp, color: 'navy', desc: 'Build leaders at every level', pos: 'above' },
  { name: 'Bespoke & Coaching', icon: Users, color: 'orange', desc: 'Personalized growth journeys', pos: 'below' },
  { name: 'Experiential Learning', icon: Zap, color: 'navy', desc: 'Learn by doing', pos: 'above' },
  { name: 'Assessments', icon: BarChart2, color: 'orange', desc: 'Measure what matters', pos: 'below' },
  { name: 'LMS', icon: Monitor, color: 'navy', desc: 'Scale learning digitally', pos: 'above' },
  { name: 'Staffing Solutions', icon: Briefcase, color: 'orange', desc: 'Right people, right roles', pos: 'below' },
  { name: 'Verification', icon: ShieldCheck, color: 'navy', desc: 'Trust every hire', pos: 'above' },
];

// Node positions: evenly spaced left→right, alternating above/below the centerline.
const NODES = STOPS.map((s, i) => ({
  x: 100 + i * (1000 / (STOPS.length - 1)),
  y: s.pos === 'above' ? 180 : 280,
}));

// Smooth bezier path flowing through every node (horizontal control tangents).
function buildPath(nodes) {
  let d = `M ${nodes[0].x} ${nodes[0].y}`;
  for (let i = 1; i < nodes.length; i++) {
    const p0 = nodes[i - 1];
    const p1 = nodes[i];
    const mid = (p1.x - p0.x) / 2;
    d += ` C ${p0.x + mid} ${p0.y}, ${p1.x - mid} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}
const PATH_D = buildPath(NODES);

export default function V2Page() {
  const mapRef = useRef(null);
  const inView = useInView(mapRef, { once: true, margin: '-80px' });

  return (
    <>
      <Navbar />

      <main>
        {/* ===== Hero: The HR Journey Map ===== */}
        <section className={styles.hero}>
          <div className={styles.dotGrid} />

          <div className={styles.heroInner}>
            <motion.span
              className={styles.badge}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              ⚡ The Complete HR Journey
            </motion.span>

            <motion.h1
              className={styles.headline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Every Stage of Your People Journey,
              <br />
              <span className={styles.accent}>Covered by BYLD</span>
            </motion.h1>

            <motion.p
              className={styles.subtext}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              From hiring to retiring — 7 integrated solutions that work together
              as one unified HR system
            </motion.p>

            {/* Journey map */}
            <div className={styles.mapScroll}>
              <div className={styles.map} ref={mapRef}>
                <svg
                  className={styles.svg}
                  viewBox={`0 0 ${VW} ${VH}`}
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="journeyGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#1B3C6B" />
                      <stop offset="100%" stopColor="#F47920" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={PATH_D}
                    fill="none"
                    stroke="url(#journeyGradient)"
                    strokeWidth={3}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 3, ease: 'easeInOut' }}
                  />
                </svg>

                {STOPS.map((s, i) => {
                  const n = NODES[i];
                  const Icon = s.icon;
                  const above = s.pos === 'above';
                  const delay = 0.4 + i * 0.4;
                  return (
                    <div
                      key={s.name}
                      className={styles.stop}
                      style={{
                        left: `${(n.x / VW) * 100}%`,
                        top: `${(n.y / VH) * MAP_H}px`,
                      }}
                    >
                      {/* Node */}
                      <motion.div
                        className={`${styles.node} ${
                          s.color === 'orange' ? styles.nodeOrange : styles.nodeNavy
                        }`}
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.4, delay: delay - 0.1, ease: 'backOut' }}
                      >
                        <Icon size={22} />
                      </motion.div>

                      {/* Dashed connector */}
                      <motion.span
                        className={`${styles.dash} ${
                          above ? styles.dashAbove : styles.dashBelow
                        }`}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.3, delay }}
                      />

                      {/* Card */}
                      <motion.div
                        className={`${styles.card} ${
                          above ? styles.cardAbove : styles.cardBelow
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
                      >
                        <span
                          className={`${styles.cardIcon} ${
                            s.color === 'orange' ? styles.iconOrange : styles.iconNavy
                          }`}
                        >
                          <Icon size={24} />
                        </span>
                        <div className={styles.cardName}>{s.name}</div>
                        <div className={styles.cardDesc}>{s.desc}</div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ===== Stats (reused from main site) ===== */}
        <StatsBar />

        {/* ===== CTA ===== */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaHeadline}>
              Ready to Transform Your People Strategy?
            </h2>
            <p className={styles.ctaSub}>
              Join 1000+ organizations who trust BYLD for their complete HR
              journey
            </p>
            <div className={styles.ctaButtons}>
              <a href="#start" className={styles.ctaPrimary}>
                Start Your Journey →
              </a>
              <a href="#solutions" className={styles.ctaSecondary}>
                View All Solutions
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
