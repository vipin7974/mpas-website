import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { industries as defaultIndustries } from '@/data/industries';
import { services as defaultServices } from '@/data/services';
import { markets as defaultMarkets } from '@/data/markets';

export type SiteConfig = {
  brand: { name: string; shortName: string; tagline: string; email: string; location: string; logo: string };
  hero: { eyebrow: string; lines: string[]; description: string; primaryCta: string; secondaryCta: string };
  sectionHeadings: Record<string, { label: string; title: string; description: string }>;
  industries: typeof defaultIndustries;
  services: typeof defaultServices;
  markets: typeof defaultMarkets;
  visibility: Record<string, boolean>;
  theme: { canvas: string; surface: string; muted: string; ink: string; green: string; greenDark: string; orange: string; orangeRed: string };
  seo: { title: string; description: string };
  media: {
    hero: string;
    about: string;
    quote: string;
    markets: string;
  };
};

const defaults: SiteConfig = {
  brand: { name: 'Mahesh Palashikar Advisory Services', shortName: 'mpas', tagline: 'Bridging Capital, Capability, Execution', email: 'contact@mpasadvisory.in', location: 'India', logo: '' },
  hero: {
    eyebrow: 'Mahesh Palashikar Advisory Services',
    lines: ['Bridging', 'capital, capability,', 'and execution.'],
    description: 'Mahesh Palashikar Advisory Services is an independent strategic advisory firm. We advise global corporations, institutional investors, and corporate boards on complex market entry, energy transition, and industrial transformation.',
    primaryCta: 'Explore what we do', secondaryCta: 'Talk to us',
  },
  sectionHeadings: {
    about: { label: 'About', title: 'Who We Are', description: 'Senior, partner-led advice for companies and investors shaping their India strategy.' },
    'what-we-do': { label: 'Strategic Capabilities', title: 'Core Advisory Capabilities', description: 'We work alongside leadership teams to turn ambition into an executable path.' },
    industries: { label: 'Industry Sectors', title: 'Sector depth across India’s growth engines.', description: 'We bring working knowledge of the sectors driving India’s next decade — the policy, the players and the practicalities of getting things built.' },
    markets: { label: 'Markets', title: 'India at the centre of global opportunity.', description: 'Connecting international capital, technology and capability with India’s growth corridors.' },
    contact: { label: 'Contact', title: 'Let’s build what’s next, together.', description: 'Whether you are shaping an India strategy, looking for the right partner or ready to execute, we would welcome a conversation.' },
  },
  industries: defaultIndustries,
  services: defaultServices,
  markets: defaultMarkets,
  visibility: { about: true, 'what-we-do': true, industries: true, markets: true, quote: true, contact: true },
  theme: { canvas: '#f7f3ea', surface: '#ffffff', muted: '#eee8dc', ink: '#18352a', green: '#78a84a', greenDark: '#245b3a', orange: '#e07832', orangeRed: '#c95d24' },
  seo: { title: 'mpas | Mahesh Palashikar Advisory Services', description: 'Mahesh Palashikar Advisory Services (mpas) is an independent strategic advisory firm bridging capital, capability, and execution.' },
  media: { hero: '', about: '', quote: '', markets: '' },
};

const STORAGE_KEY = 'mpas-site-config-v4';
const SiteConfigContext = createContext<{ config: SiteConfig; setConfig: (next: SiteConfig) => void; reset: () => void } | null>(null);

function loadConfig(): SiteConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return {
      ...defaults,
      ...parsed,
      brand: { ...defaults.brand, ...(parsed.brand || {}) },
      hero: { ...defaults.hero, ...(parsed.hero || {}) },
      theme: { ...defaults.theme, ...(parsed.theme || {}) },
      seo: { ...defaults.seo, ...(parsed.seo || {}) },
      media: { ...defaults.media, ...(parsed.media || {}) },
      sectionHeadings: { ...defaults.sectionHeadings, ...(parsed.sectionHeadings || {}) },
      visibility: { ...defaults.visibility, ...(parsed.visibility || {}) },
    };
  } catch { return defaults; }
}

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<SiteConfig>(loadConfig);
  const setConfig = (next: SiteConfig) => setConfigState(next);
  const reset = () => setConfigState(defaults);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(config)); }, [config]);
  useEffect(() => {
    const root = document.documentElement;
    Object.entries({ '--color-canvas': config.theme.canvas, '--color-surface': config.theme.surface, '--color-surface-muted': config.theme.muted, '--color-ink': config.theme.ink, '--color-mpas-green': config.theme.green, '--color-mpas-green-dark': config.theme.greenDark, '--color-mpas-orange': config.theme.orange, '--color-mpas-orange-red': config.theme.orangeRed }).forEach(([key, value]) => root.style.setProperty(key, value));
    document.title = config.seo.title;
  }, [config]);
  const value = useMemo(() => ({ config, setConfig, reset }), [config]);
  return <SiteConfigContext.Provider value={value}>{children}</SiteConfigContext.Provider>;
}

export function useSiteConfig() {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) throw new Error('useSiteConfig must be used inside SiteConfigProvider');
  return ctx;
}

export { defaults as defaultSiteConfig };
