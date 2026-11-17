const zone = 'America/Mexico_City';
const clock = new Intl.DateTimeFormat('es-MX', {timeZone:zone, hour:'2-digit', minute:'2-digit', hourCycle:'h23'});

export function sessionCard(session) {
  let time = Date.parse(session.starts_at);
  const blocks = session.activities.map(({minutes,text}) => {
    if (!Number.isInteger(minutes) || minutes <= 0 || !text) throw Error('Bloque de agenda incompleto');
    const from = clock.format(time);
    time += minutes * 60000;
    return from + '–' + clock.format(time) + ' · ' + text;
  });
  return {...session, kind:'session', ends_at:new Date(time).toISOString(),
    minutes:(time-Date.parse(session.starts_at))/60000,
    body:'Temas a tratar: '+session.topics+'\nDinámica o actividad prevista:\n'+blocks.join('\n')};
}
