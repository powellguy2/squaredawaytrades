# Squared Away Trades

Tennessee contractor licensing exam prep. Next.js + Supabase.

See [CLAUDE.md](./CLAUDE.md) for product decisions, content rules, and the security
posture that must be preserved — including the **"What's real vs. demo right now"** section,
which draws the line between the live signup integration and the static demo question data.

> `npm install`, `npm run typecheck`, and `npm run build` all pass with no `.env.local` at
> all — the app builds and runs locally with zero cloud credentials. Nothing has been run
> against a real Supabase project or deployed yet; that's the next real test, and steps 2–4
> below get you there.

## Setup

### 1. Install and verify the build

```bash
npm install
npm run typecheck
npm run build
```

All three pass as committed, with or without credentials configured. You can also run
`npm run dev` at this point: the landing page, study feed, and mock exam are fully usable
on static demo content. Only the signup form and `/admin` need the database below.

### 2. Create the database

1. Create a project at [supabase.com](https://supabase.com) (free tier is fine).
2. Open **SQL Editor > New query**, paste all of `supabase/schema.sql`, and run it.
3. Confirm: **Table Editor > signups** exists, and **Authentication > Policies** shows RLS
   enabled on it with **no policies**. That emptiness is intentional — it's what keeps the
   list private.

### 3. Configure secrets

```bash
cp .env.example .env.local
```

Fill in all four values:

| Variable | Where it comes from |
|---|---|
| `SUPABASE_URL` | Supabase > Project Settings > Data API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase > Project Settings > API Keys > `service_role` |
| `ADMIN_TOKEN` | `openssl rand -base64 32` |
| `IP_HASH_SALT` | `openssl rand -base64 32` |

None of these may be prefixed `NEXT_PUBLIC_`. That prefix compiles the value into the
browser bundle where any visitor can read it.

### 4. Run it

```bash
npm run dev
```

- `http://localhost:3000` — landing page and signup
- `http://localhost:3000/study` — study feed
- `http://localhost:3000/exam` — mock exam
- `http://localhost:3000/admin` — signup list (paste your `ADMIN_TOKEN`)

Sign yourself up, then confirm the row appears in `/admin` and in the Supabase table editor.

## Deploying to your domain

1. Push to GitHub — the configured remote is
   [`powellguy2/squaredawaytrades`](https://github.com/powellguy2/squaredawaytrades).
   The repo has no commits yet, so the first push is `git add`, `git commit`, then
   `git push -u origin main`. Confirm `.env.local` is **not** in what you staged.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add the same four environment variables in **Project > Settings > Environment
   Variables** (Production scope). Vercel does not read `.env.local`.
4. Deploy.
5. **Project > Settings > Domains** → add `squaredawaytrades.com`. Vercel shows the exact
   DNS records; add them at GoDaddy, where the domain is registered. SSL is issued
   automatically once DNS resolves, usually within minutes.

### Verify after going live

- [ ] Signup works on the deployed URL and the row lands in Supabase
- [ ] `/admin` rejects a wrong token and accepts the right one
- [ ] Submitting the same email twice doesn't create a duplicate or show an error
- [ ] `view-source` on the homepage contains **no** email addresses and **no** keys
- [ ] The draft-content banner is visible

## Before emailing anyone

Signing people up is not the same as being allowed to email them. Add double opt-in and an
unsubscribe link, and configure SPF, DKIM, and DMARC, before the first send.

## Project layout

```
app/
  layout.tsx              nav, fonts, footer disclaimer, draft banner
  page.tsx                landing + sample question + signup
  globals.css             design tokens (navy / brass / ivory)
  study/page.tsx          study feed with requeue-on-miss
  exam/page.tsx           timed mock exam
  admin/page.tsx          token-gated signup list + CSV export
  api/signup/route.ts     validation, honeypot, rate limit, insert
  api/admin/signups/      token-checked read + CSV
components/
  QuestionCard.tsx        one question, answer feedback, statute ref
  SignupForm.tsx          posts to /api/signup
lib/
  questions.ts            the draft Business & Law bank
  supabaseAdmin.ts        server-only client (service role)
supabase/
  schema.sql              table + indexes + RLS lockdown
```
