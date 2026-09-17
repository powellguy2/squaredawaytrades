-- Squared Away Trades — database schema
-- Run this once in the Supabase SQL editor (Dashboard > SQL Editor > New query).

create table if not exists public.signups (
  id           uuid primary key default gen_random_uuid(),
  email        text not null,
  source       text,
  created_at   timestamptz not null default now(),
  ip_hash      text,
  user_agent   text
);

-- Case-insensitive uniqueness: one row per email address, so a double
-- submit updates nothing instead of creating a duplicate.
create unique index if not exists signups_email_lower_idx
  on public.signups (lower(email));

create index if not exists signups_created_at_idx
  on public.signups (created_at desc);

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------
-- RLS is ON with NO policies granted to anon or authenticated. That means
-- the public API keys literally cannot read or write this table, even if a
-- key leaks. Only the service_role key (server-side only, never sent to a
-- browser) bypasses RLS. Every insert therefore has to go through our own
-- /api/signup route, which is where validation and rate limiting live.
alter table public.signups enable row level security;

-- Defensive: drop any permissive policy that might exist from an earlier run.
drop policy if exists "public can read signups"   on public.signups;
drop policy if exists "public can insert signups" on public.signups;

-- Deliberately NO policies created here. Do not add one that grants anon
-- access; that would expose the whole email list to anyone with the
-- publishable key, which ships in the browser bundle by design.

revoke all on public.signups from anon, authenticated;
