# Current state — checkpoint

Last updated: 2026-09-16. This is a session checkpoint, not a plan. It records what is
actually true about the repository right now so the next session doesn't have to re-derive it.

## Changes made this session

- `lib/supabaseAdmin.ts` — replaced the module-level credentials check with a lazy
  `getSupabaseAdmin()`. The old top-level `throw` fired during `next build`'s "Collecting
  page data" pass, which imports every route module, so the build failed outright whenever
  Supabase credentials were absent. Both API routes updated to call the function.
- `.gitignore` — **created; the repository had none and had zero commits.** Covers
  `node_modules`, `.next`, `.env*.local`, `.DS_Store`. Without it a broad `git add` would
  have staged dependencies and, later, a real service-role key.
- `.env.example` — created. The README instructed `cp .env.example .env.local` but the file
  did not exist. Placeholder keys only, no values.
- `CLAUDE.md` — product direction corrected (see "Direction correction" below), plus a
  "What's real vs. demo right now" section.
- `README.md` — removed the stale "this has never been built" warning, added the concrete
  repository URL and GoDaddy/domain specifics.

## Verification actually completed

Run locally, with **no `.env.local` present at all**:

- `npm install` — clean; resolved `next@14.2.35`, `postcss@8.4.31`.
- `npm run typecheck` — passes.
- `npm run build` — passes from a cleared `.next`; 7 routes emitted.
- `npm run dev` — `/`, `/study`, `/exam`, `/admin` each returned HTTP 200.
- `POST /api/signup` — returned HTTP 500 without crashing the server, which is the intended
  fail-closed behavior when Supabase is unconfigured.

**Not verified.** Be honest about this list; none of it has been exercised:

- Never run against a real Supabase project. `supabase/schema.sql` has never been executed,
  so the schema, the RLS lockdown, and the unique-email index are all unproven.
- No insert or read against a real `signups` table has ever succeeded.
- `/admin` authentication was never tested end to end; no `ADMIN_TOKEN` was ever set.
- **HTTP status codes only — no UI or rendering was checked.** A 200 means the route
  responded, not that the page looks right or that the forms work in a browser.
- Never deployed. No production build has run anywhere but this machine.

## Infrastructure status

- **No dedicated Supabase project exists.** There is no verified live integration of any
  kind. Every database code path in this repository is unproven against a real backend.
- Vercel account exists; nothing has been imported or deployed.
- Domain `squaredawaytrades.com` is registered at GoDaddy; no DNS changes have been made.
- Git remote is `https://github.com/powellguy2/squaredawaytrades.git`. Nothing pushed.

## Study content and progress are demo-only

- Questions come from the static `lib/questions.ts` array. The bank is **draft and has not
  been reviewed by a licensed reviewer.** The site-wide draft banner must stay up.
- Study and exam progress live in React state only. Reloading the page loses everything.
  There are no accounts and no persistence of any study activity, in Supabase or elsewhere.
- The only non-demo path in the app is the signup form writing to `signups`, and that path
  is itself unverified because no Supabase project exists yet.

## Open blockers

### Dependency security — assess before any deployment

`npm audit` reports 2 unresolved findings: 1 critical, 1 high (`next`, and `postcss` via
`next`). `next@14.2.35` is the newest release on the 14.x line, so **no patch exists within
the current major version**; the advisories are addressed only in Next 15/16. Preliminary
read is that this application does not touch the vulnerable surfaces — it uses no
`next/image`, no middleware, no Server Actions, and no i18n rewrites — but that is an
assessment, not a verified conclusion, and it has not been reviewed. Resolve this
deliberately before deploying. No upgrade was attempted this session.

### Exam specifications and provider requirements — unverified

- Mock exam length (10 questions) and time limit (15 minutes) are **placeholders**. The real
  figures require the current Prov bulletin.
- Prov replaced PSI as the exam vendor as of 2026-07-01; some state pages still reference
  PSI, so sourcing needs care.
- Which NASCLA edition Prov currently tests against (Tennessee 3rd vs 4th) is unconfirmed.
- Reviewer qualifications are unconfirmed: the owner was previously a licensed GC and an
  electrician is available, but neither one's current license status, classification, or
  review role is settled. HVAC and Plumbing have no reviewer identified at all.

## Direction correction recorded this session

Trade-specific license preparation is the **lead product**. Business and Law is supporting,
state-specific content required by some license pathways — it is not the lead and not a
prerequisite implementation phase. All licensed trades are in scope; Tennessee is V1 with
General Contracting and Electrical as initial priorities. Electrical must not be equated
with the LLE pathway. The architecture must support additional trades, states, and multiple
license pathways per trade. Full wording is in `CLAUDE.md` under "Locked product decisions".

## Next session starts here

Reconcile the repository against the trade-first direction before writing any feature code.
Known contradictions still in the tree, all of which currently present Business and Law as
the headline product:

1. `app/layout.tsx` — page title and meta description read "Tennessee Business and Law exam
   prep".
2. `app/page.tsx` — hero fine print frames Business and Law as the product with "Limited
   Licensed Electrician and General Contractor banks are next", which is both the wrong
   ordering and the LLE conflation.
3. `README.md` — describes `lib/questions.ts` as "the draft Business & Law bank" with no
   trade structure around it.
4. `lib/questions.ts` — a single flat array with no trade, state, or pathway dimension. This
   is the structural blocker for the multi-trade, multi-state, multi-pathway requirement and
   is the substantive design decision to settle first.
