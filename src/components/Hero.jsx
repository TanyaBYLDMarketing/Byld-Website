import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  TrendingUp,
  Users,
  Zap,
  BarChart2,
  Monitor,
  Briefcase,
  ShieldCheck,
  Check,
  CheckCircle,
  User,
  ArrowRight,
} from 'lucide-react';
import styles from './Hero.module.css';

// Headline lines — the last line has an orange accent span.
const HEADLINE_LINES = [
  { text: "Organizations Don't" },
  { text: 'Outperform Markets.' },
  { text: 'Their ', accent: 'People Do' },
];

const AVATARS = ['AR', 'MK', 'SP', 'TN', 'RJ'];

const SOLUTIONS = [
  {
    name: 'Leadership & Performance',
    label: 'Leadership',
    icon: TrendingUp,
    visual: 'org',
    desc: 'Develop leaders who drive accountability, alignment, and sustained business performance across all levels.',
    bullets: [
      'Build high-impact leadership pipelines',
      'Drive measurable performance outcomes',
      'Align teams with business strategy',
    ],
  },
  {
    name: 'Bespoke & Coaching',
    label: 'Coaching',
    icon: Users,
    visual: 'coaching',
    desc: 'Personalized coaching journeys built to solve your unique organizational challenges and unlock potential.',
    bullets: [
      '1:1 executive coaching programs',
      'Custom leadership curriculum',
      'Ongoing impact measurement',
    ],
  },
  {
    name: 'Experiential Learning',
    label: 'Experiential',
    icon: Zap,
    visual: 'process',
    desc: 'Immersive simulations that engage adults through real-world application and high-impact scenarios.',
    bullets: [
      'Gamified learning experiences',
      'Simulation-based skill building',
      'High engagement, lasting retention',
    ],
  },
  {
    name: 'Assessments',
    label: 'Assessment',
    icon: BarChart2,
    visual: 'donut',
    desc: 'Data-backed insights that strengthen hiring, development, and team effectiveness at every level.',
    bullets: [
      'Psychometric and behavioral tools',
      '360° feedback systems',
      'Talent benchmarking reports',
    ],
  },
  {
    name: 'Learning Management System',
    label: 'LMS',
    icon: Monitor,
    visual: 'lms',
    desc: 'Scalable digital-first learning journeys through an integrated technology platform built for enterprise.',
    bullets: [
      'Cloud-based LMS platform',
      'Analytics and progress tracking',
      'Mobile-first learning delivery',
    ],
  },
  {
    name: 'Staffing Solutions',
    label: 'Staffing',
    icon: Briefcase,
    visual: 'staffing',
    desc: 'Agile workforce solutions that support organizational growth and operational efficiency at scale.',
    bullets: [
      'Contract and permanent staffing',
      'Executive search capabilities',
      'Workforce planning support',
    ],
  },
  {
    name: 'Verification System',
    label: 'Verification',
    icon: ShieldCheck,
    visual: 'verification',
    desc: 'Comprehensive, tech-enabled background verification that ensures every hire meets your standards.',
    bullets: [
      'End-to-end background checks',
      'Tech-enabled verification platform',
      'Trusted by 500+ organizations',
    ],
  },
];

const TOTAL = SOLUTIONS.length; // 7
const ROTATE_INTERVAL = 3000;

const lineContainer = {
  hidden: {},
  visible: { transition: { delayChildren: 0.2, staggerChildren: 0.12 } },
};

const lineVariant = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
  },
};

// Unique visual per solution.
function SolutionVisual({ visual }) {
  switch (visual) {
    case 'org':
      return (
        <div className={styles.orgChart}>
          <div className={styles.orgRow}>
            <span className={`${styles.orgBox} ${styles.orgL1}`} />
          </div>
          <span className={styles.orgConnector} />
          <div className={styles.orgRow}>
            <span className={`${styles.orgBox} ${styles.orgL2}`} />
            <span className={`${styles.orgBox} ${styles.orgL2}`} />
          </div>
          <span className={styles.orgConnector} />
          <div className={styles.orgRow}>
            <span className={`${styles.orgBox} ${styles.orgL3}`} />
            <span className={`${styles.orgBox} ${styles.orgL3}`} />
            <span className={`${styles.orgBox} ${styles.orgL3}`} />
          </div>
        </div>
      );
    case 'coaching':
      return (
        <div className={styles.coachWrap}>
          <div className={styles.coachOrbit}>
            <span className={`${styles.coachDot} ${styles.coachDot1}`} />
            <span className={`${styles.coachDot} ${styles.coachDot2}`} />
            <span className={`${styles.coachDot} ${styles.coachDot3}`} />
          </div>
          <div className={styles.coachCenter}>
            <User size={26} />
          </div>
        </div>
      );
    case 'process':
      return (
        <div className={styles.process}>
          <div className={styles.processStep}>
            <span className={`${styles.processBox} ${styles.processNavy}`}>
              <Zap size={18} />
            </span>
            <span className={styles.processLabel}>Learn</span>
          </div>
          <ArrowRight className={styles.processArrow} size={16} />
          <div className={styles.processStep}>
            <span className={`${styles.processBox} ${styles.processOrange}`}>
              <Check size={18} />
            </span>
            <span className={styles.processLabel}>Apply</span>
          </div>
          <ArrowRight className={styles.processArrow} size={16} />
          <div className={styles.processStep}>
            <span className={`${styles.processBox} ${styles.processNavy}`}>
              <TrendingUp size={18} />
            </span>
            <span className={styles.processLabel}>Grow</span>
          </div>
        </div>
      );
    case 'donut':
      return (
        <div className={styles.donut}>
          <div className={styles.donutText}>
            <div className={styles.donutPct}>75%</div>
            <div className={styles.donutSub}>Match</div>
          </div>
        </div>
      );
    case 'lms':
      return (
        <div className={styles.lms}>
          <div>
            <div className={styles.lmsLabel}>
              <span>Onboarding</span>
              <span>60%</span>
            </div>
            <div className={styles.lmsTrack}>
              <div className={styles.lmsFill} style={{ width: '60%' }} />
            </div>
          </div>
          <div>
            <div className={styles.lmsLabel}>
              <span>Certification</span>
              <span>80%</span>
            </div>
            <div className={styles.lmsTrack}>
              <div className={styles.lmsFill} style={{ width: '80%' }} />
            </div>
          </div>
        </div>
      );
    case 'staffing':
      return (
        <div className={styles.staffing}>
          <span className={styles.staffPerson}>
            <User size={22} />
          </span>
          <span className={`${styles.staffPerson} ${styles.staffPersonActive}`}>
            <User size={22} />
          </span>
          <span className={styles.staffPerson}>
            <User size={22} />
          </span>
        </div>
      );
    case 'verification':
      return (
        <div className={styles.verification}>
          <div className={styles.verifyRow}>
            {[0, 1, 2, 3, 4].map((i) => {
              const isMiddle = i === 2;
              return (
                <span
                  key={i}
                  className={`${styles.verifyPerson} ${
                    isMiddle ? styles.verifyPersonActive : ''
                  }`}
                >
                  <User size={24} />
                  {isMiddle && (
                    <CheckCircle className={styles.verifyCheck} size={16} />
                  )}
                </span>
              );
            })}
          </div>
          <span className={styles.verifyLabel}>Verified Hire</span>
        </div>
      );
    default:
      return null;
  }
}

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance through all items; resets whenever activeIndex changes.
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % TOTAL);
    }, ROTATE_INTERVAL);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const active = SOLUTIONS[activeIndex];
  const number = String(activeIndex + 1).padStart(2, '0');

  // 3D tilt on the right-side visual, driven by mouse position.
  const visualRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = visualRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const el = visualRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    el.style.transition = 'transform 0.5s ease';
  };

  const handleMouseEnter = () => {
    const el = visualRef.current;
    if (!el) return;
    el.style.transition = 'transform 0.1s ease';
  };

  return (
    <section className={styles.hero}>
      {/* Background */}
      <div className={styles.dotGrid} />
      <div className={styles.wash} />
      <span className={`${styles.deco} ${styles.deco1}`} />
      <span className={`${styles.deco} ${styles.deco2}`} />
      <span className={`${styles.deco} ${styles.deco3}`} />

      {/* Decorative rotating 3D cube */}
      <div className={styles.cube} aria-hidden="true">
        <span className={`${styles.cubeFace} ${styles.cubeFront}`} />
        <span className={`${styles.cubeFace} ${styles.cubeBack}`} />
        <span className={`${styles.cubeFace} ${styles.cubeLeft}`} />
        <span className={`${styles.cubeFace} ${styles.cubeRight}`} />
        <span className={`${styles.cubeFace} ${styles.cubeTop}`} />
        <span className={`${styles.cubeFace} ${styles.cubeBottom}`} />
      </div>

      <div className={styles.heroGrid}>
        {/* ===== Left content ===== */}
        <div className={styles.textColumn}>
          <motion.span
            className={styles.badge}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            ⚡ South Asia&apos;s #1 People Performance Platform
          </motion.span>

          <motion.h1
            className={styles.headline}
            variants={lineContainer}
            initial="hidden"
            animate="visible"
          >
            {HEADLINE_LINES.map((line, i) => (
              <motion.span key={i} className={styles.line} variants={lineVariant}>
                {line.text}
                {line.accent && (
                  <span className={styles.accent}>{line.accent}</span>
                )}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            className={styles.divider}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />

          <motion.p
            className={styles.subtext}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            For 27+ years, we&apos;ve integrated world-class learning, HR
            technology, and talent solutions into one unified Corporate HR
            system.
          </motion.p>

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <a href="#solutions" className={styles.btnPrimary}>
              Explore Solutions →
            </a>
            <a href="#consultation" className={styles.btnSecondary}>
              Book a Consultation
            </a>
          </motion.div>

          <motion.div
            className={styles.trust}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className={styles.avatars}>
              {AVATARS.map((initials) => (
                <span key={initials} className={styles.avatar}>
                  {initials}
                </span>
              ))}
            </div>
            <div className={styles.trustText}>
              <span className={styles.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <strong>Trusted by 1000+ organizations</strong>
            </div>
          </motion.div>
        </div>

        {/* ===== Right: solution showcase ===== */}
        <div
          className={styles.visualColumn}
          ref={visualRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
          <motion.div
            className={styles.showcase}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          >
            {/* Tab bar */}
            <div className={styles.tabBar}>
              {SOLUTIONS.map((sol, i) => {
                const Icon = sol.icon;
                const isActive = i === activeIndex;
                return (
                  <motion.button
                    key={sol.label}
                    type="button"
                    className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                    onClick={() => setActiveIndex(i)}
                    animate={{ scale: isActive ? 1.06 : 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <Icon size={24} />
                    <span className={styles.tabLabel}>{sol.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Content */}
            <div className={styles.contentWrap}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className={styles.contentArea}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <div className={styles.contentLeft}>
                    <span className={styles.cLabel}>{number} / 07</span>
                    <h3 className={styles.cName}>{active.name}</h3>
                    <p className={styles.cDesc}>{active.desc}</p>
                    <ul className={styles.cBullets}>
                      {active.bullets.map((b) => (
                        <li key={b} className={styles.cBullet}>
                          <Check className={styles.cBulletIcon} size={16} strokeWidth={3} />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <a href="#solutions" className={styles.cLearn}>
                      Learn More →
                    </a>
                  </div>

                  <motion.div
                    className={styles.contentRight}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
                  >
                    <SolutionVisual visual={active.visual} />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom bar */}
            <div className={styles.bottomBar}>
              <div className={styles.progressTrack}>
                <div key={activeIndex} className={styles.progressFill} />
              </div>
              <span className={styles.indicator}>{number} / 07</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
