import type { RequestHandler } from '@sveltejs/kit';
import { iconHandler } from '@/lib/icon-handler';

export const GET: RequestHandler = iconHandler(
	['version', 'icon'],
	(params) => `https://unpkg.com/feather-icons@${params.version}/dist/icons/${params.icon}.svg`
);
