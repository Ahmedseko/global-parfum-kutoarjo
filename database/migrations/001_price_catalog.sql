-- Migrasi untuk database yang SUDAH berjalan (instalasi baru sudah termasuk di schema.sql).
-- Jalankan sekali: mysql -uroot -p global_parfum_kutoarjo < database/migrations/001_price_catalog.sql
USE global_parfum_kutoarjo;

CREATE TABLE IF NOT EXISTS price_catalog (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL UNIQUE,
  category VARCHAR(100) NOT NULL,
  size VARCHAR(20) NOT NULL,
  unit ENUM('botol', 'ml') NOT NULL DEFAULT 'botol',
  price DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT chk_catalog_price CHECK (price > 0)
) ENGINE=InnoDB;

ALTER TABLE products
  ADD COLUMN catalog_id INT UNSIGNED NULL AFTER id,
  ADD CONSTRAINT fk_products_catalog FOREIGN KEY (catalog_id) REFERENCES price_catalog (id) ON DELETE SET NULL;
