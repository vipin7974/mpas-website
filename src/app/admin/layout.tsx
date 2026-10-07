export const metadata = { title: 'mpas Website Admin', robots: { index: false, follow: false } };
export const viewport = { width: 'device-width', initialScale: 1 };

/** Own root layout: the website's header, footer, styles and animations never load inside the admin. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
