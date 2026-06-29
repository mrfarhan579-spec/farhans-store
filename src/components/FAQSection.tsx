'use client';
import { useState, useRef, useEffect } from 'react';

const faqs = [
  { q: 'Are all your products authentic?', a: 'Absolutely. Every product at Farhan\'s Store comes with a certificate of authenticity. We source directly from verified manufacturers and luxury houses, ensuring 100% genuine items.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy. If you\'re not completely satisfied, simply contact our luxury concierge team and we\'ll arrange a seamless return or exchange.' },
  { q: 'Do you offer international shipping?', a: 'Yes, we ship worldwide via premium couriers (DHL, FedEx) with full insurance coverage. Orders over $1,000 receive complimentary express shipping.' },
  { q: 'Can I get a bespoke suit made to my measurements?', a: 'Yes! Our master tailors create fully bespoke suits. Simply book a virtual or in-person consultation, provide your measurements, and receive your masterpiece within 3–4 weeks.' },
  { q: 'How do I care for my luxury watch?', a: 'Each timepiece comes with a detailed care guide. We recommend servicing mechanical watches every 3–5 years. Our after-sales team provides lifetime support and advice.' },
  { q: 'Do you offer gift wrapping and personalization?', a: 'Our signature gift packaging is complimentary with every order. We offer monogramming, personalized notes, and exclusive gift boxes for that extra touch of luxury.' },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          sectionRef.current?.querySelectorAll('.faq-reveal').forEach((el, i) => {
            setTimeout(() => {
              (el as HTMLElement).style.opacity = '1';
              (el as HTMLElement).style.transform = 'translateX(0)';
            }, i * 100);
          });
        }
      }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '8rem 2rem', background: 'rgba(201,168,76,0.01)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>Got Questions?</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'rgba(245,240,232,0.95)', marginBottom: '1rem' }}>
            Frequently <span className="gold-text">Asked</span>
          </h2>
          <div className="divider-gold" style={{ maxWidth: '120px', margin: '0 auto' }} />
        </div>

        {/* FAQ items */}
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="faq-item faq-reveal"
            style={{
              opacity: 0,
              transform: 'translateX(-20px)',
              transition: 'all 0.6s ease',
            }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.75rem 0',
                cursor: 'pointer',
                gap: '1rem',
              }}
            >
              <span style={{
                fontFamily: 'Cormorant, serif',
                fontSize: '1.15rem',
                fontWeight: 500,
                color: openIndex === i ? 'rgba(201,168,76,0.9)' : 'rgba(245,240,232,0.8)',
                textAlign: 'left',
                transition: 'color 0.3s ease',
                lineHeight: 1.4,
              }}>
                {faq.q}
              </span>
              <div style={{
                width: '28px',
                height: '28px',
                minWidth: '28px',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                background: openIndex === i ? 'rgba(201,168,76,0.1)' : 'transparent',
                transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
              }}>
                <svg width="12" height="12" fill="none" stroke="rgba(201,168,76,0.8)" strokeWidth="1.5" viewBox="0 0 24 24">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </div>
            </button>

            {openIndex === i && (
              <div style={{
                paddingBottom: '1.75rem',
                paddingRight: '3rem',
                animation: 'expandDown 0.3s ease',
              }}>
                <p style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 300,
                  fontSize: '0.9rem',
                  color: 'rgba(245,240,232,0.5)',
                  lineHeight: 1.9,
                  borderLeft: '2px solid rgba(201,168,76,0.3)',
                  paddingLeft: '1.2rem',
                }}>
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Contact CTA */}
        <div style={{
          textAlign: 'center',
          marginTop: '4rem',
          padding: '2.5rem',
          background: 'rgba(201,168,76,0.03)',
          border: '1px solid rgba(201,168,76,0.1)',
          borderRadius: '12px',
        }}>
          <p style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: '0.9rem', color: 'rgba(245,240,232,0.5)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
            Still have questions? Our luxury concierge is available 24/7
          </p>
          <button className="btn-gold" style={{ padding: '0.85rem 2rem', fontSize: '0.72rem', borderRadius: '4px', letterSpacing: '0.15em' }}>
            Contact Concierge
          </button>
        </div>
      </div>

      <style>{`
        @keyframes expandDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
