'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy. Items must be in original condition with tags attached. Simply contact our concierge team to initiate a return.' },
  { q: 'How do I track my order?', a: 'Once your order ships, you will receive a tracking number via email. You can also log into your account to view real-time shipping updates.' },
  { q: 'Do you offer international shipping?', a: 'Yes, we ship worldwide. International orders typically arrive within 7-14 business days. Duties and taxes may apply depending on your country.' },
  { q: 'Are your watches authentic?', a: 'Absolutely. Every timepiece in our collection comes with full authentication certificates, original packaging, and a 2-year warranty against manufacturing defects.' },
  { q: 'Can I get a custom shirt tailored?', a: 'Yes! We offer bespoke tailoring services. Contact our styling team with your measurements and preferences for a fully personalized experience.' },
  { q: 'How do I care for my fragrance?', a: 'Store perfumes away from direct sunlight and heat. Keep bottles in a cool, dry place. Avoid storing in bathrooms where humidity can degrade the fragrance.' },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ padding: '8rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9 }}
          style={{ textAlign: 'center', marginBottom: '4.5rem' }}
        >
          <span style={{ fontFamily: 'Jost', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase', fontSize: '0.68rem', color: '#C9A84C', display: 'block', marginBottom: '1rem' }}>
            Customer Care
          </span>
          <h2 style={{ fontFamily: 'Cormorant, serif', fontWeight: 600, fontSize: 'clamp(2.2rem,5vw,3.5rem)', color: 'rgba(245,240,232,0.95)', lineHeight: 1.1 }}>
            Frequently Asked <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Questions</span>
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              style={{
                border: `1px solid ${openIndex === i ? 'rgba(201,168,76,0.3)' : 'rgba(201,168,76,0.1)'}`,
                borderRadius: '12px',
                overflow: 'hidden',
                background: openIndex === i ? 'rgba(201,168,76,0.03)' : 'rgba(255,255,255,0.01)',
                transition: 'border-color 0.3s ease, background 0.3s ease',
              }}
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                whileHover={{ backgroundColor: 'rgba(201,168,76,0.03)' }}
                style={{ width: '100%', padding: '1.4rem 1.6rem', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', textAlign: 'left' }}
              >
                <span style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: '0.9rem', color: openIndex === i ? '#C9A84C' : 'rgba(245,240,232,0.85)', transition: 'color 0.3s ease' }}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ flexShrink: 0 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </motion.div>
              </motion.button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 1.6rem 1.4rem' }}>
                      <div style={{ height: '1px', background: 'rgba(201,168,76,0.1)', marginBottom: '1rem' }} />
                      <p style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: '0.87rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.85 }}>
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{ textAlign: 'center', marginTop: '3.5rem', padding: '2rem', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '14px', background: 'rgba(201,168,76,0.02)' }}
        >
          <p style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: '0.87rem', color: 'rgba(245,240,232,0.45)', marginBottom: '1rem' }}>
            Still have questions? Our luxury concierge team is here 24/7.
          </p>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 8px 25px rgba(201,168,76,0.3)' }}
            whileTap={{ scale: 0.97 }}
            style={{ background: 'linear-gradient(135deg,#A07830,#C9A84C,#E8C97A)', color: '#0A0A0A', border: 'none', padding: '0.85rem 2rem', fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: '6px', cursor: 'pointer' }}
          >
            Contact Concierge
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
