import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Expertise } from '@/components/sections/Expertise';
import { WhatWeDo } from '@/components/sections/WhatWeDo';
import { Industries } from '@/components/sections/Industries';
import { Capabilities } from '@/components/sections/Capabilities';
import { Markets } from '@/components/sections/Markets';
import { QuoteSection } from '@/components/sections/QuoteSection';
import { Contact } from '@/components/sections/Contact';

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <WhatWeDo />
      <Industries />
      <Capabilities />
      <Markets />
      <QuoteSection />
      <Contact />
    </>
  );
}
