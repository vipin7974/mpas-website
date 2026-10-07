/**
 * Signed, expiring session cookie for the shared CMS login.
 * Uses only Web Crypto so it also runs inside the Next.js proxy.
 *
 * The signing key is derived from SESSION_SECRET *and* the password hash, so changing
 * either one immediately invalidates every existing session.
 */
export const SESSION_COOKIE = 'mpas_admin_session';
export const CSRF_COOKIE = 'mpas_admin_csrf';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

const enc = new TextEncoder();

const b64url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const fromB64url = (s: string) => {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};

async function signingKey(usage: 'sign' | 'verify') {
  const secret = process.env.SESSION_SECRET;
  const hash = process.env.ADMIN_PASSWORD_HASH_B64;
  if (!secret || secret.length < 32 || !hash) return null;
  const material = enc.encode(`${secret}\u0000${hash}\u0000${process.env.ADMIN_USERNAME ?? ''}`);
  const digest = await crypto.subtle.digest('SHA-256', material);
  return crypto.subtle.importKey('raw', digest, { name: 'HMAC', hash: 'SHA-256' }, false, [usage]);
}

export async function createSessionToken(): Promise<string | null> {
  const key = await signingKey('sign');
  if (!key) return null;
  const payload = b64url(enc.encode(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS })));
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(payload)));
  return `${payload}.${b64url(sig)}`;
}

export async function isValidSession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const key = await signingKey('verify');
  if (!key) return false;
  try {
    const ok = await crypto.subtle.verify('HMAC', key, fromB64url(sig), enc.encode(payload));
    if (!ok) return false;
    const { exp } = JSON.parse(new TextDecoder().decode(fromB64url(payload))) as { exp?: number };
    return typeof exp === 'number' && exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export const cookieOptions = (maxAge: number, path = '/') => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path,
  maxAge,
});

/** Rejects cross-site requests: the Origin header, when sent, must match this site. */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true; // same-origin GETs and some navigations omit it; mutating calls also need the session cookie
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
