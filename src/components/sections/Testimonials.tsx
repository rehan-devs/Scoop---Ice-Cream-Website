'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';

const testimonials = [
  {
    quote: "The Madagascar Vanilla alone is worth the trip. It's the purest, most beautiful vanilla ice cream I've ever tasted. You can see the real vanilla bean specks in every scoop.",
    name: 'Sarah M.',
    detail: 'Portland, OR',
  },
  {
    quote: "We hired SCOÖP to cater our wedding and it was the highlight of the reception. Guests are still talking about the Salted Caramel. Absolutely phenomenal.",
    name: 'James & Priya K.',
    detail: 'Wedding, June 2024',
  },
  {
    quote: "As someone who's dairy-free, finding ice cream that actually tastes incredible is rare. The Coconut Bliss and Oat Milk Chocolate changed the game for me.",
    name: 'Alex T.',
    detail: 'Vegan ice cream enthusiast',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!quoteRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power4.out' }
      );
    });

    return () => ctx.revert();
  }, [active]);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={sectionRef} className="py-section">
      <div className="max-w-content mx-auto px-page">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-display text-6xl text-accent-pink/30 block mb-6">&ldquo;</span>

          <div ref={quoteRef} className="min-h-[200px] flex flex-col items-center justify-center">
            <blockquote className="font-display text-[clamp(1.25rem,2vw,2rem)] font-medium text-chocolate leading-relaxed mb-8">
              {testimonials[active].quote}
            </blockquote>
            <cite className="not-italic">
              <span className="font-body text-sm font-semibold text-chocolate block">
                {testimonials[active].name}
              </span>
              <span className="font-body text-xs text-chocolate-light">
                {testimonials[active].detail}
              </span>
            </cite>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-chocolate/20 flex items-center justify-center hover:bg-chocolate hover:text-cream transition-all duration-300"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === active ? 'bg-accent-pink w-6' : 'bg-chocolate/20'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-chocolate/20 flex items-center justify-center hover:bg-chocolate hover:text-cream transition-all duration-300"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}