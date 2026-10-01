import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

gsap.defaults({ ease: 'expo.out', duration: 1.1 });

/** Media query used to gate every non-essential animation. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Shared timings so motion feels like one system. */
export const motion = {
  ease: 'expo.out',
  easeInOut: 'expo.inOut',
  duration: 1.1,
  stagger: 0.08,
  distance: 40,
  start: 'top 85%',
} as const;

export { gsap, ScrollTrigger, SplitText };
