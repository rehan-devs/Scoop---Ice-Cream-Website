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
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const clipPathHidden = variant === 'circle' 
    ? 'circle(0% at 50% 50%)' 
    : 'inset(100% 0% 0% 0%)';
  
  const clipPathRevealed = variant === 'circle' 
    ? 'circle(50% at 50% 50%)' 
    : 'inset(0% 0% 0% 0%)';

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{
        clipPath: isRevealed ? clipPathRevealed : clipPathHidden,
        transition: 'clip-path 1.2s cubic-bezier(0.76, 0, 0.24, 1)',
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover"
        style={{
          transform: isRevealed ? 'scale(1)' : 'scale(1.3)',
          transition: 'transform 1.2s cubic-bezier(0.76, 0, 0.24, 1)',
        }}
        priority={priority}
        sizes={sizes}
      />
    </div>
  );
}