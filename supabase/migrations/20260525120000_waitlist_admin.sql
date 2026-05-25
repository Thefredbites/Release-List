create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.waitlist_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  email_normalized text not null unique,
  whatsapp text,
  source text not null default 'website_waitlist',
  submitted_ip_hash text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint waitlist_leads_email_length check (char_length(email_normalized) between 3 and 320),
  constraint waitlist_leads_whatsapp_e164 check (whatsapp is null or whatsapp ~ '^\+[1-9][0-9]{7,14}$')
);

create index if not exists waitlist_leads_created_at_desc_idx
  on public.waitlist_leads (created_at desc);

create index if not exists waitlist_leads_ip_hash_idx
  on public.waitlist_leads (submitted_ip_hash);

drop trigger if exists set_waitlist_leads_updated_at on public.waitlist_leads;
create trigger set_waitlist_leads_updated_at
before update on public.waitlist_leads
for each row
execute procedure public.set_updated_at();

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.waitlist_rate_limits (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists waitlist_rate_limits_ip_hash_created_at_idx
  on public.waitlist_rate_limits (ip_hash, created_at desc);

alter table public.waitlist_leads enable row level security;
alter table public.admin_users enable row level security;
alter table public.waitlist_rate_limits enable row level security;

drop policy if exists "admin users can read waitlist leads" on public.waitlist_leads;
create policy "admin users can read waitlist leads"
on public.waitlist_leads
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

drop policy if exists "admin users can read themselves" on public.admin_users;
create policy "admin users can read themselves"
on public.admin_users
for select
to authenticated
using (user_id = (select auth.uid()));
