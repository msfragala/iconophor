import { catchError } from '@/lib/catch-error';
import { iconHandler } from '@/lib/icon-handler';

// https://unpkg.com/browse/@fortawesome/fontawesome-free/
export default catchError(
  iconHandler({
    params: ['version', 'icon', 'style'],
    resolveIcon({ version, icon, style }) {
      return `https://unpkg.com/@fortawesome/fontawesome-free@${version}/svgs/${style}/${icon}.svg`;
    },
  })
);
