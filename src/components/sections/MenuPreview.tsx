'use client';

import TextReveal from '@/components/ui/TextReveal';
import LinkHover from '@/components/ui/LinkHover';

export default function MenuPreview() {
  return (
    <section className="py-section">
      <div className="max-w-content mx-auto px-page text-center">
        <TextReveal
          as="h2"
          className="font-display text-section font-bold text-chocolate mb-6"
        >
          {'Discover All Flavors'}
        </TextReveal>
        <p className="font-body text-[clamp(1rem,1.2vw,1.25rem)] text-chocolate-light leading-relaxed max-w-[500px] mx-auto mb-10">
          From timeless classics to daring seasonal creations, explore our full
          menu of handcrafted flavors.
        </p>
        <LinkHover
          href="/menu"
          className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-[0.1em] text-chocolate hover:text-accent-pink transition-colors duration-300 border-b border-chocolate/20 hover:border-accent-pink pb-1"
        >
          View Full Menu →
        </LinkHover>
      </div>
    </section>
  );
}