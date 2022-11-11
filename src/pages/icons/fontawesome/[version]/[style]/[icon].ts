import { catchError } from '@/lib/catch-error';
import { iconHandler } from '@/lib/icon-handler';
import type { APIRoute } from 'astro';

export const get: APIRoute = catchError(
  iconHandler(({ version, icon, style }) => {
    return `https://unpkg.com/@fortawesome/fontawesome-free@${version}/svgs/${style}/${icon}.svg`;
  })
);
