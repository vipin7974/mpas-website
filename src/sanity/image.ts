import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImage } from './types';
import { dataset, projectId } from './env';

const builder = createImageUrlBuilder({ projectId, dataset });

/** Responsive, optimised CDN url that respects the editor's crop and focal point. */
export function imageUrl(image: SanityImage | null | undefined, width: number): string {
  if (!image?.asset) return '';
  return builder.image(image).width(width).auto('format').quality(80).url();
}
