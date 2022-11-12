import type { APIRoute } from 'astro';
import { catchError } from '@/lib/catch-error';
import { iconHandler } from '@/lib/icon-handler';

export const get: APIRoute = catchError(
  iconHandler(({ version, icon, style }) => {
    return `https://unpkg.com/@fortawesome/fontawesome-free@${version}/svgs/${style}/${icon}.svg`;
  })
);
