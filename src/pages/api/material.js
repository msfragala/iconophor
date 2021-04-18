import { catchError } from '@/lib/catch-error';
import { iconHandler } from '@/lib/icon-handler';

// https://unpkg.com/browse/@material-icons/svg/
export default catchError(
  iconHandler({
    params: ['version', 'icon', 'style'],
    resolveIcon({ version, icon, style }) {
      return `https://unpkg.com/@material-icons/svg@${version}/svg/${icon}/${style}.svg`;
    },
  })
);
