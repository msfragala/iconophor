import { error, type RequestHandler } from '@sveltejs/kit';
import { transformXml, type XastNode } from './transform';
import { allParams, attributeParams } from '@/lib/parameters';

const noop = () => {};

export function iconHandler<T extends string>(
	paramNames: T[],
	fn: (params: Partial<Record<T, string>>) => string | undefined
): RequestHandler {
	return async ({ request, params }): Promise<Response> => {
		const searchParams = new URL(request.url).searchParams;

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
			]);
		}

		return new Response(svg, {
			status: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Cache-Control':
					's-maxage=2592000, max-age=604800, stale-while-revalidate=604800, immutable',
				'Content-Type': 'image/svg+xml; charset=utf-8',
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
			node.attributes.fill = color;
		}

		if (stroke && stroke !== 'none') {
			node.attributes.stroke = color;
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
			node.attributes[attribute] = value;
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
