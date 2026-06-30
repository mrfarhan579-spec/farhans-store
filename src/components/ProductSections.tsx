'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: number; name: string; price: string; originalPrice: string | null;
  badge: string | null; desc: string; image: string; category: string;
}

/* ─────────────────────────────────────────────────────────────── */
/* ALL PRODUCTS — strictly categorised                            */
/* ─────────────────────────────────────────────────────────────── */
const products: Record<string, Product[]> = {

  /* ⌚ WATCHES ONLY */
  watches: [
    {
      id: 1, name: 'Rolex Daytona Gold', price: 'Rs 10,000', originalPrice: 'Rs 12,500',
      badge: 'Bestseller', desc: 'Swiss Automatic · 18K Gold · Sapphire Crystal',
      image: '/images/watch-rolex.jpg', category: 'Watches',
    },
    {
      id: 2, name: 'Curren Sport Blue', price: 'Rs 10,000', originalPrice: null,
      badge: 'New Arrival', desc: 'Blue Case · Leather Strap · Rose Gold Numerals · Day-Date',
      image: '/images/watch-curren.jpg', category: 'Watches',
    },
    {
      id: 3, name: 'TimeCheck Emerald', price: 'Rs 10,000', originalPrice: 'Rs 13,000',
      badge: 'Limited', desc: 'Emerald Green Dial · Steel Bracelet · Luminous Hands',
      image: '/images/watch-timecheck.jpg', category: 'Watches',
    },
    {
      id: 4, name: 'Poedagar Elite', price: 'Rs 10,000', originalPrice: null,
      badge: null, desc: 'Stainless Steel · Blue Crystal · Roman Numerals · Date Window',
      image: '/images/watch-poedagar.jpg', category: 'Watches',
    },
  ],

  /* 🌸 FRAGRANCES ONLY */
  perfumes: [
    {
      id: 5, name: 'Janan Gold Edition', price: 'Rs 5,000', originalPrice: 'Rs 6,500',
      badge: 'Bestseller', desc: 'Eau de Parfum · 30ml · Woody Musky · Pour Homme',
      image: '/images/perfume-janan.jpg', category: 'Fragrances',
    },
    {
      id: 6, name: 'Janan Intense', price: 'Rs 5,000', originalPrice: null,
      badge: 'New', desc: 'Gold Flacon · Warm Oriental · Amber · Sandalwood',
      image: '/images/perfume-janan-intense.jpg', category: 'Fragrances',
    },
    {
      id: 7, name: 'Dior Sauvage', price: 'Rs 5,000', originalPrice: 'Rs 7,500',
      badge: 'Icon', desc: 'Parfum · Bergamot · Pepper · Ambroxan · Iconic',
      image: '/images/perfume-sauvage.jpg', category: 'Fragrances',
    },
    {
      id: 8, name: 'Armaf Club de Nuit', price: 'Rs 5,000', originalPrice: null,
      badge: null, desc: 'Eau de Parfum · Oud · Bergamot · Cedar · Musk',
      image: '/images/perfume-armaf-bottle.jpg', category: 'Fragrances',
    },
  ],

  /* 👔 SHIRTS ONLY */
  shirts: [
    {
      id: 9, name: 'Ocean Blue Classic', price: 'Rs 2,000', originalPrice: 'Rs 2,800',
      badge: 'Bestseller', desc: 'Premium Cotton · Slim Fit · Italian Collar',
      image: '/images/shirt-blue.jpg', category: 'Shirts',
    },
    {
      id: 10, name: 'Charcoal Formal', price: 'Rs 2,000', originalPrice: null,
      badge: 'New', desc: 'Egyptian Cotton · Regular Fit · French Cuffs',
      image: '/images/shirt-grey.jpg', category: 'Shirts',
    },
    {
      id: 11, name: 'Steel Grey Oxford', price: 'Rs 2,000', originalPrice: 'Rs 2,500',
      badge: 'Limited', desc: 'Pure Cotton · Breathable Weave · Button-Down',
      image: '/images/shirt-grey.jpg', category: 'Shirts',
    },
    {
      id: 12, name: 'Midnight Linen', price: 'Rs 2,000', originalPrice: null,
      badge: null, desc: 'Linen Blend · Italian Collar · Summer Wear',
      image: '/images/shirt-blue.jpg', category: 'Shirts',
    },
  ],
};

/* ── Bento Card ──────────────────────────────────────────────── */
function BentoCard({ product, index, large }: { product: Product; index: number; large: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [added,   setAdded]   = useState(false);

  const handleAdd = () => { setAdded(true); setTimeout(() => setAdded(false), 2000); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        gridColumn: large ? 'span 7' : 'span 5',
        position: 'relative', borderRadius: '24px', overflow: 'hidden',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        cursor: 'pointer',
        aspectRatio: large ? '7/5' : '5/5',
      }}
    >
      {/* Image */}
      <motion.div
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Image
          src={product.image} alt={product.name} fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>

      {/* Halftone overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,#000 1px,transparent 1px)', backgroundSize: '4px 4px', opacity: 0.16, mixBlendMode: 'multiply', pointerEvents: 'none' }} />

      {/* Base gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(10,10,10,0.88) 0%,rgba(10,10,10,0.15) 55%,transparent 100%)' }} />

      {/* Hover blur overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.5)', backdropFilter: 'blur(4px)' }}
      />

      {/* Badge */}
      {product.badge && (
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', fontFamily: 'Inter, sans-serif', fontSize: '0.52rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '3px 10px', background: 'rgba(201,168,76,0.1)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '9999px', backdropFilter: 'blur(8px)' }}>
          {product.badge}
        </div>
      )}

      {/* Bottom info */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(201,168,76,0.55)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
          {product.desc}
        </div>
        <div style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: large ? '1.5rem' : '1.2rem', color: 'rgba(245,240,232,0.95)', marginBottom: '0.6rem' }}>
          {product.name}
        </div>

        {/* Hover reveal — price + cart */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontFamily: '"Instrument Serif", serif', fontSize: '1.2rem', background: 'linear-gradient(135deg,#C9A84C,#E8C97A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {product.price}
            </span>
            {product.originalPrice && (
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: 'rgba(245,240,232,0.28)', textDecoration: 'line-through' }}>
                {product.originalPrice}
              </span>
            )}
          </div>
          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.05, boxShadow: '0 0 0 1.5px #C9A84C' }}
            whileTap={{ scale: 0.95 }}
            style={{ background: added ? 'rgba(76,201,120,0.12)' : 'rgba(245,240,232,0.95)', color: added ? '#4CC978' : '#0A0A0A', border: 'none', borderRadius: '9999px', padding: '0.5rem 1.2rem', fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.3s, color 0.3s' }}
          >
            <AnimatePresence mode="wait">
              {added
                ? <motion.span key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>✓ Added</motion.span>
                : <motion.span key="b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Add to Cart</motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── Section ─────────────────────────────────────────────────── */
function ProductSection({ id, title, subtitle, emoji, category }: {
  id: string; title: string; subtitle: string; emoji: string;
  category: keyof typeof products;
}) {
  const list = products[category];

  return (
    <section id={id} style={{ padding: '7rem 0', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ width: '32px', height: '1px', background: 'rgba(201,168,76,0.4)' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', fontWeight: 400 }}>
                {subtitle}
              </span>
            </div>
            <h2 style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 'clamp(2.2rem,5vw,3.8rem)', color: 'rgba(245,240,232,0.95)', lineHeight: 1, margin: 0 }}>
              {emoji} {title}
            </h2>
          </div>

          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 0 1.5px #C9A84C' }}
            whileTap={{ scale: 0.97 }}
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(245,240,232,0.55)', borderRadius: '9999px', padding: '0.65rem 1.5rem', fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 400, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            View all {title} →
          </motion.button>
        </motion.div>

        {/* Bento Grid — 12 cols: large(7)/small(5) then small(5)/large(7) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.25rem' }}>
          {list.map((product, i) => {
            const large = i === 0 || i === 3;
            return <BentoCard key={product.id} product={product} index={i} large={large} />;
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Marquee divider ─────────────────────────────────────────── */
function MarqueeDivider() {
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '0.75rem 0', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 30s linear infinite' }}>
        {Array(12).fill(null).map((_, i) => (
          <span key={i} style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: '0.9rem', color: 'rgba(201,168,76,0.16)', letterSpacing: '0.15em', marginRight: '3rem' }}>
            Watches &nbsp;·&nbsp; Fragrances &nbsp;·&nbsp; Shirts &nbsp;·&nbsp; Luxury &nbsp;·&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Export ──────────────────────────────────────────────────── */
export default function ProductSections() {
  return (
    <div id="collections">
      <MarqueeDivider />

      {/* ⌚ WATCHES */}
      <ProductSection
        id="watches"
        title="Timepieces"
        subtitle="Swiss Excellence · Premium Watches"
        emoji="⌚"
        category="watches"
      />

      <MarqueeDivider />

      {/* 🌸 FRAGRANCES */}
      <ProductSection
        id="perfumes"
        title="Fragrances"
        subtitle="Rare Essences · Luxury Scents"
        emoji="🌸"
        category="perfumes"
      />

      <MarqueeDivider />

      {/* 👔 SHIRTS */}
      <ProductSection
        id="suits"
        title="Premium Shirts"
        subtitle="Sartorial Mastery · Bespoke Fit"
        emoji="👔"
        category="shirts"
      />

      <MarqueeDivider />

      <style>{`
        @media (max-width: 768px) {
          div[style*="repeat(12, 1fr)"] > * {
            grid-column: span 12 !important;
            aspect-ratio: 4/3 !important;
          }
        }
      `}</style>
    </div>
  );
}
