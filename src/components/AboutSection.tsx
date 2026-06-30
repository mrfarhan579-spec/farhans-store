'use client';
import { motion } from 'framer-motion';

export default function AboutSection() {
  const values = [
    { icon: '⌚', title: 'Swiss Precision', desc: 'Every watch curated from certified Swiss manufacturers' },
    { icon: '🧵', title: 'Bespoke Craftsmanship', desc: "Hand-tailored suits by master craftsmen" },
    { icon: '🌸', title: 'Rare Fragrances', desc: "Sourced from the world's finest perfume houses" },
  ];

  return (
    <section id="about" style={{ padding: '8rem 2rem', position: 'relative', overflow: 'hidden', zIndex: 1 }}>

      {/* Animated bg glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', right: '-200px', top: '50%', transform: 'translateY(-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(60px)' }}
      />

      {/* Decorative rings */}
      <div style={{ position: 'absolute', right: '-200px', top: '50%', transform: 'translateY(-50%)', width: '600px', height: '600px', border: '1px solid rgba(201,168,76,0.05)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: '-100px', top: '50%', transform: 'translateY(-50%)', width: '400px', height: '400px', border: '1px solid rgba(201,168,76,0.07)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>

        {/* Left visual */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1 }}
          style={{ position: 'relative' }}
        >
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(201,168,76,0.08)' }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', aspectRatio: '3/4', maxWidth: '400px', background: 'linear-gradient(135deg,#111 0%,#1C1A15 50%,#111 100%)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 40% 30%,rgba(201,168,76,0.08) 0%,transparent 60%)' }} />

            {/* Animated shimmer line */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
              style={{ position: 'absolute', top: 0, left: 0, width: '60%', height: '100%', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.04),transparent)', pointerEvents: 'none' }}
            />

            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ fontFamily: 'Cormorant, serif', fontSize: '5rem', fontWeight: 300, letterSpacing: '0.1em', background: 'linear-gradient(135deg,#C9A84C,#E8C97A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '1rem' }}
              >
                F
              </motion.div>
              <p style={{ fontFamily: 'Jost', fontSize: '0.6rem', letterSpacing: '0.4em', color: 'rgba(201,168,76,0.4)', textTransform: 'uppercase' }}>Est. 2024</p>
            </div>

            {/* Corner decorations */}
            {[{ top: '16px', left: '16px' }, { top: '16px', right: '16px' }, { bottom: '16px', left: '16px' }, { bottom: '16px', right: '16px' }].map((pos, i) => (
              <div key={i} style={{ position: 'absolute', ...pos, width: '24px', height: '24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '2px' }} />
            ))}
          </motion.div>

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6, type: 'spring', stiffness: 120 }}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
            style={{ position: 'absolute', bottom: '2rem', right: '-2rem', background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '12px', padding: '1.2rem 1.5rem', minWidth: '150px' }}
          >
            <div style={{ fontFamily: 'Cormorant, serif', fontSize: '2rem', fontWeight: 600, background: 'linear-gradient(135deg,#C9A84C,#E8C97A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, marginBottom: '0.3rem' }}>98%</div>
            <div style={{ fontFamily: 'Jost', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.4)', textTransform: 'uppercase' }}>Client Satisfaction</div>
          </motion.div>
        </motion.div>

        {/* Right content */}
        <div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span style={{ fontFamily: 'Jost', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase', fontSize: '0.68rem', color: '#C9A84C', display: 'block', marginBottom: '1rem' }}>Our Heritage</span>
            <h2 style={{ fontFamily: 'Cormorant, serif', fontWeight: 600, fontSize: 'clamp(2.2rem,5vw,3.5rem)', color: 'rgba(245,240,232,0.95)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Crafting Luxury<br />
              <span style={{ background: 'linear-gradient(135deg,#C9A84C 0%,#E8C97A 40%,#C9A84C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Since 2024</span>
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }}>
            <p style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: '0.95rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.9, marginBottom: '1.5rem' }}>
              Farhan&apos;s Store was born from a singular vision: to make the world&apos;s finest craftsmanship accessible to those who appreciate true excellence. Every piece in our collection is hand-selected by our team of experts.
            </p>
            <p style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: '0.95rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.9, marginBottom: '2.5rem' }}>
              From the workshops of Swiss master watchmakers to the ateliers of London&apos;s finest tailors and the perfume houses of Grasse, we bring you nothing short of perfection.
            </p>
          </motion.div>

          {/* Values */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.7 }}
                whileHover={{ scale: 1.02, borderColor: 'rgba(201,168,76,0.25)', backgroundColor: 'rgba(201,168,76,0.03)' }}
                style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', border: '1px solid rgba(201,168,76,0.07)', borderRadius: '10px', background: 'rgba(255,255,255,0.01)', cursor: 'default', transition: 'border-color 0.3s,background 0.3s' }}
              >
                <span style={{ fontSize: '1.5rem' }}>{v.icon}</span>
                <div>
                  <div style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.85rem', color: 'rgba(245,240,232,0.8)', marginBottom: '0.3rem' }}>{v.title}</div>
                  <div style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: '0.8rem', color: 'rgba(245,240,232,0.4)', lineHeight: 1.6 }}>{v.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.7 }}>
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: 'rgba(201,168,76,0.1)', borderColor: '#C9A84C', boxShadow: '0 0 20px rgba(201,168,76,0.15)' }}
              whileTap={{ scale: 0.97 }}
              style={{ background: 'transparent', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.4)', fontFamily: 'Montserrat', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.9rem 2rem', fontSize: '0.72rem', borderRadius: '4px', cursor: 'pointer' }}
            >
              Read Our Full Story
            </motion.button>
          </motion.div>
        </div>
      </div>

      <style>{`@media(max-width:768px){#about>div>div:first-child{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
