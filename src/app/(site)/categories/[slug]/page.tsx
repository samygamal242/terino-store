import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { prisma } from "@/src/lib/prisma"
import { ProductGrid } from "@/src/components/product/ProductGrid"
import { ProductGridSkeleton } from "@/src/components/shared/LoadingSkeleton"
import type { Product, ProductImage, Category } from "@/src/generated/prisma/client"

interface ProductWithRelations extends Product {
  images: ProductImage[]
  category: Category
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ sort?: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await prisma.category.findUnique({ where: { slug } })
  if (!category) return { title: "Category Not Found | TERINO" }

  return {
    title: `${category.name} | TERINO`,
    description: category.description || `Explore our ${category.name.toLowerCase()} collection.`,
  }
}

async function CategoryProducts({ slug, sort }: { slug: string; sort?: string }) {
  const category = await prisma.category.findUnique({ where: { slug } })
  if (!category) notFound()

  let orderBy: Record<string, string> = { createdAt: "desc" }
  if (sort === "price-asc") orderBy = { price: "asc" }
  else if (sort === "price-desc") orderBy = { price: "desc" }

  const products = await prisma.product.findMany({
    where: { categoryId: category.id, status: "ACTIVE" },
    orderBy,
    include: {
      images: { orderBy: { order: "asc" }, take: 1 },
      category: true,
    },
  })

  const serialized = products.map((p: ProductWithRelations) => ({
    ...p,
    price: Number(p.price),
    comparePrice: p.comparePrice ? Number(p.comparePrice) : null,
  }))

  return (
    <>
      <div className="flex items-center justify-between mb-12">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Collection</p>
          <h1 className="text-4xl md:text-5xl font-heading text-white">{category.name}</h1>
          {category.description && (
            <p className="text-sm text-white/40 mt-3 max-w-md">{category.description}</p>
          )}
        </div>
      </div>
      <ProductGrid products={serialized} />
    </>
  )
}

export default async function CategoryPage(props: CategoryPageProps) {
  const { slug } = await props.params
  const { sort } = await props.searchParams

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <Suspense fallback={<ProductGridSkeleton />}>
          <CategoryProducts slug={slug} sort={sort} />
        </Suspense>
      </div>
    </div>
  )
}
