import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { services, type Service } from '@/data/services';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { cn } from '@/lib/utils';

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <article className="group">
      <Reveal variant="clip" className="media-frame aspect-[3/2] rounded-md">
        <img
          src={service.image}
          alt={service.imageAlt}
          width={1400}
          height={933}
          loading="lazy"
          decoding="async"
          className="transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.04]"
        />
        <span className="eyebrow absolute left-5 top-5 rounded-xs bg-canvas/90 px-2.5 py-1.5 text-ink backdrop-blur-sm md:left-6 md:top-6">
          {String(index + 1).padStart(2, '0')}
        </span>
      </Reveal>

      <Reveal className="mt-7 md:mt-8">
        <h3 className="font-outfit text-h2 font-light text-ink">{service.title}</h3>
        <p className="mt-4 max-w-lg text-text-secondary">{service.summary}</p>

        <div
          id={panelId}
          className={cn(
            'grid transition-[grid-template-rows,opacity] duration-700 ease-expo',
            open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
          )}
          aria-hidden={!open}
          inert={!open}
        >
          <div className="overflow-hidden">
            <ul className="mt-6 grid gap-x-6 gap-y-3 border-t border-line pt-6 sm:grid-cols-2">
              {service.points.map((point) => (
                <li key={point} className="flex gap-3 text-small text-text-secondary">
                  <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-mpas-green-dark" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="group/btn mt-6 inline-flex items-center gap-3 py-1 font-outfit text-small font-medium uppercase tracking-[0.12em] text-ink"
        >
          <span className="link-underline group-hover/btn:bg-[length:100%_1px]">{open ? 'Show less' : 'Read more'}</span>
          <span className="flex size-8 items-center justify-center rounded-full border border-ink/20 transition-colors duration-500 group-hover/btn:border-ink group-hover/btn:bg-ink group-hover/btn:text-white">
            <Plus
              aria-hidden
              strokeWidth={1.5}
              className={cn('size-4 transition-transform duration-500 ease-expo', open && 'rotate-45')}
            />
          </span>
        </button>
      </Reveal>
    </article>
  );
}

export function WhatWeDo() {
  return (
    <Section id="what-we-do" labelledBy="what-we-do-title">
      <Container>
        <SectionHeading
          index="03"
          label="What We Do"
          titleId="what-we-do-title"
          title="From boardroom advisory to execution on the ground."
          description="Four integrated practices, one senior team. We shape the strategy, assemble the partnerships and capital, and stay through delivery."
        />

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-24 md:grid-cols-2 md:gap-y-20 lg:gap-x-16 lg:pb-32 lg:[&>*:nth-child(even)]:translate-y-32">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
