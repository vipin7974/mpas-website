import { industries } from '@/data/industries';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';

export function Industries() {
  return (
    <Section id="industries" tone="surface" labelledBy="industries-title" className="overflow-hidden">
      <Container>
        <SectionHeading
          index="04"
          label="Industry Sectors"
          titleId="industries-title"
          title="Sector depth across India’s growth engines."
          description="We bring working knowledge of the sectors driving India’s next decade — the policy, the players and the practicalities of getting things built."
        />
      </Container>

      {/* Mobile: edge-to-edge snap carousel. Tablet+: editorial grid. */}
      <Container className="mt-14 md:mt-24">
        <p className="eyebrow mb-5 text-text-muted md:hidden" aria-hidden>
          Swipe to explore →
        </p>
        <Reveal
          as="ul"
          stagger={0.08}
          className="no-scrollbar -mx-gutter flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-gutter px-gutter md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-3 lg:gap-8 lg:pb-16 lg:[&>*:nth-child(3n+2)]:translate-y-16"
        >
          {industries.map((industry, i) => (
            <li
              key={industry.id}
              tabIndex={0}
              aria-label={`${industry.name}: ${industry.description}`}
              className="group relative w-[78vw] max-w-sm shrink-0 snap-start overflow-hidden rounded-md bg-ink md:w-auto md:max-w-none"
            >
              <div className="media-frame aspect-[4/5] bg-ink">
                <img
                  src={industry.image}
                  alt=""
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="opacity-90 transition-[transform,opacity] duration-[1400ms] ease-expo group-hover:scale-[1.06] group-hover:opacity-100 group-focus-visible:scale-[1.06]"
                />
              </div>
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/25 to-ink/5" />

              <div aria-hidden className="absolute inset-0 flex flex-col justify-between p-6 text-white md:p-7">
                <span className="eyebrow text-white/75">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-outfit text-h3 text-white">{industry.name}</h3>
                  <div className="grid transition-[grid-template-rows] duration-700 ease-expo hover-device:grid-rows-[0fr] hover-device:group-hover:grid-rows-[1fr] hover-device:group-focus-visible:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="pt-3 text-small text-white/80">{industry.description}</p>
                    </div>
                  </div>
                  <span className="mt-5 block h-px w-full origin-left scale-x-[0.18] bg-[image:var(--gradient-green)] transition-transform duration-700 ease-expo group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                </div>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
