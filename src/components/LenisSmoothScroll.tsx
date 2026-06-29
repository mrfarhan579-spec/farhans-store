'use client';
import { useEffect, useRef } from 'react';

interface LenisSmoothScrollProps {
  children: React.ReactNode;
}

export default function LenisSmoothScroll({ children }: LenisSmoothScrollProps) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import Lenis to avoid SSR issues
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }).catch(() => {
      // Lenis not available, graceful fallback
      console.log('Lenis smooth scroll not available, using native scroll');
    });

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}
