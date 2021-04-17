export function catchError(fn) {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (error) {
      const status = error.status ?? 500;
      const message = error.statusText ?? 'Error processing request';
      res.send(status, message);
    }
  };
}
