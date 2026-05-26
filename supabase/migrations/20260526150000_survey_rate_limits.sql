alter table public.survey_responses
  add column if not exists submitted_ip_hash text;

create index if not exists survey_responses_ip_hash_idx
  on public.survey_responses (submitted_ip_hash);

create table if not exists public.survey_rate_limits (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists survey_rate_limits_ip_hash_created_at_idx
  on public.survey_rate_limits (ip_hash, created_at desc);

alter table public.survey_rate_limits enable row level security;
