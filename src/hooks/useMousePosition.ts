'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { lerp } from '@/lib/utils';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition() {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}

export function useSmoothMousePosition(lerpFactor: number = 0.1) {
  const mouse = useRef<MousePosition>({ x: 0, y: 0 });
  const smoothMouse = useRef<MousePosition>({ x: 0, y: 0 });
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      smoothMouse.current.x = lerp(smoothMouse.current.x, mouse.current.x, lerpFactor);
      smoothMouse.current.y = lerp(smoothMouse.current.y, mouse.current.y, lerpFactor);
      setPosition({ ...smoothMouse.current });
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove, lerpFactor]);

  return position;
}