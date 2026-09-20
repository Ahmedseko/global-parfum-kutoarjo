export async function generateTransactionNumber(conn, date) {
  const datePart = date.replace(/-/g, '');
  const [rows] = await conn.query(
    'SELECT COUNT(*) AS count FROM sales WHERE date = ?',
    [date],
  );
  const sequence = String(rows[0].count + 1).padStart(3, '0');
  return `TRX-${datePart}-${sequence}`;
}
