-- Run as database administrator; all synthetic records are rolled back.
begin;
do $$
declare a uuid:=gen_random_uuid(); b uuid:=gen_random_uuid(); r uuid:=gen_random_uuid(); c uuid:=gen_random_uuid(); n integer; ref text;
begin
 select zotero_key into strict ref from public.reading_references where active limit 1;
 insert into auth.users(id) values(a),(b);
 insert into public.reading_members(user_id,display_name,coordinator) values(a,'Prueba temporal A',false),(b,'Prueba temporal B',true);
 perform set_config('request.jwt.claim.sub',a::text,true);
 execute 'set local role authenticated';
 insert into public.readings(id,zotero_key,question,processing) values(r,ref,'Original sintético','Discusión sintética');
 insert into public.reading_comments(id,reading_id,body) values(c,r,'Comentario original');
 update public.readings set question='Corregido sintético' where id=r and revision=1;
 get diagnostics n=row_count;
 if n<>1 or not exists(select 1 from public.readings where id=r and revision=2 and edited_at is not null) then raise exception 'Fallo edición propia'; end if;
 update public.readings set question='Conflicto' where id=r and revision=1;
 get diagnostics n=row_count;
 if n<>0 then raise exception 'Fallo revisión concurrente'; end if;
 update public.reading_comments set body='Comentario corregido' where id=c and revision=1;
 get diagnostics n=row_count;
 if n<>1 then raise exception 'Fallo edición comentario'; end if;
 begin
  update public.readings set owner_id=b where id=r;
  raise exception 'Autoría modificable';
 exception when insufficient_privilege then null; end;
 begin
  update public.readings set title='Metadato falso' where id=r;
  raise exception 'Metadatos modificables';
 exception when insufficient_privilege then null; end;
 begin
  update public.readings set processing=' ' where id=r;
  raise exception 'Dinámica vacía aceptada';
 exception when check_violation then null; end;
 begin
  perform 1 from public.reading_edit_history;
  raise exception 'Historial expuesto';
 exception when insufficient_privilege then null; end;
 perform set_config('request.jwt.claim.sub',b::text,true);
 update public.readings set question='Ajena' where id=r;
 get diagnostics n=row_count;
 if n<>0 then raise exception 'Edición ajena aceptada'; end if;
 update public.reading_comments set body='Ajeno' where id=c;
 get diagnostics n=row_count;
 if n<>0 then raise exception 'Comentario ajeno aceptado'; end if;
 execute 'reset role';
 if (select count(*) from public.reading_edit_history where entry_id in(r,c))<>2 then raise exception 'Historial incorrecto'; end if;
 if not exists(select 1 from public.reading_edit_history where entry_id=r and original->>'question'='Original sintético') then raise exception 'Original perdido'; end if;
 execute 'set local role anon';
 begin
  update public.readings set question='Anónima' where id=r;
  raise exception 'Anónimo aceptado';
 exception when insufficient_privilege then null; end;
 execute 'reset role';
end $$;
rollback;
select 'PASS: edición propia, aislamiento, concurrencia, historial y validación; datos sintéticos revertidos' as resultado;
