import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';
import styles from './TestimonialsSection.module.css';

const TESTIMONIALS = [
  {
    company: 'HCC',
    logoColor: '#1a5fb4',
    quote:
      'The BYLD team was incredibly collaborative, listening to our needs and consistently delivering solutions that exceeded our expectations.',
    name: 'Nancy Keira',
    title: 'Head of HR, HCC',
  },
  {
    company: 'ACC',
    logoColor: '#c0392b',
    quote:
      'As a result of our work with BYLD, we now have a proven leadership pipeline that has directly impacted our business outcomes and employee engagement.',
    name: 'Angad Singh',
    title: 'L&D Director, ACC',
  },
  {
    company: 'Maersk',
    logoColor: '#42a5f5',
    quote:
      'My ROI with BYLD has not only been financial but also in the quality of my team. They genuinely care about learning and development outcomes.',
    name: 'Mohita Tiwari',
    title: 'CHRO, Maersk',
  },
];

const ROTATE_INTERVAL = 4000;

function getInitials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const cardVariant = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.testimonials} ref={ref}>
      <div className={styles.inner}>
        {/* ===== Header ===== */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className={styles.label}>Testimonials</span>
          <h2 className={styles.headline}>Impact That Speaks</h2>
          <p className={styles.subtext}>Small shifts. Big difference.</p>
        </motion.div>

        {/* ===== Cards ===== */}
        <motion.div
          className={styles.cards}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ staggerChildren: 0.15 }}
        >
          {TESTIMONIALS.map((t, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div key={t.company} variants={cardVariant}>
                <motion.article
                  className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                  animate={{
                    scale: isActive ? 1.02 : 1,
                    boxShadow: isActive
                      ? '0 16px 40px rgba(27, 60, 107, 0.14)'
                      : '0 4px 24px rgba(0, 0, 0, 0.06)',
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <div className={styles.stars}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={16} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>

                  <span className={styles.quoteMark} aria-hidden="true">
                    &ldquo;
                  </span>
                  <p className={styles.quote}>{t.quote}</p>

                  <div className={styles.cardFooter}>
                    <div className={styles.person}>
                      <span className={styles.avatar}>{getInitials(t.name)}</span>
                      <div>
                        <div className={styles.personName}>{t.name}</div>
                        <div className={styles.personTitle}>{t.title}</div>
                      </div>
                    </div>
                    <span
                      className={styles.logo}
                      style={{ backgroundColor: t.logoColor }}
                    >
                      {t.company}
                    </span>
                  </div>
                </motion.article>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ===== Actions ===== */}
        <div className={styles.actions}>
          <div className={styles.dots}>
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.company}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
          <a href="#stories" className={styles.cta}>
            See Client Stories →
          </a>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
