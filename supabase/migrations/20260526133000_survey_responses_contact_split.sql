alter table public.survey_responses
  add column if not exists supporter_email text,
  add column if not exists supporter_whatsapp text;

update public.survey_responses
set supporter_email = supporter_contact
where supporter_contact is not null
  and supporter_contact like '%@%'
  and supporter_email is null;

update public.survey_responses
set supporter_whatsapp = supporter_contact
where supporter_contact is not null
  and supporter_contact not like '%@%'
  and supporter_whatsapp is null;
