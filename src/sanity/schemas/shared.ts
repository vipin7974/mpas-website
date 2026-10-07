import { defineField, type FieldDefinition } from 'sanity';

/** Where a button or menu link can point. Page sections are fixed in code so links can never break. */
export const sectionTargets = [
  { title: 'Top of the page', value: '#top' },
  { title: 'About / Who We Are', value: '#about' },
  { title: 'Leadership', value: '#leadership' },
  { title: 'Strategic Capabilities', value: '#what-we-do' },
  { title: 'Industry Sectors', value: '#industries' },
  { title: 'Markets', value: '#markets' },
  { title: 'Contact', value: '#contact' },
];

type ImageOpts = { description: string; recommended?: string; required?: boolean; group?: string; fieldset?: string };

/** Image with a mandatory description (alt text) whenever a picture is uploaded. */
export function imageField(name: string, title: string, o: ImageOpts): FieldDefinition {
  return defineField({
    name,
    title,
    type: 'image',
    group: o.group,
    fieldset: o.fieldset,
    description: `${o.description}${o.recommended ? ` Recommended size: ${o.recommended}.` : ''}`,
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        title: 'Describe this image',
        type: 'string',
        description: 'Short description for visitors who cannot see the image, e.g. “Glass office towers at sunset”.',
        validation: (Rule) =>
          Rule.custom((alt, ctx) => {
            const parent = ctx.parent as { asset?: unknown } | undefined;
            return parent?.asset && !alt ? 'Please describe this image — it helps accessibility and Google.' : true;
          }),
      }),
    ],
    validation: o.required ? (Rule) => Rule.required().error('Please upload an image.') : undefined,
  });
}

/** Controlled link: pick a section of the website, or paste a full external address. */
export const linkFields = (opts: { group?: string; hiddenWhen?: (parent: Record<string, unknown> | undefined) => boolean } = {}) => {
  const hidden = ({ parent }: { parent?: Record<string, unknown> }) => (opts.hiddenWhen ? opts.hiddenWhen(parent) : false);
  return [
    defineField({
      name: 'linkType',
      title: 'Where should it go?',
      type: 'string',
      initialValue: 'section',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'A part of this website', value: 'section' },
          { title: 'Another website', value: 'external' },
        ],
      },
      hidden,
    }),
    defineField({
      name: 'section',
      title: 'Choose the page section',
      type: 'string',
      options: { list: sectionTargets },
      hidden: ({ parent }) => hidden({ parent }) || parent?.linkType === 'external',
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          const p = ctx.parent as Record<string, unknown> | undefined;
          if (opts.hiddenWhen?.(p)) return true;
          if (p?.linkType === 'external') return true;
          return value ? true : 'Please choose where this should link to.';
        }),
    }),
    defineField({
      name: 'url',
      title: 'Website address',
      type: 'url',
      description: 'The full address, starting with https://',
      validation: (Rule) =>
        Rule.uri({ scheme: ['https', 'http', 'mailto'] }).custom((value, ctx) => {
          const p = ctx.parent as Record<string, unknown> | undefined;
          if (opts.hiddenWhen?.(p)) return true;
          if (p?.linkType === 'external' && !value) return 'Please add the website address for this link.';
          return true;
        }),
      hidden: ({ parent }) => hidden({ parent }) || parent?.linkType !== 'external',
    }),
  ];
};
