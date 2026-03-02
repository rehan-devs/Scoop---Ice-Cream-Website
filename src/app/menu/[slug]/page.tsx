'use client';

import { useRef, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GrainOverlay from '@/components/ui/GrainOverlay';
import ScrollProgress from '@/components/ui/ScrollProgress';
import TextReveal from '@/components/ui/TextReveal';
import PageTransition from '@/components/layout/PageTransition';
import { getFlavorBySlug, getRelatedFlavors, flavors } from '@/data/flavors';
import { formatPrice } from '@/lib/utils';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useState } from 'react';
import Navigation from '@/components/layout/Navigation';

export default function FlavorDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const flavor = getFlavorBySlug(slug);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const currentIndex = flavors.findIndex((f) => f.slug === slug);
  const prevFlavor = currentIndex > 0 ? flavors[currentIndex - 1] : flavors[flavors.length - 1];
  const nextFlavor = currentIndex < flavors.length - 1 ? flavors[currentIndex + 1] : flavors[0];

  useEffect(() => {
    if (!profileRef.current) return;

    const ctx = gsap.context(() => {
      const bars = profileRef.current!.querySelectorAll('.profile-bar-fill');
      gsap.fromTo(
        bars,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: profileRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, profileRef);

    return () => ctx.revert();
  }, [slug]);

  if (!flavor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Flavor not found</p>
      </div>
    );
  }

  const relatedFlavors = getRelatedFlavors(slug, flavor.pairsWith);

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
        <main id="main-content">
          {/* Hero */}
          <section
            className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden"
            style={{
              background: `linear-gradient(to bottom, ${flavor.accentColor}20, ${flavor.accentColor}40)`,
            }}
          >
            <div className="absolute inset-0">
              <Image
                src={flavor.heroImage}
                alt={flavor.name}
                fill
                className="object-cover opacity-30"
                priority
                sizes="100vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, var(--bg-primary), transparent 60%)`,
                }}
              />
            </div>

            <div className="relative z-10 max-w-content mx-auto px-page pb-12 md:pb-20 w-full">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 font-body text-sm text-chocolate-light mb-6 hover:text-chocolate transition-colors"
              >
                ← Back to Menu
              </Link>
              <TextReveal
                as="h1"
                className="font-display text-[clamp(3rem,7vw,8rem)] font-bold text-chocolate leading-[1.0] tracking-[-0.02em]"
              >
                {flavor.name}
              </TextReveal>
              <div className="flex items-center gap-4 mt-4">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: flavor.accentColor }}
                />
                <span className="font-body text-2xl font-medium text-chocolate">
                  {formatPrice(flavor.price)}
                </span>
                {flavor.seasonal && (
                  <span className="px-3 py-1 rounded-full bg-accent-pink/20 text-accent-pink font-body text-xs uppercase tracking-wider">
                    Seasonal — Until {flavor.availableUntil}
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="py-section">
            <div className="max-w-content mx-auto px-page">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Left: Description */}
                <div>
                  <h2 className="font-display text-2xl font-semibold text-chocolate mb-6">
                    The Story
                  </h2>
                  <p className="font-body text-[clamp(1rem,1.2vw,1.25rem)] text-chocolate-light leading-relaxed mb-10">
                    {flavor.longDescription}
                  </p>

                  {/* Ingredients */}
                  <h3 className="font-body text-xs uppercase tracking-[0.2em] text-chocolate-light mb-4">
                    Ingredients
                  </h3>
                  <p className="font-body text-chocolate leading-relaxed mb-8">
                    {flavor.ingredients.join(', ')}
                  </p>

                  {/* Allergens */}
                  {flavor.allergens.length > 0 && (
                    <>
                      <h3 className="font-body text-xs uppercase tracking-[0.2em] text-chocolate-light mb-4">
                        Allergens
                      </h3>
                      <div className="flex gap-2 mb-8">
                        {flavor.allergens.map((allergen) => (
                          <span
                            key={allergen}
                            className="px-3 py-1 rounded-full bg-red-50 text-red-600 font-body text-xs"
                          >
                            {allergen}
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Dietary */}
                  <div className="flex gap-2">
                    {flavor.dietary.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-accent-mint/20 text-chocolate font-body text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Flavor Profile */}
                <div>
                  <div ref={profileRef}>
                    <h2 className="font-display text-2xl font-semibold text-chocolate mb-8">
                      Flavor Profile
                    </h2>

                    {[
                      { label: 'Sweetness', value: flavor.sweetness },
                      { label: 'Creaminess', value: flavor.creaminess },
                      { label: 'Richness', value: flavor.richness },
                    ].map((stat) => (
                      <div key={stat.label} className="mb-6">
                        <div className="flex justify-between mb-2">
                          <span className="font-body text-sm text-chocolate-light uppercase tracking-wider">
                            {stat.label}
                          </span>
                          <span className="font-body text-sm font-medium text-chocolate">
                            {stat.value}/5
                          </span>
                        </div>
                        <div className="w-full h-2 bg-cream-dark rounded-full overflow-hidden">
                          <div
                            className="profile-bar-fill h-full rounded-full origin-left"
                            style={{
                              width: `${(stat.value / 5) * 100}%`,
                              backgroundColor: flavor.accentColor,
                              transform: 'scaleX(0)',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pairs Well With */}
                  {relatedFlavors.length > 0 && (
                    <div className="mt-12">
                      <h3 className="font-display text-xl font-semibold text-chocolate mb-6">
                        Pairs Well With
                      </h3>
                      <div className="space-y-3">
                        {relatedFlavors.map((related) => (
                          <Link
                            key={related.slug}
                            href={`/menu/${related.slug}`}
                            className="flex items-center gap-4 group p-3 rounded-xl hover:bg-cream-dark transition-colors duration-300"
                          >
                            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                              <Image
                                src={related.image}
                                alt={related.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-display text-sm font-semibold text-chocolate group-hover:text-accent-pink transition-colors">
                                {related.name}
                              </h4>
                              <p className="font-body text-xs text-chocolate-light">
                                {formatPrice(related.price)}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Prev/Next Navigation */}
              <div className="flex justify-between items-center mt-section pt-12 border-t border-[var(--border)]">
                <Link
                  href={`/menu/${prevFlavor.slug}`}
                  className="group"
                >
                  <span className="font-body text-xs text-chocolate-light uppercase tracking-wider block mb-1">
                    ← Previous
                  </span>
                  <span className="font-display text-lg font-semibold text-chocolate group-hover:text-accent-pink transition-colors">
                    {prevFlavor.name}
                  </span>
                </Link>
                <Link
                  href={`/menu/${nextFlavor.slug}`}
                  className="group text-right"
                >
                  <span className="font-body text-xs text-chocolate-light uppercase tracking-wider block mb-1">
                    Next →
                  </span>
                  <span className="font-display text-lg font-semibold text-chocolate group-hover:text-accent-pink transition-colors">
                    {nextFlavor.name}
                  </span>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </PageTransition>

      <Footer />
    </SmoothScroll>
  );
}