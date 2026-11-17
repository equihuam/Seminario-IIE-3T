export function splitAgenda(body) {
  const lines = {description: [], topics: [], activity: []};
  let field = 'description';
  for (const line of body.split(/\r?\n/)) {
    const heading = /^(Temas a tratar|Dinámica o actividad prevista):\s*(.*)$/i.exec(line);
    if (heading) {
      field = heading[1].toLowerCase().startsWith('temas') ? 'topics' : 'activity';
      lines[field].push(heading[2]);
    } else {
      lines[field].push(line);
    }
  }
  return Object.fromEntries(Object.entries(lines).map(([key, value]) => [key, value.join('\n').trim()]));
}
