import { error, type RequestHandler } from '@sveltejs/kit';
import { createResponse } from './create-response';

export function iconHandler<T extends string>(
	paramNames: T[],
	fn: (params: Partial<Record<T, string>>, request: Request) => string | undefined
): RequestHandler {
	return async ({ request, params }): Promise<Response> => {
		const { searchParams } = new URL(request.url);

		paramNames.forEach((param) => {
			if (!params[param]) {
				throw error(400, 'Missing pathname params');
			}
		});

		const url = fn(params, request);

		if (!url) {
			throw error(404, 'Icon not found');
		}

		console.warn({ referer: request.headers.get('referer'), url: request.url });

		return createResponse(url, searchParams);
	};
}
