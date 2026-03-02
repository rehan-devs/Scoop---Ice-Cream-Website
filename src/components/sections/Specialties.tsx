'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const specialties = [
  {
    number: '01',
    title: 'Signature Scoops',
    description: 'Our rotating menu of small-batch flavors, churned fresh daily with locally sourced ingredients.',
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop',
  },
  {
    number: '02',
    title: 'Custom Cakes',
    description: 'Ice cream cakes for every celebration, layered with your favorite flavors and handmade toppings.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop',
  },
  {
    number: '03',
    title: 'Catering',
    description: 'Bringing the scoop bar to your event. Weddings, parties, corporate gatherings — we do it all.',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=400&fit=crop',
  },
  {
    number: '04',
    title: 'Flavor Lab',
    description: 'Seasonal experimental flavors that push boundaries. Limited batches, unlimited creativity.',
    image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=400&h=400&fit=crop',
  },
];

export default function Specialties() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.specialty-card');
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-section bg-cream-dark">
      <div className="max-w-content mx-auto px-page">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {specialties.map((item) => (
            <div
              key={item.number}
              className="specialty-card group relative p-8 md:p-12 rounded-2xl bg-cream overflow-hidden transition-all duration-500 hover:shadow-2xl cursor-default"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500 bg-cover bg-center scale-110 group-hover:scale-100"
                style={{ 
                  backgroundImage: `url(${item.image})`,
                  transition: 'opacity 0.5s ease, transform 0.7s ease',
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/80 to-cream/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <span className="font-body text-sm text-accent-pink font-medium tracking-wider">
                  {item.number}
                </span>
                <h3 className="font-display text-flavor font-semibold text-chocolate mt-3 mb-4 group-hover:text-chocolate transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-body text-chocolate-light leading-relaxed max-w-[400px] group-hover:text-chocolate/80 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}