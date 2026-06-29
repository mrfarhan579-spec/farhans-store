'use client';
import { useState } from 'react';
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

// Dynamically import client-only canvas/3D components (no SSR)
const CloudIntro       = dynamic(() => import('@/components/CloudIntro'),       { ssr: false });
const ParticleCursor   = dynamic(() => import('@/components/ParticleCursor'),   { ssr: false });
const FloatingParticles= dynamic(() => import('@/components/FloatingParticles'),{ ssr: false });
const LenisSmoothScroll= dynamic(() => import('@/components/LenisSmoothScroll'),{ ssr: false });

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {/* ── Cinematic 3D cloud intro ── */}
      {!introComplete && (
        <CloudIntro onComplete={() => setIntroComplete(true)} />
      )}

      {/* ── Main site — fades in seamlessly after intro ── */}
      <div style={{
        opacity: introComplete ? 1 : 0,
        transition: 'opacity 1.2s ease',
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
      }}>
        {introComplete && (
          <>
            {/* Particle cursor (replaces default cursor) */}
            <ParticleCursor />

            {/* Ambient gold dust particles across full page */}
            <FloatingParticles />

            {/* Lenis buttery smooth scroll */}
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
          </>
        )}
      </div>
    </>
  );
}
