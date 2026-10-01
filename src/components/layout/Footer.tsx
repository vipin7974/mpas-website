import type { ReactNode } from 'react';
import { ArrowUp } from 'lucide-react';
import logo from '@/assets/branding/mpas-logo-horizontal.png';
import { navigation, contactNav } from '@/data/navigation';
import { services } from '@/data/services';
import { site } from '@/data/site';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { Reveal } from '@/components/common/Reveal';

function FooterColumn({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="eyebrow mb-5 text-text-inverse-muted">{title}</h2>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

const linkClass = 'link-underline text-small text-white/80 transition-colors duration-300 hover:text-white';

export function Footer() {
  return (
    <footer data-header-theme="dark" className="relative bg-ink text-text-inverse" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Site footer
      </h2>
      <div aria-hidden className="bridge-rule" />

      <Container className="pb-10 pt-20 md:pt-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <img
              src={logo}
              alt="MPAS"
              width={956}
              height={193}
              loading="lazy"
              className="logo-mono-white h-9 w-auto md:h-10"
            />
            <Reveal as="p" variant="lines" className="mt-10 max-w-md font-outfit text-h3 font-light text-white">
              <span className="font-extralight text-white/70">Bridging</span> Capital, Capability, Execution for
              Viksit Bharat.
            </Reveal>
            <div className="mt-10">
              <Button href={contactNav.href} variant="outline-inverse">
                Start a conversation
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            <FooterColumn title="Explore">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="What We Do">
              {services.map((s) => (
                <li key={s.id}>
                  <a href="#what-we-do" className={linkClass}>
                    {s.title}
                  </a>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Contact" className="col-span-2 sm:col-span-1">
              <li>
                <a href={`mailto:${site.email}`} className={`${linkClass} break-words`}>
                  {site.email}
                </a>
              </li>
              <li className="text-small text-white/80">{site.location}</li>
              <li>
                <a href={contactNav.href} className={linkClass}>
                  Enquiry form
                </a>
              </li>
            </FooterColumn>
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse gap-6 border-t border-ink-line pt-8 md:mt-28 md:flex-row md:items-center md:justify-between">
          <p className="text-micro tracking-normal text-text-inverse-muted">
            © {site.year} {site.name}. All rights reserved.
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-3 self-start font-outfit text-small text-white/80 transition-colors hover:text-white md:self-auto"
          >
            Back to top
            <span className="flex size-9 items-center justify-center rounded-full border border-white/20 transition-colors duration-500 group-hover:border-mpas-green group-hover:bg-mpas-green group-hover:text-ink">
              <ArrowUp className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5" strokeWidth={1.5} aria-hidden />
            </span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
