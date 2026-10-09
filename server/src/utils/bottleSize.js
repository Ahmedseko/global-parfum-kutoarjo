import { AppError } from './AppError.js';

// Botol Kosong: ukuran "<n> ml", n kelipatan 5 dan 5-100.
export function assertBottleSize(category, size) {
  if (category !== 'Botol Kosong') return;
  const match = /^(\d+) ml$/.exec(size);
  const ml = match ? Number(match[1]) : 0;
  if (!(ml >= 5 && ml <= 100 && ml % 5 === 0)) {
    throw new AppError('Ukuran botol harus kelipatan 5 ml, antara 5 sampai 100 ml (contoh: 30 ml).', 400);
  }
}

if (process.argv[1]?.endsWith('bottleSize.js')) {
  const ok = (s) => { assertBottleSize('Botol Kosong', s); };
  ['5 ml', '30 ml', '100 ml'].forEach(ok);
  ['0 ml', '7 ml', '105 ml', '30ml', 'curah'].forEach((s) => {
    try { ok(s); throw new Error(`harus ditolak: ${s}`); } catch (e) { if (!(e instanceof AppError)) throw e; }
  });
  assertBottleSize('Parfum Refill', 'curah'); // kategori lain tidak dibatasi
  console.log('bottleSize ok');
}
