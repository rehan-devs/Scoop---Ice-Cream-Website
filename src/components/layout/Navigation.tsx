'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/locations', label: 'Locations' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: 'https://tiktok.com', label: 'TikTok' },
  { href: 'https://facebook.com', label: 'Facebook' },
];

export default function Navigation({ isOpen, onClose }: NavigationProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.set(overlayRef.current, { display: 'flex' });
        gsap.fromTo(
          overlayRef.current,
          { clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' },
          {
            clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)',
            duration: 0.8,
            ease: 'power4.inOut',
          }
        );

        gsap.fromTo(
          linksRef.current.filter(Boolean),
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            delay: 0.3,
            ease: 'power4.out',
          }
        );

        if (socialRef.current) {
          gsap.fromTo(
            socialRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, delay: 0.7, ease: 'power4.out' }
          );
        }

        document.body.style.overflow = 'hidden';
      } else {
        gsap.to(linksRef.current.filter(Boolean), {
          y: -40,
          opacity: 0,
          stagger: 0.04,
          duration: 0.3,
          ease: 'power4.in',
        });

        gsap.to(overlayRef.current, {
          clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)',
          duration: 0.6,
          delay: 0.2,
          ease: 'power4.inOut',
          onComplete: () => {
            if (overlayRef.current) {
              gsap.set(overlayRef.current, { display: 'none' });
            }
          },
        });

        document.body.style.overflow = '';
      }
    }, overlayRef);

    return () => ctx.revert();
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99] bg-chocolate flex-col items-center justify-center hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <nav className="flex flex-col items-center gap-4 md:gap-6">
        {navLinks.map((link, i) => (
          <div key={link.href} className="overflow-hidden">
            <Link
              ref={(el) => { linksRef.current[i] = el; }}
              href={link.href}
              onClick={onClose}
              className="font-display text-nav-overlay text-cream hover:text-accent-pink transition-colors duration-300 block leading-tight"
            >
              {link.label}
            </Link>
          </div>
        ))}
      </nav>

      <div ref={socialRef} className="absolute bottom-12 flex gap-8">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm uppercase tracking-[0.1em] text-cream/60 hover:text-accent-pink transition-colors duration-300"
          >
            {social.label}
          </a>
        ))}
      </div>
    </div>
  );
}