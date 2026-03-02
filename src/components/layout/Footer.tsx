'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const heading = footerRef.current!.querySelector('.footer-heading');
      if (heading) {
        gsap.fromTo(
          heading,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      const cols = footerRef.current!.querySelectorAll('.footer-col');
      if (cols.length) {
        gsap.fromTo(
          cols,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: cols[0],
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-chocolate text-cream"
      role="contentinfo"
    >
      <div className="max-w-content mx-auto px-page pt-section pb-12">
        {/* Large CTA */}
        <div className="mb-20 md:mb-32">
          <h2 className="footer-heading font-display text-section font-bold leading-tight">
            Come Visit Us
          </h2>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: About */}
          <div className="footer-col">
            <Link href="/" className="font-display text-2xl font-bold mb-4 block">
              SCOÖP
            </Link>
            <p className="font-body text-cream/60 text-sm leading-relaxed max-w-[280px]">
              Small-batch artisan ice cream crafted from locally sourced ingredients.
              Every scoop tells a story.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-col">
            <h3 className="font-body text-sm uppercase tracking-[0.1em] mb-6 text-cream/40">
              Explore
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {['Menu', 'About', 'Locations', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="font-body text-cream/70 hover:text-accent-pink transition-colors duration-300 text-sm"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="footer-col">
            <h3 className="font-body text-sm uppercase tracking-[0.1em] mb-6 text-cream/40">
              Contact
            </h3>
            <div className="flex flex-col gap-3 font-body text-sm text-cream/70">
              <MagneticButton>
                <a
                  href="mailto:hello@scoop.shop"
                  className="hover:text-accent-pink transition-colors duration-300"
                >
                  hello@scoop.shop
                </a>
              </MagneticButton>
              <p>(503) 555-0142</p>
              <p>142 Main Street</p>
              <p>Portland, OR 97204</p>
            </div>
          </div>

          {/* Column 4: Hours & Newsletter */}
          <div className="footer-col">
            <h3 className="font-body text-sm uppercase tracking-[0.1em] mb-6 text-cream/40">
              Hours
            </h3>
            <div className="font-body text-sm text-cream/70 mb-8">
              <p>Mon–Thu: 12pm – 10pm</p>
              <p>Fri–Sun: 11am – 11pm</p>
            </div>

            <h3 className="font-body text-sm uppercase tracking-[0.1em] mb-4 text-cream/40">
              Newsletter
            </h3>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent border border-[var(--border-dark)] rounded-full px-4 py-2 text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-accent-pink transition-colors"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-accent-pink text-chocolate rounded-full text-sm font-medium hover:bg-accent-pink/80 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-[var(--border-dark)] pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-body text-xs text-cream/40">
            © 2024 SCOÖP. All rights reserved.
          </p>

          <div className="flex gap-6">
            {[
              { label: 'Instagram', href: 'https://instagram.com' },
              { label: 'TikTok', href: 'https://tiktok.com' },
              { label: 'Facebook', href: 'https://facebook.com' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs uppercase tracking-[0.15em] text-cream/40 hover:text-accent-pink transition-colors duration-300"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}