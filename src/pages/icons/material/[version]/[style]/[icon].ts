import type { APIRoute } from 'astro';
import { catchError } from '@/lib/catch-error';
import { iconHandler } from '@/lib/icon-handler';

export const GET: APIRoute = catchError(
  iconHandler(({ version, icon, style }) => {
    return `https://unpkg.com/@material-icons/svg@${version}/svg/${icon}/${style}.svg`;
  })
);
