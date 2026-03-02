'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/utils';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        overlayRef.current,
        { y: '100%' },
        { y: '0%', duration: 0.6, ease: 'power4.inOut' }
      )
        .set(contentRef.current, { opacity: 0 })
        .to(overlayRef.current, {
          y: '-100%',
          duration: 0.6,
          ease: 'power4.inOut',
        })
        .fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power4.out' },
          '-=0.3'
        );
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <>
      <div
        ref={overlayRef}
        className="page-transition-overlay bg-cream"
        style={{
          transform: 'translateY(100%)',
          borderRadius: '24px 24px 0 0',
        }}
        aria-hidden="true"
      />
      <div ref={contentRef}>{children}</div>
    </>
  );
}