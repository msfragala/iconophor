import { catchError } from './_lib/catch-error';
import { iconHandler } from './_lib/icon-handler';

// https://unpkg.com/browse/feather-icons/
export default catchError(
  iconHandler({
    params: ['version', 'icon'],
    resolveIcon({ version, icon }) {
      return `https://unpkg.com/feather-icons@${version}/dist/icons/${icon}.svg`;
    },
  })
);
