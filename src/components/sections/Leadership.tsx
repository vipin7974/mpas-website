import { leaders, leaderPath, type Leader } from '@/data/leadership';
import { Reveal } from '@/components/common/Reveal';
import { Button } from '@/components/common/Button';
import { cn } from '@/lib/utils';

export function Monogram({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-mpas-green-dark font-outfit font-light tracking-[0.04em] text-white ring-1 ring-line transition-transform duration-700 ease-expo group-hover:scale-[1.04]',
        className,
      )}
    >
      {initials}
    </span>
  );
}

function LeaderCard({ leader, featured }: { leader: Leader; featured?: boolean }) {
  const href = leaderPath(leader.slug);
  return (
    <Reveal
      as="article"
      className={cn(
        'group relative flex flex-col gap-6 rounded-md bg-surface p-7 md:p-9',
        featured && 'md:flex-row md:items-center md:gap-10 md:p-10',
      )}
    >
      <a href={href} aria-label={`${leader.name} — view profile`} className="shrink-0 self-start rounded-full">
        <Monogram initials={leader.initials} className={featured ? 'size-28 text-h2 md:size-36' : 'size-24 text-h2'} />
      </a>
      <div>
        <h3 className="font-outfit text-h3 text-ink">
          <a href={href} className="link-underline">
            {leader.name}
          </a>
        </h3>
        <p className="eyebrow mt-2 text-mpas-green-dark">{leader.title}</p>
        <p className="mt-4 max-w-xl text-text-secondary">
          {leader.summary || 'Profile coming soon.'}
        </p>
        <div className="mt-6">
          <Button href={href} variant="link">
            View Profile
          </Button>
        </div>
      </div>
    </Reveal>
  );
}

export function Leadership() {
  const [founder, ...others] = leaders;
  return (
    <div id="leadership" className="mt-24 md:mt-32">
      <h3 id="leadership-title" className="eyebrow mb-8 flex items-center gap-3 text-text-secondary">
        <span aria-hidden className="h-px w-8 bg-mpas-orange/20" />
        Leadership
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        <div className="md:col-span-2">
          <LeaderCard leader={founder} featured />
        </div>
        {others.map((l) => (
          <LeaderCard key={l.slug} leader={l} />
        ))}
      </div>
    </div>
  );
}
