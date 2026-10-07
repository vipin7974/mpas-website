'use client';

import { useEffect, useState, type FormEvent } from 'react';

const colors = { canvas: '#f7f3ea', ink: '#18352a', green: '#245b3a', orange: '#e07832', orangeRed: '#c95d24', line: '#d9d2c3', muted: '#536158' };

export function LoginForm() {
  const [csrf, setCsrf] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch('/api/admin/csrf', { cache: 'no-store' })
      .then((r) => r.json() as Promise<{ token: string }>)
      .then((d) => setCsrf(d.token))
      .catch(() => setError('Could not load the sign-in form. Please refresh the page.'));
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf },
        body: JSON.stringify({ username: form.get('username'), password: form.get('password') }),
      });
      if (res.ok) {
        window.location.assign('/admin');
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? 'Invalid username or password.');
      // The anti-forgery token is single-use per page load window; refresh it after any failure.
      const next = (await (await fetch('/api/admin/csrf', { cache: 'no-store' })).json()) as { token: string };
      setCsrf(next.token);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  const field = { display: 'block', width: '100%', boxSizing: 'border-box', padding: '12px 14px', border: `1px solid ${colors.line}`, borderRadius: 6, fontSize: 16, background: '#fff', color: colors.ink, marginTop: 6 } as const;
  const label = { display: 'block', fontSize: 13, letterSpacing: '0.04em', color: colors.muted, textTransform: 'uppercase', fontWeight: 600 } as const;

  return (
    <main style={{ minHeight: '100svh', display: 'grid', placeItems: 'center', background: colors.canvas, padding: 20, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: 400, background: '#fff', border: `1px solid ${colors.line}`, borderRadius: 12, padding: '36px 32px', boxShadow: '0 12px 40px rgba(24,53,42,0.08)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/branding/mpas-logo-horizontal.png" alt="mpas" width={956} height={193} style={{ height: 34, width: 'auto', display: 'block', marginBottom: 28 }} />
        <h1 style={{ margin: 0, fontSize: 24, color: colors.ink, fontWeight: 600 }}>mpas Website Admin</h1>
        <p style={{ margin: '8px 0 28px', color: colors.muted }}>Sign in to manage the website</p>

        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 18 }}>
          <label style={label}>
            Username
            <input name="username" type="text" autoComplete="username" required autoFocus style={field} />
          </label>
          <label style={label}>
            Password
            <input name="password" type="password" autoComplete="current-password" required style={field} />
          </label>
          <p role="alert" aria-live="polite" style={{ margin: 0, minHeight: 20, color: colors.orangeRed, fontSize: 14 }}>
            {error}
          </p>
          <button
            type="submit"
            disabled={busy || !csrf}
            style={{ padding: '14px 18px', border: 0, borderRadius: 6, background: busy || !csrf ? '#9db3a6' : colors.green, color: '#fff', fontSize: 16, fontWeight: 600, cursor: busy || !csrf ? 'default' : 'pointer' }}
          >
            {busy ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
}
