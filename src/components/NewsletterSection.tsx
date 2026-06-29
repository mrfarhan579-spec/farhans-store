'use client';
import { useState, useRef, useEffect } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting && sectionRef.current) {
          sectionRef.current.style.opacity = '1';
          sectionRef.current.style.transform = 'translateY(0)';
        }
      }),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section style={{ padding: '8rem 2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div
        ref={sectionRef}
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
          opacity: 0,
          transform: 'translateY(40px)',
          transition: 'all 0.9s ease',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Icon */}
        <div style={{
          width: '60px',
          height: '60px',
          border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          background: 'rgba(201,168,76,0.05)',
        }}>
          <svg width="22" height="22" fill="none" stroke="rgba(201,168,76,0.7)" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>

        <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>Join The Circle</span>

        <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'rgba(245,240,232,0.95)', marginBottom: '1.2rem' }}>
          Unlock <span className="gold-text">Exclusive</span> Access
        </h2>

        <p style={{
          fontFamily: 'Montserrat',
          fontWeight: 300,
          fontSize: '0.95rem',
          color: 'rgba(245,240,232,0.45)',
          marginBottom: '3rem',
          lineHeight: 1.9,
        }}>
          Subscribe to receive first access to new collections, members-only offers,
          and invitations to exclusive events — curated for connoisseurs.
        </p>

        {submitted ? (
          <div style={{
            padding: '2rem',
            background: 'rgba(201,168,76,0.06)',
            border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: '12px',
            animation: 'fadeIn 0.5s ease',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✨</div>
            <p style={{
              fontFamily: 'Cormorant, serif',
              fontSize: '1.4rem',
              fontWeight: 600,
              color: 'rgba(245,240,232,0.9)',
              marginBottom: '0.5rem',
            }}>
              Welcome to the Circle
            </p>
            <p style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)' }}>
              You'll receive your first exclusive offer shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '480px', margin: '0 auto', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="newsletter-input"
                style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '1rem 1.5rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em',
                }}
              />
              <button
                type="submit"
                className="btn-gold"
                style={{ padding: '1rem 1.8rem', fontSize: '0.72rem', borderRadius: '6px', letterSpacing: '0.15em', whiteSpace: 'nowrap' }}
              >
                Join Now
              </button>
            </div>
            <p style={{
              fontFamily: 'Jost',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              color: 'rgba(245,240,232,0.25)',
              marginTop: '1rem',
            }}>
              No spam, ever. Unsubscribe anytime. Privacy guaranteed.
            </p>
          </form>
        )}

        {/* Perks */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2.5rem',
          marginTop: '3rem',
          flexWrap: 'wrap',
        }}>
          {['Early Access', 'Members Pricing', 'Exclusive Events'].map(perk => (
            <div key={perk} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--gold)' }} />
              <span style={{ fontFamily: 'Jost', fontSize: '0.68rem', letterSpacing: '0.1em', color: 'rgba(245,240,232,0.35)', textTransform: 'uppercase' }}>
                {perk}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }`}</style>
    </section>
  );
}
