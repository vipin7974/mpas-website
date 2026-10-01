import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import logo from '@/assets/branding/mpas-logo-horizontal.png';
import { navigation, contactNav } from '@/data/navigation';
import { site } from '@/data/site';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { Container } from '@/components/common/Container';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}

const items = [...navigation, contactNav];

export function MobileMenu({ open, onClose, returnFocusRef }: MobileMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [mounted, setMounted] = useState(false);

  // Mount before opening so the timeline has something to animate.
  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  // Build the open/close timeline once the panel is in the DOM.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!mounted || !root) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'expo.out' },
        onReverseComplete: () => setMounted(false),
      });
      tl.fromTo(
        root,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut' },
      )
        .from('[data-menu-bar]', { autoAlpha: 0, y: -12, duration: 0.6 }, 0.45)
        .from('[data-menu-link]', { yPercent: 110, duration: 1, stagger: 0.055 }, 0.5)
        .from('[data-menu-rule]', { scaleX: 0, transformOrigin: 'left', duration: 1.1, stagger: 0.055 }, 0.5)
        .from('[data-menu-foot]', { autoAlpha: 0, y: 16, duration: 0.8 }, 0.8);
      tlRef.current = tl;
    }, root);

    return () => ctx.revert();
  }, [mounted]);

  // Play / reverse.
  useLayoutEffect(() => {
    const tl = tlRef.current;
    if (!mounted) return;
    if (prefersReducedMotion() || !tl) {
      if (!open) setMounted(false);
      return;
    }
    if (open) tl.timeScale(1).play();
    else tl.timeScale(1.6).reverse();
  }, [open, mounted]);

  // Focus, scroll lock, Escape and focus trap.
  useEffect(() => {
    if (!open || !mounted) return;
    const root = rootRef.current;
    document.body.classList.add('is-locked');
    const first = root?.querySelector<HTMLElement>('[data-menu-link]');
    first?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !root) return;
      const focusables = Array.from(root.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      if (!focusables.length) return;
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    const returnTo = returnFocusRef.current;
    return () => {
      document.body.classList.remove('is-locked');
      document.removeEventListener('keydown', onKey);
      returnTo?.focus({ preventScroll: true });
    };
  }, [open, mounted, onClose, returnFocusRef]);

  // Close automatically if the viewport grows to desktop.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && onClose();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div
      ref={rootRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-canvas lg:hidden"
    >
      <Container className="flex h-header shrink-0 items-center justify-between" >
        <div data-menu-bar className="flex w-full items-center justify-between">
          <img src={logo} alt="MPAS" width={956} height={193} className="h-8 w-auto md:h-9" />
          <button
            type="button"
            onClick={onClose}
            className="group -mr-2 flex h-11 items-center gap-3 rounded-xs px-2"
          >
            <span className="eyebrow text-ink">Close</span>
            <X className="size-5 text-ink transition-transform duration-500 ease-expo group-hover:rotate-90" strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      </Container>

      <Container className="flex flex-1 flex-col justify-between pb-8 pt-6 md:pt-10">
        <nav aria-label="Mobile">
          <ul>
            {items.map((item, i) => (
              <li key={item.id} className="relative">
                <span data-menu-rule aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line" />
                <div className="overflow-hidden">
                  <a
                    data-menu-link
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-baseline gap-4 py-3.5 font-outfit text-[clamp(1.875rem,1.2rem+3.4vw,3.25rem)] font-light leading-tight tracking-[-0.02em] text-ink md:py-4"
                  >
                    <span className="w-7 font-outfit text-micro font-medium tracking-[0.14em] text-mpas-green-dark">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="transition-transform duration-500 ease-expo group-hover:translate-x-2 group-focus-visible:translate-x-2">
                      {item.label}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={1.25}
                      className="ml-auto size-6 self-center text-text-muted opacity-0 transition-all duration-500 ease-expo group-hover:opacity-100 group-focus-visible:opacity-100"
                    />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <div data-menu-foot className="mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-outfit text-body-lg text-text-secondary">
              <span className="font-extralight">Bridging</span> Capital, Capability, Execution
            </p>
            <a href={`mailto:${site.email}`} className="link-underline mt-2 inline-block text-small text-text-secondary">
              {site.email}
            </a>
          </div>
          <div aria-hidden className="bridge-rule w-full md:w-48" />
        </div>
      </Container>
    </div>
  );
}
