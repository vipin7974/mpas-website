export interface NavItem {
  id: string;
  label: string;
  href: `#${string}`;
}

export const navigation: NavItem[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'leadership', label: 'Leadership', href: '#leadership' },
  { id: 'what-we-do', label: 'Strategic Capabilities', href: '#what-we-do' },
  { id: 'industries', label: 'Industry Sectors', href: '#industries' },
  { id: 'markets', label: 'Markets', href: '#markets' },
];

export const contactNav: NavItem = { id: 'contact', label: 'Contact', href: '#contact' };

export const sectionIds = [...navigation.map((n) => n.id), contactNav.id] as const;
