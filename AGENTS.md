# AGENTS.md — project context

Read this first. It carries the decisions and constraints that aren't obvious from the code.

## What this is

Squared Away Trades: license exam preparation for the licensed trades, beginning with
Tennessee and built to extend to other states. Naval theme
("dress blues" — navy `#0B1F3A`, brass `#C9A227`, ivory `#F5F3EE`) reflecting the owner's
military service. Barlow Condensed for display type, Public Sans for body.

## Locked product decisions

- **Lead product: trade-specific license preparation.** The product someone buys is
  preparation for *their* license in *their* trade. This is the lead and the core of the
  catalog. Do not reframe the product around Business and Law.
- **Business and Law is supporting content, not the lead.** It is state-specific material
  required for some license pathways and not others. Where a state requires it, it supports
  the trade preparation that person is actually there for. It is **not** a prerequisite
  implementation phase, and trade content does not wait on it or get sequenced behind it.
- **Scope:** all licensed trades. **Tennessee is V1**, with **General Contracting and
  Electrical** as the initial trade priorities. HVAC, Plumbing, and further trades follow.
  Additional states follow Tennessee.
- **Electrical is not one credential.** Do not equate electrical licensing with the Limited
  Licensed Electrician (LLE) pathway. LLE is one Tennessee pathway among several; electrical
  licensure spans multiple classifications, thresholds, and pathways, and some are local
  rather than state-level. Model electrical as a trade with multiple license pathways, never
  as a single exam. Related factual guardrail: Tennessee has no statewide *journeyman*
  electrician license — don't reintroduce that framing.
- **Architecture requirement:** the data model and routing must support multiple trades,
  multiple states, and multiple license pathways within a single trade, from the start.
  A schema that assumes one exam, one state, or one credential per trade is wrong and will
  have to be torn out. This is a structural constraint, not a future nice-to-have.
- **Content isolation:** every exam — each trade, each pathway, each state — needs its OWN
  bank, own blueprint, and own licensed reviewer. A Business and Law bank is shared only
  across trades *within the state it was written for*, never across states. What gets reused
  is the pipeline, never the questions.
- **Reviewers:** the owner was previously a licensed GC and has an electrician available,
  but their exact review roles and current qualifications (active license? which
  classification?) are not yet confirmed — don't assume either of them is cleared to sign
  off on content until that's settled. HVAC, plumbing, and any other trade added later each
  need their own qualified reviewer found before that trade's content ships.
- **Exam vendor:** Prov, as of 2026-07-01 (replaced PSI). Several state pages still say PSI.
- **Reference book:** NASCLA Contractors Guide to Business, Law and Project Management,
  Tennessee **3rd edition** (owner owns a copy). A 4th edition exists; confirm which one
  Prov currently tests against before finalizing the blueprint.

## Current phase: free launch

No payments. No Stripe, no LLC required yet, no checkout. The site collects emails and
nothing else. Payments get built only after the funnel shows signal. Don't add a checkout.

## Content rules — non-negotiable

- Every question is **original**. Never source, solicit, or accept "recalled" real exam
  questions. That is an exam-security violation that could end the business.
- The question bank in `lib/questions.ts` is **DRAFT, not reviewer-approved**. The
  site-wide banner saying so must stay up until the licensed reviewer signs off.
- Citations marked `(reviewer: confirm...)` have the right statute but an unverified
  subsection. Don't quietly drop those markers.
- Never reproduce NASCLA guide text or statute text verbatim at length. Cite section
  numbers and paraphrase.

## Security posture

The whole reason this app exists instead of a static page: **email addresses must not be
publicly readable.** Preserve these properties.

- `signups` has RLS enabled with **no policies**. `anon` and `authenticated` cannot touch
  it. Only the `service_role` key (server-side) reads or writes.
- **Never add a permissive RLS policy** to `signups`, and never add a `NEXT_PUBLIC_`
  Supabase key that can reach it. `NEXT_PUBLIC_*` ships to every browser.
- `lib/supabaseAdmin.ts` imports `server-only` deliberately — importing it from a client
  component becomes a build error instead of a leaked key.
- `/admin` is gated by `ADMIN_TOKEN` compared in constant time. It is `noindex` and
  `no-store`. This is a single shared secret, which is adequate for one operator and
  should become real auth before anyone else gets access.
- IPs are stored only as salted hashes.

## What's real vs. demo right now

- **Real, once `.env.local` is filled in:** the signup form writes to an actual Supabase
  table (`signups`), and `/admin` reads that same table. This is a functioning integration,
  not a mock — treat data in it as real emails, not test data.
- **Demo only, no backend involved:** the study feed and mock exam. Their questions come
  from the static `lib/questions.ts` array, and score/progress live in React state only —
  closing the tab or reloading loses it. There is no accounts system and nothing here is
  persisted anywhere, Supabase or otherwise.
- **No Supabase project exists yet.** Until one is created and its keys are in `.env.local`,
  every write to `signups` fails closed (the route returns a 500, it does not silently
  drop the signup or crash the app) — see `getSupabaseAdmin()` in `lib/supabaseAdmin.ts`.

## Known gaps / next work

1. **Builds and runs locally without any Supabase project configured** — verified with
   `npm run build` and `npm run dev` against no `.env.local` at all. It has not yet been
   run against a real Supabase project or deployed; that's the next real test.
2. **Rate limiting is in-memory** (`app/api/signup/route.ts`) — resets on cold start, not
   shared across instances. Move to Upstash/Vercel KV if volume justifies it.
3. **No double opt-in.** Before sending real email, add a confirmation step and an
   unsubscribe link (CAN-SPAM). Wire an email provider (Resend/Postmark) with SPF, DKIM,
   DMARC or receipts land in spam.
4. **No accounts.** Study and exam progress is in-memory and resets on reload. Accounts +
   persisted progress + a real spaced-repetition scheduler are the next real feature.
5. **Exam length/timing are placeholders** (10 questions, 15 min). Replace with the real
   figures once the Prov bulletin is in hand.
6. **No SEO landing pages yet.** The plan calls for one page per state per trade; that
   template doesn't exist.
7. **Legal copy is draft.** Terms, disclaimer, privacy policy all need an attorney before
   taking any money.

## Style

Plain CSS with design tokens in `app/globals.css`. No Tailwind, no component library —
kept deliberately dependency-light so there's less to break. Copy is plain and direct;
avoid marketing voice and em-dash-heavy phrasing.
