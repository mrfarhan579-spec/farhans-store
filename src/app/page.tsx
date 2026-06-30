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

const CloudIntro        = dynamic(() => import('@/components/CloudIntro'),        { ssr: false });
const FloatingParticles = dynamic(() => import('@/components/FloatingParticles'), { ssr: false });
const LenisSmoothScroll = dynamic(() => import('@/components/LenisSmoothScroll'), { ssr: false });

export default function Home() {
  const [cloudDone, setCloudDone] = useState(false);
  const [loadDone,  setLoadDone]  = useState(false);

  return (
    <>
      {/* Step 1 — Cloud intro */}
      <AnimatePresence>
        {!cloudDone && <CloudIntro onComplete={() => setCloudDone(true)} />}
      </AnimatePresence>

      {/* Step 2 — Counter loader */}
      <AnimatePresence>
        {cloudDone && !loadDone && <LoadingScreen onComplete={() => setLoadDone(true)} />}
      </AnimatePresence>

      {/* Step 3 — Main site */}
      <AnimatePresence>
        {loadDone && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}
          >
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
