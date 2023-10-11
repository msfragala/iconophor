import type { APIContext, APIRoute } from 'astro';
import { toHtml } from 'hast-util-to-html';
import fetch from 'node-fetch';
import { type ElementNode, parse } from 'svg-parser';
import { svgAttributes } from '../constants/svg-attributes';
import { Exception } from './exception';

const nullish = (x: unknown) => x == undefined || x != x;

export function iconHandler(
  fn: (params: APIContext['params']) => string | undefined
): APIRoute {
  return async ({ request, params }): Promise<Response> => {
    const searchParams = new URL(request.url).searchParams;
    const query = Object.fromEntries(searchParams);

    const url = fn(params);

    if (!url) {
      throw new Exception(404, 'Icon not found');
    }

    const iconResponse = await fetch(url);

    if (iconResponse.status === 404) {
      throw new Exception(404, 'Icon not found');
    }

    if (!iconResponse.ok) {
      throw new Exception(500, 'Error fetching icon');
    }

    if (iconResponse.headers.get('content-type') !== 'image/svg+xml') {
      throw new Exception(500, 'Resource not SVG');
    }

    let svg = await iconResponse.text();

    if (hasSvgParam(searchParams)) {
      const attributes = pullAttributes(query);
      svg = generateSvg(svg, attributes);
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

function generateSvg(raw: string, attributes: Record<string, string>) {
  const hast = parse(raw);
  const node = hast.children[0] as ElementNode;

  const props = { ...node.properties };
  const viewbox = node.properties?.viewBox as string;
  const dimensions = deriveDimensions(viewbox, attributes);

  attributes.height = (dimensions.height ?? props.height).toString();
  attributes.width = (dimensions.width ?? props.width).toString();

  Object.entries(attributes).forEach(([key, value]) => {
    if (value === '') delete props[key];
    else props[key] = value;
  });

  delete props.class;
  node.properties = props;

  return toHtml(hast);
}

function pullAttributes(object: Record<string, string>) {
  const attrs: Record<string, string> = {};

  for (const key of svgAttributes) {
    if (object[key] != undefined) {
      attrs[key] = object[key];
    }
  }

  return attrs;
}

function deriveDimensions(
  viewbox: string,
  { height, width }: Record<string, string>
) {
  const parts = viewbox.split(/(?:\s*,?\s+|,)/);
  const viewboxW = parseInt(parts[2], 10);
  const viewboxH = parseInt(parts[3], 10);
  const w = parseInt(width, 10);
  const h = parseInt(height, 10);

  if (isNaN(viewboxW) || isNaN(viewboxH)) {
    return { height, width };
  }

  if (!isNaN(w) && nullish(height)) {
    return {
      height: (w / viewboxW) * viewboxH,
      width: w,
    };
  }

  if (!isNaN(h) && nullish(width)) {
    return {
      height: h,
      width: (h / viewboxH) * viewboxW,
    };
  }

  return { height, width };
}

function hasSvgParam(params: URLSearchParams) {
  return svgAttributes.some((attr) => params.has(attr));
}
