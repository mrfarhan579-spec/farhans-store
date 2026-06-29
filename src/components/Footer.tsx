'use client';

const footerLinks = {
  Collections: ['Watches', 'Bespoke Suits', 'Fragrances', 'Gift Sets', 'New Arrivals'],
  Services: ['Personal Styling', 'Gift Wrapping', 'Express Delivery', 'Authentication', 'After-Sales Care'],
  Company: ['Our Story', 'Press', 'Careers', 'Sustainability', 'Partners'],
  Support: ['FAQ', 'Contact Us', 'Size Guide', 'Care Instructions', 'Track Order'],
};

export default function Footer() {
  return (
    <footer style={{
      background: '#070707',
      borderTop: '1px solid rgba(201,168,76,0.1)',
      padding: '6rem 2rem 3rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
          gap: '3rem',
          marginBottom: '5rem',
          flexWrap: 'wrap',
        }}>
          {/* Brand column */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                fontFamily: 'Cormorant, serif',
                fontSize: '1.8rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.3rem',
              }}>
                FARHAN'S
              </div>
              <div style={{
                fontFamily: 'Jost',
                fontSize: '0.55rem',
                letterSpacing: '0.5em',
                color: 'rgba(201,168,76,0.4)',
              }}>
                STORE · LUXURY
              </div>
            </div>
            <p style={{
              fontFamily: 'Montserrat',
              fontWeight: 300,
              fontSize: '0.82rem',
              color: 'rgba(245,240,232,0.35)',
              lineHeight: 1.9,
              maxWidth: '260px',
              marginBottom: '2rem',
            }}>
              Where luxury meets perfection. Curating the world's finest watches, suits, and fragrances since 2024.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { label: 'IG', icon: '📸' },
                { label: 'TW', icon: '🐦' },
                { label: 'FB', icon: '👤' },
                { label: 'YT', icon: '▶️' },
              ].map(s => (
                <a
                  key={s.label}
                  href="#"
                  style={{
                    width: '36px',
                    height: '36px',
                    border: '1px solid rgba(201,168,76,0.15)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)'; (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.06)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.15)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 style={{
                fontFamily: 'Jost',
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.7)',
                marginBottom: '1.5rem',
              }}>
                {category}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontFamily: 'Montserrat',
                        fontWeight: 300,
                        fontSize: '0.82rem',
                        color: 'rgba(245,240,232,0.35)',
                        textDecoration: 'none',
                        transition: 'color 0.3s ease',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.8)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.35)')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider-gold" style={{ marginBottom: '2.5rem' }} />

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{
            fontFamily: 'Jost',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            color: 'rgba(245,240,232,0.2)',
          }}>
            © {new Date().getFullYear()} Farhan's Store. All rights reserved. Luxury redefined.
          </p>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: 'Jost',
                  fontSize: '0.62rem',
                  letterSpacing: '0.1em',
                  color: 'rgba(245,240,232,0.2)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.2)')}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Payment icons */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {['💳', '🏦', '₿', 'A'].map((icon, i) => (
              <div key={i} style={{
                width: '36px',
                height: '24px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
              }}>
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
