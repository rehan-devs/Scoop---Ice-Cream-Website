'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import GrainOverlay from '@/components/ui/GrainOverlay';
import ScrollProgress from '@/components/ui/ScrollProgress';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import PageTransition from '@/components/layout/PageTransition';
import { locations } from '@/data/locations';

export default function LocationsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !cardsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.querySelectorAll('.location-card').forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 200}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isMounted]);

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
        <main id="main-content" className="pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="max-w-content mx-auto px-page">
            {/* Hero */}
            <div className="mb-16 md:mb-24">
              <TextReveal
                as="h1"
                className="font-display text-[clamp(2.2rem,5vw,5.5rem)] font-bold text-chocolate leading-[1.15] tracking-[-0.02em]"
              >
                {'Find Us'}
              </TextReveal>
              <p className="font-body text-[clamp(1rem,1.2vw,1.25rem)] text-chocolate-light leading-relaxed max-w-[500px] mt-6">
                Three cozy locations across Portland, each with its own personality
                but the same commitment to extraordinary ice cream.
              </p>
            </div>

            {/* Location Cards */}
            <div ref={cardsRef} className="space-y-12 mb-16 md:mb-24">
              {locations.map((location, index) => (
                <div
                  key={location.name}
                  className="location-card grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 md:p-10 rounded-2xl bg-cream-dark transition-all duration-700 ease-out"
                  style={{
                    opacity: 0,
                    transform: 'translateY(40px)',
                  }}
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                    <Image
                      src={location.image}
                      alt={`${location.name} storefront`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Info */}
                  <div>
                    <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold text-chocolate mb-6">
                      {location.name}
                    </h2>

                    <div className="space-y-4 font-body text-chocolate-light">
                      <div>
                        <span className="font-body text-xs uppercase tracking-[0.2em] text-chocolate-light/60 block mb-1">
                          Address
                        </span>
                        <p>{location.address}</p>
                        <p>{location.city}</p>
                      </div>

                      <div>
                        <span className="font-body text-xs uppercase tracking-[0.2em] text-chocolate-light/60 block mb-1">
                          Phone
                        </span>
                        <a
                          href={`tel:${location.phone}`}
                          className="hover:text-accent-pink transition-colors"
                        >
                          {location.phone}
                        </a>
                      </div>

                      <div>
                        <span className="font-body text-xs uppercase tracking-[0.2em] text-chocolate-light/60 block mb-1">
                          Hours
                        </span>
                        <p>{location.hours.weekday}</p>
                        <p>{location.hours.weekend}</p>
                      </div>

                      <MagneticButton>
                        <a
                          href={location.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-chocolate text-cream font-body text-sm uppercase tracking-[0.1em] rounded-full hover:bg-chocolate-rich transition-colors duration-300"
                        >
                          Get Directions →
                        </a>
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Catering CTA */}
            <div className="text-center py-16 md:py-20 bg-cream-dark rounded-2xl px-6 md:px-12">
              <span className="text-5xl mb-6 block">🎉</span>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-chocolate mb-4">
                We Also Cater!
              </h2>
              <p className="font-body text-chocolate-light leading-relaxed max-w-[500px] mx-auto mb-8">
                Bringing the SCOÖP experience to your event. Weddings, corporate events,
                birthday parties — we bring the scoop bar to you.
              </p>
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-chocolate text-cream font-body text-sm uppercase tracking-[0.1em] rounded-full hover:bg-chocolate-rich transition-colors duration-300"
                >
                  Inquire About Catering
                </Link>
              </MagneticButton>
            </div>
          </div>
        </main>
      </PageTransition>

      <Footer />
    </SmoothScroll>
  );
}