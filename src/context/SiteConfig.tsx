'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { SiteContent } from '@/sanity/types';

const SiteConfigContext = createContext<{ config: SiteContent } | null>(null);

/** Hands the CMS content (resolved on the server) to every section. */
export function SiteConfigProvider({ content, children }: { content: SiteContent; children: ReactNode }) {
  return <SiteConfigContext.Provider value={{ config: content }}>{children}</SiteConfigContext.Provider>;
}

export function useSiteConfig() {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) throw new Error('useSiteConfig must be used inside SiteConfigProvider');
  return ctx;
}
