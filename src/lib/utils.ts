type ClassValue = string | number | boolean | undefined | null | Record<string, boolean> | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const arg of inputs) {
    if (!arg) continue;

    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (typeof arg === 'number') {
      classes.push(String(arg));
    } else if (Array.isArray(arg)) {
      const inner = cn(...arg);
      if (inner) classes.push(inner);
    } else if (typeof arg === 'object') {
      for (const [key, value] of Object.entries(arg)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.filter(Boolean).join(' ');
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function getMousePosition(e: MouseEvent) {
  return {
    x: e.clientX,
    y: e.clientY,
  };
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function splitTextIntoLines(text: string): string[] {
  return text.split('\n').filter(Boolean);
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}