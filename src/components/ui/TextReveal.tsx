'use client';

import { useRef, useEffect, createElement, ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/utils';

interface TextRevealProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: boolean;
  duration?: number;
}

export default function TextReveal({
  children,
  as = 'h2',
  className = '',
  delay = 0,
  stagger = 0.12,
  trigger = true,
  duration = 1,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;
    if (prefersReducedMotion()) {
      const lines = containerRef.current.querySelectorAll('.line-inner');
      lines.forEach((line) => {
        (line as HTMLElement).style.transform = 'translateY(0%)';
      });
      return;
    }

    const lines = containerRef.current.querySelectorAll('.line-inner');

    const ctx = gsap.context(() => {
      if (trigger) {
        gsap.fromTo(
          lines,
          { y: '100%' },
          {
            y: '0%',
            duration,
            stagger,
            delay,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            onComplete: () => {
              hasAnimated.current = true;
            },
          }
        );
      } else {
        gsap.fromTo(
          lines,
          { y: '100%' },
          {
            y: '0%',
            duration,
            stagger,
            delay,
            ease: 'power4.out',
            onComplete: () => {
              hasAnimated.current = true;
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [delay, stagger, trigger, duration]);

  const text = typeof children === 'string' ? children : '';
  const lines = text.split('\n').filter(Boolean);

  if (lines.length === 0 && typeof children !== 'string') {
    return createElement(
      as,
      { ref: containerRef, className },
      <span className="block overflow-hidden pb-[0.15em]">
        <span className="line-inner block">{children}</span>
      </span>
    );
  }

  return createElement(
    as,
    { ref: containerRef, className },
    lines.map((line, i) => (
      <span key={i} className="block overflow-hidden pb-[0.15em]">
        <span className="line-inner block">{line}</span>
      </span>
    ))
  );
}