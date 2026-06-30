'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section style={{ padding: '8rem 2rem', position: 'relative', overflow: 'hidden', zIndex: 1 }}>

      {/* Animated background glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.09, 0.04] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%,rgba(201,168,76,0.08) 0%,transparent 65%)', pointerEvents: 'none' }}
      />

      {/* Floating decorative rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', border: '1px solid rgba(201,168,76,0.04)', borderRadius: '50%', pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '400px', height: '400px', border: '1px solid rgba(201,168,76,0.06)', borderRadius: '50%', pointerEvents: 'none' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9 }}
        style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(201,168,76,0.2)' }}
          style={{ width: '60px', height: '60px', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', background: 'rgba(201,168,76,0.05)', cursor: 'default' }}
        >
          <svg width="22" height="22" fill="none" stroke="rgba(201,168,76,0.7)" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ fontFamily: 'Jost', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase', fontSize: '0.68rem', color: '#C9A84C', display: 'block', marginBottom: '1rem' }}
        >
          Join The Circle
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ fontFamily: 'Cormorant, serif', fontWeight: 600, fontSize: 'clamp(2rem,5vw,3.5rem)', color: 'rgba(245,240,232,0.95)', marginBottom: '1.2rem', lineHeight: 1.1 }}
        >
          Unlock{' '}
          <span style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C97A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Exclusive</span>
          {' '}Access
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: '0.95rem', color: 'rgba(245,240,232,0.45)', marginBottom: '3rem', lineHeight: 1.9 }}
        >
          Subscribe to receive first access to new collections, members-only offers,
          and invitations to exclusive events — curated for connoisseurs.
        </motion.p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 150 }}
              style={{ padding: '2rem', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '12px' }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ fontSize: '2rem', marginBottom: '1rem' }}
              >✨</motion.div>
              <p style={{ fontFamily: 'Cormorant, serif', fontSize: '1.4rem', fontWeight: 600, color: 'rgba(245,240,232,0.9)', marginBottom: '0.5rem' }}>Welcome to the Circle</p>
              <p style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: '0.85rem', color: 'rgba(245,240,232,0.45)' }}>You&apos;ll receive your first exclusive offer shortly.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
            >
              <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '480px', margin: '0 auto', flexWrap: 'wrap' }}>
                <motion.input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address" required
                  whileFocus={{ borderColor: '#C9A84C', boxShadow: '0 0 20px rgba(201,168,76,0.1)' }}
                  style={{ flex: 1, minWidth: '200px', padding: '1rem 1.5rem', borderRadius: '6px', fontSize: '0.85rem', letterSpacing: '0.05em', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--text-primary)', fontFamily: 'Montserrat', outline: 'none' }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(201,168,76,0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{ background: 'linear-gradient(135deg,#A07830,#C9A84C,#E8C97A)', color: '#0A0A0A', border: 'none', padding: '1rem 1.8rem', fontSize: '0.72rem', fontFamily: 'Montserrat', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: '6px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  Join Now
                </motion.button>
              </div>
              <p style={{ fontFamily: 'Jost', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(245,240,232,0.25)', marginTop: '1rem' }}>
                No spam, ever. Unsubscribe anytime. Privacy guaranteed.
              </p>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Perks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', marginTop: '3rem', flexWrap: 'wrap' }}
        >
          {['Early Access', 'Members Pricing', 'Exclusive Events'].map((perk, i) => (
            <motion.div key={perk} whileHover={{ y: -3 }}
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'default' }}
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
                style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#C9A84C' }}
              />
              <span style={{ fontFamily: 'Jost', fontSize: '0.68rem', letterSpacing: '0.1em', color: 'rgba(245,240,232,0.35)', textTransform: 'uppercase' }}>{perk}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
