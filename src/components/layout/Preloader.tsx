'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/utils';

interface PreloaderProps {
  onComplete: () => void;
}

const messages = [
  'Churning fresh cream...',
  'Adding sprinkles...',
  'Folding in vanilla beans...',
  'Perfecting the swirl...',
  'Almost ready...',
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const animateOut = useCallback(() => {
    if (!containerRef.current) return;

    const reduced = prefersReducedMotion();

    if (reduced) {
      if (containerRef.current) containerRef.current.style.display = 'none';
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
      },
    });

    tl.to(counterRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
    })
      .to(
        messageRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
        },
        '<0.1'
      )
      .to(containerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 85% 0%, 70% 0%, 55% 0%, 40% 0%, 25% 0%, 10% 0%, 0% 0%)',
        duration: 1,
        ease: 'power4.inOut',
      }, '+=0.2');
  }, [onComplete]);

  useEffect(() => {
    let loaded = 0;
    const total = 3;

    const checkComplete = () => {
      loaded++;
      const pct = Math.min(Math.round((loaded / total) * 100), 100);
      setProgress(pct);
      if (loaded >= total) {
        setTimeout(animateOut, 400);
      }
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(checkComplete);
    } else {
      setTimeout(checkComplete, 500);
    }

    const imgCheck = setTimeout(checkComplete, 800);
    const modelCheck = setTimeout(checkComplete, 1200);

    return () => {
      clearTimeout(imgCheck);
      clearTimeout(modelCheck);
    };
  }, [animateOut]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (counterRef.current) {
      gsap.to(counterRef.current, {
        innerText: progress,
        duration: 0.5,
        snap: { innerText: 1 },
        ease: 'power2.out',
      });
    }
  }, [progress]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-cream"
      style={{
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 90% 98%, 75% 100%, 60% 97%, 45% 100%, 30% 98%, 15% 100%, 0% 98%)',
      }}
    >
      <div className="text-center">
        <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-bold text-chocolate tracking-tight mb-4">
          SCOÖP
        </h1>
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-6xl">🍦</span>
        </div>
        <div className="flex items-baseline justify-center gap-1 mb-4">
          <span
            ref={counterRef}
            className="font-body text-4xl font-semibold text-chocolate tabular-nums"
          >
            0
          </span>
          <span className="font-body text-2xl text-chocolate-light">%</span>
        </div>
        <p
          ref={messageRef}
          className="font-body text-sm text-chocolate-light tracking-wide uppercase"
        >
          {messages[messageIndex]}
        </p>
      </div>
    </div>
  );
}