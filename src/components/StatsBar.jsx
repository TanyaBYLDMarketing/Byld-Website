import { Fragment, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './StatsBar.module.css';

const STATS = [
  { value: 2, suffix: 'M+', label: 'Professionals trained across Industries' },
  { value: 1, suffix: 'K+', label: "Organizations served across Business World's" },
  { value: 27, suffix: '+', label: 'Years in Learning & Talent Transformation' },
  { value: 50, suffix: '%', label: 'Fortune 500 companies Served' },
];

const COUNT_DURATION = 2000; // ms

// Counts up from 0 to `target` using requestAnimationFrame (timestamp-based,
// so progress is always correct regardless of frame rate).
function CountUp({ target, suffix, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf;
    const end = target;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / COUNT_DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setCount(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.statsBar} ref={ref}>
      <div className={styles.inner}>
        {STATS.map((stat, i) => (
          <Fragment key={stat.label}>
            <div className={styles.stat}>
              <div className={styles.value}>
                <CountUp target={stat.value} suffix={stat.suffix} start={inView} />
              </div>
              <motion.div
                className={styles.underline}
                initial={{ width: 0 }}
                animate={inView ? { width: 40 } : { width: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
              />
              <p className={styles.label}>{stat.label}</p>
            </div>
            {i < STATS.length - 1 && <span className={styles.divider} />}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

export default StatsBar;
