'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice: string | null;
  badge: string | null;
  desc: string;
  image: string;
}

/* ================================================================
   WATCHES — only watch images
   Files: watch-rolex.jpg, watch-curren.jpg, watch-timecheck.jpg,
          watch-poedagar.jpg, watch-silver.jpg
   ================================================================ */
const WATCHES: Product[] = [
  {
    id: 1,
    name: 'Rolex Daytona Green',
    price: 'Rs 5,000',
    originalPrice: 'Rs 6,500',
    badge: 'Bestseller',
    desc: 'Swiss Automatic · 18K Gold · Green Dial · Oyster',
    image: '/images/watch-rolex-green.jpg',
  },
  {
    id: 2,
    name: 'Curren Sport Blue',
    price: 'Rs 5,000',
    originalPrice: null,
    badge: 'New Arrival',
    desc: 'Blue Case · Leather Strap · Rose Gold Numerals',
    image: '/images/watch-curren-blue.jpg',
  },
  {
    id: 3,
    name: 'Poedagar Silver Elite',
    price: 'Rs 5,000',
    originalPrice: 'Rs 7,000',
    badge: 'Limited',
    desc: 'Stainless Steel · Black Dial · Roman Numerals · Date',
    image: '/images/watch-poedagar-silver.jpg',
  },
  {
    id: 4,
    name: 'Diver Gold Edition',
    price: 'Rs 5,000',
    originalPrice: null,
    badge: 'Exclusive',
    desc: 'Two-Tone Gold & Silver · Blue Dial · Day-Date · 200m WR',
    image: '/images/watch-diver-gold.jpg',
  },
];

/* ================================================================
   FRAGRANCES — only perfume images
   Files: perfume-janan.jpg, perfume-janan-intense.jpg,
          perfume-sauvage.jpg, perfume-armaf-bottle.jpg,
          perfume-armaf-can.jpg
   ================================================================ */
const FRAGRANCES: Product[] = [
  {
    id: 5,
    name: 'Blue For Men',
    price: 'Rs 10,000',
    originalPrice: 'Rs 12,000',
    badge: 'Bestseller',
    desc: 'Eau de Parfum · Al Zai · Fresh Aquatic · Pour Homme',
    image: '/images/perfume-blue-men.jpg',
  },
  {
    id: 6,
    name: 'Armaf Club de Nuit',
    price: 'Rs 10,000',
    originalPrice: null,
    badge: 'New',
    desc: 'Intense Man · Oud · Bergamot · Cedar · Musk',
    image: '/images/perfume-armaf-nuit.jpg',
  },
  {
    id: 7,
    name: 'Dior Sauvage',
    price: 'Rs 10,000',
    originalPrice: 'Rs 13,500',
    badge: 'Icon',
    desc: 'Parfum · Bergamot · Pepper · Ambroxan · World Famous',
    image: '/images/perfume-sauvage-new.jpg',
  },
  {
    id: 8,
    name: 'Aroma by Diners',
    price: 'Rs 10,000',
    originalPrice: null,
    badge: 'New',
    desc: 'Eau de Parfum · Floral · Rose · Fresh · Elegant',
    image: '/images/perfume-aroma-diners.jpg',
  },
];

/* ================================================================
   SHIRTS — only shirt images
   Files: shirt-blue.jpg, shirt-grey.jpg
   ================================================================ */
const SHIRTS: Product[] = [
  {
    id: 9,
    name: 'Plaid Casual Shirt',
    price: 'Rs 2,000',
    originalPrice: 'Rs 2,800',
    badge: 'Bestseller',
    desc: 'Premium Cotton · Regular Fit · Classic Plaid Pattern',
    image: '/images/shirt-plaid.jpg',
  },
  {
    id: 10,
    name: 'Sky Blue Formal',
    price: 'Rs 2,000',
    originalPrice: null,
    badge: 'New',
    desc: 'Egyptian Cotton · Slim Fit · Light Blue Checks',
    image: '/images/shirt-light-blue.jpg',
  },
  {
    id: 11,
    name: 'Midnight Black',
    price: 'Rs 2,000',
    originalPrice: 'Rs 2,500',
    badge: 'Limited',
    desc: 'Pure Cotton · Slim Fit · Solid Black · Formal',
    image: '/images/shirt-black-formal.jpg',
  },
  {
    id: 12,
    name: 'Steel Grey Oxford',
    price: 'Rs 2,000',
    originalPrice: null,
    badge: null,
    desc: 'Linen Blend · Italian Collar · Slim Fit · Elegant',
    image: '/images/shirt-grey-formal.jpg',
  },
];

/* ── Bento Card ──────────────────────────────────────────────── */
function BentoCard({ product, index, large }: {
  product: Product; index: number; large: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [added,   setAdded]   = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        cursor: 'pointer',
        aspectRatio: large ? '7/5' : '5/5',
      }}
    >
      {/* Product Image */}
      <motion.div
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>

      {/* Halftone pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle,#000 1px,transparent 1px)',
        backgroundSize: '4px 4px',
        opacity: 0.15,
        mixBlendMode: 'multiply',
        pointerEvents: 'none',
      }} />

      {/* Base gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top,rgba(10,10,10,0.92) 0%,rgba(10,10,10,0.1) 55%,transparent 100%)',
      }} />

      {/* Hover blur overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.45)', backdropFilter: 'blur(4px)' }}
      />

      {/* Badge */}
      {product.badge && (
        <div style={{
          position: 'absolute', top: '1rem', left: '1rem',
          fontFamily: 'Inter, sans-serif', fontSize: '0.52rem', fontWeight: 500,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          padding: '3px 10px',
          background: 'rgba(201,168,76,0.1)',
          color: '#C9A84C',
          border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: '9999px',
          backdropFilter: 'blur(8px)',
        }}>
          {product.badge}
        </div>
      )}

      {/* Product Info */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.58rem',
          letterSpacing: '0.2em', color: 'rgba(201,168,76,0.55)',
          textTransform: 'uppercase', marginBottom: '0.3rem',
        }}>
          {product.desc}
        </div>
        <div style={{
          fontFamily: '"Instrument Serif", serif', fontStyle: 'italic',
          fontSize: large ? '1.5rem' : '1.2rem',
          color: 'rgba(245,240,232,0.95)',
          marginBottom: '0.6rem',
        }}>
          {product.name}
        </div>

        {/* Hover-reveal: price + cart button */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{
              fontFamily: '"Instrument Serif", serif', fontSize: '1.2rem',
              background: 'linear-gradient(135deg,#C9A84C,#E8C97A)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
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
            style={{
              background: added ? 'rgba(76,201,120,0.12)' : 'rgba(245,240,232,0.95)',
              color: added ? '#4CC978' : '#0A0A0A',
              border: 'none', borderRadius: '9999px',
              padding: '0.5rem 1.2rem',
              fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 600,
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'background 0.3s, color 0.3s',
            }}
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

/* ── Section wrapper ─────────────────────────────────────────── */
function ProductSection({
  id, title, subtitle, emoji, products,
}: {
  id: string; title: string; subtitle: string; emoji: string; products: Product[];
}) {
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
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(245,240,232,0.55)', borderRadius: '9999px', padding: '0.65rem 1.5rem', fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 400, cursor: 'pointer' }}
          >
            View all →
          </motion.button>
        </motion.div>

        {/* Bento Grid: col 0 → 7 cols, col 1 → 5 cols, col 2 → 5 cols, col 3 → 7 cols */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.25rem' }}>
          {products.map((product, i) => (
            <BentoCard key={product.id} product={product} index={i} large={i === 0 || i === 3} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Marquee divider ─────────────────────────────────────────── */
function MarqueeDivider({ text }: { text: string }) {
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '0.75rem 0', zIndex: 1, position: 'relative' }}>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 30s linear infinite' }}>
        {Array(14).fill(null).map((_, i) => (
          <span key={i} style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: '0.9rem', color: 'rgba(201,168,76,0.16)', letterSpacing: '0.15em', marginRight: '3rem' }}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Main Export ─────────────────────────────────────────────── */
export default function ProductSections() {
  return (
    <div id="collections">

      <MarqueeDivider text="Watches · Fragrances · Shirts · Luxury ·" />

      {/* ⌚ TIMEPIECES — All watches */}
      <ProductSection
        id="watches"
        title="Timepieces"
        subtitle="Swiss Excellence · Premium Watches"
        emoji="⌚"
        products={WATCHES}
      />

      <MarqueeDivider text="Rolex · Curren · TimeCheck · Poedagar ·" />

      {/* 🌸 FRAGRANCES — All perfumes */}
      <ProductSection
        id="perfumes"
        title="Fragrances"
        subtitle="Rare Essences · Luxury Scents"
        emoji="🌸"
        products={FRAGRANCES}
      />

      <MarqueeDivider text="Janan · Dior · Armaf · Club de Nuit ·" />

      {/* 👔 SUITS & SHIRTS — All shirts */}
      <ProductSection
        id="suits"
        title="Suits & Shirts"
        subtitle="Sartorial Mastery · Bespoke Fit"
        emoji="👔"
        products={SHIRTS}
      />

      <MarqueeDivider text="Watches · Fragrances · Shirts · Luxury ·" />

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
