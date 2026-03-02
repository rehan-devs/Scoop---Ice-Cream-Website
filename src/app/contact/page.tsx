'use client';

import { useState } from 'react';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import GrainOverlay from '@/components/ui/GrainOverlay';
import ScrollProgress from '@/components/ui/ScrollProgress';
import TextReveal from '@/components/ui/TextReveal';
import PageTransition from '@/components/layout/PageTransition';
import ContactForm from '@/components/sections/ContactForm';

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <SmoothScroll>
      <GrainOverlay />
      <ScrollProgress />
      <Header
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />
      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <PageTransition>
        <main id="main-content" className="pt-32 md:pt-40 pb-section">
          <div className="max-w-content mx-auto px-page">
            {/* Hero */}
            <div className="mb-16 md:mb-24">
              <TextReveal
                as="h1"
                className="font-display text-hero font-bold text-chocolate leading-[1.0] tracking-[-0.02em]"
              >
                {'Get In Touch'}
              </TextReveal>
              <p className="font-body text-[clamp(1rem,1.2vw,1.25rem)] text-chocolate-light leading-relaxed max-w-[550px] mt-6">
                Whether it&apos;s a catering inquiry, a flavor suggestion, or just to say
                hi — we&apos;d love to hear from you.
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
              {/* Form */}
              <div className="lg:col-span-3">
                <ContactForm />
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-2">
                <div className="lg:sticky lg:top-32 space-y-10">
                  <div>
                    <h3 className="font-body text-xs uppercase tracking-[0.2em] text-chocolate-light/60 mb-3">
                      Email
                    </h3>
                    <a
                      href="mailto:hello@scoop.shop"
                      className="font-display text-xl text-chocolate hover:text-accent-pink transition-colors"
                    >
                      hello@scoop.shop
                    </a>
                  </div>

                  <div>
                    <h3 className="font-body text-xs uppercase tracking-[0.2em] text-chocolate-light/60 mb-3">
                      Phone
                    </h3>
                    <a
                      href="tel:+15035550142"
                      className="font-body text-chocolate hover:text-accent-pink transition-colors"
                    >
                      (503) 555-0142
                    </a>
                  </div>

                  <div>
                    <h3 className="font-body text-xs uppercase tracking-[0.2em] text-chocolate-light/60 mb-3">
                      Address
                    </h3>
                    <p className="font-body text-chocolate-light">
                      142 Main Street<br />
                      Portland, OR 97204
                    </p>
                  </div>

                  <div>
                    <h3 className="font-body text-xs uppercase tracking-[0.2em] text-chocolate-light/60 mb-3">
                      Hours
                    </h3>
                    <p className="font-body text-chocolate-light">
                      Mon–Thu: 12pm – 10pm<br />
                      Fri–Sun: 11am – 11pm
                    </p>
                  </div>

                  <div>
                    <h3 className="font-body text-xs uppercase tracking-[0.2em] text-chocolate-light/60 mb-3">
                      Follow Us
                    </h3>
                    <div className="flex gap-4">
                      {['Instagram', 'TikTok', 'Facebook'].map((social) => (
                        <a
                          key={social}
                          href={`https://${social.toLowerCase()}.com`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-sm text-chocolate hover:text-accent-pink transition-colors duration-300"
                        >
                          {social}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-cream-dark">
                    <p className="font-body text-sm text-chocolate-light leading-relaxed">
                      📸 Tag us <span className="font-semibold text-chocolate">@scoopshop</span> on
                      Instagram! We love seeing your scoop moments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>

      <Footer />
    </SmoothScroll>
  );
}