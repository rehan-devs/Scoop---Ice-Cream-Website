'use client';

import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from '@/lib/gsap';
import MagneticButton from '@/components/ui/MagneticButton';
import LinkHover from '@/components/ui/LinkHover';
import { prefersReducedMotion } from '@/lib/utils';

const IceCreamScene = dynamic(() => import('@/components/three/IceCreamScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-6xl animate-pulse">🍦</span>
    </div>
  ),
});

interface HeroProps {
  preloaderDone: boolean;
}

export default function Hero({ preloaderDone }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preloaderDone) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current].filter(Boolean);

      gsap.fromTo(
        lines,
        { y: '110%' },
        {
          y: '0%',
          duration: 1.2,
          stagger: 0.12,
          ease: 'power4.out',
          delay: 0.2,
        }
      );

      gsap.fromTo(
        taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out', delay: 0.8 }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power4.out', delay: 1.0 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [preloaderDone]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-6rem)] flex items-center overflow-hidden pt-32 md:pt-36 lg:pt-28 pb-16 md:pb-20"
      style={{
        background: 'linear-gradient(135deg, #FFF8F0 0%, #FFF0E6 50%, #FFF8F0 100%)',
      }}
    >
      <div className="max-w-content mx-auto px-page w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        {/* Left Content */}
        <div className="z-10">
          <h1 className="font-display text-[clamp(2.2rem,5vw,5.5rem)] font-bold leading-[1.08] tracking-[-0.02em] text-chocolate mb-4 md:mb-5">
            <span className="block overflow-hidden">
              <span ref={line1Ref} className="block" style={{ transform: 'translateY(110%)' }}>
                Handcrafted
              </span>
            </span>
            <span className="block overflow-hidden">
              <span ref={line2Ref} className="block" style={{ transform: 'translateY(110%)' }}>
                Ice Cream
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                ref={line3Ref}
                className="block text-accent-pink"
                style={{ transform: 'translateY(110%)' }}
              >
                Made With Love
              </span>
            </span>
          </h1>

          <p
            ref={taglineRef}
            className="font-body text-[clamp(0.85rem,1vw,1.05rem)] text-chocolate-light leading-relaxed max-w-[420px] mb-6 opacity-0"
          >
            Small-batch artisan ice cream crafted from locally sourced ingredients.
            Every scoop tells a story.
          </p>

          <div ref={ctaRef} className="opacity-0">
            <MagneticButton>
              <LinkHover
                href="/menu"
                className="inline-flex items-center justify-center px-6 py-3 bg-chocolate text-cream font-body text-xs uppercase tracking-[0.1em] rounded-full hover:bg-chocolate-rich transition-colors duration-300"
              >
                Explore Our Flavors
              </LinkHover>
            </MagneticButton>
          </div>
        </div>

        {/* Right: 3D Ice Cream */}
        <div className="relative h-[300px] md:h-[380px] lg:h-[460px] mt-4 lg:mt-0">
          <div className="w-full h-full three-canvas-container hidden md:block">
            <IceCreamScene />
          </div>
          <div className="w-full h-full flex items-center justify-center md:hidden">
            <span className="text-[8rem] leading-none select-none">🍦</span>
          </div>
        </div>
      </div>
    </section>
  );
}