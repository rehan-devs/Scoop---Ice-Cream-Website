'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Only register on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // Fix for production builds
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

gsap.defaults({
  ease: 'power4.out',
  duration: 1,
});

export { gsap, ScrollTrigger };