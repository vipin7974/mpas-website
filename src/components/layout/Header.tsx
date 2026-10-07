'use client';

import { useMemo, useRef, type RefObject } from 'react';
import { useSiteConfig } from '@/context/SiteConfig';
import { useAnchor } from '@/hooks/useAnchor';
import { useScrolled, useOverDark } from '@/hooks/useScrolled';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useGsap } from '@/hooks/useGsap';
import { gsap } from '@/lib/gsap';
import { useReady } from '@/lib/ready';
import { cn } from '@/lib/utils';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';

interface HeaderProps {
  menuOpen: boolean;
  onOpenMenu: () => void;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
}

export function Header({ menuOpen, onOpenMenu, menuButtonRef }: HeaderProps) {
  const { config } = useSiteConfig();
  const scrolled = useScrolled(24);
  const onDark = useOverDark();
  const anchor = useAnchor();
  const navItems = config.nav.items;
  const sectionIds = useMemo(
    () => [...navItems.map((n) => n.href), config.nav.contact.href].filter((h) => h.startsWith('#')).map((h) => h.slice(1)),
    [navItems, config.nav.contact.href],
  );
  const active = useActiveSection(sectionIds);
  const ready = useReady();
  const ref = useRef<HTMLElement>(null);

  useGsap(
    ({ scope }) => {
      if (!ready) {
        gsap.set(scope.querySelectorAll('[data-header-item]'), { autoAlpha: 0, y: -16 });
        return;
      }
      gsap.from(scope.querySelectorAll('[data-header-item]'), {
        autoAlpha: 0,
        y: -16,
        duration: 1.2,
        stagger: 0.06,
        delay: 0.35,
      });
    },
    ref,
    [ready],
  );

  return (
    <header ref={ref} className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-expo',
          onDark && !menuOpen
            ? 'border-white/10 bg-orange-soft/90 backdrop-blur-md'
            : scrolled && !menuOpen
            ? 'border-line/80 bg-canvas/85 backdrop-blur-md backdrop-saturate-150'
            : 'border-transparent bg-transparent',
        )}
      >
        <Container
          className={cn(
            'flex items-center justify-between gap-6 transition-[height] duration-500 ease-expo',
            scrolled ? 'h-header-compact' : 'h-header',
          )}
        >
          <a
            href={anchor('#top')}
            data-header-item
            className="shrink-0 rounded-xs"
            aria-label="Mahesh Palashikar Advisory Services — back to top"
          >
            <img
              src={config.brand.logo}
              alt="mpas"
              width={956}
              height={193}
              className={cn(
                'w-auto transition-[height,filter] duration-500 ease-expo',
                onDark && 'logo-mono-white',
                scrolled ? 'h-7 md:h-8' : 'h-8 md:h-9',
              )}
            />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.id} data-header-item>
                    <a
                      href={anchor(item.href)}
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'group relative block rounded-xs px-3 py-2 font-outfit text-[0.9375rem] transition-colors duration-300',
                        onDark
                          ? isActive
                            ? 'text-white'
                            : 'text-white/65 hover:text-white'
                          : isActive
                            ? 'text-ink'
                            : 'text-text-secondary hover:text-ink',
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          'absolute inset-x-3 bottom-1 h-px origin-left transition-transform duration-500 ease-expo',
                          onDark ? 'bg-white' : 'bg-mpas-orange',
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                        )}
                      />
                      <span
                        aria-hidden
                        className={cn(
                          'absolute -top-0.5 right-1.5 size-1 rounded-full bg-mpas-green-dark transition-opacity duration-300',
                          isActive ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2" data-header-item>
            <span className="hidden md:block">
              <Button href={anchor(config.nav.contact.href)} variant={onDark ? 'inverse' : 'primary'} className="h-11 px-5 text-small">
                {config.nav.contact.label}
              </Button>
            </span>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={onOpenMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="group -mr-2 flex h-11 items-center gap-3 rounded-xs px-2 lg:hidden"
            >
              <span className={cn('eyebrow', onDark ? 'text-white' : 'text-ink')}>Menu</span>
              <span aria-hidden className="flex w-6 flex-col items-end gap-[5px]">
                <span className={cn('h-px w-6', onDark ? 'bg-white' : 'bg-mpas-orange', ' transition-[width] duration-500 ease-expo group-hover:w-4')} />
                <span className={cn('h-px w-4', onDark ? 'bg-white' : 'bg-mpas-orange', ' transition-[width] duration-500 ease-expo group-hover:w-6')} />
              </span>
            </button>
          </div>
        </Container>
      </div>
    </header>
  );
}
