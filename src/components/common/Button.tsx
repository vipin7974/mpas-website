import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'inverse' | 'outline-inverse' | 'link' | 'link-inverse';

interface BaseProps {
  variant?: Variant;
  icon?: ReactNode | false;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = BaseProps & Omit<ComponentPropsWithoutRef<'a'>, keyof BaseProps> & { href: string };
type ButtonAsButton = BaseProps & Omit<ComponentPropsWithoutRef<'button'>, keyof BaseProps> & { href?: undefined };
export type ButtonProps = ButtonAsLink | ButtonAsButton;

const solid =
  'relative isolate inline-flex h-13 items-center gap-3 overflow-hidden rounded-sm px-6 font-outfit text-[0.9375rem] font-medium tracking-[0.01em] transition-colors duration-500 ease-expo ' +
  // fill wipe
  'before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:transition-transform before:duration-600 before:ease-expo hover:before:scale-x-100 focus-visible:before:scale-x-100';

const variants: Record<Variant, string> = {
  primary: cn(solid, 'bg-mpas-orange text-white before:bg-mpas-green-dark'),
  outline: cn(solid, 'border border-ink/25 text-ink before:bg-mpas-orange hover:border-ink hover:text-white focus-visible:text-white'),
  inverse: cn(solid, 'bg-white text-ink before:bg-mpas-green'),
  'outline-inverse': cn(
    solid,
    'border border-white/30 text-white before:bg-white hover:border-white hover:text-ink focus-visible:text-ink',
  ),
  link: 'inline-flex items-center gap-2.5 py-1 font-outfit text-small font-medium uppercase tracking-[0.12em] text-ink',
  'link-inverse':
    'inline-flex items-center gap-2.5 py-1 font-outfit text-small font-medium uppercase tracking-[0.12em] text-white',
};

/** Arrow that slides out to the right while a twin slides in from the left. */
export function ArrowSwap({ icon }: { icon?: ReactNode }) {
  const glyph = icon ?? <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden />;
  return (
    <span className="relative inline-flex size-4 overflow-hidden" aria-hidden>
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-expo group-hover:translate-x-[140%] group-focus-visible:translate-x-[140%]">
        {glyph}
      </span>
      <span className="absolute inset-0 flex -translate-x-[140%] items-center justify-center transition-transform duration-500 ease-expo group-hover:translate-x-0 group-focus-visible:translate-x-0">
        {glyph}
      </span>
    </span>
  );
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', icon, className, children, ...rest } = props;
  const isLink = variant === 'link' || variant === 'link-inverse';
  const content = (
    <>
      <span className={cn(isLink && 'link-underline')}>{children}</span>
      {icon !== false && <ArrowSwap icon={icon} />}
    </>
  );
  const classes = cn('group', variants[variant], className);

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as ComponentPropsWithoutRef<'a'>)}>
        {content}
      </a>
    );
  }
  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<'button'>)} type={(rest as { type?: 'button' | 'submit' }).type ?? 'button'}>
      {content}
    </button>
  );
}
