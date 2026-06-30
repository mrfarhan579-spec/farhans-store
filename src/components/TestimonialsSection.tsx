'use client';
import { motion } from 'framer-motion';

const testimonials = [
  { name: 'Ahmed Hassan', role: 'Business Executive', location: 'Lahore, Pakistan', text: "The Rolex I ordered arrived perfectly packaged. Absolutely stunning craftsmanship — worth every rupee. Farhan's Store is now my go-to for luxury.", rating: 5, initials: 'AH' },
  { name: 'Bilal Raza', role: 'Fashion Enthusiast', location: 'Karachi, Pakistan', text: "Ordered the Janan Gold Edition and I'm blown away. The fragrance lasts all day and gets compliments everywhere. Premium experience from start to finish.", rating: 5, initials: 'BR' },
  { name: 'Usman Malik', role: 'Entrepreneur', location: 'Islamabad, Pakistan', text: "My bespoke shirt arrived perfectly fitted. The quality rivals international luxury brands at a fraction of the price. Exceptional service.", rating: 5, initials: 'UM' },
  { name: 'Farooq Siddiqui', role: 'Corporate Manager', location: 'Rawalpindi, Pakistan', text: "The TimeCheck watch exceeded all expectations. The green dial is stunning. Fast delivery and beautifully presented. Highly recommend!", rating: 5, initials: 'FS' },
];

export default function TestimonialsSection() {
  return (
    <section style={{ padding: '8rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <span style={{ fontFamily: 'Jost', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase', fontSize: '0.68rem', color: '#C9A84C', display: 'block', marginBottom: '1rem' }}>
            Client Stories
          </span>
          <h2 style={{ fontFamily: 'Cormorant, serif', fontWeight: 600, fontSize: 'clamp(2.2rem,5vw,3.5rem)', color: 'rgba(245,240,232,0.95)', marginBottom: '1rem', lineHeight: 1.1 }}>
            What Our Clients <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Say</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ height: '1px', maxWidth: '100px', margin: '0 auto', background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', opacity: 0.4 }}
          />
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: '1.5rem' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.5),0 0 30px rgba(201,168,76,0.06)' }}
              onHoverStart={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.25)'; }}
              onHoverEnd={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.1)'; }}
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '16px', padding: '2rem', cursor: 'default', transition: 'border-color 0.3s ease' }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '1.2rem' }}>
                {Array(t.rating).fill(0).map((_, s) => (
                  <motion.span key={s}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + s * 0.07, type: 'spring', stiffness: 300 }}
                    style={{ color: '#C9A84C', fontSize: '0.85rem' }}
                  >★</motion.span>
                ))}
              </div>

              {/* Quote */}
              <p style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: '0.87rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.85, marginBottom: '1.8rem', fontStyle: 'italic' }}>
                &ldquo;{t.text}&rdquo;
              </p>

              <div style={{ height: '1px', background: 'rgba(201,168,76,0.08)', marginBottom: '1.3rem' }} />

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                <motion.div whileHover={{ scale: 1.1 }}
                  style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg,#A07830,#E8C97A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cormorant, serif', fontWeight: 700, fontSize: '0.9rem', color: '#0A0A0A', flexShrink: 0 }}>
                  {t.initials}
                </motion.div>
                <div>
                  <div style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.82rem', color: 'rgba(245,240,232,0.85)' }}>{t.name}</div>
                  <div style={{ fontFamily: 'Jost', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'rgba(201,168,76,0.5)', marginTop: '0.15rem' }}>{t.role} · {t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '3.5rem', marginTop: '4rem', flexWrap: 'wrap' }}
        >
          {[{ icon: '🔒', label: 'Secure Payments' }, { icon: '🚚', label: 'Fast Delivery' }, { icon: '✅', label: '100% Authentic' }, { icon: '↩️', label: '30-Day Returns' }].map((item, i) => (
            <motion.div key={item.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'default' }}
            >
              <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
              <span style={{ fontFamily: 'Jost', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.35)', textTransform: 'uppercase' }}>{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
