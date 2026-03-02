'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

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
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const animateOut = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 800);
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

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-cream transition-all duration-700 ${
        isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
    >
      <div className="text-center">
        <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-bold text-chocolate tracking-tight mb-4">
          SCOÖP
        </h1>
        
        {/* Ice cream shifted LEFT */}
        <div className="flex items-center justify-center gap-2 mb-6 -ml-4">
          <span className="text-6xl">🍦</span>
        </div>
        
        <div className="flex items-baseline justify-center gap-1 mb-4">
          <span className="font-body text-4xl font-semibold text-chocolate tabular-nums">
            {progress}
          </span>
          <span className="font-body text-2xl text-chocolate-light">%</span>
        </div>
        <p className="font-body text-sm text-chocolate-light tracking-wide uppercase">
          {messages[messageIndex]}
        </p>
      </div>
    </div>
  );
}