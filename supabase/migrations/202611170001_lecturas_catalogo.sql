-- Zotero is the source of reference identity and bibliographic metadata.
begin;
create table public.reading_references (
  zotero_key text primary key check(zotero_key ~ '^[A-Z0-9]{8}$'),
  group_id integer not null default 6712171 check(group_id=6712171),
  title text not null check(length(trim(title)) between 1 and 2000),
  citation text not null check(length(trim(citation)) between 1 and 2000),
  url text not null default '' check(url='' or (url ~ '^https?://[^[:space:]]+$' and length(url)<=2000)),
  source_version integer not null check(source_version>=0),
  active boolean not null default true,
  synced_at timestamptz not null default now()
);
alter table public.reading_references enable row level security;
revoke all on public.reading_references from public,anon,authenticated;
grant select on public.reading_references to authenticated;
create policy member_catalog on public.reading_references for select to authenticated
  using ((select public.can_access_readings()));

-- Historical excerpts and agreements keep their meaning and remain untouched.
alter table public.readings add column processing text not null default '' check(length(processing)<=2000);
alter table public.readings add column zotero_version integer check(zotero_version>=0);
grant insert(processing) on public.readings to authenticated;

create function public.reading_from_catalog() returns trigger
language plpgsql security definer set search_path='' as $$
declare reference public.reading_references;
begin
  if auth.uid() is not null and not public.can_access_readings() then
    raise exception 'Tu cuenta no está habilitada para Lecturas.' using errcode='42501';
  end if;
  select * into reference from public.reading_references
    where zotero_key=new.zotero_key and active;
  if not found then
    raise exception 'Selecciona una referencia existente del catálogo de Zotero.' using errcode='23503';
  end if;
  if length(trim(new.processing))=0 then
    raise exception 'Completa la dinámica de procesamiento propuesta.' using errcode='23514';
  end if;
  new.title=reference.title;
  new.citation=reference.citation;
  new.url=reference.url;
  new.zotero_version=reference.source_version;
  return new;
end; $$;
revoke all on function public.reading_from_catalog() from public,anon,authenticated;
create trigger reading_reference before insert on public.readings
  for each row execute function public.reading_from_catalog();
-- Existing proposals are preserved even if a reference leaves the active catalog.
notify pgrst,'reload schema';
commit;
