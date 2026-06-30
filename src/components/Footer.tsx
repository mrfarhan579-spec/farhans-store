'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const footerLinks = {
  Collections: ['Watches', 'Bespoke Suits', 'Fragrances', 'Gift Sets', 'New Arrivals'],
  Services: ['Personal Styling', 'Gift Wrapping', 'Express Delivery', 'Authentication', 'After-Sales Care'],
  Company: ['Our Story', 'Press', 'Careers', 'Sustainability', 'Partners'],
  Support: ['FAQ', 'Contact Us', 'Size Guide', 'Care Instructions', 'Track Order'],
};

const marqueeText = 'FARHAN\'S STORE • LUXURY • WATCHES • PERFUMES • SHIRTS • ';

export default function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!marqueeRef.current) return;
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 35,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  return (
    <footer style={{ background: '#070707', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>

      {/* Subtle glow */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '700px', height: '200px', background: 'radial-gradient(ellipse at 50% 100%,rgba(201,168,76,0.04) 0%,transparent 70%)', pointerEvents: 'none' }} />

      {/* GSAP Marquee */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '1.2rem 0', overflow: 'hidden' }}>
        <div ref={marqueeRef} style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}>
          {Array(8).fill(marqueeText).map((t, i) => (
            <span key={i} style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 'clamp(1.5rem,4vw,2.5rem)', fontWeight: 400, color: 'rgba(201,168,76,0.12)', letterSpacing: '0.05em', paddingRight: '2rem' }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem 3rem', position: 'relative', zIndex: 1 }}>

        {/* Top CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '1.5rem' }}>
            Get in touch
          </p>
          <motion.a
            href="https://www.linkedin.com/in/farhan-mustafa-408632299"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, boxShadow: '0 0 0 1.5px #C9A84C, 0 15px 40px rgba(201,168,76,0.15)' }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 'clamp(1.8rem,5vw,3.5rem)', color: 'rgba(245,240,232,0.75)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', padding: '0.6rem 2.5rem', transition: 'border-color 0.3s' }}
          >
            Farhan Mustafa ↗
          </motion.a>
        </motion.div>

        {/* Link grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>

          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: '2rem', fontWeight: 400, background: 'linear-gradient(135deg,#C9A84C,#E8C97A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.3rem' }}>
              Farhan&apos;s
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', letterSpacing: '0.5em', color: 'rgba(201,168,76,0.35)', marginBottom: '1.5rem' }}>STORE · LUXURY</div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.82rem', color: 'rgba(245,240,232,0.28)', lineHeight: 1.9, maxWidth: '260px', marginBottom: '2rem' }}>
              Where luxury meets perfection. Curating the world&apos;s finest watches, suits, and fragrances since 2024.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {[{ label: 'IG', icon: '📸' }, { label: 'TW', icon: '🐦' }, { label: 'FB', icon: '👤' }, { label: 'YT', icon: '▶️' }].map(s => (
                <motion.a key={s.label} href="#"
                  whileHover={{ scale: 1.1, borderColor: 'rgba(201,168,76,0.4)', backgroundColor: 'rgba(201,168,76,0.06)' }}
                  style={{ width: '34px', height: '34px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', textDecoration: 'none', background: 'rgba(255,255,255,0.02)' }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links], colIdx) => (
            <motion.div key={category}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: colIdx * 0.08, duration: 0.7 }}
            >
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', fontWeight: 500, marginBottom: '1.5rem' }}>{category}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {links.map(link => (
                  <li key={link}>
                    <motion.a href="#"
                      whileHover={{ color: 'rgba(201,168,76,0.75)', x: 3 }}
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.8rem', color: 'rgba(245,240,232,0.28)', textDecoration: 'none', display: 'block', transition: 'color 0.25s' }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '2rem' }} />
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4CC978' }}
            />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(245,240,232,0.3)' }}>Available for orders</span>
          </div>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', letterSpacing: '0.12em', color: 'rgba(245,240,232,0.18)' }}>
            © {new Date().getFullYear()} Farhan&apos;s Store. All rights reserved.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy', 'Terms', 'Cookies'].map(item => (
              <motion.a key={item} href="#"
                whileHover={{ color: 'rgba(201,168,76,0.6)' }}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'rgba(245,240,232,0.18)', textDecoration: 'none', transition: 'color 0.25s' }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
