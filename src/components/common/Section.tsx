'use client';

import { forwardRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'canvas' | 'surface' | 'ink';

interface SectionProps {
  id?: string;
  tone?: Tone;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
  /** Remove default vertical padding (for full-bleed sections). */
  flush?: boolean;
}

const toneClass: Record<Tone, string> = {
  canvas: 'bg-canvas text-text-primary',
  surface: 'bg-surface text-text-primary',
  ink: 'bg-mpas-green text-ink',
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { id, tone = 'canvas', labelledBy, className, children, flush = false },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative', toneClass[tone], !flush && 'py-section', className)}
    >
      {children}
    </section>
  );
});
