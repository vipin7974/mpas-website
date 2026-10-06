import { useRef } from 'react';
import heroImage from '@/assets/images/mumbai_bridge.webp';
import { useGsap } from '@/hooks/useGsap';
import { gsap } from '@/lib/gsap';
import { useReady } from '@/lib/ready';
import { Container } from '@/components/common/Container';
import { useSiteConfig } from '@/context/SiteConfig';
import { Button } from '@/components/common/Button';

/** Soft angled planes echoing the brand book cover. Purely decorative. */
function HeroPlanes() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="#1d2226">
        <polygon data-plane points="760,0 1040,0 1440,330 1440,560" opacity="0.028" />
        <polygon data-plane points="980,0 1180,0 1440,210 1440,370" opacity="0.035" />
        <polygon data-plane points="0,420 0,640 520,900 760,900" opacity="0.025" />
        <polygon data-plane points="1100,900 1440,620 1440,900" opacity="0.02" />
      </g>
    </svg>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const ready = useReady();
  const { config } = useSiteConfig();

  useGsap(
    ({ scope }) => {
      const q = gsap.utils.selector(scope);
      if (!ready) {
        gsap.set(q('[data-hero-line]'), { yPercent: 110 });
        gsap.set(q('[data-hero-fade]'), { autoAlpha: 0, y: 24 });
        gsap.set(q('[data-hero-media]'), { clipPath: 'inset(100% 0% 0% 0%)' });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.fromTo(q('[data-hero-line]'), { yPercent: 110 }, { yPercent: 0, duration: 1.5, stagger: 0.11 }, 0.05)
        .fromTo(
          q('[data-hero-media]'),
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' },
          0.2,
        )
        .from(q('[data-hero-img]'), { scale: 1.3, duration: 2.2 }, 0.35)
        .fromTo(q('[data-hero-fade]'), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08 }, 0.7)
        .from(q('[data-plane]'), { autoAlpha: 0, x: 60, duration: 2.4, stagger: 0.1 }, 0.2);

      // Gentle parallax as the hero leaves the viewport.
      gsap.to(q('[data-hero-img-wrap]'), {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(q('[data-hero-heading]'), {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    ref,
    [ready],
  );

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-canvas pb-16 pt-[calc(var(--spacing-header)+2.5rem)] md:pb-24 lg:pt-[calc(var(--spacing-header)+3.5rem)]"
    >
      <HeroPlanes />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <div data-hero-heading>
              <p data-hero-fade className="eyebrow mb-8 flex items-center gap-3 text-text-secondary md:mb-10">
                <span aria-hidden className="bridge-rule w-8" />
                {config.hero.eyebrow}
              </p>

              <h1 id="hero-title" className="font-outfit text-hero text-ink">
                <span className="block overflow-hidden pb-[0.06em]">
                  <span data-hero-line className="block font-extralight text-text-secondary">
                    {config.hero.lines[0]}
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.06em]">
                  <span data-hero-line className="block font-normal">
                    {config.hero.lines[1]}
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.08em]">
                  <span data-hero-line className="block font-normal">
                    {config.hero.lines[2].replace(/\.$/, '')}
                    <span className="text-mpas-orange-red">.</span>
                  </span>
                </span>
              </h1>
            </div>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <p data-hero-fade className="max-w-md text-body-lg text-text-secondary">
              {config.hero.description}
            </p>
            <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-10">
              <Button href="#what-we-do">{config.hero.primaryCta}</Button>
              <Button href="#contact" variant="link">
                Talk to us
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <figure>
            <div
              data-hero-media
              className="media-frame aspect-[4/3] rounded-md sm:aspect-[16/9] lg:aspect-[21/9]"
            >
              <div data-hero-img-wrap className="absolute inset-x-0 -top-[8%] h-[116%]">
                <img
                  data-hero-img
                  src={config.media.hero || heroImage}
                  alt="Glass office towers rising into a clear sky"
                  width={2200}
                  height={1467}
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/50 via-ink/0 to-ink/0" />
              <div
                aria-hidden
                data-hero-fade
                className="absolute bottom-0 left-0 flex w-full items-end justify-between gap-4 p-5 text-white md:p-8"
              >
                <span className="eyebrow">Strategy · Partnerships · Execution</span>
                <span className="eyebrow hidden sm:inline">For Viksit Bharat</span>
              </div>
            </div>
          </figure>
        </div>
      </Container>
    </section>
  );
}
