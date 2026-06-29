'use client';
import { useState, useEffect } from 'react';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className="loader-screen"
      style={{
        opacity: done ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: done ? 'none' : 'all',
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          fontFamily: 'Cormorant, serif',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 300,
          letterSpacing: '0.5em',
          marginBottom: '0.5rem',
        }} className="gold-text-shimmer">
          FARHAN'S
        </div>
        <div style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.65rem',
          letterSpacing: '0.6em',
          color: 'rgba(245,240,232,0.4)',
          textTransform: 'uppercase',
        }}>
          STORE · EST. 2024
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        width: '200px',
        height: '1px',
        background: 'rgba(201,168,76,0.15)',
        position: 'relative',
        marginBottom: '1.5rem',
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: `${Math.min(progress, 100)}%`,
          background: 'linear-gradient(90deg, #A07830, #E8C97A)',
          transition: 'width 0.1s ease',
          boxShadow: '0 0 10px rgba(201,168,76,0.5)',
        }} />
      </div>

      <div style={{
        fontFamily: 'Jost, sans-serif',
        fontSize: '0.65rem',
        letterSpacing: '0.3em',
        color: 'rgba(201,168,76,0.5)',
      }}>
        {Math.min(Math.round(progress), 100)}%
      </div>

      {/* Decorative rings */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        border: '1px solid rgba(201,168,76,0.05)',
        borderRadius: '50%',
        animation: 'float 4s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        border: '1px solid rgba(201,168,76,0.03)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite reverse',
      }} />
    </div>
  );
}
