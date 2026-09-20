import { pool } from '../db/pool.js';
import { AppError } from '../utils/AppError.js';
import { generateTransactionNumber } from '../utils/transactionNumber.js';
import { todayIso } from '../utils/date.js';

async function attachItems(sales) {
  if (sales.length === 0) return [];
  const ids = sales.map((s) => s.id);
  const [items] = await pool.query(
    `SELECT si.*, p.name AS product_name
     FROM sale_items si
     JOIN products p ON p.id = si.product_id
     WHERE si.sale_id IN (?)`,
    [ids],
  );

  const itemsBySale = new Map();
  for (const item of items) {
    const list = itemsBySale.get(item.sale_id) ?? [];
    list.push({
      id: item.id,
      productId: item.product_id,
      productName: item.product_name,
      quantity: item.quantity,
      unitPrice: Number(item.unit_price),
      subtotal: Number(item.subtotal),
    });
    itemsBySale.set(item.sale_id, list);
  }

  return sales.map((s) => ({
    id: s.id,
    transactionNumber: s.transaction_number,
    date: s.date,
    total: Number(s.total),
    paymentMethod: s.payment_method,
    userName: s.user_name,
    createdAt: s.created_at,
    items: itemsBySale.get(s.id) ?? [],
  }));
}

export async function listSales({ from, to } = {}) {
  let query = `SELECT s.*, u.name AS user_name FROM sales s JOIN users u ON u.id = s.user_id`;
  const params = [];
  if (from && to) {
    query += ' WHERE s.date BETWEEN ? AND ?';
    params.push(from, to);
  }
  query += ' ORDER BY s.created_at DESC';

  const [rows] = await pool.query(query, params);
  return attachItems(rows);
}

export async function createSale({ items, paymentMethod, userId }) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new AppError('Minimal satu produk harus ditambahkan ke transaksi.', 400);
  }
  if (!['tunai', 'qris', 'transfer'].includes(paymentMethod)) {
    throw new AppError('Metode pembayaran tidak valid.', 400);
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    let total = 0;
    const resolvedItems = [];

    for (const rawItem of items) {
      const quantity = Number(rawItem.quantity);
      if (!(Number.isInteger(quantity) && quantity > 0)) {
        throw new AppError('Jumlah penjualan harus berupa angka positif.', 400);
      }

      const [productRows] = await conn.query('SELECT * FROM products WHERE id = ? FOR UPDATE', [rawItem.productId]);
      const product = productRows[0];
      if (!product) {
        throw new AppError('Salah satu produk tidak ditemukan.', 404);
      }
      if (product.status !== 'aktif') {
        throw new AppError(`Produk "${product.name}" sudah tidak aktif.`, 400);
      }
      if (quantity > product.stock) {
        throw new AppError(`Stok tidak mencukupi untuk produk "${product.name}".`, 400);
      }

      const subtotal = quantity * Number(product.price);
      total += subtotal;
      resolvedItems.push({ product, quantity, unitPrice: Number(product.price), subtotal });
    }

    const date = todayIso();
    const transactionNumber = await generateTransactionNumber(conn, date);

    const [saleResult] = await conn.query(
      'INSERT INTO sales (transaction_number, date, total, payment_method, user_id) VALUES (?, ?, ?, ?, ?)',
      [transactionNumber, date, total, paymentMethod, userId],
    );
    const saleId = saleResult.insertId;

    for (const item of resolvedItems) {
      await conn.query(
        'INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)',
        [saleId, item.product.id, item.quantity, item.unitPrice, item.subtotal],
      );

      const stockBefore = item.product.stock;
      const stockAfter = stockBefore - item.quantity;
      await conn.query('UPDATE products SET stock = ? WHERE id = ?', [stockAfter, item.product.id]);
      await conn.query(
        'INSERT INTO stock_movements (product_id, type, quantity, stock_before, stock_after, note, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [item.product.id, 'penjualan', -item.quantity, stockBefore, stockAfter, `Penjualan ${transactionNumber}`, userId],
      );
    }

    await conn.commit();

    const [sales] = await pool.query(
      `SELECT s.*, u.name AS user_name FROM sales s JOIN users u ON u.id = s.user_id WHERE s.id = ?`,
      [saleId],
    );
    const [result] = await attachItems(sales);
    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
