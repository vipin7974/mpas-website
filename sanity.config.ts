import { defineConfig, type AuthStore, type CurrentUser } from 'sanity';
import { createClient } from '@sanity/client';
import { of } from 'rxjs';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId, siteUrl } from '@/sanity/env';
import { schemaTypes, singletonTypes } from '@/sanity/schemas';
import { structure } from '@/sanity/structure';
import { mpasTheme } from '@/sanity/theme/mpasTheme';
import { Logo } from '@/sanity/components/Logo';
import { openLivePage } from '@/sanity/components/OpenLivePage';
import { dashboardTool } from '@/sanity/dashboard/dashboardTool';

const singletons = new Set<string>(singletonTypes);

const sharedUser: CurrentUser = {
  id: 'mpas-admin',
  name: 'mpas Admin',
  email: '',
  role: 'administrator',
  roles: [{ name: 'administrator', title: 'Administrator' }],
};

/**
 * Shared-login mode: the Studio never talks to Sanity directly and holds no token.
 * Every request goes to /api/admin/sanity on this site, which checks the signed login
 * cookie and adds the Sanity token on the server.
 */
function createSharedAuth(): AuthStore {
  const origin = typeof window === 'undefined' ? siteUrl : window.location.origin;
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    useProjectHostname: false,
    apiHost: `${origin}/api/admin/sanity`,
    withCredentials: true,
  });
  return {
    state: of({ authenticated: true, currentUser: sharedUser, client }),
    logout: async () => {
      await fetch('/api/admin/logout', { method: 'POST' });
      window.location.assign('/admin/login');
    },
  };
}

export default defineConfig({
  name: 'mpas',
  title: 'mpas Website Admin',
  basePath: '/admin',
  projectId,
  dataset,
  auth: createSharedAuth(),
  theme: mpasTheme,
  schema: {
    types: schemaTypes,
    // Singletons (Homepage, Menu, Footer, Settings) cannot be created twice.
    templates: (templates) => templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },
  studio: { components: { logo: Logo } },
  tools: (prev, { currentUser }) => {
    const isAdmin = currentUser?.roles.some((r) => r.name === 'administrator');
    // Keep the admin simple: no Releases or other developer-facing tools.
    const keep = new Set(['structure', 'presentation', 'vision']);
    return [dashboardTool(), ...prev.filter((t) => keep.has(t.name) && (t.name !== 'vision' || isAdmin))];
  },
  plugins: [
    structureTool({ structure }),
    ...(process.env.NODE_ENV === 'development' ? [visionTool({ defaultApiVersion: apiVersion })] : []),
    presentationTool({
      title: 'Preview',
      previewUrl: { initial: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000', previewMode: { enable: '/api/draft-mode/enable' } },
      resolve: {
        locations: {
          homepage: { select: { id: '_id' }, resolve: () => ({ locations: [{ title: 'Homepage', href: '/' }] }) },
          teamMember: {
            select: { title: 'fullName', slug: 'slug.current' },
            resolve: (doc) => ({ locations: doc?.slug ? [{ title: String(doc.title ?? 'Profile'), href: `/leadership/${doc.slug}` }, { title: 'Homepage', href: '/#leadership' }] : [] }),
          },
        },
      },
    }),
  ],
  document: {
    actions: (prev, { schemaType }) => {
      const base = singletons.has(schemaType) ? prev.filter(({ action }) => action && !['unpublish', 'delete', 'duplicate'].includes(action)) : prev;
      return ['homepage', 'teamMember'].includes(schemaType) ? [...base, openLivePage] : base;
    },
    newDocumentOptions: (prev, { creationContext }) => (creationContext.type === 'global' ? prev.filter((o) => !singletons.has(o.templateId)) : prev),
  },
});
