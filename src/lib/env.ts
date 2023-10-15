import { VERCEL_ENV, VERCEL_URL } from '$env/static/private';

export const origin = VERCEL_ENV === 'preview' ? VERCEL_URL : 'https://www.iconophor.com';
