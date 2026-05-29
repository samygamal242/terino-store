import type { Metadata } from "next"
import { prisma } from "@/src/lib/prisma"
import { CategoriesSection } from "@/src/components/home/CategoriesSection"

export const metadata: Metadata = {
  title: "Categories | TERINO",
  description: "Explore our luxury categories — Shoes, Sneakers, Bags, and Accessories.",
}

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
  })

  const counts: Record<string, number> = {}
  categories.forEach((c) => {
    counts[c.slug] = c._count.products
  })

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-heading text-white mb-4">Categories</h1>
        <p className="text-sm text-white/40 mb-12 max-w-md">
          Browse our curated collection by category.
        </p>
        <CategoriesSection productCounts={counts} />
      </div>
    </div>
  )
}
