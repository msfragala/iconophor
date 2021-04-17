import hastUtilToHtml from 'hast-util-to-html';
import { parse } from 'svg-parser';

import { Exception } from './exception';

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

export async function generateSvg(url, query) {
  const res = await fetch(url);

  if (res.status === 404) {
    throw new Exception(404, 'Icon not found');
  }

  if (!res.ok) {
    throw new Exception(500, 'Error fetching icon');
  }

  if (res.headers.get('content-type') !== 'image/svg+xml') {
    throw new Exception(500, 'Located resource not SVG');
  }

  const raw = await res.text();

  const hast = parse(raw);
  const node = hast.children[0];

  node.properties ??= {};
  delete node.properties.class;

  svgAttributes.forEach((attr) => {
    if (query.has(attr)) {
      node.properties[attr] = query.get(attr);
    }
  });

  return hastUtilToHtml(hast);
}
