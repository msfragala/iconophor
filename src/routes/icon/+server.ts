import type { RequestHandler } from '@sveltejs/kit';
import { iconHandler } from '@/lib/icon-handler';

export const GET: RequestHandler = iconHandler([], (params, request) => {
	const { searchParams } = new URL(request.url);
	return searchParams.get('url') ?? undefined;
});
