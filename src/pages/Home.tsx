import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Expertise } from '@/components/sections/Expertise';
import { WhatWeDo } from '@/components/sections/WhatWeDo';
import { Industries } from '@/components/sections/Industries';
import { Capabilities } from '@/components/sections/Capabilities';
import { Markets } from '@/components/sections/Markets';
import { QuoteSection } from '@/components/sections/QuoteSection';
import { Contact } from '@/components/sections/Contact';
import { useSiteConfig } from '@/context/SiteConfig';

export function Home() {
  const { config } = useSiteConfig();
  return <>
    <Hero />
    {config.visibility.about && <About />}
    {config.visibility.expertise && <Expertise />}
    {config.visibility['what-we-do'] && <WhatWeDo />}
    {config.visibility.industries && <Industries />}
    {config.visibility.capabilities && <Capabilities />}
    {config.visibility.markets && <Markets />}
    {config.visibility.quote && <QuoteSection />}
    {config.visibility.contact && <Contact />}
  </>;
}
