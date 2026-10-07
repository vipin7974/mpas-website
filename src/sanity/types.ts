import type { PortableTextBlock } from '@portabletext/types';

export type SanityImage = {
  asset?: { _ref: string; _type?: 'reference' };
  hotspot?: { x: number; y: number; width: number; height: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
};

export type Cta = { label: string; href: string; external: boolean };
export type NavLink = { id: string; label: string; href: string; external: boolean };
export type Heading = { label: string; title: string; description: string };

export type Service = {
  id: string;
  title: string;
  summary: string;
  points: string[];
  image: string;
  imageAlt: string;
};
export type Industry = { id: string; name: string; description: string; image: string; imageAlt: string };
export type Market = { id: string; name: string; short: string; focus: string };
export type Leader = {
  slug: string;
  name: string;
  initials: string;
  title: string;
  summary: string;
  executiveSummary: string[];
  biography: PortableTextBlock[];
  photo: string;
  linkedin: string;
  email: string;
};

/** Everything the website renders, already resolved from Sanity (or from built-in defaults). */
export type SiteContent = {
  brand: { name: string; shortName: string; tagline: string; email: string; phone: string; location: string; logo: string };
  social: { label: string; url: string }[];
  nav: { items: NavLink[]; contact: NavLink };
  hero: {
    eyebrow: string;
    lines: string[];
    description: string;
    primary: Cta | null;
    secondary: Cta | null;
    captionLeft: string;
    captionRight: string;
  };
  about: { body: PortableTextBlock[]; pillars: { name: string; text: string }[] };
  quote: { text: string; caption: string };
  contact: { formNote: string };
  footer: { tagline: string; buttonLabel: string; copyright: string; legalLinks: { label: string; url: string }[] };
  sectionHeadings: Record<string, Heading>;
  visibility: Record<string, boolean>;
  industries: Industry[];
  services: Service[];
  markets: Market[];
  leaders: Leader[];
  media: { hero: string; heroAlt: string; about: string; quote: string; markets: string };
  seo: { title: string; description: string; image: string; noIndex: boolean };
};
