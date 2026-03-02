'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import ImageReveal from '@/components/ui/ImageReveal';
import TextReveal from '@/components/ui/TextReveal';
import Counter from '@/components/ui/Counter';
import LinkHover from '@/components/ui/LinkHover';

export default function StoryTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const textLinesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textLinesRef.current) return;

    const ctx = gsap.context(() => {
      const paragraphs = textLinesRef.current!.querySelectorAll('p');
      gsap.fromTo(
        paragraphs,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: textLinesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-section overflow-hidden">
      <div className="max-w-content mx-auto px-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <TextReveal
              as="h2"
              className="font-display text-section font-bold text-chocolate mb-8"
            >
              {'Our Story'}
            </TextReveal>

            <div ref={textLinesRef} className="space-y-6">
              <p className="font-body text-[clamp(1rem,1.2vw,1.25rem)] text-chocolate-light leading-relaxed">
                We believe ice cream is more than a dessert. It&apos;s a moment of
                pure joy, handcrafted with obsessive attention to detail.
              </p>
              <p className="font-body text-[clamp(1rem,1.2vw,1.25rem)] text-chocolate-light leading-relaxed">
                Founded in 2018 by two people who left corporate life to pursue
                their passion, SCOÖP has grown from a tiny kitchen experiment to
                Portland&apos;s most beloved ice cream destination.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-12 mt-12 mb-8">
              <div>
                <Counter
                  end={6}
                  className="font-display text-4xl font-bold text-chocolate block"
                />
                <span className="font-body text-sm text-chocolate-light uppercase tracking-wider">
                  Years of Craft
                </span>
              </div>
              <div>
                <Counter
                  end={47}
                  suffix="+"
                  className="font-display text-4xl font-bold text-chocolate block"
                />
                <span className="font-body text-sm text-chocolate-light uppercase tracking-wider">
                  Unique Flavors
                </span>
              </div>
            </div>

            <LinkHover
              href="/about"
              className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-[0.1em] text-chocolate hover:text-accent-pink transition-colors duration-300 border-b border-chocolate/20 hover:border-accent-pink pb-1"
            >
              Read Our Story →
            </LinkHover>
          </div>

          {/* Image */}
          <div className="relative">
            <ImageReveal
              src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&h=1000&fit=crop"
              alt="Artisan ice cream being carefully crafted with a vintage scoop"
              width={800}
              height={1000}
              className="w-full aspect-[4/5] rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}