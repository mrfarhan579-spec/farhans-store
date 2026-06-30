'use client';
import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { label: 'Collections', href: '#collections' },
    { label: 'Watches', href: '#watches' },
    { label: 'Perfumes', href: '#perfumes' },
    { label: 'Shirts', href: '#suits' },
    { label: 'About', href: '#about' },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        padding: '0 3rem',
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.1)' : '1px solid transparent',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <motion.a href="#" whileHover={{ scale: 1.02 }} style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <div style={{ fontFamily: 'Cormorant, serif', fontSize: '1.4rem', fontWeight: 600, letterSpacing: '0.12em', background: 'linear-gradient(135deg,#C9A84C 0%,#E8C97A 50%,#C9A84C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            FARHAN&apos;S
          </div>
          <div style={{ fontFamily: 'Jost', fontSize: '0.45rem', letterSpacing: '0.55em', color: 'rgba(201,168,76,0.4)' }}>
            STORE · LUXURY
          </div>
        </motion.a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
              whileHover={{ color: '#C9A84C', y: -2 }}
              onClick={e => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{ fontFamily: 'Jost', fontSize: '0.72rem', letterSpacing: '0.18em', color: 'rgba(245,240,232,0.6)', textDecoration: 'none', textTransform: 'uppercase', cursor: 'pointer', transition: 'color 0.3s ease' }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          {/* Search */}
          <motion.button whileHover={{ scale: 1.1, color: '#C9A84C' }} whileTap={{ scale: 0.9 }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,240,232,0.5)', padding: '0.4rem', transition: 'color 0.3s ease' }}>
            <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </motion.button>

          {/* Wishlist */}
          <motion.button whileHover={{ scale: 1.1, color: '#C9A84C' }} whileTap={{ scale: 0.9 }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,240,232,0.5)', padding: '0.4rem', transition: 'color 0.3s ease' }}>
            <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </motion.button>

          {/* Cart */}
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setCartCount(c => c + 1)}
            style={{ position: 'relative', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '8px', cursor: 'pointer', color: '#C9A84C', padding: '0.45rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span style={{ fontFamily: 'Jost', fontSize: '0.62rem', letterSpacing: '0.1em' }}>Cart</span>
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                style={{ position: 'absolute', top: '-6px', right: '-6px', width: '18px', height: '18px', borderRadius: '50%', background: '#C9A84C', color: '#0A0A0A', fontSize: '0.55rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
