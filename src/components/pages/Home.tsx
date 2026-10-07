'use client';

import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { WhatWeDo } from '@/components/sections/WhatWeDo';
import { Industries } from '@/components/sections/Industries';
import { Markets } from '@/components/sections/Markets';
import { QuoteSection } from '@/components/sections/QuoteSection';
import { Contact } from '@/components/sections/Contact';
import { Leadership } from '@/components/sections/Leadership';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { useSiteConfig } from '@/context/SiteConfig';

export function Home() {
  const { config } = useSiteConfig();
  const v = config.visibility;
  return (
    <>
      <Hero />
      {v.about && <About />}
      {/* Leadership normally sits inside “Who We Are”; it stands alone if that section is hidden. */}
      {!v.about && v.leadership && (
        <Section labelledBy="leadership-title">
          <Container>
            <Leadership />
          </Container>
        </Section>
      )}
      {v['what-we-do'] && <WhatWeDo />}
      {v.industries && <Industries />}
      {v.markets && <Markets />}
      {v.quote && <QuoteSection />}
      {v.contact && <Contact />}
    </>
  );
}
