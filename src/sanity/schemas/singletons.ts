import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons/Cog';
import { HomeIcon } from '@sanity/icons/Home';
import { MenuIcon } from '@sanity/icons/Menu';
import { ThListIcon } from '@sanity/icons/ThList';
import { imageField, linkFields } from './shared';

const socialUrl = (name: string, title: string, example: string) =>
  defineField({ name, title, type: 'url', group: 'social', description: `Leave empty if not used. e.g. ${example}`, validation: (Rule) => Rule.uri({ scheme: ['https'] }).error('Please paste the full address starting with https://') });

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Website settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'brand', title: 'Brand', default: true },
    { name: 'contact', title: 'Contact details' },
    { name: 'social', title: 'Social links' },
    { name: 'seo', title: 'Search & sharing' },
  ],
  fields: [
    defineField({ name: 'brandName', title: 'Company name', type: 'string', group: 'brand', validation: (Rule) => Rule.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', group: 'brand', description: 'Short slogan used in the website menu and footer.' }),
    imageField('logo', 'Logo', { description: 'Optional. If empty, the standard mpas logo is used. A PNG with a transparent background works best.', recommended: '956 × 193', group: 'brand' }),
    defineField({ name: 'email', title: 'Public email', type: 'string', group: 'contact', description: 'Shown on the website; enquiries are sent here.', validation: (Rule) => Rule.required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: 'email' }).error('Please enter a valid email address.') }),
    defineField({ name: 'phone', title: 'Phone', type: 'string', group: 'contact', description: 'Optional.' }),
    defineField({ name: 'location', title: 'Location', type: 'string', group: 'contact', description: 'e.g. “Mumbai, India”.' }),
    socialUrl('linkedin', 'LinkedIn', 'https://www.linkedin.com/company/…'),
    socialUrl('instagram', 'Instagram', 'https://www.instagram.com/…'),
    socialUrl('youtube', 'YouTube', 'https://www.youtube.com/@…'),
    socialUrl('x', 'X (Twitter)', 'https://x.com/…'),
    socialUrl('facebook', 'Facebook', 'https://www.facebook.com/…'),
    defineField({ name: 'defaultSeo', title: 'Default search & sharing', type: 'seo', group: 'seo', description: 'Used for any page that does not have its own.' }),
  ],
  preview: { prepare: () => ({ title: 'Website settings' }) },
});

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero (top)', default: true },
    { name: 'about', title: 'Who We Are' },
    { name: 'leadership', title: 'Leadership' },
    { name: 'capabilities', title: 'Strategic Capabilities' },
    { name: 'industries', title: 'Industry Sectors' },
    { name: 'markets', title: 'Markets' },
    { name: 'quote', title: 'Philosophy quote' },
    { name: 'contact', title: 'Contact' },
    { name: 'seo', title: 'Search & sharing' },
  ],
  fields: [
    // ── Hero ───────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero — top of the homepage',
      type: 'object',
      group: 'hero',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'eyebrow', title: 'Small line above the headline', type: 'string' }),
        defineField({ name: 'line1', title: 'Headline — line 1', type: 'string', description: 'Shown in a lighter style. e.g. “Bridging”.', validation: (Rule) => Rule.required().error('Please add the headline.') }),
        defineField({ name: 'line2', title: 'Headline — line 2', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'line3', title: 'Headline — line 3', type: 'string', description: 'A full stop is added automatically in orange.', validation: (Rule) => Rule.required() }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, description: 'The paragraph beside the headline.', validation: (Rule) => Rule.required().error('Please add the description.') }),
        defineField({ name: 'primaryButton', title: 'Main button', type: 'button' }),
        defineField({ name: 'secondaryButton', title: 'Second (text) button', type: 'button' }),
        imageField('image', 'Hero image', { description: 'The wide photo below the headline.', recommended: '2200 × 1467' }),
        defineField({ name: 'captionLeft', title: 'Image caption — left', type: 'string' }),
        defineField({ name: 'captionRight', title: 'Image caption — right', type: 'string', description: 'Hidden on small phone screens.' }),
      ],
    }),
    // ── About ──────────────────────────────────────────────
    defineField({
      name: 'about',
      title: 'Who We Are',
      type: 'object',
      group: 'about',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'sectionHeading' }),
        defineField({ name: 'body', title: 'Main text', type: 'simpleText', description: 'Write each paragraph separately.' }),
        imageField('image', 'Photo', { description: 'Tall photo beside the text.', recommended: '1100 × 1466 (portrait)' }),
        defineField({
          name: 'pillars',
          title: 'Three pillars',
          type: 'array',
          description: 'Drag to reorder.',
          of: [{ type: 'object', fields: [defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }), defineField({ name: 'text', title: 'Description', type: 'text', rows: 2, validation: (Rule) => Rule.required() })], preview: { select: { title: 'name', subtitle: 'text' } } }],
        }),
      ],
    }),
    // ── Leadership ─────────────────────────────────────────
    defineField({
      name: 'leadership',
      title: 'Leadership',
      type: 'object',
      group: 'leadership',
      fields: [
        defineField({ name: 'show', title: 'Show this section', type: 'boolean', initialValue: true }),
        defineField({ name: 'label', title: 'Small label', type: 'string', initialValue: 'Leadership' }),
        defineField({
          name: 'members',
          title: 'People shown',
          type: 'array',
          description: 'Drag to reorder. The first person is shown as the large featured card. Add people under Content → Leadership.',
          of: [{ type: 'reference', to: [{ type: 'teamMember' }], options: { disableNew: true } }],
          validation: (Rule) => Rule.unique().error('The same person is listed twice.'),
        }),
      ],
    }),
    // ── Capabilities ───────────────────────────────────────
    defineField({
      name: 'capabilities',
      title: 'Strategic Capabilities',
      type: 'object',
      group: 'capabilities',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'sectionHeading' }),
        defineField({
          name: 'items',
          title: 'Capabilities shown',
          type: 'array',
          description: 'Drag to reorder. Add or edit capabilities under Content → Strategic Capabilities.',
          of: [{ type: 'reference', to: [{ type: 'service' }], options: { disableNew: true } }],
          validation: (Rule) => Rule.unique().error('The same capability is listed twice.'),
        }),
      ],
    }),
    // ── Industries ─────────────────────────────────────────
    defineField({
      name: 'industries',
      title: 'Industry Sectors',
      type: 'object',
      group: 'industries',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'sectionHeading' }),
        defineField({
          name: 'items',
          title: 'Sectors shown',
          type: 'array',
          description: 'Drag to reorder. Add or edit sectors under Content → Industry Sectors.',
          of: [{ type: 'reference', to: [{ type: 'industry' }], options: { disableNew: true } }],
          validation: (Rule) => Rule.unique().error('The same sector is listed twice.'),
        }),
      ],
    }),
    // ── Markets ────────────────────────────────────────────
    defineField({
      name: 'markets',
      title: 'Markets',
      type: 'object',
      group: 'markets',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'sectionHeading' }),
        imageField('image', 'Background image', { description: 'Faint globe image behind the corridor map.', recommended: '2000 × 1331' }),
        defineField({
          name: 'items',
          title: 'Regions',
          type: 'array',
          description: 'Drag to reorder. The map is designed for up to six regions.',
          validation: (Rule) => Rule.max(6).error('The map has room for six regions.'),
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'name', title: 'Region name', type: 'string', validation: (Rule) => Rule.required() }),
                defineField({ name: 'short', title: 'Short name for the map', type: 'string', description: 'A shorter version that fits on the map, e.g. “UK & Europe”.', validation: (Rule) => Rule.required() }),
                defineField({ name: 'focus', title: 'What we do there', type: 'string', validation: (Rule) => Rule.required() }),
              ],
              preview: { select: { title: 'name', subtitle: 'focus' } },
            },
          ],
        }),
      ],
    }),
    // ── Quote ──────────────────────────────────────────────
    defineField({
      name: 'quote',
      title: 'Philosophy quote',
      type: 'object',
      group: 'quote',
      fields: [
        defineField({ name: 'show', title: 'Show this section', type: 'boolean', initialValue: true }),
        defineField({ name: 'text', title: 'Quote', type: 'text', rows: 3, validation: (Rule) => Rule.custom((v, ctx) => ((ctx.parent as { show?: boolean } | undefined)?.show === false || v ? true : 'Please add the quote.')) }),
        defineField({ name: 'caption', title: 'Caption under the quote', type: 'string' }),
        imageField('image', 'Background image', { description: 'Faint image behind the quote.', recommended: '2200 × 1467' }),
      ],
    }),
    // ── Contact ────────────────────────────────────────────
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'sectionHeading' }),
        defineField({ name: 'formNote', title: 'Note beside the “Send” button', type: 'string' }),
      ],
    }),
    defineField({ name: 'seo', title: 'Search & sharing', type: 'seo', group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Homepage' }) },
});

export const navigation = defineType({
  name: 'navigation',
  title: 'Menu',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Menu links',
      type: 'array',
      description: 'The links in the top menu. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'menuLink',
          title: 'Menu link',
          fields: [
            defineField({ name: 'show', title: 'Show this link', type: 'boolean', initialValue: true }),
            defineField({ name: 'label', title: 'Link text', type: 'string', validation: (Rule) => Rule.required().error('Please add the link text.') }),
            ...linkFields(),
          ],
          preview: { select: { title: 'label', show: 'show' }, prepare: ({ title, show }) => ({ title, subtitle: show === false ? 'Hidden' : undefined }) },
        },
      ],
    }),
    defineField({ name: 'contactButton', title: 'Contact button (top right)', type: 'button' }),
  ],
  preview: { prepare: () => ({ title: 'Menu' }) },
});

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: ThListIcon,
  fields: [
    defineField({ name: 'tagline', title: 'Footer statement', type: 'text', rows: 2 }),
    defineField({ name: 'buttonLabel', title: 'Button text', type: 'string', description: 'The button links to the Contact section.' }),
    defineField({ name: 'copyright', title: 'Text after the copyright line', type: 'string', description: 'The year and company name are added automatically, e.g. “© 2026 Company. All rights reserved.”' }),
    defineField({
      name: 'legalLinks',
      title: 'Legal links (optional)',
      type: 'array',
      description: 'e.g. Privacy Policy. Drag to reorder.',
      of: [{ type: 'object', fields: [defineField({ name: 'label', title: 'Link text', type: 'string', validation: (Rule) => Rule.required() }), defineField({ name: 'url', title: 'Website address', type: 'url', validation: (Rule) => Rule.required().uri({ scheme: ['https', 'http'] }) })], preview: { select: { title: 'label', subtitle: 'url' } } }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Footer' }) },
});
