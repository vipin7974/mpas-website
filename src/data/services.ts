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
    image: '/images/expertise-boardroom.webp',
    imageAlt: 'Leadership team in discussion around a boardroom table',
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
    image: '/images/service-partnerships.webp',
    imageAlt: 'Advisors reviewing documents together at a desk',
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
    image: '/images/service-supply-chain.webp',
    imageAlt: 'Freight and supply chain operations',
  },
  {
    id: 'decarbonization-sustainability',
    title: 'Decarbonization and Sustainability',
    summary: 'Enabling the transition to low-carbon and sustainable industrial growth.',
    points: [
      'Driving strategic growth in the energy transition across renewable energy, green hydrogen, biogas, and power generation.',
    ],
    image: '/images/service-decarbonization.webp',
    imageAlt: 'Renewable energy infrastructure',
  },
  {
    id: 'capital-to-execution-integration',
    title: 'Capital-to-Execution Integration',
    summary: 'Bridging investors, industry, and execution partners to accelerate outcomes.',
    points: [
      'Evaluating strategic options for establishing business entities, joint ventures, partnerships, or alliances.',
      'High-level commercial and strategic due diligence, alongside business structuring.',
    ],
    image: '/images/hero.webp',
    imageAlt: 'Glass office towers seen from street level',
  },
];
