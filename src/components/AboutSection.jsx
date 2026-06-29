import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import styles from './AboutSection.module.css';

const CARDS = [
  {
    bar: 'topNavy',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop',
  },
  {
    bar: 'topOrange',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=200&fit=crop',
  },
  {
    bar: 'topNavy',
    img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=200&fit=crop',
  },
  {
    bar: 'topOrange',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=200&fit=crop',
  },
];

const TRUST_POINTS = [
  '27+ Years of Experience',
  '1000+ Organizations Served',
  "South Asia's #1 HR Solutions Partner",
];

const cardVariant = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.about} ref={ref}>
      <div className={styles.inner}>
        {/* ===== Left: icon cards ===== */}
        <motion.div
          className={styles.grid}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ staggerChildren: 0.12 }}
        >
          {CARDS.map(({ bar, img }, i) => (
            <motion.div key={i} className={styles.card} variants={cardVariant}>
              <span className={`${styles.topBar} ${styles[bar]}`} />
              <img src={img} alt="" className={styles.cardImg} loading="lazy" />
            </motion.div>
          ))}
        </motion.div>

        {/* ===== Right: content ===== */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className={styles.label}>About Company</span>
          <h2 className={styles.headline}>
            South Asia&apos;s Leading People Performance Platform
          </h2>
          <p className={styles.body}>
            For over 17 years, BYLD Group has partnered with organisations that
            see people as their true competitive advantage. We blend
            best-in-class science, world-class content, and scalable delivery to
            build lasting leaders, aligned teams, and future-ready capabilities.
            From global enterprises to growing businesses, our integrated
            Corporate HR Solutions solve real workforce challenges — reducing
            time-to-hire, closing skill gaps, and driving measurable performance.
          </p>

          <a href="#about" className={styles.cta}>
            Learn More →
          </a>

          <div className={styles.trustPoints}>
            {TRUST_POINTS.map((text) => (
              <div key={text} className={styles.trustPoint}>
                <span className={styles.checkCircle}>
                  <Check size={18} strokeWidth={3} />
                </span>
                {text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
