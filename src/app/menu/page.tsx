'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import GrainOverlay from '@/components/ui/GrainOverlay';
import ScrollProgress from '@/components/ui/ScrollProgress';
import TextReveal from '@/components/ui/TextReveal';
import PageTransition from '@/components/layout/PageTransition';
import { flavors, categories, getFlavorsByCategory, type Flavor } from '@/data/flavors';
import { formatPrice } from '@/lib/utils';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [filteredFlavors, setFilteredFlavors] = useState<Flavor[]>(flavors);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const seasonalFlavors = flavors.filter((f) => f.seasonal);

  const handleFilterChange = useCallback((category: string) => {
    setActiveCategory(category);
    const newFlavors = getFlavorsByCategory(category);
    setFilteredFlavors(newFlavors);

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.flavor-grid-card');
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: 'power4.out' }
      );
    }
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current!.querySelectorAll('.flavor-grid-card');
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <GrainOverlay />
      <ScrollProgress />
      <Header
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />
      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <PageTransition>
        <main id="main-content" className="pt-32 md:pt-40 pb-section">
          <div className="max-w-content mx-auto px-page">
            {/* Hero */}
            <div className="mb-16 md:mb-24">
              <TextReveal
                as="h1"
                className="font-display text-hero font-bold text-chocolate leading-[1.0] tracking-[-0.02em]"
              >
                {'Our Flavors'}
              </TextReveal>
            </div>

            {/* Seasonal Specials Banner */}
            {seasonalFlavors.length > 0 && (
              <div className="mb-16 p-8 md:p-12 rounded-2xl bg-cream-dark">
                <span className="font-body text-xs uppercase tracking-[0.2em] text-accent-pink mb-4 block">
                  ✨ Seasonal Specials
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {seasonalFlavors.map((flavor) => (
                    <Link
                      key={flavor.slug}
                      href={`/menu/${flavor.slug}`}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={flavor.image}
                          alt={flavor.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-chocolate group-hover:text-accent-pink transition-colors">
                          {flavor.name}
                        </h3>
                        <p className="font-body text-xs text-chocolate-light">
                          Available until {flavor.availableUntil}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Filter Categories */}
            <div className="flex flex-wrap gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={`px-5 py-2.5 rounded-full font-body text-sm transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-chocolate text-cream'
                      : 'bg-cream-dark text-chocolate hover:bg-chocolate/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Flavors Grid */}
            <div
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredFlavors.map((flavor) => (
                <Link
                  key={flavor.slug}
                  href={`/menu/${flavor.slug}`}
                  className="flavor-grid-card group"
                  data-cursor-hover
                >
                  <div
                    className="relative aspect-square rounded-full overflow-hidden mb-5 mx-auto w-full max-w-[260px] transition-all duration-500 group-hover:scale-105"
                    style={{
                      boxShadow: `0 10px 40px ${flavor.accentColor}20`,
                    }}
                  >
                    <Image
                      src={flavor.image}
                      alt={flavor.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-display text-lg font-semibold text-chocolate mb-1 group-hover:text-accent-pink transition-colors duration-300">
                      {flavor.name}
                    </h3>
                    <p className="font-body text-sm text-chocolate-light mb-2 line-clamp-2">
                      {flavor.description}
                    </p>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {flavor.dietary.map((tag) => (
                        <span
                          key={tag}
                          className="font-body text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-cream-dark text-chocolate-light"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="font-body text-lg font-medium text-chocolate">
                      {formatPrice(flavor.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </PageTransition>

      <Footer />
    </SmoothScroll>
  );
}