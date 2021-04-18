export function catchError(fn) {
  /**
   *
   * @param {import('@vercel/node').VercelRequest} req
   * @param {import('@vercel/node').VercelResponse} res
   */
  return async (req, res) => {
    try {
      return await fn(req, res);
    } catch (error) {
      const status = error.status ?? 500;
      const message = error.statusText ?? 'Error processing request';
      console.error(error);
      return { status };
    }
  };
}
