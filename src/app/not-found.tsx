'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import MagneticButton from '@/components/ui/MagneticButton';

export default function NotFound() {
  const numbersRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!numbersRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        numbersRef.current,
        {
          clipPath: 'inset(0 0 0% 0)',
        },
        {
          clipPath: 'inset(0 0 30% 0)',
          duration: 3,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-page text-center">
      <h1
        ref={numbersRef}
        className="font-display text-[clamp(8rem,20vw,20rem)] font-bold text-chocolate leading-none mb-4"
        style={{ clipPath: 'inset(0 0 0% 0)' }}
      >
        404
      </h1>

      <div className="text-6xl mb-8">🍦💧</div>

      <p className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-chocolate mb-4">
        This flavor doesn&apos;t exist... yet.
      </p>

      <p className="font-body text-chocolate-light mb-10 max-w-[400px]">
        Looks like this page melted away. Let&apos;s get you back to somewhere delicious.
      </p>

      <MagneticButton>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-chocolate text-cream font-body text-sm uppercase tracking-[0.1em] rounded-full hover:bg-chocolate-rich transition-colors duration-300"
        >
          Back to the Parlor →
        </Link>
      </MagneticButton>
    </div>
  );
}