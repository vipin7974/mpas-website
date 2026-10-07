# mpas — Mahesh Palashikar Advisory Services

Next.js (App Router) website with an embedded Sanity Studio at **`/admin`**.

- **Content** (text, images, links, visibility, order, SEO) lives in Sanity and is edited by the client.
- **Design** (layout, colours, animation) lives in code and cannot be broken from the admin.
- If Sanity is unreachable, or a field is empty, the site falls back to the built-in copy in `src/data/`.

## Quick start

```bash
npm install
cp .env.example .env.local      # then fill in the tokens (see below)
npm run dev
```

- Website: http://localhost:3000
- Admin: http://localhost:3000/admin

## Sanity setup (one time)

Project ID: `w6jr4lxx`, dataset: `production`.

1. **Create one token** — sanity.io/manage → project → API → Tokens → Add API token with *Editor* (or Developer) permission. Put it in `SANITY_API_WRITE_TOKEN`. It stays on the server: the admin sends requests to `/api/admin/sanity`, which checks the login cookie and adds the token. Editors never see it and need no Sanity account.
2. *(Optional)* Create a *Viewer* token for `SANITY_API_READ_TOKEN` to enable draft preview on the live site.
3. **Import the existing content**: `npm run seed`. Safe to re-run; it replaces the seeded documents.

## Admin login (shared account)

> ⚠️ **This CMS uses a shared account. Anyone with these credentials can access the CMS and make changes.**
> Share the password only with people you trust, and change it when someone leaves.

`/admin` shows a branded sign-in page. One username and password are shared by all editors.

- The username is `ADMIN_USERNAME`. The password is stored only as a **bcrypt hash** (cost 12) in `ADMIN_PASSWORD_HASH_B64`; the plaintext is never in the code or the repo.
- Set or change the password: `npm run admin:password -- "a long new password"` (12+ characters). Paste the printed `ADMIN_PASSWORD_HASH_B64` line into `.env.local` and your hosting environment variables, then redeploy/restart.
- **Changing the password (or `SESSION_SECRET`) signs everyone out**, because sessions are signed with a key derived from both.
- Sessions last 8 hours, then require sign-in again. **Log out** is on the dashboard and in the Studio user menu.
- Credentials are checked on the server only. The session is an `HttpOnly`, `SameSite=Lax` cookie (`Secure` in production).
- Every `/admin` page and every `/api/admin` call is blocked without a valid session (`src/proxy.ts`).
- Brute-force protection: 5 wrong attempts per IP in 15 minutes locks that IP out for 15 minutes. The counter lives in server memory, so on serverless hosting each instance counts separately. For a strict global limit, back it with a shared store such as Upstash Redis.
- Sign-in uses a one-time anti-forgery token plus an origin check; changes sent to the content bridge are origin-checked as well. Security headers (nosniff, frame-ancestors, referrer policy, HSTS in production) are set in `next.config.ts`. A full Content-Security-Policy is not set because the Studio relies on inline scripts.
- The login never reveals which field was wrong: “Invalid username or password.”

Limits of shared-login mode: Sanity shows every change as made by “mpas Admin” (no per-person history), real-time presence and comments between editors are unavailable, and the Releases tool is hidden.

## Environment variables

| Variable | Public? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | `w6jr4lxx` |
| `NEXT_PUBLIC_SANITY_DATASET` | yes | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | yes | API date |
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical URL, preview origin |
| `SANITY_API_READ_TOKEN` | **no** | Draft preview on the live site (optional) |
| `SANITY_API_WRITE_TOKEN` | **no** | Server-side admin bridge and `npm run seed` |
| `ADMIN_USERNAME` | **no** | Shared CMS username |
| `ADMIN_PASSWORD_HASH_B64` | **no** | bcrypt hash of the shared password (base64) |
| `SESSION_SECRET` | **no** | 32+ random characters; signs login sessions |
| `SANITY_REVALIDATE_SECRET` | **no** | Webhook signature |

Never commit `.env.local` (it is git-ignored).

## Deploy (Vercel)

1. Import the repo; framework is detected as Next.js.
2. Add all the variables above in Vercel → Settings → Environment Variables (they are server-only).
3. **Webhook** — sanity.io/manage → API → Webhooks → Create:
   - URL: `https://<your-domain>/api/revalidate`
   - Trigger on: Create, Update, Delete — all documents
   - Secret: the same value as `SANITY_REVALIDATE_SECRET`
   - Projection: leave empty, HTTP method POST.

   When an editor publishes, the site refreshes within seconds with no rebuild. Pages also re-check hourly as a safety net.

## How it works

```
src/app/(website)/   public site (own layout: header, footer, fonts, animations)
src/app/admin/       sign-in page + Sanity Studio at /admin (own layout — no website chrome)
src/proxy.ts         blocks /admin and /api/admin without a valid session
src/lib/admin*.ts    password check, signed sessions, rate limiting
src/app/api/         revalidate webhook + draft-mode (preview) routes
src/sanity/          schemas, structure (admin menu), dashboard, theme, GROQ queries, data layer
src/data/            built-in default copy: seed source + fallback
scripts/seedSanity.ts
```

- **Data layer:** `src/sanity/content.ts` runs one GROQ query (`queries.ts`), maps it to the `SiteContent` shape (`types.ts`) with field-level fallbacks, and the `SiteConfigProvider` hands it to the existing sections. Components were not redesigned.
- **Caching:** published content is cached with tag `sanity` and invalidated by the webhook. Preview mode bypasses the cache.
- **Preview:** the admin’s *Preview* tab opens the real site with unpublished drafts (needs `SANITY_API_READ_TOKEN`).
- **Images:** uploaded to Sanity; the site requests resized, auto-format CDN URLs that respect the editor’s crop/focal point.

## Content model

Homepage (one document with a tab per section), Menu, Footer, Website Settings, plus reusable **Leadership team members**, **Strategic Capabilities** and **Industry Sectors**. The homepage lists which of these appear and in what order (drag to reorder). Articles, testimonials and statistics are not included because the website has none.

## Scripts

`npm run dev` · `npm run build` · `npm start` · `npm run typecheck` · `npm run seed` · `npm run admin:password` · `npm run admin:password`

## Known limitations

- Profile photos are optional; initials are shown until one is uploaded.
- All editors share one account, so there are no separate Administrator/Editor roles. Everyone who signs in can change everything.
- Studio live-sync uses long-lived connections; on serverless hosting these reconnect periodically, which is normal.
- Changing a team member’s web address changes the profile URL; no automatic redirect is created.
