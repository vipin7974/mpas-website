import 'server-only';
import { compare, hashSync } from 'bcryptjs';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

const sha = (v: string) => createHash('sha256').update(v).digest();

/** Compared against when the username is wrong, so response time doesn't reveal which part failed. */
let dummyHash: string | undefined;
const getDummyHash = () => (dummyHash ??= hashSync(randomBytes(16).toString('hex'), 12));

export function adminConfigured() {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD_HASH_B64 && (process.env.SESSION_SECRET?.length ?? 0) >= 32);
}

/** Checks the shared credentials. Always does the same amount of work, and never says which part was wrong. */
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  if (!adminConfigured()) return false;
  const userOk = timingSafeEqual(sha(username), sha(process.env.ADMIN_USERNAME as string));
  const hash = Buffer.from(process.env.ADMIN_PASSWORD_HASH_B64 as string, 'base64').toString('utf8');
  const passOk = await compare(password, userOk ? hash : getDummyHash()).catch(() => false);
  return userOk && passOk;
}

/* ── Brute-force protection ───────────────────────────────────────────────
 * 5 failed attempts per IP within 15 minutes locks that IP out for 15 minutes.
 * State is in memory, so on serverless hosting each instance counts separately —
 * a useful speed bump, not a hard guarantee (see README for a stricter option).
 */
const WINDOW_MS = 15 * 60_000;
const MAX_FAILS = 5;
const attempts = new Map<string, { fails: number; first: number; lockedUntil: number }>();

export function clientIp(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

export function lockedFor(ip: string): number {
  const a = attempts.get(ip);
  return a && a.lockedUntil > Date.now() ? Math.ceil((a.lockedUntil - Date.now()) / 1000) : 0;
}

export function recordFailure(ip: string) {
  const now = Date.now();
  const a = attempts.get(ip);
  if (!a || now - a.first > WINDOW_MS) {
    attempts.set(ip, { fails: 1, first: now, lockedUntil: 0 });
    return;
  }
  a.fails += 1;
  if (a.fails >= MAX_FAILS) a.lockedUntil = now + WINDOW_MS;
  if (attempts.size > 5000) attempts.clear();
}

export const recordSuccess = (ip: string) => void attempts.delete(ip);
