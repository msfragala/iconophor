import hastUtilToHtml from 'hast-util-to-html';
import fetch from 'node-fetch';
import { parse } from 'svg-parser';

import { Exception } from '@/lib/exception';

const nullish = (x) => x == undefined || x != x;

export function iconHandler({ params, resolveIcon }) {
  /**
   *
   * @param {import('@vercel/node').VercelRequest} req
   * @param {import('@vercel/node').VercelResponse} res
   */
  return async (req, res) => {
    params.forEach((param) => {
      if (!req.query[param]) {
        throw new Exception(400, `Missing ${param} parameter`);
      }
    });

    const url = await resolveIcon(req.query);
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

    const raw = await iconResponse.text();
    const attributes = pullAttributes(req.query);
    const svg = generateSvg(raw, attributes);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=0');
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.status(200).end(svg);
  };
}

function generateSvg(raw, attributes) {
  const hast = parse(raw);
  const node = hast.children[0];

  const props = { ...node.properties };
  const viewbox = node.properties.viewBox;
  const dimensions = deriveDimensions(viewbox, attributes);

  attributes.height = dimensions.height;
  attributes.width = dimensions.width;

  Object.entries(attributes).forEach(([key, value]) => {
    if (value === '') delete props[key];
    else props[key] = value;
  });

  delete node.properties.class;
  node.properties = props;

  return hastUtilToHtml(hast);
}

const svgAttributes = [
  'color',
  'fill',
  'fill-opacity',
  'fill-rule',
  'stroke',
  'stroke-dasharray',
  'stroke-dashoffset',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-miterlimit',
  'stroke-opacity',
  'stroke-width',
  'height',
  'width',
];

function pullAttributes(object) {
  const attrs = {};

  for (let key of svgAttributes) {
    if (object[key] != undefined) {
      attrs[key] = object[key];
    }
  }

  return attrs;
}

function deriveDimensions(viewbox, { height, width }) {
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
