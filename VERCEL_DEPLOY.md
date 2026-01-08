# 🚀 Panduan Deploy ke Vercel

## Checklist Sebelum Deploy

### 1. Environment Variables di Vercel

Buka: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Tambahkan variabel berikut:

```env
DATABASE_URL=postgresql://...  (dari Vercel Postgres)
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-random-secret-key
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

Atau gunakan: https://generate-secret.vercel.app/32

### 2. Setup Vercel Postgres

1. Di Vercel Dashboard, klik tab **Storage**
2. Klik **Create Database**
3. Pilih **Postgres**
4. Pilih region terdekat (Singapore untuk Indonesia)
5. Klik **Create**
6. `DATABASE_URL` akan otomatis ditambahkan ke Environment Variables

### 3. Push Schema ke Database

Setelah deploy pertama kali, jalankan:

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
npx tsx prisma/seed.ts
```

## Troubleshooting

### Error: "Server configuration problem"

**Kemungkinan penyebab:**

1. **Environment variables belum di-set**
   - Cek di Vercel Dashboard → Settings → Environment Variables
   - Pastikan `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET` ada

2. **Database belum di-setup**
   - Buat Vercel Postgres database
   - Jalankan `npx prisma db push`
   - Jalankan `npx tsx prisma/seed.ts`

3. **NEXTAUTH_URL salah**
   - Harus sesuai dengan URL production
   - Format: `https://your-app.vercel.app` (tanpa trailing slash)

4. **Build error**
   - Cek build logs di Vercel
   - Pastikan semua dependencies terinstall

### Error: "Prisma Client not generated"

**Solusi:**
```bash
# Di vercel.json, pastikan build command:
{
  "buildCommand": "prisma generate && next build"
}
```

### Error: "Database connection failed"

**Solusi:**
1. Cek `DATABASE_URL` di Environment Variables
2. Pastikan format benar: `postgresql://user:pass@host/db?sslmode=require`
3. Test connection:
   ```bash
   npx prisma db push
   ```

### Error: "NextAuth configuration error"

**Solusi:**
1. Pastikan `NEXTAUTH_SECRET` di-set
2. Pastikan `NEXTAUTH_URL` sesuai dengan production URL
3. Redeploy setelah update environment variables

## Langkah Deploy

### First Time Deploy

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import di Vercel**
   - Buka https://vercel.com
   - Klik "Add New Project"
   - Import dari GitHub
   - Pilih repository `pos-app`

3. **Configure Project**
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `prisma generate && next build`
   - Install Command: `npm install`

4. **Add Environment Variables**
   - Tambahkan semua env vars yang diperlukan
   - Klik "Deploy"

5. **Setup Database**
   ```bash
   vercel env pull
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

6. **Test Application**
   - Buka URL production
   - Login dengan: admin@pos.com / admin123
   - Test semua fitur

### Update/Redeploy

Setiap kali push ke GitHub, Vercel akan otomatis redeploy:

```bash
git add .
git commit -m "Update feature"
git push
```

## Monitoring

### View Logs

1. Vercel Dashboard → Your Project
2. Tab "Deployments"
3. Klik deployment terakhir
4. Lihat "Build Logs" atau "Function Logs"

### Check Database

```bash
# Open Prisma Studio
npx prisma studio

# Or via Vercel Dashboard
# Storage → Postgres → Data
```

## Production Checklist

- [ ] Environment variables configured
- [ ] Vercel Postgres created
- [ ] Database schema pushed
- [ ] Database seeded
- [ ] Application deployed successfully
- [ ] Login tested
- [ ] All features working
- [ ] No errors in logs
- [ ] Default password changed

## Common Issues

### 1. White screen / Blank page
- Check browser console for errors
- Check Vercel function logs
- Verify environment variables

### 2. Login not working
- Check `NEXTAUTH_URL` matches production URL
- Check `NEXTAUTH_SECRET` is set
- Check database has user data

### 3. Database errors
- Verify `DATABASE_URL` is correct
- Check Vercel Postgres is running
- Test with `npx prisma db push`

### 4. Build fails
- Check build logs in Vercel
- Verify all dependencies in package.json
- Check for TypeScript errors

## Support

Jika masih ada masalah:
1. Check Vercel deployment logs
2. Check browser console
3. Verify all environment variables
4. Test database connection
5. Check GitHub repository

---

**Last Updated**: January 8, 2026
