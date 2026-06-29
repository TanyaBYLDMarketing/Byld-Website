import { Phone, Mail, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';
import styles from './Footer.module.css';

// This build of lucide-react ships no brand icons, so the socials use
// inline SVG paths instead.
const brandIcon = (path) =>
  function BrandIcon({ size = 20 }) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        {path}
      </svg>
    );
  };

const Linkedin = brandIcon(
  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.34 18.34V9.96H5.56v8.38zM6.95 8.73a1.61 1.61 0 1 0 0-3.22 1.61 1.61 0 0 0 0 3.22m11.39 9.61v-4.59c0-2.45-.53-4.34-3.39-4.34-1.38 0-2.3.75-2.68 1.47h-.04V9.96h-2.67v8.38h2.78v-4.15c0-1.09.21-2.15 1.56-2.15 1.34 0 1.36 1.25 1.36 2.22v4.08z" />
);

const Facebook = brandIcon(
  <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12" />
);

const Youtube = brandIcon(
  <path d="M23 12s0-3.18-.4-4.7a2.5 2.5 0 0 0-1.77-1.77C19.31 5.13 12 5.13 12 5.13s-7.31 0-8.83.4A2.5 2.5 0 0 0 1.4 7.3C1 8.82 1 12 1 12s0 3.18.4 4.7a2.5 2.5 0 0 0 1.77 1.77c1.52.4 8.83.4 8.83.4s7.31 0 8.83-.4a2.5 2.5 0 0 0 1.77-1.77c.4-1.52.4-4.7.4-4.7M9.75 15.02V8.98L15 12z" />
);

const Twitter = brandIcon(
  <path d="M22 5.8a8.5 8.5 0 0 1-2.36.65 4.13 4.13 0 0 0 1.81-2.27 8.2 8.2 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74 11.64 11.64 0 0 1-8.45-4.29 4.16 4.16 0 0 0 1.27 5.49A4.1 4.1 0 0 1 2.8 9.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.4a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.67-6.25 11.67-11.67v-.53A8.3 8.3 0 0 0 22 5.8" />
);

const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Facebook, label: 'Facebook' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Twitter, label: 'Twitter' },
];

const INFO = [
  { icon: Phone, text: '1800-102-5544' },
  { icon: Mail, text: 'info@byldgroup.com' },
  {
    icon: MapPin,
    text: 'BYLD Group Private Limited, 3rd Floor, Plot no. 48, Opp. DIT Regional Office, Gurugram, Haryana - 122003',
  },
];

const TOP_LINKS = [
  'Home',
  'About Us',
  'Blog',
  'Careers',
  'Client Corner',
  'Infrastructure',
  'Terms & Conditions',
  'Privacy Policy',
];

const SOLUTION_LINKS = [
  'Leadership & Performance',
  'Bespoke & Coaching',
  'Experiential Learning',
  'Staffing Solutions',
  'Employee Assessments',
  'Partner Network',
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* ===== Column 1: Brand ===== */}
          <div>
            <img src={logo} alt="BYLD Group" className={styles.footerLogo} />
            <p className={styles.tagline}>
              South Asia&apos;s Leading People Performance Company
            </p>

            <div className={styles.socials}>
              {SOCIALS.map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label} className={styles.socialIcon}>
                  <Icon size={20} />
                </a>
              ))}
            </div>

            <p className={styles.founded}>
              Founded in the year 1999, BYLD is the largest group in the South
              Asian region offering scientifically researched HR and business
              productivity solutions.
            </p>
          </div>

          {/* ===== Column 2: Information ===== */}
          <div>
            <h4 className={styles.heading}>Information</h4>
            <div className={styles.infoRows}>
              {INFO.map(({ icon: Icon, text }) => (
                <div key={text} className={styles.infoRow}>
                  <Icon className={styles.infoIcon} size={18} />
                  <span className={styles.infoText}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ===== Column 3: Top Links ===== */}
          <div>
            <h4 className={styles.heading}>Top Links</h4>
            <div className={styles.linkList}>
              {TOP_LINKS.map((link) => (
                <a key={link} href="#" className={styles.link}>
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* ===== Column 4: Our Solutions ===== */}
          <div>
            <h4 className={styles.heading}>Our Solutions</h4>
            <div className={styles.linkList}>
              {SOLUTION_LINKS.map((link) => (
                <a key={link} href="#" className={styles.link}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ===== Bottom bar ===== */}
        <div className={styles.bottomBar}>
          <span className={styles.copyright}>
            © 2024 BYLD Group. All Rights Reserved.
          </span>
          <span className={styles.legal}>
            <a href="#">Privacy Policy</a> | <a href="#">Terms &amp; Conditions</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
