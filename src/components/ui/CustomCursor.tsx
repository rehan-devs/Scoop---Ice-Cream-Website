'use client';

import { useEffect, useRef, useCallback } from 'react';
import { lerp, isTouchDevice } from '@/lib/utils';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const scale = useRef(1);
  const targetScale = useRef(1);
  const rafId = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    target.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    if (isTouchDevice()) return;

    const matchMedia = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!matchMedia.matches) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    const handleMouseEnterInteractive = () => {
      targetScale.current = 3.5;
      cursor.style.mixBlendMode = 'difference';
    };

    const handleMouseLeaveInteractive = () => {
      targetScale.current = 1;
      cursor.style.mixBlendMode = 'normal';
    };

    const handleMouseDown = () => {
      targetScale.current = 0.8;
    };

    const handleMouseUp = () => {
      targetScale.current = 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Delegate hover effects
    document.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor-hover]')
      ) {
        handleMouseEnterInteractive();
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor-hover]')
      ) {
        handleMouseLeaveInteractive();
      }
    });

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.1);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.1);
      scale.current = lerp(scale.current, targetScale.current, 0.15);

      cursor.style.transform = `translate3d(${pos.current.x - 12}px, ${pos.current.y - 12}px, 0) scale(${scale.current})`;
      dot.style.transform = `translate3d(${target.current.x - 3}px, ${target.current.y - 3}px, 0)`;

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove]);

  if (typeof window !== 'undefined' && isTouchDevice()) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-[1.5px] border-chocolate pointer-events-none z-[9999] hidden md:block"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-chocolate pointer-events-none z-[9999] hidden md:block"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />
    </>
  );
}