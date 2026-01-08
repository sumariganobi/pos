# 🚀 Quick Start Guide

## Setup Lokal (5 Menit)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
# Copy .env.example ke .env
cp .env.example .env
```

Edit `.env` dan isi dengan database PostgreSQL Anda:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/pos_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

### 3. Setup Database
```bash
# Generate Prisma Client
npx prisma generate

# Push schema ke database
npx prisma db push

# Seed data sample
npx tsx prisma/seed.ts
```

### 4. Run Development
```bash
npm run dev
```

Buka http://localhost:3000

### 5. Login
- Email: `admin@pos.com`
- Password: `admin123`

---

## Deploy ke Vercel (10 Menit)

### 1. Push ke GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/pos-app.git
git push -u origin main
```

### 2. Deploy di Vercel
1. Buka https://vercel.com
2. Import repository
3. Deploy

### 3. Setup Database
1. Di Vercel Dashboard > Storage
2. Create Postgres Database
3. Database URL otomatis terhubung

### 4. Add Environment Variables
```env
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=random-secret-key
```

### 5. Setup Schema
```bash
# Pull env dari Vercel
vercel env pull

# Push schema
npx prisma db push

# Seed database
npx tsx prisma/seed.ts
```

### 6. Done! 🎉
Buka https://your-app.vercel.app

---

## Fitur Utama

### 📊 Dashboard
- Statistik penjualan hari ini
- Total transaksi
- Produk terlaris
- Alert stok menipis

### 🛒 Kasir (POS)
- Scan/cari produk
- Keranjang belanja
- Hitung otomatis pajak
- Hitung kembalian
- Print struk

### 📦 Manajemen Produk
- Tambah/edit/hapus produk
- Kategori produk
- Tracking stok
- Alert stok minimum

### 💳 Transaksi
- Riwayat lengkap
- Filter by date
- Detail transaksi
- Export data

### 👥 Pelanggan
- Database pelanggan
- Riwayat pembelian
- Total spending

### 📈 Laporan
- Penjualan harian/mingguan/bulanan
- Produk terlaris
- Revenue analysis

---

## Default Data (Setelah Seed)

### User
- Email: `admin@pos.com`
- Password: `admin123`
- Role: ADMIN

### Produk (10 items)
- Makanan: Nasi Goreng, Mie Goreng, Ayam Bakar, Sate Ayam
- Minuman: Teh Manis, Kopi, Jus Jeruk, Es Teh
- Snack: Keripik, Coklat

### Kategori
- Makanan
- Minuman
- Snack

---

## Troubleshooting

### Database Connection Error
```bash
# Check DATABASE_URL di .env
# Pastikan PostgreSQL running
# Test connection:
npx prisma db push
```

### Prisma Client Error
```bash
# Regenerate client
npx prisma generate
```

### Build Error
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run dev
```

---

## Next Steps

1. ✅ Ganti password default
2. ✅ Tambah produk Anda
3. ✅ Setup kategori
4. ✅ Mulai transaksi
5. ✅ Monitor laporan

---

**Happy Selling! 💰**
