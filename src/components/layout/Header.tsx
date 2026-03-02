'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import MagneticButton from '@/components/ui/MagneticButton';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export default function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setIsScrolled(currentScrollY > 100);

    if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.to(headerRef.current, {
      y: isHidden && !isMenuOpen ? '-100%' : '0%',
      duration: 0.4,
      ease: 'power4.out',
    });
  }, [isHidden, isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-500 ${
        isScrolled && !isMenuOpen
          ? 'bg-cream/90 backdrop-blur-md border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-content mx-auto px-page flex items-center justify-between h-20 md:h-24">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-2xl md:text-3xl font-bold text-chocolate tracking-tight z-[101] relative"
          aria-label="SCOÖP — Home"
        >
          SCOÖP
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-10"
          role="navigation"
          aria-label="Main navigation"
        >
          {[
            { href: '/menu', label: 'Menu' },
            { href: '/about', label: 'About' },
            { href: '/locations', label: 'Locations' },
            { href: '/contact', label: 'Contact' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm uppercase tracking-[0.1em] text-chocolate hover:text-accent-pink transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-pink transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <MagneticButton>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center px-6 py-3 bg-chocolate text-cream font-body text-sm uppercase tracking-[0.1em] rounded-full hover:bg-chocolate-rich transition-colors duration-300"
            >
              Order Now
            </Link>
          </MagneticButton>
        </nav>

        {/* Hamburger Menu Button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden relative z-[101] w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <span
            className={`block w-6 h-[2px] bg-chocolate transition-all duration-300 origin-center ${
              isMenuOpen ? 'rotate-45 translate-y-[4px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-chocolate transition-all duration-300 origin-center ${
              isMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''
            }`}
          />
        </button>
      </div>
    </header>
  );
}