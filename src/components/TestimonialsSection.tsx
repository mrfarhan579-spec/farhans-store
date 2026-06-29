'use client';
import { useEffect, useRef } from 'react';

const testimonials = [
  {
    name: 'Alexander Morrison',
    role: 'CEO, Morrison Capital',
    text: 'The Royal Chronograph I purchased exceeded every expectation. The craftsmanship is extraordinary — I wear it to every boardroom meeting.',
    stars: 5,
    initials: 'AM',
  },
  {
    name: 'Isabella Fontaine',
    role: 'Fashion Director, Vogue Paris',
    text: 'Farhan\'s bespoke suits are in a league of their own. The attention to detail, the fabric quality, the perfect silhouette — simply unmatched.',
    stars: 5,
    initials: 'IF',
  },
  {
    name: 'Rajiv Chandra',
    role: 'Entrepreneur & Collector',
    text: 'Oud Majesty has become my signature scent. People ask me about it everywhere I go. Worth every single penny — a true masterpiece.',
    stars: 5,
    initials: 'RC',
  },
  {
    name: 'Sophie Laurent',
    role: 'Interior Designer',
    text: 'From the packaging to the product itself, everything screams luxury. This is not just shopping — it\'s an experience. My go-to for gifts.',
    stars: 5,
    initials: 'SL',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          sectionRef.current?.querySelectorAll('.t-card').forEach((el, i) => {
            setTimeout(() => {
              (el as HTMLElement).style.opacity = '1';
              (el as HTMLElement).style.transform = 'translateY(0)';
            }, i * 150);
          });
        }
      }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '8rem 2rem', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>Client Stories</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'rgba(245,240,232,0.95)', marginBottom: '1rem' }}>
            What Our <span className="gold-text">Clients Say</span>
          </h2>
          <div className="divider-gold" style={{ maxWidth: '120px', margin: '0 auto' }} />
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="testimonial-card t-card"
              style={{
                padding: '2rem',
                opacity: 0,
                transform: 'translateY(30px)',
                transition: 'all 0.7s ease',
              }}
            >
              {/* Quote icon */}
              <div style={{
                fontFamily: 'Cormorant, serif',
                fontSize: '4rem',
                lineHeight: 1,
                color: 'rgba(201,168,76,0.2)',
                marginBottom: '1rem',
                marginTop: '-0.5rem',
              }}>
                "
              </div>

              {/* Stars */}
              <div className="stars" style={{ fontSize: '0.75rem', marginBottom: '1rem' }}>
                {'★'.repeat(t.stars)}
              </div>

              {/* Text */}
              <p style={{
                fontFamily: 'Montserrat',
                fontWeight: 300,
                fontSize: '0.9rem',
                color: 'rgba(245,240,232,0.6)',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
                fontStyle: 'italic',
              }}>
                "{t.text}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))',
                  border: '1px solid rgba(201,168,76,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Cormorant, serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--gold)',
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'Montserrat',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: 'rgba(245,240,232,0.85)',
                    marginBottom: '0.2rem',
                  }}>
                    {t.name}
                  </div>
                  <div style={{
                    fontFamily: 'Jost',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    color: 'rgba(201,168,76,0.5)',
                  }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '4rem',
          marginTop: '5rem',
          flexWrap: 'wrap',
        }}>
          {[
            { icon: '🔒', label: 'Secure Payment' },
            { icon: '🚚', label: 'Free Shipping' },
            { icon: '↩️', label: '30-Day Returns' },
            { icon: '✨', label: 'Authenticity Guaranteed' },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.2rem' }}>{icon}</span>
              <span style={{ fontFamily: 'Jost', fontSize: '0.72rem', letterSpacing: '0.12em', color: 'rgba(245,240,232,0.45)', textTransform: 'uppercase' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
