'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  style?: React.CSSProperties;
}

export function FadeUp({ children, delay = 0, style }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      style={style}
    >{children}</motion.div>
  );
}

export function FadeIn({ children, delay = 0, style }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay }}
      style={style}
    >{children}</motion.div>
  );
}

export function SlideIn({ children, delay = 0, direction = 'left', style }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const x = direction === 'left' ? -60 : direction === 'right' ? 60 : 0;
  const y = direction === 'up' ? 60 : direction === 'down' ? -60 : 0;
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.9, delay }}
      style={style}
    >{children}</motion.div>
  );
}

export function ScaleIn({ children, delay = 0, style }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay, type: 'spring', stiffness: 120 }}
      style={style}
    >{children}</motion.div>
  );
}
