import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { WhatWeDo } from '@/components/sections/WhatWeDo';
import { Industries } from '@/components/sections/Industries';
import { Markets } from '@/components/sections/Markets';
import { QuoteSection } from '@/components/sections/QuoteSection';
import { Contact } from '@/components/sections/Contact';
import { useSiteConfig } from '@/context/SiteConfig';

export function Home() {
  const { config } = useSiteConfig();
  return <>
    <Hero />
    {config.visibility.about && <About />}
    {config.visibility['what-we-do'] && <WhatWeDo />}
    {config.visibility.industries && <Industries />}
    {config.visibility.markets && <Markets />}
    {config.visibility.quote && <QuoteSection />}
    {config.visibility.contact && <Contact />}
  </>;
}
