export interface Market {
  id: string;
  name: string;
  /** Label used inside the corridor diagram. */
  short: string;
  focus: string;
}

/** Corridors into (and out of) India. Order matches the diagram, top to bottom. */
export const markets: Market[] = [
  { id: 'north-america', name: 'North America', short: 'North America', focus: 'Capital, technology and advanced manufacturing' },
  { id: 'europe', name: 'United Kingdom & Europe', short: 'UK & Europe', focus: 'Industrial partnerships and energy transition' },
  { id: 'middle-east', name: 'Middle East', short: 'Middle East', focus: 'Sovereign capital and infrastructure' },
  { id: 'east-asia', name: 'Japan & East Asia', short: 'East Asia', focus: 'Manufacturing, electronics and supply chains' },
  { id: 'southeast-asia', name: 'Southeast Asia', short: 'Southeast Asia', focus: 'Trade corridors and regional expansion' },
  { id: 'oceania', name: 'Australia & Oceania', short: 'Oceania', focus: 'Critical minerals, education and agri-food' },
];

export interface Audience {
  title: string;
  description: string;
}

/** Who mpas works with (brand book, 01 / About Us). */
export const audiences: Audience[] = [
  {
    title: 'Corporates',
    description: 'Global and Indian businesses shaping their India strategy, entry or next phase of scale.',
  },
  {
    title: 'Capital Providers',
    description: 'Investors and financial institutions seeking credible, execution-ready opportunities.',
  },
  {
    title: 'Government Bodies',
    description: 'Public institutions attracting investment and building industrial capability.',
  },
  {
    title: 'Industry Stakeholders',
    description: 'Associations, ecosystems and partners driving sector-wide value creation.',
  },
];
