import serviceIndia from '@/assets/images/service-india.webp';
import servicePartnerships from '@/assets/images/service-partnerships.webp';
import serviceSupplyChain from '@/assets/images/service-supply-chain.webp';
import serviceDecarbonization from '@/assets/images/service-decarbonization.webp';

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
    id: 'india-strategy',
    title: 'Boardroom & India Strategy',
    summary:
      'Board-level counsel to shape a clear, credible India strategy — where to play, how to enter and how to win over the long term.',
    points: [
      'India entry and expansion strategy',
      'Market, policy and regulatory assessment',
      'Location and footprint planning',
      'Board and leadership advisory',
    ],
    image: serviceIndia,
    imageAlt: 'India Gate in New Delhi at dusk',
  },
  {
    id: 'partnerships-capital',
    title: 'Strategic Partnerships & Capital',
    summary:
      'Unlocking the right partnerships and the right capital — connecting investors, corporates and institutions around opportunities that hold up.',
    points: [
      'Partner identification and due diligence',
      'Joint venture and alliance structuring',
      'Capital provider and investor connect',
      'Transaction and negotiation support',
    ],
    image: servicePartnerships,
    imageAlt: 'Advisors reviewing documents together at a desk',
  },
  {
    id: 'supply-chain',
    title: 'Supply Chain Optimization',
    summary:
      'Building resilient, cost-competitive supply chains that position India as a sourcing and manufacturing hub.',
    points: [
      'Supply chain diagnostics and redesign',
      'Supplier and vendor ecosystem development',
      'Manufacturing and localisation strategy',
      'Logistics and network optimization',
    ],
    image: serviceSupplyChain,
    imageAlt: 'Container ship carrying cargo at sea',
  },
  {
    id: 'decarbonization',
    title: 'Decarbonization & Sustainability',
    summary:
      'Turning climate commitments into bankable, executable programmes aligned with India’s energy transition.',
    points: [
      'Decarbonization roadmaps and targets',
      'Energy transition and renewables strategy',
      'Green finance and project structuring',
      'Implementation and progress tracking',
    ],
    image: serviceDecarbonization,
    imageAlt: 'Wind turbines across open fields at sunset',
  },
];
