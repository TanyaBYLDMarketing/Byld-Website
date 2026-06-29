import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Download, FileText, Play } from 'lucide-react';
import styles from './InsightsSection.module.css';

const CARDS = [
  {
    icon: BookOpen,
    imgClass: 'imgNavy',
    label: 'Blogs',
    desc: 'Stay updated with the latest trends in leadership, L&D, and workforce transformation.',
  },
  {
    icon: Download,
    imgClass: 'imgOrange',
    label: 'E-books',
    desc: 'Download comprehensive guides on HR solutions, leadership frameworks, and capability building.',
  },
  {
    icon: FileText,
    imgClass: 'imgTeal',
    label: 'White Papers',
    desc: 'Access research-backed white papers on performance, talent strategy, and organizational development.',
  },
  {
    icon: Play,
    imgClass: 'imgPurple',
    label: 'Books',
    desc: 'Explore curated book recommendations from our learning and development experts.',
  },
];

const cardVariant = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

function InsightsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.insights} ref={ref}>
      <div className={styles.inner}>
        {/* ===== Header ===== */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className={styles.headline}>Insights That Strengthen Execution</h2>
          <p className={styles.subtext}>
            Explore articles, case studies, white papers, and more to stay ahead
            in learning and development
          </p>
        </motion.div>

        {/* ===== Cards ===== */}
        <motion.div
          className={styles.cards}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ staggerChildren: 0.12 }}
        >
          {CARDS.map(({ icon: Icon, imgClass, label, desc }) => (
            <motion.article key={label} className={styles.card} variants={cardVariant}>
              <div className={`${styles.cardImage} ${styles[imgClass]}`}>
                <Icon size={48} strokeWidth={1.5} />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardLabel}>{label}</h3>
                <p className={styles.cardDesc}>{desc}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* ===== CTA banner ===== */}
        <motion.div
          className={styles.banner}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
        >
          <p className={styles.bannerText}>
            Turn Capability Into Competitive Advantage
          </p>
          <a href="#contact" className={styles.bannerCta}>
            Start Your Transformation →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default InsightsSection;
