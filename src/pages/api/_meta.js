import ms from 'ms';

import { svgAttributes } from '@/constants/svg-attributes';
import { catchError } from '@/lib/catch-error';

export default catchError((req, res) => {
  res.setHeader('Cache-Control', `public,max-age=0,s-maxage=${ms('300s')}`);
  res.json({
    supportedAttributes: svgAttributes,
  });
});
