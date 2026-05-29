import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q") || ""

  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ],
    },
    include: {
      category: true,
      images: { orderBy: { order: "asc" }, take: 1 },
    },
    take: 20,
  })

  return NextResponse.json(products)
}
