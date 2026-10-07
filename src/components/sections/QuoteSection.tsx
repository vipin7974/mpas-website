'use client';

import { useRef } from 'react';
import { useGsap } from '@/hooks/useGsap';
import { useSiteConfig } from '@/context/SiteConfig';
import { gsap } from '@/lib/gsap';
import { Container } from '@/components/common/Container';
import { Reveal } from '@/components/common/Reveal';

export function QuoteSection() {
  const ref = useRef<HTMLElement>(null);
  const { config } = useSiteConfig();

  useGsap(
    ({ scope }) => {
      gsap.fromTo(
        scope.querySelector('[data-parallax]'),
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    },
    ref,
  );

  return (
    <section
      ref={ref}
      aria-label="Our philosophy"
      data-header-theme="dark"
      className="relative flex min-h-[70svh] items-center overflow-hidden bg-mpas-green-dark py-section text-white"
    >
      <div data-parallax aria-hidden className="absolute inset-x-0 -top-[12%] h-[124%]">
        <img
          src={config.media.quote}
          alt=""
          width={2200}
          height={1467}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-55"
        />
      </div>
      <div aria-hidden className="absolute inset-0 bg-linear-to-r from-ink/90 via-ink/65 to-ink/35" />

      <Container className="relative">
        <figure className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-1">
            <span aria-hidden className="block font-outfit text-[5rem] leading-none text-mpas-green md:text-[7rem]">
              “
            </span>
          </div>
          <div className="lg:col-span-10">
            <blockquote>
              <Reveal as="p" variant="lines" className="font-outfit text-h1 font-extralight text-white">
                {config.quote.text}
              </Reveal>
            </blockquote>
            <Reveal as="figcaption" delay={0.2} className="mt-10 flex items-center gap-4 md:mt-14">
              <span aria-hidden className="bridge-rule w-12" />
              <span className="eyebrow text-white/75">{config.quote.caption}</span>
            </Reveal>
          </div>
        </figure>
      </Container>
    </section>
  );
}
