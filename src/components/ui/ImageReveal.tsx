'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

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
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Start revealed to ensure images show
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.05, rootMargin: '50px' }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
    >
      <div
        className="w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          opacity: isRevealed ? 1 : 0,
          transform: isRevealed ? 'scale(1)' : 'scale(1.1)',
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
          priority={priority}
          sizes={sizes}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
}