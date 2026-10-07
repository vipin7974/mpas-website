import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from './env';

/** Read-only public client. Safe for the browser: it only sees published content. */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
