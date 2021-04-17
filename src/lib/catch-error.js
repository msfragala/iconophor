export function catchError(fn) {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (error) {
      const status = error.status ?? 500;
      res.send(status, '');
    }
  };
}
