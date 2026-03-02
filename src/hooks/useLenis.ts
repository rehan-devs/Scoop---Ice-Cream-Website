'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function useLenisInstance() {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.current = instance;
    lenisInstance = instance;

    function raf(time: number) {
      instance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      instance.destroy();
      lenisInstance = null;
    };
  }, []);

  return lenis;
}

export function useLenisScroll(callback: (e: { scroll: number; velocity: number; direction: number }) => void) {
  useEffect(() => {
    const instance = getLenis();
    if (!instance) return;

    instance.on('scroll', callback);

    return () => {
      instance.off('scroll', callback);
    };
  }, [callback]);
}