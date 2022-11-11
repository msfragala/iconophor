import { catchError } from '@/lib/catch-error';
import { iconHandler } from '@/lib/icon-handler';
import type { APIRoute } from 'astro';

export const get: APIRoute = catchError(
  iconHandler(({ version, icon, style }) => {
    return `https://unpkg.com/@material-icons/svg@${version}/svg/${icon}/${style}.svg`;
  })
);
