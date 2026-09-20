import { pool } from '../db/pool.js';
import { AppError } from '../utils/AppError.js';

function mapSettings(row) {
  return {
    storeName: row.store_name,
    ownerName: row.owner_name,
    address: row.address,
    phone: row.phone,
    currency: row.currency,
    defaultLowStockThreshold: row.default_low_stock_threshold,
  };
}

export async function getSettings() {
  const [rows] = await pool.query('SELECT * FROM settings LIMIT 1');
  if (!rows[0]) {
    throw new AppError('Pengaturan toko belum tersedia.', 404);
  }
  return mapSettings(rows[0]);
}

export async function updateSettings(input) {
  if (!input.storeName?.trim() || !input.ownerName?.trim()) {
    throw new AppError('Nama toko dan nama owner wajib diisi.', 400);
  }
  if (input.defaultLowStockThreshold < 0) {
    throw new AppError('Batas stok menipis tidak boleh negatif.', 400);
  }

  const [rows] = await pool.query('SELECT id FROM settings LIMIT 1');

  if (rows[0]) {
    await pool.query(
      `UPDATE settings SET store_name = ?, owner_name = ?, address = ?, phone = ?, currency = ?, default_low_stock_threshold = ?
       WHERE id = ?`,
      [input.storeName, input.ownerName, input.address, input.phone, input.currency, input.defaultLowStockThreshold, rows[0].id],
    );
  } else {
    await pool.query(
      `INSERT INTO settings (store_name, owner_name, address, phone, currency, default_low_stock_threshold)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [input.storeName, input.ownerName, input.address, input.phone, input.currency, input.defaultLowStockThreshold],
    );
  }

  return getSettings();
}
