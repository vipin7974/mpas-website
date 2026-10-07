'use client';

import { usePathname } from 'next/navigation';

/** On standalone pages (e.g. a profile), in-page anchors must point back to the homepage. */
export function useAnchor() {
  const pathname = usePathname();
  return (href: string) => (href.startsWith('#') && pathname !== '/' ? `/${href}` : href);
}
