import ExcelJS from 'exceljs';
import { pool } from '../db/pool.js';

export async function buildSalesExcel({ from, to }) {
  const [rows] = await pool.query(
    `SELECT s.date, s.transaction_number, p.name AS product_name, p.category, p.size,
            si.quantity, si.unit_price, si.subtotal, s.payment_method
     FROM sale_items si
     JOIN sales s ON s.id = si.sale_id
     JOIN products p ON p.id = si.product_id
     WHERE s.date BETWEEN ? AND ?
     ORDER BY s.date ASC, s.transaction_number ASC`,
    [from, to],
  );

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Laporan Penjualan');

  sheet.columns = [
    { header: 'Tanggal', key: 'date', width: 14 },
    { header: 'Nomor Transaksi', key: 'transactionNumber', width: 20 },
    { header: 'Produk', key: 'product', width: 28 },
    { header: 'Kategori', key: 'category', width: 18 },
    { header: 'Ukuran', key: 'size', width: 10 },
    { header: 'Jumlah', key: 'quantity', width: 10 },
    { header: 'Harga', key: 'price', width: 14 },
    { header: 'Subtotal', key: 'subtotal', width: 16 },
    { header: 'Metode Pembayaran', key: 'paymentMethod', width: 18 },
  ];
  sheet.getRow(1).font = { bold: true };

  for (const row of rows) {
    sheet.addRow({
      date: row.date,
      transactionNumber: row.transaction_number,
      product: row.product_name,
      category: row.category,
      size: row.size,
      quantity: row.quantity,
      price: Number(row.unit_price),
      subtotal: Number(row.subtotal),
      paymentMethod: row.payment_method,
    });
  }

  return workbook.xlsx.writeBuffer();
}
