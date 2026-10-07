const manufacturing = '/images/industry-manufacturing.webp';
const energy = '/images/industry-energy.webp';
const infrastructure = '/images/industry-infrastructure.webp';
const logistics = '/images/industry-logistics.webp';
const technology = '/images/industry-technology.webp';
const critical = '/images/markets-earth.webp';

export interface Industry {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const industries: Industry[] = [
  {
    id: 'manufacturing',
    name: 'Manufacturing & Industrials',
    description: 'Localisation, capacity expansion and operational excellence for India’s manufacturing push.',
    image: manufacturing,
    imageAlt: 'Industrial processing equipment and pipework',
  },
  {
    id: 'energy',
    name: 'Energy & Renewables',
    description: 'Strategy and partnerships across the energy transition, from utility-scale solar to storage.',
    image: energy,
    imageAlt: 'Aerial view of a large solar farm',
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    description: 'Structuring and executing projects that underpin India’s next phase of growth.',
    image: infrastructure,
    imageAlt: 'Construction workers on a building site',
  },
  {
    id: 'logistics',
    name: 'Logistics & Supply Chain',
    description: 'Network design, warehousing and trade corridors built for scale and resilience.',
    image: logistics,
    imageAlt: 'Large distribution warehouse with stacked goods',
  },
  {
    id: 'technology',
    name: 'Technology & Engineering',
    description: 'Advanced engineering, electronics and technology-led capability building.',
    image: technology,
    imageAlt: 'Engineer working in an automation laboratory',
  },
  {
    id: 'critical',
    name: 'Critical Industries',
    description: 'Aerospace, defense, healthcare, and medical technology.',
    image: critical,
    imageAlt: 'Critical industries',
  },
];
