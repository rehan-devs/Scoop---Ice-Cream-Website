'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { flavors } from '@/data/flavors';
import { formatPrice } from '@/lib/utils';

const featured = flavors.slice(0, 5);
const loopedFlavors = [...featured, ...featured];

export default function FeaturedFlavors() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const currentX = useRef(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const singleSetWidth = useRef(0);
  const isPaused = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate width of one set of cards
  const calculateWidths = useCallback(() => {
    if (!innerRef.current) return;
    const cards = innerRef.current.querySelectorAll('.flavor-card');
    if (cards.length === 0) return;

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 24;
    singleSetWidth.current = (cardWidth + gap) * featured.length;
  }, []);

  // Update arrow states
  const updateArrowStates = useCallback(() => {
    const x = currentX.current;
    setCanScrollLeft(x < -10);
    setCanScrollRight(true);
  }, []);

  // Auto-scroll animation using requestAnimationFrame
  const startAutoScroll = useCallback(() => {
    if (!innerRef.current || singleSetWidth.current === 0) return;

    const speed = 0.5; // pixels per frame

    const animate = () => {
      if (isPaused.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      currentX.current -= speed;

      // Reset when scrolled one full set
      if (Math.abs(currentX.current) >= singleSetWidth.current) {
        currentX.current = 0;
      }

      if (innerRef.current) {
        innerRef.current.style.transform = `translateX(${currentX.current}px)`;
      }

      updateArrowStates();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [updateArrowStates]);

  // Scroll by clicking arrows
  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!innerRef.current) return;

    isPaused.current = true;

    const scrollAmount = 300;
    const targetX = direction === 'left'
      ? currentX.current + scrollAmount
      : currentX.current - scrollAmount;

    // Animate to target
    const startX = currentX.current;
    const startTime = Date.now();
    const duration = 600;

    const animateScroll = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      currentX.current = startX + (targetX - startX) * eased;

      // Wrap around
      if (currentX.current > 0) {
        currentX.current = -singleSetWidth.current + currentX.current;
      } else if (currentX.current < -singleSetWidth.current) {
        currentX.current = currentX.current + singleSetWidth.current;
      }

      if (innerRef.current) {
        innerRef.current.style.transform = `translateX(${currentX.current}px)`;
      }

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setTimeout(() => {
          isPaused.current = false;
        }, 2000);
      }
    };

    requestAnimationFrame(animateScroll);
    updateArrowStates();
  }, [updateArrowStates]);

  // Initialize
  useEffect(() => {
    if (!isMounted || !trackRef.current || !innerRef.current) return;

    // Observe for visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => {
              calculateWidths();
              startAutoScroll();
            }, 500);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current!);

    // Pause on hover
    const track = trackRef.current;
    const handleMouseEnter = () => { isPaused.current = true; };
    const handleMouseLeave = () => { isPaused.current = false; };

    track.addEventListener('mouseenter', handleMouseEnter);
    track.addEventListener('mouseleave', handleMouseLeave);

    // Handle resize
    const handleResize = () => calculateWidths();
    window.addEventListener('resize', handleResize);

    // Handle visibility change to prevent idle issues
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPaused.current = true;
      } else {
        isPaused.current = false;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      track.removeEventListener('mouseenter', handleMouseEnter);
      track.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, [isMounted, calculateWidths, startAutoScroll]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 md:py-24">
      {/* Header with title and arrows */}
      <div className="max-w-content mx-auto px-page mb-10 flex items-end justify-between">
        <h2
          className="font-display text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-chocolate transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          Signature Flavors
        </h2>

        {/* Navigation Arrows */}
        <div
          className="flex items-center gap-3 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
          }}
        >
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? 'border-chocolate text-chocolate hover:bg-chocolate hover:text-cream cursor-pointer'
                : 'border-chocolate/20 text-chocolate/20 cursor-not-allowed'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? 'border-chocolate text-chocolate hover:bg-chocolate hover:text-cream cursor-pointer'
                : 'border-chocolate/20 text-chocolate/20 cursor-not-allowed'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Track container - START FROM LEFT */}
      <div ref={trackRef} className="overflow-hidden">
        <div
          ref={innerRef}
          className="flex gap-6 pl-page will-change-transform"
          style={{ 
            width: 'max-content',
            transform: 'translateX(0px)', // Start from left
          }}
        >
          {loopedFlavors.map((flavor, index) => (
            <Link
              key={`${flavor.slug}-${index}`}
              href={`/menu/${flavor.slug}`}
              className="flavor-card flex-shrink-0 w-[240px] md:w-[280px] group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease ${(index % featured.length) * 0.1}s`,
              }}
            >
              <div
                className="relative w-[200px] h-[200px] md:w-[240px] md:h-[240px] mx-auto mb-4 rounded-full overflow-hidden transition-transform duration-500 group-hover:scale-105"
                style={{ boxShadow: `0 12px 40px ${flavor.accentColor}25` }}
              >
                <Image
                  src={flavor.image}
                  alt={flavor.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="240px"
                />
              </div>

              <div className="text-center">
                <div
                  className="inline-block w-1.5 h-1.5 rounded-full mb-2"
                  style={{ backgroundColor: flavor.accentColor }}
                />
                <h3 className="font-display text-[clamp(1.1rem,1.5vw,1.5rem)] font-semibold text-chocolate mb-1.5 group-hover:text-accent-pink transition-colors duration-300">
                  {flavor.name}
                </h3>
                <p className="font-body text-xs md:text-sm text-chocolate-light leading-relaxed mb-2 max-w-[220px] mx-auto">
                  {flavor.description}
                </p>
                <span className="font-body text-base font-medium text-chocolate">
                  {formatPrice(flavor.price)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-cream to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream to-transparent pointer-events-none" />
    </section>
  );
}