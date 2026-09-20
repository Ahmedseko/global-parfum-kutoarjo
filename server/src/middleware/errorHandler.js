export function errorHandler(err, req, res, next) {
  const status = err.status ?? 500;
  if (status >= 500) {
    console.error(err);
  }
  const message = status >= 500 ? 'Terjadi kesalahan pada server.' : err.message || 'Terjadi kesalahan pada server.';
  res.status(status).json({ message });
}

export function notFoundHandler(req, res) {
  res.status(404).json({ message: 'Rute tidak ditemukan.' });
}
