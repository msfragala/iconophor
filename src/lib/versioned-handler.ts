import { error, type RequestHandler } from '@sveltejs/kit';
import { compile, match } from 'path-to-regexp';
import semiver from 'semiver';
import { createResponse } from '@/lib/create-response';

type Pattern = {
	version: string;
	from: string;
	to: string;
};

type Options = {
	versionParam: string;
	segmentsParam: string;
	patterns: Pattern[];
};

export function createVersionedHandler(options: Options): RequestHandler {
	return async (request) => {
		const version = request.params[options.versionParam];
		const segments = request.params[options.segmentsParam]?.replace(/\.svg$/, '');

		if (!version || !segments) throw error(400);
		if (!/^\d+\.\d+\.\d+$/.test(version)) throw error(400);

		const pattern = options.patterns.find((p) => semiver(version, p.version) >= 0);

		if (!pattern) {
			throw error(404);
		}

		const matcher = match(pattern!.from, { decode: decodeURIComponent });
		const result = matcher('/' + segments);

		if (!result) {
			throw error(404);
		}

		const params = { version, ...result.params };

		const url = new URL(pattern.to);
		url.pathname = compile(url.pathname, { encode: encodeURIComponent })(params);

		if (!url) {
			throw error(404, 'Icon not found');
		}

		console.info({ referer: request.request.headers.get('referer'), url: request.url.href });

		return createResponse(url.href, request.url.searchParams);
	};
}
