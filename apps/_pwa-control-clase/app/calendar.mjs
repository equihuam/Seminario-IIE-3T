const calendarName = 'Agenda del Seminario IIE-3T';
const encoder = new TextEncoder();

function stamp(value) {
  return new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function escapeText(value) {
  return value.replace(/\\/g,'\\\\').replace(/\r\n|\r|\n/g,'\\n').replace(/([,;])/g,'\\$1');
}

function fold(line) {
  let output = '', bytes = 0;
  for (const character of line) {
    const size = encoder.encode(character).length;
    if (bytes + size > 75) {
      output += '\r\n ';
      bytes = 1;
    }
    output += character;
    bytes += size;
  }
  return output;
}

export function calendarText(events) {
  const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//IIE-3T//Tablero//ES',
    'CALSCALE:GREGORIAN','NAME:'+calendarName,'X-WR-CALNAME:'+calendarName];
  const ids = new Set();
  for (const event of events) {
    if (!event.id || ids.has(event.id)) throw Error('Identificador de encuentro ausente o duplicado');
    ids.add(event.id);
    const updated = stamp(event.updated_at);
    lines.push('BEGIN:VEVENT','UID:'+escapeText(event.id)+'@seminario-iie',
      'DTSTAMP:'+updated,'LAST-MODIFIED:'+updated,'DTSTART:'+stamp(event.starts_at));
    if (event.ends_at) lines.push('DTEND:'+stamp(event.ends_at));
    if (event.sequence !== undefined) {
      if (!Number.isSafeInteger(event.sequence) || event.sequence < 0) throw Error('Revisión inválida');
      lines.push('SEQUENCE:'+event.sequence);
    }
    lines.push('STATUS:'+(event.status==='cancelada'?'CANCELLED':'CONFIRMED'),
      'SUMMARY:'+escapeText(event.title),'DESCRIPTION:'+escapeText(event.body),'END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return lines.map(fold).join('\r\n')+'\r\n';
}
