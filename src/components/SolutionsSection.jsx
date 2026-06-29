import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Zap,
  BarChart2,
  Monitor,
  Briefcase,
  ShieldCheck,
  Check,
} from 'lucide-react';
import styles from './SolutionsSection.module.css';

const SOLUTIONS = [
  {
    name: 'Leadership & Performance',
    icon: TrendingUp,
    desc: 'Develop leaders who drive accountability, alignment, and sustained business performance.',
    bullets: [
      'Build high-impact leadership pipelines',
      'Drive measurable performance outcomes',
      'Align leadership with business strategy',
    ],
  },
  {
    name: 'Bespoke & Coaching',
    icon: Users,
    desc: 'Personalized journeys built to solve your unique organizational challenges.',
    bullets: [
      '1:1 and group coaching programs',
      'Custom curriculum design',
      'Ongoing impact measurement',
    ],
  },
  {
    name: 'Experiential Learning',
    icon: Zap,
    desc: 'Immersive simulations that engage adults through real-world application.',
    bullets: [
      'Gamified learning experiences',
      'Simulation-based skill building',
      'High engagement, lasting retention',
    ],
  },
  {
    name: 'Assessments',
    icon: BarChart2,
    desc: 'Data-backed insights that strengthen hiring, development, and team effectiveness.',
    bullets: [
      'Psychometric and behavioral tools',
      '360° feedback systems',
      'Talent benchmarking reports',
    ],
  },
  {
    name: 'Learning Management System',
    icon: Monitor,
    desc: 'Scalable digital-first learning journeys through integrated technology.',
    bullets: [
      'Cloud-based LMS platform',
      'Analytics and progress tracking',
      'Mobile-first learning delivery',
    ],
  },
  {
    name: 'Staffing Solutions',
    icon: Briefcase,
    desc: 'Agile workforce solutions that support organizational growth.',
    bullets: [
      'Contract and permanent staffing',
      'Executive search capabilities',
      'Workforce planning support',
    ],
  },
  {
    name: 'Verification System',
    icon: ShieldCheck,
    desc: 'Comprehensive, tech-enabled background verification that ensures every hire meets your standards.',
    bullets: [
      'End-to-end background checks',
      'Tech-enabled verification platform',
      'Trusted by 500+ organizations',
    ],
  },
];

const ROTATE_INTERVAL = 3500;
const CENTER = 280; // half of the 560px wheel
const RADIUS = 210;

// Evenly space the pills on the circle, starting from the top (12 o'clock).
const POSITIONS = SOLUTIONS.map((_, i) => {
  const angle = i * ((2 * Math.PI) / SOLUTIONS.length) - Math.PI / 2;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
});

function SolutionsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance; resets whenever activeIndex changes (incl. clicks).
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % SOLUTIONS.length);
    }, ROTATE_INTERVAL);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const active = SOLUTIONS[activeIndex];
  const activePos = POSITIONS[activeIndex];
  const number = String(activeIndex + 1).padStart(2, '0');

  return (
    <section className={styles.solutions} ref={ref}>
      <div className={styles.inner}>
        {/* ===== Section header ===== */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.label}>Our Solutions</span>
            <h2 className={styles.headline}>
              Solutions That Power Every Stage of Your Workforce Journey
            </h2>
          </div>
          <a href="#solutions" className={styles.headerCta}>
            Discover How We Drive Performance →
          </a>
        </div>

        <div className={styles.layout}>
          {/* ===== Left: content ===== */}
          <div className={styles.content}>
            <span className={styles.watermark}>{number}</span>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className={styles.panel}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <span className={styles.counter}>{number} / 07</span>
                <h3 className={styles.name}>{active.name}</h3>
                <p className={styles.desc}>{active.desc}</p>
                <ul className={styles.bullets}>
                  {active.bullets.map((b) => (
                    <li key={b} className={styles.bullet}>
                      <span className={styles.bulletIcon}>
                        <Check size={14} strokeWidth={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <a href="#solutions" className={styles.cta}>
                  Explore This Solution →
                </a>
              </motion.div>
            </AnimatePresence>

            {/* Auto-rotate progress bar (key resets the CSS animation) */}
            <div className={styles.progressTrack}>
              <div key={activeIndex} className={styles.progressFill} />
            </div>
          </div>

          {/* ===== Right: the wheel ===== */}
          <div className={styles.wheel}>
            <div className={styles.radial} />
            <div className={styles.ring1} />
            <div className={styles.ring2} />

            {/* Connector line from center to the active pill */}
            <svg className={styles.svg} viewBox="0 0 560 560">
              <motion.line
                key={activeIndex}
                x1={CENTER}
                y1={CENTER}
                initial={{ x2: CENTER, y2: CENTER }}
                animate={{ x2: activePos.x, y2: activePos.y }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                stroke="#F47920"
                strokeWidth={1.5}
                strokeOpacity={0.4}
                strokeDasharray="4 4"
              />
            </svg>

            <div className={styles.center}>
              <div className={styles.centerInner}>BYLD</div>
            </div>

            {/* Decorative floating dots */}
            <span className={`${styles.dot} ${styles.dot1}`} />
            <span className={`${styles.dot} ${styles.dot2}`} />
            <span className={`${styles.dot} ${styles.dot3}`} />

            {/* Pills */}
            {SOLUTIONS.map((sol, i) => {
              const { x, y } = POSITIONS[i];
              const Icon = sol.icon;
              const isActive = i === activeIndex;
              return (
                <div
                  key={sol.name}
                  className={styles.pillWrap}
                  style={{ left: x, top: y }}
                >
                  <motion.button
                    type="button"
                    className={`${styles.pill} ${isActive ? `${styles.pillActive} ${styles.pillFlip}` : ''}`}
                    onClick={() => setActiveIndex(i)}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      inView
                        ? { scale: isActive ? 1.08 : 1, opacity: 1 }
                        : { scale: 0, opacity: 0 }
                    }
                    transition={{
                      scale: { type: 'spring', stiffness: 320, damping: 18 },
                      opacity: {
                        duration: 0.35,
                        delay: inView ? 0.2 + i * 0.08 : 0,
                      },
                    }}
                  >
                    <Icon className={styles.pillIcon} size={16} />
                    {sol.name}
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SolutionsSection;
