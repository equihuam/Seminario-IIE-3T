begin;

create table public.reading_catalog_sync (
  singleton boolean primary key default true check (singleton),
  library_version bigint not null check (library_version >= -1)
);
insert into public.reading_catalog_sync (library_version) values (-1);
alter table public.reading_catalog_sync enable row level security;
revoke all on public.reading_catalog_sync from public, anon, authenticated, service_role;

create function public.apply_reading_catalog(catalog_version bigint, catalog_rows jsonb)
returns boolean language plpgsql security definer set search_path = '' as $$
declare
  previous_version bigint;
begin
  select library_version into strict previous_version
    from public.reading_catalog_sync where singleton for update;
  if catalog_version <= previous_version then
    return false;
  end if;

  insert into public.reading_references (zotero_key, title, citation, url, source_version)
    select zotero_key, title, citation, url, source_version
    from jsonb_to_recordset(catalog_rows) as source(
      zotero_key text, title text, citation text, url text, source_version integer
    )
    on conflict (zotero_key) do update set
      title = excluded.title, citation = excluded.citation, url = excluded.url,
      source_version = excluded.source_version, active = true, synced_at = now();

  update public.reading_references set active = false, synced_at = now()
    where active and not exists (
      select 1 from jsonb_array_elements(catalog_rows) as source(item)
      where source.item->>'zotero_key' = reading_references.zotero_key
    );
  update public.reading_catalog_sync set library_version = catalog_version where singleton;
  return true;
end;
$$;
revoke all on function public.apply_reading_catalog(bigint, jsonb) from public, anon, authenticated;
grant execute on function public.apply_reading_catalog(bigint, jsonb) to service_role;

notify pgrst, 'reload schema';
commit;
