import { createElement, useRef, type ElementType, type ReactNode } from 'react';
import { gsap, motion, SplitText } from '@/lib/gsap';
import { useGsap } from '@/hooks/useGsap';

type Variant = 'up' | 'fade' | 'clip' | 'lines';

interface RevealProps {
  as?: ElementType;
  variant?: Variant;
  /** Animate direct children in sequence instead of the element itself. */
  stagger?: boolean | number;
  delay?: number;
  start?: string;
  className?: string;
  id?: string;
  children: ReactNode;
}

/**
 * Scroll-triggered entrance. Renders plain, visible markup; motion is layered on
 * only when reduced motion is not requested.
 *
 *  - up    fade + rise
 *  - fade  opacity only
 *  - clip  image curtain (clip-path) with the inner image settling from a slight zoom
 *  - lines masked line-by-line typography reveal
 */
export function Reveal({
  as = 'div',
  variant = 'up',
  stagger = false,
  delay = 0,
  start = motion.start,
  className,
  id,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGsap(
    ({ scope: el }) => {
      const scrollTrigger = { trigger: el, start, once: true };
      const each = typeof stagger === 'number' ? stagger : motion.stagger;
      const targets = stagger ? Array.from(el.children) : el;

      if (variant === 'up') {
        gsap.from(targets, { y: motion.distance, autoAlpha: 0, delay, stagger: stagger ? each : 0, scrollTrigger });
      }

      if (variant === 'fade') {
        gsap.from(targets, { autoAlpha: 0, duration: 1.4, delay, stagger: stagger ? each : 0, scrollTrigger });
      }

      if (variant === 'clip') {
        const img = el.querySelector('img');
        const tl = gsap.timeline({ scrollTrigger, delay });
        tl.fromTo(
          el,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' },
        );
        if (img) tl.from(img, { scale: 1.25, duration: 1.8, ease: 'expo.out' }, 0.1);
      }

      if (variant === 'lines') {
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 115,
              duration: 1.25,
              delay,
              stagger: 0.09,
              scrollTrigger,
            }),
        });
      }
    },
    ref,
  );

  return createElement(as, { ref, className, id }, children);
}
