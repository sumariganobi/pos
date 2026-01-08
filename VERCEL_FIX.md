# 🔧 Fix Vercel CLIENT_FETCH_ERROR

## Error yang Muncul
```
[next-auth][error][CLIENT_FETCH_ERROR]
https://next-auth.js.org/errors#client_fetch_error
```

## Penyebab
1. Environment variables tidak di-set dengan benar
2. `NEXTAUTH_URL` tidak sesuai dengan URL production
3. `NEXTAUTH_SECRET` tidak ada atau terlalu pendek

## Solusi Step-by-Step

### 1. Set Environment Variables di Vercel

**Buka:** Vercel Dashboard → Your Project → Settings → Environment Variables

**Tambahkan 3 variabel ini:**

#### A. DATABASE_URL
```
Dari Vercel Postgres (otomatis jika sudah create database)
Format: postgresql://user:pass@host/db?sslmode=require
```

#### B. NEXTAUTH_URL
```
https://your-app-name.vercel.app
```
⚠️ **PENTING:**
- Harus HTTPS (bukan HTTP)
- Harus sesuai PERSIS dengan URL Vercel Anda
- TANPA trailing slash (/)
- Contoh: `https://pos-system-abc123.vercel.app`

#### C. NEXTAUTH_SECRET
```bash
# Generate dengan salah satu cara:

# Option 1: OpenSSL
openssl rand -base64 32

# Option 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Online
# https://generate-secret.vercel.app/32
```

Hasil contoh: `xK8dP2mN5qR7sT9vW1xY3zA4bC6dE8fG0hI2jK4lM6n=`

### 2. Cara Set Environment Variables

**Di Vercel Dashboard:**

1. Klik project Anda
2. Klik tab **Settings**
3. Klik **Environment Variables** di sidebar
4. Klik **Add New**
5. Masukkan:
   - **Key**: `NEXTAUTH_URL`
   - **Value**: `https://your-app.vercel.app`
   - **Environment**: Pilih semua (Production, Preview, Development)
6. Klik **Save**
7. Ulangi untuk `NEXTAUTH_SECRET`

### 3. Redeploy

Setelah set environment variables:

**Option A: Via Vercel Dashboard**
1. Klik tab **Deployments**
2. Klik titik tiga (...) di deployment terakhir
3. Klik **Redeploy**
4. Tunggu sampai selesai

**Option B: Via Git Push**
```bash
git add .
git commit -m "Fix NextAuth config"
git push
```

### 4. Verify Environment Variables

Cek apakah env vars sudah benar:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Pull env vars
vercel env pull .env.vercel

# Check file .env.vercel
cat .env.vercel
```

Pastikan ada:
- `DATABASE_URL`
- `NEXTAUTH_URL` (sesuai URL production)
- `NEXTAUTH_SECRET` (minimal 32 karakter)

### 5. Test Login

1. Buka URL production: `https://your-app.vercel.app`
2. Akan redirect ke `/login`
3. Login dengan:
   - Email: `admin@pos.com`
   - Password: `admin123`
4. Jika berhasil, akan redirect ke `/dashboard`

## Troubleshooting Lanjutan

### Masih Error Setelah Set Env Vars?

#### 1. Clear Browser Cache
```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

#### 2. Check Vercel Logs
```
Vercel Dashboard → Deployments → Latest → Function Logs
```

Cari error message seperti:
- `NEXTAUTH_URL is not set`
- `NEXTAUTH_SECRET is not set`
- `Database connection failed`

#### 3. Verify NEXTAUTH_URL Format

❌ **SALAH:**
```
http://your-app.vercel.app  (HTTP, bukan HTTPS)
https://your-app.vercel.app/  (Ada trailing slash)
localhost:3000  (Tidak ada protocol)
```

✅ **BENAR:**
```
https://your-app.vercel.app
```

#### 4. Check Database Connection

```bash
# Pull env vars
vercel env pull

# Test database
npx prisma db push

# If error, check DATABASE_URL format
```

#### 5. Regenerate NEXTAUTH_SECRET

Jika secret terlalu pendek atau invalid:

```bash
# Generate baru
openssl rand -base64 32

# Update di Vercel
# Settings → Environment Variables → NEXTAUTH_SECRET → Edit
```

### Error: "Database not found"

**Solusi:**
```bash
# Setup database
vercel env pull
npx prisma db push
npx tsx prisma/seed.ts
```

### Error: "User not found" saat login

**Solusi:**
```bash
# Seed database
npx tsx prisma/seed.ts
```

## Checklist Final

- [ ] `DATABASE_URL` di-set di Vercel
- [ ] `NEXTAUTH_URL` sesuai URL production (HTTPS)
- [ ] `NEXTAUTH_SECRET` minimal 32 karakter
- [ ] Semua env vars di-set untuk Production, Preview, Development
- [ ] Sudah redeploy setelah set env vars
- [ ] Database schema sudah di-push (`npx prisma db push`)
- [ ] Database sudah di-seed (`npx tsx prisma/seed.ts`)
- [ ] Browser cache sudah di-clear
- [ ] Login berhasil dengan admin@pos.com / admin123

## Jika Masih Gagal

1. **Screenshot error message** di browser console
2. **Copy logs** dari Vercel Function Logs
3. **Verify** semua environment variables
4. **Test** di local dulu dengan `npm run dev`

## Quick Fix Commands

```bash
# 1. Pull env vars
vercel env pull

# 2. Setup database
npx prisma db push
npx tsx prisma/seed.ts

# 3. Test local
npm run dev

# 4. If local works, push to GitHub
git add .
git commit -m "Fix Vercel deployment"
git push
```

---

**Setelah semua langkah ini, aplikasi seharusnya sudah berjalan! 🎉**

Jika masih ada masalah, cek Vercel Function Logs untuk error detail.
