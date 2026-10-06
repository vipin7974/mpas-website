import { useRef, useState } from 'react';
import earth from '@/assets/images/markets-earth.webp';
import { markets } from '@/data/markets';
import { useGsap } from '@/hooks/useGsap';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { useSiteConfig } from '@/context/SiteConfig';
import { Reveal } from '@/components/common/Reveal';

const VIEW = { w: 1000, h: 700 };
const INDIA = { x: 790, y: 350 };
const NODE_X = 300;
const nodeY = (i: number) => 95 + i * 102;
const arcPath = (y: number) => {
  const cx = (NODE_X + INDIA.x) / 2;
  const cy = Math.min(y, INDIA.y) - 150;
  return `M${NODE_X} ${y} Q${cx} ${cy} ${INDIA.x} ${INDIA.y}`;
};

function CorridorDiagram({ active }: { active: string | null }) {
  return (
    <svg
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Diagram of market corridors connecting North America, the United Kingdom and Europe, the Middle East, Japan and East Asia, Southeast Asia, and Australia with India."
    >
      <defs>
        <linearGradient id="arc-grad" x1="0" x2="1">
          <stop offset="0" stopColor="#8ec640" />
          <stop offset="0.55" stopColor="#39b54a" />
          <stop offset="1" stopColor="#f7941d" />
        </linearGradient>
        <radialGradient id="india-glow">
          <stop offset="0" stopColor="#f7941d" stopOpacity="0.45" />
          <stop offset="1" stopColor="#f7941d" stopOpacity="0" />
        </radialGradient>
      </defs>

      {markets.map((m, i) => {
        const y = nodeY(i);
        const dim = active !== null && active !== m.id;
        const on = active === m.id;
        return (
          <g key={m.id} className="transition-opacity duration-500" opacity={dim ? 0.22 : 1}>
            <path
              data-arc
              d={arcPath(y)}
              pathLength={1}
              fill="none"
              stroke="url(#arc-grad)"
              strokeWidth={on ? 2.5 : 1.25}
              strokeLinecap="round"
              className="transition-[stroke-width] duration-500"
            />
            <circle data-node cx={NODE_X} cy={y} r={on ? 7 : 5} fill="#8ec640" className="transition-all duration-500" />
            <circle cx={NODE_X} cy={y} r={14} fill="none" stroke="#8ec640" strokeOpacity={on ? 0.6 : 0.2} />
            <text
              x={NODE_X - 30}
              y={y + 8}
              textAnchor="end"
              className="fill-white font-outfit text-[26px] font-light md:text-[22px]"
            >
              <tspan className="fill-mpas-green font-medium">{String(i + 1).padStart(2, '0')}</tspan>
              <tspan className="hidden md:inline" dx="12">
                {m.short}
              </tspan>
            </text>
          </g>
        );
      })}

      <circle cx={INDIA.x} cy={INDIA.y} r={90} fill="url(#india-glow)" />
      <circle cx={INDIA.x} cy={INDIA.y} r={20} fill="none" stroke="#f7941d" strokeOpacity="0.5" className="origin-center animate-[pulse-ring_2.8s_cubic-bezier(0.16,1,0.3,1)_infinite] [transform-box:fill-box]" />
      <circle data-node cx={INDIA.x} cy={INDIA.y} r={10} fill="#f15a29" />
      <text x={INDIA.x} y={INDIA.y + 58} textAnchor="middle" className="fill-white font-outfit text-[30px] font-normal">
        India
      </text>
    </svg>
  );
}

export function Markets() {
  const { config } = useSiteConfig();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useGsap(
    ({ scope }) => {
      const panel = scope.querySelector('[data-diagram]');
      gsap.fromTo(
        scope.querySelectorAll('[data-arc]'),
        { strokeDasharray: 1, strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'expo.inOut',
          stagger: 0.12,
          scrollTrigger: { trigger: panel, start: 'top 70%', once: true },
        },
      );
      gsap.from(scope.querySelectorAll('[data-node]'), {
        scale: 0,
        transformOrigin: 'center',
        duration: 1,
        stagger: 0.08,
        scrollTrigger: { trigger: panel, start: 'top 70%', once: true },
      });
    },
    ref,
  );

  return (
    <Section ref={ref} id="markets" labelledBy="markets-title">
      <Container>
        <SectionHeading
          index="06"
          label={config.sectionHeadings['markets'].label}
          titleId="markets-title"
          title={config.sectionHeadings['markets'].title}
          description={config.sectionHeadings['markets'].description}
        />

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 lg:grid-cols-12 lg:items-center lg:gap-8">
          <Reveal
            variant="clip"
            className="media-frame order-1 aspect-[10/7] rounded-lg bg-orange-soft lg:order-2 lg:col-span-7 lg:col-start-6"
          >
            <div data-diagram className="absolute inset-0">
              <img src={config.media.markets || earth} alt="" width={2000} height={1331} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-45" />
              <div aria-hidden className="absolute inset-0 bg-linear-to-r from-ink/85 via-ink/55 to-ink/30" />
              <CorridorDiagram active={active} />
              <p className="eyebrow absolute bottom-5 left-5 text-white/60 md:bottom-7 md:left-7">Corridors into India</p>
            </div>
          </Reveal>

          <ol className="order-2 border-t border-line lg:order-1 lg:col-span-5" onMouseLeave={() => setActive(null)}>
            {markets.map((m, i) => (
              <Reveal
                as="li"
                key={m.id}
                delay={i * 0.05}
                className="border-b border-line"
              >
                <div
                  onMouseEnter={() => setActive(m.id)}
                  className={cn(
                    'flex items-baseline gap-5 py-5 transition-[padding,color] duration-500 ease-expo',
                    active === m.id && 'pl-2',
                  )}
                >
                  <span className="eyebrow w-6 shrink-0 text-mpas-green-dark">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-outfit text-[1.25rem] leading-snug text-ink md:text-[1.375rem]">{m.name}</h3>
                    <p className="mt-1 text-small text-text-secondary">{m.focus}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
