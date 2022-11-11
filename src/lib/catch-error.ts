import type { APIRoute } from 'astro';

export function catchError(fn: APIRoute): APIRoute {
  return async (context) => {
    try {
      return await fn(context);
    } catch (error: any) {
      console.error(error);
      return new Response('', {
        status: error.status ?? 500,
        statusText: error.statusText ?? '',
      });
    }
  };
}
