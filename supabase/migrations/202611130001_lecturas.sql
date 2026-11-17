-- Apply in one transaction. Coordination provisions membership by existing Auth UUID.
begin;
create table public.reading_members (
  user_id uuid primary key references auth.users(id),
  display_name text not null check (length(trim(display_name)) between 1 and 120),
  coordinator boolean not null default false
);
create table public.readings (
  id uuid primary key,
  owner_id uuid default auth.uid() references public.reading_members(user_id),
  title text not null check (length(trim(title)) between 1 and 2000),
  citation text not null check (length(trim(citation)) between 1 and 2000),
  url text not null default '' check (url='' or (url ~ '^https?://[^[:space:]]+$' and length(url)<=2000)),
  question text not null check (length(trim(question)) between 1 and 2000),
  excerpt text not null default '' check(length(excerpt)<=2000),
  created_at timestamptz not null default now()
);
create table public.reading_comments (
  id uuid primary key,
  reading_id uuid not null references public.readings,
  owner_id uuid not null default auth.uid() references public.reading_members(user_id),
  body text not null check(length(trim(body)) between 1 and 2000),
  created_at timestamptz not null default now()
);
create table public.reading_agreements (
  reading_id uuid primary key references public.readings,
  owner_id uuid not null default auth.uid() references public.reading_members(user_id),
  kind text not null check(kind in ('Discutir en sesión','Integrar en una actividad','Retomar después')),
  plan text not null check(length(trim(plan)) between 1 and 2000),
  facilitator text not null default '' check(length(facilitator)<=2000),
  day date,
  check((kind='Retomar después' and day is null) or
        (kind<>'Retomar después' and day is not null and length(trim(facilitator))>0))
);
alter table public.reading_members enable row level security;
alter table public.readings enable row level security;
alter table public.reading_comments enable row level security;
alter table public.reading_agreements enable row level security;
revoke all on public.reading_members,public.readings,public.reading_comments,public.reading_agreements from public,anon,authenticated;
grant select on public.reading_members,public.readings,public.reading_comments,public.reading_agreements to authenticated;
-- Restricted helper prevents recursive policies on the member directory.
create function public.can_access_readings(needs_coordination boolean default false) returns boolean
language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.reading_members where user_id=auth.uid() and (not needs_coordination or coordinator))
$$;
revoke all on function public.can_access_readings(boolean) from public,anon;
grant execute on function public.can_access_readings(boolean) to authenticated;
create policy member_directory on public.reading_members for select to authenticated using ((select public.can_access_readings()));
create policy member_readings on public.readings for select to authenticated using ((select public.can_access_readings()));
create policy member_comments on public.reading_comments for select to authenticated using ((select public.can_access_readings()));
create policy member_agreements on public.reading_agreements for select to authenticated using ((select public.can_access_readings()));
grant insert(id,title,citation,url,question,excerpt) on public.readings to authenticated;
grant insert(id,reading_id,body) on public.reading_comments to authenticated;
grant insert(reading_id,kind,plan,facilitator,day) on public.reading_agreements to authenticated;
create policy suggest on public.readings for insert to authenticated with check(owner_id=auth.uid() and (select public.can_access_readings()));
create policy discuss on public.reading_comments for insert to authenticated with check(owner_id=auth.uid() and (select public.can_access_readings()));
create policy agree on public.reading_agreements for insert to authenticated with check(owner_id=auth.uid() and (select public.can_access_readings(true)));
insert into public.readings(id,title,citation,url,question,excerpt) values
 ('4a50a842-e42f-40e6-8804-6ba87fff6590','Bring digital twins back to Earth','Andrea Saltelli et al. (2024). WIREs Climate Change, 15, e915.',
 'https://doi.org/10.1002/wcc.915','¿Qué evidencia independiente necesitaríamos para sostener una inferencia sobre la condición ecológica?',
 'Resumen, p. 1. Los autores cuestionan que aumentar la sofisticación de los gemelos digitales de la Tierra baste para orientar decisiones climáticas. La pregunta sobre el IIE es una propuesta del taller.');
notify pgrst,'reload schema';
commit;
