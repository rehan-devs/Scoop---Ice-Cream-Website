'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/layout/Preloader';
import PageTransition from '@/components/layout/PageTransition';
import GrainOverlay from '@/components/ui/GrainOverlay';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Hero from '@/components/sections/Hero';
import FeaturedFlavors from '@/components/sections/FeaturedFlavors';
import MarqueeText from '@/components/ui/MarqueeText';
import StoryTeaser from '@/components/sections/StoryTeaser';
import Specialties from '@/components/sections/Specialties';
import Testimonials from '@/components/sections/Testimonials';
import MenuPreview from '@/components/sections/MenuPreview';

const Navigation = dynamic(() => import('@/components/layout/Navigation'), {
  ssr: false,
});

export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <SmoothScroll>
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      <GrainOverlay />
      <ScrollProgress />
      <Header
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />
      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <PageTransition>
        <main id="main-content">
          <Hero preloaderDone={preloaderDone} />
          <FeaturedFlavors />
          <MarqueeText text="VANILLA · CHOCOLATE · STRAWBERRY · MINT · PISTACHIO · MANGO · CARAMEL · MATCHA ·" />
          <MarqueeText
            text="VANILLA · CHOCOLATE · STRAWBERRY · MINT · PISTACHIO · MANGO · CARAMEL · MATCHA ·"
            reverse
            dark
          />
          <StoryTeaser />
          <MenuPreview />
          <Specialties />
          <Testimonials />
        </main>
      </PageTransition>

      <Footer />
    </SmoothScroll>
  );
}