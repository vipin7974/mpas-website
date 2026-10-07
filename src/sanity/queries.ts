import { defineQuery } from 'next-sanity';

const SEO = `{ title, description, noIndex, image }`;
const HEADING = `{ show, label, title, description }`;

/** One round-trip for everything the website shows. Draft/published is decided by the perspective, not the query. */
export const siteContentQuery = defineQuery(`{
  "settings": *[_type == "siteSettings"][0]{
    brandName, tagline, logo, email, phone, location,
    linkedin, instagram, youtube, x, facebook,
    defaultSeo ${SEO}
  },
  "home": *[_type == "homepage"][0]{
    hero{ eyebrow, line1, line2, line3, description, primaryButton, secondaryButton, image, captionLeft, captionRight },
    about{ heading ${HEADING}, body, image, pillars },
    leadership{ show, label, "members": members[]->{ showOnWebsite, fullName, designation, "slug": slug.current, shortIntro, photo, executiveSummary, biography, linkedin, email } },
    capabilities{ heading ${HEADING}, "items": items[]->{ _id, active, title, summary, points, image } },
    industries{ heading ${HEADING}, "items": items[]->{ _id, active, name, description, image } },
    markets{ heading ${HEADING}, image, items[]{ _key, name, short, focus } },
    quote{ show, text, caption, image },
    contact{ heading ${HEADING}, formNote },
    seo ${SEO}
  },
  "nav": *[_type == "navigation"][0]{ items[]{ _key, show, label, linkType, section, url }, contactButton },
  "footer": *[_type == "footer"][0]{ tagline, buttonLabel, copyright, legalLinks[]{ _key, label, url } }
}`);
