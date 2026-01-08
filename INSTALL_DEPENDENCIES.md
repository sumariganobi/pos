# 📦 Panduan Install Dependencies

## Cara Install Dependencies

Karena project ini baru dibuat, Anda perlu install semua dependencies terlebih dahulu.

### Option 1: Install Semua (Recommended)

```bash
cd pos-app
npm install
```

Ini akan menginstall semua dependencies yang ada di `package.json`:

**Production Dependencies:**
- next@16.1.1
- react@19.2.3
- react-dom@19.2.3
- @prisma/client@^6.2.0
- prisma@^6.2.0
- next-auth@^4.24.11
- bcryptjs@^2.4.3
- zustand@^5.0.2
- date-fns@^4.1.0

**Dev Dependencies:**
- @tailwindcss/postcss@^4
- @types/node@^20
- @types/react@^19
- @types/react-dom@^19
- @types/bcryptjs@^2.4.6
- eslint@^9
- eslint-config-next@16.1.1
- tailwindcss@^4
- typescript@^5
- tsx@^4.19.2

### Option 2: Install Manual (Jika Ada Error)

Jika `npm install` gagal, coba install satu per satu:

```bash
# Core dependencies
npm install next@16.1.1 react@19.2.3 react-dom@19.2.3

# Database & ORM
npm install @prisma/client@^6.2.0 prisma@^6.2.0

# Authentication
npm install next-auth@^4.24.11 bcryptjs@^2.4.3

# State & Utils
npm install zustand@^5.0.2 date-fns@^4.1.0

# Dev dependencies
npm install -D @tailwindcss/postcss@^4 tailwindcss@^4
npm install -D @types/node@^20 @types/react@^19 @types/react-dom@^19
npm install -D @types/bcryptjs@^2.4.6
npm install -D eslint@^9 eslint-config-next@16.1.1
npm install -D typescript@^5 tsx@^4.19.2
```

## Verifikasi Instalasi

Setelah install, verifikasi dengan:

```bash
# Check package.json
cat package.json

# Check node_modules
ls node_modules

# Check Prisma
npx prisma --version
```

## Setup Setelah Install

### 1. Generate Prisma Client

```bash
npx prisma generate
```

### 2. Setup Database

```bash
# Push schema ke database
npx prisma db push

# Seed data
npx tsx prisma/seed.ts
```

### 3. Run Development

```bash
npm run dev
```

## Troubleshooting

### Error: Cannot find module 'next'

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: Prisma Client not generated

**Solution:**
```bash
npx prisma generate
```

### Error: Database connection failed

**Solution:**
1. Check `.env` file
2. Pastikan DATABASE_URL benar
3. Pastikan PostgreSQL running

### Error: Port 3000 already in use

**Solution:**
```bash
# Kill process di port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Atau gunakan port lain:
npm run dev -- -p 3001
```

### Error: TypeScript errors

**Solution:**
```bash
# Regenerate types
npx next typegen
```

## Minimum Requirements

- **Node.js**: >= 18.17.0
- **npm**: >= 9.0.0
- **PostgreSQL**: >= 14.0

Check versions:
```bash
node --version
npm --version
psql --version
```

## Update Dependencies

Untuk update ke versi terbaru:

```bash
# Check outdated packages
npm outdated

# Update all
npm update

# Update specific package
npm update next
```

## Clean Install

Jika ada masalah, lakukan clean install:

```bash
# Remove node_modules dan lock file
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Install ulang
npm install
```

## Alternative Package Managers

### Menggunakan Yarn

```bash
# Install yarn
npm install -g yarn

# Install dependencies
yarn install

# Run dev
yarn dev
```

### Menggunakan pnpm

```bash
# Install pnpm
npm install -g pnpm

# Install dependencies
pnpm install

# Run dev
pnpm dev
```

## Production Build

Untuk production:

```bash
# Build
npm run build

# Start production server
npm start
```

## Docker (Optional)

Jika ingin menggunakan Docker:

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build image
docker build -t pos-app .

# Run container
docker run -p 3000:3000 pos-app
```

---

**Setelah install berhasil, lanjut ke [QUICKSTART.md](./QUICKSTART.md)** 🚀
