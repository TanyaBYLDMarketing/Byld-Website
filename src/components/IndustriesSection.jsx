import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './IndustriesSection.module.css';

const INDUSTRIES = [
  'Global Capability Centers (GCCs)',
  'Financial & Business Services',
  'Industrial & Manufacturing',
  'Healthcare & Life Sciences',
  'Consumer & Retail Enterprises',
  'Technology & Digital',
];

const rowVariant = {
  hidden: { x: 30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

function IndustriesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.industries} ref={ref}>
      {/* ===== Left navy column ===== */}
      <motion.div
        className={styles.left}
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className={styles.leftHeadline}>
          Trusted by Leaders. Proven by Impact.
        </h2>
        <p className={styles.leftBody}>
          From leadership transformation to enterprise-wide Corporate HR
          Solutions, BYLD has consistently driven capability, alignment, and
          results.
        </p>
        <a href="#industries" className={styles.leftCta}>
          Learn More →
        </a>
        <div className={styles.caseImage}>
          <img
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop"
            alt="Case study"
            className={styles.caseImg}
            loading="lazy"
          />
        </div>
      </motion.div>

      {/* ===== Right white column ===== */}
      <div className={styles.right}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h3 className={styles.rightTitle}>Industry-Agnostic Solutions</h3>
          <p className={styles.rightSubtitle}>
            We work across sectors to deliver impact at scale
          </p>
        </motion.div>

        <motion.div
          className={styles.list}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delayChildren: 0.2, staggerChildren: 0.08 }}
        >
          {INDUSTRIES.map((name, i) => (
            <motion.a
              key={name}
              href="#industries"
              className={styles.row}
              variants={rowVariant}
            >
              <span className={styles.rowName}>
                <ArrowRight className={styles.arrow} size={20} />
                {name}
              </span>
              <span className={styles.rowNum}>
                {String(i + 1).padStart(2, '0')}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default IndustriesSection;
