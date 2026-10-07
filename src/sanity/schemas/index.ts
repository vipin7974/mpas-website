import type { SchemaTypeDefinition } from 'sanity';
import { biographyText, button, sectionHeading, seo, simpleText } from './objects';
import { industry, service, teamMember } from './content';
import { footer, homepage, navigation, siteSettings } from './singletons';

export const schemaTypes: SchemaTypeDefinition[] = [
  // documents
  homepage,
  siteSettings,
  navigation,
  footer,
  teamMember,
  service,
  industry,
  // building blocks
  button,
  seo,
  sectionHeading,
  simpleText,
  biographyText,
];

export const singletonTypes = ['homepage', 'siteSettings', 'navigation', 'footer'] as const;
