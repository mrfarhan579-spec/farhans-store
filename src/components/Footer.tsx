'use client';
import { motion } from 'framer-motion';

const footerLinks = {
  Collections: ['Watches', 'Bespoke Suits', 'Fragrances', 'Gift Sets', 'New Arrivals'],
  Services: ['Personal Styling', 'Gift Wrapping', 'Express Delivery', 'Authentication', 'After-Sales Care'],
  Company: ['Our Story', 'Press', 'Careers', 'Sustainability', 'Partners'],
  Support: ['FAQ', 'Contact Us', 'Size Guide', 'Care Instructions', 'Track Order'],
};

export default function Footer() {
  return (
    <footer style={{ background: '#070707', borderTop: '1px solid rgba(201,168,76,0.1)', padding: '6rem 2rem 3rem', position: 'relative', overflow: 'hidden' }}>

      {/* Subtle bg glow */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '300px', background: 'radial-gradient(ellipse at 50% 100%,rgba(201,168,76,0.04) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '5rem' }}>

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'Cormorant, serif', fontSize: '1.8rem', fontWeight: 600, letterSpacing: '0.12em', background: 'linear-gradient(135deg,#C9A84C 0%,#E8C97A 50%,#C9A84C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.3rem' }}>
                FARHAN&apos;S
              </div>
              <div style={{ fontFamily: 'Jost', fontSize: '0.55rem', letterSpacing: '0.5em', color: 'rgba(201,168,76,0.4)' }}>STORE · LUXURY</div>
            </div>
            <p style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: '0.82rem', color: 'rgba(245,240,232,0.35)', lineHeight: 1.9, maxWidth: '260px', marginBottom: '2rem' }}>
              Where luxury meets perfection. Curating the world&apos;s finest watches, suits, and fragrances since 2024.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[{ label: 'IG', icon: '📸' }, { label: 'TW', icon: '🐦' }, { label: 'FB', icon: '👤' }, { label: 'YT', icon: '▶️' }].map(s => (
                <motion.a key={s.label} href="#"
                  whileHover={{ scale: 1.1, borderColor: 'rgba(201,168,76,0.5)', backgroundColor: 'rgba(201,168,76,0.08)' }}
                  whileTap={{ scale: 0.95 }}
                  style={{ width: '36px', height: '36px', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', textDecoration: 'none', background: 'rgba(255,255,255,0.02)' }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links], colIdx) => (
            <motion.div key={category}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: colIdx * 0.1, duration: 0.8 }}
            >
              <h4 style={{ fontFamily: 'Jost', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: '1.5rem' }}>
                {category}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {links.map((link, li) => (
                  <motion.li key={link}
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: colIdx * 0.1 + li * 0.05 }}
                  >
                    <motion.a href="#"
                      whileHover={{ color: 'rgba(201,168,76,0.8)', x: 4 }}
                      style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: '0.82rem', color: 'rgba(245,240,232,0.35)', textDecoration: 'none', display: 'block', transition: 'color 0.3s' }}
                    >
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)', marginBottom: '2.5rem', transformOrigin: 'center' }}
        />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
        >
          <p style={{ fontFamily: 'Jost', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(245,240,232,0.2)' }}>
            © {new Date().getFullYear()} Farhan&apos;s Store. All rights reserved. Luxury redefined.
          </p>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <motion.a key={item} href="#"
                whileHover={{ color: 'rgba(201,168,76,0.6)' }}
                style={{ fontFamily: 'Jost', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'rgba(245,240,232,0.2)', textDecoration: 'none', transition: 'color 0.3s' }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {['💳', '🏦', '₿', 'A'].map((icon, i) => (
              <motion.div key={i} whileHover={{ scale: 1.1, borderColor: 'rgba(201,168,76,0.2)' }}
                style={{ width: '36px', height: '24px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', cursor: 'default' }}>
                {icon}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
