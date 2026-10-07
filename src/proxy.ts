import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, isValidSession } from '@/lib/adminSession';

/** Gate for the whole CMS: everything under /admin and /api/admin needs a valid session, except the login itself. */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authed = await isValidSession(request.cookies.get(SESSION_COOKIE)?.value);

  const isApi = pathname.startsWith('/api/admin');
  const isPublic =
    pathname === '/admin/login' || pathname === '/api/admin/login' || pathname === '/api/admin/csrf';

  if (pathname === '/admin/login' && authed) return NextResponse.redirect(new URL('/admin', request.url));
  if (isPublic || authed) {
    const res = NextResponse.next();
    res.headers.set('Cache-Control', 'no-store');
    return res;
  }
  if (isApi) return NextResponse.json({ error: 'Not signed in.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  return NextResponse.redirect(new URL('/admin/login', request.url));
}

export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] };
