const serviceIndia = '/images/service-india.webp';
const servicePartnerships = '/images/service-partnerships.webp';
const commercial = '/images/hero.webp';
const boardroom = '/images/expertise-boardroom.webp';

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
    id: 'india-market-strategy',
    title: 'India Market Strategy & Intelligence',
    summary:
      'Advising global enterprises and private equity investors on market entry, expansion, and investment decisions. We deliver actionable intelligence, competitive opportunity assessments, and comprehensive strategic research to validate market viability.',
    points: [],
    image: serviceIndia,
    imageAlt: 'India Gate in New Delhi at dusk',
  },
  {
    id: 'strategic-partnerships',
    title: 'Strategic Partnerships & Ecosystem Access',
    summary:
      'Connecting institutional clients with critical stakeholders, including regulators, technology partners, EPCs, PMCs, and advanced supply chain networks. We evaluate prospective partners and facilitate strategic discussions to accelerate collaboration.',
    points: [],
    image: servicePartnerships,
    imageAlt: 'Advisors reviewing documents together at a desk',
  },
  {
    id: 'commercial-structuring',
    title: 'Commercial Structuring & Transactions',
    summary:
      'Providing strategic advisory throughout the development of joint ventures, alliances, and market entry operating models. Our partners facilitate commercial negotiations and provide strategic input on technology transfer and licensing arrangements (TALAs).',
    points: [],
    image: commercial,
    imageAlt: 'Glass office towers seen from street level',
  },
  {
    id: 'board-advisory',
    title: 'Board Advisory & Executive Leadership',
    summary:
      'Strengthening corporate governance and providing strategic decision support for boards, CEOs, and executive leadership teams. We assist leadership in solving complex industrial, organizational, and transactional challenges.',
    points: [],
    image: boardroom,
    imageAlt: 'Leadership team in discussion around a boardroom table',
  },
];
