import type { RequestHandler } from '@sveltejs/kit';
import { iconHandler } from '@/lib/icon-handler';

export const GET: RequestHandler = iconHandler(
	['version', 'icon', 'style'],
	({ version, icon, style }) => {
		return `https://unpkg.com/@material-design-icons/svg@${version}/${style}/${icon}.svg`;
	}
);
