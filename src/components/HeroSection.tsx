'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const roles = ['Luxury', 'Premium', 'Exclusive', 'Curated'];
const stats = [
  { num: '10', label: 'Products' },
  { num: '100+', label: 'Happy Clients' },
  { num: '3+', label: 'Years of Excellence' },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textY = useSpring(rawY, { stiffness: 80, damping: 25 });
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg,#0A0A0A 0%,#0D0B08 60%,#0A0A0A 100%)' }}>

      {/* Animated mesh gradient bg */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '20%', left: '15%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(201,168,76,1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ position: 'absolute', bottom: '15%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(201,168,76,1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }}
      />

      {/* Fine grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.018, backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Bottom gradient fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to top,#0A0A0A,transparent)', pointerEvents: 'none' }} />

      {/* Parallax content */}
      <motion.div style={{ y: textY, opacity, position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 1.5rem', maxWidth: '900px' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}
        >
          <div style={{ height: '1px', width: '32px', background: 'rgba(201,168,76,0.4)' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', fontWeight: 400 }}>
            Collection &apos;26
          </span>
          <div style={{ height: '1px', width: '32px', background: 'rgba(201,168,76,0.4)' }} />
        </motion.div>

        {/* Main title — blur-in reveal */}
        <motion.h1
          initial={{ opacity: 0, filter: 'blur(12px)', y: 50 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
          style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 'clamp(4rem,12vw,9.5rem)', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}
        >
          <span style={{ display: 'block', background: 'linear-gradient(135deg,#A07830 0%,#C9A84C 30%,#E8C97A 50%,#C9A84C 70%,#A07830 100%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 5s linear infinite' }}>
            Farhan&apos;s
          </span>
          <span style={{ display: 'block', color: 'rgba(245,240,232,0.88)', fontWeight: 400 }}>
            Store.
          </span>
        </motion.h1>

        {/* Role line */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 'clamp(0.9rem,2.2vw,1.2rem)', color: 'rgba(245,240,232,0.4)', marginBottom: '1rem', letterSpacing: '-0.01em' }}
        >
          A{' '}
          <motion.span
            key={roleIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: '#C9A84C', display: 'inline-block' }}
          >
            {roles[roleIndex]}
          </motion.span>
          {' '}destination for the discerning.
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.9rem', color: 'rgba(245,240,232,0.32)', maxWidth: '420px', margin: '0 auto 3rem', lineHeight: 1.85, letterSpacing: '0.01em' }}
        >
          Curated timepieces, rare fragrances, and bespoke shirts —
          crafted for those who demand nothing but the extraordinary.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          style={{ display: 'inline-flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '4rem' }}
        >
          {/* Primary */}
          <motion.button
            onClick={() => document.querySelector('#collections')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05, boxShadow: '0 0 0 1.5px #C9A84C, 0 12px 30px rgba(201,168,76,0.3)' }}
            whileTap={{ scale: 0.97 }}
            style={{ background: 'rgba(245,240,232,0.95)', color: '#0A0A0A', border: 'none', borderRadius: '9999px', padding: '0.85rem 2rem', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.02em', cursor: 'pointer' }}
          >
            See Collections ↗
          </motion.button>

          {/* Outline */}
          <motion.button
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05, boxShadow: '0 0 0 1.5px #C9A84C', borderColor: 'transparent' }}
            whileTap={{ scale: 0.97 }}
            style={{ background: 'transparent', color: 'rgba(245,240,232,0.75)', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: '9999px', padding: '0.85rem 2rem', fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.78rem', letterSpacing: '0.02em', cursor: 'pointer' }}
          >
            Our Story
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          style={{ display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2.5rem' }}
        >
          {stats.map(({ num, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.12 }}
              whileHover={{ y: -4 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 400, background: 'linear-gradient(135deg,#C9A84C,#E8C97A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>
                {num}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.3)', textTransform: 'uppercase', marginTop: '0.35rem' }}>
                {label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
      >
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(245,240,232,0.25)', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '40%', background: 'linear-gradient(180deg,transparent,#C9A84C,transparent)' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
