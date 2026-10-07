import { defineField, defineType } from 'sanity';
import { BillIcon } from '@sanity/icons/Bill';
import { CaseIcon } from '@sanity/icons/Case';
import { UserIcon } from '@sanity/icons/User';
import { imageField } from './shared';

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Leadership team member',
  type: 'document',
  icon: UserIcon,
  groups: [
    { name: 'basics', title: 'Basics', default: true },
    { name: 'bio', title: 'Biography' },
    { name: 'contact', title: 'Contact links' },
  ],
  fields: [
    defineField({ name: 'showOnWebsite', title: 'Show on website', type: 'boolean', initialValue: true, group: 'basics', description: 'Turn off to hide this person without deleting them.' }),
    defineField({ name: 'fullName', title: 'Full name', type: 'string', group: 'basics', validation: (Rule) => Rule.required().error('Please add the person’s name.') }),
    defineField({ name: 'designation', title: 'Job title', type: 'string', group: 'basics', description: 'e.g. “Founder and Chief Executive Officer”.', validation: (Rule) => Rule.required().error('Please add the job title.') }),
    defineField({
      name: 'slug',
      title: 'Web address of the profile page',
      type: 'slug',
      group: 'basics',
      description: 'Created automatically from the name. Changing this later may break existing links to this profile.',
      options: { source: 'fullName', maxLength: 60 },
      validation: (Rule) => Rule.required().error('Click “Generate” to create the web address.'),
    }),
    defineField({ name: 'shortIntro', title: 'Short introduction', type: 'text', rows: 3, group: 'basics', description: 'Two or three lines shown on the Leadership card on the homepage. Leave empty if the biography is not ready yet.' }),
    imageField('photo', 'Profile photo', {
      description: 'Optional. If empty, a circle with the person’s initials is shown.',
      recommended: '800 × 800, face centred',
      group: 'basics',
    }),
    defineField({ name: 'executiveSummary', title: 'Executive summary', type: 'simpleText', group: 'bio', description: 'The opening paragraph(s) of the profile page.' }),
    defineField({ name: 'biography', title: 'Full biography', type: 'biographyText', group: 'bio', description: 'Use “Section heading” for titles like “Leadership & Operational Experience”.' }),
    defineField({ name: 'linkedin', title: 'LinkedIn address', type: 'url', group: 'contact', description: 'Optional. The LinkedIn button only appears when this is filled in.', validation: (Rule) => Rule.uri({ scheme: ['https'] }).error('Please paste the full LinkedIn address starting with https://') }),
    defineField({ name: 'email', title: 'Email address', type: 'string', group: 'contact', description: 'Optional. If empty, the company email from Website Settings is used.', validation: (Rule) => Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: 'email' }).error('Please enter a valid email address.') }),
  ],
  preview: {
    select: { title: 'fullName', subtitle: 'designation', media: 'photo', hidden: 'showOnWebsite' },
    prepare: ({ title, subtitle, media, hidden }) => ({ title, subtitle: hidden === false ? `Hidden — ${subtitle ?? ''}` : subtitle, media }),
  },
});

export const service = defineType({
  name: 'service',
  title: 'Strategic capability',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({ name: 'title', title: 'Name', type: 'string', validation: (Rule) => Rule.required().error('Please add a name.') }),
    defineField({ name: 'summary', title: 'Description', type: 'text', rows: 5, description: 'The paragraph shown on the card.', validation: (Rule) => Rule.required().error('Please add a description.') }),
    defineField({
      name: 'points',
      title: 'Key points (optional)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'If you add points, a “Read more” button appears on the card to reveal them.',
    }),
    imageField('image', 'Card image', { description: 'Photo shown at the top of the card.', recommended: '1400 × 933', required: true }),
    defineField({ name: 'active', title: 'Show on website', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'title', subtitle: 'summary', media: 'image', active: 'active' }, prepare: ({ title, subtitle, media, active }) => ({ title: active === false ? `${title} (hidden)` : title, subtitle, media }) },
});

export const industry = defineType({
  name: 'industry',
  title: 'Industry sector',
  type: 'document',
  icon: BillIcon,
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required().error('Please add a name.') }),
    defineField({ name: 'description', title: 'Short description', type: 'text', rows: 3, validation: (Rule) => Rule.required().error('Please add a description.') }),
    imageField('image', 'Photo', { description: 'Shown behind the sector name on its card.', recommended: '1200 × 1500 (portrait)', required: true }),
    defineField({ name: 'active', title: 'Show on website', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'name', subtitle: 'description', media: 'image', active: 'active' }, prepare: ({ title, subtitle, media, active }) => ({ title: active === false ? `${title} (hidden)` : title, subtitle, media }) },
});
