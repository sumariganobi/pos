import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'today'

    const now = new Date()
    let startDate = new Date()

    switch (period) {
      case 'today':
        startDate.setHours(0, 0, 0, 0)
        break
      case 'week':
        startDate.setDate(now.getDate() - 7)
        break
      case 'month':
        startDate.setMonth(now.getMonth() - 1)
        break
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1)
        break
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: startDate
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    const totalSales = transactions.reduce((sum, t) => sum + t.total, 0)
    const totalTransactions = transactions.length
    const averageTransaction = totalTransactions > 0 ? totalSales / totalTransactions : 0

    // Calculate top products
    const productStats = new Map()
    transactions.forEach(transaction => {
      transaction.items.forEach(item => {
        const existing = productStats.get(item.productName) || { quantity: 0, revenue: 0 }
        productStats.set(item.productName, {
          name: item.productName,
          quantity: existing.quantity + item.quantity,
          revenue: existing.revenue + item.subtotal
        })
      })
    })

    const topProducts = Array.from(productStats.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10)

    return NextResponse.json({
      totalSales,
      totalTransactions,
      averageTransaction,
      topProducts
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch report' }, { status: 500 })
  }
}
