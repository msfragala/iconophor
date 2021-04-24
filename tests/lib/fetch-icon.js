import fetch from 'node-fetch';
import { parse } from 'svg-parser';

import { CURRENT_URL, PROD_URL } from './env';

export async function fetchIcon({ base, path, params }) {
  const url = new URL(base + path);
  if (params) url.search = new URLSearchParams(params);
  const source = await fetch(url).then((res) => res.text());
  const hast = parse(source);
  const props = hast.children[0].properties;
  return { source, props };
}

export function fetchProdIcon(path, params) {
  return fetchIcon({ base: `${PROD_URL}/icons`, path, params });
}

export function fetchLocalIcon(path, params) {
  return fetchIcon({ base: `${CURRENT_URL}/icons`, path, params });
}
