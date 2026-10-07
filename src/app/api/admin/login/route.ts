import { NextResponse, type NextRequest } from 'next/server';
import { clientIp, lockedFor, recordFailure, recordSuccess, verifyCredentials } from '@/lib/adminAuth';
import { CSRF_COOKIE, SESSION_COOKIE, SESSION_MAX_AGE_SECONDS, cookieOptions, createSessionToken, isSameOrigin } from '@/lib/adminSession';

const GENERIC = 'Invalid username or password.';
const json = (body: object, status: number, extra: Record<string, string> = {}) =>
  NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', ...extra } });

export async function POST(request: NextRequest) {
  const ip = clientIp(request);

  const wait = lockedFor(ip);
  if (wait) return json({ error: 'Too many attempts. Please wait a few minutes and try again.' }, 429, { 'Retry-After': String(wait) });

  // Anti-forgery: same-site origin + matching cookie/header token.
  const csrfCookie = request.cookies.get(CSRF_COOKIE)?.value;
  const csrfHeader = request.headers.get('x-csrf-token');
  if (!isSameOrigin(request) || !csrfCookie || csrfCookie !== csrfHeader) {
    return json({ error: 'Your sign-in page expired. Please refresh and try again.' }, 403);
  }

  let username = '';
  let password = '';
  try {
    const body = (await request.json()) as { username?: unknown; password?: unknown };
    username = typeof body.username === 'string' ? body.username.slice(0, 200) : '';
    password = typeof body.password === 'string' ? body.password.slice(0, 200) : '';
  } catch {
    return json({ error: GENERIC }, 401);
  }

  const ok = await verifyCredentials(username, password);
  if (!ok) {
    recordFailure(ip);
    await new Promise((r) => setTimeout(r, 400)); // small constant delay slows guessing
    return json({ error: GENERIC }, 401);
  }

  const token = await createSessionToken();
  if (!token) return json({ error: GENERIC }, 401);

  recordSuccess(ip);
  const res = json({ ok: true }, 200);
  res.cookies.set(SESSION_COOKIE, token, cookieOptions(SESSION_MAX_AGE_SECONDS));
  res.cookies.delete({ name: CSRF_COOKIE, path: '/api/admin' });
  return res;
}
