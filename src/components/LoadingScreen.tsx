'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ['Watches', 'Perfumes', 'Shirts', 'Quality Products'];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const duration = 2700;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.floor(progress * 100);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 600);
        }, 300);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => setWordIndex(i => (i + 1) % words.length), 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ position: 'fixed', inset: 0, zIndex: 999999, background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
        >
          {/* Top-left brand label */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ position: 'absolute', top: '2rem', left: '2.5rem', fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}
          >
            Farhan&apos;s Store
          </motion.div>

          {/* Top-right year */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ position: 'absolute', top: '2rem', right: '2.5rem', fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: '0.9rem', color: 'rgba(201,168,76,0.3)', letterSpacing: '0.1em' }}
          >
            &apos;26
          </motion.div>

          {/* Center — cycling word */}
          <div style={{ textAlign: 'center', userSelect: 'none' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ display: 'block', fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 'clamp(3.5rem, 12vw, 7rem)', color: 'rgba(245,240,232,0.85)', lineHeight: 1 }}
              >
                {words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Bottom-right — counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ position: 'absolute', bottom: '2.5rem', right: '2.5rem', fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 'clamp(4rem, 12vw, 9rem)', color: 'rgba(245,240,232,0.9)', lineHeight: 1, letterSpacing: '-0.02em' }}
          >
            {String(count).padStart(3, '0')}
          </motion.div>

          {/* Bottom-left hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ delay: 0.5 }}
            style={{ position: 'absolute', bottom: '3rem', left: '2.5rem', fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)' }}
          >
            Loading
          </motion.div>

          {/* Progress bar */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.05)' }}>
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg,#A07830 0%,#C9A84C 50%,#E8C97A 100%)',
                transformOrigin: 'left',
                scaleX: count / 100,
                boxShadow: '0 0 12px rgba(201,168,76,0.5)',
              }}
            />
          </div>

          {/* Noise texture */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")", opacity: 0.3, pointerEvents: 'none' }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
