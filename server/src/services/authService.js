import bcrypt from 'bcryptjs';
import { pool } from '../db/pool.js';
import { AppError } from '../utils/AppError.js';

export async function authenticate(email, password) {
  const [rows] = await pool.query(
    'SELECT id, name, email, password_hash, role, is_active FROM users WHERE email = ?',
    [email],
  );
  const user = rows[0];

  if (!user || !user.is_active) {
    throw new AppError('Email atau kata sandi salah.', 401);
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw new AppError('Email atau kata sandi salah.', 401);
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: !!user.is_active,
  };
}
