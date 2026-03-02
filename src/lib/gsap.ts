import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

gsap.defaults({
  ease: 'power4.out',
  duration: 1,
});

export { gsap, ScrollTrigger };