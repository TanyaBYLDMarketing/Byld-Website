import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Our Solutions', id: 'solutions' },
  { label: 'About Us', id: 'about' },
  { label: 'Events', id: 'workshops' },
  { label: 'Media', id: 'insights' },
  { label: 'Resources', id: 'industries' },
  { label: 'Contact Us', id: 'contact' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Auto-close the mobile drawer once the user scrolls past 100px.
      if (window.scrollY > 100) {
        setMenuOpen(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Row 1: top bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <a href="#careers" className={styles.topLink}>
            Careers
          </a>
          <a href="#subscribe" className={styles.topLink}>
            Subscribe
          </a>
        </div>
      </div>

      {/* Row 2: main nav */}
      <nav className={styles.mainBar}>
        <a href="#home" className={styles.logoLink}>
          <img src={logo} alt="BYLD Group" className={styles.logo} />
        </a>

        <ul className={styles.navLinks}>
          {NAV_LINKS.map(({ label, id }) => (
            <li key={label}>
              <a
                href={`#${id}`}
                className={styles.navLink}
                onClick={(e) => handleNavClick(e, id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <a href="#explore" className={styles.cta}>
            Explore Now
          </a>
          <button
            type="button"
            className={styles.hamburger}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.drawer}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <div className={styles.drawerInner}>
              {NAV_LINKS.map(({ label, id }) => (
                <a
                  key={label}
                  href={`#${id}`}
                  className={styles.drawerLink}
                  onClick={(e) => handleNavClick(e, id)}
                >
                  {label}
                </a>
              ))}

              <a
                href="#explore"
                className={styles.drawerCta}
                onClick={() => setMenuOpen(false)}
              >
                Explore Now
              </a>
              <a
                href="#consultation"
                className={styles.drawerConsult}
                onClick={() => setMenuOpen(false)}
              >
                Book a Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
