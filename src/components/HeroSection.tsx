'use client';
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current || !textRef.current) return;
      const scrollY = window.scrollY;
      textRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      textRef.current.style.opacity = `${1 - scrollY * 0.002}`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToCollections = () => {
    document.querySelector('#collections')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="hero-bg noise-overlay"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background orbs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 10s ease-in-out infinite reverse',
        pointerEvents: 'none',
      }} />

      {/* Decorative lines */}
      <div style={{
        position: 'absolute',
        left: '3rem',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <div style={{ width: '1px', height: '80px', background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.4))' }} />
        <span style={{ fontFamily: 'Jost', fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(201,168,76,0.5)', writingMode: 'vertical-rl', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: '1px', height: '80px', background: 'linear-gradient(180deg, rgba(201,168,76,0.4), transparent)' }} />
      </div>

      {/* Social links right side */}
      <div style={{
        position: 'absolute',
        right: '3rem',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}>
        {['IG', 'TW', 'FB'].map(s => (
          <a key={s} href="#" style={{
            fontFamily: 'Jost',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'rgba(201,168,76,0.4)',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(201,168,76,1)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.4)')}
          >{s}</a>
        ))}
      </div>

      {/* Main content */}
      <div ref={textRef} style={{ textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 2rem' }}>

        {/* Eyebrow */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          opacity: 0,
          animation: 'fadeInUp 0.8s ease 0.3s forwards',
        }}>
          <div style={{ height: '1px', width: '40px', background: 'rgba(201,168,76,0.4)' }} />
          <span className="section-label">Luxury Collection 2024</span>
          <div style={{ height: '1px', width: '40px', background: 'rgba(201,168,76,0.4)' }} />
        </div>

        {/* Main heading */}
        <h1 style={{
          fontFamily: 'Cormorant, serif',
          fontWeight: 600,
          fontSize: 'clamp(3.5rem, 10vw, 8rem)',
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          marginBottom: '1rem',
          opacity: 0,
          animation: 'fadeInUp 1s ease 0.5s forwards',
        }}>
          <span className="gold-text">FARHAN'S</span>
          <br />
          <span style={{ color: 'rgba(245,240,232,0.95)', fontStyle: 'italic', fontWeight: 300 }}>STORE</span>
        </h1>

        {/* Tagline */}
        <p style={{
          fontFamily: 'Jost, sans-serif',
          fontWeight: 300,
          fontSize: 'clamp(0.85rem, 2vw, 1.05rem)',
          letterSpacing: '0.3em',
          color: 'rgba(245,240,232,0.5)',
          textTransform: 'uppercase',
          marginBottom: '3rem',
          opacity: 0,
          animation: 'fadeInUp 0.8s ease 0.8s forwards',
        }}>
          Where Luxury Meets Perfection
        </p>

        {/* Description */}
        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 300,
          fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
          color: 'rgba(245,240,232,0.45)',
          maxWidth: '500px',
          margin: '0 auto 3.5rem',
          lineHeight: 1.8,
          opacity: 0,
          animation: 'fadeInUp 0.8s ease 1s forwards',
        }}>
          Curated timepieces, bespoke tailoring, and rare fragrances — 
          crafted for those who demand nothing but the extraordinary.
        </p>

        {/* CTA buttons */}
        <div style={{
          display: 'flex',
          gap: '1.2rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          opacity: 0,
          animation: 'fadeInUp 0.8s ease 1.2s forwards',
        }}>
          <button
            className="btn-gold"
            onClick={scrollToCollections}
            style={{
              padding: '1rem 2.5rem',
              fontSize: '0.75rem',
              borderRadius: '4px',
              letterSpacing: '0.18em',
            }}
          >
            Explore Collections
          </button>
          <button
            className="btn-ghost"
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '1rem 2.5rem',
              fontSize: '0.75rem',
              borderRadius: '4px',
            }}
          >
            Our Story
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '4rem',
          justifyContent: 'center',
          marginTop: '5rem',
          flexWrap: 'wrap',
          opacity: 0,
          animation: 'fadeInUp 0.8s ease 1.4s forwards',
        }}>
          {[
            { num: '500+', label: 'Products' },
            { num: '50K+', label: 'Happy Clients' },
            { num: '15+', label: 'Years Excellence' },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Cormorant, serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1,
              }}>
                {num}
              </div>
              <div style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                color: 'rgba(245,240,232,0.4)',
                textTransform: 'uppercase',
                marginTop: '0.3rem',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        animation: 'bounce 2s ease-in-out infinite',
      }}>
        <span style={{ fontFamily: 'Jost', fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(201,168,76,0.4)' }}>DISCOVER</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  );
}
