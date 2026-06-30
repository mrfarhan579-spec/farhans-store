'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductSections from '@/components/ProductSections';
import FeaturedSection from '@/components/FeaturedSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

const ParticleCursor    = dynamic(() => import('@/components/ParticleCursor'),    { ssr: false });
const FloatingParticles = dynamic(() => import('@/components/FloatingParticles'), { ssr: false });
const LenisSmoothScroll = dynamic(() => import('@/components/LenisSmoothScroll'), { ssr: false });

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!introComplete && (
          <LoadingScreen onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {introComplete && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}
          >
            <ParticleCursor />
            <FloatingParticles />
            <LenisSmoothScroll>
              <Navbar />
              <main>
                <HeroSection />
                <ProductSections />
                <FeaturedSection />
                <AboutSection />
                <TestimonialsSection />
                <FAQSection />
                <NewsletterSection />
              </main>
              <Footer />
            </LenisSmoothScroll>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
