import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [todayTransactions, totalProducts, lowStockProducts] = await Promise.all([
      prisma.transaction.findMany({
        where: {
          createdAt: {
            gte: today
          }
        }
      }),
      prisma.product.count({
        where: { isActive: true }
      }),
      prisma.product.count({
        where: {
          stock: {
            lte: prisma.product.fields.minStock
          },
          isActive: true
        }
      })
    ])

    const todaySales = todayTransactions.reduce((sum, t) => sum + t.total, 0)

    return NextResponse.json({
      todaySales,
      todayTransactions: todayTransactions.length,
      totalProducts,
      lowStock: lowStockProducts
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
