'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function Counter({
  end,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          const counter = { value: 0 };
          gsap.to(counter, {
            value: end,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
              setDisplayValue(Math.round(counter.value));
            },
          });
        },
      });
    });

    return () => ctx.revert();
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}