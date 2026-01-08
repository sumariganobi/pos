# 🇮🇩 Panduan Singkat - Aplikasi POS

## 🎯 Apa Ini?

Aplikasi **Point of Sale (POS)** lengkap untuk toko/bisnis Anda. Gratis, open-source, dan siap pakai!

---

## ⚡ Mulai Cepat (5 Menit)

### 1️⃣ Install Dependencies
```bash
cd pos-app
npm install
```

### 2️⃣ Setup Database
```bash
# Copy file environment
cp .env.example .env

# Edit .env, isi DATABASE_URL dengan PostgreSQL Anda
# Contoh: postgresql://user:password@localhost:5432/pos_db
```

### 3️⃣ Setup Database Schema
```bash
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
```

### 4️⃣ Jalankan Aplikasi
```bash
npm run dev
```

### 5️⃣ Buka Browser
- URL: http://localhost:3000
- Email: **admin@pos.com**
- Password: **admin123**

---

## 🎨 Fitur Utama

### 📊 Dashboard
Lihat statistik penjualan hari ini, total transaksi, dan produk yang stoknya menipis.

### 🛒 Kasir (POS)
- Cari produk
- Tambah ke keranjang
- Hitung otomatis pajak 10%
- Hitung kembalian
- Print struk

### 📦 Produk
- Tambah produk baru
- Lihat semua produk
- Tracking stok
- Kategori produk

### 💳 Transaksi
- Riwayat lengkap
- Detail transaksi
- Invoice number

### 👥 Pelanggan
- Database pelanggan
- Riwayat pembelian

### 📈 Laporan
- Penjualan harian/mingguan/bulanan
- Produk terlaris
- Total revenue

---

## 🚀 Deploy ke Internet (Gratis!)

### 1️⃣ Push ke GitHub
```bash
git init
git add .
git commit -m "Aplikasi POS saya"
git remote add origin https://github.com/username/pos-app.git
git push -u origin main
```

### 2️⃣ Deploy di Vercel
1. Buka https://vercel.com
2. Login dengan GitHub
3. Import repository `pos-app`
4. Klik Deploy

### 3️⃣ Setup Database di Vercel
1. Di dashboard Vercel, klik tab **Storage**
2. Klik **Create Database** → Pilih **Postgres**
3. Database otomatis terhubung

### 4️⃣ Tambah Environment Variables
Di Vercel Settings → Environment Variables:
```
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=random-secret-key-disini
```

### 5️⃣ Setup Database Schema
```bash
# Install Vercel CLI
npm i -g vercel

# Login & link project
vercel login
vercel link

# Pull environment
vercel env pull

# Push schema & seed
npx prisma db push
npx tsx prisma/seed.ts
```

### 6️⃣ Selesai! 🎉
Aplikasi Anda sudah online di: `https://your-app.vercel.app`

---

## 📱 Cara Pakai

### Kasir (POS)
1. Klik menu **"Kasir"**
2. Cari atau klik produk untuk tambah ke keranjang
3. Atur jumlah dengan tombol **+** / **-**
4. Masukkan jumlah uang yang dibayar
5. Klik **"Bayar"**
6. Selesai! Stok otomatis berkurang

### Tambah Produk
1. Klik menu **"Produk"**
2. Klik **"Tambah Produk"**
3. Isi form:
   - Nama produk
   - SKU (kode unik)
   - Harga
   - Stok
4. Klik **"Simpan"**

### Lihat Laporan
1. Klik menu **"Laporan"**
2. Pilih periode (Hari ini / Minggu ini / Bulan ini)
3. Lihat statistik penjualan

---

## 🔐 Keamanan

### Ganti Password Default
**PENTING!** Setelah deploy, segera ganti password default:

1. Buka database (Prisma Studio):
   ```bash
   npx prisma studio
   ```
2. Buka tabel **User**
3. Generate password baru:
   ```bash
   node -e "console.log(require('bcryptjs').hashSync('password-baru', 10))"
   ```
4. Update field `password` dengan hash baru

---

## 📚 Dokumentasi Lengkap

Untuk panduan lebih detail, baca:

- **[START_HERE.md](./START_HERE.md)** - Panduan awal
- **[QUICKSTART.md](./QUICKSTART.md)** - Quick start
- **[README.md](./README.md)** - Dokumentasi lengkap
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Panduan deploy
- **[FEATURES.md](./FEATURES.md)** - Daftar fitur

---

## ❓ Troubleshooting

### Error: Cannot find module
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: Database connection failed
- Cek file `.env`
- Pastikan `DATABASE_URL` benar
- Pastikan PostgreSQL running

### Error: Prisma Client not generated
```bash
npx prisma generate
```

### Port 3000 sudah dipakai
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

---

## 💡 Tips

### Backup Database
```bash
# Export data
pg_dump -U user -d pos_db > backup.sql

# Import data
psql -U user -d pos_db < backup.sql
```

### Update Aplikasi
```bash
git pull
npm install
npx prisma generate
npm run dev
```

### Lihat Database
```bash
npx prisma studio
```
Buka http://localhost:5555

---

## 🎯 Fitur Lengkap

✅ Login & Authentication
✅ Dashboard dengan statistik
✅ Kasir/POS interface
✅ Manajemen produk
✅ Tracking stok otomatis
✅ Riwayat transaksi
✅ Database pelanggan
✅ Laporan penjualan
✅ Print struk
✅ Multi-user (Admin, Manager, Kasir)
✅ Responsive (mobile, tablet, desktop)
✅ Real-time updates
✅ Dan masih banyak lagi!

---

## 🆓 Gratis & Open Source

- ✅ 100% Gratis
- ✅ Open source (MIT License)
- ✅ Boleh dimodifikasi
- ✅ Boleh untuk komersial
- ✅ Tidak ada biaya tersembunyi

---

## 🎓 Cocok Untuk

- Toko retail
- Warung/minimarket
- Restoran & cafe
- Apotek
- Toko buku
- Toko pakaian
- Dan bisnis lainnya

---

## 📞 Butuh Bantuan?

1. Baca dokumentasi lengkap
2. Cek troubleshooting section
3. Lihat error di console browser
4. Search di Google

---

## 🎉 Selamat!

Aplikasi POS Anda sudah siap digunakan!

**Mulai jualan sekarang! 💰**

---

**Dibuat dengan ❤️ di Indonesia**
**Menggunakan Next.js & Prisma**

**Versi**: 1.0.0
**Terakhir Update**: 8 Januari 2026
