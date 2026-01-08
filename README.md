# POS System - Point of Sale Application

Aplikasi POS (Point of Sale) modern berbasis web menggunakan Next.js, Prisma, dan PostgreSQL.

## 🚀 Fitur Utama

- ✅ **Dashboard Analytics** - Statistik penjualan real-time
- ✅ **Kasir/POS Interface** - Interface kasir yang mudah digunakan
- ✅ **Manajemen Produk** - CRUD produk dengan kategori
- ✅ **Manajemen Inventori** - Tracking stok otomatis
- ✅ **Riwayat Transaksi** - Pencatatan transaksi lengkap
- ✅ **Manajemen Pelanggan** - Database pelanggan
- ✅ **Laporan Penjualan** - Laporan harian, mingguan, bulanan
- ✅ **Multi-user & Role** - Admin, Manager, Kasir
- ✅ **Authentication** - Login dengan NextAuth.js

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Database**: PostgreSQL (Vercel Postgres)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 📦 Instalasi

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd pos-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database

Buat database PostgreSQL di Vercel atau lokal, kemudian update file `.env`:

```env
DATABASE_URL="postgresql://user:password@host:5432/database"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-key"
```

### 4. Generate Prisma Client & Push Schema

```bash
npm run prisma:generate
npm run prisma:push
```

### 5. Seed Database (Optional)

```bash
npm run prisma:seed
```

### Detail Database
```bash
npm run prisma:studio
```

Ini akan membuat:
- Admin user: `admin@pos.com` / `admin123`
- Sample products (10 items)
- Sample categories (Makanan, Minuman, Snack)

### 6. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## 🚀 Deploy ke Vercel

### 1. Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo>
git push -u origin main
```

### 2. Deploy di Vercel

1. Buka [vercel.com](https://vercel.com)
2. Import repository GitHub Anda
3. Tambahkan Environment Variables:
   - `DATABASE_URL` - dari Vercel Postgres
   - `NEXTAUTH_URL` - URL production Anda
   - `NEXTAUTH_SECRET` - random string

### 3. Setup Vercel Postgres

1. Di dashboard Vercel, pilih project Anda
2. Klik tab "Storage"
3. Create "Postgres Database"
4. Copy `DATABASE_URL` ke Environment Variables
5. Redeploy project

### 4. Run Prisma Commands di Vercel

Setelah deploy, jalankan di terminal lokal:

```bash
# Set DATABASE_URL dari Vercel
export DATABASE_URL="your-vercel-postgres-url"

# Push schema
npx prisma db push

# Seed database
npx prisma db seed
```

## 📱 Cara Penggunaan

### Login
- Email: `admin@pos.com`
- Password: `admin123`

### Menu Utama

1. **Dashboard** - Lihat statistik penjualan hari ini
2. **Kasir** - Interface untuk transaksi penjualan
3. **Produk** - Tambah, edit, hapus produk
4. **Transaksi** - Riwayat semua transaksi
5. **Pelanggan** - Database pelanggan
6. **Laporan** - Analisis penjualan

### Workflow Kasir

1. Klik menu "Kasir"
2. Cari produk atau klik produk untuk menambah ke keranjang
3. Atur jumlah di keranjang
4. Masukkan jumlah pembayaran
5. Klik "Bayar" untuk menyelesaikan transaksi

## 🗂️ Struktur Project

```
pos-app/
├── app/
│   ├── api/              # API Routes
│   │   ├── auth/         # NextAuth
│   │   ├── products/     # Product API
│   │   ├── transactions/ # Transaction API
│   │   ├── customers/    # Customer API
│   │   └── reports/      # Reports API
│   ├── dashboard/        # Dashboard pages
│   │   ├── pos/          # POS interface
│   │   ├── products/     # Product management
│   │   ├── transactions/ # Transaction history
│   │   ├── customers/    # Customer management
│   │   └── reports/      # Sales reports
│   ├── login/            # Login page
│   └── layout.tsx        # Root layout
├── components/           # React components
│   └── Sidebar.tsx       # Navigation sidebar
├── lib/
│   ├── prisma.ts         # Prisma client
│   └── auth.ts           # NextAuth config
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed script
└── types/                # TypeScript types
```

## 🔐 User Roles

- **ADMIN** - Full access
- **MANAGER** - View reports, manage products
- **CASHIER** - POS only

## 📊 Database Schema

### Models:
- **User** - User accounts
- **Product** - Product catalog
- **Category** - Product categories
- **Customer** - Customer database
- **Transaction** - Sales transactions
- **TransactionItem** - Transaction line items

## 🔧 Development

### Prisma Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Open Prisma Studio
npx prisma studio

# Create migration
npx prisma migrate dev --name init
```

### Build for Production

```bash
npm run build
npm start
```

## 📝 Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="random-secret-key"

# App
NEXT_PUBLIC_APP_NAME="POS System"
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License

## 👨‍💻 Author

Dibuat dengan ❤️ menggunakan Next.js dan Prisma

---

**Happy Coding! 🚀**
