import type { Metadata } from "next"
import { Suspense } from "react"
import { prisma } from "@/src/lib/prisma"
import { ProductGrid } from "@/src/components/product/ProductGrid"
import { ProductGridSkeleton } from "@/src/components/shared/LoadingSkeleton"
import { ProductsFilter } from "./ProductsFilter"

export const metadata: Metadata = {
  title: "All Products | TERINO",
  description: "Browse our complete collection of luxury shoes, sneakers, bags, and accessories.",
}

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string
    search?: string
    sort?: string
  }>
}

async function ProductsContent({ searchParams }: ProductsPageProps) {
  const { category, search, sort } = await searchParams

  const where: Record<string, unknown> = { status: "ACTIVE" }

  if (category) {
    where.category = { slug: category }
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ]
  }

  let orderBy: Record<string, string> = { createdAt: "desc" }
  if (sort === "price-asc") orderBy = { price: "asc" }
  else if (sort === "price-desc") orderBy = { price: "desc" }
  else if (sort === "name-asc") orderBy = { name: "asc" }
  else if (sort === "name-desc") orderBy = { name: "desc" }

  const products = await prisma.product.findMany({
    where,
    orderBy,
    include: {
      images: { orderBy: { order: "asc" }, take: 1 },
      category: true,
    },
  })

  const serialized = products.map((p) => ({
    ...p,
    price: Number(p.price),
    comparePrice: p.comparePrice ? Number(p.comparePrice) : null,
  }))

  return <ProductGrid products={serialized} />
}

export default async function ProductsPage(props: ProductsPageProps) {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-heading text-white mb-4">All Products</h1>
        <p className="text-sm text-white/40 mb-12 max-w-md">
          Discover our complete collection of luxury fashion pieces.
        </p>
        <Suspense fallback={null}>
          <ProductsFilter />
        </Suspense>
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductsContent searchParams={props.searchParams} />
        </Suspense>
      </div>
    </div>
  )
}
