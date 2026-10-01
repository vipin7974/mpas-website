# MPAS — Mahesh Palashikar Advisory Services

Corporate website built with Vite, React, TypeScript, Tailwind CSS v4, GSAP (ScrollTrigger and SplitText) and Lucide.

```bash
npm install
npm run dev      # local development
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

## Structure

- `src/styles/tokens.css` holds all design tokens: brand colours, neutrals, the fluid type scale, spacing, radius and motion.
- `src/components/common` holds the Container/Grid, Section, Button, SectionHeading and Reveal primitives.
- `src/components/layout` holds the Header, MobileMenu, Footer, the intro Loader and ScrollProgress.
- `src/components/sections` holds Hero, About, Expertise, What We Do, Industries, Capabilities, Markets, Quote and Contact.
- `src/data` holds all copy and lists (navigation, services, industries, capabilities, markets, site details).
- `src/assets/branding` holds the official MPAS logos with the background removed. Full-size masters are in `source/`.

Motion only runs when `prefers-reduced-motion` is not set. With reduced motion on, the static layout is shown.

## Before launch: placeholders to confirm

1. Domain, email and location in `src/data/site.ts`. Also update the canonical and Open Graph URLs in `index.html`.
2. Industry, capability and market lists in `src/data/`. These are sensible defaults written for MPAS and should be reviewed by the firm.
3. Photography is from Unsplash (free licence). Replace it with MPAS-owned imagery if available.
4. The contact form opens the visitor's email client (`mailto:`). Connect it to a form backend if you want submissions sent server-side.
