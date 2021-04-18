import hastUtilToHtml from 'hast-util-to-html';
import fetch from 'node-fetch';
import { parse } from 'svg-parser';

import { Exception } from './exception';

const CACHE_POLICY = 'public,max-age=2592000,s-maxage=31557600';

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
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader('Cache-Control', CACHE_POLICY);
    res.status(200).end(svg);
  };
}

function generateSvg(raw, attributes) {
  const hast = parse(raw);
  const node = hast.children[0];

  delete node.properties.class;
  node.properties = {
    ...node.properties,
    ...attributes,
  };

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
