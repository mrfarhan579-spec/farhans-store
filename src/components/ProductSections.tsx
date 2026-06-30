'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ─── Product Data ─────────────────────────────────────────────── */
interface Product {
  id: number; name: string; price: string; originalPrice: string | null;
  badge: string | null; desc: string; image: string | null; category: string;
}

const products: Record<string, Product[]> = {
  watches: [
    { id: 1, name: 'Rolex Daytona Gold', price: 'Rs 10,000', originalPrice: 'Rs 12,500', badge: 'Bestseller', desc: 'Swiss Automatic · Sapphire Crystal', image: '/images/watch-rolex.jpg', category: 'Watches' },
    { id: 2, name: 'Poedagar Phantom', price: 'Rs 10,000', originalPrice: null, badge: 'New Arrival', desc: 'Steel Case · Roman Numerals', image: '/images/watch-silver.jpg', category: 'Watches' },
    { id: 3, name: 'TimeCheck Emerald', price: 'Rs 10,000', originalPrice: 'Rs 13,000', badge: 'Limited', desc: 'Green Dial · Steel Bracelet', image: '/images/watch-timecheck.jpg', category: 'Watches' },
    { id: 4, name: 'Royal Chronograph', price: 'Rs 10,000', originalPrice: null, badge: null, desc: '18K Gold Plating · 50m Water Resist.', image: '/images/watch-rolex.jpg', category: 'Watches' },
  ],
  perfumes: [
    { id: 5, name: 'Janan Gold Edition', price: 'Rs 5,000', originalPrice: 'Rs 6,500', badge: 'Bestseller', desc: 'Eau de Parfum · 30ml · Pour Homme', image: '/images/perfume-janan.jpg', category: 'Perfumes' },
    { id: 6, name: 'Club de Nuit Intense', price: 'Rs 5,000', originalPrice: null, badge: 'New', desc: 'Armaf · Oud · Bergamot · Cedar', image: '/images/perfume-armaf-bottle.jpg', category: 'Perfumes' },
    { id: 7, name: 'Club de Nuit Sport', price: 'Rs 5,000', originalPrice: 'Rs 7,000', badge: 'Limited', desc: 'Armaf · Fresh · Aquatic · Musk', image: '/images/perfume-armaf-can.jpg', category: 'Perfumes' },
    { id: 8, name: 'Amber Noir Intense', price: 'Rs 5,000', originalPrice: null, badge: null, desc: 'Amber · Leather · Cedar · Patchouli', image: '/images/perfume-janan.jpg', category: 'Perfumes' },
  ],
  shirts: [
    { id: 9, name: 'Ocean Blue Classic', price: 'Rs 2,000', originalPrice: 'Rs 2,800', badge: 'Bestseller', desc: 'Premium Cotton · Slim Fit', image: '/images/shirt-blue.jpg', category: 'Shirts' },
    { id: 10, name: 'Charcoal Formal', price: 'Rs 2,000', originalPrice: null, badge: 'New', desc: 'Egyptian Cotton · Regular Fit', image: '/images/shirt-grey.jpg', category: 'Shirts' },
    { id: 11, name: 'Steel Grey Oxford', price: 'Rs 2,000', originalPrice: 'Rs 2,500', badge: 'Limited', desc: 'Pure Cotton · Breathable Weave', image: '/images/shirt-grey.jpg', category: 'Shirts' },
    { id: 12, name: 'Midnight Linen', price: 'Rs 2,000', originalPrice: null, badge: null, desc: 'Linen Blend · Italian Collar', image: '/images/shirt-blue.jpg', category: 'Shirts' },
  ],
};

/* ─── Product Card ─────────────────────────────────────────────── */
function ProductCard({ product, index }: { product: Product; index: number }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const badgeColor = product.badge === 'New' || product.badge === 'New Arrival'
    ? { bg: 'rgba(76,201,120,0.15)', color: '#4CC978', border: 'rgba(76,201,120,0.3)' }
    : { bg: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: 'rgba(201,168,76,0.3)' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
      whileHover={{ y: -12, boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(201,168,76,0.08)' }}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(201,168,76,0.1)',
        borderRadius: '14px', overflow: 'hidden',
        cursor: 'pointer', transformStyle: 'preserve-3d',
        transition: 'border-color 0.3s ease',
      }}
      onHoverStart={e => { (e.target as HTMLElement).closest?.('div[style]'); }}
    >
      {/* Image */}
      <div style={{ height: '260px', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg,#0F0F0F,#1C1A14)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 40% 50%,rgba(201,168,76,0.07) 0%,transparent 65%)' }} />

        {product.image && (
          <motion.div
            style={{ position: 'relative', width: '100%', height: '100%' }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Image
              src={product.image} alt={product.name} fill
              style={{ objectFit: 'contain', padding: '1.5rem' }}
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </motion.div>
        )}

        {/* Bottom gradient */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to top,rgba(10,10,10,0.8),transparent)' }} />

        {/* Badge */}
        {product.badge && (
          <motion.span
            initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: index * 0.12 + 0.3 }}
            style={{ position: 'absolute', top: '0.85rem', left: '0.85rem', fontFamily: 'Jost', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '4px 10px', background: badgeColor.bg, color: badgeColor.color, border: `1px solid ${badgeColor.border}`, borderRadius: '20px', backdropFilter: 'blur(10px)' }}
          >
            {product.badge}
          </motion.span>
        )}

        {/* Wishlist */}
        <motion.button
          onClick={() => setWishlisted(!wishlisted)}
          whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
          animate={wishlisted ? { scale: [1, 1.4, 1] } : {}}
          style={{ position: 'absolute', top: '0.85rem', right: '0.85rem', background: 'rgba(10,10,10,0.7)', border: `1px solid ${wishlisted ? 'rgba(201,168,76,0.6)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)' }}
        >
          <svg width="13" height="13" fill={wishlisted ? '#C9A84C' : 'none'} stroke={wishlisted ? '#C9A84C' : 'rgba(245,240,232,0.6)'} strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </motion.button>
      </div>

      {/* Info */}
      <div style={{ padding: '1.4rem' }}>
        <p style={{ fontFamily: 'Jost', fontSize: '0.58rem', letterSpacing: '0.28em', color: 'rgba(201,168,76,0.55)', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
          {product.desc}
        </p>
        <h3 style={{ fontFamily: 'Cormorant, serif', fontSize: '1.25rem', fontWeight: 600, color: 'rgba(245,240,232,0.95)', marginBottom: '0.65rem' }}>
          {product.name}
        </h3>

        {/* Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.9rem' }}>
          <span style={{ color: '#C9A84C', fontSize: '0.68rem', letterSpacing: '2px' }}>★★★★★</span>
          <span style={{ fontFamily: 'Jost', fontSize: '0.6rem', color: 'rgba(245,240,232,0.3)' }}>(128)</span>
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'Cormorant, serif', fontSize: '1.35rem', fontWeight: 700, background: 'linear-gradient(135deg,#C9A84C,#E8C97A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {product.price}
            </span>
            {product.originalPrice && (
              <span style={{ fontFamily: 'Montserrat', fontSize: '0.72rem', color: 'rgba(245,240,232,0.25)', textDecoration: 'line-through' }}>
                {product.originalPrice}
              </span>
            )}
          </div>
          <span style={{ fontFamily: 'Jost', fontSize: '0.58rem', letterSpacing: '0.12em', color: 'rgba(201,168,76,0.45)', border: '1px solid rgba(201,168,76,0.15)', padding: '2px 8px', borderRadius: '10px' }}>
            {product.category}
          </span>
        </div>

        {/* Add to cart */}
        <motion.button
          onClick={handleAddToCart}
          whileHover={!added ? { scale: 1.02, boxShadow: '0 8px 25px rgba(201,168,76,0.35)' } : {}}
          whileTap={{ scale: 0.97 }}
          style={{
            width: '100%', padding: '0.85rem',
            fontSize: '0.68rem', borderRadius: '8px',
            letterSpacing: '0.14em', fontFamily: 'Montserrat',
            fontWeight: 600, textTransform: 'uppercase',
            cursor: 'pointer', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            background: added ? 'rgba(76,201,120,0.12)' : 'linear-gradient(135deg,#A07830 0%,#C9A84C 50%,#E8C97A 100%)',
            color: added ? '#4CC978' : '#0A0A0A',
            transition: 'background 0.3s ease, color 0.3s ease',
          }}
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span key="added" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                Added!
              </motion.span>
            ) : (
              <motion.span key="add" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                Add to Cart
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─── Section ──────────────────────────────────────────────────── */
function ProductSection({ id, title, subtitle, category, emoji }: {
  id: string; title: string; subtitle: string;
  category: keyof typeof products; emoji: string;
}) {
  return (
    <section id={id} style={{ padding: '8rem 0', position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: '5rem' }}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          style={{ display: 'block', fontSize: '1.8rem', marginBottom: '0.75rem' }}
        >
          {emoji}
        </motion.span>
        <span style={{ fontFamily: 'Jost', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase', fontSize: '0.68rem', color: '#C9A84C', display: 'block', marginBottom: '1rem' }}>
          {subtitle}
        </span>
        <h2 style={{ fontFamily: 'Cormorant, serif', fontWeight: 600, fontSize: 'clamp(2.5rem,6vw,4rem)', color: 'rgba(245,240,232,0.95)', marginBottom: '1rem', lineHeight: 1.1 }}>
          {title}
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ height: '1px', maxWidth: '100px', margin: '0 auto', background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }}
        />
      </motion.div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(275px,1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', perspective: '1000px' }}>
        {products[category].map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      {/* View All */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.5 }}
        style={{ textAlign: 'center', marginTop: '3.5rem' }}
      >
        <motion.button
          whileHover={{ scale: 1.04, backgroundColor: 'rgba(201,168,76,0.08)', borderColor: '#C9A84C' }}
          whileTap={{ scale: 0.97 }}
          style={{ background: 'transparent', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.35)', fontFamily: 'Montserrat', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '0.85rem 2.4rem', fontSize: '0.7rem', borderRadius: '4px', cursor: 'pointer' }}
        >
          View All {title}
        </motion.button>
      </motion.div>
    </section>
  );
}

/* ─── Export ───────────────────────────────────────────────────── */
export default function ProductSections() {
  return (
    <>
      {/* Marquee */}
      <div id="collections" style={{ overflow: 'hidden', borderTop: '1px solid rgba(201,168,76,0.08)', borderBottom: '1px solid rgba(201,168,76,0.08)', padding: '0.9rem 0', background: 'rgba(201,168,76,0.015)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 25s linear infinite' }}>
          {Array(10).fill(null).map((_, i) => (
            <span key={i} style={{ fontFamily: 'Cormorant, serif', fontSize: '0.95rem', fontWeight: 300, letterSpacing: '0.4em', color: 'rgba(201,168,76,0.22)', textTransform: 'uppercase', marginRight: '3.5rem' }}>
              ⌚ Watches &nbsp;·&nbsp; 🌸 Perfumes &nbsp;·&nbsp; 👔 Shirts &nbsp;·&nbsp; Luxury &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <ProductSection id="watches" title="Timepieces" subtitle="Swiss Excellence · PKR Collection" category="watches" emoji="⌚" />
      <div style={{ height: '1px', maxWidth: '600px', margin: '0 auto', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.25),transparent)' }} />
      <ProductSection id="perfumes" title="Fragrances" subtitle="Rare Essences · Armaf & Janan" category="perfumes" emoji="🌸" />
      <div style={{ height: '1px', maxWidth: '600px', margin: '0 auto', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.25),transparent)' }} />
      <ProductSection id="suits" title="Premium Shirts" subtitle="Sartorial Mastery · Bespoke Fit" category="shirts" emoji="👔" />
    </>
  );
}
