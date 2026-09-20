USE global_parfum_kutoarjo;

-- ==========================================================
-- USERS
-- Akun login awal. Password default: admin123 (Owner/Admin), staff123 (Staff)
-- Tanpa ini tidak ada cara untuk masuk ke aplikasi (tidak ada pendaftaran akun).
-- ==========================================================
INSERT INTO users (name, email, password_hash, role, is_active) VALUES
  ('Siti Aminah', 'admin@globalparfum.id', '$2b$10$6F8Op8lc3jk9aI4RNkYrO.hEet6s4mpFU5eO7ZRrb4LjAS.XK4rXS', 'admin', 1),
  ('Budi Santoso', 'staff@globalparfum.id', '$2b$10$i9OeiW5o7Wsm/PZZvaxaruwqTC6xggebagpDdLonRmvwFrH8lqc0a', 'staff', 1);

-- ==========================================================
-- SETTINGS
-- Baris tunggal wajib ada agar halaman Pengaturan punya data awal.
-- ==========================================================
INSERT INTO settings (store_name, owner_name, address, phone, currency, default_low_stock_threshold) VALUES
  ('Global Parfum Kutoarjo', 'Siti Aminah', 'Jl. Diponegoro No. 45, Kutoarjo, Purworejo', '0812-3456-7890', 'IDR', 5);

-- Tidak ada data produk/stok/penjualan contoh — silakan input sendiri lewat
-- aplikasi (menu Produk, Stok, Penjualan) setelah login.
