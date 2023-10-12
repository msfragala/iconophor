import type { RequestHandler } from '@sveltejs/kit';
import { iconHandler } from '@/lib/icon-handler';

export const GET: RequestHandler = iconHandler(
	['version', 'icon', 'style'],
	({ version, icon, style }) => {
		return `https://raw.githubusercontent.com/tailwindlabs/heroicons/v${version}/optimized/24/${style}/${icon}.svg`;
	}
);
