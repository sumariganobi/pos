import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@pos.com' },
    update: {},
    create: {
      email: 'admin@pos.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })
  console.log('✅ Admin user created:', admin.email)

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Makanan' },
      update: {},
      create: { name: 'Makanan' }
    }),
    prisma.category.upsert({
      where: { name: 'Minuman' },
      update: {},
      create: { name: 'Minuman' }
    }),
    prisma.category.upsert({
      where: { name: 'Snack' },
      update: {},
      create: { name: 'Snack' }
    })
  ])
  console.log('✅ Categories created')

  // Create sample products
  const products = [
    { name: 'Nasi Goreng', sku: 'FD001', price: 25000, stock: 50, categoryId: categories[0].id },
    { name: 'Mie Goreng', sku: 'FD002', price: 20000, stock: 45, categoryId: categories[0].id },
    { name: 'Ayam Bakar', sku: 'FD003', price: 35000, stock: 30, categoryId: categories[0].id },
    { name: 'Sate Ayam', sku: 'FD004', price: 30000, stock: 40, categoryId: categories[0].id },
    { name: 'Teh Manis', sku: 'DR001', price: 5000, stock: 100, categoryId: categories[1].id },
    { name: 'Kopi', sku: 'DR002', price: 8000, stock: 80, categoryId: categories[1].id },
    { name: 'Jus Jeruk', sku: 'DR003', price: 12000, stock: 60, categoryId: categories[1].id },
    { name: 'Es Teh', sku: 'DR004', price: 6000, stock: 90, categoryId: categories[1].id },
    { name: 'Keripik', sku: 'SN001', price: 10000, stock: 75, categoryId: categories[2].id },
    { name: 'Coklat', sku: 'SN002', price: 15000, stock: 65, categoryId: categories[2].id }
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: {
        ...product,
        cost: product.price * 0.6,
        minStock: 10,
        description: `Produk ${product.name}`
      }
    })
  }
  console.log('✅ Sample products created')

  // Create sample customer
  await prisma.customer.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      name: 'Pelanggan Umum',
      email: 'customer@example.com',
      phone: '081234567890'
    }
  })
  console.log('✅ Sample customer created')

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
