import type { SiteContent } from '@/sanity/types';
import { paragraph } from '@/sanity/lib/portable';
import { industries } from '@/data/industries';
import { services } from '@/data/services';
import { markets } from '@/data/markets';
import { defaultLeaders } from '@/data/leadership';
import { navigation, contactNav } from '@/data/navigation';

/**
 * Built-in copy. It is (1) what `npm run seed` writes into Sanity and
 * (2) the fallback shown if Sanity is unreachable or a field is left empty.
 */
export const defaultContent: SiteContent = {
  brand: {
    name: 'Mahesh Palashikar Advisory Services',
    shortName: 'mpas',
    tagline: 'Bridging Capital, Capability, Execution',
    email: 'contact@mpasadvisory.in',
    phone: '',
    location: 'India',
    logo: '/branding/mpas-logo-horizontal.png',
  },
  social: [],
  nav: {
    items: navigation.map((n) => ({ id: n.id, label: n.label, href: n.href, external: false })),
    contact: { id: contactNav.id, label: contactNav.label, href: contactNav.href, external: false },
  },
  hero: {
    eyebrow: 'Mahesh Palashikar Advisory Services',
    lines: ['Bridging', 'capital, capability,', 'and execution.'],
    description:
      'Mahesh Palashikar Advisory Services is an independent strategic advisory firm. We advise global corporations, institutional investors, and corporate boards on complex market entry, energy transition, and industrial transformation.',
    primary: { label: 'Explore what we do', href: '#what-we-do', external: false },
    secondary: { label: 'Talk to us', href: '#contact', external: false },
    captionLeft: 'Strategy · Partnerships · Execution',
    captionRight: 'For Viksit Bharat',
  },
  about: {
    body: [
      paragraph(
        { text: 'Mahesh Palashikar Advisory Services (mpas)', strong: true },
        ' provides senior-led strategic guidance to decision-makers navigating high-stakes industrial and capital decisions in India.',
      ),
      paragraph(
        'We bring over 125 years of combined executive leadership experience across global industrial, energy, technology, and capital sectors. Built upon a foundation of proven leadership—including extensive tenures shaping global industrial enterprises and chairing NSE-listed company boards—mpas operates at the intersection of strategy, capital, partnerships, and execution.',
      ),
      paragraph(
        'We deploy a lean, agile operating model. This ensures our clients engage directly with seasoned practitioners possessing deep domain expertise and extensive relationships across India’s regulatory, public sector, and industrial ecosystems.',
      ),
    ],
    pillars: [
      { name: 'Capital', text: 'Connecting capital providers with credible India opportunities, and businesses with the right capital partners.' },
      { name: 'Capability', text: 'Bringing the sector, operational and policy depth needed to turn investment into enterprise.' },
      { name: 'Execution', text: 'Staying through delivery, so partnerships, supply chains and transformation create measurable value.' },
    ],
  },
  quote: {
    text: 'Value is created only when capital and capability come together, and are carried through to execution.',
    caption: 'The mpas philosophy',
  },
  contact: { formNote: 'Submitting opens your email app with your enquiry ready to send.' },
  footer: {
    tagline: 'Bridging Capital, Capability, Execution for Viksit Bharat.',
    buttonLabel: 'Start a conversation',
    copyright: 'All rights reserved.',
    legalLinks: [],
  },
  sectionHeadings: {
    about: {
      label: 'About',
      title: 'Who We Are',
      description: 'Senior, partner-led advice for companies and investors shaping their India strategy.',
    },
    leadership: { label: 'Leadership', title: '', description: '' },
    'what-we-do': {
      label: 'Strategic Capabilities',
      title: 'Core Advisory Capabilities',
      description: 'We work alongside leadership teams to turn ambition into an executable path.',
    },
    industries: {
      label: 'Industry Sectors',
      title: 'Sector depth across India’s growth engines.',
      description:
        'We bring working knowledge of the sectors driving India’s next decade — the policy, the players and the practicalities of getting things built.',
    },
    markets: {
      label: 'Markets',
      title: 'India at the centre of global opportunity.',
      description: 'Connecting international capital, technology and capability with India’s growth corridors.',
    },
    contact: {
      label: 'Contact',
      title: 'Let’s build what’s next, together.',
      description:
        'Whether you are shaping an India strategy, looking for the right partner or ready to execute, we would welcome a conversation.',
    },
  },
  visibility: { about: true, leadership: true, 'what-we-do': true, industries: true, markets: true, quote: true, contact: true },
  industries,
  services,
  markets,
  leaders: defaultLeaders,
  media: { hero: '/images/mumbai_bridge.webp', heroAlt: 'Glass office towers rising into a clear sky', about: '/images/service-supply-chain.webp', quote: '/images/quote-grid.webp', markets: '/images/markets-earth.webp' },
  seo: {
    title: 'mpas | Mahesh Palashikar Advisory Services',
    description:
      'Mahesh Palashikar Advisory Services (mpas) is an independent strategic advisory firm bridging capital, capability, and execution.',
    image: '',
    noIndex: false,
  },
};
