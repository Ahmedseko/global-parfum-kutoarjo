USE global_parfum_kutoarjo;

-- ==========================================================
-- USERS
-- Password default: admin123 (Owner/Admin), staff123 (Staff)
-- ==========================================================
INSERT INTO users (name, email, password_hash, role, is_active) VALUES
  ('Siti Aminah', 'admin@globalparfum.id', '$2b$10$6F8Op8lc3jk9aI4RNkYrO.hEet6s4mpFU5eO7ZRrb4LjAS.XK4rXS', 'admin', 1),
  ('Budi Santoso', 'staff@globalparfum.id', '$2b$10$i9OeiW5o7Wsm/PZZvaxaruwqTC6xggebagpDdLonRmvwFrH8lqc0a', 'staff', 1);

-- ==========================================================
-- SETTINGS
-- ==========================================================
INSERT INTO settings (store_name, owner_name, address, phone, currency, default_low_stock_threshold) VALUES
  ('Global Parfum Kutoarjo', 'Siti Aminah', 'Jl. Diponegoro No. 45, Kutoarjo, Purworejo', '0812-3456-7890', 'IDR', 5);

-- ==========================================================
-- PRODUCTS
-- ==========================================================
INSERT INTO products (name, category, size, price, stock, low_stock_threshold, status) VALUES
  ('Sauvage Inspired', 'Parfum Refill', '30 ml', 85000, 24, 5, 'aktif'),
  ('Sauvage Inspired', 'Parfum Refill', '50 ml', 130000, 16, 5, 'aktif'),
  ('Baccarat Rouge Inspired', 'Parfum Refill', '30 ml', 95000, 18, 5, 'aktif'),
  ('Black Opium Inspired', 'Parfum Refill', '30 ml', 90000, 4, 5, 'aktif'),
  ('Vanilla Musk', 'Parfum Botol', '50 ml', 135000, 12, 5, 'aktif'),
  ('Ocean Blue', 'Parfum Botol', '30 ml', 80000, 20, 5, 'aktif'),
  ('Blue Seduction', 'Parfum Botol', '50 ml', 110000, 3, 5, 'aktif'),
  ('Floral Dream', 'Parfum Botol', '30 ml', 78000, 15, 5, 'aktif'),
  ('Bibit Sauvage', 'Bibit Parfum', '100 ml', 250000, 8, 3, 'aktif'),
  ('Bibit Vanilla Musk', 'Bibit Parfum', '100 ml', 230000, 6, 3, 'aktif'),
  ('Botol Spray 30 ml', 'Produk Pendukung', '30 ml', 5000, 60, 10, 'aktif'),
  ('Botol Spray 50 ml', 'Produk Pendukung', '50 ml', 7000, 40, 10, 'aktif');

-- ==========================================================
-- STOCK MOVEMENTS (initial stock-in, recorded by admin)
-- ==========================================================
INSERT INTO stock_movements (product_id, type, quantity, stock_before, stock_after, note, user_id, created_at) VALUES
  (1, 'masuk', 24, 0, 24, 'Stok awal', 1, NOW() - INTERVAL 20 DAY),
  (2, 'masuk', 16, 0, 16, 'Stok awal', 1, NOW() - INTERVAL 20 DAY),
  (3, 'masuk', 18, 0, 18, 'Stok awal', 1, NOW() - INTERVAL 20 DAY),
  (4, 'masuk', 10, 0, 10, 'Stok awal', 1, NOW() - INTERVAL 20 DAY),
  (5, 'masuk', 12, 0, 12, 'Stok awal', 1, NOW() - INTERVAL 18 DAY),
  (6, 'masuk', 20, 0, 20, 'Stok awal', 1, NOW() - INTERVAL 18 DAY),
  (7, 'masuk', 8, 0, 8, 'Stok awal', 1, NOW() - INTERVAL 18 DAY),
  (8, 'masuk', 15, 0, 15, 'Stok awal', 1, NOW() - INTERVAL 18 DAY),
  (9, 'masuk', 8, 0, 8, 'Stok awal', 1, NOW() - INTERVAL 15 DAY),
  (10, 'masuk', 6, 0, 6, 'Stok awal', 1, NOW() - INTERVAL 15 DAY),
  (11, 'masuk', 60, 0, 60, 'Stok awal', 1, NOW() - INTERVAL 15 DAY),
  (12, 'masuk', 40, 0, 40, 'Stok awal', 1, NOW() - INTERVAL 15 DAY),
  (4, 'penyesuaian', -6, 10, 4, 'Penyesuaian setelah audit stok', 1, NOW() - INTERVAL 3 DAY),
  (7, 'penyesuaian', -5, 8, 3, 'Penyesuaian setelah audit stok', 1, NOW() - INTERVAL 3 DAY);

-- ==========================================================
-- SAMPLE SALES (last few days, for dashboard/report demo)
-- ==========================================================
INSERT INTO sales (transaction_number, date, total, payment_method, user_id, created_at) VALUES
  ('TRX-20260918-001', CURDATE() - INTERVAL 2 DAY, 255000, 'tunai', 2, NOW() - INTERVAL 2 DAY),
  ('TRX-20260919-001', CURDATE() - INTERVAL 1 DAY, 175000, 'qris', 2, NOW() - INTERVAL 1 DAY),
  ('TRX-20260919-002', CURDATE() - INTERVAL 1 DAY, 90000, 'tunai', 1, NOW() - INTERVAL 1 DAY);

INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, subtotal) VALUES
  (1, 1, 2, 85000, 170000),
  (1, 6, 1, 80000, 80000),
  (2, 5, 1, 135000, 135000),
  (2, 11, 8, 5000, 40000),
  (3, 4, 1, 90000, 90000);
