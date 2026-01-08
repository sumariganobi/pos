import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        user: { select: { name: true } },
        customer: { select: { name: true } },
        items: { include: { product: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    })
    return NextResponse.json(transactions)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    console.log('Session:', session)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    console.log('User found:', user)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await request.json()
    console.log('Request body:', body)
    
    // Generate invoice number
    const invoiceNumber = `INV-${Date.now()}`

    // Create transaction with items
    const transaction = await prisma.transaction.create({
      data: {
        invoiceNumber,
        userId: user.id,
        subtotal: body.subtotal,
        tax: body.tax,
        total: body.total,
        paymentMethod: body.paymentMethod,
        paymentAmount: body.paymentAmount,
        changeAmount: body.changeAmount,
        items: {
          create: body.items.map((item: any) => ({
            productId: item.id,
            productName: item.name,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.price * item.quantity
          }))
        }
      },
      include: { items: true }
    })

    // Update product stock
    for (const item of body.items) {
      await prisma.product.update({
        where: { id: item.id },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      })
    }

    return NextResponse.json(transaction)
  } catch (error) {
    console.error('Transaction error:', error)
    return NextResponse.json({ 
      error: 'Failed to create transaction',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
