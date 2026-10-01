import { useLayoutEffect, type DependencyList, type RefObject } from 'react';
import { gsap, MOTION_OK } from '@/lib/gsap';

/**
 * Runs GSAP code scoped to `scope` and reverts everything on unmount.
 * The callback only runs when the user has not asked for reduced motion,
 * so the static layout is always the accessible fallback.
 */
export function useGsap(
  callback: (ctx: { scope: HTMLElement }) => void | (() => void),
  scope: RefObject<HTMLElement | null>,
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(MOTION_OK, () => callback({ scope: el }));
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
