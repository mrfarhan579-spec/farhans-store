'use client';
import { useEffect, useRef } from 'react';

const featured = [
  { name: 'The Crown Collection', category: 'Watches', price: '$18,500', tag: 'Editor\'s Pick', emoji: '👑' },
  { name: 'Maestro Suit Set', category: 'Suits', price: '$4,200', tag: 'Trending', emoji: '🎩' },
  { name: 'Oud Royal Elixir', category: 'Perfumes', price: '$680', tag: 'Bestseller', emoji: '🌸' },
];

export default function FeaturedSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          sectionRef.current?.querySelectorAll('.reveal-item').forEach((el, i) => {
            setTimeout(() => {
              (el as HTMLElement).style.opacity = '1';
              (el as HTMLElement).style.transform = 'translateY(0) scale(1)';
            }, i * 200);
          });
        }
      }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '8rem 2rem', background: 'rgba(201,168,76,0.015)', position: 'relative', overflow: 'hidden' }}>
      {/* Bg gradient */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div className="reveal-item" style={{
          textAlign: 'center',
          marginBottom: '5rem',
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}>
          <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>Hand-picked for you</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'rgba(245,240,232,0.95)', marginBottom: '1.5rem' }}>
            Featured <span className="gold-text">Masterpieces</span>
          </h2>
          <p style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: '0.95rem', color: 'rgba(245,240,232,0.45)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.8 }}>
            Our curators select only the finest pieces for the discerning collector
          </p>
        </div>

        {/* Featured cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {featured.map((item, i) => (
            <div
              key={item.name}
              className="reveal-item"
              style={{
                opacity: 0,
                transform: `translateY(40px) scale(0.97)`,
                transition: 'all 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
                position: 'relative',
                background: i === 1
                  ? 'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.02) 100%)'
                  : 'rgba(255,255,255,0.02)',
                border: `1px solid ${i === 1 ? 'rgba(201,168,76,0.3)' : 'rgba(201,168,76,0.1)'}`,
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-10px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(201,168,76,0.08)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Large image area */}
              <div style={{
                height: '320px',
                background: `linear-gradient(135deg, #111 0%, #1A1A1A 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: i === 1
                    ? 'radial-gradient(ellipse at center, rgba(201,168,76,0.12) 0%, transparent 70%)'
                    : 'radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)',
                }} />
                <span style={{ fontSize: '6rem', filter: 'drop-shadow(0 0 30px rgba(201,168,76,0.3))' }} className="float-anim">
                  {item.emoji}
                </span>

                {/* Tag */}
                <div style={{
                  position: 'absolute',
                  top: '1.2rem',
                  left: '1.2rem',
                  background: 'rgba(10,10,10,0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  borderRadius: '20px',
                  padding: '5px 14px',
                  fontFamily: 'Jost',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                }}>
                  {item.tag}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '2rem' }}>
                <span style={{
                  fontFamily: 'Jost',
                  fontSize: '0.6rem',
                  letterSpacing: '0.3em',
                  color: 'rgba(201,168,76,0.5)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}>
                  {item.category}
                </span>
                <h3 style={{
                  fontFamily: 'Cormorant, serif',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'rgba(245,240,232,0.95)',
                  marginBottom: '1rem',
                }}>
                  {item.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontFamily: 'Cormorant, serif',
                    fontSize: '1.6rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {item.price}
                  </span>
                  <button className="btn-gold" style={{ padding: '0.6rem 1.4rem', fontSize: '0.65rem', borderRadius: '4px', letterSpacing: '0.12em' }}>
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
