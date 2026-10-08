import { cache } from 'react';
import type { PortableTextBlock } from '@portabletext/types';
import { defaultContent } from '@/data/defaults';
import { client } from './client';
import { imageUrl } from './image';
import { sanityFetch } from './live';
import { siteContentQuery } from './queries';
import type { Cta, Heading, Industry, Leader, Market, NavLink, SanityImage, Service, SiteContent } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any -- raw CMS payload is validated field by field below */
type Raw = any;

const str = (v: unknown, fallback: string) => (typeof v === 'string' && v.trim() ? v : fallback);
const arr = <T>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
const img = (v: SanityImage | null | undefined, w: number, fallback = '') => imageUrl(v, w) || fallback;

function link(raw: Raw): { href: string; external: boolean } | null {
  if (!raw) return null;
  if (raw.linkType === 'external') return raw.url ? { href: raw.url, external: true } : null;
  return raw.section ? { href: raw.section, external: false } : null;
}

function cta(raw: Raw, fallback: Cta | null): Cta | null {
  if (!raw) return fallback;
  if (raw.show === false) return null;
  const l = link(raw);
  return raw.label && l ? { label: raw.label, ...l } : fallback;
}

function heading(raw: Raw, fallback: Heading): Heading {
  return { label: str(raw?.label, fallback.label), title: str(raw?.title, fallback.title), description: str(raw?.description, fallback.description) };
}

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const paragraphsOf = (blocks: PortableTextBlock[] | undefined): string[] =>
  arr<any>(blocks).map((b) => arr<any>(b.children).map((c) => c.text ?? '').join('')).filter(Boolean);

/** Keeps a Leadership link in the menu even when the CMS navigation predates it. */
function withLeadership(items: NavLink[]): NavLink[] {
  if (items.some((i) => i.href === '#leadership')) return items;
  const entry: NavLink = { id: 'leadership', label: 'Leadership', href: '#leadership', external: false };
  const at = items.findIndex((i) => i.href === '#about') + 1;
  return [...items.slice(0, at), entry, ...items.slice(at)];
}

function mapContent(raw: Raw): SiteContent {
  const d = defaultContent;
  const s = raw.settings ?? {};
  const h = raw.home ?? {};
  const footerRaw = raw.footer ?? {};

  const items = arr<Raw>(raw.nav?.items)
    .filter((i) => i.show !== false && i.label)
    .map((i): NavLink | null => {
      const l = link(i);
      return l ? { id: i._key, label: i.label, ...l } : null;
    })
    .filter((i): i is NavLink => i !== null);
  const contactLink = link(raw.nav?.contactButton);

  const headings: Record<string, Heading> = {
    about: heading(h.about?.heading, d.sectionHeadings.about),
    leadership: { label: str(h.leadership?.label, d.sectionHeadings.leadership.label), title: '', description: '' },
    'what-we-do': heading(h.capabilities?.heading, d.sectionHeadings['what-we-do']),
    industries: heading(h.industries?.heading, d.sectionHeadings.industries),
    markets: heading(h.markets?.heading, d.sectionHeadings.markets),
    contact: heading(h.contact?.heading, d.sectionHeadings.contact),
  };

  const shows = (v: unknown) => (v === false ? false : true);

  const services: Service[] = arr<Raw>(h.capabilities?.items)
    .filter((x) => x && x.active !== false)
    .map((x) => ({ id: x._id, title: x.title, summary: x.summary, points: arr<string>(x.points), image: img(x.image, 1400), imageAlt: x.image?.alt ?? '' }));

  const industries: Industry[] = arr<Raw>(h.industries?.items)
    .filter((x) => x && x.active !== false)
    .map((x) => ({ id: x._id, name: x.name, description: x.description, image: img(x.image, 1200), imageAlt: x.image?.alt ?? '' }));

  const markets: Market[] = arr<Raw>(h.markets?.items).map((m) => ({ id: m._key, name: m.name, short: m.short, focus: m.focus }));

  const leaders: Leader[] = arr<Raw>(h.leadership?.members)
    .filter((m) => m && m.showOnWebsite !== false && m.slug)
    .map((m) => ({
      slug: m.slug,
      name: m.fullName,
      initials: initialsOf(m.fullName),
      title: m.designation,
      summary: m.shortIntro ?? '',
      executiveSummary: paragraphsOf(m.executiveSummary),
      biography: arr<PortableTextBlock>(m.biography),
      photo: img(m.photo, 800),
      linkedin: m.linkedin ?? '',
      email: m.email ?? '',
    }));

  const social = (
    [
      ['LinkedIn', s.linkedin],
      ['Instagram', s.instagram],
      ['YouTube', s.youtube],
      ['X', s.x],
      ['Facebook', s.facebook],
    ] as const
  )
    .filter(([, url]) => !!url)
    .map(([label, url]) => ({ label, url: url as string }));

  const hero = h.hero ?? {};
  const seo = h.seo ?? {};
  const defSeo = s.defaultSeo ?? {};

  return {
    brand: {
      name: str(s.brandName, d.brand.name),
      shortName: d.brand.shortName,
      tagline: str(s.tagline, d.brand.tagline),
      email: str(s.email, d.brand.email),
      phone: s.phone ?? '',
      location: str(s.location, d.brand.location),
      logo: img(s.logo, 960, d.brand.logo),
    },
    social,
    nav: {
      items: withLeadership(items.length ? items : d.nav.items),
      contact: contactLink && raw.nav?.contactButton?.show !== false
        ? { id: 'contact', label: str(raw.nav.contactButton.label, d.nav.contact.label), ...contactLink }
        : d.nav.contact,
    },
    hero: {
      eyebrow: str(hero.eyebrow, d.hero.eyebrow),
      lines: [str(hero.line1, d.hero.lines[0]), str(hero.line2, d.hero.lines[1]), str(hero.line3, d.hero.lines[2])],
      description: str(hero.description, d.hero.description),
      primary: cta(hero.primaryButton, d.hero.primary),
      secondary: cta(hero.secondaryButton, d.hero.secondary),
      captionLeft: hero.captionLeft ?? d.hero.captionLeft,
      captionRight: hero.captionRight ?? d.hero.captionRight,
    },
    about: {
      body: arr<PortableTextBlock>(h.about?.body).length ? arr<PortableTextBlock>(h.about?.body) : d.about.body,
      pillars: arr<{ name: string; text: string }>(h.about?.pillars).length ? arr<{ name: string; text: string }>(h.about?.pillars) : d.about.pillars,
    },
    quote: { text: str(h.quote?.text, d.quote.text), caption: str(h.quote?.caption, d.quote.caption) },
    contact: { formNote: str(h.contact?.formNote, d.contact.formNote) },
    footer: {
      tagline: str(footerRaw.tagline, d.footer.tagline),
      buttonLabel: str(footerRaw.buttonLabel, d.footer.buttonLabel),
      copyright: str(footerRaw.copyright, d.footer.copyright),
      legalLinks: arr<Raw>(footerRaw.legalLinks).filter((l) => l.label && l.url).map((l) => ({ label: l.label, url: l.url })),
    },
    sectionHeadings: headings,
    visibility: {
      about: shows(h.about?.heading?.show),
      leadership: shows(h.leadership?.show),
      'what-we-do': shows(h.capabilities?.heading?.show),
      industries: shows(h.industries?.heading?.show),
      markets: shows(h.markets?.heading?.show),
      quote: shows(h.quote?.show),
      contact: shows(h.contact?.heading?.show),
    },
    industries: industries.length ? industries : d.industries,
    services: services.length ? services : d.services,
    markets: markets.length ? markets : d.markets,
    leaders: leaders.length ? leaders : d.leaders,
    media: {
      hero: img(hero.image, 2200, d.media.hero),
      heroAlt: hero.image?.alt || d.media.heroAlt,
      about: img(h.about?.image, 1100, d.media.about),
      quote: img(h.quote?.image, 2200, d.media.quote),
      markets: img(h.markets?.image, 2000, d.media.markets),
    },
    seo: {
      title: str(seo.title, str(defSeo.title, d.seo.title)),
      description: str(seo.description, str(defSeo.description, d.seo.description)),
      image: img(seo.image ?? defSeo.image, 1200),
      noIndex: seo.noIndex === true,
    },
  };
}

/**
 * The website's content. Never throws: if Sanity is unreachable or empty,
 * the built-in defaults are shown so the site stays up.
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  try {
    const raw = await sanityFetch<Raw>({ query: siteContentQuery, tags: ['sanity'] });
    return mapContent(raw ?? {});
  } catch (error) {
    console.error('[mpas] Sanity unavailable — serving built-in content.', error instanceof Error ? error.message : error);
    return defaultContent;
  }
});

/** Profile page slugs for static generation. Runs at build time, so it reads published content only. */
export async function getLeaderSlugs(): Promise<string[]> {
  try {
    const slugs = await client.fetch<string[]>(
      `*[_type == "teamMember" && showOnWebsite != false && defined(slug.current)].slug.current`,
      {},
      { next: { tags: ['sanity'], revalidate: 3600 } },
    );
    if (slugs.length) return slugs;
  } catch {
    /* fall through to built-in profiles */
  }
  return defaultContent.leaders.map((l) => l.slug);
}
