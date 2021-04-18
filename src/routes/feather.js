// import { catchError } from '../lib/catch-error';
// import { iconHandler } from '../lib/icon-handler';

// https://unpkg.com/browse/feather-icons/
// export default catchError(
//   iconHandler({
//     params: ['version', 'icon'],
//     resolveIcon({ version, icon }) {
//       return `https://unpkg.com/feather-icons@${version}/dist/icons/${icon}.svg`;
//     },
//   })
// );

export async function get() {
  return {
    body: 'aaa',
  };
}
