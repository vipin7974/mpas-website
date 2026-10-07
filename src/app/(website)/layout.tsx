import type { Metadata, Viewport } from 'next';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';
import '@fontsource-variable/outfit';
import '@fontsource-variable/public-sans';
import '../globals.css';
import { getSiteContent } from '@/sanity/content';
import { siteUrl } from '@/sanity/env';
import { SiteConfigProvider } from '@/context/SiteConfig';
import { SiteShell } from '@/components/layout/SiteShell';
import { LiveRefresh } from '@/components/layout/LiveRefresh';

export const viewport: Viewport = { themeColor: '#F6F6F3' };

export async function generateMetadata(): Promise<Metadata> {
  const { seo, brand } = await getSiteContent();
  const image = seo.image || '/og-image.png';
  return {
    metadataBase: new URL(siteUrl),
    title: seo.title,
    description: seo.description,
    alternates: { canonical: '/' },
    robots: seo.noIndex ? { index: false, follow: false } : undefined,
    icons: { icon: '/favicon.png', apple: '/apple-touch-icon.png' },
    openGraph: {
      type: 'website',
      siteName: brand.shortName,
      title: seo.title,
      description: seo.description,
      url: '/',
      locale: 'en_IN',
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: seo.title, description: seo.description, images: [image] },
  };
}

export default async function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();
  const { isEnabled } = await draftMode();
  return (
    <html lang="en-IN">
      <body>
        <SiteConfigProvider content={content}>
          <SiteShell>{children}</SiteShell>
        </SiteConfigProvider>
        <LiveRefresh />
        {isEnabled && <VisualEditing />}
        <noscript>
          <p style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
            Mahesh Palashikar Advisory Services (mpas) — please enable JavaScript to view this site, or write to{' '}
            {content.brand.email}.
          </p>
        </noscript>
      </body>
    </html>
  );
}
