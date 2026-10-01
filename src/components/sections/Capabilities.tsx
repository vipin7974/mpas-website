import { useRef } from 'react';
import { capabilities } from '@/data/capabilities';
import { useGsap } from '@/hooks/useGsap';
import { gsap } from '@/lib/gsap';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { Button } from '@/components/common/Button';

export function Capabilities() {
  const ref = useRef<HTMLElement>(null);

  // The dark panel opens out from an inset card to full-bleed as it enters —
  // a soft hand-off from the light sections above.
  useGsap(
    ({ scope }) => {
      gsap.fromTo(
        scope.querySelector('[data-panel]'),
        { clipPath: 'inset(0% 2.5% 0% 2.5% round 14px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'none',
          scrollTrigger: { trigger: scope, start: 'top bottom', end: 'top 25%', scrub: 0.6 },
        },
      );
    },
    ref,
  );

  return (
    <section ref={ref} id="capabilities" aria-labelledby="capabilities-title" className="relative bg-surface">
      <div data-panel data-header-theme="dark" className="relative overflow-hidden bg-ink py-section text-text-inverse">
        {/* Faint bridge arc motif */}
        <svg
          aria-hidden
          className="pointer-events-none absolute -right-[10%] top-0 h-[45%] w-[60%] opacity-[0.05]"
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M0 400 Q400 -120 800 400" stroke="url(#cap-grad)" strokeWidth="1.5" />
          <path d="M80 400 Q400 -40 720 400" stroke="url(#cap-grad)" strokeWidth="1" />
          <defs>
            <linearGradient id="cap-grad" x1="0" x2="1">
              <stop offset="0" stopColor="#8ec640" />
              <stop offset="1" stopColor="#f15a29" />
            </linearGradient>
          </defs>
        </svg>

        <Container className="relative">
          <SectionHeading
            tone="dark"
            index="05"
            label="Capabilities"
            titleId="capabilities-title"
            title="Capabilities that carry strategy through to execution."
            description="A senior, hands-on toolkit, deployed as a single engagement or as part of a long-term partnership."
          />

          <ol className="mt-16 grid grid-cols-1 gap-x-8 md:mt-24 md:grid-cols-2 lg:gap-x-16">
            {capabilities.map((c, i) => (
              <Reveal
                as="li"
                key={c.title}
                delay={(i % 2) * 0.08}
                className="group relative border-t border-ink-line py-8 md:py-10"
              >
                <span
                  aria-hidden
                  className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-[image:var(--gradient-green)] transition-transform duration-700 ease-expo group-hover:scale-x-100"
                />
                <div className="flex gap-6 md:gap-8">
                  <span className="eyebrow w-6 shrink-0 pt-2 text-mpas-green">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-outfit text-h3 text-white transition-transform duration-700 ease-expo group-hover:translate-x-1.5">
                      {c.title}
                    </h3>
                    <p className="mt-3 max-w-md text-text-inverse-muted">{c.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-14 flex flex-col items-start gap-6 border-t border-ink-line pt-10 md:mt-16 md:flex-row md:items-center md:justify-between">
            <p className="max-w-lg font-outfit text-body-lg font-light text-white/85">
              Not sure where to start? We’ll help you frame the right question first.
            </p>
            <Button href="#contact" variant="inverse">
              Discuss your mandate
            </Button>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
