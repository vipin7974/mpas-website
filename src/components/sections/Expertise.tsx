import { useRef } from 'react';
import boardroom from '@/assets/images/expertise-boardroom.webp';
import { audiences } from '@/data/markets';
import { useGsap } from '@/hooks/useGsap';
import { gsap } from '@/lib/gsap';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';

export function Expertise() {
  const ref = useRef<HTMLElement>(null);

  useGsap(
    ({ scope }) => {
      gsap.fromTo(
        scope.querySelector('[data-parallax]'),
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    },
    ref,
  );

  return (
    <Section ref={ref} id="expertise" tone="surface" labelledBy="expertise-title">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--spacing-header-compact)+3rem)]">
              <SectionHeading
                layout="stacked"
                index="02"
                label="Expertise"
                titleId="expertise-title"
                title="Senior leadership. Cross-sector depth."
                description="Led by a senior leadership team with deep cross-sector expertise, we give every side of the table advice it can act on — whether you allocate capital, build capability or shape policy."
              />
              <Reveal variant="clip" className="media-frame mt-12 hidden aspect-[4/3] rounded-md md:block">
                <div data-parallax className="absolute inset-x-0 -top-[8%] h-[116%]">
                  <img
                    src={boardroom}
                    alt="Leadership team in discussion around a boardroom table"
                    width={1600}
                    height={1067}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal as="p" variant="fade" className="eyebrow mb-6 text-text-muted lg:mt-4">
              Who we work with
            </Reveal>
            <ul className="border-t border-line">
              {audiences.map((a, i) => (
                <Reveal
                  as="li"
                  key={a.title}
                  delay={i * 0.06}
                  className="group relative border-b border-line py-8 md:py-10"
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 -left-4 w-px origin-top scale-y-0 bg-mpas-green-dark transition-transform duration-700 ease-expo group-hover:scale-y-100 md:-left-6"
                  />
                  <div className="flex items-baseline gap-5 md:gap-8">
                    <span className="eyebrow w-6 shrink-0 text-text-muted">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="font-outfit text-h2 font-light text-ink transition-transform duration-700 ease-expo group-hover:translate-x-2">
                        {a.title}
                      </h3>
                      <p className="mt-3 max-w-md text-text-secondary">{a.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
