import type { RequestHandler } from '@sveltejs/kit';
import { iconHandler } from '@/lib/icon-handler';

export const GET: RequestHandler = iconHandler(['version', 'icon'], ({ version, icon }) => {
	return `https://raw.githubusercontent.com/sanity-io/icons/${version}/export/${icon}.svg`;
});
