# 🚀 Panduan Deployment ke Vercel

## Persiapan

### 1. Setup GitHub Repository

```bash
# Initialize git (jika belum)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: POS System"

# Create repository di GitHub, kemudian:
git remote add origin https://github.com/username/pos-app.git
git branch -M main
git push -u origin main
```

## Deploy ke Vercel

### Step 1: Import Project

1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub
3. Klik "Add New Project"
4. Import repository `pos-app`

### Step 2: Configure Project

**Framework Preset**: Next.js (auto-detected)

**Build Command**: 
```
prisma generate && next build
```

**Install Command**:
```
npm install
```

### Step 3: Setup Vercel Postgres

1. Di Vercel Dashboard, pilih project Anda
2. Klik tab **"Storage"**
3. Klik **"Create Database"**
4. Pilih **"Postgres"**
5. Pilih region terdekat (Singapore untuk Indonesia)
6. Klik **"Create"**

Database akan otomatis terhubung ke project Anda.

### Step 4: Environment Variables

Vercel akan otomatis menambahkan `DATABASE_URL` dari Postgres.

Tambahkan environment variables berikut:

1. Klik tab **"Settings"**
2. Klik **"Environment Variables"**
3. Tambahkan:

```env
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=generate-random-secret-here
NEXT_PUBLIC_APP_NAME=POS System
```

**Generate NEXTAUTH_SECRET**:
```bash
openssl rand -base64 32
```

### Step 5: Deploy

1. Klik **"Deploy"**
2. Tunggu proses build selesai (2-3 menit)

### Step 6: Setup Database Schema

Setelah deploy berhasil, setup database:

#### Option A: Via Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Pull environment variables
vercel env pull .env.local

# Push Prisma schema
npx prisma db push

# Seed database
npx prisma db seed
```

#### Option B: Via Local Terminal

```bash
# Copy DATABASE_URL dari Vercel Dashboard
# Settings > Environment Variables > DATABASE_URL

# Set environment variable
export DATABASE_URL="postgres://..."

# Push schema
npx prisma db push

# Seed database
npx tsx prisma/seed.ts
```

### Step 7: Verify Deployment

1. Buka URL production: `https://your-app.vercel.app`
2. Login dengan:
   - Email: `admin@pos.com`
   - Password: `admin123`

## Update & Redeploy

Setiap kali push ke GitHub, Vercel akan otomatis redeploy:

```bash
git add .
git commit -m "Update feature"
git push
```

## Troubleshooting

### Error: Prisma Client not generated

**Solution**: Pastikan build command sudah benar:
```
prisma generate && next build
```

### Error: Database connection failed

**Solution**: 
1. Check DATABASE_URL di Environment Variables
2. Pastikan Vercel Postgres sudah dibuat
3. Redeploy project

### Error: NextAuth configuration error

**Solution**:
1. Pastikan NEXTAUTH_URL sesuai dengan production URL
2. Generate NEXTAUTH_SECRET baru
3. Redeploy

### Error: Module not found

**Solution**:
```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install
git add .
git commit -m "Fix dependencies"
git push
```

## Custom Domain (Optional)

1. Di Vercel Dashboard, klik tab **"Settings"**
2. Klik **"Domains"**
3. Tambahkan domain Anda
4. Update DNS records sesuai instruksi
5. Update `NEXTAUTH_URL` dengan domain baru

## Monitoring

### View Logs
1. Vercel Dashboard > Project
2. Tab **"Deployments"**
3. Klik deployment terakhir
4. Lihat **"Build Logs"** atau **"Function Logs"**

### Database Management

```bash
# Open Prisma Studio (local)
npx prisma studio

# View database via Vercel
# Dashboard > Storage > Postgres > Data
```

## Production Checklist

- [ ] GitHub repository created
- [ ] Vercel project imported
- [ ] Vercel Postgres created
- [ ] Environment variables configured
- [ ] Database schema pushed
- [ ] Database seeded
- [ ] Login tested
- [ ] All features working
- [ ] Custom domain configured (optional)

## Support

Jika ada masalah:
1. Check Vercel deployment logs
2. Check browser console
3. Verify environment variables
4. Test database connection

---

**Selamat! Aplikasi POS Anda sudah live! 🎉**
