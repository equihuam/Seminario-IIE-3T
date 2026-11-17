import {readFile, writeFile} from 'node:fs/promises';
import {sessionCard} from '../blog/app/session-card.mjs';
import {calendarText} from '../blog/app/calendar.mjs';

const dir = new URL('../blog/app/', import.meta.url);
const sessions = JSON.parse((await readFile(new URL('encuentros.json',dir),'utf8')).replace(/^\uFEFF/,''));
const events = sessions.filter(s => ['confirmada','reprogramada','cancelada'].includes(s.status)).map(sessionCard);
await writeFile(new URL('agenda.ics',dir),calendarText(events));
