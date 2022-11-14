import type { APIRoute } from 'astro';
import { catchError } from '@/lib/catch-error';
import { iconHandler } from '@/lib/icon-handler';

export const get: APIRoute = catchError(
  iconHandler(({ version, icon }) => {
    return `https://raw.githubusercontent.com/sanity-io/design/%40sanity/icons%40${version}/packages/%40sanity/icons/export/${icon}.svg`;
  })
);
