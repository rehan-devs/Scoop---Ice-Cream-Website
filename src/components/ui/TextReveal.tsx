'use client';

import { useRef, useEffect, useState, createElement, ReactNode } from 'react';

interface TextRevealProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function TextReveal({
  children,
  as = 'h2',
  className = '',
  delay = 0,
  stagger = 0.12,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay * 1000);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [delay]);

  const text = typeof children === 'string' ? children : '';
  const lines = text.split('\n').filter(Boolean);

  if (lines.length === 0 && typeof children !== 'string') {
    return createElement(
      as,
      { ref: containerRef, className },
      <span className="block overflow-hidden pb-[0.15em]">
        <span
          className="block transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: isVisible ? 'translateY(0%)' : 'translateY(100%)',
          }}
        >
          {children}
        </span>
      </span>
    );
  }

  return createElement(
    as,
    { ref: containerRef, className },
    lines.map((line, i) => (
      <span key={i} className="block overflow-hidden pb-[0.15em]">
        <span
          className="block transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: isVisible ? 'translateY(0%)' : 'translateY(100%)',
            transitionDelay: `${i * stagger}s`,
          }}
        >
          {line}
        </span>
      </span>
    ))
  );
}