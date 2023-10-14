import { error, type RequestHandler } from '@sveltejs/kit';
import { createHash } from '@/lib/crypto';
import { allParams, attributeParams } from '@/lib/parameters';
import { transformXml, type XastNode } from '@/lib/transform';

const noop = () => {};
const month = 2678400;
const year = 31536000;

export function iconHandler<T extends string>(
	paramNames: T[],
	fn: (params: Partial<Record<T, string>>) => string | undefined
): RequestHandler {
	return async ({ request, params }): Promise<Response> => {
		const { pathname, searchParams } = new URL(request.url);

		paramNames.forEach((param) => {
			if (!params[param]) {
				throw error(400, 'Missing pathname params');
			}
		});

		const url = fn(params);

		if (!url) {
			throw error(404, 'Icon not found');
		}

		const iconResponse = await fetch(url);

		if (iconResponse.status === 404) {
			throw error(404, 'Icon not found');
		}

		if (!iconResponse.ok) {
			throw error(500, 'Error fetching icon');
		}

		if (iconResponse.headers.get('content-type') !== 'image/svg+xml') {
			throw error(500, 'Resource not SVG');
		}

		let svg = await iconResponse.text();

		if (allParams.some((p) => searchParams.has(p))) {
			svg = transformXml(svg, [
				replaceColors(searchParams),
				overwriteAttributes(searchParams),
				autofillDimensions(searchParams),
				convertToSymbol(searchParams),
			]);
		}

		const hash = await createHash(svg + pathname + searchParams);

		return new Response(svg, {
			status: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'ETag': `"${hash}"`,
				'Cache-Control': `public, s-maxage=${year}, max-age=${month}`,
				'Vercel-CDN-Cache-Control': `max-age=${year}`,
				'Content-Type': 'image/svg+xml; charset=utf-8',
				'X-Content-Type-Options': 'nosniff',
			},
		});
	};
}

function replaceColors(searchParams: URLSearchParams) {
	if (!searchParams.has('replaceColors')) return noop;
	const color = searchParams.get('replaceColors')!;
	return (node: XastNode) => {
		if (node.type !== 'element') return;

		const fill = node.attributes.fill;
		const stroke = node.attributes.stroke;

		if (fill && fill !== 'none') {
			if (!color) delete node.attributes['fille'];
			else node.attributes.fill = color;
		}

		if (stroke && stroke !== 'none') {
			if (!color) delete node.attributes['stroke'];
			else node.attributes.stroke = color;
		}
	};
}

function overwriteAttributes(params: URLSearchParams) {
	if (!attributeParams.some((a) => params.has(a))) return noop;
	return (node: XastNode) => {
		if (node.type !== 'element') return;
		if (node.name !== 'svg') return;
		attributeParams.forEach((attribute) => {
			if (!params.has(attribute)) return;
			const value = params.get(attribute)!;
			if (!value) delete node.attributes[attribute];
			else node.attributes[attribute] = value;
		});
	};
}

function autofillDimensions(params: URLSearchParams) {
	if (params.has('width') && params.has('height')) return noop;
	let width: number;
	let height: number;

	if (params.has('width')) {
		width = parseInt(params.get('width')!, 10);
		if (isNaN(width)) return noop;
	}

	if (params.has('height')) {
		height = parseInt(params.get('height')!, 10);
		if (isNaN(height)) return noop;
	}

	return (node: XastNode) => {
		if (node.type !== 'element') return;
		if (node.name !== 'svg') return;
		if (!node.attributes.viewBox) return;

		const ratio = getAspectRatio(node.attributes.viewBox);

		if (isNaN(ratio)) return;

		if (params.has('width')) {
			node.attributes.height = String(width / ratio);
		}

		if (params.has('height')) {
			node.attributes.width = String(height / ratio);
		}
	};
}

function getAspectRatio(viewBox: string) {
	const [, , w, h] = viewBox.trim().split(/(?:\s*,?\s+|,)/);
	const width = parseInt(w, 10);
	const height = parseInt(h, 10);
	return width / height;
}

function convertToSymbol(params: URLSearchParams) {
	if (params.get('symbol') !== 'true') return noop;
	return (node: XastNode) => {
		if (node.type !== 'element') return;
		if (node.name !== 'svg') return;
		const children = node.children;
		node.children = [
			{
				children,
				type: 'element',
				name: 'symbol',
				attributes: {
					id: 'icon',
					viewBox: node.attributes.viewBox,
					fill: node.attributes.fill,
					stroke: node.attributes.stroke,
				},
			},
		];
	};
}
