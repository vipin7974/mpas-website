import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { client } from '@/sanity/client';

/** Called by the admin's Preview tool to show unpublished drafts to the signed-in editor. */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
});
