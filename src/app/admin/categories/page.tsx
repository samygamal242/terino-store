import { prisma } from "@/src/lib/prisma"
import { CategoryManager } from "./CategoryManager"

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { products: true } } },
  })

  return (
    <div>
      <h1 className="text-2xl font-heading text-white mb-8">Categories</h1>
      <CategoryManager categories={categories} />
    </div>
  )
}
