import { catchError } from '@/lib/catch-error';
import { iconHandler } from '@/lib/icon-handler';
import type { APIRoute } from 'astro';

export const get: APIRoute = catchError(
  iconHandler(({ version, icon }) => {
    return `https://unpkg.com/feather-icons@${version}/dist/icons/${icon}.svg`;
  })
);
