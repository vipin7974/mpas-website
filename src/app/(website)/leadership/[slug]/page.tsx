import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Profile } from '@/components/pages/Profile';
import { getLeaderSlugs, getSiteContent } from '@/sanity/content';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getLeaderSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { leaders, brand } = await getSiteContent();
  const leader = leaders.find((l) => l.slug === slug);
  if (!leader) return {};
  const title = `${leader.name} | ${brand.shortName}`;
  const description = leader.summary || `${leader.name}, ${leader.title} at ${brand.name}.`;
  return {
    title,
    description,
    alternates: { canonical: `/leadership/${slug}` },
    openGraph: { title, description, url: `/leadership/${slug}`, images: leader.photo ? [leader.photo] : undefined },
  };
}

export default async function LeaderPage({ params }: Props) {
  const { slug } = await params;
  const { leaders } = await getSiteContent();
  if (!leaders.some((l) => l.slug === slug)) notFound();
  return <Profile slug={slug} />;
}
