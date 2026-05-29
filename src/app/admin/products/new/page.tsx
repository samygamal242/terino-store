import { prisma } from "@/src/lib/prisma"
import { ProductForm } from "../ProductForm"

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } })
  return (
    <div>
      <h1 className="text-2xl font-heading text-white mb-8">New Product</h1>
      <ProductForm categories={categories} />
    </div>
  )
}
