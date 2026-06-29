'use client';
import { useEffect, useRef, useState } from 'react';

const products = {
  watches: [
    { id: 1, name: 'Royal Chronograph', price: '$4,850', originalPrice: '$5,800', badge: 'Bestseller', emoji: '⌚', desc: 'Swiss automatic movement, sapphire crystal' },
    { id: 2, name: 'Midnight Tourbillon', price: '$12,500', originalPrice: null, badge: 'Limited', emoji: '🕰️', desc: 'Skeleton dial, 72-hour power reserve' },
    { id: 3, name: 'Gold Perpetual', price: '$8,200', originalPrice: '$9,500', badge: 'New', emoji: '⌚', desc: '18K gold case, perpetual calendar' },
    { id: 4, name: 'Carbon Phantom', price: '$6,300', originalPrice: null, badge: null, emoji: '⌚', desc: 'Carbon fiber, 300m water resistant' },
  ],
  suits: [
    { id: 5, name: 'Bespoke Midnight Blue', price: '$2,200', originalPrice: '$2,800', badge: 'Bestseller', emoji: '🎩', desc: 'Italian wool, hand-stitched lapels' },
    { id: 6, name: 'Classic Charcoal', price: '$1,850', originalPrice: null, badge: 'New', emoji: '👔', desc: 'Super 150s wool, slim fit' },
    { id: 7, name: 'Royal Ivory', price: '$2,600', originalPrice: '$3,200', badge: 'Limited', emoji: '🎩', desc: 'Pure silk lining, mother-of-pearl buttons' },
    { id: 8, name: 'Heritage Tweed', price: '$1,650', originalPrice: null, badge: null, emoji: '👔', desc: 'Scottish tweed, traditional cut' },
  ],
  perfumes: [
    { id: 9, name: 'Oud Majesty', price: '$380', originalPrice: '$450', badge: 'Bestseller', emoji: '🌸', desc: 'Agarwood, amber, sandalwood' },
    { id: 10, name: 'Rose Imperiale', price: '$290', originalPrice: null, badge: 'New', emoji: '🌹', desc: 'Bulgarian rose, musk, vanilla' },
    { id: 11, name: 'Black Orchid Elite', price: '$420', originalPrice: '$520', badge: 'Limited', emoji: '🌺', desc: 'Black truffle, bergamot, jasmine' },
    { id: 12, name: 'Amber Noir', price: '$260', originalPrice: null, badge: null, emoji: '✨', desc: 'Amber, leather, cedar, patchouli' },
  ],
};

function ProductCard({ product, delay }: { product: typeof products.watches[0]; delay: number }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => {
            if (cardRef.current) {
              cardRef.current.style.opacity = '1';
              cardRef.current.style.transform = 'translateY(0)';
            }
          }, delay);
        }
      }),
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [delay]);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      ref={cardRef}
      className="product-card"
      style={{
        opacity: 0,
        transform: 'translateY(40px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease, border-color 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Product image area */}
      <div style={{
        height: '260px',
        background: 'linear-gradient(135deg, #111111, #1A1A1A)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Shimmer bg */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 30% 40%, rgba(201,168,76,0.06) 0%, transparent 60%)',
        }} />

        {/* Product emoji/icon */}
        <span style={{ fontSize: '5rem', filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.2))' }} className="float-anim">
          {product.emoji}
        </span>

        {/* Badge */}
        {product.badge && (
          <span style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            padding: '4px 10px',
            background: product.badge === 'Limited'
              ? 'rgba(201,168,76,0.15)'
              : product.badge === 'New'
              ? 'rgba(76,201,120,0.15)'
              : 'rgba(201,168,76,0.15)',
            color: product.badge === 'New' ? '#4CC978' : 'var(--gold)',
            border: `1px solid ${product.badge === 'New' ? 'rgba(76,201,120,0.3)' : 'rgba(201,168,76,0.3)'}`,
            borderRadius: '20px',
          }}>
            {product.badge}
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(10,10,10,0.6)',
            border: `1px solid ${wishlisted ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
          }}
        >
          <svg width="14" height="14" fill={wishlisted ? '#C9A84C' : 'none'} stroke={wishlisted ? '#C9A84C' : 'rgba(245,240,232,0.6)'} strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* Product info */}
      <div style={{ padding: '1.5rem' }}>
        <p style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          color: 'rgba(201,168,76,0.6)',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>
          {product.desc}
        </p>

        <h3 style={{
          fontFamily: 'Cormorant, serif',
          fontSize: '1.3rem',
          fontWeight: 600,
          color: 'rgba(245,240,232,0.95)',
          marginBottom: '0.75rem',
          letterSpacing: '0.02em',
        }}>
          {product.name}
        </h3>

        {/* Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span className="stars" style={{ fontSize: '0.7rem' }}>★★★★★</span>
          <span style={{ fontFamily: 'Jost', fontSize: '0.65rem', color: 'rgba(245,240,232,0.35)' }}>(128)</span>
        </div>

        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{
              fontFamily: 'Cormorant, serif',
              fontSize: '1.4rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {product.price}
            </span>
            {product.originalPrice && (
              <span style={{
                fontFamily: 'Montserrat',
                fontSize: '0.75rem',
                color: 'rgba(245,240,232,0.3)',
                textDecoration: 'line-through',
              }}>
                {product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className={added ? '' : 'btn-gold'}
          style={{
            width: '100%',
            padding: '0.85rem',
            fontSize: '0.7rem',
            borderRadius: '6px',
            letterSpacing: '0.15em',
            background: added
              ? 'rgba(76,201,120,0.15)'
              : undefined,
            color: added ? '#4CC978' : undefined,
            border: added ? '1px solid rgba(76,201,120,0.3)' : undefined,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease',
          }}
        >
          {added ? (
            <>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Added to Cart
            </>
          ) : (
            <>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function ProductSection({ id, title, subtitle, category }: {
  id: string;
  title: string;
  subtitle: string;
  category: keyof typeof products;
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
    <section id={id} style={{ padding: '8rem 0', position: 'relative' }}>
      {/* Section header */}
      <div
        ref={titleRef}
        style={{
          textAlign: 'center',
          marginBottom: '5rem',
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}
      >
        <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>{subtitle}</span>
        <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'rgba(245,240,232,0.95)', marginBottom: '1rem' }}>
          {title}
        </h2>
        <div className="divider-gold" style={{ maxWidth: '120px', margin: '0 auto' }} />
      </div>

      {/* Products grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
      }}>
        {products[category].map((product, i) => (
          <ProductCard key={product.id} product={product} delay={i * 150} />
        ))}
      </div>

      {/* View all button */}
      <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
        <button className="btn-ghost" style={{ padding: '0.9rem 2.5rem', fontSize: '0.72rem', borderRadius: '4px' }}>
          View All {title}
        </button>
      </div>
    </section>
  );
}

export default function ProductSections() {
  return (
    <>
      {/* Marquee banner */}
      <div id="collections" style={{ overflow: 'hidden', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)', padding: '1rem 0', background: 'rgba(201,168,76,0.02)' }}>
        <div className="marquee-track">
          {Array(10).fill(null).map((_, i) => (
            <span key={i} style={{
              fontFamily: 'Cormorant, serif',
              fontSize: '1rem',
              fontWeight: 300,
              letterSpacing: '0.4em',
              color: 'rgba(201,168,76,0.25)',
              textTransform: 'uppercase',
              marginRight: '4rem',
            }}>
              Watches · Suits · Perfumes · Luxury ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <ProductSection id="watches" title="Timepieces" subtitle="Swiss Excellence" category="watches" />

      <div className="divider-gold" style={{ maxWidth: '600px', margin: '0 auto' }} />

      <ProductSection id="suits" title="Bespoke Suits" subtitle="Sartorial Mastery" category="suits" />

      <div className="divider-gold" style={{ maxWidth: '600px', margin: '0 auto' }} />

      <ProductSection id="perfumes" title="Fragrances" subtitle="Rare Essences" category="perfumes" />
    </>
  );
}
