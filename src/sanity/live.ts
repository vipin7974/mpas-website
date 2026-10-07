import { draftMode } from 'next/headers';
import { client } from './client';

type FetchOptions = { query: string; params?: Record<string, unknown>; tags?: string[] };

/**
 * Single entry point for all content reads.
 *  - Normal visitors: published content, cached and invalidated by tag (see /api/revalidate).
 *  - Preview mode (editors only): unpublished drafts, never cached.
 */
export async function sanityFetch<T>({ query, params = {}, tags = ['sanity'] }: FetchOptions): Promise<T> {
  const { isEnabled } = await draftMode();
  if (isEnabled) {
    const token = process.env.SANITY_API_READ_TOKEN;
    if (token) {
      return client
        .withConfig({ token, useCdn: false, perspective: 'drafts', stega: false })
        .fetch<T>(query, params, { cache: 'no-store' });
    }
  }
  return client.fetch<T>(query, params, { next: { tags, revalidate: 3600 } });
}
