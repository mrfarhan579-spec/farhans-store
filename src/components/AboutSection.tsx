'use client';
import { useEffect, useRef } from 'react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          sectionRef.current?.querySelectorAll('.about-reveal').forEach((el, i) => {
            setTimeout(() => {
              (el as HTMLElement).style.opacity = '1';
              (el as HTMLElement).style.transform = 'translateY(0)';
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
    <section id="about" ref={sectionRef} style={{ padding: '8rem 2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative bg element */}
      <div style={{
        position: 'absolute',
        right: '-200px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '600px',
        height: '600px',
        border: '1px solid rgba(201,168,76,0.04)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        right: '-100px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '400px',
        height: '400px',
        border: '1px solid rgba(201,168,76,0.06)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
        {/* Left: Visual */}
        <div className="about-reveal" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.9s ease', position: 'relative' }}>
          {/* Main box */}
          <div style={{
            width: '100%',
            aspectRatio: '3/4',
            maxWidth: '400px',
            background: 'linear-gradient(135deg, #111 0%, #1C1A15 50%, #111 100%)',
            border: '1px solid rgba(201,168,76,0.15)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 40% 30%, rgba(201,168,76,0.08) 0%, transparent 60%)',
            }} />
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{
                fontFamily: 'Cormorant, serif',
                fontSize: '5rem',
                fontWeight: 300,
                letterSpacing: '0.1em',
                background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '1rem',
              }}>
                F
              </div>
              <p style={{
                fontFamily: 'Jost',
                fontSize: '0.6rem',
                letterSpacing: '0.4em',
                color: 'rgba(201,168,76,0.4)',
                textTransform: 'uppercase',
              }}>
                Est. 2024
              </p>
            </div>

            {/* Corner decorations */}
            {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map(pos => (
              <div key={pos} style={{
                position: 'absolute',
                ...Object.fromEntries(pos.split(' ').map(p => {
                  if (p === 'top-0') return ['top', '16px'];
                  if (p === 'bottom-0') return ['bottom', '16px'];
                  if (p === 'left-0') return ['left', '16px'];
                  if (p === 'right-0') return ['right', '16px'];
                  return [];
                })),
                width: '24px',
                height: '24px',
                border: `1px solid rgba(201,168,76,0.3)`,
                borderRadius: '2px',
              }} />
            ))}
          </div>

          {/* Floating stat card */}
          <div style={{
            position: 'absolute',
            bottom: '2rem',
            right: '-2rem',
            background: 'rgba(10,10,10,0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '12px',
            padding: '1.2rem 1.5rem',
            minWidth: '150px',
          }}>
            <div style={{
              fontFamily: 'Cormorant, serif',
              fontSize: '2rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1,
              marginBottom: '0.3rem',
            }}>
              98%
            </div>
            <div style={{ fontFamily: 'Jost', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.4)', textTransform: 'uppercase' }}>
              Client Satisfaction
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div>
          <div className="about-reveal" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.9s ease 0.2s' }}>
            <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>Our Heritage</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: 'rgba(245,240,232,0.95)', marginBottom: '1.5rem' }}>
              Crafting Luxury<br />
              <span className="gold-text">Since 2024</span>
            </h2>
          </div>

          <div className="about-reveal" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.9s ease 0.4s' }}>
            <p style={{
              fontFamily: 'Montserrat',
              fontWeight: 300,
              fontSize: '0.95rem',
              color: 'rgba(245,240,232,0.5)',
              lineHeight: 1.9,
              marginBottom: '1.5rem',
            }}>
              Farhan's Store was born from a singular vision: to make the world's finest craftsmanship accessible to those who appreciate true excellence. Every piece in our collection is hand-selected by our team of experts.
            </p>
            <p style={{
              fontFamily: 'Montserrat',
              fontWeight: 300,
              fontSize: '0.95rem',
              color: 'rgba(245,240,232,0.5)',
              lineHeight: 1.9,
              marginBottom: '2.5rem',
            }}>
              From the workshops of Swiss master watchmakers to the ateliers of London's finest tailors and the perfume houses of Grasse, we bring you nothing short of perfection.
            </p>
          </div>

          <div className="about-reveal" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.9s ease 0.6s' }}>
            {/* Values */}
            {[
              { icon: '⌚', title: 'Swiss Precision', desc: 'Every watch curated from certified Swiss manufacturers' },
              { icon: '🧵', title: 'Bespoke Craftsmanship', desc: 'Hand-tailored suits by master craftsmen' },
              { icon: '🌸', title: 'Rare Fragrances', desc: 'Sourced from the world\'s finest perfume houses' },
            ].map(v => (
              <div key={v.title} style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
                marginBottom: '1.5rem',
                padding: '1rem',
                border: '1px solid rgba(201,168,76,0.07)',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.01)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)'; (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.03)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.07)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.01)'; }}
              >
                <span style={{ fontSize: '1.5rem' }}>{v.icon}</span>
                <div>
                  <div style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.85rem', color: 'rgba(245,240,232,0.8)', marginBottom: '0.3rem' }}>{v.title}</div>
                  <div style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: '0.8rem', color: 'rgba(245,240,232,0.4)', lineHeight: 1.6 }}>{v.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="about-reveal" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.9s ease 0.8s' }}>
            <button className="btn-ghost" style={{ padding: '0.9rem 2rem', fontSize: '0.72rem', borderRadius: '4px', marginTop: '1rem' }}>
              Read Our Full Story
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
