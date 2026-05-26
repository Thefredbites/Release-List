grant select, insert, update on table public.survey_responses to service_role;
grant select, insert on table public.survey_rate_limits to service_role;
grant usage, select on sequence public.survey_rate_limits_id_seq to service_role;
