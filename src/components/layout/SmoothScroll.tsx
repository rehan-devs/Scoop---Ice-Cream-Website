'use client';

import { ReactNode, useEffect } from 'react';
import { useLenisInstance } from '@/hooks/useLenis';
import { ScrollTrigger } from '@/lib/gsap';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenis = useLenisInstance();

  useEffect(() => {
    if (!lenis.current) return;

    lenis.current.on('scroll', ScrollTrigger.update);

    const ctx = { data: { current: 0 } };

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && lenis.current) {
          lenis.current.scrollTo(value as number, { immediate: true });
        }
        return lenis.current?.scroll || 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.defaults({ scroller: document.documentElement });
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.killAll();
    };
  }, [lenis]);

  return <>{children}</>;
}