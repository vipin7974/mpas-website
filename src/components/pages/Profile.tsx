'use client';

import Link from 'next/link';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { ArrowLeft } from 'lucide-react';
import type { Leader } from '@/sanity/types';
import { useSiteConfig } from '@/context/SiteConfig';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { Reveal } from '@/components/common/Reveal';
import { Monogram, LinkedinIcon } from '@/components/sections/Leadership';

const linkedinClass =
  'group inline-flex items-center gap-3 rounded-sm bg-[#0A66C2] px-6 py-3.5 font-outfit text-[1.0625rem] font-medium text-white shadow-sm transition-colors duration-300 hover:bg-[#004182] focus-visible:bg-[#004182]';

/** Biography copy: “Section heading” blocks become the small captions; bullets keep the site's dash style. */
const bioComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-5 text-body-lg text-text-secondary first:mt-0">{children}</p>,
    h3: ({ children }) => <h2 className="eyebrow mb-5 mt-14 border-t border-line pt-10 text-text-muted first:mt-0 first:border-0 first:pt-0">{children}</h2>,
    blockquote: ({ children }) => <blockquote className="mt-6 border-l border-mpas-green-dark pl-5 font-outfit text-h3 font-light text-ink">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="mt-6 space-y-4">{children}</ul>,
    number: ({ children }) => <ol className="mt-6 list-decimal space-y-4 pl-6 text-text-secondary">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-3 text-text-secondary">
        <span aria-hidden className="mt-[0.8em] h-px w-3 shrink-0 bg-mpas-green-dark" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-medium text-ink">{children}</strong>,
    link: ({ value, children }) => (
      <a href={value?.href} className="link-underline text-ink" {...(String(value?.href).startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    ),
  },
};

function ProfileBody({ leader }: { leader: Leader }) {
  const hasBio = leader.executiveSummary.length > 0 || leader.biography.length > 0;
  return (
    <article id="top" className="pb-section pt-[calc(var(--spacing-header)+2.5rem)] md:pt-[calc(var(--spacing-header)+4rem)]">
      <Container>
        <Link href="/#leadership" className="link-underline inline-flex items-center gap-2 font-outfit text-small text-text-secondary hover:text-ink">
          <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden /> Back to Leadership
        </Link>

        <header className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-center md:gap-12">
          <Monogram initials={leader.initials} photo={leader.photo} className="size-32 text-h1 md:size-44" />
          <div>
            <h1 id="profile-title" className="font-outfit text-h1 text-ink">
              {leader.name}
            </h1>
            <p className="eyebrow mt-4 text-mpas-green-dark">{leader.title}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {leader.linkedin && (
                <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className={linkedinClass} aria-label={`${leader.name} on LinkedIn (opens in a new tab)`}>
                  <LinkedinIcon className="size-6" /> View LinkedIn profile
                </a>
              )}
            </div>
          </div>
        </header>

        <div className="mt-16 max-w-3xl border-t border-line md:mt-24">
          {hasBio ? (
            <>
              {leader.executiveSummary.length > 0 && (
                <Reveal className="border-b border-line py-10">
                  <h2 className="eyebrow mb-5 text-text-muted">Executive Summary</h2>
                  {leader.executiveSummary.map((p) => (
                    <p key={p} className="mt-5 text-body-lg text-text-secondary first:mt-0">{p}</p>
                  ))}
                </Reveal>
              )}
              {leader.biography.length > 0 && (
                <Reveal className="border-b border-line py-10">
                  <PortableText value={leader.biography} components={bioComponents} />
                </Reveal>
              )}
            </>
          ) : (
            <p className="pt-10 text-body-lg text-text-secondary">Full profile coming soon.</p>
          )}
        </div>

        <div className="mt-14">
          <Button href="/#contact">Start a conversation</Button>
        </div>
      </Container>
    </article>
  );
}

export function Profile({ slug }: { slug: string }) {
  const { config } = useSiteConfig();
  const leader = config.leaders.find((l) => l.slug === slug);
  if (!leader) return null;
  return <ProfileBody leader={leader} />;
}
