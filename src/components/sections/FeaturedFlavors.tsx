'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { flavors } from '@/data/flavors';
import { formatPrice } from '@/lib/utils';
import TextReveal from '@/components/ui/TextReveal';

const featured = flavors.slice(0, 5);
// Duplicate for seamless loop
const loopedFlavors = [...featured, ...featured];

export default function FeaturedFlavors() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<gsap.core.Tween | null>(null);
  const currentX = useRef(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const singleSetWidth = useRef(0);
  const isPaused = useRef(false);

  // Calculate width of one set of cards
  const calculateWidths = useCallback(() => {
    if (!innerRef.current) return;
    const cards = innerRef.current.querySelectorAll('.flavor-card');
    const cardCount = featured.length;
    if (cards.length === 0) return;

    // Width of one set = (card width + gap) * number of cards
    const cardStyle = window.getComputedStyle(cards[0]);
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 24; // gap-6 = 24px
    singleSetWidth.current = (cardWidth + gap) * cardCount;
  }, []);

  // Update arrow states based on position
  const updateArrowStates = useCallback(() => {
    const x = currentX.current;
    setCanScrollLeft(x < -10);
    setCanScrollRight(true); // Always can scroll right in infinite loop
  }, []);

  // Start infinite auto-scroll
  const startAutoScroll = useCallback(() => {
    if (!innerRef.current || singleSetWidth.current === 0) return;

    // Kill existing tween
    if (autoScrollRef.current) {
      autoScrollRef.current.kill();
    }

    const speed = 35; // pixels per second
    const distance = singleSetWidth.current;
    const duration = distance / speed;

    // Start from current position, scroll one full set width
    const startX = currentX.current;
    const endX = startX - singleSetWidth.current;

    autoScrollRef.current = gsap.fromTo(
      innerRef.current,
      { x: startX },
      {
        x: endX,
        duration: duration,
        ease: 'none',
        onUpdate: () => {
          if (innerRef.current) {
            currentX.current = gsap.getProperty(innerRef.current, 'x') as number;
          }
        },
        onComplete: () => {
          // Reset position seamlessly (jump back without animation)
          if (innerRef.current) {
            gsap.set(innerRef.current, { x: 0 });
            currentX.current = 0;
          }
          // Restart the loop
          if (!isPaused.current) {
            startAutoScroll();
          }
        },
      }
    );
  }, []);

  // Scroll by clicking arrows
  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!innerRef.current) return;

    // Pause auto-scroll
    isPaused.current = true;
    if (autoScrollRef.current) {
      autoScrollRef.current.pause();
    }

    const scrollAmount = 300;
    let targetX = direction === 'left'
      ? currentX.current + scrollAmount
      : currentX.current - scrollAmount;

    // Clamp left bound
    if (targetX > 0) targetX = 0;

    // Wrap around for infinite scroll
    if (targetX < -singleSetWidth.current) {
      // Jump to equivalent position in first set
      gsap.set(innerRef.current, { x: targetX + singleSetWidth.current });
      currentX.current = targetX + singleSetWidth.current;
      targetX = currentX.current - scrollAmount;
    }

    gsap.to(innerRef.current, {
      x: targetX,
      duration: 0.8,
      ease: 'power4.out',
      onUpdate: () => {
        currentX.current = gsap.getProperty(innerRef.current, 'x') as number;
        updateArrowStates();
      },
      onComplete: () => {
        // Resume auto-scroll after 4 seconds
        setTimeout(() => {
          isPaused.current = false;
          startAutoScroll();
        }, 4000);
      },
    });
  }, [updateArrowStates, startAutoScroll]);

  // Initialize
  useEffect(() => {
    if (!trackRef.current || !innerRef.current) return;

    // Wait for layout
    const timer = setTimeout(() => {
      calculateWidths();
      updateArrowStates();
      startAutoScroll();
    }, 500);

    // Pause on hover
    const track = trackRef.current;
    const handleMouseEnter = () => {
      isPaused.current = true;
      if (autoScrollRef.current) autoScrollRef.current.pause();
    };
    const handleMouseLeave = () => {
      isPaused.current = false;
      if (autoScrollRef.current) autoScrollRef.current.resume();
    };

    track.addEventListener('mouseenter', handleMouseEnter);
    track.addEventListener('mouseleave', handleMouseLeave);

    // Handle resize
    const handleResize = () => {
      calculateWidths();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      if (autoScrollRef.current) autoScrollRef.current.kill();
      track.removeEventListener('mouseenter', handleMouseEnter);
      track.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateWidths, updateArrowStates, startAutoScroll]);

  // Card entrance animation
  useEffect(() => {
    if (!innerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = innerRef.current!.querySelectorAll('.flavor-card');
      // Only animate first set
      const firstSetCards = Array.from(cards).slice(0, featured.length);
      gsap.fromTo(
        firstSetCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
      // Make duplicates visible immediately
      const secondSetCards = Array.from(cards).slice(featured.length);
      gsap.set(secondSetCards, { opacity: 1 });
    }, innerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 md:py-24">
      {/* Header with title and arrows */}
      <div className="max-w-content mx-auto px-page mb-10 flex items-end justify-between">
        <TextReveal
          as="h2"
          className="font-display text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-chocolate"
        >
          {'Signature Flavors'}
        </TextReveal>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left to see previous flavors"
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? 'border-chocolate text-chocolate hover:bg-chocolate hover:text-cream cursor-pointer'
                : 'border-chocolate/20 text-chocolate/20 cursor-not-allowed'
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right to see more flavors"
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? 'border-chocolate text-chocolate hover:bg-chocolate hover:text-cream cursor-pointer'
                : 'border-chocolate/20 text-chocolate/20 cursor-not-allowed'
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Track container */}
      <div ref={trackRef} className="overflow-hidden">
        <div
          ref={innerRef}
          className="flex gap-6 pl-page will-change-transform"
          style={{ width: 'max-content' }}
        >
          {loopedFlavors.map((flavor, index) => (
            <Link
              key={`${flavor.slug}-${index}`}
              href={`/menu/${flavor.slug}`}
              className="flavor-card flex-shrink-0 w-[240px] md:w-[280px] group"
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