import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import styles from './WorkshopsSection.module.css';

const FEATURES = [
  'Expert-led sessions across key verticals',
  'Actionable strategies for immediate results',
  'Live + recorded formats available',
];

const featuresContainer = {
  hidden: {},
  visible: { transition: { delayChildren: 0.2, staggerChildren: 0.12 } },
};

const featureVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

function WorkshopsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.workshops} ref={ref}>
      <div className={styles.inner}>
        {/* ===== Left: white glow card ===== */}
        <motion.div
          className={styles.imageWrap}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
            alt="Workshop in session"
            className={styles.image}
            loading="lazy"
          />
        </motion.div>

        {/* ===== Right content ===== */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className={styles.label}>Workshops &amp; Webinars</span>
          <h2 className={styles.headline}>
            Workshops &amp; Webinars Built for Impact
          </h2>
          <p className={styles.body}>
            Participate in curated workshops and live sessions across key
            verticals — from leadership and performance to workforce solutions
            and digital enablement. Each session is designed to equip you with
            actionable strategies that drive progress and deliver results.
          </p>

          <a href="#workshops" className={styles.cta}>
            Explore More →
          </a>

          <motion.div
            className={styles.features}
            variants={featuresContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {FEATURES.map((text) => (
              <motion.div key={text} className={styles.feature} variants={featureVariant}>
                <span className={styles.checkIcon}>
                  <Check size={16} strokeWidth={3} />
                </span>
                {text}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default WorkshopsSection;
