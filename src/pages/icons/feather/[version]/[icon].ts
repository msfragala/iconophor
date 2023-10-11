import type { APIRoute } from 'astro';
import { catchError } from '@/lib/catch-error';
import { iconHandler } from '@/lib/icon-handler';

export const GET: APIRoute = catchError(
  iconHandler(({ version, icon }) => {
    return `https://unpkg.com/feather-icons@${version}/dist/icons/${icon}.svg`;
  })
);
