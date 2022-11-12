import type { APIRoute } from 'astro';
import { Exception } from '@/lib/exception';

export function catchError(fn: APIRoute): APIRoute {
  return async (context) => {
    try {
      return await fn(context);
    } catch (error: unknown | Exception) {
      let status = 500;
      let statusText = '';

      if (error instanceof Exception) {
        status = error.status;
        statusText = error.statusText;
      }

      console.error(error);

      return new Response('', {
        status,
        statusText,
      });
    }
  };
}
