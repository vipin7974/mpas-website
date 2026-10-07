/**
 * Imports the website's existing content into Sanity so the site looks identical on day one.
 * Safe to re-run: documents use fixed ids and are replaced, images are de-duplicated by Sanity.
 *
 *   npm run seed            (needs SANITY_API_WRITE_TOKEN in .env.local)
 */
import { createReadStream } from 'node:fs';
import { basename, join } from 'node:path';
import { createClient } from '@sanity/client';
import type { PortableTextBlock } from '@portabletext/types';
import { defaultContent as c } from '../src/data/defaults';
import { paragraph } from '../src/sanity/lib/portable';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'w6jr4lxx';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error('Missing SANITY_API_WRITE_TOKEN. Create an Editor token at sanity.io/manage and add it to .env.local.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: '2025-01-01', useCdn: false });

const uploaded = new Map<string, string>();

/** Uploads a bundled image (once) and returns a Sanity image field. */
async function image(publicPath: string, alt: string) {
  if (!publicPath) return undefined;
  let ref = uploaded.get(publicPath);
  if (!ref) {
    const file = join(process.cwd(), 'public', publicPath);
    const asset = await client.assets.upload('image', createReadStream(file), { filename: basename(file) });
    ref = asset._id;
    uploaded.set(publicPath, ref);
    console.log(`  uploaded ${publicPath}`);
  }
  return { _type: 'image', asset: { _type: 'reference', _ref: ref }, alt };
}

const section = (href: string) => ({ linkType: 'section', section: href });
const button = (b: { label: string; href: string } | null) =>
  b ? { _type: 'button', show: true, label: b.label, ...section(b.href) } : { _type: 'button', show: false };
const heading = (key: string) => ({ _type: 'sectionHeading', show: true, ...c.sectionHeadings[key] });
const ref = (id: string, key: string) => ({ _type: 'reference', _key: key, _ref: id });

async function main() {
  console.log(`Seeding ${projectId}/${dataset}…`);
  const tx = client.transaction();

  const leaderIds = c.leaders.map((l) => `teamMember-${l.slug}`);
  for (const l of c.leaders) {
    tx.createOrReplace({
      _id: `teamMember-${l.slug}`,
      _type: 'teamMember',
      showOnWebsite: true,
      fullName: l.name,
      designation: l.title,
      slug: { _type: 'slug', current: l.slug },
      ...(l.summary && { shortIntro: l.summary }),
      executiveSummary: l.executiveSummary.map((t) => paragraph(t)) as PortableTextBlock[],
      biography: l.biography,
      ...(l.linkedin && { linkedin: l.linkedin }),
      ...(l.email && { email: l.email }),
    });
  }

  const serviceIds = [];
  for (const s of c.services) {
    const id = `service-${s.id}`;
    serviceIds.push(id);
    tx.createOrReplace({ _id: id, _type: 'service', title: s.title, summary: s.summary, points: s.points, image: await image(s.image, s.imageAlt), active: true });
  }

  const industryIds = [];
  for (const i of c.industries) {
    const id = `industry-${i.id}`;
    industryIds.push(id);
    tx.createOrReplace({ _id: id, _type: 'industry', name: i.name, description: i.description, image: await image(i.image, i.imageAlt), active: true });
  }

  tx.createOrReplace({
    _id: 'homepage',
    _type: 'homepage',
    hero: {
      eyebrow: c.hero.eyebrow,
      line1: c.hero.lines[0],
      line2: c.hero.lines[1],
      line3: c.hero.lines[2],
      description: c.hero.description,
      primaryButton: button(c.hero.primary),
      secondaryButton: button(c.hero.secondary),
      image: await image(c.media.hero, c.media.heroAlt),
      captionLeft: c.hero.captionLeft,
      captionRight: c.hero.captionRight,
    },
    about: {
      heading: heading('about'),
      body: c.about.body,
      image: await image(c.media.about, 'The Gateway of India, Mumbai, at sunset'),
      pillars: c.about.pillars.map((p, i) => ({ _type: 'object', _key: `pillar${i}`, ...p })),
    },
    leadership: { show: true, label: c.sectionHeadings.leadership.label, members: leaderIds.map((id, i) => ref(id, `m${i}`)) },
    capabilities: { heading: heading('what-we-do'), items: serviceIds.map((id, i) => ref(id, `s${i}`)) },
    industries: { heading: heading('industries'), items: industryIds.map((id, i) => ref(id, `i${i}`)) },
    markets: {
      heading: heading('markets'),
      image: await image(c.media.markets, 'Globe'),
      items: c.markets.map((m) => ({ _type: 'object', _key: m.id, name: m.name, short: m.short, focus: m.focus })),
    },
    quote: { show: true, text: c.quote.text, caption: c.quote.caption, image: await image(c.media.quote, 'Abstract grid') },
    contact: { heading: heading('contact'), formNote: c.contact.formNote },
    seo: { _type: 'seo', title: c.seo.title, description: c.seo.description, noIndex: false },
  });

  tx.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    brandName: c.brand.name,
    tagline: c.brand.tagline,
    email: c.brand.email,
    location: c.brand.location,
    defaultSeo: { _type: 'seo', title: c.seo.title, description: c.seo.description, noIndex: false },
  });

  tx.createOrReplace({
    _id: 'navigation',
    _type: 'navigation',
    items: c.nav.items.map((n) => ({ _type: 'menuLink', _key: n.id, show: true, label: n.label, ...section(n.href) })),
    contactButton: button({ label: c.nav.contact.label, href: c.nav.contact.href }),
  });

  tx.createOrReplace({
    _id: 'footer',
    _type: 'footer',
    tagline: c.footer.tagline,
    buttonLabel: c.footer.buttonLabel,
    copyright: c.footer.copyright,
  });

  await tx.commit();
  console.log('Done. Open /admin to review and edit your content.');
}

main().catch((error) => {
  console.error('Seeding failed:', error instanceof Error ? error.message : error);
  process.exit(1);
});
