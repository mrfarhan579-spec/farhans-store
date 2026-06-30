'use client';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 80));

  const links = [
    { label: 'Home', href: '#' },
    { label: 'Watches', href: '#watches' },
    { label: 'Perfumes', href: '#perfumes' },
    { label: 'Shirts', href: '#suits' },
    { label: 'About', href: '#about' },
  ];

  const scroll = (href: string) => {
    if (href === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, display: 'flex', justifyContent: 'center', padding: '1.2rem 1.5rem 0', pointerEvents: 'none' }}
    >
      {/* Pill */}
      <motion.div
        animate={{
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5)' : '0 2px 12px rgba(0,0,0,0.2)',
        }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
          borderRadius: '9999px',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: scrolled ? 'rgba(15,15,15,0.92)' : 'rgba(15,15,15,0.75)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '6px',
          pointerEvents: 'all',
          transition: 'background 0.4s ease',
        }}
      >
        {/* Logo circle */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          onClick={() => scroll('#')}
          style={{ position: 'relative', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', padding: '2px', background: 'linear-gradient(135deg,#A07830,#C9A84C,#E8C97A)', flexShrink: 0 }}
        >
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: '0.8rem', color: '#C9A84C', letterSpacing: '0.05em' }}>
            FS
          </div>
        </motion.div>

        {/* Divider */}
        <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.08)', margin: '0 4px' }} />

        {/* Nav links */}
        {links.map(link => (
          <motion.button
            key={link.label}
            onClick={() => scroll(link.href)}
            whileHover={{ color: 'rgba(245,240,232,1)', backgroundColor: 'rgba(255,255,255,0.06)' }}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px 14px', borderRadius: '9999px', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 400, color: 'rgba(245,240,232,0.55)', letterSpacing: '0.01em', whiteSpace: 'nowrap', transition: 'color 0.25s, background 0.25s' }}
          >
            {link.label}
          </motion.button>
        ))}

        {/* Divider */}
        <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.08)', margin: '0 4px' }} />

        {/* Cart button */}
        <motion.button
          onClick={() => setCartCount(c => c + 1)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '9999px', background: 'linear-gradient(135deg,#A07830,#C9A84C,#E8C97A)', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, color: '#0A0A0A', letterSpacing: '0.01em', whiteSpace: 'nowrap' }}
        >
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
          Shop ↗
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400 }}
              style={{ position: 'absolute', top: '-5px', right: '-5px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', color: '#0A0A0A', fontSize: '0.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {cartCount}
            </motion.span>
          )}
        </motion.button>
      </motion.div>
    </motion.header>
  );
}
