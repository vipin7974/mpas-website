import type { Leader } from '@/sanity/types';
import { bullet, heading, paragraph } from '@/sanity/lib/portable';

/** Built-in leadership content: seed source for the CMS and fallback if Sanity is unreachable. */
export const defaultLeaders: Leader[] = [
  {
    slug: 'mahesh-palashikar',
    name: 'Mahesh Palashikar',
    initials: 'MP',
    title: 'Founder and Chief Executive Officer',
    summary:
      'A trusted advisor to global boards and institutional investors, with 38 years of experience building and transforming multi-billion-dollar industrial businesses across the Asia-Pacific region.',
    executiveSummary: [
      'Mahesh Palashikar is a trusted advisor to global corporations, institutional investors, and corporate boards. With 38 years of executive experience, he specializes in building, scaling, and transforming multi-billion-dollar high-tech industrial businesses across Asia-Pacific and global markets. At mpas, he advises on strategic market entry, value creation, partnerships, and capital-to-execution frameworks across the regulatory, industrial, and technology ecosystems.',
    ],
    biography: [
      heading('Leadership & Operational Experience'),
      paragraph(
        'As the former President & CEO of GE South Asia, he led a portfolio exceeding $3 billion and served as Chairman of two NSE-listed companies. In this capacity, he drove large-scale industrial transformation across the energy, healthcare, and aviation sectors while advancing the organization’s global decarbonization agenda.',
      ),
      paragraph(
        'Previously, he led GE’s Asia-Pacific renewable energy business. Under his strategic direction, the division expanded into critical new markets, scaling revenues from approximately $50 million to over $1.7 billion while structurally strengthening profitability, free cash flow, and localized executive leadership. His operational footprint spans complex markets including India, the USA, China, Japan, South Korea, Australia, New Zealand, Thailand, Vietnam, Bangladesh, and Sri Lanka.',
      ),
      heading('Board Governance & Advisory Focus'),
      paragraph(
        'Combining operational excellence with rigorous board governance, he champions continuous learning, principled leadership, and long-term value creation. His advisory expertise is concentrated in:',
      ),
      bullet('Energy Transition', 'Renewable energy (wind, hydro, solar, hybrids), energy storage, green hydrogen/ammonia, and biogas.'),
      bullet('Industrial Infrastructure', 'Thermal power, transmission and distribution, grid solutions, and electrification.'),
      bullet('Strategic Sectors', 'Healthcare, medical technology, aerospace and defense, advanced manufacturing, and industrial electronics.'),
    ],
    photo: '',
    linkedin: '',
    email: '',
  },
  {
    slug: 'ravi-anand',
    name: 'Ravi Anand',
    initials: 'RA',
    title: 'Chief Value Officer',
    summary:
      'A global business executive and former board director bringing over four decades of leadership in commercial strategy, operational excellence, and industrial transformation across 19 countries.',
    executiveSummary: [
      'Ravi Anand brings over four decades of global executive leadership across the power generation, industrial services, and oil and gas sectors. Throughout his tenure at GE, Alstom, and Rolls-Royce, he has developed a proven capability in driving sustained commercial growth, executing complex transformations, and scaling international operations. At mpas, he advises clients on business transformation, operational rigor, and the execution of high-stakes commercial strategies that generate lasting stakeholder value.',
    ],
    biography: [
      heading('Leadership & Commercial Impact'),
      paragraph(
        'His operational experience spans 19 countries across the MENAT region, Europe, and Asia, where he has consistently aligned multicultural organizations with overarching strategic objectives. His commercial leadership has been instrumental in delivering over $250 million in orders and overseeing businesses associated with a 100 GW installed base. He has a distinct capability in establishing and scaling field resources and integrating advanced operational frameworks, such as LEAN methodologies, to optimize industrial efficiency.',
      ),
      heading('Board Governance & Institutional Integrity'),
      paragraph(
        'An experienced governance leader, he has served as a Board Director for GE Morocco and GE India Power Services (GEPSIL), providing fiduciary oversight and strategic direction for joint ventures and regional entities. Demonstrating a foundational commitment to corporate ethics and compliance, he also served as the Senior Ombudsperson for the MENAT and South Asia regions.',
      ),
    ],
    photo: '',
    linkedin: '',
    email: '',
  },
  {
    slug: 'shalini-saxena',
    name: 'Shalini Saxena',
    initials: 'SS',
    title: 'Senior Advisor',
    summary: '',
    executiveSummary: [],
    biography: [],
    photo: '',
    linkedin: '',
    email: '',
  },
];
