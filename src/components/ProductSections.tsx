'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/* ─────────────────────────────────────────────
   PRODUCT DATA  (PKR prices as requested)
───────────────────────────────────────────── */
const products = {
  watches: [
    {
      id: 1, name: 'Rolex Daytona Gold',
      price: 'Rs 10,000', originalPrice: 'Rs 12,500',
      badge: 'Bestseller', desc: 'Swiss Automatic · Sapphire Crystal',
      image: '/images/watch-rolex.jpg', category: 'Watches',
    },
    {
      id: 2, name: 'Poedagar Phantom',
      price: 'Rs 10,000', originalPrice: null,
      badge: 'New Arrival', desc: 'Steel Case · Roman Numerals',
      image: '/images/watch-silver.jpg', category: 'Watches',
    },
    {
      id: 3, name: 'Royal Chronograph',
      price: 'Rs 10,000', originalPrice: 'Rs 13,000',
      badge: 'Limited', desc: '18K Gold Plating · 50m Water Resist.',
      image: '/images/watch-rolex.jpg', category: 'Watches',
    },
    {
      id: 4, name: 'Carbon Tourbillon',
      price: 'Rs 10,000', originalPrice: null,
      badge: null, desc: 'Carbon Fiber Dial · Power Reserve 72h',
      image: '/images/watch-silver.jpg', category: 'Watches',
    },
  ],
  perfumes: [
    {
      id: 5, name: 'Janan Gold Edition',
      price: 'Rs 5,000', originalPrice: 'Rs 6,500',
      badge: 'Bestseller', desc: 'Eau de Parfum · 30ml · Pour Homme',
      image: '/images/perfume-janan.jpg', category: 'Perfumes',
    },
    {
      id: 6, name: 'Janan Pour Homme',
      price: 'Rs 5,000', originalPrice: null,
      badge: 'New', desc: 'Oud · Amber · Musk · Sandalwood',
      image: '/images/perfume-janan.jpg', category: 'Perfumes',
    },
    {
      id: 7, name: 'Black Orchid Elite',
      price: 'Rs 5,000', originalPrice: 'Rs 7,000',
      badge: 'Limited', desc: 'Black Truffle · Bergamot · Jasmine',
      image: '/images/perfume-janan.jpg', category: 'Perfumes',
    },
    {
      id: 8, name: 'Amber Noir Intense',
      price: 'Rs 5,000', originalPrice: null,
      badge: null, desc: 'Amber · Leather · Cedar · Patchouli',
      image: '/images/perfume-janan.jpg', category: 'Perfumes',
    },
  ],
  shirts: [
    {
      id: 9, name: 'Midnight Blue Classic',
      price: 'Rs 2,000', originalPrice: 'Rs 2,800',
      badge: 'Bestseller', desc: 'Premium Cotton · Slim Fit',
      image: null, category: 'Shirts',
    },
    {
      id: 10, name: 'Pearl White Oxford',
      price: 'Rs 2,000', originalPrice: null,
      badge: 'New', desc: 'Egyptian Cotton · Regular Fit',
      image: null, category: 'Shirts',
    },
    {
      id: 11, name: 'Charcoal Linen',
      price: 'Rs 2,000', originalPrice: 'Rs 2,500',
      badge: 'Limited', desc: 'Pure Linen · Breathable Weave',
      image: null, category: 'Shirts',
    },
    {
      id: 12, name: 'Burgundy Formal',
      price: 'Rs 2,000', originalPrice: null,
      badge: null, desc: 'Silk Blend · Italian Collar',
      image: null, category: 'Shirts',
    },
  ],
};

interface Product {
  id: number; name: string; price: string; originalPrice: string | null;
  badge: string | null; desc: string; image: string | null; category: string;
}

/* ─────────────────────────────────────────────
   PRODUCT CARD — with 3D tilt, cloud emerge, zoom
───────────────────────────────────────────── */
function ProductCard({ product, delay }: {
  product: Product;
  delay: number;
}) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const revealed = useRef(false);

  // Intersection Observer — cloud-emerge reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting && !revealed.current) {
          revealed.current = true;
          setTimeout(() => {
            const el = cardRef.current;
            if (!el) return;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) scale(1) blur(0px)';
            el.style.filter = 'blur(0px)';
          }, delay);
        }
      }),
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [delay]);

  // 3D tilt on mouse move
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `
      translateY(-10px)
      rotateY(${x * 12}deg)
      rotateX(${-y * 10}deg)
      scale(1.02)
    `;
  };

  const onMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'translateY(0) rotateY(0deg) rotateX(0deg) scale(1)';
    setHovered(false);
  };

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const badgeColor = product.badge === 'New' || product.badge === 'New Arrival'
    ? { bg: 'rgba(76,201,120,0.15)', color: '#4CC978', border: 'rgba(76,201,120,0.3)' }
    : { bg: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: 'rgba(201,168,76,0.3)' };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => setHovered(true)}
      style={{
        opacity: 0,
        transform: 'translateY(50px) scale(0.95)',
        filter: 'blur(8px)',
        transition: 'opacity 0.8s ease, transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s ease, box-shadow 0.3s ease',
        position: 'relative',
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.35)' : 'rgba(201,168,76,0.1)'}`,
        borderRadius: '14px',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        boxShadow: hovered
          ? '0 30px 60px rgba(0,0,0,0.6), 0 0 50px rgba(201,168,76,0.07)'
          : '0 4px 20px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        willChange: 'transform',
      }}
    >
      {/* ── Image Area ── */}
      <div style={{
        height: '260px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0F0F0F, #1C1A14)',
      }}>
        {/* Ambient glow bg */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 40% 50%, rgba(201,168,76,0.07) 0%, transparent 65%)',
          transition: 'opacity 0.4s ease',
          opacity: hovered ? 1.5 : 1,
        }} />

        {product.image ? (
          <div style={{
            position: 'relative', width: '100%', height: '100%',
            transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: 'contain', padding: '1.5rem', filter: hovered ? 'drop-shadow(0 0 20px rgba(201,168,76,0.3))' : 'none', transition: 'filter 0.4s ease' }}
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        ) : (
          /* Shirt placeholder with elegant fabric pattern */
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '0.5rem',
          }}>
            <span style={{ fontSize: '4.5rem', filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.25))', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.1) translateY(-4px)' : 'scale(1)' }}>👔</span>
            <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.55rem', letterSpacing: '0.35em', color: 'rgba(201,168,76,0.35)', textTransform: 'uppercase' }}>Premium Collection</span>
          </div>
        )}

        {/* Hover shimmer overlay */}
        {hovered && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, transparent 30%, rgba(201,168,76,0.04) 50%, transparent 70%)',
            animation: 'shimmerSlide 1.5s ease infinite',
          }} />
        )}

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
          background: 'linear-gradient(to top, rgba(10,10,10,0.8), transparent)',
        }} />

        {/* Badge */}
        {product.badge && (
          <span style={{
            position: 'absolute', top: '0.85rem', left: '0.85rem',
            fontFamily: 'Jost, sans-serif', fontSize: '0.58rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            padding: '4px 10px',
            background: badgeColor.bg,
            color: badgeColor.color,
            border: `1px solid ${badgeColor.border}`,
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
          }}>
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          style={{
            position: 'absolute', top: '0.85rem', right: '0.85rem',
            background: 'rgba(10,10,10,0.7)',
            border: `1px solid ${wishlisted ? 'rgba(201,168,76,0.6)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '50%', width: '34px', height: '34px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          <svg width="13" height="13" fill={wishlisted ? '#C9A84C' : 'none'}
            stroke={wishlisted ? '#C9A84C' : 'rgba(245,240,232,0.6)'} strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* ── Info Area ── */}
      <div style={{ padding: '1.4rem' }}>
        <p style={{
          fontFamily: 'Jost, sans-serif', fontSize: '0.58rem',
          letterSpacing: '0.28em', color: 'rgba(201,168,76,0.55)',
          textTransform: 'uppercase', marginBottom: '0.45rem',
        }}>
          {product.desc}
        </p>

        <h3 style={{
          fontFamily: 'Cormorant, serif', fontSize: '1.25rem',
          fontWeight: 600, color: 'rgba(245,240,232,0.95)',
          marginBottom: '0.65rem', letterSpacing: '0.01em',
        }}>
          {product.name}
        </h3>

        {/* Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.9rem' }}>
          <span style={{ color: '#C9A84C', fontSize: '0.68rem', letterSpacing: '2px' }}>★★★★★</span>
          <span style={{ fontFamily: 'Jost', fontSize: '0.6rem', color: 'rgba(245,240,232,0.3)' }}>(128)</span>
        </div>

        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{
              fontFamily: 'Cormorant, serif', fontSize: '1.35rem', fontWeight: 700,
              background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              {product.price}
            </span>
            {product.originalPrice && (
              <span style={{ fontFamily: 'Montserrat', fontSize: '0.72rem', color: 'rgba(245,240,232,0.25)', textDecoration: 'line-through' }}>
                {product.originalPrice}
              </span>
            )}
          </div>
          <span style={{
            fontFamily: 'Jost', fontSize: '0.58rem',
            letterSpacing: '0.12em', color: 'rgba(201,168,76,0.45)',
            border: '1px solid rgba(201,168,76,0.15)',
            padding: '2px 8px', borderRadius: '10px',
          }}>
            {product.category}
          </span>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          style={{
            width: '100%', padding: '0.8rem',
            fontSize: '0.68rem', borderRadius: '8px',
            letterSpacing: '0.14em', fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600, textTransform: 'uppercase',
            cursor: 'pointer', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            transition: 'all 0.35s ease',
            background: added
              ? 'rgba(76,201,120,0.12)'
              : 'linear-gradient(135deg, #A07830 0%, #C9A84C 50%, #E8C97A 100%)',
            color: added ? '#4CC978' : '#0A0A0A',
            boxShadow: added ? 'none' : hovered ? '0 8px 25px rgba(201,168,76,0.3)' : 'none',
          }}
        >
          {added ? (
            <>
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Added!
            </>
          ) : (
            <>
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes shimmerSlide {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────────── */
function ProductSection({ id, title, subtitle, category, emoji }: {
  id: string; title: string; subtitle: string;
  category: keyof typeof products; emoji: string;
}) {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting && titleRef.current) {
          titleRef.current.style.opacity = '1';
          titleRef.current.style.transform = 'translateY(0)';
        }
      }),
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} style={{ padding: '8rem 0', position: 'relative', zIndex: 1 }}>
      {/* Section header */}
      <div ref={titleRef} style={{
        textAlign: 'center', marginBottom: '5rem',
        opacity: 0, transform: 'translateY(35px)',
        transition: 'all 0.9s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}>
        <span style={{
          fontFamily: 'Jost, sans-serif', fontSize: '1.8rem',
          marginBottom: '0.75rem', display: 'block',
        }}>{emoji}</span>
        <span style={{
          fontFamily: 'Jost, sans-serif', fontWeight: 300,
          letterSpacing: '0.4em', textTransform: 'uppercase',
          fontSize: '0.68rem', color: '#C9A84C', display: 'block', marginBottom: '1rem',
        }}>
          {subtitle}
        </span>
        <h2 style={{
          fontFamily: 'Cormorant, serif', fontWeight: 600,
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          color: 'rgba(245,240,232,0.95)', marginBottom: '1rem', lineHeight: 1.1,
        }}>
          {title}
        </h2>
        <div style={{
          height: '1px', maxWidth: '100px', margin: '0 auto',
          background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: 0.4,
        }} />
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
        gap: '1.5rem', maxWidth: '1200px',
        margin: '0 auto', padding: '0 2rem',
        perspective: '1000px',
      }}>
        {products[category].map((product, i) => (
          <ProductCard key={product.id} product={product} delay={i * 120} />
        ))}
      </div>

      {/* View All */}
      <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
        <button style={{
          background: 'transparent', color: '#C9A84C',
          border: '1px solid rgba(201,168,76,0.35)',
          fontFamily: 'Montserrat, sans-serif', fontWeight: 500,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          padding: '0.85rem 2.4rem', fontSize: '0.7rem',
          borderRadius: '4px', cursor: 'pointer', transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.35)'; }}
        >
          View All {title}
        </button>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MARQUEE + ALL SECTIONS
───────────────────────────────────────────── */
export default function ProductSections() {
  return (
    <>
      {/* Marquee ticker */}
      <div id="collections" style={{
        overflow: 'hidden',
        borderTop: '1px solid rgba(201,168,76,0.08)',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
        padding: '0.9rem 0',
        background: 'rgba(201,168,76,0.015)',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          display: 'flex', whiteSpace: 'nowrap',
          animation: 'marquee 25s linear infinite',
        }}>
          {Array(10).fill(null).map((_, i) => (
            <span key={i} style={{
              fontFamily: 'Cormorant, serif', fontSize: '0.95rem',
              fontWeight: 300, letterSpacing: '0.4em',
              color: 'rgba(201,168,76,0.22)', textTransform: 'uppercase',
              marginRight: '3.5rem',
            }}>
              ⌚ Watches &nbsp;·&nbsp; 🌸 Perfumes &nbsp;·&nbsp; 👔 Shirts &nbsp;·&nbsp; Luxury &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <ProductSection id="watches" title="Timepieces" subtitle="Swiss Excellence · PKR Collection" category="watches" emoji="⌚" />

      <div style={{ height: '1px', maxWidth: '600px', margin: '0 auto', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)' }} />

      <ProductSection id="perfumes" title="Fragrances" subtitle="Rare Essences · Janan Collection" category="perfumes" emoji="🌸" />

      <div style={{ height: '1px', maxWidth: '600px', margin: '0 auto', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)' }} />

      <ProductSection id="suits" title="Premium Shirts" subtitle="Sartorial Mastery · Bespoke Fit" category="shirts" emoji="👔" />
    </>
  );
}
