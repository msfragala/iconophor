import { error } from '@sveltejs/kit';
import { origin } from '@/lib/env.js';
import { libraries } from '@/lib/libraries.js';
import { day, week } from '@/lib/time.js';

type GithubContents = Array<{ name: string }>;

export async function GET(event) {
	const { searchParams } = new URL(event.request.url);

	const library = libraries.find((l) => l.id === searchParams.get('library'));
	const style = searchParams.get('style');

	if (!library) throw error(422);

	if (library.urlPattern.includes(':style') && !style) {
		throw error(422);
	}

	let url;
	switch (library.id) {
		case 'feather':
			url = 'https://api.github.com/repos/feathericons/feather/contents/icons';
			break;
		case 'material':
			url = `https://api.github.com/repos/google/material-design-icons/contents/symbols/web`;
			break;
		case 'fontawesome':
			url = `https://api.github.com/repos/FortAwesome/Font-Awesome/contents/svgs/${style}`;
			break;
		case 'heroicons':
			url = `https://api.github.com/repos/tailwindlabs/heroicons/contents/optimized/24/${style}`;
			break;
		case 'sanity-icons':
			url = 'https://api.github.com/repos/sanity-io/icons/contents/export';
			break;
	}

	const names = await fetch(url)
		.then((res) => res.json())
		.then((data: GithubContents) => data.map((d) => d.name.replace('.svg', '')));

	return new Response(JSON.stringify(names), {
		headers: {
			'Access-Control-Allow-Origin': origin,
			'Cache-Control': `public, s-maxage=${week}, max-age=${day}`,
			'Content-Type': 'application/json; charset=utf-8',
			'X-Content-Type-Options': 'nosniff',
		},
	});
}

export async function OPTIONS() {
	return new Response(null, {
		headers: {
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Origin': origin,
			'Access-Control-Allow-Headers': '*',
		},
	});
}
