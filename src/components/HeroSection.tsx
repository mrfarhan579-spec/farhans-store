'use client';
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${scrollY * 0.28}px)`;
        textRef.current.style.opacity = `${1 - scrollY * 0.0018}`;
      }
      if (orb1Ref.current) orb1Ref.current.style.transform = `translateY(${scrollY * 0.15}px)`;
      if (orb2Ref.current) orb2Ref.current.style.transform = `translateY(${scrollY * -0.1}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.04) 0%, transparent 50%), linear-gradient(180deg,#0A0A0A 0%,#0F0D0A 50%,#0A0A0A 100%)',
      }}
    >
      {/* Parallax orbs */}
      <div ref={orb1Ref} style={{
        position: 'absolute', top: '15%', left: '5%',
        width: '650px', height: '650px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(50px)',
        animation: 'float 9s ease-in-out infinite',
        pointerEvents: 'none', willChange: 'transform',
      }} />
      <div ref={orb2Ref} style={{
        position: 'absolute', bottom: '10%', right: '3%',
        width: '450px', height: '450px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(40px)',
        animation: 'float 11s ease-in-out infinite reverse',
        pointerEvents: 'none', willChange: 'transform',
      }} />

      {/* Decorative grid lines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
        backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Side scroll label */}
      <div style={{
        position: 'absolute', left: '2.5rem', top: '50%',
        transform: 'translateY(-50%)', display: 'flex',
        flexDirection: 'column', alignItems: 'center', gap: '1rem',
      }}>
        <div style={{ width: '1px', height: '70px', background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.4))' }} />
        <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.55rem', letterSpacing: '0.35em', color: 'rgba(201,168,76,0.45)', writingMode: 'vertical-rl', textTransform: 'uppercase' }}>Scroll Down</span>
        <div style={{ width: '1px', height: '70px', background: 'linear-gradient(180deg, rgba(201,168,76,0.4), transparent)' }} />
      </div>

      {/* Social right side */}
      <div style={{ position: 'absolute', right: '2.5rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {['IG', 'TW', 'YT'].map(s => (
          <a key={s} href="#" style={{
            fontFamily: 'Jost, sans-serif', fontSize: '0.58rem',
            letterSpacing: '0.2em', color: 'rgba(201,168,76,0.35)',
            textDecoration: 'none', transition: 'color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.35)')}
          >{s}</a>
        ))}
      </div>

      {/* Main content with parallax */}
      <div ref={textRef} style={{ textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 2rem', willChange: 'transform' }}>

        {/* Eyebrow */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '1rem', marginBottom: '2.5rem',
          opacity: 0, animation: 'fadeInUp 0.8s ease 0.3s forwards',
        }}>
          <div style={{ height: '1px', width: '45px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5))' }} />
          <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase', fontSize: '0.68rem', color: '#C9A84C' }}>
            Luxury Collection 2024
          </span>
          <div style={{ height: '1px', width: '45px', background: 'linear-gradient(90deg, rgba(201,168,76,0.5), transparent)' }} />
        </div>

        {/* Main title */}
        <h1 style={{
          fontFamily: 'Cormorant, serif', fontWeight: 600,
          fontSize: 'clamp(4rem, 11vw, 9rem)', lineHeight: 0.92,
          letterSpacing: '-0.02em', marginBottom: '1rem',
          opacity: 0, animation: 'fadeInUp 1s ease 0.5s forwards',
        }}>
          <span style={{
            display: 'block',
            background: 'linear-gradient(135deg, #A07830 0%, #C9A84C 30%, #E8C97A 50%, #C9A84C 70%, #A07830 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            animation: 'fadeInUp 1s ease 0.5s forwards, shimmer 4s linear 1.5s infinite',
          }}>FARHAN'S</span>
          <span style={{
            display: 'block',
            color: 'rgba(245,240,232,0.9)',
            fontStyle: 'italic', fontWeight: 300,
          }}>STORE</span>
        </h1>

        {/* Tagline */}
        <p style={{
          fontFamily: 'Jost, sans-serif', fontWeight: 300,
          fontSize: 'clamp(0.75rem, 1.8vw, 1rem)',
          letterSpacing: '0.35em', color: 'rgba(245,240,232,0.4)',
          textTransform: 'uppercase', marginBottom: '3rem',
          opacity: 0, animation: 'fadeInUp 0.8s ease 0.9s forwards',
        }}>
          Where Luxury Meets Perfection
        </p>

        {/* Description */}
        <p style={{
          fontFamily: 'Montserrat, sans-serif', fontWeight: 300,
          fontSize: 'clamp(0.82rem, 1.4vw, 0.98rem)',
          color: 'rgba(245,240,232,0.38)', maxWidth: '480px',
          margin: '0 auto 3.5rem', lineHeight: 1.85,
          opacity: 0, animation: 'fadeInUp 0.8s ease 1.1s forwards',
        }}>
          Curated timepieces, rare fragrances, and bespoke shirts —
          crafted for those who demand nothing but the extraordinary.
        </p>

        {/* CTA buttons */}
        <div style={{
          display: 'flex', gap: '1rem', justifyContent: 'center',
          flexWrap: 'wrap',
          opacity: 0, animation: 'fadeInUp 0.8s ease 1.3s forwards',
        }}>
          <button
            onClick={() => document.querySelector('#collections')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'linear-gradient(135deg, #A07830 0%, #C9A84C 50%, #E8C97A 100%)',
              color: '#0A0A0A', border: 'none', cursor: 'pointer',
              padding: '1rem 2.5rem', fontSize: '0.72rem',
              fontFamily: 'Montserrat, sans-serif', fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              borderRadius: '4px', position: 'relative', overflow: 'hidden',
              transition: 'box-shadow 0.3s ease',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 35px rgba(201,168,76,0.4)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}
          >
            Explore Collections
          </button>
          <button
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'transparent', border: '1px solid rgba(201,168,76,0.35)',
              color: '#C9A84C', cursor: 'pointer',
              padding: '1rem 2.5rem', fontSize: '0.72rem',
              fontFamily: 'Montserrat, sans-serif', fontWeight: 500,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              borderRadius: '4px', transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.35)'; }}
          >
            Our Story
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '4rem', justifyContent: 'center',
          marginTop: '5rem', flexWrap: 'wrap',
          opacity: 0, animation: 'fadeInUp 0.8s ease 1.5s forwards',
        }}>
          {[
            { num: '500+', label: 'Products' },
            { num: '50K+', label: 'Happy Clients' },
            { num: '15+', label: 'Years Excellence' },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Cormorant, serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                lineHeight: 1,
              }}>{num}</div>
              <div style={{
                fontFamily: 'Jost, sans-serif', fontSize: '0.62rem',
                letterSpacing: '0.3em', color: 'rgba(245,240,232,0.35)',
                textTransform: 'uppercase', marginTop: '0.4rem',
              }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bounce scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        animation: 'heroBounce 2s ease-in-out infinite',
        opacity: 0, animationDelay: '2s', animationFillMode: 'forwards',
      }}>
        <span style={{ fontFamily: 'Jost', fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(201,168,76,0.35)' }}>DISCOVER</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.45)" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroBounce {
          0%,100% { transform: translateX(-50%) translateY(0); opacity:1; }
          50%      { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  );
}
