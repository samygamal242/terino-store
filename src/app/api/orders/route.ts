import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `TER-${ts}-${rand}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items, customer } = body

    if (!items?.length || !customer?.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerName: customer.name || "",
        customerEmail: customer.email,
        customerPhone: customer.phone || "",
        shippingAddress: customer.address || "",
        total: items.reduce((sum: number, i: { price: number; quantity: number }) => sum + i.price * i.quantity, 0),
        items: {
          create: items.map((i: { id: string; quantity: number; price: number }) => ({
            productId: i.id,
            quantity: i.quantity,
            price: i.price,
          })),
        },
      },
    })

    return NextResponse.json({ id: order.id, orderNumber: order.orderNumber })
  } catch (error) {
    console.error("Order creation failed:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
