import { defineField, defineType } from 'sanity';
import { imageField, linkFields } from './shared';

/** Optional button: a switch, its text, and a controlled destination. */
export const button = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
      name: 'show',
      title: 'Show this button',
      type: 'boolean',
      initialValue: true,
      description: 'Turn off to hide the button without losing its text.',
    }),
    defineField({
      name: 'label',
      title: 'Button text',
      type: 'string',
      hidden: ({ parent }) => parent?.show === false,
      validation: (Rule) =>
        Rule.custom((v, ctx) => {
          const p = ctx.parent as { show?: boolean } | undefined;
          return p?.show === false || v ? true : 'Please add the button text before publishing.';
        }),
    }),
    ...linkFields({ hiddenWhen: (p) => p?.show === false }),
  ],
  preview: {
    select: { title: 'label', show: 'show' },
    prepare: ({ title, show }) => ({ title: title || 'Button', subtitle: show === false ? 'Hidden' : 'Shown' }),
  },
});

export const seo = defineType({
  name: 'seo',
  title: 'Search & sharing',
  type: 'object',
  description: 'How this page appears in Google and when shared on social media.',
  fields: [
    defineField({
      name: 'title',
      title: 'Search title',
      type: 'string',
      description: 'Appears as the blue headline in Google results. Around 50–60 characters works best.',
      validation: (Rule) => Rule.max(70).warning('Long titles may be cut off in Google.'),
    }),
    defineField({
      name: 'description',
      title: 'Search description',
      type: 'text',
      rows: 3,
      description: 'Helps search engines understand this page. Around 140–160 characters works best.',
      validation: (Rule) => Rule.max(200).warning('Long descriptions may be cut off in Google.'),
    }),
    imageField('image', 'Sharing image', {
      description: 'Shown when the page is shared on LinkedIn, WhatsApp, etc.',
      recommended: '1200 × 630',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide this page from Google',
      type: 'boolean',
      initialValue: false,
      description: 'Leave off unless you do not want this page to appear in search results.',
    }),
  ],
});

export const sectionHeading = defineType({
  name: 'sectionHeading',
  title: 'Section heading',
  type: 'object',
  fields: [
    defineField({ name: 'show', title: 'Show this section', type: 'boolean', initialValue: true, description: 'Turn off to hide the whole section on the website.' }),
    defineField({ name: 'label', title: 'Small label', type: 'string', description: 'The small word above the heading, e.g. “About”.' }),
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      description: 'The main heading visitors see in this section.',
      validation: (Rule) =>
        Rule.custom((v, ctx) => {
          const p = ctx.parent as { show?: boolean } | undefined;
          return p?.show === false || v ? true : 'Please add a heading before publishing.';
        }),
    }),
    defineField({ name: 'description', title: 'Sub-heading', type: 'text', rows: 3, description: 'A short line of text below the heading.' }),
  ],
});

/** Rich text with only what editors need. */
export const simpleText = defineType({
  name: 'simpleText',
  title: 'Text',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [{ title: 'Paragraph', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [defineField({ name: 'href', type: 'url', title: 'Website address', validation: (Rule) => Rule.required().uri({ scheme: ['https', 'http', 'mailto'] }) })],
          },
        ],
      },
    },
  ],
});

export const biographyText = defineType({
  name: 'biographyText',
  title: 'Biography',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Paragraph', value: 'normal' },
        { title: 'Section heading', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet list', value: 'bullet' },
        { title: 'Numbered list', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [defineField({ name: 'href', type: 'url', title: 'Website address', validation: (Rule) => Rule.required().uri({ scheme: ['https', 'http', 'mailto'] }) })],
          },
        ],
      },
    },
  ],
});
