import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {calendarText} from '../../blog/app/calendar.mjs';
import {sessionCard} from '../../blog/app/session-card.mjs';

const dir = new URL('../../blog/app/', import.meta.url);
const rows = JSON.parse(await readFile(new URL('encuentros.json',dir),'utf8'));
const row = rows.find(s=>s.id==='2026-11-18-integridad');

test('la suscripción publicada contiene las fichas y comparte su UID con la cita suelta',async()=>{
  const expected = rows.filter(s=>['confirmada','reprogramada','cancelada'].includes(s.status)).map(sessionCard);
  const published = await readFile(new URL('agenda.ics',dir),'utf8');
  assert.equal(published.replace(/\r?\n/g,'\r\n'),calendarText(expected));
  const single = calendarText([sessionCard(row)]);
  assert.ok(published.includes(single.match(/UID:[^\r\n]+/)[0]));
  assert.match(single,/DTSTART:20261118T200000Z/);
  assert.match(single,/DTEND:20261118T210000Z/);
  assert.ok(single.split('\r\n').every(line=>Buffer.byteLength(line)<=75));
});

test('reprogramar y cancelar conserva la identidad y comunica las revisiones',()=>{
  const changed={...row, starts_at:'2026-11-20T15:30:00-06:00',sequence:1,status:'reprogramada'};
  const updated=calendarText([sessionCard(changed)]);
  assert.match(updated,/DTSTART:20261120T213000Z/);
  const cancelled=calendarText([sessionCard({...changed,status:'cancelada',sequence:2})]);
  assert.match(cancelled,/STATUS:CANCELLED/);
  assert.match(cancelled,/SEQUENCE:2/);
  assert.equal(cancelled.match(/UID:[^\r\n]+/)[0],updated.match(/UID:[^\r\n]+/)[0]);
});
