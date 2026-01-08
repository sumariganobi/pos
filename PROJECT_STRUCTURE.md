# 📁 Struktur Project POS System

## Overview
```
pos-app/
├── 📱 app/                    # Next.js App Router
├── 🧩 components/             # React Components
├── 📚 lib/                    # Utilities & Configs
├── 🗄️ prisma/                 # Database Schema & Seeds
├── 📝 types/                  # TypeScript Types
└── 📄 Config Files
```

## Detailed Structure

### 📱 app/ - Application Routes

```
app/
├── api/                       # API Routes (Backend)
│   ├── auth/
│   │   └── [...nextauth]/
│   │       └── route.ts       # NextAuth handler
│   ├── dashboard/
│   │   └── stats/
│   │       └── route.ts       # Dashboard statistics
│   ├── products/
│   │   └── route.ts           # Product CRUD
│   ├── transactions/
│   │   └── route.ts           # Transaction handling
│   ├── customers/
│   │   └── route.ts           # Customer management
│   └── reports/
│       └── route.ts           # Sales reports
│
├── dashboard/                 # Protected Dashboard Pages
│   ├── layout.tsx             # Dashboard layout with auth
│   ├── page.tsx               # Dashboard home
│   ├── pos/
│   │   └── page.tsx           # POS/Cashier interface
│   ├── products/
│   │   └── page.tsx           # Product management
│   ├── transactions/
│   │   └── page.tsx           # Transaction history
│   ├── customers/
│   │   └── page.tsx           # Customer database
│   └── reports/
│       └── page.tsx           # Sales reports
│
├── login/
│   └── page.tsx               # Login page
│
├── layout.tsx                 # Root layout
├── page.tsx                   # Home (redirects to dashboard)
├── providers.tsx              # SessionProvider wrapper
└── globals.css                # Global styles
```

### 🧩 components/ - Reusable Components

```
components/
├── Sidebar.tsx                # Navigation sidebar
└── Receipt.tsx                # Print receipt component
```

### 📚 lib/ - Libraries & Utilities

```
lib/
├── prisma.ts                  # Prisma client singleton
└── auth.ts                    # NextAuth configuration
```

### 🗄️ prisma/ - Database

```
prisma/
├── schema.prisma              # Database schema
└── seed.ts                    # Seed script
```

### 📝 types/ - TypeScript Definitions

```
types/
└── next-auth.d.ts             # NextAuth type extensions
```

### 📄 Configuration Files

```
pos-app/
├── .env                       # Environment variables (local)
├── .env.example               # Environment template
├── .gitignore                 # Git ignore rules
├── middleware.ts              # Auth middleware
├── next.config.ts             # Next.js config
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── tailwind.config.ts         # Tailwind CSS config
├── postcss.config.mjs         # PostCSS config
├── vercel.json                # Vercel deployment config
├── README.md                  # Main documentation
├── QUICKSTART.md              # Quick start guide
├── DEPLOYMENT.md              # Deployment guide
└── PROJECT_STRUCTURE.md       # This file
```

## 🗃️ Database Schema

### Models

1. **User** - User accounts
   - id, email, name, password, role
   - Relations: transactions

2. **Product** - Product catalog
   - id, name, sku, barcode, price, stock, category
   - Relations: category, transactionItems

3. **Category** - Product categories
   - id, name
   - Relations: products

4. **Customer** - Customer database
   - id, name, email, phone, totalSpent, totalVisits
   - Relations: transactions

5. **Transaction** - Sales transactions
   - id, invoiceNumber, total, paymentMethod
   - Relations: user, customer, items

6. **TransactionItem** - Transaction line items
   - id, productName, quantity, price, subtotal
   - Relations: transaction, product

### Enums

- **Role**: ADMIN, MANAGER, CASHIER
- **PaymentMethod**: CASH, CARD, QRIS, TRANSFER

## 🔄 Data Flow

### POS Transaction Flow
```
1. User selects products → Cart
2. Cart calculates subtotal + tax
3. User enters payment amount
4. System validates payment
5. Create transaction in DB
6. Update product stock
7. Generate invoice
8. Show receipt
```

### API Flow
```
Client → API Route → Prisma → PostgreSQL
       ← JSON Response ←
```

## 🔐 Authentication Flow

```
1. User enters credentials
2. NextAuth validates via Prisma
3. JWT token generated
4. Session stored
5. Middleware protects routes
6. User accesses dashboard
```

## 📊 Key Features by Page

### Dashboard (`/dashboard`)
- Today's sales statistics
- Transaction count
- Low stock alerts
- Quick metrics

### POS (`/dashboard/pos`)
- Product search
- Shopping cart
- Payment calculation
- Transaction processing

### Products (`/dashboard/products`)
- Product list table
- Add new product form
- Stock management
- Category assignment

### Transactions (`/dashboard/transactions`)
- Transaction history
- Invoice details
- Date filtering
- Payment method tags

### Customers (`/dashboard/customers`)
- Customer list
- Contact information
- Purchase history
- Loyalty metrics

### Reports (`/dashboard/reports`)
- Sales analytics
- Period selection
- Top products
- Revenue charts

## 🛠️ Tech Stack Details

### Frontend
- **Next.js 14+** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **date-fns** - Date formatting

### Backend
- **Next.js API Routes** - Serverless functions
- **NextAuth.js** - Authentication
- **Prisma** - ORM
- **bcryptjs** - Password hashing

### Database
- **PostgreSQL** - Relational database
- **Vercel Postgres** - Managed database

### State Management
- **Zustand** - Lightweight state management
- **React Hooks** - Local state

## 🚀 Deployment Architecture

```
GitHub → Vercel → Next.js App
                ↓
         Vercel Postgres
```

## 📦 Dependencies

### Production
- next, react, react-dom
- @prisma/client, prisma
- next-auth
- bcryptjs
- zustand
- date-fns

### Development
- typescript
- @types/*
- tailwindcss
- eslint
- tsx

## 🔧 Scripts

```json
{
  "dev": "next dev",                    // Development server
  "build": "prisma generate && next build", // Production build
  "start": "next start",                // Production server
  "prisma:generate": "prisma generate", // Generate Prisma Client
  "prisma:push": "prisma db push",      // Push schema to DB
  "prisma:seed": "tsx prisma/seed.ts"   // Seed database
}
```

## 📝 Environment Variables

### Required
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Application URL
- `NEXTAUTH_SECRET` - Random secret key

### Optional
- `NEXT_PUBLIC_APP_NAME` - Application name

## 🎯 Best Practices

1. **Type Safety** - Full TypeScript coverage
2. **Server Components** - Default to server components
3. **API Routes** - Separate business logic
4. **Prisma** - Type-safe database queries
5. **Authentication** - Protected routes with middleware
6. **Error Handling** - Try-catch in API routes
7. **Validation** - Input validation on forms
8. **Security** - Password hashing, JWT tokens

## 📈 Future Enhancements

- [ ] Multi-store support
- [ ] Advanced reporting with charts
- [ ] Export to Excel/PDF
- [ ] Barcode scanner integration
- [ ] Receipt printer integration
- [ ] Inventory alerts
- [ ] Supplier management
- [ ] Purchase orders
- [ ] Employee time tracking
- [ ] Mobile app (React Native)

---

**Last Updated**: January 2026
