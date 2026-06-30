'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const watches = [
  { name: 'Rolex Daytona', subtitle: 'Gold Chronograph', price: 'Rs 10,000', tag: 'Bestseller', image: '/images/watch-rolex.jpg', desc: 'Swiss Automatic · 18K Gold · Sapphire Crystal · Oyster Bracelet' },
  { name: 'Poedagar Elite', subtitle: 'Silver Phantom', price: 'Rs 10,000', tag: 'New Arrival', image: '/images/watch-poedagar.jpg', desc: 'Steel Case · Blue Sapphire Crystal · Roman Numerals · Date Window' },
  { name: 'Curren Sport', subtitle: 'Blue Steel', price: 'Rs 10,000', tag: 'Limited', image: '/images/watch-curren.jpg', desc: 'Blue Alloy Case · Leather Strap · Rose Gold Numerals · Day-Date' },
  { name: 'TimeCheck Emerald', subtitle: 'Green Dial', price: 'Rs 10,000', tag: 'Exclusive', image: '/images/watch-timecheck.jpg', desc: 'Emerald Green Dial · Steel Bracelet · Luminous Hands · 50m WR' },
  { name: 'Poedagar Classic', subtitle: 'Midnight Black', price: 'Rs 10,000', tag: 'Popular', image: '/images/watch-silver.jpg', desc: 'Stainless Steel · Black Dial · Date Function · 30m Water Resist.' },
];

function WatchCard({ watch, index }: { watch: typeof watches[0]; index: number }) {
  const isCenter = index === 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      whileHover={{ y: -16, scale: 1.02, boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 50px rgba(201,168,76,0.1)' }}
      style={{
        background: isCenter
          ? 'linear-gradient(145deg,rgba(201,168,76,0.07),rgba(255,255,255,0.03))'
          : 'rgba(255,255,255,0.02)',
        border: isCenter
          ? '1px solid rgba(201,168,76,0.25)'
          : '1px solid rgba(255,255,255,0.06)',
        borderRadius: '20px', overflow: 'hidden', cursor: 'pointer',
        flexShrink: 0, width: '280px',
        transition: 'border-color 0.3s',
      }}
    >
      {/* Image */}
      <div style={{ height: '240px', position: 'relative', background: 'radial-gradient(ellipse at 50% 40%,rgba(201,168,76,0.06) 0%,transparent 70%)', overflow: 'hidden' }}>
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Image src={watch.image} alt={watch.name} fill style={{ objectFit: 'contain', padding: '1.5rem' }} sizes="280px" />
        </motion.div>

        {/* Badge */}
        <div style={{ position: 'absolute', top: '0.9rem', left: '0.9rem', fontFamily: 'Inter, sans-serif', fontSize: '0.52rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '3px 10px', background: 'rgba(201,168,76,0.1)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '9999px' }}>
          {watch.tag}
        </div>

        {/* Center spotlight */}
        {isCenter && (
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%,rgba(201,168,76,0.08) 0%,transparent 60%)', pointerEvents: 'none' }}
          />
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '1.4rem' }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', letterSpacing: '0.25em', color: 'rgba(201,168,76,0.5)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
          {watch.subtitle}
        </div>
        <h3 style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: '1.3rem', color: 'rgba(245,240,232,0.95)', marginBottom: '0.5rem' }}>
          {watch.name}
        </h3>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: 'rgba(245,240,232,0.3)', lineHeight: 1.7, marginBottom: '1.1rem', fontWeight: 300 }}>
          {watch.desc}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: '1.2rem', background: 'linear-gradient(135deg,#C9A84C,#E8C97A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {watch.price}
          </span>
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: '0 0 0 1.5px #C9A84C' }}
            whileTap={{ scale: 0.95 }}
            style={{ background: 'rgba(245,240,232,0.9)', color: '#0A0A0A', border: 'none', borderRadius: '9999px', padding: '0.45rem 1.1rem', fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function WatchShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section ref={sectionRef} style={{ padding: '7rem 0', position: 'relative', overflow: 'hidden', zIndex: 1 }}>

      {/* Parallax glow bg */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse,rgba(201,168,76,0.05) 0%,transparent 70%)', filter: 'blur(80px)' }} />
      </motion.div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '40px', background: 'rgba(201,168,76,0.35)' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)' }}>Swiss Excellence</span>
            <div style={{ height: '1px', width: '40px', background: 'rgba(201,168,76,0.35)' }} />
          </div>
          <h2 style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 'clamp(2.5rem,6vw,4.5rem)', color: 'rgba(245,240,232,0.95)', lineHeight: 1, marginBottom: '1rem' }}>
            ⌚ Watch Collection
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.9rem', color: 'rgba(245,240,232,0.3)', maxWidth: '400px', margin: '0 auto' }}>
            Every second matters — wear it with precision.
          </p>
        </motion.div>

        {/* Horizontal scroll row */}
        <div style={{ display: 'flex', gap: '1.25rem', overflowX: 'auto', paddingBottom: '1.5rem', scrollbarWidth: 'none', msOverflowStyle: 'none', cursor: 'grab' }}>
          {watches.map((w, i) => (
            <WatchCard key={w.name} watch={w} index={i} />
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}
        >
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.2)', textTransform: 'uppercase' }}>Scroll to explore →</span>
        </motion.div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 0 1.5px #C9A84C, 0 10px 30px rgba(201,168,76,0.2)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#watches')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(245,240,232,0.6)', borderRadius: '9999px', padding: '0.75rem 2rem', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 400, cursor: 'pointer' }}
          >
            View All Timepieces →
          </motion.button>
        </motion.div>
      </div>

      <style>{`::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}
