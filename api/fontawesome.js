import { catchError } from './_lib/catch-error';
import { iconHandler } from './_lib/icon-handler';

// https://unpkg.com/browse/@fortawesome/fontawesome-free/
export default catchError(
  iconHandler({
    params: ['version', 'icon', 'style'],
    resolveIcon({ version, icon, style }) {
      return `https://unpkg.com/@fortawesome/fontawesome-free@${version}/svgs/${style}/${icon}.svg`;
    },
  })
);
