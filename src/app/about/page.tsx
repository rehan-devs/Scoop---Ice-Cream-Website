'use client';

import { useState, useRef, useEffect } from 'react';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import GrainOverlay from '@/components/ui/GrainOverlay';
import ScrollProgress from '@/components/ui/ScrollProgress';
import TextReveal from '@/components/ui/TextReveal';
import ImageReveal from '@/components/ui/ImageReveal';
import Counter from '@/components/ui/Counter';
import PageTransition from '@/components/layout/PageTransition';

const processSteps = [
  {
    number: '01',
    title: 'Source',
    description:
      'We partner with 12 local farms to source the freshest cream, milk, and seasonal fruits within 50 miles of our kitchen.',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop',
  },
  {
    number: '02',
    title: 'Craft',
    description:
      'Every batch is churned by hand in small quantities. Our vintage Italian batch freezer produces just 5 gallons at a time.',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&h=400&fit=crop',
  },
  {
    number: '03',
    title: 'Create',
    description:
      'Flavors are developed through weeks of testing. Each recipe is perfected before it ever reaches a scoop.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=400&fit=crop',
  },
  {
    number: '04',
    title: 'Serve',
    description:
      'From our hands to yours. Every scoop is served with care, in house-made waffle cones baked fresh daily.',
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&h=400&fit=crop',
  },
];

const team = [
  { name: 'Elena Rossi', title: 'Co-Founder & Chief Scoop Officer' },
  { name: 'Marcus Chen', title: 'Co-Founder & Flavor Architect' },
  { name: 'Sofia Andersson', title: 'Head Pastry Chef' },
  { name: 'James Wright', title: 'Shop Manager' },
  { name: 'Mia Torres', title: 'Events & Catering Lead' },
  { name: 'David Kim', title: 'Sourcing & Sustainability' },
];

const values = [
  {
    title: 'Sustainability',
    description: 'Compostable cups, local sourcing, zero-waste kitchen practices.',
  },
  {
    title: 'Local Sourcing',
    description: 'Every ingredient is sourced from within 50 miles when possible.',
  },
  {
    title: 'No Artificial Anything',
    description: 'Real ingredients only. No artificial colors, flavors, or preservatives.',
  },
  {
    title: 'Community',
    description:
      "We're more than a shop — we're a gathering place for neighbors and friends.",
  },
];

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const teamScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollTeamLeft, setCanScrollTeamLeft] = useState(false);
  const [canScrollTeamRight, setCanScrollTeamRight] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Story paragraphs animation
  useEffect(() => {
    if (!isMounted || !storyRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const paragraphs = storyRef.current?.querySelectorAll('p');
            paragraphs?.forEach((p, i) => {
              setTimeout(() => {
                (p as HTMLElement).style.opacity = '1';
                (p as HTMLElement).style.transform = 'translateY(0)';
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(storyRef.current);
    return () => observer.disconnect();
  }, [isMounted]);

  // Process steps animation
  useEffect(() => {
    if (!isMounted || !processRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const steps = processRef.current?.querySelectorAll('.process-step');
            steps?.forEach((step, i) => {
              setTimeout(() => {
                (step as HTMLElement).style.opacity = '1';
                (step as HTMLElement).style.transform = 'translateY(0)';
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(processRef.current);
    return () => observer.disconnect();
  }, [isMounted]);

  // Team scroll functions
  const checkTeamScroll = () => {
    if (!teamScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = teamScrollRef.current;
    setCanScrollTeamLeft(scrollLeft > 10);
    setCanScrollTeamRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollTeam = (direction: 'left' | 'right') => {
    if (!teamScrollRef.current) return;
    const scrollAmount = 200;
    teamScrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(checkTeamScroll, 300);
  };

  useEffect(() => {
    const el = teamScrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkTeamScroll, { passive: true });
    checkTeamScroll();
    return () => el.removeEventListener('scroll', checkTeamScroll);
  }, [isMounted]);

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
        <main id="main-content" className="pt-28 md:pt-32">
          {/* Hero */}
          <section className="max-w-content mx-auto px-page mb-12 md:mb-16">
            <TextReveal
              as="h1"
              className="font-display text-[clamp(2.2rem,5vw,5.5rem)] font-bold text-chocolate leading-[1.15] tracking-[-0.02em] max-w-[800px]"
            >
              {'Every Scoop\nHas a Story'}
            </TextReveal>
          </section>

          {/* Origin Story */}
          <section className="max-w-content mx-auto px-page mb-16 md:mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              <div ref={storyRef} className="space-y-5">
                <p
                  className="font-body text-[clamp(0.95rem,1.1vw,1.1rem)] text-chocolate-light leading-relaxed transition-all duration-700"
                  style={{ opacity: 0, transform: 'translateY(20px)' }}
                >
                  In 2018, Elena Rossi and Marcus Chen made a leap of faith. After
                  years in the corporate world — she in marketing, he in finance —
                  they decided to trade spreadsheets for ice cream scoops.
                </p>
                <p
                  className="font-body text-[clamp(0.95rem,1.1vw,1.1rem)] text-chocolate-light leading-relaxed transition-all duration-700"
                  style={{ opacity: 0, transform: 'translateY(20px)' }}
                >
                  What started as a weekend hobby — experimenting with an old
                  Italian gelato machine in their Portland apartment — quickly
                  became an obsession. Friends couldn&apos;t get enough. Neighbors
                  started placing orders. A farmers market booth turned into a
                  devoted following.
                </p>
                <p
                  className="font-body text-[clamp(0.95rem,1.1vw,1.1rem)] text-chocolate-light leading-relaxed transition-all duration-700"
                  style={{ opacity: 0, transform: 'translateY(20px)' }}
                >
                  Today, SCOÖP operates three beloved locations across Portland,
                  but the philosophy remains the same: source locally, craft
                  meticulously, and never, ever cut corners. Every flavor begins
                  with a question: &ldquo;What would make someone close their eyes
                  and smile?&rdquo;
                </p>
              </div>

              <ImageReveal
                src="https://images.unsplash.com/photo-1560008581-09826d1de69e?w=800&h=1000&fit=crop"
                alt="Elena and Marcus crafting ice cream in the SCOÖP kitchen"
                width={800}
                height={1000}
                className="w-full aspect-[4/5] rounded-2xl"
              />
            </div>
          </section>

          {/* Our Process */}
          <section className="bg-cream-dark py-14 md:py-20 mb-16 md:mb-24">
            <div className="max-w-content mx-auto px-page">
              <TextReveal
                as="h2"
                className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-chocolate mb-10 md:mb-12"
              >
                {'Our Process'}
              </TextReveal>

              <div
                ref={processRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {processSteps.map((step) => (
                  <div
                    key={step.number}
                    className="process-step transition-all duration-700"
                    style={{ opacity: 0, transform: 'translateY(30px)' }}
                  >
                    <ImageReveal
                      src={step.image}
                      alt={step.title}
                      width={600}
                      height={400}
                      className="w-full aspect-[3/2] rounded-xl mb-4"
                    />
                    <span className="font-body text-xs text-accent-pink font-medium tracking-wider">
                      {step.number}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-chocolate mt-1.5 mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm text-chocolate-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team - HORIZONTAL SCROLL ON MOBILE */}
          <section className="max-w-content mx-auto px-page mb-16 md:mb-24">
            <div className="flex items-end justify-between mb-8 md:mb-12">
              <TextReveal
                as="h2"
                className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-chocolate"
              >
                {'The Team'}
              </TextReveal>

              {/* Mobile scroll arrows */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => scrollTeam('left')}
                  disabled={!canScrollTeamLeft}
                  aria-label="Scroll left"
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                    canScrollTeamLeft
                      ? 'border-chocolate text-chocolate'
                      : 'border-chocolate/20 text-chocolate/20'
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollTeam('right')}
                  disabled={!canScrollTeamRight}
                  aria-label="Scroll right"
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                    canScrollTeamRight
                      ? 'border-chocolate text-chocolate'
                      : 'border-chocolate/20 text-chocolate/20'
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile: Horizontal scroll */}
            <div
              ref={teamScrollRef}
              className="flex gap-4 overflow-x-auto pb-4 md:hidden scrollbar-hide"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {team.map((member) => (
                <div
                  key={member.name}
                  className="flex-shrink-0 w-[200px] p-5 rounded-2xl bg-cream-dark text-center"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="w-12 h-12 rounded-full bg-chocolate text-cream flex items-center justify-center mx-auto mb-3">
                    <span className="font-display text-base font-bold">
                      {member.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-display text-sm font-semibold text-chocolate mb-1">
                    {member.name}
                  </h3>
                  <p className="font-body text-xs text-chocolate-light">
                    {member.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Desktop: Grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="p-6 rounded-2xl bg-cream-dark text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-chocolate text-cream flex items-center justify-center mx-auto mb-3">
                    <span className="font-display text-lg font-bold">
                      {member.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-chocolate mb-1">
                    {member.name}
                  </h3>
                  <p className="font-body text-sm text-chocolate-light">
                    {member.title}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="bg-chocolate text-cream py-14 md:py-20 mb-16 md:mb-24">
            <div className="max-w-content mx-auto px-page">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div>
                  <Counter
                    end={47}
                    suffix="+"
                    className="font-display text-[clamp(2.5rem,4vw,4rem)] font-bold block"
                  />
                  <span className="font-body text-xs text-cream/60 uppercase tracking-wider">
                    Flavors Created
                  </span>
                </div>
                <div>
                  <Counter
                    end={100}
                    suffix="K+"
                    className="font-display text-[clamp(2.5rem,4vw,4rem)] font-bold block"
                  />
                  <span className="font-body text-xs text-cream/60 uppercase tracking-wider">
                    Scoops Served
                  </span>
                </div>
                <div>
                  <Counter
                    end={6}
                    className="font-display text-[clamp(2.5rem,4vw,4rem)] font-bold block"
                  />
                  <span className="font-body text-xs text-cream/60 uppercase tracking-wider">
                    Years in Business
                  </span>
                </div>
                <div>
                  <Counter
                    end={12}
                    className="font-display text-[clamp(2.5rem,4vw,4rem)] font-bold block"
                  />
                  <span className="font-body text-xs text-cream/60 uppercase tracking-wider">
                    Local Farm Partners
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="max-w-content mx-auto px-page pb-16 md:pb-24">
            <TextReveal
              as="h2"
              className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-chocolate mb-8 md:mb-10"
            >
              {'Our Values'}
            </TextReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {values.map((value) => (
                <div key={value.title} className="p-6 rounded-2xl bg-cream-dark">
                  <h3 className="font-display text-lg font-semibold text-chocolate mb-2">
                    {value.title}
                  </h3>
                  <p className="font-body text-sm text-chocolate-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </PageTransition>

      <Footer />
    </SmoothScroll>
  );
}