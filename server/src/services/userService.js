import bcrypt from 'bcryptjs';
import { pool } from '../db/pool.js';
import { AppError } from '../utils/AppError.js';

function mapUser(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    isActive: !!row.is_active,
  };
}

export async function listUsers() {
  const [rows] = await pool.query('SELECT id, name, email, role, is_active FROM users ORDER BY name ASC');
  return rows.map(mapUser);
}

export async function createUser({ name, email, password, role }) {
  if (!name?.trim() || !email?.trim()) {
    throw new AppError('Nama dan email wajib diisi.', 400);
  }
  if (!password || password.length < 6) {
    throw new AppError('Kata sandi minimal 6 karakter.', 400);
  }
  if (!['admin', 'staff'].includes(role)) {
    throw new AppError('Peran tidak valid.', 400);
  }

  const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email.trim()]);
  if (existing[0]) {
    throw new AppError('Email sudah digunakan oleh pengguna lain.', 400);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, 1)',
    [name.trim(), email.trim(), passwordHash, role],
  );

  const [rows] = await pool.query('SELECT id, name, email, role, is_active FROM users WHERE id = ?', [result.insertId]);
  return mapUser(rows[0]);
}

export async function updateUser(id, { name, role, isActive }, requesterId) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  const existing = rows[0];
  if (!existing) {
    throw new AppError('Pengguna tidak ditemukan.', 404);
  }

  if (id === requesterId && isActive === false) {
    throw new AppError('Anda tidak dapat menonaktifkan akun Anda sendiri.', 400);
  }

  const next = {
    name: name?.trim() || existing.name,
    role: role ?? existing.role,
    isActive: isActive != null ? isActive : !!existing.is_active,
  };

  if (!['admin', 'staff'].includes(next.role)) {
    throw new AppError('Peran tidak valid.', 400);
  }

  await pool.query('UPDATE users SET name = ?, role = ?, is_active = ? WHERE id = ?', [
    next.name,
    next.role,
    next.isActive ? 1 : 0,
    id,
  ]);

  const [updatedRows] = await pool.query('SELECT id, name, email, role, is_active FROM users WHERE id = ?', [id]);
  return mapUser(updatedRows[0]);
}
