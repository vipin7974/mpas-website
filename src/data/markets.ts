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
  { id: 'europe', name: 'European Union', short: 'European Union', focus: 'Industrial partnerships and energy transition' },
  { id: 'middle-east', name: 'Middle East', short: 'Middle East', focus: 'Sovereign capital and infrastructure' },
  { id: 'east-asia', name: 'East Asia', short: 'East Asia', focus: 'Manufacturing, electronics and supply chains' },
  { id: 'southeast-asia', name: 'Southeast Asia', short: 'Southeast Asia', focus: 'Trade corridors and regional expansion' },
  { id: 'oceania', name: 'Australia and New Zealand', short: 'Australia and New Zealand', focus: 'Critical minerals, education and agri-food' },
];
