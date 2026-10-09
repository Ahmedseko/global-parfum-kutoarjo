-- Migrasi untuk database yang SUDAH berjalan (instalasi baru sudah termasuk di schema.sql).
-- Menambah diskon, catatan pembeli, uang diterima, dan status/pembatalan transaksi.
-- Jalankan sekali: mysql -uUSER -p global_parfum_kutoarjo < database/migrations/002_sales_upgrade.sql
USE global_parfum_kutoarjo;

ALTER TABLE sales
  ADD COLUMN discount DECIMAL(12, 2) NOT NULL DEFAULT 0 AFTER total,
  ADD COLUMN customer_note VARCHAR(255) NULL AFTER payment_method,
  ADD COLUMN amount_paid DECIMAL(12, 2) NULL AFTER customer_note,
  ADD COLUMN status ENUM('selesai', 'batal') NOT NULL DEFAULT 'selesai' AFTER amount_paid,
  ADD COLUMN cancel_reason VARCHAR(255) NULL AFTER status,
  ADD COLUMN cancelled_at TIMESTAMP NULL AFTER cancel_reason,
  ADD COLUMN cancelled_by INT UNSIGNED NULL AFTER cancelled_at,
  ADD CONSTRAINT fk_sales_cancelled_by FOREIGN KEY (cancelled_by) REFERENCES users (id);
