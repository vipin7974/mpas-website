export interface NavItem {
  id: string;
  label: string;
  href: `#${string}`;
}

export const navigation: NavItem[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'what-we-do', label: 'Strategic Capabilities', href: '#what-we-do' },
  { id: 'industries', label: 'Industry Sectors', href: '#industries' },
  { id: 'markets', label: 'Markets', href: '#markets' },
];

export const contactNav: NavItem = { id: 'contact', label: 'Contact', href: '#contact' };

export const sectionIds = [...navigation.map((n) => n.id), contactNav.id] as const;

/** True on the home page; false on standalone pages such as /leadership/:slug. */
export const isHome = () => window.location.pathname === '/' || window.location.pathname === '';

/** In-page anchors must point back to the home page when viewed from a standalone page. */
export const anchor = (href: string) => (isHome() ? href : `/${href}`);
