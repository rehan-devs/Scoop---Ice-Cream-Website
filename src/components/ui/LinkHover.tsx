'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface LinkHoverProps {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}

export default function LinkHover({
  href,
  children,
  className = '',
  external = false,
}: LinkHoverProps) {
  const content = typeof children === 'string' ? children : null;

  const inner = (
    <span className="relative inline-flex overflow-hidden group">
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        className="absolute top-full left-0 block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}