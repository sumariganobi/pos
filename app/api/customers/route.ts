import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { totalSpent: 'desc' }
    })
    return NextResponse.json(customers)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const customer = await prisma.customer.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address
      }
    })
    return NextResponse.json(customer)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 })
  }
}
