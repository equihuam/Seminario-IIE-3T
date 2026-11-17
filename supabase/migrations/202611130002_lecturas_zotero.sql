begin;
alter table public.readings add column zotero_key text
  check (zotero_key ~ '^[A-Z0-9]{8}$');
grant insert (zotero_key) on public.readings to authenticated;
do $$
begin
  update public.readings set zotero_key='UCRDH3KH'
    where id='4a50a842-e42f-40e6-8804-6ba87fff6590' and url='https://doi.org/10.1002/wcc.915';
  if not found then raise exception 'Falta la ficha inicial de Saltelli'; end if;
end $$;
notify pgrst,'reload schema';
commit;
