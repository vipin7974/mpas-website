import aboutImage from '@/assets/images/about-mumbai.webp';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { useSiteConfig } from '@/context/SiteConfig';
import { Reveal } from '@/components/common/Reveal';
import { Leadership } from '@/components/sections/Leadership';

const pillars = [
  {
    name: 'Capital',
    text: 'Connecting capital providers with credible India opportunities, and businesses with the right capital partners.',
  },
  {
    name: 'Capability',
    text: 'Bringing the sector, operational and policy depth needed to turn investment into enterprise.',
  },
  {
    name: 'Execution',
    text: 'Staying through delivery, so partnerships, supply chains and transformation create measurable value.',
  },
];

export function About() {
  const { config } = useSiteConfig();
  return (
    <Section id="about" labelledBy="about-title">
      <Container>
        <SectionHeading
          index="01"
          label={config.sectionHeadings['about'].label}
          titleId="about-title"
          title={config.sectionHeadings['about'].title}
          description={config.sectionHeadings['about'].description}
        />

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
          <Reveal variant="clip" className="media-frame aspect-[4/5] rounded-md lg:sticky lg:top-[calc(var(--spacing-header-compact)+2rem)]">
            <img
              src={config.media.about || aboutImage}
              alt="The Gateway of India, Mumbai, at sunset"
              width={1100}
              height={1466}
              loading="lazy"
              decoding="async"
            />
          </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal stagger className="space-y-6 text-body-lg text-text-secondary">
              <p>
                <strong className="font-medium text-ink">Mahesh Palashikar Advisory Services (mpas)</strong> provides
                senior-led strategic guidance to decision-makers navigating high-stakes industrial and capital
                decisions in India.
              </p>
              <p>
                We bring over 125 years of combined executive leadership experience across global industrial, energy,
                technology, and capital sectors. Built upon a foundation of proven leadership—including extensive
                tenures shaping global industrial enterprises and chairing NSE-listed company boards—mpas operates at
                the intersection of strategy, capital, partnerships, and execution.
              </p>
              <p>
                We deploy a lean, agile operating model. This ensures our clients engage directly with seasoned
                practitioners possessing deep domain expertise and extensive relationships across India’s regulatory,
                public sector, and industrial ecosystems.
              </p>
            </Reveal>

            <ol className="mt-14 border-t border-line md:mt-20">
              {pillars.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.name}
                  delay={i * 0.08}
                  className="group relative grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-7 md:grid-cols-[4rem_12rem_1fr] md:gap-x-6 md:py-8"
                >
                  <span
                    aria-hidden
                    className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-[image:var(--gradient-bridge)] transition-transform duration-700 ease-expo group-hover:scale-x-100"
                  />
                  <span className="eyebrow pt-1.5 text-mpas-green-dark">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-outfit text-h3 text-ink">{p.name}</h3>
                  <p className="col-start-2 mt-2 text-text-secondary md:col-start-3 md:mt-0 md:pt-1">{p.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
        <Leadership />
      </Container>
    </Section>
  );
}
