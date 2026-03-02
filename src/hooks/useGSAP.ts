'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function useGSAP(
  callback: (ctx: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      callback(ctx as unknown as gsap.Context);
    }, containerRef);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}

export function useScrollTriggerRefresh(deps: React.DependencyList = []) {
  useEffect(() => {
    ScrollTrigger.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger };