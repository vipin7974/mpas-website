import { NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { CSRF_COOKIE, cookieOptions } from '@/lib/adminSession';

/** Issues a one-hour anti-forgery token for the login form (double-submit cookie). */
export async function GET() {
  const token = randomBytes(32).toString('hex');
  const res = NextResponse.json({ token }, { headers: { 'Cache-Control': 'no-store' } });
  res.cookies.set(CSRF_COOKIE, token, { ...cookieOptions(3600, '/api/admin'), sameSite: 'strict' });
  return res;
}
