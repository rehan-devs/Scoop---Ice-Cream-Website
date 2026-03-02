'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Counter from '@/components/ui/Counter';
import LinkHover from '@/components/ui/LinkHover';

export default function StoryTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !textRef.current) return;

    const paragraphs = textRef.current.querySelectorAll('p');
    paragraphs.forEach((p, i) => {
      setTimeout(() => {
        (p as HTMLElement).style.opacity = '1';
        (p as HTMLElement).style.transform = 'translateY(0)';
      }, i * 150);
    });
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 overflow-hidden">
      <div className="max-w-content mx-auto px-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <h2
              className="font-display text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-chocolate mb-8 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              }}
            >
              Our Story
            </h2>

            <div ref={textRef} className="space-y-6">
              <p
                className="font-body text-[clamp(1rem,1.2vw,1.25rem)] text-chocolate-light leading-relaxed transition-all duration-700"
                style={{ opacity: 0, transform: 'translateY(20px)' }}
              >
                We believe ice cream is more than a dessert. It&apos;s a moment of
                pure joy, handcrafted with obsessive attention to detail.
              </p>
              <p
                className="font-body text-[clamp(1rem,1.2vw,1.25rem)] text-chocolate-light leading-relaxed transition-all duration-700"
                style={{ opacity: 0, transform: 'translateY(20px)' }}
              >
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
          <div
            className="relative transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            }}
          >
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&h=1000&fit=crop"
                alt="Artisan ice cream being carefully crafted with a vintage scoop"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}