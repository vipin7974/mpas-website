export interface NavItem {
  id: string;
  label: string;
  href: `#${string}`;
}

export const navigation: NavItem[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'expertise', label: 'Expertise', href: '#expertise' },
  { id: 'what-we-do', label: 'What We Do', href: '#what-we-do' },
  { id: 'industries', label: 'Industries', href: '#industries' },
  { id: 'capabilities', label: 'Capabilities', href: '#capabilities' },
  { id: 'markets', label: 'Markets', href: '#markets' },
];

export const contactNav: NavItem = { id: 'contact', label: 'Contact', href: '#contact' };

export const sectionIds = [...navigation.map((n) => n.id), contactNav.id] as const;
