'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** 1440px site container with fluid gutters. */
export function Container({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-site px-gutter', className)}>{children}</div>;
}

/** 12-column editorial grid used throughout the site. */
export function Grid({ children, className }: ContainerProps) {
  return (
    <div className={cn('grid grid-cols-4 gap-x-5 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-8', className)}>
      {children}
    </div>
  );
}
