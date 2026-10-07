'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { client } from '@/sanity/client';

/**
 * Updates an already-open page when an editor publishes, with no manual reload.
 *
 * Sanity announces published changes; the webhook refreshes the server cache a moment later,
 * so the page re-fetches after a short delay (twice, to cover a slower webhook).
 * Only data is refreshed — scroll position and open menus are kept.
 */
export function LiveRefresh() {
  const router = useRouter();

  useEffect(() => {
    const timers: number[] = [];
    const subscription = client.live.events({ includeDrafts: false }).subscribe({
      next: (event) => {
        if (event.type !== 'message') return;
        timers.push(window.setTimeout(() => router.refresh(), 1500));
        timers.push(window.setTimeout(() => router.refresh(), 5000));
      },
      error: () => {
        /* Live updates are a convenience; the page keeps working and refreshes hourly regardless. */
      },
    });
    return () => {
      subscription.unsubscribe();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [router]);

  return null;
}
