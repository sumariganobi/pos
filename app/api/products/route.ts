import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: { name: 'asc' }
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const product = await prisma.product.create({
      data: {
        name: body.name,
        sku: body.sku,
        barcode: body.barcode,
        description: body.description,
        price: parseFloat(body.price),
        cost: parseFloat(body.cost || 0),
        stock: parseInt(body.stock),
        minStock: parseInt(body.minStock || 5),
        categoryId: body.categoryId,
        imageUrl: body.imageUrl
      }
    })
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
