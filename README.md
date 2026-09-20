# Global Parfum Kutoarjo

Sistem Informasi Manajemen Penjualan dan Stok UMKM Parfum — aplikasi web sederhana untuk mengelola produk, stok, penjualan, closing harian, dan laporan toko parfum.

## Struktur Proyek

```
client/     React + Vite + TypeScript + Tailwind CSS (frontend)
server/     Node.js + Express (REST API)
database/   schema.sql & seed.sql (MySQL)
```

## Menjalankan Secara Lokal

### 1. Database

Buat database MySQL lalu jalankan skema dan data contoh:

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

### 2. Server (API)

```bash
cd server
cp .env.example .env   # sesuaikan kredensial database
npm install
npm run dev             # http://localhost:4000
```

### 3. Client (Frontend)

```bash
cd client
npm install
npm run dev              # http://localhost:5173 (proxy /api -> :4000)
```

## Akun Demo

| Peran | Email | Password |
|---|---|---|
| Owner/Admin | admin@globalparfum.id | admin123 |
| Staff | staff@globalparfum.id | staff123 |

## Alur Utama

Login → Dashboard → Produk → Stok → Penjualan → Closing Harian → Laporan

## Catatan Peran

- **Owner/Admin**: akses penuh (produk, stok, penjualan, closing, laporan, pengaturan).
- **Staff**: melihat produk, input stok masuk, mencatat penjualan, closing harian. Tidak memiliki akses ke Laporan dan Pengaturan.
