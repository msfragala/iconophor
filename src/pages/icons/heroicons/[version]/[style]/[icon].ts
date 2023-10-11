import type { APIRoute } from 'astro';
import { catchError } from '@/lib/catch-error';
import { iconHandler } from '@/lib/icon-handler';

export const GET: APIRoute = catchError(
  iconHandler(({ version, icon, style }) => {
    return `https://raw.githubusercontent.com/tailwindlabs/heroicons/v${version}/optimized/24/${style}/${icon}.svg`;
  })
);
