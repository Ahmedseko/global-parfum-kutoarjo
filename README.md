# Global Parfum Kutoarjo

Sistem Informasi Manajemen Penjualan dan Stok UMKM Parfum — aplikasi web sederhana untuk mengelola produk, stok, penjualan, closing harian, dan laporan toko parfum.

## Struktur Proyek

```
client/     React + Vite + TypeScript + Tailwind CSS (frontend)
server/     Node.js + Express (REST API)
database/   schema.sql & seed.sql (MySQL)
```

## Prasyarat

Pastikan sudah terpasang di komputer:

- [Node.js](https://nodejs.org) versi 20 ke atas (cek dengan `node --version`)
- MySQL — pilih salah satu:
  - **Docker** (paling gampang, tidak perlu install MySQL manual) — lihat [Opsi A](#opsi-a-pakai-docker-direkomendasikan)
  - **MySQL Server** yang sudah terpasang & menyala di komputer — lihat [Opsi B](#opsi-b-pakai-mysql-yang-sudah-terpasang)

Clone dulu repo ini kalau belum:

```bash
git clone https://github.com/Ahmedseko/global-parfum-kutoarjo.git
cd global-parfum-kutoarjo
```

## Menjalankan Secara Lokal

Butuh **3 terminal terpisah**: satu untuk database (kalau pakai Docker), satu untuk server, satu untuk client. Semua tetap harus menyala bersamaan selagi aplikasi dipakai.

### 1. Siapkan Database

#### Opsi A: Pakai Docker (direkomendasikan)

```bash
docker run -d --name gpk-mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 mysql:8.0
```

Tunggu ±10–15 detik sampai MySQL siap menerima koneksi, lalu isi skema & data contoh:

```bash
mysql -h 127.0.0.1 -u root -proot < database/schema.sql
mysql -h 127.0.0.1 -u root -proot < database/seed.sql
```

> Kalau nanti mau mengulang dari awal (reset data), tinggal hapus containernya lalu ulangi langkah di atas:
> `docker rm -f gpk-mysql`

#### Opsi B: Pakai MySQL yang Sudah Terpasang

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

### 2. Jalankan Server (API)

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Server jalan di `http://localhost:4000`. Kalau ikut Opsi A (Docker) di atas, isi `.env` default (`root` / `root` / `localhost`) sudah pas, tidak perlu diubah. Kalau pakai Opsi B, sesuaikan `DB_USER`/`DB_PASSWORD` di `.env` dengan kredensial MySQL kamu.

### 3. Jalankan Client (Frontend)

Buka terminal baru (biarkan server tetap jalan):

```bash
cd client
npm install
npm run dev
```

Client jalan di `http://localhost:5173` dan otomatis mem-proxy request `/api` ke server di port 4000.

### 4. Buka Aplikasinya

Buka `http://localhost:5173` di browser, lalu login pakai salah satu akun demo di bawah.

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

## Troubleshooting

| Masalah | Solusi |
| --- | --- |
| Server error `ECONNREFUSED` ke database | Pastikan MySQL sudah menyala (`docker ps` kalau pakai Docker) dan `.env` di folder `server/` sudah benar. |
| `Error: listen EADDRINUSE` saat `npm run dev` | Port 4000 atau 5173 sudah dipakai proses lain. Tutup proses lama, atau ubah `PORT` di `server/.env`. |
| Halaman login gagal terus / "Email atau kata sandi salah" | Pastikan `database/seed.sql` sudah dijalankan — akun demo ada di sana. |
| Perubahan kode tidak muncul di browser | Pastikan `npm run dev` di folder `client/` masih berjalan (bukan `npm run build`). |
