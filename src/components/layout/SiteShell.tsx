'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ScrollTrigger } from '@/lib/gsap';
import { ReadyContext } from '@/lib/ready';
import { Header } from '@/components/layout/Header';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { Footer } from '@/components/layout/Footer';
import { Loader } from '@/components/layout/Loader';
import { ScrollProgress } from '@/components/layout/ScrollProgress';

/** Page chrome shared by every website page: intro loader, header, menu, footer. */
export function SiteShell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const onLoaded = useCallback(() => setReady(true), []);

  // Recalculate trigger positions once images and fonts have settled.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === 'complete') refresh();
    else window.addEventListener('load', refresh, { once: true });
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  // Deep links such as /#leadership arrive before the sections are laid out; scroll once the intro is done.
  useEffect(() => {
    if (!ready || !window.location.hash) return;
    const el = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (el) requestAnimationFrame(() => el.scrollIntoView());
  }, [ready]);

  return (
    <ReadyContext.Provider value={ready}>
      <a
        href="#main"
        className="sr-only z-[200] rounded-sm bg-mpas-orange px-4 py-3 text-small text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Loader onDone={onLoaded} />
      <ScrollProgress />
      <Header menuOpen={menuOpen} onOpenMenu={openMenu} menuButtonRef={menuButtonRef} />
      <MobileMenu open={menuOpen} onClose={closeMenu} returnFocusRef={menuButtonRef} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </ReadyContext.Provider>
  );
}
