import { useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Box, Card, Container, Heading, Text } from '@sanity/ui';
import { BillIcon } from '@sanity/icons/Bill';
import { CaseIcon } from '@sanity/icons/Case';
import { CogIcon } from '@sanity/icons/Cog';
import { HomeIcon } from '@sanity/icons/Home';
import { ImageIcon } from '@sanity/icons/Image';
import { UserIcon } from '@sanity/icons/User';
import type { IconComponent } from '@sanity/icons';
import { useClient } from 'sanity';
import { useRouter } from 'sanity/router';
import { brand } from '../theme/mpasTheme';

const gap = (n: number) => n * 4;

function Stack({ space, children }: { space: number; children: ReactNode }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: gap(space) }}>{children}</div>;
}

function Flex({ children, gap: g = 0, wrap, align, justify, style }: { children: ReactNode; gap?: number; wrap?: 'wrap'; align?: string; justify?: string; style?: CSSProperties }) {
  return <div style={{ display: 'flex', gap: gap(g), flexWrap: wrap, alignItems: align === 'center' ? 'center' : undefined, justifyContent: justify === 'center' ? 'center' : justify === 'space-between' ? 'space-between' : undefined, ...style }}>{children}</div>;
}

/** Responsive columns without media queries: cards wrap when narrower than `min`. */
function Grid({ children, min, gap: g }: { children: ReactNode; min: number; gap: number }) {
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`, gap: gap(g) }}>{children}</div>;
}

type Status = { published: number; drafts: number; updated: string | null };

const cards: { title: string; text: string; cta: string; path: string; icon: IconComponent }[] = [
  { title: 'Homepage', text: 'Edit every section of your homepage', cta: 'Edit Homepage', path: '/admin/structure/website;homepage', icon: HomeIcon },
  { title: 'Leadership', text: 'Manage advisors and team members', cta: 'Manage Leadership', path: '/admin/structure/content;leadership', icon: UserIcon },
  { title: 'Strategic Capabilities', text: 'Manage the services you offer', cta: 'Manage Capabilities', path: '/admin/structure/content;services', icon: CaseIcon },
  { title: 'Industry Sectors', text: 'Manage industries and expertise', cta: 'Manage Sectors', path: '/admin/structure/content;industries', icon: BillIcon },
  { title: 'Images', text: 'Browse and manage website images', cta: 'Open Images', path: '/admin/structure/images', icon: ImageIcon },
  { title: 'Website Settings', text: 'Logo, contact details, social links and search', cta: 'Open Settings', path: '/admin/structure/siteSettings', icon: CogIcon },
];

const quick: { label: string; path: string }[] = [
  { label: 'Edit Homepage', path: '/admin/structure/website;homepage' },
  { label: 'Add Team Member', path: '/admin/intent/create/template=teamMember;type=teamMember/' },
  { label: 'Update Contact Details', path: '/admin/structure/siteSettings' },
  { label: 'Edit Menu', path: '/admin/structure/website;navigation' },
];

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

export function Dashboard() {
  const client = useClient({ apiVersion: '2025-01-01' });
  const router = useRouter();
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    let live = true;
    client
      .fetch<Status>(
        `{
          "published": count(*[_type in ["homepage","siteSettings","navigation","footer","teamMember","service","industry"] && !(_id in path("drafts.**"))]),
          "drafts": count(*[_type in ["homepage","siteSettings","navigation","footer","teamMember","service","industry"] && _id in path("drafts.**")]),
          "updated": *[_type in ["homepage","siteSettings","navigation","footer","teamMember","service","industry"]] | order(_updatedAt desc)[0]._updatedAt
        }`,
      )
      .then((s) => live && setStatus(s))
      .catch(() => live && setStatus(null));
    return () => {
      live = false;
    };
  }, [client]);

  const go = (path: string) => router.navigateUrl({ path });
  const signOut = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.assign('/admin/login');
  };

  return (
    <Box style={{ background: brand.canvas, minHeight: '100%' }} padding={[4, 5, 6]}>
      <Container width={3}>
        <Stack space={6}>
          <Flex align="center" justify="space-between" wrap="wrap" gap={4}>
            <div style={{ flex: '1 1 320px' }}>
            <Stack space={3}>
              <Text size={1} muted>
                {greeting()} — Welcome
              </Text>
              <Heading as="h1" size={4}>
                mpas Website Admin
              </Heading>
              <Text size={2} muted>
                What would you like to update? Manage your website content here.
              </Text>
            </Stack>
            </div>
            <Card
              as="button"
              type="button"
              padding={3}
              radius={2}
              border
              onClick={signOut}
              style={{ cursor: 'pointer', display: 'inline-block' }}
            >
              <Text size={1} weight="medium">Log out</Text>
            </Card>
          </Flex>

          <Grid min={260} gap={4}>
            {cards.map((c) => {
              const Icon = c.icon;
              return (
                <Card
                  key={c.title}
                  as="button"
                  type="button"
                  padding={4}
                  radius={3}
                  shadow={1}
                  onClick={() => go(c.path)}
                  style={{ textAlign: 'left', cursor: 'pointer', border: 0 }}
                  aria-label={`${c.title}. ${c.text}`}
                >
                  <Stack space={4}>
                    <Flex
                      align="center"
                      justify="center"
                      style={{ width: 44, height: 44, borderRadius: 999, background: brand.greenDark, color: '#fff' }}
                    >
                      <Text size={3} style={{ color: 'inherit' }}>
                        <Icon />
                      </Text>
                    </Flex>
                    <Stack space={2}>
                      <Text size={3} weight="semibold">
                        {c.title}
                      </Text>
                      <Text size={1} muted>
                        {c.text}
                      </Text>
                    </Stack>
                    <Text size={1} weight="semibold" style={{ color: brand.orangeRed }}>
                      {c.cta} →
                    </Text>
                  </Stack>
                </Card>
              );
            })}
          </Grid>

          <Grid min={340} gap={4}>
            <Card padding={4} radius={3} shadow={1}>
              <Stack space={4}>
                <Text size={2} weight="semibold">
                  Website status
                </Text>
                {status ? (
                  <Grid min={110} gap={3}>
                    <Stack space={2}>
                      <Text size={4} weight="semibold">{status.published}</Text>
                      <Text size={1} muted>Published items</Text>
                    </Stack>
                    <Stack space={2}>
                      <Text size={4} weight="semibold">{status.drafts}</Text>
                      <Text size={1} muted>Changes not yet published</Text>
                    </Stack>
                    <Stack space={2}>
                      <Text size={2} weight="semibold">
                        {status.updated ? new Date(status.updated).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                      </Text>
                      <Text size={1} muted>Last updated</Text>
                    </Stack>
                  </Grid>
                ) : (
                  <Text size={1} muted>Loading…</Text>
                )}
              </Stack>
            </Card>

            <Card padding={4} radius={3} shadow={1}>
              <Stack space={4}>
                <Text size={2} weight="semibold">
                  Quick actions
                </Text>
                <Flex gap={3} wrap="wrap">
                  {quick.map((q) => (
                    <Card
                      key={q.label}
                      as="button"
                      type="button"
                      padding={3}
                      radius={2}
                      border
                      onClick={() => go(q.path)}
                      style={{ cursor: 'pointer', display: 'inline-block' }}
                    >
                      <Text size={1} weight="medium">+ {q.label}</Text>
                    </Card>
                  ))}
                </Flex>
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
