'use client';

import type { ReactNode } from 'react';
import { ArrowUp } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfig';
import { useAnchor } from '@/hooks/useAnchor';

import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { Reveal } from '@/components/common/Reveal';

function FooterColumn({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="eyebrow mb-5 text-ink/70">{title}</h2>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

const linkClass = 'link-underline text-small text-ink/85 transition-colors duration-300 hover:text-ink';

export function Footer() {
  const { config } = useSiteConfig();
  const anchor = useAnchor();
  const [firstWord, ...restWords] = config.footer.tagline.split(' ');
  const site = { ...config.brand, year: new Date().getFullYear() };
  const services = config.services;
  return (
    <footer data-header-theme="dark" className="relative bg-mpas-green text-ink" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Site footer
      </h2>
      <div aria-hidden className="bridge-rule" />

      <Container className="pb-10 pt-20 md:pt-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <img
              src={config.brand.logo}
              alt="mpas"
              width={956}
              height={193}
              loading="lazy"
              className="logo-mono-ink h-9 w-auto md:h-10"
            />
            <Reveal as="p" variant="lines" className="mt-10 max-w-md font-outfit text-h3 font-light text-ink">
              <span className="font-extralight text-ink/65">{firstWord}</span> {restWords.join(' ')}
            </Reveal>
            <div className="mt-10">
              <Button href={anchor('#contact')} variant="primary">
                {config.footer.buttonLabel}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-12 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            <FooterColumn title="Explore">
              {config.nav.items.map((item) => (
                <li key={item.id}>
                  <a href={anchor(item.href)} className={linkClass} {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {item.label}
                  </a>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Strategic Capabilities">
              {services.map((s) => (
                <li key={s.id}>
                  <a href={anchor('#what-we-do')} className={linkClass}>
                    {s.title}
                  </a>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Contact" className="min-[480px]:col-span-2 sm:col-span-1">
              <li>
                <a href={`mailto:${site.email}`} className={`${linkClass} break-words`}>
                  {site.email}
                </a>
              </li>
              {site.phone && (
                <li>
                  <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} className={linkClass}>
                    {site.phone}
                  </a>
                </li>
              )}
              <li className="text-small text-ink/85">{site.location}</li>
              {config.social.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={anchor('#contact')} className={linkClass}>
                  Enquiry form
                </a>
              </li>
            </FooterColumn>
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse gap-6 border-t border-ink/25 pt-8 md:mt-28 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="text-micro tracking-normal text-ink/70">
              © {site.year} {site.name}. {config.footer.copyright}
            </p>
            {config.footer.legalLinks.map((l) => (
              <a key={l.url} href={l.url} className="link-underline text-micro tracking-normal text-ink/70 hover:text-ink">
                {l.label}
              </a>
            ))}
            <p className="text-micro tracking-normal text-ink/60">
              Developed and managed by{' '}
              <a
                href="https://googlixlabs.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-ink/70 transition-colors duration-300 hover:text-ink"
              >
                Googlix Labs
              </a>
            </p>
          </div>
          <a
            href="#top"
            className="group inline-flex items-center gap-3 self-start font-outfit text-small text-ink/85 transition-colors hover:text-ink md:self-auto"
          >
            Back to top
            <span className="flex size-9 items-center justify-center rounded-full border border-ink/30 transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
              <ArrowUp className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5" strokeWidth={1.5} aria-hidden />
            </span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
