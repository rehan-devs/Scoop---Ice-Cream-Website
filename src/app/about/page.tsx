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
import { gsap } from '@/lib/gsap';

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
  const storyRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!storyRef.current) return;
    const ctx = gsap.context(() => {
      const paragraphs = storyRef.current!.querySelectorAll('p');
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
            trigger: storyRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, storyRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!processRef.current) return;
    const ctx = gsap.context(() => {
      const steps = processRef.current!.querySelectorAll('.process-step');
      gsap.fromTo(
        steps,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, processRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!teamRef.current) return;
    const ctx = gsap.context(() => {
      const cards = teamRef.current!.querySelectorAll('.team-card');
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: teamRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, teamRef);
    return () => ctx.revert();
  }, []);

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
          {/* Hero — smaller heading, less bottom margin */}
          <section className="max-w-content mx-auto px-page mb-12 md:mb-16">
            <TextReveal
              as="h1"
              className="font-display text-[clamp(2.2rem,5vw,5.5rem)] font-bold text-chocolate leading-[1.08] tracking-[-0.02em] max-w-[800px]"
            >
              {'Every Scoop\nHas a Story'}
            </TextReveal>
          </section>

          {/* Origin Story — tighter spacing */}
          <section className="max-w-content mx-auto px-page mb-16 md:mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              <div ref={storyRef} className="space-y-5">
                <p className="font-body text-[clamp(0.95rem,1.1vw,1.1rem)] text-chocolate-light leading-relaxed">
                  In 2018, Elena Rossi and Marcus Chen made a leap of faith. After
                  years in the corporate world — she in marketing, he in finance —
                  they decided to trade spreadsheets for ice cream scoops.
                </p>
                <p className="font-body text-[clamp(0.95rem,1.1vw,1.1rem)] text-chocolate-light leading-relaxed">
                  What started as a weekend hobby — experimenting with an old
                  Italian gelato machine in their Portland apartment — quickly
                  became an obsession. Friends couldn&apos;t get enough. Neighbors
                  started placing orders. A farmers market booth turned into a
                  devoted following.
                </p>
                <p className="font-body text-[clamp(0.95rem,1.1vw,1.1rem)] text-chocolate-light leading-relaxed">
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

          {/* Our Process — tighter */}
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
                  <div key={step.number} className="process-step">
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

          {/* Team — tighter */}
          <section className="max-w-content mx-auto px-page mb-16 md:mb-24">
            <TextReveal
              as="h2"
              className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-chocolate mb-10 md:mb-12"
            >
              {'The Team'}
            </TextReveal>

            <div ref={teamRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="team-card p-6 rounded-2xl bg-cream-dark text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-chocolate text-cream flex items-center justify-center mx-auto mb-3">
                    <span className="font-display text-lg font-bold">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
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

          {/* Stats — tighter */}
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

          {/* Values — tighter */}
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