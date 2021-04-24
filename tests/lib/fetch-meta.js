import fetch from 'node-fetch';

import { PROD_URL } from './env';

export async function fetchMeta() {
  const url = `${PROD_URL}/api/_meta`;
  return fetch(url).then((res) => res.json());
}
