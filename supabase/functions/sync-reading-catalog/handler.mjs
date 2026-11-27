const groupItems = 'https://api.zotero.org/groups/6712171/items/top';
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Cache-Control': 'no-store'
};

function json(body, status = 200) {
  return Response.json(body, { status, headers: cors });
}

function integer(value) {
  if (typeof value !== 'string' || !/^\d+$/.test(value)) throw Error('Invalid Zotero header');
  const number = Number(value);
  if (!Number.isSafeInteger(number)) throw Error('Invalid Zotero header');
  return number;
}

export async function readCatalog(key, decodeHTML, fetcher) {
  const rows = [];
  const keys = new Set();
  let version;
  let total;
  for (let start = 0; ; start += 100) {
    const params = new URLSearchParams({
      format: 'json', include: 'data,bib', style: 'apa', locale: 'es-ES',
      limit: '100', start: String(start), sort: 'title', direction: 'asc'
    });
    const response = await fetcher(groupItems + '?' + params, {
      headers: { 'Zotero-API-Version': '3', 'Zotero-API-Key': key },
      redirect: 'error'
    });
    if (!response.ok) throw Error('Zotero request failed');
    const currentVersion = integer(response.headers.get('Last-Modified-Version'));
    const currentTotal = integer(response.headers.get('Total-Results'));
    version ??= currentVersion;
    total ??= currentTotal;
    const page = await response.json();
    if (version !== currentVersion || total !== currentTotal || !Array.isArray(page) ||
        page.length !== Math.min(100, total - start)) throw Error('Incomplete Zotero snapshot');

    for (const { key: itemKey, version: itemVersion, data, bib } of page) {
      if (!/^[A-Z0-9]{8}$/.test(itemKey) || keys.has(itemKey) || !Number.isSafeInteger(itemVersion) ||
          itemVersion < 0 || itemVersion > version || typeof data?.itemType !== 'string') {
        throw Error('Invalid Zotero record');
      }
      keys.add(itemKey);
      if (['attachment', 'note', 'annotation'].includes(data.itemType)) continue;
      const title = data.title.trim();
      const citation = decodeHTML(bib.replace(/<[^>]*>/g, '')).trim();
      const doi = (data.DOI || '').trim();
      const candidate = doi ? 'https://doi.org/' + doi : (data.url || '');
      const url = /^https?:\/\/\S+$/i.test(candidate) && candidate.length <= 2000 ? candidate : '';
      if (!title || !citation || title.length > 2000 || citation.length > 2000) {
        throw Error('Incomplete Zotero record');
      }
      rows.push({ zotero_key: itemKey, title, citation, url, source_version: itemVersion });
    }
    if (keys.size === total) return { catalog_version: version, catalog_rows: rows };
  }
}

export function createCatalogSync(env, decodeHTML, fetcher = fetch) {
  return async request => {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return json({ message: 'Método no permitido.' }, 405);
    const authorization = request.headers.get('Authorization');
    if (!/^Bearer \S+$/i.test(authorization || '')) return json({ message: 'Entra con tu cuenta.' }, 401);

    const base = env('SUPABASE_URL');
    const anonKey = env('SUPABASE_ANON_KEY');
    const serviceKey = env('SUPABASE_SERVICE_ROLE_KEY');
    const zoteroKey = env('READING_ZOTERO_API_KEY');
    try {
      const signal = AbortSignal.timeout(15000);
      const send = (url, options) => fetcher(url, { ...options, signal });
      const rpc = (name, key, auth, body) => send(base + '/rest/v1/rpc/' + name, {
        method: 'POST',
        headers: { apikey: key, Authorization: auth, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const member = await rpc('can_access_readings', anonKey, authorization, { needs_coordination: false });
      if (member.status === 401) return json({ message: 'Entra con tu cuenta.' }, 401);
      if (member.status === 403) return json({ message: 'Tu cuenta no está habilitada para Lecturas.' }, 403);
      if (!member.ok) throw Error('Membership check failed');
      if (await member.json() !== true) return json({ message: 'Tu cuenta no está habilitada para Lecturas.' }, 403);

      if (!serviceKey || !zoteroKey) throw Error('Catalog configuration is missing');
      const catalog = await readCatalog(zoteroKey, decodeHTML, send);
      const applied = await rpc('apply_reading_catalog', serviceKey, 'Bearer ' + serviceKey, catalog);
      if (!applied.ok) throw Error('Catalog update failed');
      await applied.json();
      return json({ message: 'Catálogo de Zotero actualizado.' });
    } catch {
      return json({ message: 'No se pudo sincronizar el catálogo con Zotero.' }, 503);
    }
  };
}
