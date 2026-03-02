'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/utils';

interface ImageRevealProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  variant?: 'rectangle' | 'circle';
  priority?: boolean;
  sizes?: string;
}

export default function ImageReveal({
  src,
  alt,
  width,
  height,
  className = '',
  variant = 'rectangle',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return;

    const container = containerRef.current;
    const img = container.querySelector('img');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      if (variant === 'circle') {
        tl.fromTo(
          container,
          { clipPath: 'circle(0% at 50% 50%)' },
          { clipPath: 'circle(50% at 50% 50%)', duration: 1.2, ease: 'power4.inOut' }
        );
      } else {
        tl.fromTo(
          container,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' }
        );
      }

      if (img) {
        tl.fromTo(
          img,
          { scale: 1.3 },
          { scale: 1, duration: 1.2, ease: 'power4.inOut' },
          0
        );
      }
    }, container);

    return () => ctx.revert();
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={
        variant === 'circle'
          ? { clipPath: 'circle(0% at 50% 50%)' }
          : { clipPath: 'inset(100% 0% 0% 0%)' }
      }
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover"
        priority={priority}
        sizes={sizes}
      />
    </div>
  );
}