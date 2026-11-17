-- Version 0. Apply once using the Supabase SQL editor or CLI migrations.
begin;
create table public.seeds (
  id uuid primary key,
  owner_id uuid not null references auth.users(id),
  public_id text unique check(public_id ~ '^I[0-9]{3,}$'),
  state text not null default 'recibida' check(state in ('recibida','valorada','en prueba','en desarrollo','cerrada')),
  created_at timestamptz not null default now()
);
create table public.seed_versions (
  seed_id uuid not null references public.seeds(id),
  version integer not null check(version between 1 and 100000),
  owner_id uuid not null references auth.users(id),
  original jsonb not null,
  receipt_id uuid not null unique default gen_random_uuid(),
  received_at timestamptz not null default now(),
  primary key(seed_id,version)
);
create table public.seed_reviews (
  id uuid primary key default gen_random_uuid(),
  seed_id uuid not null,
  version integer not null,
  reviewer text not null,
  role text not null check(role in ('revisor','didacta','coordinacion')),
  note text not null,
  created_at timestamptz not null default now(),
  foreign key(seed_id,version) references public.seed_versions(seed_id,version)
);
create table public.bulletins (
  id uuid primary key default gen_random_uuid(),
  kind text not null check(kind in ('session','task')),
  title text not null check(length(title) between 1 and 180),
  body text not null,
  starts_at timestamptz,
  status text not null check(status in ('por confirmar','confirmada','reprogramada','cancelada')),
  published boolean not null default false,
  updated_at timestamptz not null default now()
);
create table public.bulletin_history (
  id bigint generated always as identity primary key,
  bulletin_id uuid not null,
  snapshot jsonb not null,
  recorded_at timestamptz not null default now()
);
create function public.keep_bulletin_history() returns trigger language plpgsql security definer set search_path='' as $$
begin
  if TG_OP <> 'INSERT' then
    insert into public.bulletin_history(bulletin_id,snapshot) values(old.id,to_jsonb(old));
  end if;
  if TG_OP = 'DELETE' then return old; end if;
  new.updated_at=now(); return new;
end; $$;
create trigger bulletin_history before insert or update or delete on public.bulletins for each row execute function public.keep_bulletin_history();

alter table public.seeds enable row level security;
alter table public.seed_versions enable row level security;
alter table public.seed_reviews enable row level security;
alter table public.bulletins enable row level security;
alter table public.bulletin_history enable row level security;
revoke all on public.seeds,public.seed_versions,public.seed_reviews,public.bulletins,public.bulletin_history from anon,authenticated;
grant select on public.seeds,public.seed_versions to authenticated;
grant select on public.bulletins to anon,authenticated;
create policy seeds_own on public.seeds for select to authenticated using(owner_id=(select auth.uid()));
create policy versions_own on public.seed_versions for select to authenticated using(owner_id=(select auth.uid()));
create policy published_bulletins on public.bulletins for select to anon,authenticated using(published);
-- Coordination uses Supabase Studio in v0. No administrative browser client.
create function public.receive_seed(p_record jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare
  v_uid uuid := auth.uid(); v_id uuid; v_version integer; v_key text;
  v_existing public.seed_versions; v_owner uuid; v_latest integer;
  v_attachment jsonb; v_path text;
begin
  if v_uid is null then raise exception 'Se requiere una sesión.' using errcode='42501'; end if;
  if jsonb_typeof(p_record) <> 'object' or p_record->>'schema' is distinct from 'iie-semilla/0' then raise exception 'Formato de registro no válido.'; end if;
  if not (p_record ?& array['schema','id','version','created_at','author','title','question','motivation','example','sharing','attachment']) or
     (p_record - array['schema','id','version','created_at','author','title','question','motivation','example','sharing','attachment']) <> '{}'::jsonb then raise exception 'Campos de registro no válidos.'; end if;
  v_id := (p_record->>'id')::uuid;
  if jsonb_typeof(p_record->'version') <> 'number' or (p_record->>'version') !~ '^[0-9]+$' then raise exception 'Versión no válida.'; end if;
  v_version := (p_record->>'version')::integer;
  if v_version not between 1 and 100000 or v_id is null then raise exception 'Identificador o versión no válidos.'; end if;
  if jsonb_typeof(p_record->'created_at') <> 'string' or not isfinite((p_record->>'created_at')::timestamptz) then raise exception 'Fecha no válida.'; end if;
  foreach v_key in array array['author','title','question','motivation','example'] loop
    if jsonb_typeof(p_record->v_key) <> 'string' or
       (v_key <> 'example' and length(btrim(p_record->>v_key))=0) or
       length(p_record->>v_key)>(case v_key when 'author' then 160 when 'title' then 180 when 'question' then 8000 else 4000 end)
    then raise exception 'Campo no válido: %',v_key; end if;
  end loop;
  if p_record->>'sharing' not in ('coordination','review_publication') or jsonb_typeof(p_record->'sharing') <> 'string' then raise exception 'Condiciones no válidas.'; end if;
  v_attachment := p_record->'attachment';
  if v_attachment <> 'null'::jsonb then
    if jsonb_typeof(v_attachment)<>'object' or not(v_attachment ?& array['name','size','sha256']) or
      (v_attachment - array['name','size','sha256']) <> '{}'::jsonb or
      jsonb_typeof(v_attachment->'sha256')<>'string' or jsonb_typeof(v_attachment->'size')<>'number' or
      jsonb_typeof(v_attachment->'name')<>'string' or length(v_attachment->>'name') not between 1 and 240 or
      (v_attachment->>'name') !~* '\.(pdf|docx|txt|md)$' or
      coalesce(v_attachment->>'sha256','') !~ '^[a-f0-9]{64}$' or
      coalesce(v_attachment->>'size','') !~ '^[0-9]+$' or
      (v_attachment->>'size')::bigint not between 1 and 5242880 then raise exception 'Documento no válido.'; end if;
    v_path := v_uid::text||'/'||v_id::text||'/'||v_version::text||'/'||(v_attachment->>'sha256');
    if not exists(select 1 from storage.objects where bucket_id='originales' and name=v_path and (metadata->>'size')::bigint=(v_attachment->>'size')::bigint) then raise exception 'Falta recibir el documento original.'; end if;
  end if;
  -- Lock creation and version allocation together, including concurrent first sends.
  perform pg_advisory_xact_lock(hashtextextended(v_id::text,0));
  select owner_id into v_owner from public.seeds where id=v_id;
  if found and v_owner<>v_uid then raise exception 'Identificador no disponible.' using errcode='42501'; end if;
  select * into v_existing from public.seed_versions where seed_id=v_id and version=v_version;
  if found then
    if v_existing.original<>p_record then raise exception 'Esta versión ya fue recibida con otro contenido. Abre la versión recibida y registra una corrección.' using errcode='23505'; end if;
    return jsonb_build_object('seed_id',v_id,'version',v_version,'receipt_id',v_existing.receipt_id,'received_at',v_existing.received_at);
  end if;
  select coalesce(max(version),0) into v_latest from public.seed_versions where seed_id=v_id;
  if v_version<>v_latest+1 then raise exception 'La versión debe continuar la última recibida (%).',v_latest; end if;
  insert into public.seeds(id,owner_id) values(v_id,v_uid) on conflict(id) do nothing;
  insert into public.seed_versions(seed_id,version,owner_id,original) values(v_id,v_version,v_uid,p_record) returning * into v_existing;
  return jsonb_build_object('seed_id',v_id,'version',v_version,'receipt_id',v_existing.receipt_id,'received_at',v_existing.received_at);
end; $$;
revoke all on function public.receive_seed(jsonb) from public,anon;
grant execute on function public.receive_seed(jsonb) to authenticated;
revoke all on function public.keep_bulletin_history() from public,anon,authenticated;

insert into storage.buckets(id,name,public,file_size_limit) values('originales','originales',false,5242880);
create policy originals_insert on storage.objects for insert to authenticated with check(
  bucket_id='originales' and (storage.foldername(name))[1]=(select auth.uid())::text
  and array_length(storage.foldername(name),1)=3
  and storage.filename(name) ~ '^[a-f0-9]{64}$'
);
create policy originals_read on storage.objects for select to authenticated using(
  bucket_id='originales' and (storage.foldername(name))[1]=(select auth.uid())::text
);
-- No client UPDATE/DELETE policy: original objects cannot be overwritten.
commit;
