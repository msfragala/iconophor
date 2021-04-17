import { Router } from 'worktop';
import * as Cache from 'worktop/cache';

import { catchError } from './lib/catch-error';
import { generateSvg } from './lib/generate-svg';

const worker = new Router();
const cachePolicy = 'public,max-age=2592000,s-maxage=31557600';

// https://unpkg.com/browse/feather-icons/
worker.add(
  'GET',
  '/feather/:version/:icon',
  catchError(async (req, res) => {
    const { version, icon } = req.params;
    const name = icon.replace(/\.svg$/, '');
    const url = `https://unpkg.com/feather-icons@${version}/dist/icons/${name}.svg`;
    const svg = await generateSvg(url, req.query);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', cachePolicy);
    res.send(200, svg);
  })
);

// https://unpkg.com/browse/@material-icons/svg/
worker.add(
  'GET',
  '/material/:version/:style/:icon',
  catchError(async (req, res) => {
    const { version, style, icon } = req.params;
    const name = icon.replace(/\.svg$/, '');
    const url = `https://unpkg.com/@material-icons/svg@${version}/svg/${name}/${style}.svg`;
    const svg = await generateSvg(url, req.query);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', cachePolicy);
    res.send(200, svg);
  })
);

// https://unpkg.com/browse/@fortawesome/fontawesome-free/
worker.add(
  'GET',
  '/fontawesome/:version/:style/:icon',
  catchError(async (req, res) => {
    const { version, style, icon } = req.params;
    const name = icon.replace(/\.svg$/, '');
    const url = `https://unpkg.com/@fortawesome/fontawesome-free@${version}/svgs/${style}/${name}.svg`;
    const svg = await generateSvg(url, req.query);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', cachePolicy);
    res.send(200, svg);
  })
);

Cache.listen(worker.run);
