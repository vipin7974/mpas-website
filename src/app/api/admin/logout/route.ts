import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, isSameOrigin } from '@/lib/adminSession';

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  const res = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
