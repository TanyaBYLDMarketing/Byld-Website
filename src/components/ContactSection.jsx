import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import styles from './ContactSection.module.css';

const CONTACT_INFO = [
  { icon: Phone, text: '+91 1800-102-5544' },
  { icon: Mail, text: 'info@byldgroup.com' },
  {
    icon: MapPin,
    text: 'BYLD Group Private Limited, 3rd Floor, Plot no. 48, Opp. DIT Regional Office, Gurugram, Haryana - 122003',
  },
];

const fieldsContainer = {
  hidden: {},
  visible: { transition: { delayChildren: 0.2, staggerChildren: 0.1 } },
};

const fieldVariant = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } },
};

function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className={styles.contact} ref={ref}>
      {/* ===== Left navy column ===== */}
      <motion.div
        className={styles.left}
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className={`${styles.circle} ${styles.circle1}`} aria-hidden="true" />
        <span className={`${styles.circle} ${styles.circle2}`} aria-hidden="true" />

        <div className={styles.leftContent}>
          <span className={styles.label}>Get in Touch</span>
          <h2 className={styles.headline}>What&apos;s Next for Your Organization?</h2>
          <p className={styles.body}>
            Whether you&apos;re strengthening leadership, scaling workforce
            capability, or designing integrated Corporate HR Solutions, BYLD
            Group partners with you to turn people strategy into measurable
            performance.
          </p>

          <div className={styles.infoRows}>
            {CONTACT_INFO.map(({ icon: Icon, text }) => (
              <div key={text} className={styles.infoRow}>
                <Icon className={styles.infoIcon} size={20} />
                <span className={styles.infoText}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ===== Right white form column ===== */}
      <motion.div
        className={styles.right}
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h3 className={styles.formTitle}>
          Build Smarter Leaders, Stronger Teams.
        </h3>

        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          variants={fieldsContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className={styles.formRow} variants={fieldVariant}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="name">
                Full Name
              </label>
              <input id="name" className={styles.input} type="text" placeholder="John Doe" />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="email">
                Email Address
              </label>
              <input id="email" className={styles.input} type="email" placeholder="john@company.com" />
            </div>
          </motion.div>

          <motion.div className={styles.formRow} variants={fieldVariant}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="designation">
                Designation
              </label>
              <input id="designation" className={styles.input} type="text" placeholder="Head of HR" />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="location">
                Location
              </label>
              <input id="location" className={styles.input} type="text" placeholder="Gurugram" />
            </div>
          </motion.div>

          <motion.div className={styles.formRow} variants={fieldVariant}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="solutions">
                Our Solutions
              </label>
              <select id="solutions" className={styles.select} defaultValue="">
                <option value="" disabled>
                  Select a solution
                </option>
                <option>Leadership &amp; Performance</option>
                <option>Bespoke &amp; Coaching</option>
                <option>Experiential Learning</option>
                <option>Assessment</option>
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="needs">
                Needs
              </label>
              <select id="needs" className={styles.select} defaultValue="">
                <option value="" disabled>
                  Select your need
                </option>
                <option>Leadership Development</option>
                <option>Workforce Capability</option>
                <option>HR Technology</option>
                <option>Talent Solutions</option>
              </select>
            </div>
          </motion.div>

          <motion.div className={styles.fieldFull} variants={fieldVariant}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="referral">
                How did you hear about us?
              </label>
              <input id="referral" className={styles.input} type="text" placeholder="LinkedIn, referral, event..." />
            </div>
          </motion.div>

          <motion.button type="submit" className={styles.submit} variants={fieldVariant}>
            Book a Consultation Call
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
}

export default ContactSection;
