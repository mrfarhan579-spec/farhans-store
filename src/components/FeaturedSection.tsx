'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

/* One product from each category — real images */
const masterpieces = [
  {
    category: 'Watches',
    name: 'Rolex Daytona Gold',
    desc: 'Swiss Automatic · 18K Gold · Sapphire Crystal · Iconic Chronograph',
    price: 'Rs 10,000',
    tag: "Editor's Pick",
    image: '/images/watch-rolex.jpg',
    scroll: '#watches',
  },
  {
    category: 'Fragrances',
    name: 'Dior Sauvage',
    desc: 'Parfum · Bergamot · Ambroxan · The world\'s most iconic scent',
    price: 'Rs 5,000',
    tag: 'Bestseller',
    image: '/images/perfume-sauvage.jpg',
    scroll: '#perfumes',
  },
  {
    category: 'Shirts',
    name: 'Ocean Blue Classic',
    desc: 'Premium Cotton · Slim Fit · Italian Collar · Handcrafted',
    price: 'Rs 2,000',
    tag: 'Most Loved',
    image: '/images/shirt-blue.jpg',
    scroll: '#suits',
  },
];

export default function FeaturedSection() {
  return (
    <section style={{ padding: '8rem 2rem', background: 'rgba(201,168,76,0.012)', position: 'relative', overflow: 'hidden', zIndex: 1 }}>

      {/* Bg glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(201,168,76,1) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '40px', background: 'rgba(201,168,76,0.4)' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)' }}>Hand-picked for you</span>
            <div style={{ height: '1px', width: '40px', background: 'rgba(201,168,76,0.4)' }} />
          </div>
          <h2 style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 'clamp(2.5rem,6vw,4.5rem)', color: 'rgba(245,240,232,0.95)', lineHeight: 1, marginBottom: '1.2rem' }}>
            Featured <em>Masterpieces</em>
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.9rem', color: 'rgba(245,240,232,0.38)', maxWidth: '460px', margin: '0 auto', lineHeight: 1.85 }}>
            One signature piece from every collection — curated by our experts for the discerning few.
          </p>
        </motion.div>

        {/* 3 cards — each from a different category */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {masterpieces.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              whileHover={{ y: -14, boxShadow: '0 40px 80px rgba(0,0,0,0.55), 0 0 50px rgba(201,168,76,0.08)' }}
              onClick={() => document.querySelector(item.scroll)?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: i === 1
                  ? 'linear-gradient(145deg,rgba(201,168,76,0.07),rgba(201,168,76,0.02))'
                  : 'rgba(255,255,255,0.025)',
                border: `1px solid ${i === 1 ? 'rgba(201,168,76,0.28)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.3s',
              }}
            >
              {/* Image area */}
              <div style={{ height: '300px', position: 'relative', background: 'radial-gradient(ellipse at 50% 40%,rgba(201,168,76,0.06) 0%,#111 70%)', overflow: 'hidden' }}>
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5 }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </motion.div>

                {/* Gradient fade */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to top,rgba(10,10,10,0.9),transparent)' }} />

                {/* Tag */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', fontFamily: 'Inter, sans-serif', fontSize: '0.52rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 12px', background: 'rgba(10,10,10,0.75)', backdropFilter: 'blur(10px)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '9999px' }}>
                  {item.tag}
                </div>

                {/* Category chip bottom */}
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)' }}>
                  {item.category}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: '1.4rem', color: 'rgba(245,240,232,0.95)', marginBottom: '0.5rem' }}>
                  {item.name}
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.72rem', color: 'rgba(245,240,232,0.32)', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                  {item.desc}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: '1.4rem', background: 'linear-gradient(135deg,#C9A84C,#E8C97A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {item.price}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(201,168,76,0.3)' }}
                    whileTap={{ scale: 0.96 }}
                    style={{ background: 'linear-gradient(135deg,#A07830,#C9A84C,#E8C97A)', color: '#0A0A0A', border: 'none', borderRadius: '9999px', padding: '0.55rem 1.4rem', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Shop Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
