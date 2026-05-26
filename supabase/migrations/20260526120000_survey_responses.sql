create table if not exists public.survey_responses (
  id bigint generated always as identity primary key,
  nutrition_needs text not null,
  strawberry_ratings jsonb,
  chocolate_ratings jsonb,
  improvements text not null,
  buy_intent text not null,
  price_range text not null,
  next_flavor text not null,
  supporter_contact text,
  source text not null default 'website_survey',
  created_at timestamptz not null default timezone('utc', now()),
  constraint survey_responses_at_least_one_matrix check (
    strawberry_ratings is not null or chocolate_ratings is not null
  )
);

alter table public.survey_responses enable row level security;

drop policy if exists "admin users can read survey responses" on public.survey_responses;
create policy "admin users can read survey responses"
on public.survey_responses
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);
