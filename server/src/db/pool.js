import mysql from 'mysql2/promise';
import 'dotenv/config';

export const pool = mysql.createPool({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'global_parfum_kutoarjo',
  waitForConnections: true,
  connectionLimit: 10,
  // DATE columns have no time-of-day component; returning them as plain
  // strings avoids local-midnight Date objects shifting by a day when
  // later formatted with toISOString() in a non-UTC server timezone.
  dateStrings: ['DATE'],
});
