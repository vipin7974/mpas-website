import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  /** Two-digit section index, e.g. "01". */
  index: string;
  label: string;
  title: ReactNode;
  titleId: string;
  description?: ReactNode;
  tone?: 'light' | 'dark';
  /**
   * split   — eyebrow in the left column, heading on the right (brand-book "01 / ABOUT US" composition)
   * stacked — eyebrow above heading
   */
  layout?: 'split' | 'stacked';
  className?: string;
  children?: ReactNode;
}

export function Eyebrow({ index, label, tone = 'light' }: { index: string; label: string; tone?: 'light' | 'dark' }) {
  return (
    <Reveal variant="fade" className={cn('eyebrow flex items-center gap-3', tone === 'dark' ? 'text-text-inverse-muted' : 'text-text-secondary')}>
      <span className={tone === 'dark' ? 'text-mpas-green' : 'text-mpas-green-dark'}>{index}</span>
      <span aria-hidden className={cn('h-px w-8', tone === 'dark' ? 'bg-white/25' : 'bg-mpas-orange/20')} />
      <span>{label}</span>
    </Reveal>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  titleId,
  description,
  tone = 'light',
  layout = 'split',
  className,
  children,
}: SectionHeadingProps) {
  const dark = tone === 'dark';

  const heading = (
    <>
      <Reveal as="h2" variant="lines" id={titleId} className={cn('text-h1 font-light', dark ? 'text-white' : 'text-ink')}>
        {title}
      </Reveal>
      {description && (
        <Reveal
          as="p"
          delay={0.15}
          className={cn('mt-6 max-w-copy text-body-lg md:mt-8', dark ? 'text-text-inverse-muted' : 'text-text-secondary')}
        >
          {description}
        </Reveal>
      )}
      {children}
    </>
  );

  if (layout === 'stacked') {
    return (
      <header className={className}>
        <div className="mb-8 md:mb-10">
          <Eyebrow index={index} label={label} tone={tone} />
        </div>
        {heading}
      </header>
    );
  }

  return (
    <header className={cn('grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-8', className)}>
      <div className="lg:col-span-4 lg:pt-4">
        <Eyebrow index={index} label={label} tone={tone} />
      </div>
      <div className="lg:col-span-8">{heading}</div>
    </header>
  );
}
