begin;
alter table public.readings add column revision integer not null default 1;
alter table public.readings add column edited_at timestamptz;
alter table public.readings add constraint reading_processing_required
  check (zotero_version is null or length(trim(processing)) > 0);
alter table public.reading_comments add column revision integer not null default 1;
alter table public.reading_comments add column edited_at timestamptz;

-- Preserve previous text without exposing the history through the public API.
create table public.reading_edit_history (
  entry_table text not null,
  entry_id uuid not null,
  revision integer not null,
  original jsonb not null,
  edited_at timestamptz not null default now(),
  editor_id uuid references auth.users(id),
  primary key(entry_table,entry_id,revision)
);
alter table public.reading_edit_history enable row level security;
revoke all on public.reading_edit_history from public,anon,authenticated;
create function public.preserve_reading_edit() returns trigger
language plpgsql security definer set search_path='' as $$
begin
  insert into public.reading_edit_history(entry_table,entry_id,revision,original,editor_id)
    values(tg_table_name,old.id,old.revision,to_jsonb(old),auth.uid());
  new.revision=old.revision+1;
  new.edited_at=clock_timestamp();
  return new;
end; $$;
revoke all on function public.preserve_reading_edit() from public,anon,authenticated;
create trigger reading_edit before update on public.readings
  for each row execute function public.preserve_reading_edit();
create trigger comment_edit before update on public.reading_comments
  for each row execute function public.preserve_reading_edit();

-- Identity, bibliographic metadata, attribution and group agreements stay fixed.
grant update(question,processing,excerpt) on public.readings to authenticated;
grant update(body) on public.reading_comments to authenticated;
create policy edit_own_reading on public.readings for update to authenticated
  using(owner_id=(select auth.uid()) and (select public.can_access_readings()))
  with check(owner_id=(select auth.uid()) and (select public.can_access_readings()));
create policy edit_own_comment on public.reading_comments for update to authenticated
  using(owner_id=(select auth.uid()) and (select public.can_access_readings()))
  with check(owner_id=(select auth.uid()) and (select public.can_access_readings()));
notify pgrst,'reload schema';
commit;
