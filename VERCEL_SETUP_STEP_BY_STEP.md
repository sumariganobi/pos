# 🚀 Setup Vercel - Step by Step

## Error yang Anda Alami
```json
{"message":"There is a problem with the server configuration. Check the server logs for more information."}
```

**Penyebab:** Environment variables belum di-set dengan benar di Vercel.

---

## Solusi: Ikuti Langkah Ini PERSIS

### Step 1: Generate NEXTAUTH_SECRET

Jalankan di terminal lokal:

```bash
node pos-app/scripts/generate-secret.js
```

Atau gunakan command ini:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Copy hasilnya!** Contoh: `xK8dP2mN5qR7sT9vW1xY3zA4bC6dE8fG0hI2jK4lM6n=`

---

### Step 2: Set Environment Variables di Vercel

#### A. Buka Vercel Dashboard

1. Buka https://vercel.com
2. Login
3. Klik project **pos-apps-wine**
4. Klik tab **Settings**
5. Klik **Environment Variables** di sidebar kiri

#### B. Tambah NEXTAUTH_URL

1. Klik tombol **Add New**
2. Isi:
   - **Key**: `NEXTAUTH_URL`
   - **Value**: `https://pos-apps-wine.vercel.app`
   - **Environments**: Centang semua (Production, Preview, Development)
3. Klik **Save**

#### C. Tambah NEXTAUTH_SECRET

1. Klik tombol **Add New** lagi
2. Isi:
   - **Key**: `NEXTAUTH_SECRET`
   - **Value**: (paste hasil dari Step 1)
   - **Environments**: Centang semua (Production, Preview, Development)
3. Klik **Save**

#### D. Cek DATABASE_URL

1. Pastikan sudah ada `DATABASE_URL` (dari Vercel Postgres)
2. Jika belum ada:
   - Klik tab **Storage**
   - Klik **Create Database**
   - Pilih **Postgres**
   - Klik **Create**

---

### Step 3: Redeploy

#### Option A: Via Vercel Dashboard

1. Klik tab **Deployments**
2. Klik titik tiga (...) di deployment paling atas
3. Klik **Redeploy**
4. Tunggu sampai status jadi "Ready"

#### Option B: Via Git Push

```bash
git add .
git commit -m "Update config" --allow-empty
git push
```

---

### Step 4: Setup Database

Setelah deployment selesai, jalankan di terminal lokal:

```bash
# Install Vercel CLI (jika belum)
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Pull environment variables
vercel env pull .env.local

# Push database schema
npx prisma db push

# Seed database dengan data awal
npx tsx prisma/seed.ts
```

**Output yang diharapkan:**
```
✅ Admin user created: admin@pos.com
✅ Categories created
✅ Sample products created
✅ Sample customer created
🎉 Seeding completed!
```

---

### Step 5: Test Aplikasi

1. **Buka:** https://pos-apps-wine.vercel.app
2. **Akan redirect ke:** https://pos-apps-wine.vercel.app/login
3. **Login dengan:**
   - Email: `admin@pos.com`
   - Password: `admin123`
4. **Seharusnya redirect ke:** https://pos-apps-wine.vercel.app/dashboard

---

## Troubleshooting

### Masih Error Setelah Redeploy?

#### 1. Verify Environment Variables

Buka: Vercel Dashboard → Settings → Environment Variables

**Pastikan ada 3 variabel ini:**

| Key | Value | Environments |
|-----|-------|--------------|
| `DATABASE_URL` | `postgresql://...` | ✅ All |
| `NEXTAUTH_URL` | `https://pos-apps-wine.vercel.app` | ✅ All |
| `NEXTAUTH_SECRET` | `(32+ karakter)` | ✅ All |

#### 2. Check Vercel Logs

1. Vercel Dashboard → Deployments
2. Klik deployment terakhir
3. Klik tab **Functions**
4. Lihat error di logs

**Common errors:**
- `NEXTAUTH_SECRET is not set` → Ulangi Step 2C
- `Database connection failed` → Ulangi Step 4
- `User not found` → Jalankan `npx tsx prisma/seed.ts`

#### 3. Clear Browser Cache

```
Ctrl + Shift + Delete (Windows/Linux)
Cmd + Shift + Delete (Mac)
```

Atau buka di Incognito/Private mode.

#### 4. Test Health Check

Buka: https://pos-apps-wine.vercel.app/api/health

**Expected response:**
```json
{
  "status": "ok",
  "environment": {
    "NEXTAUTH_URL": true,
    "NEXTAUTH_SECRET": true,
    "DATABASE_URL": true
  },
  "database": {
    "connected": true,
    "userCount": 1
  }
}
```

Jika ada yang `false`, berarti env var belum di-set.

---

## Checklist

Pastikan semua ini sudah dilakukan:

- [ ] Generate NEXTAUTH_SECRET (Step 1)
- [ ] Set NEXTAUTH_URL di Vercel (Step 2B)
- [ ] Set NEXTAUTH_SECRET di Vercel (Step 2C)
- [ ] DATABASE_URL ada di Vercel (Step 2D)
- [ ] Redeploy aplikasi (Step 3)
- [ ] Push database schema (Step 4)
- [ ] Seed database (Step 4)
- [ ] Test login (Step 5)

---

## Jika Masih Gagal

**Screenshot dan kirim:**
1. Vercel Environment Variables page
2. Vercel Function Logs
3. Browser console error
4. Response dari `/api/health`

---

## Quick Commands

```bash
# Generate secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Setup database
vercel env pull .env.local
npx prisma db push
npx tsx prisma/seed.ts

# Test local
npm run dev
```

---

**Setelah semua langkah ini, aplikasi PASTI jalan! 🎉**

Jika masih ada masalah, kemungkinan besar ada typo di environment variables.
