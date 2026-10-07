import { ArrowLeft, Mail } from 'lucide-react';
import { leaders, type Leader } from '@/data/leadership';
import { useSiteConfig } from '@/context/SiteConfig';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { Reveal } from '@/components/common/Reveal';
import { Monogram } from '@/components/sections/Leadership';

function Linkedin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export const profileSlug = () => {
  const m = window.location.pathname.match(/^\/leadership\/([^/]+)\/?$/);
  return m ? m[1] : null;
};

const actionClass =
  'group inline-flex items-center gap-2.5 rounded-sm border border-ink/25 px-4 py-2.5 font-outfit text-small font-medium text-ink transition-colors duration-500 hover:border-ink hover:bg-mpas-orange hover:text-white focus-visible:bg-mpas-orange focus-visible:text-white';

function ProfileBody({ leader }: { leader: Leader }) {
  const { config } = useSiteConfig();
  const email = leader.email || config.brand.email;
  const subject = encodeURIComponent(`Enquiry for ${leader.name}`);
  return (
    <article id="top" className="pb-section pt-[calc(var(--spacing-header)+2.5rem)] md:pt-[calc(var(--spacing-header)+4rem)]">
      <Container>
        <a href="/#leadership" className="link-underline inline-flex items-center gap-2 font-outfit text-small text-text-secondary hover:text-ink">
          <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden /> Back to Leadership
        </a>

        <header className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-center md:gap-12">
          <Monogram initials={leader.initials} className="size-32 text-h1 md:size-44" />
          <div>
            <h1 id="profile-title" className="font-outfit text-h1 text-ink">
              {leader.name}
            </h1>
            <p className="eyebrow mt-4 text-mpas-green-dark">{leader.title}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {leader.linkedin && (
                <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className={actionClass}>
                  <Linkedin className="size-4" /> LinkedIn
                </a>
              )}
              <a href={`mailto:${email}?subject=${subject}`} className={actionClass}>
                <Mail className="size-4" strokeWidth={1.5} aria-hidden /> Email
              </a>
            </div>
          </div>
        </header>

        <div className="mt-16 max-w-3xl border-t border-line md:mt-24">
          {leader.pending ? (
            <p className="pt-10 text-body-lg text-text-secondary">Full profile coming soon.</p>
          ) : (
            <>
              <Reveal className="border-b border-line py-10">
                <h2 className="eyebrow mb-5 text-text-muted">Executive Summary</h2>
                {leader.executiveSummary.map((p) => (
                  <p key={p} className="text-body-lg text-text-secondary">{p}</p>
                ))}
              </Reveal>
              {leader.sections.map((sec) => (
                <Reveal key={sec.heading} className="border-b border-line py-10">
                  <h2 className="eyebrow mb-5 text-text-muted">{sec.heading}</h2>
                  <div className="space-y-5 text-body-lg text-text-secondary">
                    {sec.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                  {sec.bullets && (
                    <ul className="mt-6 space-y-4">
                      {sec.bullets.map((b) => (
                        <li key={b.label} className="flex gap-3 text-text-secondary">
                          <span aria-hidden className="mt-[0.8em] h-px w-3 shrink-0 bg-mpas-green-dark" />
                          <span>
                            <strong className="font-medium text-ink">{b.label}:</strong> {b.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              ))}
            </>
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
  const leader = leaders.find((l) => l.slug === slug);
  if (!leader) {
    return (
      <div className="pb-section pt-[calc(var(--spacing-header)+4rem)]">
        <Container>
          <h1 className="font-outfit text-h1 text-ink">Profile not found</h1>
          <div className="mt-8"><Button href="/#leadership">Back to Leadership</Button></div>
        </Container>
      </div>
    );
  }
  return <ProfileBody leader={leader} />;
}
