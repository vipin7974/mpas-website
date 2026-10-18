export interface Service {
  id: string;
  title: string;
  summary: string;
  points: string[];
  image: string;
  imageAlt: string;
}

export const services: Service[] = [
  {
    id: 'india-strategy-market-intelligence',
    title: 'India Strategy and Market Intelligence',
    summary:
      'Strategic advisory for global corporations, private equity, and institutional investors.',
    points: [
      'Actionable insights for market entry, expansion, and investment decisions.',
      'Market, sector, and industry research, alongside competitive landscape and opportunity assessments.',
    ],
    image: '/images/service-india.webp',
    imageAlt: 'India Gate in New Delhi at dusk',
  },
  {
    id: 'board-advisory-strategic-partnerships',
    title: 'Board Advisory & Strategic Partnerships',
    summary: 'Strengthening leadership, governance, and strategic decision-making.',
    points: [
      'Creating high-impact collaborations and investment opportunities.',
      'Board, CEO, and executive advisory paired with leadership coaching and strategic decision support.',
    ],
    image: '/images/industry-financial-bkc.webp',
    imageAlt: 'Bandra Kurla Complex business district, Mumbai',
  },
  {
    id: 'strategic-ecosystem-integrator',
    title: 'Strategic Ecosystem Integrator',
    summary:
      'Connecting clients with regulators, industry leaders, technology partners, EPCs, PMCs, and supply chain networks.',
    points: [
      'Acting as a strategic enabler bridging corporates, government entities, project delivery firms, and the professional ecosystem.',
      'Facilitating strategic discussions, stakeholder mapping, and advisory support for government engagement.',
    ],
    image: '/images/industry-infrastructure-atal-setu.webp',
    imageAlt: 'Atal Setu sea bridge, Mumbai',
  },
  {
    id: 'industrial-growth-supply-chain',
    title: 'Industrial Growth & Supply Chain Optimization',
    summary:
      'Deep sector expertise across high tech strategic industries, advanced manufacturing and services.',
    points: [
      'Building resilient, efficient, and future-ready value chains.',
      'Identification, evaluation, and strategic vetting of consultants, advisors, technology partners, EPCs, and PMCs.',
    ],
    image: '/images/industry-supply-chain-freight.webp',
    imageAlt: 'Dedicated Freight Corridor goods train in India',
  },
  {
    id: 'decarbonization-sustainability',
    title: 'Decarbonization and Sustainability',
    summary: 'Enabling the transition to low-carbon and sustainable industrial growth.',
    points: [
      'Driving strategic growth in the energy transition across renewable energy, green hydrogen, biogas, and power generation.',
    ],
    image: '/images/service-decarbonization-muppandal.webp',
    imageAlt: 'Wind farm at Muppandal, Tamil Nadu',
  },
  {
    id: 'capital-to-execution-integration',
    title: 'Capital-to-Execution Integration',
    summary: 'Bridging investors, industry, and execution partners to accelerate outcomes.',
    points: [
      'Evaluating strategic options for establishing business entities, joint ventures, partnerships, or alliances.',
      'High-level commercial and strategic due diligence, alongside business structuring.',
    ],
    image: '/images/service-capital-bse-dalal-street.webp',
    imageAlt: 'BSE building on Dalal Street, Mumbai',
  },
];
