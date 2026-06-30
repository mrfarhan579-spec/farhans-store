'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const stats = [
  { num: '10', label: 'Products' },
  { num: '100+', label: 'Happy Clients' },
  { num: '3+', label: 'Years of Excellence' },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const textY = useSpring(rawY, { stiffness: 80, damping: 25 });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: 'radial-gradient(ellipse at 20% 50%,rgba(201,168,76,0.06) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(201,168,76,0.04) 0%,transparent 50%),linear-gradient(180deg,#0A0A0A 0%,#0F0D0A 50%,#0A0A0A 100%)' }}>

      {/* Orb 1 */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
        <div style={{ position: 'absolute', top: '10%', left: '3%', width: '600px', height: '600px', background: 'radial-gradient(circle,rgba(201,168,76,0.08) 0%,transparent 70%)', borderRadius: '50%', filter: 'blur(50px)', animation: 'float 9s ease-in-out infinite', pointerEvents: 'none' }} />
      </motion.div>

      {/* Orb 2 */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5, delay: 0.3 }}>
        <div style={{ position: 'absolute', bottom: '10%', right: '3%', width: '450px', height: '450px', background: 'radial-gradient(circle,rgba(201,168,76,0.05) 0%,transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', animation: 'float 11s ease-in-out infinite reverse', pointerEvents: 'none' }} />
      </motion.div>

      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.025, backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      {/* Scroll label */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2, duration: 0.8 }}
        style={{ position: 'absolute', left: '2.5rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '1px', height: '70px', background: 'linear-gradient(180deg,transparent,rgba(201,168,76,0.4))' }} />
        <span style={{ fontFamily: 'Jost', fontSize: '0.55rem', letterSpacing: '0.35em', color: 'rgba(201,168,76,0.45)', writingMode: 'vertical-rl', textTransform: 'uppercase' }}>Scroll Down</span>
        <div style={{ width: '1px', height: '70px', background: 'linear-gradient(180deg,rgba(201,168,76,0.4),transparent)' }} />
      </motion.div>

      {/* Social */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2, duration: 0.8 }}
        style={{ position: 'absolute', right: '2.5rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {['IG', 'TW', 'YT'].map(s => (
          <motion.a key={s} href="#" whileHover={{ color: '#C9A84C', x: -3 }}
            style={{ fontFamily: 'Jost', fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(201,168,76,0.35)', textDecoration: 'none' }}>
            {s}
          </motion.a>
        ))}
      </motion.div>

      {/* Main content */}
      <motion.div style={{ y: textY, opacity, textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 2rem' }}>

        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
            style={{ height: '1px', width: '45px', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.5))', transformOrigin: 'right' }} />
          <span style={{ fontFamily: 'Jost', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase', fontSize: '0.68rem', color: '#C9A84C' }}>
            Luxury Collection 2026
          </span>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
            style={{ height: '1px', width: '45px', background: 'linear-gradient(90deg,rgba(201,168,76,0.5),transparent)', transformOrigin: 'left' }} />
        </motion.div>

        {/* Title — word by word */}
        <h1 style={{ fontFamily: 'Cormorant, serif', fontWeight: 600, fontSize: 'clamp(4rem,11vw,9rem)', lineHeight: 0.92, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            style={{ display: 'block', background: 'linear-gradient(135deg,#A07830 0%,#C9A84C 30%,#E8C97A 50%,#C9A84C 70%,#A07830 100%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 4s linear 1.5s infinite' }}
          >
            FARHAN&apos;S
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9 }}
            style={{ display: 'block', color: 'rgba(245,240,232,0.9)', fontStyle: 'italic', fontWeight: 300 }}
          >
            STORE
          </motion.span>
        </h1>

        {/* Tagline */}
        <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}
          style={{ fontFamily: 'Jost', fontWeight: 300, fontSize: 'clamp(0.75rem,1.8vw,1rem)', letterSpacing: '0.35em', color: 'rgba(245,240,232,0.4)', textTransform: 'uppercase', marginBottom: '3rem' }}>
          Where Luxury Meets Perfection
        </motion.p>

        {/* Description */}
        <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}
          style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: 'clamp(0.82rem,1.4vw,0.98rem)', color: 'rgba(245,240,232,0.38)', maxWidth: '480px', margin: '0 auto 3.5rem', lineHeight: 1.85 }}>
          Curated timepieces, rare fragrances, and bespoke shirts —
          crafted for those who demand nothing but the extraordinary.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.button
            onClick={() => document.querySelector('#collections')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(201,168,76,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{ background: 'linear-gradient(135deg,#A07830 0%,#C9A84C 50%,#E8C97A 100%)', color: '#0A0A0A', border: 'none', cursor: 'pointer', padding: '1rem 2.5rem', fontSize: '0.72rem', fontFamily: 'Montserrat', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', borderRadius: '4px' }}
          >
            Explore Collections
          </motion.button>
          <motion.button
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(201,168,76,0.08)', borderColor: '#C9A84C' }}
            whileTap={{ scale: 0.97 }}
            style={{ background: 'transparent', border: '1px solid rgba(201,168,76,0.35)', color: '#C9A84C', cursor: 'pointer', padding: '1rem 2.5rem', fontSize: '0.72rem', fontFamily: 'Montserrat', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', borderRadius: '4px' }}
          >
            Our Story
          </motion.button>
        </motion.div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '4rem', justifyContent: 'center', marginTop: '5rem', flexWrap: 'wrap' }}>
          {stats.map(({ num, label }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + i * 0.15, duration: 0.7 }}
              whileHover={{ y: -5 }}
              style={{ textAlign: 'center', cursor: 'default' }}
            >
              <div style={{ fontFamily: 'Cormorant, serif', fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, background: 'linear-gradient(135deg,#C9A84C,#E8C97A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>
                {num}
              </div>
              <div style={{ fontFamily: 'Jost', fontSize: '0.62rem', letterSpacing: '0.3em', color: 'rgba(245,240,232,0.35)', textTransform: 'uppercase', marginTop: '0.4rem' }}>
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bounce arrow */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.8 }}
        style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <span style={{ fontFamily: 'Jost', fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(201,168,76,0.35)' }}>DISCOVER</span>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.3rem' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.45)" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
