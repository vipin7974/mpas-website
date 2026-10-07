import { NextResponse, type NextRequest } from 'next/server';
import { isSameOrigin } from '@/lib/adminSession';
import { projectId } from '@/sanity/env';

/**
 * Server-side bridge between the admin and Sanity.
 *
 * The browser only ever holds the signed login cookie. This route (reachable only with a valid
 * session — see src/proxy.ts) adds the Sanity token on the server, so the token never reaches
 * client-side JavaScript and editors need no Sanity accounts.
 */
export const dynamic = 'force-dynamic';

const GLOBAL_HOST = 'https://api.sanity.io';
const PROJECT_HOST = `https://${projectId}.api.sanity.io`;
/** Only what the Studio needs: content, files and read-only project info. Everything else is refused. */
const ALLOWED = /^\/v[\w-]+\/(data|assets|projects|users|jobs|ping|features|help|journey)(\/|$)/;

const adminUser = {
  id: 'mpas-admin',
  name: 'mpas Admin',
  email: '',
  profileImage: null,
  role: 'administrator',
  roles: [{ name: 'administrator', title: 'Administrator', description: '' }],
  provider: 'mpas',
};

type Ctx = { params: Promise<{ path: string[] }> };

async function handle(request: NextRequest, { params }: Ctx) {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return NextResponse.json({ error: 'CMS is not configured.' }, { status: 503 });

  const mutating = !['GET', 'HEAD'].includes(request.method);
  if (mutating && !isSameOrigin(request)) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });

  const { path } = await params;
  const upstreamPath = `/${path.join('/')}`;

  // The Studio asks "who am I?"; answer with the shared account instead of a Sanity user.
  if (/^\/v[\w-]+\/users\/(me|mpas-admin)$/.test(upstreamPath)) return NextResponse.json(adminUser);
  if (/^\/v[\w-]+\/users\//.test(upstreamPath)) return NextResponse.json([adminUser]);

  if (!ALLOWED.test(upstreamPath)) return NextResponse.json({ error: 'Not allowed.' }, { status: 403 });
  // Everything except content and files is read-only through the bridge.
  if (!/^\/v[\w-]+\/(data|assets|jobs)(\/|$)/.test(upstreamPath) && mutating) return NextResponse.json({ error: 'Not allowed.' }, { status: 403 });

  const headers = new Headers();
  for (const name of ['content-type', 'accept', 'last-event-id']) {
    const v = request.headers.get(name);
    if (v) headers.set(name, v);
  }
  headers.set('authorization', `Bearer ${token}`);
  headers.set('x-sanity-project-id', projectId);

  const init: RequestInit & { duplex?: 'half' } = { method: request.method, headers, redirect: 'manual', signal: request.signal };
  if (mutating) {
    init.body = request.body;
    init.duplex = 'half';
  }

  // Content and files live on the project host; project info on the global host.
  const host = /^\/v[\w-]+\/(data|assets|jobs)(\/|$)/.test(upstreamPath) ? PROJECT_HOST : GLOBAL_HOST;
  const upstream = await fetch(`${host}${upstreamPath}${request.nextUrl.search}`, init).catch(() => null);
  if (!upstream) return NextResponse.json({ error: 'Could not reach the content service.' }, { status: 502 });

  const out = new Headers();
  for (const name of ['content-type', 'cache-control', 'etag', 'retry-after']) {
    const v = upstream.headers.get(name);
    if (v) out.set(name, v);
  }
  out.set('Cache-Control', upstream.headers.get('content-type')?.includes('text/event-stream') ? 'no-cache, no-transform' : 'no-store');
  return new NextResponse(upstream.body, { status: upstream.status, headers: out });
}

export { handle as GET, handle as POST, handle as PUT, handle as PATCH, handle as DELETE, handle as HEAD };
