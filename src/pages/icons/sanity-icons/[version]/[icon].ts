import type { APIRoute } from 'astro';
import { catchError } from '@/lib/catch-error';
import { iconHandler } from '@/lib/icon-handler';

export const get: APIRoute = catchError(
  iconHandler(({ version, icon }) => {
    if (!version) return;
    version = version.toString();

    if (!/^\d+\.\d+\.\d+/.test(version)) return;

    const [major, minor, patch] = version
      .split('.')
      .map((n) => parseInt(n, 10));

    if (major === 1 && minor === 3 && patch < 9) {
      return `https://raw.githubusercontent.com/sanity-io/design/@sanity/icons@${version}/packages/@sanity/icons/export/${icon}.svg`;
    }

    return `https://raw.githubusercontent.com/sanity-io/icons/v${version}/export/${icon}.svg`;
  })
);
