const manufacturing = '/images/industry-manufacturing-tata-pune.webp';
const energy = '/images/service-decarbonization-muppandal.webp';
const infrastructure = '/images/industry-infrastructure-atal-setu.webp';
const supplyChain = '/images/industry-supply-chain-freight.webp';
const technology = '/images/industry-technology-chandrayaan.webp';
const aerospace = '/images/industry-aerospace-tejas.webp';
const financial = '/images/industry-financial-bkc.webp';
const agri = '/images/industry-agri-food-tea.webp';
const medtech = '/images/industry-medtech-ultrasound.webp';

export interface Industry {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const industries: Industry[] = [
  {
    id: 'energy',
    name: 'Energy & Renewables',
    description: 'Strategy and partnerships across the energy transition, from utility-scale solar to storage.',
    image: energy,
    imageAlt: 'Wind farm at Muppandal, Tamil Nadu',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Industrials',
    description: 'Localisation, capacity expansion and operational excellence for India’s manufacturing push.',
    image: manufacturing,
    imageAlt: 'Tata Motors manufacturing facility in Pune',
  },
  {
    id: 'logistics',
    name: 'Logistics & Supply Chain',
    description: 'Network design, warehousing and trade corridors built for scale and resilience.',
    image: supplyChain,
    imageAlt: 'A container freight train on India’s Western Dedicated Freight Corridor',
  },
  {
    id: 'medtech',
    name: 'MedTech / Healthcare',
    description: 'Medical technology, devices and healthcare infrastructure, from localisation to market access.',
    image: medtech,
    imageAlt: 'A modern medical ultrasound scanner',
  },
  {
    id: 'aerospace',
    name: 'Aerospace / Defense',
    description: 'Aerospace and defense supply chains, partnerships and indigenisation programmes.',
    image: aerospace,
    imageAlt: 'An indigenous Tejas fighter aircraft on the apron at an Indian airbase',
  },
  {
    id: 'technology',
    name: 'Technology & Engineering',
    description: 'Advanced engineering, electronics and technology-led capability building.',
    image: technology,
    imageAlt: 'The Chandrayaan-3 lander module in an ISRO clean room',
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    description: 'Structuring and executing projects that underpin India’s next phase of growth.',
    image: infrastructure,
    imageAlt: 'Atal Setu sea bridge in Mumbai',
  },
  {
    id: 'financial',
    name: 'Financial Services & Capital Markets',
    description: 'Connecting institutional capital with India’s fastest-growing businesses and projects.',
    image: financial,
    imageAlt: 'Office towers in Mumbai’s Bandra Kurla Complex financial district',
  },
  {
    id: 'agri-food',
    name: 'Agri-Food & Agribusiness',
    description: 'Value-chain, processing and export strategy across India’s food and agriculture economy.',
    image: agri,
    imageAlt: 'Tea plantations on the hills of Darjeeling',
  },
];
