grant select on table public.admin_users to service_role;

grant select, insert, update on table public.waitlist_leads to service_role;

grant select, insert on table public.waitlist_rate_limits to service_role;
grant usage, select on sequence public.waitlist_rate_limits_id_seq to service_role;
